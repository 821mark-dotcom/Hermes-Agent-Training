const NAV = [
  {href:'index.html',label:'Overview',time:'2m'},
  {href:'01-the-three-layers.html',num:'01',label:'The Three Layers',time:'8m'},
  {href:'02-getting-started.html',num:'02',label:'Getting Started',time:'10m'},
  {href:'03-hermes-agent-web-ui.html',num:'03',label:'Hermes Agent Web UI',time:'10m'},
  {href:'04-dashboard.html',num:'04',label:'Workspace Dashboard',time:'8m'},
  {href:'04-workspace-chat.html',num:'05',label:'Workspace Chat',time:'8m'},
  {href:'05-jobs.html',num:'06',label:'Jobs',time:'10m'},
  {href:'06-tasks.html',num:'07',label:'Tasks (Kanban)',time:'12m'},
  {href:'07-conductor.html',num:'08',label:'Conductor',time:'15m'},
  {href:'08-operations.html',num:'09',label:'Operations',time:'12m'},
  {href:'09-swarm.html',num:'10',label:'Swarm Mode',time:'15m'},
  {href:'10-memory-skills.html',num:'11',label:'Memory & Skills',time:'10m'},
  {href:'15-exercise-kanban.html',num:'12',label:'Exercise 1 · Task Sprint',time:'20m'},
  {href:'10a-agents-working.html',num:'13',label:'Agents Working',time:'8m'},
  {href:'11-files-terminal.html',num:'14',label:'Files & Terminal',time:'8m'},
  {href:'12-messaging-gateway.html',num:'15',label:'Messaging Gateway',time:'10m'},
  {href:'13-dashboard-mcp.html',num:'16',label:'MCP',time:'8m'},
  {href:'14-agent-chaining.html',num:'17',label:'Agent Chaining & Handoffs',time:'12m'},
  {href:'16-exercise-conductor.html',num:'18',label:'Exercise 2 · Mission to Board',time:'20m'},
  {href:'17-exercise-pipeline.html',num:'19',label:'Exercise 3 · Full Pipeline',time:'25m'},
  {href:'appendix-quick-ref.html',num:'A',label:'Quick Reference',time:'5m'},
];
function getNavCollapsed(){
  return localStorage.getItem('hermes-nav-collapsed') === '1';
}
function setNavCollapsed(collapsed){
  localStorage.setItem('hermes-nav-collapsed', collapsed ? '1' : '0');
}
function applyNavState(){
  const layout=document.querySelector('.layout');
  if(!layout)return;
  const collapsed=getNavCollapsed();
  layout.classList.toggle('nav-collapsed', collapsed);
  const btn=document.getElementById('nav-toggle');
  if(btn){ btn.textContent = collapsed ? '→' : '☰'; }
}
function renderNav(){
  const cur=window.location.pathname.split('/').pop()||'index.html';
  const el=document.getElementById('nav');
  if(!el)return;
  let h='<div class="toc-group">Hermes Training</div>';
  NAV.forEach(n=>{
    const active=(cur===n.href)?' active':'';
    const num=n.num?`<span class="num">${n.num}</span>`:'<span class="num" style="opacity:0">··</span>';
    h+=`<a class="toc-item${active}" href="${n.href}">${num}<span class="label">${n.label}</span><span class="time">${n.time}</span></a>`;
  });
  el.innerHTML=h;
}
function injectNavToggle(){
  const header=document.querySelector('.sidebar-header');
  if(!header)return;
  if(document.getElementById('nav-toggle')) return;
  const btn=document.createElement('button');
  btn.id='nav-toggle';
  btn.className='nav-toggle';
  btn.type='button';
  btn.setAttribute('aria-label','Toggle navigation');
  btn.textContent='☰';
  btn.addEventListener('click',(event)=>{
    event.preventDefault();
    event.stopPropagation();
    const nextState=!getNavCollapsed();
    setNavCollapsed(nextState);
    applyNavState();
  });
  header.appendChild(btn);
  applyNavState();
}
function tab(btn,paneId){
  const tabs=btn.closest('.tab-buttons');
  tabs.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('ab','ai','aa'));
  const lvl=btn.dataset.level;
  btn.classList.add(lvl==='b'?'ab':lvl==='i'?'ai':'aa');
  const wrap=btn.closest('.tabs');
  wrap.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
  document.getElementById(paneId).classList.add('active');
}
function cp(btn){
  const text=btn.closest('.demo').querySelector('[data-prompt]').dataset.prompt;
  navigator.clipboard.writeText(text).then(()=>{
    btn.textContent='✓ Copied';btn.classList.add('ok');
    setTimeout(()=>{btn.textContent='Copy';btn.classList.remove('ok');},2000);
  }).catch(()=>{btn.textContent='(see below)';});
}
function pt(btn){
  btn.classList.toggle('open');
  btn.nextElementSibling.classList.toggle('open');
}
document.addEventListener('DOMContentLoaded',()=>{
  renderNav();
  injectNavToggle();
  applyNavState();
});
