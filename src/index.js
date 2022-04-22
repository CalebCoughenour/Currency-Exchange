import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency-api.js';
import CurrencyConversions from './js/conversions-api.js';
// import CryptoSearch from './js/crypto-search-api.js';

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
  $('#coin-search').val("");
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
    $('.card-user-conversions').show();
    $('#error-display').text("");
    $('.card-crypto').hide();
  }, function(error) {
      clearInput();
      clearDisplay();
      $('.card-crypto').hide();
      if (error.includes("unsupported-code")) {
        $('.card-user-conversions').show();
        $('#error-display').text(`Unsupported Currency. Please try again with a valid currency code.`);
      } else if (error.includes("quota-reached")) {
        $('.card-user-conversions').show();
        $('#error-display').text(`We're sorry! Total monthly API limit reached!`);
      }
    }
  );
});

// $('#coin-search-button').click(function(e) {
//   e.preventDefault();
//   let ticker = $('#coin-search').val().toUpperCase();
//   let promise = CryptoSearch.getCoins(ticker);
//   promise.then(function(response) {
//   const body = JSON.parse(response);
//   $('.card-crypto').show();
//   $('.card-error').hide();
//   $('#coin-name').text(`${body[0].name}`);
//   $('#coin-price').text(`Current Price: $ ${parseFloat(body[0].price).toFixed(2)}`);
//   $('#price-change').text(`1d Price Change: $ ${parseFloat(body[0]["1d"].price_change).toFixed(2)}`);
//   $('#volume').text(`1d Volume: $ ${body[0]["1d"].volume}`);
//   $('#market-cap').text(`Market Cap: $ ${body[0].market_cap}`);
//   clearInput();
//   $('.card-user-conversions').hide();
//   }, function(error) {
//     $('.card-crypto').hide();
//     $('show-errors').text(`There was an error processing your request: ${error}`);
//     }
//   );
// });

$(document).ready(function() {
  let promise = CurrencyConversions.getConversions();
  promise.then(function(response) {
    let body = JSON.parse(response);
    $('#conversions-display').text(`USD Conversion Rates - EUR: ${body.conversion_rates.EUR} JPY: ${body.conversion_rates.JPY} GBP: ${body.conversion_rates.GBP} AUD: ${body.conversion_rates.AUD} CAD: ${body.conversion_rates.CAD}`);
    }, function(error) {
      if (error.includes("quota-reached")) {
        $('#error-display').text(`We're sorry! Total monthly API limit reached!`);
      }
    }
  );
});