clear
export ANDROID_SDK_ROOT=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_SDK_ROOT}/tools
export PATH=${PATH}:${ANDROID_SDK_ROOT}/platform-tools
cd Example
cordova plugin remove cordova-plugin-intercom
cordova plugin add ../intercom-plugin
cordova platform remove android
cordova platform add android@15.0.0 --save
cordova run android --stacktrace