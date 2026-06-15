const streetInput = document.getElementById("street-input");
const houseNumberInput = document.getElementById("house-number-input");
const apartmentInput = document.getElementById("apartment-input");
const cityInput = document.getElementById("city-input");
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

const updateShippingCost = () => {
  if (!cityInput || !shippingCostDisplay) return;

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

function initializeShipping() {
  const savedShipping = JSON.parse(localStorage.getItem("shipping")) || null;

  if (!savedShipping || savedShipping.method === "pickup") {
    if (savedShipping?.method === "pickup") {
      localStorage.removeItem("shipping");
    }
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
    shippingCostDisplay.textContent = savedShipping.city
      ? `עלות משלוח: ${shippingCost} ש"ח`
      : "לא זיהינו עיר במרכז מהכתובת, ניצור איתך קשר לגבי עלות משלוח";
  }
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  const subtotalElement = document.getElementById("subtotal");
  const shippingTotalElement = document.getElementById("shipping-total");
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
    if (subtotalElement) {
      subtotalElement.innerText = "0";
    }
    if (shippingTotalElement) {
      shippingTotalElement.innerText = "0";
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
    const itemTotal = item.price * quantity;
    const priceText =
      quantity > 1
        ? `${item.price} ₪ ליחידה · ${itemTotal} ₪ יחד`
        : `${item.price} ₪ ליחידה`;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            <div class="cart-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${priceText}</div>
                <div class="quantity-controls">
                    <button type="button" data-quantity-decrease="${index}" aria-label="הפחתת כמות עבור ${item.name}">−</button>
                    <span class="quantity-count">${quantity}</span>
                    <button type="button" data-quantity-increase="${index}" aria-label="הוספת כמות עבור ${item.name}">+</button>
                </div>
            </div>
            <button type="button" class="cart-remove" data-remove-item="${index}" aria-label="הסרת ${item.name} מהעגלה">
              <i class="ri-delete-bin-line" aria-hidden="true"></i>
            </button>
        `;
    container.appendChild(div);
    total += itemTotal;
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

  if (subtotalElement) {
    subtotalElement.innerText = total;
  }
  if (shippingTotalElement) {
    shippingTotalElement.innerText = shippingCost;
  }

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
