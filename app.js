// Define UI Vars
const form = document.querySelector('#loan-form');
const amount = document.querySelector('#amount');
const interest = document.querySelector('#interest');
const time = document.querySelector('#time');
const btnTime = document.querySelector('#btn-time');
const monthlyPayment = document.querySelector('#monthly-payment');
const totalPayment = document.querySelector('#total-payment');
const totalInterest = document.querySelector('#total-interest');
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
const loader = document.querySelector('#loading');
const results = document.querySelector('#results');

// Define global vars
let alpha = 12;

// Load all event listeners
loadEventListeners();
console.log('loaded all event listeners');
function loadEventListeners() {
  // Add submit event
  form.addEventListener('submit', loading);
  // Change time
  btnTime.addEventListener('click', changeTime);
}

// Loading process
function loading(e) {
  console.log('Loading...');
  // Hide results
  results.style.display = 'none';
  // Show loader
  loader.style.display = 'block';

  // Disable time button
  btnTime.removeEventListener('click', changeTime);
  btnTime.style.cursor = 'default';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
}

// Calculate results
function calculateResults() {
  console.log('Calculating...');

  // Get inputs
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(time.value) * alpha;

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

  // Enable time button
  btnTime.addEventListener('click', changeTime);
  btnTime.style.cursor = 'pointer';
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

// Change time
function changeTime(e) {
  if (btnTime.textContent === 'Years') {
    btnTime.textContent = 'Months';
    alpha = 1;
  } else {
    btnTime.textContent = 'Years';
    alpha = 12;
  }
}
