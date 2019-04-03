var Q = require('q');
var exec = require('child_process').exec;

module.exports = function(context) {
  var deferral = new Q.defer();
  
  console.log('Updating CocoaPods specs repo');
  exec('pod repo update master', function(error, stdout, stderr) {
    deferral.resolve();
  });

  return deferral.promise;
}
