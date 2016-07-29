#import "AppDelegate+IntercomPush.h"
#import "Intercom.h"
#import <objc/runtime.h>

@implementation AppDelegate (IntercomPush)

+ (void)load {
    [self swizzleDidRegisterForRemoteNotification];
}

static void (*OriginalDidRegisterForRemoteNotification)(id, SEL, UIApplication *, NSData *);
+ (void)swizzleDidRegisterForRemoteNotification {
    //Initial class to swizzle
    __block Class originalClass = [AppDelegate class];
    if (!originalClass) {
        return;
    }
    
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        SEL originalSelector = @selector(application:didRegisterForRemoteNotificationsWithDeviceToken:);

        //Replacement IMP for original method
        IMP replacement = imp_implementationWithBlock(^void (id _self, UIApplication *application, NSData *deviceToken) {
            [Intercom setDeviceToken:deviceToken];
            
            //Call to original method
            if (*OriginalDidRegisterForRemoteNotification != NULL){
                OriginalDidRegisterForRemoteNotification(_self, _cmd, application, deviceToken);
            }
        });

        //Swizzling
        IMP *store = (IMP *) &OriginalDidRegisterForRemoteNotification;
        IMP originalImp = NULL;
        Method method = class_getInstanceMethod(originalClass, originalSelector);
        if (method) {
            const char *type = method_getTypeEncoding(method);
            originalImp = class_replaceMethod(originalClass, originalSelector, replacement, type);
            if (!originalImp) {
                originalImp = method_getImplementation(method);
            }
            if (originalImp && store) {
                *store = originalImp;
            }
        }else{
            *store = NULL;
            class_addMethod(originalClass, originalSelector, replacement, "v@:@@");
        }
    });
}

@end
