let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ---------------- YEARLY ----------------
function getYearly() {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.amount > 0) income += t.amount;
    else expense += Math.abs(t.amount);
  });

  return {
    income,
    expense,
    savings: income - expense
  };
}

// ---------------- MONTHLY ----------------
function getMonthly() {
  const monthly = {};

  transactions.forEach(t => {
    const date = new Date(t.date || Date.now());
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });

    if (!monthly[month]) {
      monthly[month] = { income: 0, expense: 0 };
    }

    if (t.amount > 0) {
      monthly[month].income += t.amount;
    } else {
      monthly[month].expense += Math.abs(t.amount);
    }
  });

  return monthly;
}

// ---------------- AI INSIGHTS ----------------
function generateAI(yearly, monthly) {
  const months = Object.keys(monthly);

  let highestMonth = "N/A";
  let maxExpense = 0;

  months.forEach(m => {
    if (monthly[m].expense > maxExpense) {
      maxExpense = monthly[m].expense;
      highestMonth = m;
    }
  });

  return `
📊 YEAR SUMMARY:
- Income: ₹${yearly.income}
- Expense: ₹${yearly.expense}
- Savings: ₹${yearly.savings}

📅 Highest Spending Month: ${highestMonth}

💡 AI TIP:
Reduce spending in ${highestMonth} to improve savings.
Your savings rate is ${(yearly.savings / yearly.income * 100 || 0).toFixed(1)}%.
  `;
}

// ---------------- RENDER ----------------
function render() {
  const yearly = getYearly();
  const monthly = getMonthly();

  document.getElementById("yearly").innerHTML = `
    <h2>📈 Yearly Summary</h2>
    <p>Total Income: ₹${yearly.income}</p>
    <p>Total Expense: ₹${yearly.expense}</p>
    <p>Total Savings: ₹${yearly.savings}</p>
  `;

  let monthlyHTML = "<h2>📅 Monthly Breakdown</h2>";

  for (let m in monthly) {
    monthlyHTML += `
      <p><b>${m}</b> → Income: ₹${monthly[m].income}, Expense: ₹${monthly[m].expense}</p>
    `;
  }

  document.getElementById("monthly").innerHTML = monthlyHTML;

  document.getElementById("ai").innerHTML = `
    <h2>🤖 AI Insights</h2>
    <p>${generateAI(yearly, monthly)}</p>
  `;
}

function goBack() {
  window.location.href = "index.html";
}

render();