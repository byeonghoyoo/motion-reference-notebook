# Vox 스타일 모션그래픽 프롬프트

> 나레이션 있는 설명 영상(explainer)을 Higgsfield MCP로 통째로 뽑는 파이프라인.
> 하우스 스타일 2종 — **믹스드미디어 콜라주**(플랫 에디토리얼)와 **페이퍼 디오라마 다큐**(세피아 신문지 세계).

**출처** vox-motion-graphics SKILL.md + references (스킬 원본은 `~/.claude/skills/`에 설치)

파이프라인: `주제 → 리서치 → 스타일키 → 대본 → 블록 프롬프트 → 클립 → 보이스오버 → 어셈블`

핵심 원칙 하나 — 모든 프롬프트의 목표는 **모션 디자인된 에디토리얼 콜라주**지 촬영된 장면이 아니다. 사진은 콜라주 안의 요소로만 존재하고, 프레임 전체가 실사가 되는 일은 없다.

---

# 스타일 A · 믹스드미디어 콜라주

## 비주얼 어휘

블록마다 아래에서 2~3개를 골라 조합한다. 그 블록의 나레이션 문장을 **문자 그대로 그림으로 보여주는** 조합이어야 한다.

- **아카이브 컷아웃** — 인물·건물·사물 사진을 거친 흰 종이 테두리로 오려 붙임
- **플랫 컬러 필드** — 따뜻한 노랑, 오프화이트 종이, 딥 네이비, 코랄 레드. 블록당 지배색 1개
- **종이·인쇄 질감** — 그레인, 하프톤 점, 신문지, 찢긴 가장자리, 테이프 조각
- **손그림 주석** — 마커 원이 스스로 그려짐, 밑줄, 화살표. **글자는 절대 금지, 추상 획만**
- **추상 데이터 그래픽** — 막대가 자라고 선그래프가 그려짐. 숫자·축 텍스트 없음
- **지도** — 애니메이션 경로, 맥동하는 위치 점, 색이 차오르는 지역
- **가림·하이라이트 블록** — 색 바가 슬라이드, 스포트라이트가 하나만 남기고 나머지를 어둡게
- **스케일 비교** — 하나가 여러 줄로 증식, 작은 컷아웃 옆에 거대한 것

## 모션 어휘

빠른 ease-out 진입, 살짝 오버슛하며 제자리에 팝. "이거 봐" 비트에서는 느린 푸시인. 아이디어 전환에 휩팬이나 페이지 넘김. 레이어 간 패럴랙스 드리프트.

> **항상 뭔가 움직이되, 시끄러운 건 한 번에 하나만.**

## 스타일 토큰 (모든 블록 프롬프트의 STYLE REFERENCE 줄에 사용)

```text
editorial mixed-media collage, archival photo cutouts with white paper
borders, flat bold color fields, halftone and paper grain textures,
hand-drawn marker annotations, snappy motion-graphics animation,
non-photorealistic, no live-action
```

## 스타일 키 프롬프트 (16:9 전용, 기본 9:16은 프리셋 사용)

`generate_image` · `nano_banana_pro` · `aspect_ratio: "16:9"`

```text
Editorial mixed-media collage style swatch, Vox-documentary motion graphics
aesthetic: flat warm yellow and off-white paper background with halftone dot
texture, archival photo cutouts with rough white paper borders, torn paper
edges and tape strips, hand-drawn black marker circles and arrows, bold flat
color blocks in navy and coral, subtle paper grain and drop shadows.
Abstract composition only — no characters, no objects with faces, no
letters, no words, no numbers. Non-photorealistic, no live-action, no
realism, no 3D render.
```

## 블록 프롬프트 템플릿

블록당 1개, 라벨 붙이고, 타임코드 없이.

```text
Block {N}
STYLE REFERENCE: Match the attached style key EXACTLY — {STYLE tokens}.
SCENE: {이 블록의 나레이션을 그림으로 옮긴 콜라주 구성: 어떤 컷아웃, 어떤 컬러 필드, 어떤 주석·차트·지도}.
MOTION: {진입 안무 + 카메라 무브 + 샷 동안 무엇이 움직이는지}.
AUDIO: {앰비언트 베드 + 종이/휘익/틱 효과음 1~2개 — 음성·나레이션 없음}.
NEGATIVE: readable text, letters, words, numbers, captions, subtitles,
watermark, logo, photorealism, live-action footage, 3D render, lip-sync,
talking characters, color drift.
```

> NEGATIVE 줄은 **고정이다. 모든 블록에 그대로 복사**한다. 장면은 나레이션의 *생각*을 시각화해야지, 누가 그 말을 하는 걸 묘사하면 안 된다.

---

## 실전 예시

나레이션(Block 1): *"매일 인류는 20억 명을 먹일 수 있는 음식을 버린다. 그리고 대부분은 접시에 닿지도 못한다."*

```text
Block 1
STYLE REFERENCE: Match the attached style key EXACTLY — editorial mixed-media
collage, archival photo cutouts with white paper borders, flat bold color
fields, halftone and paper grain textures, hand-drawn marker annotations,
snappy motion-graphics animation, non-photorealistic, no live-action.
SCENE: A warm yellow paper background with halftone texture. Photo cutouts of
apples, bread loaves and a full dinner plate snap into a neat grid, then one
by one flip over and tumble downward off-frame into a torn-paper "bin" shape
at the bottom. A thick black marker circle draws itself around the last
remaining plate.
MOTION: Cutouts pop in with slight overshoot in quick succession; slow camera
push-in as they begin tumbling; the marker circle draws in one confident
stroke at the end.
AUDIO: Soft paper rustles and quick whoosh ticks as cutouts flip and fall,
low minimal ambient pulse underneath — no voice, no narration.
NEGATIVE: readable text, letters, words, numbers, captions, subtitles,
watermark, logo, photorealism, live-action footage, 3D render, lip-sync,
talking characters, color drift.
```

---

# 스타일 B · 페이퍼 디오라마 다큐

세피아 신문지로 만든 미니어처 세계, 눈에 검은 가림막을 한 컷아웃 인물, 유일한 번트오렌지 액센트, 레터프레스 소품 활자, 텅스텐 조명, 매크로 틸트시프트.

**언제 쓰나** — 브리프가 시네마틱·드라마틱·수사물 톤을 요구하거나, 주제가 지정학·돈·권력일 때.

## 스타일 토큰 (모든 클립 프롬프트의 첫 줄)

```text
cinematic vintage paper diorama, aged sepia newsprint world, monochrome
halftone print, monochrome archival cutout figures with black censor bars
over their eyes, single burnt-orange accent, distressed letterpress,
warm tungsten light, macro tilt-shift shallow depth of field, film grain,
handcrafted stop-motion paper feel, non-photorealistic, no live-action
```

## 스타일 키 프롬프트

`generate_image` · `nano_banana_pro` · 16:9

```text
Cinematic vintage paper diorama style swatch, documentary collage
aesthetic: a miniature three-dimensional landscape built entirely from
aged sepia newspaper sheets and cardboard, torn edges, layered paper
canyon walls of old newsprint, monochrome archival photo cutouts of
anonymous suited figures standing among the paper structures with black
censor bars over their eyes, one dominant burnt-orange paper prop as the
single color accent against the sepia world, distressed letterpress print
texture, warm tungsten documentary lighting with deep shadows, macro
tilt-shift lens look with shallow depth of field, film grain and dust.
Handcrafted physical paper materials only — no letters, no words, no
numbers, no logos. Non-photorealistic scene content, no live-action
people, stylized paper craft world.
```

## 소품 활자 — 이 스타일만의 예외

스타일 A는 클립 내 텍스트를 전부 금지하지만, **이 스타일은 소품 위에 짧은 레터프레스 텍스트를 얹는 게 시그니처**다.

- 씬당 라벨 1개, 1~2단어 또는 숫자 (`EXPIRED`, `1,000`, `AUGUST`)
- 항상 "distressed letterpress on a torn burnt-orange paper element"로 서술
- 네거티브에 반드시 울타리를 친다: `No text anywhere except "<LABEL>". No gibberish letters…`

## 페이크 원컷 블록 프롬프트 형태

클립 하나 = 끊기지 않는 카메라 무브 1개. 경계는 모션블러에 숨겨서 하드컷이 한 샷처럼 읽히게.

```text
<STYLE tokens> — shot as ONE continuous high-energy FPV camera move with
aggressive speed ramps.
The shot: [emerges from motion-blurred <previous element>] … [one impact
moment every ~3s: slam / stamp / shockwave / snap] … [ends fully
motion-blurred mid-<dive/whip/fall/flare>].
Sound design: [3–5 concrete diegetic events]. No speech.
No text anywhere except "<LABEL>". No gibberish letters, no captions,
no watermark, no photorealism, no live-action.
```

## 엔진 설정

```text
generate_video
  model: "seedance_2_0"
  duration: 10
  resolution: "720p"        # 45 cr / 1080p = 90 cr
  mode: "std"
  aspect_ratio: "16:9"
  genre: "noir"             # 클립 간 어두운 그레이딩 통일
  generate_audio: true      # 네이티브 효과음·드론 — 끄지 말 것
  medias: [ { value: "<style key>", role: "image_references" }, …props ]
```

Seedance는 프롬프트 안의 컷("Shot 1 … Cut to shot 2 …")을 그대로 실행하고, `speed ramp`·`FPV`·`whip pan`을 문자 그대로 읽는다. 불·불티 렌더가 특히 좋다. 네이티브 오디오(도화선 타는 소리, 드론, 충격음)는 보이스오버 아래서도 살아남으므로 프롬프트에서 설계한다 — `Sound design: … No speech.`

## 소품 재사용

소품을 1:1 · 플레인 배경 · 스타일 키 첨부로 미리 생성해두고, 클립마다 `image_references`로 같이 넣으면서 프롬프트에 "the X from the reference image"라고 쓴다. 이렇게 안 하면 클립마다 물건이 변형된다.

---

## 두 스타일 비교

| | A 믹스드미디어 | B 페이퍼 디오라마 |
|---|---|---|
| 톤 | 플랫 에디토리얼, 경쾌 | 시네마틱, 무겁고 어두움 |
| 색 | 노랑·오프화이트·네이비·코랄 | 세피아 + 번트오렌지 1색 |
| 클립 내 텍스트 | **전면 금지** | 소품 라벨 1개 허용 (시그니처) |
| 카메라 | 스내피한 모션그래픽 | FPV 페이크 원컷 + 스피드램프 |
| 어울리는 주제 | 데이터·일상·설명 | 지정학·돈·권력 |
