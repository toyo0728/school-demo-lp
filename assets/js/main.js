// アニメーション付与【FV】
document.addEventListener("DOMContentLoaded", function () {
  const mv = document.querySelector(".p-mv");
  const activeSlide = document.querySelector(
    ".p-mv-swiper .swiper-slide-active",
  );

  if (!mv) return;

  if (activeSlide) {
    activeSlide.classList.add("is-first");
  }

  requestAnimationFrame(() => {
    mv.classList.add("is-show");
  });

  setTimeout(() => {
    mv.classList.add("is-intro-done");
    if (activeSlide) {
      activeSlide.classList.remove("is-first");
    }
  }, 1500);
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const header = document.querySelector(".l-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

// FVスワイパー
const mvSwiperEl = document.querySelector(".p-mv-swiper");
if (mvSwiperEl && typeof Swiper !== "undefined") {
  const mvSwiper = new Swiper(".p-mv-swiper", {
    speed: 1000,
    effect: "fade",
    allowTouchMove: true,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".p-mv-swiper-pagination",
      clickable: true,
      type: "bullets",
    },

    on: {
      init(swiper) {
        const slide = swiper.slides[swiper.activeIndex];
        slide.classList.add("is-first");
        slide.classList.add("is-animated");
      },

      slideChangeTransitionStart(swiper) {
        swiper.slides.forEach((slide) => {
          slide.classList.remove("is-animated");
        });

        swiper.slides[swiper.activeIndex].classList.add("is-animated");
      },
    },
  });
};

// =============================================================
// お問い合わせフォームのバリデーション
// =============================================================

let inName1 = document.querySelector("#inName1");
let inName2 = document.querySelector("#inName2");
let errorName = document.querySelector("#emName");
let inEmail = document.querySelector("#inEmail");
let errorEmail = document.querySelector("#emEmail");
let inZip = document.querySelector("#inZip");
let errorZip = document.querySelector("#emZip");
let inKindCheckboxes = document.querySelectorAll('input[name="kind"]');
let errorKind = document.querySelector("#emKind");
let inPrivacy = document.querySelector("#inPrivacy");
let errorPrivacy = document.querySelector("#emPrivacy");
const form = document.querySelector("#contact-form");
if (form) {
const submitButton = form.querySelector("#submitBtn");

submitButton.addEventListener("click", function (event) {
  if (inName1.value.trim() === "" || inName2.value.trim() === "") {
    // ← inName → inName1, inName2
    inName1.classList.add("invalid");
    inName2.classList.add("invalid");
    errorName.textContent = "※お名前を入力してください";
    scrollToElement(inName1);
    event.preventDefault();
  } else {
    inName1.classList.remove("invalid"); // ← 追加
    inName2.classList.remove("invalid"); // ← 追加
    errorName.textContent = "";
  }

  if (!inEmail.value.includes("@")) {
    inEmail.classList.add("invalid");
    errorEmail.textContent = "※メールアドレスの形式でご入力ください。";
    scrollToElement(inEmail);
    event.preventDefault(); // 送信を中止
  } else {
    errorEmail.textContent = ""; // エラーメッセージをクリア
  }

  if (inZip.value.trim() === "") {
    inZip.classList.add("invalid");
    errorZip.textContent = "※郵便番号を入力してください";
    scrollToElement(inZip);
    event.preventDefault(); // 送信を中止
  } else {
    errorZip.textContent = ""; // エラーメッセージをクリア
  }

  // バリデーションチェック
  let isKindChecked = Array.from(inKindCheckboxes).some((cb) => cb.checked);
  if (!isKindChecked) {
    inKindCheckboxes.forEach((cb) => cb.classList.add("invalid"));
    errorKind.textContent = "※選択してください。";
    scrollToElement(inKindCheckboxes[0]);
    event.preventDefault();
  } else {
    inKindCheckboxes.forEach((cb) => cb.classList.remove("invalid"));
    errorKind.textContent = "";
  }

  if (!inPrivacy.checked) {
    inPrivacy.classList.add("invalid");
    errorPrivacy.textContent = "必須項目です。";
    scrollToElement(inPrivacy);
    event.preventDefault(); // 送信を中止
  } else {
    errorPrivacy.textContent = ""; // エラーメッセージをクリア
  }

  function scrollToElement(element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

inName1.onblur = function () {
  if (!inName1.value) {
    inName1.classList.add("invalid");
    errorName.innerHTML = "※お名前を入力してください";
  }
};
inName1.onfocus = function () {
  if (this.classList.contains("invalid")) {
    errorName.innerHTML = "";
  }
};
inName2.onblur = function () {
  if (!inName2.value) {
    inName2.classList.add("invalid");
    errorName.innerHTML = "※お名前を入力してください";
  }
};
inName2.onfocus = function () {
  if (this.classList.contains("invalid")) {
    errorName.innerHTML = "";
  }
};
inEmail.onblur = function () {
  if (!inEmail.value.includes("@")) {
    inEmail.classList.add("invalid");
    errorEmail.innerHTML = "※メールアドレスの形式でご入力ください。";
  }
};
inEmail.onfocus = function () {
  if (this.classList.contains("invalid")) {
    errorEmail.innerHTML = "";
  }
};

inZip.onblur = function () {
  if (!inZip.value) {
    inZip.classList.add("invalid");
    errorZip.innerHTML = "※郵便番号を入力してください";
  }
};
inZip.onfocus = function () {
  if (this.classList.contains("invalid")) {
    errorZip.innerHTML = "";
  }
};

// blur/focus イベント
inKindCheckboxes.forEach((checkbox) => {
  checkbox.onchange = function () {
    isKindChecked = Array.from(inKindCheckboxes).some((cb) => cb.checked);
    if (!isKindChecked) {
      inKindCheckboxes.forEach((cb) => cb.classList.add("invalid"));
      errorKind.innerHTML = "※選択してください。";
    } else {
      inKindCheckboxes.forEach((cb) => cb.classList.remove("invalid"));
      errorKind.innerHTML = "";
    }
  };
});

inPrivacy.onchange = function () {
  if (!inPrivacy.checked) {
    inPrivacy.classList.add("invalid");
    errorPrivacy.innerHTML = "必須項目です。";
  } else {
    inPrivacy.classList.remove("invalid");
    errorPrivacy.innerHTML = "";
  }
};

function onSubmit(token) {
  if (
    !inPrivacy.checked ||
    inTextarea.value.trim() === "" ||
    inSelect.value === "選択してください" ||
    inSelect.value.trim() === "" ||
    !inEmail.value.includes("@") ||
    inName.value.trim() === ""
  ) {
  } else {
    document.getElementById("contact-form").submit();
  }
}
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
