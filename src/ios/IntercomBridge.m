#import "IntercomBridge.h"
#import <Intercom/Intercom.h>

@interface Intercom (Cordoava)
+ (void)setCordovaVersion:(NSString *)v;
@end

@implementation IntercomBridge : CDVPlugin

- (void)pluginInitialize {
    [Intercom setCordovaVersion:@"1.0.0"];
    #ifdef DEBUG
        [Intercom enableLogging];
    #endif

    NSString* apiKey = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"IntercomApiKey"];
    NSString* appId = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"IntercomAppId"];

    [Intercom setApiKey:apiKey forAppId:appId];
}

- (void)registerIdentifiedUser:(CDVInvokedUrlCommand*)command {
    NSDictionary* options = command.arguments[0];
    NSString* userId      = [options valueForKey:@"userId"];
    NSString* userEmail   = [options valueForKey:@"email"];

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

- (void)updateUser:(CDVInvokedUrlCommand*)command {
    NSDictionary* attributes = command.arguments[0];
    [Intercom updateUserWithAttributes:attributes];

    [self sendSuccess:command];
}

- (void)logEvent:(CDVInvokedUrlCommand*)command {
    NSString* eventName    = command.arguments[0];
    NSDictionary* metaData = command.arguments[1];

    if (metaData.count > 0) {
        [Intercom logEventWithName:eventName metaData:metaData];
    } else {
        [Intercom logEventWithName:eventName];
    }
    [self sendSuccess:command];
}

- (void)displayMessageComposer:(CDVInvokedUrlCommand*)command {
    [Intercom presentMessageComposer];
    [self sendSuccess:command];
}

- (void)displayConversationsList:(CDVInvokedUrlCommand*)command {
    [Intercom presentConversationList];
    [self sendSuccess:command];
}

- (void)setVisibility:(CDVInvokedUrlCommand*)command {
    NSString *visibilityString = command.arguments[0];
    BOOL hidden = NO;
    if ([visibilityString isEqualToString:@"GONE"]) {
        hidden = YES;
    }
    [Intercom setMessagesHidden:hidden];
    [self sendSuccess:command];
}

- (void)setPreviewPosition:(CDVInvokedUrlCommand*)command {
    NSString *positionString = command.arguments[0];
    ICMPreviewPosition previewPosition = ICMPreviewPositionBottomLeft;
    if ([positionString isEqualToString:@"BOTTOM_RIGHT"]) {
        previewPosition = ICMPreviewPositionBottomRight;
    } else if ([positionString isEqualToString:@"TOP_RIGHT"]) {
        previewPosition = ICMPreviewPositionBottomRight;
    } else if ([positionString isEqualToString:@"TOP_LEFT"]) {
        previewPosition = ICMPreviewPositionBottomLeft;
    }
    [Intercom setPreviewPosition:previewPosition];
    [self sendSuccess:command];
}

- (void)setupAPN:(CDVInvokedUrlCommand*)command {
    NSString *deviceToken = command.arguments[0];
    [Intercom setDeviceToken:[deviceToken dataUsingEncoding:NSUTF8StringEncoding]];
    [self sendSuccess:command];
}

//These are the Android push methods. Only here to log errors.
- (void)setupGCM:(CDVInvokedUrlCommand*)command {
    NSLog(@"[Intercom-Cordova] ERROR - Tried to setup GCM on iOS. Use setupGCM instead");
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR] 
                                callbackId:command.callbackId];
}

- (void)openGCMMessage:(CDVInvokedUrlCommand*)command {
    NSLog(@"[Intercom-Cordova] ERROR - Tried to open GCM message on iOS");
    [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR] 
                                callbackId:command.callbackId];
}

#pragma mark - Private methods

- (void)sendSuccess:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
