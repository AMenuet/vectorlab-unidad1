const state = {
  mode: localStorage.getItem("vectorlab_mode_v2") || "class",
  section: "ops",
  activity: { ops: -1, dot: -1, cross: -1, mixed: -1 },
  done: JSON.parse(localStorage.getItem("vectorlab_done_v2") || "{}"),
  u: { x: 4, y: 2 },
  v: { x: 2, y: 3 },
  scalar: 1.5
};

const $ = id => document.getElementById(id);
const fmt = n => {
  const r = Math.round(n * 100) / 100;
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
};
const norm = a => Math.hypot(a.x,a.y);
const dot = (a,b) => a.x*b.x + a.y*b.y;
const add = (a,b) => ({x:a.x+b.x, y:a.y+b.y});
const scale = (a,c) => ({x:a.x*c, y:a.y*c});
const angle = (a,b) => {
  const den = norm(a)*norm(b);
  if (!den) return 0;
  const c = Math.max(-1, Math.min(1, dot(a,b)/den));
  return Math.acos(c)*180/Math.PI;
};
const projection = (v,u) => {
  const uu = dot(u,u);
  if (!uu) return {x:0,y:0};
  return scale(u, dot(u,v)/uu);
};

function saveDone(){
  localStorage.setItem("vectorlab_done_v2", JSON.stringify(state.done));
}

function key(section, idx, kind="a"){
  return `${section}-${kind}-${idx}`;
}

function markDone(section, idx, kind="a"){
  state.done[key(section, idx, kind)] = true;
  saveDone();
  updateProgress();
  renderMenus();
}

function parseVector(str){
  if(!str) return null;
  const cleaned = str.toLowerCase().replace(/sqrt\(2\)|√2/g, String(Math.SQRT2));
  const nums = cleaned.replace(/[()]/g,"").split(/[,\s;]+/).filter(Boolean).map(Number);
  if(nums.some(Number.isNaN)) return null;
  return nums;
}
function parseNumber(str){
  if(!str) return NaN;
  const s = str.trim().toLowerCase();
  if(s.includes("sqrt(2)") || s.includes("√2")) return Math.SQRT2;
  return Number(s.replace(",","."));
}
function approx(a,b,tol=.04){ return Math.abs(a-b) <= tol; }
function vecEquals(v,target,tol=.04){
  if(!v || v.length !== target.length) return false;
  return v.every((x,i)=>approx(x,target[i],tol));
}

function allItemsCount(){
  return Object.values(SECTIONS).length * (6 + 8);
}
function doneCount(){
  return Object.values(state.done).filter(Boolean).length;
}

function sectionProgress(section){
  let count = 0;
  for(let i=0;i<6;i++) if(state.done[key(section,i,"a")]) count++;
  for(let i=0;i<8;i++) if(state.done[key(section,i,"q")]) count++;
  return Math.round(count / 14 * 100);
}

function updateProgress(){
  const global = Math.round(doneCount()/allItemsCount()*100);
  $("globalScore").textContent = `${global}%`;

  const map = {ops:"pOps", dot:"pDot", cross:"pCross", mixed:"pMixed"};
  Object.keys(map).forEach(s=>{
    const p = sectionProgress(s);
    $(map[s]).value = p;
    $(`${map[s]}Txt`).textContent = `${p}%`;
  });

  const weak = Object.keys(SECTIONS).filter(s => sectionProgress(s) < 50).map(s => SECTIONS[s].short);
  $("diagnosticText").textContent = weak.length
    ? `Conviene seguir trabajando: ${weak.join(", ")}.`
    : "Buen avance general. Podés profundizar con ejercicios de la guía práctica.";
}

function setMode(mode){
  state.mode = mode;
  localStorage.setItem("vectorlab_mode_v2", mode);
  document.body.classList.toggle("class-mode", mode==="class");
  document.body.classList.toggle("study-mode", mode==="study");
  $("modeClass").classList.toggle("active", mode==="class");
  $("modeStudy").classList.toggle("active", mode==="study");
}

function setSection(section){
  state.section = section;
  document.querySelectorAll(".section").forEach(el=>el.classList.remove("active"));
  document.querySelectorAll(".section-btn").forEach(el=>el.classList.remove("active"));
  $(section).classList.add("active");
  document.querySelector(`.section-btn[data-section="${section}"]`).classList.add("active");
  $("currentSectionName").textContent = SECTIONS[section].title;
  showActivity(section, state.activity[section] || 0);
}

function showActivity(section, idx){
  state.activity[section] = idx;
  const total = 6;
  const isTheory = idx === -1;
  const isQuiz = idx === 6;
  document.querySelectorAll(`#${section}Activities .activity`).forEach(el=>el.classList.remove("active"));
  document.querySelectorAll(`#${section}Activities .theory-panel`).forEach(el=>el.classList.remove("active"));
  const quiz = $(`${section}Quiz`);
  quiz.classList.toggle("active", isQuiz);

  if(isTheory){
    const th = $(`${section}-theory`);
    if(th) th.classList.add("active");
    $("currentActivityName").textContent = "Teoría para estudio";
  } else if(!isQuiz){
    const act = $(`${section}-activity-${idx}`);
    if(act) act.classList.add("active");
    $("currentActivityName").textContent = `Actividad ${idx+1} de ${total}`;
  } else {
    $("currentActivityName").textContent = "Autoevaluación";
  }
  renderMenus();
  applyVectorNotation(document.querySelector("main"));
  setTimeout(drawAllCanvases, 50);
}

function renderMenus(){
  Object.keys(SECTIONS).forEach(section=>{
    const list = $(`${section}List`);
    if(!list) return;
    list.innerHTML = `<h3>${SECTIONS[section].short}</h3>`;
    const tbtn = document.createElement("button");
    tbtn.textContent = "Teoría para estudio";
    tbtn.className = (state.activity[section]===-1 ? "active " : "");
    tbtn.addEventListener("click",()=>showActivity(section,-1));
    list.appendChild(tbtn);
    for(let i=0;i<6;i++){
      const btn = document.createElement("button");
      btn.textContent = `Actividad ${i+1}`;
      btn.className = (state.activity[section]===i ? "active " : "") + (state.done[key(section,i,"a")] ? "done" : "");
      btn.addEventListener("click",()=>showActivity(section,i));
      list.appendChild(btn);
    }
    const qbtn = document.createElement("button");
    qbtn.textContent = "Autoevaluación";
    qbtn.className = (state.activity[section]===6 ? "active " : "");
    let qdone = 0;
    for(let i=0;i<8;i++) if(state.done[key(section,i,"q")]) qdone++;
    if(qdone===8) qbtn.classList.add("done");
    qbtn.addEventListener("click",()=>showActivity(section,6));
    list.appendChild(qbtn);
  });
}

function createVisual(activity, section, idx){
  if(activity.canvas === "opsComponents"){
    return `<canvas id="canvas-${section}-${idx}" class="ops-canvas" width="860" height="520"></canvas>
            <label class="range-label">Escalar c
              <input id="scalarRange-${section}-${idx}" type="range" min="-3" max="3" step="0.25" value="1.5">
              <output id="scalarOut-${section}-${idx}">1.5</output>
            </label>`;
  }
  if(activity.canvas === "dotFourQuadrants"){
    return `<canvas id="canvas-${section}-${idx}" class="dot-canvas" width="860" height="560"></canvas>
            <div class="formula">u·v = <span id="liveDot">—</span> · θ = <span id="liveAngle">—</span> · proyᵤ(v)=<span id="liveProj">—</span></div>`;
  }
  if(activity.visual === "cross3d"){
    return crossSvg();
  }
  if(activity.visual === "areaParallelogram"){
    return areaSvg();
  }
  if(activity.visual === "mixed3d"){
    return mixedSvg();
  }
  return `<div class="concept-card"><h3>Idea clave</h3><p>${activity.solution}</p></div>`;
}

function renderActivities(){
  Object.entries(SECTIONS).forEach(([section, data])=>{
    const container = $(`${section}Activities`);
    container.innerHTML = `<div class="theory-panel" id="${section}-theory">
      <div class="theory-header">
        <span class="tag">Modo estudio</span>
        <h2>Teoría de la sección</h2>
        <p>Texto adaptado del manual de clase para consultar antes de resolver las actividades.</p>
      </div>
      <div class="vector-convention">Convención de notación: los vectores se muestran en <span class="v">u</span>, <span class="v">v</span>, <span class="v">w</span> en negrita e itálica; las componentes se escriben como u₁, u₂, v₁, v₂.</div>
      <div class="theory-content">${data.theory || ""}</div>
    </div>`;
    data.activities.forEach((act, idx)=>{
      const el = document.createElement("div");
      el.className = "activity";
      el.id = `${section}-activity-${idx}`;
      el.innerHTML = `
        <h3>${act.title}</h3>
        <div class="mode-note class-only">Modo clase: usá esta actividad como pausa para discutir antes de verificar.</div>
        <div class="mode-note study-only">Modo estudio: intentá responder antes de pedir pista o ver resolución.</div>
        <div class="activity-layout">
          <div class="visual-card">
            ${createVisual(act, section, idx)}
          </div>
          <div class="answer-card">
            <p><strong>Consigna:</strong> <span class="mathline">${vectorMarkup(act.prompt)}</span></p>
            ${answerInput(act, section, idx)}
            <div class="actions">
              <button class="primary" data-action="check" data-section="${section}" data-idx="${idx}">Verificar</button>
              <button class="secondary" data-action="hint" data-section="${section}" data-idx="${idx}">Pista</button>
              <button class="ghost show-solution" data-action="solution" data-section="${section}" data-idx="${idx}">Ver resolución</button>
            </div>
            <p class="feedback" id="feedback-${section}-${idx}"></p>
            <div class="solution" id="solution-${section}-${idx}">${vectorMarkup(act.solution)}</div>
          </div>
        </div>`;
      container.appendChild(el);
    });
  });
}

function answerInput(act, section, idx){
  if(act.type === "choice" || act.type === "dotInteractive"){
    return `<div class="answer-row"><select id="answer-${section}-${idx}">
      <option value="">Seleccionar...</option>
      ${act.options.map(o=>`<option value="${o}">${o}</option>`).join("")}
    </select></div>`;
  }
  return `<div class="answer-row"><input id="answer-${section}-${idx}" placeholder="${act.placeholder || "Ingresá tu respuesta"}"></div>`;
}

function renderQuizzes(){
  Object.entries(SECTIONS).forEach(([section, data])=>{
    const container = $(`${section}Quiz`);
    container.innerHTML = `
      <div class="quiz-intro">
        <h3>Autoevaluación · ${data.title}</h3>
        <p>Respondé las 8 preguntas. La app registra tu avance por sección.</p>
      </div>
      <div class="quiz-grid" id="${section}QuizGrid"></div>`;
    const grid = $(`${section}QuizGrid`);
    data.quiz.forEach((q, idx)=>{
      const box = document.createElement("div");
      box.className = "quiz-item";
      box.innerHTML = `<h4>${idx+1}. ${vectorMarkup(q[0])}</h4><div class="quiz-options"></div><p class="quiz-feedback"></p>`;
      const opts = box.querySelector(".quiz-options");
      q[1].forEach((op,i)=>{
        const b = document.createElement("button");
        b.innerHTML = vectorMarkup(op);
        if(state.done[key(section,idx,"q")] && i===q[2]) b.classList.add("correct");
        b.addEventListener("click",()=>{
          opts.querySelectorAll("button").forEach((bb,j)=>{
            bb.disabled=true;
            if(j===q[2]) bb.classList.add("correct");
            if(j===i && i!==q[2]) bb.classList.add("wrong");
          });
          const fb = box.querySelector(".quiz-feedback");
          if(i===q[2]){
            fb.innerHTML = vectorMarkup("Correcto. " + q[3]);
            fb.style.color = "var(--green)";
            markDone(section, idx, "q");
          } else {
            fb.innerHTML = vectorMarkup("Revisar. " + q[3]);
            fb.style.color = "var(--red)";
          }
        });
        opts.appendChild(b);
      });
      grid.appendChild(box);
    });
  });
}

function setFeedback(section, idx, text, ok=false){
  const el = $(`feedback-${section}-${idx}`);
  el.innerHTML = vectorMarkup(text);
  el.style.color = ok ? "var(--green)" : "var(--red)";
}

function checkAnswer(section, idx){
  const act = SECTIONS[section].activities[idx];
  const input = $(`answer-${section}-${idx}`);
  let ok = false;

  if(act.type === "choice"){
    ok = input.value === act.answer;
  } else if(act.type === "dotInteractive"){
    const d = dot(state.u,state.v);
    const sign = Math.abs(d)<0.08 ? "Cero" : d>0 ? "Positivo" : "Negativo";
    ok = input.value === sign;
  } else if(act.type === "numeric"){
    ok = approx(parseNumber(input.value), act.answer, .04);
  } else if(act.type === "numericApprox"){
    const expected = act.correctedAnswer ?? act.answer;
    ok = approx(parseNumber(input.value), expected, act.tolerance || .05);
  } else if(act.type === "vector"){
    ok = vecEquals(parseVector(input.value), act.answer, .06);
  } else if(act.type === "vector2d"){
    ok = vecEquals(parseVector(input.value), [state.u.x,state.u.y], .06);
  } else if(act.type === "text"){
    const val = input.value.replace(/\s/g,"").toLowerCase();
    ok = act.answerKeywords.every(k => val.includes(k.replace(/\s/g,"").toLowerCase()));
  }

  if(ok){
    setFeedback(section, idx, "Correcto. Buen trabajo.", true);
    markDone(section, idx, "a");
  } else {
    setFeedback(section, idx, "Revisar. Pedí una pista si lo necesitás.", false);
  }
}

function showHint(section, idx){
  const act = SECTIONS[section].activities[idx];
  const el = $(`feedback-${section}-${idx}`);
  el.innerHTML = "Pista: " + vectorMarkup(act.hint);
  el.style.color = "var(--orange)";
}

function showSolution(section, idx){
  $(`solution-${section}-${idx}`).classList.toggle("visible");
}

function attachActions(){
  document.body.addEventListener("click", ev=>{
    const btn = ev.target.closest("[data-action]");
    if(!btn) return;
    const section = btn.dataset.section;
    const idx = Number(btn.dataset.idx);
    if(btn.dataset.action === "check") checkAnswer(section,idx);
    if(btn.dataset.action === "hint") showHint(section,idx);
    if(btn.dataset.action === "solution") showSolution(section,idx);
  });
}

function crossSvg(){
  return `<svg viewBox="0 0 760 420" class="svg-visual" role="img" aria-label="Producto vectorial">
    <defs>
      <marker id="arrBlack" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#111"></path></marker>
      <marker id="arrBlue" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#0b5cad"></path></marker>
    </defs>
    <polygon points="110,300 560,270 650,120 200,150" fill="#e5e7eb" stroke="#64748b" stroke-width="2"/>
    <circle cx="210" cy="275" r="7" fill="#111"/>
    <line x1="210" y1="275" x2="560" y2="255" stroke="#111" stroke-width="4" marker-end="url(#arrBlack)"/>
    <line x1="210" y1="275" x2="345" y2="155" stroke="#334155" stroke-width="4" marker-end="url(#arrBlack)"/>
    <line x1="210" y1="275" x2="210" y2="70" stroke="#0b5cad" stroke-width="5" marker-end="url(#arrBlue)"/>
    <path d="M 286 271 A 76 76 0 0 0 267 224" fill="none" stroke="#111" stroke-width="2.5"/>
    <text x="515" y="292" class="svg-label">u</text>
    <text x="352" y="160" class="svg-label">v</text>
    <text x="235" y="95" class="svg-label blue">w = u × v</text>
    <text x="279" y="240" class="svg-small">θ</text>
  </svg>`;
}

function areaSvg(){
  return `<svg viewBox="0 0 760 420" class="svg-visual" role="img" aria-label="Área del paralelogramo">
    <defs><marker id="arrB2" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#111"></path></marker></defs>
    <polygon points="120,310 560,310 640,100 200,100" fill="#eef2ff" stroke="#111" stroke-width="3"/>
    <line x1="120" y1="310" x2="560" y2="310" stroke="#111" stroke-width="5" marker-end="url(#arrB2)"/>
    <line x1="120" y1="310" x2="200" y2="100" stroke="#334155" stroke-width="5" marker-end="url(#arrB2)"/>
    <line x1="200" y1="100" x2="200" y2="310" stroke="#777" stroke-dasharray="8 7" stroke-width="2"/>
    <text x="335" y="350" class="svg-label">u</text>
    <text x="145" y="200" class="svg-label">v</text>
    <text x="225" y="210" class="svg-small">||v|| sen(θ)</text>
    <text x="300" y="80" class="svg-label blue">Área = ||u × v||</text>
  </svg>`;
}

function mixedSvg(){
  return `<svg viewBox="0 0 760 420" class="svg-visual" role="img" aria-label="Producto mixto y volumen del paralelepípedo">
    <defs>
      <marker id="arrMixBlack" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#111"></path></marker>
      <marker id="arrMixGray" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#334155"></path></marker>
      <marker id="arrMixGreen" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#0f766e"></path></marker>
    </defs>
    <polygon points="140,300 430,300 530,210 240,210" fill="#eef2ff" stroke="#64748b" stroke-width="2"/>
    <polygon points="180,170 470,170 570,80 280,80" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
    <polygon points="140,300 180,170 470,170 430,300" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
    <polygon points="240,210 280,80 570,80 530,210" fill="#dbeafe" stroke="#94a3b8" stroke-width="2"/>
    <polygon points="430,300 470,170 570,80 530,210" fill="#dbeafe" stroke="#94a3b8" stroke-width="2"/>

    <line x1="140" y1="300" x2="430" y2="300" stroke="#111" stroke-width="4" marker-end="url(#arrMixBlack)"/>
    <line x1="140" y1="300" x2="240" y2="210" stroke="#334155" stroke-width="4" marker-end="url(#arrMixGray)"/>
    <line x1="140" y1="300" x2="180" y2="170" stroke="#0f766e" stroke-width="4" marker-end="url(#arrMixGreen)"/>

    <line x1="180" y1="170" x2="205" y2="245" stroke="#94a3b8" stroke-dasharray="8 7" stroke-width="2.5"/>
    <line x1="205" y1="245" x2="228" y2="235" stroke="#94a3b8" stroke-width="2"/>
    <line x1="228" y1="235" x2="220" y2="216" stroke="#94a3b8" stroke-width="2"/>

    <text x="315" y="325" class="svg-label">v</text>
    <text x="188" y="235" class="svg-label">w</text>
    <text x="150" y="210" class="svg-label green">u</text>
    <text x="214" y="262" class="svg-small">h</text>
    <text x="285" y="62" class="svg-label blue">V = |u · (v × w)|</text>
    <text x="292" y="102" class="svg-small">base = ||v × w||</text>
  </svg>`;
}

// Drawing centered four quadrant canvas
const centeredView = { xmin:-6, xmax:6, ymin:-6, ymax:6 };
function canvasPoint(canvas, p){
  const pad = 40;
  const w = canvas.width - 2*pad, h = canvas.height - 2*pad;
  return {
    x: pad + (p.x-centeredView.xmin)/(centeredView.xmax-centeredView.xmin)*w,
    y: pad + (centeredView.ymax-p.y)/(centeredView.ymax-centeredView.ymin)*h
  };
}
function fromCanvas(canvas, x, y){
  const pad = 40;
  const w = canvas.width - 2*pad, h = canvas.height - 2*pad;
  return {
    x: centeredView.xmin + (x-pad)/w*(centeredView.xmax-centeredView.xmin),
    y: centeredView.ymax - (y-pad)/h*(centeredView.ymax-centeredView.ymin)
  };
}
function drawArrow(ctx, canvas, a, b, color="#111", width=3, label=""){
  const A = canvasPoint(canvas,a), B = canvasPoint(canvas,b);
  const ang = Math.atan2(B.y-A.y,B.x-A.x);
  ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=width;
  ctx.beginPath(); ctx.moveTo(A.x,A.y); ctx.lineTo(B.x,B.y); ctx.stroke();
  const head=12;
  ctx.beginPath();
  ctx.moveTo(B.x,B.y);
  ctx.lineTo(B.x-head*Math.cos(ang-Math.PI/7), B.y-head*Math.sin(ang-Math.PI/7));
  ctx.lineTo(B.x-head*Math.cos(ang+Math.PI/7), B.y-head*Math.sin(ang+Math.PI/7));
  ctx.closePath(); ctx.fill();
  if(label){
    ctx.font="bold 18px Georgia";
    ctx.fillText(label,(A.x+B.x)/2+8,(A.y+B.y)/2-8);
  }
}
function drawCenteredGrid(canvas, ctx){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#fbfdff"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle="#e7eef8"; ctx.lineWidth=1;
  for(let x=-6;x<=6;x++){
    const p1=canvasPoint(canvas,{x:x,y:-6}), p2=canvasPoint(canvas,{x:x,y:6});
    ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke();
  }
  for(let y=-6;y<=6;y++){
    const p1=canvasPoint(canvas,{x:-6,y:y}), p2=canvasPoint(canvas,{x:6,y:y});
    ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke();
  }
  const xA=canvasPoint(canvas,{x:-6,y:0}), xB=canvasPoint(canvas,{x:6,y:0});
  const yA=canvasPoint(canvas,{x:0,y:-6}), yB=canvasPoint(canvas,{x:0,y:6});
  ctx.strokeStyle="#111"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(xA.x,xA.y); ctx.lineTo(xB.x,xB.y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(yA.x,yA.y); ctx.lineTo(yB.x,yB.y); ctx.stroke();
  // flechas positivas de los ejes
  ctx.fillStyle="#111";
  const ah=10;
  ctx.beginPath();
  ctx.moveTo(xB.x, xB.y);
  ctx.lineTo(xB.x-ah, xB.y-4);
  ctx.lineTo(xB.x-ah, xB.y+4);
  ctx.closePath(); ctx.fill();
  ctx.beginPath();
  ctx.moveTo(yB.x, yB.y);
  ctx.lineTo(yB.x-4, yB.y+ah);
  ctx.lineTo(yB.x+4, yB.y+ah);
  ctx.closePath(); ctx.fill();
  ctx.font="16px Georgia";
  ctx.fillText("x", xB.x+8, xB.y-8);
  ctx.fillText("y", yB.x+8, yB.y-10);
  ctx.fillText("0", canvasPoint(canvas,{x:0,y:0}).x+6, canvasPoint(canvas,{x:0,y:0}).y+16);
}
function drawSupportLine(ctx, canvas, u){
  const m = Math.hypot(u.x,u.y);
  if(m < 1e-9) return;
  const dir = {x:u.x/m, y:u.y/m};
  const p1 = {x:-8*dir.x, y:-8*dir.y};
  const p2 = {x:8*dir.x, y:8*dir.y};
  const A=canvasPoint(canvas,p1), B=canvasPoint(canvas,p2);
  ctx.strokeStyle="#9ca3af"; ctx.lineWidth=1.5; ctx.setLineDash([5,5]);
  ctx.beginPath(); ctx.moveTo(A.x,A.y); ctx.lineTo(B.x,B.y); ctx.stroke();
  ctx.setLineDash([]);
}
function drawAngleArc(ctx, canvas, u, v, radius=58){
  const O = canvasPoint(canvas,{x:0,y:0});
  const a1 = Math.atan2(-u.y, u.x);
  const a2 = Math.atan2(-v.y, v.x);
  let diff = a2 - a1;
  while(diff <= -Math.PI) diff += 2*Math.PI;
  while(diff > Math.PI) diff -= 2*Math.PI;
  ctx.strokeStyle="#b45309"; ctx.lineWidth=2.5;
  ctx.beginPath();
  ctx.arc(O.x, O.y, radius, -a1, -(a1+diff), diff>0);
  ctx.stroke();
  const mid = a1 + diff/2;
  ctx.fillStyle="#b45309"; ctx.font="18px Georgia";
  ctx.fillText("θ", O.x + (radius+15)*Math.cos(mid), O.y - (radius+10)*Math.sin(mid));
}
function drawRightAngleMarker(ctx, canvas, foot, u, size=12){
  const m=Math.hypot(u.x,u.y);
  if(m < 1e-9) return;
  const e1={x:u.x/m, y:u.y/m};
  const e2={x:-e1.y, y:e1.x};
  const pA = {x:foot.x + e1.x*size/10, y:foot.y + e1.y*size/10};
  const pB = {x:pA.x + e2.x*size/10, y:pA.y + e2.y*size/10};
  const pC = {x:foot.x + e2.x*size/10, y:foot.y + e2.y*size/10};
  const A=canvasPoint(canvas,pA), B=canvasPoint(canvas,pB), C=canvasPoint(canvas,pC);
  ctx.strokeStyle="#777"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(A.x,A.y); ctx.lineTo(B.x,B.y); ctx.lineTo(C.x,C.y); ctx.stroke();
}
function drawOpsCanvas(canvas){
  const ctx = canvas.getContext("2d");
  drawCenteredGrid(canvas,ctx);
  const O={x:0,y:0}, u=state.u, v=state.v, w=add(u,v), cu=scale(u,state.scalar);
  const U=canvasPoint(canvas,u), W=canvasPoint(canvas,w), V=canvasPoint(canvas,v);
  ctx.setLineDash([7,5]); ctx.strokeStyle="#94a3b8"; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(U.x,U.y); ctx.lineTo(W.x,W.y); ctx.lineTo(V.x,V.y); ctx.stroke();
  ctx.setLineDash([]);
  drawArrow(ctx,canvas,O,u,"#111",3,"u");
  drawArrow(ctx,canvas,O,v,"#334155",3,"v");
  drawArrow(ctx,canvas,O,w,"#0b5cad",4,"w = u + v");
  drawArrow(ctx,canvas,O,cu,"#0f766e",2,"c u");
  [u,v].forEach((p,i)=>{
    const P=canvasPoint(canvas,p); ctx.fillStyle=i?"#334155":"#111"; ctx.beginPath(); ctx.arc(P.x,P.y,8,0,Math.PI*2); ctx.fill();
  });
}
function drawDotCanvas(canvas){
  const ctx = canvas.getContext("2d");
  drawCenteredGrid(canvas,ctx);
  const O={x:0,y:0}, u=state.u, v=state.v, proj=projection(v,u);
  drawSupportLine(ctx,canvas,u);
  drawArrow(ctx,canvas,O,u,"#111",3,"u");
  drawArrow(ctx,canvas,O,v,"#334155",3,"v");
  drawArrow(ctx,canvas,O,proj,"#0b5cad",5,"proyᵤ(v)");

  const Vp=canvasPoint(canvas,v), Pp=canvasPoint(canvas,proj);
  ctx.strokeStyle="#777"; ctx.setLineDash([6,6]); ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(Vp.x,Vp.y); ctx.lineTo(Pp.x,Pp.y); ctx.stroke(); ctx.setLineDash([]);
  drawRightAngleMarker(ctx,canvas,proj,u,12);
  drawAngleArc(ctx,canvas,u,v,58);

  [u,v].forEach((p,i)=>{
    const P=canvasPoint(canvas,p); ctx.fillStyle=i?"#334155":"#111"; ctx.beginPath(); ctx.arc(P.x,P.y,8,0,Math.PI*2); ctx.fill();
  });

  const liveDot=$("liveDot"), liveAngle=$("liveAngle"), liveProj=$("liveProj");
  if(liveDot){
    const d=dot(u,v), pr=proj;
    liveDot.textContent=fmt(d);
    liveAngle.textContent=fmt(angle(u,v))+"°";
    liveProj.textContent=`(${fmt(pr.x)}, ${fmt(pr.y)})`;
  }
}
function drawAllCanvases(){
  document.querySelectorAll(".ops-canvas").forEach(drawOpsCanvas);
  document.querySelectorAll(".dot-canvas").forEach(drawDotCanvas);
}

let dragCanvas = null, dragVector = null;
function pointerPos(ev, canvas){
  const r=canvas.getBoundingClientRect();
  return {x:(ev.clientX-r.left)*canvas.width/r.width, y:(ev.clientY-r.top)*canvas.height/r.height};
}
function setupCanvasDragging(){
  document.body.addEventListener("pointerdown",ev=>{
    const canvas = ev.target.closest("canvas");
    if(!canvas) return;
    const p=pointerPos(ev,canvas);
    const U=canvasPoint(canvas,state.u), V=canvasPoint(canvas,state.v);
    if(Math.hypot(p.x-U.x,p.y-U.y)<20) dragVector="u";
    else if(Math.hypot(p.x-V.x,p.y-V.y)<20) dragVector="v";
    else return;
    dragCanvas=canvas;
  });
  document.body.addEventListener("pointermove",ev=>{
    if(!dragCanvas || !dragVector) return;
    const p=pointerPos(ev,dragCanvas);
    const val=fromCanvas(dragCanvas,p.x,p.y);
    state[dragVector]={x:Math.round(Math.max(-6,Math.min(6,val.x))*4)/4, y:Math.round(Math.max(-6,Math.min(6,val.y))*4)/4};
    drawAllCanvases();
  });
  document.body.addEventListener("pointerup",()=>{dragCanvas=null; dragVector=null;});
  document.body.addEventListener("input",ev=>{
    if(ev.target.id && ev.target.id.startsWith("scalarRange")){
      state.scalar = Number(ev.target.value);
      const out = document.getElementById(ev.target.id.replace("scalarRange","scalarOut"));
      if(out) out.textContent = fmt(state.scalar);
      drawAllCanvases();
    }
  });
}


function vectorMarkup(text){
  if(text === undefined || text === null) return "";
  let s = String(text);

  // No tocar contenido HTML ya marcado como span.v
  // Vectorizamos símbolos sueltos: u, v, w, F, r, M.
  // No vectorizamos d porque en la app también se usa mucho como distancia escalar.
  const vectorTokens = ["u","v","w","F","r","M"];
  const pattern = new RegExp(`(^|[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9_₀₁₂₃₄₅₆₇₈₉])(${vectorTokens.join("|")})(?![A-Za-zÁÉÍÓÚáéíóúÑñ0-9_₀₁₂₃₄₅₆₇₈₉])`, "g");

  s = s.replace(pattern, (match, prefix, sym) => {
    return `${prefix}<span class="v">${sym}</span>`;
  });

  return s;
}

function applyVectorNotation(root=document.body){
  // Versión 7: se vectorizan explícitamente consignas, pistas, soluciones y quiz con vectorMarkup().
  return;
}

function init(){
  renderActivities();
  renderQuizzes();
  applyVectorNotation(document.querySelector("main"));
  renderMenus();
  attachActions();
  setupCanvasDragging();

  document.querySelectorAll(".section-btn").forEach(btn=>btn.addEventListener("click",()=>setSection(btn.dataset.section)));
  $("modeClass").addEventListener("click",()=>setMode("class"));
  $("modeStudy").addEventListener("click",()=>setMode("study"));
  $("resetProgress").addEventListener("click",()=>{
    if(confirm("¿Reiniciar todo el progreso?")){
      state.done={}; saveDone(); updateProgress(); renderMenus(); renderQuizzes();
    }
  });

  setMode(state.mode);
  setSection("ops");
  updateProgress();
  drawAllCanvases();
}
init();
