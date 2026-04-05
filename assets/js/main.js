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

document.addEventListener("click", (event) => {
  if (!navMenu || !navToggle) return;
  if (!navMenu.classList.contains("show-menu")) return;

  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedToggle = navToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navMenu.classList.remove("show-menu");
  }
});
/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const blurAfterClick = (element) => {
  if (!element) return;

  element.addEventListener("mouseup", () => {
    element.blur();
  });

  element.addEventListener("touchend", () => {
    element.blur();
  });
};

const linkAction = (event) => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
  event.currentTarget.blur();
};

navLink.forEach((n) => {
  n.addEventListener("click", linkAction);
  blurAfterClick(n);
});

blurAfterClick(navToggle);
blurAfterClick(navClose);

/*=============== SWIPER PROJECTS ===============*/
if (typeof Swiper !== "undefined") {
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
}

/*=============== EMAIL JS ===============*/
// const contactForm = document.getElementById("contact-form"),
//   contactName = document.getElementById("contact-name"),
//   contactEmail = document.getElementById("contact-email"),
//   contactMessage = document.getElementById("contact-message"),
//   contactError = document.getElementById("contact-error");

// const sendEmail = (e) => {
//   e.preventDefault();

//   // Check if the field has a value
//   if (
//     contactName.value === "" ||
//     contactEmail.value === "" ||
//     contactMessage.value === ""
//   ) {
//     // Add and remove color
//     contactError.classList.remove("color-blue");
//     contactError.classList.add("color-red");

//     // Show message
//     contactError.textContent = "Write all the input fields 📥";
//   } else {
//     // serviceID - templateID - #form - publickey
//     emailjs
//       .sendForm(
//         "service_pgmvaog",
//         "template_pkem6ld",
//         "#contact-form",
//         "nWkvqRFbu1rCg5bAq"
//       )
//       .then(
//         () => {
//           // Show message and add color
//           contactError.classList.add("color-blue");
//           contactError.textContent = "Message sent ✅";

//           // Remove message after five seconds
//           setTimeout(() => {
//             contactError.textContent = "";
//           }, 5000);
//         },
//         (error) => {
//           alert("OOPS! SOMETHING HAS FAILED...", error);
//         }
//       );

//     // To clear the input field
//     contactName.value = "";
//     contactEmail.value = "";
//     contactMessage.value = "";
//   }
// };
// contactForm.addEventListener("submit", sendEmail);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");
    const sectionClass = document.querySelector(
      `.nav__menu a[href="#${sectionId}"], .nav__menu a[href="index.html#${sectionId}"]`
    );

    if (!sectionClass) return;

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
// const sr = ScrollReveal({
//   origin: "top",
//   distance: "60px",
//   duration: 2500,
//   delay: 0,
//   reset: false,
// });

// sr.reveal(`.home__data, .projects__container, .footer__container, #contact`);
// sr.reveal(`.home__info div`, { delay: 600, origin: "bottom", interval: 100 });
// sr.reveal(`.skills__content:nth-child(1), .contact__content:nth-child(1)`, {
//   origin: "left",
// });
// sr.reveal(`.skills__content:nth-child(2), .contact__content:nth-child(2)`, {
//   origin: "right",
// });
// sr.reveal(`.qualification__content, .services__card`, { interval: 100 });

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

const printsData = [
  {
    src: "/assets/img/600-focus.webp",
    alt: "print",
    size: "10x10",
    paintingName: "שליטה",
    price: "30₪",
  },
  {
    src: "/assets/img/600-plants.webp",
    alt: "print",
    size: "10x10",
    paintingName: "צמחים",
    price: "30₪",
  },
  {
    src: "/assets/img/600-dog-ok.webp",
    alt: "print",
    size: "10x10",
    paintingName: "בסדר מצדך",
    price: "30₪",
  },

  {
    src: "/assets/img/900-4.png",
    alt: "print",
    size: "14x14",
    paintingName: "מהממת",
    price: "30₪",
  },
  {
    src: "/assets/img/900-10.png",
    alt: "print",
    size: "10x10",
    paintingName: "תאספי אותי",
    price: "30₪",
  },
  {
    src: "/assets/img/900-13.png",
    alt: "print",
    size: "15x15",
    paintingName: "לאהוב את עצמי",
    price: "30₪",
  },
  {
    src: "/assets/img/900-1.png",
    alt: "print",
    size: "10x10",
    paintingName: "חוויה טראומתית",
    price: "30₪",
  },
  {
    src: "/assets/img/900-5.png",
    alt: "print",
    size: "20x20",
    paintingName: "חיבוק ספה",
    price: "30₪",
  },

  {
    src: "/assets/img/900-14.png",
    alt: "print",
    size: "15x15",
    paintingName: "10 דקות במקלחת",
    price: "30₪",
  },

  {
    src: "/assets/img/900-6.png",
    alt: "print",
    size: "15x15",
    paintingName: "SAD NOT LAZY",
    price: "30₪",
  },
  {
    src: "/assets/img/900-3.png",
    alt: "print",
    size: "10x10",
    paintingName: "בכיתי",
    price: "30₪",
  },

  {
    src: "/assets/img/900-7.png",
    alt: "print",
    size: "10x10",
    paintingName: "לא יכולה לבוא",
    price: "30₪",
  },
  {
    src: "/assets/img/600-marry.webp",
    alt: "print",
    size: "10x10",
    paintingName: "הורים נשואים",
    price: "30₪",
  },
  {
    src: "/assets/img/600-people.webp",
    alt: "print",
    size: "10x10",
    paintingName: "הודעות",
    price: "30₪",
  },
  {
    src: "/assets/img/900-23.png",
    alt: "print",
    size: "14x14",
    paintingName: "מאמצת חתול",
    price: "30₪",
  },
  {
    src: "/assets/img/900-21.png",
    alt: "print",
    size: "13x13",
    paintingName: "יפה ומטופחת",
    price: "30₪",
  },
  {
    src: "/assets/img/900-18.png",
    alt: "print",
    size: "10x10",
    paintingName: "כבר גדולה",
    price: "30₪",
  },

  {
    src: "/assets/img/900-25.png",
    alt: "print",
    size: "10x10",
    paintingName: "עדיף למות",
    price: "20₪",
    soldOut: true,
  },
  {
    src: "/assets/img/900-20.png",
    alt: "print",
    size: "10x10",
    paintingName: "כריות",
    price: "30₪",
  },

  {
    src: "/assets/img/900-19.png",
    alt: "print",
    size: "10x10",
    paintingName: "התחממות גלובלית",
    price: "30₪",
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
    src: "/assets/img/900-9.png",
    alt: "sticker",
    size: "10x10",
    paintingName: "מסקנה",
    price: "10₪",
  },
  {
    src: "/assets/img/900-103.png",
    alt: "sticker",
    size: "10x10",
    paintingName: "תוכניות",
    price: "10₪",
  },
  {
    src: "/assets/img/900-102.png",
    alt: "sticker",
    size: "10x10",
    paintingName: "סלח לי",
    price: "10₪",
  },
  {
    src: "/assets/img/900-101.png",
    alt: "sticker",
    size: "10x10",
    paintingName: "טיפול זוגי",
    price: "10₪",
  },
  {
    src: "/assets/img/900-100.png",
    alt: "sticker",
    size: "10x10",
    paintingName: "עסוקה",
    price: "10₪",
    soldOut: true,
  },
  {
    src: "/assets/img/900-104.png",
    alt: "sticker",
    size: "10x10",
    paintingName: "אידאליזציה",
    price: "10₪",
  },
  {
    src: "/assets/img/sticker-900-1.png",
    alt: "print",
    size: "10x10",
    paintingName: "לא אכפת",
    price: "10₪",
  },
  {
    src: "/assets/img/600-shirt.webp",
    alt: "print",
    size: "10x10",
    paintingName: "הכל קורס",
    price: "10₪",
  },
  {
    src: "/assets/img/600-computer.webp",
    alt: "print",
    size: "10x10",
    paintingName: "עבודה מול מחשב",
    price: "10₪",
  },
  {
    src: "/assets/img/600-tierd.webp",
    alt: "print",
    size: "10x10",
    paintingName: "נראית עייפה",
    price: "10₪",
  },
  {
    src: "/assets/img/600-mode.webp",
    alt: "print",
    size: "10x10",
    paintingName: "מדהים איך קצת",
    price: "10₪",
  },
];

const cardsData = [
  {
    src: "/assets/img/card-0.png",
    alt: "print",
    size: "15x10",
    paintingName: "טיפשה ורע לה",
    price: "25₪",
  },
  {
    src: "/assets/img/card-1.png",
    alt: "print",
    size: "15x10",
    paintingName: "דיקפיק",
    price: "25₪",
  },
  {
    src: "/assets/img/card-2.png",
    alt: "print",
    size: "15x10",
    paintingName: "לצחצח שיניים",
    price: "25₪",
  },
  {
    src: "/assets/img/card-3.png",
    alt: "print",
    size: "15x10",
    paintingName: "סליחות",
    price: "25₪",
  },
];

const magnetsData = [
  {
    src: "/assets/img/600-how-to-no.webp",
    alt: "print",
    size: "10x10",
    paintingName: "איך להגיד לא",
    price: "20₪",
  },

  {
    src: "/assets/img/600-dad.webp",
    alt: "print",
    size: "10x10",
    paintingName: "האבא הכי",
    price: "20₪",
  },
  {
    src: "/assets/img/600-coffee.webp",
    alt: "print",
    size: "10x10",
    paintingName: "קפה",
    price: "20₪",
  },
  {
    src: "/assets/img/900-2.png",
    alt: "print",
    size: "10x10",
    paintingName: "ביישנית",
    price: "20₪",
  },
  {
    src: "/assets/img/600-yael.webp",
    alt: "print",
    size: "10x10",
    paintingName: "מרגישה מצוין",
    price: "20₪",
  },
  {
    src: "/assets/img/600-find.webp",
    alt: "print",
    size: "10x10",
    paintingName: "עובר ושב",
    price: "20₪",
  },
  {
    src: "/assets/img/600-tut.webp",
    alt: "print",
    size: "10x10",
    paintingName: "סיטואציות לא נעימות",
    price: "20₪",
  },
];

const bagsData = [
  {
    src: "/assets/img/bag-2.png",
    alt: "bag",
    size: "",
    paintingName: "כל האנשים",
    price: "80₪",
  },
  {
    src: "/assets/img/bag-1.png",
    alt: "print",
    size: "",
    paintingName: "סלח לי",
    price: "80₪",
  },
  {
    src: "/assets/img/bag-3.png",
    alt: "print",
    size: "",
    paintingName: "בכיתי",
    price: "80₪",
  },
  {
    src: "/assets/img/bag-5.png",
    alt: "print",
    size: "",
    paintingName: "מתיחות",
    price: "80₪",
    soldOut: true,
  },
  {
    src: "/assets/img/bag-4.png",
    alt: "print",
    size: "",
    paintingName: "אחיות",
    price: "80₪",
    soldOut: true,
  },
];

const galleryContent = {
  prints: document.getElementById("prints"),
  stickers: document.getElementById("stickers"),
  cards: document.getElementById("cards"),
  magnets: document.getElementById("magnets"),
  bags: document.getElementById("bags"),
};

const popup = document.getElementById("popup");
const popupImage = document.getElementById("popup-image");
const closePopup = document.getElementById("close-popup");

function populateGallery(data, sectionId) {
  const section = galleryContent[sectionId];

  data.forEach((item) => {
    const contentItem = document.createElement("div");
    contentItem.className = "gallery__content-item";
    if (sectionId === "bags") {
      contentItem.classList.add("gallery__content-item--bag");
    }

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    image.className = "no-select";
    image.addEventListener("click", () => openPopup(item.src, item.paintingName));

    const titleWrapper = document.createElement("div");
    titleWrapper.className = "img-title";

    const size = document.createElement("span");
    size.className = "size";
    size.textContent = item.size;

    const nameWrapper = document.createElement("span");
    nameWrapper.className = "name";

    const paintingName = document.createElement("span");
    paintingName.className = "painting-name";
    paintingName.textContent = item.paintingName;

    nameWrapper.appendChild(paintingName);

    if (item.soldOut) {
      const soldOutLabel = document.createElement("span");
      soldOutLabel.className = "img-btn sold-out";
      soldOutLabel.textContent = "סולד אאוט";
      nameWrapper.appendChild(soldOutLabel);
    } else {
      const addButton = document.createElement("button");
      addButton.className = "img-btn no-select";
      addButton.type = "button";
      addButton.textContent = "הוספה לעגלה";
      addButton.addEventListener("click", () => {
        addToCart(item.paintingName, parseInt(item.price, 10), item.src);
      });
      nameWrapper.appendChild(addButton);
    }

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = item.price;

    titleWrapper.appendChild(size);
    titleWrapper.appendChild(nameWrapper);
    titleWrapper.appendChild(price);

    contentItem.appendChild(image);
    contentItem.appendChild(titleWrapper);

    section.appendChild(contentItem);
  });
}

populateGallery(printsData, "prints");
populateGallery(stickersData, "stickers");
populateGallery(cardsData, "cards");
populateGallery(bagsData, "bags");
populateGallery(magnetsData, "magnets");

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

function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(
    (item) => item.name === name && item.price === price
  );

  if (existingIndex !== -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({ name, price, img, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartCounter = document.getElementById("cart-counter");

  if (cartCounter) {
    cartCounter.textContent = totalCount;
    cartCounter.style.display = totalCount > 0 ? "inline-block" : "none";
  }
}

function showToast(message = "נוסף לעגלה בהצלחה 🎉") {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  toast.style.animation = "pop 0.3s ease";

  setTimeout(() => {
    toast.classList.remove("show");
    toast.style.animation = "none";
  }, 2000);
}

function goToCart() {
  window.location.href = "cart.html";
}

window.addEventListener("DOMContentLoaded", updateCartCount);
window.addEventListener("load", () => {
  if (window.location.hash) {
    const section = document.querySelector(window.location.hash);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }
});

if (window.location.search.includes("fbclid")) {
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
}
