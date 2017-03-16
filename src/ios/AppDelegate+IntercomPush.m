#import "AppDelegate+IntercomPush.h"
#import <Intercom/Intercom.h>
#import <objc/runtime.h>

@implementation AppDelegate (IntercomPush)

+ (void)load {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        [self swizzleDidRegisterForRemoteNotification];
        [self swizzlePushPlugin];
    });
}

+ (void)swizzleDidRegisterForRemoteNotification {
    __block Class originalClass = [AppDelegate class];
    if (!originalClass) {
        return;
    }
    
    SEL originalSelector = @selector(application:didRegisterForRemoteNotificationsWithDeviceToken:);
    __block IMP originalImp = NULL;
    
    //Replacement IMP for original method
    IMP replacement = imp_implementationWithBlock(^void (id _self, UIApplication *application, NSData *deviceToken) {
        [Intercom setDeviceToken:deviceToken];
        
        //perform host app push logic here
        if (originalImp != NULL) {
            ((void(*)(id, SEL, UIApplication *, NSData *))originalImp)(_self, _cmd, application, deviceToken);
        }
    });
    
    //Swizzling
    Method method = class_getInstanceMethod(originalClass, originalSelector);
    if (method) {
        const char *type = method_getTypeEncoding(method);
        originalImp = class_replaceMethod(originalClass, originalSelector, replacement, type);
        if (!originalImp) {
            originalImp = method_getImplementation(method);
        }
    } else {
        class_addMethod(originalClass, originalSelector, replacement, "v@:@@");
    }
}

#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wundeclared-selector"
+ (void)swizzlePushPlugin {
    __block Class originalClass = [self class];
    if (!originalClass) {
        return;
    }
    
    SEL originalSelector = @selector(setLaunchNotification:);
    __block IMP originalImp = NULL;
    
    //Replacement IMP for original method
    IMP replacement = imp_implementationWithBlock(^void (id _self, NSDictionary *launchNotification) {
        if (launchNotification && [Intercom isIntercomPushNotification:launchNotification]) {
            [Intercom handleIntercomPushNotification:launchNotification];
        } else if (originalImp != NULL) {
            ((void(*)(id, SEL, NSDictionary *))originalImp)(_self, _cmd, launchNotification);
        }
    });
    
    //Swizzling
    Method method = class_getInstanceMethod(originalClass, originalSelector);
    if (method) {
        const char *type = method_getTypeEncoding(method);
        originalImp = class_replaceMethod(originalClass, originalSelector, replacement, type);
        if (!originalImp) {
            originalImp = method_getImplementation(method);
        }
    }
}
#pragma clang diagnostic pop

@end
