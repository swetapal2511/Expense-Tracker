
// NOTE: This code does not persist transactions after page refresh.
// All data will be lost because it is stored only in memory (no local storage used).



let balance = 0;
let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

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

    document.getElementById("balance").innerText = balance;
    document.getElementById("total-income").innerText = totalIncome;
    document.getElementById("total-expense").innerText = totalExpense;

    transactions.push({ sub, date, amount });
    updateTransactionList();
    refreshForm();
}

function updateTransactionList() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${transaction.sub}</td>
                        <td>${transaction.date}</td>
                        <td>₹${transaction.amount}</td>`;
        transactionList.appendChild(row);
    });
}

function refreshForm(){
    document.getElementById("sub").value="";
    document.getElementById("credit").value="";
    document.getElementById("debit").value="";
    document.getElementById("date").value="";

}
