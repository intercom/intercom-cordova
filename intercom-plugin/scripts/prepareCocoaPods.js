module.exports = function(context) {
  var Q = context.require('q');
  var deferral = new Q.defer();
  var exec = context.require('child_process').exec;
  
  console.log('Updating CocoaPods specs repo');
  exec('pod repo update master', function(error, stdout, stderr) {
    deferral.resolve();
  });

  return deferral.promise;
}
