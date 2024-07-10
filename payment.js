let totalAmount = 0;

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    updateQRCodeAndAmount(totalAmount);
});

// Listen for the custom event dispatched from main.js
document.addEventListener('totalAmountUpdated', function(e) {
    const amount = e.detail.totalAmount;
    console.log("Event received with totalAmount:", amount); // Debugging line
    updateQRCodeAndAmount(amount);
});

function updateQRCodeAndAmount(amount) {
    const upiId = 'kamallochandas2004@okicici'; // Replace with UPI ID
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=${upiId}%26am=${amount}%26tn=`;
    const qrCodeImage = document.getElementById('qrCode');
    const amountElement = document.getElementById('amount');
    amountElement.textContent = "Rs." + amount;
    qrCodeImage.src = qrCodeUrl;
}

