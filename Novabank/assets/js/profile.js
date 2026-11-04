
    document.addEventListener('DOMContentLoaded', function() {
      var state = NovaDemo.getState();
      var nameInput = document.getElementById('profileNameInput');
      var emailInput = document.getElementById('profileEmailInput');
      var phoneInput = document.getElementById('profilePhoneInput');
      var addressInput = document.getElementById('profileAddressInput');
      var form = document.getElementById('profileForm');

      if (state.user) {
        if (state.user.name) nameInput.value = state.user.name;
        if (state.user.email) emailInput.value = state.user.email;
        if (state.user.phone) phoneInput.value = state.user.phone;
        if (state.user.address) addressInput.value = state.user.address;
        document.getElementById('profileHeadingName').textContent = state.user.name || 'Alexander Hayes';
      }

      form.onsubmit = function(e) {
        e.preventDefault();
        var updated = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          address: addressInput.value.trim()
        };
        NovaDemo.updateProfile(updated);
        document.getElementById('profileHeadingName').textContent = updated.name;
        NovaApp.showToast('Customer profile details updated successfully!', 'success', 'Profile Saved');
      };
    });
  