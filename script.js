const API_KEY = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODY3NDQ2OTksImlhdCI6MTc1NTIwODY5OSwicmF5IjoiMGFjMmQ2YzMzNWM2OGRiZmM4NDdhZTQ2Mjc2NWUzODIiLCJzdWIiOjkzOTM5Mn0.dR1R-peil2ulKtEam5jnGejgBu8GwwhOhcqQeycagdRXkw6q1Fg1gwJDOLtoMe6yDsIoafQnSRHtXCPBMUfG_zCukank7zEsREErLM8B3HvPLs4ddUGzcmPytkL3AdhHFYNIzGkEE0KBXHLFyrOo5YjTXlCWjESZ-ksTZUsN3W_37FlCejgMlgZJ-HK7esQmu6fafFH5gYqAdS_xz0IPw-p2JaLkIhOb8pkSx-Kwji73lA62Vq8KbDcB5YwWf1O_5sZ1NqTpiGBVsKWHY5EoUjFUowZVqe8JOFPKN9dwfias-isHgpoOZPVcqFqHKrGUfh_nB1zk3hGyAngpEkuQ4A";
const BASE_URL = "https://5sim.net/v1/user";

// الدول (مبدئياً 5 دول)
const countries = [
  { code: "vn", name: "فيتنام", flag: "https://flagcdn.com/w40/vn.png" },
  { code: "id", name: "إندونيسيا", flag: "https://flagcdn.com/w40/id.png" },
  { code: "us", name: "أمريكا", flag: "https://flagcdn.com/w40/us.png" },
  { code: "nl", name: "هولندا", flag: "https://flagcdn.com/w40/nl.png" },
  { code: "ru", name: "روسيا", flag: "https://flagcdn.com/w40/ru.png" }
];

// عرض الدول في index.html
if (document.getElementById("numbers")) {
  const container = document.getElementById("numbers");
  countries.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${c.flag}" alt="${c.name}"><br>
      <h3>${c.name}</h3>
      <p>السعر: 0.5$</p>
      <button onclick="buyNumber('${c.code}')">شراء</button>
    `;
    container.appendChild(div);
  });
}

// شراء رقم من Sim5
async function buyNumber(country) {
  const url = `${BASE_URL}/buy/activation/${country}/any/whatsapp`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY}` }
  });
  const data = await res.json();
  console.log(data);

  if (data.phone) {
    // خزن بيانات العملية
    localStorage.setItem("activation_id", data.id);
    localStorage.setItem("phone", data.phone);

    // انتقال لصفحة التفعيل
    window.location.href = "activate.html";
  } else {
    alert("فشل شراء الرقم");
  }
}

// صفحة التفعيل
if (document.getElementById("phone")) {
  document.getElementById("phone").innerText = localStorage.getItem("phone");

  // عداد 60 ثانية
  let time = 60;
  const timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;
    if (time <= 0) {
      clearInterval(timer);
      document.getElementById("status").innerText = "انتهى الوقت ولم تصل رسالة!";
      cancelOrder();
    }
  }, 1000);
}

// تأكيد التفعيل (عند إدخال الكود)
function confirmActivation() {
  const code = document.getElementById("code").value;
  if (code) {
    document.getElementById("status").innerText = "✅ تم التفعيل بنجاح";
  } else {
    document.getElementById("status").innerText = "الرجاء إدخال الكود";
  }
}

// إلغاء العملية وإرجاع الرصيد
async function cancelOrder() {
  const id = localStorage.getItem("activation_id");
  const url = `${BASE_URL}/cancel/${id}`;
  await fetch(url, {
    method: "GET",
    headers: { "Authorization": `Bearer ${API_KEY}` }
  });
}
