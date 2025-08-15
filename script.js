async function buyNumber(country) {
  const confirmBuy = confirm(`هل تريد شراء رقم (${country}) ؟`);
  if (!confirmBuy) return;

  const res = await fetch("/.netlify/functions/buyNumber", {
    method: "POST",
    body: JSON.stringify({ country }),
  });
  const data = await res.json();

  if (data.phone) {
    localStorage.setItem("selectedNumber", data.phone);
    localStorage.setItem("activationId", data.id);
    window.location.href = "activate.html";
  } else {
    alert("فشل شراء الرقم");
  }
}
