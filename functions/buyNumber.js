// functions/buyNumber.js
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const API_KEY = "حط_مفتاحك_هنا"; // خليه هنا وليس في المتصفح
  const { country } = JSON.parse(event.body);

  const res = await fetch(`https://5sim.net/v1/user/buy/activation/${country}/any/whatsapp`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY}` }
  });

  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data) };
};
