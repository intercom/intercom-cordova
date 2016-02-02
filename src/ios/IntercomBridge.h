#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface IntercomBridge : CDVPlugin

- (void)registerIdentifiedUser:(CDVInvokedUrlCommand*)command;
- (void)registerUnidentifiedUser:(CDVInvokedUrlCommand*)command;
- (void)reset:(CDVInvokedUrlCommand*)command;
- (void)setSecureMode:(CDVInvokedUrlCommand*)command;

- (void)updateUser:(CDVInvokedUrlCommand*)command;
- (void)logEvent:(CDVInvokedUrlCommand*)command;
- (void)displayMessageComposer:(CDVInvokedUrlCommand*)command;
- (void)displayConversationsList:(CDVInvokedUrlCommand*)command;
- (void)setVisibility:(CDVInvokedUrlCommand*)command;
- (void)setPreviewPosition:(CDVInvokedUrlCommand*)command;
- (void)setPreviewPadding:(CDVInvokedUrlCommand*)command;

- (void)setupAPN:(CDVInvokedUrlCommand*)command;

- (void)setupGCM:(CDVInvokedUrlCommand*)command;
- (void)openGCMMessage:(CDVInvokedUrlCommand*)command;

- (void)registerForPush:(CDVInvokedUrlCommand*)command;

@end
