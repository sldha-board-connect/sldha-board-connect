import {initializeApp} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import {getFirestore, doc, getDoc} from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';
const $=id=>document.getElementById(id);
const message=$('authMessage'), signInButton=$('signInButton'), signOutButton=$('signOutButton'), content=$('boardContent'), uidLine=$('memberUid');
const firebaseConfig=window.SLDHA_FIREBASE_CONFIG;
const configured=firebaseConfig && !Object.values(firebaseConfig).some(v=>typeof v==='string'&&v.startsWith('PASTE_'));
function showError(err){message.textContent=err?.message||String(err)}
function resetTiles(){for(const tile of document.querySelectorAll('[data-key]')){tile.removeAttribute('href');tile.removeAttribute('target');tile.removeAttribute('rel');tile.classList.remove('ready');tile.classList.add('disabled');tile.querySelector('em').textContent='Not configured';}}
function fillTiles(links){resetTiles();for(const tile of document.querySelectorAll('[data-key]')){const url=links[tile.dataset.key];if(typeof url==='string'&&/^https:\/\/[^\s]+$/i.test(url)){tile.href=url;tile.target='_blank';tile.rel='noopener noreferrer';tile.classList.add('ready');tile.classList.remove('disabled');tile.querySelector('em').textContent='Open authorized resource ↗';}}}
for(const tile of document.querySelectorAll('[data-key]'))tile.addEventListener('click',e=>{if(!tile.classList.contains('ready'))e.preventDefault()});
resetTiles();
if(!configured){message.textContent='Setup needed: edit firebase-config.js with your Firebase web app configuration.';signInButton.disabled=true;}else{
  try{
    const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
    const provider=new GoogleAuthProvider();
    signInButton.addEventListener('click',async()=>{message.textContent='Opening Google Sign-In…';try{await signInWithPopup(auth,provider)}catch(e){showError(e)}});
    signOutButton.addEventListener('click',()=>signOut(auth).catch(showError));
    onAuthStateChanged(auth,async user=>{content.hidden=true;resetTiles();uidLine.hidden=true;signInButton.hidden=!!user;signOutButton.hidden=!user;if(!user){message.textContent='Sign in using your approved Google account.';return;}message.textContent='Checking Board membership…';uidLine.textContent='Your Firebase UID (give only to the authorized project administrator): '+user.uid;uidLine.hidden=false;try{const member=await getDoc(doc(db,'boardMembers',user.uid));if(!member.exists()||member.data().active!==true){message.textContent='Your account is not yet approved. Ask the SLDHA project administrator to authorize this UID.';return;}const resources=await getDoc(doc(db,'boardSettings','resources'));fillTiles(resources.exists()?resources.data():{});content.hidden=false;message.textContent='Access approved. Welcome to the SLDHA Board workspace.';}catch(e){message.textContent='Access could not be verified. Check Firestore setup and security rules. '+e.message;}});
  }catch(e){showError(e)}
}
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
let installPrompt;const installButton=$('installButton');window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButton.hidden=false});installButton.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true});
