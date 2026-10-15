const config = window.SLDHA_CONFIG || {};
for (const tile of document.querySelectorAll('[data-key]')) {
  const value = config[tile.dataset.key];
  const valid = typeof value === 'string' && /^https:\/\//i.test(value);
  const status = tile.querySelector('em');
  if (valid) { tile.href = value; tile.target = '_blank'; tile.rel = 'noopener noreferrer'; tile.classList.add('ready'); status.textContent = 'Open secure Google resource ↗'; }
  else { tile.classList.add('disabled'); tile.setAttribute('aria-disabled','true'); tile.addEventListener('click',e=>e.preventDefault()); }
}
if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
let installPrompt;
const installButton=document.getElementById('installButton');
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButton.hidden=false});
installButton.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true});
