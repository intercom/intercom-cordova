const fs = require('fs');
const path = require('path');

module.exports = function (context) {
    const platformRoot = path.join(context.opts.projectRoot, 'platforms/ios');
    const projectPbxproj = path.join(platformRoot, 'CordovaLib', 'CordovaLib.xcodeproj', 'project.pbxproj');

    if (fs.existsSync(projectPbxproj)) {
        let contents = fs.readFileSync(projectPbxproj, 'utf8');

        // Update deployment target
        contents = contents.replace(/IPHONEOS_DEPLOYMENT_TARGET = 11\.0;/g, 'IPHONEOS_DEPLOYMENT_TARGET = 15.0;');

        fs.writeFileSync(projectPbxproj, contents, 'utf8');
        console.log('Updated CordovaLib deployment target to iOS 15.0');
    }
};