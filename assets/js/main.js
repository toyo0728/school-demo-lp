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
}

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
