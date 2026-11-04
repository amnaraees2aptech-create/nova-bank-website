
    // Live Wealth Growth Calculator Logic
    document.addEventListener('DOMContentLoaded', function() {
      var initialInput = document.getElementById('initialDepositInput');
      var initialVal = document.getElementById('initialDepositVal');
      var monthlyInput = document.getElementById('monthlyContributionInput');
      var monthlyVal = document.getElementById('monthlyContributionVal');
      var timeSelect = document.getElementById('timeHorizonSelect');
      var projectedTotalEl = document.getElementById('calcProjectedTotal');
      var interestEarnedEl = document.getElementById('calcInterestEarned');
      var traditionalEarnedEl = document.getElementById('calcTraditionalInterest');
      var advantageEl = document.getElementById('calcAdvantageVal');

      function calculateGrowth() {
        var principal = parseFloat(initialInput.value);
        var monthly = parseFloat(monthlyInput.value);
        var years = parseInt(timeSelect.value, 10);
        
        initialVal.textContent = NovaDemo.formatCurrency(principal);
        monthlyVal.textContent = NovaDemo.formatCurrency(monthly) + ' / mo';

        var novaRate = 0.0515 / 12; // 5.15% APY monthly rate
        var tradRate = 0.0046 / 12; // 0.46% APY monthly rate
        var totalMonths = years * 12;

        var novaBalance = principal;
        var tradBalance = principal;
        var totalDeposited = principal;

        for (var m = 0; m < totalMonths; m++) {
          novaBalance = (novaBalance + monthly) * (1 + novaRate);
          tradBalance = (tradBalance + monthly) * (1 + tradRate);
          totalDeposited += monthly;
        }

        var novaInterest = Math.max(0, novaBalance - totalDeposited);
        var tradInterest = Math.max(0, tradBalance - totalDeposited);
        var advantage = Math.max(0, novaInterest - tradInterest);

        projectedTotalEl.textContent = NovaDemo.formatCurrency(novaBalance);
        interestEarnedEl.textContent = '+' + NovaDemo.formatCurrency(novaInterest);
        traditionalEarnedEl.textContent = '+' + NovaDemo.formatCurrency(tradInterest);
        advantageEl.textContent = NovaDemo.formatCurrency(advantage);
      }

      if (initialInput && monthlyInput && timeSelect) {
        initialInput.oninput = calculateGrowth;
        monthlyInput.oninput = calculateGrowth;
        timeSelect.onchange = calculateGrowth;
        calculateGrowth();
      }

      var state = NovaDemo.getState();
      var heroNetWorth = document.getElementById('heroNetWorthDisplay');
      if (heroNetWorth) {
        heroNetWorth.textContent = NovaDemo.formatCurrency(NovaDemo.getTotalNetWorth(state));
      }
    });
  