const fs = require('fs');
async function test() {
  const res = await fetch("http://localhost:3000/api/moukebs", {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Admin-Password": "admin123" },
    body: JSON.stringify({
      column: 256,
      names: ["نقطة مفرزة طبية"],
      country: "العراق",
      note: ""
    })
  });
  console.log(res.status);
  console.log(await res.text());
}
test();
