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
            fs.createReadStream(settingsFile).pipe(fs.createWriteStream('platforms/android/google-services.json'));

            var lineReader = readline.createInterface({
                terminal: false,
                input : fs.createReadStream('platforms/android/build.gradle')
            });
            var classPathCount = 0;
            lineReader.on("line", function(line) {
                fs.appendFileSync('./build.gradle.tmp', line.toString() + os.EOL);
                if (/.*\ dependencies \{.*/.test(line)) {
                    fs.appendFileSync('./build.gradle.tmp', '\t\tclasspath "com.google.gms:google-services:3.0.0"' + os.EOL);
                } else if (/.*classpath( |\t)+(\"|')com.google.gms:google-services:.*/.test(line)) {
                    classPathCount = classPathCount + 1;
                }
            }).on("close", function () {
                if (classPathCount == 0) {
                    fs.rename('./build.gradle.tmp', 'platforms/android/build.gradle', deferral.resolve);
                } else {
                    fs.unlink('./build.gradle.tmp', deferral.resolve)
                }
            });
        }
    });
    return deferral.promise;
};
