import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency-api.js';

// function clearText() {

// }

$('#exchange-form').submit(function(e) {
  e.preventDefault();
  let mainCurrency = $('#main-currency').val();
  let secondaryCurrency = $('#secondary-currency').val();
  let amount = $('#currency-amount').val();
  let promise = CurrencyExchange.getRate(mainCurrency, secondaryCurrency, amount);
  promise.then(function(response) {
    const body = JSON.parse(response);
    console.log(body);
    $('#base-currency').text(`Base Currency: ${body.base_code}`);
    $('#conversion-rate').text(`Conversion Rate: ${body.conversion_rate}`);
    $('#converted-amount').text(`Converted Amount: ${body.conversion_result}`);
  }, function(error) {
      if (error.includes("unsupported-code")) {
        $('#error-display').text(`Unsupported Currency. Please try again.`);
      }
    }
  );
});