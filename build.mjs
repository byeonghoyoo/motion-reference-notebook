import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {pathToFileURL} from 'node:url';
let Marked;
try { ({Marked}=await import('marked')); }
catch (e) {
 if(!process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES) throw e;
 ({Marked}=await import(pathToFileURL(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'marked/lib/marked.esm.js')).href));
}
const manifest=JSON.parse(fs.readFileSync('source-manifest.json','utf8'));
for(const x of manifest)x.size=fs.statSync(x.local).size;
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const sourcePath=new Map(manifest.map(x=>[x.originalPath.normalize('NFC'),x]));
const byName=new Map(manifest.map(x=>[x.name.normalize('NFC'),x]));
const missing=[],docs=[],items=[];
const styleId='1dqUuNYxRt8cYTYX_TcMl9Eg3Lv-S9TPG',refId='102JNgmRbyoPreWLQnZx5xf-fRycGUQ60',camId='13YoXQkWSDlet-RUTLMy2gdHyChmFwGwB';
function resolve(href,doc){
 let p;try{p=decodeURIComponent(href).replaceAll('\\(','(').replaceAll('\\)',')').normalize('NFC')}catch{p=href;}
 const base=path.posix.dirname(doc.originalPath);
 return sourcePath.get(path.posix.normalize(base+'/'+p))||sourcePath.get(p)||byName.get(p)||byName.get(p+'.md')||byName.get(path.posix.basename(p));
}
const safeUrl=href=>/^(https?:|mailto:)/i.test(href)?href:null;
const headingId=s=>'h-'+encodeURIComponent(s.replace(/<[^>]+>/g,'').trim().toLowerCase().replace(/\s+/g,'-'));
function render(md,doc){
 let body=md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').replace(/<\/?aside[^>]*>/g,'');
 body=body.replace(/(!?)\[\[([^\]]+)\]\]/g,(_,bang,full)=>{const [target,label]=full.split('|');return (bang?'!':'')+'['+(label||target)+']('+target+')';});
 const engine=new Marked({gfm:true,breaks:false,renderer:{
 html({text}){return esc(text);},
 heading({tokens,depth,text}){return '<h'+depth+' id="'+headingId(text)+'">'+this.parser.parseInline(tokens)+'</h'+depth+'>';},
 image({href,text}){
  const f=resolve(href,doc),url=f?.local||safeUrl(href);
  if(!url){missing.push({docId:doc.id,docName:doc.name,href});return '<aside class="missing-asset">원문 첨부 미확인 · '+esc(text||'이미지')+'<small>원래 문서의 Notion 첨부 주소는 원문 보기에서 확인할 수 있습니다.</small></aside>';}
  return '<figure><button class="image-open" data-image="'+esc(url)+'" aria-label="'+esc(text||f?.name||'이미지')+' 확대"><img loading="lazy" src="'+esc(url)+'" alt="'+esc((text||'참고 이미지').split('|')[0])+'"></button><figcaption>'+esc((text||f?.name||'참고 이미지').split('|')[0])+'</figcaption></figure>';
 },
 link({href,tokens}){
  const txt=this.parser.parseInline(tokens);
  if(href.startsWith('#'))return '<a href="'+esc(href)+'" data-heading="'+esc(href.slice(1))+'">'+txt+'</a>';
  const f=resolve(href,doc);
  if(f&&f.mime==='text/markdown')return '<a href="#item='+f.id+'">'+txt+'</a>';
  const url=f?.local||safeUrl(href);return url?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+txt+' ↗</a>':'<span>'+txt+'</span>';
 },
 code({text,lang}){return '<div class="code-block"><div class="code-bar"><span>'+esc((lang||'PROMPT').split(/\s/)[0])+'</span><button class="copy-code" type="button">복사</button></div><pre><code>'+esc(text)+'</code></pre></div>';},
 table(token){let h='<div class="table-scroll"><table><thead><tr>';for(const c of token.header)h+='<th>'+this.parser.parseInline(c.tokens)+'</th>';h+='</tr></thead><tbody>';for(const row of token.rows){h+='<tr>';for(const c of row)h+='<td>'+this.parser.parseInline(c.tokens)+'</td>';h+='</tr>';}return h+'</tbody></table></div>';}
 }});
 return engine.parse(body);
}
const fence=String.fromCharCode(96).repeat(3);
const extractBlocks=s=>[...s.matchAll(new RegExp(fence+'[^\\n]*\\n([\\s\\S]*?)'+fence,'g'))].map(m=>m[1].trim());
const excerpt=s=>s.replace(/^---\n[\s\S]*?\n---/,'').replace(new RegExp(fence+'[\\s\\S]*?'+fence,'g'),'').replace(/!\[[^\]]*\]\([^)]*\)|!?\[\[[^\]]+\]\]/g,'').replace(/[#>*|_\u0060]/g,'').replace(/\[[^\]]+\]\([^)]*\)/g,'').replace(/\s+/g,' ').trim().slice(0,145);
function previewFor(s,doc){const match=s.match(/!\[\[([^\]|]+)/)||s.match(/!\[[^\]]*\]\(([^)]+)\)/);return match?resolve(match[1],doc)?.local:null;}
function category(doc){const n=doc.name,p=doc.originalPath;if(p.includes('/prompts/'))return 'prompts';if(/로고|하늘낙하|브랜드 홍보|릴스 아래/.test(n))return 'ads';if(/Vox|스타일 프롬프트/.test(n))return 'direction';if(/오픈소스/.test(n))return 'tools';if(doc.id===styleId)return 'styles';if(doc.id===refId)return 'motion';if(doc.id===camId)return 'camera';if(/cases|README/.test(n))return 'prompts';return 'workflow';}
const sectionConfig=new Map([[styleId,{kind:'styles',re:/^## (\d{2})\s+(.+)$/gm}],[refId,{kind:'motion',re:/^## (\d{2})\.\s+(.+)$/gm}],[camId,{kind:'camera',re:/^### (\d{2})\.\s+(.+)$/gm}]]);
for(const doc of manifest.filter(x=>x.mime==='text/markdown')){
 const raw=fs.readFileSync(doc.local,'utf8'),title=(raw.match(/^# (.+)$/m)?.[1]||doc.name.replace(/\.md$/,'')).replace(/_/g,' ');
 const full={...doc,title,category:category(doc),raw,html:render(raw,doc),excerpt:excerpt(raw),kind:'document',image:previewFor(raw,doc),promptCount:extractBlocks(raw).length};docs.push(full);
 items.push({id:doc.id,docId:doc.id,title,category:full.category,type:'guide',image:full.image,excerpt:full.excerpt,search:raw});
 const c=sectionConfig.get(doc.id);
 if(c){const matches=[...raw.matchAll(c.re)];matches.forEach((m,i)=>{const end=matches[i+1]?.index??raw.length;let section=raw.slice(m.index,end);
 if(i===matches.length-1){const next=section.slice(m[0].length).search(c.kind==='camera'?/^## /m:/^## (?!\d{2})/m);if(next>=0)section=section.slice(0,m[0].length+next);}
 const num=m[1],demo=c.kind==='motion'?manifest.find(x=>x.mime==='text/html'&&x.name.startsWith(num+'_')):null;
 items.push({id:doc.id+'-'+num,docId:doc.id,title:m[2],number:num,category:c.kind,type:'reference',image:previewFor(section,doc),excerpt:excerpt(section.replace(m[0],'')),search:section,html:render(section,doc),demo:demo?.local,prompts:extractBlocks(section)});
 });}
}
const images=manifest.filter(x=>x.mime.startsWith('image/')).map(x=>({id:x.id,name:x.name,src:x.local,category:x.originalPath.includes('30스타일')?'스타일 30':x.originalPath.includes('레퍼런스')?'모션 레퍼런스':x.originalPath.includes('카메라')?'카메라':'영상 참고',originalPath:x.originalPath}));
const inventory=manifest.map(({id,name,mime,local,size,originalPath})=>({id,name,mime,local,size,originalPath,sha256:crypto.createHash('sha256').update(fs.readFileSync(local)).digest('hex')}));
const uniqueMissing=[...new Map(missing.map(x=>[x.docId+x.href,x])).values()];
const data={version:'2026-10-10',docs,items,images,inventory,missing:uniqueMissing,stats:{documents:docs.length,images:images.length,demos:manifest.filter(x=>x.mime==='text/html').length,sourceFiles:inventory.length,styles:items.filter(x=>x.category==='styles'&&x.type==='reference').length,motion:items.filter(x=>x.category==='motion'&&x.type==='reference').length,camera:items.filter(x=>x.category==='camera'&&x.type==='reference').length}};
fs.writeFileSync('data.js','window.MOTION_DATA = '+JSON.stringify(data).replaceAll('<','\\u003c')+';\n');
fs.writeFileSync('inventory.json',JSON.stringify({date:data.version,stats:data.stats,files:inventory,unresolvedAttachments:uniqueMissing},null,2)+'\n');
fs.mkdirSync('dist',{recursive:true});
for(const folder of ['assets','documents','demos'])fs.cpSync(folder,'dist/'+folder,{recursive:true});
for(const file of ['index.html','styles.css','app.js','data.js','inventory.json'])fs.copyFileSync(file,'dist/'+file);
fs.writeFileSync('dist/.nojekyll','');
console.log(JSON.stringify({stats:data.stats,unresolved:uniqueMissing.length,dataBytes:fs.statSync('data.js').size}));

