# Intercom for Cordova/PhoneGap

## 13.0.0 (2022-09-13)
🚀  Enhancements
* Added support for iOS 16.
* Xcode 14 is required to build v13.0.0
* We have deprecated and removed an number of methods in this release. Please see our [v13.0.0 Migration Guide](https://developers.intercom.com/installing-intercom/docs/cordova-migrating-to-v1300) for further details on how to migrate to this version.
* Added new callback functionality to our `login`API methods. See our [Installation](https://developers.intercom.com/installing-intercom/docs/cordova-phonegap-installation) guide for usage details.
* Added new callback functionality to `updateUser` API method. See our [Configuration](https://developers.intercom.com/installing-intercom/docs/cordova-phonegap-configuration) guide for usage details.

## 12.1.0 (2022-06-01)
* The Intercom Cordova plugin has been updated to use the latest version of the Intercom's iOS SDK (v12.4.0) and Android SDK (v12.4.1)
* You can now display a Survey programmatically with `intercom.displaySurvey("12345")` 

## 12.0.0 (2022-03-30)
#### v12.0.0 of the Cordova plugin supports the latest version (12.0.0) of the Intercom mobile SDK.
##### 🚀 Enhancements

**In v12.0.0 of the Intercom mobile SDK, we’re introducing Intercom Surveys — beautiful native in-product surveys to bring all your customer communication to one platform!!**

![Intercom Surveys Introduction](https://user-images.githubusercontent.com/6392766/159682454-25995724-68f7-4201-a6c2-5b1bffe11ed1.png)

**📱 New feature: Intercom Surveys**

👋🏼  Meet Intercom Surveys - Don’t just ask their opinion, act on it. Now, you can seamlessly capture and act on customer feedback and needs, all within Intercom. Intercom Surveys makes it quick and easy to create and send highly targeted, easily customisable in-product native survey - across web and mobile. 

* Choose the relevant question type from multitude of question types available like rating scales (NPS, emoji, star), multiple-choice, dropdown and more
* Customise the color of your survey’s background and buttons 
* Target the right survey to the right audience at the right time
* Save survey responses as user attributes to drive follow up actions 
* Add a customisable intro and thank you message
* Decide whether or not users should be able to dismiss the survey
* Encourage further user actions by inserting a call-to-action button in the thank you message with a link (external URL or deep link)
* Leverage email and mobile push as fallback channels if in-product doesn’t get you a response
* Many more ways to customise your survey — show or hide avatar of survey sender, format survey text and insert user or company attributes in text
* Use the power of Intercom platform — A/B testing and control groups, goal tracking, orchestrating surveys as a part of series, analysing and exporting results as CSV

👉  You will need to start a 14 day free trial or purchase the Surveys Add-On starting from $49 per month in order to set a survey live 
👉  Upgrade to the latest version of the mobile SDK today to use the feature on mobile. No additional integration work required.

[Learn more about Intercom Surveys](https://www.intercom.com/surveys) 

https://user-images.githubusercontent.com/3718984/159649798-a255ab7a-df79-4015-875c-399872e6186c.mp4

https://user-images.githubusercontent.com/6392766/159682983-e13d3080-8025-4f90-9a75-14f41b81a5bc.mp4

## 11.0.0 (2022-01-13)
* The Intercom Cordova plugin has been updated to use the latest version of the Intercom iOS (v11.0.0) and Android SDK (v10.6.0)
* The minimum deployment version for iOS is now iOS 13.
* Using Intercom cordova plugin for the Android platform does not require jcenter 

## 10.2.0 (2021-09-28)
* The Intercom Cordova plugin has been updated to use the latest version of the Intercom iOS (v10.3.0) and Android SDK (v10.2.0)

Reduce customer inquiries for your team and provide faster resolutions for your customers – without sacrificing a great experience. We’ve redesigned our Messenger with an integrated help center experience that increases customer engagement by up to 3x to help you deliver the best self-serve support.

#####  Enhancements
* A new article search card on your Messenger’s home screen.
* There are now two conversation cards, just as with our web Messenger; one for existing and one for new conversations. This gives more emphasis to existing conversations, reducing the chance of duplicates being created.
* Optionally require specific customers to attempt to self-serve to answer their question before they can reach out to a teammate.
* Place the article search card at the top of the Messenger home screen to give your self-serve content more prominence.
* Uncover insights and opportunities to optimize your self-serve support by using our updated Articles reporting.
* A number of improvements for accessibility features in the Messenger, with more coming in future updates.
* If you’ve set a custom icon for the Intercom launcher, that icon will now be used in your app as well.
* Support for iOS 15 is also included in this release.

## 10.1.1 (2021-09-14)
* Include dependencies needed to make the Android version build

## 10.1.0 (2021-08-23)
* The Intercom Cordova plugin has been updated to use the latest version (v10.1.0) of the Intercom iOS and Android SDK
* Updated to cordova-android 10.0.0

## 10.0.0 (2021-06-29)
#### v10.0.0 of the Cordova plugin supports the latest version (10.0.1) of the Intercom mobile SDK.
##### Enhancements
* We have redesigned the Help Center for mobile apps. ✨
* New UI, optimized specifically for mobile apps and small screens
* Type-ahead search to help users find answers quicker than ever
* Control whether users open up a specific collection of articles, a group of collections, or specific search results
* Localization - with right to left language display
* Accessibility support: screen readers, dynamic font sizes, and keyboard navigation - to support all end users
* New Help Center Data API that enables you to build your own help center UI, enabling a much deeper and custom integration into your app.
##### Improvements and bug fixes
* Fixed an issue where the special notice message would not display.
* `hideMessenger()` has now been deprecated and removed. Please use `hideIntercom()` instead. This method will hide all Intercom UI in your app.

## 9.4.0 (2020-11-17)
* Updated both the Android and iOS SDK to 9.0.0
* On iOS, cocoapods 1.10 is required to install the iOS SDK correctly.

## 9.3.0 (2020-11-10)

* The Intercom Cordova plugin has been updated to use v8.3.0 of the Intercom Android SDK and v8.1.0 of the iOS SDK as the latest version.
* New feature: You can now open an article or Mobile Carousel programmatically in your app. We have added two new methods to our API to enable this, [displayArticle](https://developers.intercom.com/installing-intercom/docs/cordova-phonegap-configuration#section-present-an-article-programmatically) and [displayCarousel](https://developers.intercom.com/installing-intercom/docs/cordova-phonegap-configuration#section-present-a-carousel-programmatically).
* Updated to cordova-ios 6.1.1.

## 9.2.1 (2020-09-17)

* The Intercom Cordova plugin has been updated to use v8.2.0 of the Intercom Android SDK.
* The Intercom Cordova plugin has been updated to use v8.0.0 of the Intercom iOS SDK.

## 9.2.0 (2020-09-09)

* The Intercom Cordova plugin has been updated to use v8.1.0 of the Intercom Android SDK as the latest version.
* Fixed the Gradle [issue](https://community.intercom.com/t/cordova-android-9-and-cordova-intercom-9-1/2235) with enabling push notification

## 9.1.1 (2020-08-25)

* The Intercom Cordova plugin has been updated to use v8.0.0 of the Intercom Android SDK as the latest version.

## 9.1.0 (2020-07-20)

* The Cordova plugin has been updated to be compatible with v7.2.0 of the Android SDK and v9.0.0 of Cordova Android.
* v7.2.0 of the Android SDK now uses [Android X](https://developer.android.com/jetpack/androidx), and includes updates to the Gson and Firebase Messaging libraries it uses.
* In [Cordova Android v9.0.0](https://cordova.apache.org/announcements/2020/06/29/cordova-android-9.0.0.html), the minimum Android API level is now API 22 (Android 5.1). The Cordova plugin's minimum version is now API 22 as well.

## 9.0.1 (2020-07-08)

The Intercom Cordova plugin has been updated to use v7.1.1 of the iOS and Android SDK. We fixed a number of bugs in this release:

* Android:
  * **Fixed:** An issue where buttons on the Messenger conversation card were not fully visible on small devices.
  * **Fixed:** An issue where the conversation header wasn’t updates after a teammate reply.
* iOS:
  * **Improved:** If your app does not request location permissions, you will no longer have to add a location permission string to your PList when using the Intercom iOS SDK.

## 9.0.0 (2020-06-17)
**v9.0.0 of the Cordova plugin supports the latest version (7.1.0) of the Intercom mobile SDK. We’re introducing a fantastic new mobile engagement feature called Mobile Carousels. We’ve also added support for closed conversations, as well as a number of fixes and performance improvements.**

### 📱 New Feature: Mobile Carousels

Bring your best features. We'll bring the spotlight. Use [Mobile Carousels](https://intercom.com/mobile) to connect with app users at every touchpoint—show them around, provide support, and highlight features you know they'll love.

Mobile Carousels are a multi-screen message designed to feel right at home in your mobile app.

* Rich multi-screen messages.
* Highly customizable, right inside Intercom.
* Request device permissions like push notifications, camera, location and more.
* Deep link into your app, open URLs, or start conversations in the Intercom Messenger.
* Target the right message to the right audience.
* A/B testing and control groups.
* Goal tracking.
* Schedule your Mobile Carousel with ease.

Upgrade to the latest version of the plugin and mobile SDK today to use the feature. No additional integration work required.

### [Learn more about Mobile Carousels](https://www.intercom.com/mobile-carousels)

<a href="https://product-education.wistia.com/medias/4y7for3aya " target="_blank"><img  src="https://user-images.githubusercontent.com/3185423/84791321-5581cf00-afea-11ea-848e-d29fbd657e10.png"></a>

![Carousel - Made for mobile - Red](https://user-images.githubusercontent.com/3185423/84785788-ce315d00-afe3-11ea-9647-01792c698d05.png)

![anrdroid_standard](https://user-images.githubusercontent.com/3185423/84802829-0b541a00-aff9-11ea-9e7f-1613e8d7d369.gif)

![Carousel - Permissions - iOS - Yellow](https://user-images.githubusercontent.com/3185423/84785834-dee1d300-afe3-11ea-9c66-accbc6a93458.png)


### 📱 Closed Conversations

The mobile SDK now respects the `prevent replies to closed conversations` setting if you have it enabled. The text composer will be disabled for closed conversations, and your users will be able to start a new conversation if they need to. The UI updates in real time as the conversation takes place.

![Closed Conversation](https://user-images.githubusercontent.com/5046761/84785550-8579a400-afe3-11ea-978d-49cba15cf54c.gif)


### 📱 Improvements and bug fixes

We made a number of performance improvements and squashed a number of bugs in this release. This includes:

* Android:
  * **Improved:** The mobile SDK and its features now initialize and open more quickly.
  * **Improved:** More elegant image loading states.
  * **Fixed:** An issue where the composer occasionally failed to respect the ‘disable composer for inbound bots’ setting.
  * **Fixed:** A crash associated with certain colour customization settings.
  * **Fixed:** A java.lang.OutOfMemoryError crash.
  * **Fixed:** A ReactionInputView.highlightSelectedReaction > IndexOutOfBoundsException crash.
  * **Fixed:** An issue where file extensions were sometimes removed when uploading them.
  * **Fixed:** An issue where emoji reactions were sometimes rendered twice.
  * **Fixed:** An issue with overlapping text in the ‘Your conversations’ list in the Messenger home.
  * **Fixed:** An issue where an outbound message didn’t appear in real-time after changing the device orientation.
  * **Fixed:** An issue where custom bot failed to save custom attributes
  * **Fixed:** A crash with error java.lang.ArithmeticException divide by zero
  * **Removed:** The experimental API is no longer available.

* iOS:
  * **Improved:** The mobile SDK and its features now initialize and open more quickly.
  * **Improved:** More elegant image loading states.
  * **Improved:** Added support for pointers in iPadOS 13.4 and up.
  * **Improved:** Added support for Provisional Push Notifications
  * **Fixed:** An issue where Intercom was not relinquishing keyWindow status, causing problems with external keyboards and text input fields.
  * **Fixed:** An issue where the header background colour for articles was incorrect.
  * **Fixed:** A crash in iOS 13 when tapping close button after sending a reply to a conversation.
  * **Fixed:** A crash when exiting conversation before Operator has responded.
  * **Fixed:** An issue where conversations were marked as read when the app was in the background.
  * **Fixed:** An issue where some images were causing apps to crash during the upload process.

## 8.0.0 (2019-11-04)

* Upgraded to version 6.0.0 of the iOS and Android SDK.
* iOS 10 is now the minimum version of iOS that is supported by the Intercom iOS SDK.
* We have deprecated support for iOS 8 & 9.
* Android API level 21 (v5 - Lollipop) is now the minimum version of Android that is supported by the Intercom Android SDK.
* If your app still support API levels before 21 you'll need to bump minSdkVersion to 21 in order to use version 6+ of our SDK.

## 7.1.1 (2019-09-05)

* * The Intercom Cordova plugin has been updated to use v5.4.1 of the Intercom Android SDK as the latest version. This is because v5.5.0 of the Intercom Android SDK targets Android 10, which is currently unsupported by Cordova.

## 7.1.0 (2019-07-17)

* Updated to cordova-android 8.0.0 and cordova-ios 5.0.0
* Removed GCM as [Google has removed GCM](https://developers.google.com/cloud-messaging/faq)
* Updated Firebase version
* Updated our Example app to use the newer versions of Cordova
* Now using the latest versions of the Intercom [Android SDK](https://github.com/intercom/intercom-android/releases) and [iOS SDK](https://github.com/intercom/intercom-android/releases) with support for Custom Bots!

## 7.0.0 (2019-06-20)

* Cordova 9 support

## 6.2.0 (2018-12-18)

* Support sending a push token to Intercom manually with the addition of the method `sendPushTokenToIntercom`

## 6.1.0 (2018-07-20)

**Enable mobile users to help themselves with the new mobile SDK for iOS and Android 🎉 😃**

The new Intercom mobile SDK brings the Messenger Home to your mobile applications. This means you can add messenger apps that allow your users to self-serve instead of starting a conversation. Users can now quickly access relevant help articles, review pinned content, and view product status in real time – all from the messenger home screen.

![android-release-screens](https://user-images.githubusercontent.com/2615468/42951497-316de29a-8b6e-11e8-8ed8-a0a3a93f6f4f.png)

![ios-release-screens](https://user-images.githubusercontent.com/3185423/42937925-71ab4b5c-8b48-11e8-913b-88d48c9b82f3.png)

**API changes**

* `displayConversationsList` - Use `displayMessenger` instead.

These deprecated methods will still work, but will be removed in a future release.

## 6.0.0 (2018-06-12)

The Business Messenger reimagined.

**Messenger apps**
* Complete actions beyond chat in the Messenger seamlessly with a growing library of apps. Messenger apps are being rolled out to all customers over the next 2 weeks.

**Extendable platform**
* Create your own Messenger apps to suit your unique workflows – and enable entirely new ones.

**Updated Design**
* Updated visual design with new wallpapers and expanded color settings.

**Messenger settings**
* New wallpapers to customize your profile.
* Set a background color for your profile and an action color for cards and chat bubbles.
* Support light theme colors in your messenger.

**Help Center**
* Added the method `displayHelpCenter()`. Calling this method in your app displays your Articles Help Center. Learn more about Articles [here](https://www.intercom.com/articles/features).

![5-0-0-android-release-screens](https://user-images.githubusercontent.com/2615468/39157445-befb7196-4752-11e8-8a33-57636975ecec.png)

![5-0-0-ios-release-screens](https://user-images.githubusercontent.com/3185423/39155559-6a3f239e-474a-11e8-8eb0-fdb0c69d288f.jpg)

## 5.1.1 (2018-02-26)

* Include FCM libraries when building without build plugin [#257](https://github.com/intercom/intercom-cordova/pull/257)

## 5.1.0 (2018-02-26)

* Created fork of `phonegap-plugin-push` to allow it to work with this plugin: https://github.com/intercom/phonegap-plugin-push
* Allow FCM notifications without applying build plugin [#253](https://github.com/intercom/intercom-cordova/pull/253)
* Update recommended build tool & library versions [#252](https://github.com/intercom/intercom-cordova/pull/252)
* Remove broken support for multiple GCM libraries [#251](https://github.com/intercom/intercom-cordova/pull/251)
* Fix GCM sender ID reading [#250](https://github.com/intercom/intercom-cordova/pull/250)
* Change hook for checkForUpdate to be after_prepare [#249](https://github.com/intercom/intercom-cordova/pull/249)

## 5.0.2 (2018-02-12)

* Fix issue with Intercom pod not being updated / installed when GitHub response was not 200 OK: [#246](https://github.com/intercom/intercom-cordova/pull/246)

## 5.0.1 (2018-01-23)

* Removes dependency on `PackageManager.GET_META_DATA`, which Cordova does not appear to generate any longer for new projects: [#239](https://github.com/intercom/intercom-cordova/issues/239).

## 5.0.0 (2018-01-22)

* Supports `cordova-android` 7.0.0, the default Android build version when using `cordova-cli` 8.0.0, though it may also be specified on earlier versions (tested on [Cordova 7.1.0](https://github.com/apache/cordova-cli/releases/tag/7.1.0))

* Deprecates GCM as a push type in favor of FCM. This includes removing the ability to specify a GCM/FCM sender id directly from config.xml. To use push on Android, adding your google-services.json to the root of your project is now required.

* Per the [`cordova-android` 7.0.0 release notes](cordova.apache.org/announcements/2017/12/04/cordova-android-7.0.0.html), the minimum Android API version supported is now API Level 19.

---

Update guide:

1. If you have not already done so, update your `cordova-cli`:
    ```
    npm install -g cordova
    cd my_project
    cordova platform remove android
    cordova platform add android@7.0.0
    ```
2. Update `plugin-cordova-intercom`:
    ```
    cordova plugin remove cordova-plugin-intercom
    cordova plugin add cordova-plugin-intercom
    ```
3. Ensure your config.xml specifies an android-minSdkVersion at or above 19:
    * `<preference name="android-minSdkVersion" value="19" />`
4. To use push on Android:
    * Ensure you've added `<preference name="intercom-android-push-type" value="FCM"/>` to your config.xml
    * Copy your FCM `google-services.json` file to the root directory of your project.

_NB: The above steps may not be exhaustive and are dependent on your app and system Cordova configuration_

## 4.1.2 (2017-11-16)

* Further fixes to issue with diagnostic messages on Android: [#219](https://github.com/intercom/intercom-cordova/issues/219).

## 4.1.1 (2017-11-15)

* Fixed issue with diagnostic messages on Android: [#219](https://github.com/intercom/intercom-cordova/issues/219).

## 4.1.0 (2017-11-02)

* Updated Intercom for Android to 4.1.x
* Updated Intercom for iOS to 4.1.x
* Added `intercom.logout()`.
* Added diagnostic messages for Android build errors.

## 4.0.0 (2017-08-29)

* Updated Intercom for Android to 4.0.1
* Updated Intercom for iOS to 4.0.1
* Removed deprecated method `intercom.setSecureMode(hmac, data)`.
* Added support for iOS 11.
* Added support for Android Oreo.
* Updated GCM & FCM to version 11.

## 3.2.2 (2017-05-17)

* Prevent unsafe versions of the Support Library being used to fix [#182](https://github.com/intercom/intercom-cordova/issues/182).

## 3.2.1 (2017-05-03)

* Fixed build error reported in [#180](https://github.com/intercom/intercom-cordova/issues/180).

## 3.2.0 (2017-04-21)

* Added a new method to the API `intercom.setUserHash(userHash)` to support Identity Verification. This method replaces `intercom.setSecureMode(hmac, data)` which was used for our previous security feature Secure Mode.
* Updated Intercom for Android to 3.2.x.
* Updated Intercom for iOS to 3.2.x.

## 3.1.3 (2017-04-05)

* Added hook to ensure the local CocoaPods specs repo is up to date when installing the plugin (see [#170](https://github.com/intercom/intercom-cordova/pull/170)).

## 3.1.2 (2017-03-31)

* Fixed compatibility with other Android GCM providers (details are outlined in [#166](https://github.com/intercom/intercom-cordova/pull/166)). It is no longer necessary to use a fork of `phonegap-plugin-push`.
* Added hook to automatically update Intercom for iOS via CocoaPods (see [#168](https://github.com/intercom/intercom-cordova/pull/168)).

## 3.1.1 (2017-03-16)

* Removed reliance on hooks for Android FCM support. Gradle is now used for the whole process.
* Improved iOS interoperability with `phonegap-plugin-push` (Fixes [#154](https://github.com/intercom/intercom-cordova/issues/154)).
* Automatically add `remote-notification` background mode to the app's `Info.plist` on iOS.
* Updated minimum Intercom for iOS version to [3.1.2](https://github.com/intercom/intercom-ios/releases/tag/3.1.2).

## 3.1.0 (2017-03-10)

* Updated Intercom for Android to [3.1.x](https://github.com/intercom/intercom-android/releases/).
* FCM push notifications for Android are now supported. This can be configured by specifying `intercom-android-push-type` in your `config.xml`.
* Updated Intercom for iOS to [3.1.x](https://github.com/intercom/intercom-ios/releases/).
* Intercom for iOS is now installed via CocoaPods, so updates can be received automatically.

## 3.0.26 (2016-01-25)

* Updated Intercom for Android to [3.0.20](https://github.com/intercom/intercom-android/releases/tag/3.0.20).
* Updated Intercom for iOS to [3.0.24](https://github.com/intercom/intercom-android/releases/tag/3.0.24).

## 3.0.25 (2016-01-20)

* Updated Intercom for Android to [3.0.19](https://github.com/intercom/intercom-android/releases/tag/3.0.19).
* Updated Intercom for iOS to [3.0.23](https://github.com/intercom/intercom-android/releases/tag/3.0.23).

## 3.0.24 (2016-01-16)

* Updated Intercom for Android to [3.0.18](https://github.com/intercom/intercom-android/releases/tag/3.0.18).

## 3.0.23 (2016-12-22)

* Updated Intercom to provide support for Ionic 2.

## 3.0.22 (2016-12-19)

* Updated Intercom for iOS to [3.0.22](https://github.com/intercom/intercom-android/releases/tag/3.0.22).
* Updated Intercom for Android to [3.0.17](https://github.com/intercom/intercom-android/releases/tag/3.0.17).

## 3.0.21 (2016-12-14)

* Updated Intercom for Android to [3.0.16](https://github.com/intercom/intercom-android/releases/tag/3.0.16).

## 3.0.20 (2016-12-06)

* Now supports Intercom Educate. Learn more [here](https://www.intercom.com/customer-support-software/knowledge-base).
* Updated Intercom for iOS to [3.0.21](https://github.com/intercom/intercom-android/releases/tag/3.0.21).
* Updated Intercom for Android to [3.0.15](https://github.com/intercom/intercom-android/releases/tag/3.0.15).

## 3.0.19 (2016-11-21)

* Improved initialization process for Android.

## 3.0.18 (2016-11-18)

* Updated Intercom for iOS to [3.0.19](https://github.com/intercom/intercom-android/releases/tag/3.0.19).
* Updated Intercom for Android to [3.0.13](https://github.com/intercom/intercom-android/releases/tag/3.0.13).

## 3.0.17 (2016-11-10)

* Updated Intercom for Android to [3.0.12](https://github.com/intercom/intercom-android/releases/tag/3.0.12).
* Added NSPhotoLibraryUsageDescription to Info.plist for iOS

## 3.0.16 (2016-11-07)

* Updated Intercom for Android to [3.0.11](https://github.com/intercom/intercom-android/releases/tag/3.0.11).
* Updated Intercom for iOS to [3.0.18](https://github.com/intercom/intercom-ios/releases/tag/3.0.18).

## 3.0.15 (2016-10-19)

* Updated Intercom for iOS to [3.0.17](https://github.com/intercom/intercom-ios/releases/tag/3.0.17).

## 3.0.14 (2016-10-18)

* Updated Intercom for iOS to [3.0.16](https://github.com/intercom/intercom-ios/releases/tag/3.0.16).

## 3.0.13 (2016-10-12)

* Re-publish to npm to work around registry issue.

## 3.0.12 (2016-10-10)

* Added a new method `displayMessageComposerWithInitialMessage` which opens up the message composer and takes in a string to pre-populate the message composer with. Example usage `intercom.displayMessageComposerWithInitialMessage("Question asked from the FAQ page: ");`
* Updated Intercom for Android to [3.0.10](https://github.com/intercom/intercom-android/releases/tag/3.0.10).
* Updated Intercom for iOS to [3.0.13](https://github.com/intercom/intercom-ios/releases/tag/3.0.13).

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
