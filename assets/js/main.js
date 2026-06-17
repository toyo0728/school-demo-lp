// アニメーション付与【FV】
document.addEventListener('DOMContentLoaded', function () {
  const mv = document.querySelector('.p-mv');
  const activeSlide = document.querySelector('.p-mv-swiper .swiper-slide-active');

  if (!mv) return;

  if (activeSlide) {
    activeSlide.classList.add('is-first');
  }

  requestAnimationFrame(() => {
    mv.classList.add('is-show');
  });

  setTimeout(() => {
    mv.classList.add('is-intro-done');
    if (activeSlide) {
      activeSlide.classList.remove('is-first');
    }
  }, 1500);
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const header = document.querySelector('.l-header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// FVスワイパー
const mvSwiperEl = document.querySelector('.p-mv-swiper');
if (mvSwiperEl && typeof Swiper !== 'undefined') {
  const mvSwiper = new Swiper('.p-mv-swiper', {
    speed: 1000,
    effect: 'fade',
    allowTouchMove: true,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },

    pagination: {
      el: '.p-mv-swiper-pagination',
      clickable: true,
      type: 'bullets'
    },

    on: {
      init(swiper) {
        const slide = swiper.slides[swiper.activeIndex];
        slide.classList.add('is-first');
        slide.classList.add('is-animated');
      },

      slideChangeTransitionStart(swiper) {
        swiper.slides.forEach((slide) => {
          slide.classList.remove('is-animated');
        });

        swiper.slides[swiper.activeIndex].classList.add('is-animated');
      }
    }
  });
}

// コース案内タブ
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".p-course__tab").forEach(function (tab) {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      // tabの切り替え
      document.querySelectorAll(".p-course__tab").forEach(function (t) {
        t.setAttribute("aria-selected", "false");
      });
      this.setAttribute("aria-selected", "true");
      // tab panelの切り替え
      document
        .querySelectorAll(".p-course__content-wrap")
        .forEach(function (panel) {
          panel.classList.remove("js-show");
        });
      document
        .getElementById(this.getAttribute("aria-controls"))
        .classList.add("js-show");
    });
  });
});

// モーダルダイアログ
const dialogs = document.querySelectorAll('dialog');
// ダイアログを開く
const open = document.querySelectorAll(".p-course__content-button");
open.forEach(button => {
  button.addEventListener('click', () => {
    const dialogId = button.getAttribute('data-dialog');
    const dialog = document.getElementById(dialogId);
    dialog.showModal();
    dialog.classList.add('js-show');
  });
});
// ダイアログを閉じる
const close = document.querySelectorAll(".p-course-modal__close-button");
  close.forEach(button => {
    button.addEventListener('click', () => {
    const dialog = button.closest('dialog');
    dialog.classList.remove('js-show');
    dialog.close();
  });
});
// オーバーレイクリックでダイアログを閉じる
dialogs.forEach(button => {
  button.addEventListener('click', (event) => {
    if (event.target.closest(".p-course-modal__inner") === null) {
      const dialog = button.closest("dialog");
      dialog.classList.remove("js-show");
      dialog.close();
    }
  });
});

// 時間差アニメーション
window.addEventListener("load", function () {
  gsap.registerPlugin(ScrollTrigger);

  const timeDelay = 350; // 時間差のタイミング(ミリ秒)
  const maxItemNumber = 4; // 時間差で発火させる最大要素数

  // fade in
  for (let i = 0; i < maxItemNumber; i++) {
    const fadeInItems = document.querySelectorAll(
      `.animated__fadeIn.--delay${i}`,
    );
    fadeInFunction(fadeInItems, i * timeDelay);
  }

  function fadeInFunction(fadeInItems, timeout) {
    fadeInItems.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 70%", // 要素が上部から70%の位置で発火
        markers: false,
        onEnter: () => {
          // 要素内に入ったら、js-showクラスをつける
          setTimeout(() => {
            item.classList.add("js-show");
          }, timeout);
        },
      });
    });
  }
});