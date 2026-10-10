# Seedance 2.0 영상 연출 프롬프트 (seedance-director)

> Higgsfield MCP + Seedance 2.0으로 영상 만들 때 쓰는 2게이트 파이프라인.
> 핵심 사상 — **"뽑지 말고 연출하라."** 비싼 영상 크레딧을 태우기 전에 싼 이미지 단계에서 전부 확정한다.

**출처** seedance-director SKILL.md (스킬 원본은 `~/.claude/skills/`에 설치해서 쓰는 게 정석)

---

## 파이프라인

```
사용자 컨셉 청취
  → GATE 1: 캐릭터 레퍼런스 시트  (사용자 승인 필수)
  → GATE 2: 졸라맨 주석 스토리보드 (사용자 승인 필수)
  → [두 게이트 통과 확인] ← 하나라도 미승인이면 영상 생성 금지
  → 영상 생성 (검증된 슬롯 규칙)
  → (선택) 대사/목소리 단계
  → (여러 컷이면) explainer_video로 무료 어셈블리
```

두 게이트가 모두 승인되기 전엔 `generate_video`를 부르지 않는다. "그냥 빨리 영상부터"라고 해도 최소 게이트(캐릭터 시트 1장 + 스토리보드 1장, 4크레딧)를 권하고, 그래도 건너뛰면 캐릭터 일관성을 보장할 수 없음을 명시한다.

---

## GATE 1 · 캐릭터 레퍼런스 시트

정면 / 3-4분면 / 측면 3뷰를 한 줄에 배치. `[ ]`만 교체해서 그대로 쓴다.

```text
Character reference sheet, clean neutral studio lighting, plain light grey
seamless background. [나이대/성별/국적]: [헤어스타일], [고유 식별자],
[얼굴 특징], wearing [의상]. Three views arranged side by side in one row:
front view full torso, three-quarter view, and profile view. Neutral relaxed
expression, arms at sides, no props. Photorealistic, sharp focus, even soft
lighting with no dramatic shadows, consistent scale across the three views.
Small handwritten label under the row reading '[캐릭터명] / ref sheet'.
```

`[고유 식별자]`가 승부처다. 눈썹 흉터처럼 **한 단어로 특정되는 표식**을 넣으면 재생성해도 그 특징이 살아남는다.

---

## GATE 2 · 졸라맨 주석 스토리보드

### 필수 주석 6종 — 하나라도 빠지면 재생성

패널마다 ① 패널 번호 ② 타임코드(예: 0:00–0:02) ③ 렌즈 mm ④ 카메라 동작 용어(static / push-in / tracking / redirect / focus handoff) ⑤ 모션 화살표(인물 동선·카메라 방향).
시트 하단에 ⑥ **전환 동기 한 줄** — 카메라가 왜 움직이는지의 물리적 이유.

⑥이 진짜 승부처다. "카메라를 팬한다"가 아니라 **"수레가 지나가므로 카메라가 수레를 따라간다"** 처럼 장면 안의 사건이 카메라를 끌고 가게 쓴다. 동기 부여된 카메라 무브(motivated camera move)와 무작위 움직임의 결과 품질 차이가 가장 크다.

### 패널 수·밀도 규칙 (가장 자주 어기는 규칙)

**5초 1콜의 실행 한계 — 비트 2~3개, 비트당 최소 1.5초, 카메라 동작 2종 이하, 전력 질주 인물 1명 이하.**

정적 인물의 3비트(2s/2s/1s)는 초 단위로 정확히 재현됐다. 반면 질주하는 2인 + 카메라 4동작(후퇴 트래킹→스윙→푸시인→핸드오프)을 5초에 넣은 시트는 **주석이 완벽했는데도 실행이 무너졌다.** 그림·주석 품질 문제가 아니라 **초당 정보 밀도** 문제다. 1초 비트는 24프레임이고, 그 안에 공간 설정·인물 동작·카메라 동작을 전부 읽히게 만들 수 없다.

12숏 초과 기획은 연속성 관리가 급격히 어려워지므로 반드시 여러 콜 + 어셈블리로 나눈다.

---

## 슬롯 규칙 (가장 중요)

`medias` 배열의 **role이 결과를 결정한다.**

| 넣는 것 | role | 이유 |
|---|---|---|
| 졸라맨 스토리보드 | `image_references` | 구도·카메라만 참조되고 그림체는 프롬프트가 결정 |
| 캐릭터 시트 (각 인물) | `image_references` | 정체성 참조. 최대 3개 동시 투입 확인됨 |
| 실사 키프레임 (있을 때만) | `start_image` | 그 이미지가 1번 프레임이 됨 |

**스토리보드는 `start_image`가 아니라 `image_references`에 넣는다.** A/B 실측에서 start_image도 하드 실패는 아니었지만, 샷 의도 재현이 image_references 쪽이 명확히 충실했다 — 타임코드가 주석과 초 단위로 일치했고, 마지막 샷의 포커스 핸드오프를 살린 것도 image_references뿐이었다. start_image는 첫 인물에 붙잡혀 그 비트를 놓쳤다.

**2인 이상 씬 — 레퍼런스가 없는 인물은 '아무나'로 생성된다.** 시트 없이 프롬프트로만 지시한 두 번째 인물은 임의의 인상으로 나왔고 재생성마다 얼굴이 바뀌었다. 전용 시트를 추가 투입한 실행에서는 두 번째 인물이 고유 식별자(눈썹 흉터)까지 그대로 재현됐다.

> 등장인물 수만큼 시트를 각각 `image_references`로 투입하고, 프롬프트에서 CHARACTER A / B로 나눠 각 시트의 확정 문장을 배정한다. 반복 등장 인물의 레퍼런스를 생략하는 건 그 얼굴을 운에 맡기는 것.

---

## 영상 프롬프트 템플릿

개행 없이 **한 줄로** 넣는다. 웹사이트 복붙용.

```text
Use @image1 for the shot sequence, framing and camera flow, not for its sketch style. Use @image2 as the identity reference for [A 이름]. Use @image3 as the identity reference for [B 이름]. [스타일 한 구절: Photorealistic cinematic film quality, one continuous shot, 톤/그레이딩]. SCENE: [장소, 시간대, 날씨, 조명 — 한두 문장]. [A 이름]: [GATE 1의 A 확정 문장 그대로 복사]. [B 이름]: [GATE 1의 B 확정 문장 그대로 복사]. Follow the panel sequence and timing shown in @image1. [연출 서술: 누가 무엇을 하고, 그 다음 무엇이 일어나고, 카메라가 어떻게 따라가는지 — 시간 순서대로 흐르는 3~5문장의 긍정문]. CAMERA MOTIVATION: [전환 동기 한 문장]. One continuous shot. no on-screen text, no captions.
```

MCP용은 위에서 `@image1 / @image2 / @image3` 역할 선언을 빼고, 같은 세 이미지를 `medias[].role = image_references`로 전달한다.

타임코드를 쓸 거면 스토리보드 주석과 **값을 일치**시킨다. 이미지와 텍스트가 같은 얘기를 두 채널로 반복할 때 재현율이 가장 높았다. 다만 타임코드 없이 순서 서술만으로도 충분히 작동한다 — **구조보다 가드레일 과잉이 해롭다.**

---

## 기억할 것

- 게이트를 건너뛰면 크레딧이 날아간다. 이미지는 싸고 영상은 비싸다.
- `[고유 식별자]` 한 단어가 캐릭터 일관성의 8할.
- 5초에 비트 3개 이상 넣지 않는다. 밀도 초과는 주석 품질로 못 이긴다.
- 카메라는 사건이 끌고 간다. 카메라 자체가 주어가 되면 결과가 무너진다.
