#import "IntercomLocationPermissionProvider.h"
#import "IntercomLocationPermissionConfig.h"
#import <Intercom/Intercom.h>

#if INTERCOM_IOS_LOCATION_PERMISSION
#import <CoreLocation/CoreLocation.h>

@interface IntercomLocationPermissionProvider : NSObject <ICMLocationPermissionProvider, CLLocationManagerDelegate>
@end

@implementation IntercomLocationPermissionProvider {
    CLLocationManager *_locationManager;
}

@synthesize authorizationStatusDidChange = _authorizationStatusDidChange;

- (instancetype)init {
    if ((self = [super init])) {
        _locationManager = [CLLocationManager new];
        _locationManager.delegate = self;
    }
    return self;
}

- (ICMLocationAuthorizationStatus)currentAuthorizationStatus {
    return (ICMLocationAuthorizationStatus)_locationManager.authorizationStatus;
}

- (void)requestWhenInUsePermission {
    [_locationManager requestWhenInUseAuthorization];
}

- (void)requestAlwaysPermission {
    [_locationManager requestAlwaysAuthorization];
}

- (void)locationManagerDidChangeAuthorization:(CLLocationManager *)manager {
    if (self.authorizationStatusDidChange) {
        self.authorizationStatusDidChange([self currentAuthorizationStatus]);
    }
}

@end
#endif

void IntercomSetUpLocationPermissionProvider(void) {
#if INTERCOM_IOS_LOCATION_PERMISSION
    [Intercom setLocationPermissionProvider:[IntercomLocationPermissionProvider new]];
#endif
}
