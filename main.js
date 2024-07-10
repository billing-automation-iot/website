// Function to add a new row to the table
function addRow(index) {
    const tbody = document.querySelector('tbody');

    const newRow = document.createElement('tr');
    newRow.id = `r${index}`;

    newRow.innerHTML = `
        <td class="sr-no">${index}</td> <!-- Sr No. -->
        <td>Product ${index}</td> <!-- Product -->
        <td>${index}</td> <!-- Quantity -->
        <td>${(index * 0.5).toFixed(1)}</td> <!-- Weight -->
        <td class="amount">Rs.${(index * 10)}</td> <!-- Amount -->
        <td><button class="remove-btn">Remove</button></td> <!-- Remove button -->
    `;

    tbody.insertBefore(newRow, document.querySelector('#total-row'));

    newRow.querySelector('.remove-btn').addEventListener('click', function() {
        newRow.remove();
        updateSerialNumbers(); // Update serial numbers after removing a row
        printTotalAmount(); // Update total amount after removing a row
    });

    printTotalAmount(); // Update total amount after adding a row
}

// Function to update the serial numbers of the table rows
function updateSerialNumbers() {
    const rows = document.querySelectorAll('tbody tr:not(#total-row)');
    rows.forEach((row, index) => {
        row.querySelector('.sr-no').textContent = index + 1;
    });
}

// Function to calculate and print the total amount
function printTotalAmount() {
    const amounts = document.querySelectorAll('.amount');
    let total = 0;
    amounts.forEach(amount => {
        total += parseFloat(amount.textContent.replace('Rs.', ''));
    });

    let totalRow = document.querySelector('#total-row');
    if (!totalRow) {
        totalRow = document.createElement('tr');
        totalRow.id = 'total-row';
        totalRow.innerHTML = `
            <td colspan="4"></td>
            <td>Total: Rs.<span id="total-amount">${total.toFixed(2)}</span></td>
            <td></td>
        `;
        document.querySelector('tbody').appendChild(totalRow);
    } else {
        document.querySelector('#total-amount').textContent = total.toFixed(2);
    }

    // Dispatch custom event with total amount
    const event = new CustomEvent('totalAmountUpdated', { detail: { totalAmount: total.toFixed(2) } });
    document.dispatchEvent(event);
}

// Add rows to the table every 500ms
for (let i = 1; i <= 5; i++) {
    setTimeout(() => addRow(i), i * 500);
}

// Add event listener for the checkout button
document.querySelector('#checkout-btn').addEventListener('click', function() {
    printTotalAmount(); // Ensure the total amount is up-to-date
    const totalAmount = document.querySelector('#total-amount').textContent;
    const event = new CustomEvent('totalAmountUpdated', { detail: { totalAmount } });
    console.log(totalAmount)
    document.dispatchEvent(event);
});