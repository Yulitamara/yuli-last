const streetInput = document.getElementById("street-input");
const houseNumberInput = document.getElementById("house-number-input");
const apartmentInput = document.getElementById("apartment-input");
const cityInput = document.getElementById("city-input");
const deliveryNotesInput = document.getElementById("delivery-notes-input");
const shippingCostDisplay = document.getElementById("shipping-cost");
const shippingSection = document.getElementById("cart-shipping-section");
const deliveryAddressSection = document.getElementById(
  "delivery-address-section"
);
const deliveryMethodInputs = document.querySelectorAll(
  'input[name="delivery-method"]'
);
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

function normalizeText(value = "") {
  return value.trim().replace(/\s+/g, " ");
}

function findMatchingCity(city) {
  const normalizedCity = normalizeText(city);

  if (!normalizedCity) {
    return null;
  }

  return Object.keys(cityShippingCosts).find((city) =>
    normalizedCity === city || normalizedCity.includes(city) || city.includes(normalizedCity)
  );
}

function getSelectedDeliveryMethod() {
  const selectedInput = document.querySelector(
    'input[name="delivery-method"]:checked'
  );

  return selectedInput?.value || "shipping";
}

function updateDeliveryMethodUI() {
  const isPickup = getSelectedDeliveryMethod() === "pickup";

  if (deliveryAddressSection) {
    deliveryAddressSection.style.display = isPickup ? "none" : "flex";
  }
}

const updateShippingCost = () => {
  if (!cityInput || !shippingCostDisplay) return;

  if (getSelectedDeliveryMethod() === "pickup") {
    shippingCost = 0;
    shippingCostDisplay.textContent = "איסוף עצמי מתל אביב";
    localStorage.setItem(
      "shipping",
      JSON.stringify({
        method: "pickup",
        address: null,
        city: null,
        cost: 0,
      })
    );
    renderCart();
    return;
  }

  const street = normalizeText(streetInput?.value);
  const houseNumber = normalizeText(houseNumberInput?.value);
  const apartment = normalizeText(apartmentInput?.value);
  const cityValue = normalizeText(cityInput.value);
  const notes = normalizeText(deliveryNotesInput?.value);
  const city = findMatchingCity(cityValue);

  if (city) {
    shippingCost = cityShippingCosts[city];
    shippingCostDisplay.textContent = `עלות משלוח: ${shippingCost} ש"ח`;
    localStorage.setItem(
      "shipping",
      JSON.stringify({
        method: "shipping",
        address: {
          street,
          houseNumber,
          apartment,
          city: cityValue,
          notes,
        },
        city,
        cost: shippingCost,
      })
    );
  } else if (cityValue) {
    shippingCost = 0;
    shippingCostDisplay.textContent =
      "העיר לא זוהתה ברשימת המשלוחים האוטומטיים, ניצור קשר לגבי העלות";
    localStorage.setItem(
      "shipping",
      JSON.stringify({
        method: "shipping",
        address: {
          street,
          houseNumber,
          apartment,
          city: cityValue,
          notes,
        },
        city: null,
        cost: 0,
      })
    );
  } else {
    shippingCost = 0;
    shippingCostDisplay.textContent = 'עלות משלוח: 0 ש"ח';
    localStorage.removeItem("shipping");
  }
  renderCart();
};

[streetInput, houseNumberInput, apartmentInput, cityInput, deliveryNotesInput].forEach((input) => {
  input?.addEventListener("change", updateShippingCost);
  input?.addEventListener("input", updateShippingCost);
});
deliveryMethodInputs.forEach((input) => {
  input.addEventListener("change", () => {
    updateDeliveryMethodUI();
    updateShippingCost();
  });
});

function initializeShipping() {
  const savedShipping = JSON.parse(localStorage.getItem("shipping")) || null;

  if (!savedShipping) {
    document.getElementById("delivery-method-shipping").checked = true;
    updateDeliveryMethodUI();
    if (streetInput) streetInput.value = "";
    if (houseNumberInput) houseNumberInput.value = "";
    if (apartmentInput) apartmentInput.value = "";
    if (cityInput) cityInput.value = "";
    if (deliveryNotesInput) deliveryNotesInput.value = "";
    if (shippingCostDisplay) {
      shippingCostDisplay.textContent = 'עלות משלוח: 0 ש"ח';
    }
    shippingCost = 0;
    return;
  }

  const isPickup = savedShipping.method === "pickup";
  const selectedDeliveryMethod = document.getElementById(
    isPickup ? "delivery-method-pickup" : "delivery-method-shipping"
  );
  if (selectedDeliveryMethod) {
    selectedDeliveryMethod.checked = true;
  }
  updateDeliveryMethodUI();

  shippingCost = savedShipping.cost || 0;

  if (savedShipping.address) {
    if (streetInput) {
      streetInput.value = savedShipping.address.street || "";
    }
    if (houseNumberInput) {
      houseNumberInput.value = savedShipping.address.houseNumber || "";
    }
    if (apartmentInput) {
      apartmentInput.value = savedShipping.address.apartment || "";
    }
    if (cityInput) {
      cityInput.value = savedShipping.address.city || "";
    }
    if (deliveryNotesInput) {
      deliveryNotesInput.value = savedShipping.address.notes || "";
    }
  }

  if (shippingCostDisplay) {
    shippingCostDisplay.textContent = isPickup
      ? "איסוף עצמי מתל אביב"
      : savedShipping.city
      ? `עלות משלוח: ${shippingCost} ש"ח`
      : "לא זיהינו עיר במרכז מהכתובת, ניצור איתך קשר לגבי עלות משלוח";
  }
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const bitAmount = document.getElementById("bit-amount");

  if (!container) {
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";
  let total = 0;

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

    if (totalElement) {
      totalElement.innerText = "0";
    }
    if (bitAmount) {
      bitAmount.innerText = "0 ₪";
    }
    return;
  }

  if (shippingSection) {
    shippingSection.style.display = "flex";
  }

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-details">
                <div>${item.name}</div>
                <div>${item.price} ₪ ליחידה</div>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span class="quantity-count">${quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <i class="ri-delete-bin-line" onclick="removeFromCart(${index})" title="הסר פריט"></i>
        `;
    container.appendChild(div);
    total += item.price * quantity;
  });

  total += shippingCost;
  if (totalElement) {
    totalElement.innerText = total;
  }
  if (bitAmount) {
    bitAmount.innerText = total + " ₪";
  }
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
