# Example Cordova app

This is a simple Cordova app with an Intercom integration.

## Installing the Cordova CLI

To install Cordova, run the following from your command line:

```
npm install -g cordova
npm install -g ios-sim
```

## Configuration

Before you run your app, you'll need to add your Intercom **AppID** and **API Key** to `config.xml` for both Android and/or iOS.
```xml
<preference name="intercom-app-id" value="YOUR_APP_ID"/>
<preference name="intercom-ios-api-key" value="YOU_IOS_API_KEY"/>
<preference name="intercom-android-api-key" value="YOUR_ANDROID_API_KEY"/>
```

If you want to enable Android FCM push notifications copy your `google-services.json` file into the `Example/` folder add this line to `config.xml`:
```xml
<preference name="intercom-android-push-type" value="FCM"/>
```

If you want to enable Android GCM push notifications add these lines to `config.xml`, with your own sender_id:
```xml
<preference name="intercom-android-sender-id" value="YOUR_ANDROID_SENDER_ID"/>
<preference name="intercom-android-push-type" value="GCM"/>
```

## Running the app

To get started, add your platform(s) of choice:

```
cordova platform add ios
cordova platform add android
```

Now you can install the Intercom plugin:

```
cordova plugin add cordova-plugin-intercom
```
You can now run your app with the following command:
#### iOS
```
cordova run ios
```
### Android
```
cordova run android
```
