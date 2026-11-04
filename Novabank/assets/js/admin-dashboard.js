
    document.addEventListener('DOMContentLoaded', function() {
      var state = NovaDemo.getState();

      var tbody = document.getElementById('customersTableBody');
      var searchInput = document.getElementById('customerSearchInput');

      function renderCustomers() {
        var query = searchInput.value.toLowerCase().trim();
        tbody.innerHTML = '';

        for (var i = 0; i < state.adminData.customers.length; i++) {
          var cust = state.adminData.customers[i];
          if (query && cust.name.toLowerCase().indexOf(query) === -1) continue;

          var tr = document.createElement('tr');
          var isFrozen = cust.status === 'Frozen';
          var badgeClass = isFrozen ? 'badge-danger' : (cust.status === 'Review' ? 'badge-warning' : 'badge-success');

          tr.innerHTML =
            '<td class="font-monospace fw-bold">' + cust.id + '</td>' +
            '<td class="fw-bold text-navy">' + cust.name + '</td>' +
            '<td><span class="badge badge-secondary">' + cust.tier + '</span></td>' +
            '<td class="fw-bold text-navy">' + NovaDemo.formatCurrency(cust.balance) + '</td>' +
            '<td><span class="text-success"><i class="fa-solid fa-circle-check me-1"></i> ' + cust.kyc + '</span></td>' +
            '<td><span class="badge ' + badgeClass + '">' + cust.status + '</span></td>' +
            '<td class="text-end">' +
              '<button type="button" class="btn btn-sm ' + (isFrozen ? 'btn-outline-success' : 'btn-outline-danger') + ' btn-toggle-freeze" data-id="' + cust.id + '">' +
                '<i class="fa-solid ' + (isFrozen ? 'fa-lock-open' : 'fa-snowflake') + ' me-1"></i>' +
                (isFrozen ? 'Unfreeze' : 'Freeze') +
              '</button>' +
            '</td>';

          (function(c, row) {
            var freezeBtn = row.querySelector('.btn-toggle-freeze');
            freezeBtn.onclick = function() {
              var updated = NovaDemo.toggleCustomerStatus(c.id);
              if (updated) {
                NovaApp.showToast('Customer ' + updated.name + ' status: ' + updated.status, updated.status === 'Frozen' ? 'warning' : 'success', 'Account Status');
                renderCustomers();
              }
            };
          })(cust, tr);

          tbody.appendChild(tr);
        }
      }
      renderCustomers();
      searchInput.oninput = renderCustomers;

      // Clear Flag actions
      var clearBtns = document.querySelectorAll('.btn-clear-flag');
      for (var b = 0; b < clearBtns.length; b++) {
        clearBtns[b].onclick = function() {
          var id = this.getAttribute('data-id');
          var row = document.getElementById('row-' + id);
          if (row) {
            row.parentNode.removeChild(row);
            var countEl = document.getElementById('adminFlagCount');
            var count = parseInt(countEl.textContent, 10) - 1;
            countEl.textContent = Math.max(0, count);
            NovaApp.showToast('Compliance audit flag #' + id + ' resolved & approved by officer.', 'success', 'Audit Cleared');
          }
        };
      }
    });
  