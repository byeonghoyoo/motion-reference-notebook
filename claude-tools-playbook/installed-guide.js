/* Verified installed tools, concise action-driven help, no secrets or network calls. */
categories.splice(1,0,{id:'installed',name:'방금 설치한 도구',icon:'✳'});
const installedSkillGuides=[
 {id:'agent',name:'Agent Skills',glyph:'✳',state:'설치 확인',role:'시니어 개발 프로세스',headline:'기획 → 계획 → 구현 → 테스트를 순서대로',
 best:'새 웹 기능·랜딩·업무 자동화를 만들 때',where:'Claude Code 대화창',start:'/spec',steps:['프로젝트 폴더로 이동한 다음 claude를 실행','/spec 또는 “Agent Skills로 요구사항부터 명세해” 입력','/plan으로 변경 파일·예외·완료 기준 도출','/build → /test → /review 순으로 작은 범위 구현','검증 근거와 원상복구 방법을 받은 뒤 배포 결정'],
 prompt:'Agent Skills를 사용해 [작업]을 진행해. 먼저 현재 코드를 읽고 /spec으로 요구사항·제약·완료 기준을 명세하고 /plan으로 파일 단위 작업 순서를 정리해. 구현은 변경 범위를 최소화하며 /test·/review 결과를 확인해. 기존 서비스·데이터·URL을 보호하고 실제 배포는 승인 전 진행하지 마.',
 checks:'spec 문서, 수정 파일, 테스트 결과, 롤백 절차',tip:'막연히 “만들어 줘”보다 /spec부터. 설치된 스킬 이름은 claude plugin list에서 확인.',cmd:'claude plugin list',docs:'https://github.com/addyosmani/agent-skills'},
 {id:'context',name:'Context7',glyph:'⌁',state:'API 연결 확인',role:'최신 공식 코드 문서',headline:'과거 API 대신 현재 버전의 공식 문서 사용',
 best:'Next.js/React 등 라이브러리 설정·오류 해결 시',where:'Claude 대화창 / MCP 자동',start:'use context7',steps:['기존 package.json에서 실제 라이브러리 버전 확인','프롬프트에 “use context7”을 붙여 요청','검색된 문서 버전·출처·API 시그니처 확인','현재 코드와 다른 부분만 수정','테스트·빌드로 예제가 실제로 작동하는지 확인'],
 prompt:'[라이브러리/버전]의 [기능]을 구현하려고 해. 현재 프로젝트의 실제 버전을 먼저 확인하고 Context7의 최신 공식 버전별 문서를 조회해. 문서에서 확인된 사용법과 deprecated API를 구분해. 그대로 붙여 넣을 코드, 변경할 파일, 테스트 조건, 공식 출처를 한국어로 알려 줘. use context7',
 checks:'MCP Connected, 공식 문서 링크, 버전 일치, 빌드 통과',tip:'맥 MCP 이름은 context7-key. 중복 Context7 플러그인은 비활성화 상태여도 정상.',cmd:'claude mcp list',docs:'https://context7.com/'},
 {id:'graphify',name:'Graphify',glyph:'⬡',state:'실제 AST 테스트 통과',role:'코드 지식 지도',headline:'기존 코드를 열어 파일·함수·호출 관계 추적',
 best:'남이 만든 프로젝트·복잡한 기능의 영향도 분석',where:'맥 터미널 / Claude',start:'graphify extract . --code-only --no-cluster',steps:['분석할 프로젝트 폴더의 원본을 백업','코드 전용 추출 명령 실행(LLM 키 불필요)','graphify-out/graph.json 생성 확인','Claude에게 해당 파일과 핵심 호출 흐름을 설명 요청','분석 결과가 실제 소스와 맞는지 교차 확인'],
 prompt:'이 프로젝트를 Graphify로 읽기 전용 분석해. graph.json을 생성하고 [기능]의 페이지→컴포넌트→함수→API→저장 구조를 쉽게 설명해. 수정하면 영향받는 파일과 보호할 기능을 구분하고, 확실하지 않은 연결은 추측이라고 표시해. 코드 수정은 하지 마.',
 checks:'graph.json 노드·엣지 수, 실제 코드 경로, 영향도 표',tip:'docs/PDF 등이 포함되면 API 키를 요청할 수 있어. 코드만이면 --code-only.',cmd:'graphify extract . --code-only --no-cluster',docs:'https://pypi.org/project/graphifyy/'},
 {id:'twentyfirst',name:'21st MCP',glyph:'◈',state:'MCP·CLI 검색 통과',role:'React UI 재사용',headline:'랜딩·대시보드 컴포넌트를 검색하고 적용',
 best:'브랜드 랜딩페이지·FAQ·가격표·관리 화면',where:'맥 터미널 / Claude',start:'21st search "landing hero" --limit 5',steps:['작업할 컴포넌트의 역할·디자인 기준 확정','21st search로 후보 검색하고 비교','선택한 UI를 현재 기술 스택에 맞게 Claude가 통합','모바일·접근성·클릭 동작 검증','무료 요금제 잔여 사용량 확인 후 가져오기'],
 prompt:'21st MCP에서 [UI 요소]를 검색해 실제 컴포넌트 3개 후보의 디자인·호환성·의존성을 비교해. 현재 프로젝트와 맞는 1개만 선택해 브랜드 폰트·색상·모바일 레이아웃에 맞춰 통합하고 버튼·탭·모달 동작을 검증해. 유료 AI 생성 기능은 사용하지 마.',
 checks:'21st CLI 검색 결과, 무료 사용량, 모바일 정상 동작',tip:'MCP 검색과 21st AI 생성은 달라. 무료 계정은 코드 가져오기 제한이 있음.',cmd:'21st usage --json',docs:'https://21st.dev/mcp'},
 {id:'strix',name:'Strix',glyph:'⛨',state:'설치·LLM 검증 / 스캔 미실행',role:'내 웹앱 보안 점검',headline:'읽기 전용 리뷰부터 시작, 전체 스캔은 별도',
 best:'자체 개발 앱의 로그인·예약·API·관리자 권한 검사',where:'맥 터미널 / Claude',start:'strix --help',steps:['본인 소유·테스트 허가된 로컬/스테이징 대상만 선택','코드·권한·키 노출 등 읽기 전용 정적 검토','Docker 동작과 무료 LLM 도구 호출 확인','실제 Strix 스캔은 범위·비용·트래픽·데이터 안전성 확인 후 수행','근거·재현 결과·수정안 보고'],
 prompt:'[내 소유 로컬 앱]의 보안을 먼저 읽기 전용으로 점검해 줘. Strix 설치·Docker·무료 모델 설정을 검증하고 로그인·권한·입력값·API 키 노출 위험을 우선 분석해. 운영 사이트 공격, DB 쓰기, 실제 침투 스캔은 승인 전 하지 마. 증거 기반 문제·위험도·패치 계획을 보고해.',
 checks:'권한 확인, 코드 위험 리뷰, 실제 스캔은 미검증으로 표시',tip:'Strix 1.7.0 설치와 모델 함수 호출은 검증. 실제 침투 테스트는 미검증.',cmd:'strix --version',docs:'https://github.com/usestrix/strix'},
 {id:'docker',name:'Docker',glyph:'▣',state:'실제 컨테이너 구동 성공',role:'격리된 로컬 서버',headline:'프로젝트별 테스트 서버·DB를 동일 환경으로 실행',
 best:'개발 서버·데이터베이스·작업 도구 격리 실행',where:'맥 터미널',start:'docker run --rm hello-world',steps:['Docker Desktop이 실행 중인지 확인','docker ps로 기존 컨테이너를 살펴보기','프로젝트 docker compose 설정·포트·볼륨 확인','docker compose up -d로 개발용 서비스 실행','로그·localhost 기능 확인 후 안전하게 중지'],
 prompt:'[앱]을 Docker로 로컬 실행할 수 있게 구성해. 필요한 포트, 이미지, 볼륨, 환경변수와 네트워크 권한을 정리하고 운영 DB에 접속하지 않도록 해. docker compose 실행·헬스체크·로그와 복구 명령을 작성하고 데이터 삭제를 유발하는 옵션은 피하도록 해.',
 checks:'Docker daemon 정상, 컨테이너 기동, localhost 헬스체크',tip:'docker compose down -v는 볼륨을 삭제할 수 있어 사용하지 않기.',cmd:'docker ps',docs:'https://docs.docker.com/desktop/'},
 {id:'craft',name:'Craft Anything',glyph:'◉',state:'앱·MCP·AI 연결 healthy',role:'참고 소프트웨어 연구 → 새 구현 → 비교 검증',
 headline:'기존 웹/앱/게임을 분석해서 새 프로젝트를 설계·구현',
 best:'참고 사이트 UI, 자체 앱의 기능·동작, 게임 프로토타입 연구',where:'Craft Anything 앱 또는 Claude MCP',start:'craft-anything-cli doctor --client claude_code',
 steps:['앱 실행 또는 Claude Code에서 Craft Anything MCP 사용','Study 대상으로 웹·앱·게임·파일 중 하나 선택','기본 Clean Room으로 방문자가 보는 UI와 동작 연구','원하는 새 프로젝트의 요구사항·기술 스택을 명시하고 Build 진행','Check에서 원본과 화면·기능 비교, 승인된 범위만 개선'],
 prompt:'Craft Anything의 Study → Build → Check 흐름으로 [참고 URL/앱]을 분석해 줘. 먼저 Clean Room 모드에서 공개 UI·화면·사용자 흐름만 조사하고, 확인된 사실과 추측을 구분해. 내가 소유한 별도 폴더에 [목표 기능]을 구현하도록 작업 계획을 만들고, 모바일 390px·데스크톱 화면과 버튼·검색·탭 동작을 원본과 비교해. Deep 모드·원본 파일 접근·외부 게시·유료 API 사용은 별도 승인 없이는 하지 마.',
 checks:'MCP Connected, Study 증거, 새 프로젝트 파일, Check 비교표',tip:'macOS Craft Anything 0.5.0 앱/CLI 설치. Claude Code 빌더·무료 OpenRouter 분석 모델 연결. 브라우저·역공학 보조 엔진은 추가 설치가 필요할 수 있음.',
 cmd:'craft-anything-cli doctor --client claude_code',docs:'https://github.com/storytold/craft-anything'}
];
const craftScenarioData=[
 {id:'craft-copy-web',category:'installed',icon:'◉',title:'참고 웹사이트 UI·동작을 연구하고 새 화면을 만들 때',short:'Craft Anything · Clean Room · Study → Build → Check',tools:['Craft Anything','Claude Code','21st MCP'],command:'craft-anything-cli doctor --client claude_code',warning:'참고 사이트 코드를 무단 복사하지 말고 화면과 사용자 흐름을 바탕으로 독자 구현해.',
 steps:['Craft Anything 앱을 실행하고 웹사이트 연구 모드 선택.','기본 Clean Room에서 화면 구성·스크롤·메뉴·검색 동작을 관찰.','새 프로젝트 폴더와 목표 기술 스택을 분리해 지정.','Claude Code 빌더로 UI와 기능을 구현.','390px·768px·데스크톱과 버튼·탭·검색을 실제 비교.'],
 prompt:'Craft Anything으로 [공개 참고 사이트 URL]을 Clean Room 모드로 분석해. 보이는 화면·레이아웃·메뉴·검색·동작만 조사해 근거를 표로 만들고, 내 프로젝트 [별도 폴더]에 [기능과 스타일]을 독자 구현해. 원본 소스·비공개 파일을 읽지 말고 390px·768px·1440px에서 UI·반응형·기능을 비교한 결과를 보여 줘.',verify:'참고 화면 관찰 기록, 독립 프로젝트, 전후 화면·기능 검증'},
 {id:'craft-study-app',category:'installed',icon:'⌕',title:'내가 만든 앱의 작동 원리를 정확히 이해할 때',short:'Craft Anything · 앱 구조·행동·버튼 추적',tools:['Craft Anything','Graphify'],command:'craft-anything-cli triage --help',warning:'Deep 모드는 소유하거나 허가받은 앱에만 사용해.',
 steps:['분석 대상이 본인 소유인지 확인.','앱 파일 또는 실행화면을 Study로 등록.','클릭·설정·입력 흐름을 관찰.','필요할 때만 Deep mode 범위를 별도 지정.','관찰한 동작과 구현 제안을 나눠 정리.'],
 prompt:'Craft Anything으로 내가 소유한 [앱]의 화면과 사용자 동작을 먼저 분석해. 어떤 입력이 어느 결과로 연결되는지 확인하고, 실행 파일에 접근하지 않고도 확인할 수 있는 증거를 우선 보여 줘. 내부 파일 검사가 필요하면 Deep 모드의 근거와 위험을 별도 작성하고 내 승인 없이 켜지 마.',verify:'화면별 사용자 행동표, 근거, 미확인 항목'},
 {id:'craft-ui-check',category:'installed',icon:'▦',title:'만든 화면이 참고 디자인과 얼마나 다른지 검사할 때',short:'Craft Anything Check · 390px·태블릿·데스크톱 비교',tools:['Craft Anything','Agent Skills'],command:'craft-anything-cli commands',warning:'보이는 화면의 유사도와 실제 기능 완성도를 별도로 평가해야 해.',
 steps:['기준 화면과 제작한 페이지를 준비.','구조·색상·간격·폰트·이미지 비교.','버튼·검색·탭·모바일 반응형 기능 테스트.','차이점은 영향 순서로 정리해 Claude에 전달.','수정 후 동일 기준으로 다시 비교.'],
 prompt:'Craft Anything Check를 사용해 [참고 화면]과 [새로 만든 페이지]를 390/768/1440px에서 비교해. 배치·여백·폰트·컬러·이미지의 시각 차이와 버튼·필터·검색의 기능 차이를 나눠 보고해. 큰 차이 5개부터 최소 변경으로 고친 뒤 다시 검사해. 기능이 동작하지 않는데 모양만 같다는 이유로 완료하지 마.',verify:'화면 3종 비교, 인터랙션 테스트, 수정 후 재점검'},
 {id:'craft-game',category:'installed',icon:'▶',title:'참고 게임의 조작·물리 규칙을 연구할 때',short:'Craft Anything · 게임 동작·키보드·판정 로직',tools:['Craft Anything','Agent Skills'],command:'craft-anything-cli doctor --client claude_code',warning:'기존 게임 리소스·코드·브랜드 자산 무단 복제 없이 게임 메커니즘을 연구해.',
 steps:['참고 게임의 공개 플레이를 관찰.','키 입력·충돌·점수·일시정지 등 메커니즘 목록화.','별도 폴더에 독자 게임 설계.','Claude Code 빌더로 조작·루프·승패 구현.','실제 플레이와 자체 테스트로 판정 검증.'],
 prompt:'Craft Anything으로 [게임 레퍼런스]의 공개 플레이 메커니즘을 관찰해. 조작법·장애물·충돌 판정·점수·승패·속도 변화를 표로 정리하고, 원본 코드나 아트 자산을 복제하지 않는 새 [웹/데스크톱] 게임을 구현해. 사용자 플레이 테스트와 오류 시나리오를 통해 실제 동작을 검증해.',verify:'조작 설명, 동작 테스트, 게임 플레이 확인'},
 {id:'tools-combo',category:'installed',icon:'✳',title:'5개 스킬을 어떤 순서로 조합할지 모를 때',short:'Agent Skills → Context7/Graphify → 21st → 테스트',tools:['Agent Skills','Context7','Graphify','21st MCP','Docker'],command:'claude',warning:'모든 도구를 매번 전부 쓰지 말고 목적에 맞는 것만 호출해.',
 steps:['새 기능인지 기존 코드 수정인지부터 판단.','Agent Skills /spec에서 범위·완료 조건을 확정.','기존 구조가 복잡하면 Graphify, 최신 라이브러리는 Context7.','UI가 필요하면 21st로 후보 검색.','Docker 로컬 테스트, 필요 시 Strix 읽기 전용 리뷰.'],
 prompt:'현재 요청 [작업]에 설치된 도구 중 필요한 것만 골라 줘. Agent Skills로 계획을 세우고, 기존 코드 의존성은 Graphify, 버전별 공식 API는 Context7, UI는 21st, 환경 검증은 Docker, 보안 검토는 Strix, 참고 제품 분석은 Craft Anything을 검토해. 선택한 도구의 이유·실행 순서·근거·미사용 이유를 보고하고 승인 범위 밖으로 실행하지 마.',verify:'선택 도구, 실행 순서, 테스트 기준'},
 {id:'installed-check',category:'installed',icon:'⚙',title:'병원 맥에서 설치·연결 상태부터 확인할 때',short:'7개 도구 점검 명령 · 연결 오류 분리',tools:['Claude Code','Craft Anything','Docker'],command:'claude mcp list',warning:'환경변수 실제 값은 출력하지 말고 설정 여부만 확인.',
 steps:['claude --version·plugin list로 핵심 설치 상태 확인.','claude mcp list에서 21st·context7-key·craft-anything Connected 확인.','graphify --version·strix -v·docker info 실행.','craft-anything-cli doctor로 엔진/AI 상태 검증.','실패한 도구만 수정하고 이미 동작하는 설정을 보존.'],
 prompt:'병원 맥의 Claude Code 설치 도구 상태를 점검해. Agent Skills, Context7, Graphify, 21st MCP, Strix, Docker, Craft Anything의 버전·CLI 위치·MCP 연결·핵심 실행을 직접 확인해. API 키 값은 표시하지 말고 정상/제한/미검증 상태를 나눠 표로 보고해. 실패한 도구만 수정하고 기존 다른 설정을 보존해.',verify:'CLI 및 MCP 실제 상태, 연결 오류 근거'}
];
scenarios.push(...craftScenarioData);
const installedPromptData=[
 ['skill-start','설치한 도구 자동 선택','7개 중 필요한 도구만 사용','Agent Skills /spec으로 목적·범위·완료 기준을 확정하고, 현재 프로젝트를 읽어 Context7, Graphify, 21st, Strix, Docker, Craft Anything 중 꼭 필요한 것만 선택해. 선택 이유와 정확한 실행 순서, 실패 가능성, 완료 검증 방법을 표로 작성해. 사용하지 않는 도구는 호출하지 말고 운영 환경은 승인 전 변경하지 마.'],
 ['craft-study','Craft Anything — 참조 연구','Clean Room으로 화면·동작 관찰','Craft Anything을 사용해 [참고 웹사이트/앱]을 Clean Room으로 Study해. 방문자가 볼 수 있는 화면, 메뉴·필터·버튼, 정보 구조, 390px 모바일 레이아웃을 관찰하고 증거와 미확인 항목을 나눠 줘. 원본 소스·비공개 파일은 읽지 마.'],
 ['craft-build','Craft Anything — 독자 구현','Study → Build → Check','Craft Anything의 Study → Build → Check 흐름으로 [참고 URL]의 공개 UI·동작을 연구한 뒤 [새 프로젝트 폴더]에 독자 구현해. 필요한 컴포넌트는 21st MCP에서 검색하고 최신 문서에는 Context7을 써. 390px·768px·1440px 비교와 버튼·검색·탭 기능 점검 후 차이점과 수정 내역을 보고해. 운영 배포는 보류해.'],
 ['craft-verify','Craft Anything — 시각·기능 비교','시각만 비슷한 가짜 완료 방지','[참고 페이지]와 [제작 페이지]를 Craft Anything의 Check로 비교해. 색·폰트·간격·이미지·반응형 등 시각적 차이와 검색·버튼·모달 등 기능적 차이를 별도 평가해. 완료로 판단한 각 항목에 실제 테스트 근거를 붙이고, 미검증 항목을 남겨 줘.'],
 ['craft-game','Craft Anything — 게임 연구','공개 게임 메커니즘 분석','Craft Anything으로 [참고 게임]의 공개 플레이 동작을 관찰하고 키보드·이동·충돌·점수·승패 규칙을 정리해. 같은 규칙을 새 HTML5 게임으로 독자 구현하되 원본 자산·소스를 복제하지 마. 자동 테스트와 실제 조작 검증을 포함해.'],
 ['installed-fix','도구 진단·자동 복구 범위','연결 실패 원인만 정밀 해결','병원 맥에 설치한 Claude Code 7개 도구의 설치·버전·MCP 연결·모델 설정을 확인해. 확인된 오류에 대해서만 백업 후 수정하고, 이미 동작하는 플러그인을 중복 설치하지 마. 키는 값 대신 존재 여부만 표시하고 재검증 결과를 한국어로 보고해.'],
 ['installed-motion','모션 제작 프로젝트에 설치 도구 활용','Craft/Graphify/21st/Agent Skills 조합','[참고 모션 웹페이지]를 Craft Anything Clean Room으로 관찰해. 설치된 Agent Skills로 요구사항을 명세하고, 기존 코드의 구조는 Graphify로 확인해. 필요할 때 21st UI 검색과 Context7 API 확인을 거친 뒤 CSS/GSAP/Motion 중 적절한 모션을 구현해. 모션 실습실에서 재생·모바일·reduced-motion 설정을 테스트하고 결과가 실제로 움직였는지 증거를 보고해.']
];
prompts.push(...installedPromptData.map(([id,name,about,body])=>({id,cat:'develop',name,about,body})));
toolsData.push({
 id:'craft',name:'Craft Anything',icon:'◉',subtitle:'웹·앱·게임 분석 → 독자 구현 → 비교 검증',status:'MCP·AI 건강 상태 확인',
 intro:'공식 Craft Anything v0.5.0 앱 및 CLI가 병원 맥에 설치돼 있어. Claude Code에 craft-anything MCP/스킬을 등록했고, 기존 Claude Code 빌더와 OpenRouter 무료 분석 모델까지 연결한 뒤 doctor 결과가 healthy로 확인됐어. 기본 모드는 Clean Room이며 Deep 모드는 원본 내부 접근이 필요하고 별도 동의를 전제로 해.',
 can:['공개 웹·앱 UI/인터랙션 관찰과 근거 수집','새 프로젝트 폴더에 별도의 웹앱·게임을 개발하도록 에이전트 연결','Check 단계에서 원본/신규 구현의 화면·기능 차이 비교','코딩 에이전트와 MCP 연동·CLI로 작업 자동화','Clean Room·Deep 모드 범위 구분'],
 best:'레퍼런스를 바탕으로 다른 디자인·기능의 제품을 만들거나, 기존 앱을 이해하고 자체 버전을 구현할 때.',
 steps:['/Applications/Craft Anything.app을 실행하거나 CLI에서 craft-anything-cli doctor를 실행.','참고 웹/앱/게임 선택, Clean Room 기본으로 관찰 범위를 설정.','새 프로젝트 폴더와 원하는 구현 스택·기능을 명시.','Claude Code 빌더가 새 프로젝트로 구현하도록 지시.','Check에서 화면 크기별 비교 및 실제 인터랙션 재검증.'],
 commands:[{location:'MAC 터미널 · 설치·모델 점검',cmd:'craft-anything-cli doctor --client claude_code'},{location:'MAC 터미널 · 연결된 분석 모델',cmd:'craft-anything-cli ai list --format text'},{location:'MAC 터미널 · 지원 명령',cmd:'craft-anything-cli commands'},{location:'MAC 터미널 · 파일 첫 분석',cmd:'craft-anything-cli triage [내_파일_경로] --clean-room'}],
 prompt:'Craft Anything으로 [참고 사이트/앱/게임]의 공개 화면·동작을 Clean Room으로 연구해. 관찰 기록과 실제 근거·미확인 내용을 구분하고, 내가 소유한 [새 프로젝트 폴더]에 [필요한 기능]을 독자 구현해. 390px 모바일·데스크톱의 화면 및 버튼·탭·검색 동작을 직접 비교해 부족한 부분을 목록화한 다음, 승인된 범위만 보완해. Deep 모드와 운영 배포는 하지 마.',
 caution:'0.5.0 초기 버전. 일부 선택 엔진(Chromium, Ghidra 등)은 추가 설치해야 하고, 실제 레퍼런스 기반 전체 재구축 프로젝트 테스트는 아직 완료되지 않았어. 영상의 데모를 곧바로 사용자 맥에서도 모두 완성된 기능으로 단정하지 마.',
 source:'https://github.com/storytold/craft-anything'
});
const preferred=['agent','context','graphify','twentyfirst','strix','docker','craft','remotion','motion','gsap'];
toolsData.sort((a,b)=>preferred.indexOf(a.id)-preferred.indexOf(b.id));

let activeSkillGuide='agent';
function guideEscape(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderInstalledGuide(){
 const tabs=document.querySelector('#installed-guide-tabs'),body=document.querySelector('#installed-guide-body');
 if(!tabs||!body)return;
 tabs.innerHTML=installedSkillGuides.map(x=>'<button type="button" role="tab" aria-selected="'+(x.id===activeSkillGuide)+'" data-skill-tab="'+x.id+'"><span>'+x.glyph+'</span>'+x.name+'</button>').join('');
 const g=installedSkillGuides.find(x=>x.id===activeSkillGuide);if(!g)return;
 body.innerHTML='<div class="skill-focus-intro"><div><span class="skill-overline">'+guideEscape(g.role)+'</span><h3>'+guideEscape(g.headline)+'</h3><p>언제 쓰나? '+guideEscape(g.best)+'</p></div><span class="skill-verified">'+guideEscape(g.state)+'</span></div>'+
 '<div class="skill-focus-cols"><div class="skill-pane"><h4>어디서 시작해?</h4><p><strong>'+guideEscape(g.where)+'</strong></p><div class="skill-copyline"><code>'+guideEscape(g.start)+'</code><button type="button" data-value="'+guideEscape(g.start)+'">복사 ⧉</button></div><h4>작업 순서</h4><ol>'+g.steps.map(a=>'<li>'+guideEscape(a)+'</li>').join('')+'</ol></div>'+
 '<div class="skill-pane"><h4>이 도구 전용 프롬프트</h4><pre>'+guideEscape(g.prompt)+'</pre><button class="skill-big-copy" type="button" data-value="'+guideEscape(g.prompt)+'">전체 프롬프트 복사 ⧉</button></div></div>'+
 '<div class="skill-bottom"><div><strong>✓ 결과 확인</strong><p>'+guideEscape(g.checks)+'</p></div><div><strong>! 주의</strong><p>'+guideEscape(g.tip)+'</p></div></div>'+
 '<div class="skill-bottom-links"><a href="'+guideEscape(g.docs)+'" target="_blank" rel="noopener noreferrer">공식 자료 ↗</a><button type="button" data-go-tool="'+guideEscape(g.id)+'">도구별 상세 보기 ↗</button></div>';
}
document.addEventListener('DOMContentLoaded',()=>{
 renderInstalledGuide();
 document.querySelector('#installed-guide-tabs')?.addEventListener('click',e=>{
  const t=e.target.closest('[data-skill-tab]');if(!t)return;
  activeSkillGuide=t.dataset.skillTab;renderInstalledGuide();
 });
 document.querySelector('#installed-guide-body')?.addEventListener('click',e=>{
  const b=e.target.closest('[data-go-tool]');if(!b)return;
  state.tool=b.dataset.goTool;renderToolTabs();renderToolContent();
  document.querySelector('#toolkit')?.scrollIntoView({behavior:'smooth'});
 });
 // Category and counters follow actual registered data.
 const s=document.querySelectorAll('.stats strong');
 if(s[0])s[0].textContent=String(categories.length-1).padStart(2,'0');
 if(s[1])s[1].textContent=String(scenarios.length).padStart(2,'0');
 if(s[2])s[2].textContent=String(prompts.length).padStart(2,'0');
});
