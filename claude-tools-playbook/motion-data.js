/* Motion and video extension: append-only data. No dependencies, no API keys. */
categories.splice(categories.findIndex(c => c.id === 'automation'), 0,
  {id:'motion',name:'영상·모션그래픽',icon:'▶'});
promptCategories.splice(promptCategories.findIndex(c => c.id === 'automation'), 0,
  {id:'motion',name:'영상·모션'});

const motionScenarios = [
  {
    id:'motion-reels',category:'motion',icon:'🎬',title:'15초 릴스·쇼츠를 기획할 때',
    short:'첫 2초 후킹 → 본문 → CTA · 9:16',
    tools:['Claude Code','CapCut / Premiere(편집 도구)','Remotion(선택)'],
    steps:['누구에게 무엇을 보여줄지 한 문장으로 정해.','첫 2초 후킹·3~12초 정보·마지막 CTA로 타임라인을 쪼개.','컷별 장면, 텍스트, 카메라 방향과 길이를 명시해.','실사 컷/텍스트/AI 영상 중 제작 방법을 선택해.','1080×1920 미리보기와 자막 안전 영역을 확인해.'],
    command:'claude',verify:'초 단위 스토리보드·컷 리스트·자막·9:16 모바일 판독성',
    warning:'AI 생성 영상의 인물·제품 정보는 실물과 다를 수 있어. 의학적 효능을 단정하지 마.',
    prompt:'[주제]를 다루는 15초 인스타그램 릴스·유튜브 쇼츠 기획안을 만들어 줘.\n대상: [타깃]. 톤: [감성/정보형/빠른 템포]. 화면: 1080×1920, 9:16.\n0~2초는 주의를 끄는 한 문장, 2~12초는 시각 정보 3비트, 마지막은 자연스러운 CTA.\n각 컷의 시작·종료 시각, 화면 묘사, 자막, 모션 용어(Fade/Scale/Slide 등), 편집 전환, 촬영/AI 생성 여부를 표로 정리해.\n텍스트는 모바일에서 잘리는 영역을 피하고, 과장·보장 표현을 배제해.\n완성 프롬프트를 컷마다 별도로 제공하고 실제 영상 생성·게시 전에는 검토만 해.'
  },
  {
    id:'motion-type',category:'motion',icon:'Aa',title:'글자가 리듬감 있게 나타나는 영상을 만들 때',
    short:'Kinetic Typography · Stagger · Text Scramble',
    tools:['Remotion','CSS/GSAP','Premiere / CapCut(선택)'],
    steps:['한 화면에 나타낼 핵심 메시지 3개 이하를 정해.','단어별/문장별 등장 효과와 타이밍을 분리해.','Stagger, Split Text, Scale, Hold, Exit 순서를 설정해.','글자가 실제로 보이는 시간을 확보해.','9:16 프레임과 폰트 깨짐·줄바꿈을 확인해.'],
    command:'npx create-video@latest --yes --blank motion-type-video',verify:'문장별 타이밍·읽기 시간·세로 영상 렌더 예시',
    warning:'Remotion은 별도 프로젝트 설치가 필요하며 이 명령만으로 MP4가 자동 완성되지는 않아.',
    prompt:'원본 문구를 바꾸지 않고 [문구]를 8초짜리 키네틱 타이포그래피 영상으로 만들어 줘.\n1080×1920 / 30fps / 배경 [색상] / 폰트 [서체] / 강조색 [색상].\n0~1초 Hook Scale, 1~3초 Split Text stagger, 3~5초 Count-up 또는 강조 단어 Bounce, 5~7초 Text Scramble에서 명확한 문구로 정착, 7~8초 Logo/CTA.\n각 요소의 시작 프레임, 길이, 이징, 진입·퇴장 효과를 명세해.\n움직임은 과하지 않게 2~3개의 모션 언어로 통일하고 글자 가독성을 우선해.'
  },
  {
    id:'motion-remotion',category:'motion',icon:'◧',title:'React 코드로 MP4 영상을 만들 때',
    short:'Remotion · 프레임 단위 애니메이션 · 반복 렌더',
    tools:['Remotion','Claude Code','Docker(선택)'],
    steps:['별도 폴더에 Remotion 프로젝트를 생성해.','컴포지션 ID, fps, width, height, durationInFrames를 정해.','타이틀·그래픽·장면을 React 컴포넌트로 나눠 제작해.','Remotion Studio에서 프레임별 미리보기를 확인해.','컴포지션 ID를 지정해 MP4로 렌더하고 길이·해상도를 검증해.'],
    command:'npx create-video@latest --yes --blank my-video',
    verify:'npm run dev 미리보기 / 지정한 fps와 프레임 수 / MP4 파일 실제 생성',
    warning:'이 페이지는 Remotion 설치 가이드이며 병원 맥에 Remotion 프로젝트가 만들어졌다는 뜻은 아니야.',
    prompt:'Remotion을 사용해 [주제]의 12초 9:16 MP4 템플릿을 구현해.\n규격: 1080×1920, 30fps, 총 360프레임, 영상·배경·자막·CTA를 재사용 가능한 React 컴포넌트로 분리.\nuseCurrentFrame()과 interpolate()/spring()으로 타이밍을 제어하고, 매직 넘버 대신 시간 상수를 사용해.\n필수 컷: 타이틀 0~2초 → 핵심 정보 2~8초 → 인포그래픽 8~10초 → CTA 10~12초.\n로컬 미리보기, 렌더 명령, 실제 출력 영상의 길이·해상도 검증을 포함해. 기존 작업 파일은 덮어쓰지 마.'
  },
  {
    id:'motion-hero',category:'motion',icon:'◎',title:'웹사이트 첫 화면에 움직이는 히어로를 넣을 때',
    short:'GSAP ScrollTrigger · Motion · 반응형',
    tools:['GSAP 또는 Motion','Claude Code','Context7'],
    steps:['히어로의 핵심 메시지와 CTA를 먼저 고정해.','기본 정지 화면을 먼저 만든 후 모션 레이어를 추가해.','간단한 UI는 CSS/Motion, 복잡한 타임라인·스크롤은 GSAP을 비교해.','reduced-motion 대응과 모바일 성능을 구현해.','스크롤·버튼·SEO 제목·페이지 속도에 문제가 없는지 확인해.'],
    command:'npm install gsap',verify:'정지 화면 유지 / 모바일 390px / reduced-motion / CTA 클릭·LCP 점검',
    warning:'GSAP은 현재 프로젝트에 별도 설치해야 해. npm 설치만으로 히어로가 생성되지는 않아.',
    prompt:'기존 [URL/컴포넌트]의 히어로 영역을 모션그래픽으로 개선해 줘.\n브랜드 톤: [느낌], 강조색: [색상], 텍스트·CTA는 원문 그대로 유지.\n처음 진입 시 Fade+Slide, 핵심 도형은 느린 Scale/Parallax, 스크롤 시 가벼운 ScrollTrigger 모션을 적용해.\nGSAP과 Motion 중 기술 스택에 적합한 도구를 고르고 Context7/공식 문서로 사용법을 확인해.\ntransform과 opacity 위주로 구현하고 prefers-reduced-motion 대응, 모바일 성능·CLS·CTA 클릭·SEO 문구 유지까지 검증해.\n라이브 사이트 수정·배포는 승인 전 보류해.'
  },
  {
    id:'motion-product',category:'motion',icon:'✦',title:'가격·숫자가 강조되는 광고 영상을 만들 때',
    short:'Count-up · 숫자 강조 · 카드 애니메이션',
    tools:['Remotion','Motion / GSAP','CapCut'],
    steps:['확정된 숫자와 단위를 검증해.','초기 숫자와 최종 숫자, 등장 위치를 확정해.','카운트업 시간과 멈춤 시간을 정해.','카드 배경과 대비를 확보해.','음악 없이도 읽을 수 있는 영상을 만든 뒤 숫자 오기재를 점검해.'],
    command:'npm install motion',verify:'가격·단위 정확성 / 숫자 가독성 / 최종 프레임 유지',
    warning:'의료 관련 가격·이벤트 조건은 확정된 정보만 넣고 조건이 있다면 함께 표시해.',
    prompt:'[정확한 숫자/단위]를 주인공으로 하는 6초 모션 카드를 만들어 줘.\n숫자는 0에서 최종값까지 Count-up으로 약 1.2초, 마지막 프레임은 충분히 멈춰 읽을 수 있게.\n디자인은 [색상·폰트], 효과는 Scale/Bounce를 가볍게 적용해.\n총액, 단위, 부가 조건은 원문과 일치하도록 검증하고 임의 가격·할인율은 생성하지 마.\nRemotion 코드 또는 CapCut 키프레임 가이드 중 [선택] 방식으로 제공해.'
  },
  {
    id:'motion-videoprompt',category:'motion',icon:'◇',title:'Veo 등 AI 영상 모델에 장면별 프롬프트를 줄 때',
    short:'카메라·동작·조명·일관성·네거티브 조건',
    tools:['AI 영상 모델(별도 서비스)','Claude Code(프롬프트 정리)'],
    steps:['콘셉트와 장면의 목적을 1문장으로 정해.','인물·제품·장소의 불변 조건을 적어.','숏 길이, 카메라 이동, 프레임 속도, 조명과 행동을 고정해.','매 컷을 독립적으로 생성 가능한 프롬프트로 나눠.','생성 결과의 물리적 일관성과 자막·로고 변형을 확인해.'],
    command:'claude',verify:'인물/의상/조명 일관성 / 물리적 동작 / 컷 간 연결 / 영상 비율',
    warning:'Veo 계정·영상 생성 API는 별도 서비스. 이 가이드는 프롬프트 작성용이야.',
    prompt:'[콘셉트]를 9:16의 3개 숏으로 나눠 AI 영상 생성용 프롬프트를 작성해.\n고정 캐릭터/제품/의상: [참고 설명]. 고정 환경: [장소·시간·조명].\n각 숏은 Duration, Subject, Action, Camera Lens/Movement, Lighting, Composition, Motion Physics, Continuity, Negative Constraints 순서로 묘사해.\n과도한 형태 변형·손가락 오류·불연속 배경·불가능한 그림자·로고 왜곡은 금지 조건에 넣어.\n문장과 촬영 지시를 한국어/영어 두 버전으로 작성하고, 모델이 지원하지 않는 옵션은 가정이라고 표기해.'
  },
  {
    id:'motion-edit',category:'motion',icon:'✂',title:'Premiere·CapCut 편집 타임라인을 설계할 때',
    short:'컷 길이 · B-roll · 키프레임 · 자막',
    tools:['Premiere Pro 또는 CapCut(별도 앱)','Claude Code(편집표)'],
    steps:['원본 영상과 길이·인터뷰 대사·필수 장면을 정리해.','도입·본론·마무리로 타임라인을 구간화해.','각 컷의 인/아웃, 자막, B-roll, 트랜지션을 적어.','전환 남발을 막고 시선·행동 연결을 맞춰.','최종 9:16/16:9와 음량·자막 가독성을 검수해.'],
    command:'claude',verify:'타임코드·컷 목록·자막 정합성·전환 길이·출력 규격',
    warning:'Premiere/CapCut의 앱 자동 조작은 별도 연결과 실행 권한이 필요해.',
    prompt:'제공한 영상/대본을 기반으로 [길이]초 편집 타임라인을 작성해.\n컷 번호, 시작~끝 시각, 원본 클립 구간, 화면 내용, 자막, B-roll, 모션(용어), 전환, 음향 큐, 검수 포인트를 표로 작성해.\n도입 2초에 주제를 보여 주고 불필요한 침묵을 줄여.\n서로 다른 컷의 인물 방향·시선·행동이 자연스럽게 연결되도록 해.\n실제 영상을 보지 못한 구간은 추정 편집점으로 표시하고 임의 내용을 사실로 쓰지 마.'
  },
  {
    id:'motion-education',category:'motion',icon:'◉',title:'시술·장비 원리를 이해하기 쉽게 설명할 때',
    short:'의료정보 인포그래픽 · 구조 설명 애니메이션',
    tools:['Remotion','SVG / GSAP','의료진 검토'],
    steps:['시술의 실제 기전과 확정 자료를 정리해.','의학적 사실과 비유적 시각화 구간을 분리해.','도형/텍스트/단면도 기반 스토리보드를 제작해.','과도한 효과 보장 장면은 배제해.','의료진 검토를 받은 후 최종 영상으로 렌더해.'],
    command:'claude',verify:'자료 출처 / 의학적 정확성 / 의료진 검토 표시 / 자막 원문',
    warning:'기전 애니메이션은 단순화된 개념도일 수 있으므로 실제 임상 결과처럼 표현하지 않아.',
    prompt:'[장비/시술] 원리를 일반인이 15초 만에 이해하도록 2D 모션 인포그래픽을 기획해.\n의학적 사실은 제공된 [공식 자료] 범위 안에서만 사용하고, 불확실한 부분은 검토 필요로 표시해.\n0~3초 문제 정의 → 3~11초 에너지/구조 개념도 → 11~15초 핵심 확인사항.\n프레임별 도형, 색상, 애니메이션, 자막, 카메라 이동을 적어. 치료 효과를 보장하거나 실제 피부 변화처럼 오인되는 전후 연출은 하지 마.\n게시 전 의료진 검토용 초안으로 만들어.'
  },
  {
    id:'motion-logo',category:'motion',icon:'✧',title:'브랜드 로고·인트로·아웃트로를 만들 때',
    short:'Line Drawing · Mask Reveal · Soft Glow',
    tools:['SVG/CSS','Remotion','GSAP'],
    steps:['원본 로고의 벡터 파일과 사용 규칙을 확보해.','Line Drawing, Mask Reveal, Fade 중 최대 2개 효과를 선택해.','인트로와 아웃트로의 시작·끝 프레임을 정해.','마지막에 읽기 쉬운 로고 정지 프레임을 둬.','모바일·데스크톱 해상도와 투명 배경 가능 여부를 확인해.'],
    command:'npm install gsap',verify:'로고 형태 불변 / 흰·어두운 배경 대응 / 종료 프레임',
    warning:'브랜드의 원본 로고를 AI가 임의로 다시 그리거나 변형하지 않도록 해.',
    prompt:'제공한 [원본 SVG 로고]를 보존하며 4초 브랜드 인트로를 만들어 줘.\n0~1.5초 Line Drawing, 1.5~2.5초 Mask Reveal, 2.5~4초 가벼운 Glow+정지 프레임을 사용해.\n로고 비율·간격·철자·브랜드 컬러는 원본과 동일해야 해.\nSVG/CSS 코드 또는 Remotion 컴포지션을 제공하고, 알파 채널 필요 여부·MP4 출력 제약을 확인해.'
  },
  {
    id:'motion-batch',category:'motion',icon:'▦',title:'여러 버전의 영상·카드 애니메이션을 일괄 만들 때',
    short:'CSV/JSON 데이터 → 템플릿 → 다국어 영상',
    tools:['Remotion','Claude Code','Docker(선택)'],
    steps:['데이터에 실제로 존재하는 제목·가격·국가를 확인해.','영상 템플릿에서 텍스트와 디자인을 분리해.','길이가 다른 번역에 대응하도록 텍스트 영역을 설계해.','샘플 2건 렌더 후 글자 넘침과 수치 정확도를 확인해.','승인된 데이터로만 일괄 MP4 렌더해.'],
    command:'npx create-video@latest --yes --blank batch-motion',verify:'샘플 렌더 2건 / 언어별 줄바꿈 / 데이터 누락 검증 / 출력 파일명',
    warning:'대량 렌더 전에 생성 개수와 입력 데이터가 확정되어야 해.',
    prompt:'[CSV/JSON 파일]을 바탕으로 재사용 가능한 Remotion 영상 템플릿을 만들어 줘.\n각 행의 제목·보조 문구·언어·옵션을 props로 입력하고, 공통 9:16 디자인에 반영해.\n한국어·영어·일본어·중국어의 글자 길이에 따라 줄바꿈과 폰트 크기를 조정하되 의미를 바꾸지 마.\n샘플 2개만 먼저 렌더해 데이터 정확성과 모바일 가독성을 검증해.\n이상이 없으면 출력 목록·렌더 명령·자동화 방법을 보고해. 외부 게시·업로드는 하지 마.'
  }
];
scenarios.push(...motionScenarios);

const moreTools=[
 {id:'remotion',name:'Remotion',icon:'🎞',subtitle:'React 코드로 프레임 정확한 MP4 제작',status:'별도 설치 안내',
  intro:'React 컴포넌트로 영상 타임라인을 구성하고 MP4를 렌더하는 영상 개발 도구야. 기존 병원 맥에서 별도 Remotion 프로젝트까지 설치·렌더 검증한 것은 아니므로, 시작 명령부터 안내해.',
  can:['9:16 쇼츠·릴스 MP4 제작','타이틀·숫자·카드·도형 모션','데이터 기반 영상 템플릿과 반복 렌더','프레임 정확한 타임라인·자막','React 컴포넌트 재사용'],
  best:'동일 형식의 영상 수십 편, 데이터 기반 시술 카드, 키네틱 타이포 영상 자동화.',
  steps:['터미널에서 별도 폴더에 Remotion 프로젝트 생성.','프로젝트 폴더에서 npm run dev를 실행해 Studio 미리보기.','컴포지션에 1080×1920·fps·프레임 수를 지정.','Claude Code로 장면별 애니메이션 작성.','컴포지션 ID를 확인해 npx remotion render 실행.'],
  commands:[{location:'MAC 터미널 · 새 프로젝트(별도 설치)',cmd:'npx create-video@latest --yes --blank my-video'},{location:'MAC 터미널 · 미리보기',cmd:'cd my-video && npm run dev'},{location:'MAC 터미널 · 구성 확인 후 렌더',cmd:'npx remotion render [컴포지션_ID] out/video.mp4'}],
  prompt:'Remotion으로 [내용]을 1080×1920 30fps 12초(360프레임) 영상으로 만들어 줘. 타이틀→문제/해결 정보→강조 그래픽→CTA로 구성하고 시작·종료 프레임을 표기해. spring/interpolate로 부드러운 모션을 구현하고 Studio 미리보기와 실제 MP4 렌더·길이 검증을 해. 기존 폴더를 덮어쓰지 마.',
  caution:'정확한 컴포지션 ID·폰트·영상 리소스가 있어야 렌더가 성공해. 도구 자체 설치가 아니라 별도 프로젝트 설치 명령이야.',
  source:'https://www.remotion.dev/docs/'},
 {id:'motion',name:'Motion for React',icon:'✱',subtitle:'React 인터랙션·마이크로모션·Spring',status:'프로젝트별 설치',
  intro:'React 컴포넌트의 등퇴장, 레이아웃 이동, 스크롤 진행 표시를 선언적으로 애니메이션하는 라이브러리야. 최신 공식 설치는 npm install motion, import { motion } from "motion/react".',
  can:['Fade·Slide·Scale·Spring','버튼 hover/tap 반응','AnimatePresence 퇴장 모션','Scroll 진행 표시','SVG pathLength 모션'],
  best:'React·Next.js 페이지의 CTA, 메뉴, 카드, 히어로 인터랙션.',
  steps:['React 버전과 현재 프로젝트 구성을 먼저 확인.','해당 프로젝트 터미널에서 npm install motion.','Client Component에 motion/react을 import.','initial/animate/exit, transition을 설정.','prefers-reduced-motion과 모바일 테스트.'],
  commands:[{location:'MAC 터미널 · 대상 프로젝트에서',cmd:'npm install motion'},{location:'REACT 클라이언트 컴포넌트',cmd:'import { motion } from "motion/react";'}],
  prompt:'[컴포넌트]에 Motion for React를 적용해 줘. initial→animate→exit와 spring 이징을 설계하고, 사용자 조작과 동작을 연결해. transform·opacity 중심, reduced motion 대응, 상태 변경과 레이아웃 전환이 자연스럽도록 구현해. 현재 프로젝트 React 버전과 공식 문서를 확인하고, 모바일 성능과 기존 클릭 로직을 테스트해.',
  caution:'React 18.2 이상이 필요하며 프로젝트에 설치하지 않은 경우 import만으로 실행되지 않아.',
  source:'https://motion.dev/docs/react-installation'},
 {id:'gsap',name:'GSAP / ScrollTrigger',icon:'⌁',subtitle:'정교한 모션 타임라인·스크롤 시퀀스',status:'프로젝트별 설치',
  intro:'여러 요소의 동작을 시간축으로 묶고 스크롤 위치에 연결할 때 유용해. 공식 npm 패키지는 gsap이고 ScrollTrigger를 import한 뒤 registerPlugin으로 등록해야 해.',
  can:['섬세한 텍스트·도형 시퀀스','ScrollTrigger 스크롤 연동','Stagger로 여러 카드 순차 등장','GSAP timeline 구간 제어','정지/반전/재생 상태 처리'],
  best:'브랜드 히어로, 스크롤 기반 제품 소개, 패럴랙스·섹션 타임라인.',
  steps:['기존 CSS와 Scroll 컴포넌트 충돌을 검사.','해당 프로젝트에 npm install gsap.','ScrollTrigger가 필요하면 플러그인을 import·registerPlugin.','timeline과 trigger 구간을 설계.','모바일·reduced-motion·스크롤 높이 변동 검증.'],
  commands:[{location:'MAC 터미널 · 대상 프로젝트에서',cmd:'npm install gsap'},{location:'JavaScript/React 프로젝트',cmd:'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);'}],
  prompt:'[웹 히어로 섹션]을 GSAP 타임라인으로 애니메이션해 줘. 문구·CTA·SEO 구조는 보존하고 0.0~0.6초 타이틀 등장, 0.3~1.0초 도형 Reveal, 스크롤 시 가벼운 패럴랙스로 이어지게 해. ScrollTrigger 등록, cleanup, 중복 초기화 방지, reduced-motion 대응을 구현하고 모바일에서 LCP와 스크롤 동작을 검증해.',
  caution:'모든 모션에 GSAP이 필요한 것은 아니야. 단순 Fade는 CSS가 더 가벼울 수 있어.',
  source:'https://gsap.com/docs/v3/Installation/'}
];
toolsData.push(...moreTools);

/* New reusable prompts. These entries only prepare user-copyable text. */
const motionPrompts=[
 ['motion-master','영상 전체 마스터 프롬프트','영상 제작 전 전체 설계','[주제]에 대한 [길이]초 영상 제작 계획을 작성해. 타깃·핵심 메시지·화면비·해상도·fps·톤·자료 출처를 먼저 정리하고, 시간코드별 스토리보드에 화면 내용, 자막, 렌즈/카메라 움직임, 모션 용어, 색감, 효과음을 표기해. 촬영/AI 생성/코드 기반 제작 여부를 컷마다 구분하고, 제작 가능한 코드/프롬프트, 검증 기준, 최종 렌더 규격을 제안해. 실행 전 검토안으로 제시해.'],
 ['motion-3sec','3초 후킹 영상','Hook 0~3초 구성','[제품·주제] 영상의 첫 3초만 설계해. 시청자가 계속 볼 이유를 첫 프레임에 주고, 0.0~0.8초 시각 후킹, 0.8~2.0초 핵심 질문, 2.0~3.0초 다음 컷 전환을 만든다. 과장·자극적 사실 왜곡 없이 자막 8~12자 수준의 대안을 5개 제안하고 컷별 모션과 화면 비율 9:16을 명시해.'],
 ['motion-15reels','15초 정보형 릴스','후킹·정보·CTA 타임라인','[주제]를 15초 9:16 정보형 릴스로 설계해. 0~2초 후킹, 2~6초 문제 인식, 6~11초 근거/정보 2개, 11~15초 CTA. 컷별 시작·끝 시각, 장면, 자막, Fade/Slide/Scale 등 모션 명칭, 전환 길이, 사운드 큐, 촬영 자산을 정리해. 모바일 안전 영역과 의료광고 문구 검토를 포함해.'],
 ['motion-30reels','30초 설명형 쇼츠','시술·서비스 정보 30초','[시술/서비스]를 30초 쇼츠로 만든다. 목적은 정보 전달이며 효과를 보장하지 않아. Hook→정의→어떤 점을 확인할지→주의사항→CTA 구조를 초 단위로 나누고, 모든 자막 문구를 작성해. 시청자의 질문과 연결되는 모션 그래픽을 추천하고, 타임라인·촬영 구도·B-roll·자막 디자인·마무리 프레임을 제시해.'],
 ['motion-storyboard','컷별 스토리보드·촬영표','촬영/편집팀 공유 문서','[대본]을 컷 8개 이하의 스토리보드로 바꿔. 표 열은 컷 번호, 시간, 화면 구도, 렌즈·카메라 이동, 액션, 자막, 모션 효과, 필요 소품/촬영/생성 자산, 연결 포인트로 해. 촬영과 생성 컷을 구분하고 실제 없는 화면은 대체안으로 제안해.'],
 ['motion-ai-video','Veo 계열 장면별 영상 프롬프트','일관된 AI 장면 3컷','[콘셉트]의 AI 영상 프롬프트를 3개 컷으로 작성해. 각 컷은 SUBJECT, WARDROBE, ENVIRONMENT, ACTION, CAMERA, LIGHTING, PHYSICS, DURATION, ASPECT RATIO, NEGATIVE CONSTRAINTS를 포함해. 동일 인물의 외형·의상·소품·날씨·조명은 유지하고 신체 왜곡, 인물 점프컷, 불가능한 반사, 텍스트 오타를 배제해. 영어 원본과 한국어 뜻을 함께 제공해.'],
 ['motion-character','인물·제품 일관성 확보','AI 숏 간 동일 개체 유지','[인물 또는 제품 레퍼런스]를 기반으로 여러 AI 영상 컷을 만들 때 외형·표정·색상·질감·고유 표시를 변형 없이 보존하는 공통 Identity Lock 블록을 먼저 써 줘. 각 컷마다 다른 카메라 움직임을 주되 고정 특징과 물리적 그림자는 동일하게 하며 네거티브 조건과 검수 체크리스트를 제공해.'],
 ['motion-kinetic','키네틱 타이포그래피 8초','Text Scramble·Split Text·Stagger','[원문 문구]를 변경하지 않고 8초 키네틱 타이포 영상을 설계해. 0~1초 타이틀 Scale, 1~3초 Split Text 순차 노출, 3~5초 Count-up/강조 단어 Bounce, 5~7초 Scramble→확정, 7~8초 Hold+Fade. 1080×1920/30fps, 대사·타이밍·레이어 순서·프레임·이징·폰트를 표기하고 반복 재생에도 텍스트가 정확해야 해.'],
 ['motion-count','가격·숫자 강조 애니메이션','Count-up·Scale·Hold','[정확한 가격/수치와 단위]를 6초 애니메이션으로 표현해. 0~1초 카드 Fade, 1~2.5초 Count-up, 2.5~4.5초 최종값 강조, 4.5~6초 Hold. 숫자 0으로 돌아가지 않고 끝값을 유지하게 설계해. 원문 가격·이벤트 조건을 임의 변경하지 말고 모바일에서 읽을 수 있는 글꼴·단위를 명시해.'],
 ['motion-beforeafter','동일 인물 시각 비교 연출','과도한 보정·오인 방지','[제공된 시각 자료]를 비교하는 9:16 영상의 레이아웃을 설계해. 비교 장면은 같은 인물·같은 카메라 각도·거리·조명 조건을 유지하고, 피부·얼굴 형태를 합성/보정해 결과를 왜곡하지 않아. 비교 설명은 객관적 사실만 사용하고 날짜·촬영 조건·주의 문구 필요 여부를 검토 대상으로 분리해. 실제 의료광고 심의를 회피하려는 연출은 하지 마.'],
 ['motion-remotion-template','Remotion 12초 완성 템플릿','코드·컴포지션·MP4 검증','Remotion으로 [주제] 12초, 1080×1920, 30fps, durationInFrames=360 영상 템플릿을 만들어 줘. 컴포지션 ID를 명시하고 React 컴포넌트, 서브씬, 공통 애니메이션 파라미터를 분리해. useCurrentFrame·interpolate·spring을 적용하고 폰트·이미지·효과음 자산 경로를 확인해. npm run dev로 미리보기한 뒤 npx remotion render [ID] out/video.mp4로 렌더하고 실제 MP4 파일·크기를 검증해.'],
 ['motion-premiere','Premiere Pro 편집 지시서','타임코드·키프레임·B-roll','[원본 영상 또는 타임코드]로 [길이]초 Premiere 편집 지시서를 작성해. 각 컷의 인/아웃, 자막, B-roll, Scale/Position/Opacity 키프레임 값, Easy Ease 유형, 전환, 오디오 수준을 표로 적어. 실제 확인하지 않은 원본 구간은 추정이라고 표시해. 최종 9:16과 자막 안전 영역을 점검해.'],
 ['motion-capcut','CapCut 실사용 편집 매뉴얼','클릭 순서·키프레임·자막','[영상 목표]를 CapCut에서 편집하는 초보자용 단계별 안내를 작성해. 원본 가져오기→캔버스 9:16 설정→분할→자막→Keyframe Scale/Position→속도·전환→오디오 레벨→1080×1920 출력 순서를 설명해. 편집 기능 메뉴명은 사용 중인 최신 버전에서 확인하고, 지원하지 않는 기능은 대체 방법을 알려 줘.'],
 ['motion-web-gsap','GSAP 스크롤 히어로','웹 기반 타임라인·ScrollTrigger','[사이트 히어로]의 제목·CTA·SEO 구조를 유지하고 GSAP으로 부드러운 입장 애니메이션과 ScrollTrigger Parallax를 구현해. npm install gsap, ScrollTrigger import 및 registerPlugin, cleanup 코드를 포함해. 모바일에서 동일하게 작동해야 하며 reduced motion을 지원하고 복잡한 애니메이션이 LCP/CLS를 악화시키지 않도록 해.'],
 ['motion-react-motion','Motion for React 인터랙션','클릭·호버·등퇴장·Spring','[React 컴포넌트]를 Motion for React로 다듬어 줘. 현재 버전과 공식 설치 문서를 확인하고 motion/react의 initial·animate·exit·whileTap·transition을 활용해. 인터랙션은 사용자 의도에만 반응하고 폰·데스크톱에서 동일하게 동작하며 reduced-motion 설정을 존중해. 기존 클릭 로직과 스타일 클래스는 보존해.'],
 ['motion-svg-line','SVG 라인 드로잉','선 그리기·로고 Reveal','[제공한 SVG 또는 도형]을 Line Drawing 모션으로 표현해. pathLength/ stroke-dasharray/ stroke-dashoffset을 이용하고 0~1.4초 선 그리기, 1.4~2.2초 채색 Fade, 2.2~3초 로고 정지 프레임으로 설계해. SVG 자체의 형태를 변형하지 말고 코드와 재생 예시를 제공해.'],
 ['motion-morph','Morphing 도형 전환','원형→유기형·Shape Interpolation','[도형 A]에서 [도형 B]로 변화하는 3초 Morphing 애니메이션을 설계해. 공통 중심점·크기·방향을 맞추고 자연스러운 Easing을 적용해. SVG path를 모핑할 경우 두 path 구조·호환 여부를 먼저 점검하고, 호환되지 않으면 clip-path 또는 CSS border-radius 전환을 대안으로 제시해. 점프 없이 원상 복귀 가능한 코드로 작성해.'],
 ['motion-lowerthird','정보형 로어 서드','영상 하단 이름·키워드 라벨','[화자·정보]에 사용할 4초 Lower Third 자막을 만들어 줘. 화면 하단 안전 영역과 대비를 고려하고 0~0.5초 선형 Slide, 0.5~3.3초 Hold, 3.3~4초 Fade Out으로 설계해. 타이포 계층(이름/설명), 컬러, 모션 시간표를 제공해.'],
 ['motion-marquee','브랜드 키워드 Marquee','연속 타이포 배경·무한 루프','[브랜드 키워드 5개]를 연속 흐르는 Marquee로 표현해. 양 끝이 끊기지 않도록 복제 텍스트를 포함해 무한 루프를 만들고 모바일에서 과도한 속도와 깜빡임을 피하도록 해. 텍스트는 장식 역할만 하고 주요 정보는 정적으로 남기며 reduced-motion에서는 정지시키도록 만들어 줘.'],
 ['motion-batch','다국어 영상 일괄 렌더','CSV·JSON→여러 영상 자동 생성','[CSV/JSON]에 담긴 언어·제목·숫자·CTA를 Remotion 컴포지션 props로 연결해 같은 디자인의 9:16 영상을 만들고 싶어. 입력 누락·자막 넘침·다국어 폰트·수치 정확성 검증 후 2개만 샘플 렌더해. 출력 파일명 규칙, 처리 실패 재시도, 중복 렌더 방지를 설계하고 승인 전 대량 렌더는 하지 마.'],
 ['motion-audio-cue','사운드 큐와 화면 싱크','영상 편집용 타이밍만 설계','[영상 스토리보드]에 어울리는 컷별 SFX 및 사운드 큐 타임라인을 설계해. 소리의 성격(클릭, 부드러운 스웰, 짧은 우시), 시작/종료 시점, 화면 변화와의 싱크를 제안해. 저작권 음악을 직접 재현하지 말고 사용 허가된 오디오 자산을 쓰도록 표시해. 내레이션이 있는 구간에서는 효과음이 대사를 덮지 않게 해.'],
 ['motion-review','영상·모션 결과 QC','프레임·폰트·인체·색감·재생 검수','[렌더 파일 또는 캡처]를 실제로 분석하여 ① 자막 오탈자·줄바꿈 ② 프레임 경계 깜빡임 ③ 카메라/인물/그림자의 물리적 일관성 ④ 색감·밝기 일관성 ⑤ 음향 클리핑 ⑥ 의료광고 표현 위험 ⑦ 9:16 안전 영역을 점검해. 확인 가능한 근거가 있는 항목만 오류로 단정하고, 시간코드와 수정 제안을 표로 제공해.'],
 ['motion-loop','끊기지 않는 루프 애니메이션','마지막 프레임→첫 프레임 연결','[그래픽/도형]을 [길이]초 완전 반복 루프 영상으로 설계해. 첫 프레임과 마지막 프레임의 위치·크기·회전·색상·속도를 이어 붙일 수 있어야 해. 시작/끝의 Ease 차이와 순간 점프를 피하고, 프레임별 모션 경로와 무한 루프 테스트 기준을 작성해.'],
 ['motion-story-3cut','3단계 카드뉴스를 영상으로','카드 3장→9:16 모션','제공된 [카드뉴스 문구 3개]를 9:16 영상으로 변환해. 각 카드가 정확히 3초씩 등장하며 첫 장은 Fade+Scale, 둘째는 Slide+Stagger, 마지막은 CTA Hold를 사용해. 글자와 의미를 바꾸지 않고, 자막이 읽히는 시간·전환 간격·브랜드 폰트·모바일 안전 영역을 검증해.']
];
prompts.push(...motionPrompts.map(([id,name,about,body])=>({
  id,cat:'motion',name:(prompts.length? '영상 · ' : '')+name,about,body
})));

const motionHints = {
 motion:{tool:'영상 목적·매체 선택 → 스토리보드 → Remotion / GSAP / CapCut → QC',check:'화면비·컷 타임코드·폰트·모션의 재생 확인'}
};
Object.assign(builderHints,motionHints);

document.addEventListener('DOMContentLoaded',()=>{
 const s=document.querySelectorAll('.stats strong');
 if(s[0])s[0].textContent=String(categories.length-1).padStart(2,'0');
 if(s[1])s[1].textContent=String(scenarios.length).padStart(2,'0');
 if(s[2])s[2].textContent=String(prompts.length).padStart(2,'0');
 const sel=document.querySelector('#build-purpose');
 if(sel&&!sel.querySelector('option[value="motion"]')){
  const opt=document.createElement('option');opt.value='motion';opt.textContent='영상·모션그래픽 제작';sel.appendChild(opt);
 }
});
