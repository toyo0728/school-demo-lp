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
//  アコーディオン
// ====================

document.addEventListener('DOMContentLoaded', () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll('.js-details');
  const IS_OPENED_CLASS = 'is-opened';

  details.forEach((element) => {
    const summary = element.querySelector('.js-summary');
    const content = element.querySelector('.js-content');

    const toggleAccordion = (event) => {
      event.preventDefault();

      if (element.classList.contains(IS_OPENED_CLASS)) {
        element.classList.toggle(IS_OPENED_CLASS);
        closingAnim(content, element).restart();
      } else {
        element.classList.toggle(IS_OPENED_CLASS);
        element.setAttribute('open', 'true');
        openingAnim(content).restart();
      }
    };

    summary.addEventListener('click', toggleAccordion);
    content.addEventListener('click', toggleAccordion);
});
}
/**
 * アコーディオンを閉じる時のアニメーション
 */
const closingAnim = (content, element) =>
  gsap.to(content, {
    height: 0,
    opacity: 0,
    duration: 0.4,
    ease: 'power3.out',
    overwrite: true,
    onComplete: () => {
      // アニメーションの完了後にopen属性を取り除く
      element.removeAttribute('open');
    },
  });

/**
 * アコーディオンを開く時のアニメーション
 */
const openingAnim = (content) =>
  gsap.fromTo(
    content,
    {
      height: 0,
      opacity: 0,
    },
    {
      height: content.scrollHeight,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: true,
      onComplete: () => {
        content.style.height = "auto";
      }
    }
  );



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