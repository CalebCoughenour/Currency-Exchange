import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency-api.js';
import CurrencyConversions from './js/conversions-api.js';

const clearDisplay = () => {
  $('#base-currency').text("");
  $('#converted-currency').text("");
  $('#conversion-rate').text("");
  $('#converted-amount').text("");
};

const clearInput = () => {
  $('#main-currency').val("");
  $('#secondary-currency').val("");
  $('#currency-amount').val("");
};

$('#exchange-form').submit(function(e) {
  e.preventDefault();
  let mainCurrency = $('#main-currency').val();
  let secondaryCurrency = $('#secondary-currency').val();
  let amount = $('#currency-amount').val();
  let promise = CurrencyExchange.getRate(mainCurrency, secondaryCurrency, amount);
  promise.then(function(response) {
    const body = JSON.parse(response);
    clearInput();
    $('#base-currency').text(`Base Currency: ${body.base_code}`);
    $('#converted-currency').text(`Converted To: ${secondaryCurrency.toUpperCase()}`);
    $('#conversion-rate').text(`Conversion Rate: ${body.conversion_rate}`);
    $('#converted-amount').text(`Converted Amount: ${body.conversion_result}`);
    $('#error-display').text("");
  }, function(error) {
      clearInput();
      clearDisplay();
      if (error.includes("unsupported-code")) {
        $('#error-display').text(`Unsupported Currency. Please try again.`);
      } else if (error.includes("quota-reached")) {
        $('#error-display').text(`We're sorry! Total monthly API limit reached!`);
      }
    }
  );
});

$(document).ready(function() {
  let promise = CurrencyConversions.getConversions();
  promise.then(function(response) {
    let body = JSON.parse(response);
    console.log(body);
    $('#euro-display').text(`EUR: ${body.conversion_rates.EUR}`);
    $('#yen-display').text(`JPY: ${body.conversion_rate.JPY}`);
    $('#pound-display').text(`GBP: ${body.conversion_rate.GBP}`);
    $('#aussi-display').text(`AUD: ${body.conversion_rate.AUD}`);
    $('#canada-display').text(`CAD: ${body.conversion_rate.CAD}`);
    }, function(error) {
      if (error.includes("quota-reached")) {
        $('#error-display').text(`We're sorry! Total monthly API limit reached!`);
      }
    }
  );
});