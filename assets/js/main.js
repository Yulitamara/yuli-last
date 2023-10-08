/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// MENU SHOW
// Validate if constant exists
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// MENU HIDDEN
// Validate if constant exists
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects__container", {
  loop: true,
  spaceBetween: 24,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    1200: {
      slidesPerView: 2,
      spaceBetween: -56,
    },
  },
});

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactName = document.getElementById("contact-name"),
  contactEmail = document.getElementById("contact-email"),
  contactMessage = document.getElementById("contact-message"),
  contactError = document.getElementById("contact-error");

const sendEmail = (e) => {
  e.preventDefault();

  // Check if the field has a value
  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactMessage.value === ""
  ) {
    // Add and remove color
    contactError.classList.remove("color-blue");
    contactError.classList.add("color-red");

    // Show message
    contactError.textContent = "Write all the input fields 📥";
  } else {
    // serviceID - templateID - #form - publickey
    emailjs
      .sendForm(
        "service_pgmvaog",
        "template_pkem6ld",
        "#contact-form",
        "nWkvqRFbu1rCg5bAq"
      )
      .then(
        () => {
          // Show message and add color
          contactError.classList.add("color-blue");
          contactError.textContent = "Message sent ✅";

          // Remove message after five seconds
          setTimeout(() => {
            contactError.textContent = "";
          }, 5000);
        },
        (error) => {
          alert("OOPS! SOMETHING HAS FAILED...", error);
        }
      );

    // To clear the input field
    contactName.value = "";
    contactEmail.value = "";
    contactMessage.value = "";
  }
};
contactForm.addEventListener("submit", sendEmail);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add("active-link");
    } else {
      sectionClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate id the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("bg-header")
    : header.classList.remove("bg-header");
};
window.addEventListener("scroll", scrollHeader);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 0,
  // reset: true /* Animation repeat */,
});

sr.reveal(`.home__data, .projects__container, .footer__container`);
sr.reveal(`.home__info div`, { delay: 600, origin: "bottom", interval: 100 });
sr.reveal(`.skills__content:nth-child(1), .contact__content:nth-child(1)`, {
  origin: "left",
});
sr.reveal(`.skills__content:nth-child(2), .contact__content:nth-child(2)`, {
  origin: "right",
});
sr.reveal(`.qualification__content, .services__card`, { interval: 100 });

// GALLERY
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("prints").style.display = "flex";

  var filterElements = document.querySelectorAll(".filter");
  filterElements.forEach(function (filterElement) {
    filterElement.addEventListener("click", function () {
      var filter = this.getAttribute("data-filter");

      var galleryContentElements =
        document.querySelectorAll(".gallery__content");
      galleryContentElements.forEach(function (galleryContentElement) {
        galleryContentElement.style.display = "none";
      });

      filterElements.forEach(function (filterElem) {
        filterElem.classList.remove("active");
      });

      this.classList.add("active");

      document.getElementById(filter).style.display = "flex";
    });
  });
});

// const printsData = [
//   {
//     src: "/assets/img/900-5.png",
//     alt: "print",
//     size: "20x20",
//     paintingName: "חיבוק ספה",
//     price: "40₪",
//   },
//   {
//     src: "/assets/img/900-1.png",
//     alt: "print",
//     size: "13x13",
//     paintingName: "חוויה טראומתית",
//     price: "35₪",
//   },
//   {
//     src: "/assets/img/900-2.png",
//     alt: "print",
//     size: "15x15",
//     paintingName: "ביישנית",
//     price: "35₪",
//   },
//   {
//     src: "/assets/img/900-3.png",
//     alt: "print",
//     size: "13x13",
//     paintingName: "בכיתי",
//     price: "35₪",
//   },
//   {
//     src: "/assets/img/900-8.png",
//     alt: "print",
//     size: "13x13",
//     paintingName: "אידיאליזציה",
//     price: "35₪",
//     soldOut: true,
//   },
//   {
//     src: "/assets/img/900-9.png",
//     alt: "print",
//     size: "15x15",
//     paintingName: "מסקנה",
//     price: "35₪",
//   },
//   {
//     src: "/assets/img/900-4.png",
//     alt: "print",
//     size: "14x14",
//     paintingName: "מהממת",
//     price: "35₪",
//   },
//   {
//     src: "/assets/img/900-6.png",
//     alt: "print",
//     size: "15x15",
//     paintingName: "SAD NOT LAZY",
//     price: "35₪",
//   },
//   {
//     src: "/assets/img/900-7.png",
//     alt: "print",
//     size: "15x15",
//     paintingName: "לא יכולה לבוא",
//     price: "35₪",
//   },
// ];

// const galleryContent = document.getElementById("prints");
// const popup = document.getElementById("popup");
// const popupImage = document.getElementById("popup-image");
// const closePopup = document.getElementById("close-popup");

// printsData.forEach((item) => {
//   const contentItem = document.createElement("div");
//   contentItem.className = "gallery__content-item";

//   contentItem.innerHTML = `
//         <img src="${item.src}" alt="${
//     item.alt
//   }" class="no-select" onclick="openPopup('${item.src}', '${
//     item.paintingName
//   }')">
//         <div class="img-title">
//             <span class="size">${item.size}</span>
//             <span class="name">
//                 <span class="painting-name">${item.paintingName}</span>
//                 ${
//                   item.soldOut
//                     ? '<span class="sold-out">סולד אאוט</span>'
//                     : `<a href="https://wa.me/972542634686/?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%A0%2F%D7%AA%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%9E%D7%9E%D7%9A%20%D7%A6%D7%99%D7%95%D7%A8."
//                         target="_blank" class="img-btn no-select">
//                         לרכישה
//                     </a>`
//                 }
//             </span>
//             <span class="price">${item.price}</span>
//         </div>
//     `;

//   galleryContent.appendChild(contentItem);
// });

// function openPopup(imageSrc, paintingName) {
//   popupImage.src = imageSrc;
//   popupImage.alt = paintingName;
//   popup.style.display = "block";

//   // Close popup when clicking anywhere outside of it
//   window.addEventListener("click", closePopupOnClick);

//   // Close popup when clicking on popup-image
//   popupImage.addEventListener("click", closePopupOnClick);
// }

// function closePopupOnClick(e) {
//   if (e.target === popup || e.target === popupImage) {
//     popup.style.display = "none";
//     window.removeEventListener("click", closePopupOnClick);
//     popupImage.removeEventListener("click", closePopupOnClick);
//   }
// }

// closePopup.addEventListener("click", () => {
//   popup.style.display = "none";
//   window.removeEventListener("click", closePopupOnClick);
//   popupImage.removeEventListener("click", closePopupOnClick);
// });

const printsData = [
  {
    src: "/assets/img/900-5.png",
    alt: "print",
    size: "20x20",
    paintingName: "חיבוק ספה",
    price: "40₪",
  },
  {
    src: "/assets/img/900-3.png",
    alt: "print",
    size: "13x13",
    paintingName: "בכיתי",
    price: "35₪",
  },
  {
    src: "/assets/img/900-8.png",
    alt: "print",
    size: "13x13",
    paintingName: "אידיאליזציה",
    price: "35₪",
    soldOut: true,
  },
  {
    src: "/assets/img/900-1.png",
    alt: "print",
    size: "13x13",
    paintingName: "חוויה טראומתית",
    price: "35₪",
  },
  {
    src: "/assets/img/900-12.png",
    alt: "print",
    size: "13x13",
    paintingName: "סלח לי",
    price: "35₪",
  },
  {
    src: "/assets/img/900-16.png",
    alt: "print",
    size: "13x13",
    paintingName: "טיפול זוגי",
    price: "35₪",
  },
  {
    src: "/assets/img/900-14.png",
    alt: "print",
    size: "15x15",
    paintingName: "10 דקות במקלחת",
    price: "35₪",
  },
  {
    src: "/assets/img/900-2.png",
    alt: "print",
    size: "15x15",
    paintingName: "ביישנית",
    price: "35₪",
  },
  {
    src: "/assets/img/900-6.png",
    alt: "print",
    size: "15x15",
    paintingName: "SAD NOT LAZY",
    price: "35₪",
  },

  {
    src: "/assets/img/900-9.png",
    alt: "print",
    size: "15x15",
    paintingName: "מסקנה",
    price: "35₪",
  },
  {
    src: "/assets/img/900-4.png",
    alt: "print",
    size: "14x14",
    paintingName: "מהממת",
    price: "35₪",
  },
  {
    src: "/assets/img/900-7.png",
    alt: "print",
    size: "15x15",
    paintingName: "לא יכולה לבוא",
    price: "35₪",
  },
  {
    src: "/assets/img/900-11.png",
    alt: "print",
    size: "14x14",
    paintingName: "עובר ושב",
    price: "35₪",
  },
  {
    src: "/assets/img/900-24.png",
    alt: "print",
    size: "13x13",
    paintingName: "חרא אישיות",
    price: "35₪",
  },
  {
    src: "/assets/img/900-23.png",
    alt: "print",
    size: "14x14",
    paintingName: "מאמצת חתול",
    price: "35₪",
  },
  {
    src: "/assets/img/900-21.png",
    alt: "print",
    size: "13x13",
    paintingName: "יפה ומטופחת",
    price: "35₪",
  },
  {
    src: "/assets/img/900-13.png",
    alt: "print",
    size: "15x15",
    paintingName: "לאהוב את עצמי",
    price: "35₪",
  },
  {
    src: "/assets/img/900-18.png",
    alt: "print",
    size: "13x13",
    paintingName: "כבר גדולה",
    price: "35₪",
  },
  {
    src: "/assets/img/900-10.png",
    alt: "print",
    size: "10x10",
    paintingName: "תאספי אותי",
    price: "20",
  },
  {
    src: "/assets/img/900-22.png",
    alt: "print",
    size: "14x14",
    paintingName: "הורמונלית",
    price: "35₪",
  },
  {
    src: "/assets/img/900-25.png",
    alt: "print",
    size: "10x10",
    paintingName: "עדיף למות",
    price: "20",
  },
  {
    src: "/assets/img/900-20.png",
    alt: "print",
    size: "13x13",
    paintingName: "כריות",
    price: "35₪",
  },
  {
    src: "/assets/img/900-17.png",
    alt: "print",
    size: "15x15",
    paintingName: "יומן שבועי",
    price: "35₪",
  },
  {
    src: "/assets/img/900-19.png",
    alt: "print",
    size: "13x13",
    paintingName: "התחממות גלובלית",
    price: "35₪",
  },
  {
    src: "/assets/img/900-26.png",
    alt: "print",
    size: "10x10",
    paintingName: "משעמם",
    price: "20₪",
  },
  {
    src: "/assets/img/900-27.png",
    alt: "print",
    size: "14x14",
    paintingName: "היית מעולה",
    price: "35₪",
  },
  {
    src: "/assets/img/900-28.png",
    alt: "print",
    size: "10x10",
    paintingName: "עקב",
    price: "20₪",
  },
  {
    src: "/assets/img/900-29.jpg",
    alt: "print",
    size: "13x13",
    paintingName: "כל הדברים",
    price: "35₪",
  },
];

const stickersData = [
  {
    src: "/assets/img/sticker-900-7.png",
    alt: "print",
    size: "7x7",
    paintingName: "סוף סוף נפרדתם",
    price: "5₪",
  },
  {
    src: "/assets/img/sticker-900-8.png",
    alt: "print",
    size: "7x7",
    paintingName: "הדברים הרעים",
    price: "5₪",
  },
  {
    src: "/assets/img/sticker-900-3.png",
    alt: "print",
    size: "7x7",
    paintingName: "קראש",
    price: "5₪",
  },
  {
    src: "/assets/img/sticker-900-5.png",
    alt: "print",
    size: "7x7",
    paintingName: "אם הוא דוש",
    price: "5₪",
  },
  {
    src: "/assets/img/sticker-900-9.png",
    alt: "print",
    size: "7x7",
    paintingName: "מחזור קל",
    price: "5₪",
  },
  {
    src: "/assets/img/sticker-900-4.png",
    alt: "print",
    size: "7x7",
    paintingName: "שיעוף ממך",
    price: "5₪",
  },
  {
    src: "/assets/img/sticker-900-1.png",
    alt: "print",
    size: "10x10",
    paintingName: "לא אכפת",
    price: "11₪",
  },
  {
    src: "/assets/img/sticker-900-2.png",
    alt: "print",
    size: "10x10",
    paintingName: "חסר משמעות",
    price: "11₪",
  },
];

const cardsData = [
  {
    src: "/assets/img/card-1.png",
    alt: "print",
    size: "15x10",
    paintingName: "דיקפיק",
    price: "25₪",
  },
];

const galleryContent = {
  prints: document.getElementById("prints"),
  stickers: document.getElementById("stickers"),
  cards: document.getElementById("cards"),
};

const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");
const closePopup = document.getElementById("close-popup");

function populateGallery(data, sectionId) {
  const section = galleryContent[sectionId];

  data.forEach((item) => {
    const contentItem = document.createElement("div");
    contentItem.className = "gallery__content-item";

    contentItem.innerHTML = `
            <img src="${item.src}" alt="${
      item.alt
    }" class="no-select" onclick="openPopup('${item.src}', '${
      item.paintingName
    }')">
            <div class="img-title">
                <span class="size">${item.size}</span>
                <span class="name">
                    <span class="painting-name">${item.paintingName}</span>
                    ${
                      item.soldOut
                        ? '<span class="sold-out">סולד אאוט</span>'
                        : `<a href="https://wa.me/972542634686/?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%A0%D7%99%D7%99%D7%A0%2F%D7%AA%20%D7%9C%D7%94%D7%96%D7%9E%D7%99%D7%9F%20%D7%9E%D7%9E%D7%9A%20%D7%A6%D7%99%D7%95%D7%A8."
                                target="_blank" class="img-btn no-select">
                                לרכישה
                            </a>`
                    }
                </span>
                <span class="price">${item.price}</span>
            </div>
        `;

    section.appendChild(contentItem);
  });
}

populateGallery(printsData, "prints");
populateGallery(stickersData, "stickers");
populateGallery(cardsData, "cards");

function openPopup(imageSrc, paintingName) {
  popupImage.src = imageSrc;
  popupImage.alt = paintingName;
  popup.style.display = "block";

  // Close popup when clicking anywhere outside of it
  window.addEventListener("click", closePopupOnClick);

  // Close popup when clicking on popup-image
  popupImage.addEventListener("click", closePopupOnClick);
}

function closePopupOnClick(e) {
  if (e.target === popup || e.target === popupImage) {
    popup.style.display = "none";
    window.removeEventListener("click", closePopupOnClick);
    popupImage.removeEventListener("click", closePopupOnClick);
  }
}

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  window.removeEventListener("click", closePopupOnClick);
  popupImage.removeEventListener("click", closePopupOnClick);
});
