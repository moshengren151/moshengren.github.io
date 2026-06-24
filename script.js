const projects = [
  {
    title: "轻度恐怖跑酷原型",
    type: "Gameplay Prototype",
    role: "Unity 独立开发 / 玩法逻辑 / UI 反馈",
    summary: "基于 Unity 的轻度恐怖追逐玩法原型，包含角色状态、敌人攻击节奏、音效反馈和移动端适配。",
    tags: ["Unity", "C#", "Gameplay", "Mobile", "State Machine"],
    intro: "这是一个围绕追逐、闪避和短时决策构建的移动端玩法原型。项目重点是用清晰的状态机拆分角色行为、敌人节奏和 UI 反馈，让核心循环能快速验证并持续迭代。",
    highlights: ["角色移动、受击、死亡等状态统一收敛到可追踪流程", "敌人攻击节奏与反馈动画解耦，方便调整难度", "移动端安全区、按钮反馈和音效触发统一管理"],
    stack: ["Unity", "C#", "Animator", "Mobile UI"],
    systems: ["输入与移动控制", "敌人攻击策略", "角色状态反馈", "音频与界面提示"],
    featured: true,
    coverImage: "./Assets/project-runner-cover.svg",
    gallery: [
      "./Assets/project-runner-01.svg",
      "./Assets/project-runner-02.svg",
      "./Assets/project-runner-03.svg"
    ],
    video: "",
    videoFallback: "./Assets/videos/project-runner.mp4",
    githubUrl: "https://github.com/moshengren151"
  },
  {
    title: "VR 交互训练场景",
    type: "VR Interaction",
    role: "交互系统 / 场景搭建 / 输入反馈",
    summary: "面向训练场景的 VR 交互样例，强调手柄输入、空间反馈、任务流程和沉浸式引导。",
    tags: ["Unity XR", "VR", "Interaction", "Simulation"],
    intro: "面向训练流程的 VR 交互 Demo，强调空间定位、输入反馈和阶段式任务引导。项目目标是让体验者在低学习成本下理解交互目标，并通过反馈确认每一步操作。",
    highlights: ["手柄输入与可交互物体反馈分层处理", "任务阶段以清晰节点组织，方便扩展训练内容", "空间提示和 UI 引导兼顾沉浸感与可读性"],
    stack: ["Unity XR", "C#", "Input System", "3D Scene"],
    systems: ["手柄射线交互", "训练步骤管理", "空间提示反馈", "任务完成判定"],
    coverImage: "./Assets/project-vr-cover.svg",
    gallery: [
      "./Assets/project-vr-01.svg",
      "./Assets/project-vr-02.svg",
      "./Assets/project-vr-03.svg"
    ],
    video: "",
    videoFallback: "./Assets/videos/project-vr.mp4",
    githubUrl: "https://github.com/moshengren151"
  },
  {
    title: "AI 交互角色 Demo",
    type: "AI Interaction",
    role: "原型开发 / 对话流程 / 行为反馈",
    summary: "探索 AI 角色与玩家之间的互动流程，将对话、情绪反馈和场景事件组织成可演示原型。",
    tags: ["Unity", "AI", "Dialogue", "Prototype"],
    intro: "这是一个 AI 交互角色原型，用于探索对话、情绪反馈和场景事件之间的连接方式。重点不是复杂模型本身，而是把 AI 回复转化为玩家能感知的行为变化。",
    highlights: ["对话节点、情绪状态和场景事件保持清晰映射", "角色反馈可通过动画、表情和提示文本组合呈现", "原型结构便于替换不同 AI 服务或本地规则"],
    stack: ["Unity", "C#", "Dialogue", "AI Flow"],
    systems: ["对话流程编排", "情绪状态切换", "场景事件触发", "角色反馈表现"],
    coverImage: "./Assets/project-ai-cover.svg",
    gallery: [
      "./Assets/project-ai-01.svg",
      "./Assets/project-ai-02.svg",
      "./Assets/project-ai-03.svg"
    ],
    video: "",
    videoFallback: "./Assets/videos/project-ai.mp4",
    githubUrl: "https://github.com/moshengren151"
  }
];

const skills = [
  "Unity",
  "C#",
  "Gameplay",
  "UGUI",
  "Animator",
  "Mobile Adaptation",
  "Game Prototype",
  "Performance Optimization",
  "Git"
];

const views = {
  home: document.querySelector("#homeView"),
  detail: document.querySelector("#detailView"),
  about: document.querySelector("#aboutView")
};

const projectGrid = document.querySelector("#projectGrid");
const projectCarousel = document.querySelector("#projectCarousel");
const projectDetail = document.querySelector("#projectDetail");
const backButton = document.querySelector("#backButton");
const skillTags = document.querySelector("#skillTags");
const navButtons = document.querySelectorAll("[data-view]");
const particleCanvas = document.querySelector("#particleCanvas");
const viewTransition = document.querySelector("#viewTransition");
const carouselState = {
  currentX: 0,
  loopWidth: 0,
  speed: 0.035,
  isPaused: false,
  isDragging: false,
  pointerId: null,
  startX: 0,
  lastX: 0,
  dragStartX: 0,
  dragDistance: 0,
  activeCard: null,
  animationFrameId: 0,
  lastTime: performance.now(),
  isInitialized: false
};
const detailGalleryState = {
  track: null,
  viewport: null,
  currentX: 0,
  loopWidth: 0,
  speed: 0.045,
  isPaused: false,
  isDragging: false,
  pointerId: null,
  startX: 0,
  dragStartX: 0,
  dragDistance: 0,
  animationFrameId: 0,
  lastTime: performance.now()
};

function createTag(label) {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = label;
  return tag;
}

function setActiveView(viewName) {
  playViewTransition();

  Object.entries(views).forEach(([name, view]) => {
    view.classList.toggle("is-active", name === viewName);
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewName);
  });

  if (projectCarousel) {
    carouselState.isPaused = viewName !== "home" || projectCarousel.matches(":hover");
  }

  if (viewName !== "detail") {
    releaseDetailVideos();
    stopDetailGallery();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function playViewTransition() {
  if (!viewTransition) {
    return;
  }

  viewTransition.classList.remove("is-animating");
  void viewTransition.offsetWidth;
  viewTransition.classList.add("is-animating");
}

function renderProjects() {
  projectGrid.innerHTML = "";
  const loopProjects = [...projects, ...projects];

  loopProjects.forEach((project, index) => {
    const projectIndex = index % projects.length;
    const card = document.createElement("article");
    card.className = "project-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `查看 ${project.title} 详情`);
    card.dataset.projectIndex = String(projectIndex);
    card.dataset.loopIndex = String(index);

    if (project.featured) {
      card.classList.add("is-featured");
    }

    const cover = document.createElement("img");
    cover.className = "project-cover";
    cover.src = project.coverImage;
    cover.alt = `${project.title} 封面`;
    cover.draggable = false;

    const body = document.createElement("div");
    body.className = "project-body";

    const type = document.createElement("span");
    type.className = "project-type";
    type.textContent = project.type;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const role = document.createElement("span");
    role.className = "project-role";
    role.textContent = project.role;

    const summary = document.createElement("p");
    summary.className = "project-summary";
    summary.textContent = project.summary;

    const tags = document.createElement("div");
    tags.className = "tag-list";
    project.tags.forEach((tag) => tags.appendChild(createTag(tag)));

    body.append(type, title, role, summary, tags);
    card.append(cover, body);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        renderDetail(projectIndex);
      }
    });
    projectGrid.appendChild(card);
  });

  initProjectCarousel();
}

function renderDetail(projectIndex) {
  const project = projects[projectIndex];
  releaseDetailVideos();
  projectDetail.innerHTML = "";

  stopDetailGallery();

  const top = document.createElement("div");
  top.className = "detail-top";

  const media = document.createElement("div");
  media.className = "detail-cover-shell";
  const cover = document.createElement("img");
  cover.className = "detail-cover";
  cover.src = project.coverImage;
  cover.alt = `${project.title} 封面`;
  cover.draggable = false;
  media.appendChild(cover);
  ["tl", "tr", "bl", "br"].forEach((position) => {
    const corner = document.createElement("span");
    corner.className = `detail-corner detail-corner-${position}`;
    media.appendChild(corner);
  });

  const main = document.createElement("div");
  main.className = "detail-info";
  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = project.type;

  const title = document.createElement("h1");
  title.textContent = project.title;

  const summary = document.createElement("p");
  summary.className = "detail-summary";
  summary.textContent = project.summary;

  const meta = document.createElement("div");
  meta.className = "detail-meta";
  meta.append(
    createMetaItem("项目角色", project.role),
    createMetaItem("项目类型", project.type),
    createMetaItem("作品状态", project.featured ? "核心项目" : "项目样例"),
    createMetaItem("展示形式", project.video || project.videoFallback ? "视频 + 图集" : "图集占位")
  );

  const tags = document.createElement("div");
  tags.className = "tag-list";
  project.tags.forEach((tag) => tags.appendChild(createTag(tag)));

  const actionRow = document.createElement("div");
  actionRow.className = "action-row";
  actionRow.appendChild(createActionLink(project.githubUrl, "GitHub 链接"));

  main.append(eyebrow, title, summary, meta, tags, actionRow);
  top.append(media, main);

  const breakdown = document.createElement("div");
  breakdown.className = "detail-breakdown";
  breakdown.append(createTextPanel("项目简介", project.intro), createTechPanel(project));

  const highlightList = document.createElement("ul");
  highlightList.className = "highlight-list";
  project.highlights.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    highlightList.appendChild(listItem);
  });
  breakdown.firstChild.appendChild(highlightList);

  const demo = document.createElement("section");
  demo.className = "detail-demo";
  demo.append(createVideoPanel(project), createGalleryCarousel(project));

  projectDetail.append(top, breakdown, demo);
  setActiveView("detail");
  initDetailGallery();
}

function createTextPanel(title, text) {
  const panel = document.createElement("section");
  panel.className = "detail-subpanel";

  const heading = document.createElement("h2");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  panel.append(heading, paragraph);
  return panel;
}

function createTechPanel(project) {
  const panel = document.createElement("section");
  panel.className = "detail-subpanel";

  const heading = document.createElement("h2");
  heading.textContent = "技术栈";

  const stackGrid = document.createElement("div");
  stackGrid.className = "stack-grid";
  project.stack.slice(0, 4).forEach((item) => {
    const card = document.createElement("div");
    card.className = "stack-card";
    card.textContent = item;
    stackGrid.appendChild(card);
  });

  const systemTitle = document.createElement("h3");
  systemTitle.textContent = "系统拆解";

  const systemList = document.createElement("ul");
  systemList.className = "system-list";
  project.systems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    systemList.appendChild(listItem);
  });

  panel.append(heading, stackGrid, systemTitle, systemList);
  return panel;
}

function createVideoPanel(project) {
  const panel = document.createElement("section");
  panel.className = "video-panel";

  const heading = document.createElement("h2");
  heading.textContent = "视频演示";
  panel.appendChild(heading);

  const videoSource = project.video || project.videoFallback;

  if (videoSource) {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "none";
    video.src = videoSource;
    video.poster = project.coverImage;
    video.addEventListener("error", () => showVideoError(panel, project));
    panel.appendChild(video);
    return panel;
  }

  const placeholder = document.createElement("div");
  placeholder.className = "video-placeholder";
  placeholder.textContent = "视频待补充";
  panel.appendChild(placeholder);
  return panel;
}

function showVideoError(panel, project) {
  releaseDetailVideos(panel);

  const existingError = panel.querySelector(".video-error");
  if (existingError) {
    return;
  }

  const errorBox = document.createElement("div");
  errorBox.className = "video-error";

  const message = document.createElement("p");
  message.textContent = "视频暂时无法加载，可以尝试刷新页面或打开项目仓库查看演示说明。";
  errorBox.appendChild(message);

  if (project.video) {
    errorBox.appendChild(createActionLink(project.video, "打开视频外链"));
  }

  panel.appendChild(errorBox);
}

function releaseDetailVideos(scope = projectDetail) {
  scope.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.removeAttribute("src");
    video.load();
    video.remove();
  });
}

function createGalleryCarousel(project) {
  const panel = document.createElement("section");
  panel.className = "demo-gallery-panel";

  const heading = document.createElement("h2");
  heading.textContent = "演示图集";

  const viewport = document.createElement("div");
  viewport.className = "demo-gallery";
  viewport.dataset.galleryViewport = "true";

  const track = document.createElement("div");
  track.className = "demo-gallery-track";
  track.dataset.galleryTrack = "true";

  [...project.gallery, ...project.gallery].forEach((imageUrl, index) => {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = `${project.title} 演示图 ${(index % project.gallery.length) + 1}`;
    image.draggable = false;
    track.appendChild(image);
  });

  viewport.appendChild(track);
  panel.append(heading, viewport);
  return panel;
}

function initDetailGallery() {
  stopDetailGallery();

  detailGalleryState.viewport = projectDetail.querySelector("[data-gallery-viewport]");
  detailGalleryState.track = projectDetail.querySelector("[data-gallery-track]");

  if (!detailGalleryState.viewport || !detailGalleryState.track) {
    return;
  }

  measureDetailGallery();
  detailGalleryState.viewport.addEventListener("pointerenter", pauseDetailGallery);
  detailGalleryState.viewport.addEventListener("pointerleave", resumeDetailGallery);
  detailGalleryState.viewport.addEventListener("pointerdown", handleDetailGalleryPointerDown);
  detailGalleryState.viewport.addEventListener("pointermove", handleDetailGalleryPointerMove);
  detailGalleryState.viewport.addEventListener("pointerup", handleDetailGalleryPointerUp);
  detailGalleryState.viewport.addEventListener("pointercancel", handleDetailGalleryPointerCancel);
  detailGalleryState.animationFrameId = requestAnimationFrame(animateDetailGallery);
}

function stopDetailGallery() {
  if (detailGalleryState.animationFrameId) {
    cancelAnimationFrame(detailGalleryState.animationFrameId);
  }

  detailGalleryState.animationFrameId = 0;
  detailGalleryState.track = null;
  detailGalleryState.viewport = null;
  detailGalleryState.currentX = 0;
  detailGalleryState.loopWidth = 0;
  detailGalleryState.isPaused = false;
  detailGalleryState.isDragging = false;
  detailGalleryState.pointerId = null;
}

function measureDetailGallery() {
  const track = detailGalleryState.track;
  if (!track) {
    return;
  }

  const halfIndex = Math.floor(track.children.length / 2);
  const secondSetStart = track.children[halfIndex];
  detailGalleryState.loopWidth = secondSetStart ? secondSetStart.offsetLeft : track.scrollWidth / 2;
  normalizeDetailGalleryPosition();
  updateDetailGalleryPosition();
}

function updateDetailGalleryPosition() {
  if (detailGalleryState.track) {
    detailGalleryState.track.style.transform = `translate3d(${detailGalleryState.currentX}px, 0, 0)`;
  }
}

function normalizeDetailGalleryPosition() {
  const loopWidth = detailGalleryState.loopWidth;

  if (loopWidth <= 0) {
    return;
  }

  while (detailGalleryState.currentX <= -loopWidth) {
    detailGalleryState.currentX += loopWidth;
  }

  while (detailGalleryState.currentX > 0) {
    detailGalleryState.currentX -= loopWidth;
  }
}

function animateDetailGallery(currentTime) {
  const deltaTime = Math.min(40, currentTime - detailGalleryState.lastTime);
  detailGalleryState.lastTime = currentTime;

  if (!detailGalleryState.isPaused && !detailGalleryState.isDragging && detailGalleryState.loopWidth > 0) {
    detailGalleryState.currentX -= detailGalleryState.speed * deltaTime;
    normalizeDetailGalleryPosition();
    updateDetailGalleryPosition();
  }

  detailGalleryState.animationFrameId = requestAnimationFrame(animateDetailGallery);
}

function pauseDetailGallery() {
  detailGalleryState.isPaused = true;
}

function resumeDetailGallery() {
  if (!detailGalleryState.isDragging) {
    detailGalleryState.isPaused = false;
  }
}

function handleDetailGalleryPointerDown(event) {
  if (!detailGalleryState.viewport) {
    return;
  }

  detailGalleryState.isPaused = true;
  detailGalleryState.isDragging = true;
  detailGalleryState.pointerId = event.pointerId;
  detailGalleryState.startX = event.clientX;
  detailGalleryState.dragStartX = detailGalleryState.currentX;
  detailGalleryState.dragDistance = 0;
  detailGalleryState.viewport.classList.add("is-dragging");
  detailGalleryState.viewport.setPointerCapture(event.pointerId);
}

function handleDetailGalleryPointerMove(event) {
  if (!detailGalleryState.isDragging || event.pointerId !== detailGalleryState.pointerId) {
    return;
  }

  const deltaX = event.clientX - detailGalleryState.startX;
  detailGalleryState.dragDistance = Math.max(detailGalleryState.dragDistance, Math.abs(deltaX));
  detailGalleryState.currentX = detailGalleryState.dragStartX + deltaX;
  normalizeDetailGalleryPosition();
  updateDetailGalleryPosition();
}

function handleDetailGalleryPointerUp(event) {
  if (event.pointerId === detailGalleryState.pointerId) {
    resetDetailGalleryPointer(event.pointerId);
  }
}

function handleDetailGalleryPointerCancel(event) {
  if (event.pointerId === detailGalleryState.pointerId) {
    resetDetailGalleryPointer(event.pointerId);
  }
}

function resetDetailGalleryPointer(pointerId) {
  const viewport = detailGalleryState.viewport;

  if (viewport && viewport.hasPointerCapture(pointerId)) {
    viewport.releasePointerCapture(pointerId);
  }

  if (viewport) {
    viewport.classList.remove("is-dragging");
  }

  detailGalleryState.isDragging = false;
  detailGalleryState.pointerId = null;
  detailGalleryState.isPaused = viewport ? viewport.matches(":hover") : false;
}

function initProjectCarousel() {
  if (!projectCarousel || !projectGrid) {
    return;
  }

  measureCarousel();

  if (carouselState.isInitialized) {
    return;
  }

  carouselState.isInitialized = true;
  window.addEventListener("resize", measureCarousel);

  projectCarousel.addEventListener("pointerenter", () => {
    carouselState.isPaused = true;
  });

  projectCarousel.addEventListener("pointerleave", () => {
    if (!carouselState.isDragging) {
      carouselState.isPaused = false;
    }
  });

  projectCarousel.addEventListener("pointerdown", handleCarouselPointerDown);
  projectCarousel.addEventListener("pointermove", handleCarouselPointerMove);
  projectCarousel.addEventListener("pointerup", handleCarouselPointerUp);
  projectCarousel.addEventListener("pointercancel", handleCarouselPointerCancel);

  carouselState.animationFrameId = requestAnimationFrame(animateProjectCarousel);
}

function measureCarousel() {
  const secondSetStart = projectGrid.children[projects.length];
  carouselState.loopWidth = secondSetStart ? secondSetStart.offsetLeft : projectGrid.scrollWidth / 2;

  if (carouselState.loopWidth > 0) {
    normalizeCarouselPosition();
    updateCarouselPosition();
  }
}

function updateCarouselPosition() {
  projectGrid.style.transform = `translate3d(${carouselState.currentX}px, 0, 0)`;
}

function normalizeCarouselPosition() {
  const loopWidth = carouselState.loopWidth;

  if (loopWidth <= 0) {
    return;
  }

  while (carouselState.currentX <= -loopWidth) {
    carouselState.currentX += loopWidth;
  }

  while (carouselState.currentX > 0) {
    carouselState.currentX -= loopWidth;
  }
}

function animateProjectCarousel(currentTime) {
  const deltaTime = Math.min(40, currentTime - carouselState.lastTime);
  carouselState.lastTime = currentTime;

  if (!carouselState.isPaused && !carouselState.isDragging && carouselState.loopWidth > 0) {
    carouselState.currentX -= carouselState.speed * deltaTime;
    normalizeCarouselPosition();
    updateCarouselPosition();
  }

  carouselState.animationFrameId = requestAnimationFrame(animateProjectCarousel);
}

function handleCarouselPointerDown(event) {
  const card = event.target.closest(".project-card");

  if (!card || !projectCarousel.contains(card)) {
    return;
  }

  carouselState.isPaused = true;
  carouselState.isDragging = true;
  carouselState.pointerId = event.pointerId;
  carouselState.startX = event.clientX;
  carouselState.lastX = event.clientX;
  carouselState.dragStartX = carouselState.currentX;
  carouselState.dragDistance = 0;
  carouselState.activeCard = card;
  projectCarousel.classList.add("is-dragging");
  projectCarousel.setPointerCapture(event.pointerId);
}

function handleCarouselPointerMove(event) {
  if (!carouselState.isDragging || event.pointerId !== carouselState.pointerId) {
    return;
  }

  const deltaX = event.clientX - carouselState.startX;
  carouselState.lastX = event.clientX;
  carouselState.dragDistance = Math.max(carouselState.dragDistance, Math.abs(deltaX));
  carouselState.currentX = carouselState.dragStartX + deltaX;
  normalizeCarouselPosition();
  updateCarouselPosition();
}

function handleCarouselPointerUp(event) {
  if (!carouselState.isDragging || event.pointerId !== carouselState.pointerId) {
    return;
  }

  const activeCard = carouselState.activeCard;
  const shouldOpenDetail = carouselState.dragDistance < 8 && activeCard;
  resetCarouselPointer(event.pointerId);

  if (shouldOpenDetail) {
    renderDetail(Number(activeCard.dataset.projectIndex));
  }
}

function handleCarouselPointerCancel(event) {
  if (event.pointerId === carouselState.pointerId) {
    resetCarouselPointer(event.pointerId);
  }
}

function resetCarouselPointer(pointerId) {
  if (projectCarousel.hasPointerCapture(pointerId)) {
    projectCarousel.releasePointerCapture(pointerId);
  }

  carouselState.isDragging = false;
  carouselState.pointerId = null;
  carouselState.activeCard = null;
  projectCarousel.classList.remove("is-dragging");
  carouselState.isPaused = projectCarousel.matches(":hover");
}

function createMetaItem(label, value) {
  const item = document.createElement("div");
  item.className = "meta-item";

  const labelElement = document.createElement("span");
  labelElement.className = "meta-label";
  labelElement.textContent = label;

  const valueElement = document.createElement("span");
  valueElement.textContent = value;

  item.append(labelElement, valueElement);
  return item;
}

function createActionLink(url, label) {
  const link = document.createElement("a");
  link.className = "action-link";
  link.textContent = label;

  if (url) {
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer";
  } else {
    link.href = "#";
    link.setAttribute("aria-disabled", "true");
  }

  return link;
}

function renderSkills() {
  skillTags.innerHTML = "";
  skills.forEach((skill) => skillTags.appendChild(createTag(skill)));
}

navButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const targetView = button.dataset.view;
    if (targetView && views[targetView]) {
      setActiveView(targetView);
    }
  });
});

backButton.addEventListener("click", () => setActiveView("home"));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && views.detail.classList.contains("is-active")) {
    setActiveView("home");
  }
});

window.addEventListener("resize", measureDetailGallery);

renderProjects();
renderSkills();
initParticleBackground();

function initParticleBackground() {
  if (!particleCanvas) {
    return;
  }

  if (window.innerWidth < 768) {
    particleCanvas.hidden = true;
    return;
  }

  const context = particleCanvas.getContext("2d");
  if (!context) {
    return;
  }
  const colors = [
    { r: 98, g: 230, b: 211 },
    { r: 158, g: 123, b: 255 },
    { r: 255, g: 200, b: 107 }
  ];
  const particles = [];
  const lightBands = [
    { y: 0.22, speed: 0.00009, color: "98, 230, 211", width: 180 },
    { y: 0.48, speed: -0.00006, color: "158, 123, 255", width: 240 },
    { y: 0.72, speed: 0.000045, color: "255, 200, 107", width: 210 }
  ];

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let animationFrameId = 0;
  let lastTime = performance.now();
  let isRunning = false;

  function resizeCanvas() {
    if (window.innerWidth < 768) {
      stopCanvasAnimation();
      particleCanvas.hidden = true;
      return;
    }

    particleCanvas.hidden = false;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    particleCanvas.width = Math.floor(width * pixelRatio);
    particleCanvas.height = Math.floor(height * pixelRatio);
    particleCanvas.style.width = `${width}px`;
    particleCanvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const particleCount = Math.round(Math.min(92, Math.max(42, width / 18)));
    particles.length = 0;

    for (let index = 0; index < particleCount; index += 1) {
      particles.push(createParticle());
    }

    if (!isRunning) {
      lastTime = performance.now();
      isRunning = true;
      animationFrameId = requestAnimationFrame(animate);
    }
  }

  function createParticle() {
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.7,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.16,
      alpha: Math.random() * 0.45 + 0.18,
      color
    };
  }

  function drawLightBands(time) {
    lightBands.forEach((band, index) => {
      const offset = ((time * band.speed + index * 0.32) % 1) * width;
      const x = offset < 0 ? offset + width : offset;
      const y = height * band.y + Math.sin(time * 0.00025 + index) * 26;
      const gradient = context.createLinearGradient(x - width, y, x + width, y);

      gradient.addColorStop(0, `rgba(${band.color}, 0)`);
      gradient.addColorStop(0.48, `rgba(${band.color}, 0)`);
      gradient.addColorStop(0.5, `rgba(${band.color}, 0.13)`);
      gradient.addColorStop(0.54, `rgba(${band.color}, 0.055)`);
      gradient.addColorStop(1, `rgba(${band.color}, 0)`);

      context.save();
      context.translate(0, y);
      context.rotate(index % 2 === 0 ? -0.035 : 0.028);
      context.fillStyle = gradient;
      context.fillRect(-width, -band.width / 2, width * 3, band.width);
      context.restore();
    });
  }

  function drawConnections() {
    const maxDistance = Math.min(150, Math.max(95, width * 0.12));

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const first = particles[i];
        const second = particles[j];
        const dx = first.x - second.x;
        const dy = first.y - second.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.18;
          context.strokeStyle = `rgba(180, 235, 244, ${opacity})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.stroke();
        }
      }
    }
  }

  function drawParticles(deltaTime) {
    particles.forEach((particle) => {
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;

      if (particle.x < -20) particle.x = width + 20;
      if (particle.x > width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = height + 20;
      if (particle.y > height + 20) particle.y = -20;

      const glow = context.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 8
      );
      const color = `${particle.color.r}, ${particle.color.g}, ${particle.color.b}`;

      glow.addColorStop(0, `rgba(${color}, ${particle.alpha})`);
      glow.addColorStop(0.35, `rgba(${color}, ${particle.alpha * 0.35})`);
      glow.addColorStop(1, `rgba(${color}, 0)`);

      context.fillStyle = glow;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius * 8, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = `rgba(${color}, ${Math.min(0.78, particle.alpha + 0.2)})`;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });
  }

  function animate(currentTime) {
    if (window.innerWidth < 768) {
      stopCanvasAnimation();
      particleCanvas.hidden = true;
      return;
    }

    const deltaTime = Math.min(40, currentTime - lastTime);
    lastTime = currentTime;

    context.clearRect(0, 0, width, height);
    drawLightBands(currentTime);
    drawConnections();
    drawParticles(deltaTime);

    animationFrameId = requestAnimationFrame(animate);
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("beforeunload", () => {
    stopCanvasAnimation();
  });

  function stopCanvasAnimation() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    }

    isRunning = false;
  }
}

