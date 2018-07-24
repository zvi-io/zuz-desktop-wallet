/**
 * Ripple Admin Console Configuration
 *
 * Copy this file to config.js and edit to suit your preferences.
 */
var Options = {
  // Rippled to connect
  connection: {
    trace: false,
    trusted: true,
    local_signing: true,

    servers: [
      { host: 's-west.zvi.io', port: 443, secure: true },
      { host: 's-east.zvi.io', port: 443, secure: true }
    ]
  },

  ilpAdminPass: "passwordtoilpapi",

  // Number of transactions each page has in balance tab notifications
  transactions_per_page: 50,

  // Number of ledgers ahead of the current ledger index where a tx is valid
  tx_last_ledger: 3,

  // Set max transaction fee for network in drops of XRP
  max_tx_network_fee: 200000,

  // Set max number of rows for orderbook
  orderbook_max_rows: 20,

  gateway_max_limit: 1000000000,

  // Should only be used for development purposes
  persistent_auth: false,
  native_currency: 'ZVI',
  native_currency_name: 'Zvi',
  conversions: [
    {original: 'XSD', translated: 'XSDR'},
    {original: 'XSY', translated: 'XSYN'},
    {original: 'USD', translated: 'USDT'},
    {original: 'TUS', translated: 'TUSD'}
  ],
  translateCoin: function (coin) {
    if(typeof native_currency === 'undefined' || typeof native_currency_name === 'undefined') {
      native_currency = Options.native_currency;
      native_currency_name = Options.native_currency_name;
    }
    switch (coin) {
      case 'XRP':
      case 'ripple':
        return native_currency;
      case 'XRP - Ripples':
        return native_currency + " - " + native_currency + "s";
      default:
        if (coin && typeof coin === 'string') {
          if (coin.indexOf('XRP') !== -1) {
            coin = coin.replace(/XRP/g, native_currency);
          }
          // Convert all coins to their longer currency codes
          var conv = Options.conversions;
          if (conv && conv.length > 0) {
            for (var i = 0; i < conv.length; i++) {
              if (coin.indexOf(conv[i].translated) === -1 && coin.indexOf(conv[i].original) !== -1) {
                coin = coin.replace(new RegExp(conv[i].original, "g"), conv[i].translated)
              }
            }
          }
        }
        return coin;
    }
  },
  translateBack: function (coin) {
    if(typeof native_currency === 'undefined' || typeof native_currency_name === 'undefined') {
      native_currency = Options.native_currency;
      native_currency_name = Options.native_currency_name;
    }
    switch (coin) {
      case native_currency:
      case native_currency_name:
        return 'XRP';
      case native_currency + ' - ' + native_currency + 's':
        return 'XRP - Ripples';
      default:
        if (coin && typeof coin === 'string') {
          if (coin.indexOf(native_currency) !== -1) {
            coin = coin.replace(new RegExp(native_currency, "g"), 'XRP');
          }
          // Convert all coins to their longer currency codes
          var conv = Options.conversions;
          if (conv && conv.length > 0) {
            for (var i = 0; i < conv.length; i++) {
              if (coin.indexOf(conv[i].translated) !== -1) {
                coin = coin.replace(new RegExp(conv[i].translated, "g"), conv[i].original)
              }
            }
          }
        }
        return coin;
    }
  }
};

// Load client-side overrides
if (store.enabled) {
  var settings = JSON.parse(store.get('ripple_settings') || '{}');

  if (settings.connection && settings.connection.servers) {
    var servers = _.filter(settings.connection.servers, function(s) {
      return !s.isEmptyServer && _.isNumber(s.port) && !_.isNaN(s.port);
    });

    if (!servers.length) {
      servers = Options.connection.servers;
    }
    settings.connection.servers = servers;

    Options.connection = settings.connection;
  }

  if (settings.max_tx_network_fee) {
    Options.max_tx_network_fee = settings.max_tx_network_fee;
  }
}
