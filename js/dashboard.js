// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Toggle user menu
    const userBtn = document.querySelector('.user-btn');
    const userMenu = document.querySelector('.user-menu');
    
    userBtn.addEventListener('click', function() {
        userMenu.classList.toggle('active');
    });
    
    // Close menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.sidebar-toggle') && !e.target.closest('.sidebar')) {
            sidebar.classList.remove('active');
        }
        
        if (!e.target.closest('.user-btn') && !e.target.closest('.user-menu')) {
            userMenu.classList.remove('active');
        }
    });
    
    // Sample data for charts (would be replaced with real data in production)
    const sampleTransactions = [
        { id: 1, date: '2023-10-15', description: 'Deposit from Real Estate Pro', amount: 400000.00, type: 'credit' },
        { id: 2, date: '2023-10-10', description: 'Withdrawal to Diamond Wholesale', amount: 85300.00, type: 'debit' },
        { id: 3, date: '2023-10-05', description: 'Withdrawal to Packaging Solutions', amount: 12450.00, type: 'debit' },
        { id: 4, date: '2023-09-28', description: 'Withdrawal to Shipping Express', amount: 8750.00, type: 'debit' },
        { id: 5, date: '2023-09-20', description: 'Deposit from Jewelry Sales', amount: 28500.00, type: 'credit' }
    ];
    
    // Calculate current balance based on sample transactions
    function calculateBalance() {
        let balance = 365700.00; // Starting balance
        
        sampleTransactions.forEach(transaction => {
            if (transaction.type === 'credit') {
                balance += transaction.amount;
            } else {
                balance -= transaction.amount;
            }
        });
        
        return balance;
    }
    
    // Update balance display
    const balanceElement = document.querySelector('.account-balance');
    if (balanceElement) {
        const balance = calculateBalance();
        balanceElement.textContent = '$' + balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    
    // Format all currency amounts on the page
    document.querySelectorAll('.transaction-amount').forEach(element => {
        const amount = parseFloat(element.textContent.replace(/[^0-9.-]+/g, ''));
        const isNegative = element.textContent.startsWith('-');
        
        element.textContent = (isNegative ? '-' : '+') + '$' + Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
});