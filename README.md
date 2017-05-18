![Intercom](Example/www/img/Intercom_logo-github.png)

# Intercom for Cordova/PhoneGap

This is a plugin that allows your Cordova or PhoneGap app to use [Intercom for iOS](https://github.com/intercom/intercom-ios) and/or [Intercom for Android](https://github.com/intercom/intercom-android).

* Intercom for iOS supports iOS 8, 9 & 10.
* Intercom for Android supports API 15 and above.

## Installation

### Cordova

To install the plugin in your Cordova app, run the following:
```script
cordova plugin add cordova-plugin-intercom
```
### PhoneGap

To add the plugin to your PhoneGap app, add the following to your `config.xml`:
```xml
<plugin name="cordova-plugin-intercom" version="~3.2.2" />
```
### Ionic

Intercom is compatible with both Ionic 1 & 2. To use the Intercom with Ionic, run the following:
```script
cordova plugin add cordova-plugin-intercom
```
Make sure you [initialize Intercom](https://developers.intercom.com/docs/cordova-phonegap-installation#section-step-2-initialize-intercom) correctly.
#### Ionic 1
For Ionic 1 you can use Intercom like this:
```
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    cordova.plugins.intercom.registerIdentifiedUser({userId: "123456"});
    cordova.plugins.intercom.setLauncherVisibility('VISIBLE');
  });
})
```


#### Ionic 2
For Ionic 2 you need to add the folling variable to your `app.component.ts`:

`declare var cordova:any;`

You can then use Intercom like this:

```
this.platform.ready().then(() => {
    cordova.plugins.intercom.registerIdentifiedUser({userId: "12345"});
    cordova.plugins.intercom.setLauncherVisibility('VISIBLE');
});
```

## Example App

An example app is provided [here](https://github.com/intercom/intercom-cordova/tree/master/Example) that shows a basic Cordova/Phonegap app integration with Intercom.

## Setup and Configuration

* Our [installation guide](https://developers.intercom.com/docs/cordova-phonegap-installation) contains full setup and initialisation instructions.
* The [configuration guide](https://developers.intercom.com/docs/cordova-phonegap-configuration) provides info on how to configure Intercom for Cordova/Phonegap.
* Read our guide on [Push Notifications](https://developers.intercom.com/docs/cordova-phonegap-push-notifications) support.
* Please contact us on [Intercom](https://www.intercom.com/) with any questions you may have, we're only a message away!


## Acknowledgements

Thanks to [Josh Dover](https://github.com/joshdover) from [AskU](http://www.asku.co/) for making a Cordova plugin for Intercom for iOS which helped lots of people to integrate Intercom in their iOS Cordova apps. 👍

## License

intercom-cordova is released under the [MIT License](http://www.opensource.org/licenses/MIT).
