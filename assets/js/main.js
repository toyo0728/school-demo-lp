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
document.addEventListener("DOMContentLoaded", function () {
  const dialogs = document.querySelectorAll("dialog");

  function openDialog(dialog) {
    const scrollY = window.scrollY;
    dialog.showModal();
    dialog.classList.add("js-show");
    document.body.style.top = `-${scrollY}px`;
  }

  function closeDialog(dialog) {
    const scrollY = parseInt(document.body.style.top || "0") * -1;
    dialog.classList.remove("js-show");
    dialog.close();
    document.body.style.top = "";
    window.scrollTo(0, scrollY);
  }

  // ダイアログを開く
  const open = document.querySelectorAll(".p-course__content-button");
  open.forEach((button) => {
    button.addEventListener("click", () => {
      const dialogId = button.getAttribute("data-dialog");
      const dialog = document.getElementById(dialogId);
      openDialog(dialog);
    });
  });

  // ダイアログを閉じる
  const close = document.querySelectorAll(".p-course-modal__close-button");
  close.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDialog(button.closest("dialog"));
    });
  });

  // オーバーレイクリックでダイアログを閉じる
  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target.closest(".p-course-modal__inner") === null) {
        closeDialog(dialog);
      }
    });
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