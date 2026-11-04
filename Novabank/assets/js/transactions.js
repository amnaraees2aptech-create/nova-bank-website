
    document.addEventListener('DOMContentLoaded', function() {
      var tbody = document.getElementById('ledgerTableBody');
      var searchInput = document.getElementById('searchQueryInput');
      var accountSelect = document.getElementById('filterAccountSelect');
      var categorySelect = document.getElementById('filterCategorySelect');
      var typeSelect = document.getElementById('filterTypeSelect');
      var resultsCountEl = document.getElementById('resultsCount');
      var resetBtn = document.getElementById('btnResetFilters');

      function renderLedger() {
        var state = NovaDemo.getState();
        var query = searchInput.value.toLowerCase().trim();
        var acc = accountSelect.value;
        var cat = categorySelect.value;
        var type = typeSelect.value;

        // Dynamic summary stats
        var totalCredits = 0;
        var totalDebits = 0;
        for (var t = 0; t < state.transactions.length; t++) {
          if (state.transactions[t].type === 'credit') {
            totalCredits += state.transactions[t].amount;
          } else {
            totalDebits += state.transactions[t].amount;
          }
        }
        document.getElementById('statMonthlyCredits').textContent = '+' + NovaDemo.formatCurrency(totalCredits);
        document.getElementById('statMonthlyDebits').textContent = '-' + NovaDemo.formatCurrency(totalDebits);
        var netFlow = totalCredits - totalDebits;
        document.getElementById('statNetFlow').textContent = (netFlow >= 0 ? '+' : '-') + NovaDemo.formatCurrency(Math.abs(netFlow));

        var filtered = [];
        for (var i = 0; i < state.transactions.length; i++) {
          var item = state.transactions[i];
          var matchQuery = !query || 
            item.title.toLowerCase().indexOf(query) !== -1 || 
            item.category.toLowerCase().indexOf(query) !== -1 || 
            item.reference.toLowerCase().indexOf(query) !== -1;

          var matchAcc = acc === 'all' || item.account === acc;
          var matchCat = cat === 'all' || item.category.toLowerCase() === cat.toLowerCase();
          var matchType = type === 'all' || item.type === type;

          if (matchQuery && matchAcc && matchCat && matchType) {
            filtered.push(item);
          }
        }

        resultsCountEl.textContent = filtered.length;
        tbody.innerHTML = '';

        if (filtered.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No transactions found matching criteria.</td></tr>';
          return;
        }

        for (var k = 0; k < filtered.length; k++) {
          var tx = filtered[k];
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
                  '<div class="text-muted fs-sm">Ref: ' + tx.reference + '</div>' +
                '</div>' +
              '</div>' +
            '</td>' +
            '<td><span class="badge badge-secondary">' + tx.account + '</span></td>' +
            '<td><span class="badge badge-secondary">' + tx.category + '</span></td>' +
            '<td><span class="text-muted fs-sm">' + NovaDemo.formatDate(tx.date) + ' • ' + tx.time + '</span></td>' +
            '<td><span class="badge ' + badgeClass + '">' + tx.status + '</span></td>' +
            '<td class="text-end">' +
              '<span class="tx-amount ' + amtClass + '">' + sign + NovaDemo.formatCurrency(tx.amount) + '</span>' +
            '</td>';

          (function(modalItem) {
            tr.onclick = function() {
              showModal(modalItem);
            };
          })(tx);

          tbody.appendChild(tr);
        }
      }

      function showModal(tx) {
        var body = document.getElementById('ledgerModalBody');
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
              '<span class="text-muted">Federal Ref:</span>' +
              '<span class="font-monospace fw-bold">' + tx.reference + '</span>' +
            '</div>' +
            '<div class="d-flex justify-between py-2">' +
              '<span class="text-muted">Routing:</span>' +
              '<span class="fw-bold text-success">Instant Settlement (FedNow)</span>' +
            '</div>' +
          '</div>';

        NovaApp.openModal('txDetailModal');
      }

      searchInput.oninput = renderLedger;
      accountSelect.onchange = renderLedger;
      categorySelect.onchange = renderLedger;
      typeSelect.onchange = renderLedger;

      resetBtn.onclick = function() {
        searchInput.value = '';
        accountSelect.value = 'all';
        categorySelect.value = 'all';
        typeSelect.value = 'all';
        renderLedger();
        NovaApp.showToast('Filters cleared.', 'info');
      };

      document.getElementById('btnExportCSV').onclick = function() {
        NovaApp.showToast('Exported records to NovaBank_Ledger_2026.csv.', 'success', 'Export Complete');
      };

      renderLedger();
    });
  