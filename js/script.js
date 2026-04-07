


















// 헤더스크롤할때
window.addEventListener("scroll", function () {
    const header = document.getElementById("header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// 히어로 화면전환+ 바 , 2번째 섹션 페이드업 효과
const swiper = new Swiper('.main-swiper', {
  slidesPerView: 1,
  loop: true,
  speed: 1200,
  effect: 'fade',
  fadeEffect: { crossFade: true },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
});

AOS.init({
  duration: 1300,
//   애니메이션이 끝나는 시간 (속도)
  once:  false  
//   스크롤 올렸다 내려도 계속 실행됨
});


// 베스트 구간 스와이퍼
const bestSwiper = new Swiper(".best-swiper", {
  slidesPerView: 4,
  spaceBetween: 32,
  slidesPerGroup: 1,
  loop: false,
  speed: 600,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".best-next",
    prevEl: ".best-prev",
  },
});

// 베스트 타이틀 aos
AOS.init({
  once: false ,          
  duration: 800,       // 기본 속도
  easing: 'ease-out'
});


const storyVisual = document.getElementById('storyVisual');
const storyLight = document.querySelector('.story-light');

window.addEventListener('scroll', function () {
  if (!storyVisual || !storyLight) return;

  const rect = storyVisual.getBoundingClientRect();
  const winH = window.innerHeight;

  let progress = (winH - rect.top) / (winH + rect.height);
  progress = Math.max(0, Math.min(1, progress));

  const heightValue = 60 + (40 * progress);
  storyLight.style.height = heightValue + '%';
});
// 올 구간
// window.addEventListener("load", function () {
//   const allshopMoreBtn = document.getElementById("allshop-more-btn");

//   if (!allshopMoreBtn) return;

//   allshopMoreBtn.addEventListener("click", function (e) {
//     e.preventDefault();

//     const hiddenItems = document.querySelectorAll(".allshop-item.is-hidden");

//     hiddenItems.forEach(function (item) {
//       item.classList.remove("is-hidden");   // 1. 숨김 해제
//       void item.offsetWidth;                // 2. 강제 리플로우
//       item.classList.add("reveal-now");     // 3. 페이드업 시작
//     });

//     allshopMoreBtn.style.display = "none";
//   });
// });

window.addEventListener("load", function () {
  const allshopMoreBtn = document.getElementById("allshop-more-btn");

  if (!allshopMoreBtn) return;

  allshopMoreBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const hiddenItems = document.querySelectorAll(".allshop-item.is-hidden");

    hiddenItems.forEach(function (item) {
      item.classList.remove("is-hidden");
      item.style.display = "block";
      item.classList.remove("aos-animate");
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (typeof AOS !== "undefined") {
          AOS.refreshHard();
        }
      });
    });

    allshopMoreBtn.style.display = "none";
  });
});


// 스티키
$(window).on('scroll', function () {
  let scrollTop = $(window).scrollTop();

  $('.brand-story-scroll').each(function () {
    let sectionTop = $(this).offset().top;
    let sectionHeight = $(this).outerHeight();

    let visibleHeight = 600;
    let imageHeight = 950;
    let moveRange = imageHeight - visibleHeight; // 350

    let progress = (scrollTop - sectionTop) / (sectionHeight - visibleHeight);

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    let moveY = -moveRange * progress;

    $(this).find('.brand-story-image').css(
      'transform',
      'translateY(' + moveY + 'px)'
    );
  });
});
// 타임섹션
$(document).ready(function(){

  /* =========================
     1. 카운트다운
  ========================= */
  let remainingTime = (2 * 60 * 60) + (14 * 60) + 36;

  function updateCountdown(){
    let hours = String(Math.floor(remainingTime / 3600)).padStart(2, "0");
    let minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, "0");
    let seconds = String(remainingTime % 60).padStart(2, "0");

    $("#countdown").text(hours + ":" + minutes + ":" + seconds);

    if(remainingTime > 0){
      remainingTime--;
    } else {
      remainingTime = (2 * 60 * 60) + (14 * 60) + 36;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* =========================
     2. 슬라이더
  ========================= */

  // const $track = $("#sliderTrack");
  // const $cards = $(".sale-card");
  // const totalCards = $cards.length;

  // const visibleCount = 4;
  // const maxIndex = totalCards - visibleCount;

  // let currentIndex = 0;

  // // 👉 카드 width 자동 계산 (중요)
  // function getMoveValue(){
  //   const cardWidth = $(".sale-card").outerWidth(true); // gap 포함
  //   return cardWidth;
  // }

  // function setActive(){
  //   $cards.removeClass("active");
  //   $cards.eq(currentIndex).addClass("active");
  // }

  // function moveSlider(){
  //   const move = getMoveValue() * currentIndex;
  //   $track.css("transform", "translateX(-" + move + "px)");
  //   setActive();
  // }

  // function nextSlide(){
  //   if(currentIndex < maxIndex){
  //     currentIndex++;
  //   } else {
  //     currentIndex = 0;
  //   }
  //   moveSlider();
  // }

  // function prevSlide(){
  //   if(currentIndex > 0){
  //     currentIndex--;
  //   } else {
  //     currentIndex = maxIndex;
  //   }
  //   moveSlider();
  // }

  /* =========================
     3. 버튼
  ========================= */
  $("#nextBtn, #bottomNext").on("click", function(){
    nextSlide();
    resetAuto();
  });

  $("#prevBtn, #bottomPrev").on("click", function(){
    prevSlide();
    resetAuto();
  });

  /* =========================
     4. 자동 슬라이드
  ========================= */
  let autoSlide = setInterval(nextSlide, 4500);

  function resetAuto(){
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 4500);
  }

  $track.on("mouseenter", function(){
    clearInterval(autoSlide);
  });

  $track.on("mouseleave", function(){
    autoSlide = setInterval(nextSlide, 4500);
  });

  moveSlider();

});




// 질문
$(document).ready(function(){

  $(".accordion-question").on("click", function(){

    const item = $(this).closest(".accordion-item");

    item.toggleClass("active");

  });

});











