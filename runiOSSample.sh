clear
cd Example
cordova plugin remove cordova-plugin-intercom
cordova plugin add ../intercom-plugin --link
cordova platform remove ios
cordova platform add ios@7.1.1 --save
cordova run ios --stacktrace
