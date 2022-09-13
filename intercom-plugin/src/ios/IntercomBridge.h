#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface IntercomBridge : CDVPlugin

- (void)loginUserWithUserAttributes:(CDVInvokedUrlCommand*)command;
- (void)loginUnidentifiedUser:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;

- (void)setUserHash:(CDVInvokedUrlCommand*)command;

- (void)updateUser:(CDVInvokedUrlCommand*)command;
- (void)logEvent:(CDVInvokedUrlCommand*)command;

- (void)unreadConversationCount:(CDVInvokedUrlCommand*)command;

- (void)displayMessenger:(CDVInvokedUrlCommand*)command;
- (void)displayMessageComposer:(CDVInvokedUrlCommand*)command;
- (void)displayHelpCenter:(CDVInvokedUrlCommand*)command;
- (void)displayHelpCenterCollections:(CDVInvokedUrlCommand*)command;
- (void)fetchHelpCenterCollections:(CDVInvokedUrlCommand*)command;
- (void)fetchHelpCenterCollection:(CDVInvokedUrlCommand*)command;
- (void)searchHelpCenter:(CDVInvokedUrlCommand*)command;

- (void)setLauncherVisibility:(CDVInvokedUrlCommand*)command;
- (void)setBottomPadding:(CDVInvokedUrlCommand*)command;
- (void)setInAppMessageVisibility:(CDVInvokedUrlCommand*)command;
- (void)hideIntercom:(CDVInvokedUrlCommand*)command;
    

- (void)registerForPush:(CDVInvokedUrlCommand*)command;

@end
