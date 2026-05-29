const startScreen = document.getElementById('start-screen');
const videoScreen = document.getElementById('video-screen');
const introVideo = document.getElementById('introVideo');
const hotspot = document.getElementById('hotspot');
const overlay = document.getElementById('transition-overlay');
const welcomeBtn = document.getElementById('welcomeBtn');
const skipBtn = document.getElementById('skip-btn');

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
    // 移动端浏览器常禁止带声音的延迟自动播放，失败时降级为静音播放
    const playPromise = introVideo.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(() => {
        introVideo.muted = true;
        introVideo.play().catch(() => {});
      });
    }
    // 显示跳过按钮
    skipBtn.classList.add('visible');
    setTimeout(() => { skipBtn.style.opacity = '1'; }, 50);
  }, 1000);
});

// 进入主页面（带过渡光晕）
function enterMain() {
  playClick();
  overlay.classList.add('active');
  setTimeout(() => {
    window.location.href = 'main.html';
  }, 800);
}

// 视频结束 → 隐藏跳过按钮、显示热区
introVideo.addEventListener('ended', () => {
  skipBtn.style.opacity = '0';
  setTimeout(() => skipBtn.classList.remove('visible'), 600);

  hotspot.style.display = 'flex';
  hotspot.style.opacity = '0';
  hotspot.style.transition = 'opacity 1s ease';
  setTimeout(() => { hotspot.style.opacity = '1'; }, 50);
});

// 点击跳过 → 直接进入主页面
skipBtn.addEventListener('click', () => {
  introVideo.pause();
  enterMain();
});

// 点击热区 → 过渡到主页面
hotspot.addEventListener('click', enterMain);