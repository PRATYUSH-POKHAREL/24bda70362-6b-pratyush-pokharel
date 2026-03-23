const API =  "/users";

// REGISTER
async function register() {
  const fullName = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password })
  });

  const data = await res.json();
  alert(data.message);
}

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.data?.token) {
    localStorage.setItem("token", data.data.token);
    window.location.href = "/dashboard.html";
  } else {
    alert(data.message);
  }
}

// GET CURRENT USER
async function getMe() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}