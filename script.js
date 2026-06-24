const projects = [
  {
    id: "runner-prototype",
    title: "轻度恐怖跑酷原型",
    repo: "MildHorrorEscape",
    type: "Unity Mobile Gameplay Prototype",
    role: "独立开发 / 玩法逻辑 / UI 反馈",
    period: "Unity / Mobile",
    award: "核心项目占位",
    priority: "core",
    category: "personal",
    summary: "基于 Unity 的轻度恐怖追逐玩法原型，包含角色状态、敌人攻击节奏、音效反馈和移动端适配。",
    contribution: "负责玩法循环、角色状态、敌人攻击节奏、UI 反馈和移动端体验搭建。后续可替换为你的真实项目截图、演示视频和项目仓库。",
    highlights: ["角色移动、受击、死亡等状态统一收敛到可追踪流程。", "敌人攻击节奏与反馈动画解耦，方便调整难度。", "移动端安全区、按钮反馈和音效触发统一管理。"],
    tags: ["Unity", "C#", "Gameplay", "Mobile", "State Machine"],
    stack: [["Engine", "Unity / C# / Animator"], ["Gameplay", "追逐 / 闪避 / 攻击节奏"], ["UI", "UGUI / 移动端适配 / 安全区"], ["Feedback", "音效 / 动画 / 状态反馈"]],
    systems: ["角色状态系统：组织移动、受击、死亡和反馈切换。", "敌人策略系统：拆分攻击节奏、预警和命中判断。", "移动端交互：适配不同分辨率和操作区域。", "反馈系统：统一管理音效、提示和视觉表现。"],
    image: "./Assets/project-runner-cover.svg",
    gallery: ["./Assets/project-runner-01.svg", "./Assets/project-runner-02.svg", "./Assets/project-runner-03.svg"],
    video: "",
    videoFallback: "./Assets/videos/project-runner.mp4",
    link: "https://github.com/moshengren151"
  },
  {
    id: "vr-training",
    title: "VR 交互训练场景",
    repo: "VR Interaction Demo",
    type: "Unity XR / VR Interaction",
    role: "交互系统 / 场景搭建 / 输入反馈",
    period: "Unity XR",
    award: "重点项目占位",
    priority: "featured",
    category: "personal",
    summary: "面向训练场景的 VR 交互样例，强调手柄输入、空间反馈、任务流程和沉浸式引导。",
    contribution: "负责 VR 空间交互、任务步骤、输入反馈和场景流程搭建，后续可补充真实设备、截图与视频演示。",
    highlights: ["手柄输入与可交互物体反馈分层处理。", "任务阶段以清晰节点组织，方便扩展训练内容。", "空间提示和 UI 引导兼顾沉浸感与可读性。"],
    tags: ["Unity XR", "VR", "Interaction", "Simulation"],
    stack: [["Engine", "Unity XR / C#"], ["Input", "手柄射线 / 交互反馈"], ["Flow", "任务步骤 / 训练流程"], ["Scene", "空间提示 / 沉浸引导"]],
    systems: ["手柄射线交互：统一处理选择、抓取和反馈。", "训练步骤管理：节点式组织任务流程。", "空间提示反馈：引导用户完成关键动作。", "完成判定：追踪任务状态并给出反馈。"],
    image: "./Assets/project-vr-cover.svg",
    gallery: ["./Assets/project-vr-01.svg", "./Assets/project-vr-02.svg", "./Assets/project-vr-03.svg"],
    video: "",
    videoFallback: "./Assets/videos/project-vr.mp4",
    link: "https://github.com/moshengren151"
  },
  {
    id: "ai-character",
    title: "AI 交互角色 Demo",
    repo: "AI Character Prototype",
    type: "AI Interaction / Dialogue Prototype",
    role: "原型开发 / 对话流程 / 行为反馈",
    period: "Unity Prototype",
    award: "扩展项目占位",
    priority: "normal",
    category: "personal",
    summary: "探索 AI 角色与玩家之间的互动流程，将对话、情绪反馈和场景事件组织成可演示原型。",
    contribution: "负责 AI 交互原型结构、对话流程、情绪反馈和场景事件连接，后续可替换为真实 AI 项目素材。",
    highlights: ["对话节点、情绪状态和场景事件保持清晰映射。", "角色反馈可通过动画、表情和提示文本组合呈现。", "原型结构便于替换不同 AI 服务或本地规则。"],
    tags: ["Unity", "AI", "Dialogue", "Prototype"],
    stack: [["Engine", "Unity / C#"], ["AI", "Dialogue Flow / Prompt"], ["Feedback", "表情 / 动画 / 提示"], ["Event", "场景事件 / 状态切换"]],
    systems: ["对话流程编排：维护用户输入和角色反馈链路。", "情绪状态切换：根据上下文改变表现。", "场景事件触发：将对话结果映射到场景。", "角色反馈表现：组合动画、表情和文本提示。"],
    image: "./Assets/project-ai-cover.svg",
    gallery: ["./Assets/project-ai-01.svg", "./Assets/project-ai-02.svg", "./Assets/project-ai-03.svg"],
    video: "",
    videoFallback: "./Assets/videos/project-ai.mp4",
    link: "https://github.com/moshengren151"
  }
];

const skills = ["Unity", "C#", "Gameplay", "UGUI", "Animator", "Mobile Adaptation", "Game Prototype", "Performance Optimization", "Git"];
const views = { home: document.querySelector("#homeView"), detail: document.querySelector("#detailView"), profile: document.querySelector("#profileView") };
const flare = document.querySelector("#viewFlare");
const featuredProject = document.querySelector("#featuredProject");
const sideProjects = document.querySelector("#sideProjects");
const categorySwitch = document.querySelector("#categorySwitch");
const mobileProjectFeed = document.querySelector("#mobileProjectFeed");
const workViewport = document.querySelector("#workViewport");
const workTrack = document.querySelector("#workTrack");
const detailPanel = document.querySelector("#detailPanel");
const profileTags = document.querySelector("#profileTags");
let currentFilter = "all";
let carouselOffset = 0;
let carouselLoopWidth = 0;
let carouselPaused = false;
let carouselDragging = false;
let carouselPointerId = null;
let carouselStartX = 0;
let carouselStartOffset = 0;
let carouselDragDistance = 0;
let carouselActiveId = "";
let carouselLastTime = performance.now();
let detailGalleryState = null;

function visibleProjects() { return currentFilter === "all" ? projects : projects.filter((project) => project.category === currentFilter); }
function tagsMarkup(tags) { return tags.map((tag) => `<span>${tag}</span>`).join(""); }
function projectClass(project) { return project.priority === "core" ? "is-core" : project.priority === "featured" ? "is-featured" : ""; }
function activateView(name, trigger) {
  if (trigger && flare) {
    const rect = trigger.getBoundingClientRect();
    flare.style.setProperty("--flare-x", `${rect.left + rect.width / 2}px`);
    flare.style.setProperty("--flare-y", `${rect.top + rect.height / 2}px`);
  }
  if (flare) { flare.classList.remove("is-running"); void flare.offsetWidth; flare.classList.add("is-running"); }
  Object.entries(views).forEach(([key, view]) => view.classList.toggle("is-active", key === name));
  if (name !== "detail") { stopDetailGallery(); releaseVideos(); }
  carouselPaused = name !== "home";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderHome() {
  const list = visibleProjects();
  const feature = list[0] || projects[0];
  featuredProject.innerHTML = `<div class="featured-media" style="--image:url(${feature.image})"><span>${feature.award}</span></div><div class="featured-copy"><p class="kicker">Featured Project</p><h2>${feature.title}</h2><p>${feature.summary}</p><div class="project-actions"><a href="#" data-open="${feature.id}">查看项目详情</a><a href="${feature.link}" target="_blank" rel="noreferrer">GitHub</a></div></div>`;
  sideProjects.innerHTML = list.slice(1, 3).map((project) => `<button class="rail-card" type="button" data-open="${project.id}" style="--image:url(${project.image})"><span class="rail-label">${project.type}</span><h3>${project.title}</h3><p>${project.summary}</p></button>`).join("");
  mobileProjectFeed.innerHTML = `<div class="mobile-feed-heading"><p class="kicker">Selected Work</p></div>` + list.map((project) => `<button class="mobile-card ${projectClass(project)}" type="button" data-open="${project.id}"><img src="${project.image}" alt="${project.title}"><span>${project.award}</span><h3>${project.title}</h3><p>${project.summary}</p><div class="mobile-card-footer"><small>${project.role}</small><strong>查看详情</strong></div></button>`).join("");
  renderWorkCards();
  bindOpenButtons();
}

function renderWorkCards() {
  const list = visibleProjects();
  const repeat = Math.max(3, Math.ceil(9 / Math.max(list.length, 1)));
  const loop = Array.from({ length: repeat }, () => list).flat();
  workTrack.innerHTML = loop.map((project, index) => `<button class="work-card ${projectClass(project)}" type="button" data-project="${project.id}" style="--image:url(${project.image})"><span class="work-index">${String((index % list.length) + 1).padStart(2, "0")}</span>${project.priority !== "normal" ? `<span class="ribbon">${project.award}</span>` : ""}<div class="work-content"><span class="work-type">${project.type}</span><h2>${project.title}</h2><p>${project.award} · ${project.role}</p><div class="card-tags">${tagsMarkup(project.tags.slice(0, 4))}</div><small>${project.summary}</small><span class="hover-hint">查看项目详情 <span>Enter</span></span></div></button>`).join("");
  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });
  measureCarousel();
}

function bindOpenButtons() { document.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", (event) => openProject(event.currentTarget.dataset.open, event.currentTarget))); }
function openProject(id, trigger) { const project = projects.find((item) => item.id === id); if (!project) return; renderDetail(project); activateView("detail", trigger); }
function videoSource(project) { return project.video || project.videoFallback || ""; }
function videoMarkup(project) {
  const source = videoSource(project);
  if (!source) return `<div class="video-placeholder"><strong>视频待补充</strong><small>后续把演示视频放到 Assets/videos 即可</small></div>`;
  return `<div class="video-wrapper"><video class="project-video" src="${source}" poster="${project.image}" controls playsinline preload="none"></video></div>`;
}
function renderDetail(project) {
  stopDetailGallery(); releaseVideos();
  detailPanel.innerHTML = `<div class="detail-hero"><div class="detail-media"><img src="${project.image}" alt="${project.title}"><span class="scanline"></span><span class="corner corner-a"></span><span class="corner corner-b"></span></div><div class="detail-copy"><p class="kicker">${project.repo}</p><h2>${project.title}</h2><p>${project.summary}</p><div class="meta-row"><span>${project.type}</span><span>${project.role}</span><span>${project.period}</span><span>${project.award}</span></div><div class="tag-row">${tagsMarkup(project.tags)}</div><div class="project-actions"><a href="${project.link}" target="_blank" rel="noreferrer">打开 GitHub</a></div></div></div><div class="detail-body"><section class="detail-section"><h3>项目简介</h3><p>${project.contribution}</p><h3>技术亮点</h3><ul>${project.highlights.map((item) => `<li>${item}</li>`).join("")}</ul></section><section class="detail-section"><h3>技术栈与系统拆解</h3><div class="stack-grid">${project.stack.map(([label, value]) => `<div class="stack-item"><span>${label}</span><strong>${value}</strong></div>`).join("")}</div><ul>${project.systems.map((item) => `<li>${item}</li>`).join("")}</ul></section><section class="detail-section media-section"><h3>视频与演示图</h3>${videoMarkup(project)}<div class="detail-gallery" id="detailGallery"><div class="detail-gallery-track" id="detailGalleryTrack">${[...project.gallery, ...project.gallery].map((src, index) => `<img src="${src}" alt="${project.title} 演示图 ${(index % project.gallery.length) + 1}">`).join("")}</div></div></section></div>`;
  const video = detailPanel.querySelector("video");
  if (video) video.addEventListener("error", () => showVideoError(project));
  setupDetailGallery();
}
function showVideoError(project) { const wrapper = detailPanel.querySelector(".video-wrapper"); if (!wrapper) return; releaseVideos(wrapper); wrapper.outerHTML = `<div class="video-error"><p>视频暂时无法加载，可以尝试刷新页面或打开项目仓库查看演示说明。</p>${project.video ? `<a href="${project.video}" target="_blank" rel="noreferrer">打开视频外链</a>` : ""}</div>`; }
function releaseVideos(scope = detailPanel) { scope.querySelectorAll("video").forEach((video) => { video.pause(); video.removeAttribute("src"); video.load(); }); }

function measureCarousel() { const marker = workTrack.children[visibleProjects().length]; carouselLoopWidth = marker ? marker.offsetLeft : workTrack.scrollWidth / 2; normalizeCarousel(); syncCarousel(); }
function normalizeCarousel() { if (carouselLoopWidth <= 0) return; while (carouselOffset <= -carouselLoopWidth) carouselOffset += carouselLoopWidth; while (carouselOffset > 0) carouselOffset -= carouselLoopWidth; }
function syncCarousel() { workTrack.style.transform = `translate3d(${carouselOffset}px, 0, 0)`; }
function animateCarousel(time) { const delta = Math.min(40, time - carouselLastTime); carouselLastTime = time; if (!carouselPaused && !carouselDragging && carouselLoopWidth > 0) { carouselOffset -= delta * 0.032; normalizeCarousel(); syncCarousel(); } requestAnimationFrame(animateCarousel); }
function startDrag(event) { const card = event.target.closest(".work-card"); if (!card) return; carouselDragging = true; carouselPaused = true; carouselPointerId = event.pointerId; carouselStartX = event.clientX; carouselStartOffset = carouselOffset; carouselDragDistance = 0; carouselActiveId = card.dataset.project || ""; card.classList.add("is-touched"); workViewport.classList.add("is-dragging"); workViewport.setPointerCapture(event.pointerId); }
function moveDrag(event) { if (!carouselDragging || event.pointerId !== carouselPointerId) return; const dx = event.clientX - carouselStartX; carouselDragDistance = Math.max(carouselDragDistance, Math.abs(dx)); carouselOffset = carouselStartOffset + dx; normalizeCarousel(); syncCarousel(); }
function endDrag(event) { if (!carouselDragging || event.pointerId !== carouselPointerId) return; if (workViewport.hasPointerCapture(event.pointerId)) workViewport.releasePointerCapture(event.pointerId); const id = carouselActiveId; const shouldOpen = carouselDragDistance < 8 && id; carouselDragging = false; carouselPointerId = null; carouselActiveId = ""; workViewport.classList.remove("is-dragging"); document.querySelectorAll(".work-card.is-touched").forEach((card) => card.classList.remove("is-touched")); carouselPaused = workViewport.matches(":hover"); if (shouldOpen) openProject(id, document.querySelector(`[data-project="${id}"]`)); }
workViewport.addEventListener("pointerenter", () => { carouselPaused = true; });
workViewport.addEventListener("pointerleave", () => { carouselPaused = false; });
workViewport.addEventListener("pointerdown", startDrag);
workViewport.addEventListener("pointermove", moveDrag);
workViewport.addEventListener("pointerup", endDrag);
workViewport.addEventListener("pointercancel", endDrag);
document.querySelector("#carouselLeft").addEventListener("click", () => { carouselOffset += 340; normalizeCarousel(); syncCarousel(); });
document.querySelector("#carouselRight").addEventListener("click", () => { carouselOffset -= 340; normalizeCarousel(); syncCarousel(); });

function setupDetailGallery() {
  stopDetailGallery();
  const viewport = document.querySelector("#detailGallery");
  const track = document.querySelector("#detailGalleryTrack");
  if (!viewport || !track) return;
  detailGalleryState = { viewport, track, offset: 0, loopWidth: track.scrollWidth / 2, paused: false, dragging: false, pointerId: null, startX: 0, startOffset: 0, last: performance.now(), frame: 0 };
  const sync = () => { detailGalleryState.track.style.transform = `translate3d(${detailGalleryState.offset}px, 0, 0)`; };
  const normalize = () => { const w = detailGalleryState.loopWidth; if (w <= 0) return; while (detailGalleryState.offset <= -w) detailGalleryState.offset += w; while (detailGalleryState.offset > 0) detailGalleryState.offset -= w; };
  const animate = (time) => { if (!detailGalleryState) return; const delta = Math.min(40, time - detailGalleryState.last); detailGalleryState.last = time; if (!detailGalleryState.paused && !detailGalleryState.dragging) { detailGalleryState.offset -= delta * 0.026; normalize(); sync(); } detailGalleryState.frame = requestAnimationFrame(animate); };
  viewport.addEventListener("pointerenter", () => { detailGalleryState.paused = true; });
  viewport.addEventListener("pointerleave", () => { detailGalleryState.paused = false; });
  viewport.addEventListener("pointerdown", (event) => { detailGalleryState.dragging = true; detailGalleryState.pointerId = event.pointerId; detailGalleryState.startX = event.clientX; detailGalleryState.startOffset = detailGalleryState.offset; viewport.classList.add("is-dragging"); viewport.setPointerCapture(event.pointerId); });
  viewport.addEventListener("pointermove", (event) => { if (!detailGalleryState.dragging || event.pointerId !== detailGalleryState.pointerId) return; detailGalleryState.offset = detailGalleryState.startOffset + event.clientX - detailGalleryState.startX; normalize(); sync(); });
  const end = (event) => { if (!detailGalleryState || event.pointerId !== detailGalleryState.pointerId) return; if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId); detailGalleryState.dragging = false; viewport.classList.remove("is-dragging"); };
  viewport.addEventListener("pointerup", end); viewport.addEventListener("pointercancel", end);
  detailGalleryState.frame = requestAnimationFrame(animate);
}
function stopDetailGallery() { if (detailGalleryState?.frame) cancelAnimationFrame(detailGalleryState.frame); detailGalleryState = null; }

categorySwitch.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => { currentFilter = button.dataset.filter || "all"; categorySwitch.querySelectorAll("button").forEach((item) => item.classList.remove("is-active")); button.classList.add("is-active"); carouselOffset = 0; renderHome(); }));
document.querySelector("#openProfile").addEventListener("click", (event) => activateView("profile", event.currentTarget));
document.querySelector("#backToHome").addEventListener("click", (event) => activateView("home", event.currentTarget));
document.querySelector("#backFromProfile").addEventListener("click", (event) => activateView("home", event.currentTarget));
window.addEventListener("keydown", (event) => { if (event.key === "Escape" && !views.home.classList.contains("is-active")) activateView("home"); });
window.addEventListener("resize", () => { measureCarousel(); });
skills.forEach((skill) => { const tag = document.createElement("span"); tag.textContent = skill; profileTags.appendChild(tag); });

const canvas = document.querySelector("#ambientCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let canvasFrame = 0;
function resizeCanvas() {
  if (window.innerWidth < 768) { canvas.style.display = "none"; if (canvasFrame) cancelAnimationFrame(canvasFrame); canvasFrame = 0; return; }
  canvas.style.display = "";
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio); canvas.height = Math.floor(window.innerHeight * ratio); canvas.style.width = `${window.innerWidth}px`; canvas.style.height = `${window.innerHeight}px`; ctx.setTransform(ratio,0,0,ratio,0,0);
  const count = Math.min(180, Math.max(80, Math.floor(window.innerWidth / 9)));
  particles = Array.from({ length: count }, (_, i) => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, size: Math.random() * 2 + 0.5, speed: Math.random() * 0.42 + 0.14, phase: Math.random() * Math.PI * 2, hue: i % 3 }));
}
function drawCanvas(time) {
  if (window.innerWidth < 768) return;
  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  const colors = ["rgba(98,230,211,0.34)", "rgba(158,123,255,0.28)", "rgba(245,182,91,0.26)"];
  for (let band = 0; band < 4; band++) { const y = window.innerHeight * (0.2 + band * 0.18) + Math.sin(time * 0.00022 + band) * 34; const g = ctx.createLinearGradient(0, y - 70, window.innerWidth, y + 70); g.addColorStop(0, "rgba(98,230,211,0)"); g.addColorStop(0.5, band % 2 ? "rgba(158,123,255,0.06)" : "rgba(98,230,211,0.065)"); g.addColorStop(1, "rgba(245,182,91,0)"); ctx.save(); ctx.translate(Math.sin(time * 0.00016 + band) * 70, y); ctx.rotate(-0.12 + band * 0.016); ctx.fillStyle = g; ctx.fillRect(-160,-34,window.innerWidth + 320,68); ctx.restore(); }
  particles.forEach((p) => { const oldX = p.x; const oldY = p.y; p.x += p.speed + Math.sin(time * 0.00055 + p.phase) * 0.5; p.y += Math.cos(time * 0.0004 + p.phase) * 0.25; if (p.x > window.innerWidth + 20) { p.x = -20; p.y = Math.random() * window.innerHeight; } ctx.strokeStyle = colors[p.hue].replace("0.", "0.16"); ctx.lineWidth = Math.max(0.4, p.size * 0.4); ctx.beginPath(); ctx.moveTo(oldX, oldY); ctx.lineTo(p.x, p.y); ctx.stroke(); ctx.fillStyle = colors[p.hue]; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); });
  canvasFrame = requestAnimationFrame(drawCanvas);
}
window.addEventListener("resize", resizeCanvas);
renderHome();
requestAnimationFrame(animateCarousel);
resizeCanvas();
if (window.innerWidth >= 768) canvasFrame = requestAnimationFrame(drawCanvas);
