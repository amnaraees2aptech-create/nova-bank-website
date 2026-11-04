
    document.addEventListener('DOMContentLoaded', function() {
      var state = NovaDemo.getState();
      var chk = null, sav = null;
      for (var i = 0; i < state.accounts.length; i++) {
        if (state.accounts[i].id === 'chk_01') chk = state.accounts[i];
        if (state.accounts[i].id === 'sav_01') sav = state.accounts[i];
      }

      if (chk) document.getElementById('accPageCheckingBalance').textContent = NovaDemo.formatCurrency(chk.balance);
      if (sav) document.getElementById('accPageSavingsBalance').textContent = NovaDemo.formatCurrency(sav.balance);

      var slider = document.getElementById('dailyLimitSlider');
      var label = document.getElementById('dailyLimitLabel');
      slider.oninput = function() {
        label.textContent = NovaDemo.formatCurrency(slider.value) + ' / day';
      };
      slider.onchange = function() {
        NovaApp.showToast('Daily debit limit updated to ' + NovaDemo.formatCurrency(slider.value) + '.', 'success', 'Limit Saved');
      };
    });
  