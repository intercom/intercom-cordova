var fs = require('fs');
var path = require('path');

var PLUGIN_ID = 'cordova-plugin-intercom';
var HEADER = 'IntercomLocationPermissionConfig.h';

function isEnabled(projectRoot) {
  try {
    var platformJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'plugins', 'ios.json'), 'utf8'));
    var variables = (platformJson.installed_plugins || {})[PLUGIN_ID] || (platformJson.dependent_plugins || {})[PLUGIN_ID] || {};
    return String(variables.IOS_LOCATION_PERMISSION).toLowerCase() === 'true';
  } catch (error) {
    return false;
  }
}

module.exports = function (context) {
  var projectRoot = context.opts.projectRoot;
  var iosDir = path.join(projectRoot, 'platforms', 'ios');
  if (!fs.existsSync(iosDir)) {
    return;
  }

  var contents = '#define INTERCOM_IOS_LOCATION_PERMISSION ' + (isEnabled(projectRoot) ? 1 : 0) + '\n';
  fs.readdirSync(iosDir).forEach(function (name) {
    var headerPath = path.join(iosDir, name, 'Plugins', PLUGIN_ID, HEADER);
    if (!fs.existsSync(headerPath) || fs.readFileSync(headerPath, 'utf8') === contents) {
      return;
    }
    // Replace rather than write in place, so a `--link` install doesn't edit the plugin's own copy.
    fs.rmSync(headerPath);
    fs.writeFileSync(headerPath, contents);
  });
};
