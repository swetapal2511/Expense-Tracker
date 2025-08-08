// NOTE: This code uses localStorage, so all transactions are saved
// and will remain available even after refreshing or reopening the page.


let balance = 0;
let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

// Load saved data from localStorage when the page loads
window.onload = function () {
    const savedData = JSON.parse(localStorage.getItem("expenseTrackerData"));
    if (savedData) {
        balance = savedData.balance || 0;
        totalIncome = savedData.totalIncome || 0;
        totalExpense = savedData.totalExpense || 0;
        transactions = savedData.transactions || [];

        // Update UI with saved data
        document.getElementById("balance").innerText = balance;
        document.getElementById("total-income").innerText = totalIncome;
        document.getElementById("total-expense").innerText = totalExpense;
        updateTransactionList();
    }
};

function addTransaction() {
    const sub = document.getElementById("sub").value;
    const credit = parseFloat(document.getElementById("credit").value) || 0;
    const debit = parseFloat(document.getElementById("debit").value) || 0;
    const date = document.getElementById("date").value;

    if (!sub || !date || (credit === 0 && debit === 0)) {
        alert("Please fill in all required fields.");
        return;
    }

    let amount = credit - debit;
    balance += amount;
    totalIncome += credit;
    totalExpense += debit;

    // Update UI
    document.getElementById("balance").innerText = balance;
    document.getElementById("total-income").innerText = totalIncome;
    document.getElementById("total-expense").innerText = totalExpense;

    transactions.push({ sub, date, amount });

    // Save updated data to localStorage
    saveData();

    updateTransactionList();
    refreshForm();
}

function updateTransactionList() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.sub}</td>
            <td>${transaction.date}</td>
            <td>₹${transaction.amount}</td>
        `;
        transactionList.appendChild(row);
    });
}

function refreshForm() {
    document.getElementById("sub").value = "";
    document.getElementById("credit").value = "";
    document.getElementById("debit").value = "";
    document.getElementById("date").value = "";
}

function saveData() {
    const data = {
        balance: balance,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        transactions: transactions
    };
    localStorage.setItem("expenseTrackerData", JSON.stringify(data));

}
