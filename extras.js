/* =====================================================================
   Tuki – תוספות (גרסה 2)
   משחקים, טוקי שלי, אתגר שבועי, דו־קרב, חידון כיתתי, מצלמה, סיפור אישי,
   מאמן הגייה, ביטויים, דקדוק בדקה, מצב כהה, רטט, תעודות, דוח שבועי,
   תזכורת יומית ומצב בלי אינטרנט.
   הקובץ רק מוסיף דברים – הוא לא מוחק או משנה תרגולים קיימים.
   ===================================================================== */
(function(){
'use strict';
const SITE='https://ctcvyf8fbp-maker.github.io/Tuki/';
const isApp=!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());
const plug=n=>window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins[n];

/* ---------------- עיצוב ---------------- */
const css=`
body.dark{--bg:#12161f;--card:#1b2130;--ink:#e8ecf3;--muted:#9aa3b2;--line:#2c3446;--pri:#2bb39b;--pri-2:#5fd3bd;--pri-soft:#173a35;--acc-soft:#3a2e1a;--good-soft:#16301f;--bad-soft:#3a1c1c}
body.dark #top{background:rgba(18,22,31,.92)}
body.dark .opt,body.dark .inp,body.dark .lvlpick button,body.dark .diff,body.dark .msg.ai,body.dark .tile,body.dark .shop button{background:var(--card);color:var(--ink)}
body.dark .explain{background:rgba(0,0,0,.25)}
body.dark .fb .xp{background:var(--card)}
body.dark .note,body.dark .corr{border-color:#5a4520}
body.dark .fb.good{border-color:#2a5a37}body.dark .fb.bad{border-color:#5a2a2a}
body.dark .spk:hover{background:#1f4d46}
body.dark .g-arena{background:linear-gradient(#173a35,#1b2130)}
body.dark .bal-area{background:linear-gradient(#1d3047,#1b2130)}
body.dark .light{background:#fff;color:#0e7c6b}
.g-hud{display:flex;gap:8px;justify-content:space-between;align-items:center;margin:8px 0;font-weight:700}
.g-arena{position:relative;height:300px;background:linear-gradient(#e1f2ee,#fffdf9);border-radius:var(--r);overflow:hidden;border:1px solid var(--line)}
.g-drop{position:absolute;left:50%;transform:translateX(-50%);background:var(--pri);color:#fff;font-weight:700;font-size:22px;padding:8px 16px;border-radius:14px;white-space:nowrap;box-shadow:var(--shadow)}
.g-drop.boom{animation:popb .3s forwards}
.kb{display:flex;flex-direction:column;gap:6px;direction:ltr;margin-top:12px}
.kb div{display:flex;gap:4px;justify-content:center}
.kb button{flex:1;max-width:42px;height:48px;border-radius:8px;background:var(--line);font-weight:700;font-size:16px;color:var(--ink);padding:0}
.kb button.wide{max-width:68px;font-size:13px}
.kb button.g,.wd .c.g{background:#16a34a;color:#fff;border-color:#16a34a}
.kb button.y,.wd .c.y{background:#d99a1e;color:#fff;border-color:#d99a1e}
.kb button.x,.wd .c.x{background:#6b7280;color:#fff;border-color:#6b7280}
.kb button[disabled]{opacity:.35}
.wd{display:grid;gap:6px;direction:ltr;max-width:290px;margin:0 auto}
.wd .r{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.wd .c{aspect-ratio:1;border:2px solid var(--line);border-radius:8px;display:grid;place-items:center;font-size:24px;font-weight:800;text-transform:uppercase;background:var(--card)}
.ws{display:grid;gap:3px;direction:ltr;user-select:none;-webkit-user-select:none;max-width:430px;margin:0 auto}
.ws button{aspect-ratio:1;border-radius:6px;background:var(--card);border:1px solid var(--line);font-weight:700;font-size:clamp(13px,4.2vw,19px);padding:0;text-transform:uppercase}
.ws button.sel{background:var(--acc);color:#3b2600}
.ws button.f{background:var(--pri-soft);color:var(--pri-2);border-color:var(--pri)}
.tiles{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;direction:ltr;min-height:52px;align-items:center}
.tile{min-width:44px;height:48px;padding:0 12px;border-radius:12px;background:#fff;border:2px solid var(--line);font-weight:700;font-size:19px}
.tile.used{opacity:.2;pointer-events:none}
.tiles.built{border:2px dashed var(--pri);border-radius:14px;padding:8px;background:var(--pri-soft)}
.shake{animation:shake .35s}@keyframes shake{25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.mem{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
@media(min-width:520px){.mem{grid-template-columns:repeat(4,1fr)}}
.c3{height:84px;border-radius:14px;background:var(--pri);color:transparent;font-weight:700;font-size:16px;padding:6px;transition:background .2s;border:2px solid var(--pri)}
.c3::before{content:'🦜';color:#fff;font-size:26px}
.c3.up,.c3.ok{background:var(--card);color:var(--ink)}
.c3.up::before,.c3.ok::before{content:none}
.c3.ok{background:var(--good-soft);color:var(--good);border-color:var(--good)}
.bal-area{position:relative;height:360px;overflow:hidden;border-radius:var(--r);background:linear-gradient(#cfe8ff,#fffdf9);border:1px solid var(--line)}
.bal{position:absolute;bottom:-120px;width:23%;max-width:110px;height:112px;border-radius:50% 50% 46% 46%;display:grid;place-items:center;color:#fff;font-weight:800;font-size:15px;animation:rise linear forwards;padding:8px;text-align:center;word-break:break-word;box-shadow:inset -8px -10px 0 rgba(0,0,0,.12)}
.bal::after{content:'';position:absolute;bottom:-24px;left:50%;width:1px;height:24px;background:#999}
@keyframes rise{to{bottom:105%}}
.bal.pop{animation:popb .25s forwards!important}
@keyframes popb{to{transform:scale(1.7);opacity:0}}
.pet{position:relative;width:170px;height:170px;margin:30px auto 10px}
.pet img{width:100%;height:100%;border-radius:36px;display:block}
.pet .egg{font-size:130px;line-height:170px;text-align:center}
.pet .acc{position:absolute;line-height:1;pointer-events:none}
.pet .a-hat{top:-44px;left:50%;transform:translateX(-50%);font-size:64px}
.pet .a-face{top:40%;left:50%;transform:translate(-50%,-50%);font-size:52px}
.pet .a-hand{bottom:-10px;right:-18px;font-size:54px}
.shop{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:10px}
.shop button{background:#fff;border:2px solid var(--line);border-radius:14px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:13px}
.shop button.on{border-color:var(--pri);background:var(--pri-soft)}
.shop .e{font-size:34px}
.hl{background:var(--acc-soft);border-radius:4px;padding:0 3px;font-weight:700;cursor:pointer}
.big-code{font-size:52px;font-weight:800;letter-spacing:8px;text-align:center;direction:ltr;color:var(--pri)}
.tbar{height:8px;background:var(--line);border-radius:9px;overflow:hidden;margin:6px 0}
.tbar i{display:block;height:100%;background:var(--acc);transition:width .1s linear}
.lb{display:flex;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}
.lb:last-child{border:0}
.lb .n{width:30px;text-align:center;font-weight:800}
.lb.me{background:var(--pri-soft);border-radius:10px;padding-inline:8px}
.swipe{touch-action:pan-y;user-select:none;-webkit-user-select:none;transition:transform .15s,background .15s}
.flash-g{background:var(--good-soft)!important}.flash-b{background:var(--bad-soft)!important}
.emo{font-size:96px;text-align:center;line-height:1.1}
.gcard{position:relative}
.gcard .best{position:absolute;top:10px;left:10px;font-size:12px}
.cert-img{width:100%;border-radius:12px;border:1px solid var(--line);display:block}
`;
const css2=`
body.easy{font-size:18px}body.easy .stack{gap:18px}body.easy p,body.easy .d,body.easy .opt,body.easy .txt{line-height:1.8;letter-spacing:.02em}
body.easy .en{letter-spacing:.06em;word-spacing:.12em}body.easy .big{font-size:40px}body.easy .opt{font-size:19px;padding:16px}
.sheet{background:#fff;color:#111;padding:24px;border-radius:12px;border:1px solid var(--line)}.sheet h2{margin:0 0 10px}.sheet h3{margin:18px 0 8px;font-size:17px}
.pline{padding:7px 0;font-size:16px}
@media print{#top,.noprint,.toast{display:none!important}body,#app{background:#fff!important;padding:0!important;margin:0!important}.sheet{border:0;padding:0}.pb{page-break-before:always;margin-top:0}}
`;
const st=document.createElement('style');st.textContent=css+css2;document.head.appendChild(st);

/* ---------------- כלים ---------------- */
const G={iv:[],to:[],raf:0,key:null};
let LESSON=null; /* כשמשחק נפתח מתוך שיעור: {id,k} */
function gstop(){G.iv.forEach(clearInterval);G.to.forEach(clearTimeout);G.iv=[];G.to=[];if(G.raf)cancelAnimationFrame(G.raf);G.raf=0;G.key=null;}
const every=(fn,ms)=>{const i=setInterval(fn,ms);G.iv.push(i);return i;};
const later=(fn,ms)=>{const t=setTimeout(fn,ms);G.to.push(t);return t;};
document.addEventListener('keydown',e=>{if(G.key&&!(e.target&&/INPUT|TEXTAREA/.test(e.target.tagName)))G.key(e);});
const _view=view;window.view=function(h,n){gstop();return _view(h,n);};
const only=w=>/^[a-z]+$/i.test(w.en);
const hashStr=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h;};
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function sshuffle(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const back=(to)=>`<button class="iconbtn" title="חזרה" onclick="${to||'home()'}">→</button>`;
const ghead=(t,extra)=>`<div class="ses-head"><button class="iconbtn" title="יציאה" onclick="open_('games')">✕</button><h2 style="margin:0;font-size:18px;flex:1">${t}</h2>${extra||''}</div>`;
function buzz(kind){
 if(S.settings.haptics===false)return;
 const H=plug('Haptics');
 try{if(H){kind==='good'?H.impact({style:'LIGHT'}):H.notification({type:'ERROR'});return;}}catch(e){}
 try{navigator.vibrate&&navigator.vibrate(kind==='good'?18:[40,60,40]);}catch(e){}}
window.tkBuzz=buzz;
function heOf(en){en=String(en).toLowerCase();const w=allWords().find(x=>x.en.toLowerCase()===en);if(w)return w.he;const e=EXTRA5_MAP().get(en);if(e)return e;const m=EMOJI.find(x=>x[0]===en);return m?m[1]:'';}
function inDeckSrs(en,ok){if(S.words[en])srs(en,ok);}

/* מאגר מילים למשחקים: קודם מילים שמחכות לחזרה וטעויות, אחר כך מילים ברמה שלך */
const schoolKid=()=>typeof SCHOOL!=='undefined'&&SCHOOL&&!(S.tmode)&&!!S.cls;
function wpool(n,f){
 f=f||(()=>true);
 if(LESSON){const t=(S.tests||[]).find(x=>x.id===LESSON.id);if(t){return shuffle(examWords(t).filter(w=>w&&w.en&&w.he&&f(w))).slice(0,n);}}
 if(schoolKid()){const tw=tWords().filter(w=>w&&w.en&&w.he&&f(w));const t=now();
  const due=shuffle(tw.filter(w=>S.words[w.en]&&S.words[w.en].due<=t)),bad=shuffle(tw.filter(w=>S.words[w.en]&&S.words[w.en].bad>0)),rest=shuffle(tw);
  const out=[],seen=new Set();[...due,...bad,...rest].forEach(w=>{if(!seen.has(w.en)&&out.length<n){seen.add(w.en);out.push(w);}});return shuffle(out);}
 const all=allWords().filter(w=>w&&w.en&&w.he&&f(w));
 const by=new Map(all.map(w=>[w.en,w]));const out=[],seen=new Set();const cap=Math.ceil(n/2);
 const add=(w,lim)=>{if(w&&!seen.has(w.en)&&out.length<(lim||n)){seen.add(w.en);out.push(w);}};
 const t=now();
 shuffle(Object.entries(S.words).filter(([k,r])=>r.due<=t)).forEach(([k])=>add(by.get(k),cap));
 shuffle(S.mistakes.filter(m=>m.kind==='vocab')).forEach(m=>add(by.get(m.ref),cap));
 const li=lvlIdx(S.level);
 shuffle(all.filter(w=>w.lvl===S.level)).forEach(w=>add(w));
 shuffle(all.filter(w=>lvlIdx(w.lvl)<li)).forEach(w=>add(w));
 shuffle(all).forEach(w=>add(w));
 return shuffle(out);}
function dis(w,k,field){
 if(schoolKid()){const c=shuffle(tWords().filter(x=>x.en!==w.en&&x[field]!==w[field]));const seen=new Set([w[field]]),out=[];c.forEach(x=>{if(out.length<k&&!seen.has(x[field])){seen.add(x[field]);out.push(x);}});
  if(out.length>=k)return out;const g=distractors(w,k-out.length,field).filter(x=>!seen.has(x[field]));return out.concat(g).slice(0,k);}
 const d=distractors(w,k,field);return d.length>=k?d:d.concat(shuffle(allWords().filter(x=>x.en!==w.en&&x[field]!==w[field])).slice(0,k-d.length));}

/* ---------------- שבוע, מטבעות, טוקי ---------------- */
function weekKey(){const d=new Date();const s=new Date(d.getFullYear(),d.getMonth(),d.getDate()-d.getDay());return s.getFullYear()+'-'+(s.getMonth()+1)+'-'+s.getDate();}
function wk(){const k=weekKey();if(!S.wk||S.wk.k!==k)S.wk={k,games:0,claimed:false};return S.wk;}
function weekXP(){let s=0;const n=new Date().getDay();for(let i=0;i<=n;i++)s+=S.history[dayKey(-i)]||0;return s;}
function weekDays(){let s=0;const n=new Date().getDay();for(let i=0;i<=n;i++)if(S.history[dayKey(-i)])s++;return s;}

const _addXP=addXP;
window.addXP=function(n){_addXP(n);if(n>0){S.coins=(S.coins||0)+Math.max(1,Math.round(n/4));save();const c=$('#coinchip');if(c)c.textContent='🪙 '+S.coins;}};
const _record=record;
window.record=function(skill,ok,lvl,info){const before=S.level;const x=_record(skill,ok,lvl,info);buzz(ok?'good':'bad');
 if(lvlIdx(S.level)>lvlIdx(before)){S.certNew=before;save();}return x;};
const _renderTop=renderTop;
window.renderTop=function(){_renderTop();if(typeof SCHOOL!=='undefined'&&SCHOOL)$$('#topin .chip').forEach(c=>{if(/🎓/.test(c.textContent)||(S.tmode&&!S.cls))c.remove();});const set=$('#topin .iconbtn');if(set&&!$('#coinchip'))set.insertAdjacentHTML('beforebegin',`<span class="chip" id="coinchip" title="המטבעות שלי" onclick="open_('pet')" style="cursor:pointer">🪙 ${S.coins||0}</span>`);};

/* ---------------- מצב כהה ---------------- */
const mq=window.matchMedia?matchMedia('(prefers-color-scheme: dark)'):null;
function applyTheme(){const t=S.settings.theme||'light';const dark=t==='dark'||(t==='auto'&&mq&&mq.matches);document.body.classList.toggle('dark',dark);
 const m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',dark?'#12161f':'#0e7c6b');}
if(mq&&mq.addEventListener)mq.addEventListener('change',applyTheme);

/* ===================================================================
   תוכן
   =================================================================== */
const EXTRA5=`apple|תפוח
beach|חוף ים
bread|לחם
chair|כיסא
cloud|ענן
dance|לרקוד
dream|חלום
earth|כדור הארץ
fruit|פרי
grape|ענב
green|ירוק
happy|שמח
heart|לב
horse|סוס
house|בית
juice|מיץ
knife|סכין
laugh|לצחוק
lemon|לימון
light|אור
money|כסף
mouse|עכבר
music|מוזיקה
night|לילה
ocean|אוקיינוס
paper|נייר
party|מסיבה
phone|טלפון
piano|פסנתר
pizza|פיצה
plant|צמח
queen|מלכה
river|נהר
salad|סלט
sheep|כבשה
shirt|חולצה
shoes|נעליים
sleep|לישון
smile|חיוך
snake|נחש
sport|ספורט
stone|אבן
sugar|סוכר
table|שולחן
teeth|שיניים
tiger|נמר
toast|טוסט
train|רכבת
truck|משאית
water|מים
watch|שעון יד; לצפות
whale|לווייתן
white|לבן
woman|אישה
world|עולם
write|לכתוב
young|צעיר
zebra|זברה
black|שחור
brown|חום
clock|שעון
dress|שמלה
drink|לשתות
field|שדה
floor|רצפה
glass|כוס; זכוכית
hotel|מלון
lunch|ארוחת צהריים
movie|סרט
north|צפון
south|דרום
plane|מטוס
quiet|שקט
ready|מוכן
round|עגול
scarf|צעיף
sweet|מתוק
think|לחשוב
three|שלוש
today|היום
tooth|שן
voice|קול
wheel|גלגל
angry|כועס
begin|להתחיל
bring|להביא
build|לבנות
catch|לתפוס
clean|נקי
close|לסגור; קרוב
count|לספור
early|מוקדם
enjoy|ליהנות
every|כל
first|ראשון
funny|מצחיק
great|נהדר
guess|לנחש
learn|ללמוד
leave|לעזוב
large|גדול
never|אף פעם
often|לעיתים קרובות
order|להזמין; סדר
paint|לצבוע
price|מחיר
quick|מהיר
right|ימין; נכון
small|קטן
speak|לדבר
start|להתחיל
story|סיפור
study|ללמוד
teach|ללמד
thank|להודות
under|מתחת
visit|לבקר
worry|לדאוג
wrong|לא נכון
color|צבע
happy|שמח
beard|זקן
bench|ספסל
cheap|זול
chess|שחמט
dirty|מלוכלך
empty|ריק
fresh|טרי
heavy|כבד
lucky|בר מזל
magic|קסם
mango|מנגו
night|לילה
olive|זית
onion|בצל
peace|שלום
proud|גאה
shark|כריש
space|חלל; מקום
storm|סערה
sunny|שמשי
thick|עבה
wrist|שורש כף היד`;
let _e5=null;
function EXTRA5_MAP(){if(!_e5){_e5=new Map();EXTRA5.split('\n').forEach(l=>{const [en,he]=l.split('|');if(en&&!_e5.has(en))_e5.set(en.trim(),he.trim());});}return _e5;}

const EMOJI=[['dog','כלב','🐶'],['cat','חתול','🐱'],['apple','תפוח','🍎'],['banana','בננה','🍌'],['house','בית','🏠'],['car','מכונית','🚗'],['book','ספר','📖'],['water','מים','💧'],['sun','שמש','☀️'],['moon','ירח','🌙'],['star','כוכב','⭐'],['tree','עץ','🌳'],['flower','פרח','🌸'],['fish','דג','🐟'],['bird','ציפור','🐦'],['horse','סוס','🐴'],['cow','פרה','🐮'],['pig','חזיר','🐷'],['lion','אריה','🦁'],['monkey','קוף','🐒'],['elephant','פיל','🐘'],['rabbit','ארנב','🐰'],['bear','דוב','🐻'],['snake','נחש','🐍'],['bread','לחם','🍞'],['cheese','גבינה','🧀'],['egg','ביצה','🥚'],['milk','חלב','🥛'],['coffee','קפה','☕'],['pizza','פיצה','🍕'],['cake','עוגה','🎂'],['ice cream','גלידה','🍦'],['phone','טלפון','📱'],['computer','מחשב','💻'],['clock','שעון','🕐'],['key','מפתח','🔑'],['bed','מיטה','🛏️'],['chair','כיסא','🪑'],['door','דלת','🚪'],['shoes','נעליים','👟'],['shirt','חולצה','👕'],['hat','כובע','🎩'],['glasses','משקפיים','👓'],['bag','תיק','👜'],['umbrella','מטרייה','☂️'],['ball','כדור','⚽'],['bicycle','אופניים','🚲'],['bus','אוטובוס','🚌'],['train','רכבת','🚆'],['plane','מטוס','✈️'],['ship','ספינה','🚢'],['rain','גשם','🌧️'],['snow','שלג','❄️'],['fire','אש','🔥'],['heart','לב','❤️'],['hand','יד','✋'],['eye','עין','👁️'],['ear','אוזן','👂'],['nose','אף','👃'],['mouth','פה','👄'],['baby','תינוק','👶'],['teacher','מורה','🧑‍🏫'],['doctor','רופא','🧑‍⚕️'],['money','כסף','💰'],['gift','מתנה','🎁'],['music','מוזיקה','🎵'],['guitar','גיטרה','🎸'],['camera','מצלמה','📷'],['mountain','הר','⛰️'],['sea','ים','🌊'],['island','אי','🏝️'],['school','בית ספר','🏫'],['hospital','בית חולים','🏥'],['pencil','עיפרון','✏️'],['letter','מכתב','✉️'],['lemon','לימון','🍋'],['grapes','ענבים','🍇'],['carrot','גזר','🥕'],['tomato','עגבנייה','🍅'],['chicken','תרנגולת; עוף','🐔'],['spider','עכביש','🕷️'],['butterfly','פרפר','🦋'],['window','חלון','🪟'],['candle','נר','🕯️'],['rocket','טיל; רקטה','🚀'],['crown','כתר','👑'],['tooth','שן','🦷'],['shark','כריש','🦈'],['whale','לווייתן','🐋'],['frog','צפרדע','🐸'],['turtle','צב','🐢'],['owl','ינשוף','🦉'],['bee','דבורה','🐝']];

const IDIOMS=[
['give up','לוותר','Don\'t give up, you can do it!','p'],['look for','לחפש','I\'m looking for my keys.','p'],['find out','לגלות, לברר','I found out the truth yesterday.','p'],['get up','לקום (מהמיטה)','I get up at seven every morning.','p'],
['turn on','להדליק','Can you turn on the light?','p'],['turn off','לכבות','Please turn off your phone.','p'],['put on','ללבוש, לשים על עצמך','Put on your coat, it\'s cold.','p'],['take off','להוריד בגד; להמריא','The plane takes off at noon.','p'],
['look after','לשמור על, לטפל ב-','She looks after her little brother.','p'],['run out of','שנגמר ל...','We ran out of milk.','p'],['get along with','להסתדר עם','I get along with my neighbors.','p'],['come up with','להמציא, להעלות רעיון','She came up with a great idea.','p'],
['figure out','להבין, לפתור','I can\'t figure out this problem.','p'],['pick up','להרים; לאסוף מישהו','I\'ll pick you up at eight.','p'],['call off','לבטל','They called off the game because of the rain.','p'],['set up','להקים, להגדיר','We set up a new company.','p'],
['go on','להמשיך','Please go on, I\'m listening.','p'],['break down','להתקלקל (מכונה)','My car broke down on the highway.','p'],
['a piece of cake','קלי קלות','The test was a piece of cake.','i'],['break the ice','לשבור את הקרח','He told a joke to break the ice.','i'],['hit the books','לשבת ללמוד ברצינות','I have an exam, I need to hit the books.','i'],['under the weather','לא מרגיש טוב','I\'m feeling a bit under the weather today.','i'],
['once in a blue moon','פעם ביובל','I eat fast food once in a blue moon.','i'],['cost an arm and a leg','עולה הון','That car cost an arm and a leg.','i'],['raining cats and dogs','יורד מבול','Take an umbrella, it\'s raining cats and dogs.','i'],['spill the beans','לגלות סוד','Come on, spill the beans!','i'],
['on cloud nine','ברקיע השביעי','She was on cloud nine after the wedding.','i'],['call it a day','לסיים להיום','We\'re tired, let\'s call it a day.','i'],['the ball is in your court','הכדור אצלך, תורך להחליט','I made my offer. The ball is in your court.','i'],['better late than never','מוטב מאוחר מאשר לעולם לא','You came! Better late than never.','i'],
['hang in there','תחזיק מעמד','Hang in there, it will get better.','i'],['time flies','הזמן טס','Time flies when you\'re having fun.','i'],['keep an eye on','לשים עין על','Can you keep an eye on my bag?','i'],['get cold feet','לקבל רגליים קרות','He got cold feet before the wedding.','i'],
['in the same boat','באותה סירה','We\'re all in the same boat.','i'],['by heart','בעל פה','I know this song by heart.','i']];

const GRAM=[
{id:'aan',t:'a או an?',b:'a לפני מילה שמתחילה בצליל של עיצור, an לפני צליל של תנועה (a, e, i, o, u). קובע הצליל ולא האות: an hour, a university.',ex:['I have a dog.','She is an engineer.','We waited an hour.'],q:[['I ate ___ apple.','an',['a','an','the','—']],['He is ___ university student.','a',['a','an','the','—']],['It takes ___ hour to get there.','an',['a','an','—','the']]]},
{id:'the',t:'מתי the?',b:'the = ה־הידיעה: למשהו מסוים או שכבר דיברנו עליו. על דברים כלליים לא שמים the: I love music (ולא the music).',ex:['The sun is hot today.','I love music.','Close the door, please.'],q:[['___ sun is very hot today.','The',['The','A','An','—']],['I love ___ music.','—',['the','a','—','an']],['Can you close ___ door, please?','the',['the','a','an','—']]]},
{id:'s3',t:'he / she / it + s',b:'בהווה פשוט, אחרי he / she / it מוסיפים s לפועל: she works, he goes, it rains. עם I / you / we / they – בלי s.',ex:['She works in a bank.','He plays football.','They live near the sea.'],q:[['She ___ in a bank.','works',['work','works','working','is work']],['My brother ___ football every day.','plays',['play','plays','playing','is play']],['They ___ near the sea.','live',['live','lives','living','is live']]]},
{id:'do',t:'שאלות עם do / does',b:'שאלה בהווה פשוט מתחילה ב-Do, ועם he / she / it ב-Does. אחרי does הפועל חוזר לבסיס, בלי s.',ex:['Do you like pizza?','Does she speak English?','Where does he work?'],q:[['___ you like pizza?','Do',['Do','Does','Are','Is']],['___ she speak English?','Does',['Do','Does','Is','Are']],['Does he ___ here?','work',['work','works','working','worked']]]},
{id:'past',t:'עבר פשוט',b:'בעבר מוסיפים ed (worked), אבל יש פעלים לא סדירים: go→went, eat→ate, see→saw. בשאלה ובשלילה: did + פועל בסיס.',ex:['Yesterday I went to the beach.','She watched a movie.','Did you eat breakfast?'],q:[['Yesterday I ___ to the beach.','went',['go','went','goed','gone']],['She ___ a movie last night.','watched',['watch','watched','watches','watching']],['Did you ___ breakfast?','eat',['eat','ate','eaten','eating']]]},
{id:'perf',t:'Present Perfect או עבר?',b:'have/has + V3 – כשאין זמן מוגדר, או כשמשהו נמשך עד עכשיו (for / since). עם זמן מוגדר בעבר (yesterday, last week, in 2020) – עבר פשוט.',ex:['I have lived here since 2019.','We saw that movie last week.','Have you ever been to London?'],q:[['I ___ in Tel Aviv since 2019.','have lived',['live','lived','have lived','am living']],['We ___ that movie last week.','saw',['have seen','saw','see','seen']],['___ you ever been to London?','Have',['Have','Did','Are','Do']]]},
{id:'fut',t:'will או going to?',b:'going to – תוכנית שכבר החלטנו עליה, או משהו שרואים שעומד לקרות. will – החלטה ברגע הדיבור, הבטחה או ניחוש.',ex:['Look at the clouds! It is going to rain.','The phone is ringing. I will answer it.','We are going to visit Grandma tomorrow.'],q:[['Look at those clouds! It ___ rain.','is going to',['will','is going to','goes to','rains']],['The phone is ringing. I ___ answer it!','will',['will','am going to','answer','am answer']],['We planned it: we ___ visit Grandma tomorrow.','are going to',['will','are going to','visit','are visit']]]},
{id:'prep',t:'in / on / at לזמנים',b:'at לשעה (at 5), on ליום ולתאריך (on Monday, on May 3rd), in לחודש, לשנה ולעונה (in July, in 2025, in summer).',ex:['The class starts at 9.','See you on Sunday!','My birthday is in May.'],q:[['The class starts ___ 9 o\'clock.','at',['in','on','at','to']],['My birthday is ___ May.','in',['in','on','at','to']],['See you ___ Sunday!','on',['in','on','at','to']]]},
{id:'much',t:'much או many?',b:'many – לדברים שאפשר לספור (many books). much – לדברים שלא סופרים (much water, much time). a lot of מתאים לשניהם.',ex:['How many apples do you want?','I don\'t have much time.','There are a lot of people here.'],q:[['How ___ apples do you want?','many',['much','many','lot','more']],['I don\'t have ___ time.','much',['many','much','lot','few']],['There are ___ people here.','a lot of',['much','a lot of','a lot','many of']]]},
{id:'comp',t:'השוואה: bigger / more',b:'מילה קצרה מקבלת er (bigger, taller). מילה ארוכה מקבלת more (more interesting). אף פעם לא more bigger! ו-than = מאשר.',ex:['My brother is taller than me.','This book is more interesting.','Good → better → best.'],q:[['My brother is ___ than me.','taller',['taller','more tall','tallest','more taller']],['This book is ___ than that one.','more interesting',['interestinger','more interesting','most interesting','interesting']],['good → ___','better',['gooder','better','best','more good']]]},
{id:'there',t:'There is / There are',b:'כך אומרים "יש" כשמדברים על מקום: There is לדבר אחד, There are לכמה. לא אומרים "It has" במקום!',ex:['There is a cat on the sofa.','There are two banks on this street.','Is there a bus to the airport?'],q:[['___ a cat on the sofa.','There is',['There is','There are','It has','Have']],['___ many people in the park.','There are',['There is','There are','It has','They have']],['___ a bus to the airport?','Is there',['Is there','Are there','Has it','Have']]]},
{id:'adj',t:'שם תואר לפני שם עצם',b:'באנגלית שם התואר בא לפני שם העצם: a red car (ולא a car red). וגם: שם תואר לא מקבל s ברבים – big houses.',ex:['I bought a new phone.','They live in big houses.','She has blue eyes.'],q:[['I bought ___.','a new phone',['a phone new','a new phone','new a phone','a news phone']],['They live in ___.','big houses',['bigs houses','big houses','houses bigs','houses big']],['She has ___.','blue eyes',['eyes blue','blues eyes','blue eyes','eye blues']]]}
];

const PRON=[
{id:'th',t:'th – הצליל שאין בעברית',tip:'שמים את קצה הלשון בין השיניים ונושפים. think, three (בלי קול), this, mother (עם קול). לא "סינק" ולא "דיס"!',items:['think','three','thank you','this','mother','birthday','I think this is the third one.','Thank you for the three books.']},
{id:'wv',t:'w או v',tip:'ב-w השפתיים עגולות כמו בנשיקה, בלי שיניים. ב-v השיניים העליונות נוגעות בשפה התחתונה. wine ≠ vine, west ≠ vest.',items:['wine','vine','west','vest','very well','We went to visit Victor.','What a wonderful view!']},
{id:'ii',t:'ship או sheep – תנועות קצרות וארוכות',tip:'i קצרה ורפויה (ship, sit, live), ee ארוכה ומתוחה (sheep, seat, leave). גם full ≠ fool.',items:['ship','sheep','live','leave','sit','seat','full','fool','Please leave the ship.']},
{id:'ed',t:'סיומת ed',tip:'ed נשמעת t אחרי צלילים כמו k, p, sh (worked, stopped), d אחרי צלילים קוליים (played), ו-id רק אחרי t או d (wanted, needed).',items:['worked','played','wanted','stopped','needed','I watched TV and played games.','She needed help yesterday.']},
{id:'stress',t:'הטעמה – איפה הדגש',tip:'באנגלית הדגש לא תמיד בסוף כמו בעברית: PHOtograph, phoTOgraphy, COMfortable, VEGetable, INteresting.',items:['photograph','photography','comfortable','vegetable','interesting','chocolate','This vegetable soup is very comfortable to eat.']},
{id:'silent',t:'אותיות שקטות',tip:'יש אותיות שלא הוגים: knife, write, listen, island, hour, Wednesday. לא קוראים כמו שכתוב!',items:['knife','write','listen','island','hour','Wednesday','I write to you every Wednesday.']},
{id:'r',t:'ה-r האמריקאית',tip:'ה-r באנגלית לא יוצאת מהגרון כמו ר בעברית. מקפלים את הלשון אחורה בלי לגעת: red, car, world.',items:['red','car','world','girl','very','The red car is right here.']}
];

const MORE_SCEN=[
{id:'restaurant',icon:'🍽️',he:'ארוחה במסעדה',en:'you are a waiter in a restaurant and the learner is a customer ordering dinner and asking for the bill'},
{id:'pharmacy',icon:'💊',he:'בבית מרקחת',en:'you are a pharmacist and the learner needs medicine for a headache and a cold'},
{id:'phone',icon:'📞',he:'שיחת טלפון',en:'you are a receptionist answering the phone at a dental clinic and the learner wants to book an appointment'},
{id:'school',icon:'🏫',he:'יום ראשון בבית ספר',en:'you are a friendly new classmate meeting the learner on the first day at an international school'},
{id:'bank',icon:'🏦',he:'בבנק',en:'you are a bank clerk and the learner wants to open a bank account'},
{id:'rent',icon:'🔑',he:'שכירת דירה',en:'you are a landlord showing an apartment and the learner is asking questions before renting'}];

/* ===================================================================
   ניווט – מודולים חדשים במסך הבית
   =================================================================== */
const NEWMODS={
 afterDaily:[
  {id:'games',icon:'🎮',t:'משחקים',d:()=>'Wordle, איש תלוי, דו־קרב ועוד'},
  {id:'challenge',icon:'🏆',t:'אתגר שבועי',d:()=>{const c=curChallenge();return `${c.t} · ${Math.min(100,Math.round(c.v()/c.goal*100))}%`;}},
  {id:'pet',icon:'🦜',t:'טוקי שלי',d:()=>`${S.coins||0} 🪙 · ${petStage().name}`}],
 afterShadow:[
  {id:'pron',icon:'👄',t:'מאמן הגייה',d:()=>'th, w/v ועוד – מה שקשה לנו'},
  {id:'voicechat',icon:'🎙️',t:'שיחה קולית',d:()=>'מדברים עם טוקי בלי להקליד'}],
 afterTopic:[
  {id:'camera',icon:'📸',t:'מצלמה ← מילה',d:()=>'מצלמים חפץ ולומדים איך אומרים'},
  {id:'aistory',icon:'🪄',t:'סיפור אישי',d:()=>'סיפור AI עם המילים שלך'},
  {id:'idioms',icon:'🗯️',t:'ביטויים וניבים',d:()=>'idioms ו-phrasal verbs'},
  {id:'gram',icon:'📐',t:'דקדוק בדקה',d:()=>{const n=Object.keys(S.gdone||{}).length;return `${n}/${GRAM.length} שיעורים קצרים`;}}]};
function insertAfter(id,arr){const i=MODULES.findIndex(m=>m.id===id);arr.forEach((m,k)=>{if(!MODULES.find(x=>x.id===m.id))MODULES.splice(i<0?MODULES.length:i+1+k,0,m);});}
insertAfter('daily',NEWMODS.afterDaily);insertAfter('shadow',NEWMODS.afterShadow);insertAfter('topic',NEWMODS.afterTopic);
MORE_SCEN.forEach(s=>{if(!SCENARIOS.find(x=>x.id===s.id))SCENARIOS.push(s);});

/* ---------------- מצב מורה (מוסתר מתלמידים) ---------------- */
if(S.tmode===undefined&&S.teach&&S.teach.length){S.tmode=true;}
const tmode=()=>!!S.tmode;
const _api=api;
window.api=async function(path,body){
 if(path==='/class/create'||path==='/room/create')body=Object.assign({},body,{tcode:S.tcode||''});
 if(path==='/class/progress'&&S.cls){body=Object.assign({},body,{lv:S.cls.lv||0});const st=typeof stateBlob==='function'?stateBlob():null;if(st)body.state=st;}
 const r=await _api(path,body);
 if(path==='/class/progress'&&r&&r.pin&&S.cls&&S.cls.pin!==r.pin){S.cls.pin=r.pin;save();}
 if(path==='/class/progress'&&r&&Array.isArray(r.lists))applyLists(r.lists,r.lv);
 if(path==='/class/view')G.lastView=r;
 return r;};
function teacherGate(){view(`<div class="card stack"><h2>👩‍🏫 אזור מורים</h2><p style="margin:0">האזור הזה מיועד למורים בלבד. אם את/ה מורה, היכנסו ל-⚙️ הגדרות ← "אני מורה" והקלידו את קוד המורה.</p><div class="row"><button class="btn primary" onclick="open_('settings')">⚙️ להגדרות</button><button class="btn ghost" onclick="home()">חזרה לבית</button></div></div>`,'gate');}

const ROUTES={games:gamesHub,pet:petView,challenge:challengeView,camera:cameraView,aistory:aiStoryView,idioms:idiomsView,gram:gramView,pron:pronView,
 voicechat:voiceChat,report:reportView,duel:roomHome,
 'g-rain':gRain,'g-tf':gTF,'g-bal':gBalloons,'g-wordle':()=>gWordle(false),'g-wordle2':()=>gWordle(true),'g-hang':gHang,'g-search':gSearch,'g-scr':gScramble,'g-sent':gSentence,'g-mem':gMemory,'g-miss':gMissing,'g-say':gSay,'g-chain':gChain,'g-duel':roomHome,'g-quiz':quizHost};
const _open=open_;
window.open_=function(id){if((id==='teacher'||id==='g-quiz')&&!tmode())return teacherGate();if(ROUTES[id])return ROUTES[id]();return _open(id);};

/* דף הבית: הודעות על תעודה ואתגר */
const _home=home;
window.home=function(){_home();if(currentView!=='home')return;if(!tmode())$$('#app .mod').forEach(b=>{if(/open_\('teacher'\)/.test(b.getAttribute('onclick')||''))b.remove();});
 const hero=$('#app .hero');if(!hero)return;let h='';
 if(S.certNew)h+=`<button class="note" style="text-align:start;width:100%" onclick="tkCert('${S.certNew}')">🎓 <b>כל הכבוד! סיימת את רמה ${S.certNew}.</b> לחצו לקבלת תעודה ←</button>`;
 if(S.path&&S.path.n>PATH_LEN&&!(S.certs&&S.certs.path))h+=`<button class="note" style="text-align:start;width:100%" onclick="tkCert('path')">🏆 <b>סיימת את כל המסלול!</b> לחצו לקבלת תעודה ←</button>`;
 (S.tests||[]).filter(t=>t.tid&&t.words.length).forEach(t=>{const d=daysLeft(t.date);if(d!==null&&d>=0&&d<=14)return;if(d!==null&&d<0)return;
  h+=`<button class="note" style="text-align:start;width:100%" onclick="examView('${t.id}')"><b>${esc(t.name)}</b> · מוכנות ${examReady(t)}% ← לתרגול</button>`;});
 const c=curChallenge();if(c.v()>=c.goal&&!wk().claimed)h+=`<button class="note" style="text-align:start;width:100%" onclick="open_('challenge')">🏆 <b>השלמת את האתגר השבועי!</b> לחצו לאסוף 150 🪙</button>`;
 if(h)hero.insertAdjacentHTML('afterend',h);};

/* הגדרות: כרטיס תוספות */
const _settings=settingsView;
window.settingsView=function(){_settings();const first=$('#app .card');if(!first)return;const R=S.settings.remind||{on:false,time:'19:00'};
 first.insertAdjacentHTML('beforebegin',`<div class="card"><h3 style="margin-bottom:4px">✨ תצוגה ונוחות</h3>
 <label class="set">🌙 מצב תצוגה<select class="inp" id="xtheme">${[['light','בהיר'],['dark','כהה'],['auto','לפי הטלפון']].map(([v,l])=>`<option value="${v}" ${(S.settings.theme||'light')===v?'selected':''}>${l}</option>`).join('')}</select></label>
 <label class="set">📳 רטט בתשובה נכונה / שגויה<input type="checkbox" id="xhap" ${S.settings.haptics!==false?'checked':''}></label>
 <label class="set">⏰ תזכורת יומית<span class="row"><input type="time" class="inp" id="xtime" value="${esc(R.time||'19:00')}" style="width:auto;font-size:15px;padding:6px 10px"><input type="checkbox" id="xrem" ${R.on?'checked':''}></span></label>
 <div class="small muted" id="xremnote">${isApp?'':'התזכורת היומית פועלת באפליקציה המותקנת בטלפון.'}</div>
 <div class="row" style="padding-top:12px"><button class="btn ghost" onclick="open_('report')">📤 דוח שבועי להורה / למורה</button></div></div>`);
 const last=$$('#app .card');const tcard=`<div class="card stack" id="tcard"><h3>👩‍🏫 אני מורה</h3>${tmode()?`<p style="margin:0">✅ מצב מורה פעיל. לוח המורה מופיע בדף הבית.</p><div class="row"><button class="btn primary" onclick="open_('teacher')">👩‍🏫 ללוח המורה</button><button class="btn ghost" id="toff">כיבוי מצב מורה</button></div>`:
  `<p class="small" style="margin:0">מורים מקבלים קוד מורה. אחרי שמקלידים אותו, מופיעים לוח המורה והחידון הכיתתי.</p><div class="row"><input class="inp en" id="tcode" placeholder="קוד מורה" style="flex:1;min-width:140px;text-transform:uppercase" autocomplete="off"><button class="btn primary" id="ton">כניסה</button></div><span class="small" id="tres"></span>`}</div>`;
 (last[last.length-1]||first).insertAdjacentHTML('afterend',tcard);
 const ton=$('#ton');if(ton)ton.onclick=async()=>{const c=$('#tcode').value.trim().toUpperCase();if(!c)return;ton.disabled=true;ton.innerHTML='<span class="loader"></span>';
  try{await _api('/teacher/check',{tcode:c});S.tcode=c;S.tmode=true;save();toast('✅ מצב מורה הופעל');settingsView();}
  catch(e){$('#tres').innerHTML='<span style="color:var(--bad)">❌ '+(e&&e.code==='bad_tcode'?'הקוד לא נכון':e&&e.code==='bad_prompt'?'צריך לעדכן את השרת (worker.js)':'אין חיבור לשרת')+'</span>';ton.disabled=false;ton.textContent='כניסה';}};
 const toff=$('#toff');if(toff)toff.onclick=()=>{S.tmode=false;save();toast('מצב מורה כובה');settingsView();};
 $('#xtheme').onchange=e=>{S.settings.theme=e.target.value;save();applyTheme();};
 $('#xhap').onchange=e=>{S.settings.haptics=e.target.checked;save();if(e.target.checked)buzz('good');};
 const upd=async()=>{S.settings.remind={on:$('#xrem').checked,time:$('#xtime').value||'19:00'};save();
  if(!isApp){if(S.settings.remind.on)toast('התזכורת תפעל באפליקציה המותקנת 🦜');return;}
  const ok=await scheduleReminder();if(ok)toast(S.settings.remind.on?'⏰ התזכורת נקבעה ל-'+S.settings.remind.time:'התזכורת בוטלה');};
 $('#xrem').onchange=upd;$('#xtime').onchange=()=>{if($('#xrem').checked)upd();else{S.settings.remind={on:false,time:$('#xtime').value};save();}};};

/* התקדמות: כפתור דוח */
const _prog=progressView;
window.progressView=function(){_prog();const a=$('#app .stack');if(a)a.insertAdjacentHTML('beforeend',`<div class="row"><button class="btn primary" onclick="open_('report')">📤 שליחת דוח שבועי</button><button class="btn ghost" onclick="open_('pet')">🎓 התעודות שלי</button></div>`);};

/* לוח מורה: חידון כיתתי */
const _teacher=teacherHome;
window.teacherHome=function(){_teacher();const a=$('#app .stack');if(a)a.insertAdjacentHTML('beforeend',`<div class="card stack"><h3>🎯 חידון כיתתי חי</h3><p class="small" style="margin:0">מקרינים קוד על הלוח, התלמידים עונים מהטלפון, וכולם רואים מי מוביל.</p><button class="btn accent" onclick="open_('g-quiz')">פתיחת חידון חדש</button></div>`);};

/* ---------------- תזכורת יומית (באפליקציה) ---------------- */
const REMIND=['טוקי מחכה לך! 🦜 5 דקות של אנגלית היום?','🔥 אל תשבור את הרצף! שיעור קצר?','🎮 משחק Wordle חדש מחכה לך','💬 טוקי רוצה לדבר איתך באנגלית'];
async function scheduleReminder(){
 const LN=plug('LocalNotifications');if(!LN){toast('צריך להוסיף לאפליקציה את תוסף ההתראות');return false;}
 const R=S.settings.remind||{};
 try{await LN.cancel({notifications:[{id:7001}]});}catch(e){}
 if(!R.on)return true;
 try{const p=await LN.requestPermissions();if(p.display!=='granted'){toast('צריך לאשר התראות בהגדרות הטלפון');return false;}
  const [h,m]=(R.time||'19:00').split(':').map(Number);
  await LN.schedule({notifications:[{id:7001,title:'Tuki 🦜',body:pick(REMIND),schedule:{on:{hour:h,minute:m},allowWhileIdle:true}}]});return true;}
 catch(e){toast('לא הצלחתי לקבוע תזכורת');return false;}}

/* ===================================================================
   🎮 מרכז המשחקים
   =================================================================== */
const GAMES=[
 ['g-wordle','🟩','Wordle יומי','מנחשים מילה של 5 אותיות'],['g-hang','🪶','איש תלוי','לפני שטוקי מאבד נוצות'],['g-rain','🌧️','מטר מילים','תופסים מילים לפני שהן נופלות'],
 ['g-tf','✅','נכון או לא?','60 שניות, כמה שיותר מהר'],['g-bal','🎈','מפוצץ בלונים','שומעים מילה ומפוצצים'],['g-mem','🃏','זוגות','זיכרון: מילה ותרגום'],
 ['g-scr','🔀','מילים מבולגנות','מסדרים את האותיות'],['g-sent','🧱','בונים משפט','מסדרים מילים למשפט'],['g-search','🔎','תפזורת','מוצאים מילים בטבלה'],
 ['g-miss','👀','מה חסר?','זוכרים איזו מילה נעלמה'],['g-say','🗣️','אמור את זה!','רואים תמונה ואומרים בקול'],['g-chain','🔗','שרשרת מילים','מילה שמתחילה באות האחרונה'],
 ['g-duel','⚔️','דו־קרב','מתחרים בחבר עם קוד'],['g-quiz','🎯','חידון כיתתי','כמו Kahoot – למורה ולכיתה']];
function gamesHub(){
 const b=S.gbest||{};
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">🎮 משחקים</h2></div>
 <p class="muted" style="margin-top:-6px">${schoolKid()?'כל המשחקים משתמשים רק במילים שהמורה שלחה 📚':'כל משחק נותן XP ומטבעות 🪙, ומשתמש במילים שאת/ה צריכים לחזור עליהן.'}</p>
 <div class="grid">${GAMES.filter(g=>(g[0]!=='g-quiz'||tmode())&&!(schoolKid()&&(g[0]==='g-chain'||g[0]==='g-quiz'))).map(([id,ic,t,d])=>`<button class="mod gcard" onclick="open_('${id}')"><span class="ic">${ic}</span><span class="t">${t}</span><span class="d">${d}</span>${b[id]?`<span class="best pill">🏅 ${b[id]}</span>`:''}</button>`).join('')}</div></div>`,'games');}
function gameEnd(id,title,score,line,xp){
 xp=Math.max(5,Math.round(xp));addXP(xp);wk().games++;S.gbest=S.gbest||{};const nb=score>(S.gbest[id]||0);if(nb)S.gbest[id]=score;save();buzz('good');
 if(LESSON){const L=LESSON;LESSON=null;const t=(S.tests||[]).find(x=>x.id===L.id);if(t)stageDone(t,L.k);
  return view(`<div class="card stack" style="text-align:center"><div style="font-size:54px">🎉</div><h1>${title}</h1><p style="font-size:18px;margin:0">${line}</p><p style="margin:0"><b>+${xp} XP</b> · השלב הושלם ✅</p>
  <button class="btn primary" onclick="tkLesson('${L.id}')" style="font-size:19px">← חזרה לשיעור</button></div>`,'gameend');}
 view(`<div class="card stack" style="text-align:center"><div style="font-size:54px">${xp>=30?'🏆':'🎉'}</div><h1>${title}</h1>
 <p style="font-size:18px;margin:0">${line}</p><p style="margin:0"><b>+${xp} XP</b> · +${Math.max(1,Math.round(xp/4))} 🪙${nb&&score?' · 🏅 שיא חדש!':''}</p>
 <div class="row" style="justify-content:center"><button class="btn primary" onclick="open_('${id}')">🔁 שוב</button><button class="btn ghost" onclick="open_('games')">🎮 משחקים</button><button class="btn ghost" onclick="home()">🏠 בית</button></div></div>`,'gameend');}

function needMore(title,min){view(`${ghead(title)}<div class="card stack" style="text-align:center"><div style="font-size:54px">🦜</div><b>צריך עוד מילים למשחק הזה</b><p class="small muted" style="margin:0">המשחק צריך לפחות ${min} מילים מתאימות מהמורה. כשיגיעו עוד רשימות – הוא ייפתח.</p><button class="btn primary" onclick="open_('games')">🎮 משחקים אחרים</button></div>`,'game');}
/* מקלדת אנגלית */
function kbHTML(enter){const rows=['qwertyuiop','asdfghjkl','zxcvbnm'];
 return `<div class="kb">${rows.map((r,i)=>`<div>${i===2&&enter?'<button class="wide" data-k="enter">Enter</button>':''}${[...r].map(c=>`<button data-k="${c}">${c.toUpperCase()}</button>`).join('')}${i===2&&enter?'<button class="wide" data-k="del">⌫</button>':''}</div>`).join('')}</div>`;}
function kbBind(el,fn){$$('.kb button',el).forEach(b=>b.onclick=()=>fn(b.dataset.k,b));
 G.key=e=>{if(e.metaKey||e.ctrlKey)return;const k=e.key;if(/^[a-z]$/i.test(k))fn(k.toLowerCase());else if(k==='Enter')fn('enter');else if(k==='Backspace')fn('del');};}

/* ---------------- 1. מטר מילים ---------------- */
function gRain(){
 const ws=wpool(24);if(ws.length<2)return needMore('🌧️ מטר מילים',2);let i=0,lives=3,score=0,caught=0,speed=38,y=0,last=0,locked=true,cur=null,opts=[];
 view(`${ghead('🌧️ מטר מילים')}<div class="g-hud"><span id="lv"></span><span id="sc"></span></div><div class="g-arena" id="ar"></div><div class="opts two" id="op"></div>`,'game');
 const ar=$('#ar'),op=$('#op');
 const hud=()=>{$('#lv').textContent='❤️'.repeat(lives)+'🤍'.repeat(3-lives);$('#sc').textContent=score+' נק׳';};
 const round=()=>{if(lives<=0||i>=ws.length)return gameEnd('g-rain','🌧️ מטר מילים',score,`תפסת ${caught} מילים · ${score} נקודות`,score/4);
  cur=ws[i++];y=-50;locked=false;ar.innerHTML=`<div class="g-drop en" id="dr">${esc(cur.en)}</div>`;
  opts=shuffle([cur,...dis(cur,3,'he')]);op.innerHTML=opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o.he)}</button>`).join('');
  $$('.opt',op).forEach((b,k)=>b.onclick=()=>choose(k,b));last=performance.now();G.raf=requestAnimationFrame(tick);};
 const tick=t=>{const dt=Math.min(.1,(t-last)/1000);last=t;y+=speed*dt;const d=$('#dr');if(d)d.style.top=y+'px';
  if(y>ar.clientHeight-46)return fail();G.raf=requestAnimationFrame(tick);};
 const reveal=()=>$$('.opt',op).forEach((b,k)=>{b.disabled=true;if(opts[k].en===cur.en)b.classList.add('right');});
 const choose=(k,b)=>{if(locked)return;if(opts[k].en===cur.en){locked=true;cancelAnimationFrame(G.raf);caught++;score+=10+Math.max(0,Math.round((ar.clientHeight-y)/25));speed*=1.08;
   b.classList.add('right');buzz('good');inDeckSrs(cur.en,true);const d=$('#dr');if(d)d.classList.add('boom');hud();later(round,380);}
  else{b.classList.add('wrong');fail();}};
 const fail=()=>{if(locked)return;locked=true;cancelAnimationFrame(G.raf);lives--;buzz('bad');inDeckSrs(cur.en,false);reveal();hud();speak(cur.en);later(round,1300);};
 hud();round();}

/* ---------------- 2. נכון או לא ---------------- */
function gTF(){
 const ws=wpool(90);if(ws.length<2)return needMore('✅ נכון או לא?',2);let i=0,score=0,combo=0,left=60,cur,truth,shown,started=false;
 view(`${ghead('✅ נכון או לא?')}<div class="g-hud"><span id="tm">⏱️ 60</span><span id="sc">0</span></div>
 <div class="card swipe" id="sw" style="text-align:center;padding:34px 12px"><div class="big en" id="w1"></div><div style="font-size:22px;margin:6px 0">=</div><div class="he-big" id="w2"></div></div>
 <div class="row" style="justify-content:center;margin-top:14px"><button class="btn primary" id="yes" style="min-width:130px;font-size:20px">✓ נכון</button><button class="btn accent" id="no" style="min-width:130px;font-size:20px">✗ לא נכון</button></div>
 <p class="small muted" style="text-align:center">אפשר גם להחליק: ימינה = נכון, שמאלה = לא נכון</p>`,'game');
 const next=()=>{cur=ws[i++%ws.length];truth=Math.random()<.5;shown=truth?cur.he:dis(cur,1,'he')[0].he;$('#w1').textContent=cur.en;$('#w2').textContent=shown;};
 const ans=v=>{if(left<=0)return;if(!started){started=true;every(tickT,1000);}const ok=v===truth;const sw=$('#sw');
  if(ok){combo++;score+=1+Math.floor(combo/5);buzz('good');sw.classList.add('flash-g');}else{combo=0;buzz('bad');sw.classList.add('flash-b');}
  later(()=>sw.classList.remove('flash-g','flash-b'),180);$('#sc').textContent=score+(combo>=5?` · 🔥x${1+Math.floor(combo/5)}`:'');next();};
 const tickT=()=>{left--;$('#tm').textContent='⏱️ '+left;if(left<=0)gameEnd('g-tf','✅ נכון או לא?',score,`${score} נקודות ב-60 שניות`,score*1.5);};
 $('#yes').onclick=()=>ans(true);$('#no').onclick=()=>ans(false);
 const sw=$('#sw');let x0=null;sw.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;},{passive:true});
 sw.addEventListener('touchmove',e=>{if(x0!==null)sw.style.transform=`translateX(${e.touches[0].clientX-x0}px)`;},{passive:true});
 sw.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;sw.style.transform='';x0=null;if(Math.abs(dx)>60)ans(dx>0);});
 G.key=e=>{if(e.key==='ArrowRight')ans(true);else if(e.key==='ArrowLeft')ans(false);};
 next();}

/* ---------------- 3. בלונים ---------------- */
function gBalloons(){
 const ws=wpool(30,w=>w.en.length<=12);if(ws.length<2)return needMore('🎈 מפוצץ בלונים',2);const N=Math.min(10,ws.length);let r=0,score=0,hits=0;
 const COLORS=['#e8554e','#2f8fd8','#f2a93b','#16a34a','#9b59b6','#e67e22'];
 view(`${ghead('🎈 מפוצץ בלונים')}<div class="card stack" style="text-align:center"><div style="font-size:60px">🎈</div><p style="margin:0">טוקי אומר מילה באנגלית – מפוצצים את הבלון הנכון לפני שהוא עף!</p><button class="btn primary" id="go">התחל</button></div>`,'game');
 $('#go').onclick=()=>{unlockAudio();round();};
 const round=()=>{if(r>=N)return gameEnd('g-bal','🎈 מפוצץ בלונים',score,`פוצצת נכון ${hits} מתוך ${N}`,score/3);
  const t=ws[r++];const opts=shuffle([t,...dis(t,3,'en')]);let tries=0,done=false;
  view(`${ghead('🎈 מפוצץ בלונים',`<span class="pill">${r}/${N} · ${score}</span>`)}<div class="row" style="justify-content:center;margin-bottom:8px"><button class="spk" id="again" style="width:60px;height:60px;font-size:26px">🔊</button><span class="muted">איזו מילה שמעת?</span></div><div class="bal-area" id="ba"></div>`,'game');
  const ba=$('#ba');opts.forEach((o,k)=>{const b=document.createElement('button');b.className='bal en';b.textContent=o.en;b.style.left=(2+k*24.5)+'%';b.style.background=COLORS[(r+k)%COLORS.length];
   b.style.animationDuration=(8+Math.random()*2.5)+'s';b.style.animationDelay=(k*0.25)+'s';
   b.onclick=()=>{if(done)return;if(o.en===t.en){done=true;b.classList.add('pop');score+=tries?5:10;hits++;buzz('good');inDeckSrs(t.en,true);toast('✓ '+t.en+' = '+t.he);later(round,800);}
    else{tries++;b.classList.add('pop');buzz('bad');}};
   if(o.en===t.en)b.addEventListener('animationend',e=>{if(e.animationName==='rise'&&!done){done=true;inDeckSrs(t.en,false);toast('המילה הייתה: '+t.en+' = '+t.he);later(round,1400);}});
   ba.appendChild(b);});
  $('#again').onclick=()=>speak(t.en,true);later(()=>speak(t.en),300);};}

/* ---------------- 4. Wordle ---------------- */
function score5(g,a){const L=a.length,res=Array(L).fill('x'),cnt={};for(let i=0;i<L;i++){if(g[i]===a[i])res[i]='g';else cnt[a[i]]=(cnt[a[i]]||0)+1;}
 for(let i=0;i<L;i++){if(res[i]!=='g'&&cnt[g[i]]){res[i]='y';cnt[g[i]]--;}}return res;}
function gWordle(practice){
 let daily=[...EXTRA5_MAP().keys()].sort();let ans,guesses=[];
 const sk=schoolKid();if(sk){daily=[...new Set(tWords().filter(w=>/^[a-z]{3,8}$/i.test(w.en)).map(w=>w.en.toLowerCase()))].sort();if(!daily.length)return needMore('🟩 Wordle',1);}
 if(sk&&practice){ans=pick(daily);}
 else if(practice){const all=new Set(daily);allWords().forEach(w=>{if(/^[a-z]{5}$/.test(w.en))all.add(w.en);});ans=pick([...all]);}
 else{ans=daily[hashStr('tuki'+dayKey())%daily.length];S.wordle=S.wordle&&S.wordle.d===dayKey()&&S.wordle.a===ans?S.wordle:{d:dayKey(),a:ans,g:[],done:false};guesses=S.wordle.g.slice();}
 const L=ans.length;
 let cur='',over=false;
 view(`${ghead(practice?'🟩 Wordle – תרגול':'🟩 Wordle יומי',`<span class="pill">${practice?'∞':dayKey().split('-').slice(1).reverse().join('/')}</span>`)}
 <p class="small muted" style="text-align:center;margin:0 0 8px">🟩 אות במקום הנכון · 🟨 האות במילה אבל במקום אחר · ⬛ האות לא במילה</p>${sk?`<p style="text-align:center;margin:0 0 8px">מילה של ${L} אותיות · רמז: <b>${esc(heOf(ans))}</b></p>`:''}
 <div class="wd" id="wd" style="max-width:${Math.min(380,58*L)}px"></div><div id="wmsg" style="text-align:center;margin-top:10px"></div><div id="wkb">${kbHTML(true)}</div>`,'game');
 const draw=()=>{const rows=[];for(let r=0;r<6;r++){const g=guesses[r];const sc=g?score5(g,ans):null;const txt=g||(r===guesses.length?cur:'');
   rows.push(`<div class="r" style="grid-template-columns:repeat(${L},1fr)">${[...Array(L).keys()].map(c=>`<div class="c ${sc?sc[c]:''}">${esc(txt[c]||'')}</div>`).join('')}</div>`);}
  $('#wd').innerHTML=rows.join('');const st={};guesses.forEach(g=>score5(g,ans).forEach((s,i)=>{const l=g[i],o=st[l];if(s==='g'||(s==='y'&&o!=='g')||(!o))st[l]=s;}));
  $$('.kb button',$('#wkb')).forEach(b=>{const k=b.dataset.k;b.classList.remove('g','y','x');if(st[k])b.classList.add(st[k]);});};
 const finish=(win)=>{over=true;const he=heOf(ans);
  $('#wmsg').innerHTML=`<div class="card stack" style="text-align:center"><h2 style="margin:0">${win?'🎉 מצאת!':'😅 לא הפעם'}</h2><div class="wotd" style="justify-content:center"><span class="big en">${ans.toUpperCase()}</span>${spk(ans)}</div><div>${esc(he)}</div>
  <div class="row" style="justify-content:center">${practice?'':'<span class="small muted">מילה חדשה מחר! 🦜</span>'}<button class="btn primary" id="wnext">${practice?'🔁 עוד מילה':'🟩 מצב תרגול'}</button><button class="btn ghost" onclick="open_('games')">🎮 משחקים</button></div></div>`;
  $('#wnext').onclick=()=>gWordle(true);$('#wkb').innerHTML='';speak(ans);};
 const award=(win)=>{const xp=win?Math.max(10,34-guesses.length*4):5;addXP(xp);wk().games++;S.gbest=S.gbest||{};if(win){const sc=7-guesses.length;if(sc>(S.gbest['g-wordle']||0))S.gbest['g-wordle']=sc;}save();toast(`+${xp} XP`);};
 const key=k=>{if(over)return;if(k==='del'){cur=cur.slice(0,-1);}else if(k==='enter'){if(cur.length<L){$('#wd').classList.add('shake');later(()=>$('#wd').classList.remove('shake'),400);toast('צריך '+L+' אותיות');return;}
   guesses.push(cur);cur='';if(!practice){S.wordle.g=guesses.slice();save();}const win=guesses[guesses.length-1]===ans;draw();
   if(win||guesses.length>=6){if(!practice){S.wordle.done=true;S.wordle.win=win;}award(win);finish(win);}return;}
  else if(cur.length<L&&/^[a-z]$/.test(k))cur+=k;draw();};
 kbBind(document,key);draw();
 if(!practice&&S.wordle.done){finish(!!S.wordle.win);}}

/* ---------------- 5. איש תלוי ---------------- */
function gHang(){
 const ws=wpool(5,w=>only(w)&&w.en.length>=3&&w.en.length<=12);if(!ws.length)return needMore('🪶 איש תלוי',1);let r=0,score=0,solved=0;
 const round=()=>{if(r>=ws.length)return gameEnd('g-hang','🪶 איש תלוי',score,`פתרת ${solved} מתוך ${ws.length} מילים`,score/2);
  const w=ws[r++],word=w.en.toLowerCase();const got=new Set();let wrong=0,over=false;
  view(`${ghead('🪶 איש תלוי',`<span class="pill">${r}/${ws.length}</span>`)}<div class="card" style="text-align:center">
  <div style="font-size:54px" id="tk">🦜</div><div id="fe" style="font-size:24px;letter-spacing:2px"></div>
  <div class="muted small" style="margin-top:6px">רמז: ${esc(w.he)}</div>
  <div id="wd" class="en" style="font-size:32px;font-weight:800;letter-spacing:10px;margin:14px 0;direction:ltr"></div><div id="hm"></div></div><div id="hkb">${kbHTML(false)}</div>`,'game');
  const draw=()=>{$('#wd').textContent=[...word].map(c=>got.has(c)?c.toUpperCase():'_').join('');$('#fe').textContent='🪶'.repeat(6-wrong)+'·'.repeat(wrong);$('#tk').textContent=wrong>=6?'😵':wrong>=4?'😰':'🦜';};
  const end=win=>{over=true;inDeckSrs(w.en,win);if(win){solved++;score+=10+(6-wrong)*2;buzz('good');}else buzz('bad');
   $('#wd').textContent=word.toUpperCase();$('#hkb').innerHTML='';speak(w.en);
   $('#hm').innerHTML=`<div style="font-size:20px;font-weight:700">${win?'🎉 מצוין!':'🙈 טוקי איבד את כל הנוצות'}</div><div class="row" style="justify-content:center;margin-top:10px">${spk(w.en)}<button class="btn primary" id="hn">המשך ←</button></div>`;$('#hn').onclick=round;};
  kbBind(document,(k,b)=>{if(over||!/^[a-z]$/.test(k)||got.has(k))return;got.add(k);const btn=b||$(`.kb button[data-k="${k}"]`);
   if(word.includes(k)){btn&&btn.classList.add('g');if([...word].every(c=>got.has(c)||!/[a-z]/.test(c))){draw();return end(true);}}else{wrong++;btn&&btn.classList.add('x');buzz('bad');if(wrong>=6){draw();return end(false);}}
   if(btn)btn.disabled=true;draw();});
  [...word].forEach(c=>{if(!/[a-z]/.test(c))got.add(c);});draw();};
 round();}

/* ---------------- 6. תפזורת ---------------- */
function gSearch(){
 const N=9,dirs=[[0,1],[1,0],[1,1],[-1,1]];const grid=Array(N*N).fill('');const placed=[];
 for(const w of wpool(40,x=>/^[a-z]{3,8}$/.test(x.en))){if(placed.length>=6)break;const s=w.en;
  for(let t=0;t<120;t++){const [dr,dc]=pick(dirs);const r0=Math.floor(Math.random()*N),c0=Math.floor(Math.random()*N);const re=r0+dr*(s.length-1),ce=c0+dc*(s.length-1);
   if(re<0||re>=N||ce<0||ce>=N)continue;let ok=true;for(let k=0;k<s.length;k++){const g=grid[(r0+dr*k)*N+c0+dc*k];if(g&&g!==s[k]){ok=false;break;}}
   if(!ok)continue;const cells=[];for(let k=0;k<s.length;k++){const id=(r0+dr*k)*N+c0+dc*k;grid[id]=s[k];cells.push(id);}placed.push({w,cells,found:false});break;}}
 if(placed.length<2)return needMore('🔎 תפזורת',2);
 const AB='abcdefghijklmnopqrstuvwxyz';for(let i=0;i<grid.length;i++)if(!grid[i])grid[i]=AB[Math.floor(Math.random()*26)];
 let sel=null,t0=Date.now();
 view(`${ghead('🔎 תפזורת',`<span class="pill" id="tm">0:00</span>`)}<p class="small muted" style="margin:0 0 8px;text-align:center">לוחצים על האות הראשונה ואז על האחרונה של המילה</p>
 <div class="ws" id="ws" style="grid-template-columns:repeat(${N},1fr)">${grid.map((c,i)=>`<button data-i="${i}">${c}</button>`).join('')}</div>
 <div class="card" style="margin-top:12px"><div class="row" id="wl"></div><div class="row" style="margin-top:10px"><button class="btn ghost" id="hint">💡 רמז</button></div></div>`,'game');
 const list=()=>{$('#wl').innerHTML=placed.map(p=>`<span class="pill" style="${p.found?'text-decoration:line-through;opacity:.55':''}"><b class="en">${esc(p.w.en)}</b> · ${esc(p.w.he)}</span>`).join('');};
 every(()=>{const s=Math.round((Date.now()-t0)/1000);$('#tm').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');},1000);
 const btn=i=>$(`#ws button[data-i="${i}"]`);
 $$('#ws button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(sel===null){sel=i;b.classList.add('sel');return;}
  const a=sel;sel=null;$$('#ws .sel').forEach(x=>x.classList.remove('sel'));if(a===i)return;
  const r1=Math.floor(a/N),c1=a%N,r2=Math.floor(i/N),c2=i%N,dr=Math.sign(r2-r1),dc=Math.sign(c2-c1),len=Math.max(Math.abs(r2-r1),Math.abs(c2-c1))+1;
  if(!(r1===r2||c1===c2||Math.abs(r2-r1)===Math.abs(c2-c1))){buzz('bad');return;}
  const cells=[];for(let k=0;k<len;k++)cells.push((r1+dr*k)*N+c1+dc*k);
  const p=placed.find(p=>!p.found&&p.cells.length===len&&(p.cells.join()===cells.join()||p.cells.slice().reverse().join()===cells.join()));
  if(!p){buzz('bad');b.classList.add('shake');later(()=>b.classList.remove('shake'),400);return;}
  p.found=true;p.cells.forEach(c=>btn(c).classList.add('f'));buzz('good');speak(p.w.en);inDeckSrs(p.w.en,true);list();
  if(placed.every(p=>p.found)){const s=Math.round((Date.now()-t0)/1000);later(()=>gameEnd('g-search','🔎 תפזורת',Math.max(1,300-s),`מצאת ${placed.length} מילים ב-${Math.floor(s/60)}:${String(s%60).padStart(2,'0')} דקות`,15+placed.length*4),900);}});
 $('#hint').onclick=()=>{const p=placed.find(p=>!p.found);if(!p)return;const b=btn(p.cells[0]);b.classList.add('sel');later(()=>b.classList.remove('sel'),1200);};
 list();}

/* ---------------- 7. מילים מבולגנות ---------------- */
function gScramble(){
 const ws=wpool(8,w=>only(w)&&w.en.length>=3&&w.en.length<=12);if(!ws.length)return needMore('🔀 מילים מבולגנות',1);let r=0,score=0,solved=0;
 const round=()=>{if(r>=ws.length)return gameEnd('g-scr','🔀 מילים מבולגנות',score,`סידרת ${solved} מתוך ${ws.length} מילים`,score/2);
  const w=ws[r++],word=w.en.toLowerCase();let letters;do{letters=shuffle([...word]);}while(letters.join('')===word&&word.length>1&&new Set(word).size>1);
  let built=[],hints=0,over=false;
  view(`${ghead('🔀 מילים מבולגנות',`<span class="pill">${r}/${ws.length} · ${score}</span>`)}<div class="card stack" style="text-align:center">
  <div class="he-big">${esc(w.he)}</div><div class="tiles built" id="bt"></div><div class="tiles" id="tl"></div>
  <div class="row" style="justify-content:center"><button class="btn ghost" id="hi">💡 רמז</button><button class="btn ghost" id="sk">⏭ דלג</button></div><div id="sm"></div></div>`,'game');
  const draw=()=>{$('#bt').innerHTML=built.map((k,j)=>`<button class="tile" data-j="${j}">${letters[k].toUpperCase()}</button>`).join('')||'<span class="muted small">לחצו על האותיות לפי הסדר</span>';
   $('#tl').innerHTML=letters.map((c,k)=>`<button class="tile ${built.includes(k)?'used':''}" data-k="${k}">${c.toUpperCase()}</button>`).join('');
   $$('#tl .tile').forEach(b=>b.onclick=()=>{if(over)return;built.push(+b.dataset.k);draw();check();});
   $$('#bt .tile').forEach(b=>b.onclick=()=>{if(over)return;built.splice(+b.dataset.j);draw();});};
  const done=(ok)=>{over=true;inDeckSrs(w.en,ok);if(ok){solved++;score+=Math.max(3,10-hints*3);buzz('good');}speak(w.en);
   $('#sm').innerHTML=`<div style="font-size:20px;font-weight:700">${ok?'🎉 נכון!':'המילה:'} <span class="en">${esc(w.en)}</span></div><button class="btn primary" id="nx" style="margin-top:8px">המשך ←</button>`;$('#nx').onclick=round;};
  const check=()=>{if(built.length<word.length)return;const s=built.map(k=>letters[k]).join('');if(s===word){built=[...Array(0)];$('#bt').innerHTML=`<span class="big en" style="color:var(--good)">${word.toUpperCase()}</span>`;$('#tl').innerHTML='';done(true);}
   else{buzz('bad');$('#bt').classList.add('shake');later(()=>{$('#bt').classList.remove('shake');built=[];draw();},450);}};
  $('#hi').onclick=()=>{if(over)return;hints++;let pre=0;while(pre<built.length&&letters[built[pre]]===word[pre])pre++;built=built.slice(0,pre);
   const need=word[pre];const k=letters.findIndex((c,i)=>c===need&&!built.includes(i));if(k>=0)built.push(k);draw();check();};
  $('#sk').onclick=()=>{if(!over){$('#tl').innerHTML='';done(false);}};draw();};
 round();}

/* ---------------- 8. בונים משפט ---------------- */
function gSentence(){
 if(schoolKid()){const ex=wpool(40).filter(w=>w.ex&&w.ex.split(' ').length>=3&&w.ex.split(' ').length<=12);if(!ex.length)return needMore('🧱 בונים משפט',1);
  return sentenceGame(shuffle(ex).slice(0,6).map(w=>({en:[w.ex],he:[`בנו משפט עם המילה <b class="en">${esc(w.en)}</b> (${esc(w.he)})`],raw:true})));}
 const li=lvlIdx(S.level);let pool=transPool().filter(t=>lvlIdx(t.lvl)<=li+0&&t.en&&t.en[0]&&t.en[0].split(' ').length>=3&&t.en[0].split(' ').length<=11);
 if(pool.length<6)pool=transPool().filter(t=>t.en&&t.en[0]&&t.en[0].split(' ').length<=11);
 return sentenceGame(shuffle(pool).slice(0,6));}
function sentenceGame(items){let r=0,score=0,good=0;
 const round=()=>{if(r>=items.length)return gameEnd('g-sent','🧱 בונים משפט',score,`בנית נכון ${good} מתוך ${items.length} משפטים`,score/2);
  const it=items[r++];const target=it.en[0];const toks=target.replace(/[.?!,]/g,'').split(' ').filter(Boolean);let order;do{order=shuffle(toks.map((_,k)=>k));}while(toks.length>1&&order.every((v,k)=>v===k));
  let built=[],over=false;
  view(`${ghead('🧱 בונים משפט',`<span class="pill">${r}/${items.length} · ${score}</span>`)}<div class="card stack" style="text-align:center">
  <div style="font-size:20px;font-weight:600">${it.raw?it.he[0]:esc(it.he[0])}</div><div class="tiles built" id="bt"></div><div class="tiles" id="tl"></div><div id="sm"></div></div>`,'game');
  const draw=()=>{$('#bt').innerHTML=built.map((k,j)=>`<button class="tile" data-j="${j}" style="font-size:17px">${esc(toks[k])}</button>`).join('')||'<span class="muted small">לחצו על המילים לפי הסדר</span>';
   $('#tl').innerHTML=order.map(k=>`<button class="tile ${built.includes(k)?'used':''}" data-k="${k}" style="font-size:17px">${esc(toks[k])}</button>`).join('');
   $$('#tl .tile').forEach(b=>b.onclick=()=>{if(over)return;built.push(+b.dataset.k);draw();if(built.length===toks.length)check();});
   $$('#bt .tile').forEach(b=>b.onclick=()=>{if(over)return;built.splice(+b.dataset.j,1);draw();});};
  const check=()=>{over=true;const s=normEn(built.map(k=>toks[k]).join(' '));const ok=it.en.some(a=>normEn(a)===s);
   if(ok){good++;score+=10;buzz('good');}else buzz('bad');speak(target);
   $('#sm').innerHTML=`<div class="fb ${ok?'good':'bad'}" style="text-align:start"><div class="fb-h">${ok?'מעולה! ✓':'כמעט…'}</div>${ok?'':`<div>המשפט הנכון: <b class="en">${esc(target)}</b></div>`}<div class="fbtn"><button class="btn primary" id="nx">המשך ←</button>${ok?'':'<button class="btn ghost" id="rt">נסו שוב</button>'}</div></div>`;
   $('#nx').onclick=round;const rt=$('#rt');if(rt)rt.onclick=()=>{over=false;built=[];$('#sm').innerHTML='';draw();};};
  draw();};
 round();}

/* ---------------- 9. זוגות ---------------- */
function gMemory(){
 const ws=wpool(6,w=>w.he.length<=24&&w.en.length<=18);if(ws.length<3)return needMore('🃏 זוגות',3);const cards=shuffle(ws.flatMap(w=>[{w,s:'en'},{w,s:'he'}]));let up=[],moves=0,pairs=0,lock=false;const t0=Date.now();
 view(`${ghead('🃏 זוגות',`<span class="pill" id="mv">0 מהלכים</span>`)}<p class="small muted" style="text-align:center;margin:0 0 10px">מצאו כל מילה באנגלית ואת התרגום שלה</p>
 <div class="mem">${cards.map((c,i)=>`<button class="c3 ${c.s==='en'?'en':''}" data-i="${i}">${esc(c.w[c.s])}</button>`).join('')}</div>`,'game');
 $$('.c3').forEach(b=>b.onclick=()=>{if(lock||b.classList.contains('up')||b.classList.contains('ok'))return;b.classList.add('up');const c=cards[+b.dataset.i];if(c.s==='en')speak(c.w.en);up.push(b);
  if(up.length<2)return;moves++;$('#mv').textContent=moves+' מהלכים';const [a,d]=up.map(x=>cards[+x.dataset.i]);
  if(a.w.en===d.w.en&&a.s!==d.s){up.forEach(x=>{x.classList.remove('up');x.classList.add('ok');});up=[];pairs++;buzz('good');inDeckSrs(a.w.en,true);
   if(pairs===ws.length){const s=Math.round((Date.now()-t0)/1000);later(()=>gameEnd('g-mem','🃏 זוגות',Math.max(1,60-moves),`סיימת ב-${moves} מהלכים (${s} שניות)`,Math.max(10,40-(moves-6)*2)),700);}}
  else{lock=true;later(()=>{up.forEach(x=>x.classList.remove('up'));up=[];lock=false;},900);}});}

/* ---------------- 10. מה חסר ---------------- */
function gMissing(){
 const big=wpool(60);if(big.length<6)return needMore('👀 מה חסר?',6);let r=0,score=0,good=0;const N=6;
 const round=()=>{if(r>=N)return gameEnd('g-miss','👀 מה חסר?',score,`זכרת נכון ${good} מתוך ${N}`,score/2);
  const size=Math.min(4+Math.floor(r/2),big.length-3);const set=shuffle(big).slice(0,size);const miss=pick(set);r++;let sec=Math.max(4,size);
  view(`${ghead('👀 מה חסר?',`<span class="pill">${r}/${N}</span>`)}<div class="card stack"><div style="text-align:center;font-weight:700">זכרו את המילים! <span id="cd">${sec}</span></div>
  <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(140px,1fr))">${set.map(w=>`<div class="card" style="padding:10px;text-align:center"><b class="en">${esc(w.en)}</b><div class="small">${esc(w.he)}</div></div>`).join('')}</div></div>`,'game');
  const iv=every(()=>{sec--;const c=$('#cd');if(c)c.textContent=sec;if(sec<=0){clearInterval(iv);ask();}},1000);
  const ask=()=>{const rest=shuffle(set.filter(w=>w!==miss));const others=shuffle(big.filter(w=>!set.includes(w))).slice(0,3);const opts=shuffle([miss,...others]);
   $('#app').querySelector('.card').innerHTML=`<div style="text-align:center;font-weight:700">איזו מילה נעלמה?</div>
   <div class="row" style="justify-content:center">${rest.map(w=>`<span class="pill en">${esc(w.en)}</span>`).join('')}</div><div class="opts two">${opts.map((o,k)=>`<button class="opt en" data-k="${k}">${esc(o.en)}</button>`).join('')}</div>`;
   $$('.opt').forEach((b,k)=>b.onclick=()=>{const ok=opts[k]===miss;lockOpts($('#app'),opts.indexOf(miss),k);if(ok){good++;score+=10;buzz('good');}else buzz('bad');speak(miss.en);later(round,1300);});};};
 round();}

/* ---------------- 11. אמור את זה ---------------- */
function gSay(){
 if(!dictCap){view(`${ghead('🗣️ אמור את זה!')}<div class="card stack"><p>המשחק הזה צריך מיקרופון, וזיהוי דיבור לא זמין כאן.</p><p class="muted small">${isApp?'באפליקציה נוסיף מיקרופון בשלב הבא.':'נסו לפתוח את Tuki ב-Safari או ב-Chrome.'}</p><button class="btn primary" onclick="open_('games')">חזרה למשחקים</button></div>`,'game');return;}
 let items=shuffle(EMOJI).slice(0,8);
 if(schoolKid()){const tw=wpool(8);if(!tw.length)return needMore('🗣️ אמור את זה!',1);items=tw.map(w=>{const e=EMOJI.find(x=>x[0]===w.en.toLowerCase());return[w.en,w.he,e?e[2]:'🗣️'];});}
 let r=0,score=0,good=0;
 const round=()=>{if(r>=items.length)return gameEnd('g-say','🗣️ אמור את זה!',score,`אמרת נכון ${good} מתוך ${items.length}`,score/2);
  const [en,he,em]=items[r++];let tries=0,over=false;
  view(`${ghead('🗣️ אמור את זה!',`<span class="pill">${r}/${items.length} · ${score}</span>`)}<div class="card stack" style="text-align:center"><div class="emo">${em}</div><div class="he-big">${esc(he)}</div>
  <div id="say"><button class="mic">🎤 אמרו באנגלית</button><div class="heard en"></div></div><div id="sm"></div>
  <div class="row" style="justify-content:center"><button class="btn ghost" id="hl">🔊 תשמיעו לי</button><button class="btn ghost" id="sk">⏭ הבא</button></div></div>`,'game');
  const fin=ok=>{over=true;if(ok){good++;score+=tries?6:10;buzz('good');}$('#sm').innerHTML=`<div style="font-size:22px;font-weight:700">${ok?'🎉 מצוין!':''} <span class="en">${esc(en)}</span></div>`;speak(en);later(round,1500);};
  micUI($('#say'),t=>{if(over)return;if(saidWord(t,en))fin(true);else{tries++;buzz('bad');$('.heard').innerHTML=`🤔 שמעתי: <span class="en">${esc(t)}</span> – נסו שוב`;if(tries>=3)fin(false);}});
  $('#hl').onclick=()=>{tries++;speak(en);};$('#sk').onclick=()=>{if(!over)fin(false);};};
 round();}

/* ---------------- 12. שרשרת מילים ---------------- */
function chainDict(){const m=new Map();const add=(en,he,lv)=>{en=String(en).toLowerCase().trim();if(/^[a-z]{2,}$/.test(en)&&!m.has(en))m.set(en,{he,lv});};
 allWords().forEach(w=>add(w.en,w.he,w.lvl));EXTRA5_MAP().forEach((he,en)=>add(en,he,'A2'));EMOJI.forEach(([en,he])=>add(en,he,'A1'));return m;}
function gChain(){
 const D=chainDict();const used=new Set();let lives=3,count=0,cur,busy=false,left=30;
 const tukiWord=letter=>{const c=[...D.keys()].filter(w=>!used.has(w)&&(!letter||w[0]===letter)&&w.length>=3&&w.length<=8);if(!c.length)return null;
  const lv=c.filter(w=>lvlIdx(D.get(w).lv)<=lvlIdx(S.level));return pick(lv.length?lv:c);};
 view(`${ghead('🔗 שרשרת מילים',`<span class="pill" id="hd"></span>`)}<div class="card stack">
 <div class="tbar"><i id="tb" style="width:100%"></i></div><div id="ch" class="stack" style="max-height:260px;overflow:auto"></div>
 <div class="note" id="pr"></div>
 <div class="row"><button class="mic needs-mic" id="cm" style="padding:11px 14px">🎤</button><input class="inp en" id="ci" placeholder="Type a word..." autocomplete="off" autocapitalize="off" style="flex:1"><button class="btn primary" id="cs">שלח</button></div></div>`,'game');
 const hud=()=>{$('#hd').textContent='❤️'.repeat(lives)+' · '+count+' מילים';};
 const addLine=(who,w)=>{const he=(D.get(w)||{}).he||'';$('#ch').insertAdjacentHTML('beforeend',`<div class="row" style="justify-content:${who==='me'?'flex-start':'flex-end'}"><span class="pill" style="${who==='me'?'background:var(--pri);color:#fff':''}"><b class="en">${esc(w)}</b>${he?' · '+esc(he):''}</span></div>`);$('#ch').scrollTop=1e5;};
 const prompt=()=>{const l=cur.slice(-1);$('#pr').innerHTML=`תורך! מילה באנגלית שמתחילה באות <b class="en" style="font-size:22px">${l.toUpperCase()}</b>`;left=30;$('#ci').value='';$('#ci').focus();};
 const lose=msg=>{lives--;buzz('bad');toast(msg);hud();if(lives<=0)return gameEnd('g-chain','🔗 שרשרת מילים',count,`שרשרת של ${count} מילים!`,8+count*5);prompt();};
 const tukiTurn=letter=>{const w=tukiWord(letter);if(!w){toast('🏆 טוקי לא מצא מילה – ניצחת!');return gameEnd('g-chain','🔗 שרשרת מילים',count+5,`ניצחת את טוקי! ${count} מילים`,20+count*5);}
  used.add(w);cur=w;addLine('tuki',w);speak(w);prompt();};
 const send=async()=>{if(busy)return;const w=$('#ci').value.trim().toLowerCase();if(!w)return;
  if(!/^[a-z]+$/.test(w))return toast('רק אותיות באנגלית, מילה אחת');
  if(w[0]!==cur.slice(-1))return toast('המילה צריכה להתחיל ב-'+cur.slice(-1).toUpperCase());
  if(used.has(w))return lose('המילה הזו כבר הייתה!');
  let ok=D.has(w);
  if(!ok&&aiReady()){busy=true;$('#cs').innerHTML='<span class="loader"></span>';try{const r=await ai(`Is "${w}" a real, correctly spelled English word? Return only JSON: {"valid": true or false, "he": "short Hebrew translation"}`);if(r&&r.valid){ok=true;D.set(w,{he:r.he||'',lv:'B1'});}}catch(e){}busy=false;$('#cs').textContent='שלח';}
  if(!ok)return lose('טוקי לא מכיר את המילה הזו 🤔');
  used.add(w);count++;buzz('good');addLine('me',w);hud();later(()=>tukiTurn(w.slice(-1)),600);};
 $('#cs').onclick=send;$('#ci').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();send();}};
 const mb=$('#cm');mb.onclick=()=>toggleListen(mb,t=>{$('#ci').value=t.split(' ')[0]||'';},t=>{if(t){$('#ci').value=(t.split(' ')[0]||'').toLowerCase();send();}});
 every(()=>{if(busy)return;left-=.25;$('#tb').style.width=Math.max(0,left/30*100)+'%';if(left<=0){left=30;lose('⏰ נגמר הזמן!');}},250);
 hud();tukiTurn(null);}

/* ---------------- 13+14. דו־קרב וחידון כיתתי ---------------- */
const ROOM_ERR={no_room:'לא מצאתי משחק עם הקוד הזה',no_kv:'השרת עוד לא הוגדר',no_name:'צריך לכתוב שם',network:'אין חיבור לאינטרנט',no_server:'אין חיבור לשרת',not_found:'צריך לעדכן את השרת (worker.js)',bad_prompt:'צריך לעדכן את השרת (worker.js)'};
const TERR='קוד המורה לא נכון – בדקו בהגדרות ← אני מורה';ROOM_ERR.bad_tcode=TERR;try{CLASS_ERR.bad_tcode=TERR;}catch(e){}
const roomErr=e=>toast(ROOM_ERR[e&&e.code]||'משהו השתבש, נסו שוב');
function myName(){return S.myName||(S.cls&&S.cls.me)||'';}
function roomQs(seed,lvl,n,words){const r=rng(seed);let pool=WORDS.filter(w=>w.lvl===lvl&&only(w));if(pool.length<20)pool=WORDS.filter(only);
 if(Array.isArray(words)&&words.length>=4)pool=words.filter(w=>w&&w.en&&w.he).slice().sort((a,b)=>a.en<b.en?-1:1);
 const pick4=sshuffle(pool,r);const qs=[];for(let i=0;i<n&&i<pick4.length;i++){const w=pick4[i];const others=sshuffle(pool.filter(x=>x.he!==w.he&&x.en!==w.en),r).slice(0,3);
  const opts=sshuffle([w,...others],r);qs.push({w,opts,right:opts.indexOf(w)});}return qs;}
function shareRoom(code,kind){const url=SITE+'#room='+code;const txt=kind==='quiz'?`🎯 חידון Tuki! היכנסו והקלידו את הקוד ${code}\n${url}`:`⚔️ מזמין/ה אותך לדו־קרב אנגלית ב-Tuki! הקוד: ${code}\n${url}`;
 if(navigator.share)navigator.share({text:txt}).catch(()=>{});else{try{navigator.clipboard.writeText(txt);toast('הקישור הועתק ✓');}catch(e){window.open('https://wa.me/?text='+encodeURIComponent(txt));}}}
window.tkShareRoom=shareRoom;
function roomHome(code){
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" onclick="open_('games')">✕</button><h2 style="margin:0">⚔️ דו־קרב</h2></div>
 <div class="card stack"><h3>יצירת דו־קרב</h3><p class="small muted" style="margin:0">10 שאלות, 15 שניות לכל אחת. שולחים לחבר את הקוד, וכל אחד משחק מהטלפון שלו.</p>
 <input class="inp" id="nm" placeholder="השם שלך" value="${esc(myName())}"><button class="btn primary" id="cr">⚔️ צור דו־קרב</button></div>
 <div class="card stack"><h3>יש לך קוד?</h3><div class="row"><input class="inp en" id="cd" placeholder="קוד" value="${esc(code||'')}" style="flex:1;text-transform:uppercase;min-width:110px"><input class="inp" id="nm2" placeholder="השם שלך" value="${esc(myName())}" style="flex:1;min-width:110px"></div><button class="btn accent" id="jn">הצטרפות למשחק</button></div>
 <p class="small muted">קיבלתם קוד לחידון כיתתי מהמורה? מקלידים אותו כאן ב"יש לך קוד?".</p></div>`,'room');
 $('#cr').onclick=async()=>{const name=$('#nm').value.trim();if(!name)return toast('כתבו את השם שלכם');S.myName=name;save();const b=$('#cr');b.disabled=true;b.innerHTML='<span class="loader"></span>';
  try{const tw=schoolKid()?tWords().slice(0,60).map(w=>({en:w.en,he:w.he})):null;const r=await api('/room/create',{name,lvl:S.level,n:Math.min(10,tw&&tw.length>=4?tw.length:10),kind:'duel',words:tw&&tw.length>=4?tw:undefined});await roomJoin(r.code,name,true);}catch(e){roomErr(e);b.disabled=false;b.textContent='⚔️ צור דו־קרב';}};
 $('#jn').onclick=async()=>{const c=$('#cd').value.trim().toUpperCase(),name=$('#nm2').value.trim();if(!c||!name)return toast('צריך קוד ושם');S.myName=name;save();const b=$('#jn');b.disabled=true;b.innerHTML='<span class="loader"></span>';
  try{await roomJoin(c,name,false);}catch(e){roomErr(e);b.disabled=false;b.textContent='הצטרפות למשחק';}};}
async function roomJoin(code,name,host){
 const r=await api('/room/join',{code,name});const RM={code,id:r.id,room:r.room,name};
 view(`<div class="card stack" style="text-align:center"><div style="font-size:50px">${r.room.kind==='quiz'?'🎯':'⚔️'}</div><h2 style="margin:0">${r.room.kind==='quiz'?'חידון כיתתי':'דו־קרב'} · רמה ${esc(r.room.lvl)}</h2>
 ${host?`<p style="margin:0">שלחו את הקוד לחבר:</p><div class="big-code">${esc(code)}</div><button class="btn ghost" onclick="tkShareRoom('${esc(code)}','duel')">📤 שיתוף הזמנה</button>`:`<p style="margin:0">שלום ${esc(name)}! ${r.room.n} שאלות, 15 שניות לכל אחת.</p>`}
 <button class="btn primary" id="go" style="font-size:20px">▶️ ${host?'אני מתחיל/ה לשחק':'מתחילים!'}</button></div>`,'room');
 $('#go').onclick=()=>{unlockAudio();roomPlay(RM);};}
function roomPlay(RM){
 const qs=roomQs(RM.room.seed,RM.room.lvl,RM.room.n,RM.room.words);let i=0,score=0,correct=0;
 const q=()=>{if(i>=qs.length)return roomSubmit(RM,score,correct,qs.length);const Q=qs[i++];let left=15,done=false;
  view(`<div class="ses-head"><span class="pill">${i}/${qs.length}</span><div class="bar"><i style="width:${(i-1)/qs.length*100}%"></i></div><span class="pill">${score}</span></div>
  <div class="card"><div class="tbar"><i id="tb" style="width:100%"></i></div><div class="prompt"><span class="big en">${esc(Q.w.en)}</span></div>
  <div class="opts two">${Q.opts.map((o,k)=>`<button class="opt" data-k="${k}">${esc(o.he)}</button>`).join('')}</div></div>`,'roomq');
  const fin=k=>{if(done)return;done=true;const ok=k===Q.right;lockOpts($('#app'),Q.right,k);if(ok){correct++;score+=100+Math.round(left/15*50);buzz('good');}else buzz('bad');later(q,900);};
  $$('.opt').forEach((b,k)=>b.onclick=()=>fin(k));
  every(()=>{left-=.1;const t=$('#tb');if(t)t.style.width=Math.max(0,left/15*100)+'%';if(left<=0)fin(-1);},100);};
 q();}
async function roomSubmit(RM,score,correct,n){
 addXP(10+correct*3);wk().games++;save();
 view(`<div class="card"><span class="loader"></span> שולח את התוצאה...</div>`,'roomres');
 try{await api('/room/submit',{code:RM.code,id:RM.id,score,correct});}catch(e){roomErr(e);}
 const show=async()=>{let r;try{r=await api('/room/get',{code:RM.code});}catch(e){return;}if(currentView!=='roomres')return;
  const ps=(r.players||[]).sort((a,b)=>(b.score||0)-(a.score||0));const mePos=ps.findIndex(p=>p.id===RM.id)+1;
  $('#app').innerHTML=`<div class="card stack" style="text-align:center"><div style="font-size:54px">${mePos===1&&ps.filter(p=>p.done).length>1?'🏆':'🎉'}</div><h1 style="margin:0">${score} נקודות</h1><p style="margin:0">${correct} מתוך ${n} נכונות</p>
  <div style="text-align:start">${ps.map((p,k)=>`<div class="lb ${p.id===RM.id?'me':''}"><span class="n">${k===0?'🥇':k===1?'🥈':k===2?'🥉':k+1}</span><span style="flex:1">${esc(p.name)}</span><b>${p.done?p.score:'⏳ משחק...'}</b></div>`).join('')}</div>
  <p class="small muted" style="margin:0">הטבלה מתעדכנת לבד כשאחרים מסיימים</p><div class="row" style="justify-content:center"><button class="btn primary" onclick="open_('g-duel')">⚔️ דו־קרב חדש</button><button class="btn ghost" onclick="open_('games')">🎮 משחקים</button></div></div>`;};
 view(`<div class="card"><span class="loader"></span></div>`,'roomres');await show();let k=0;every(()=>{if(++k>36)return gstop();show();},5000);}
function quizHost(){
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" onclick="open_('games')">✕</button><h2 style="margin:0">🎯 חידון כיתתי</h2></div>
 <div class="card stack"><p style="margin:0">פותחים חידון, מקרינים את הקוד על הלוח, והתלמידים נכנסים ב-Tuki: 🎮 משחקים ← ⚔️ דו־קרב ← "יש לך קוד?".</p>
 <label class="set">רמת השאלות<select class="inp" id="ql">${LEVELS.map(l=>`<option ${l===S.level?'selected':''}>${l}</option>`).join('')}</select></label>
 <label class="set">מספר שאלות<select class="inp" id="qn"><option>10</option><option>15</option><option>20</option></select></label>
 ${(S.teach||[]).length?`<label class="set">על אילו מילים?<select class="inp" id="qcls"><option value="">מילים כלליות לפי רמה</option>${S.teach.map(c=>`<option value="${esc(c.code)}">${esc(c.name)} – כל בנק המילים</option>`).join('')}</select></label><select class="inp" id="qlist" hidden></select>`:''}
 <input class="inp" id="qt" placeholder="שם החידון, למשל: ז׳2 – חזרה" value="${esc((S.teach&&S.teach[0]&&S.teach[0].name)||'')}"><button class="btn primary" id="qc">🎯 פתיחת חידון</button></div></div>`,'quiz');
 let QL=[];const qc=$('#qcls');if(qc)qc.onchange=async()=>{const sel=$('#qlist');QL=[];sel.hidden=true;if(!qc.value)return;const c=S.teach.find(x=>x.code===qc.value);
  try{const r=await api('/class/view',{code:c.code,key:c.key});QL=r.lists||[];sel.innerHTML=`<option value="*">כל הרשימות (${QL.reduce((a,l)=>a+l.words.length,0)} מילים)</option>`+QL.map(l=>`<option value="${esc(l.id)}">${esc(l.name)} (${l.words.length} מילים)</option>`).join('');sel.hidden=false;}catch(e){classErr(e);}};
 $('#qc').onclick=async()=>{const b=$('#qc');b.disabled=true;b.innerHTML='<span class="loader"></span>';
  let words;const sel=$('#qlist');if(sel&&!sel.hidden){const src=sel.value==='*'?QL:QL.filter(l=>l.id===sel.value);const m=new Map();src.forEach(l=>l.words.forEach(w=>{if(!m.has(w.en))m.set(w.en,{en:w.en,he:w.he});}));words=[...m.values()].slice(0,60);if(words.length<4){toast('צריך לפחות 4 מילים ברשימה');b.disabled=false;b.textContent='🎯 פתיחת חידון';return;}}
  try{const r=await api('/room/create',{name:$('#qt').value.trim()||'Quiz',lvl:$('#ql').value,n:words?Math.min(+$('#qn').value,words.length):+$('#qn').value,kind:'quiz',words});quizBoard(r.code);}catch(e){roomErr(e);b.disabled=false;b.textContent='🎯 פתיחת חידון';}};}
function quizBoard(code){
 view(`<div class="card stack" style="text-align:center"><div class="small muted">היכנסו ל-Tuki ← 🎮 משחקים ← ⚔️ דו־קרב, והקלידו:</div><div class="big-code" style="font-size:72px">${esc(code)}</div>
 <div class="row" style="justify-content:center"><button class="btn ghost" onclick="tkShareRoom('${esc(code)}','quiz')">📤 שיתוף קישור</button><button class="btn ghost" id="rf">🔄 רענון</button></div>
 <div id="pl" style="text-align:start"></div></div>`,'quizboard');
 const load=async()=>{let r;try{r=await api('/room/get',{code});}catch(e){return;}if(currentView!=='quizboard')return;const ps=(r.players||[]).sort((a,b)=>(b.score||0)-(a.score||0));
  $('#pl').innerHTML=`<h3>${ps.length} משתתפים · ${ps.filter(p=>p.done).length} סיימו</h3>`+(ps.map((p,k)=>`<div class="lb"><span class="n">${p.done?(k===0?'🥇':k===1?'🥈':k===2?'🥉':k+1):'⏳'}</span><span style="flex:1;font-size:18px">${esc(p.name)}</span><b style="font-size:18px">${p.done?p.score:'משחק...'}</b></div>`).join('')||'<p class="muted">מחכים למשתתפים…</p>');};
 $('#rf').onclick=load;load();let k=0;every(()=>{if(++k>180)return;load();},5000);}

/* ===================================================================
   🦜 טוקי שלי – מטבעות, חנות, תעודות
   =================================================================== */
const STAGES=[[0,'ביצה','🥚'],[150,'אפרוח','🐣'],[600,'גוזל','🐥'],[1500,'תוכי צעיר',''],[4000,'תוכי חכם',''],[10000,'תוכי אלוף','']];
function petStage(){let s=STAGES[0],n=null;for(let i=0;i<STAGES.length;i++){if(S.xp>=STAGES[i][0]){s=STAGES[i];n=STAGES[i+1]||null;}}return{name:s[1],emoji:s[2],next:n,min:s[0]};}
const SHOP=[['hat','🎩','כובע צילינדר',150],['hat','👑','כתר',400],['hat','🎓','כובע סיום',250],['hat','🧢','כובע מצחייה',100],['hat','🎀','פפיון',80],['hat','🌸','פרח',60],['hat','🎧','אוזניות',200],
 ['face','👓','משקפיים',120],['face','🕶️','משקפי שמש',180],['face','🥸','תחפושת',220],
 ['hand','⚽','כדור',90],['hand','📚','ספרים',70],['hand','🎸','גיטרה',260],['hand','☕','קפה',50],['hand','🍕','פיצה',60],['hand','🏆','גביע',500]];
function petHTML(){const st=petStage(),P=S.pet||{};const acc=['hat','face','hand'].map(sl=>P[sl]?`<span class="acc a-${sl}">${P[sl]}</span>`:'').join('');
 return `<div class="pet">${st.emoji?`<div class="egg">${st.emoji}</div>`:`<img src="${LOGO}" alt="Tuki">`}${acc}</div>`;}
function petView(){
 S.pet=S.pet||{owned:[]};const P=S.pet,st=petStage();
 const certs=LEVELS.filter(l=>lvlIdx(l)<lvlIdx(S.level));if(S.path&&S.path.n>PATH_LEN)certs.push('path');
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">🦜 טוקי שלי</h2><span class="chip" style="margin-inline-start:auto">🪙 ${S.coins||0}</span></div>
 <div class="card" style="text-align:center">${petHTML()}<h2 style="margin:6px 0 0">${st.name}${st.min>=10000?' 🏆':''}</h2>
 ${st.next?`<div class="small muted">עוד ${st.next[0]-S.xp} XP עד: ${st.next[1]}</div><div class="sbar" style="margin:8px auto;max-width:260px"><i style="width:${Math.round((S.xp-st.min)/(st.next[0]-st.min)*100)}%"></i></div>`:'<div class="small muted">הגעת לשלב הכי גבוה!</div>'}</div>
 <div class="card stack"><h3>🛍️ החנות של טוקי</h3><p class="small muted" style="margin:0">כל תרגול ומשחק נותן מטבעות. קונים פעם אחת, ולוחצים שוב כדי ללבוש או להוריד.</p>
 ${['hat','face','hand'].map(sl=>`<div class="small" style="font-weight:700">${{hat:'על הראש',face:'על הפנים',hand:'ביד'}[sl]}</div><div class="shop">${SHOP.filter(x=>x[0]===sl).map(([s,e,n,p])=>{const own=P.owned.includes(e);return`<button class="${P[s]===e?'on':''}" data-e="${e}" data-s="${s}" data-p="${p}"><span class="e">${e}</span><span>${n}</span><span class="small muted">${own?(P[s]===e?'✓ לבוש':'שלך'):p+' 🪙'}</span></button>`;}).join('')}</div>`).join('')}</div>
 <div class="card stack"><h3>🎓 התעודות שלי</h3>${certs.length?`<div class="row">${certs.map(c=>`<button class="btn ghost" onclick="tkCert('${c}')">🎓 ${c==='path'?'סיום המסלול':'רמה '+c}</button>`).join('')}</div>`:'<p class="small muted" style="margin:0">כשתסיימו רמה, תקבלו כאן תעודה לשיתוף 🏅</p>'}</div></div>`,'pet');
 $$('.shop button').forEach(b=>b.onclick=()=>{const e=b.dataset.e,s=b.dataset.s,p=+b.dataset.p;
  if(!P.owned.includes(e)){if((S.coins||0)<p)return toast(`חסרים ${p-(S.coins||0)} מטבעות 🪙`);S.coins-=p;P.owned.push(e);P[s]=e;buzz('good');toast('🎉 טוקי קיבל '+e);}
  else P[s]=P[s]===e?'':e;save();renderTop();petView();});}

/* תעודה */
window.tkCert=async function(kind){
 if(kind!=='path'&&S.certNew===kind){S.certNew=null;save();}
 view(`<div class="stack"><div class="ses-head">${back("open_('pet')")}<h2 style="margin:0">🎓 תעודה</h2></div>
 <div class="card stack"><label class="set">השם על התעודה<input class="inp" id="cn" value="${esc(myName())}" placeholder="השם שלך" style="max-width:220px"></label><button class="btn primary" id="mk">✨ יצירת התעודה</button></div><div id="co"></div></div>`,'cert');
 const make=async()=>{const name=$('#cn').value.trim()||'תלמיד/ה מצטיין/ת';S.myName=name;if(kind==='path'){S.certs=S.certs||{};S.certs.path=1;}save();
  const cv=document.createElement('canvas');cv.width=1400;cv.height=990;const x=cv.getContext('2d');
  try{await document.fonts.load('700 60px Rubik');await document.fonts.load('400 30px Rubik');}catch(e){}
  x.fillStyle='#fffdf9';x.fillRect(0,0,1400,990);x.strokeStyle='#0e7c6b';x.lineWidth=18;x.strokeRect(30,30,1340,930);x.strokeStyle='#f2a93b';x.lineWidth=4;x.strokeRect(62,62,1276,866);
  const img=new Image();img.src=LOGO;await new Promise(r=>{img.onload=r;img.onerror=r;});try{x.drawImage(img,620,100,160,160);}catch(e){}
  x.direction='rtl';x.textAlign='center';x.fillStyle='#0e7c6b';x.font='800 78px Rubik, sans-serif';x.fillText('תעודת הצטיינות',700,350);
  x.fillStyle='#1d2433';x.font='400 34px Rubik, sans-serif';x.fillText('מוענקת בגאווה ל',700,425);
  x.font='700 72px Rubik, sans-serif';x.fillText(name,700,520);
  x.font='400 38px Rubik, sans-serif';x.fillText(kind==='path'?'על השלמת מסלול 60 השיעורים של Tuki':`על השלמת רמה ${kind} (${LVL_HE[kind]||''}) בלימוד אנגלית`,700,605);
  x.fillStyle='#6b7280';x.font='400 30px Rubik, sans-serif';x.fillText(`נקודות: ${S.xp} · מילים שנלמדו: ${learnedCount()} · רצף: ${computeStreak()} ימים`,700,670);
  x.fillText(new Date().toLocaleDateString('he-IL'),700,800);x.fillStyle='#0e7c6b';x.font='700 34px Rubik, sans-serif';x.fillText('Tuki – לימוד אנגלית 🦜',700,870);
  const url=cv.toDataURL('image/png');
  $('#co').innerHTML=`<div class="card stack"><img class="cert-img" src="${url}" alt="תעודה"><div class="row"><button class="btn primary" id="sh">📤 שיתוף</button><a class="btn ghost" download="Tuki-certificate.png" href="${url}">⬇️ הורדה</a></div><p class="small muted" style="margin:0">בטלפון אפשר גם ללחוץ לחיצה ארוכה על התעודה ולשמור אותה.</p></div>`;
  $('#sh').onclick=()=>cv.toBlob(async b=>{try{const f=new File([b],'Tuki-certificate.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))await navigator.share({files:[f],text:'קיבלתי תעודה ב-Tuki! 🦜'});else toast('לחצו על "הורדה" או לחיצה ארוכה על התמונה');}catch(e){}});};
 $('#mk').onclick=make;if(myName())make();};

/* ===================================================================
   🏆 אתגר שבועי + טבלת מובילים
   =================================================================== */
const CHAL=[{t:'צברו 500 XP השבוע',v:()=>weekXP(),goal:500},{t:'שחקו 8 משחקים השבוע',v:()=>wk().games,goal:8},{t:'תרגלו 5 ימים השבוע',v:()=>weekDays(),goal:5},{t:'צברו 800 XP השבוע',v:()=>weekXP(),goal:800}];
function curChallenge(){return CHAL[hashStr(weekKey())%CHAL.length];}
async function challengeView(){
 const c=curChallenge(),v=c.v(),p=Math.min(100,Math.round(v/c.goal*100)),W=wk();const d=new Date().getDay();
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">🏆 אתגר שבועי</h2></div>
 <div class="card hero stack"><div class="small" style="opacity:.85">האתגר של השבוע · נשארו ${6-d===0?'היום האחרון':(6-d)+' ימים'}</div><h2 style="margin:0;color:#fff">${c.t}</h2>
 <div style="height:12px;background:rgba(255,255,255,.25);border-radius:9px;overflow:hidden"><i style="display:block;height:100%;width:${p}%;background:#fff"></i></div><div>${Math.min(v,c.goal)} / ${c.goal} · פרס: 150 🪙</div>
 ${v>=c.goal?(W.claimed?'<div>✅ הפרס נאסף. כל הכבוד!</div>':'<button class="btn light" id="cl">🎁 איסוף 150 מטבעות</button>'):''}</div>
 <div class="grid" style="grid-template-columns:repeat(3,1fr)"><div class="card stat"><span class="muted small">XP השבוע</span><b>${weekXP()}</b></div><div class="card stat"><span class="muted small">ימים</span><b>${weekDays()}/7</b></div><div class="card stat"><span class="muted small">משחקים</span><b>${W.games}</b></div></div>
 <div class="card stack" id="lbx"><h3>🏅 טבלת המובילים בכיתה</h3>${S.cls?'<div><span class="loader"></span></div>':`<p class="small" style="margin:0">הצטרפו לכיתה (⚙️ הגדרות) כדי להתחרות עם החברים, או אתגרו חבר בדו־קרב.</p><div class="row"><button class="btn ghost" onclick="open_('settings')">🏫 הצטרפות לכיתה</button><button class="btn accent" onclick="open_('g-duel')">⚔️ דו־קרב</button></div>`}</div></div>`,'challenge');
 const cl=$('#cl');if(cl)cl.onclick=()=>{W.claimed=true;S.coins=(S.coins||0)+150;save();renderTop();buzz('good');toast('🎉 +150 🪙');challengeView();};
 if(S.cls){try{await syncClass(true);const r=await api('/class/board',{code:S.cls.code});if(currentView!=='challenge')return;const ps=(r.students||[]).sort((a,b)=>(b.week||0)-(a.week||0));
  $('#lbx').innerHTML=`<h3>🏅 ${esc(r.name||S.cls.name)} – 7 הימים האחרונים</h3>`+ps.map((p,k)=>`<div class="lb ${p.id===S.cls.id?'me':''}"><span class="n">${k===0?'🥇':k===1?'🥈':k===2?'🥉':k+1}</span><span style="flex:1">${esc(p.name)}</span><span class="small muted">🔥${p.streak||0}</span><b>${p.week||0} XP</b></div>`).join('');}
  catch(e){const b=$('#lbx');if(b)b.innerHTML='<h3>🏅 טבלת המובילים</h3><p class="small muted" style="margin:0">'+(e&&e.code==='not_found'?'צריך לעדכן את השרת (worker.js) כדי לראות את הטבלה.':'לא הצלחתי לטעון כרגע.')+'</p>';}}}

/* ===================================================================
   📤 דוח שבועי
   =================================================================== */
function reportView(){
 const st=S.stats;let ok=0,t=0;for(const k in st){ok+=st[k][0];t+=st[k][1];}
 let w7=0,d7=0;for(let i=0;i<7;i++){const v=S.history[dayKey(-i)]||0;w7+=v;if(v)d7++;}
 const name=myName();
 const text=()=>{const n=$('#rn').value.trim();return `📊 הדוח השבועי${n?' של '+n:''} ב-Tuki 🦜\n\n🎓 רמה: ${S.level} (${LVL_HE[S.level]})\n⭐ XP בשבוע האחרון: ${w7}\n📅 ימים פעילים: ${d7} מתוך 7\n🔥 רצף: ${computeStreak()} ימים\n📚 מילים שנלמדו: ${learnedCount()}\n🎯 דיוק כללי: ${t?Math.round(ok/t*100):0}%\n🎮 משחקים השבוע: ${wk().games}\n📒 פריטים במחברת הטעויות: ${S.mistakes.length}`;};
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">📤 דוח שבועי</h2></div>
 <div class="card stack"><label class="set">שם התלמיד/ה<input class="inp" id="rn" value="${esc(name)}" style="max-width:200px"></label><pre id="rt" style="white-space:pre-wrap;font-family:inherit;margin:0;background:var(--bg);padding:12px;border-radius:12px"></pre>
 <div class="row"><button class="btn primary" id="rw">💬 וואטסאפ</button><button class="btn ghost" id="re">✉️ מייל</button><button class="btn ghost" id="rs">📤 שיתוף</button><button class="btn ghost" id="rc">📋 העתקה</button></div></div></div>`,'report');
 const upd=()=>{$('#rt').textContent=text();};$('#rn').oninput=()=>{S.myName=$('#rn').value.trim();save();upd();};upd();
 $('#rw').onclick=()=>window.open('https://wa.me/?text='+encodeURIComponent(text()),'_blank');
 $('#re').onclick=()=>{location.href='mailto:?subject='+encodeURIComponent('הדוח השבועי ב-Tuki')+'&body='+encodeURIComponent(text());};
 $('#rs').onclick=()=>{if(navigator.share)navigator.share({text:text()}).catch(()=>{});else toast('אפשר להשתמש בוואטסאפ או בהעתקה');};
 $('#rc').onclick=async()=>{try{await navigator.clipboard.writeText(text());toast('הועתק ✓');}catch(e){toast('סמנו את הטקסט והעתיקו');}};}

/* ===================================================================
   📸 מצלמה ← מילה
   =================================================================== */
async function aiImage(prompt,b64){
 if(PROXY_URL){let r;try{r=await withTimeout(fetch(PROXY_URL,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prompt,image:{mime:'image/jpeg',data:b64}})}),30000);}catch(e){throw{code:'network'};}
  if(!r.ok)throw{code:r.status===429?'rate_limited':'http'};const j=await r.json();if(!j.img)throw{code:'old_server'};return parseJSON(j.text);}
 if(!S.settings.aiKey)throw{code:'unavailable'};
 const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(S.settings.aiModel||'gemini-flash-latest')}:generateContent`,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':S.settings.aiKey.trim()},
  body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt},{inline_data:{mime_type:'image/jpeg',data:b64}}]}],generationConfig:{responseMimeType:'application/json',temperature:0.4}})});
 if(!r.ok)throw{code:'http'};const j=await r.json();return parseJSON((j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts||[]).map(p=>p.text||'').join(''));}
function shrink(file){return new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const m=800,s=Math.min(1,m/Math.max(im.width,im.height));const c=document.createElement('canvas');c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);
  c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',0.82));};im.onerror=rej;im.src=fr.result;};fr.onerror=rej;fr.readAsDataURL(file);});}
function addMyWord(en,he,ex){en=String(en).trim();if(!en)return;if(!allWords().find(w=>w.en.toLowerCase()===en.toLowerCase()))S.custom.words.push({en,he,ex:ex||'',tag:'custom',lvl:S.level});
 if(!S.words[en])S.words[en]={box:1,due:now(),ok:0,bad:0};save();toast('➕ "'+en+'" נוספה לתרגול');}
window.tkAddWord=(i)=>{const it=(window._tkCam||[])[i];if(it)addMyWord(it.en,it.he,it.ex);};
function cameraView(){
 if(!aiReady())return needAI();
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">📸 מצלמה ← מילה</h2></div>
 <div class="card stack" style="text-align:center"><div style="font-size:60px">📸</div><p style="margin:0">מצלמים חפץ (כוס, עץ, מחשב…) וטוקי אומר איך קוראים לו באנגלית.</p>
 <label class="btn primary" style="font-size:19px">📷 צלמו או בחרו תמונה<input type="file" accept="image/*" capture="environment" id="cf" hidden></label></div><div id="cr"></div></div>`,'camera');
 $('#cf').onchange=async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;const out=$('#cr');out.innerHTML=`<div class="card"><span class="loader"></span> טוקי מסתכל על התמונה...</div>`;
  try{const url=await shrink(f);const b64=url.split(',')[1];
   const r=await aiImage(`You help a native Hebrew speaker (English level ${S.level}) learn English words from photos. Identify the main object in the photo. Return only JSON:
{"en":"the English word (lowercase, singular, 1-3 words)","he":"Hebrew translation","ex":"a simple example sentence using the word, level ${S.level}","ex_he":"Hebrew translation of the sentence","more":[{"en":"other visible object","he":"Hebrew"}]}
"more" has up to 4 other objects that are clearly visible. If you cannot see anything clear, give your best guess.`,b64);
   const items=[{en:r.en,he:r.he,ex:r.ex}].concat((r.more||[]).slice(0,4).map(m=>({en:m.en,he:m.he,ex:''})));window._tkCam=items;addXP(5);
   out.innerHTML=`<div class="card stack"><img src="${url}" style="max-width:100%;max-height:260px;border-radius:12px;display:block;margin:0 auto">
   <div class="wotd" style="justify-content:center"><span class="big en">${esc(r.en)}</span>${spk(r.en)}${spkSlow(r.en)}</div><div class="he-big" style="text-align:center">${esc(r.he)}</div>
   ${r.ex?`<div class="ex en" style="justify-content:center">${esc(r.ex)} ${spk(r.ex,'sm')}</div><div class="small muted" style="text-align:center">${esc(r.ex_he||'')}</div>`:''}
   <button class="btn primary" onclick="tkAddWord(0)">➕ הוספה לתרגול</button>
   ${items.length>1?`<h3>עוד דברים בתמונה</h3>${items.slice(1).map((m,k)=>`<div class="row" style="justify-content:space-between;border-top:1px solid var(--line);padding-top:8px"><span><b class="en">${esc(m.en)}</b> · ${esc(m.he)}</span><span class="row">${spk(m.en,'sm')}<button class="btn ghost" style="padding:6px 10px" onclick="tkAddWord(${k+1})">➕</button></span></div>`).join('')}`:''}</div>`;
   speak(r.en);}
  catch(err){if(err&&err.code==='old_server')out.innerHTML='<div class="note">צריך לעדכן את השרת (worker.js) כדי שטוקי יוכל לראות תמונות.</div>';else{out.innerHTML='';aiErr(err);}}
  e.target.value='';};}

/* ===================================================================
   🪄 סיפור אישי עם המילים שלך
   =================================================================== */
async function aiStoryView(){
 if(!aiReady())return needAI();
 const t=now();let ws=Object.entries(S.words).sort((a,b)=>a[1].due-b[1].due).slice(0,8).map(([k])=>k);
 S.mistakes.filter(m=>m.kind==='vocab').slice(0,4).forEach(m=>{if(!ws.includes(m.ref))ws.push(m.ref);});
 if(ws.length<5)ws=ws.concat(wpool(8).map(w=>w.en).filter(w=>!ws.includes(w))).slice(0,8);ws=ws.slice(0,10);
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">🪄 סיפור אישי</h2></div><div class="card"><span class="loader"></span> טוקי כותב לך סיפור עם המילים: <span class="en">${ws.map(esc).join(', ')}</span></div></div>`,'aistory');
 let r;try{r=await ai(`Write a short, fun, original story in English for a native Hebrew speaker at CEFR level ${S.level}. Length: ${{A1:'60-80',A2:'80-110',B1:'110-150',B2:'150-190',C1:'180-220'}[S.level]} words.
It MUST naturally use ALL of these words: ${ws.join(', ')}.
Return only JSON: {"title":"English title","title_he":"Hebrew title","story":"the story","he":"full Hebrew translation","used":["the words from the list exactly as they appear in the story"],"questions":[{"q":"comprehension question in English","o":["4 short options"],"a":0}]} with exactly 3 questions; "a" is the index of the right option.`);}
 catch(e){aiErr(e);return home();}
 if(currentView!=='aistory')return;
 let html=esc(r.story||'');const list=[...new Set(ws.concat(r.used||[]))].sort((a,b)=>b.length-a.length);
 list.forEach(w=>{if(!w)return;const re=new RegExp('\\b('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?:s|es|ed|d|ing)?)\\b','gi');html=html.replace(re,m=>`\u0001${m}\u0002`);});
 html=html.replace(/\u0001([^\u0002]+)\u0002/g,(m,a)=>`<span class="hl" data-say="${a}">${a}</span>`);
 let qi=0,okc=0;
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0;font-size:19px">🪄 ${esc(r.title||'')}</h2></div>
 <div class="card stack"><div class="small muted">${esc(r.title_he||'')}</div><div class="story en" style="direction:ltr;text-align:left">${html}</div>
 <div class="row"><button class="btn primary" id="rd">🔊 הקראה</button><button class="btn ghost" id="tr">תרגום</button><button class="btn ghost" id="nw">🪄 סיפור חדש</button></div>
 <div id="he" hidden style="font-size:17px;line-height:1.8">${esc(r.he||'')}</div><p class="small muted" style="margin:0">המילים המודגשות הן מהתרגול שלך – לחצו עליהן כדי לשמוע.</p></div>
 <div class="card stack" id="qq"></div></div>`,'aistory');
 $('#rd').onclick=()=>speak(String(r.story||'').slice(0,1150));$('#tr').onclick=()=>{$('#he').hidden=!$('#he').hidden;};$('#nw').onclick=aiStoryView;
 const qs=(r.questions||[]).filter(q=>q&&q.o&&q.o.length);
 const showQ=()=>{const box=$('#qq');if(qi>=qs.length){addXP(10+okc*5);box.innerHTML=`<h3>🎉 סיימת!</h3><p style="margin:0">${okc} מתוך ${qs.length} תשובות נכונות</p>`;return;}
  const q=qs[qi];box.innerHTML=`<h3>שאלה ${qi+1}/${qs.length}</h3><div class="en" style="font-size:18px;direction:ltr;text-align:left">${esc(q.q)}</div><div class="opts">${q.o.map((o,k)=>`<button class="opt en" style="direction:ltr;text-align:left">${esc(o)}</button>`).join('')}</div>`;
  $$('#qq .opt').forEach((b,k)=>b.onclick=()=>{lockOpts(box,+q.a,k);if(k===+q.a){okc++;buzz('good');}else buzz('bad');qi++;later(showQ,1100);});};
 showQ();}

/* ===================================================================
   🗯️ ביטויים וניבים · 📐 דקדוק בדקה · 👄 מאמן הגייה
   =================================================================== */
function mcqQ({prompt,opts,right,explain,lvl,skill,correct}){return{lvl:lvl||S.level,skill:skill||'vocab',render(el,ans){
 el.innerHTML=`${prompt}<div class="opts two">${opts.map((o,k)=>`<button class="opt ${/[a-z]/i.test(o)&&!/[\u0590-\u05FF]/.test(o)?'en':''}">${esc(o)}</button>`).join('')}</div>`;
 $$('.opt',el).forEach((b,k)=>b.onclick=()=>{lockOpts(el,right,k);ans(k===right,{correct:correct||opts[right],explain});});}};}
function idiomsView(tab){
 tab=tab||'p';const L=IDIOMS.filter(x=>x[3]===tab);
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">🗯️ ביטויים וניבים</h2></div>
 <div class="row"><button class="btn ${tab==='p'?'primary':'ghost'}" id="tp">Phrasal verbs</button><button class="btn ${tab==='i'?'primary':'ghost'}" id="ti">Idioms – ניבים</button><button class="btn accent" id="pr" style="margin-inline-start:auto">🎯 תרגול</button></div>
 <p class="small muted" style="margin:0">${tab==='p'?'פועל + מילה קטנה (up, on, off…) = משמעות חדשה לגמרי. בדיוק מה שלא מלמדים מספיק!':'ביטויים שאי אפשר לתרגם מילה במילה – וכולם משתמשים בהם.'}</p>
 <div class="card">${L.map(([en,he,ex])=>`<div class="mist" style="display:block"><div class="row" style="justify-content:space-between"><b class="en" style="font-size:18px">${esc(en)}</b><span>${spk(en,'sm')}</span></div><div>${esc(he)}</div><div class="ex en muted" style="justify-content:flex-start">${esc(ex)} ${spk(ex,'sm')}</div></div>`).join('')}</div></div>`,'idioms');
 $('#tp').onclick=()=>idiomsView('p');$('#ti').onclick=()=>idiomsView('i');
 $('#pr').onclick=()=>{const pool=IDIOMS;runSession({title:'🗯️ ביטויים וניבים',kind:'idioms',skill:'vocab',items:shuffle(pool).slice(0,8).map(it=>()=>{const others=shuffle(pool.filter(x=>x!==it)).slice(0,3);const opts=shuffle([it,...others]);
  return mcqQ({prompt:`<div class="prompt"><span class="big en" style="font-size:28px">${esc(it[0])}</span>${spk(it[0])}</div><div class="ex en muted" style="justify-content:center">${esc(it[2])}</div>`,opts:opts.map(o=>o[1]),right:opts.indexOf(it),explain:it[2]});})});};}
ROUTES.idioms=()=>idiomsView();
function gramView(){
 S.gdone=S.gdone||{};let ok=0,t=0;const g=S.stats.grammar||[0,0];ok=g[0];t=g[1];
 const rec=GRAM.find(l=>!S.gdone[l.id]);
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">📐 דקדוק בדקה</h2></div>
 <p class="muted" style="margin-top:-6px">שיעורים של דקה על מה שדוברי עברית הכי מתבלבלים בו. קוראים הסבר קצר, ואז 3 שאלות.</p>
 ${rec?`<button class="note" style="text-align:start" onclick="tkGram('${rec.id}')">⭐ <b>מומלץ עכשיו:</b> ${esc(rec.t)} ←</button>`:'<div class="note">🏆 סיימת את כל השיעורים! אפשר לחזור על כל אחד.</div>'}
 <div class="grid">${GRAM.map(l=>`<button class="mod" style="min-height:80px" onclick="tkGram('${l.id}')"><span class="t">${S.gdone[l.id]?'✅ ':''}${esc(l.t)}</span><span class="d">${S.gdone[l.id]?'הושלם':'דקה אחת'}</span></button>`).join('')}</div></div>`,'gram');}
window.tkGram=function(id){const l=GRAM.find(x=>x.id===id);if(!l)return gramView();
 view(`<div class="stack"><div class="ses-head">${back("open_('gram')")}<h2 style="margin:0">📐 ${esc(l.t)}</h2></div>
 <div class="card stack"><p style="font-size:18px;margin:0;line-height:1.7">${esc(l.b)}</p>${l.ex.map(e=>`<div class="ex en" style="justify-content:flex-start">${spk(e,'sm')} ${esc(e)}</div>`).join('')}</div>
 <button class="btn primary" id="go" style="font-size:19px">🎯 3 שאלות קצרות</button></div>`,'gramlesson');
 $('#go').onclick=()=>runSession({title:'📐 '+l.t,kind:'gram',skill:'grammar',items:l.q.map(([s,a,o])=>()=>{const opts=shuffle(o);return mcqQ({skill:'grammar',prompt:`<div class="sentence en">${esc(s).replace('___','<span class="blank">___</span>')}</div>`,opts,right:opts.indexOf(a),correct:s.replace('___',a==='—'?'':a).replace(/\s+/g,' '),explain:l.b});}),
  onDone:ses=>{if(ses.ok>=2){S.gdone=S.gdone||{};S.gdone[l.id]=1;save();}}});};
function pronView(){
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">👄 מאמן הגייה לדוברי עברית</h2></div>
 <p class="muted" style="margin-top:-6px">בוחרים צליל, שומעים את טוקי, חוזרים בקול ומקבלים ציון. ${dictCap?'':'<b>(בלי מיקרופון אפשר רק להקשיב)</b>'}</p>
 <div class="stack">${PRON.map(p=>`<button class="mod" style="min-height:auto" onclick="tkPron('${p.id}')"><span class="t">${esc(p.t)}</span><span class="d">${esc(p.tip)}</span></button>`).join('')}</div></div>`,'pron');}
window.tkPron=function(id){const p=PRON.find(x=>x.id===id);if(!p)return pronView();
 if(!dictCap){view(`<div class="stack"><div class="ses-head">${back("open_('pron')")}<h2 style="margin:0">👄 ${esc(p.t)}</h2></div><div class="note">${esc(p.tip)}</div><div class="card">${p.items.map(s=>`<div class="ex en" style="justify-content:flex-start;padding:6px 0">${spk(s,'sm')} ${spkSlow(s)} <b>${esc(s)}</b></div>`).join('')}</div></div>`,'pron');return;}
 view(`<div class="stack"><div class="ses-head">${back("open_('pron')")}<h2 style="margin:0">👄 ${esc(p.t)}</h2></div><div class="card stack"><p style="margin:0;font-size:17px">${esc(p.tip)}</p><button class="btn primary" id="go">🎤 מתחילים</button></div></div>`,'pron');
 $('#go').onclick=()=>runSession({title:'👄 '+p.t,kind:'pron',skill:'speaking',items:p.items.map(s=>()=>makeShadowQ(s,S.level))});};
function voiceChat(){
 if(!dictCap){toast('שיחה קולית צריכה מיקרופון – נפתח שיחה רגילה');return startChat('free');}
 startChat('free');if(typeof chat!=='undefined'&&chat){chat.voice=true;const b=$('#vmode');if(b){b.classList.add('primary');b.classList.remove('ghost');b.innerHTML='🎙️ שיחה קולית פעילה';}toast('טוקי ידבר, ואחריו פשוט מדברים 🎙️');}}


/* ===================================================================
   📝 רשימות מילים מהמורה
   =================================================================== */
/* תלמיד: הרשימות מגיעות מהשרת והופכות ל"מבחנים" בהכנה למבחן */
function applyLists(lists,lv){
 if(!S.cls)return;S.cls.lv=lv||0;S.tests=S.tests||[];let fresh=0;const cc=S.cls.code;
 (S.tests||[]).forEach(t=>{if(t.tid&&!t.cc)t.cc=cc;});
 const ids=new Set(lists.map(l=>'T'+l.id));
 S.tests=S.tests.filter(t=>!t.tid||t.cc!==cc||ids.has(t.id));
 lists.forEach(l=>{let t=S.tests.find(x=>x.id==='T'+l.id);
  if(!t){t={id:'T'+l.id,tid:l.id,cc,name:'',date:'',words:[],created:now()};S.tests.unshift(t);fresh++;}
  if(t.tver!==l.updated){t.name=l.name;t.date=l.date||'';t.text=l.text||'';t.textHe=l.textHe||'';t.tr=l.tr!==false;t.qs=l.questions||[];t.words=[];t.tw={};(l.words||[]).forEach(w=>{if(w&&w.en)t.tw[w.en.toLowerCase()]={he:w.he||'',ex:w.ex||''};});addWordsToTest(t,(l.words||[]).map(w=>({en:w.en,he:w.he,ex:w.ex})));t.tver=l.updated;}});
 save();if(fresh)toast('📝 קיבלת רשימת מילים חדשה מהמורה!');if(currentView==='home')home();}
const _classStats=classStats;
window.classStats=function(){const d=_classStats();const lr={},hard={},ls={},lq={};
 tTests().slice(0,8).forEach(t=>{lr[t.tid]=examReady(t);ls[t.tid]=lessonStages(t).filter(x=>(t.st||{})[x.k]).length;if(t.quiz!=null)lq[t.tid]=t.quiz;
  hard[t.tid]=examWords(t).filter(w=>!S.words[w.en]||S.words[w.en].box<3).sort((a,b)=>((S.words[b.en]||{}).bad||0)-((S.words[a.en]||{}).bad||0)).slice(0,10).map(w=>w.en);});
 d.lr=lr;d.hard=hard;d.ls=ls;d.lq=lq;return d;};
/* מורה: ניהול רשימות בתוך מסך הכיתה */
const _openClass=openClass;
window.openClass=async function(code){G.lastView=null;await _openClass(code);if(currentView!=='class'||!G.lastView)return;
 const lists=G.lastView.lists||[];const first=$('#app .stack > .card');if(!first)return;
 first.insertAdjacentHTML('afterend',`<div class="card stack" id="tlists"><h3>📝 רשימות מילים לכיתה</h3>
 <p class="small muted" style="margin:0">מכניסים מילים, והן מופיעות לכל התלמידים בדף הבית לתרגול – כולל משחקים, הקראה ואחוז מוכנות.</p>
 ${lists.map(l=>{const d=daysLeft(l.date);return `<div class="mist" style="align-items:center"><div><b>${esc(l.name)}</b><div class="small muted">${l.words.length} מילים${l.date?' · '+daysTxt(d):''}</div></div>
  <div class="row" style="flex-wrap:nowrap"><button class="btn ghost" style="padding:6px 10px" data-ls="${l.id}">📊</button><button class="btn ghost" style="padding:6px 10px" data-le="${l.id}">✏️</button><button class="btn ghost" style="padding:6px 10px;color:var(--bad)" data-ld="${l.id}">🗑</button></div></div>`;}).join('')}
 <button class="btn primary" id="tlnew">➕ רשימת מילים חדשה</button></div>`);
 $('#tlnew').onclick=()=>tlEdit(code,null);
 $$('[data-le]').forEach(b=>b.onclick=()=>tlEdit(code,lists.find(l=>l.id===b.dataset.le)));
 $$('[data-ls]').forEach(b=>b.onclick=()=>tlStats(code,b.dataset.ls));
 $$('[data-ld]').forEach(b=>b.onclick=async()=>{if(!b.dataset.armed){b.dataset.armed=1;b.textContent='בטוח?';return;}
  const c=(S.teach||[]).find(x=>x.code===code);try{await api('/class/list/delete',{code,key:c.key,id:b.dataset.ld});toast('הרשימה נמחקה');openClass(code);}catch(e){classErr(e);}});};
function tlEdit(code,L){
 const c=(S.teach||[]).find(x=>x.code===code);if(!c)return teacherHome();
 let items=L?L.words.map(w=>({...w})):[];let RQ=L&&L.questions?L.questions.map(q=>normQ(q)).filter(Boolean):[];let heFor=L&&L.textHe?L.text:null;
 const draw=()=>{const box=$('#tlprev');if(!box)return;
  box.innerHTML=items.length?`<h3>👀 בדיקה לפני שליחה (${items.length})</h3><p class="small muted" style="margin:0">אפשר לתקן כל תרגום. מילה בלי תרגום מסומנת באדום.</p>`+items.map((w,i)=>`<div class="mist" style="align-items:center"><b class="en" style="min-width:90px">${esc(w.en)}</b><input class="inp" data-i="${i}" value="${esc(w.he||'')}" placeholder="תרגום" style="flex:1;font-size:15px;padding:7px 10px;${w.he?'':'border-color:var(--bad)'}"><span class="row" style="flex-wrap:nowrap">${spk(w.en,'sm')}<button class="iconbtn" data-x="${i}" style="font-size:14px">✕</button></span></div>`).join(''):'';
  $$('#tlprev input[data-i]').forEach(inp=>inp.oninput=()=>{items[+inp.dataset.i].he=inp.value.trim();inp.style.borderColor=inp.value.trim()?'':'var(--bad)';});
  $$('#tlprev [data-x]').forEach(b=>b.onclick=()=>{items.splice(+b.dataset.x,1);draw();});
  $('#tlsend').hidden=!items.length;cov();};
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" id="tlb">→</button><h2 style="margin:0">📝 ${L?'עריכת רשימה':'רשימת מילים חדשה'}</h2></div>
 <div class="card stack"><label class="small">שם הרשימה<input class="inp" id="tln" value="${esc(L?L.name:'')}" placeholder="למשל: מבחן יחידה 3" style="margin-top:4px"></label>
 <label class="small">תאריך יעד / מבחן (לא חובה)<input class="inp" type="date" id="tld" value="${esc(L?L.date:'')}" style="margin-top:4px"></label></div>
 <div class="card stack"><h3>➕ הוספת מילים</h3><p class="small muted" style="margin:0">מילה בכל שורה. אפשר עם תרגום (<span class="en">airport - שדה תעופה</span>) או בלי – Tuki ישלים את התרגום, ואת/ה בודקים לפני ששולחים.</p>
 <textarea class="inp en" id="tlt" style="min-height:130px" placeholder="airport - שדה תעופה&#10;luggage&#10;passport = דרכון"></textarea>
 <div class="row"><button class="btn ghost" id="tla">🔄 הוסף ותרגם</button><label class="btn ghost">📸 צילום דף מילים<input type="file" accept="image/*" capture="environment" id="tlcam" hidden></label></div><div id="tlst" class="small"></div></div>
 <div class="card stack" id="tlprev"></div>
 <details class="card" id="tlrd" ${L&&L.text?'open':''}><summary><b>📖 הסיפור של השיעור</b> <span class="small muted">(לא חובה)</span></summary><div class="stack" style="margin-top:10px">
 <p class="small muted" style="margin:0">סיפור או קטע קצר באנגלית, עם המילים של הרשימה. אפשר לכתוב או להדביק, לצלם מהספר, או לבקש מ-Tuki לכתוב. התלמידים קוראים, לוחצים על מילים כדי לשמוע ולראות תרגום, ועונים על שאלות קלילות.</p>
 <div class="row"><label class="btn ghost">📸 צילום טקסט מהספר<input type="file" accept="image/*" capture="environment" id="tlrcam" hidden></label></div>
 <textarea class="inp en" id="tlrt" dir="ltr" maxlength="3000" style="min-height:150px;text-align:left" placeholder="Write or paste the story here...">${esc(L&&L.text||'')}</textarea>
 <div id="tlcov" class="small"></div>
 <div class="row"><span class="small muted">אין לך סיפור?</span><select class="inp" id="tlrl" style="width:auto">${['A1','A2','B1','B2'].map(l=>`<option ${l==='A2'?'selected':''}>${l}</option>`).join('')}</select><button class="btn ghost" id="tlrg">🪄 כתוב סיפור עם המילים</button></div>
 <label class="set">🇮🇱 התלמידים יכולים לראות תרגום לעברית<input type="checkbox" id="tltr" ${!L||L.tr!==false?'checked':''}></label>
 <details id="tlhed"><summary class="small">התרגום לעברית (אפשר לבדוק ולתקן)</summary><div class="stack" style="margin-top:8px"><textarea class="inp" id="tlhe" style="min-height:90px" placeholder="אם ריק – Tuki יתרגם אוטומטית בשליחה">${esc(L&&L.textHe||'')}</textarea><button class="btn ghost small" id="tlheg">🪄 תרגם עכשיו</button></div></details>
 <h3 style="margin:8px 0 0">❓ שאלות קלילות <span class="small muted">(עד 6)</span></h3>
 <div id="tlrq"></div>
 <div class="row"><button class="btn ghost small" data-qadd="tf">➕ נכון / לא נכון</button><button class="btn ghost small" data-qadd="mcq">➕ בחירה</button><button class="btn ghost small" data-qadd="fill">➕ השלמה מהסיפור</button><button class="btn accent small" id="tlqs">🪄 הצע שאלות</button></div>
 <div id="tlqf"></div></div></details>
 <button class="btn primary" id="tlsend" style="font-size:19px" hidden>📤 שליחה לכיתה</button></div>`,'tledit');
 $('#tlb').onclick=()=>openClass(code);
 const story=()=>($('#tlrt').value||'').trim();
 function cov(){const box=$('#tlcov');if(!box)return;const txt=story();if(!txt||!items.length){box.innerHTML='';return;}
  const has=w=>new RegExp('\\b'+reEsc(w.en)+'(?:s|es|ed|d|ing)?\\b','i').test(txt);const yes=items.filter(has),no=items.filter(w=>!has(w));
  box.innerHTML=`<div><b>מילים מהרשימה בסיפור: ${yes.length}/${items.length}</b></div><div class="row" style="gap:6px;margin-top:4px">${yes.map(w=>`<span class="pill">✅ <span class="en">${esc(w.en)}</span></span>`).join('')}${no.map(w=>`<span class="pill" style="opacity:.7">❌ <span class="en">${esc(w.en)}</span></span>`).join('')}</div>${no.length?'<div class="muted" style="margin-top:4px">❌ = המילה לא מופיעה בסיפור. זה בסדר – היא פשוט לא תהיה מודגשת.</div>':''}`;}
 $('#tlrt').oninput=cov;$('#tlhe').oninput=()=>{heFor=null;};
 const drawQ=()=>{$('#tlrq').innerHTML=RQ.length?RQ.map((q,i)=>`<div class="mist"><div style="flex:1"><span class="pill" style="font-size:12px">${Q_HE[q.t]}</span><div class="en" style="direction:ltr;text-align:left">${i+1}. ${esc(q.q)}</div><div class="small muted">✓ ${esc(q.t==='tf'?(q.a?'לא נכון (False)':'נכון (True)'):q.o[q.a]||'')}</div></div><button class="iconbtn" data-qx="${i}" style="font-size:14px">✕</button></div>`).join(''):'<p class="small muted" style="margin:0">עוד אין שאלות. אפשר בלי שאלות – אז התלמידים רק קוראים.</p>';
  $$('[data-qx]').forEach(b=>b.onclick=()=>{RQ.splice(+b.dataset.qx,1);drawQ();});};drawQ();
 const addQ=q=>{q=normQ(q);if(!q)return false;if(RQ.length>=6){toast('אפשר עד 6 שאלות');return false;}if(RQ.some(x=>x.q===q.q))return false;RQ.push(q);drawQ();return true;};
 const lessonWords=()=>items.map(w=>w.en);
 /* משפטים מהסיפור שיש בהם מילה מהרשימה – בשביל שאלות השלמה (בלי AI) */
 const fillCands=()=>{const txt=story();if(!txt)return[];const out=[];const sents=txt.match(/[^.!?\n]+[.!?]?/g)||[];
  sents.forEach(s=>{s=s.trim();if(s.split(/\s+/).length<4)return;for(const w of items.slice().sort((a,b)=>b.en.length-a.en.length)){const m=s.match(new RegExp('\\b'+reEsc(w.en)+'(?:s|es|ed|d|ing)?\\b','i'));
   if(m){const others=shuffle(lessonWords().filter(x=>x.toLowerCase()!==w.en.toLowerCase())).slice(0,3);if(!others.length)return;const o=shuffle([m[0],...others]);out.push({t:'fill',q:s.replace(m[0],'_____'),o,a:o.indexOf(m[0])});return;}}});return out;};
 const form=t=>{const f=$('#tlqf');
  if(t==='tf'){f.innerHTML=`<div class="note stack"><b>➕ משפט נכון או לא נכון</b><span class="small">כתבו משפט באנגלית על הסיפור, וסמנו אם הוא נכון.</span><input class="inp en" id="qf1" dir="ltr" placeholder="Maya went to London." style="text-align:left"><div class="row"><label class="row" style="gap:6px"><input type="radio" name="qtf" value="0" checked> ✓ נכון</label><label class="row" style="gap:6px"><input type="radio" name="qtf" value="1"> ✗ לא נכון</label></div><div class="row"><button class="btn primary small" id="qfok">הוספה</button><button class="btn ghost small" id="qfx">ביטול</button></div></div>`;
   $('#qfok').onclick=()=>{const q=$('#qf1').value.trim();if(!q)return toast('כתבו משפט');addQ({t:'tf',q,o:['True','False'],a:+document.querySelector('input[name=qtf]:checked').value});f.innerHTML='';};}
  if(t==='mcq'){f.innerHTML=`<div class="note stack"><b>➕ שאלת בחירה</b><input class="inp en" id="qf1" dir="ltr" placeholder="What did Maya buy?" style="text-align:left"><input class="inp en" id="qfa" dir="ltr" placeholder="✓ התשובה הנכונה" style="text-align:left;border-color:var(--good)"><input class="inp en" id="qfb1" dir="ltr" placeholder="✗ תשובה לא נכונה" style="text-align:left"><input class="inp en" id="qfb2" dir="ltr" placeholder="✗ תשובה לא נכונה (לא חובה)" style="text-align:left"><input class="inp en" id="qfb3" dir="ltr" placeholder="✗ תשובה לא נכונה (לא חובה)" style="text-align:left"><div class="row"><button class="btn primary small" id="qfok">הוספה</button><button class="btn ghost small" id="qfx">ביטול</button></div></div>`;
   $('#qfok').onclick=()=>{const q=$('#qf1').value.trim(),a=$('#qfa').value.trim(),bad=['#qfb1','#qfb2','#qfb3'].map(s=>$(s).value.trim()).filter(Boolean);if(!q||!a||!bad.length)return toast('צריך שאלה, תשובה נכונה ולפחות תשובה לא נכונה אחת');
    const o=shuffle([a,...bad]);addQ({t:'mcq',q,o,a:o.indexOf(a)});f.innerHTML='';};}
  if(t==='fill'){const cs=fillCands().filter(x=>!RQ.some(q=>q.q===x.q));if(!story())return toast('כתבו קודם את הסיפור');if(items.length<2)return toast('צריך לפחות 2 מילים ברשימה');if(!cs.length)return toast('לא מצאתי בסיפור משפטים עם מילים מהרשימה');
   f.innerHTML=`<div class="note stack"><b>➕ השלמה מהסיפור</b><span class="small">בחרו משפט – המילה מהרשימה תוסתר, והתלמידים יבחרו אותה.</span>${cs.slice(0,8).map((x,i)=>`<div class="mist"><div class="en" style="direction:ltr;text-align:left;flex:1">${esc(x.q)}</div><button class="btn ghost small" data-fc="${i}">➕</button></div>`).join('')}<button class="btn ghost small" id="qfx">סגירה</button></div>`;
   $$('[data-fc]').forEach(b=>b.onclick=()=>{if(addQ(cs[+b.dataset.fc]))b.outerHTML='<span>✅</span>';});}
  const x=$('#qfx');if(x)x.onclick=()=>{f.innerHTML='';};f.scrollIntoView({behavior:'smooth',block:'nearest'});};
 $$('[data-qadd]').forEach(b=>b.onclick=()=>form(b.dataset.qadd));
 $('#tlqs').onclick=async()=>{const txt=story();if(!txt)return toast('כתבו קודם את הסיפור');const b=$('#tlqs');let sug=[];
  if(aiReady()){b.disabled=true;b.innerHTML='<span class="loader"></span> חושב...';
   try{const r=await ai(`You are helping an English teacher in Israel. Here is her reading text for Hebrew-speaking school students. Do NOT change the text.
Text: <<${txt.slice(0,3000)}>>
Lesson words: ${lessonWords().slice(0,20).join(', ')}
Write 6 easy comprehension questions in simple English, based ONLY on the text: 2 true/false statements ("t":"tf", options ["True","False"], "a":0 if true, 1 if false), 2 multiple-choice questions ("t":"mcq", 4 short options), and 2 fill-in sentences taken from the text with one lesson word replaced by "_____" ("t":"fill", 4 options that are lesson words, one of them correct).
Return only JSON: {"questions":[{"t":"tf|mcq|fill","q":"...","o":["..."],"a":0}]} where "a" is the index of the correct option.`);
    sug=(r&&Array.isArray(r.questions)?r.questions:[]).map(q=>normQ(q)).filter(Boolean);}catch(e){}
   b.disabled=false;b.textContent='🪄 הצע שאלות';}
  if(!sug.length){sug=fillCands().slice(0,4);if(sug.length)toast('ה-AI לא זמין – הצעתי שאלות השלמה מהסיפור');}
  sug=sug.filter(x=>!RQ.some(q=>q.q===x.q));if(!sug.length)return toast('לא הצלחתי להציע שאלות כרגע');
  const f=$('#tlqf');f.innerHTML=`<div class="note stack"><b>🪄 הצעות – בחרי מה להוסיף</b><span class="small">הסיפור שלך לא משתנה. אפשר להוסיף רק חלק מהשאלות.</span>${sug.map((q,i)=>`<div class="mist"><div style="flex:1"><span class="pill" style="font-size:12px">${Q_HE[q.t]}</span><div class="en" style="direction:ltr;text-align:left">${esc(q.q)}</div><div class="small muted">✓ ${esc(q.t==='tf'?(q.a?'לא נכון (False)':'נכון (True)'):q.o[q.a])}</div></div><button class="btn ghost small" data-sg="${i}">➕</button></div>`).join('')}<div class="row"><button class="btn primary small" id="sgall">➕ הוספת הכול</button><button class="btn ghost small" id="qfx">סגירה</button></div></div>`;
  $$('[data-sg]').forEach(x=>x.onclick=()=>{if(addQ(sug[+x.dataset.sg]))x.outerHTML='<span>✅</span>';});
  $('#sgall').onclick=()=>{sug.forEach(q=>addQ(q));f.innerHTML='';};$('#qfx').onclick=()=>{f.innerHTML='';};};
 $('#tlrg').onclick=async()=>{if(items.length<2)return toast('הוסיפו קודם מילים');if(!aiReady())return toast('צריך חיבור ל-AI');if(story()&&!confirm('להחליף את הסיפור שכבר כתוב?'))return;const b=$('#tlrg');b.disabled=true;b.innerHTML='<span class="loader"></span> כותב...';
  try{const r=await makeReading(items.slice(0,15).map(w=>w.en),$('#tlrl').value);$('#tlrt').value=r.text||'';heFor=null;$('#tlhe').value='';RQ=(r.questions||[]).map(q=>normQ(q)).filter(Boolean).slice(0,6);drawQ();cov();toast('✅ הסיפור מוכן – אפשר לערוך');}catch(e){aiErr(e);}
  b.disabled=false;b.textContent='🪄 כתוב סיפור עם המילים';};
 const translate=async()=>{const txt=story();if(!txt)return'';const r=await ai(`Translate this English text into natural, simple Hebrew for school students. Keep the paragraph breaks.\nText: <<${txt.slice(0,3000)}>>\nReturn only JSON: {"he":"the Hebrew translation"}`);const he=String(r&&r.he||'').trim();if(he){$('#tlhe').value=he;heFor=txt;}return he;};
 $('#tlheg').onclick=async()=>{if(!story())return toast('כתבו קודם את הסיפור');if(!aiReady())return toast('צריך חיבור ל-AI');const b=$('#tlheg');b.disabled=true;b.innerHTML='<span class="loader"></span>';try{await translate();}catch(e){aiErr(e);}b.disabled=false;b.textContent='🪄 תרגם עכשיו';};
 $('#tlrcam').onchange=async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(!aiReady())return toast('צריך חיבור ל-AI');if(story()&&!confirm('להחליף את הסיפור שכבר כתוב בטקסט מהתמונה?')){e.target.value='';return;}
  $('#tlcov').innerHTML='<span class="loader"></span> קורא את הטקסט מהתמונה...';
  try{const r=await aiImage(`This is a photo of a page from an English textbook or worksheet. Copy the main English reading text (story or passage) exactly as written, keeping paragraph breaks. Do not include exercises, page numbers or Hebrew. Return only JSON: {"text":"the text"}`,(await shrink(f)).split(',')[1]);
   const txt=String(r&&r.text||'').trim().slice(0,3000);if(!txt){toast('לא מצאתי טקסט – נסו צילום ברור יותר');cov();}else{$('#tlrt').value=txt;heFor=null;$('#tlhe').value='';cov();toast('📸 הטקסט הועתק – בדקו שהכול נכון');}}
  catch(err){cov();if(err&&err.code==='old_server')toast('צריך לעדכן את השרת');else aiErr(err);}e.target.value='';};
 $('#tlcam').onchange=async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;if(!aiReady())return toast('צריך חיבור ל-AI');$('#tlst').innerHTML='<span class="loader"></span> קורא את הדף...';
  try{const got=(await photoToWords(f)).filter(x=>!items.some(y=>y.en.toLowerCase()===x.en.toLowerCase()));if(!got.length){$('#tlst').textContent='לא מצאתי מילים בתמונה – נסו צילום ברור יותר';return;}
   got.forEach(x=>{const fw=allWords().find(y=>y.en.toLowerCase()===x.en.toLowerCase());if(fw){x.he=x.he||fw.he;x.ex=fw.ex;}});
   await fillTranslations(got,(i,n)=>{$('#tlst').textContent=`מתרגם ${i}/${n}...`;});items=items.concat(got);$('#tlst').textContent=`📸 נמצאו ${got.length} מילים – בדקו את הרשימה למטה`;draw();}
  catch(err){$('#tlst').textContent='';if(err&&err.code==='old_server')toast('צריך לעדכן את השרת');else aiErr(err);}e.target.value='';};
 $('#tla').onclick=async()=>{const add=parseWordLines($('#tlt').value).filter(x=>!items.some(y=>y.en.toLowerCase()===x.en.toLowerCase()));if(!add.length)return toast('לא מצאתי מילים חדשות באנגלית');
  const b=$('#tla');b.disabled=true;b.innerHTML='<span class="loader"></span> מתרגם...';
  add.forEach(x=>{const f=allWords().find(y=>y.en.toLowerCase()===x.en.toLowerCase());if(f){x.he=x.he||f.he;x.ex=f.ex;}});
  await fillTranslations(add,(i,n)=>{$('#tlst').textContent=`מתרגם ${i}/${n}...`;});
  items=items.concat(add);$('#tlt').value='';$('#tlst').textContent='';b.disabled=false;b.textContent='🔄 הוסף ותרגם';draw();};
 $('#tlsend').onclick=async()=>{const name=$('#tln').value.trim();if(!name)return toast('תנו שם לרשימה');
  const miss=items.filter(w=>!w.he);if(miss.length)return toast('חסר תרגום ל: '+miss.map(w=>w.en).join(', '));
  const b=$('#tlsend');b.disabled=true;b.innerHTML='<span class="loader"></span>';
  const text=story(),tr=$('#tltr').checked;let textHe=($('#tlhe').value||'').trim();
  if(text&&tr&&(!textHe||(heFor!==null&&heFor!==text))&&aiReady()){b.innerHTML='<span class="loader"></span> מתרגם את הסיפור...';try{textHe=await translate();}catch(e){}}
  try{await api('/class/list/save',{code,key:c.key,list:{id:L?L.id:'',name,date:$('#tld').value||'',words:items,text,textHe:text?textHe:'',tr,questions:text?RQ:[]}});toast('✅ הרשימה נשלחה לכיתה!');openClass(code);}
  catch(e){if(e&&e.code==='not_found')toast('צריך לעדכן את השרת (worker.js)');else classErr(e);b.disabled=false;b.textContent='📤 שליחה לכיתה';}};
 draw();}
async function tlStats(code,id){
 const c=(S.teach||[]).find(x=>x.code===code);if(!c)return teacherHome();
 view(`<div class="card"><span class="loader"></span> טוען...</div>`,'tlstats');
 let r;try{r=await api('/class/list/stats',{code,key:c.key,id});}catch(e){classErr(e);return openClass(code);}
 const st=r.students.sort((a,b)=>(b.pct??-1)-(a.pct??-1));const avg=st.filter(s=>s.pct!=null);const av=avg.length?Math.round(avg.reduce((a,s)=>a+s.pct,0)/avg.length):0;
 const LT=(r.lists||[]).length;const nSt=LSTAGES.filter(x=>!x.opt).length+((G.lastView&&(G.lastView.lists||[]).find(l=>l.id===id)||{}).text?1:0);const fin=st.filter(s=>s.stages!=null&&s.stages>=nSt).length;
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" id="tsb">→</button><h2 style="margin:0">📊 ${esc(r.name)}</h2></div>
 <div class="grid" style="grid-template-columns:repeat(3,1fr)"><div class="card stat"><span class="muted small">מוכנות ממוצעת</span><b>${av}%</b></div><div class="card stat"><span class="muted small">התחילו</span><b>${avg.length}/${st.length}</b></div><div class="card stat"><span class="muted small">מילים</span><b>${r.n}</b></div></div>
 <div class="card stack"><h3>🔥 המילים הכי קשות לכיתה</h3>${r.hard.length?r.hard.map(h=>`<div class="lb"><span class="n">${h.n}</span><b class="en" style="flex:1">${esc(h.en)}</b><span>${esc(h.he)}</span>${spk(h.en,'sm')}</div>`).join('')+'<p class="small muted" style="margin:0">המספר = כמה תלמידים עוד מתקשים במילה. כדאי לחזור עליהן בשיעור.</p>':'<p class="small muted" style="margin:0">עוד אין מספיק נתונים. הם יופיעו אחרי שהתלמידים יתרגלו.</p>'}</div>
 <div class="card stat" style="text-align:center"><span class="muted small">סיימו את כל השיעור</span><b>${fin}/${st.length}</b></div>
 <div class="card"><h3>👥 לפי תלמיד</h3><div class="small muted" style="margin-bottom:6px">שלבים · ציון מבדק · מוכנות</div>${st.map(s=>`<div class="lb"><span style="flex:1">${esc(s.name)}</span><span class="small" style="min-width:52px">${s.stages!=null?s.stages+'/'+nSt:'—'}</span><span class="small" style="min-width:44px">${s.quiz!=null?'🏁'+s.quiz:'—'}</span>${s.pct==null?'<span class="small muted">עוד לא התחיל/ה</span>':`<div class="sbar" style="max-width:120px"><i style="width:${s.pct}%"></i></div><b style="width:44px;text-align:end">${s.pct}%</b>`}</div>`).join('')||'<p class="muted">אין תלמידים בכיתה.</p>'}
 <p class="small muted">הנתונים מתעדכנים כשהתלמידים פותחים את Tuki (עד כמה דקות עיכוב).</p></div></div>`,'tlstats');
 $('#tsb').onclick=()=>openClass(code);}



/* ===================================================================
   🔊 קול ברור ואיטי יותר
   הקול הטבעי מושמע עכשיו דרך נגן שמאט בלי לעוות את הצליל (שומר על גובה הקול),
   ומהירות ההקראה מההגדרות חלה גם עליו.
   =================================================================== */
const AEL=typeof Audio!=='undefined'?new Audio():null;let aelOk=false,myTok=0;
const EMPTY_WAV='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
function aelUnlock(){if(!AEL||aelOk)return;aelOk=true;try{AEL.muted=true;AEL.src=EMPTY_WAV;const p=AEL.play();if(p&&p.then)p.then(()=>{AEL.pause();AEL.muted=false;},()=>{AEL.muted=false;aelOk=false;});else AEL.muted=false;}catch(e){AEL.muted=false;aelOk=false;}}
addEventListener('pointerdown',aelUnlock,true);addEventListener('touchend',aelUnlock,true);addEventListener('keydown',aelUnlock,true);
const blobs=new Map();
function ttsURL(text){const ck=(S.settings.speaker||'luna')+'|'+text;if(blobs.has(ck))return blobs.get(ck);
 const p=withTimeout(fetch(PROXY_URL+'/tts?v='+encodeURIComponent(S.settings.speaker||'luna')+'&t='+encodeURIComponent(text)),10000).then(r=>{if(!r.ok)throw new Error('tts');return r.blob();}).then(b=>URL.createObjectURL(b));
 blobs.set(ck,p);p.catch(()=>blobs.delete(ck));return p;}
/* מילה בודדת מקבלת נקודה בסוף – כך היא נאמרת שלמה וברורה, בלי להיבלע */
const clearText=t=>{t=String(t).trim();return /^[A-Za-z][A-Za-z' -]{0,30}$/.test(t)?t+'.':t;};
function rateFor(slow){const r=+S.settings.rate||1;return slow?Math.max(0.55,Math.round(r*0.72*100)/100):r;}
const _speakOrig=speak,_stopOrig=stopSpeak;
window.speak=function(text,slow,onend){
 if(!text){onend&&onend();return;}
 if(!AEL||!naturalOn())return _speakOrig(text,slow,onend);
 const t=++myTok;const say=clearText(text);
 ttsURL(say).then(url=>{if(t!==myTok)return;_stopOrig(true);
  let done=false;const fin=()=>{if(done)return;done=true;onend&&onend();};
  try{AEL.pause();}catch(e){}
  AEL.onended=fin;AEL.onerror=()=>{if(t===myTok&&!done){done=true;_speakOrig(text,slow,onend);}};
  AEL.preservesPitch=true;AEL.webkitPreservesPitch=true;AEL.mozPreservesPitch=true;
  const rate=rateFor(slow);AEL.defaultPlaybackRate=rate;AEL.src=url;AEL.playbackRate=rate;
  const p=AEL.play();if(p&&p.catch)p.catch(()=>{if(t===myTok&&!done){done=true;_speakOrig(text,slow,onend);}});})
 .catch(()=>{if(t===myTok)_speakOrig(text,slow,onend);});};
window.stopSpeak=function(keep){myTok++;try{if(AEL){AEL.onended=null;AEL.pause();}}catch(e){}return _stopOrig(keep);};
window.prefetchTTS=function(t){if(AEL&&naturalOn()&&t)ttsURL(clearText(t)).catch(()=>{});};
/* ברירת מחדל: הקראה קצת איטית לתלמידים (אפשר לשנות בהגדרות) */
if(!S.settings.rateSet){S.settings.rate=0.85;S.settings.rateSet=true;save();}
const _settings3=window.settingsView;
window.settingsView=function(){_settings3();const sr=$('#sr');if(!sr)return;
 const opts=[[0.7,'🐢 איטי מאוד'],[0.8,'איטי'],[0.85,'קצת איטי (מומלץ)'],[1,'רגיל'],[1.15,'מהיר']];
 sr.innerHTML=opts.map(([v,l])=>`<option value="${v}" ${(+S.settings.rate)===v?'selected':''}>${l}</option>`).join('');
 sr.onchange=e=>{S.settings.rate=+e.target.value;S.settings.rateSet=true;save();speak('Hello! This is how I sound.');};};

/* ===================================================================
   🏫 מצב בית ספר – כניסה עם קוד, ורק התוכן של המורה
   (כל שאר התרגולים מוסתרים מהמסכים אבל לא נמחקו מהקוד)
   =================================================================== */
const SCHOOL=true;
const tTests=()=>(S.tests||[]).filter(t=>t.tid&&S.cls&&(t.cc||S.cls.code)===S.cls.code).sort((a,b)=>(b.tver||0)-(a.tver||0));
const tWords=()=>{const seen=new Set(),out=[];tTests().forEach(t=>examWords(t).forEach(w=>{if(!seen.has(w.en)){seen.add(w.en);out.push(w);}}));return out;};
function stateBlob(){try{const c=JSON.parse(JSON.stringify(S));c.settings=Object.assign({},c.settings,{aiKey:''});delete c.teach;delete c.tcode;delete c.tmode;delete c.cls;delete c.tacct;delete c.tlocal;const j=JSON.stringify(c);return j.length<1400000?j:null;}catch(e){return null;}}
function gateView(prefill,more,regMode){
 renderTop();
 view(`<div class="stack" style="max-width:520px;margin:0 auto">${more&&S.cls?`<div class="ses-head">${back()}<h2 style="margin:0">➕ הצטרפות לכיתה נוספת</h2></div>`:''}
 <div style="text-align:center"><img src="${LOGO}" alt="Tuki" style="width:96px;height:96px;border-radius:24px"><h1 style="margin:10px 0 0">ברוכים הבאים ל-Tuki</h1><p class="muted" style="margin:4px 0 0">מתרגלים אנגלית עם המילים מהשיעור 🦜</p></div>
 <div class="card stack"><h3>🧑‍🎓 אני תלמיד/ה</h3>
  <input class="inp en" id="gcode" placeholder="קוד כיתה מהמורה" value="${esc(prefill||'')}" autocomplete="off" style="text-transform:uppercase;font-size:20px;letter-spacing:2px">
  <input class="inp" id="gname" placeholder="השם שלך (שם פרטי)" autocomplete="off" value="${esc(more?(S.myName||''):'')}">
  <button class="btn primary" id="gjoin" style="font-size:19px">כניסה לכיתה</button>
  <details class="small"><summary class="muted">כבר נכנסתי ממכשיר אחר</summary><div class="stack" style="margin-top:10px"><p class="small" style="margin:0">מקלידים את קוד הכיתה (למעלה) ואת הקוד האישי שלך. המורה יכולה לראות אותו בלוח המורה.</p><div class="row"><input class="inp en" id="gpin" placeholder="קוד אישי" style="flex:1;text-transform:uppercase"><button class="btn ghost" id="grest">המשך מאיפה שעצרתי</button></div></div></details></div>
 <div class="card stack" ${more?'hidden':''}><h3>👩‍🏫 אני מורה</h3>
  <input class="inp en" id="tem" type="email" placeholder="מייל" autocomplete="username" dir="ltr"><input class="inp" id="tpw" type="password" placeholder="סיסמה" autocomplete="current-password" dir="ltr">
  <div id="treg" hidden class="stack"><input class="inp" id="tnm" placeholder="השם שלך (יופיע לתלמידים ולמנהל)"><input class="inp en" id="gt" placeholder="קוד מורה (מקבלים מ-Tuki)" autocomplete="off" style="text-transform:uppercase"></div>
  <div class="row"><button class="btn primary" id="gtgo">כניסה</button><button class="btn ghost small" id="tnew">אין לי חשבון – הרשמה</button></div><span class="small" id="gtres"></span></div></div>`,'gate');
 const busy=(b,on,txt)=>{b.disabled=on;b.innerHTML=on?'<span class="loader"></span>':txt;};
 $('#gjoin').onclick=async()=>{const code=$('#gcode').value.trim().toUpperCase(),name=$('#gname').value.trim();if(!code)return toast('צריך קוד כיתה');if(!name)return toast('כתבו את השם שלכם');
  const b=$('#gjoin');busy(b,true);
  if((S.classes||[]).some(c=>c.code===code)){toast('כבר הצטרפת לכיתה הזו');busy(b,false,'כניסה לכיתה');return;}
  try{const r=await api('/class/join',{code,name});if(S.cls){S.classes=S.classes||[];if(!S.classes.some(c=>c.code===S.cls.code))S.classes.push(S.cls);}S.cls={code,id:r.id,pin:r.pin||'',name:r.className,me:name,message:r.message||''};S.classes=S.classes||[];S.classes.push(S.cls);S.myName=name;S.placementDone=true;save();
   await syncClass(true);toast('🎉 ברוכים הבאים לכיתה '+r.className+'!');home();}
  catch(e){classErr(e);busy(b,false,'כניסה לכיתה');}};
 $('#grest').onclick=async()=>{const code=$('#gcode').value.trim().toUpperCase(),pin=$('#gpin').value.trim().toUpperCase();if(!code||!pin)return toast('צריך קוד כיתה וקוד אישי');
  const b=$('#grest');busy(b,true);
  try{const r=await api('/class/restore',{code,pin});
   if(r.state){try{const keep={teach:S.teach,tcode:S.tcode,tmode:S.tmode,tacct:S.tacct};S=merge(JSON.parse(r.state));Object.assign(S,keep);}catch(e){}}
   S.cls={code,id:r.id,pin,name:r.className,me:r.name,message:r.message||''};S.myName=r.name;S.placementDone=true;save();
   await syncClass(true);toast('👋 שלום '+r.name+'! ההתקדמות שלך חזרה');home();}
  catch(e){toast(e&&e.code==='bad_pin'?'הקוד האישי לא נכון':e&&(e.code==='not_found'||e.code==='bad_prompt')?'צריך לעדכן את השרת':'לא הצלחתי – בדקו את הקודים');busy(b,false,'המשך מאיפה שעצרתי');}};
 let reg=false;const tnew=()=>{reg=!reg;$('#treg').hidden=!reg;$('#gtgo').textContent=reg?'יצירת חשבון':'כניסה';$('#tnew').textContent=reg?'יש לי חשבון – כניסה':'אין לי חשבון – הרשמה';$('#tpw').setAttribute('autocomplete',reg?'new-password':'current-password');};$('#tnew').onclick=tnew;
 if(regMode){tnew();$('#gtres').innerHTML='<span class="small">👋 צרי חשבון מורה – הכיתות שכבר פתחת במכשיר הזה ייכנסו אליו אוטומטית.</span>';$('#tem').focus();}
 $('#gtgo').onclick=async()=>{const email=$('#tem').value.trim(),password=$('#tpw').value;const b=$('#gtgo'),lbl=b.textContent;if(!email||!password)return toast('צריך מייל וסיסמה');
  const E={bad_tcode:'קוד המורה לא נכון',bad_login:'מייל או סיסמה לא נכונים',email_taken:'כבר יש חשבון עם המייל הזה – לחצו "יש לי חשבון"',bad_email:'המייל לא תקין',short_pw:'סיסמה של 6 תווים לפחות',no_name:'כתבו את השם שלכם',rate_limited:'יותר מדי ניסיונות – נסו שוב בעוד דקה',not_found:'צריך לעדכן את השרת (worker.js)'};
  busy(b,true);
  try{const r=reg?await _api('/teacher/register',{email,password,name:$('#tnm').value.trim(),tcode:$('#gt').value.trim().toUpperCase()}):await _api('/teacher/login',{email,password});
   if(reg)S.tcode=$('#gt').value.trim().toUpperCase();setAcct(r);S.placementDone=true;save();toast('✅ ברוכה הבאה, '+r.name+'!');home();}
  catch(e){$('#gtres').innerHTML='<span style="color:var(--bad)">❌ '+(E[e&&e.code]||'אין חיבור לשרת')+'</span>';busy(b,false,lbl);}};}
function studentHome(){
 const ts=tTests(),t0=now();const all=tWords();
 const due=all.filter(w=>S.words[w.en]&&S.words[w.en].due<=t0);
 view(`<div class="stack">
 <div class="card hero"><div class="hero-row"><img src="${LOGO}" alt="" style="width:64px;height:64px;border-radius:18px"><div style="flex:1"><h2 style="margin:0;color:#fff">שלום ${esc(S.cls.me||'')}! 👋</h2><div class="muted">כיתה ${esc(S.cls.name||'')} · ${all.length} מילים בבנק המילים</div></div></div></div>
 ${S.cls.message?`<div class="note">📣 <b>מהמורה:</b> ${esc(S.cls.message)}</div>`:''}
 ${all.length>=2?`<button class="mod" style="min-height:auto;width:100%" onclick="open_('games')"><span class="ic">🎮</span><span class="t">משחקים</span><span class="d">Wordle, איש תלוי, זוגות ועוד – עם המילים שלך</span></button>`:''}
 ${all.length?`<button class="mod" id="drev" style="min-height:auto;width:100%"><span class="ic">🔁</span><span class="t">חזרה יומית</span><span class="d">${due.length?`${due.length} מילים מחכות לחזרה`:'אין מילים לחזרה היום ✅ – אפשר לחזור על הכול'}</span></button>`:''}
 <h3 style="margin:6px 0 0">📚 השיעורים שלי</h3>
 ${ts.length?ts.map((t,k)=>{const r=examReady(t),d=daysLeft(t.date);const stg=lessonStages(t),dn=stg.filter(x=>(t.st||{})[x.k]).length;return`<button class="mod" style="min-height:88px;width:100%" data-ex="${t.id}"><div class="row" style="width:100%"><span class="t">${dn===stg.length?'✅ ':''}${esc(t.name.replace(/^👩‍🏫\s*/,''))}${k===0&&!dn?' <span class="pill" style="font-size:12px">חדש</span>':''}</span><span class="pill" style="margin-inline-start:auto">${t.words.length} מילים</span></div>
  <div class="row" style="width:100%"><div class="sbar"><i style="width:${Math.round(dn/stg.length*100)}%"></i></div><b>${dn}/${stg.length}</b></div><span class="d">שלבים · מוכנות ${r}%${t.date&&d!==null?(d>=0?' · ⏰ '+(d===0?'להיום':'עוד '+d+' ימים'):' · '+daysTxt(d)):''}</span></button>`;}).join('')
  :`<div class="card stack" style="text-align:center"><div style="font-size:54px">🦜</div><b>עוד אין מילים מהמורה</b><p class="small muted" style="margin:0">ברגע שהמורה תשלח רשימת מילים, היא תופיע כאן.</p></div>`}
 <div class="row" style="justify-content:center"><button class="btn ghost small" id="schk">🔄 בדיקת עדכונים מהמורה</button></div>
 <p class="small muted" style="text-align:center;margin:0">הקוד האישי שלך: <b class="en">${esc(S.cls.pin||'—')}</b> · איתו נכנסים ממכשיר אחר</p></div>`,'home');
 $$('[data-ex]').forEach(b=>b.onclick=()=>lessonView(b.dataset.ex));
 const dr=$('#drev');if(dr)dr.onclick=()=>{const pick=(due.length?due:shuffle(all)).slice(0,10);runSession({title:'🔁 חזרה יומית',kind:'school-review',skill:'vocab',items:shuffle(pick).map((w,i)=>()=>makeVocabQ(w,['mcq','listen','spell'][i%3]))});};
 $('#schk').onclick=async()=>{const b=$('#schk');b.disabled=true;b.innerHTML='<span class="loader"></span>';await syncClass(true);toast('עודכן ✓');home();};}
ROUTES['school-review']=()=>home();
const _homeAll=window.home;
window.home=function(){if(!SCHOOL)return _homeAll();if(tmode())return teacherHome();if(!S.cls)return gateView();return studentHome();};
const _examHome=examHome;
window.examHome=function(){if(SCHOOL&&!tmode())return home();return _examHome();};
const _examView=examView;
window.examView=function(id){_examView(id);const t=(S.tests||[]).find(x=>x.id===id);if(SCHOOL&&t&&t.tid){const e=$('#exed');if(e)e.remove();const h=$('#app .ses-head h2');if(h)h.textContent='📚 '+t.name.replace(/^👩‍🏫\s*/,'');}};
/* תלמיד שיצא מהכיתה או שהכיתה נמחקה – חוזר למסך הכניסה */
const _settings2=window.settingsView;
window.settingsView=function(){_settings2();if(!SCHOOL)return;
 const ac=$('#app .card');
 $$('#app .card').forEach(c=>{const h=c.querySelector('h3');if(h&&/הצטרפות לכיתה/.test(h.textContent))c.remove();});
 if(S.cls){const code=S.cls.code;const l=$('#clleave');if(l)l.addEventListener('click',()=>later(()=>{const y=$('#clleave2');if(y)y.addEventListener('click',()=>later(()=>{S.classes=(S.classes||[]).filter(c=>c.code!==code);S.tests=(S.tests||[]).filter(t=>!t.tid||t.cc!==code);S.cls=S.classes[0]||null;save();home();},50));},50));}};
/* לוח המורה: קודים אישיים + קישור הזמנה לאתר */
const _openClass2=window.openClass;
window.openClass=async function(code){await _openClass2(code);if(currentView!=='class'||!G.lastView)return;
 const r=G.lastView;const sh=$('#cshare');
 if(sh)sh.onclick=async()=>{const txt=`הצטרפו לכיתה "${r.name}" ב-Tuki 🦜\n1. היכנסו ל: ${SITE}#join=${code}\n2. כתבו את השם שלכם ולחצו "כניסה לכיתה"\n(קוד הכיתה: ${code})`;
  try{await navigator.clipboard.writeText(txt);toast('✅ ההזמנה הועתקה – הדביקו בוואטסאפ של הכיתה');}catch(e){if(navigator.share)navigator.share({text:txt}).catch(()=>{});else toast('קוד הכיתה: '+code);}};
 const st=(r.students||[]);if(!st.length)return;const tl=$('#tlists');
 (tl||$('#app .stack > .card')).insertAdjacentHTML('afterend',`<details class="card"><summary><b>🔑 קודים אישיים של התלמידים</b> <span class="small muted">– לכניסה ממכשיר אחר</span></summary><div style="margin-top:8px">${st.map(x=>`<div class="lb"><span style="flex:1">${esc(x.name||'?')}</span><b class="en" style="letter-spacing:2px">${esc(x.pin||'יופיע אחרי הכניסה הבאה')}</b></div>`).join('')}</div></details>`);};
/* שמירת התקדמות גם ביציאה מהאפליקציה */
document.addEventListener('visibilitychange',()=>{if(document.hidden&&S.cls)syncClass(true);});


/* ===================================================================
   📚 שיעור מודרך – שלבים לכל רשימה של המורה
   =================================================================== */
const LSTAGES=[
 {k:'learn',ic:'👋',t:'הכרות',d:'שומעים וקוראים כל מילה, עם משפט לדוגמה',he:'מכירים את המילים החדשות. לחצו על הרמקול כדי לשמוע כל מילה.'},
 {k:'listen',ic:'🎧',t:'שמיעה',d:'שומעים מילה ובוחרים את התרגום',he:'שמעו את המילה ובחרו את התרגום הנכון.'},
 {k:'speak',ic:'🎤',t:'דיבור',d:'אומרים כל מילה בקול',he:'הקשיבו למילה, ואמרו אותה בקול.'},
 {k:'spell',ic:'✍️',t:'איות',d:'שומעים וכותבים באנגלית',he:'שמעו את המילה וכתבו אותה באנגלית.'},
 {k:'game',ic:'🎮',t:'משחק',d:'משחק זוגות עם המילים',he:'מצאו את הזוגות: מילה באנגלית והתרגום שלה.'},
 {k:'read',ic:'📖',t:'סיפור',d:'סיפור קצר עם המילים, ושאלות קלילות',he:'קראו את הסיפור. לחצו על מילה מודגשת כדי לראות מה היא אומרת. אחר כך ענו על השאלות.',opt:true},
 {k:'sentence',ic:'💬',t:'משפט משלי',d:'כותבים משפט עם המילה',he:'כתבו משפט באנגלית עם המילה.'},
 {k:'quiz',ic:'🏁',t:'מבדק',d:'בודקים מה למדנו',he:'מבדק קצר על כל המילים. בהצלחה!'}];
function lessonStages(t){return LSTAGES.filter(x=>!x.opt||(x.k==='read'&&t.text));}
const findT=id=>(S.tests||[]).find(x=>x.id===id);
/* התרגום והמשפט של המורה גוברים על מה שכתוב במאגר של האפליקציה */
const _examWords=examWords;
window.examWords=function(t){const ws=_examWords(t);if(!t||!t.tw)return ws;return ws.map(w=>{const o=t.tw[w.en.toLowerCase()];return o?Object.assign({},w,{he:o.he||w.he,ex:o.ex||w.ex}):w;});};
let syncT=null;function syncSoon(){clearTimeout(syncT);syncT=setTimeout(()=>{if(S.cls)syncClass(true);},1500);}
function stageDone(t,k,score){if(!t)return;t.st=t.st||{};const first=!t.st[k];t.st[k]=1;if(k==='quiz'&&score!=null)t.quiz=score;save();syncSoon();
 if(first&&lessonStages(t).every(x=>t.st[x.k]))setTimeout(()=>toast('🎉 סיימת את כל השיעור!'),300);}
function sayHe(text){if(!S.settings.heVoice||!window.speechSynthesis||!text)return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='he-IL';u.rate=0.95;speechSynthesis.speak(u);}catch(e){}}
function lessonView(id){
 LESSON=null;const t=findT(id);if(!t)return home();const st=lessonStages(t);t.st=t.st||{};const done=st.filter(x=>t.st[x.k]).length;const next=st.find(x=>!t.st[x.k]);const d=daysLeft(t.date);
 view(`<div class="stack"><div class="ses-head">${back()}<h2 style="margin:0">📚 ${esc(t.name)}</h2></div>
 <div class="card hero stack"><div class="row" style="justify-content:space-between"><b style="font-size:20px">${done}/${st.length} שלבים</b><span>${t.words.length} מילים · מוכנות ${examReady(t)}%</span></div>
 <div style="height:10px;background:rgba(255,255,255,.25);border-radius:9px;overflow:hidden"><i style="display:block;height:100%;width:${Math.round(done/st.length*100)}%;background:#fff"></i></div>
 ${t.date&&d!==null?`<div class="small">${d>=0?'⏰ להגשה '+(d===0?'היום':'עוד '+d+' ימים'):daysTxt(d)}</div>`:''}
 ${next?`<button class="btn light" id="lnext" style="font-size:19px">▶️ ${done?'ממשיכים':'מתחילים'}: ${next.ic} ${next.t}</button>`:'<div style="font-size:20px;font-weight:700">🎉 סיימת את השיעור! אפשר לחזור על כל שלב.</div>'}</div>
 <div class="stack">${st.map((x,i)=>`<button class="mod" style="min-height:auto;width:100%;${next===x?'border:2px solid var(--pri)':''}" data-st="${x.k}"><div class="row" style="width:100%"><span class="ic" style="font-size:24px">${t.st[x.k]?'✅':x.ic}</span><span class="t">${i+1}. ${x.t}</span>${x.k==='quiz'&&t.quiz!=null?`<span class="pill" style="margin-inline-start:auto">ציון ${t.quiz}</span>`:''}</div><span class="d">${x.d}</span></button>`).join('')}</div>
 <div class="row"><button class="btn ghost" id="lcards">🃏 כרטיסיות</button><button class="btn ghost" id="lwords">📋 כל המילים</button></div></div>`,'lesson');
 const nb=$('#lnext');if(nb)nb.onclick=()=>runStage(id,next.k);
 $$('[data-st]').forEach(b=>b.onclick=()=>runStage(id,b.dataset.st));
 $('#lcards').onclick=()=>examCards(id,0,false);$('#lwords').onclick=()=>_examView(id);}
window.tkLesson=lessonView;
function runStage(id,k){
 const t=findT(id);if(!t)return home();const ws=examWords(t);if(!ws.length)return lessonView(id);
 const sg=LSTAGES.find(x=>x.k===k);sayHe(sg&&sg.he);
 const sess=(skill,items,after)=>runSession({title:`${sg.ic} ${sg.t} · ${t.name}`,kind:'lesson-'+id,skill,items,onDone:ses=>{if(ses.answered)after?after(ses):stageDone(t,k);}});
 if(k==='learn')return lessonLearn(id,0);
 if(k==='listen')return sess('listening',shuffle(ws).slice(0,10).map(w=>()=>makeVocabQ(w,'listen')));
 if(k==='speak'){if(!dictCap){stageDone(t,k);toast('אין כאן מיקרופון – דילגנו על שלב הדיבור');return lessonView(id);}
  return sess('speaking',shuffle(ws).slice(0,8).map(w=>()=>makeShadowQ(w.en,S.level)));}
 if(k==='spell')return sess('vocab',shuffle(ws).slice(0,10).map(w=>()=>makeVocabQ(w,'spell')));
 if(k==='game'){if(ws.length<3){stageDone(t,k);toast('צריך לפחות 3 מילים למשחק');return lessonView(id);}LESSON={id,k};return gMemory();}
 if(k==='read')return readingStage(id);
 if(k==='sentence'){if(S.cls&&S.cls.ai!==false&&aiReady())return sentenceAI(id);
  const ex=ws.filter(w=>w.ex&&w.ex.split(' ').length>=3&&w.ex.split(' ').length<=12);if(!ex.length){stageDone(t,k);return lessonView(id);}
  LESSON={id,k};return sentenceGame(shuffle(ex).slice(0,4).map(w=>({en:[w.ex],he:[`בנו משפט עם המילה <b class="en">${esc(w.en)}</b> (${esc(w.he)})`],raw:true})));}
 if(k==='quiz'){const types=['mcq','spell','listen'];return sess('vocab',shuffle(ws).slice(0,20).map((w,i)=>()=>makeVocabQ(w,types[i%3])),ses=>stageDone(t,'quiz',Math.round(ses.ok/Math.max(1,ses.answered)*100)));}}
function lessonLearn(id,i){
 const t=findT(id);const ws=examWords(t);if(!ws.length)return lessonView(id);
 if(i>=ws.length){ws.forEach(w=>{if(!S.words[w.en])S.words[w.en]={box:0,due:now(),ok:0,bad:0};});addXP(5);stageDone(t,'learn');return lessonView(id);}
 const w=ws[i];
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" onclick="tkLesson('${id}')">✕</button><div class="bar"><i style="width:${(i+1)/ws.length*100}%"></i></div><span class="muted small">${i+1}/${ws.length}</span></div>
 <div class="card stack" style="text-align:center;padding:30px 16px"><div class="wotd" style="justify-content:center"><span class="big en">${esc(w.en)}</span>${spk(w.en)}${spkSlow(w.en)}</div><div class="he-big">${esc(w.he)}</div>
 ${w.ex?`<div class="ex en" style="justify-content:center">${esc(w.ex)} ${spk(w.ex,'sm')}</div>`:''}</div>
 <div class="row" style="justify-content:center">${i?`<button class="btn ghost" id="lp">→ הקודמת</button>`:''}<button class="btn primary" id="ln" style="font-size:19px">${i===ws.length-1?'סיימתי ✓':'הבאה ←'}</button></div></div>`,'learn');
 later(()=>speak(w.en),250);
 $('#ln').onclick=()=>lessonLearn(id,i+1);const p=$('#lp');if(p)p.onclick=()=>lessonLearn(id,i-1);}
function sentenceAI(id){
 const t=findT(id);const ws=shuffle(examWords(t)).slice(0,4);let i=0,good=0;
 const step=()=>{if(i>=ws.length){addXP(10+good*5);stageDone(t,'sentence');
   return view(`<div class="card stack" style="text-align:center"><div style="font-size:54px">💬</div><h2>כתבת ${ws.length} משפטים!</h2><p style="margin:0">${good} מהם היו נכונים מהפעם הראשונה</p><button class="btn primary" onclick="tkLesson('${id}')">← חזרה לשיעור</button></div>`,'sentence');}
  const w=ws[i++];let tries=0;
  view(`<div class="stack"><div class="ses-head"><button class="iconbtn" onclick="tkLesson('${id}')">✕</button><div class="bar"><i style="width:${(i-1)/ws.length*100}%"></i></div><span class="pill">${i}/${ws.length}</span></div>
  <div class="card stack"><p class="muted" style="margin:0">כתבו משפט באנגלית עם המילה:</p><div class="wotd"><span class="big en">${esc(w.en)}</span>${spk(w.en)}</div><div style="font-size:18px">${esc(w.he)}</div>
  <textarea class="inp en" id="sx" dir="ltr" placeholder="Write your sentence here..." style="min-height:90px;text-align:left"></textarea>
  <div class="row"><button class="mic needs-mic" id="smic" style="padding:11px 14px">🎤</button><button class="btn primary" id="sc">✓ בדיקה</button><button class="btn ghost" id="sh">💡 רעיון</button></div><div id="sf"></div></div></div>`,'sentence');
  const mb=$('#smic');mb.onclick=()=>toggleListen(mb,x=>{$('#sx').value=x;},x=>{if(x)$('#sx').value=x;});
  $('#sh').onclick=()=>{$('#sf').innerHTML=w.ex?`<div class="note">💡 למשל: <span class="en">${esc(w.ex)}</span><br><span class="small">עכשיו נסו לכתוב משפט משלכם!</span></div>`:'<div class="note">💡 נסו לכתוב משהו על עצמכם, למשל: I like... / I have... / Yesterday I...</div>';};
  $('#sc').onclick=async()=>{const txt=$('#sx').value.trim();if(txt.split(/\s+/).length<3)return toast('כתבו משפט של 3 מילים לפחות');
   const b=$('#sc');b.disabled=true;b.innerHTML='<span class="loader"></span>';tries++;let r;
   try{r=await ai(`You are a kind English teacher for a Hebrew-speaking student (English level ${S.level}). The student had to write ONE English sentence using the word "${w.en}" (meaning in Hebrew: ${w.he}).
Student's sentence: <<${txt.slice(0,400)}>>
Check if the sentence uses the word (any form, e.g. plural or past) with the right meaning, and if the grammar is correct. Ignore small punctuation or capitalization mistakes.
Return only JSON: {"ok": true or false, "uses_word": true or false, "corrected": "the corrected sentence (the same sentence if it is already correct)", "feedback_he": "1-2 short, encouraging sentences in Hebrew: what is good, or exactly what to fix"}`);}
   catch(e){const stem=w.en.split(' ')[0].replace(/[^a-z]/gi,'');const has=new RegExp('\\b'+stem.slice(0,Math.max(3,stem.length-2)),'i').test(txt);r={ok:has,uses_word:has,corrected:txt,feedback_he:has?'כל הכבוד! (לא הצלחתי לבדוק דקדוק כרגע)':'נראה שהמשפט לא כולל את המילה '+w.en};}
   b.disabled=false;b.textContent='✓ בדיקה';const ok=!!(r&&r.ok&&r.uses_word!==false);if(ok&&tries===1)good++;buzz(ok?'good':'bad');
   $('#sf').innerHTML=`<div class="fb ${ok?'good':'bad'}"><div class="fb-h">${ok?'מצוין! ✓':'כמעט…'}</div><div>${esc(r.feedback_he||'')}</div>
   ${!ok&&r.corrected&&normEn(r.corrected)!==normEn(txt)?`<div class="corr en" style="direction:ltr;text-align:left">✅ ${esc(r.corrected)} ${spk(r.corrected,'sm')}</div>`:''}
   <div class="fbtn">${ok?'':'<button class="btn ghost" id="stry">✏️ לתקן ולנסות שוב</button>'}<button class="btn primary" id="snx">${ok?'המשך ←':'דלג ←'}</button></div></div>`;
   $('#snx').onclick=step;const st=$('#stry');if(st)st.onclick=()=>{$('#sf').innerHTML='';$('#sx').focus();};
   if(ok)speak(txt);};};
 step();}
/* 📖 הסיפור של השיעור – התלמיד קורא, לוחץ על מילים, ועונה על שאלות קלילות */
const reEsc=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const qType=q=>q&&q.t?q.t:(q&&q.o&&q.o.length===2&&/^true$/i.test(q.o[0])&&/^false$/i.test(q.o[1])?'tf':/_{3,}/.test(q&&q.q||'')?'fill':'mcq');
const Q_HE={tf:'נכון / לא נכון',mcq:'בחירה',fill:'השלמה'};
function normQ(q,words){
 if(!q||!q.q)return null;const t=['tf','mcq','fill'].includes(q.t)?q.t:qType(q);let o=(Array.isArray(q.o)?q.o:[]).map(x=>String(x||'').trim()).filter(Boolean).slice(0,4);let a=Math.max(0,Math.min(3,+q.a||0));
 let text=String(q.q).trim();
 if(t==='tf'){o=['True','False'];a=(q.a===1||q.a==='1'||q.a===false||/^false$/i.test(String(q.answer||'')))?1:0;}
 if(t==='fill'){if(!/_{3,}/.test(text))return null;text=text.replace(/_{3,}/,'_____');}
 if(o.length<2||a>=o.length)return null;return{t,q:text.slice(0,200),o,a};}
function storyHTML(t,ws){
 let html=esc(t.text);if(!ws.length)return html.replace(/\n/g,'<br>');
 const idx={};ws.forEach((w,i)=>{idx[w.en.toLowerCase()]=i;});
 const alts=ws.map(w=>w.en).sort((a,b)=>b.length-a.length).map(reEsc).join('|');
 html=html.replace(new RegExp('\\b('+alts+')(?:s|es|ed|d|ing)?\\b','gi'),(m,base)=>`<span class="hl" data-wi="${idx[base.toLowerCase()]}">${m}</span>`);
 return html.replace(/\n/g,'<br>');}
function readingStage(id){
 const t=findT(id);if(!t||!t.text){stageDone(t,'read');return lessonView(id);}
 const ws=examWords(t);const qs=(t.qs||[]).map(q=>normQ(q)).filter(Boolean);let qi=0,okc=0;
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" onclick="tkLesson('${id}')">✕</button><h2 style="margin:0;font-size:19px">📖 סיפור · ${esc(t.name)}</h2></div>
 <div class="card stack"><div class="story en" style="direction:ltr;text-align:left;font-size:20px;line-height:1.9">${storyHTML(t,ws)}</div>
 <div id="wpop" class="wpop" hidden></div>
 <div class="row"><button class="btn primary" id="rd">🔊 הקראה</button><button class="btn ghost" id="rds">🐢 לאט</button>${t.tr!==false?'<button class="btn ghost" id="rtr">🇮🇱 תרגום</button>':''}</div>
 <div id="rhe" class="note" style="direction:rtl;text-align:right;line-height:1.8" hidden></div>
 <p class="small muted" style="margin:0">👆 לחצו על מילה מודגשת כדי לראות מה היא אומרת ולשמוע אותה.</p></div>
 <div class="card stack" id="qq"></div></div>`,'reading');
 $('#rd').onclick=()=>speak(t.text.slice(0,1150));$('#rds').onclick=()=>speak(t.text.slice(0,1150),true);
 $$('.story .hl').forEach(s=>s.onclick=()=>{const w=ws[+s.dataset.wi];if(!w)return;$$('.story .hl.on').forEach(x=>x.classList.remove('on'));s.classList.add('on');
  const p=$('#wpop');p.hidden=false;p.innerHTML=`<span class="en" style="font-size:22px;font-weight:800">${esc(w.en)}</span> <span style="font-size:20px">= ${esc(w.he)}</span> ${spk(w.en,'sm')}${spkSlow(w.en)}`;speak(w.en);});
 const tr=$('#rtr');if(tr)tr.onclick=async()=>{const box=$('#rhe');if(!box.hidden){box.hidden=true;tr.textContent='🇮🇱 תרגום';return;}
  if(!t.textHe){if(!aiReady())return toast('התרגום לא זמין כרגע');tr.disabled=true;tr.innerHTML='<span class="loader"></span>';
   try{const r=await ai(`Translate this English text into natural, simple Hebrew for school students. Keep the paragraph breaks.\nText: <<${t.text.slice(0,3000)}>>\nReturn only JSON: {"he":"the Hebrew translation"}`);t.textHe=String(r&&r.he||'').trim();save();}catch(e){}
   tr.disabled=false;tr.textContent='🇮🇱 תרגום';if(!t.textHe)return toast('התרגום לא זמין כרגע – נסו שוב');}
  box.innerHTML='<b>🇮🇱 תרגום:</b><br>'+esc(t.textHe).replace(/\n/g,'<br>');box.hidden=false;tr.textContent='🙈 הסתרת התרגום';};
 const finish=()=>{const box=$('#qq');addXP(10+okc*5);stageDone(t,'read');const stars=qs.length?(okc===qs.length?'⭐⭐⭐':okc>=qs.length/2?'⭐⭐':'⭐'):'⭐⭐⭐';
  box.innerHTML=`<div style="text-align:center"><div style="font-size:44px">${stars}</div><h3 style="margin:4px 0">🎉 סיימת את הסיפור!</h3>${qs.length?`<p style="margin:0">${okc} מתוך ${qs.length} תשובות נכונות</p>`:''}</div><button class="btn primary" onclick="tkLesson('${id}')">← חזרה לשיעור</button>`;buzz('good');};
 const showQ=()=>{const box=$('#qq');if(qi>=qs.length)return finish();const q=qs[qi];const T=q.t;
  const head=T==='tf'?'נכון או לא נכון?':T==='fill'?'השלימו את המילה החסרה:':'בחרו את התשובה הנכונה:';
  const qtxt=T==='fill'?esc(q.q).replace('_____','<span class="blank">_____</span>'):esc(q.q);
  const labels=T==='tf'?['✓ True · נכון','✗ False · לא נכון']:q.o;
  box.innerHTML=`<div class="row" style="justify-content:space-between"><h3 style="margin:0">❓ שאלה ${qi+1}/${qs.length}</h3><span class="pill">${Q_HE[T]}</span></div><div class="small muted">${head}</div>
  <div class="en" style="font-size:19px;direction:ltr;text-align:left">${qtxt} ${T!=='fill'?spk(q.q,'sm'):''}</div><div class="opts">${labels.map(o=>`<button class="opt ${T==='tf'?'':'en'}" style="${T==='tf'?'':'direction:ltr;text-align:left'}">${esc(o)}</button>`).join('')}</div><div id="qfb"></div>`;
  $$('#qq .opt').forEach((b,k)=>b.onclick=()=>{lockOpts(box,+q.a,k);const ok=k===+q.a;if(ok){okc++;buzz('good');}else buzz('bad');
   const full=T==='fill'?q.q.replace('_____',q.o[q.a]):'';if(full&&ok)speak(full);
   $('#qfb').innerHTML=ok?'<div class="fb good"><div class="fb-h">נכון! ✓</div></div>':`<div class="fb bad"><div class="fb-h">התשובה הנכונה: <span class="en">${esc(T==='tf'?(q.a?'False · לא נכון':'True · נכון'):q.o[q.a])}</span></div>${full?`<div class="en" style="direction:ltr;text-align:left">${esc(full)}</div>`:''}</div>`;
   qi++;later(showQ,ok?1200:2600);});};
 const qq=$('#qq');
 qq.innerHTML=`<p style="margin:0">${qs.length?`אחרי שקראתם, יש ${qs.length} שאלות קלילות על הסיפור 🙂`:'קראתם? כל הכבוד!'}</p><button class="btn primary" id="rgo" style="font-size:19px">${qs.length?'✓ קראתי – לשאלות':'✓ קראתי'}</button>`;
 $('#rgo').onclick=()=>{if(qs.length)showQ();else finish();};}
const _open3=window.open_;
window.open_=function(id){if(typeof id==='string'&&id.indexOf('lesson-')===0)return lessonView(id.slice(7));return _open3(id);};

/* ===================================================================
   👩‍🏫 כלים למורה: מצלמה לרשימה, קטע קריאה, דף עבודה להדפסה, דוחות להורים, AI לכיתה
   =================================================================== */
async function photoToWords(file){
 const url=await shrink(file);const r=await aiImage(`This is a photo of a page with English vocabulary (a textbook page, worksheet or whiteboard) for Hebrew-speaking students.
Extract the English vocabulary words or short phrases that are meant to be learned (not every word on the page). If a Hebrew translation appears next to a word, include it.
Return only JSON: {"words":[{"en":"word","he":"Hebrew translation or empty string"}]} with at most 40 items.`,url.split(',')[1]);
 return (r&&Array.isArray(r.words)?r.words:[]).map(w=>({en:String(w.en||'').replace(/[^\w\s'’-]/g,'').trim(),he:String(w.he||'').trim()})).filter(w=>w.en&&!HEB.test(w.en));}
async function makeReading(words,lvl){
 return await ai(`Write a short, simple, original reading passage in English for Hebrew-speaking school students at CEFR level ${lvl}. Length: ${{A1:'50-70',A2:'70-100',B1:'100-140',B2:'140-180'}[lvl]||'80-110'} words.
It MUST use these words: ${words.join(', ')}.
Then write 5 easy comprehension questions in simple English: 2 true/false statements ("t":"tf", options ["True","False"], "a":0 if true, 1 if false), 2 multiple-choice questions ("t":"mcq", 4 short options), and 1 fill-in sentence taken from the passage with one of the words replaced by "_____" ("t":"fill", 4 options from the word list).
Return only JSON: {"text":"the passage","questions":[{"t":"tf|mcq|fill","q":"question","o":["a","b","c","d"],"a":0}]} where "a" is the index of the correct option.`);}
function printSheet(L){
 const ws=L.words.filter(w=>w.en&&w.he);const A=shuffle(ws).slice(0,10),letters='אבגדהוזחטיכלמנסעפצקר';const heS=shuffle(A.slice());
 const rx=w=>new RegExp('\\b'+w.en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','i');
 const B=shuffle(ws).slice(0,8);const C=shuffle(ws.filter(w=>w.ex&&rx(w).test(w.ex))).slice(0,6);
 const blank=w=>esc(w.ex.replace(rx(w),'@@')).replace('@@','__________');
 view(`<div class="stack"><div class="row noprint"><button class="btn ghost" id="pb">→ חזרה</button><button class="btn primary" onclick="window.print()">🖨️ הדפסה / שמירה כ-PDF</button><button class="btn ghost" id="psh">🔀 ערבוב מחדש</button></div>
 <div class="sheet"><h2>📝 ${esc(L.name)}</h2><div class="row" style="justify-content:space-between"><span>שם: ____________________</span><span>כיתה: ________</span><span>תאריך: ____________</span></div>
 <h3>א. התאימו בין המילה לתרגום – כתבו את האות המתאימה</h3><div class="row" style="align-items:flex-start;gap:30px"><div style="flex:1">${A.map((w,i)=>`<div class="pline">${i+1}. <span class="en">${esc(w.en)}</span> ____</div>`).join('')}</div><div style="flex:1">${heS.map((w,i)=>`<div class="pline">${letters[i]}. ${esc(w.he)}</div>`).join('')}</div></div>
 <h3>ב. תרגמו לאנגלית</h3>${B.map((w,i)=>`<div class="pline">${i+1}. ${esc(w.he)} – ________________________</div>`).join('')}
 ${C.length?`<h3>ג. השלימו את המשפט במילה המתאימה</h3><div class="en" style="direction:ltr;text-align:left;margin-bottom:6px">Word bank: ${shuffle(C.map(w=>w.en)).map(esc).join(' · ')}</div>${C.map((w,i)=>`<div class="pline en" style="direction:ltr;text-align:left">${i+1}. ${blank(w)}</div>`).join('')}`:''}
 <h3>${C.length?'ד':'ג'}. כתבו משפט באנגלית עם שתיים מהמילים</h3><div class="pline">1. ____________________________________________</div><div class="pline">2. ____________________________________________</div></div>
 <div class="sheet pb"><h2>🔑 תשובות – ${esc(L.name)}</h2><h3>א.</h3><div>${A.map((w,i)=>`${i+1}–${letters[heS.indexOf(w)]}`).join(' · ')}</div><h3>ב.</h3>${B.map((w,i)=>`<div>${i+1}. <span class="en">${esc(w.en)}</span></div>`).join('')}${C.length?`<h3>ג.</h3>${C.map((w,i)=>`<div>${i+1}. <span class="en">${esc(w.en)}</span></div>`).join('')}`:''}</div></div>`,'print');
 $('#pb').onclick=()=>G.backTo?G.backTo():home();$('#psh').onclick=()=>printSheet(L);}
function parentReports(code){
 const r=G.lastView;if(!r)return openClass(code);const st=(r.students||[]).slice().sort((a,b)=>String(a.name).localeCompare(String(b.name),'he'));
 const txt=s=>{const lr=Object.values(s.lr||{});const avg=lr.length?Math.round(lr.reduce((a,b)=>a+b,0)/lr.length):null;
  return `שלום, עדכון על ${s.name} באנגלית (Tuki 🦜, כיתה ${r.name}):\n• תרגול ב-7 הימים האחרונים: ${s.week||0} נקודות\n• מילים שנלמדו: ${s.words||0}\n• רצף ימי תרגול: ${s.streak||0}\n${avg!=null?`• מוכנות ממוצעת לרשימות המילים: ${avg}%\n`:''}• תרגול אחרון: ${fmtAgo(s.last)}\n\nכל הכבוד על ההשקעה! 👏`;};
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" id="prb">→</button><h2 style="margin:0">👨‍👩‍👧 דוחות להורים</h2></div>
 <p class="muted" style="margin-top:-6px">לוחצים "וואטסאפ" ליד כל תלמיד, בוחרים את ההורה ושולחים. מספרי הטלפון לא נשמרים ב-Tuki.</p>
 <div class="card">${st.map((s,i)=>`<div class="lb"><span style="flex:1"><b>${esc(s.name||'?')}</b><div class="small muted">${s.week||0} נק׳ השבוע · ${fmtAgo(s.last)}</div></span><button class="btn ghost" style="padding:6px 10px" data-pw="${i}">💬 וואטסאפ</button><button class="btn ghost" style="padding:6px 10px" data-pc="${i}">📋</button></div>`).join('')||'<p class="muted">אין עדיין תלמידים.</p>'}</div></div>`,'parents');
 $('#prb').onclick=()=>openClass(code);
 $$('[data-pw]').forEach(b=>b.onclick=()=>window.open('https://wa.me/?text='+encodeURIComponent(txt(st[+b.dataset.pw])),'_blank'));
 $$('[data-pc]').forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(txt(st[+b.dataset.pc]));toast('הועתק ✓');}catch(e){toast('לא הצלחתי להעתיק');}});}
const _openClass3=window.openClass;
window.openClass=async function(code){await _openClass3(code);if(currentView!=='class'||!G.lastView)return;
 const r=G.lastView,c=(S.teach||[]).find(x=>x.code===code);G.backTo=()=>openClass(code);
 const tl=$('#tlists');
 if(tl){$$('#tlists [data-ls]').forEach(b=>{const id=b.dataset.ls;b.insertAdjacentHTML('afterend',`<button class="btn ghost" style="padding:6px 10px" data-lp="${id}" title="דף עבודה להדפסה">🖨️</button>`);});
  $$('[data-lp]').forEach(b=>b.onclick=()=>{const L=(r.lists||[]).find(l=>l.id===b.dataset.lp);if(L)printSheet(L);});}
 (tl||$('#app .stack > .card')).insertAdjacentHTML('afterend',`<div class="card stack"><h3>⚙️ הגדרות הכיתה</h3>
  <label class="set">💬 "משפט משלי" עם בדיקת AI<input type="checkbox" id="cai" ${r.ai!==false?'checked':''}></label>
  <p class="small muted" style="margin:0">כשכבוי – התלמידים בונים משפט ממילים נתונות, בלי AI (מתאים לכיתות צעירות).</p>
  <button class="btn ghost" id="cpar">👨‍👩‍👧 דוחות להורים</button></div>`);
 $('#cai').onchange=async e=>{try{await api('/class/settings',{code,key:c.key,ai:e.target.checked});toast(e.target.checked?'✅ בדיקת AI הופעלה':'בדיקת AI כובתה');}catch(err){e.target.checked=!e.target.checked;classErr(err);}};
 $('#cpar').onclick=()=>parentReports(code);};
const _api2=window.api;
window.api=async function(path,body){const r=await _api2(path,body);if(path==='/class/progress'&&r&&S.cls&&typeof r.ai==='boolean'&&S.cls.ai!==r.ai){S.cls.ai=r.ai;save();}return r;};

/* ===================================================================
   ♿ נגישות
   =================================================================== */
function applyEasy(){document.body.classList.toggle('easy',!!S.settings.easy);}
const _settings4=window.settingsView;
window.settingsView=function(){_settings4();const h=$('#xhap');if(!h)return;const row=h.closest('label');
 row.insertAdjacentHTML('afterend',`<label class="set">📖 תצוגה נוחה לקריאה (גדולה ומרווחת)<input type="checkbox" id="xeasy" ${S.settings.easy?'checked':''}></label>
 <label class="set">🗣️ הקראת הוראות בעברית<input type="checkbox" id="xhe" ${S.settings.heVoice?'checked':''}></label>`);
 $('#xeasy').onchange=e=>{S.settings.easy=e.target.checked;save();applyEasy();};
 $('#xhe').onchange=e=>{S.settings.heVoice=e.target.checked;save();if(e.target.checked){sayHe('ההוראות יוקראו בעברית');try{if(!speechSynthesis.getVoices().some(v=>/^he/i.test(v.lang)))toast('ייתכן שבמכשיר הזה אין קול בעברית');}catch(e){}}};};

/* ===================================================================
   🏫 כמה כיתות לתלמיד
   =================================================================== */
function ensureClasses(){S.classes=Array.isArray(S.classes)?S.classes:[];if(S.cls){const i=S.classes.findIndex(c=>c.code===S.cls.code);if(i<0)S.classes.push(S.cls);else S.classes[i]=S.cls;}}
function switchClass(code){ensureClasses();const c=S.classes.find(x=>x.code===code);if(!c)return;S.cls=c;save();home();syncClass(true).then(()=>{if(currentView==='home')home();});}
const _studentHome=studentHome;
studentHome=function(){ensureClasses();_studentHome();const hero=$('#app .hero');if(!hero)return;
 hero.insertAdjacentHTML('afterend',`<div class="row" style="justify-content:space-between">${S.classes.length>1?`<select class="inp" id="clsw" style="flex:1;max-width:260px">${S.classes.map(c=>`<option value="${esc(c.code)}" ${c.code===S.cls.code?'selected':''}>🏫 ${esc(c.name)}</option>`).join('')}</select>`:'<span></span>'}<button class="btn ghost small" id="cladd">➕ כיתה נוספת</button></div>`);
 const sw=$('#clsw');if(sw)sw.onchange=()=>switchClass(sw.value);$('#cladd').onclick=()=>gateView('',true);};


/* ===================================================================
   👩‍🏫 חשבון מורה (מייל + סיסמה) – כניסה מכל מכשיר
   =================================================================== */
function setAcct(r){S.tacct={token:r.token||(S.tacct&&S.tacct.token),name:r.name,email:r.email,role:r.role,school:r.school,schoolName:r.schoolName};S.tmode=true;
 const local=S.teach||[];const srv=r.classes||[];S.teach=srv.slice();local.forEach(c=>{if(!S.teach.some(x=>x.code===c.code))S.teach.push(c);});S.tlocal=local.filter(c=>!srv.some(x=>x.code===c.code));}
async function acctSync(){if(!S.tacct||!S.tacct.token)return;
 try{let r=await _api('/teacher/me',{token:S.tacct.token});
  for(const c of (S.tlocal||[])){try{r=await _api('/teacher/addclass',{token:S.tacct.token,code:c.code,key:c.key});}catch(e){}}S.tlocal=[];
  setAcct(Object.assign({token:S.tacct.token},r));save();}
 catch(e){if(e&&e.code==='bad_token'){toast('צריך להתחבר מחדש');teacherLogout(true);}}}
async function teacherLogout(silent){const had=!!(S.tacct&&S.tacct.token);try{if(had&&!silent)await _api('/teacher/logout',{token:S.tacct.token});}catch(e){}
 /* מורה בלי חשבון (מלפני החשבונות): שומרים את הכיתות במכשיר, כדי שייכנסו לחשבון החדש אחרי ההרשמה */
 if(!had){S.tacct=null;S.tmode=false;S.tcode='';save();return gateView('',false,true);}
 S.tacct=null;S.tmode=false;S.teach=[];S.tcode='';S.tlocal=[];save();home();}
window.tkLogout=()=>teacherLogout(false);
const _api3=window.api;
window.api=function(path,body){if(S.tacct&&S.tacct.token&&(path==='/class/create'||path==='/room/create'))body=Object.assign({},body,{token:S.tacct.token});return _api3(path,body);};
let acctSynced=0;
const _teacherHome2=window.teacherHome;
window.teacherHome=function(){
 if(S.tacct&&now()-acctSynced>30000){acctSynced=now();acctSync().then(()=>{if(currentView==='teacher')window.teacherHome();});}
 _teacherHome2();if(currentView!=='teacher')return;const top=$('#app .stack');if(!top)return;const A=S.tacct;
 top.insertAdjacentHTML('afterbegin',A?`<div class="card stack" style="padding:14px 16px"><div class="row" style="justify-content:space-between"><div><b>שלום ${esc(A.name)} 👋</b><div class="small muted en">${esc(A.email)}</div></div><button class="btn ghost small" onclick="tkLogout()">יציאה</button></div>
  <div class="row"><button class="btn ghost" id="tguide">📘 מדריך מהיר</button><button class="btn ghost" id="tschool">🏫 ${A.school?esc(A.schoolName||'בית הספר'):'בית ספר'}</button>${A.role==='principal'?'<button class="btn accent" id="tprin">📊 לוח מנהל</button>':''}</div></div>`
  :`<div class="note">⚠️ <b>כדי לפתוח כיתות חדשות צריך חשבון מורה</b> (מייל וסיסמה). הכיתות שכבר יש לך כאן יישמרו ויעברו לחשבון. <button class="btn primary small" onclick="tkLogout()">יצירת חשבון מורה</button></div><div class="row"><button class="btn ghost" id="tguide">📘 מדריך מהיר</button></div>`);
 $('#tguide').onclick=guideView;const ts=$('#tschool');if(ts)ts.onclick=schoolSetup;const tp=$('#tprin');if(tp)tp.onclick=principalView;
 if(!(S.teach||[]).length&&!S.guideSeen){S.guideSeen=1;save();guideView();}};

function guideView(){
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" onclick="teacherHome()">→</button><h2 style="margin:0">📘 מדריך מהיר למורה</h2></div>
 ${[['1','🏫','פותחים כיתה','בלוח המורה כותבים שם לכיתה ולוחצים "צור כיתה". מקבלים קוד כיתה.'],
    ['2','📲','מזמינים תלמידים','בתוך הכיתה: "העתק הזמנה" ומדביקים בוואטסאפ של הכיתה. התלמידים לוחצים, כותבים שם – ונכנסים.'],
    ['3','📝','שולחים מילים','"רשימת מילים חדשה": מדביקים מילים או מצלמים דף מהספר. Tuki מתרגם, אתם בודקים ושולחים.'],
    ['4','📚','התלמידים לומדים','כל רשימה הופכת לשיעור: הכרות, שמיעה, דיבור, איות, משחק, משפט משלי ומבדק.'],
    ['5','📊','עוקבים','📊 ליד כל רשימה: מי סיים, ציוני מבדק והמילים הקשות לכיתה. אפשר לייצא לאקסל.'],
    ['6','🖨️','ועוד','🖨️ דף עבודה להדפסה · 🎯 חידון כיתתי חי · 👨‍👩‍👧 דוחות להורים · ⚙️ הפעלה/כיבוי של AI.']]
  .map(([n,ic,t,d])=>`<div class="card row" style="align-items:flex-start;gap:14px"><div style="font-size:34px">${ic}</div><div><b style="font-size:18px">${n}. ${t}</b><p style="margin:4px 0 0">${d}</p></div></div>`).join('')}
 <div class="note">🔑 <b>קודים אישיים:</b> כל תלמיד מקבל קוד אישי. איתו הוא נכנס ממכשיר אחר וממשיך מאיפה שעצר. הקודים מופיעים אצלך בתוך הכיתה.</div>
 <button class="btn primary" onclick="teacherHome()">הבנתי, מתחילים!</button></div>`,'guide');}

function schoolSetup(){
 const A=S.tacct;if(!A)return;
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" onclick="teacherHome()">→</button><h2 style="margin:0">🏫 בית ספר</h2></div>
 ${A.school?`<div class="card stack"><p style="margin:0">את/ה ב<b>${esc(A.schoolName)}</b>${A.role==='principal'?` כמנהל/ת.`:'.'}</p>${A.role==='principal'?`<p style="margin:0">קוד בית הספר למורים: <b class="en" style="font-size:24px;letter-spacing:2px">${esc(A.school)}</b></p><p class="small muted" style="margin:0">מורים נכנסים לחשבון שלהם ← 🏫 בית ספר ← מקלידים את הקוד. אז הכיתות שלהם מופיעות בלוח המנהל.</p><button class="btn accent" onclick="tkPrincipal()">📊 ללוח המנהל</button>`:''}</div>`:''}
 <div class="card stack"><h3>הצטרפות לבית ספר (מורה)</h3><p class="small muted" style="margin:0">קיבלת קוד מהמנהל/ת? כך המנהל/ת יראה/תראה את הכיתות שלך.</p><div class="row"><input class="inp en" id="scj" placeholder="קוד בית ספר" style="flex:1;text-transform:uppercase"><button class="btn ghost" id="scjb">הצטרפות</button></div></div>
 ${A.role!=='principal'?`<div class="card stack"><h3>פתיחת בית ספר (מנהל/ת)</h3><p class="small muted" style="margin:0">רק למנהל/ת או לרכז/ת. תקבלו קוד שמחלקים למורים, ולוח מנהל עם כל הכיתות.</p><div class="row"><input class="inp" id="scn" placeholder="שם בית הספר" style="flex:1"><button class="btn ghost" id="scnb">פתיחה</button></div></div>`:''}</div>`,'school');
 const E={no_school:'לא מצאתי בית ספר עם הקוד הזה',no_name:'כתבו שם'};
 $('#scjb').onclick=async()=>{try{const r=await _api('/school/join',{token:A.token,code:$('#scj').value.trim().toUpperCase()});setAcct(Object.assign({token:A.token},r));save();toast('✅ הצטרפת ל'+r.schoolName);schoolSetup();}catch(e){toast(E[e&&e.code]||'לא הצלחתי');}};
 const nb=$('#scnb');if(nb)nb.onclick=async()=>{try{const r=await _api('/school/create',{token:A.token,name:$('#scn').value.trim()});setAcct(Object.assign({token:A.token},r));save();toast('✅ בית הספר נפתח');schoolSetup();}catch(e){toast(E[e&&e.code]||'לא הצלחתי');}};}

async function principalView(){
 const A=S.tacct;if(!A)return;
 view(`<div class="card"><span class="loader"></span> טוען את בית הספר...</div>`,'principal');
 let r;try{r=await _api('/school/view',{token:A.token});}catch(e){toast(e&&e.code==='not_principal'?'רק המנהל/ת רואה את הלוח הזה':'לא הצלחתי לטעון');return teacherHome();}
 const all=r.teachers.flatMap(t=>t.classes);const N=all.reduce((a,c)=>a+c.students,0),act=all.reduce((a,c)=>a+c.active,0);
 const rd=all.filter(c=>c.readiness!=null);const avgR=rd.length?Math.round(rd.reduce((a,c)=>a+c.readiness,0)/rd.length):null;
 view(`<div class="stack"><div class="ses-head"><button class="iconbtn" onclick="teacherHome()">→</button><h2 style="margin:0">📊 ${esc(r.name)}</h2><button class="btn ghost small" style="margin-inline-start:auto" onclick="tkPrincipal()">🔄</button></div>
 <div class="grid" style="grid-template-columns:repeat(4,1fr)"><div class="card stat"><span class="muted small">מורים</span><b>${r.teachers.length}</b></div><div class="card stat"><span class="muted small">כיתות</span><b>${all.length}</b></div><div class="card stat"><span class="muted small">תלמידים</span><b>${N}</b></div><div class="card stat"><span class="muted small">פעילים השבוע</span><b>${N?Math.round(act/N*100):0}%</b></div></div>
 ${avgR!=null?`<div class="card stat" style="text-align:center"><span class="muted small">מוכנות ממוצעת לרשימות המילים</span><b>${avgR}%</b></div>`:''}
 ${r.teachers.map(t=>`<div class="card"><h3>👩‍🏫 ${esc(t.name)}</h3>${t.classes.length?`<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:14px;min-width:420px"><tr style="color:var(--muted)"><th style="text-align:start;padding:6px">כיתה</th><th>תלמידים</th><th>פעילים השבוע</th><th>XP ממוצע</th><th>מוכנות</th><th>רשימות</th></tr>
  ${t.classes.map(c=>`<tr style="border-top:1px solid var(--line);text-align:center"><td style="text-align:start;padding:8px 6px"><b>${esc(c.name)}</b></td><td>${c.students}</td><td>${c.active}</td><td>${c.avgWeek}</td><td>${c.readiness!=null?c.readiness+'%':'—'}</td><td>${c.lists}</td></tr>`).join('')}</table></div>`:'<p class="small muted" style="margin:0">עוד אין כיתות</p>'}</div>`).join('')}
 <p class="small muted">קוד בית הספר למורים: <b class="en">${esc(r.code)}</b></p></div>`,'principal');}
window.tkPrincipal=principalView;

/* ייצוא לאקסל + עריכת תלמידים בתוך מסך הכיתה */
function csvCell(v){v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}
function exportClass(code){
 const r=G.lastView;if(!r)return;const lists=r.lists||[];const st=(r.students||[]).slice().sort((a,b)=>String(a.name).localeCompare(String(b.name),'he'));
 const head=['שם','קוד אישי','XP השבוע','XP כולל','רצף ימים','מילים שנלמדו','דיוק %','פעילות אחרונה'];lists.forEach(l=>{head.push(l.name+' – שלבים',l.name+' – מבדק',l.name+' – מוכנות %');});
 const rows=st.map(s=>{const row=[s.name,s.pin||'',s.week||0,s.xp||0,s.streak||0,s.words||0,s.acc||0,s.last?new Date(s.last).toLocaleString('he-IL'):''];
  lists.forEach(l=>{row.push((s.ls||{})[l.id]!=null?(s.ls||{})[l.id]:'',(s.lq||{})[l.id]!=null?(s.lq||{})[l.id]:'',(s.lr||{})[l.id]!=null?(s.lr||{})[l.id]:'');});return row;});
 const csv='﻿'+[head,...rows].map(r=>r.map(csvCell).join(',')).join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const name=`Tuki-${r.name}-${new Date().toISOString().slice(0,10)}.csv`;
 const f=new File([blob],name,{type:'text/csv'});
 if(isApp&&navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f]}).catch(()=>{});return;}
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);toast('📊 הקובץ ירד – פותחים אותו באקסל');}
const _openClass4=window.openClass;
window.openClass=async function(code){await _openClass4(code);if(currentView!=='class'||!G.lastView)return;const c=(S.teach||[]).find(x=>x.code===code);const r=G.lastView;
 const cp=$('#cpar');if(cp)cp.insertAdjacentHTML('afterend',`<button class="btn ghost" id="cexp">📊 ייצוא ציונים לאקסל</button>`);const ce=$('#cexp');if(ce)ce.onclick=()=>exportClass(code);
 const det=[...$$('#app details')].find(d=>/קודים אישיים/.test(d.textContent));if(!det)return;
 det.querySelector('summary').innerHTML='<b>🔑 תלמידים: קודים אישיים ועריכה</b>';
 $$('.lb',det).forEach((row,i)=>{const s=(r.students||[])[i];if(!s)return;row.insertAdjacentHTML('beforeend',`<button class="iconbtn" title="שינוי שם" data-ren="${esc(s.id)}" style="font-size:14px">✏️</button><button class="iconbtn" title="קוד אישי חדש" data-np="${esc(s.id)}" style="font-size:14px">🔄</button>`);});
 $$('[data-ren]',det).forEach(b=>b.onclick=async()=>{const s=r.students.find(x=>x.id===b.dataset.ren);const nm=prompt('שם חדש לתלמיד/ה:',s?s.name:'');if(!nm||!nm.trim())return;
  try{await api('/class/student',{code,key:c.key,id:b.dataset.ren,name:nm.trim()});toast('✅ השם עודכן');openClass(code);}catch(e){classErr(e);}});
 $$('[data-np]',det).forEach(b=>b.onclick=async()=>{if(!b.dataset.armed){b.dataset.armed=1;b.textContent='בטוח?';return;}
  try{const x=await api('/class/student',{code,key:c.key,id:b.dataset.np,newPin:true});toast('🔑 קוד חדש: '+x.pin);openClass(code);}catch(e){classErr(e);}});};


/* ===================================================================
   🎬 כיתת הדגמה – כדי להראות למנהלים ולמורים איך זה נראה עם נתונים
   =================================================================== */
const DEMO_LISTS=[
 {name:'יחידה 4 – טיול לחו״ל',words:[['airport','שדה תעופה','We arrived at the airport early.'],['passport','דרכון','Don’t forget your passport.'],['luggage','מזוודות','Her luggage was very heavy.'],['ticket','כרטיס','I bought a ticket to London.'],['flight','טיסה','The flight takes five hours.'],['hotel','מלון','Our hotel is near the beach.'],['delay','עיכוב','There was a delay because of the weather.'],['map','מפה','We used a map to find the museum.'],['souvenir','מזכרת','I bought a souvenir for my mom.'],['journey','מסע, נסיעה','The journey by train was beautiful.']],
  text:'Last summer, Maya and her family went on a trip to London. They arrived at the airport early, but there was a delay of two hours. Maya held her passport and her ticket and waited. The flight was long, but she was happy.\nIn London, they stayed in a small hotel. Every day, they used a map to find new places. At the end of the journey, Maya bought a souvenir for her grandmother: a small red bus. Her luggage was heavy, but her heart was happy.',
  questions:[{t:'tf',q:'Maya’s family went to Paris.',o:['True','False'],a:1},{t:'mcq',q:'Why did they wait at the airport?',o:['They lost the tickets','There was a delay','The hotel was closed','It was raining'],a:1},{t:'fill',q:'Every day, they used a _____ to find new places.',o:['ticket','map','hotel','flight'],a:1},{t:'tf',q:'The flight was long.',o:['True','False'],a:0},{t:'mcq',q:'What did Maya buy for her grandmother?',o:['A map','A ticket','A small red bus','A passport'],a:2}]},
 {name:'יחידה 3 – בבית הספר',words:[['pencil','עיפרון','I write with a pencil.'],['homework','שיעורי בית','I finish my homework after lunch.'],['library','ספרייה','We read books in the library.'],['break','הפסקה','We play football during the break.'],['teacher','מורה','Our teacher is very kind.'],['classroom','כיתה (חדר)','Our classroom is on the second floor.'],['exam','מבחן','I studied hard for the exam.'],['uniform','תלבושת אחידה','We wear a blue uniform.']]}];
const DEMO_KIDS=['נועה','איתי','מאיה','יונתן','תמר','אורי','שירה','דניאל','רוני','עומר','הילה','אלון'];
async function makeDemoClass(btn){
 if(!(S.tacct&&S.tacct.token)&&!S.tcode){toast('קודם צריך ליצור חשבון מורה');return teacherLogout(false);}
 if(btn){btn.disabled=true;btn.innerHTML='<span class="loader"></span> בונה כיתת הדגמה...';}
 try{
  const c=await api('/class/create',{name:'כיתת הדגמה – ז׳3'});S.teach=S.teach||[];if(!S.teach.some(x=>x.code===c.code))S.teach.push({code:c.code,key:c.key,name:c.name,demo:1});save();
  const ids=[];const in2=new Date(Date.now()+5*864e5).toISOString().slice(0,10);
  for(const [i,L] of DEMO_LISTS.entries()){const r=await api('/class/list/save',{code:c.code,key:c.key,list:{name:L.name,date:i===0?in2:'',words:L.words.map(([en,he,ex])=>({en,he,ex})),text:L.text||'',questions:L.questions||[]}});ids.push(r.id);}
  await api('/class/message',{code:c.code,key:c.key,message:'עד יום חמישי: לסיים את השיעור "טיול לחו״ל" כולל המבדק 💪'});
  const hardPool=['luggage','souvenir','journey','delay','passport'];
  for(const [k,nm] of DEMO_KIDS.entries()){
   const j=await api('/class/join',{code:c.code,name:nm+' (דוגמה)'});const lvl=k%5===0?3:k%3===0?1:2;
   const st1=[8,8,8,7,6,8,5,3,8,2,7,0][k],q1=st1>=8?[95,88,100,0,0,92,0,0,76,0,0,0][k]||84:null,st2=[7,7,6,7,4,7,7,2,5,1,7,3][k];
   const r1=Math.min(100,Math.round(st1/8*90+(k%4)*3)),r2=Math.min(100,Math.round(st2/7*85+(k%3)*4));
   const data={lvl:['A1','A2','B1','B2'][lvl],xp:300+k*137%900,streak:[6,4,9,2,1,5,3,0,7,0,4,1][k],words:8+st1+st2,lessons:0,acc:[92,85,95,71,64,88,79,58,83,55,90,60][k],week:[340,260,410,150,90,280,180,40,300,20,240,60][k],
    lr:{[ids[0]]:r1,[ids[1]]:r2},ls:{[ids[0]]:st1,[ids[1]]:st2},lq:Object.assign({},q1!=null?{[ids[0]]:q1}:{} ,st2>=7?{[ids[1]]:[90,85,0,96,0,100,80,0,0,0,88,0][k]||82}:{}),
    hard:{[ids[0]]:hardPool.filter((_,h)=>(k+h)%3!==0).slice(0,3),[ids[1]]:['homework','uniform','library'].filter((_,h)=>(k+h)%2===0)}};
   await api('/class/progress',{code:c.code,id:j.id,data});
   if(btn)btn.innerHTML=`<span class="loader"></span> מוסיף תלמידים ${k+1}/${DEMO_KIDS.length}...`;}
  toast('🎬 כיתת ההדגמה מוכנה!');openClass(c.code);}
 catch(e){classErr(e);if(btn){btn.disabled=false;btn.textContent='🎬 יצירת כיתת הדגמה';}}}
window.tkDemo=b=>makeDemoClass(b);
const _teacherHome3=window.teacherHome;
window.teacherHome=function(){_teacherHome3();if(currentView!=='teacher')return;const has=(S.teach||[]).some(c=>/הדגמה/.test(c.name));
 const box=$('#app .stack');if(box&&!has)box.insertAdjacentHTML('beforeend',`<div class="card stack"><h3>🎬 רוצה לראות איך זה נראה?</h3><p class="small muted" style="margin:0">יוצרים כיתה לדוגמה עם 2 רשימות מילים ו-12 תלמידים עם התקדמות – מעולה להצגה למנהל או לצוות.</p><button class="btn ghost" onclick="tkDemo(this)">🎬 יצירת כיתת הדגמה</button></div>`);};
/* הסרת כיתה מהחשבון (למשל כיתת ההדגמה) */
const _openClass5=window.openClass;
window.openClass=async function(code){await _openClass5(code);if(currentView!=='class')return;const cp=$('#cexp')||$('#cpar');if(!cp)return;
 cp.insertAdjacentHTML('afterend',`<button class="btn ghost" id="crm" style="color:var(--bad)">🗑 הסרת הכיתה מהרשימה שלי</button>`);
 $('#crm').onclick=async()=>{const b=$('#crm');if(!b.dataset.armed){b.dataset.armed=1;b.textContent='בטוח? לחצו שוב (התלמידים לא יימחקו)';return;}
  try{if(S.tacct&&S.tacct.token)await _api('/teacher/removeclass',{token:S.tacct.token,code});}catch(e){}
  S.teach=(S.teach||[]).filter(c=>c.code!==code);save();toast('הכיתה הוסרה מהרשימה');teacherHome();};};

/* ===================================================================
   🧹 הגדרות נקיות במצב בית ספר
   =================================================================== */
const _settings5=window.settingsView;
window.settingsView=function(){_settings5();if(!SCHOOL)return;
 const kill=el=>{if(el)el.remove();};
 kill(($('#sg')||{}).closest&&$('#sg').closest('label'));
 $$('#app .lvlpick').forEach(p=>{if(p.querySelector('[data-l]'))kill(p.closest('.set'));});
 $$('#app .row').forEach(r=>{if(r.querySelector('#rst'))kill(r);});
 $$('#app .note').forEach(n=>{if(/ה-AI מחובר/.test(n.textContent))kill(n);});
 $$('#app .card').forEach(c=>{const h=c.querySelector('h3');if(h&&/ההתקדמות שלי|אני מורה/.test(h.textContent))kill(c);});
 $$('#app .row').forEach(r=>{if(/דוח שבועי/.test(r.textContent)&&!S.tmode)kill(r);});
 const head=$('#app h2');
 if(head&&S.cls)head.insertAdjacentHTML('afterend',`<div class="card stack"><h3>🏫 הכיתה שלי</h3><p style="margin:0">${esc(S.cls.me||'')} · כיתה ${esc(S.cls.name||'')}</p><p style="margin:0">הקוד האישי שלך: <b class="en" style="font-size:20px;letter-spacing:2px">${esc(S.cls.pin||'—')}</b> <span class="small muted">(לכניסה ממכשיר אחר)</span></p></div>`);
 if(head&&S.tacct)head.insertAdjacentHTML('afterend',`<div class="card stack"><h3>👩‍🏫 החשבון שלי</h3><p style="margin:0">${esc(S.tacct.name)} · <span class="en">${esc(S.tacct.email)}</span></p><div class="row"><button class="btn ghost" onclick="tkLogout()">יציאה מהחשבון</button></div></div>`);};

/* ===================================================================
   👀 תצוגת תלמיד – המורה רואה בדיוק מה התלמידים רואים, בלי לשמור כלום
   =================================================================== */
(()=>{const s=document.createElement('style');s.textContent=`
.hl.on{background:var(--pri);color:#fff}
.wpop{background:var(--acc-soft);border-radius:14px;padding:10px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.blank{display:inline-block;min-width:70px;border-bottom:3px solid var(--pri);color:transparent}
#pvbar{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#7c3aed;color:#fff;padding:8px 12px calc(8px + env(safe-area-inset-bottom));display:flex;gap:10px;align-items:center;justify-content:center;font-weight:700;font-size:15px;box-shadow:0 -2px 10px rgba(0,0,0,.25)}
#pvbar .btn{padding:7px 12px;font-size:14px;white-space:nowrap}
body.pv{padding-bottom:70px}`;document.head.appendChild(s);})();
let PREV=null;
const _saveP=window.save;window.save=function(){if(PREV)return;return _saveP.apply(this,arguments);};
if(typeof saveNow==='function'){const _sn=window.saveNow;window.saveNow=function(){if(PREV)return;return _sn.apply(this,arguments);};}
const _syncP=window.syncClass;window.syncClass=async function(){if(PREV)return;return _syncP.apply(this,arguments);};
const _apiP=window.api;window.api=async function(path,body){
 if(PREV&&/^\/(class\/(progress|join|restore)|room\/)/.test(path)){toast('👀 זו תצוגת תלמיד – כאן לא מתחברים לכיתה באמת');throw{code:'preview'};}
 return _apiP(path,body);};
function studentPreview(code){
 const r=G.lastView,c=(S.teach||[]).find(x=>x.code===code);if(!r||!c)return;
 save();PREV={snap:JSON.stringify(S),code};const old=S;
 S=merge({settings:old.settings,placementDone:true,level:old.level,theme:old.theme});
 S.myName='תלמיד/ה';S.cls={code,id:'__preview',pin:'—',name:r.name||c.name||'',me:'תלמיד/ה',message:r.message||'',ai:r.ai!==false};S.classes=[S.cls];
 applyLists(r.lists||[],0);
 document.body.classList.add('pv');let bar=$('#pvbar');if(!bar){document.body.insertAdjacentHTML('beforeend','<div id="pvbar"><span>👀 תצוגת תלמיד<br><span style="font-weight:400;font-size:12px">שום דבר לא נשמר</span></span><button class="btn light small" id="pvx">✕ חזרה למורה</button></div>');}
 $('#pvx').onclick=exitPreview;renderTop();home();window.scrollTo(0,0);}
function exitPreview(){if(!PREV)return;const p=PREV;PREV=null;try{gstop();}catch(e){}try{stopSpeak();}catch(e){}LESSON=null;
 S=merge(JSON.parse(p.snap));const b=$('#pvbar');if(b)b.remove();document.body.classList.remove('pv');renderTop();openClass(p.code);}
window.tkPreview=studentPreview;
const _openClass6=window.openClass;
window.openClass=async function(code){await _openClass6(code);if(currentView!=='class'||!G.lastView||PREV)return;
 const anchor=$('#tlists')||$('#app .stack > .card');if(!anchor||$('#cprev'))return;
 anchor.insertAdjacentHTML('beforebegin',`<button class="btn accent" id="cprev" style="font-size:18px">👀 תצוגת תלמיד – לראות מה התלמידים רואים</button>`);
 $('#cprev').onclick=()=>studentPreview(code);};

/* ===================================================================
   הפעלה
   =================================================================== */
window.addEventListener('offline',()=>toast('📴 אין אינטרנט – אפשר להמשיך לתרגל מילים ולשחק 🦜'));
window.addEventListener('online',()=>toast('🌐 החיבור חזר'));
if(!isApp&&'serviceWorker' in navigator&&location.protocol==='https:'){window.addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').catch(()=>{});});}
function boot(){applyTheme();applyEasy();renderTop();if(SCHOOL||currentView==='home'||currentView==='')home();
 const jm=String(location.hash).match(/join=([A-Z0-9]{4,8})/i);if(jm&&!S.cls&&!tmode()){history.replaceState(null,'',location.pathname);gateView(jm[1].toUpperCase());return;}
 const m=String(location.hash).match(/room=([A-Z0-9]{4,8})/i);if(m&&S.placementDone){history.replaceState(null,'',location.pathname);roomHome(m[1].toUpperCase());}
 if(isApp&&S.settings.remind&&S.settings.remind.on)scheduleReminder();}
boot();
})();
