module.exports = function(ctx) {
    var fs = ctx.requireCordovaModule('fs'),
        path = ctx.requireCordovaModule('path'),
        deferral = ctx.requireCordovaModule('q').defer();

    var settingsFile = path.join(ctx.opts.projectRoot, 'google-services.json');
    fs.stat(settingsFile, function(err,stats) {
        if (err) {
            console.log("If you wish to use FCM push notifications with Intercom, you'll need to add a google-services.json file with the FCM project_info and place that into your project's root folder");
        } else {
            fs.createReadStream(settingsFile).pipe(fs.createWriteStream('platforms/android/google-services.json'));
        }
        deferral.resolve();
    });
    return deferral.promise;
};
