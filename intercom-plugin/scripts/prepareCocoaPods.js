module.exports = function() {
  var q = require('q');
  var exec = require('child_process').exec;

  var deferral = new q.defer();

  console.log('Updating CocoaPods specs repo');
  exec('pod repo update master', function(error, stdout, stderr) {
    deferral.resolve();
  });

  return deferral.promise;
}
