const firebaseConfig = {
  apiKey: "AIzaSyAEkUW9-aLVI2LV0u5JeiwbpvWMZFrvRR8",
  authDomain: "yuli-store-24998.firebaseapp.com",
  projectId: "yuli-store-24998",
  storageBucket: "yuli-store-24998.appspot.com",
  messagingSenderId: "831975622912",
  appId: "1:831975622912:web:085160cabf000ecf04cbe5",
  measurementId: "G-P1KF52S3ZK",
};

const form = document.getElementById("cart-shipping-section");
const submitButton = document.getElementById("submit-order");
const orderStatus = document.getElementById("order-status");
const submitLabel = submitButton.textContent.trim();

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.createElement("p");
  error.id = `${fieldId}-error`;
  error.className = "form-error";
  error.textContent = message;
  field.after(error);
  field.setAttribute("aria-invalid", "true");
  const description = [field.getAttribute("aria-describedby"), error.id]
    .filter(Boolean)
    .join(" ");
  field.setAttribute("aria-describedby", description);
}

function clearError(field) {
  const errorId = `${field.id}-error`;
  const error = document.getElementById(errorId);
  if (!error) return;

  error.remove();
  field.removeAttribute("aria-invalid");
  const description = (field.getAttribute("aria-describedby") || "")
    .split(" ")
    .filter((id) => id && id !== errorId)
    .join(" ");
  if (description) {
    field.setAttribute("aria-describedby", description);
  } else {
    field.removeAttribute("aria-describedby");
  }
}

form.addEventListener("input", (event) => clearError(event.target));
form.addEventListener("change", (event) => clearError(event.target));

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submitButton.disabled) return;

  form.querySelectorAll('[aria-invalid="true"]').forEach(clearError);
  orderStatus.textContent = "";

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.length) {
    orderStatus.textContent = "העגלה ריקה. הוסיפו פריטים לפני ביצוע ההזמנה.";
    return;
  }

  // Read form values again because browser autofill may skip input events.
  const shipping = updateShippingCost();
  const { street, houseNumber, city } = shipping.address;
  const name = document.getElementById("user-name").value.trim();
  const phone = document.getElementById("user-phone").value
    .replace(/[\s()–-]/g, "")
    .replace(/^\+972/, "0");

  if (!name) showError("user-name", "יש להזין שם");

  if (!/^05\d{8}$/.test(phone)) {
    showError("user-phone", "מספר טלפון לא תקין (לדוגמה: 0541234567)");
  }

  if (street.length < 2) {
    showError("street-input", "יש להזין שם רחוב מלא");
  }

  if (!/^(?=.*\d)[0-9א-ת/ -]{1,10}$/.test(houseNumber)) {
    showError("house-number-input", "יש להזין מספר בית תקין");
  }

  if (!city) {
    showError("city-input", "יש להזין עיר למשלוח");
  } else if (!shipping.city) {
    showError(
      "city-input",
      getCityMatches(city).length
        ? "יש לבחור עיר מהרשימה או להשלים את שם העיר"
        : "לעיר הזו אין תעריף באתר. אפשר לתאם משלוח בוואטסאפ.",
    );
  }

  const firstInvalidField = form.querySelector('[aria-invalid="true"]');
  if (firstInvalidField) {
    orderStatus.textContent = "צריך להשלים את השדות המסומנים.";
    firstInvalidField.focus();
    return;
  }

  const total = Number(document.getElementById("total").textContent);
  const order = { name, phone, cart, shipping, total };
  submitButton.disabled = true;
  submitButton.textContent = "שומרת את ההזמנה...";
  orderStatus.textContent = "ההזמנה נקלטת, מיד עוברים לתשלום.";

  try {
    const [{ initializeApp }, firestore] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js"),
    ]);
    const { getFirestore, collection, addDoc, serverTimestamp } = firestore;
    const db = getFirestore(initializeApp(firebaseConfig));
    await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: serverTimestamp(),
    });

    localStorage.setItem("lastTotal", total);
    localStorage.setItem("lastOrderSummary", JSON.stringify(order));
    localStorage.removeItem("cart");
    localStorage.removeItem("shipping");
    form.reset();
    window.location.href = "payment.html";
  } catch (error) {
    console.error("שגיאה בשמירה:", error);
    submitButton.disabled = false;
    submitButton.textContent = submitLabel;
    orderStatus.textContent = "ההזמנה לא נשמרה. אפשר לנסות שוב או לכתוב לי בוואטסאפ.";
  }
});
