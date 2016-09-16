# Intercom for Cordova/PhoneGap

## 3.0.11 (2016-09-16)

* Updated Intercom for Android to [3.0.9](https://github.com/intercom/intercom-android/releases/tag/3.0.9).
* Updated Intercom for iOS to [3.0.12](https://github.com/intercom/intercom-ios/releases/tag/3.0.12).

## 3.0.10 (2016-09-09)

* Updated Intercom for Android to [3.0.7](https://github.com/intercom/intercom-android/releases/tag/3.0.7).
* Updated Intercom for iOS to [3.0.11](https://github.com/intercom/intercom-ios/releases/tag/3.0.11).

## 3.0.9 (2016-08-29)

* Updated Intercom for Android to [3.0.4](https://github.com/intercom/intercom-android/releases/tag/3.0.4).

## 3.0.8 (2016-08-19)

* Fixed [#73](https://github.com/intercom/intercom-cordova/issues/70).

## 3.0.7 (2016-08-16)

* Fixed [#70](https://github.com/intercom/intercom-cordova/issues/70).
* Fixed [#71](https://github.com/intercom/intercom-cordova/issues/71).
* Updated Intercom for Android to [3.0.3](https://github.com/intercom/intercom-android/releases/tag/3.0.3).
* Updated Intercom for iOS to [3.0.10](https://github.com/intercom/intercom-ios/releases/tag/3.0.10).
 
## 3.0.6 (2016-08-10)

* Fixed [#67](https://github.com/intercom/intercom-cordova/issues/66).
* Added `Photos.framework` to stop iOS build error.

## 3.0.5 (2016-08-05)

* Updated Intercom for iOS to [3.0.8](https://github.com/intercom/intercom-ios/releases/tag/3.0.8).

# 3.0.4 (2016-08-03)

* Updated Intercom for iOS to [3.0.7](https://github.com/intercom/intercom-ios/releases/tag/3.0.7).
* Updated iOS configuration in `plugin.xml` for compatibility with older versions of Cordova (As reported in [#65](https://github.com/intercom/intercom-cordova/issues/65) & [#66](https://github.com/intercom/intercom-cordova/issues/66)).

# 3.0.3 (2016-07-29)

* Updated Intercom for iOS to [3.0.4](https://github.com/intercom/intercom-ios/releases/tag/3.0.4).
* Fixed [#64](https://github.com/intercom/intercom-cordova/issues/64).
* Changed minimum Cordova version to 4.0.0.

# 3.0.2 (2016-07-27)

* Fixed [#63](https://github.com/intercom/intercom-cordova/issues/63).

# 3.0.1 (2016-07-27)

* Fixed Android build error.

# 3.0.0 (2016-07-26)

Where is 2.x? We're skipping it. We did this to align the Cordova plugin with our iOS, Android and web counter parts.

Our new Messenger is out of beta! 🎉 You can read all about the updated design and new functionality [here](https://www.intercom.io/in-app-messaging).

* Updated Intercom for iOS to [3.0.3](https://github.com/intercom/intercom-ios/releases/tag/3.0.3).
* Updated Intercom for Android to [3.0.2](https://github.com/intercom/intercom-android/releases/tag/3.0.2).

Added the following methods:
* `intercom.displayMessenger()`
* `intercom.setLauncherVisibility(visibility)`
* `intercom.setInAppMessageVisibility(visibility)`
* `intercom.unreadConversationCount()`

Removed these methods:
* `intercom.setVisibility(visibility)`
* `intercom.setupGCM()`
* `intercom.openGCMMessage()`
* `intercom.setupAPN(token)`
* `intercom.setPreviewPosition(position)`
* `intercom.setPreviewPadding()`

# 1.1.7 (2016-06-02)

* Fixed Android crash reported in [#55](https://github.com/intercom/intercom-cordova/issues/55).

# 1.1.6 (2016-05-25)

* Updated Intercom for iOS to [2.3.21](https://github.com/intercom/intercom-ios/releases/tag/2.3.21).

# 1.1.5 (2016-04-11)

* Fixed Cordova CLI 6.1.1 compatibility. Fixes [#48](https://github.com/intercom/intercom-cordova/issues/48).
* Updated Intercom for iOS to [2.3.19](https://github.com/intercom/intercom-ios/releases/tag/2.3.19).

## 1.1.4 (2016-01-11)

* Updated Google Play Services for compatibility with other plugins. Fixes [#31](https://github.com/intercom/intercom-cordova/issues/31).

## 1.1.3 (2015-10-08)

* Updated Intercom for iOS to [2.3.18](https://github.com/intercom/intercom-ios/releases/tag/2.3.18).
* Updated Intercom for Android to [1.1.+](https://github.com/intercom/intercom-android/releases/).

## 1.1.2 (2015-10-08)

* Updated Intercom for iOS to [2.3.11](https://github.com/intercom/intercom-ios/releases/tag/2.3.11).

## 1.1.1 (2015-10-01)

* Updated Intercom for iOS to [2.3.10](https://github.com/intercom/intercom-ios/releases/tag/2.3.10).
* Updated Intercom for Android to [1.1.7](https://github.com/intercom/intercom-android/blob/master/CHANGELOG.md).
* Improved handling of Android dependencies to reduce `Multiple dex files` errors.

## 1.1.0 (2015-09-21)

* Updated Intercom for iOS to [2.3.5](https://github.com/intercom/intercom-ios/releases/tag/2.3.5).
* Updated Intercom for Android to [1.1.4](https://github.com/intercom/intercom-android/blob/master/CHANGELOG.md).
* App ID and API keys are now configurable in your `config.xml` (fixes https://github.com/intercom/intercom-cordova/issues/1).

## 1.0.9 (2015-09-11)

* Updated Intercom for iOS to [2.3.4](https://github.com/intercom/intercom-ios/releases/tag/2.3.4).
* Fixed https://github.com/intercom/intercom-cordova/issues/20.

## 1.0.8 (2015-08-18)

* Updated Intercom for iOS to [2.3.3](https://github.com/intercom/intercom-ios/releases/tag/2.3.3).

## 1.0.7 (2015-08-05)

* Updated Intercom for iOS to [2.3.2](https://github.com/intercom/intercom-ios/releases/tag/2.3.2).

## 1.0.6 (2015-07-28)

* Updated Intercom for Android to [1.1.3](https://github.com/intercom/intercom-android/blob/master/CHANGELOG.md).

## 1.0.5 (2015-07-20)

* Updated Intercom for iOS to [2.3.1](https://github.com/intercom/intercom-ios/blob/master/CHANGES) and updated Intercom for Android to [1.1.2](https://github.com/intercom/intercom-android/blob/master/CHANGELOG.md).
* The plugin is now available through npm.

## 1.0.2 (2015-07-01)

* Updated Intercom for iOS to [2.3.0](https://github.com/intercom/intercom-ios/blob/master/CHANGES) and updated Intercom for Android to [1.1.1](https://github.com/intercom/intercom-android/blob/master/CHANGELOG.md).
* Fixed https://github.com/intercom/intercom-cordova/issues/5 and https://github.com/intercom/intercom-cordova/issues/7

## 1.0.1 (2015-06-05)

* Improved push notification handling by introducing much simpler `intercom.registerForPush(senderId)`.
* Updated Intercom for iOS to 2.2.4 and updated Intercom for Android to 1.0.3.

## 1.0.0 (2015-05-25)

* Initial release of the Intercom plugin for Cordova and PhoneGap.
