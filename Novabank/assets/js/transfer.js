
    document.addEventListener('DOMContentLoaded', function() {
      var state = NovaDemo.getState();
      var currentTransferType = 'Instant';

      var accountSelect = document.getElementById('fromAccountSelect');
      function populateAccounts() {
        state = NovaDemo.getState();
        accountSelect.innerHTML = '';
        for (var i = 0; i < state.accounts.length; i++) {
          var acc = state.accounts[i];
          var opt = document.createElement('option');
          opt.value = acc.id;
          opt.textContent = acc.name + ' (' + acc.number + ') — Available: ' + NovaDemo.formatCurrency(acc.balance);
          accountSelect.appendChild(opt);
        }
        updateSummary();
      }
      populateAccounts();

      var recRow = document.getElementById('transferRecipientsRow');
      var selectedRec = state.recipients[0];
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
            selectedRec = targetRec;
            document.getElementById('recipientNameInput').value = targetRec.name;
            document.getElementById('recipientDetailsInput').value = targetRec.email;
            updateSummary();
          };
        })(rec, pill);

        recRow.appendChild(pill);
      }

      // Transfer tabs
      var tabBtns = document.querySelectorAll('.transfer-tab-btn');
      for (var t = 0; t < tabBtns.length; t++) {
        tabBtns[t].onclick = function() {
          for (var j = 0; j < tabBtns.length; j++) {
            tabBtns[j].classList.remove('active', 'btn-navy');
            tabBtns[j].classList.add('btn-outline-secondary');
          }
          this.classList.add('active', 'btn-navy');
          this.classList.remove('btn-outline-secondary');
          currentTransferType = this.getAttribute('data-type');
          NovaApp.showToast('Transfer rail switched to: ' + currentTransferType, 'info', 'Method Updated');
        };
      }

      // Presets
      var presetBtns = document.querySelectorAll('.btn-preset-amt');
      for (var b = 0; b < presetBtns.length; b++) {
        presetBtns[b].onclick = function() {
          document.getElementById('transferAmountInput').value = this.getAttribute('data-val');
          updateSummary();
        };
      }

      function updateSummary() {
        state = NovaDemo.getState();
        var selectedAccId = accountSelect.value;
        var srcAcc = null;
        for (var i = 0; i < state.accounts.length; i++) {
          if (state.accounts[i].id === selectedAccId) srcAcc = state.accounts[i];
        }
        if (!srcAcc) srcAcc = state.accounts[0];

        var amt = parseFloat(document.getElementById('transferAmountInput').value) || 0;
        var recName = document.getElementById('recipientNameInput').value || 'Recipient';

        document.getElementById('summarySourceAccount').textContent = srcAcc.name;
        document.getElementById('summaryAvailableBalance').textContent = NovaDemo.formatCurrency(srcAcc.balance);
        document.getElementById('summaryRecipientName').textContent = recName;
        document.getElementById('summaryTransferAmount').textContent = NovaDemo.formatCurrency(amt);

        var remaining = Math.max(0, srcAcc.balance - amt);
        document.getElementById('summaryRemainingBalance').textContent = NovaDemo.formatCurrency(remaining);
      }

      accountSelect.onchange = updateSummary;
      document.getElementById('transferAmountInput').oninput = updateSummary;
      document.getElementById('recipientNameInput').oninput = updateSummary;

      // Review Modal trigger
      document.getElementById('btnReviewTransfer').onclick = function() {
        state = NovaDemo.getState();
        var amt = parseFloat(document.getElementById('transferAmountInput').value);
        var selectedAccId = accountSelect.value;
        var srcAcc = null;
        for (var i = 0; i < state.accounts.length; i++) {
          if (state.accounts[i].id === selectedAccId) srcAcc = state.accounts[i];
        }
        if (!srcAcc) srcAcc = state.accounts[0];

        if (isNaN(amt) || amt <= 0) {
          NovaApp.showToast('Please specify a transfer amount greater than $0.00.', 'danger', 'Invalid Amount');
          return;
        }

        if (srcAcc.balance < amt) {
          NovaApp.showToast('Insufficient funds in ' + srcAcc.name + '. Available: ' + NovaDemo.formatCurrency(srcAcc.balance), 'danger', 'Insufficient Funds');
          return;
        }

        var recName = document.getElementById('recipientNameInput').value.trim();
        var recDetails = document.getElementById('recipientDetailsInput').value.trim();

        if (!recName) {
          NovaApp.showToast('Please specify a beneficiary legal name.', 'danger', 'Recipient Missing');
          return;
        }

        document.getElementById('modalConfirmAmount').textContent = NovaDemo.formatCurrency(amt);
        document.getElementById('modalConfirmSource').textContent = srcAcc.name + ' (' + srcAcc.number + ')';
        document.getElementById('modalConfirmRecipient').textContent = recName;
        document.getElementById('modalConfirmDetails').textContent = recDetails || 'Direct ACH Account';
        document.getElementById('simulated2FACode').value = '';

        NovaApp.openModal('transferReviewModal');
      };

      document.getElementById('btnAutofill2FA').onclick = function() {
        document.getElementById('simulated2FACode').value = '482910';
        NovaApp.showToast('Simulated 2FA security code filled.', 'success', '2FA Injected');
      };

      // Confirm & send
      document.getElementById('btnConfirmAndSend').onclick = function() {
        var amt = parseFloat(document.getElementById('transferAmountInput').value);
        var selectedAccId = accountSelect.value;
        var recName = document.getElementById('recipientNameInput').value.trim();
        var recDetails = document.getElementById('recipientDetailsInput').value.trim();
        var memo = document.getElementById('transferMemoInput').value.trim() || 'Electronic Transfer';

        var result = NovaDemo.executeTransfer({
          fromAccountId: selectedAccId,
          recipientName: recName,
          recipientDetails: recDetails,
          amount: amt,
          transferType: currentTransferType,
          memo: memo
        });

        if (result.success) {
          NovaApp.closeModal('transferReviewModal');

          document.getElementById('receiptRefId').textContent = result.transaction.reference;
          document.getElementById('receiptAmount').textContent = NovaDemo.formatCurrency(amt);
          document.getElementById('receiptRecipient').textContent = recName;
          document.getElementById('receiptTimestamp').textContent = NovaDemo.formatDate(result.transaction.date) + ' • ' + result.transaction.time;
          document.getElementById('receiptNewBalance').textContent = NovaDemo.formatCurrency(result.newBalance);

          setTimeout(function() {
            NovaApp.openModal('receiptModal');
            populateAccounts();
            NovaApp.showToast('Transfer of ' + NovaDemo.formatCurrency(amt) + ' completed successfully!', 'success', 'Cleared');
          }, 300);
        } else {
          NovaApp.showToast(result.message, 'danger', 'Execution Error');
        }
      };
    });
  