# 릴스 아래로 떨어지는 영상 프롬프트

> 인물이 화면 위에서 아래로 낙하하는 숏폼 연출 세트.
> **카메라를 완전히 고정**하고 인물만 움직이게 해서, 스크롤 방향과 낙하 방향을 일치시키는 게 핵심이다.
> 릴스·쇼츠 인트로나 전환 컷으로 쓴다.

---

## 왜 먹히는가

세로 피드는 위에서 아래로 넘긴다. 인물이 같은 방향으로 떨어지면 스크롤 동작과 화면 움직임이 겹쳐서 시선이 붙잡힌다.
반대로 카메라가 같이 움직이면 낙하감이 사라진다. **모든 프롬프트에 카메라 고정 지시가 들어가는 이유가 이것.**

## 공통 규칙

| 항목 | 값 | 이유 |
|---|---|---|
| 카메라 | 완전 고정 (zoom·pan·tilt·tracking·rotation 전부 금지) | 카메라가 따라가면 낙하가 아니라 추적 샷이 된다 |
| 비율 | 세로 9:16 | 릴스·쇼츠 기본 |
| 인물 동작 | 팔다리 미세하게 계속 움직임 | 완전히 굳어 있으면 인형 떨어지는 것처럼 보인다 |
| 네거티브 | `frozen limbs, rigid pose, extra limbs, distorted anatomy, text, watermark` | 낙하 포즈는 팔다리 오류가 특히 잘 난다 |

동작 강도는 **"보이지만 과하지 않게"** 가 정답이다. 너무 크면 허우적대는 코미디가 되고, 없으면 마네킹이 된다.

## 워크플로우

```
① 기준 이미지 생성 또는 준비  (낙하 포즈 고정)
        ↓
② 스타일 변환 프롬프트로 톤 결정  (Falling 2 · 3)
        ↓
③ 영상화 프롬프트로 움직임 부여  (Seedance 2 · Falling 1)
```

Falling 2·3은 **이미지를 스타일 변환**하는 프롬프트고, Seedance 2와 Falling 1은 **움직임을 만드는** 프롬프트다. 섞어 쓰지 말고 단계를 나눠야 결과가 안정된다.

---

## 01 · Seedance 2 — 바닥에 구멍이 열리고 뒤로 빠짐

**모델** Seedance 2
**연출** 프레임은 고정. 인물이 뒤로 한 걸음 물러서면 등 뒤 바닥에 구멍이 열리고, 그대로 뒤로 떨어진다.

가장 짧고 가장 강한 컷. 낙하 자체보다 **"사라짐"** 에 초점이 있어서 전환용으로 좋다.
앞 장면 → 이 컷 → 다음 장면으로 이으면 컷 전환이 자연스럽게 설명된다.

```text
frame stays static while character takes a step backwards as a hole opens in the ground behind him and he falls into it backwards. camera position stays fixed
```

---

## 02 · Falling 1 — 흑백 도시 콜라주 낙하 (영상)

**용도** 영상 생성
**스타일** 초현실 혼합매체 콜라주. 인물은 **컬러 컷아웃 + 얇고 불균일한 흰 종이 테두리**로 오려붙인 느낌.
**동선** 화면 위에서 진입 → 중앙을 통과해 수직 낙하 → 아래로 이탈.
**배경** 정지된 흑백 도시 콜라주 — 찢은 종이, 복사기 질감, 쌓아올린 건물, 극적인 구름, 종이 결, 아날로그 진 특유의 거친 마감.

인물만 컬러라 배경과 분리돼서 시선이 자동으로 인물에 붙는다. 배경은 움직이지 않는 게 포인트.

```text
Create a surreal mixed-media collage animation using the supplied girl as a recognizable full-color cutout with a thin, uneven white paper border.
She enters from the top of the frame and falls straight down through the center until she exits at the bottom. While she is falling, she continuously moves her arms and legs natural motion—her arms shift and bend, her hands move slightly, and her legs softly kick and reposition. Keep the movement visible but subtle, fluid, and realistic.
Use a static black-and-white city collage background with torn paper, photocopy textures, stacked buildings, dramatic clouds, paper grain, and analog zine imperfections.
Locked camera. No zoom, pan, tilt, tracking, rotation, sideways drift, or scale change.
Negative prompt: frozen limbs, rigid pose, excessive flailing, standing, walking, floating upright, floor, ground, hole, portal, extra limbs, distorted anatomy, CGI, text, watermark.
```

> 네거티브에 `floor, ground, hole, portal`이 들어간 이유 — 바닥이 생기면 낙하가 끝나버린다. 끝없이 떨어지는 느낌을 유지하려면 지면을 명시적으로 막아야 한다.

---

## 03 · Falling 2 — 파랑·흰 종이 콜라주 (이미지 변환)

**용도** 이미지 스타일 변환 (영상 아님)
**핵심 지시** 인물의 **위치·크기·각도·포즈를 절대 건드리지 말 것**. 중앙 정렬·회전·리사이즈·재배치 전부 금지.
**포즈 기준** 상단 중앙 부근, 머리는 왼쪽, 다리는 오른쪽 위로, 팔다리는 굽힌 상태.
**스타일** 파랑-검정 수제 종이 컷아웃, 거친 가장자리. 흰 구겨진 종이 배경, 찢은 하늘 조각과 뭉게구름, 인물 아래 왼쪽에 작은 빈티지 흰 창문.
**레이아웃** 좌상단 구름 조각 1 · 우측 큰 하늘 조각 1 · 하단 넓은 하늘 띠 1.
**질감** 종이 섬유, 주름, 불균일한 찢김, 미세한 어긋남, 레이어마다 부드러운 그림자.

```text
Transform this image into a vertical surreal mixed-media paper collage. Keep the girl in exactly the same position, size, angle, and falling pose as in the reference image—near the upper-middle area, head toward the left, legs raised toward the upper right, with bent arms and legs. Do not center, rotate, resize, or reposition her.
Render the girl as a simple blue-and-black handmade paper cutout with rough edges. Keep the soft white crumpled-paper background, torn pieces of blue sky with fluffy white clouds, and the small vintage white window beneath and slightly left of the girl. Match the same layout: one cloud piece at the top left, one large sky piece on the right, and one wide torn sky strip near the bottom.
Add visible paper fibers, wrinkles, imperfect torn edges, slight misalignment, and soft shadows beneath each layer. Minimal, airy, dreamy scrapbook aesthetic, blue-and-white palette, vertical 9:16.
Negative prompt: changed pose, changed position, centered girl, realistic person, extra people, extra limbs, extra windows, busy background, city, buildings, glossy 3D, clean vector art, text, play button, logo, watermark.
```

> 이 프롬프트가 유독 긴 이유는 **AI가 인물을 자동으로 중앙에 놓으려는 습성**을 막기 위해서다. "중앙 정렬 금지"를 지시문과 네거티브 양쪽에 이중으로 박아뒀다.

---

## 04 · Falling 3 — 3D 펀코 스타일 (이미지→3D 변환)

**용도** 전체를 3D로 변환
**범위** 인물·머리카락·옷·신발·하늘·구름·초록 언덕·지면 **전부 3D**. 일부만 3D로 두면 붕 뜬다.
**유지 조건** 헤어스타일, 의상, 옷 색상, 신발, 낙하 포즈, 신체 위치 전부 레퍼런스 그대로.
**배경** 밝은 하늘색, 볼류메트릭 구름 몇 개, 완만한 초록 언덕. **울타리·집·도로·창문 등 추가 오브젝트 금지.**
**캐릭터 톤** 귀여운 펀코 피규어 스타일.

```text
Transform this entire image into a fully 3D animated scene. Everything must be 3D: the girl, hair, clothes, shoes, sky, clouds, green hills, and ground 3d.
Keep the girl exactly recognizable with the same hairstyle, same outfit, same clothing colors, same shoes, same falling pose, and same body position as the reference.
Create a minimal 3D background bright light-blue sky, a few soft fluffy volumetric clouds, and simple smooth green rolling hills and ground. No fence, no houses, no road, no window, and no extra objects.
Clean high-quality 3D animation style, soft lighting, pastel colors, gentle shadows, simple composition, vertical frame. make girl like cuto funko 3d character
Negative prompt: 2D art, mixed media, paper collage, flat illustration, anime line art, white fence, houses, buildings, roads, changed outfit, changed hairstyle, changed pose, extra limbs, extra people, text, logo, watermark.
```

> 네거티브의 `paper collage, mixed media`는 **02·03번 스타일이 섞여 들어오는 걸 막는 장치**다. 같은 세션에서 이어 돌리면 앞 스타일이 잔상처럼 남는다.

---

## 스타일 비교

| | 02 흑백 콜라주 | 03 파랑 종이 | 04 3D 펀코 |
|---|---|---|---|
| 결과물 | 영상 | 이미지 | 3D 씬 |
| 톤 | 거칠고 도시적, 진 감성 | 미니멀·몽환·에어리 | 귀엽고 매끈함 |
| 배경 | 흑백 도시 | 흰 종이 + 하늘 조각 | 하늘색 + 초록 언덕 |
| 어울리는 콘텐츠 | 강한 훅, 반전 | 감성·에세이 | 밝은 정보성, 캐릭터 |

## 응용 메모

- **인물 성별을 바꾸려면** `girl` → `man` 등으로 바꾸고, 대명사(`she/her`)도 같이 맞춰야 한다. 한쪽만 바꾸면 결과가 흔들린다.
- **낙하 속도**를 조절하려면 `falls straight down`을 `falls slowly` / `plummets`로 바꾼다.
- **루프로 쓰려면** 진입과 이탈 프레임의 인물 크기를 맞춰야 이어붙였을 때 튀지 않는다.
- 01번(구멍)과 02번(무한낙하)을 **연달아 붙이면** "빠짐 → 낙하" 시퀀스가 된다. 인트로로 쓰기 좋은 조합.
