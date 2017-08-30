module.exports = function(context) {
  var Q = context.requireCordovaModule('q');
  var deferral = new Q.defer();
  var exec = context.requireCordovaModule('child_process').exec;
  
  console.log('Updating CocoaPods specs repo');
  exec('pod repo update master', function(error, stdout, stderr) {
    deferral.resolve();
  });

  return deferral.promise;
}
