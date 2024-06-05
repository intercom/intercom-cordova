clear
jenv global 17.0.11
export ANDROID_SDK_ROOT=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools
cd Example
cordova plugin remove cordova-plugin-intercom
cordova plugin add ../intercom-plugin
cordova platform remove android
cordova platform add android@13.0.0 --save
cordova run android --stacktrace
