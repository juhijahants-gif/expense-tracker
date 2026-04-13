const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Group by category
let categoryMap = {};

transactions.forEach(t => {
  if (!categoryMap[t.category]) {
    categoryMap[t.category] = 0;
  }
  categoryMap[t.category] += t.amount;
});

// Prepare chart data
const labels = Object.keys(categoryMap);
const data = Object.values(categoryMap).map(v => Math.abs(v));

// Chart
const ctx = document.getElementById("expenseChart").getContext("2d");
new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: labels,
    datasets: [{
      data: data
    }]
  },
  options: {
  plugins: {
    legend: {
      labels: {
        color: "#ffffff", // 👈 makes labels visible
        font: {
          size: 14
        }
      }
    }
  }
}
});

// 🤖 Simple AI Insights
let totalExpense = transactions
  .filter(t => t.amount < 0)
  .reduce((sum, t) => sum + t.amount, 0);

let highest = labels[data.indexOf(Math.max(...data))];

let insightText = `
Total spending: ₹${Math.abs(totalExpense)}.
Highest spending category: ${highest}.
Try reducing expenses in ${highest} to save more money.
`;

document.getElementById("aiText").innerText = insightText;

function goBack() {
  window.location.href = "index.html";
}
function resetData() {
  const confirmReset = confirm("Are you sure you want to reset all data?");

  if (confirmReset) {
    localStorage.removeItem("transactions");
    alert("Data reset successfully!");

    location.reload(); // refresh page
  }
}