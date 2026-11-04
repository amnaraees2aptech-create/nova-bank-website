# NovaBank USA — Frontend Demo

A standalone, modern American fintech and private wealth banking frontend showcase. Designed with deep navy blue, crisp white, and champagne gold branding, this project is crafted specifically for portfolio demonstration, visual presentation, and design reviews.

> **IMPORTANT DISCLAIMER:**
> "NovaBank USA is an educational frontend demonstration. It is not a real bank, does not provide financial services, and does not process real money."

---

## 1. Project Overview

- **Project Name:** NovaBank USA — Frontend Demo
- **Purpose:** A standalone, frontend-only user interface presentation showcasing modern American fintech web design, interactive customer banking workflows, and an institutional operations hub.
- **Scope:** This repository contains purely static client-side files (HTML5, CSS3, Vanilla JavaScript, SVG assets). It does not connect to any database, banking API, or backend server.

---

## 2. Implemented Features

Every feature listed below is fully implemented and interactive in the browser:

- **1. Landing Page (`index.html`)**
  - High-impact fintech hero section with trust badges and FDIC insurance indicators.
  - Interactive APY Wealth Growth Calculator with real-time compounding projection based on deposit sliders.
  - Live financial rates ticker (High-Yield APY 5.15%, 18-Mo Fixed CD 5.45%, Fed Funds Rate).
  - Feature highlights (Titanium Debit Card, Zero-Fee Wires, Concierge Support).
  - Transparent relationship tiers comparison (Nova Essential, Nova Premier Wealth, Nova Private Client).
  - SOC-2 Type II and 256-bit encryption security showcase.
  - Verified client testimonials and comprehensive footer with legal demo disclosures.

- **2. Authentication UI (`login.html` & `register.html`)**
  - **Login:** Modern split-screen layout with instant "1-Click Demo Fill" shortcuts for both Customer (`alexander.hayes@novabank.us`) and Admin (`admin.operations@novabank.us`) roles.
  - Simulated biometric FaceID / TouchID authentication button with animated feedback.
  - Password show/hide toggle and simulated password recovery modal.
  - **Registration:** Multi-step digital onboarding form with tier picker, password strength indicator, simulated SSN mask, CIP disclosures, and an animated simulated account approval modal.

- **3. Customer Dashboard (`dashboard.html`)**
  - Real-time balance overview across Net Worth ($78,271.25), Premier Checking ($14,850.40), High-Yield Savings ($38,420.85), and 18-Mo CD ($25,000.00).
  - Balance privacy toggle (`eye` icon) to hide/reveal numeric amounts.
  - Interactive 3D Titanium Visa Infinite debit card mockup that flips to display the magnetic stripe, signature panel, and CVV (`742`).
  - Instant Card Freeze toggle switch that simulates locking/unlocking card point-of-sale functionality.
  - Interactive Cash Flow & Spending Chart powered by Chart.js.
  - Recent transactions activity feed with category color tags and status indicators.
  - Quick Instant Transfer widget with preset recipient avatars, amount buttons, and instant balance deduction.

- **4. Accounts & Card Management (`accounts.html`)**
  - Comprehensive portfolio breakdown for Checking, High-Yield Savings, and Certificates of Deposit.
  - One-click copy buttons for ABA Routing (`021000021`) and Account Numbers.
  - Debit card controls module (Freeze switch, Contactless NFC toggle, International usage toggle, Daily limit slider).
  - Direct Deposit authorization modal with official bank routing instructions.

- **5. Simulated Transfer & Wire Interface (`transfer.html`)**
  - Multi-rail transfer selector (Instant FedNow / Zelle®, Between My Accounts, Domestic ACH/Wire, SWIFT Wire).
  - Dynamic balance validation and live remaining balance calculator.
  - Recipient fast-picker with avatar chips.
  - Review & Confirmation modal with simulated 2FA one-time passcode verification and autofill helper (`482910`).
  - Animated digital transfer receipt modal with simulated Federal Wire Reference ID and live balance updates.

- **6. Transaction History & Filtering (`transactions.html`)**
  - Real-time text search by merchant, payee, category, or reference ID.
  - Multi-criteria filter dropdowns by Account, Category (Shopping, Income, Groceries, Interest, Transfer, Travel, Salary), and Flow Type (Credits vs. Debits).
  - Summary metrics bar showing total monthly inflow and outflow.
  - Interactive table rows that launch a detailed transaction ledger receipt modal.
  - Simulated "Export to CSV" action.

- **7. Official Bank Statement & Printing (`statements.html`)**
  - Month, year, and account cycle picker.
  - High-fidelity official bank statement document layout with NovaBank USA letterhead, headquarters address, and circular bank seal.
  - Itemized activity ledger and account summary table.
  - Print-optimized stylesheet (`@media print` in `responsive.css`) that hides all navigation bars, sidebars, buttons, and headers, allowing seamless printing to paper or saving as clean PDF via `window.print()`.

- **8. Client Profile & Security (`profile.html`)**
  - Editable personal details (Full Legal Name, Email, Phone, Residential Address).
  - Customer status badge: Member FDIC • KYC Level 3 Verified.
  - Security toggles for 2FA, biometric hardware passkeys, and real-time push alerts.
  - Change password simulation and active device session manager with remote revoke action.

- **9. Admin Operations Console (`admin-dashboard.html`)**
  - Operations overview for Flagship Branch #001 (New York Financial District).
  - Key institutional metrics: Total Assets Under Custody ($184.2M), Active Retail Accounts (12,840), Daily Wire Volume ($4.2M), and Compliance Audits.
  - Chart.js 30-Day Liquidity & Settlement Velocity line chart.
  - Chart.js Portfolio Tier distribution doughnut chart.
  - AML & Fraud surveillance queue with officer "Approve Wire" and "Verify KYC" actions.
  - Customer account registry table with search and dynamic "Freeze / Unfreeze" account toggles.

- **10. Shared Design & UI Components**
  - Slide-out mobile drawer navigation with backdrop.
  - Toast notification system with custom success, warning, danger, and info alerts.
  - Global "Reset Demo Data" button to restore all original sample numbers and transactions at any time.

---

## 3. Technologies Used

- **HTML5:** Semantic markup, accessibility attributes, and clean structure.
- **CSS3:** Modern CSS variables, flexbox, CSS grid, 3D card perspective flips, and `@media print` print styles.
- **Bootstrap 5 (v5.3.3 via CDN):** Responsive grid layout, modals, dropdowns, forms, and utilities.
- **Vanilla JavaScript (ES6+):** Pure client-side logic, DOM manipulation, and state management without frontend frameworks.
- **Chart.js (v4.4.1 via CDN):** Interactive bar, line, and doughnut charts for dashboard analytics.
- **Font Awesome (v6.5.2 via CDN):** Vector icons for banking controls, categories, and payment indicators.
- **Google Fonts:**
  - *Outfit:* Headings, numeric balance displays, and brand marks.
  - *Plus Jakarta Sans:* Body text, tables, and form inputs.

> **Note:** This project does **not** use PHP, MySQL, Laravel, Node.js, React, or any backend technology. It is 100% client-side and runs directly in any modern web browser.

---

## 4. Project Structure

```
Novabank/
├── index.html                  # Public landing page, rates ticker, wealth calculator
├── login.html                  # Client sign-in with 1-click demo autofill & biometrics
├── register.html               # Account application wizard with instant demo approval
├── dashboard.html              # Customer dashboard, 3D titanium card, quick transfer
├── accounts.html               # Checking, savings, CD breakdown, card limits
├── transfer.html               # Multi-step wire transfer form, 2FA modal & receipt
├── transactions.html           # Transaction ledger with live search & multi-filters
├── statements.html             # Printable official bank statement preview
├── profile.html                # Personal info, KYC verification status & security
├── admin-dashboard.html        # Institutional operations hub with admin charts
├── README.md                   # Complete documentation and presentation guide
└── assets/
    ├── css/
    │   ├── style.css           # Brand theme, variables, typography, buttons, landing
    │   ├── dashboard.css       # App shell, sidebar, stat cards, tables, modals
    │   └── responsive.css      # Tablet/mobile breakpoints and @media print styles
    ├── js/
    │   ├── demo.js             # Central mock data store, balances, transfers, state
    │   └── main.js             # UI controllers, toasts, card flip, copy-to-clipboard
    └── images/
        ├── logo.svg            # Primary NovaBank USA brand mark (Navy & Gold)
        ├── logo-white.svg      # White brand mark for dark navy backgrounds
        ├── card-chip.svg       # Metallic EMV smart chip vector
        ├── contactless.svg     # Contactless NFC payment waves
        ├── visa-logo.svg       # Visa Infinite brand badge
        ├── bank-seal.svg       # Official Member FDIC circular seal
        ├── avatar.svg          # Customer avatar (Alexander Hayes)
        └── admin-avatar.svg    # Risk officer avatar
```

---

## 5. Installation and Setup

Running this project requires **no server setup, no database, no XAMPP, and no terminal build commands**.

### Beginner-Friendly Windows Instructions:

1. **Locate the Project Folder:**
   Navigate to the project folder on your computer:
   ```
   c:\Users\Saad Raees\Downloads\OneDrive\Desktop\project and websites\project and websites\Frontend Webistes\Novabank
   ```

2. **Open in Visual Studio Code (Optional):**
   - Open Visual Studio Code.
   - Click **File > Open Folder...** and select the `Novabank` folder.

3. **Open in Your Web Browser:**
   - **Method A (Direct):** Double-click `index.html` in Windows File Explorer. It will immediately open in Google Chrome, Microsoft Edge, Brave, or Firefox.
   - **Method B (VS Code Live Server):** If you have the *Live Server* extension installed in VS Code, right-click `index.html` and select **"Open with Live Server"**.

4. **Navigate the Application:**
   Click any link, button, or menu item. All pages are connected through relative links.

---

## 6. How to Demonstrate to a Friend

Here is a recommended 5-minute presentation script to showcase the website to your friend:

1. **Start on the Landing Page (`index.html`):**
   - Show the premium navy, gold, and white American banking design.
   - Point out the Federal Reserve rates ticker and trust indicators.
   - Scroll down to the **Wealth Calculator** and slide the *Initial Deposit* range slider to show how returns compound in real time at 5.15% APY.

2. **Demonstrate Sign-In (`login.html`):**
   - Click **"Sign In"** in the top navigation.
   - Point out the **"1-Click Demo Login"** buttons. Click **"Customer Demo (Alexander Hayes)"** to instantly autofill the credentials.
   - Or click **"Sign in with FaceID / TouchID"** to show the biometric authentication simulation.

3. **Walk Through the Customer Dashboard (`dashboard.html`):**
   - Highlight the account balances ($78,271.25 net worth).
   - Click the **Eye icon** in the top header to demonstrate the **Balance Privacy Mode** (masks all balances with `••••••••`).
   - Click on the **Titanium Debit Card** or click **"Flip Card"** to reveal the 3D perspective flip with magnetic strip and security CVV (`742`).
   - Toggle the **"Lock Card (Instant Freeze)"** switch to show real-time notification toasts.
   - Point out the interactive **Chart.js** cash flow bar chart.

4. **Execute a Simulated Transfer (`transfer.html` or Quick Widget):**
   - On the dashboard, select a recipient (e.g. *Sarah Jenkins*), select `$100`, and click **"Send Instantly"**.
   - Notice how the checking balance immediately deducts and a new entry is added to the **Recent Activity** table.
   - Visit `transfer.html` to show the full wire wizard, click **"Review Transfer"**, show the simulated **2FA Code Autofill**, and click **"Confirm & Dispatch Wire"** to see the animated digital transfer receipt.

5. **Show Filterable Transactions (`transactions.html`):**
   - Type `"Apple"` or `"Stripe"` in the search bar to demonstrate instant live filtering.
   - Filter by category or flow type (Credits vs. Debits).
   - Click any transaction row to open the full receipt details modal.

6. **Demonstrate Official Bank Statement Printing (`statements.html`):**
   - Show the official statement layout with customer address and bank seal.
   - Click **"Print Official Statement"** or press `Ctrl + P`. Show how all sidebars, banners, and buttons automatically disappear, leaving a clean, official paper document ready to save as PDF.

7. **Show the Admin Operations Hub (`admin-dashboard.html`):**
   - Click the **"Admin Hub"** link in the sidebar.
   - Showcase the 30-Day Liquidity line chart and Tier Distribution doughnut chart.
   - In the **Compliance Surveillance Queue**, click **"Approve Wire"** to resolve a flagged wire.
   - In the **Customer Registry**, click **"Freeze / Unfreeze"** on any account to demonstrate the live status change.

8. **Test Responsive Design:**
   - Press `F12` in your browser and toggle mobile device emulation (or shrink your browser window) to demonstrate the collapsible mobile drawer menu.

---

## 7. Sample Data and Disclaimer

All account numbers, routing numbers, customer names, transactions, and financial balances used in this project are entirely fictional and generated for visual presentation purposes only.

> **"NovaBank USA is an educational frontend demonstration. It is not a real bank, does not provide financial services, and does not process real money."**

---

## 8. Limitations

Because this is a frontend-only showcase:
- **No Real Authentication:** Entering any arbitrary username/password or clicking the demo buttons allows access. No cryptographic password hashing or session cookies are used.
- **No Persistent Database:** Changes (such as simulated transfers or frozen cards) are stored in browser session memory / `localStorage`. Resetting the browser cache or clicking "Reset Demo Data" returns everything to default values.
- **No Real Banking Integrations:** No connections exist to FedNow, Zelle®, SWIFT, ACH clearing houses, or credit bureaus.
- **No Backend Authorization:** Sensitive administrative actions are client-side simulations.

---

## 9. Future Improvements

A separate, future version of NovaBank USA may integrate:
- Core PHP 8.2 backend with MVC architecture.
- MySQL relational database schema for persistent user accounts and ledger records.
- Secure session handling with bcrypt password hashing and CSRF protection.
- RESTful API endpoints for asynchronous transaction processing.
- Dynamic PDF statement rendering via TCPDF or Dompdf.

*(Please note: none of these backend features are present or claimed in this frontend showcase repository).*

---

## 10. License and Credits

- **License:** Educational and demonstration use only.
- **Third-Party Libraries & Assets:**
  - [Bootstrap 5.3.3](https://getbootstrap.com/) — Responsive CSS framework.
  - [Chart.js 4.4.1](https://www.chartjs.org/) — Data visualization library.
  - [Font Awesome 6.5.2](https://fontawesome.com/) — UI iconography.
  - [Google Fonts](https://fonts.google.com/) — *Outfit* & *Plus Jakarta Sans* typefaces.
  - Custom SVG graphics (Emblem, EMV Chip, Seal, Avatars) created specifically for NovaBank USA.
