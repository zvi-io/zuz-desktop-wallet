var util = require('util');
var Tab = require('../client/tab').Tab;

var RegisterTab = function ()
{
  Tab.call(this);
};

util.inherits(RegisterTab, Tab);

RegisterTab.prototype.tabName = 'register';
RegisterTab.prototype.pageMode = 'single';
RegisterTab.prototype.parent = 'main';

RegisterTab.prototype.generateHtml = function ()
{
  return require('../../templates/tabs/register.jade')();
};

RegisterTab.prototype.angular = function (module) {

  module.controller('RegisterCtrl', ['$scope', '$location', '$element',
                                     '$timeout', 'rpId', 'rpFileDialog',
                                     function ($scope, $location, $element,
                                               $timeout, $id, filedialog)
  {
    if ($id.loginStatus) {
      $location.path('/balance');
      return;
    }
    $scope.goTo = function(url){
      $location.path(url);
    };

    $scope.reset = function()
    {
      $scope.password = '';
      $scope.passwordSet = {};
      $scope.password1 = '';
      $scope.password2 = '';
      $scope.master = '';
      $scope.key = '';
      $scope.mode = 'register_new_account';
      //$scope.mode = 'register_empty_wallet1';
      $scope.showMasterKeyInput = false;
      $scope.submitLoading = false;
      $scope.email = '';

      if ($scope.registerForm) $scope.registerForm.$setPristine(true);
    };

    $scope.fileInputClick = function() {
      filedialog.saveAs(function(filename) {
        $scope.$apply(function() {
          $scope.walletfile = filename;
          store.set('walletfile', filename);
          $scope.mode = 'register_empty_wallet';
        });
      }, 'wallet');
    };

    $scope.submitSecretKeyForm = function(){
      $scope.masterkey = $scope.secretKey;
      $scope.fileInputClick();
    };

    $scope.register = function()
    {
      $id.register({
        'email': $scope.email/*'local'*/,
        'username': $scope.username/*'local'*/,
        'password': $scope.password1,
        'masterkey': $scope.masterkey,
        'walletfile': $scope.walletfile
      },
      function(err, key){
        if (err) {
          $scope.mode = "failed";
          $scope.error_detail = err.message;
          return;
        }
        $scope.password = new Array($scope.password1.length+1).join("*");
        $scope.keyOpen = key;
        $scope.key = $scope.keyOpen[0] + new Array($scope.keyOpen.length).join("*");

        $scope.$apply(function(){
          $scope.mode = 'welcome';
        });

      });
    };

    $scope.submitForm = function()
    {
      $scope.register();
    };

    $scope.goToFund = function()
    {
      $scope.mode = 'register_empty_wallet';
      $scope.reset();

      $location.path('/xrp');
    };

    $scope.reset();

  }]);
};

module.exports = RegisterTab;
