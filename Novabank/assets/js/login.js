
    document.addEventListener('DOMContentLoaded', function() {
      var emailInput = document.getElementById('loginEmail');
      var passInput = document.getElementById('loginPassword');
      var togglePassBtn = document.getElementById('togglePasswordBtn');
      var eyeIcon = document.getElementById('passwordEyeIcon');
      var fillCustomerBtn = document.getElementById('btnFillCustomerDemo');
      var fillAdminBtn = document.getElementById('btnFillAdminDemo');
      var biometricBtn = document.getElementById('btnBiometricLogin');
      var form = document.getElementById('loginDemoForm');

      // Autofill Customer
      fillCustomerBtn.onclick = function() {
        emailInput.value = 'alexander.hayes@novabank.us';
        passInput.value = 'NovaVault2026!';
        NovaApp.showToast('Demo customer credentials filled. Click "Authenticate" to sign in.', 'success', 'Demo Filled');
      };

      // Autofill Admin
      fillAdminBtn.onclick = function() {
        emailInput.value = 'admin.operations@novabank.us';
        passInput.value = 'AdminSecureKey#99';
        NovaApp.showToast('Admin credentials filled. Click "Authenticate" to enter operations portal.', 'info', 'Admin Demo');
      };

      // Password visibility toggle
      togglePassBtn.onclick = function() {
        var isPass = passInput.getAttribute('type') === 'password';
        passInput.setAttribute('type', isPass ? 'text' : 'password');
        eyeIcon.className = isPass ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
      };

      // Biometric simulation
      biometricBtn.onclick = function() {
        biometricBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-primary"></i> <span class="small fw-semibold">Scanning FaceID / TouchID...</span>';
        setTimeout(function() {
          NovaApp.showToast('Biometric identity confirmed. Redirecting to Customer Portal...', 'success', 'Biometrics Approved');
          setTimeout(function() {
            window.location.href = 'dashboard.html';
          }, 800);
        }, 1000);
      };

      // Form submission
      form.onsubmit = function(e) {
        e.preventDefault();
        var email = emailInput.value.trim();
        var pass = passInput.value.trim();

        if (!email || !pass) {
          NovaApp.showToast('Please enter both your email/ID and password (or click a quick shortcut above).', 'danger', 'Input Required');
          return;
        }

        var submitBtn = document.getElementById('submitLoginBtn');
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Verifying Credentials...';
        submitBtn.disabled = true;

        setTimeout(function() {
          if (email.toLowerCase().indexOf('admin') !== -1) {
            NovaApp.showToast('Admin clearance granted. Entering Institutional Hub...', 'success', 'Admin Portal Access');
            setTimeout(function() {
              window.location.href = 'admin-dashboard.html';
            }, 800);
          } else {
            NovaApp.showToast('Welcome back, Alexander Hayes! Directing to accounts...', 'success', 'Login Successful');
            setTimeout(function() {
              window.location.href = 'dashboard.html';
            }, 800);
          }
        }, 800);
      };
    });
  