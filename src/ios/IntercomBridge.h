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

- (void)unreadConversationCount:(CDVInvokedUrlCommand*)command;

- (void)displayMessenger:(CDVInvokedUrlCommand*)command;
- (void)displayMessageComposer:(CDVInvokedUrlCommand*)command;
- (void)displayMessageComposerWithInitialMessage:(CDVInvokedUrlCommand*)command;
- (void)displayConversationsList:(CDVInvokedUrlCommand*)command;

- (void)setLauncherVisibility:(CDVInvokedUrlCommand*)command;
- (void)setInAppMessageVisibility:(CDVInvokedUrlCommand*)command;
- (void)hideMessenger:(CDVInvokedUrlCommand*)command;
    

- (void)registerForPush:(CDVInvokedUrlCommand*)command;

@end
