var crypto = require('crypto');
var execFileSync = require('child_process').execFileSync;
var fs = require('fs');
var os = require('os');
var path = require('path');

// The Intercom pod is no longer published to the CocoaPods trunk; fetch the GitHub release instead.
var VERSION = '19.9.2';
var SHA256 = '6af284508f58de833313b263f3d82eaebc255c4d9a56ad9adf2fc6af4228c0f4';
var RELEASE_URL = 'https://github.com/intercom/intercom-ios/releases/download/' + VERSION + '/Intercom.xcframework.zip';

function cacheDir() {
  return process.env.INTERCOM_IOS_SDK_CACHE_DIR || path.join(os.homedir(), 'Library', 'Caches', 'cordova-plugin-intercom');
}

function sha256(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function cachedZip() {
  var zipPath = path.join(cacheDir(), VERSION, 'Intercom.xcframework.zip');
  if (fs.existsSync(zipPath) && sha256(zipPath) === SHA256) {
    return zipPath;
  }

  var downloadPath = zipPath + '.download';
  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  console.log('[Intercom] Downloading the Intercom iOS SDK ' + VERSION + ' from ' + RELEASE_URL);
  try {
    execFileSync('curl', ['--fail', '--silent', '--show-error', '--location', '--retry', '3', '--output', downloadPath, RELEASE_URL], { stdio: 'inherit' });
  } catch (error) {
    fs.rmSync(downloadPath, { force: true });
    throw new Error('[Intercom] Could not download ' + RELEASE_URL + '. Check your network, or place the zip at ' + zipPath +
      ' (set INTERCOM_IOS_SDK_CACHE_DIR to use another cache directory).');
  }

  var actual = sha256(downloadPath);
  if (actual !== SHA256) {
    fs.rmSync(downloadPath, { force: true });
    throw new Error('[Intercom] Checksum mismatch for ' + RELEASE_URL + ': expected ' + SHA256 + ', got ' + actual + '.');
  }
  fs.renameSync(downloadPath, zipPath);
  return zipPath;
}

module.exports = function (context) {
  var frameworkPath = path.join(context.opts.plugin.dir, 'src', 'ios', 'Intercom.xcframework');
  if (fs.existsSync(path.join(frameworkPath, 'Info.plist'))) {
    return;
  }

  var zipPath = cachedZip();
  var tmp = fs.mkdtempSync(path.join(path.dirname(frameworkPath), 'extract-'));
  try {
    execFileSync('unzip', ['-q', zipPath, '-d', tmp], { stdio: 'inherit' });
    fs.rmSync(frameworkPath, { recursive: true, force: true });
    fs.renameSync(path.join(tmp, 'Intercom.xcframework'), frameworkPath);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
};
