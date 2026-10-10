---
title: AI 영상 카메라 움직임 46종 실무 가이드
aliases:
  - AI 카메라 무빙 프롬프트
  - 팬 틸트 달리 줌 한글 가이드
tags: [디자인, AI영상, 카메라무빙, 영상프롬프트, 촬영기법]
created: 2026-10-10
source: https://aicameramovements.com/
---

# AI 영상 카메라 움직임 46종 실무 가이드

> [!abstract] 바로 쓰는 방법
> 원하는 장면을 정하고 → 아래 46종 중 움직임 하나를 고르고 → 한글 설명을 읽고 → 영어 예시의 대상과 장소를 바꿔 영상 생성 도구에 넣는다. 이미지로 시작한다면 같은 이미지를 입력하고, 그 이미지에서 무엇이 어떻게 움직일지 적는다.

> [!info] 원문과 보강 자료 구분
> 사용자가 보낸 Threads는 `@rneayan_official`이 카메라 프롬프트 사이트를 소개한 게시물이다. 연결된 사이트의 **7개 분류·46개 카드와 프롬프트 빌더 안내**를 확인했다. [S1, S2, S3]
> 이 노트는 원문 프롬프트 전체의 번역 복제본이 아니다. 항목을 빠짐없이 찾아볼 수 있도록 **기법 이름과 카드 번호를 대응**시키고, 설명·활용 상황·장면 예시는 새로 작성했다. 아래 46개 영어 코드 블록은 모두 독자적으로 만든 실무 예시이며 바로 위 한글이 해당 예시의 뜻이다. 원본 영어 프롬프트는 출처 사이트에서 확인할 수 있다.
> 46개 데모 영상 전체나 연결된 유튜브 영상의 재생 내용까지 검토한 것은 아니다. 실제 영상 생성 테스트도 수행하지 않았다.

## 1. 빠른 선택표

다음 추천은 원문 순위를 옮긴 것이 아니라 목적별로 직접 정리한 선택 기준이다.

| 만들고 싶은 장면 | 먼저 찾아볼 기법 | 선택 이유 |
|---|---|---|
| 제품의 세부 질감 강조 | 달리 인, 느린 줌 인 | 다가가는 공간감 또는 화면 확대를 선택할 수 있다. |
| 제품의 여러 면 소개 | 아크, 공전 | 대상의 각도를 바꿔 보여준다. |
| 조용한 고급 제품 컷 | 짧은 슬라이드, 고정 숏 | 작은 변화만으로 소재에 집중한다. |
| 카페·공간 소개 | 팬, 달리 아웃, 크레인 상승 | 화면 밖의 공간을 점진적으로 드러낸다. |
| 건축·긴 제품의 형태 공개 | 틸트, 수직 이동 | 위아래로 보는 각도 또는 촬영 높이를 바꾼다. |
| 패션·보행 장면 | 측면 추적, 뒤따르기 | 인물의 동작과 동선을 함께 보여준다. |
| 신발·바퀴 광고 | 낮은 추적 | 지면 가까이의 움직임이 중심이 된다. |
| 여행·풍경 도입부 | 드론 전진·후퇴, 고공 항공 | 지형과 목적지의 관계를 보여준다. |
| 코믹하거나 강한 전환 | 휩 팬, 초고속 줌 | 짧은 순간에 시선을 바꾼다. |
| 실감나는 일상 | 핸드헬드, 1인칭 시점 | 사람의 움직임과 시야를 표현한다. |
| 초현실 광고 | 연속 세계 전환 줌, 물체 통과 | 현실 촬영과 다른 전환을 만든다. |

## 2. 먼저 구분해야 할 카메라 움직임

![팬·수평 이동, 틸트·수직 이동, 달리·줌의 차이](첨부이미지/카메라_움직임_비교.png)

*직접 제작한 개념도. 파란색은 카메라, 주황색은 피사체, 보라색 화살표는 움직임이다. 위에서 본 그림과 옆에서 본 그림을 구분해서 읽는다. 실제 광학 시뮬레이션이나 생성 결과 화면은 아니다.*

| 비교 | 차이 | 프롬프트에 추가할 핵심 |
|---|---|---|
| 팬 / 수평 이동 | 팬은 제자리 회전, 수평 이동은 카메라 위치 자체의 이동 | ‘받침 고정’ 또는 ‘벽과 평행하게 이동’ |
| 틸트 / 수직 이동 | 틸트는 위아래 각도 변화, 수직 이동은 높이 변화 | ‘고정 피벗’ 또는 ‘렌즈를 수평으로 유지’ |
| 달리 / 줌 | 달리는 대상까지 거리를 바꾸고, 줌은 같은 위치에서 화각을 바꾼다. | ‘같은 초점거리로 전진’ 또는 ‘카메라 위치 고정’ |
| 아크 / 공전 | 둘 다 대상 주변 곡선 경로다. 짧은 각도 변화와 큰 회전을 구체적으로 구분한다. | ‘정면에서 3/4 측면’ 또는 ‘반 바퀴’ |
| 추적 / 일반 이동 | 추적은 움직이는 대상과의 관계가 중심이다. | ‘걷는 속도와 일치’, ‘얼굴 크기 유지’ |

팬·틸트·달리·줌 등 기본 용어의 뜻은 Runway의 공식 카메라 용어 자료와 대조했다. [S4] AI 결과가 실제 촬영의 기하학을 항상 정확히 따르는 것은 아니므로 전경·배경 관계를 눈으로 확인한다.

**추가 구분:** 타임랩스는 시간 압축, 틸트시프트는 렌즈·초점 표현, 1인칭은 시점이다. 전부 카메라 이동 자체를 뜻하지는 않는다. 사이트의 ‘특수’ 분류는 이러한 효과를 함께 모은 것으로 이해한다.

## 3. 프롬프트 작성 원칙

### 이미지에서 시작할 때

입력 이미지가 이미 제품, 조명, 배경, 구도를 보여준다면 동작 지시를 중심으로 적는다. Runway 공식 이미지→영상 가이드도 카메라·대상·환경의 움직임을 명확히 쓰고 단순하게 시작할 것을 권한다. [S5]

예를 들어 향수병 사진을 넣었다면 병 색깔과 배경을 길게 재설명하기보다 ‘카메라가 병 쪽으로 전진하고, 앞쪽 천과 뒤쪽 벽의 상대 위치가 변한다’고 적는다.

### 텍스트만으로 시작할 때

**대상과 장소 + 대상의 행동 + 카메라의 경로 + 속도 + 끝 구도**를 한 문단으로 정리한다. 텍스트→영상은 화면에 무엇이 있는지도 알려줘야 한다. Runway의 공식 안내는 시각 묘사와 움직임 묘사를 핵심 요소로 구분한다. [S6]

### 재사용 템플릿 — 직접 작성

```text
[대상]이 [장소]에 있다. 대상은 [행동]한다.
카메라는 [시작 위치·구도]에서 [방향·경로]로 [속도] 이동한다.
이동 중 [화면 안에서 유지할 대상·크기·높이]를 유지한다.
끝에서는 [마지막에 보여줄 것]이 보인다. [조명·분위기]의 연속된 한 장면이다.
```

모든 칸을 억지로 채울 필요는 없다. 시작과 끝이 분명한 짧은 지시부터 시도한다. Runway Gen-4 안내는 부정 명령보다 원하는 상태를 긍정적으로 묘사하는 방식을 권장한다. [S7] 다른 모델의 세부 문법이나 별도 네거티브 입력란까지 같다고 가정하지 않는다.

| 모호한 말 | 더 구체적인 지시 예시 |
|---|---|
| 영화처럼 멋지게 | 제품 정면에서 오른쪽 3/4 측면까지 천천히 곡선 이동 |
| 흔들지 마 | 안정된 수평과 일정한 카메라 높이 유지 |
| 제품을 돌려 보여줘 | 제품은 고정하고 카메라가 제품 주변을 반 바퀴 이동 |
| 쭉 확대해 | 카메라 위치 고정, 렌즈 줌으로 라벨이 크게 보일 때까지 확대 |
| 빠르게 전환 | 왼쪽 가방에서 오른쪽 신발로 한 번의 휩 팬 후 잠시 정지 |

## 4. 원본 사이트와 빌더 사용법

1. [카메라 움직임 사이트](https://aicameramovements.com/)에서 이름 검색 또는 분류 필터로 찾는다.
2. 카드의 반복 미리보기로 원하는 방향과 리듬을 비교한다.
3. 원문이 필요하면 **Copy prompt**, 내 상황 예시가 필요하면 이 문서의 코드 블록을 복사한다.
4. [Prompt Builder](https://aicameramovements.com/prompt-builder/)에서는 첫 이미지와 움직임을 정하고 대상·장소·행동·분위기 항목을 편집한 뒤 결과를 복사한다. 같은 이미지를 실제 영상 도구의 시작 이미지로 사용한다. [S3]

빌더에는 자동 인식 활성화 시 이미지가 분석 엔드포인트로 전달된다는 안내가 있다. ‘내 컴퓨터 안에서만 분석된다’고 해석하지 않는다. 실제 업로드와 영상 생성은 이번 문서 작성에서 수행하지 않았다.

사이트의 자료 열람과 외부 도구의 영상 생성은 별개다. **무료 참고 자료라는 표현이 연결된 영상 생성 서비스의 무료 사용을 뜻하지는 않는다.** 모델별 길이·화질·비율·비용은 실행 화면에서 확인한다.

## 5. 46종 전체 색인

‘원본 번호’는 사이트 카드와 대조하는 표식이다. `02B` 등 방향별 변형과 `S1~S6`도 각각 별도 항목으로 세어 총 46종이다. 분류는 원본을 따르지만 다음 장면·문구는 새 예시다.

| 원본 번호 | 분류 | 기법 | 한글 이름 |
|---|---|---|---|
| 01 | 팬·틸트 | Static shot | 고정 숏 |
| 02 | 팬·틸트 | Pan right | 오른쪽 팬 |
| 02B | 팬·틸트 | Pan left | 왼쪽 팬 |
| 03 | 팬·틸트 | Whip pan right | 오른쪽 휩 팬 |
| 03B | 팬·틸트 | Whip pan left | 왼쪽 휩 팬 |
| 04 | 팬·틸트 | Tilt up | 틸트 업 |
| 04B | 팬·틸트 | Tilt down | 틸트 다운 |
| 05 | 줌·렌즈 | Slow zoom in | 느린 줌 인 |
| 05B | 줌·렌즈 | Slow zoom out | 느린 줌 아웃 |
| 06 | 줌·렌즈 | Fast zoom in | 빠른 줌 인 |
| 06B | 줌·렌즈 | Fast zoom out | 빠른 줌 아웃 |
| 07A | 줌·렌즈 | Crash zoom in | 충격적인 초고속 줌 인 |
| 07B | 줌·렌즈 | Crash zoom out | 충격적인 초고속 줌 아웃 |
| 08 | 달리·추적 | Dolly in | 달리 인 |
| 09 | 달리·추적 | Dolly out | 달리 아웃 |
| 10 | 공간 이동 | Truck right | 오른쪽 수평 이동 |
| 10B | 공간 이동 | Truck left | 왼쪽 수평 이동 |
| 11A | 공간 이동 | Pedestal up | 수직 상승 이동 |
| 11B | 공간 이동 | Pedestal down | 수직 하강 이동 |
| 12 | 공간 이동 | Slider right | 짧은 오른쪽 슬라이드 |
| 12B | 공간 이동 | Slider left | 짧은 왼쪽 슬라이드 |
| 13 | 공간 이동 | Push past / pass-by shot | 앞의 물체를 스쳐 지나가기 |
| 14 | 공간 이동 | Arc right | 오른쪽 곡선 이동 |
| 14B | 공간 이동 | Arc left | 왼쪽 곡선 이동 |
| 15 | 공간 이동 | Orbit clockwise | 시계 방향 공전 |
| 15B | 공간 이동 | Orbit counterclockwise | 반시계 방향 공전 |
| 16 | 달리·추적 | Tracking shot | 이동하는 대상 따라가기 |
| 17 | 달리·추적 | Follow shot / over-the-shoulder | 뒤따르기·어깨 너머 구도 |
| 18 | 달리·추적 | Reverse tracking / walk-and-talk | 앞에서 물러나며 따라가기 |
| 19 | 달리·추적 | Side tracking | 옆에서 나란히 따라가기 |
| 20 | 달리·추적 | Low tracking | 낮은 높이에서 따라가기 |
| 21 | 달리·추적 | Vehicle tracking | 차량과 함께 이동하기 |
| 22 | 달리·추적 | Chase shot | 빠르게 추격하기 |
| 23 | 사람의 카메라 | Handheld shot | 손으로 든 카메라 느낌 |
| 24 | 사람의 카메라 | Body-mounted camera / Snorricam | 몸에 고정된 카메라 |
| 25 | 드론·크레인 | Crane up | 크레인 상승 |
| 25B | 드론·크레인 | Crane down | 크레인 하강 |
| 26 | 드론·크레인 | Drone push in | 드론 전진 |
| 26B | 드론·크레인 | Drone pull back | 드론 후퇴 |
| 27 | 드론·크레인 | Helicopter shot | 고공 항공 숏 |
| S1 | 특수 표현 | First-person view | 1인칭 시점 |
| S2 | 특수 표현 | Tilt-shift | 미니어처 같은 선택적 초점 |
| S3 | 특수 표현 | Infinite zoom | 연속 세계 전환 줌 |
| S4 | 특수 표현 | Earth zoom out | 지구 규모로 빠져나가기 |
| S5 | 특수 표현 | Time-lapse | 타임랩스 |
| S6 | 특수 표현 | Pass-through objects | 물체를 통과하는 전환 |


## 6. 기법별 한글 설명과 복붙 예시

각 항목의 한글 문장은 영어 예시의 뜻을 풀어쓴 것이다. 한글을 그대로 사용하거나 영어 코드 블록을 복사해도 된다. 지원 언어와 해석은 사용하는 모델에서 확인한다. 원본과 다른 새로운 예시 장면이므로 실제 제품을 사용할 때는 대상·장소·행동을 자신의 소재에 맞춘다.

큰 회전, 빠른 전환, 보이지 않던 뒷면 공개는 모델이 새로운 영역을 채워야 한다. 특정 제품의 정확한 외형이 중요하면 작은 이동부터 시작하고 결과를 검수하는 것이 이 가이드의 실무 권장 방식이다.

### 01. 고정 숏 · Static shot

**원본 카드:** 01 · **분류:** 팬·틸트

**쓸 상황:** 제품의 작은 움직임만 보여주기

**한글 설명·예시 뜻:** 작업대 위 재봉틀을 고정된 정면 구도로 촬영한다. 바늘과 원단만 움직이고 화면 가장자리의 도구는 같은 위치를 유지한다. 마지막에는 바느질이 멈추고 완성된 선이 보인다.

```text
A locked camera observes a sewing machine on a workbench. Only the needle and fabric move; tools at the edges retain their positions. Stitching stops to reveal a neat finished seam.
```

### 02. 오른쪽 팬 · Pan right

**원본 카드:** 02 · **분류:** 팬·틸트

**쓸 상황:** 공간을 순서대로 소개하기

**한글 설명·예시 뜻:** 카메라의 받침 위치를 고정하고 오른쪽으로 천천히 방향을 돌린다. 꽃가게의 포장대에서 시작해 오른쪽 창가의 꽃다발을 보여주며 끝난다. 꽃다발은 가만히 있다.

```text
From a stationary tripod, pan right across a flower shop, beginning at the wrapping counter and arriving at a bouquet beside the window. The bouquet stays motionless in warm afternoon light.
```

### 03. 왼쪽 팬 · Pan left

**원본 카드:** 02B · **분류:** 팬·틸트

**쓸 상황:** 오른쪽 대상에서 왼쪽 대상으로 시선 옮기기

**한글 설명·예시 뜻:** 카메라는 제자리에서 왼쪽으로 방향만 돌린다. 서재의 책장을 먼저 보여준 뒤 왼쪽에 놓인 독서 의자와 탁상등에서 멈춘다. 수평을 유지한다.

```text
Pan left from a bookshelf toward a reading chair and table lamp. The tripod remains in its original location throughout. Arrive at the chair with a level horizon and soft evening illumination.
```

### 04. 오른쪽 휩 팬 · Whip pan right

**원본 카드:** 03 · **분류:** 팬·틸트

**쓸 상황:** 빠른 시선 전환으로 반전 주기

**한글 설명·예시 뜻:** 빈 접시를 잠깐 보여준 뒤 카메라를 오른쪽으로 빠르게 돌려 완성된 디저트에 도착한다. 회전 중에만 짧게 흐려지고 마지막 디저트는 또렷하게 보인다.

```text
Briefly frame an empty plate, then whip pan right to a finished strawberry dessert on the adjacent counter. A brief streak of blur bridges the views before the dessert becomes crisp and readable.
```

### 05. 왼쪽 휩 팬 · Whip pan left

**원본 카드:** 03B · **분류:** 팬·틸트

**쓸 상황:** 연관된 두 대상 빠르게 연결하기

**한글 설명·예시 뜻:** 운동 가방을 보여준 뒤 왼쪽으로 빠르게 팬하여 옆에 놓인 운동화에 도착한다. 시작과 끝에는 잠깐 멈춰 대상을 알아볼 수 있게 한다.

```text
Hold on a gym bag, whip pan left toward a pair of trainers beside it, then hold on the shoes. Use one brisk horizontal turn with clearly readable compositions on either side.
```

### 06. 틸트 업 · Tilt up

**원본 카드:** 04 · **분류:** 팬·틸트

**쓸 상황:** 높이나 전체 실루엣 공개하기

**한글 설명·예시 뜻:** 카메라 받침은 제자리에 둔다. 플로어 램프의 받침에서 시작해 렌즈를 위로 기울이며 기둥과 갓을 차례로 보여준다. 갓과 빛 번짐이 보이는 구도로 끝난다.

```text
At a fixed tripod position, tilt upward from the base of a floor lamp along its stem to the shade. Finish with the illuminated shade surrounded by a little breathing room.
```

### 07. 틸트 다운 · Tilt down

**원본 카드:** 04B · **분류:** 팬·틸트

**쓸 상황:** 위쪽 정보에서 아래쪽 결과로 연결하기

**한글 설명·예시 뜻:** 고정된 위치에서 카메라의 각도를 아래로 기울인다. 카페의 펜던트 조명에서 시작하여 아래 테이블의 커피 두 잔을 보여준다. 마지막에는 테이블 위 구도를 유지한다.

```text
Tilt down from pendant lights to two cups of coffee on the table beneath them. The camera pivot stays in place. Finish with both cups visible within a balanced tabletop composition.
```

### 08. 느린 줌 인 · Slow zoom in

**원본 카드:** 05 · **분류:** 줌·렌즈

**쓸 상황:** 시선과 감정 집중하기

**한글 설명·예시 뜻:** 정물화 전체를 보여준 뒤 카메라 위치는 그대로 두고 렌즈 줌으로 서서히 작은 붓 자국을 확대한다. 마지막에는 물감의 질감이 보인다.

```text
A stationary camera slowly zooms from an entire still-life painting into a cluster of visible brushstrokes. Increase magnification gently until the paint texture becomes the dominant detail in the frame.
```

### 09. 느린 줌 아웃 · Slow zoom out

**원본 카드:** 05B · **분류:** 줌·렌즈

**쓸 상황:** 대상의 주변 맥락 공개하기

**한글 설명·예시 뜻:** 손으로 만든 머그잔의 무늬를 가까이 보여준다. 카메라 위치를 고정한 채 천천히 줌 아웃하여 머그잔과 작업대의 도구를 함께 보여준다.

```text
Begin on the painted pattern of a handmade mug. With the camera stationary, slowly zoom out until the mug and several pottery tools share the frame. Quiet studio light remains consistent.
```

### 10. 빠른 줌 인 · Fast zoom in

**원본 카드:** 06 · **분류:** 줌·렌즈

**쓸 상황:** 특정 디테일을 빠르게 강조하기

**한글 설명·예시 뜻:** 책상 전체에서 시작해 고정된 카메라의 빠른 줌으로 키보드의 노란 키 하나에 집중한다. 확대가 끝나면 노란 키가 보이는 구도를 유지한다.

```text
From a full desk composition, execute a quick optical zoom toward one yellow key on a keyboard. The camera stays planted while the yellow key becomes the clear focal detail, then hold.
```

### 11. 빠른 줌 아웃 · Fast zoom out

**원본 카드:** 06B · **분류:** 줌·렌즈

**쓸 상황:** 예상보다 넓은 상황 보여주기

**한글 설명·예시 뜻:** 한 개의 색연필 끝을 가까이 보여준 뒤 빠르게 줌 아웃한다. 같은 위치에서 촬영하며 주변에 원형으로 배열된 여러 색연필이 드러난다.

```text
Start tightly on a coloured pencil tip, then quickly zoom out from the same camera position to reveal a circular arrangement of pencils. End with the complete colour wheel visible on the desk.
```

### 12. 충격적인 초고속 줌 인 · Crash zoom in

**원본 카드:** 07A · **분류:** 줌·렌즈

**쓸 상황:** 짧은 놀람이나 코믹한 강조 만들기

**한글 설명·예시 뜻:** 장난감 로봇 전체를 잠깐 보여준 뒤 렌즈 줌을 순간적으로 당겨 반짝이는 눈을 크게 보여준다. 로봇은 그 자리에 있고 마지막 눈 구도는 잠깐 유지한다.

```text
Frame a small toy robot, then crash zoom into its blinking eyes in one sudden punch. The robot remains standing on the shelf. Hold the enlarged eyes long enough for the reaction to register.
```

### 13. 충격적인 초고속 줌 아웃 · Crash zoom out

**원본 카드:** 07B · **분류:** 줌·렌즈

**쓸 상황:** 숨겨진 규모를 갑자기 드러내기

**한글 설명·예시 뜻:** 작은 선물 상자를 가까이 보여주다가 갑자기 줌 아웃한다. 상자가 거대한 종이 케이크 장식 위에 놓여 있다는 사실을 드러내고 넓은 구도를 유지한다.

```text
A crash zoom out reveals that a tiny gift box sits atop an enormous decorative paper cake. Keep the camera rooted to one position and finish on the full playful installation.
```

### 14. 달리 인 · Dolly in

**원본 카드:** 08 · **분류:** 달리·추적

**쓸 상황:** 제품으로 다가가는 입체감 만들기

**한글 설명·예시 뜻:** 카메라가 향수병을 향해 천천히 전진한다. 렌즈 화각은 유지하고 가까운 천과 먼 벽의 상대적인 위치가 달라지게 한다. 향수병 앞의 가까운 구도에서 멈춘다.

```text
Advance the camera toward a perfume bottle between folded linen and a distant wall. Keep the focal length unchanged so the foreground shifts against the background. End with the bottle occupying most of the frame.
```

### 15. 달리 아웃 · Dolly out

**원본 카드:** 09 · **분류:** 달리·추적

**쓸 상황:** 주인공에서 주변 공간으로 확장하기

**한글 설명·예시 뜻:** 카메라가 피아노 건반 가까이에서 뒤로 이동한다. 같은 화각을 유지하며 의자와 연습실을 차례로 드러낸다. 마지막에는 피아노와 주변 공간이 함께 보인다.

```text
Retreat from the keys of an upright piano at a fixed focal length. As the camera travels backward, reveal the bench and the surrounding practice room. Finish with the instrument grounded in its environment.
```

### 16. 오른쪽 수평 이동 · Truck right

**원본 카드:** 10 · **분류:** 공간 이동

**쓸 상황:** 피사체 옆으로 지나가는 공간감 만들기

**한글 설명·예시 뜻:** 카메라 몸체가 전시장 벽과 평행하게 오른쪽으로 이동한다. 렌즈는 정면 벽을 바라보고, 앞쪽 기둥과 뒤쪽 액자의 위치 차이가 드러난다.

```text
Translate the camera right along a gallery wall while its lens continues facing the wall. A nearby column crosses the view faster than the framed artwork behind it, clearly showing lateral parallax.
```

### 17. 왼쪽 수평 이동 · Truck left

**원본 카드:** 10B · **분류:** 공간 이동

**쓸 상황:** 공간 레이어를 왼쪽 이동으로 보여주기

**한글 설명·예시 뜻:** 카메라가 주방 카운터와 나란히 왼쪽으로 움직인다. 렌즈 방향은 유지하며 앞쪽 허브 화분과 뒤쪽 조리 도구의 상대 위치가 달라지는 모습을 보여준다.

```text
Move the camera left parallel to a kitchen counter, maintaining its viewing direction. Foreground herb pots shift against the utensils on the back wall. End with a wooden chopping board clearly visible.
```

### 18. 수직 상승 이동 · Pedestal up

**원본 카드:** 11A · **분류:** 공간 이동

**쓸 상황:** 각도 대신 촬영 높이 바꾸기

**한글 설명·예시 뜻:** 카메라 전체가 진열 선반 앞에서 수직으로 올라간다. 렌즈는 수평을 유지하며 아래쪽 도자기에서 위쪽 도자기 높이로 이동한다. 위 선반을 정면으로 보며 끝난다.

```text
Raise the entire camera vertically in front of a display shelf, keeping the lens level. Travel from the lower ceramic pieces to the upper shelf and finish at the height of a blue vase.
```

### 19. 수직 하강 이동 · Pedestal down

**원본 카드:** 11B · **분류:** 공간 이동

**쓸 상황:** 높은 위치에서 낮은 제품 높이로 이동하기

**한글 설명·예시 뜻:** 렌즈를 수평으로 유지한 채 카메라 전체를 수직으로 내린다. 작업대 위쪽 선반에서 시작해 테이블 위에 놓인 가죽 지갑 높이에 도착한다.

```text
Lower the complete camera vertically from an upper workshop shelf to tabletop height. The lens remains level as a leather wallet comes into view. Finish with the wallet facing the viewer squarely.
```

### 20. 짧은 오른쪽 슬라이드 · Slider right

**원본 카드:** 12 · **분류:** 공간 이동

**쓸 상황:** 작은 제품에 섬세한 입체감 더하기

**한글 설명·예시 뜻:** 시계 앞에서 카메라를 오른쪽으로 아주 짧게 이동한다. 시계는 그대로 있고 앞쪽 꽃잎과 뒤쪽 천의 위치 차이가 조금만 변한다. 차분한 제품 컷으로 마친다.

```text
Make a short rightward slider move past a wristwatch. A petal near the lens drifts relative to the cloth behind the watch. Keep the travel restrained and the watch face easy to inspect.
```

### 21. 짧은 왼쪽 슬라이드 · Slider left

**원본 카드:** 12B · **분류:** 공간 이동

**쓸 상황:** 정적인 음식 컷에 미세한 움직임 주기

**한글 설명·예시 뜻:** 베이커리 접시 앞에서 카메라를 왼쪽으로 조금 이동한다. 앞쪽 포크와 뒤쪽 빵의 상대 위치가 변하고 빵의 모양은 유지된다.

```text
Slide a small distance left beside a plate of pastries. The nearby fork shifts across the pastry arrangement, producing gentle depth. Keep the food intact and finish with the main pastry unobstructed.
```

### 22. 앞의 물체를 스쳐 지나가기 · Push past / pass-by shot

**원본 카드:** 13 · **분류:** 공간 이동

**쓸 상황:** 가려진 공간을 자연스럽게 공개하기

**한글 설명·예시 뜻:** 카메라가 커튼 가장자리 옆의 열린 공간을 따라 전진한다. 커튼이 렌즈 가까이를 스쳐 지나간 뒤 안쪽의 독서 코너가 드러난다.

```text
Glide forward through the open gap beside a curtain. Its edge sweeps close to the lens before revealing a reading nook with a chair and books. The move ends inside the inviting corner.
```

### 23. 오른쪽 곡선 이동 · Arc right

**원본 카드:** 14 · **분류:** 공간 이동

**쓸 상황:** 제품의 정면과 옆면 함께 보여주기

**한글 설명·예시 뜻:** 카메라가 고정된 가방 앞에서 오른쪽으로 완만한 곡선을 그리며 이동한다. 가방과 거리를 비슷하게 유지하고 정면에서 3분의 1 측면 정도로 각도가 변한다.

```text
Travel on a shallow curve to the right around a stationary handbag. Maintain a similar working distance while revealing a three-quarter view of its side pocket. Keep the entire bag within frame.
```

### 24. 왼쪽 곡선 이동 · Arc left

**원본 카드:** 14B · **분류:** 공간 이동

**쓸 상황:** 제품의 반대쪽 디테일 공개하기

**한글 설명·예시 뜻:** 스피커 정면에서 시작하여 카메라가 왼쪽으로 곡선을 그린다. 스피커 자체는 회전하지 않고 카메라 위치가 바뀌면서 왼쪽 측면이 드러난다.

```text
Curve the camera left around a stationary speaker, moving from its front grille toward a three-quarter view of the left side. The speaker remains fixed on the table as the background changes perspective.
```

### 25. 시계 방향 공전 · Orbit clockwise

**원본 카드:** 15 · **분류:** 공간 이동

**쓸 상황:** 대상의 여러 면을 둘러보기

**한글 설명·예시 뜻:** 위에서 내려다봤을 때 시계 방향으로 카메라가 조각상 주변을 반 바퀴 이동한다. 조각상은 고정되어 있고 카메라는 계속 조각상을 바라본다. 정면에서 뒷면으로 도착한다.

```text
Viewed from above, orbit clockwise halfway around a stationary sculpture, travelling from its front to its back. Aim the camera toward the sculpture throughout and preserve a consistent distance from it.
```

### 26. 반시계 방향 공전 · Orbit counterclockwise

**원본 카드:** 15B · **분류:** 공간 이동

**쓸 상황:** 반대 방향으로 대상의 공간감 탐색하기

**한글 설명·예시 뜻:** 위에서 봤을 때 반시계 방향으로 카메라가 의자 주변을 반 바퀴 돈다. 의자는 회전하지 않는다. 의자 정면에서 시작해 등받이 뒤쪽을 보여주며 끝난다.

```text
Orbit counterclockwise, as seen from overhead, halfway around a stationary designer chair. Begin at the front and arrive behind the backrest, keeping the chair in view while the room changes around it.
```

### 27. 이동하는 대상 따라가기 · Tracking shot

**원본 카드:** 16 · **분류:** 달리·추적

**쓸 상황:** 이동 동선에 관객을 동행시키기

**한글 설명·예시 뜻:** 전시장 안을 걷는 큐레이터를 카메라가 따라 이동한다. 큐레이터가 속도를 줄이면 카메라도 함께 느려지고 몸 전체가 계속 보인다.

```text
Track a curator walking through an exhibition, adjusting the camera's travel to her pace. Preserve a full-body view as she slows beside a painting, allowing the gallery surroundings to move behind her.
```

### 28. 뒤따르기·어깨 너머 구도 · Follow shot / over-the-shoulder

**원본 카드:** 17 · **분류:** 달리·추적

**쓸 상황:** 목적지로 들어가는 몰입감 만들기

**한글 설명·예시 뜻:** 사람의 뒤에서 어깨와 머리 일부를 화면 앞쪽에 두고 도서관 복도를 따라간다. 카메라는 걷는 속도를 맞추며 앞쪽 열린 열람실까지 함께 간다.

```text
Follow a visitor from behind along a library corridor, including one shoulder and the back of the head near the frame edge. Match the walking pace until the open reading room appears ahead.
```

### 29. 앞에서 물러나며 따라가기 · Reverse tracking / walk-and-talk

**원본 카드:** 18 · **분류:** 달리·추적

**쓸 상황:** 걷는 인물의 표정 보여주기

**한글 설명·예시 뜻:** 갤러리 안에서 걸어오는 디자이너 앞에서 카메라가 뒤로 이동한다. 얼굴과 상반신의 크기를 비슷하게 유지하고 자연스러운 손짓을 보여준다.

```text
Move backward ahead of a designer walking through a gallery. Match her approach so her face and upper body retain a similar size. Capture a small natural hand gesture as artwork passes behind her.
```

### 30. 옆에서 나란히 따라가기 · Side tracking

**원본 카드:** 19 · **분류:** 달리·추적

**쓸 상황:** 보행·달리기의 리듬 강조하기

**한글 설명·예시 뜻:** 산책로를 걷는 사람 옆에서 카메라가 같은 속도로 평행 이동한다. 인물의 옆모습을 유지하고 발걸음과 배경의 흐름을 함께 보여준다.

```text
Travel parallel beside a person walking along a shaded path. Match the walking speed and maintain a clear side profile, letting the repeating trees behind the walker communicate the rhythm of forward travel.
```

### 31. 낮은 높이에서 따라가기 · Low tracking

**원본 카드:** 20 · **분류:** 달리·추적

**쓸 상황:** 신발·바퀴·바닥 움직임 강조하기

**한글 설명·예시 뜻:** 카메라를 신발 높이에 두고 걷는 운동화 옆에서 따라간다. 지면과 발의 움직임이 선명하고 발목 아래 구도가 유지된다.

```text
Track beside a pair of trainers at ankle height as their wearer walks across a tiled floor. Maintain the low viewpoint and keep each footfall readable while floor markings slide past.
```

### 32. 차량과 함께 이동하기 · Vehicle tracking

**원본 카드:** 21 · **분류:** 달리·추적

**쓸 상황:** 차체 형태와 주행감 함께 보여주기

**한글 설명·예시 뜻:** 해안도로를 달리는 파란 밴 옆에서 카메라가 속도를 맞춰 이동한다. 밴은 화면 안에서 크기가 비슷하게 유지되고 도로와 바다는 뒤로 흐른다.

```text
Travel alongside a blue van on a coastal road, matching its speed so the vehicle holds a similar size in frame. Roadside markers and the sea drift behind its clearly defined bodywork.
```

### 33. 빠르게 추격하기 · Chase shot

**원본 카드:** 22 · **분류:** 달리·추적

**쓸 상황:** 움직임의 긴장감 만들기

**한글 설명·예시 뜻:** 숲길을 달리는 산악자전거 뒤에서 빠르게 따라간다. 굽은 길에서 카메라가 반응하며 방향을 바꾸고 라이더는 계속 화면 안에 있다.

```text
Chase a mountain biker along a winding woodland trail from behind. React to the rider's turns with energetic camera adjustments while keeping the cyclist visible and the route ahead understandable.
```

### 34. 손으로 든 카메라 느낌 · Handheld shot

**원본 카드:** 23 · **분류:** 사람의 카메라

**쓸 상황:** 생활감과 현장감 더하기

**한글 설명·예시 뜻:** 공방에서 흙을 다듬는 도예가를 손에 든 카메라처럼 촬영한다. 작은 몸 움직임 정도의 흔들림을 주고 손과 도자기가 계속 읽히게 한다.

```text
Observe a potter shaping clay with a handheld documentary feel. Let small body-driven adjustments affect the frame while the hands and vessel remain readable. Gentle workshop light supports an intimate everyday atmosphere.
```

### 35. 몸에 고정된 카메라 · Body-mounted camera / Snorricam

**원본 카드:** 24 · **분류:** 사람의 카메라

**쓸 상황:** 인물은 고정하고 주변 움직임 강조하기

**한글 설명·예시 뜻:** 카메라가 인물의 몸에 연결되어 얼굴과의 위치 관계가 유지된다. 인물이 복도를 걸으면 얼굴은 화면 중앙에 있고 배경이 인물의 몸 움직임에 따라 흔들린다.

```text
Use a body-mounted camera facing a person walking through a corridor. Their face stays close and fixed relative to the frame while the hallway shifts with each step, conveying an inward, unsettled mood.
```

### 36. 크레인 상승 · Crane up

**원본 카드:** 25 · **분류:** 드론·크레인

**쓸 상황:** 행사장이나 공간의 규모 드러내기

**한글 설명·예시 뜻:** 테이블 가까이에서 시작한 카메라가 위로 올라가며 야외 정원의 여러 테이블 배치를 보여준다. 마지막에는 정원의 전체 구성이 읽힌다.

```text
Rise above a single garden table in a smooth crane move, gradually revealing the arrangement of tables throughout the courtyard. Finish at an elevated viewpoint where the event layout becomes clear.
```

### 37. 크레인 하강 · Crane down

**원본 카드:** 25B · **분류:** 드론·크레인

**쓸 상황:** 전체 공간에서 중요한 대상으로 도착하기

**한글 설명·예시 뜻:** 작업실을 높은 곳에서 보여준 뒤 부드럽게 내려와 중앙 작업대 위의 종이 건축 모형에 가까워진다. 마지막에는 모형이 주인공이 된다.

```text
Descend from an elevated view of a studio toward a paper architecture model on the central workbench. Let the surrounding room give way to the model as the camera approaches its display height.
```

### 38. 드론 전진 · Drone push in

**원본 카드:** 26 · **분류:** 드론·크레인

**쓸 상황:** 목적지에 다가가는 항공 도입부

**한글 설명·예시 뜻:** 넓은 초원 위를 떠서 작은 온실을 향해 전진한다. 이동 경로 앞에 온실이 보이고 가까워질수록 유리 구조가 선명해진다.

```text
Fly forward over an open meadow toward a small glass greenhouse. Keep the destination in view during the approach, allowing its structure to become clearer as the airborne camera closes the distance.
```

### 39. 드론 후퇴 · Drone pull back

**원본 카드:** 26B · **분류:** 드론·크레인

**쓸 상황:** 대상 주변 풍경을 넓게 공개하기

**한글 설명·예시 뜻:** 호숫가의 작은 오두막을 향한 구도에서 공중으로 뒤로 이동한다. 오두막은 계속 보이고 호수와 숲이 점점 더 넓게 드러난다.

```text
Retreat through the air from a lakeside cabin while continuing to face it. Reveal more shoreline and forest around the cabin, ending on a broad landscape that still makes its location understandable.
```

### 40. 고공 항공 숏 · Helicopter shot

**원본 카드:** 27 · **분류:** 드론·크레인

**쓸 상황:** 넓은 지형과 이동 경로 보여주기

**한글 설명·예시 뜻:** 높은 곳에서 큰 강을 따라 완만하게 이동하며 강 굽이와 양쪽 들판을 넓게 보여준다. 가까운 물체보다 지형 전체가 중심이 된다.

```text
From high altitude, travel along a broad river bend with a gentle flight path. Keep the river and fields visible at landscape scale, emphasising the shape of the terrain in clear morning light.
```

### 41. 1인칭 시점 · First-person view

**원본 카드:** S1 · **분류:** 특수 표현

**쓸 상황:** 시청자가 직접 행동하는 느낌 만들기

**한글 설명·예시 뜻:** 내 눈높이에서 꽃가게 안으로 다가가는 장면이다. 화면 아래의 손이 꽃다발을 집어 들고, 시점은 꽃다발을 바라보며 자연스럽게 따라 움직인다.

```text
From a first-person viewpoint, approach a florist's counter. A hand enters from below and lifts a bouquet, with the viewpoint responding naturally to the action. Finish looking at the flowers being held.
```

### 42. 미니어처 같은 선택적 초점 · Tilt-shift

**원본 카드:** S2 · **분류:** 특수 표현

**쓸 상황:** 도시를 장난감 모형처럼 표현하기

**한글 설명·예시 뜻:** 높은 사선 시점에서 작은 광장을 보여준다. 광장 중앙의 좁은 띠만 선명하고 위아래는 부드럽게 흐리다. 사람들이 움직이며 모형 같은 느낌을 만든다.

```text
View a town square from a high oblique angle with a miniature tilt-shift look. A narrow focus band crosses the central paving while areas above and below soften. Tiny pedestrians move through the square.
```

### 43. 연속 세계 전환 줌 · Infinite zoom

**원본 카드:** S3 · **분류:** 특수 표현

**쓸 상황:** 반복되는 패턴으로 초현실 전환 만들기

**한글 설명·예시 뜻:** 찻잔 안의 원형 무늬로 계속 확대해 들어간다. 무늬가 원형 정원으로 이어지고 정원 중앙 분수로 다시 들어가는 연속적인 시각 변화를 만든다.

```text
Zoom into a circular pattern inside a teacup, revealing it as a round garden. Continue toward the central fountain as the next visual destination. Keep each transition centred for a surreal nested-world effect.
```

### 44. 지구 규모로 빠져나가기 · Earth zoom out

**원본 카드:** S4 · **분류:** 특수 표현

**쓸 상황:** 지역에서 지구 전체로 스케일 확장하기

**한글 설명·예시 뜻:** 가상의 광장 중앙에서 시작해 도시, 해안, 대륙, 지구로 점점 넓어지는 시각적 전환을 만든다. 실제 지리 자료가 아닌 스타일화된 개념 영상이다.

```text
Create a stylised scale transition from a fictional town square to its city, coastline, continent and finally Earth in space. Preserve a central visual anchor as each larger scale replaces the previous view.
```

### 45. 타임랩스 · Time-lapse

**원본 카드:** S5 · **분류:** 특수 표현

**쓸 상황:** 시간의 흐름과 환경 변화 보여주기

**한글 설명·예시 뜻:** 카메라를 창가의 책상에 고정한다. 햇빛과 그림자가 빠르게 이동하며 오후에서 해질녘으로 변한다. 책상과 가구는 같은 위치를 유지한다.

```text
Hold a fixed view of a desk beside a window as daylight rapidly shifts from afternoon to sunset. Shadows sweep across the surface while the desk and furniture remain anchored in the same composition.
```

### 46. 물체를 통과하는 전환 · Pass-through objects

**원본 카드:** S6 · **분류:** 특수 표현

**쓸 상황:** 겉모습에서 내부 세계로 넘어가기

**한글 설명·예시 뜻:** 카메라가 포장 상자 정면에 다가가 그래픽적인 단면 전환으로 상자 내부에 들어간다. 안쪽의 제품 배열을 보여주는 초현실적인 제품 소개다.

```text
Approach the front of a presentation box and pass through it with a deliberate graphic cutaway transition. Arrive inside to reveal the neatly arranged products, treating the passage as a stylised visual effect.
```


## 7. 바로 활용하는 세 가지 촬영 구성

아래 시간은 편집 설계 예시다. 하나의 프롬프트로 여러 움직임을 한꺼번에 요구하기보다 각 숏을 별도로 생성한 뒤 편집하면 원인을 구분하기 쉽다. 실제 생성 길이는 도구의 지원 범위에 맞춘다.

### 제품 소개 — 약 15초

| 순서 | 목표 시간 | 움직임 | 전달 내용 |
|---|---|---|---|
| 도입 | 0~4초 | 고정 숏 또는 짧은 슬라이드 | 어떤 제품인지 보여준다. |
| 디테일 | 4~9초 | 달리 인 | 재질과 주요 부분을 강조한다. |
| 마무리 | 9~15초 | 짧은 아크 후 안정된 구도 | 입체감과 브랜드 표시 공간을 확보한다. |

자막·정확한 로고가 중요하면 생성 영상 위에 편집 단계에서 올리는 방법도 고려한다. 모델에 글자를 그리도록 요청한 결과는 별도 검수가 필요하다.

### 카페·숙소 소개 — 약 18초

| 순서 | 움직임 | 소재 준비 |
|---|---|---|
| 외부에서 접근 | 드론 전진 또는 달리 인 | 실제 외관과 접근 방향을 보여주는 자료 |
| 공간 공개 | 팬 또는 달리 아웃 | 소개할 공간의 구조가 명확한 이미지 |
| 디테일 | 슬라이드 | 메뉴·침구·소품의 가까운 사진 |

장소를 사실적으로 소개할 목적이면 존재하지 않는 방, 창문, 시설이 생기지 않았는지 확인한다.

### 패션·신발 소개 — 약 15초

| 순서 | 움직임 | 초점 |
|---|---|---|
| 보행 도입 | 측면 추적 | 옷의 실루엣과 걸음 리듬 |
| 제품 강조 | 낮은 추적 | 신발 또는 바지 밑단 |
| 인물 마무리 | 앞에서 물러나며 추적 | 표정과 상반신 |

## 8. 결과가 틀릴 때 수정하기

| 증상 | 가능한 원인 — 진단 가설 | 다음 시도 |
|---|---|---|
| 카메라 대신 제품이 회전 | 누가 움직이는지 불명확 | 제품은 제자리에 있고 카메라가 이동한다고 적는다. |
| 달리 요청인데 단순 확대 | 공간 이동 지시 부족 | 가까운 전경과 먼 배경을 지정하고 상대 위치 변화를 적는다. |
| 팬 요청인데 옆으로 이동 | 방향만 적고 회전 중심을 생략 | 받침 위치를 고정하고 제자리 회전이라고 적는다. |
| 틸트와 수직 이동이 섞임 | 높이와 각도 혼동 | 카메라 높이 또는 렌즈 각도 중 무엇이 유지되는지 적는다. |
| 반대 방향으로 공전 | 시계 방향의 기준이 모호 | 위에서 본 방향과 시작·도착 면을 함께 적는다. |
| 마지막 대상이 프레임 밖 | 종료 구도가 없음 | 마지막에 어떤 대상이 어느 정도 크기로 보일지 적는다. |
| 갑작스러운 컷이 발생 | 너무 많은 사건·장소 변화 | 하나의 이동으로 줄이고 연속된 한 장면이라고 적는다. |
| 제품 뒤쪽이 달라짐 | 첫 이미지에 없는 면을 생성 | 회전 폭을 줄이거나 지원되는 참조 입력으로 보완한다. |
| 추적 중 얼굴·의상이 바뀜 | 동작과 정체성 유지의 난도 | 대상 하나와 짧은 동선부터 시도하고 참조 기능을 확인한다. |
| 타임랩스에서 건물까지 변형 | 시간 변화와 형태 변화가 혼동 | 고정된 구조물과 움직일 환경 요소를 구분한다. |

이 표는 모델 오류의 확정 진단이 아니다. 한 번에 하나의 조건만 바꿔 비교하기 위한 실무 가설이다.

### 수정 지시를 다시 쓰게 하는 프롬프트 — 보강

```text
아래 AI 영상 프롬프트의 카메라 동작을 명확하게 고쳐줘.
현재 프롬프트: [현재 문장]
실제 문제: [제품이 돌아가고 카메라는 멈춰 있음]
원하는 결과: [제품은 고정하고 카메라가 정면에서 오른쪽 측면까지 이동]

대상 움직임과 카메라 움직임을 분리해서 설명해줘.
시작 구도, 이동 경로, 도착 구도가 서로 모순되지 않게 정리해줘.
한글 설명과 간결한 영어 프롬프트를 각각 작성해줘.
새 대상이나 다른 장소를 추가하지 말고, 이번에는 이동 방식 하나만 수정해줘.
```

## 9. 최종 검수와 작업 기록

- [ ] 카메라가 움직이는지, 대상이 움직이는지 의도와 맞는다.
- [ ] 방향과 시작·종료 구도가 맞는다.
- [ ] 제품·인물의 형태와 특징이 유지된다.
- [ ] 가까운 물체와 먼 물체의 관계가 자연스럽다.
- [ ] 수평선, 건축 직선, 반복 무늬가 심하게 휘지 않는다.
- [ ] 이동 속도가 화면 내용을 읽을 수 있는 정도다.
- [ ] 실제 정보가 필요한 영상에 가상의 지리·제품 구조가 섞이지 않았다.
- [ ] 최종 자막과 로고는 별도로 확인했다.

```text
작업명:
사용 모델·버전:
입력 이미지 파일:
선택한 기법·원본 카드 번호:
실제 설정한 길이·비율·해상도:
사용한 프롬프트:
결과에서 잘된 점:
수정할 한 가지:
다음 시도 프롬프트:
출력 파일명:
```

## 10. 출처와 보관 안내

| 기호 | 출처 | 활용 범위 |
|---|---|---|
| S1 | [사용자가 공유한 Threads](https://www.threads.com/share/_eDxLEv29/) | `@rneayan_official`의 사이트 소개 본문 확인 |
| S2 | [Camera Movement AI Prompts](https://aicameramovements.com/) | 7개 분류·46개 카드의 용어, 번호와 찾아보기 기능 |
| S3 | [Camera Movement Prompt Builder](https://aicameramovements.com/prompt-builder/) | 첫 이미지, 움직임, 대상·장소·행동·분위기 입력과 복사 흐름 |
| S4 | [Runway 공식 카메라 용어](https://help.runwayml.com/hc/en-us/articles/47313504791059-Camera-Terms-Prompts-Examples) | 기본 촬영 용어 대조 |
| S5 | [Runway 공식 이미지→영상 가이드](https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide) | 움직임 중심 지시와 단계적 개선 |
| S6 | [Runway 공식 텍스트→영상 가이드](https://help.runwayml.com/hc/en-us/articles/42460036199443-Text-to-Video-Prompting-Guide) | 시각 묘사와 움직임 묘사 구분 |
| S7 | [Runway Gen-4 프롬프트 가이드](https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide) | 긍정적이고 직접적인 문장 작성 참고 |

확인일: **2026-10-10**. 특정 도구의 성능·무료 여부·지원 옵션을 일괄 보장하지 않는다. 입력 이미지, 카메라 경로, 모델 버전에 따라 결과가 달라질 수 있다.

이 Markdown 파일과 `첨부이미지` 폴더를 같은 위치에 보관하면 비교도가 연결된다. 압축본에는 이 폴더 구조가 포함되어 있다. 개념도와 46개 장면 예시는 이 노트를 위해 새로 제작했다.
