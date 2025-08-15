// functions/checkCode.js
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const API_KEY = "حط_مفتاحك_هنا";
  const { id } = JSON.parse(event.body);

  const res = await fetch(`https://5sim.net/v1/user/check/${id}`, {
    headers: { "Authorization": `Bearer ${API_KEY}` }
  });

  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data) };
};
