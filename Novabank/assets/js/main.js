/**
 * ===================================================================
 * NovaBank USA — Main JavaScript (Pure Vanilla, No Bootstrap)
 * ===================================================================
 * Standard DOM events, clean functions, zero external frameworks.
 */

window.NovaApp = {

  // 1. Notification Popup (Toast)
  showToast: function(message, type, title) {
    if (!type) type = 'info';
    if (!title) title = 'NovaBank USA';

    var container = document.getElementById('novaToastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'novaToastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    var iconClass = 'fa-circle-info text-primary';
    if (type === 'success') iconClass = 'fa-circle-check text-success';
    if (type === 'danger') iconClass = 'fa-circle-exclamation text-danger';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation text-warning';

    var toastBox = document.createElement('div');
    toastBox.className = 'custom-toast toast-' + type;
    toastBox.innerHTML =
      '<div class="d-flex align-center gap-2">' +
        '<i class="fa-solid ' + iconClass + ' fs-md"></i>' +
        '<div>' +
          '<div class="fw-bold small">' + title + '</div>' +
          '<div class="text-muted fs-sm">' + message + '</div>' +
        '</div>' +
      '</div>' +
      '<button type="button" class="btn-close ms-auto" aria-label="Close">&times;</button>';

    container.appendChild(toastBox);

    setTimeout(function() {
      if (toastBox && toastBox.parentNode) {
        toastBox.parentNode.removeChild(toastBox);
      }
    }, 4000);

    var closeBtn = toastBox.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.onclick = function() {
        if (toastBox.parentNode) {
          toastBox.parentNode.removeChild(toastBox);
        }
      };
    }
  },

  // 2. Simple Modal Controller (Open / Close)
  openModal: function(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  },

  closeModal: function(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  },

  initModals: function() {
    // Open triggers
    var openBtns = document.querySelectorAll('[data-open-modal]');
    for (var i = 0; i < openBtns.length; i++) {
      openBtns[i].onclick = function(e) {
        e.preventDefault();
        var targetId = this.getAttribute('data-open-modal');
        NovaApp.openModal(targetId);
      };
    }

    // Close triggers
    var closeBtns = document.querySelectorAll('[data-close-modal], .modal-overlay .btn-close');
    for (var j = 0; j < closeBtns.length; j++) {
      closeBtns[j].onclick = function() {
        var parentModal = this.closest('.modal-overlay');
        if (parentModal) {
          parentModal.classList.remove('show');
        }
      };
    }

    // Close on clicking the backdrop outside the modal box
    var overlays = document.querySelectorAll('.modal-overlay');
    for (var k = 0; k < overlays.length; k++) {
      overlays[k].onclick = function(e) {
        if (e.target === this) {
          this.classList.remove('show');
        }
      };
    }
  },

  // 3. Simple Copy to Clipboard
  copyToClipboard: function(text, label) {
    if (!label) label = 'Data';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        NovaApp.showToast(label + ' copied: ' + text, 'success', 'Copied');
      });
    } else {
      var temp = document.createElement('input');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      NovaApp.showToast(label + ' copied: ' + text, 'success', 'Copied');
    }
  },

  // 4. Simple Mobile Sidebar Toggle
  initSidebar: function() {
    var toggleBtn = document.getElementById('sidebarToggleBtn');
    var sidebar = document.querySelector('.app-sidebar');
    var backdrop = document.getElementById('sidebarBackdrop');

    if (toggleBtn && sidebar) {
      toggleBtn.onclick = function() {
        sidebar.classList.toggle('show-sidebar');
        if (backdrop) backdrop.classList.toggle('active');
      };
    }

    if (backdrop && sidebar) {
      backdrop.onclick = function() {
        sidebar.classList.remove('show-sidebar');
        backdrop.classList.remove('active');
      };
    }
  },

  // 5. Hide / Reveal Balance Toggle
  initBalanceToggle: function() {
    var toggleBtn = document.getElementById('toggleBalanceVisibilityBtn');
    if (!toggleBtn) return;

    var isHidden = false;
    toggleBtn.onclick = function() {
      isHidden = !isHidden;
      var els = document.querySelectorAll('[data-balance-amount]');
      for (var i = 0; i < els.length; i++) {
        if (isHidden) {
          els[i].setAttribute('data-original-val', els[i].textContent);
          els[i].textContent = '••••••••';
        } else {
          els[i].textContent = els[i].getAttribute('data-original-val') || els[i].textContent;
        }
      }
      var icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = isHidden ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
      }
      NovaApp.showToast(
        isHidden ? 'Account balances hidden for privacy.' : 'Account balances visible.',
        'info',
        'Privacy Mode'
      );
    };
  },

  // 6. Virtual Card Flip
  initVirtualCard: function() {
    var cardInner = document.getElementById('virtualDebitCard');
    var flipBtn = document.getElementById('flipCardBtn');
    var freezeSwitch = document.getElementById('freezeCardToggle');

    function toggleFlip() {
      if (cardInner) cardInner.classList.toggle('flipped');
    }

    if (cardInner) {
      cardInner.onclick = toggleFlip;
    }

    if (flipBtn) {
      flipBtn.onclick = function(e) {
        e.stopPropagation();
        toggleFlip();
      };
    }

    if (freezeSwitch) {
      var state = NovaDemo.getState();
      freezeSwitch.checked = state.card.isFrozen;
      freezeSwitch.onchange = function() {
        var isLocked = NovaDemo.toggleCardFreeze();
        NovaApp.showToast(
          isLocked ? 'Debit Card is now FROZEN (Locked).' : 'Debit Card is now UNLOCKED.',
          isLocked ? 'warning' : 'success',
          isLocked ? 'Card Frozen' : 'Card Active'
        );
      };
    }
  },

  // 7. Reset Demo Data
  initResetDemo: function() {
    var resetButtons = document.querySelectorAll('.btn-reset-demo-state');
    for (var i = 0; i < resetButtons.length; i++) {
      resetButtons[i].onclick = function(e) {
        e.preventDefault();
        if (confirm('Reset sample demo balances and transactions back to original values?')) {
          NovaDemo.resetState();
          window.location.reload();
        }
      };
    }
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  NovaApp.initSidebar();
  NovaApp.initModals();
  NovaApp.initBalanceToggle();
  NovaApp.initVirtualCard();
  NovaApp.initResetDemo();

  // Copy button listeners
  var copyButtons = document.querySelectorAll('[data-copy-text]');
  for (var i = 0; i < copyButtons.length; i++) {
    (function(btn) {
      btn.onclick = function(e) {
        e.preventDefault();
        var text = btn.getAttribute('data-copy-text');
        var label = btn.getAttribute('data-copy-label') || 'Data';
        NovaApp.copyToClipboard(text, label);
      };
    })(copyButtons[i]);
  }
});
