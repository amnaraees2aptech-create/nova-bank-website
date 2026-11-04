
    document.addEventListener('DOMContentLoaded', function() {
      var state = NovaDemo.getState();
      var chk = null;
      for (var i = 0; i < state.accounts.length; i++) {
        if (state.accounts[i].id === 'chk_01') chk = state.accounts[i];
      }
      if (chk) {
        document.getElementById('stmtEndingBalanceDisplay').textContent = NovaDemo.formatCurrency(chk.balance);
      }

      var accSelect = document.getElementById('statementAccountSelect');
      var monthSelect = document.getElementById('statementMonthSelect');
      var yearSelect = document.getElementById('statementYearSelect');
      var refreshBtn = document.getElementById('btnUpdateStatementView');

      refreshBtn.onclick = function() {
        var acc = accSelect.value;
        var month = monthSelect.value;
        var year = yearSelect.value;

        document.getElementById('statementPeriodDisplay').textContent = 'Period: ' + month + ' 01, ' + year + ' – ' + month + ' 31, ' + year;
        document.getElementById('stmtAccountName').textContent = acc.indexOf('Savings') !== -1 ? 'High-Yield Growth Savings' : 'Premier Checking';
        
        NovaApp.showToast('Statement view updated for ' + month + ' ' + year + '.', 'info', 'Statement Rendered');
      };
    });
  