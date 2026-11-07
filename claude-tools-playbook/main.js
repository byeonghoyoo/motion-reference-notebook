'use strict';
const categories=[
  {id:'all',name:'전체',icon:'✳'},
  {id:'develop',name:'기획·개발',icon:'⌘'},
  {id:'design',name:'디자인·랜딩',icon:'◈'},
  {id:'analyze',name:'코드 분석',icon:'⌁'},
  {id:'debug',name:'오류·성능',icon:'⛭'},
  {id:'marketing',name:'SEO·마케팅',icon:'↗'},
  {id:'security',name:'보안·Docker',icon:'⛨'},
  {id:'automation',name:'자동화·배포',icon:'⚙'}
];
const scenarios=[
{id:'new-feature',category:'develop',icon:'⌘',title:'새 웹 기능을 처음부터 만들 때',short:'예약 캘린더·관리자 대시보드·검색 기능',tools:['Agent Skills','Context7','Docker'],steps:['프로젝트 경로에서 claude를 실행하고 새 기능의 목적, 입력, 결과를 /spec으로 정의해.','/plan으로 수정 파일과 데이터 흐름을 먼저 정리해.','라이브러리 API는 Context7으로 현재 버전의 공식 문서를 확인해.','/build로 기능을 작은 단위로 구현하고 /test로 정상·오류 케이스를 확인해.','기능 검증 보고 후에만 배포를 선택해.'],prompt:'[프로젝트]에 [새 기능]을 개발해 줘.\n1. 현재 소스·기존 사용자 흐름과 기술 스택부터 확인해.\n2. Agent Skills /spec으로 사용자 시나리오·입력·출력·예외 상황을 정리하고, /plan으로 수정 파일을 특정해.\n3. 변경이 잦은 라이브러리는 Context7 공식 문서와 실제 설치 버전을 대조해.\n4. 핵심 기능을 작은 단위로 구현하고 테스트·린트·빌드를 실행해.\n5. 기존 기능과 저장된 데이터는 유지하고, 문제가 생기면 원본으로 되돌려.\n6. 완료 보고에는 변경 파일, 테스트 결과, 미해결 위험, 실행 방법을 적어.\n사용자 승인 전에는 운영 서비스에 배포하지 마.',verify:'구현 파일 목록 / 테스트 통과 / 기존 사용자 흐름 유지 / 로컬 실행 확인',command:'claude',warning:'운영 DB·예약 시스템 수정은 작업 범위 승인 후 진행.'},
{id:'requirements',category:'develop',icon:'▤',title:'요구사항이 정리가 안 될 때',short:'아이디어 → 개발 명세서 → 할 일 목록',tools:['Agent Skills'],steps:['생각나는 기능과 이유를 자연어로 적어.','/spec으로 필수 기능과 선택 기능, 사용자 여정, 예외를 구분해.','/plan으로 각 작업의 우선순위·난도·완료 기준을 만들게 해.','개발 전에 예상되는 위험을 검토해.','명세에 동의한 기능만 개발하도록 제한해.'],prompt:'나는 [아이디어]를 만들고 싶어. 아직 기획이 구체적이지 않아.\nAgent Skills의 spec과 plan 단계를 활용해 다음을 정리해 줘.\n- 해결할 문제와 실제 사용자\n- 필수 기능 / 있으면 좋은 기능 / 이번 범위에서 제외할 기능\n- 화면별 사용자 흐름과 예외 상황\n- 필요한 데이터·외부 서비스·권한\n- 작업 순서와 각 단계의 완료 기준\n- 예상되는 위험 및 확인이 필요한 사실\n먼저 실행 가능한 기획서와 체크리스트만 만들어. 승인 전 코드는 수정하지 마.',verify:'필수·선택 기능이 구분된 명세서 / 우선순위 / 완료 기준',command:'/spec',warning:'아이디어 설명만으로 상용 서비스에 기능을 추가하지 않기.'},
{id:'takeover',category:'develop',icon:'⇄',title:'다른 개발자가 만든 코드를 이어받을 때',short:'인수인계·영향도 파악·안전한 수정',tools:['Graphify','Agent Skills','Context7'],steps:['현재 프로젝트 소스를 읽고 수정되지 않은 백업/깃 상태를 확인해.','/graphify . 또는 코드 전용 추출로 함수·컴포넌트 관계도를 생성해.','기능의 시작 지점부터 데이터 저장까지 연결을 추적해.','위험도가 높은 의존성부터 테스트 시나리오를 만들고 작업해.','현재 동작과 변경 후 동작을 나란히 검증해.'],prompt:'이 프로젝트는 다른 사람이 만든 코드야. 우선 읽기 전용으로 인수인계 보고서를 작성해 줘.\n1. Graphify로 페이지·컴포넌트·함수·API·DB 연결을 조사해.\n2. 핵심 사용자 흐름 5개, 진입 파일, 데이터 이동 경로를 알려 줘.\n3. [변경하려는 기능]에 영향을 받을 파일·기능을 표로 정리해.\n4. 기존 기능의 회귀 테스트 목록과 수정 우선순위를 제시해.\n5. 기술적으로 불확실한 부분은 실제 코드와 Context7 문서로 확인해.\n이 단계에서는 파일을 수정하지 말고 분석 결과와 작업 계획만 내놔.',verify:'구조 맵 / 데이터 흐름 / 수정 영향 목록 / 회귀 테스트 시나리오',command:'/graphify .',warning:'대규모 작업 전 git status를 확인하고 원본을 보존.'},
{id:'landing',category:'design',icon:'◈',title:'프리미엄 병원 랜딩페이지를 만들 때',short:'히어로·시술정보·예약 CTA·모바일 화면',tools:['21st MCP','Agent Skills','Context7'],steps:['경쟁 사이트 복제가 아니라 원하는 브랜드 톤과 필수 섹션을 정의해.','21st에서 히어로·FAQ·카드·CTA 관련 컴포넌트를 검색해.','미리보기 2~3안을 비교하고 React/Tailwind 버전에 맞게 통합해.','모바일 360/390/768/1440px을 포함해 가독성과 반응형을 확인해.','의료광고 문구는 임상 근거·검토 상태를 분리하고 배포 전 승인받아.'],prompt:'[시술명] 랜딩페이지를 React/Next.js로 만들어 줘.\n목표는 정보 탐색과 예약 CTA이고, 브랜드 방향은 [차분한 프리미엄/에디토리얼/미니멀]이야.\n1. 기존 사이트 구성·폰트·색상 규칙을 먼저 파악해.\n2. 21st MCP에서 히어로, 시술 FAQ, 카드, CTA 컴포넌트를 찾아 3개 후보의 장단점을 비교해.\n3. 기존 프로젝트와 호환되는 구성으로 실제 코드를 작성해.\n4. 모바일 화면, 키보드 탐색, 이미지 최적화, CTA 클릭 추적을 테스트해.\n5. 효과 보장·최상급·의학적 단정 문장은 사용하지 마. 의료진 검토가 필요한 문구는 검토 상태로 표시해.\n6. 로컬 미리보기 URL과 수정 파일 목록을 먼저 보고하고, 운영 배포는 하지 마.',verify:'모바일 레이아웃 / 명확한 예약 CTA / 텍스트 가독성 / 기존 트래킹 정상',command:'21st search "landing hero" --limit 5',warning:'21st 무료 요금제는 코드 가져오기 횟수 제한이 있을 수 있음.'},
{id:'dashboard',category:'design',icon:'▦',title:'데이터 대시보드를 예쁘게 만들 때',short:'업로드 현황·예약·매출·담당자별 보드',tools:['21st MCP','Agent Skills'],steps:['누가 어떤 숫자를 봐야 하는지 KPI를 먼저 정해.','21st로 대시보드 표·탭·그래프·필터 UI를 검색해.','데이터 구조와 필터 조건을 계획하고 화면을 구현해.','값이 없을 때·모바일·많은 데이터일 때 동작을 확인해.','실제 데이터 연동 전에는 샘플 데이터로 테스트해.'],prompt:'[데이터 출처]를 보여 주는 업무 대시보드를 만들어 줘.\n필수 KPI: [항목들]. 필터: [날짜·채널·담당자].\n21st에서 카드·표·탭·필터·차트 컴포넌트를 검색해 레이아웃을 제안해.\n사용자에게 필요한 정보를 첫 화면 상단에 배치하고, 모바일에서도 필터와 표가 작동하도록 해.\n데이터가 0건·누락·오류인 경우의 상태도 설계하고, 실제 데이터 변경은 금지해.\n예제 데이터로 미리보기를 만들고, 코드·사용법·테스트 결과를 보고해.',verify:'데이터 0건 처리 / 필터 정확성 / 화면 크기별 가독성',command:'21st search "dashboard" --limit 5',warning:'실제 스프레드시트 수정·이메일 발송은 별도 작업으로 분리.'},
{id:'redesign',category:'design',icon:'✎',title:'밋밋한 기존 화면을 다시 디자인할 때',short:'레이아웃·폰트·버튼·인터랙션 개선',tools:['21st MCP','Agent Skills'],steps:['현재 화면 스크린샷과 CSS 토큰을 확인해.','좋은 점과 불편한 점을 먼저 나눠 분석해.','21st에서 2~3가지 구성 방향을 찾아 비교해.','레이아웃·타이포그래피만 우선 수정하고 기능 로직은 보존해.','전후 스크린샷·모바일·기능 회귀 테스트를 확인해.'],prompt:'현재 [페이지]의 디자인만 개선하고 싶어.\n동작·URL·SEO 제목·추적 이벤트·콘텐츠 데이터는 변경하지 마.\n1. 현재 구조와 스타일 토큰을 읽고 어색한 점을 근거와 함께 찾아.\n2. 21st 컴포넌트를 참고해 상이한 3가지 디자인 방향을 설명해.\n3. 선택한 방향으로 기존 기술 스택에 맞춘 코드를 수정해.\n4. 360px·390px·768px·데스크톱에서 비교하고 버튼·탭·모달이 그대로 작동하는지 확인해.\n5. 전후 변경 목록과 되돌리기 방법을 보고해.',verify:'기능 그대로 유지 / 모바일 스크린샷 / 변경 전후 차이',command:'/review',warning:'코드 재작성보다 최소 변경 우선.'},
{id:'graph',category:'analyze',icon:'⬡',title:'프로젝트 전체 구조를 한눈에 볼 때',short:'함수·페이지·API 연결 지식 그래프',tools:['Graphify'],steps:['분석할 코드 폴더로 이동해.','Claude Code에서 /graphify . 를 요청하거나 터미널에서 코드 전용 AST 추출을 실행해.','graphify-out/graph.json 결과를 확인해.','특정 파일이 다른 파일에 영향을 주는지 질문해.','필요하면 Graphify가 만든 시각화와 보고서를 열어.'],prompt:'Graphify를 이용해서 이 프로젝트의 실제 코드 구조를 분석해 줘.\n- 페이지·컴포넌트·함수·API·상태관리·데이터 저장을 구분해.\n- 중요한 모듈 10개와 의존성, 수정 위험도를 설명해.\n- [궁금한 기능]의 호출·데이터 흐름을 처음부터 끝까지 추적해.\n- 구조를 잘 모르는 마케터도 이해할 수 있는 한국어 표와 예시를 포함해.\n- 분석 결과물 경로를 알려 주고, 소스 파일은 수정하지 마.',verify:'graph.json 생성 / 주요 노드·엣지 확인 / 구조 설명',command:'graphify extract . --code-only --no-cluster',warning:'코드 외 문서까지 자동으로 분석하면 별도 AI 설정이 필요할 수 있음.'},
{id:'impact',category:'analyze',icon:'⇢',title:'버튼 하나 수정해도 어디까지 영향이 갈지 볼 때',short:'영향 범위·의존성·회귀 위험 추적',tools:['Graphify','Agent Skills'],steps:['수정하려는 버튼·함수·페이지 이름을 특정해.','Graphify로 연결된 호출 관계를 분석해.','UI·API·결제·예약 추적처럼 연결된 영역을 구분해.','회귀 테스트 체크리스트를 만든 후 최소 범위 수정해.','원래 버전과 결과를 비교해.'],prompt:'[수정할 기능/함수명]을 바꾸면 어떤 곳이 영향받을지 먼저 알려 줘.\nGraphify 그래프에서 직접 연결·간접 연결을 구분하고, 사용자 화면·API·데이터·로그·분석 이벤트별 위험을 정리해.\n수정이 꼭 필요한 파일과 건드리면 안 되는 파일을 나누고, 회귀 테스트 10개를 작성해.\n분석 중 코드 변경이나 배포는 하지 마.',verify:'영향 범위 / 수정 제한 / 회귀 테스트 계획',command:'graphify query "예약 버튼 연결 경로"',warning:'Graphify 결과는 실제 코드와 테스트로 한 번 더 검증.'},
{id:'cleanup',category:'analyze',icon:'☷',title:'코드가 복잡해져 정리하고 싶을 때',short:'중복 코드 제거·컴포넌트 분리·리팩토링',tools:['Graphify','Agent Skills'],steps:['기존 테스트가 어떤 동작을 보호하는지 확인해.','중복 코드·큰 함수·의존성 문제를 식별해.','우선 작은 영역 하나만 리팩토링해.','기능·화면·API 응답이 이전과 같은지 검증해.','동일한 방법으로 나머지 영역을 순차 정리해.'],prompt:'현재 코드는 동작하지만 유지보수가 어려워.\nGraphify로 의존성을 파악한 뒤 중복 코드, 지나치게 큰 함수, 사용되지 않는 파일을 찾아 위험도순으로 보고해.\n외부 인터페이스·화면 모양·URL·API 응답은 바꾸지 않는 리팩토링 계획을 제시해.\n한 번에 전체를 바꾸지 말고 가장 안전한 1개 단위로 수정하고 테스트해.\n테스트 전후가 동일하지 않으면 롤백해.',verify:'동일한 동작 / 테스트 통과 / 변경 파일 소수 유지',command:'/plan',warning:'그럴듯하게 보이는 대규모 삭제 금지.'},
{id:'bug',category:'debug',icon:'⚠',title:'에러가 나는데 원인을 모를 때',short:'빌드 실패·API 오류·버튼 먹통',tools:['Agent Skills','Context7'],steps:['오류 메시지와 재현 순서를 먼저 확보해.','재현 가능 여부를 확인하고 원인을 2~3가지로 좁혀.','Context7으로 해당 라이브러리의 현재 버전 문법을 확인해.','가장 작은 수정으로 고치고 동일 시나리오로 다시 테스트해.','왜 발생했는지와 재발 방지책을 기록해.'],prompt:'다음 오류를 해결해 줘: [에러 로그 붙여 넣기].\n프로젝트 버전과 발생 조건부터 확인하고 재현 방법을 찾은 뒤, 원인 후보를 증거와 함께 순서대로 알려 줘.\n관련 API 문법은 Context7 공식 문서를 확인해.\n실제 원인을 증명할 수 있는 가장 작은 수정만 적용하고, 정상 케이스·실패 케이스·기존 기능을 테스트해.\n잘못된 원인 가설은 수정하지 말고 철회해. 변경 내용·원인·검증 결과를 한국어로 보고해.',verify:'오류 재현 → 수정 → 재현 안 됨 / 기존 기능 정상',command:'/test',warning:'에러를 숨기거나 try/catch만 추가하는 임시 땜질 경계.'},
{id:'upgrade',category:'debug',icon:'↻',title:'Next.js·React 버전 업그레이드할 때',short:'최신 문법·마이그레이션·호환성 확인',tools:['Context7','Agent Skills'],steps:['현재 package.json과 잠금 파일에서 버전을 파악해.','올릴 목표 버전을 정하고 Context7 공식 문서의 Breaking Changes를 확인해.','코드베이스에서 영향을 받는 기능을 검색해.','새 브랜치에서 단계별 전환·테스트를 진행해.','오류 발생 시 버전·설정을 롤백해.'],prompt:'이 프로젝트의 [라이브러리] 버전을 [현재]에서 [목표]로 전환할 수 있는지 검토해.\nContext7의 해당 버전 공식 문서를 기준으로 변경·폐지 API와 설정 차이를 찾아.\n영향받는 파일과 위험도를 보고하고, 테스트 기준을 정한 뒤 별도 브랜치에서 단계별로 수정해.\n패키지 버전과 코드의 일치 여부, 테스트·빌드·접근성을 확인하고 운영 배포는 승인 전 보류해.',verify:'의존성 버전 확인 / 빌드·테스트 / 롤백 가능',command:'claude',warning:'버전을 한 번에 무조건 최신으로 올리면 기존 플러그인과 충돌할 수 있음.'},
{id:'performance',category:'debug',icon:'⏱',title:'홈페이지가 느리고 모바일이 답답할 때',short:'이미지·스크립트·렌더링 속도 점검',tools:['Agent Skills','Graphify','Docker'],steps:['현재 LCP·INP·CLS 등 기준 수치를 먼저 기록해.','용량 큰 이미지·중복 스크립트·느린 쿼리를 분리해.','Graphify로 스크립트가 영향을 주는 페이지를 확인해.','가장 안전한 병목 1개만 수정해.','동일 조건에서 성능 전후와 UI 회귀를 측정해.'],prompt:'[페이지]의 모바일 성능을 개선하고 싶어.\n수정 전에 Lighthouse/PageSpeed 측정 환경과 LCP·INP·CLS 기준값을 기록해.\n느린 이미지·JS·폰트·API를 증거 중심으로 분류하고, 기존 클릭 추적과 화면을 보호하는 최소 수정안을 제시해.\n가장 안전한 항목 하나만 고친 뒤 동일 조건에서 다시 측정해.\n기대 효과는 가설과 실측을 구분해. SEO 순위 상승을 보장하거나 운영 페이지를 승인 없이 수정하지 마.',verify:'전후 수치 / 모바일 레이아웃 / 이벤트 작동 / 변경 영향 격리',command:'/webperf',warning:'동일 측정 조건을 지키지 않은 점수 비교는 금물.'},
{id:'seo-content',category:'marketing',icon:'↗',title:'SEO 콘텐츠·FAQ를 보강할 때',short:'기존 하위페이지 내용과 검색어 비교',tools:['Agent Skills','Graphify'],steps:['GSC에서 페이지별 노출·클릭·검색어를 저장해.','실제 본문·코드 위젯을 읽어 이미 답한 질문을 제외해.','정보가 부족한 질문만 의료진 검토용으로 작성해.','현재 문장·추가 위치·검색성과 보호 계획을 함께 제시해.','별도 승인 전에는 웹사이트에 게시하지 않아.'],prompt:'[URL]의 SEO 콘텐츠를 개선할 검토안을 만들어 줘.\n1. Search Console 클릭·노출·평균 순위와 기간을 먼저 기록해.\n2. 화면 본문뿐 아니라 코드 위젯·FAQ·JSON-LD까지 대조해 이미 설명된 내용은 제외해.\n3. 검색량은 공식 실측·제3자 추정·검색 노출을 명확히 구분해.\n4. 실제 부족한 정보 3개만 골라 현재 문장·추가 문장·삽입 위치·검증 근거를 제시해.\n5. 제목·URL·canonical·기존 상위 검색어를 보호할 방법을 적어.\n6. 의료광고 효과 보장·최상급·부작용 축소 표현을 배제하고 실제 게시 전 의료진 검토로 남겨.\n이 단계에서는 홈페이지와 위젯을 수정하지 마.',verify:'중복 제외 / 출처·기간 / 정확한 삽입 위치 / 순위 보호 지표',command:'/spec',warning:'검색량 추정치와 GSC 사이트 노출수는 서로 다른 지표.'},
{id:'conversion',category:'marketing',icon:'◎',title:'예약 클릭이 제대로 집계되는지 볼 때',short:'GA4 이벤트·예약 CTA·전환 경로',tools:['Agent Skills','Context7'],steps:['CTA가 실제 어느 URL로 이동하는지 확인해.','GA4 이벤트명·조건·중복 가능성을 검사해.','현재 추적 코드와 새 경로를 비교해.','가능하면 가짜 이벤트/디버그로 시험하고 실사용 이벤트는 구분해.','측정 정의가 바뀐 날짜를 기록해 전후 비교 오류를 막아.'],prompt:'[예약 버튼/URL] 클릭이 GA4에서 올바르게 집계되는지 점검해.\n실제 링크와 추적 코드·이벤트명·GA4 설정을 읽기 전용으로 확인해.\n누락된 링크, 중복 발생, 다른 이벤트 오분류, 이동 전 전송 누락 가능성을 정리해.\n수정안은 변경 전·후 diff로 만들고, 가짜 이벤트와 실제 이벤트를 구분해 테스트해.\n측정 범위 변경일을 명시하고 클릭 증가를 예약 증가라고 해석하지 마.\n원본 백업과 승인 전에는 공통 Header 코드를 저장·배포하지 마.',verify:'링크 인식 / 이벤트 1회 / 다른 버튼 정상 / 기준일 기록',command:'/review',warning:'집계 보완과 실제 신규 예약 증가는 다른 의미.'},
{id:'multilingual',category:'marketing',icon:'文',title:'다국어 랜딩을 검수할 때',short:'한·영·일·중·대만 언어별 누락 점검',tools:['Agent Skills','Graphify'],steps:['원본 페이지와 국가별 대상을 목록으로 모아.','의미·시술명·가격 단위·예약 링크를 비교해.','국가별 메뉴와 FAQ·코드 위젯을 점검해.','오류를 위치·원문·제안 번역·근거로 표기해.','의료광고와 현지 표현은 별도 검토 후 수정해.'],prompt:'한국어 기준 [URL]와 영어·일본어·중국어·대만 페이지를 비교해 줘.\n메뉴·본문·이미지 속 문구·FAQ·코드 위젯·예약 링크·hreflang을 점검해.\n각 오류에 국가, URL, 위치, 기존 문장, 교정 초안, 판단 근거를 붙여.\n이미 정확한 내용과 이미 번역된 내용은 중복 보고하지 마.\n의학적 문구는 검토안으로만 만들고, 웹사이트 게시나 가격 변경은 하지 마.',verify:'언어별 URL·누락·중복·번역 근거 표',command:'/plan',warning:'이미지 안의 문구는 별도 이미지 검수 필요.'},
{id:'docker-app',category:'security',icon:'▣',title:'Docker로 로컬 앱을 실행할 때',short:'서버·DB 개발환경·컨테이너 재현',tools:['Docker','Agent Skills'],steps:['Docker Desktop 엔진 실행 상태를 확인해.','기존 docker-compose.yml 또는 Dockerfile을 읽어.','프로젝트별 포트·볼륨·환경변수를 분리해.','필요한 컨테이너만 시작해 로컬에서 테스트해.','중지 시 데이터 볼륨 삭제 여부를 확인해.'],prompt:'[앱 이름]을 Docker로 로컬 실행하도록 설정해 줘.\n현재 프로젝트의 Dockerfile/compose 파일, 필요한 포트, DB·저장 볼륨을 먼저 확인해.\n개발용 환경변수 예제를 만들되 실제 키는 출력하거나 Git에 올리지 마.\n서비스는 localhost에 바인딩하고, 가능한 한 최소 권한으로 실행해.\n실행·로그 확인·중지 명령과 문제 발생 시 복구 방법을 정리하고 실제 로컬 접속을 확인해.',verify:'컨테이너 running / 로컬 URL / 로그 오류 / 볼륨 안전',command:'docker ps',warning:'docker compose down -v는 데이터 볼륨을 삭제할 수 있으므로 함부로 사용하지 마.'},
{id:'security-audit',category:'security',icon:'⛨',title:'앱 출시 전 보안 위험을 확인할 때',short:'입력 검증·로그인·권한·OWASP 점검',tools:['Strix','Docker','Agent Skills'],steps:['본인이 소유하거나 허가받은 로컬·스테이징 앱인지 확인해.','보안 테스트 범위와 금지 API(실제 결제·데이터 삭제 등)를 명시해.','Docker와 Strix 모델 설정을 확인해.','먼저 읽기 전용 코드 리뷰와 간단한 자체 테스트부터 실행해.','Strix 전체 스캔은 비용·트래픽·대상 권한을 확인한 이후 별도로 실행해.'],prompt:'[로컬 또는 스테이징 앱 경로]의 보안 상태를 점검해.\n이 앱은 내가 관리하고 테스트 권한이 있어.\n현재 작업은 인증·인가·입력 검증·비밀키 노출·의존성 위험에 대한 읽기 전용 분석을 우선해.\n실제 공격 트래픽, 대량 요청, 운영 계정 변경, DB 쓰기, 파일 삭제, 외부 네트워크 스캔을 하지 마.\nStrix가 필요하면 Docker·LLM 연결과 예상 비용을 먼저 검증하고 승인된 테스트 환경에서만 실행해.\n결과는 발견 근거, 재현 조건, 영향도, 수정 제안, 회귀 테스트로 분리해.',verify:'승인 범위 / 실제 취약점 증거 / 위험도 / 수정 우선순위',command:'strix --help',warning:'현재 Strix는 설치·LLM 함수 호출까지만 확인됐고 전체 스캔은 미검증.'},
{id:'private-environment',category:'security',icon:'🔐',title:'API 키와 환경변수를 안전하게 관리할 때',short:'비밀키·.env·GitHub 공개 방지',tools:['Docker','Agent Skills'],steps:['실제 키가 들어 있는 파일의 권한을 확인해.','Git에서 .env와 비밀 파일을 제외해.','샘플 .env.example에는 키 이름만 적어.','유출된 키는 폐기·재발급하고 기록을 남겨.','도구가 실제 키를 로그에 출력하지 않는지 점검해.'],prompt:'이 프로젝트의 API 키 보관 상태를 보안 관점에서 점검해.\n.env, .gitignore, Docker compose 환경변수, Git 추적 파일을 조사해.\n실제 비밀키의 값은 출력하지 말고 존재 여부와 키 이름만 보고해.\nGit 추적·배포 로그로 노출되는 경로를 찾아 안전한 저장 방식을 제안해.\n비밀키 삭제·교체·사용 권한 변경은 명시적 승인 후에만 실행해.',verify:'키 값 미노출 / .gitignore / chmod 600 / 로그 마스킹',command:'ls -l ~/.config/claude-setup/.env',warning:'API 키를 프롬프트 본문이나 HTML에 직접 포함하지 않아.'},
{id:'sheets',category:'automation',icon:'▤',title:'스프레드시트 자동화를 만들 때',short:'업로드일지·상태 업데이트·누락 알림',tools:['Agent Skills','Context7','Docker'],steps:['기존 시트·열 구조·상태값을 실제로 읽어.','자동화 시점·대상 조건·예외를 명세해.','읽기 전용으로 변경 예정 행부터 미리 검증해.','Apps Script 또는 작업 러너를 단계별 테스트해.','중복 실행·실패 재시도·알림 기준을 분리해.'],prompt:'[스프레드시트 이름]에서 [업무 규칙]을 자동화하고 싶어.\n시트의 실제 열·헤더·날짜 형식·현재 수식부터 읽어.\n처리 대상과 제외 대상, 중복 실행 시 행동, 실패 로그·되돌림을 명세해.\n먼저 변경 예정 행을 dry-run 표로 보여 주고, 샘플 3건으로 테스트해.\n데이터 삭제·대량 업데이트는 승인 후 진행하고, 완료 시 변경 행 수·실패·남은 건을 보고해.',verify:'열 매핑 / dry-run / 중복 실행 안전 / 오류 로그',command:'/spec',warning:'원본 시트 데이터를 백업하고 상태 변경 규칙을 명확히 할 것.'},
{id:'deploy',category:'automation',icon:'🚀',title:'GitHub Pages로 결과물을 공유할 때',short:'HTML·CSS·JS 업로드·URL 배포·모바일 QA',tools:['Agent Skills','Docker'],steps:['저장소 소유자·공개 여부·기본 브랜치를 확인해.','정적 파일(index.html·CSS·JS)의 상대 경로를 점검해.','모바일 브라우저에서 메뉴·복사·탭이 작동하는지 테스트해.','GitHub Pages 설정을 해당 저장소에만 적용해.','실제 페이지 URL로 접속한 다음 링크를 공유해.'],prompt:'현재 HTML/CSS/JS 결과물을 별도 GitHub Pages 사이트로 배포해 줘.\n기존 저장소나 운영 홈페이지를 덮어쓰지 마.\nindex.html과 리소스 상대경로를 점검하고, 모바일 390px에서 탭·복사·메뉴·검색이 작동하는지 테스트해.\n정적 페이지에 API 키나 개인정보가 들어 있지 않은지 검사해.\n배포 설정 후 실제 공개 URL의 HTTP 상태와 화면을 확인하고 저장소 URL·페이지 URL을 함께 제공해.',verify:'404 없는 공개 URL / 모바일 UI / JS 오류 없음 / 키 미노출',command:'/ship',warning:'저장소가 public이면 소스코드 전체가 공개돼.'},
{id:'routine',category:'automation',icon:'◷',title:'매일 반복하는 업무를 자동화할 때',short:'콘텐츠 예약·리포트·누락 검사·실패 알림',tools:['Agent Skills','Docker'],steps:['반복 작업의 시작 조건과 종료 조건을 문서화해.','실행 주기와 데이터 출처를 정해.','실패·재시도·중복 방지 로직을 만든 뒤 로컬 검증해.','알림을 보낼 조건과 보내지 않을 조건을 나눠.','실제 계정 변경·게시 전에 사용자 승인을 받도록 해.'],prompt:'[반복 업무]를 [주기]마다 처리하는 자동화 시스템을 설계해.\n데이터 출처, 최신 상태 확인 방법, 실행 조건, 제외 조건을 명세해.\n중복 실행·네트워크 오류·부분 실패에서 재시도와 롤백이 가능하게 설계해.\n새 결과가 없으면 알림을 보내지 않고, 의미 있는 변경만 변경 내역과 근거를 붙여 보고해.\n로컬에서 가상 데이터로 테스트하고, 실제 게시·전송·삭제는 승인 전 실행하지 마.',verify:'반복 테스트 / 이중 실행 방지 / 실패 보고 / 승인 경계',command:'/plan',warning:'실시간 감시와 정기 실행은 실행 인프라가 지속 동작해야 해.'}
];

const toolsData=[
{id:'agent',name:'Agent Skills',icon:'✳',subtitle:'프로젝트 기획 → 구현 → 테스트 → 리뷰 → 출시',status:'설치 검증',intro:'Claude Code가 작업 순서를 지키도록 돕는 개발 스킬 모음. 병원 맥에서는 agent-skills 0.6.15와 스킬 34개가 설치된 것을 확인했어. 단순한 자동 코딩보다 작업 기준을 정하고 검증하는 데 특히 좋아.',can:['/spec: 사용자 문제·목표·필수 기능·제약 명세','/plan: 실행 순서·변경 파일·테스트 계획','/build: 계획에 맞춰 작은 단위로 구현','/test: 정상·오류·경계 상황을 검증','/review: 보안·성능·유지보수 관점 리뷰','/ship: 배포 전 체크리스트'],best:'새 기능 개발, 인수인계, 리팩토링, 외부 서비스 연동 시 개발 과정 전체를 관리할 때.',steps:['터미널에서 프로젝트 폴더를 연 다음 claude 실행.','대화창에 /spec으로 요구사항부터 명세.','/plan으로 코드 변경 범위와 위험 점검.','/build → /test → /review 순서로 진행.','배포는 최종 검증과 승인 뒤 진행.'],commands:[{location:'CLAUDE 대화창',cmd:'/spec'},{location:'CLAUDE 대화창',cmd:'/plan'},{location:'CLAUDE 대화창',cmd:'/test'},{location:'MAC 터미널 · 설치 여부 확인',cmd:'claude plugin list'}],prompt:'Agent Skills를 사용해 [요청]을 시니어 개발자 방식으로 처리해 줘. 먼저 spec에서 목적·범위·예외 조건을 정리하고, plan으로 수정할 파일과 테스트 기준을 정해. 구현은 작은 단위로 진행하고, 검증하지 않은 기능은 완료라고 보고하지 마. 운영 배포는 승인받은 범위 안에서만 실행해.',caution:'프로젝트마다 슬래시 명령 노출 방식이 다를 수 있어. 안 보이면 Claude Code를 재시작하고 설치된 스킬 이름을 확인해.',source:'https://github.com/addyosmani/agent-skills'},
{id:'context',name:'Context7',icon:'⌁',subtitle:'최신 공식 개발 문서와 버전별 코드 예제',status:'MCP 검증',intro:'Claude가 오래된 Next.js·React·Tailwind 문법을 사용하는 문제를 줄이는 문서 조회 MCP. 병원 맥에서는 무료 키 발급, 공식 API 호출 HTTP 200, Claude Code의 context7-key Connected를 확인했어.',can:['Next.js/React/Tailwind 공식 API와 예제 찾기','현재 설치된 버전과 문서 버전 대조','폐지된 옵션·Breaking Change 확인','Supabase·SDK 연동 패턴 근거 확인','답변 근거 링크와 버전 명시'],best:'새 라이브러리 도입, 빌드 오류, API 사용법, 버전 업그레이드, AI가 존재하지 않는 함수를 제시할 때.',steps:['Claude 대화창에서 사용하는 프레임워크·버전·목표를 알려 줘.','요청 끝에 use context7을 붙여.','문서 버전과 현재 프로젝트 버전이 일치하는지 확인해.','문서에서 찾은 API로 코드를 수정하고 테스트해.'],commands:[{location:'CLAUDE 대화창',cmd:'Next.js 15 공식 문서에서 서버 액션 폼 예제를 찾아줘. use context7'},{location:'MAC 터미널 · MCP 상태 확인',cmd:'claude mcp list'}],prompt:'현재 package.json에서 [라이브러리] 버전을 확인해. Context7을 이용해 그 버전의 공식 문서와 예제를 찾아 [원하는 기능]을 구현할 방법을 알려 줘. 예제 출처·버전·주의사항을 붙이고, 기존 코드의 무엇을 고쳐야 하는지 diff를 보여 줘. 문서로 확인되지 않은 API는 사용하지 마. use context7',caution:'Context7은 공식 문서 검색 도구이지 자동 테스트 도구가 아니야. 검색 결과가 실제 프로젝트와 맞는지 확인해야 해.',source:'https://context7.com/'},
{id:'graphify',name:'Graphify',icon:'⬡',subtitle:'프로젝트 전체 코드 관계를 지식 그래프로',status:'실제 분석 성공',intro:'소스코드의 파일·함수·연결 관계를 지도처럼 추적하는 도구. 병원 맥에서 테스트 Python 파일의 관계도를 5개 노드·4개 연결로 생성했어. 코드 전용 AST 추출에는 LLM API 키가 필요하지 않아.',can:['코드베이스의 함수·컴포넌트 의존성 추출','특정 기능의 호출 및 연결 경로 추적','리팩토링 영향 범위 분석','기존 기능 인수인계 자료 작성','graph.json 등 구조화 파일 출력'],best:'파일이 많고 누가 만든 코드인지 모를 때, 한 파일을 수정했을 때의 연쇄 영향을 확인할 때.',steps:['터미널에서 분석하려는 프로젝트 폴더로 이동.','코드 전용으로 graphify extract . --code-only --no-cluster 실행.','graphify-out/graph.json 생성 여부 확인.','Claude에게 해당 파일을 바탕으로 호출·영향도를 설명하라고 요청.','필요하면 /graphify .로 대화형 분석.'],commands:[{location:'CLAUDE 대화창',cmd:'/graphify .'},{location:'MAC 터미널 · 실제 검증된 명령',cmd:'graphify extract . --code-only --no-cluster'},{location:'MAC 터미널 · 기존 그래프 질의',cmd:'graphify query "예약 버튼"'}],prompt:'Graphify를 사용해 이 프로젝트의 코드 연결 구조를 시각적으로 정리해 줘. [기능]의 화면 진입→함수→API→데이터 저장 경로를 설명하고, 수정 시 영향받는 파일 목록과 위험도를 표로 보여 줘. 내가 모르는 용어는 쉬운 예시로 설명해. 원본 코드는 변경하지 마.',caution:'PDF·이미지 등 코드 외 문서까지 의미 분석하면 별도 LLM이 필요할 수 있어. 단순 코드 추출과 구분할 것.',source:'https://github.com/Graphify-Labs/graphify'},
{id:'twentyfirst',name:'21st MCP',icon:'◈',subtitle:'기성 UI 컴포넌트 검색·비교·가져오기',status:'MCP 검증',intro:'React/Tailwind 화면 요소를 검색하고 재사용하는 도구. 병원 맥에서 21st CLI 로그인·검색, Claude MCP Connected 및 API HTTP 200을 확인했어. 21st AI 생성 기능은 무료 검색 기능과 별개야.',can:['히어로·가격표·FAQ·대시보드 UI 검색','리액트·테일윈드 컴포넌트 비교','선택한 컴포넌트 코드 가져오기','현재 브랜드 스타일에 맞춘 UI 변경','접근성·반응형 품질 검토'],best:'깔끔한 랜딩·관리자 보드·카드뉴스 제작 툴·로그인 폼 등 디자인 개발 속도를 높일 때.',steps:['터미널에서 21st search "검색어"로 UI 후보를 확인.','Claude Code에서 해당 디자인들의 장단점을 비교해 달라고 요청.','선택한 컴포넌트를 현재 기술 스택에 맞춰 적용.','모바일·다크모드·버튼·접근성 테스트.','무료 가져오기 잔여 횟수는 21st usage --json으로 확인.'],commands:[{location:'MAC 터미널 · 디자인 검색',cmd:'21st search "dashboard" --limit 5'},{location:'MAC 터미널 · 무료 한도 확인',cmd:'21st usage --json'},{location:'MAC 터미널 · 검색한 컴포넌트 보기',cmd:'21st get <검색결과_ID>'}],prompt:'21st MCP에서 [UI 요소] 관련 컴포넌트를 검색해 3개 후보의 디자인·의존성·장단점을 비교해 줘. 현재 [React/Next.js/Tailwind 버전]과 호환되는 후보 하나를 고르고, 우리 브랜드 폰트·색상·여백·모바일 기준에 맞게 적용한 뒤 실제 화면과 기능을 검증해. 21st AI 유료 생성 기능은 사용하지 마.',caution:'무료 계정은 검색 가능하지만 코드 가져오기에는 사용량 제한이 있어. AI 생성은 별도 크레딧이 필요할 수 있어.',source:'https://21st.dev/mcp'},
{id:'strix',name:'Strix',icon:'⛨',subtitle:'허가된 웹앱·코드 보안 점검',status:'전체 스캔 미검증',intro:'자체 앱의 입력 검증, 권한, 인증 등 보안 취약점을 조사하는 도구. 병원 맥에서 Strix 1.7.0, 관련 스킬 9개, 무료 LLM 설정과 함수 호출 동작을 확인했지만 Strix 전체 스캔 성공은 아직 검증하지 않았어.',can:['코드 보안 위험 검토 및 보고','OWASP 관련 취약점 점검 계획','입력 검증·인증·인가 문제 분석','취약점 수정안 및 재발 방지 테스트 설계','승인된 테스트 환경에서 침투 테스트'],best:'관리자 계정, 예약 API, 결제, 로그인 기능이 있는 내 앱을 출시하기 전에.',steps:['본인이 소유·관리하거나 허가받은 대상인지 먼저 확인.','터미널에서 Docker 엔진과 Strix 설정 확인.','읽기 전용 코드 리뷰와 범위 확정을 우선 실시.','실제 테스트는 별도 로컬/스테이징 환경에서만 실행.','발견된 항목은 실제 재현 증거가 있을 때만 취약점으로 확정.'],commands:[{location:'MAC 터미널 · 설치 확인',cmd:'strix --version'},{location:'MAC 터미널 · 옵션 확인',cmd:'strix --help'},{location:'CLAUDE 대화창',cmd:'내가 관리하는 로컬 웹앱의 보안 위험을 읽기 전용으로 먼저 분석해 줘.'}],prompt:'[내가 소유한 로컬/스테이징 프로젝트]에서 OWASP 보안 위험을 검토해 줘. 우선 정적 코드 분석과 위험별 테스트 계획만 작성하고, 실제 공격 트래픽·운영 계정 변경·데이터 삭제를 하지 마. Strix 전체 스캔을 시도하기 전에 대상·요금·트래픽·모델을 검증해. 결과는 근거, 재현 조건, 영향도, 수정안, 확인 방법 순서로 작성해.',caution:'실사이트 무단 스캔 금지. 현재 연결된 무료 모델은 호출 한도가 있으며 보안 검사 품질을 보장하지 않아.',source:'https://github.com/usestrix/strix'},
{id:'docker',name:'Docker',icon:'▣',subtitle:'재현 가능한 로컬 앱과 DB 실행 환경',status:'컨테이너 실행 성공',intro:'실행 환경을 컨테이너로 분리해 개발 도중 라이브러리 충돌을 줄이는 도구. 병원 맥에서 Docker Desktop 4.98.0, Engine 29.9.2, Compose 5.6.1을 확인하고 hello-world 컨테이너 실행에 성공했어.',can:['개발용 서버·데이터베이스 로컬 실행','팀마다 동일한 실행 환경 제공','프로젝트별 실행·중지·로그 확인','개발 데이터와 운영 환경 격리','보안 도구용 격리 실행 환경 준비'],best:'내 컴퓨터에서 서버를 돌려 보거나, 여러 프로젝트의 개발 환경을 분리하고 싶을 때.',steps:['Docker Desktop이 실행 중인지 확인.','docker ps로 컨테이너 목록을 확인.','Dockerfile 또는 compose 파일을 만든 뒤 실행.','로컬 포트로 접속해 기능을 검증.','docker compose down으로 컨테이너를 정리하되 볼륨 삭제 여부는 별도 확인.'],commands:[{location:'MAC 터미널 · 실제 검증',cmd:'docker run --rm hello-world'},{location:'MAC 터미널 · 실행 목록',cmd:'docker ps'},{location:'MAC 터미널 · Compose 프로젝트 실행',cmd:'docker compose up -d'},{location:'MAC 터미널 · 로그 확인',cmd:'docker compose logs --tail=100'}],prompt:'[프로젝트]의 로컬 개발 환경을 Docker로 구성해 줘. 필요한 서비스·포트·볼륨·환경변수를 표로 정리하고, 보안상 위험한 공개 바인딩과 키 노출을 피하도록 해. docker compose 파일 작성 후 로컬에서 실행·헬스체크·로그 확인을 수행해. 중지와 원상복구 방법도 제공해. 기존 운영 DB와 볼륨은 절대 변경하지 마.',caution:'docker compose down -v는 영구 볼륨을 삭제할 수 있으니 안전성을 확인하기 전 실행하지 마.',source:'https://docs.docker.com/desktop/setup/install/mac-install/'}
];
const promptCategories=[
{id:'all',name:'전체'}, {id:'develop',name:'개발'}, {id:'design',name:'디자인'},
{id:'analyze',name:'분석'}, {id:'debug',name:'오류'}, {id:'marketing',name:'마케팅'},
{id:'security',name:'보안'}, {id:'automation',name:'자동화'}
];
const prompts=[
{id:'universal',cat:'develop',name:'00. 모든 업무에 공통으로 넣는 마스터 프롬프트',about:'어떤 프로젝트에도 붙여서 쓰는 안전한 기본 명령.',body:'당신은 이 프로젝트의 시니어 개발자이자 품질 검수 담당자야.\n\n[목적] [내가 원하는 결과를 입력]\n[대상] [프로젝트·페이지·파일 입력]\n[제약] 기존 정상 기능, 데이터, URL, SEO 성과를 최대한 보존.\n\n반드시 다음 순서를 지켜:\n1. 현재 프로젝트·기술 스택·실제 파일을 먼저 조사해.\n2. 적합한 설치 도구(Agent Skills, Context7, Graphify, 21st, Strix, Docker)를 선정하고 이유를 설명해.\n3. 변경할 파일·작업 순서·예외·테스트 기준을 먼저 제시해.\n4. 확인되지 않은 사실을 추측하지 말고 근거를 확보해.\n5. 최소 단위로 개발하고 테스트와 실제 검증을 수행해.\n6. 완료 보고에는 성공·미완료·불확실성을 구분해.\n7. 승인 범위를 벗어난 외부 전송·비용 발생·운영 배포는 하지 마.'},
{id:'spec',cat:'develop',name:'01. 아이디어를 기획서로 바꾸기',about:'무슨 기능부터 만들지 모르겠을 때.',body:'[아이디어]를 실사용 가능한 제품 기획서로 만들어 줘.\n\nAgent Skills의 spec·plan 원칙을 적용해 사용자 문제, 핵심 기능, 비핵심 기능, 사용자 흐름, 데이터 구조, 권한, 예외 처리, 화면 구성, 작업 순서를 작성해.\nMVP 1차 버전과 다음 버전을 구분하고, 완료 기준과 제외 항목을 명확히 해.\n내가 개발을 몰라도 이해할 수 있게 쉬운 한국어와 예시를 사용해.\n현 단계는 기획·검토만 진행하고 파일 수정·배포는 하지 마.'},
{id:'build',cat:'develop',name:'02. 작은 기능을 안정적으로 구현하기',about:'계획부터 구현·테스트까지 연결.',body:'[기능]을 기존 프로젝트에 추가해 줘.\n\n/plan으로 영향 범위를 좁히고, 필요한 라이브러리는 Context7에서 버전별 공식 문서를 확인해.\n작은 단위로 구현하고 테스트를 먼저 작성하거나 기존 테스트를 보강해.\n기존 기능을 건드리지 않고, 빌드와 주요 사용자 흐름의 정상 작동을 검증해.\n완료 보고에는 수정 파일, 테스트 결과, 실행 방법, 남은 위험과 되돌리기 방법을 포함해.'},
{id:'landing',cat:'design',name:'03. 프리미엄 랜딩페이지 제작',about:'21st 컴포넌트 비교 + 완성형 반응형 UI.',body:'[브랜드/시술]을 소개하는 고급스러운 랜딩페이지를 제작해 줘.\n목표: [예약/문의/자료 다운로드]. 스타일: [프리미엄 에디토리얼/클린 미니멀].\n\n21st MCP에서 실제 UI 컴포넌트를 검색한 뒤 히어로·정보 카드·FAQ·CTA를 조합해.\n폰트·여백·색상 규칙을 일관되게 유지하고 모바일 360px부터 데스크톱까지 반응형으로 구성해.\n가독성, 키보드 탐색, 이미지 용량, 버튼 클릭을 테스트해.\n효과 보장·최상급·의료적 단정 표현은 쓰지 말고 필요한 문구는 검토안으로 구분해.\n로컬 미리보기와 코드 파일을 제공하되, 운영 배포는 승인 후 진행해.'},
{id:'dashboard',cat:'design',name:'04. 경영·마케팅 대시보드 기획',about:'표·카드·필터를 하나의 UI로 설계.',body:'[데이터 소스]를 사용하는 운영 대시보드를 만들어 줘.\n보여 줄 지표: [업로드 수/예약 수/채널별 실적]. 필터: [날짜/담당자/언어].\n\n21st에서 카드·차트·테이블·탭·필터 UI를 찾아 후보를 비교해.\n중요 KPI를 최상단에 배치하고, 데이터 0건·누락·오류 처리도 설계해.\n샘플 데이터로 먼저 화면을 만들고 모바일에서 탭과 표가 잘 보이는지 테스트해.\n실제 시트·DB는 수정하지 마.'},
{id:'graph',cat:'analyze',name:'05. 남의 코드 인수인계 + 구조 분석',about:'Graphify 구조 분석과 쉬운 설명.',body:'이 프로젝트의 모든 파일을 읽기 전용으로 파악해 줘.\n\nGraphify 코드 관계 분석을 통해 핵심 파일과 함수·컴포넌트·API·데이터 저장 위치를 찾아.\n사용자가 [행동]을 할 때 어떤 코드가 어떤 순서로 동작하는지 흐름을 그림/표로 설명해.\n내가 건드리면 안 되는 중요 파일과 리팩토링 가능한 안전한 파일을 나누고, 예상되는 영향과 테스트 항목을 기록해.\n분석 중 파일을 삭제·수정하지 마.'},
{id:'refactor',cat:'analyze',name:'06. 코드 정리 전 영향도 검토',about:'큰 코드도 안전하게 정리.',body:'현재 [문제 코드/모듈]을 안전하게 리팩토링하고 싶어.\n\nGraphify로 실제 의존성을 파악하고 중복 코드·사용되지 않는 기능·서로 강하게 결합된 파일을 찾아.\n동작·API 응답·UI·데이터·SEO에는 영향이 없도록 최소 변경 계획을 만들어.\n한 파일/기능씩 작업하고 각 단계에서 기존 테스트를 재실행해.\n기능 결과가 달라지면 원인 분석 후 해당 변경을 되돌려.'},
{id:'error',cat:'debug',name:'07. 에러 원인 추적과 수정',about:'에러 로그 붙여 넣으면 원인부터 파악.',body:'다음 오류를 재현하고 원인을 밝혀 줘.\n[에러 메시지 또는 로그]\n\n실제 버전·재현 조건부터 확인하고 가능한 원인 3개를 증거와 함께 우선순위로 정리해.\n외부 라이브러리 문법은 Context7 공식 문서로 검증해.\n근거가 확인된 원인만 최소 변경으로 수정하고, 동일 상황·정상 상황·예외 상황을 다시 테스트해.\n로그를 숨기거나 무조건 catch만 추가해서 완료라고 하지 마.'},
{id:'version',cat:'debug',name:'08. 최신 프레임워크로 업그레이드',about:'버전별 공식 자료 + 회귀 테스트.',body:'[프레임워크]를 [현재 버전]에서 [목표 버전]으로 업그레이드하려고 해.\n\n먼저 실제 package.json과 잠금 파일을 확인하고 Context7 공식 문서를 기반으로 폐지 API·설정·타입 차이를 정리해.\n수정 영향 범위를 표시하고 별도 브랜치/백업에서 순서대로 전환해.\n테스트·빌드·대표 화면이 모두 정상일 때만 완료로 보고해.\n성공 여부와 지원되지 않는 기능을 분리하고 배포는 보류해.'},
{id:'speed',cat:'debug',name:'09. 모바일 성능 개선',about:'추측 대신 같은 조건의 수치 비교.',body:'[페이지 URL]의 모바일 로딩 성능을 분석해.\n\n수정 전 현재 성능 측정값(LCP/INP/CLS)과 측정 조건을 기록해.\n이미지·폰트·JS·API 병목을 근거별로 분류하고, 가장 안전한 수정 하나를 제안해.\n수정 전후를 같은 조건에서 측정하며 기존 UI·예약 추적·SEO 키워드에 문제가 없는지 확인해.\n예상치와 실제 측정값을 섞지 말고 결과 표를 만들어.'},
{id:'seo',cat:'marketing',name:'10. 기존 SEO 하위페이지 FAQ 보강',about:'중복 없는 질문만 제안하고 검색성과 보호.',body:'[페이지 URL]의 SEO 정보 공백을 검토해.\n\nGSC 페이지별 노출·클릭·평균 순위(정확한 기간)를 우선 기록해.\n본문·코드 위젯·FAQ·JSON-LD를 대조해 기존에 답한 질문은 제외해.\n실제 부족한 질문 3개 이내로 현재 문장·추가할 문장·삽입 위치·검증 근거를 정리해.\n공식 검색량과 제3자 추정치를 구분하고 후기 빈도를 추측하지 마.\n제목·메타·URL·canonical·상위 검색어를 보존해.\n의료광고 문구는 의료진 검토안으로만 작성하고 실제 게시하지 마.'},
{id:'ga4',cat:'marketing',name:'11. 예약 CTA·GA4 전환 추적 검증',about:'버튼·이벤트명·링크 누락 검사.',body:'[CTA 버튼/URL]의 GA4 이벤트 추적을 검사해 줘.\n\n실제 클릭 링크, 이벤트명, 발동 조건, 중복 이벤트, 이동 전 전송 실패 가능성을 확인해.\n기존 추적과 비교해 누락된 경로만 추가하는 최소 수정안을 만들어.\n수정 전·후 diff, 모의 이벤트 테스트, GA4 실제 확인 여부를 분리하고 측정 정의 변경일을 기록해.\n태그·공통 코드·실사이트 수정은 승인 전 실행하지 마.\n예약 클릭 수 증가를 실제 예약 증가로 단정하지 마.'},
{id:'translate',cat:'marketing',name:'12. 다국어 사이트 완성도 감사',about:'국가별 문장·링크·FAQ 누락 비교.',body:'[한국어 원본 URL]의 영어·일본어·중국어·대만 페이지를 실제 렌더링과 코드 위젯까지 비교해.\n\n메뉴, 시술명, 상세주소, 예약 CTA, FAQ, 이미지 속 문구, hreflang의 일치 여부를 조사해.\n검토 의견은 국가·URL·위젯 ID·기존 표현·제안 표현·근거로 정리해.\n이미 맞는 번역은 다시 보고하지 말고, 의학적 표현은 검토 대상으로 표시해.\n실제 수정은 승인 전 수행하지 마.'},
{id:'docker',cat:'security',name:'13. Docker 개발환경 만들기',about:'서버·DB·포트·볼륨 분리.',body:'[프로젝트]를 로컬 Docker 개발환경에서 실행할 수 있게 설계해.\n\n필요한 서비스, 사용 포트, 환경변수, DB 볼륨, 실행/중지 방법을 정리해.\nDockerfile과 docker compose 파일은 최소 권한으로 구성하고 로컬 포트로만 접속하게 해.\nAPI 키는 .env로 분리하고 예시 파일에는 실제 값을 넣지 마.\n테스트 컨테이너를 실행해 로그·헬스체크를 확인하되 운영 DB나 외부 서비스를 변경하지 마.'},
{id:'security',cat:'security',name:'14. 출시 전 보안 테스트 계획',about:'Strix 안전 범위와 우선순위.',body:'[내 소유 로컬/스테이징 앱]의 출시 전 보안 리뷰 계획을 세워.\n\n내가 허가한 범위는 [프로젝트 경로/로컬 URL]뿐이야.\n로그인·인가·입력 검증·비밀키·의존성·XSS·SQL Injection 등 관련 위험을 코드 중심으로 조사해.\nStrix는 설치와 무료 모델 연결 상태부터 확인하고, 실제 스캔은 허가 범위·트래픽·비용을 검증한 다음에만 실행해.\n운영 데이터 수정·대량 요청·외부 사이트 스캔을 금지해.\n위험별 근거·재현 가능성·패치와 테스트 방법을 표로 정리해.'},
{id:'automate',cat:'automation',name:'15. 시트·콘텐츠 업무 자동화',about:'반복 업무를 실수 없이 수행.',body:'[반복 업무]를 [매일/매주] 자동으로 처리하는 시스템을 기획해.\n\n실제 데이터 구조와 헤더·상태값을 읽고, 대상·제외·알림 규칙을 먼저 명세해.\n중복 실행 방지, 실패 재시도, 로그·복구, 데이터 보호를 설계해.\n변경 대상은 dry-run으로 먼저 보여 주고 샘플 데이터에서 검증해.\n의미 있는 새 결과만 보고하고, 실제 데이터 변경·게시·전송은 승인된 범위만 실행해.'},
{id:'github',cat:'automation',name:'16. GitHub Pages로 실사용 웹 가이드 배포',about:'URL을 검증하고 모바일 링크 공유.',body:'[HTML/CSS/JS 프로젝트]를 GitHub Pages에 공개해.\n\n기존 운영 저장소를 덮어쓰지 말고 별도 저장소 또는 별도 경로를 사용해.\n정적 파일 경로, 모바일 탭·복사 버튼, 자바스크립트 콘솔 오류, 공개 비밀키 포함 여부를 검사해.\n배포 후 실제 공개 URL의 HTTP 200과 화면을 확인하고, 저장소 URL·모바일 URL·버전 정보를 함께 보고해.\nGitHub에 비밀번호·API 키·환자 자료를 올리지 마.'}
];
const faqData=[
['슬래시 명령어를 입력했는데 안 떠','Claude Code를 종료하고 다시 열어. 먼저 터미널에서 claude plugin list를 실행해 Agent Skills가 enabled인지 확인해. 명령 이름이 겹치면 스킬 이름을 명시하거나 /help에서 설치된 명령을 확인해.'],
['Context7 사용 시 인증이 필요하다고 나와','병원 맥에는 context7-key라는 MCP가 API 키 방식으로 연결돼 있어. claude mcp list에서 context7-key가 Connected인지 먼저 확인해. 실패하면 셸에서 CONTEXT7_API_KEY가 로드되는지 값은 출력하지 말고 유무만 점검해.'],
['21st MCP는 되는데 UI가 바로 안 만들어져','21st 검색과 컴포넌트 가져오기, 21st AI 생성은 서로 다른 기능이야. 21st search "hero" --limit 5로 검색한 뒤 선택한 UI를 Claude가 코드에 적용하도록 지시해. AI 생성에는 추가 크레딧이 필요할 수 있어.'],
['21st API가 작동하지 않거나 한도가 나와','21st whoami로 로그인 상태, 21st usage --json으로 무료 검색/가져오기 한도를 확인해. 비밀키는 채팅에 붙여넣지 마. Claude MCP 연결은 21st 서버가 Connected인지 확인하면 돼.'],
['Graphify가 API 키가 없다고 해','graphify extract . --code-only --no-cluster처럼 코드만 분석해 봐. Python·JS 같은 코드의 AST 추출은 별도 LLM 키 없이 가능해. PDF·이미지·문서의 의미 분석은 모델 연결이 필요할 수 있어.'],
['Docker 명령이 없거나 엔진 연결에 실패해','Docker Desktop 앱을 실행하고 docker info를 확인해. 설치된 컨테이너는 docker ps로 보여. 병원 맥은 Docker Engine과 hello-world 실행까지 성공했지만 Docker Desktop이 꺼져 있으면 명령이 실패할 수 있어.'],
['Strix에서 인증 오류가 나거나 검사가 멈춰','strix --version과 docker info를 확인하고, 모델 설정·무료 요청 한도·도구 호출을 점검해. Strix는 설치/모델 설정만 검증됐고 전체 침투 스캔은 미검증이야. 운영 웹사이트에는 스캔을 시작하지 마.'],
['프롬프트를 붙여 넣었더니 멋대로 파일을 수정하려고 해','프롬프트 앞에 “이번 단계는 읽기 전용, 수정·저장·배포 금지”라고 적고, 현재 변경 사항을 git status로 점검해. 실제 수정 권한 범위와 승인 조건을 명확히 해야 해.'],
['프롬프트를 얼마나 자세히 적어야 해','최소한 ①목적 ②작업 대상/URL ③꼭 지켜야 할 제약 ④원하는 결과물 ⑤완료 검증 방법을 넣어. 위 “프롬프트 제작기”가 이 구조를 자동으로 만들어 줘.'],
['설치된 AI 도구가 알아서 내 파일을 읽어 주나','Claude Code를 해당 프로젝트 폴더에서 실행해야 그 위치를 중심으로 읽고 분석하기 쉬워. 권한이나 샌드박스 범위에 따라 접근이 제한될 수 있어. 먼저 “파일 목록을 읽기 전용으로 보여 줘”라고 확인해.'],
['Claude Code의 에이전트가 자동으로 웹사이트를 배포해도 돼','배포는 개발과 다른 작업이야. 환경변수·GitHub Pages 공개 여부·운영 데이터 영향·접속 검증을 분리해. 프롬프트에 “배포 전 검증 결과를 보고하고 승인 경계 준수”를 명시하는 걸 추천해.'],
['공개 GitHub Pages에 API 키를 넣어도 되나','안 돼. HTML·CSS·JS는 공개 저장소에서 누구나 볼 수 있어. 비밀키는 맥의 제한된 .env나 서버 비밀 저장소에 두고, 프론트엔드에 직접 삽입하지 마.']
];

const state={category:'all',scenario:'new-feature',tool:'agent',promptCategory:'all',prompt:'universal',search:''};
const $=(s,root=document)=>root.querySelector(s);
const esc=(s)=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const eAttr=esc;
function toast(message){
  const el=$('#toast');el.textContent=message;el.classList.add('show');
  clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),1800);
}
async function copyText(value){
  let done=false;
  try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);done=true;}}catch(e){}
  if(!done){
    const ta=document.createElement('textarea');
    ta.value=value;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);
    ta.select();try{done=document.execCommand('copy');}catch(e){}ta.remove();
  }
  toast(done?'클립보드에 복사했어 ✓':'복사가 막혔어. 텍스트를 직접 선택해 줘.');
}
function codePanel(value,label,kind){
  return '<div class="code-block '+(kind==='command'?'command':'')+'"><div class="code-header"><span>'+esc(label||'CLAUDE 대화창')+'</span><button type="button" class="do-copy" data-value="'+eAttr(value)+'">전체 복사 ⧉</button></div><pre>'+esc(value)+'</pre></div>';
}
function renderCategoryTabs(){
  $('#category-tabs').innerHTML=categories.map(c=>'<button type="button" role="tab" aria-selected="'+(state.category===c.id)+'" data-cat="'+eAttr(c.id)+'">'+esc(c.icon+' '+c.name)+'</button>').join('');
}
function filteredScenarios(){
  const q=state.search.trim().toLocaleLowerCase();
  return scenarios.filter(s=>(state.category==='all'||s.category===state.category)&&(!q||[s.title,s.short,s.prompt,s.tools.join(' '),categories.find(c=>c.id===s.category)?.name].join(' ').toLocaleLowerCase().includes(q)));
}
function renderScenarioList(){
  const items=filteredScenarios();
  $('#no-scenarios').hidden=items.length!==0;
  if(!items.find(x=>x.id===state.scenario))state.scenario=items.length?items[0].id:null;
  $('#scenario-cards').innerHTML=items.map(s=>'<button type="button" class="scenario-card '+(state.scenario===s.id?'active':'')+'" aria-pressed="'+(state.scenario===s.id)+'" data-scenario="'+eAttr(s.id)+'"><span class="sc-icon">'+esc(s.icon)+'</span><span class="scenario-card-text"><strong>'+esc(s.title)+'</strong><small>'+esc(s.short)+'</small></span><span class="chevron">›</span></button>').join('');
  renderScenarioDetail();
}
function renderScenarioDetail(){
  const root=$('#scenario-detail');const s=scenarios.find(x=>x.id===state.scenario);
  if(!s){root.innerHTML='<div class="detail-placeholder"><div>⌕</div><strong>검색 결과가 없어</strong><p>카테고리 또는 검색어를 바꿔 봐.</p></div>';return;}
  const cat=categories.find(c=>c.id===s.category);
  root.innerHTML=
    '<div class="detail-category">'+esc(cat?.name||'실전')+' / PRACTICAL PLAYBOOK</div>'+
    '<h3 class="detail-title">'+esc(s.title)+'</h3>'+
    '<p class="detail-description">'+esc(s.short)+' — 아래 순서대로 진행하면 돼.</p>'+
    '<div class="detail-tags">'+s.tools.map(t=>'<span class="tag">'+esc(t)+'</span>').join('')+'</div>'+
    '<h4 class="detail-subtitle">실제로는 이렇게 진행해</h4>'+
    '<ol class="detail-list">'+s.steps.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>'+
    '<h4 class="detail-subtitle">첫 번째 실행 명령</h4>'+
    codePanel(s.command, s.command.startsWith('/')?'CLAUDE 대화창':'MAC 터미널 / 상황에 따라 CLAUDE',s.command.startsWith('/')?'':'command')+
    '<h4 class="detail-subtitle">바로 사용하는 완성형 프롬프트</h4>'+
    codePanel(s.prompt,'CLAUDE CODE 대화창','prompt')+
    '<div class="detail-output"><b>✓ 끝났다고 판단할 기준</b><br>'+esc(s.verify)+'</div>'+
    '<div class="detail-output" style="border-color:rgba(255,209,151,.3);background:rgba(255,209,151,.05);color:#f8d7ad"><b style="color:#ffd49d">! 주의할 점</b><br>'+esc(s.warning)+'</div>';
}
function renderToolTabs(){
  $('#tool-tabs').innerHTML=toolsData.map(t=>'<button type="button" role="tab" data-tool="'+eAttr(t.id)+'" aria-selected="'+(state.tool===t.id)+'">'+esc(t.icon+' '+t.name)+'</button>').join('');
}
function renderToolContent(){
 const t=toolsData.find(x=>x.id===state.tool);if(!t)return;
 $('#tool-content').innerHTML=
   '<div class="tool-top"><span class="tool-big-icon">'+esc(t.icon)+'</span><div><h3>'+esc(t.name)+'</h3><p>'+esc(t.subtitle)+'</p></div><span class="tool-status">'+esc(t.status)+'</span></div>'+
   '<p style="font-size:13px;color:#bdcbd9;line-height:2">'+esc(t.intro)+'</p>'+
   '<div class="tool-columns">'+
   '<div class="panel-sub"><h4>무엇을 할 수 있나?</h4><ul>'+t.can.map(v=>'<li>'+esc(v)+'</li>').join('')+'</ul><h4 style="margin-top:18px">추천하는 상황</h4><p>'+esc(t.best)+'</p></div>'+
   '<div class="panel-sub"><h4>사용 순서</h4><ol style="padding-left:20px;margin:0">'+t.steps.map(v=>'<li>'+esc(v)+'</li>').join('')+'</ol></div></div>'+
   '<h4 class="detail-subtitle" style="margin-top:23px">명령어 / 입력 위치</h4>'+
   t.commands.map(c=>codePanel(c.cmd,c.location,c.location.startsWith('MAC')?'command':'prompt')).join('')+
   '<h4 class="detail-subtitle">이 도구에 바로 쓸 범용 프롬프트</h4>'+codePanel(t.prompt,'CLAUDE 대화창','prompt')+
   '<div class="detail-output" style="border-color:rgba(255,209,151,.3);color:#e8c79f"><b style="color:#ffd5a5">사용 전 체크</b><br>'+esc(t.caution)+'</div>'+
   '<div class="tool-links"><a href="'+eAttr(t.source)+'" target="_blank" rel="noopener noreferrer">공식 사이트·저장소 열기 ↗</a><a href="#situations">상황별 활용법 보기 ↗</a></div>';
}
function renderPromptTabs(){
  $('#prompt-tabs').innerHTML=promptCategories.map(c=>'<button type="button" role="tab" data-prompt-cat="'+eAttr(c.id)+'" aria-selected="'+(state.promptCategory===c.id)+'">'+esc(c.name)+'</button>').join('');
}
function promptItems(){
 return prompts.filter(p=>state.promptCategory==='all'||p.cat===state.promptCategory);
}
function renderPromptList(){
 const items=promptItems();
 if(!items.find(x=>x.id===state.prompt))state.prompt=items.length?items[0].id:null;
 $('#prompt-list').innerHTML=items.map(p=>'<button type="button" class="prompt-item '+(state.prompt===p.id?'active':'')+'" data-prompt="'+eAttr(p.id)+'" aria-pressed="'+(state.prompt===p.id)+'"><strong>'+esc(p.name)+'</strong><small>'+esc(p.about)+'</small></button>').join('');
 renderPromptPreview();
}
function renderPromptPreview(){
 const p=prompts.find(x=>x.id===state.prompt);if(!p){$('#prompt-preview').innerHTML='';return;}
 $('#prompt-preview').innerHTML=
   '<div class="preview-head"><span>⌘ READY TO COPY</span><button type="button" class="do-copy" data-value="'+eAttr(p.body)+'">전체 복사 ⧉</button></div>'+
   '<h3>'+esc(p.name)+'</h3><div><p>'+esc(p.about)+'</p></div>'+
   '<pre>'+esc(p.body)+'</pre>'+
   '<p style="color:#99b0c3;font-size:11px;margin:14px 0 0">[대괄호] 안의 값을 실제 프로젝트 이름·URL·기능명으로 교체해서 사용해.</p>';
}
const builderHints={
 feature:{tool:'Agent Skills → Context7 → /test',check:'기존 사용자 기능 유지, 테스트·빌드 통과'},
 landing:{tool:'21st MCP → Agent Skills → 모바일 QA',check:'모바일 레이아웃, CTA 작동, 접근성'},
 audit:{tool:'Graphify → 영향도 분석 → Agent Skills',check:'파일 관계도, 주요 실행 흐름, 변경 위험'},
 debug:{tool:'Agent Skills → Context7 → 회귀 테스트',check:'재현 오류 해결, 정상·실패 케이스 통과'},
 seo:{tool:'GSC 기준선 → 본문/위젯 비교 → 검토안',check:'중복 없는 보강, 기존 검색어·URL 보호'},
 security:{tool:'읽기 전용 코드 리뷰 → Docker → Strix(승인 시)',check:'테스트 권한, 취약점 근거, 모델 비용·트래픽'},
 automation:{tool:'Agent Skills 명세 → dry-run → 로컬 테스트',check:'중복 방지, 데이터 보호, 실패 복구'}
};
function buildPrompt(event){
 event?.preventDefault();
 const purpose=$('#build-purpose').value,project=$('#build-project').value.trim(),goal=$('#build-goal').value.trim(),rules=$('#build-rules').value.trim(),mode=$('#build-mode').value;
 if(!project||!goal){toast('프로젝트와 원하는 결과를 입력해 줘');return;}
 const modes={review:'읽기 전용 조사·검토안·코드 초안까지만. 실제 수정·저장·게시·배포 금지.',local:'기존 파일 백업 후 로컬 파일 수정과 테스트까지 허용. 외부 게시·운영 배포 금지.',deploy:'로컬 구현과 검증 후 배포 단계까지 준비하되 운영·공개 반영 직전 승인 경계를 준수.'};
 const hint=builderHints[purpose]||builderHints.feature;
 const result='역할: 너는 시니어 개발자, QA 담당, 실제 데이터 검증자야.\n\n[프로젝트]\n'+project+'\n\n[원하는 결과]\n'+goal+'\n\n[보호·금지 사항]\n'+(rules||'기존 URL·정상 기능·데이터·의도하지 않은 외부 요청을 보호해.')+'\n\n[권장 도구·진행 순서]\n'+hint.tool+'\n\n[실행 범위]\n'+modes[mode]+'\n\n[작업 규칙]\n1. 실제 프로젝트 파일·설정·버전·현재 동작부터 읽고 근거를 제시해.\n2. 작업 전 목적·수정 파일·우선순위·위험·완료 기준을 명세해.\n3. 설치된 도구 중 필요한 것만 사용하고, 외부 문서는 현재 버전의 공식 자료로 교차 확인해.\n4. 기존 파일을 보호하면서 최소 변경·단위별 실행·회귀 테스트를 수행해.\n5. 모르는 사실이나 미완료 상태를 완료로 포장하지 마.\n6. 테스트 결과와 롤백 방법을 포함해 한국어로 보고해.\n\n[완료 검증]\n'+hint.check+'\n\n[최종 보고 형식]\n① 변경·분석한 것 ② 실제 검증 근거 ③ 미완료/불확실성 ④ 사용·복구 방법';
 $('#generated-prompt').textContent=result;$('#copy-builder').disabled=false;$('#copy-builder').dataset.value=result;
 toast('맞춤형 프롬프트를 생성했어');
 if(innerWidth<=800)$('#generated-prompt').scrollIntoView({behavior:'smooth',block:'center'});
}
function renderFaq(){
 $('#faq-list').innerHTML=faqData.map((f,i)=>'<details class="faq-item"><summary>'+esc(f[0])+'</summary><div class="faq-content"><p>'+esc(f[1])+'</p></div></details>').join('');
}
function initialize(){
 renderCategoryTabs();renderScenarioList();renderToolTabs();renderToolContent();renderPromptTabs();renderPromptList();renderFaq();
 $('#category-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;state.category=b.dataset.cat;renderCategoryTabs();renderScenarioList();});
 $('#scenario-search').addEventListener('input',e=>{state.search=e.target.value;renderScenarioList();});
 $('#clear-search').addEventListener('click',()=>{$('#scenario-search').value='';state.search='';renderScenarioList();$('#scenario-search').focus();});
 $('#scenario-cards').addEventListener('click',e=>{const b=e.target.closest('[data-scenario]');if(!b)return;state.scenario=b.dataset.scenario;renderScenarioList();if(innerWidth<=800)$('#scenario-detail').scrollIntoView({behavior:'smooth',block:'start'});});
 $('#tool-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tool]');if(!b)return;state.tool=b.dataset.tool;renderToolTabs();renderToolContent();});
 $('#prompt-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-prompt-cat]');if(!b)return;state.promptCategory=b.dataset.promptCat;renderPromptTabs();renderPromptList();});
 $('#prompt-list').addEventListener('click',e=>{const b=e.target.closest('[data-prompt]');if(!b)return;state.prompt=b.dataset.prompt;renderPromptList();if(innerWidth<=800)$('#prompt-preview').scrollIntoView({behavior:'smooth',block:'start'});});
 document.addEventListener('click',e=>{const b=e.target.closest('[data-copy],[data-value]');if(b){copyText(b.hasAttribute('data-value')?b.dataset.value:b.dataset.copy);}});
 $('#prompt-form').addEventListener('submit',buildPrompt);
 $('#copy-builder').addEventListener('click',e=>{const v=e.currentTarget.dataset.value;if(v)copyText(v);});
 const initialHash=location.hash.replace('#','');
 const toolHash={agent:'agent',context:'context',graphify:'graphify',twentyfirst:'twentyfirst',strix:'strix',docker:'docker'};
 if(toolHash[initialHash]){state.tool=toolHash[initialHash];renderToolTabs();renderToolContent();}
}
document.addEventListener('DOMContentLoaded',initialize);
