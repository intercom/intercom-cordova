#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>

@interface IntercomBridge : CDVPlugin

#pragma mark - User Login

- (void)loginUserWithUserAttributes:(CDVInvokedUrlCommand*)command;
- (void)loginUnidentifiedUser:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;
- (void)setUserHash:(CDVInvokedUrlCommand*)command;
- (void)updateUser:(CDVInvokedUrlCommand*)command;

#pragma mark - Logged in status

- (void)isUserLoggedIn:(CDVInvokedUrlCommand*)command;
- (void)fetchLoggedInUserAttributes:(CDVInvokedUrlCommand*)command;

#pragma mark - Events

- (void)logEvent:(CDVInvokedUrlCommand*)command;

#pragma mark - Present Intercom UI

- (void)present:(CDVInvokedUrlCommand*)command;
- (void)presentIntercomSpace:(CDVInvokedUrlCommand*)command;
- (void)presentContent:(CDVInvokedUrlCommand*)command;
- (void)presentMessageComposer:(CDVInvokedUrlCommand*)command;

#pragma mark - Help Center Data API

- (void)fetchHelpCenterCollections:(CDVInvokedUrlCommand*)command;
- (void)fetchHelpCenterCollection:(CDVInvokedUrlCommand*)command;
- (void)searchHelpCenter:(CDVInvokedUrlCommand*)command;

#pragma mark - Intercom UI Visibility

- (void)setLauncherVisibility:(CDVInvokedUrlCommand*)command;
- (void)setBottomPadding:(CDVInvokedUrlCommand*)command;
- (void)setInAppMessageVisibility:(CDVInvokedUrlCommand*)command;
- (void)hideIntercom:(CDVInvokedUrlCommand*)command;
    
#pragma mark - Unread Conversation Count

- (void)unreadConversationCount:(CDVInvokedUrlCommand*)command;

#pragma mark - Push Notifications

- (void)registerForPush:(CDVInvokedUrlCommand*)command;
@end
