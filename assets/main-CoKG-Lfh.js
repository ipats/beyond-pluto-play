import{G as j,t as L}from"./telemetry-DxZADP2w.js";const a={tab:"tech",speed:"default",rocket:"",payload:{},extraTesting:!1,rush:!1,acc:0,last:performance.now(),realMs:0,speedMs:{},endLogged:!1};let s=M();function M(){const e=new j;return e.onLog=t=>console.log(`[BP] ${t.date} ${t.text}`),a.speed=e.data.config.defaultSpeed,a.acc=0,a.realMs=0,a.speedMs={},a.endLogged=!1,a.rocket="",a.payload={},e}const h=e=>document.querySelector(e),r=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),v=e=>`${e<0?"−":""}$${Math.abs(Math.round(e)).toLocaleString()}M`,f=e=>`${(e*100).toFixed(0)}%`;function m(e,t){e._html!==t&&(e.innerHTML=t,e._html=t)}function b(e,t,i,d=""){return`<button data-act="${r(e)}" class="${d}" ${i?`disabled title="${r(i)}"`:""}>${t}</button>`}function w(e){return`<div class="bar"><div style="width:${((e.totalMonths?(e.totalMonths-e.monthsLeft)/e.totalMonths:1)*100).toFixed(1)}%"></div></div>`}function P(e){const t=s.tech(e);return t?t.name:s.build(e)?.name??e}function y(e){return e.map(t=>`<span class="${s.has(t)?"ok":"miss"}">${r(P(t))}</span>`).join(", ")||"—"}h("#app").innerHTML=`
  <header id="top"></header>
  <main>
    <section id="left">
      <nav id="tabs"></nav>
      <div id="panel"></div>
    </section>
    <aside id="right">
      <div id="trip"></div>
      <h3>Jobs</h3><div id="jobs"></div>
      <h3>Log</h3><div id="log"></div>
    </aside>
  </main>
  <div id="modal"></div>`;function g(){S(),m(h("#tabs"),["tech","build","launch"].map(e=>`<button data-act="tab:${e}" class="${a.tab===e?"on":""}">${{tech:"Tech Tree",build:"Build",launch:"Launch Pad"}[e]}</button>`).join("")),a.tab==="tech"?R():a.tab==="build"?D():N(),F(),E(),O(),I()}function S(){const e=s.s,t=s.data.config.speeds.map(o=>`<button data-act="speed:${o.id}" class="${a.speed===o.id?"on":""}">${o.label}</button>`).join(""),i=s.incomeForecast()-s.upkeep(),d=s.solarPhase();m(h("#top"),`
    <div class="brand">Beyond Pluto <small>POC</small></div>
    <div class="stat date">${s.date()}</div>
    <div class="speeds">${t}</div>
    <div class="stat ${e.cash<0?"neg":""}" title="Cash">💰 ${v(e.cash)}</div>
    <div class="stat" title="Next January: income ${v(s.incomeForecast())} − upkeep ${v(s.upkeep())}${e.incomeMods.length?`
Mods: `+e.incomeMods.map(o=>`${o.pct}% (${o.source}, ${o.payments}y)`).join(", "):""}">📈 ${v(s.incomeForecast())}/yr <small class="${i<0?"neg":""}">(net ${v(i)})</small></div>
    <div class="stat" title="Tech Points">🔬 ${e.tp} TP</div>
    <div class="stat" title="Public Interest">📣 PI ${e.pi}</div>
    <div class="stat solar ${d}" title="Solar cycle phase">☀ ${d}</div>
    <div class="spacer"></div>
    <button data-act="csv" class="small">Export CSV</button>
    <button data-act="newgame" class="small">New game</button>`)}function C(){const e=new Map,t=i=>{if(e.has(i))return e.get(i);const d=s.tech(i),o=d.requires.length?1+Math.max(...d.requires.map(t)):0;return e.set(i,o),o};return s.data.techs.forEach(i=>t(i.id)),e}function R(){const e=C(),t=[];for(const d of s.data.techs)(t[e.get(d.id)]??=[]).push(d.id);const i=t.map(d=>`<div class="col">${d.map(o=>{const l=s.tech(o),c=s.techStatus(o),$=s.data.config.owned.includes(o),n=s.s.jobs.find(u=>u.kind==="research"&&u.target===o),p=c==="available"?s.canResearch(o):null;return`<div class="node ${c}">
        <div class="name">${c==="done"?$?"🏛️ ":"✔ ":c==="locked"?"🔒 ":""}${r(l.name)} <small>${l.id}${$?" · Starting base":""}</small></div>
        <div class="meta">${v(l.cost)} · ${l.tp} TP · ${l.months} mo</div>
        <div class="desc">${r(l.description)}</div>
        ${l.requires.length?`<div class="req">Needs: ${y(l.requires)}</div>`:""}
        ${l.triggers?'<div class="warn">☢ May trigger protests</div>':""}
        ${n?w(n)+`<div class="meta">${n.monthsLeft} mo left</div>`:""}
        ${c==="available"?b(`research:${o}`,"Research",p):""}
      </div>`}).join("")}</div>`).join("");m(h("#panel"),`<div class="tree">${i}</div>`)}function D(){const e=s.s,t=[];for(const i of s.data.builds){if(i.kind==="facility"){const o=e.built.includes(i.id),l=s.data.config.owned.includes(i.id),c=e.jobs.find(n=>n.kind==="build"&&n.target===i.id),$=e.disabled[i.id];t.push(`<div class="card ${o?"done":""}">
        <div class="name">${r(i.name)} <small>${i.id} · facility${l?" · Starting base":""}</small></div>
        <div class="desc">${r(i.description??"")}</div>
        ${!o&&!c?`<div class="meta">${v(i.cost??0)} · ${i.months} mo · Needs: ${y(i.requires)}</div>${b(`build:${i.id}`,"Build",s.canBuild(i.id))}`:""}
        ${c?w(c)+`<div class="meta">${c.monthsLeft} mo left</div>`:""}
        ${o?`<div class="ok">${l?"✔ Operational · Starting base":"✔ Built"}</div>`:""}
        ${$?`<div class="warn">Damaged until ${s.cal.label($.untilMonth)} ${b(`repair:${i.id}`,`Repair ${v($.repairCost)}`,s.canRepair(i.id),"small")}</div>`:""}
      </div>`);continue}const d=i.tiers.map(o=>{const l=`${i.id}:${o.id}`,c=e.inventory[`${i.slot}:${o.id}`]??0,$=e.jobs.filter(u=>u.kind==="build"&&u.target===l),n=s.tierAvailable(i,o),p=[o.failure&&`fail ${f(s.failureChance(o.id))} (base ${f(o.failure.base)})`,o.bodyDrainMod&&`body drain ${o.bodyDrainMod*100}%`,o.stressDrainMod&&`stress drain ${o.stressDrainMod*100}%`,o.moraleDrainMod&&`morale drain ${o.moraleDrainMod*100}%`,o.triggers&&"☢ protests"].filter(Boolean).join(" · ");return`<tr class="${n?"":"locked"}">
          <td>${n?"":"🔒 "}${r(o.name)}</td>
          <td>${v(o.cost)} · ${o.months} mo</td>
          <td class="inv">${c}${$.length?` <small>(+${$.length} building)</small>`:""}</td>
          <td><small>${p}</small></td>
          <td>${n?b(`build:${l}`,"Build 1",s.canBuild(l)):`<small>Needs: ${y([...i.requires,...o.requires])}</small>`}</td>
        </tr>`}).join("");t.push(`<div class="card wide"><div class="name">${r(i.name)} <small>${i.id} · component · slot <b>${i.slot}</b></small></div>
      <table><tr><th>Tier</th><th>Cost</th><th>Stock</th><th>Notes</th><th></th></tr>${d}</table></div>`)}m(h("#panel"),`<div class="builds">${t.join("")}</div>`)}function N(){const e=s.s,t=s.rocketTiers().filter(n=>(e.inventory[`rocket:${n.id}`]??0)>0);t.some(n=>n.id===a.rocket)||(a.rocket=t[0]?.id??"");const d=s.data.builds.filter(n=>n.kind==="component"&&n.slot!=="rocket").map(n=>{const p=n.tiers.filter(u=>(e.inventory[`${n.slot}:${u.id}`]??0)>0);return a.payload[n.slot]&&!p.some(u=>u.id===a.payload[n.slot])&&(a.payload[n.slot]=""),`<label>${r(n.name)}<select data-slot="${n.slot}"><option value="">— none —</option>${p.map(u=>`<option value="${u.id}" ${a.payload[n.slot]===u.id?"selected":""}>${r(u.name)} (${e.inventory[`${n.slot}:${u.id}`]})</option>`).join("")}</select></label>`}).join(""),o=Object.entries(a.payload).filter(([,n])=>n).map(([n,p])=>`${n}:${p}`),l=s.data.config.launch;let c='<p class="muted">Build a rocket to launch.</p>';if(a.rocket){const n=s.launchPreview(a.rocket,o,a.extraTesting,a.rush);c=`<div class="preview">
      <div>Mission: <b>${r(n.milestoneNote)}</b>${n.crewed?" 👩‍🚀 crewed":""}</div>
      ${n.milestone?B(n.milestone):""}
      <div>Failure chance: <b class="${n.failure>.15?"neg":""}">${f(n.failure)}</b> · Prep ${n.months} mo${n.extraCost?` · Extra Testing ${v(n.extraCost)}`:""}</div>
      ${n.error?`<div class="warn">${r(n.error)}</div>`:""}
      ${b("launch","🚀 LAUNCH",n.error,"big")}
    </div>`}const $=s.rocketTiers().map(n=>{const p=s.rel(n.id);return`<tr><td>${r(n.name)}</td><td>${p.successes}</td><td>${f(s.failureChance(n.id))}</td><td>${p.skipPenalty?`+${f(p.skipPenalty)} skip`:""}</td></tr>`}).join("");m(h("#panel"),`
    <div class="launch">
      <div class="card">
        <label>Rocket<select data-rocket>${t.map(n=>`<option value="${n.id}" ${a.rocket===n.id?"selected":""}>${r(n.name)} (${e.inventory[`rocket:${n.id}`]})</option>`).join("")||'<option value="">— none in stock —</option>'}</select></label>
        ${d}
        <label class="check"><input type="checkbox" data-opt="extraTesting" ${a.extraTesting?"checked":""}> Extra Testing (+${l.extraTesting.addMonths} mo, +${l.extraTesting.costPct}% cost, ${l.extraTesting.failureMod*100}% failure)</label>
        <label class="check"><input type="checkbox" data-opt="rush" ${a.rush?"checked":""}> Rush (${l.rush.timePct}% time, +${l.rush.failureMod*100}% failure)</label>
        ${c}
      </div>
      <div class="card">
        <div class="name">Reliability</div>
        <table><tr><th>Rocket</th><th>Successes</th><th>Failure now</th><th></th></tr>${$}</table>
        ${e.cutCorners?`<div class="warn">Cut corners: next launch +${f(e.cutCorners)}</div>`:""}
      </div>
      <div class="card wide"><div class="name">Missions</div>${q()}</div>
    </div>`)}function B(e){if(e.win)return`<div class="good">🏁 Final mission: you win when the ${e.trip.months/12}-year voyage beyond Pluto departs.</div>`;const t=e.id in s.s.milestonesDone;if(t&&!e.repeatable)return'<div class="muted">No reward (already done).</div>';const i=t?e.repeatReward??e.reward:e.reward,d=!t&&e.realDate&&s.s.month<s.cal.fromYM(e.realDate)?` · ×${s.data.config.milestoneRules.earlyBonusTP} early bonus`:"",o=!t&&e.soviet&&s.s.month<s.cal.fromYM(e.soviet)?` · +${s.data.config.milestoneRules.worldFirstPI} PI World First`:"";return`<div class="good">Reward: ${i.tp} TP, ${i.pi} PI${d}${o}</div>`}function q(){return`<table class="missions"><tr><th>Milestone</th><th>Needs</th><th>Reward</th><th>Dates</th><th>Done</th></tr>${s.data.milestones.map(t=>{const i=s.s.milestonesDone[t.id],d=[`rocket:${t.needs.rocket}`,...t.needs.payload].map(c=>{const $=s.tierOf(c);return`<span class="${$&&Object.entries(s.s.inventory).some(([p,u])=>u>0&&p.split(":")[0]===c.split(":")[0]&&(s.tierOf(p)?.index??-1)>=$.index)?"ok":"miss"}">${r($?.tier.name??c)}</span>`}).join(" + "),o=[t.needs.launches?`${t.needs.launches} launches within ${t.needs.withinMonths} mo`:"",t.needs.tech?`tech ${t.needs.tech.join(", ")}`:"",t.needs.milestones?`after ${t.needs.milestones.join(", ")}`:""].filter(Boolean).join(" · "),l=[t.realDate?`real ${t.realDate.year}`:"",t.soviet?`Soviet ${t.soviet.year}${s.s.sovietShocked.includes(t.id)?" ✗":""}`:""].filter(Boolean).join(" · ");return`<tr class="${i!==void 0?"done":""}"><td>${i!==void 0?"✔ ":""}${r(t.name)}${t.crewed?" 👩‍🚀":""}</td><td>${d}${o?`<br><small>${o}</small>`:""}</td><td>${t.win?"🏁":`${t.reward.tp} TP · ${t.reward.pi} PI`}</td><td><small>${l}</small></td><td>${i!==void 0?s.cal.label(i):""}</td></tr>`}).join("")}</table>`}function F(){const e=s.s.jobs;m(h("#jobs"),e.length?e.map(t=>`<div class="job"><div>${r(t.name)} <small>${t.monthsLeft} mo</small></div>${w(t)}</div>`).join(""):'<p class="muted">Idle. Start research or builds.</p>')}function E(){m(h("#trip"),"")}function O(){const e=s.s.log.slice(-150).reverse();m(h("#log"),e.map(t=>`<div class="log ${t.kind}"><small>${t.date}</small> ${r(t.text)}</div>`).join(""))}function I(){const e=s.s;if(e.over){m(h("#modal"),`<div class="overlay"><div class="dialog ${e.over.result}">
      <h2>${e.over.result==="win"?"🏁 Victory!":"💥 Game over"}</h2>
      <p>${r(e.over.reason)}</p>
      <p>${s.date()} · ${(a.realMs/6e4).toFixed(0)} real minutes · ${Object.keys(e.milestonesDone).length} milestones · ${e.techs.length} techs</p>
      <button data-act="csv">Export telemetry CSV</button> <button data-act="newgame">New game</button>
    </div></div>`);return}const t=e.choices[0];if(!t)return m(h("#modal"),"");m(h("#modal"),`<div class="overlay"><div class="dialog">
    <h2>${r(t.title)}</h2><p>${r(t.text)}</p>
    <div class="choices">${t.options.map((i,d)=>b(`choice:${t.uid}:${d}`,`${r(i.label)}${i.effectText?` [${r(i.effectText)}]`:""}`,i.disabled?"Cannot afford":null)).join("")}</div>
    <p class="muted">${s.date()} · Cash ${v(e.cash)} · TP ${e.tp} · PI ${e.pi}</p>
  </div></div>`)}document.addEventListener("click",e=>{const t=e.target.closest("[data-act]");if(!t||t.disabled)return;const[i,d,o]=t.dataset.act.split(":");switch(i){case"tab":a.tab=d;break;case"speed":a.speed=d;break;case"research":s.startResearch(d);break;case"build":s.startBuild(o?`${d}:${o}`:d);break;case"repair":s.repair(d);break;case"choice":s.resolveChoice(Number(d),Number(o));break;case"launch":{const l=Object.entries(a.payload).filter(([,c])=>c).map(([c,$])=>`${c}:${$}`);s.startLaunch(a.rocket,l,a.extraTesting,a.rush)&&(a.payload={},a.extraTesting=a.rush=!1);break}case"csv":H();break;case"newgame":(s.s.over||k())&&(s=M());break}g()});function k(){const e=Date.now();return e-k.t<3e3?!0:(k.t=e,s.log("info",'Click "New game" again within 3 seconds to restart.'),!1)}document.addEventListener("change",e=>{const t=e.target;t.dataset.slot?a.payload[t.dataset.slot]=t.value:"rocket"in t.dataset?a.rocket=t.value:t.dataset.opt&&(a[t.dataset.opt]=t.checked),g()});document.addEventListener("keydown",e=>{if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;const t=s.data.config.speeds;e.key===" "?(a.speed=a.speed==="pause"?s.data.config.defaultSpeed:"pause",e.preventDefault()):/^[1-4]$/.test(e.key)&&t[Number(e.key)-1]&&(a.speed=t[Number(e.key)-1].id),g()});function x(){s.telemetry({type:"session",realMinutes:Math.round(a.realMs/6e4*10)/10,speedUsage:Object.entries(a.speedMs).map(([e,t])=>`${e}=${(t/6e4).toFixed(1)}min`).join(" ")})}function H(){x();const e=new Blob([L(s.s.telemetry)],{type:"text/csv"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`beyond-pluto-${s.s.seed}-${s.year()}.csv`,t.click(),URL.revokeObjectURL(t.href),s.s.telemetry.pop()}function T(e){const t=Math.min(1e3,e-a.last);a.last=e;let i=!1;if(s.s.over)a.endLogged||(a.endLogged=!0,x(),console.table(s.s.telemetry),i=!0);else{a.realMs+=t,a.speedMs[a.speed]=(a.speedMs[a.speed]??0)+t;const d=s.data.config.speeds.find(o=>o.id===a.speed)?.monthsPerMinute??0;if(s.s.choices.length)a.acc=0;else{for(a.acc+=t*d/6e4;a.acc>=1&&s.advanceMonth();)a.acc-=1,i=!0;a.acc>=1&&(a.acc=0)}}i&&g(),requestAnimationFrame(T)}g();requestAnimationFrame(T);
