'use strict';
const D=window.MOTION_DATA;
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cats=[
 ['all','전체','전체 컬렉션','스타일을 고르고, 움직임을 비교하고, 다음 작업에 가져오세요.'],
 ['styles','스타일 30','스타일 & 타이포그래피','시각적인 분위기부터 정하세요. 30가지 스타일의 이미지와 프롬프트입니다.'],
 ['motion','모션 46','전환 & 움직임','46가지 등장·전환 기법을 이미지와 실제 HTML 데모로 비교하세요.'],
 ['camera','카메라 46','카메라 & 시점','46가지 카메라 움직임의 설명과 복사 가능한 프롬프트입니다.'],
 ['workflow','제작·편집','영상 제작 & 편집','레퍼런스 분석부터 프리셋, TTS, 자막, 최종 검수까지.'],
 ['ads','광고·로고','제품 광고 & 로고','브랜드 영상, 로고 애니메이션, 제품과 릴스 연출을 찾으세요.'],
 ['direction','영상 연출','영상 연출 & 스타일','콜라주와 영상 스타일을 일관된 장면으로 이어가는 방법.'],
 ['prompts','코드 프롬프트','코드로 만드는 영상','수집한 개별 프롬프트와 전체 사례 모음. 원문을 그대로 복사하세요.'],
 ['tools','도구','도구 & 워크플로우 참고','작성 당시 수집한 도구 후보입니다. 도입 전 공식 정보를 확인하세요.'],
 ['images','이미지','이미지 전체 보기','확보한 참고 이미지 87장을 원래 비율 그대로 모았습니다.'],
 ['sources','원문·파일','원문 & 파일 목록','전체 가이드, 원본 파일과 확인하지 못한 첨부를 한곳에서 확인하세요.']
];
const catMap=new Map(cats.map(c=>[c[0],c]));
let tab='all',query='',limit=24,savedOnly=false,active=null,lastFocus=null,sort='curated';
let saved;try{saved=new Set(JSON.parse(localStorage.getItem('motion-notebook-saved-v1')||'[]'))}catch{saved=new Set()}
const byItem=new Map(D.items.map(x=>[x.id,x]));
const byDoc=new Map(D.docs.map(x=>[x.id,x]));
let toastTimer;
function toast(s){$('#toast').textContent=s;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2200)}
async function copy(s){try{await navigator.clipboard.writeText(s);toast('복사했어요. 작업에 붙여 넣어보세요.')}catch{const t=document.createElement('textarea');t.value=s;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();const ok=document.execCommand('copy');t.remove();toast(ok?'복사했어요.':'복사가 제한되어 있어요. 원문을 선택해 복사해 주세요.')}}
function save(id){saved.has(id)?saved.delete(id):saved.add(id);try{localStorage.setItem('motion-notebook-saved-v1',JSON.stringify([...saved]))}catch{toast('이 브라우저에서는 저장이 유지되지 않을 수 있어요.')}updateSaved();render();if(active)$('#saveReader').textContent=saved.has(active.id)?'★ 저장됨':'☆ 저장'}
function updateSaved(){$('#savedCount').textContent=saved.size;$('#savedToggle').setAttribute('aria-pressed',String(savedOnly))}
function match(x){return !query||(x.title+' '+(x.search||x.excerpt||'')).normalize('NFKC').toLocaleLowerCase().includes(query.normalize('NFKC').toLocaleLowerCase())}
function itemsFor(t){let a=D.items.filter(x=>{
 if(t==='all')return !(x.type==='guide'&&['styles','motion','camera'].includes(x.category));
 if(['styles','motion','camera'].includes(t))return x.category===t&&x.type==='reference';
 return x.category===t;
});
 if(t==='all'&&sort==='curated'){const order=['styles','motion','camera','workflow','ads','direction','prompts','tools'];a.sort((x,y)=>{const rank=x=>x.type==='reference'?parseInt(x.number)*8+order.indexOf(x.category):x.id==='longform-sync-guide'?0:400+order.indexOf(x.category);return rank(x)-rank(y)});}
 if(sort==='title')a.sort((x,y)=>x.title.localeCompare(y.title,'ko'));
 return a.filter(x=>match(x)&&(!savedOnly||saved.has(x.id)));
}
function renderTabs(){$('#tabs').innerHTML=cats.map(c=>'<button role="tab" id="tab-'+c[0]+'" aria-controls="results" aria-selected="'+(tab===c[0])+'" tabindex="'+(tab===c[0]?'0':'-1')+'" data-tab="'+c[0]+'">'+c[1]+'</button>').join('');$('#results').setAttribute('aria-labelledby','tab-'+tab)}
function cover(item){
 if(item.image)return '<img loading="lazy" src="'+esc(item.image)+'" alt="'+esc(item.title)+'">';
 if(item.category==='camera'){const ar=/오른|right/i.test(item.title)?'→':/왼|left/i.test(item.title)?'←':/업|up|상승/i.test(item.title)?'↑':/다운|down|하강/i.test(item.title)?'↓':/회전|orbit|roll/i.test(item.title)?'↻':'↗';return '<div class="camera-art"><div class="camera-frame"></div><span class="camera-arrow">'+ar+'</span><small>CAMERA MOVEMENT</small></div>';}
 const words={workflow:['WORKFLOW','흐름을<br>설계하다.'],ads:['BRAND IN MOTION','브랜드를<br>움직이다.'],prompts:['COPY. ADAPT. CREATE.','{ prompt }<br>→ motion'],direction:['VISUAL DIRECTION','장면의<br>방향을 잡다.'],tools:['THE TOOLBOX','도구를<br>연결하다.']};
 const w=words[item.category]||['MOTION NOTE','움직임을<br>기록하다.'];
 return '<div class="generated-cover cover-'+item.category+'"><small>'+w[0]+'</small><strong>'+w[1]+'</strong></div>';
}
function card(x){return '<article class="card"><button class="save-card" data-save="'+x.id+'" aria-label="'+esc(x.title)+' 저장" aria-pressed="'+saved.has(x.id)+'">'+(saved.has(x.id)?'★':'☆')+'</button><button class="card-main" data-open="'+x.id+'"><div class="card-visual">'+cover(x)+'<span class="card-number">'+(x.number?'NO. '+x.number:'GUIDE')+'</span>'+(x.demo?'<span class="demo-badge">실행 데모</span>':'')+'</div><div class="card-copy"><p class="card-tag">'+esc(catMap.get(x.category)?.[1]||'REFERENCE')+'</p><h3>'+esc(x.title)+'</h3><p class="description">'+esc(x.excerpt)+'</p></div></button><div class="card-bottom"><span>'+(x.type==='guide'?'전체 가이드':x.prompts?.length?x.prompts.length+'개 프롬프트':'기법 설명')+'</span><span>살펴보기 ↗</span></div></article>'}
function render(){
 renderTabs();const c=catMap.get(tab);$('#sectionTitle').textContent=savedOnly?'저장한 자료':c[2];$('#sectionDesc').textContent=c[3];
 $('#activeFilters').innerHTML=(query?'<button data-clear-query>검색: '+esc(query)+' ×</button>':'')+(savedOnly?'<button data-clear-saved>저장한 자료만 ×</button>':'');
 if(tab==='images'){renderImages();return;}if(tab==='sources'){renderSources();return;}
 const a=itemsFor(tab);$('#resultCount').textContent=a.length+'개 자료';$('#results').innerHTML=a.length?'<div class="cards">'+a.slice(0,limit).map(card).join('')+'</div>':empty();$('#loadMore').hidden=a.length<=limit;$('#loadMore').firstChild.textContent='자료 더 보기 ('+Math.max(0,a.length-limit)+'개) ';
}
function empty(){return '<div class="empty"><h3>아직 맞는 자료를 찾지 못했어요.</h3><p>다른 단어로 검색하거나 필터를 초기화해 보세요.</p><button data-reset>전체 자료 보기</button></div>'}
function renderImages(){const a=D.images.filter(x=>!query||(x.name+' '+x.category).toLocaleLowerCase().includes(query.toLocaleLowerCase()));$('#resultCount').textContent=a.length+'장';$('#results').innerHTML='<div class="image-grid">'+a.slice(0,limit).map(x=>'<button class="image-tile" data-image="'+x.src+'" data-caption="'+esc(x.name)+'" aria-label="'+esc(x.name)+' 확대"><img src="'+x.src+'" alt="'+esc(x.name)+'" loading="lazy"><span>'+esc(x.category)+' · '+esc(x.name)+'</span></button>').join('')+'</div>';$('#loadMore').hidden=a.length<=limit;$('#loadMore').firstChild.textContent='이미지 더 보기 ('+Math.max(0,a.length-limit)+'장) ';}
function renderSources(){
 const docs=D.docs.filter(x=>match({...x,search:x.raw}));const files=D.inventory.filter(x=>!query||(x.name+' '+x.originalPath).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
 $('#resultCount').textContent=docs.length+'개 문서 · '+files.length+'개 파일';$('#loadMore').hidden=true;
 const warnings=D.missing.map(x=>'<li>'+esc(x.docName)+' — <a href="#item='+x.docId+'">원문 확인</a><br><small>'+esc(x.href)+'</small></li>').join('');
 $('#results').innerHTML='<div class="source-intro"><h3>요약에서 멈추지 않는 자료 모음</h3><p>원문 가이드 <strong>'+D.stats.documents+'개</strong>, 이미지 <strong>'+D.stats.images+'장</strong>, 실행 데모 <strong>'+D.stats.demos+'개</strong>, 사례 JSON 1개를 포함했습니다. 파일 목록은 다운로드한 원본의 SHA-256과 함께 기록했습니다.</p><p>수집 문서의 도구명·가격·성능 표현은 작성 당시 내용입니다. 출처와 함께 보존했으며 모두 현재 정보로 재검증한 것은 아닙니다.</p><details><summary>기존 Notion 첨부 3개는 아직 확인되지 않았어요</summary><ul>'+warnings+'</ul><p>첨부를 임의로 대체하지 않았습니다. 원본 파일을 확보하면 연결할 수 있습니다.</p></details><a href="inventory.json" download="모션그래픽_파일목록.json">전체 파일·해시 목록 다운로드 ↓</a></div><div class="source-docs">'+docs.map((x,i)=>'<button class="source-doc" data-open="'+x.id+'"><span>'+String(i+1).padStart(2,'0')+'</span><div><strong>'+esc(x.title)+'</strong><small>'+esc(catMap.get(x.category)?.[1])+' · '+x.promptCount+'개 코드·프롬프트 블록</small></div></button>').join('')+'</div><h3>모든 원본 파일</h3><div class="source-files"><table class="source-table"><thead><tr><th>파일</th><th>유형</th><th>크기</th><th>열기</th></tr></thead><tbody>'+files.map(x=>'<tr><td>'+esc(x.name)+'</td><td>'+esc(x.mime==='text/markdown'?'MD':x.mime==='text/html'?'HTML 데모':x.mime.startsWith('image/')?'이미지':'JSON')+'</td><td>'+Math.ceil(x.size/1024)+' KB</td><td><a href="'+x.local+'" download="'+esc(x.name)+'">다운로드</a></td></tr>').join('')+'</tbody></table></div>';
}
function setTab(t){if(!catMap.has(t))t='all';tab=t;limit=24;if(['images','sources'].includes(t)&&savedOnly){savedOnly=false;updateSaved()}render();history.replaceState(null,'','#tab='+t)}
function lightbox(src,caption){$('#lightboxImg').src=src;$('#lightboxImg').alt=caption||'참고 이미지';$('#lightboxCaption').textContent=caption||'';if(!$('#lightbox').open)$('#lightbox').showModal();}
function closeReader(){if($('#reader').open)$('#reader').close();$('#demoArea').innerHTML='';active=null;history.replaceState(null,'','#tab='+tab);lastFocus?.focus?.()}
function viewMode(raw){$('#readerRaw').hidden=!raw;$('#readerBody').hidden=raw;$('#demoArea').hidden=raw;$('#readerToc').hidden=raw;$('#readMode').classList.toggle('active',!raw);$('#rawMode').classList.toggle('active',raw);$('#readerScroll').scrollTop=0}
function openItem(id){
 const item=byItem.get(id);if(!item){toast('자료를 찾을 수 없어요.');return;}
 active=item;lastFocus=document.activeElement;const doc=byDoc.get(item.docId);if(!doc)return;
 $('#readerTitle').textContent=item.title;$('#readerCategory').textContent=(catMap.get(item.category)?.[1]||'REFERENCE')+' / '+(item.number?'NO. '+item.number:'FULL GUIDE');
 $('#readerBody').innerHTML=item.html||doc.html;$('#readerRaw').textContent=doc.raw;
 $('#downloadDoc').href=doc.local;$('#downloadDoc').download=doc.name;$('#saveReader').textContent=saved.has(item.id)?'★ 저장됨':'☆ 저장';
 $('#detailMeta').innerHTML=item.type==='reference'?'<div class="detail-note">전체 문서에서 이 기법을 꺼내 보여드리고 있어요. <a href="#item='+doc.id+'">전체 가이드 보기 ↗</a><br>‘원문 전체’에서는 이 문서의 모든 내용을 확인할 수 있습니다.</div>':'<div class="detail-note">수집한 문서 전체를 표시합니다. 출처와 작성 시점은 본문을 확인하세요. 원문 전체·MD 다운로드에서도 모든 내용을 볼 수 있습니다.</div>';
 $('#demoArea').innerHTML=item.demo?'<div class="demo-start"><button class="play-demo" aria-label="HTML 모션 데모 재생">▶</button><div><strong>실제 움직임으로 확인해 보세요.</strong><p>원본 HTML 데모를 이 화면 안에서 실행합니다. 일부 글꼴은 인터넷 연결이 필요합니다.</p></div></div>':'';
 const headings=[...$('#readerBody').querySelectorAll('h1,h2,h3')];
 $('#readerToc').innerHTML='<p>ON THIS PAGE</p>'+headings.map((h,i)=>'<button data-toc="'+i+'">'+esc(h.textContent)+'</button>').join('');
 viewMode(false);renderFlow();if(!$('#reader').open)$('#reader').showModal();$('#readerScroll').scrollTop=0;history.replaceState(null,'','#item='+encodeURIComponent(id));
}
function renderFlow(){
 const blocks=[...$('#readerBody').querySelectorAll('.code-block')];const node=blocks.find(x=>x.querySelector('.code-bar span')?.textContent==='mermaid');if(!node||active.docId!=='longform-sync-guide')return;
 const visual=document.createElement('figure');visual.className='flow-visual';visual.setAttribute('aria-label','확정 대본에서 TTS와 공통 타이밍 표를 만들고 화면·모션·음성을 병렬로 준비한 뒤 조립, 자막 정렬, 검사하는 흐름');
 visual.innerHTML='<div class="flow-node">확정 대본과 문단 ID</div><span class="flow-arrow">↓</span><div class="flow-node">TTS 생성과 길이 측정</div><span class="flow-arrow">↓</span><div class="flow-node">공통 타이밍 표</div><span class="flow-arrow">↙　↓　↘</span><div class="flow-row"><div class="flow-node">녹화 화면<br>재편집</div><div class="flow-node">모션 보드<br>렌더</div><div class="flow-node">음성<br>배치</div></div><span class="flow-arrow">↘　↓　↙</span><div class="flow-node">영상과 최종 음성 조립</div><span class="flow-arrow">↓</span><div class="flow-node">최종 음성으로 자막 정렬</div><span class="flow-arrow">↓</span><div class="flow-node">납품본 검사</div>';node.before(visual);
}
function startDemo(){
 if(!active?.demo)return;
 $('#demoArea').innerHTML='<div class="demo-stage"><iframe title="'+esc(active.title)+' 모션 데모" sandbox="allow-scripts" referrerpolicy="no-referrer" src="'+active.demo+'"></iframe><div class="demo-caption"><span>원본 HTML · 독립된 미리보기</span><button class="stop-demo">재생 닫기</button></div></div>';
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button,a');if(!b)return;
 if(b.dataset.save){save(b.dataset.save);return;}
 if(b.dataset.open){openItem(b.dataset.open);return;}
 if(b.dataset.tab){setTab(b.dataset.tab);return;}
 if(b.dataset.image){lightbox(b.dataset.image,b.dataset.caption||b.getAttribute('aria-label'));return;}
 if(b.matches('.copy-code')){copy(b.closest('.code-block').querySelector('code').textContent);return;}
 if(b.matches('.play-demo')){startDemo();return;}
 if(b.matches('.stop-demo')){$('#demoArea').innerHTML='<button class="play-demo" aria-label="데모 다시 재생">▶</button>';return;}
 if(b.dataset.toc!==undefined){[...$('#readerBody').querySelectorAll('h1,h2,h3')][Number(b.dataset.toc)]?.scrollIntoView({block:'start'});return;}
 if(b.dataset.heading!==undefined){e.preventDefault();const want=decodeURIComponent(b.dataset.heading).replace(/\s+/g,'-').toLowerCase();const h=[...$('#readerBody').querySelectorAll('h1,h2,h3,h4')].find(x=>x.textContent.trim().toLowerCase().replace(/\s+/g,'-')===want);h?.scrollIntoView({block:'start'});return;}
 if(b.matches('[data-clear-query]')){query='';$('#search').value='';limit=24;render();return;}
 if(b.matches('[data-clear-saved]')){savedOnly=false;updateSaved();render();return;}
 if(b.matches('[data-reset]')){query='';$('#search').value='';savedOnly=false;updateSaved();setTab('all');return;}
});
$('#search').addEventListener('input',e=>{query=e.target.value.trim();limit=24;render()});
$('#sort').addEventListener('change',e=>{sort=e.target.value;render()});
$('#loadMore').addEventListener('click',()=>{limit+=24;render()});
$('#savedToggle').addEventListener('click',()=>{savedOnly=!savedOnly;if(['images','sources'].includes(tab))tab='all';updateSaved();render()});
$('#tabs').addEventListener('keydown',e=>{const arr=[...$('#tabs').querySelectorAll('button')];const i=arr.indexOf(e.target);if(i<0)return;let n=i;if(e.key==='ArrowRight')n=(i+1)%arr.length;else if(e.key==='ArrowLeft')n=(i-1+arr.length)%arr.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=arr.length-1;else return;e.preventDefault();const t=arr[n].dataset.tab;setTab(t);$('#tab-'+t).focus()});
$('#closeReader').addEventListener('click',closeReader);$('#reader').addEventListener('cancel',e=>{e.preventDefault();closeReader()});
$('#closeLightbox').addEventListener('click',()=>$('#lightbox').close());
$('#readMode').addEventListener('click',()=>viewMode(false));$('#rawMode').addEventListener('click',()=>viewMode(true));
$('#saveReader').addEventListener('click',()=>active&&save(active.id));$('#shareReader').addEventListener('click',()=>copy(location.href));
$('#reader').addEventListener('click',e=>{if(e.target===$('#reader'))closeReader()});
$('#lightbox').addEventListener('click',e=>{if(e.target===$('#lightbox'))$('#lightbox').close()});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!$('#reader').open){e.preventDefault();$('#search').focus()}});
function route(){const hash=location.hash.slice(1);if(hash.startsWith('item=')){openItem(decodeURIComponent(hash.slice(5)));return;}if($('#reader').open){$('#reader').close();$('#demoArea').innerHTML='';active=null;}if(hash.startsWith('tab='))setTab(hash.slice(4));}
window.addEventListener('hashchange',route);
$('#statImages').textContent=D.stats.images;$('#statDemos').textContent=D.stats.demos;$('#statDocs').textContent=D.stats.documents;
updateSaved();render();route();

