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
  storageBucket: "yuli-store-24998.appspot.com",
  messagingSenderId: "831975622912",
  appId: "1:831975622912:web:085160cabf000ecf04cbe5",
  measurementId: "G-P1KF52S3ZK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("personal-order-form");
const statusEl = document.getElementById("personal-order-status");
const submitButton = form?.querySelector("button[type='submit']");
const whatsappFallback = document.getElementById("personal-order-whatsapp");
const successBox = document.getElementById("personal-order-success");
const personalOrderPrice = 350;

function setStatus(message) {
  if (!statusEl) return;
  statusEl.textContent = message;
}

function setWhatsappFallback({ name, email, phone, notes }) {
  if (!whatsappFallback) return;

  const message = [
    "היי, אני רוצה להזמין ציור דיגיטלי",
    `שם: ${name}`,
    `מייל: ${email}`,
    `טלפון: ${phone}`,
    notes ? `מה לצייר: ${notes}` : "",
    "אצרף כאן את התמונה.",
  ]
    .filter(Boolean)
    .join("\n");

  whatsappFallback.href = `https://wa.me/972542634686?text=${encodeURIComponent(
    message,
  )}`;
  whatsappFallback.hidden = false;
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!name || !email || !phone) {
    setStatus("צריך למלא שם, מייל וטלפון.");
    return;
  }

  if (whatsappFallback) {
    whatsappFallback.hidden = true;
  }
  if (successBox) {
    successBox.hidden = true;
  }

  try {
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "שולחים...";
    }
    setStatus("שומרת את פרטי ההזמנה.");

    const orderData = {
      type: "הזמנת ציור דיגיטלי",
      name,
      email,
      phone,
      notes,
      imageDelivery: "הלקוח/ה יצורפו תמונה בוואטסאפ",
      price: personalOrderPrice,
      currency: "ILS",
      delivery: "עד חודש מההזמנה",
      deliverable: "קובץ דיגיטלי באיכות גבוהה להדפסה",
      createdAt: serverTimestamp(),
    };

    const orderRef = await addDoc(collection(db, "personalOrders"), orderData);

    localStorage.setItem("lastTotal", String(personalOrderPrice));
    localStorage.setItem(
      "lastOrderSummary",
      JSON.stringify({
        kind: "personal-digital-illustration",
        id: orderRef.id,
        name,
        email,
        phone,
        notes,
        total: personalOrderPrice,
        itemName: "ציור דיגיטלי באיכות גבוהה להדפסה",
        delivery: "עד חודש מההזמנה",
      }),
    );

    form.reset();
    if (whatsappFallback) {
      setWhatsappFallback({ name, email, phone, notes });
    }
    if (successBox) {
      successBox.hidden = false;
    }
    setStatus("ההזמנה נשלחה ונשמרה. עכשיו אפשר לצרף תמונה בוואטסאפ ולעבור לתשלום.");
  } catch (error) {
    console.error("Personal order error:", error);
    setStatus("משהו השתבש בשליחה. אפשר לנסות שוב או לשלוח לי הודעה בוואטסאפ.");
    setWhatsappFallback({ name, email, phone, notes });
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "שליחת הזמנה";
    }
  }
});
