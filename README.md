![Intercom](Example/www/img/Intercom_logo-github.png)

## Onboard, retain and support mobile users at scale
Engage customers with email, push, and in‑app messages and support them with an integrated knowledge base and help desk.

### The Intercom Messenger
The [Intercom Messenger](https://www.intercom.com/help/en/articles/316-the-intercom-messenger-in-your-product-and-on-your-website) is the home for the conversations your customers have with you via Intercom, and the place where they can self-serve for support or to learn more about your product.

The Messenger works for both logged in and logged out users. It’s worth reading the detailed instructions in our [developer docs](https://developers.intercom.com/installing-intercom/docs/intercom-for-ios) on user management before you get started.

You can open the Intercom Messenger from a button in your app, programmatically when someone does something, or from a persistent button that sits over your app’s UI.

When you trigger the Intercom Messenger, your customer is presented with a home screen. This is configurable inside Intercom to change how it looks and what’s presented.

From there, your customer can search for help articles or start a conversation. A conversation goes to your inbox inside Intercom, and replies in both directions happen in real time. You can also send push notifications to your customers to let them know they have a reply after they’ve left your app.

![iOSREadme1](https://user-images.githubusercontent.com/3185423/84803321-c5e41c80-aff9-11ea-89b0-514332887066.jpg)

### [Outbound messaging features](https://www.intercom.com/mobile-carousels)
You can send messages to your customers from Intercom, and the mobile SDK will present them in your app. Messages can be targeted at specific users or groups of users, and can be scheduled to be sent during specific time windows.

Companies use this for many use cases, including onboarding new users, announcing features, proactive support, important notices etc.

The mobile SDK supports many different message formats, all of which can be created and configured inside Intercom. These include:

* **Push notifications** - these can open your app or follow a deep link.
* **Chats** - messages from someone in your team to your customer.
* **Mobile Carousels** - highly customizable, multi-screen messages with calls to action and device permissions.
* **Small posts** - a short announcement.
* **Large posts** - a full screen announcement.

We check for new messages when your app opens and whenever your customer or your app interacts with Intercom.

![iOS - Content types](https://user-images.githubusercontent.com/3185423/84890387-4191a800-b092-11ea-821e-e920ba7ef6a5.png)

## Installation

### Cordova

To install the plugin in your Cordova app, run the following:
```script
cordova plugin add cordova-plugin-intercom
```
### PhoneGap

To add the plugin to your PhoneGap app, add the following to your `config.xml`:
```xml
<plugin name="cordova-plugin-intercom" version="14.0.0" />
```

### Requirements
| Name      | Required Version |
| ----------- | ----------- |
|   cordova   |     12.0.0  |
|   cordova-android   |     13.0.0  |
|   cordova-ios   |     7.1.0 |
|   iOS SDK  |     15.0.0 |
|   Android SDK   |     34 |

## Example App

An example app is provided [here](https://github.com/intercom/intercom-cordova/tree/master/Example) that shows a basic Cordova/Phonegap app integration with Intercom.

## Setup and Configuration

* Our [installation guide]((https://developers.intercom.com/installing-intercom/cordova-phonegap/installation/)) contains full setup and initialisation instructions.
* The [configuration guide](https://developers.intercom.com/installing-intercom/cordova-phonegap/configuration/) provides info on how to configure Intercom for Cordova/Phonegap.
* Read our guide on [Push Notifications](https://developers.intercom.com/installing-intercom/cordova-phonegap/push-notifications/) support.
* Please contact us on [Intercom](https://www.intercom.com/) with any questions you may have, we're only a message away!


## Acknowledgements

Thanks to [Josh Dover](https://github.com/joshdover) from [AskU](http://www.asku.co/) for making a Cordova plugin for Intercom for iOS which helped lots of people to integrate Intercom in their iOS Cordova apps. 👍

## License

intercom-cordova is released under the [MIT License](http://www.opensource.org/licenses/MIT).
