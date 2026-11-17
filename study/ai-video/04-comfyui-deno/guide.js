// SPDX-License-Identifier: GPL-3.0-only
const $ = id => document.getElementById(id);
const KEY = 'motion-notebook.comfy-deno.v1';
let state = {saved: [], checks: []};
let storageAvailable = true;
try {
 const candidate = JSON.parse(localStorage.getItem(KEY) || '{}');
 if (candidate && typeof candidate === 'object') {
  state.saved = Array.isArray(candidate.saved) ? candidate.saved.filter(x=>typeof x==='string') : [];
  state.checks = Array.isArray(candidate.checks) ? candidate.checks.filter(x=>typeof x==='string') : [];
 }
} catch { storageAvailable = false; }
const validSaved = new Set([...document.querySelectorAll('[data-save]')].map(x=>x.dataset.save));
state.saved = [...new Set(state.saved.filter(id=>validSaved.has(id)))];
function toast(text) { $('toast').textContent=text; $('toast').hidden=false; clearTimeout(toast.timer); toast.timer=setTimeout(()=>$('toast').hidden=true,2600); }
function persist() {try {localStorage.setItem(KEY,JSON.stringify(state));}catch {storageAvailable=false;} if(!storageAvailable)$('storageNote').hidden=false;}
function updateSaved(){document.querySelectorAll('[data-save]').forEach(b=>{const saved=state.saved.includes(b.dataset.save);b.setAttribute('aria-pressed',String(saved));b.textContent=saved?'★':'☆';});$('savedTotal').textContent=state.saved.length;}
let phase='전체';
function filterNodes(){
 const q=$('nodeSearch').value.trim().toLocaleLowerCase();
 const device=$('deviceFilter').value;
 const savedOnly=$('savedOnly').getAttribute('aria-pressed')==='true';
 let shown=0;
 document.querySelectorAll('.node').forEach(card=>{
  const ok=(!q||card.dataset.search.toLocaleLowerCase().includes(q))&&(phase==='전체'||card.dataset.phase===phase)&&(device==='all'||(device==='mac'?card.dataset.support!=='RTX':card.dataset.support==='RTX'))&&(!savedOnly||state.saved.includes(card.id));
  card.hidden=!ok;if(ok)shown++;
 });
 $('nodeCount').textContent=`29개 중 ${shown}개 표시`;
 $('nodeEmpty').hidden=shown>0;
}
document.querySelectorAll('[data-phase-filter]').forEach(b=>b.addEventListener('click',()=>{phase=b.dataset.phaseFilter;document.querySelectorAll('[data-phase-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filterNodes();}));
$('savedOnly').addEventListener('click',()=>{$('savedOnly').setAttribute('aria-pressed',String($('savedOnly').getAttribute('aria-pressed')!=='true'));filterNodes();});
$('nodeSearch').addEventListener('input',filterNodes);$('deviceFilter').addEventListener('change',filterNodes);
document.querySelectorAll('[data-save]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.save;state.saved=state.saved.includes(id)?state.saved.filter(x=>x!==id):[...state.saved,id];persist();updateSaved();filterNodes();}));
$('resetFilters').addEventListener('click',()=>{$('nodeSearch').value='';$('deviceFilter').value='all';$('savedOnly').setAttribute('aria-pressed','false');phase='전체';document.querySelectorAll('[data-phase-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.phaseFilter===phase)));filterNodes();});
$('workflowSearch').addEventListener('input',()=>{const q=$('workflowSearch').value.trim().toLowerCase();let shown=0;document.querySelectorAll('.workflow').forEach(el=>{el.hidden=q&&!el.textContent.toLowerCase().includes(q);if(!el.hidden)shown++;});$('workflowCount').textContent=`14개 폴더 중 ${shown}개 표시`;$('workflowEmpty').hidden=shown>0;});
async function copy(text){try{await navigator.clipboard.writeText(text);toast('복사했어요.');}catch{toast('복사가 제한되어 있어요. 아래 내용을 직접 선택해 복사해 주세요.');}}
$('copyLink').addEventListener('click',()=>copy(new URL('./',location.href).href));
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy($(b.dataset.copy).textContent)));
function buildPrompt(){
 const subject=$('subject').value.trim()||'[영상 주제·제품]';
 const reference=$('reference').value.trim()||'[레퍼런스 또는 분석 폴더]';
 const os=$('platform').value, route=$('route').value, length=$('duration').value, ratio=$('ratio').value;
 $('generatedPrompt').textContent=`ComfyUI Desktop을 활용해 다음 콘텐츠를 제작해줘.\n\n주제: ${subject}\n레퍼런스: ${reference}\n제작 환경: ${os}\n희망 제작 방식: ${route}\n완성본: 약 ${length}초 / ${ratio}\n추가 유료 API 예산: 0원\n\n먼저 현재 설치, 하드웨어, 여유 메모리·디스크와 모델 파일을 확인해. Comfy Cloud·파트너 API·유료 웹 생성은 사용하지 마. 기존 설치와 작업 파일을 보존하고, 누락된 다운로드 목록과 용량을 먼저 정리해.\n\n1. REA-Video 분석이 있으면 VIDEO.md와 샷 프레임을 읽고, 없으면 레퍼런스의 샷·카메라·리듬을 분석해.\n2. 인물·제품·공간 사진의 고정 조건을 정해 참조 자산을 준비해.\n3. DENO 문서와 원본 워크플로 JSON의 현재 노드·모델 의존성을 대조해. 파일명만 보고 맥 호환이나 실행 성공을 단정하지 마. macOS라면 RTX 전용 노드와 CUDA 전용 경로를 제외하고 대체 경로를 검토해.\n4. 가장 짧고 낮은 해상도의 샷 하나로 먼저 검증해. 길이·프레임 수·해상도는 선택한 모델의 지원값 안에서 정하고, 결과와 소요 시간·최대 메모리를 기록해.\n5. 같은 seed·참조·프롬프트를 보존하고, 한 번에 한 설정만 바꾸며 A/B 비교해. 실패한 샷만 다시 생성해.\n6. 생성된 영상은 소재로 사용하고 컷 구성·모션·카메라 연출·색·음악·사운드를 편집해 완성해. 자막 여부와 문구는 내 지시를 따르고, 필요한 글자는 후반 합성해.\n7. 최종 MP4, 편집 원본, 실행 가능한 워크플로 JSON, 사용 모델·버전·설정·출처와 검수 기록을 함께 남겨. 실제 실행하지 않은 부분은 미검증이라고 표시해.\n\n가이드: https://byeonghoyoo.github.io/motion-reference-notebook/study/ai-video/04-comfyui-deno/`;
}
['subject','reference','platform','route','duration','ratio'].forEach(id=>$(id).addEventListener('input',buildPrompt));
const checks=[...document.querySelectorAll('[data-check]')];
function updateChecks(){const checked=checks.filter(x=>x.checked).length;$('progress').value=checked;$('progressText').textContent=`${checked} / ${checks.length} 완료`;}
checks.forEach(el=>{el.checked=state.checks.includes(el.dataset.check);el.addEventListener('change',()=>{state.checks=checks.filter(x=>x.checked).map(x=>x.dataset.check);persist();updateChecks();});});
updateSaved();filterNodes();buildPrompt();updateChecks();if(!storageAvailable)$('storageNote').hidden=false;
