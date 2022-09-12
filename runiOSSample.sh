clear
cd Example
cordova plugin remove ../intercom-plugin
cordova plugin add ../intercom-plugin
cordova platform remove ios
cordova platform add ios --save
cordova run ios --stacktrace