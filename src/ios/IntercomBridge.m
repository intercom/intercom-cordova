#import "IntercomBridge.h"
#import "AppDelegate+IntercomPush.h"
#import <Intercom/Intercom.h>

@interface Intercom (Cordoava)
+ (void)setCordovaVersion:(NSString *)v;
@end

@implementation IntercomBridge : CDVPlugin

- (void)pluginInitialize {
    [Intercom setCordovaVersion:@"3.2.2"];
    #ifdef DEBUG
        [Intercom enableLogging];
    #endif

    //Get app credentials from config.xml or the info.plist if they can't be found
    NSString* apiKey = self.commandDelegate.settings[@"intercom-ios-api-key"] ?: [[NSBundle mainBundle] objectForInfoDictionaryKey:@"IntercomApiKey"];
    NSString* appId = self.commandDelegate.settings[@"intercom-app-id"] ?: [[NSBundle mainBundle] objectForInfoDictionaryKey:@"IntercomAppId"];

    [Intercom setApiKey:apiKey forAppId:appId];
}

- (void)registerIdentifiedUser:(CDVInvokedUrlCommand*)command {
    NSDictionary* options = command.arguments[0];
    NSString* userId      = options[@"userId"];
    NSString* userEmail   = options[@"email"];

    if ([userId isKindOfClass:[NSNumber class]]) {
        userId = [(NSNumber *)userId stringValue];
    }

    if (userId.length > 0 && userEmail.length > 0) {
        [Intercom registerUserWithUserId:userId email:userEmail];
        [self sendSuccess:command];
    } else if (userId.length > 0) {
        [Intercom registerUserWithUserId:userId];
        [self sendSuccess:command];
    } else if (userEmail.length > 0) {
        [Intercom registerUserWithEmail:userEmail];
        [self sendSuccess:command];
    } else {
        NSLog(@"[Intercom-Cordova] ERROR - No user registered. You must supply an email, a userId or both");
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR]
                                    callbackId:command.callbackId];
    }
}

- (void)registerUnidentifiedUser:(CDVInvokedUrlCommand*)command {
    [Intercom registerUnidentifiedUser];
    [self sendSuccess:command];
}

- (void)reset:(CDVInvokedUrlCommand*)command {
    [Intercom reset];
    [self sendSuccess:command];
}

- (void)setSecureMode:(CDVInvokedUrlCommand*)command {
    NSString *hmac = command.arguments[0];
    NSString *data = command.arguments[1];

    [Intercom setHMAC:hmac data:data];
    [self sendSuccess:command];
}

- (void)setUserHash:(CDVInvokedUrlCommand*)command {
    NSString *hmac = command.arguments[0];

    [Intercom setUserHash:hmac];
    [self sendSuccess:command];
}

- (void)updateUser:(CDVInvokedUrlCommand*)command {
    NSDictionary* attributes = command.arguments[0];
    [Intercom updateUserWithAttributes:attributes];

    [self sendSuccess:command];
}

- (void)logEvent:(CDVInvokedUrlCommand*)command {
    NSString *eventName = command.arguments[0];
    NSDictionary *metaData = command.arguments[1];

    if ([metaData isKindOfClass:[NSDictionary class]] && metaData.count > 0) {
        [Intercom logEventWithName:eventName metaData:metaData];
    } else {
        [Intercom logEventWithName:eventName];
    }
    [self sendSuccess:command];
}

- (void)unreadConversationCount:(CDVInvokedUrlCommand*)command {
    NSUInteger count = [Intercom unreadConversationCount];
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsNSUInteger:count];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)displayMessenger:(CDVInvokedUrlCommand*)command {
    [Intercom presentMessenger];
    [self sendSuccess:command];
}

- (void)displayMessageComposer:(CDVInvokedUrlCommand*)command {
    [Intercom presentMessageComposer];
    [self sendSuccess:command];
}

- (void)displayMessageComposerWithInitialMessage:(CDVInvokedUrlCommand*)command {
    NSString *initialMessage = command.arguments[0];
    [Intercom presentMessageComposerWithInitialMessage:initialMessage];
    [self sendSuccess:command];
}

- (void)displayConversationsList:(CDVInvokedUrlCommand*)command {
    [Intercom presentConversationList];
    [self sendSuccess:command];
}

- (void)hideMessenger:(CDVInvokedUrlCommand*)command {
    [Intercom hideMessenger];
    [self sendSuccess:command];
}



- (void)setLauncherVisibility:(CDVInvokedUrlCommand*)command {
    NSString *visibilityString = command.arguments[0];
    BOOL visible = NO;
    if ([visibilityString isEqualToString:@"VISIBLE"]) {
        visible = YES;
    }
    [Intercom setLauncherVisible:visible];
    [self sendSuccess:command];
}

- (void)setInAppMessageVisibility:(CDVInvokedUrlCommand*)command {
    NSString *visibilityString = command.arguments[0];
    BOOL visible = NO;
    if ([visibilityString isEqualToString:@"VISIBLE"]) {
        visible = YES;
    }
    [Intercom setInAppMessagesVisible:visible];
    [self sendSuccess:command];
}

- (void)registerForPush:(CDVInvokedUrlCommand*)command {
    UIApplication *application = [UIApplication sharedApplication];
    [application registerUserNotificationSettings:[UIUserNotificationSettings
                                 settingsForTypes:(UIUserNotificationTypeBadge | UIUserNotificationTypeSound | UIUserNotificationTypeAlert)
                                       categories:nil]];
    [application registerForRemoteNotifications];
    [self sendSuccess:command];
}

#pragma mark - Private methods

- (void)sendSuccess:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
