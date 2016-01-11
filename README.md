# Intercom for Cordova/PhoneGap

This is a plugin that allows your Cordova or PhoneGap app to use [Intercom for iOS](https://github.com/intercom/intercom-ios) and/or [Intercom for Android](https://github.com/intercom/intercom-android).

## Requirements

Intercom for iOS supports iOS 7.x, iOS 8.x and iOS 9.x. Intercom for Android fully supports API 15 and above but can be integrated in app with API 9 (devices below API 15 will have no Intercom functionality).

## Installation

### Cordova

To install the plugin in your Cordova app, run the following:

    cordova plugin add cordova-plugin-intercom

### PhoneGap

To add the plugin to your PhoneGap app, add the following to your `config.xml`:

    <plugin name="cordova-plugin-intercom" version="~1.1.4" />
    
## Configuring Intercom

To use Intercom, you must add your app's keys to your `config.xml`:

    <preference name="intercom-app-id" value="your_app_id"/>
    <preference name="intercom-ios-api-key" value="ios_sdk-..."/>
    <preference name="intercom-android-api-key" value="android_sdk-..."/>

If your app doesn't support iOS or Android, you can omit that API key.

## Troubleshooting

### Android Dex errors

Some users experience Android build errors similar to the following:

```
UNEXPECTED TOP-LEVEL EXCEPTION:
    com.android.dex.DexException: Multiple dex files define Landroid/support/annotation/AnimRes;
    ...
```

If you are seeing errors like these it means that another plugin you are using is including Google Play Services or the Android Support library in an outdated way (usually by copying a jar). We recommend you suggest to the plugin vendor that they require this via a `<framework>` tag or Gradle instead.

## How should I use Intercom in my mobile app?

Broadly speaking, there are three types of apps that Intercom for mobile will work in.

1. Apps that only have registered users, like Facebook, Instagram or Slack. Your users have to log in straight away in order to use your app. [Show me how.](https://github.com/intercom/intercom-cordova#my-app-only-has-logged-in-users)
2. Apps that never log users in, like Threes Game or Angry Birds or the iOS Notes app. Your users never have to log in to use your app. [Show me how.](https://github.com/intercom/intercom-cordova#my-apps-users-never-log-in)
3. Apps that support both logged in and logged out users, like Google Maps or Youtube. [Show me how.](https://github.com/intercom/intercom-cordova#my-app-has-logged-in-and-logged-out-users)

### My app only has logged in users

1. Firstly, on successful completion of login you will need to register your user.

        function successfulLogin() {
            ...
            // Registering with Intercom is easy. For best results, use a unique user_id if you have one.
            intercom.registerIdentifiedUser({userId: "123456"});
        }

**Note:** _If you don't have a unique `userId` to use here, or if you have a `userId` and an `email` you can register with those too, by calling `intercom.registerIdentifiedUser({email: "alice@example.com"})` or `intercom.registerIdentifiedUser({email:"alice@example.com", userId: "123456"})`_

2. Also, in your app's `onDeviceReady` function (or wherever you _check_ your user's authenticated state when your app starts up) 

        onDeviceReady: function() {
            if(loggedIn){
                ...
                // We're logged in, we can register the user with Intercom
                intercom.registerIdentifiedUser({userId: "123456"});
                
                // Carry on as normal
                ...
            }
        }
        
3. Finally, when users eventually want to log out of your app, we should clear Intercom's local caches so that when they log back in again, everything works perfectly. In your logout code, simply call `intercom.reset();` like so:

        function logout() {
            ...
            // This resets the Intercom integration's cache of your user's identity and wipes the slate clean.
            intercom.reset();
        }

### My apps users never log in

1. If you only have unidentifed users in your app then your integration is only one line. Just register an unidentified user in when your app starts up, like so:

        onDeviceReady: function() {
            ...
            // This registers an unidentifed user with Intercom.
            intercom.registerUnidentifiedUser();
            ...
        }
        
Because Intercom listens for life cycle events, there is no need to have this line of code anywhere else. Intercom will track all of your user sessions for you.

### My app has logged in and logged out users

1. Firstly, on successful completion of login you will need to register your user.

        function successfulLogin() {
            ...
            // Registering with Intercom is easy. For best results, use a unique user_id if you have one.
            intercom.registerIdentifiedUser({userId: "123456"});
        }

**Note:** _If you don't have a unique `userId` to use here, or if you have a `userId` and an `email` you can register with those too, by calling `intercom.registerIdentifiedUser({email: "alice@example.com"})` or `intercom.registerIdentifiedUser({email:"alice@example.com", userId: "123456"})`_

2. Also, in your app's `onDeviceReady` function (or wherever you _check_ your user's authenticated state when your app starts up) 

        onDeviceReady: function() {
            if(loggedIn){
                ...
                // We're logged in, we can register the user with Intercom
                intercom.registerIdentifiedUser({userId: "123456"});
                ...
            } else {
                ...
                intercom.registerUnidentifiedUser();
                ...
            }
        }
        
3. Finally, when users eventually want to log out of your app, we should clear Intercom's local caches so that when they log back in again, everything works perfectly. In your logout code, simply call `intercom.reset();` like so:

        function logout() {
            ...
            // This resets the Intercom integration's cache of your user's identity and wipes the slate clean.
            intercom.reset();

            // Now that you have logged your user out and reset, you can register a new
            // unidentified user in their place.
            intercom.registerUnidentifiedUser();
        }


### Tips on getting the best out of the Intercom in your mobile app

1.  **Do not use an email address as a `userId` as this field is unique and cannot be changed or updated later.** If you only have an `email` address, you can just register a user with that by calling `intercom.registerIdentifiedUser({email: "alice@example.com"})`.
2. Intercom for mobile listens for when your app starts and stops, so all you need to do is register a type of user like the examples above and we'll do the rest.
 
## How does the in-app messenger work?

Intercom allows you to send messages to your users while also enabling your users send messages to you. If you have a dedicated button in your app that you wish to hook the new message composer up to, you can control Intercom's messaging UI via the `intercom.displayMessageComposer();` and `intercom.displayConversationsList();` methods.

The position of the message preview can be configured using `intercom.setPreviewPosition(intercom.BOTTOM_RIGHT);`. The possible values are `intercom.BOTTOM_LEFT`, `intercom.BOTTOM_RIGHT`, `intercom.TOP_RIGHT` and `intercom.TOP_LEFT`.

If there is an area of your app where you do not wish your users to receive Intercom messages, you can call `intercom.setVisibility(intercom.GONE);`. To re-enable messages, call `intercom.setVisibility(intercom.VISIBLE);`.

## Updating a user

Attributes such as the user email or a user's name can be updated by calling:

    intercom.updateUser({ email: "joe@example.com", name: @"Joe" });
    
Details of the attributes that can be updated are available [here](https://doc.intercom.io/api/#user-model).

Custom user attributes can be created and modified by passing a custom_attributes dictionary You do not have to create attributes in Intercom beforehand.

    intercom.updateUser({
        custom_attributes: {
            paid_subscriber : true,
            monthly_spend: 155.5,
            team_mates: 3
        }
    });

## Events

You can log events in Intercom based on user actions in your app. Events are different to custom user attributes in that events are information on what Users did and when they did it, whereas custom user attributes represent the User's current state as seen in their profile. See details about Events [here](http://doc.intercom.io/api/#events).

    intercom.logEvent("ordered_item");

Events can optionally include meta data:

    intercom.logEvent("ordered_item", {
        order_date: 1392036272,
        stripe_invoice: "inv_3434343434",
        order_number: 123
        value: "3434-3434",
        url: "https://example.org/orders/3434-3434"
    });

## Push notifications

Intercom for mobile supports Push Notifications on iOS and Google Cloud Messaging (GCM). To get started, you can read our GCM docs [here](http://docs.intercom.io/Install-on-your-mobile-product/using-google-cloud-messaging-gcm-with-intercom-for-android) and our iOS push notification docs [here](http://docs.intercom.io/Install-on-your-mobile-product/enabling-push-notifications-with-intercom-for-ios).

To enable iOS push notifications, simply call `intercom.registerForPush()`.

To enable Android push notifications, call `intercom.registerForPush('sender_id')`. Where `sender_id` is your [Sender ID](https://developers.google.com/cloud-messaging/gcm#senderid) from the Google Developer Console.

**Note:** _If you use [phonegap-plugin-push](https://github.com/phonegap/phonegap-plugin-push) to support non Intercom push notifications in addition to Intercom's notifications, you must use our fork which is available [here](https://github.com/intercom/phonegap-plugin-push). Install it with: `cordova plugin add https://github.com/intercom/phonegap-plugin-push.git`. We know this is not ideal but unfortunately it is necessary due to the inflexible nature of PushPlugin._

## More information

You can find more detailed documentation about Intercom for mobile [here](http://docs.intercom.io/Install-on-your-mobile-product).

## Thanks

Thanks to [Josh Dover](https://github.com/joshdover) from [AskU](http://www.asku.co/) for making a Cordova plugin for Intercom for iOS which helped lots of people to integrate Intercom in their iOS Cordova apps.

## License

intercom-cordova is released under the [MIT License](http://www.opensource.org/licenses/MIT).

## Copyright

Copyright (c) 2015, Inc.  All rights reserved.
