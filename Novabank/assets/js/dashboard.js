
    document.addEventListener('DOMContentLoaded', function() {
      var state = NovaDemo.getState();

      function refreshBalances() {
        var curState = NovaDemo.getState();
        var chk = null, sav = null, cd = null;
        for (var i = 0; i < curState.accounts.length; i++) {
          if (curState.accounts[i].id === 'chk_01') chk = curState.accounts[i];
          if (curState.accounts[i].id === 'sav_01') sav = curState.accounts[i];
          if (curState.accounts[i].id === 'cd_01') cd = curState.accounts[i];
        }
        var total = NovaDemo.getTotalNetWorth(curState);

        document.getElementById('dashTotalBalance').textContent = NovaDemo.formatCurrency(total);
        if (chk) document.getElementById('dashCheckingBalance').textContent = NovaDemo.formatCurrency(chk.balance);
        if (sav) document.getElementById('dashSavingsBalance').textContent = NovaDemo.formatCurrency(sav.balance);
        if (cd) document.getElementById('dashCDBalance').textContent = NovaDemo.formatCurrency(cd.balance);
      }
      refreshBalances();

      function renderTransactions() {
        var curState = NovaDemo.getState();
        var tbody = document.getElementById('dashTransactionsTbody');
        tbody.innerHTML = '';

        var list = curState.transactions.slice(0, 5);
        for (var i = 0; i < list.length; i++) {
          var tx = list[i];
          var isCredit = tx.type === 'credit';
          var sign = isCredit ? '+' : '-';
          var amtClass = isCredit ? 'credit' : 'debit';
          var badgeClass = tx.status === 'Completed' ? 'badge-success' : 'badge-warning';

          var tr = document.createElement('tr');
          tr.style.cursor = 'pointer';
          tr.innerHTML =
            '<td>' +
              '<div class="d-flex align-center gap-2">' +
                '<div class="tx-icon-badge" style="background: ' + tx.iconBg + '; color: ' + tx.iconColor + ';">' +
                  '<i class="fa-solid ' + tx.icon + '"></i>' +
                '</div>' +
                '<div>' +
                  '<div class="fw-bold text-navy">' + tx.title + '</div>' +
                  '<div class="text-muted fs-sm">' + tx.category + ' • ' + tx.reference + '</div>' +
                '</div>' +
              '</div>' +
            '</td>' +
            '<td><span class="badge badge-secondary">' + tx.account + '</span></td>' +
            '<td><span class="text-muted fs-sm">' + NovaDemo.formatDate(tx.date) + '</span></td>' +
            '<td><span class="badge ' + badgeClass + '">' + tx.status + '</span></td>' +
            '<td class="text-end">' +
              '<span class="tx-amount ' + amtClass + '">' + sign + NovaDemo.formatCurrency(tx.amount) + '</span>' +
            '</td>';

          (function(item) {
            tr.onclick = function() {
              showTxModal(item);
            };
          })(tx);

          tbody.appendChild(tr);
        }
      }
      renderTransactions();

      function showTxModal(tx) {
        var body = document.getElementById('txModalBody');
        var isCredit = tx.type === 'credit';
        body.innerHTML =
          '<div class="text-center pb-3 border-bottom mb-3">' +
            '<span class="badge badge-' + (isCredit ? 'success' : 'primary') + ' mb-2">' + tx.category + ' • ' + tx.status + '</span>' +
            '<div class="fs-2xl fw-bold ' + (isCredit ? 'text-success' : 'text-navy') + '">' +
              (isCredit ? '+' : '-') + NovaDemo.formatCurrency(tx.amount) +
            '</div>' +
            '<div class="fw-bold text-navy fs-md mt-1">' + tx.title + '</div>' +
            '<div class="text-muted fs-sm">' + NovaDemo.formatDate(tx.date) + ' at ' + tx.time + '</div>' +
          '</div>' +
          '<div class="fs-sm">' +
            '<div class="d-flex justify-between py-2 border-bottom">' +
              '<span class="text-muted">Account:</span>' +
              '<span class="fw-bold">' + tx.account + '</span>' +
            '</div>' +
            '<div class="d-flex justify-between py-2 border-bottom">' +
              '<span class="text-muted">Reference:</span>' +
              '<span class="font-monospace fw-bold">' + tx.reference + '</span>' +
            '</div>' +
            '<div class="d-flex justify-between py-2">' +
              '<span class="text-muted">Network Routing:</span>' +
              '<span class="fw-bold text-success">Instant Settlement (FedNow)</span>' +
            '</div>' +
          '</div>';

        NovaApp.openModal('transactionDetailModal');
      }

      // Quick Recipients
      var recList = document.getElementById('quickRecipientsList');
      var selectedRecipient = state.recipients[0];
      for (var r = 0; r < state.recipients.length; r++) {
        var rec = state.recipients[r];
        var pill = document.createElement('div');
        pill.className = 'recipient-pill ' + (r === 0 ? 'active' : '');
        pill.innerHTML =
          '<div class="recipient-avatar-circle" style="background-color: ' + rec.color + ';">' + rec.avatar + '</div>' +
          '<div class="fs-sm fw-bold">' + rec.name.split(' ')[0] + '</div>';

        (function(targetRec, targetPill) {
          targetPill.onclick = function() {
            var pills = document.querySelectorAll('.recipient-pill');
            for (var p = 0; p < pills.length; p++) pills[p].classList.remove('active');
            targetPill.classList.add('active');
            selectedRecipient = targetRec;
          };
        })(rec, pill);

        recList.appendChild(pill);
      }

      // Amount Presets
      var presetBtns = document.querySelectorAll('.btn-quick-amount');
      for (var b = 0; b < presetBtns.length; b++) {
        presetBtns[b].onclick = function() {
          document.getElementById('quickTransferAmount').value = this.getAttribute('data-amt');
        };
      }

      // Quick Transfer Execution
      var sendBtn = document.getElementById('btnExecuteQuickTransfer');
      sendBtn.onclick = function() {
        var amt = document.getElementById('quickTransferAmount').value;
        var memo = document.getElementById('quickTransferMemo').value || 'Quick Transfer';

        var result = NovaDemo.executeTransfer({
          fromAccountId: 'chk_01',
          recipientName: selectedRecipient.name,
          recipientDetails: selectedRecipient.email,
          amount: amt,
          transferType: 'Instant',
          memo: memo
        });

        if (result.success) {
          NovaApp.showToast('Transferred ' + NovaDemo.formatCurrency(amt) + ' to ' + selectedRecipient.name + ' successfully!', 'success', 'Transfer Sent');
          refreshBalances();
          renderTransactions();
          document.getElementById('quickTransferMemo').value = '';
        } else {
          NovaApp.showToast(result.message, 'danger', 'Transfer Error');
        }
      };
    });
  