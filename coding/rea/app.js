(() => {
  'use strict';
  const chapters = [...document.querySelectorAll('.chapter')];
  const search = document.querySelector('#search');
  const filters = [...document.querySelectorAll('[data-mode]')];
  const key = 'rea-learning-v1';
  let mode = 'all';
  let completed = new Set();
  let available = true;
  try { const saved=JSON.parse(localStorage.getItem(key)||'[]'); if(Array.isArray(saved)) completed=new Set(saved.filter(x=>chapters.some(c=>c.id===x))); } catch { available=false; }
  let toastTimer;
  function toast(message) { const el=document.querySelector('#toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{el.hidden=true;},2300); }
  function save() { try {localStorage.setItem(key,JSON.stringify([...completed]));}catch{available=false;}updateProgress(); }
  function updateProgress() {
    document.querySelector('#progress-label').textContent=`${completed.size} / ${chapters.length}장`;
    const p=document.querySelector('#progress');p.style.width=`${completed.size/chapters.length*100}%`;
    document.querySelector('#progress-track').setAttribute('aria-valuenow',String(completed.size));
    document.querySelector('#storage-note').textContent=available?'체크한 진도는 이 브라우저에만 저장돼요.':'저장 공간을 사용할 수 없어 이번 화면에서만 진도를 표시해요.';
    chapters.forEach(c=>{const done=completed.has(c.id);const b=c.querySelector('.complete');b.setAttribute('aria-pressed',String(done));b.textContent=done?'✓ 학습 완료':'○ 이 장 학습 완료';document.querySelector(`a[href="#${c.id}"]`)?.classList.toggle('done',done);});
  }
  function applyFilter() {
    const terms=search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count=0;
    chapters.forEach(c=>{const ok=(mode==='all'||c.dataset.chapter==='07')&&terms.every(t=>c.textContent.toLocaleLowerCase().includes(t));c.hidden=!ok;if(ok)count++;});
    document.querySelector('#empty').hidden=count!==0;
    document.querySelector('#result-count').textContent=terms.length?`${count}개 장에서 검색됨`:mode==='prompts'?'단계별 프롬프트 10개':'전체 가이드 · 12개 장';
  }
  search.addEventListener('input',applyFilter);
  filters.forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;filters.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));applyFilter();}));
  document.querySelectorAll('.complete').forEach(b=>b.addEventListener('click',()=>{const id=b.closest('.chapter').id;if(completed.has(id))completed.delete(id);else completed.add(id);save();}));
  document.querySelector('#reset').addEventListener('click',()=>{completed.clear();save();toast('학습 체크를 초기화했어요.');});
  document.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',async()=>{
    const code=b.closest('.code-wrap').querySelector('code'); const value=code.textContent;
    try { await navigator.clipboard.writeText(value);toast('복사 완료. 대괄호 값을 바꿔 사용하세요.'); }
    catch { const ta=document.createElement('textarea');ta.value=value;ta.style.position='fixed';ta.style.top='-9999px';document.body.append(ta);ta.select();let ok=false;try{ok=document.execCommand('copy');}catch{}ta.remove();if(ok)toast('복사했어요.');else{const r=document.createRange();r.selectNodeContents(code);const s=window.getSelection();s.removeAllRanges();s.addRange(r);toast('텍스트를 선택했어요. 길게 눌러 복사하세요.');} }
  }));
  function reveal(id) {search.value='';mode='all';filters.forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.mode==='all')));applyFilter();document.querySelector(id)?.scrollIntoView({behavior:'auto',block:'start'});}
  document.querySelectorAll('.nav-list a,.hero-actions a[href^="#"]').forEach(a=>a.addEventListener('click',()=>reveal(a.getAttribute('href'))));
  document.querySelector('#menu').addEventListener('click',()=>{const nav=document.querySelector('#chapters-nav');const closed=nav.classList.toggle('closed');document.querySelector('#menu').setAttribute('aria-expanded',String(!closed));});
  const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){document.querySelectorAll('.nav-list a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id));}}},{rootMargin:'-10% 0px -70% 0px'});
  chapters.forEach(c=>observer.observe(c));
  if(matchMedia('(max-width:850px)').matches){document.querySelector('#chapters-nav').classList.add('closed');document.querySelector('#menu').setAttribute('aria-expanded','false');}
  updateProgress();applyFilter();
  if(/^#chapter-\d+$/.test(location.hash))reveal(location.hash);
})();
