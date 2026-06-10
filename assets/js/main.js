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


// ====================
//  パララックス
// ====================

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {

  gsap.utils.toArray('.js-parallax1').forEach(wrap => {
    gsap.to(wrap, {
      y: -300,
      scrollTrigger: {
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    })
  });
  gsap.utils.toArray('.js-parallax2').forEach(wrap => {
    gsap.to(wrap, {
      y: -300,
      scrollTrigger: {
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    })
  });

});

mm.add("(max-width: 768px)", () => {

  gsap.utils.toArray('.js-parallax1').forEach(wrap => {
    gsap.to(wrap, {
      y: -150,
      scrollTrigger: {
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    })
  });
  gsap.utils.toArray('.js-parallax2').forEach(wrap => {
    gsap.to(wrap, {
      y: -150,
      scrollTrigger: {
        trigger: wrap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    })
  });

});
