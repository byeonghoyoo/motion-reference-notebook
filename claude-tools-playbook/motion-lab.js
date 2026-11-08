'use strict';
/* Motion playground: no external libraries, no media uploads, no sound. */
const motionDemos = [
 {id:'fade',num:'01',name:'Fade',kind:'기본 등장',icon:'◌',usage:'첫 화면의 제목이나 배경이 천천히 나타날 때',css:'opacity: 0 → 1',time:'650ms · ease-out',prompt:'[타이틀]이 불투명도 0에서 1로 650ms 동안 부드럽게 나타나는 Fade In을 만들어 줘. 시작은 숨김, 끝에는 정상 표시를 유지하고 transform은 사용하지 마. 모바일/축소 모션 설정을 확인해.',html:'<strong class="motion-word demo-fade">SOFT<br>APPEAR</strong>'},
 {id:'slide',num:'02',name:'Slide',kind:'방향감 있는 등장',icon:'↗',usage:'자막·설명 카드·배너가 좌우에서 진입할 때',css:'translateX(-68px) → 0',time:'750ms · ease-out',prompt:'[자막 카드]가 왼쪽 -68px에서 원래 위치로 이동하면서 불투명도가 0→1이 되는 Slide In을 750ms로 구현해. 레이아웃을 밀지 않도록 transform만 변경하고 종료 위치는 유지해.',html:'<span class="motion-slide-card demo-slide"><small>NEW ARRIVAL</small><b>MOVE WITH INTENT ↗</b></span>'},
 {id:'scale',num:'03',name:'Scale',kind:'크기 변화',icon:'⊙',usage:'로고·제품·가격이 확대되며 강조될 때',css:'scale(.65) → scale(1)',time:'800ms · ease-out',prompt:'[메인 제품/가격]이 scale 0.65에서 1로 확대되는 Scale In을 800ms로 구현해. 중심점을 유지하고 갑작스러운 탄성 없이 ease-out을 적용해. 텍스트·이미지 왜곡과 모바일 레이아웃을 검증해.',html:'<div class="demo-scale motion-orb"><span>01</span></div>'},
 {id:'spring',num:'04',name:'Spring',kind:'탄성 등장',icon:'✳',usage:'CTA·중요 카드가 자연스럽게 자리잡을 때',css:'scale(.72) → 1.05 → 1',time:'900ms · spring-like CSS',prompt:'[CTA 버튼]에 자연스러운 Spring-like 모션을 만들어 줘. scale 0.72에서 시작해 1.05 정도 가볍게 오버슈트한 뒤 1로 수렴해. 과도한 흔들림을 피하고 900ms 이내에 끝나게 해. React에서는 Motion의 spring 파라미터를 우선 사용해.',html:'<span class="motion-spring-card demo-spring"><span class="spring-star">✳</span><b>READY TO GO</b><small>SMOOTH MOTION</small></span>'},
 {id:'bounce',num:'05',name:'Bounce',kind:'튀어오르는 강조',icon:'⌄',usage:'가격·쿠폰·숫자 포인트를 눈에 띄게 할 때',css:'translateY(-60px) → 0',time:'950ms · rebound',prompt:'[강조 숫자]가 위에서 가볍게 떨어져 1~2회만 튀는 Bounce를 만들어 줘. 950ms 내로 안정적으로 멈추고 숫자 원본을 유지해. 과도한 반복 반짝임이나 자극적 효과는 쓰지 마.',html:'<span class="demo-bounce motion-bounce-token"><small>POINT</small><b>+30</b></span><span class="motion-shadow"></span>'},
 {id:'typewriter',num:'06',name:'Typewriter',kind:'한 글자씩 타이핑',icon:'⌨',usage:'문장·브랜드 메시지를 차례대로 읽게 할 때',css:'width 0 → 100% · steps()',time:'1.3s · 13 steps',prompt:'[짧은 문장]이 1.3초에 걸쳐 글자별로 나타나는 Typewriter 효과를 구현해. 고정폭 폰트를 사용하고 마지막 글자까지 정확하게 표시되도록 steps와 글자 수를 일치시켜. 커서가 깜빡이다가 끝 프레임에서 안정적으로 멈추게 해.',html:'<span class="type-box"><span class="demo-typewriter">STAY CURIOUS.</span></span>'},
 {id:'scramble',num:'07',name:'Text Scramble',kind:'문자 섞임 → 정착',icon:'⌁',usage:'하이테크·정보 공개·키워드 강조',css:'random glyphs → fixed text',time:'~1.1s · JS',prompt:'[최종 문장]을 원래 글자를 뒤섞은 것처럼 보였다가 1.1초 안에 정확한 문장으로 확정하는 Text Scramble을 구현해. 마지막 문구를 한 글자도 바꾸지 않고, 랜덤 문자가 빠르게 번쩍이지 않도록 50ms 이상 간격을 둬. reduced-motion에서는 최종 문장만 보여 줘.',html:'<span class="motion-scramble" data-final="MOTION DESIGN">MOTION DESIGN</span>'},
 {id:'split',num:'08',name:'Split Text',kind:'단어별 순차 등장',icon:'⋮',usage:'후킹 문장·제품 USP를 리듬감 있게 보여 줄 때',css:'word stagger 90ms',time:'1.1s · stagger',prompt:'[문장]을 단어 단위로 나누고 각각 90ms 간격의 Stagger로 아래에서 올라오게 만들어 줘. Split Text 동작은 DOM 접근성과 읽는 순서를 유지하고, 문자 간격과 줄바꿈을 훼손하지 않게 해.',html:'<div class="motion-split"><span>CREATE</span><span>WITH</span><span>CLARITY</span></div>'},
 {id:'count',num:'09',name:'Count-up',kind:'숫자 변화',icon:'#',usage:'확인된 가격·통계·진행률을 강조할 때',css:'0 → 128 · integer frame',time:'1.2s · ease-out',prompt:'확인된 수치 [128]을 0부터 1.2초 동안 Count-up 하고 마지막에 128로 고정해. 프레임마다 정수로 반올림하고 숫자의 단위·조건을 고정해. 표시값은 입력 데이터와 대조하고 키보드/스크린리더 접근성을 고려해.',html:'<span class="motion-count"><b data-count="128">128</b><small>PROJECTS</small></span>'},
 {id:'line',num:'10',name:'Line Drawing',kind:'선을 그리며 등장',icon:'〰',usage:'로고·아이콘·시술 흐름을 선으로 설명할 때',css:'stroke-dashoffset 280 → 0',time:'1.5s · linear',prompt:'[제공된 SVG 경로]의 실제 모양을 바꾸지 않고 stroke-dasharray / stroke-dashoffset으로 Line Drawing을 구현해. 1.5초 동안 한 방향으로 그려지고, 끝까지 완성된 후에는 정지해. 9:16과 웹에서 모두 사용할 수 있는 해상도로 만들어 줘.',html:'<svg class="motion-line" viewBox="0 0 240 90" role="img" aria-label="선형 경로가 그려지는 데모"><path class="line-guide" d="M12 62 C50 17,64 75,100 43 S158 18,184 54 S216 67,230 14"/><path class="demo-line" d="M12 62 C50 17,64 75,100 43 S158 18,184 54 S216 67,230 14"/></svg>'},
 {id:'morph',num:'11',name:'Morphing',kind:'형태 전환',icon:'⬡',usage:'제품 A→B 비교, 개념도·아이콘 전환',css:'border-radius transition',time:'1.3s · ease-in-out',prompt:'[원형]에서 [유기적 형태]로 자연스럽게 변하는 Morphing을 1.3초로 구현해. 두 도형의 기준 위치와 크기를 맞추고 중간 프레임에서 모양이 튀지 않게 해. SVG path끼리 직접 모핑이 어렵다면 CSS border-radius 또는 clip-path 대안을 제시해.',html:'<div class="motion-morph demo-morph"><span>FORM</span></div>'},
 {id:'marquee',num:'12',name:'Marquee',kind:'끊김 없는 가로 흐름',icon:'→',usage:'브랜드 키워드·장식 타이포 배경',css:'translateX(0 → -50%)',time:'4.8s · linear loop',prompt:'[브랜드 키워드]를 무한 반복하는 Marquee로 구현해. 텍스트 묶음을 중복해 첫 프레임과 끝 프레임이 자연스럽게 이어지도록 하고, 속도를 일정하게 유지해. 중요한 정보 전달보다는 장식 용도로 제한하고 reduced-motion에서는 정지 표시해.',html:'<div class="motion-marquee-viewport"><div class="demo-marquee-track"><span>DESIGN · MOTION · FUTURE · </span><span aria-hidden="true">DESIGN · MOTION · FUTURE · </span></div></div>'},
 {id:'lowerthird',num:'13',name:'Lower Third',kind:'인물·정보 라벨',icon:'▰',usage:'인터뷰 영상의 화자명·핵심 정보',css:'slide + opacity + hold',time:'3s · in/hold/out',prompt:'[화자 이름/직책]을 나타내는 4초 Lower Third를 제작해. 0~0.5초 왼쪽 Slide In, 0.5~3.3초 Hold, 3.3~4초 Fade Out. 영상 9:16의 자막 안전 영역을 피하고 글자 대비와 시각적 계층을 유지해. 의료진 직책 등은 공식 확인된 것만 사용해.',html:'<div class="motion-fake-shot"><span class="fake-shot-orb"></span><span class="demo-lowerthird"><b>CREATIVE LEAD</b><small>MOTION / STUDIO</small></span></div>'},
 {id:'parallax',num:'14',name:'Parallax',kind:'깊이감 있는 레이어',icon:'◉',usage:'웹 히어로·제품 소개 배경에 깊이 주기',css:'layer speeds 3 levels',time:'1.8s · layered',prompt:'[히어로 배경]에 전경·중경·후경 3레이어 Parallax를 구현해. 각 레이어의 이동량을 다르게 하되 움직임이 CTA나 본문 가독성을 방해하지 않게 해. 모바일에서는 이동량을 줄이고 reduced-motion 시 모두 정지해. 스크롤과 LCP·CLS 영향을 검증해.',html:'<div class="motion-parallax"><span class="parallax-layer back"></span><span class="parallax-layer mid"></span><span class="parallax-layer front"></span><b>DEPTH</b></div>'}
];
const motionRunning=new Map();
const motionStatusTimers=new WeakMap();
function motionEscape(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderMotionLab(){
 const root=document.querySelector('#motion-grid');
 if(!root)return;
 root.innerHTML=motionDemos.map(d=>
 '<article class="motion-demo-card" data-motion-card="'+d.id+'">'+
 '<div class="motion-demo-top"><span class="motion-num">'+d.num+' / '+motionEscape(d.kind)+'</span><span class="motion-mark">'+motionEscape(d.icon)+'</span></div>'+
 '<div class="motion-stage" data-motion-stage="'+d.id+'" style="--motion-speed:2">'+d.html+'<div class="motion-play-indicator" aria-hidden="true">▶ 버튼을 눌러 재생</div><div class="motion-play-progress" aria-hidden="true"><i></i></div></div>'+
 '<div class="motion-demo-details"><div class="motion-name-row"><h3>'+motionEscape(d.name)+'</h3><span class="motion-time">'+motionEscape(d.time)+'</span></div>'+
 '<p>'+motionEscape(d.usage)+'</p><small class="motion-css-hint">'+motionEscape(d.css)+'</small>'+
 '<div class="motion-demo-actions"><button type="button" data-motion-play="'+d.id+'" aria-label="'+motionEscape(d.name)+' 효과 재생"><span aria-hidden="true">▶</span> 효과 재생</button>'+
 '<button type="button" data-value="'+motionEscape(d.prompt)+'" aria-label="'+motionEscape(d.name)+' 프롬프트 복사">프롬프트 복사 ⧉</button></div></div></article>'
 ).join('');
}
function stopMotionTicker(stage){
 const prev=motionRunning.get(stage);
 if(prev){if(prev.raf)cancelAnimationFrame(prev.raf);if(prev.interval)clearInterval(prev.interval);}
 motionRunning.delete(stage);
}
function playMotion(id){
 const card=document.querySelector('[data-motion-card="'+id+'"]');if(!card)return;
 const stage=card.querySelector('.motion-stage');stopMotionTicker(stage);
 const speed=Number(document.querySelector('#motion-speed')?.value||'2')||2;
 stage.style.setProperty('--motion-speed',String(speed));stage.classList.remove('playing');void stage.offsetWidth;
 // Playback is explicitly user-triggered; do not silently suppress demos because
 // a mobile OS prefers reduced motion. No passive animation starts automatically.
 stage.classList.add('playing');
 const indicator=stage.querySelector('.motion-play-indicator');
 if(indicator)indicator.textContent='▶ 재생 중';
 const btn=card.querySelector('[data-motion-play]');
 if(btn)btn.setAttribute('aria-label', id+' 모션 다시 재생');
 const oldTimer=motionStatusTimers.get(stage);
 if(oldTimer)clearTimeout(oldTimer);
 const timer=setTimeout(()=>{if(indicator)indicator.textContent='✓ 재생 완료';}, 1900*speed);
 motionStatusTimers.set(stage,timer);
 if(id==='scramble'){
  const el=stage.querySelector('[data-final]');if(!el)return;
  const final=el.dataset.final||'',chars='01ABCDEFGHJKLMNPQRSTUVWXYZ',started=performance.now(),duration=1100*speed,state={};
  state.interval=setInterval(()=>{
   const pct=Math.min(1,(performance.now()-started)/duration),locked=Math.round(final.length*pct);
   el.textContent=Array.from(final).map((c,i)=>c===' '?' ':i<locked?c:chars[Math.floor(Math.random()*chars.length)]).join('');
   if(pct>=1){el.textContent=final;clearInterval(state.interval);motionRunning.delete(stage);}
  },65);
  motionRunning.set(stage,state);
 }
 if(id==='count'){
  const el=stage.querySelector('[data-count]');if(!el)return;
  const max=Number(el.dataset.count)||128,duration=1200*speed,started=performance.now();
  function tick(time){
   const pct=Math.min(1,(time-started)/duration),ease=1-Math.pow(1-pct,3);
   el.textContent=String(Math.round(max*ease));
   if(pct<1)motionRunning.set(stage,{raf:requestAnimationFrame(tick)});
   else{el.textContent=String(max);motionRunning.delete(stage);}
  }
  el.textContent='0';motionRunning.set(stage,{raf:requestAnimationFrame(tick)});
 }
}
function initMotionLab(){
 renderMotionLab();
 document.querySelector('#motion-grid')?.addEventListener('click',e=>{
  const btn=e.target.closest('[data-motion-play]');if(btn)playMotion(btn.dataset.motionPlay);
 });
 document.querySelector('#motion-replay-all')?.addEventListener('click',()=>{
  motionDemos.forEach((d,i)=>setTimeout(()=>playMotion(d.id),i*65));
 });
 document.querySelector('#motion-speed')?.addEventListener('change',()=>{
  Array.from(document.querySelectorAll('.motion-stage.playing')).forEach(e=>playMotion(e.dataset.motionStage));
 });
}
document.addEventListener('DOMContentLoaded',initMotionLab);
