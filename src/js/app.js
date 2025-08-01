window.addEventListener("load", function () {
  let link = document.querySelector(".header__burger");
  let menu = document.querySelector(".header__nav");
  if (menu) {
    link.addEventListener(
      "click",
      function () {
        link.classList.toggle("active");
        menu.classList.toggle("open");
      },
      false
    );
    window.addEventListener("scroll", () => {
      if (menu.classList.contains("open")) {
        link.classList.remove("active");
        menu.classList.remove("open");
      }
    });
  }

  // Custom select language

  document.querySelectorAll(".select").forEach((select) => {
    const selectBtn = select.querySelector(".select__btn");
    const selectList = select.querySelector(".select__list");
    const  selectLinks = select.querySelectorAll(".select__link");

    selectBtn.addEventListener("click", () => {
      selectBtn.classList.toggle("active");
      selectList.classList.toggle("active");

      if (selectList.style.maxHeight) {
        selectList.style.maxHeight = null;
        selectList.removeAttribute('style');
      } else {
        selectList.style.maxHeight = selectList.scrollHeight + "px";
      }
    });

    selectLinks.forEach((selectLink) => {
      selectLink.addEventListener('click', selectActive)
    });

    function selectActive(e) {
      selectLinks.forEach((selectLink) => {
        selectLink.classList.remove('active');

        if (e.target.closest("a")) {
          selectBtn.innerHTML = "";
          selectBtn.append(e.target.cloneNode(true));

          selectHide();
        }
      });
      this.classList.add('active');
    }

    let selectHide = () => {
      selectBtn.classList.remove("active");
      selectList.classList.remove("active");
      selectList.removeAttribute('style');
    };
    document.addEventListener("mouseup", (e) => {
      if (!select.contains(e.target)) selectHide();
    });
  });

  // Swiper

  var heroSwiper = new Swiper(".heroSwiper", {
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".hero-pagination",
    },
  });
  
  var catalogSwiper = new Swiper(".catalogSwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".catalog-next",
      prevEl: ".catalog-prev",
    },
     breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1025: {
          slidesPerView: 4,
        },
      },
  });

  var partnersSwiper = new Swiper(".partnersSwiper", {
    slidesPerView: 2,
    spaceBetween: 16,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".partners-pagination",
      type: "progressbar",
    },
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      1025: {
        slidesPerView: 6,
      },
    },
  });

  var certificateSwiper = new Swiper(".certificateSwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".certificate-pagination",
      type: "progressbar",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1025: {
        slidesPerView: 4,
      },
    },
  });

  var teamsSwiper = new Swiper(".teamsSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 8,
    centeredSlides: true,
    initialSlide: 2,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2.8,
      },
      1025: {
        slidesPerView: 4.8,
      },
    },
  });

  var historySwiper = new Swiper(".historySwiper", {
    direction: "vertical",
    effect: "coverflow",
    centeredSlides: true,
    // initialSlide: 2,
    slidesPerView: 2,
    grabCursor: true,
    // autoplay: {
    //   delay: 3000,
    //   disableOnInteraction: false,
    // },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 150,
      modifier: 3,
      slideShadows: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 3.2,
          slideShadows: false,
        },
      },
    },
  });

  var productSwiper = new Swiper(".productSwiper", {
    spaceBetween: 8,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var productSwiper2 = new Swiper(".productSwiper2", {
    spaceBetween: 8,
    effect: "fade",
    thumbs: {
      swiper: productSwiper,
    },
    navigation: {
      nextEl: ".product-next",
      prevEl: ".product-prev",
    },
  });

  // Gsap

  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
  }

  let historyPlayed = false;

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: "#history",
    start: "bottom bottom",
    onEnter: () => {
      if (!historyPlayed) {
        lockScroll();

        const totalSlides = historySwiper.slides.length;
        let currentIndex = historySwiper.activeIndex;

        // Слушаем сдвиги
        historySwiper.on("slideChange", () => {
          currentIndex = historySwiper.activeIndex;

          // Если дошли до последнего слайда
          if (currentIndex >= totalSlides - 1) {
            unlockScroll();
            historyPlayed = true;

            // Отключаем autoplay (если не нужен дальше)
            historySwiper.autoplay.stop();
          }
        });
      }
    },
  });

  // gsap.registerPlugin(ScrollTrigger);

  // const totalSlides = historySwiper.slides.length;

  // let previousSlide = -1;

  // ScrollTrigger.create({
  //   trigger: "#history",
  //   start: "top top",
  //   end: () => `+=${window.innerHeight * totalSlides}`,
  //   pin: true,
  //   scrub: true,
  //   onUpdate: (self) => {
  //     const currentSlide = Math.round(self.progress * (totalSlides - 1));

  //     if (currentSlide !== previousSlide) {
  //       historySwiper.slideTo(currentSlide);
  //       previousSlide = currentSlide;
  //     }
  //   },
  // });

  // AOS Animate

  AOS.init({
    duration: 1200,
    offset: 0
  });

  // Fancybox

  Fancybox.bind("[data-fancybox]");

  // Modals

  function hideModal(modal) {
    modal.addEventListener('click', function(e) {
      const target = e.target;
      if (
        target.classList.contains("modal__close") ||
        target.classList.contains("modals") ||
        target.classList.contains("close")
      ) {
        modal.style.transition = "opacity 0.4s";
        modal.style.opacity = "0";
        setTimeout(() => {
          modal.style.display = "none";
        }, 400);
      }
    });
  }
  function showModal(modal) {
    modal.style.display = "flex";
    setTimeout(() => {
      modal.style.transition = "opacity 0.4s";
      modal.style.opacity = "1";
    }, 10);
  } 

  let modals = document.querySelector('.modals')
  let modalAll = document.querySelectorAll('.modal')
  let modalBtns = document.querySelectorAll(".modal-btn");

  if(modals && modalBtns){
    hideModal(modals);
    modalBtns.forEach( btn => {
      btn.addEventListener('click', () => {
        showModal(modals)
        let typeBtn = btn.dataset.type;
        modalAll.forEach( modal => {
          let typeModal = modal.dataset.type;
          modal.style.display = 'none'
          if(typeBtn == typeModal) {
            modal.style.display = 'block'
          }
        });
      })
    })
  }

  // Phone
  
  [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substring(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
  });
    
  // Tabby

  const tabs = new Tabby('[data-tabs]');

});
