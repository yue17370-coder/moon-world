const startScreen = document.getElementById('start-screen');
const videoScreen = document.getElementById('video-screen');
const introVideo = document.getElementById('introVideo');
const hotspot = document.getElementById('hotspot');
const overlay = document.getElementById('transition-overlay');
const welcomeBtn = document.getElementById('welcomeBtn');

// 音效
const clickSound = new Audio('素材/click.mp3');
clickSound.volume = 0.6;
function playClick() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

// 点击文字 → 播放视频
welcomeBtn.addEventListener('click', () => {
  playClick();
  startScreen.style.opacity = '0';
  startScreen.style.pointerEvents = 'none';

  setTimeout(() => {
    startScreen.style.display = 'none';
    videoScreen.style.display = 'block';
    introVideo.volume = 1;
    introVideo.play();
  }, 1000);
});

// 视频结束 → 显示热区
introVideo.addEventListener('ended', () => {
  hotspot.style.display = 'flex';
  hotspot.style.opacity = '0';
  hotspot.style.transition = 'opacity 1s ease';
  setTimeout(() => { hotspot.style.opacity = '1'; }, 50);
});

// 点击热区 → 过渡到主页面
hotspot.addEventListener('click', () => {
  playClick();
  overlay.classList.add('active');
  setTimeout(() => {
    window.location.href = 'main.html';
  }, 800);
});