module.exports = function(ctx) {
    // make sure android platform is part of build
    if (ctx.opts.cordova.platforms.indexOf('android') < 0) {
        return;
    }

    var fs = ctx.requireCordovaModule('fs'),
        path = ctx.requireCordovaModule('path'),
        os = require("os"),
        readline = require("readline"),
        deferral = ctx.requireCordovaModule('q').defer();

    var settingsFile = path.join(ctx.opts.projectRoot, 'google-services.json');

    fs.stat(settingsFile, function(err,stats) {
        if (err) {
            console.log("Intercom: If you wish to use FCM push notifications, you'll need to add a google-services.json file with the FCM project_info and place that into your project's root folder");
            deferral.resolve();
        } else {
            var stream = fs.createReadStream(settingsFile).pipe(fs.createWriteStream('platforms/android/google-services.json'));
            stream.on('finish', deferral.resolve);
        }
    });
    return deferral.promise;
};
