// functions/buyNumber.js
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const API_KEY = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3ODY3ODI1NzAsImlhdCI6MTc1NTI0NjU3MCwicmF5IjoiMGFjMmQ2YzMzNWM2OGRiZmM4NDdhZTQ2Mjc2NWUzODIiLCJzdWIiOjkzOTM5Mn0.wf6zLe1B5tMH6NItX4ZS6KtpDbdL7utClN8YNYrYAhJAK6ycfS05rFHhhGc9rxkBJ24odpRiTjfKaViAe2T9P8skcGcdnwkn1b7ix6ZJeZxBQ87fXEq_vDMIhMul6XRPw8louPle0RAuKA7i86nyfkb4QwB-x6ljWUDFE4_bOQz3RvLckoX6oP4BsaJvg5EpaD1hlbW6YsWBxJuG5Ojl98OXVfCzeMOyU4fKHB_5Uw02rETGl-7AtJXsfG4vHMWDP5koB-Vsb4JoVlyjsCXjrx-Zf8tQ7NCKOrnFnwIkQMEjZK_kk-HV4t7xEk2vEFXoVVZTBIK_hfsXjozrUNjdoQ";

  const { country } = JSON.parse(event.body);

  try {
    const response = await fetch(`https://5sim.net/v1/user/buy/activation/${country}/any/whatsapp`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${API_KEY}` }
    });
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
