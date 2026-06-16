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
      `.nav__menu a[href="#${sectionId}"], .nav__menu a[href="index.html#${sectionId}"]`,
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
    darkTheme,
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme,
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
  const printsSection = document.getElementById("prints");
  if (!printsSection) return;

  printsSection.style.display = "flex";

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
    src: "/assets/img/sticker-cut-1.webp",
    alt: "sticker",
    size: "9x9",
    paintingName: "נחמדה",
    price: "10₪",
    cutout: true,
  },
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
const popupTitle = document.getElementById("popup-title");
const popupMeta = document.getElementById("popup-meta");
const popupAddButton = document.getElementById("popup-add");
const closePopup = document.getElementById("close-popup");
let activePopupItem = null;

function populateGallery(data, sectionId) {
  const section = galleryContent[sectionId];
  if (!section) return;

  data.forEach((item) => {
    const contentItem = document.createElement("div");
    contentItem.className = "gallery__content-item";
    if (sectionId === "bags") {
      contentItem.classList.add("gallery__content-item--bag");
    }

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = `${item.alt || "מוצר"} ${item.paintingName}`;
    image.className = `no-select ${item.cutout ? "gallery__image--cutout" : ""}`;
    image.loading = "lazy";
    image.addEventListener("click", () => openPopup(item));

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

function openPopup(item) {
  if (!popup || !popupImage || !popupTitle || !popupMeta || !popupAddButton) {
    return;
  }

  activePopupItem = item;
  popupImage.src = item.src;
  popupImage.alt = item.paintingName;
  popupImage.classList.toggle("popup__image--cutout", Boolean(item.cutout));
  popupTitle.textContent = item.paintingName;
  popupMeta.textContent = [item.type, item.size, item.price]
    .filter(Boolean)
    .join(" · ");
  popupAddButton.disabled = Boolean(item.soldOut);
  popupAddButton.textContent = item.soldOut ? "סולד אאוט" : "הוספה לעגלה";
  popup.style.display = "block";

  // Close popup when clicking anywhere outside of it
  window.addEventListener("click", closePopupOnClick);
}

function closePopupOnClick(e) {
  if (!popup || !popupImage) return;
  if (e.target === popup) closeProductPopup();
}

function closeProductPopup() {
  if (!popup) return;

  popup.style.display = "none";
  activePopupItem = null;
  window.removeEventListener("click", closePopupOnClick);
}

if (closePopup) {
  closePopup.addEventListener("click", closeProductPopup);
}

if (popupAddButton) {
  popupAddButton.addEventListener("click", () => {
    if (!activePopupItem || activePopupItem.soldOut) return;

    addToCart(
      activePopupItem.paintingName,
      parseInt(activePopupItem.price, 10),
      activePopupItem.src,
    );
    closeProductPopup();
  });
}

function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(
    (item) => item.name === name && item.price === price,
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

const featuredShirtAddButton = document.getElementById("featured-shirt-add");

if (featuredShirtAddButton) {
  featuredShirtAddButton.addEventListener("click", () => {
    addToCart("חולצה", 80, "/assets/img/y-shirt.png");
  });
}

document.querySelectorAll("[data-featured-add]").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart(
      button.dataset.name,
      parseInt(button.dataset.price, 10),
      button.dataset.img,
    );
  });
});

document.querySelectorAll("[data-featured-product]").forEach((product) => {
  const openFeaturedProduct = () => {
    openPopup({
      src: product.dataset.img,
      paintingName: product.dataset.name,
      size: product.dataset.size,
      type: product.dataset.type,
      price: `${product.dataset.price}₪`,
    });
  };

  product.tabIndex = 0;
  product.setAttribute("role", "button");
  product.setAttribute("aria-label", `פתיחת פרטי מוצר ${product.dataset.name}`);

  product.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    openFeaturedProduct();
  });

  product.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openFeaturedProduct();
  });
});

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

document.getElementById("toast")?.addEventListener("click", goToCart);

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

document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("custom-print-preview");
  const countInputs = document.querySelectorAll(
    'input[name="character-count"]',
  );
  const characterCards = document.querySelectorAll("[data-character-card]");
  const printSubmit = document.getElementById("custom-print-submit");
  const comicThemeInput = document.getElementById("comic-theme");
  const comicThemeSubmit = document.getElementById("comic-theme-submit");

  if (!preview || !countInputs.length || !printSubmit || !comicThemeSubmit) {
    return;
  }

  const characterDefaults = [
    {
      gender: "female",
      hairstyle: "updo",
      hairColor: "dark",
      mood: "happy",
      outfit: "comfy",
      speech: "יאללה, בואו נתחיל",
    },
    {
      gender: "male",
      hairstyle: "short",
      hairColor: "brown",
      mood: "neutral",
      outfit: "overall",
      speech: "זה הכי אנחנו",
    },
  ];

  const labels = {
    gender: {
      female: "בת",
      male: "בן",
    },
    hairstyle: {
      updo: "אסוף",
      short: "קצר",
      long: "ארוך",
      weird: "מוזר",
    },
    hairColor: {
      dark: "כהה",
      brown: "חום",
      ginger: "ג'ינג'י",
      blonde: "בלונד",
      fantasy: "צבעוני",
    },
    mood: {
      happy: "שמח",
      neutral: "ניטרלי",
      sad: "עצוב",
      worried: "מודאג",
      judgy: "שופט",
    },
    outfit: {
      comfy: "נוח",
      "less-comfy": "פחות נוח",
      strawberries: "סוודר עם תותים",
      overall: "אוברול",
      dress: "שמלה",
    },
  };

  function getCharacterState(index) {
    return {
      gender:
        document.getElementById(`gender-${index}`)?.value ||
        characterDefaults[index].gender,
      hairstyle:
        document.getElementById(`hairstyle-${index}`)?.value ||
        characterDefaults[index].hairstyle,
      hairColor:
        document.getElementById(`hair-color-${index}`)?.value ||
        characterDefaults[index].hairColor,
      mood:
        document.getElementById(`mood-${index}`)?.value ||
        characterDefaults[index].mood,
      outfit:
        document.getElementById(`outfit-${index}`)?.value ||
        characterDefaults[index].outfit,
      speech:
        document.getElementById(`speech-${index}`)?.value.trim() ||
        characterDefaults[index].speech,
    };
  }

  function getCharacterCount() {
    return (
      document.querySelector('input[name="character-count"]:checked')?.value ||
      "1"
    );
  }

  function renderPreview() {
    const count = Number(getCharacterCount());
    const characters = [getCharacterState(0), getCharacterState(1)].slice(
      0,
      count,
    );

    preview.innerHTML = "";
    characters.forEach((character, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "custom-print__character";

      const bubble = document.createElement("div");
      bubble.className = "custom-print__bubble";
      bubble.textContent = character.speech || "כיתוב כאן";

      const figure = document.createElement("div");
      figure.className = `custom-print__figure ${
        count === 1 ? "custom-print__figure--single" : ""
      }`;

      const hair = document.createElement("div");
      hair.className = `custom-print__hair custom-print__hair--${character.gender} custom-print__hair--${character.hairstyle} custom-print__hair--${character.hairColor}`;

      const head = document.createElement("div");
      head.className = `custom-print__head custom-print__head--${character.mood}`;

      const body = document.createElement("div");
      body.className = `custom-print__body custom-print__body--${character.outfit}`;

      figure.appendChild(hair);
      figure.appendChild(head);
      figure.appendChild(body);
      wrapper.appendChild(bubble);
      wrapper.appendChild(figure);
      preview.appendChild(wrapper);
    });
  }

  function updateVisibility() {
    const count = Number(getCharacterCount());
    characterCards.forEach((card, index) => {
      card.hidden = index >= count;
    });
  }

  function updatePrintLink() {
    const count = Number(getCharacterCount());
    const characters = [getCharacterState(0), getCharacterState(1)].slice(
      0,
      count,
    );

    const lines = [
      "היי, אני רוצה לבנות פרינט אישי",
      `מספר דמויות: ${count}`,
      ...characters.map(
        (character, index) =>
          `דמות ${index + 1}: ${labels.gender[character.gender]}, תסרוקת ${labels.hairstyle[character.hairstyle]}, צבע שיער ${labels.hairColor[character.hairColor]}, מצב רוח ${labels.mood[character.mood]}, לבוש ${labels.outfit[character.outfit]}, בועה "${character.speech}"`,
      ),
    ];

    printSubmit.href = `https://wa.me/972542634686?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
  }

  function updateComicLink() {
    const theme = comicThemeInput?.value.trim();
    const text = theme
      ? `היי, יש לי רעיון לקומיקס אישי:\n${theme}`
      : "היי, אני רוצה להזמין קומיקס אישי";

    comicThemeSubmit.href = `https://wa.me/972542634686?text=${encodeURIComponent(
      text,
    )}`;
  }

  function syncCustomizer() {
    updateVisibility();
    renderPreview();
    updatePrintLink();
    updateComicLink();
  }

  countInputs.forEach((input) =>
    input.addEventListener("change", syncCustomizer),
  );
  [0, 1].forEach((index) => {
    ["gender", "hairstyle", "hair-color", "mood", "outfit", "speech"].forEach(
      (field) => {
        document
          .getElementById(`${field}-${index}`)
          ?.addEventListener("input", syncCustomizer);
        document
          .getElementById(`${field}-${index}`)
          ?.addEventListener("change", syncCustomizer);
      },
    );
  });
  comicThemeInput?.addEventListener("input", updateComicLink);

  syncCustomizer();
});

if (window.location.search.includes("fbclid")) {
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
}
