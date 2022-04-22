import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency-api.js';

$('#exchange-form').submit(function(e) {
  e.preventDefault();
  let mainCurrency = $('#main-currency').val();
  let  secondaryCurrency = $('#secondary-currency').val();
  let promise = CurrencyExchange.getRate(mainCurrency, secondaryCurrency);
  promise.then(function(response) {
    const body = JSON.parse(response)
    console.log(body);
  });
});