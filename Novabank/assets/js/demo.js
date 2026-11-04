/**
 * ===================================================================
 * NovaBank USA — Basic Demo State & Data (Vanilla JavaScript)
 * ===================================================================
 * This file contains simple fictional data and basic helper functions.
 * Everything is written in clean, easy-to-read JavaScript for beginners.
 * No difficult frameworks or complex code.
 */

// Key used to save sample data in the browser's localStorage
var STORAGE_KEY = 'NOVABANK_DEMO_DATA';

// Default sample data (fictional American demo account)
var DEFAULT_DATA = {
  // 1. Current Demo User Information
  user: {
    name: 'Alexander Hayes',
    email: 'alexander.hayes@novabank.us',
    phone: '+1 (212) 555-0198',
    address: '742 Park Avenue, Penthouse B, New York, NY 10021',
    tier: 'Nova Private Client',
    memberSince: 'March 2021',
    kycStatus: 'Verified (Level 3)',
    accountNumber: '04829104892',
    routingNumber: '021000021'
  },

  // 2. Demo Bank Accounts with Balances
  accounts: [
    {
      id: 'chk_01',
      name: 'Premier Checking',
      number: '•••• 4892',
      fullNumber: '04829104892',
      routing: '021000021',
      balance: 14850.40,
      type: 'Checking',
      apy: '0.25%'
    },
    {
      id: 'sav_01',
      name: 'High-Yield Growth Savings',
      number: '•••• 9104',
      fullNumber: '04829109104',
      routing: '021000021',
      balance: 38420.85,
      type: 'Savings',
      apy: '5.15%'
    },
    {
      id: 'cd_01',
      name: 'Private Wealth 18-Mo CD',
      number: '•••• 3319',
      fullNumber: '04829103319',
      routing: '021000021',
      balance: 25000.00,
      type: 'Certificate of Deposit',
      apy: '5.45%'
    }
  ],

  // 3. Demo Debit Card Info
  card: {
    numberFormatted: '4532  8920  1450  4892',
    last4: '4892',
    exp: '08/29',
    cvv: '742',
    cardholder: 'ALEXANDER HAYES',
    isFrozen: false,
    dailyLimit: 5000
  },

  // 4. Quick Transfer Recipients
  recipients: [
    { id: 'rec_1', name: 'Sarah Jenkins', email: 'sarah.j@gmail.com', avatar: 'SJ', color: '#3B82F6' },
    { id: 'rec_2', name: 'Michael Keller', email: 'm.keller@venture.io', avatar: 'MK', color: '#10B981' },
    { id: 'rec_3', name: 'Tech Corp Inc.', email: 'billing@techcorp.com', avatar: 'TC', color: '#8B5CF6' },
    { id: 'rec_4', name: 'Liam Vance', email: 'liam.vance@nyu.edu', avatar: 'LV', color: '#F59E0B' }
  ],

  // 5. Recent Transaction Records
  transactions: [
    {
      id: 'TXN-90821',
      title: 'Apple Store 5th Ave',
      category: 'Shopping',
      type: 'debit',
      amount: 1299.00,
      date: '2026-10-14',
      time: '02:45 PM',
      status: 'Completed',
      account: 'Premier Checking',
      icon: 'fa-bag-shopping',
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
      reference: 'APL*984102941-NY'
    },
    {
      id: 'TXN-90820',
      title: 'Stripe Payout Client Retainer',
      category: 'Income',
      type: 'credit',
      amount: 4850.00,
      date: '2026-10-13',
      time: '09:15 AM',
      status: 'Completed',
      account: 'Premier Checking',
      icon: 'fa-arrow-down-left',
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
      reference: 'STRIPE*CR-482019-DIR'
    },
    {
      id: 'TXN-90819',
      title: 'Whole Foods Market Columbus',
      category: 'Groceries',
      type: 'debit',
      amount: 142.60,
      date: '2026-10-12',
      time: '06:22 PM',
      status: 'Completed',
      account: 'Premier Checking',
      icon: 'fa-cart-shopping',
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      reference: 'WFM*NYC-STORE-4819'
    },
    {
      id: 'TXN-90818',
      title: 'High-Yield Interest Accrual',
      category: 'Interest',
      type: 'credit',
      amount: 164.72,
      date: '2026-10-10',
      time: '11:59 PM',
      status: 'Completed',
      account: 'High-Yield Growth Savings',
      icon: 'fa-coins',
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
      reference: 'INT*OCT2026-APY5.15'
    },
    {
      id: 'TXN-90817',
      title: 'Equinox Fitness Club Hudson Yards',
      category: 'Health & Wellness',
      type: 'debit',
      amount: 295.00,
      date: '2026-10-08',
      time: '07:30 AM',
      status: 'Completed',
      account: 'Premier Checking',
      icon: 'fa-dumbbell',
      iconBg: '#F3E8FF',
      iconColor: '#9333EA',
      reference: 'EQX*MEMBERSHIP-048'
    },
    {
      id: 'TXN-90816',
      title: 'Zelle to Sarah Jenkins',
      category: 'Transfer',
      type: 'debit',
      amount: 350.00,
      date: '2026-10-06',
      time: '01:10 PM',
      status: 'Completed',
      account: 'Premier Checking',
      icon: 'fa-paper-plane',
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
      reference: 'ZEL*TX-SJ-889104'
    },
    {
      id: 'TXN-90815',
      title: 'Delta Air Lines Flight JFK-LHR',
      category: 'Travel',
      type: 'debit',
      amount: 842.15,
      date: '2026-10-04',
      time: '03:15 PM',
      status: 'Completed',
      account: 'Premier Checking',
      icon: 'fa-plane',
      iconBg: '#FEF2F2',
      iconColor: '#DC2626',
      reference: 'DAL*TICKET-0062491'
    },
    {
      id: 'TXN-90814',
      title: 'Apex Capital Dividend Deposit',
      category: 'Investment',
      type: 'credit',
      amount: 620.40,
      date: '2026-10-01',
      time: '10:00 AM',
      status: 'Completed',
      account: 'High-Yield Growth Savings',
      icon: 'fa-chart-pie',
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
      reference: 'APX*DIV-Q3-SERIES-B'
    },
    {
      id: 'TXN-90813',
      title: 'Netflix Premium 4K Family',
      category: 'Entertainment',
      type: 'debit',
      amount: 22.99,
      date: '2026-09-28',
      time: '08:00 AM',
      status: 'Completed',
      account: 'Premier Checking',
      icon: 'fa-film',
      iconBg: '#F1F5F9',
      iconColor: '#475569',
      reference: 'NFLX*SUBSCRIPTION-REC'
    },
    {
      id: 'TXN-90812',
      title: 'TechCorp Executive Direct Deposit',
      category: 'Salary',
      type: 'credit',
      amount: 7500.00,
      date: '2026-09-26',
      time: '06:00 AM',
      status: 'Completed',
      account: 'Premier Checking',
      icon: 'fa-building-columns',
      iconBg: '#ECFDF5',
      iconColor: '#10B981',
      reference: 'ACH*PAYROLL-DIR-0926'
    }
  ],

  // 6. Admin Portal Sample Records
  adminData: {
    totalCustodyAssets: 184250000.00,
    activeRetailAccounts: 12840,
    dailyWireVolume: 4215800.00,
    pendingComplianceFlags: 3,
    customers: [
      { id: 'CUST-801', name: 'Alexander Hayes', tier: 'Private Client', balance: 78271.25, status: 'Active', kyc: 'Verified' },
      { id: 'CUST-802', name: 'Victoria Sterling', tier: 'Private Wealth', balance: 520400.00, status: 'Active', kyc: 'Verified' },
      { id: 'CUST-803', name: 'Marcus Vance', tier: 'Business Corporate', balance: 1450200.00, status: 'Review', kyc: 'Under Review' },
      { id: 'CUST-804', name: 'Sophia Chen', tier: 'Premier Retail', balance: 34150.80, status: 'Active', kyc: 'Verified' },
      { id: 'CUST-805', name: 'Dmitri Rostov', tier: 'International Private', balance: 89000.00, status: 'Frozen', kyc: 'Requires Docs' }
    ]
  }
};

/**
 * Basic Helper Object: NovaDemo
 * Easy-to-understand functions to get data, format currency, and simulate transfers.
 */
window.NovaDemo = {

  // Get current state from localStorage, or return default data
  getState: function() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // If localStorage is blocked, continue with default
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  },

  // Save current state into browser memory
  saveState: function(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      // Ignore if localStorage unavailable
    }
  },

  // Reset all sample data back to the original starting values
  resetState: function() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  },

  // Format any number into simple USD currency (e.g. 14850.40 -> "$14,850.40")
  formatCurrency: function(amount) {
    var num = parseFloat(amount);
    if (isNaN(num)) num = 0;
    return '$' + num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  // Format a simple date string (e.g. "2026-10-14" -> "Oct 14, 2026")
  formatDate: function(dateStr) {
    var parts = dateStr.split('-');
    if (parts.length === 3) {
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var monthIndex = parseInt(parts[1], 10) - 1;
      return months[monthIndex] + ' ' + parseInt(parts[2], 10) + ', ' + parts[0];
    }
    return dateStr;
  },

  // Calculate total net worth across all accounts
  getTotalNetWorth: function(state) {
    var total = 0;
    for (var i = 0; i < state.accounts.length; i++) {
      total = total + state.accounts[i].balance;
    }
    return total;
  },

  // Basic function to simulate transferring money
  executeTransfer: function(data) {
    var state = this.getState();
    var transferAmount = parseFloat(data.amount);

    // 1. Check if amount is valid
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return {
        success: false,
        message: 'Please enter a valid transfer amount greater than $0.00.'
      };
    }

    // 2. Find the selected source account
    var sourceAccount = null;
    for (var i = 0; i < state.accounts.length; i++) {
      if (state.accounts[i].id === data.fromAccountId || state.accounts[i].name === data.fromAccountId) {
        sourceAccount = state.accounts[i];
        break;
      }
    }
    if (!sourceAccount) {
      sourceAccount = state.accounts[0]; // Default to Checking
    }

    // 3. Check if there are enough funds
    if (sourceAccount.balance < transferAmount) {
      return {
        success: false,
        message: 'Insufficient balance. Available in ' + sourceAccount.name + ': ' + this.formatCurrency(sourceAccount.balance)
      };
    }

    // 4. Deduct the balance
    sourceAccount.balance = sourceAccount.balance - transferAmount;

    // 5. Create a simple new transaction entry
    var randomId = Math.floor(10000 + Math.random() * 90000);
    var newTransaction = {
      id: 'TXN-' + randomId,
      title: 'Transfer to ' + data.recipientName,
      category: 'Transfer',
      type: 'debit',
      amount: transferAmount,
      date: '2026-10-15',
      time: '03:15 PM',
      status: 'Completed',
      account: sourceAccount.name,
      icon: 'fa-paper-plane',
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
      reference: 'NB*WIRE-' + randomId
    };

    // Add new transaction to the top of the list
    state.transactions.unshift(newTransaction);

    // Save changes
    this.saveState(state);

    return {
      success: true,
      transaction: newTransaction,
      newBalance: sourceAccount.balance,
      accountName: sourceAccount.name
    };
  },

  // Toggle card lock (freeze / unfreeze)
  toggleCardFreeze: function() {
    var state = this.getState();
    state.card.isFrozen = !state.card.isFrozen;
    this.saveState(state);
    return state.card.isFrozen;
  },

  // Update profile data
  updateProfile: function(updatedFields) {
    var state = this.getState();
    if (updatedFields.name) state.user.name = updatedFields.name;
    if (updatedFields.email) state.user.email = updatedFields.email;
    if (updatedFields.phone) state.user.phone = updatedFields.phone;
    if (updatedFields.address) state.user.address = updatedFields.address;
    this.saveState(state);
    return state.user;
  },

  // Admin toggle customer status (Active <-> Frozen)
  toggleCustomerStatus: function(customerId) {
    var state = this.getState();
    for (var i = 0; i < state.adminData.customers.length; i++) {
      if (state.adminData.customers[i].id === customerId) {
        var cust = state.adminData.customers[i];
        if (cust.status === 'Active') {
          cust.status = 'Frozen';
        } else {
          cust.status = 'Active';
        }
        this.saveState(state);
        return cust;
      }
    }
    return null;
  }
};
