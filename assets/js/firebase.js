import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAEkUW9-aLVI2LV0u5JeiwbpvWMZFrvRR8",
  authDomain: "yuli-store-24998.firebaseapp.com",
  projectId: "yuli-store-24998",
  storageBucket: "yuli-store-24998.firebasestorage.app",
  messagingSenderId: "831975622912",
  appId: "1:831975622912:web:085160cabf000ecf04cbe5",
  measurementId: "G-P1KF52S3ZK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit-order");

  if (submitBtn) {
    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      clearErrors();
      await saveOrder();
    });
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let errorEl = field.nextElementSibling;

    if (!errorEl || !errorEl.classList.contains("form-error")) {
      errorEl = document.createElement("div");
      errorEl.className = "form-error";

      field.parentNode.insertBefore(errorEl, field.nextSibling);
    }

    errorEl.innerText = message;
  }

  function clearErrors() {
    document.querySelectorAll(".form-error").forEach((el) => el.remove());
  }

  async function saveOrder() {
    const name = document.getElementById("user-name")?.value.trim();
    const phone = document.getElementById("user-phone")?.value.trim();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const shipping = JSON.parse(localStorage.getItem("shipping")) || null;
    const total = parseInt(document.getElementById("total")?.innerText || 0);

    let hasError = false;

    if (!name) {
      showError("user-name", "יש להזין שם");
      hasError = true;
    }

    if (!/^05\d{8}$/.test(phone)) {
      showError("user-phone", "מספר טלפון לא תקין (לדוגמה: 0541234567)");
      hasError = true;
    }

    if (!cart.length) {
      alert("העגלה ריקה – הוסיפו פריטים לפני ביצוע ההזמנה.");
      return;
    }

    if (hasError) return;

    const orderData = {
      name,
      phone,
      cart,
      shipping,
      total,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      localStorage.setItem("lastTotal", total);
      window.location.href = "payment.html";
    } catch (error) {
      console.error("שגיאה בשמירה:", error);
      alert("אירעה שגיאה בשמירת ההזמנה. נסה/י שוב.");
    }
  }
});
