
    document.addEventListener('DOMContentLoaded', function() {
      var autofillBtn = document.getElementById('btnAutofillApplication');
      var firstName = document.getElementById('regFirstName');
      var lastName = document.getElementById('regLastName');
      var email = document.getElementById('regEmail');
      var phone = document.getElementById('regPhone');
      var address = document.getElementById('regAddress');
      var password = document.getElementById('regPassword');
      var form = document.getElementById('registerDemoForm');
      var enterBtn = document.getElementById('btnEnterDashboardFromRegister');

      // Autofill demo data
      autofillBtn.onclick = function() {
        firstName.value = 'Alexander';
        lastName.value = 'Hayes';
        email.value = 'alexander.hayes@novabank.us';
        phone.value = '+1 (212) 555-0198';
        address.value = '742 Park Avenue, Penthouse B, New York, NY 10021';
        password.value = 'NovaVault2026!';
        NovaApp.showToast('Demo application form populated with sample client data.', 'success', 'Autofill Complete');
      };

      // Form submit
      form.onsubmit = function(e) {
        e.preventDefault();
        var f = firstName.value.trim();
        var l = lastName.value.trim();
        if (!f || !l) {
          NovaApp.showToast('Please enter your full name or click Autofill.', 'danger', 'Required Fields');
          return;
        }

        var submitBtn = document.getElementById('btnSubmitApplication');
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Verifying with CIP Registry...';
        submitBtn.disabled = true;

        setTimeout(function() {
          document.getElementById('approvedNameDisplay').textContent = f + ' ' + l;
          NovaApp.openModal('approvalModal');
        }, 1000);
      };

      enterBtn.onclick = function() {
        window.location.href = 'dashboard.html';
      };
    });
  