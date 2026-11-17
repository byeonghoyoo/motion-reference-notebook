# ComfyUI 제작 노트

사용자 요청: DENO AI HUB의 ComfyUI 공개 자료를 기존 가이드북에 추가하고, ComfyUI Desktop을 통한 추가 유료 API 없는 로컬 제작의 출발점으로 사용한다.

- 공개 경로: `study/ai-video/04-comfyui-deno/`
- `index.html`: 전체 안내, 29개 노드 검색·저장, 14개 폴더 / 29개 파일 목록, 작업 프롬프트, 체크리스트
- `reference.html`: 공식 한국어 설명서 전체를 HTML로 변환한 읽기 페이지
- `sources/`: 한국어 README 전체, 노드 등록 목록, 공개 Drive 목록, 출처 고지와 GPL 전문
- `catalog.mjs`: 한국어 정리와 도구·폴더 설명
- `catalog.json`: 검증 가능한 전체 목록
- `guide.js`: 로컬 검색·즐겨찾기·체크·프롬프트 조합. 외부 생성 호출 없음

재생성: 저장소 루트에서 `npm install --ignore-scripts` 후 `node study/ai-video/04-comfyui-deno/build-guide.mjs`.

확인 기준: 2026-11-18, DENO commit `e5b4fe12eddd114164b74e1898f6d7150ee34762`, 문서 v0.7.129. 외부 자료는 자동 동기화되지 않는다. 모델을 실행하거나 Mac에 설치한 결과가 아니다.

이 장의 신규 파일과 DENO 원문 파생본은 GPL-3.0-only. `sources/NOTICE.md`와 `sources/COPYING` 참조. 기존 사이트 전체의 라이선스를 변경하지 않는다.
