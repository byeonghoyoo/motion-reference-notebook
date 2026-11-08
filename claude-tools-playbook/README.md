# AI Toolkit Playbook | Claude Code + Docker 실전 사용 가이드

병원 맥에 설치한 개발 도구를 **상황별 탭**으로 안내하는 한국어 정적 웹페이지입니다.

**웹페이지:** https://byeonghoyoo.github.io/motion-reference-notebook/claude-tools-playbook/

## 주요 기능

- 8개 카테고리 / 31개 실제 업무 시나리오
- 클릭하면 나타나는 작업 단계, 추천 도구, 입력 위치, 완성형 복사 프롬프트
- Agent Skills · Context7 · Graphify · 21st MCP · Strix · Docker 사용 가이드
- 41개 범용 프롬프트 라이브러리 (영상·모션 24개 포함)
- 상황·목적·금지사항에 맞게 조합하는 프롬프트 제작기
- 14개 모션그래픽 인터랙티브 데모: Fade, Slide, Scale, Spring, Bounce, Typewriter, Scramble, Split Text, Count-up, Line Drawing, Morphing, Marquee, Lower Third, Parallax
- 영상·모션 카테고리: 숏폼/릴스/웹히어로/Remotion/편집 타임라인/AI 영상/의료정보 모션/다국어 렌더
- 모바일 최적화, 검색, 원클릭 복사, FAQ 및 문제 해결
- **빌드 없이** HTML/CSS/Vanilla JS로 작동하며 외부 서버에 입력값을 보내지 않습니다.

## 실행

index.html을 브라우저에서 열거나 python3 -m http.server 8765로 로컬에서 확인합니다.

## 보안

이 저장소에는 API 키, .env, 개인 정보, 병원 내부 데이터가 없습니다. Strix 보안 기능의 실제 외부 서비스 대상 테스트는 허가 없이 수행하지 마세요.

이 문서는 2026-11-08을 기준으로 설치 확인된 환경을 토대로 작성한 교육 자료입니다. 요금·배포 환경·외부 도구 기능은 이후 달라질 수 있습니다.

## 영상 도구별 기준

Remotion, Motion for React, GSAP은 병원 맥에 일괄 설치된 도구가 아니라 **각 영상·웹 프로젝트에서 별도 설치 후 테스트하는 라이브러리**입니다. 페이지에 있는 CSS·JS 데모는 외부 라이브러리 없이 정적으로 실행됩니다. 실영상 생성·MP4 렌더 완료를 의미하지 않습니다.

공식 레퍼런스:
- https://www.remotion.dev/docs/
- https://motion.dev/docs/react-installation
- https://gsap.com/docs/v3/Installation/

## 설치 도구 중심 가이드 (2026-11-08 개정)

- Agent Skills, Context7, Graphify, 21st MCP, Strix, Docker, Craft Anything 7개 도구 탭을 앞부분에 배치.
- 37개 업무 상황, 48개 범용 프롬프트, 14개 모션 재생 샘플.
- 모션 재생은 명시적인 버튼 클릭에서만 시작. 모바일의 ‘움직임 줄이기’ 설정에도 직접 선택한 모션은 재생되며, 진행률과 느린 기본 속도를 제공. 자동재생 없음.
- 공식 Craft Anything v0.5.0: https://github.com/storytold/craft-anything
- 사용자 제공 3분 소개영상: https://www.youtube.com/watch?v=FW_H1YL9hgk
- Craft Anything macOS 앱·CLI·Claude Code MCP·skill·Claude Code 빌더·OpenRouter 무료 분석 모델이 등록되어 있고 doctor 결과 healthy 확인. 사용자가 소유한 로컬 웹사이트의 web-site-open 테스트 완료. 새 앱 전체 재구축까지 검증한 것은 아님.
- Craft CLI는 개별 실행이 종료되면 브라우저가 닫히므로 web-site-open 다음 web-site-capture는 유지되는 MCP 세션/앱 안에서 함께 실행해야 함.
- 공개 저장소에 API 키나 환자·병원 고객정보를 포함하지 않음.
