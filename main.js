// ===== 鼠标视差 =====
const scene = document.getElementById('scene');
let targetX = 0;
let currentX = 0;

document.addEventListener('mousemove', (e) => {
  const ratio = (e.clientX / window.innerWidth) - 0.5; // -0.5 ~ 0.5
  targetX = ratio * 80; // 最大偏移80px
});

function updateParallax() {
  currentX += (targetX - currentX) * 0.05;
  scene.style.transform = `translateX(${currentX}px)`;
  requestAnimationFrame(updateParallax);
}
updateParallax();

// ===== 金色粒子 =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
const PARTICLE_COUNT = 60;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: -Math.random() * 0.5 - 0.2,
    opacity: Math.random() * 0.6 + 0.2,
    opacityDir: Math.random() > 0.5 ? 1 : -1,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // 移动
    p.x += p.speedX;
    p.y += p.speedY;
    p.opacity += p.opacityDir * 0.005;

    if (p.opacity > 0.8) p.opacityDir = -1;
    if (p.opacity < 0.1) p.opacityDir = 1;

    // 超出边界重置
    if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
    if (p.x < -10) p.x = canvas.width + 10;
    if (p.x > canvas.width + 10) p.x = -10;

    // 绘制光点
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 220, 120, ${p.opacity})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(255, 200, 80, 0.8)';
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== 石门点击 =====
const gates = document.querySelectorAll('.gate.functional');
const contactPanel = document.getElementById('contact-panel');
const closeContact = document.getElementById('closeContact');

gates.forEach(gate => {
  gate.addEventListener('click', () => {
    const target = gate.dataset.target;
    if (target === 'contact') {
      contactPanel.classList.add('active');
    } else {
      // 过渡后跳转
      document.body.style.transition = 'opacity 0.6s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = target; }, 600);
    }
  });
});

// 关闭联系我面板
closeContact.addEventListener('click', () => {
  contactPanel.classList.remove('active');
});

contactPanel.addEventListener('click', (e) => {
  if (e.target === contactPanel) {
    contactPanel.classList.remove('active');
  }
});

// ===== 页面淡入 =====
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 1s ease';
setTimeout(() => { document.body.style.opacity = '1'; }, 100);