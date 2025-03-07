import { NativeModules } from 'react-native';

export default class RNPaymentSDKLibrary {
  static startCardPayment(config) {
    return new Promise((resolver, reject) => {
      const RNPaymentManager = NativeModules.RNPaymentManager;
      RNPaymentManager.startCardPayment(config).then(
        (result) => {
          resolver(result);
        },
        function (error) {
          reject(error);
        }
      );
    });
  }

  static startTokenizedCardPayment(config, token, transactionRef) {
    return new Promise((resolver, reject) => {
      const RNPaymentManager = NativeModules.RNPaymentManager;
      RNPaymentManager.startTokenizedCardPayment(
        config,
        token,
        transactionRef
      ).then(
        (result) => {
          resolver(result);
        },
        function (error) {
          reject(error);
        }
      );
    });
  }

  static start3DSecureTokenizedCardPayment(config, savedCardInfo, token) {
    return new Promise((resolver, reject) => {
      const RNPaymentManager = NativeModules.RNPaymentManager;
      RNPaymentManager.start3DSecureTokenizedCardPayment(
        config,
        savedCardInfo,
        token
      ).then(
        (result) => {
          resolver(result);
        },
        function (error) {
          reject(error);
        }
      );
    });
  }

  static startApplePayPayment(config) {
    return new Promise((resolver, reject) => {
      const RNPaymentManager = NativeModules.RNPaymentManager;
      RNPaymentManager.startApplePayPayment(config).then(
        (result) => {
          resolver(result);
        },
        function (error) {
          reject(error);
        }
      );
    });
  }

  static startAlternativePaymentMethod(config) {
    return new Promise((resolver, reject) => {
      const RNPaymentManager = NativeModules.RNPaymentManager;
      RNPaymentManager.startAlternativePaymentMethod(config).then(
        (result) => {
          resolver(result);
        },
        function (error) {
          reject(error);
        }
      );
    });
  }
}
