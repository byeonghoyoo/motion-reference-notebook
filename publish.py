"""Publish only the AI Study Hub from a terminal controlled by its owner."""
import base64
import hashlib
import io
import json
import os
import platform
import subprocess
import sys
import tarfile
import tempfile
import time
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen

SLUG = "ai-study-hub"
DESCRIPTION = "AI Study Hub · 바이브코딩, 이미지, 영상과 실전 프롬프트"
HOST = "gitlab.com"
PIPELINE = """publish-study-hub:
  image: alpine:3.21
  stage: deploy
  script:
    - test -s public/index.html
  pages: true
  rules:
    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
"""

def fetch(url):
    with urlopen(Request(url, headers={"User-Agent": "AI-Study-Hub/1"}), timeout=60) as response:
        return response.read()

def install_cli(directory):
    # Use an official, checksum-verified GitLab CLI without altering the machine.
    arch = {"x86_64": "amd64", "aarch64": "arm64"}[platform.machine()]
    version = "1.131.0"
    urls = json.loads(fetch("https://gitlab.com/api/v4/projects/gitlab-org%2Fcli/releases/v" + version))
    assets = {a["name"]: a["url"] for a in urls["assets"]["links"]}
    name = f"glab_{version}_linux_{arch}.tar.gz"
    archive = fetch(assets[name])
    manifest = fetch(assets["checksums.txt"]).decode().splitlines()
    expected = next(line.split()[0] for line in manifest if line.split()[-1].lstrip("*") == name)
    if hashlib.sha256(archive).hexdigest() != expected:
        raise RuntimeError("GitLab CLI 체크섬이 일치하지 않습니다.")
    with tarfile.open(fileobj=io.BytesIO(archive), mode="r:gz") as bundle:
        entry = next(m for m in bundle if m.isfile() and Path(m.name).name == "glab")
        binary = directory / "glab"
        binary.write_bytes(bundle.extractfile(entry).read())
        binary.chmod(0o700)
    return str(binary)

def publish(directory):
    html = (Path(__file__).resolve().parent / 'study/ai-study-hub/index.html').read_text()
    files = {"public/index.html": html, ".gitlab-ci.yml": PIPELINE}
    cli = install_cli(directory)
    env = {**os.environ, "GLAB_CONFIG_DIR": str(directory / "config"), "XDG_CONFIG_HOME": str(directory / "xdg"), "NO_COLOR":"1"}
    for key in ("GITLAB_TOKEN", "GITLAB_ACCESS_TOKEN", "OAUTH_TOKEN", "CI_JOB_TOKEN", "GLAB_ENABLE_CI_AUTOLOGIN"):
        env.pop(key, None)
    def api(endpoint, payload=None, optional=False):
        command = [cli, "api", "--hostname", HOST, endpoint]
        if payload is not None:
            command.extend(["--method", "POST", "--input", "-"])
        result = subprocess.run(command, input=json.dumps(payload) if payload is not None else None,
                                capture_output=True, text=True, env=env)
        if result.returncode:
            if optional and "404" in (result.stderr + result.stdout):
                return None
            raise RuntimeError(result.stderr.strip() or "GitLab API 요청 실패")
        return json.loads(result.stdout)

    print("개인 GitLab 계정에 ai-study-hub 공개 프로젝트를 배포합니다. 아래 GitLab CLI가 표시하는 코드를 본인 브라우저에서 확인하세요.", flush=True)
    subprocess.run([cli, "auth", "login", "--hostname", HOST, "--device", "--git-protocol", "https", "--insecure-storage"], env=env, check=True)
    user = api("user")["username"]
    project = api("projects/" + quote(user + "/" + SLUG, safe=""), optional=True)
    if project is None:
        project = api("projects", {"name": SLUG, "path": SLUG, "visibility": "public", "description": DESCRIPTION, "initialize_with_readme": True})
    elif project.get("description") != DESCRIPTION:
        raise RuntimeError("같은 이름의 다른 프로젝트가 있습니다. 기존 파일을 보호하기 위해 중단합니다.")
    endpoint = f"projects/{project['id']}"
    branch = project.get("default_branch") or "main"
    print("프로젝트:", project["web_url"], flush=True)
    for _ in range(30):
        if api(endpoint + "/repository/branches/" + quote(branch, safe=""), optional=True):
            break
        time.sleep(2)
    else:
        raise RuntimeError("GitLab이 기본 브랜치를 아직 준비하지 못했습니다. 같은 명령으로 재개할 수 있습니다.")
    actions = []
    for path, content in files.items():
        old = api(endpoint + "/repository/files/" + quote(path, safe="") + "?ref=" + quote(branch, safe=""), optional=True)
        if old:
            if base64.b64decode(old["content"]).decode() != content:
                raise RuntimeError("이미 수정된 파일이 있습니다: " + path)
        else:
            actions.append({"action": "create", "file_path": path, "content": content})
    if actions:
        api(endpoint + "/repository/commits", {"branch": branch, "commit_message": "Publish AI Study Hub", "actions": actions})
    print("Pages 배포 확인 중:", project["web_url"] + "/-/pipelines", flush=True)
    for _ in range(60):
        runs = api(endpoint + "/pipelines?per_page=1&ref=" + quote(branch, safe=""))
        if runs and runs[0]["status"] in {"failed","canceled","manual","blocked"}:
            raise RuntimeError("파이프라인 " + runs[0]["status"] + ": " + runs[0]["web_url"])
        if runs and runs[0]["status"] == "success":
            pages = api(endpoint + "/pages", optional=True) or {}
            url = pages.get("url")
            if url:
                try:
                    if "AI Study Hub · 학습 네비게이터".encode() in fetch(url):
                        print("배포 확인:", url, flush=True)
                        return
                except (HTTPError, URLError, TimeoutError):
                    pass
        time.sleep(7)
    raise RuntimeError("프로젝트는 준비됐습니다. 배포 결과를 확인할 주소: " + project["web_url"] + "/-/deployments/pages")

if __name__ == "__main__":
    os.umask(0o077)
    try:
        with tempfile.TemporaryDirectory(prefix="study-gitlab-") as temp:
            publish(Path(temp))
    except (RuntimeError, subprocess.CalledProcessError, OSError, KeyError, StopIteration) as error:
        sys.exit(str(error))
