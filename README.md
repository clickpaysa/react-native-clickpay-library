
# react-native-clickpay
![Version](https://img.shields.io/badge/React%20Native%20Clickpay-v1.3.8-green)

React native clickpay library is a wrapper for the native clickpay Android and iOS SDKs, It helps you integrate with clickpay seamlessly.

Library Support:

* [x] iOS
* [x] Android

Library Version:

* [x] React Version: 22.14.0
* [x] React-Native Version: 0.77.0

# Installation

```sh
$ npm install @clickpay.sa/react-native-clickpay@1.3.8 --save
```

### Expo

```sh
expo install @clickpay.sa/react-native-clickpay
```
Then call the below to run Android or IOS
```sh
npx expo run:android
npx expo run:ios
```

### Follow the below steps to complete the installation

* Android
  * Add `packagingOptions` to module `build.gradle` file

  ```
  android {
    ...
    packagingOptions {
          pickFirst '**/*.so'
      }
  }
  ```
* iOS

  * Add `libswiftWebKit.tbd` to your **Link Binary With Libraries**
  * Navigate to the iOS folder and run the following command:

  ```
  pod install
  ```

## Usage

Import `@clickpay.sa/react-native-clickpay`

```javascript
import {RNPaymentSDKLibrary, PaymentSDKConfiguration, PaymentSDKBillingDetails, PaymentSDKTheme, PaymentSDKConstants, PaymentSDKSavedCardInfo} from '@clickpay/react-native-clickpay';
```

### Pay with Card

1. Configure the billing & shipping info, the shipping info is optional

```javascript
let billingDetails = new PaymentSDKBillingDetails(name= "John Smith",
                                  email= "email@test.com",
                                  phone= "+2011111111",
                                  addressLine= "address line",
                                  city= "Dubai",
                                  state= "Dubai",
                                  countryCode= "ae", // ISO alpha 2
                                  zip= "1234")

let shippingDetails = new PaymentSDKShippingDetails(name= "John Smith",
                                  email= "email@test.com",
                                  phone= "+2011111111",
                                  addressLine= "address line",
                                  city= "Dubai",
                                  state= "Dubai",
                                  countryCode= "ae", // ISO alpha 2
                                  zip= "1234")

```
2. Create object of `PaymentSDKConfiguration` and fill it with your credentials and payment details.

```javascript

let configuration = new PaymentSDKConfiguration();
    configuration.profileID = "*your profile id*"
    configuration.serverKey= "*server key*"
    configuration.clientKey = "*client key*"
    configuration.cartID = "545454"
    configuration.currency = "AED"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "ae"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.billingDetails = billingDetails
	 configuration.forceShippingInfo = false
```

Options to show billing and shipping info

```javascript

	configuration.showBillingInfo = true
	configuration.showShippingInfo = true

```

# 1- Pay with card
Start payment by calling `startCardPayment` method and handle the transaction details

```javascript

RNPaymentSDKLibrary.startCardPayment(JSON.stringify(configuration)).then( result => {
      if(result["PaymentDetails"] != null) { // Handle transaction details
        let paymentDetails = result["PaymentDetails"]
        console.log(paymentDetails)
      } else if(result["Event"] == "CancelPayment") { // Handle events
        console.log("Cancel Payment Event")
      }
     }, function(error) { // Handle error
      console.log(error)
     });

```
<img width="191" alt="card" src="https://user-images.githubusercontent.com/17829232/188835902-c50f41d1-5e3d-4d4c-a49a-e75b81480b75.png">


# 2- Pay with Token
Start payment by calling `startTokenizedCardPayment` method and handle the transaction details

```javascript

RNPaymentSDKLibrary.startTokenizedCardPayment(JSON.stringify(configuration),
"Token",
"TransactionReference"
).then( result => {
      if(result["PaymentDetails"] != null) { // Handle transaction details
        let paymentDetails = result["PaymentDetails"]
        console.log(paymentDetails)
      } else if(result["Event"] == "CancelPayment") { // Handle events
        console.log("Cancel Payment Event")
      }
     }, function(error) { // Handle error
      console.log(error)
     });

```

# 3- Pay with 3DS Secured Token
Start payment by calling `start3DSecureTokenizedCardPayment` method and handle the transaction details

```javascript
let cardInfo = new PaymentSDKSavedCardInfo("Card mask", "cardType")
RNPaymentSDKLibrary.start3DSecureTokenizedCardPayment(
  JSON.stringify(configuration),
  JSON.stringify(cardInfo),
  "Token"
  ).then( result => {
      if(result["PaymentDetails"] != null) { // Handle transaction details
        let paymentDetails = result["PaymentDetails"]
        console.log(paymentDetails)
      } else if(result["Event"] == "CancelPayment") { // Handle events
        console.log("Cancel Payment Event")
      }
     }, function(error) { // Handle error
      console.log(error)
     });

```
<img width="197" alt="rec 3ds" src="https://user-images.githubusercontent.com/17829232/188836295-d8d48978-a80f-40d3-bda3-439423fcdec0.png">

### Pay with Apple Pay

1. Follow the guide [Steps to configure Apple Pay][applepayguide] to learn how to configure ApplePay with ClickPay.

2. Do the steps 1 and 2 from **Pay with Card** although you can ignore Billing & Shipping details and Apple Pay will handle it, also you must pass the **merchant name** and **merchant identifier**.

```javascript

let configuration = new PaymentSDKConfiguration();
    configuration.profileID = "*your profile id*"
    configuration.serverKey= "*server key*"
    configuration.clientKey = "*client key*"
    configuration.cartID = "545454"
    configuration.currency = "AED"
    configuration.cartDescription = "Flowers"
    configuration.merchantCountryCode = "ae"
    configuration.merchantName = "Flowers Store"
    configuration.amount = 20
    configuration.screenTitle = "Pay with Card"
    configuration.merchantIdentifier = "merchant.com.bundleID"

    //ignore this if you want to use default Networks

    const selectedNetworks = [PaymentSDKNetworks.DISCOVER];
    configuration.paymentNetworks = selectedNetworks;

```

3. To simplify ApplePay validation on all user's billing info, pass **simplifyApplePayValidation** parameter in the configuration with **true**.

```javascript

configuration.simplifyApplePayValidation = true

```

4. Call `startApplePayPayment` to start payment

```javascript
RNPaymentSDKLibrary.startApplePayPayment(JSON.stringify(configuration)).then( result => {
        if(result["PaymentDetails"] != null) { // Handle transaction details
          let paymentDetails = result["PaymentDetails"]
          console.log(paymentDetails)
        } else if(result["Event"] == "CancelPayment") { // Handle events
          console.log("Cancel Payment Event")
        }
     }, function(error) { // handle errors
      console.log(error)
     });
```

### Pay with Samsung Pay

Pass Samsung Pay token to the configuration and call `startCardPayment`

```javascript
configuration.samsungToken = "token"
```

### Pay with Alternative Payment Methods

It becomes easy to integrate with other payment methods in your region like STCPay, OmanNet, KNet, Valu, Fawry, UnionPay, and Meeza, to serve a large sector of customers.

1. Do the steps 1 and 2 from **Pay with Card**.

2. Choose one or more of the payment methods you want to support.

```javascript
configuration.alternativePaymentMethods = [PaymentSDKConstants.AlternativePaymentMethod.stcPay]
```

3. Start payment by calling `startAlternativePaymentMethod` method and handle the transaction details

```javascript

RNPaymentSDKLibrary.startAlternativePaymentMethod(JSON.stringify(configuration)).then( result => {
      if(result["PaymentDetails"] != null) { // Handle transaction details
        let paymentDetails = result["PaymentDetails"]
        console.log(paymentDetails)
      } else if(result["Event"] == "CancelPayment") { // Handle events
        console.log("Cancel Payment Event")
      }
     }, function(error) { // Handle error
      console.log(error)
     });

```

## Tokenisation

Follow the below instructions to enable tokenisation feature.

1. Request token

```javascript
configuration.tokeniseType = PaymentSDKConstants.TokeniseType.userOptional // read more about the tokeniseType in the enums section
configuration.tokenFormat = PaymentSDKConstants.TokeniseFormat.hex32 // read more about the tokenFormat in the enums section

```
After passing those parameters, you will receive a token and transaction reference in the result callback, save them for future usage.

2. Pass the token & transaction reference

```javascript
configuration.token = token
configuration.transactionReference = transactionreference
```


## Enums

Those enums will help you in customizing your configuration.

* Tokenise types

The default type is none

```javascript
TokeniseType = {
"none":"none", // tokenise is off
"merchantMandatory":"merchantMandatory", // tokenise is forced
"userMandatory":"userMandatory", // tokenise is forced as per user approval
"userOptinoal":"userOptional" // tokenise if optional as per user approval
};
```

```javascript
configuration.tokeniseType = PaymentSDKConstants.TokeniseType.userOptional
```

* Token formats

The default format is hex32

```javascript
TokeniseFormat = {"none":"1",
"hex32": "2",
"alphaNum20": "3",
"digit22": "3",
"digit16": "5",
"alphaNum32": "6"
};
```

```javascript
configuration.tokenFormat = PaymentSDKConstants.TokeniseFormat.hex32
```

* Transaction types

The default type is sale

```javascript
TransactionType = {"sale":"sale",
"authorize": "auth"};
```

```javascript
configuration.transactionType = PaymentSDKConstants.TransactionType.sale
```

* Alternative payment methods

```javascript
AlternativePaymentMethod = {"unionPay":"unionpay", "stcPay":"stcpay", "valu": "valu", "meezaQR": "meezaqr", "omannet": "omannet", "knetCredit": "knetcredit", "knetDebit": "knetdebit", "fawry": "fawry", "aman": "aman", "urpay": "urpay"};
```

```javascript
configuration.alternativePaymentMethods = [PaymentSDKConstants.AlternativePaymentMethod.stcPay,]
```

## Show/Hide Card Scanner

```javascript
configuration.hideCardScanner = true
```

## Theme Customization

![UI guide](https://user-images.githubusercontent.com/13621658/109432213-d7981380-7a12-11eb-9224-c8fc12b0024d.jpg)

### iOS

- **Theme**: <br />Create an instance from the class `PaymentTheme` and customize the theme.

```javascript
let theme = new PaymentSDKTheme()
theme.backgroundColor = "a83297"
theme.primaryColor = "956596"
// Set the merchant logo
const merchantLogo = require('./Logo.png');
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
const resolvedMerchantLogo = resolveAssetSource(merchantLogo);
theme.merchantLogo = resolvedMerchantLogo

configuration.theme = theme
```

- **Localization**:
  <br />Use the keys from our localization string files ([English][iosenglish], [Arabic][iosarabic]), then add the same key to your app localizable string file and add your custom string.

### Android

- **Theme**: <br />Edit your `styles.xml` to customize the theme.

#### Example of Overriding Colors and Dimens:

```xml
<resources>
    <!-- Override colors -->
    <color name="payment_sdk_primary_color">#ffffff</color>
    <color name="payment_sdk_secondary_color">#0073bc</color>
    <color name="payment_sdk_status_bar_color">#444647</color>
    <color name="payment_sdk_primary_font_color">#4c4c4c</color>
    <color name="payment_sdk_secondary_font_color">#0073bc</color>
    <color name="payment_sdk_hint_font_color">#a5a5a5</color>
    <color name="payment_sdk_stroke_color">#e1e1e1</color>
    <color name="payment_sdk_button_text_color">#FFF</color>
    <color name="payment_sdk_title_text_color">#1e1e1e</color>
    <color name="payment_sdk_button_background_color">#0073bc</color>
    <color name="payment_sdk_background_color">#F9FAFD</color>
    <color name="payment_sdk_blue_F2FAFD">#F2FAFD</color>
    <color name="payment_sdk_error_text_color">#EC2213</color>
    <color name="payment_sdk_back_black_dim">#4D6E6E6E</color>
    <color name="payment_sdk_input_field_background_color">#FFFFFFFF</color>
    <color name="payment_sdk_enabled_switch_track_color">#00000000</color>
    <color name="payment_sdk_enabled_switch_handle_color">#3db39e</color>
    <color name="payment_sdk_disabled_switch_track_color">#00000000</color>
    <color name="payment_sdk_disabled_switch_handle_color">#c7c7c7</color>
    <color name="payment_sdk_switch_stroke_color">#4c4c4c</color>
    <color name="payment_sdk_amount_font_color">#4c4c4c</color>
    <color name="payment_sdk_original_amount_font_color">#a5a5a5</color>
    <color name="payment_sdk_billing_header_background_color">#0073bc</color>
    <color name="payment_sdk_billing_text_color">#FFF</color>

    <!-- Override dimens -->
    <dimen name="payment_sdk_title_font_size">18sp</dimen>
    <dimen name="payment_sdk_title_margin">24dp</dimen>
    <dimen name="payment_sdk_primary_font_size">16sp</dimen>
    <dimen name="payment_sdk_secondary_font_size">16sp</dimen>
    <dimen name="payment_sdk_button_font_size">16sp</dimen>
    <dimen name="payment_sdk_separator_thickness">1dp</dimen>
    <dimen name="payment_sdk_stroke_thickness">.5dp</dimen>
    <dimen name="payment_sdk_input_corner_radius">8dp</dimen>
    <dimen name="payment_sdk_card_corner_radius">8dp</dimen>
    <dimen name="payment_sdk_card_margin">16dp</dimen>
    <dimen name="payment_sdk_billing_header_corner_radius">0dp</dimen>
    <dimen name="payment_sdk_billing_header_margin">0dp</dimen>
    <dimen name="payment_sdk_button_corner_radius">8dp</dimen>
    <dimen name="payment_sdk_error_font_size">12sp</dimen>
    <dimen name="payment_sdk_amount_font_size">16sp</dimen>

    <!-- Override styles -->
    <style name="PaymentSdkTheme" parent="Theme.MaterialComponents.NoActionBar">
        <!-- Hides the payment screen title background -->
        <item name="payment_sdk_hideScreenTitleBackground">true</item>
        <!-- Sets the alignment of the payment screen title [start-end-center] -->
        <item name="payment_sdk_screenTitleAlignment">start</item>
        <!-- Hides the card and button shadows -->
        <item name="payment_sdk_hideViewsShadow">true</item>
    </style>
</resources>
```
- **Merchant Logo**:

```javascript
let theme = new PaymentSDKTheme()

// Set the merchant logo
const merchantLogo = require('./Logo.png');
const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
const resolvedMerchantLogo = resolveAssetSource(merchantLogo);
theme.merchantLogo = resolvedMerchantLogo

configuration.theme = theme
```

- **Localization**:
  To override your strings you can find the keys with the default values here
  [English][english], [Arabic][arabic].

## Demo application

Check our complete examples ([React-Native][example], [Expo][expoexample]).

<img src="https://user-images.githubusercontent.com/13621658/109432386-905e5280-7a13-11eb-847c-63f2c554e2d1.png" width="370" alt=''>

## License

See [LICENSE][license].

## ClickPay

[Support][1] | [Terms of Use][2] | [Privacy Policy][3]

 [1]: https://merchant.clickpay.com.sa/
 [2]: https://merchant.clickpay.com.sa
 [3]: https://merchant.clickpay.com.sa
 [license]: https://github.com/clickpaysa/react-native-clickpay-library/blob/clickpay/LICENSE
 [applepayguide]: https://github.com/clickpaysa/react-native-clickpay-library/blob/main/ApplePayConfiguration.md
 [example]: https://github.com/clickpaysa/react-native-clickpay-library/tree/clickpay/example

