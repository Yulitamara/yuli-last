const streetInput = document.getElementById("street-input");
const houseNumberInput = document.getElementById("house-number-input");
const apartmentInput = document.getElementById("apartment-input");
const cityInput = document.getElementById("city-input");
const cityOptions = document.getElementById("city-options");
const deliveryNotesInput = document.getElementById("delivery-notes-input");
const shippingCostDisplay = document.getElementById("shipping-cost");
const shippingSection = document.getElementById("cart-shipping-section");
let shippingCost = 0;

const cityShippingCosts = {
  "תל אביב": 30,
  גבעתיים: 50,
  "רמת גן": 50,
  "בני ברק": 50,
  חולון: 50,
  "בת ים": 50,
  אזור: 50,
  "ראשון לציון": 50,
  "אור יהודה": 50,
  "יהוד-מונוסון": 50,
  "קרית אונו": 50,
  "גני תקווה": 50,
  סביון: 50,
  "פתח תקווה": 50,
  הרצליה: 50,
  "רמת השרון": 50,
  רעננה: 50,
  "הוד השרון": 50,
  "כפר סבא": 50,
  "נס ציונה": 50,
  רחובות: 50,
  רמלה: 50,
  לוד: 50,
  שוהם: 50,
  "מודיעין-מכבים-רעות": 50,
};

const cityAliases = {
  "תל אביב יפו": "תל אביב",
  "תא": "תל אביב",
  "יהוד": "יהוד-מונוסון",
  "קריית אונו": "קרית אונו",
  "פתח תקוה": "פתח תקווה",
  "מודיעין": "מודיעין-מכבים-רעות",
  "מודיעין מכבים רעות": "מודיעין-מכבים-רעות",
  "tel aviv": "תל אביב",
  "tel aviv yafo": "תל אביב",
  "tel aviv jaffa": "תל אביב",
  telaviv: "תל אביב",
  givatayim: "גבעתיים",
  givataim: "גבעתיים",
  "ramat gan": "רמת גן",
  ramatgan: "רמת גן",
  "bnei brak": "בני ברק",
  "bene brak": "בני ברק",
  bneibrak: "בני ברק",
  holon: "חולון",
  "bat yam": "בת ים",
  batyam: "בת ים",
  azor: "אזור",
  "rishon lezion": "ראשון לציון",
  "rishon le zion": "ראשון לציון",
  "rishon letsiyon": "ראשון לציון",
  rishon: "ראשון לציון",
  "or yehuda": "אור יהודה",
  "or yahuda": "אור יהודה",
  "yehud monosson": "יהוד-מונוסון",
  "yehud monson": "יהוד-מונוסון",
  yehud: "יהוד-מונוסון",
  "kiryat ono": "קרית אונו",
  "qiryat ono": "קרית אונו",
  "ganei tikva": "גני תקווה",
  "ganei tikvah": "גני תקווה",
  "gany tikva": "גני תקווה",
  savyon: "סביון",
  "petah tikva": "פתח תקווה",
  "petach tikva": "פתח תקווה",
  "petah tikvah": "פתח תקווה",
  "petach tikvah": "פתח תקווה",
  "ramat hasharon": "רמת השרון",
  "ramat ha sharon": "רמת השרון",
  herzliya: "הרצליה",
  hertzliya: "הרצליה",
  raanana: "רעננה",
  ranana: "רעננה",
  "hod hasharon": "הוד השרון",
  "hod ha sharon": "הוד השרון",
  "kfar saba": "כפר סבא",
  "kfar sava": "כפר סבא",
  "ness ziona": "נס ציונה",
  "nes ziona": "נס ציונה",
  "ness tsiona": "נס ציונה",
  rehovot: "רחובות",
  rechovot: "רחובות",
  rehovoth: "רחובות",
  ramla: "רמלה",
  ramle: "רמלה",
  lod: "לוד",
  lud: "לוד",
  shoham: "שוהם",
  "modiin": "מודיעין-מכבים-רעות",
  "modi in": "מודיעין-מכבים-רעות",
  "modiin maccabim reut": "מודיעין-מכבים-רעות",
  "modiin macabim reut": "מודיעין-מכבים-רעות",
  "modiin makabim reut": "מודיעין-מכבים-רעות",
};

function normalizeText(value = "") {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeCitySearch(value = "") {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[.'’"׳״]/g, "")
    .replace(/[-_־–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const citySearchKeys = new Map(
  [
    ...Object.keys(cityShippingCosts).map((city) => [city, city]),
    ...Object.entries(cityAliases),
  ].map(([name, city]) => [normalizeCitySearch(name), city]),
);

function getCityMatches(value) {
  const query = normalizeCitySearch(value);
  if (!query) return [];

  const matches = new Set();
  for (const [name, city] of citySearchKeys) {
    if (name.startsWith(query)) matches.add(city);
  }
  return [...matches];
}

let activeCityOption = -1;

function closeCityOptions() {
  cityOptions.hidden = true;
  cityInput.setAttribute("aria-expanded", "false");
  cityInput.removeAttribute("aria-activedescendant");
  activeCityOption = -1;
}

function showCityOptions() {
  closeCityOptions();
  if (citySearchKeys.has(normalizeCitySearch(cityInput.value))) return;

  const matches = getCityMatches(cityInput.value);
  const options = matches.map((city, index) => {
    const option = document.createElement("li");
    option.id = `shipping-city-${index}`;
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", "false");
    option.textContent = city;
    return option;
  });
  cityOptions.replaceChildren(...options);
  if (options.length) {
    cityOptions.hidden = false;
    cityInput.setAttribute("aria-expanded", "true");
  }
}

function selectCity(city) {
  cityInput.value = city;
  closeCityOptions();
  cityInput.dispatchEvent(new Event("change", { bubbles: true }));
}

cityInput?.addEventListener("focus", showCityOptions);
cityInput?.addEventListener("input", showCityOptions);
cityInput?.addEventListener("blur", closeCityOptions);

cityOptions?.addEventListener("mousedown", (event) => {
  // Keep focus on the field until the clicked suggestion is selected.
  event.preventDefault();
});
cityOptions?.addEventListener("click", (event) => {
  const option = event.target.closest('[role="option"]');
  if (option) selectCity(option.textContent);
});

cityInput?.addEventListener("keydown", (event) => {
  if (event.isComposing) return;

  if (event.key === "Escape") {
    closeCityOptions();
    return;
  }

  const moving = event.key === "ArrowDown" || event.key === "ArrowUp";
  if (moving && cityOptions.hidden) showCityOptions();
  if (cityOptions.hidden) return;

  const options = [...cityOptions.children];
  if (moving) {
    event.preventDefault();
    const last = options.length - 1;
    if (event.key === "ArrowDown") {
      activeCityOption = Math.min(activeCityOption + 1, last);
    } else {
      activeCityOption = activeCityOption < 0 ? last : Math.max(activeCityOption - 1, 0);
    }
    options.forEach((option, index) => {
      option.setAttribute("aria-selected", String(index === activeCityOption));
    });
    const option = options[activeCityOption];
    cityInput.setAttribute("aria-activedescendant", option.id);
    option.scrollIntoView({ block: "nearest" });
  } else if (event.key === "Enter" && activeCityOption >= 0) {
    event.preventDefault();
    selectCity(options[activeCityOption].textContent);
  }
});

function updateShippingCost() {
  const cityValue = normalizeText(cityInput.value);
  const city = citySearchKeys.get(normalizeCitySearch(cityValue)) || null;
  shippingCost = city ? cityShippingCosts[city] : 0;

  let message = "עלות המשלוח תופיע אחרי הזנת העיר.";
  if (city) {
    message = `עלות משלוח: ${shippingCost} ₪`;
  } else if (getCityMatches(cityValue).length) {
    message = "בחרו עיר מהרשימה או השלימו את שם העיר.";
  } else if (cityValue) {
    message = "לעיר הזו אין תעריף באתר. אפשר לתאם משלוח בוואטסאפ.";
  }

  if (shippingCostDisplay.textContent !== message) {
    shippingCostDisplay.textContent = message;
  }

  const address = {
    street: normalizeText(streetInput.value),
    houseNumber: normalizeText(houseNumberInput.value),
    apartment: normalizeText(apartmentInput.value),
    city: city || cityValue,
    notes: normalizeText(deliveryNotesInput.value),
  };
  const shipping = { method: "shipping", address, city, cost: shippingCost };
  if (Object.values(address).some(Boolean)) {
    localStorage.setItem("shipping", JSON.stringify(shipping));
  } else {
    localStorage.removeItem("shipping");
  }
  renderCartTotals();
  return shipping;
}

const addressInputs = {
  street: streetInput,
  houseNumber: houseNumberInput,
  apartment: apartmentInput,
  city: cityInput,
  notes: deliveryNotesInput,
};

Object.values(addressInputs).forEach((input) => {
  input?.addEventListener("change", updateShippingCost);
  input?.addEventListener("input", updateShippingCost);
});

function initializeShipping() {
  const saved = JSON.parse(localStorage.getItem("shipping"));
  const address = saved?.method === "shipping" ? saved.address : null;
  for (const [key, input] of Object.entries(addressInputs)) {
    if (input) input.value = address?.[key] || "";
  }
  if (cityInput) updateShippingCost();
}

function renderCartTotals(cart = JSON.parse(localStorage.getItem("cart")) || []) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const delivery = cart.length ? shippingCost : 0;
  const total = subtotal + delivery;
  document.getElementById("subtotal").textContent = subtotal;
  document.getElementById("shipping-total").textContent = delivery
    ? `${delivery} ₪`
    : "—";
  document.getElementById("total").textContent = total;
}

function renderCart() {
  const container = document.getElementById("cart-items");

  if (!container) {
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";
  renderCartTotals(cart);

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>העגלה ריקה</p>
        <a href="index.html#gallery" class="paybox-button">בחזרה לחנות</a>
      </div>
    `;

    if (shippingSection) {
      shippingSection.style.display = "none";
    }

    return;
  }

  if (shippingSection) {
    shippingSection.style.display = "flex";
  }

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const itemTotal = item.price * quantity;
    const legacyNameParts = item.name.split(" - ");
    const displayName = item.variant ? item.name : legacyNameParts[0];
    const displayVariant = item.variant || legacyNameParts.slice(1).join(" - ");
    const priceText =
      quantity > 1
        ? `${item.price} ₪ ליחידה · ${itemTotal} ₪ יחד`
        : `${item.price} ₪ ליחידה`;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
            <img src="${item.img}" alt="${displayName}" loading="lazy">
            <div class="cart-details">
                <div class="cart-item-name">${displayName}</div>
                ${displayVariant ? `<div class="cart-item-variant">${displayVariant}</div>` : ""}
                <div class="cart-item-price">${priceText}</div>
                <div class="quantity-controls">
                    <button type="button" data-quantity-decrease="${index}" aria-label="הפחתת כמות עבור ${displayName}">−</button>
                    <span class="quantity-count">${quantity}</span>
                    <button type="button" data-quantity-increase="${index}" aria-label="הוספת כמות עבור ${displayName}">+</button>
                </div>
            </div>
            <button type="button" class="cart-remove" data-remove-item="${index}" aria-label="הסרת ${displayName} מהעגלה">
              <i class="ri-delete-bin-line" aria-hidden="true"></i>
            </button>
        `;
    container.appendChild(div);
  });

  container.querySelectorAll("[data-quantity-decrease]").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(Number(button.dataset.quantityDecrease), -1);
    });
  });

  container.querySelectorAll("[data-quantity-increase]").forEach((button) => {
    button.addEventListener("click", () => {
      changeQuantity(Number(button.dataset.quantityIncrease), 1);
    });
  });

  container.querySelectorAll("[data-remove-item]").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(Number(button.dataset.removeItem));
    });
  });
}

// function changeQuantity(index, delta) {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   cart[index].quantity = (cart[index].quantity || 1) + delta;

//   if (cart[index].quantity < 1) {
//     // אנימציה להסרה
//     const container = document.getElementById("cart-items");
//     const itemElement = container.children[index];
//     itemElement.classList.add("fade-out");

//     setTimeout(() => {
//       cart.splice(index, 1);
//       localStorage.setItem("cart", JSON.stringify(cart));
//       renderCart();
//     }, 300);
//   } else {
//     // עדכון כמות רגיל
//     localStorage.setItem("cart", JSON.stringify(cart));
//     renderCart();
//   }
// }

function changeQuantity(index, delta) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const itemElement = container.children[index];
  const quantitySpan = itemElement.querySelector(".quantity-count");

  cart[index].quantity = (cart[index].quantity || 1) + delta;

  if (cart[index].quantity < 1) {
    // fade-out למחיקה
    itemElement.classList.add("fade-out");
    setTimeout(() => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }, 300);
  } else {
    // עדכון localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // אנימציה רק על המספר
    quantitySpan.classList.add("quantity-bump");
    quantitySpan.addEventListener(
      "animationend",
      () => {
        quantitySpan.classList.remove("quantity-bump");
        renderCart();
      },
      { once: true }
    );
  }
}

function removeFromCart(index) {
  const container = document.getElementById("cart-items");
  const itemElement = container.children[index];

  // הוספת class של fade-out
  itemElement.classList.add("fade-out");

  // מחיקה אחרי סיום האנימציה (300ms)
  setTimeout(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }, 300);
}

initializeShipping();
renderCart();

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("📋 המספר הועתק! עכשיו פתחי את אפליקציית ביט והדביקי אותו.");
    })
    .catch(() => {
      alert("שגיאה בהעתקה. נסי שוב.");
    });
}
