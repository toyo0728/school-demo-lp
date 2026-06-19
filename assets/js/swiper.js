// 講師紹介スワイパー
const teacherSwiperEl = document.querySelector(".p-teacher-swiper");
if (teacherSwiperEl && typeof Swiper !== "undefined") {
    new Swiper(".p-teacher-swiper", {
        loop: true,
        loopedSlides: 8, // slidesPerView: "auto" でループするために必要。スライドは8枚なので 8 を指定
        slidesPerGroup: 1, // 1枚ずつ進める（4枚まとめて動くのを防ぐ）

        speed: 600,
        slidesPerView: "auto",
        spaceBetween: 40,
        grabCursor: true,

        navigation: {
            prevEl: ".p-teacher__btn-prev",
            nextEl: ".p-teacher__btn-next",
        },

        pagination: {
            el: ".p-teacher-swiper-pagination",
            type: "progressbar",
        },
    });
}
