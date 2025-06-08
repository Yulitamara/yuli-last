const citySelect = document.getElementById("city-select");
const shippingCostDisplay = document.getElementById("shipping-cost");
const bitLink = document.getElementById("bit-link");
let shippingCost = 0;

const cityShippingCosts = {
  "תל אביב": 30,
  גבעתיים: 50,
  "רמת גן": 50,
  חולון: 50,
  "בת ים": 50,
  הרצליה: 50,
  "רמת השרון": 50,
  "פתח תקווה": 50,
  "בני ברק": 50,
  "קרית אונו": 50,
  "ראשון לציון": 50,
};

citySelect?.addEventListener("change", () => {
  const city = citySelect.value;
  if (cityShippingCosts[city]) {
    shippingCost = cityShippingCosts[city];
    shippingCostDisplay.textContent = `עלות משלוח: ${shippingCost} ש"ח`;
    localStorage.setItem(
      "shipping",
      JSON.stringify({ city, cost: shippingCost })
    );
  } else {
    shippingCost = 0;
    shippingCostDisplay.textContent = 'עלות משלוח: 0 ש"ח';
    localStorage.removeItem("shipping");
  }
  renderCart();
});

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;

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
  document.getElementById("total").innerText = total;
  document.getElementById("bit-amount").innerText = total + " ₪";
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
