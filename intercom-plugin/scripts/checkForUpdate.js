var fs = require('fs');

function fetchUpdateInfo(callback) {
  var updateInfo = {
    releaseDate: 0,
    podUpdateDate: 0,
    lastCheckDate: 0
  };

  fs.readFile('platforms/ios/.intercom_update', 'utf8', function (err, data) {
    if (!err) {
      obj = JSON.parse(data);
      updateInfo.podUpdateDate = obj.podUpdateDate;
      updateInfo.releaseDate = obj.releaseDate;
      updateInfo.lastCheckDate = obj.lastCheckDate;
    }
    callback(updateInfo);
  });
}

function writeUpdateInfo(updateInfo, callback) {
  fs.writeFile('platforms/ios/.intercom_update', JSON.stringify(updateInfo), 'utf8', function (err,data) {
    callback();
  });
}

function updateIntercomIfNeeded(updateInfo, callback) {
  var exec = require('child_process').exec;
  var completion = function() {
    writeUpdateInfo(updateInfo, function() {
      callback();
    });
  };

  if (updateInfo.releaseDate > updateInfo.podUpdateDate) {
    console.log("Updating Intercom");
    exec('cd platforms/ios && pod update Intercom', function(error, stdout, stderr) {
      if (!error) {
        console.log(stdout);
        updateInfo.podUpdateDate = Date.now();
      }
      completion();
    });
  } else {
    completion();
  }
}

function fetchLatestRelease(callback) {
  var https = require('https');

  var req = https.get({
    headers: {
      accept: 'application/json',
      'User-Agent': 'Intercom-Cordova-Plugin'
    },
    host: 'api.github.com',
    path: '/repos/intercom/intercom-ios/releases/latest'
  }, function(response) {
    if (response.statusCode != 200) {
      callback(null);
      return;
    }

    var body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      var parsedResponse = JSON.parse(body);
      callback(parsedResponse);
    });
  });
  req.on('error', function(e) {
    callback(null);
  });
}

module.exports = function() {
  var q = require('q');
  var deferral = new q.defer();

  fetchUpdateInfo(function(updateInfo) {
    // Check at most once every 48 hours
    if (Date.now() - updateInfo.lastCheckDate > 1000 * 60 * 60 * 48) {
      fetchLatestRelease(function(releaseData) {
        updateInfo.lastCheckDate = Date.now();

        if (releaseData != null) {
          updateInfo.releaseDate = Date.parse(releaseData['published_at']);
        } else {
          // last release date is unavailable, set it to today so that the pod is installed
          updateInfo.releaseDate = Date.now();
        }

        updateIntercomIfNeeded(updateInfo, function() {
          deferral.resolve();
        });
      });
    } else {
      deferral.resolve();
    }
  });
  return deferral.promise;
}
