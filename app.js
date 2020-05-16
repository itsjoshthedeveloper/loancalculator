// Define UI Vars
const form = document.querySelector('#loan-form');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const years = document.querySelector('#years');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
const loader = document.querySelector('#loading');
const results = document.querySelector('#results');

// Load all event listeners
loadEventListeners();
console.log('loaded all event listeners');
function loadEventListeners() {
  // Add submit event
  form.addEventListener('submit', loading);
}

// Loading process
function loading(e) {
  console.log('Loading...');
  // Hide results
  results.style.display = 'none';

  // Show loader
  loader.style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
}

// Calculate results
function calculateResults() {
  console.log('Calculating...');

  // Get inputs
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show results
    results.style.display = 'block';
  } else {
    showError('Please check your numbers');
  }

  // Hide loader
  loader.style.display = 'none';
}

// Show error
function showError(error) {
  // Create a div
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.textContent = error;

  // Insert div above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
}
