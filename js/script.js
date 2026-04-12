let transactions = JSON.parse(localStorage.getItem("data")) || [];

function updateUI() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach((t, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${t.desc}</span>
      <span>₹${t.amount}</span>
      <button onclick="deleteTransaction(${index})">❌</button>
    `;

    list.appendChild(li); // ✅ YOU MISSED THIS

    // ✅ CALCULATE INSIDE LOOP
    if (t.amount > 0) {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  // ✅ UPDATE AFTER LOOP
  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + Math.abs(expense);
  document.getElementById("balance").innerText = "₹" + (income + expense);

  localStorage.setItem("data", JSON.stringify(transactions));
}
function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!desc.trim() || isNaN(amount)) {
    alert("Enter valid data");
    return;
  }

  transactions.push({ desc, amount, category });

  // clear inputs
  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";

  // ✅ FIXED KEY
  localStorage.setItem("data", JSON.stringify(transactions));

  updateUI();
}
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

function filterTransactions() {
  const search = document.getElementById("search").value.toLowerCase();
  const list = document.getElementById("list");

  list.innerHTML = "";

  transactions
    .filter(t => t.desc.toLowerCase().includes(search))
    .forEach((t, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${t.desc} ₹${t.amount}`;
      list.appendChild(li);
    });
}

function goToInsights() {
  window.location.href = "insights.html";
}

updateUI();