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


- (void)fetchHelpCenterCollections:(CDVInvokedUrlCommand*)command;
- (void)fetchHelpCenterCollection:(CDVInvokedUrlCommand*)command;
- (void)searchHelpCenter:(CDVInvokedUrlCommand*)command;

- (void)setLauncherVisibility:(CDVInvokedUrlCommand*)command;
- (void)setBottomPadding:(CDVInvokedUrlCommand*)command;
- (void)setInAppMessageVisibility:(CDVInvokedUrlCommand*)command;
- (void)hideIntercom:(CDVInvokedUrlCommand*)command;
    

- (void)registerForPush:(CDVInvokedUrlCommand*)command;

#pragma mark - Deprecated Methods
/**
 @deprecated
 */
- (void)displayMessenger:(CDVInvokedUrlCommand*)command DEPRECATED_MSG_ATTRIBUTE("'+[Intercom displayMessenger]' is deprecated and will be removed in a future release. 'Use +[Intercom presentIntercom]' instead.");;
/**
 @deprecated
 */
- (void)displayMessageComposer:(CDVInvokedUrlCommand*)command;
/**
 @deprecated
 */
- (void)displayHelpCenter:(CDVInvokedUrlCommand*)command;
/**
 @deprecated
 */
- (void)displayHelpCenterCollections:(CDVInvokedUrlCommand*)command;
/**
 @deprecated
 */
- (void)displayCarousel:(CDVInvokedUrlCommand*)command;
/**
 @deprecated
 */
- (void)displayArticle:(CDVInvokedUrlCommand*)command;
/**
 @deprecated
 */
- (void)displaySurvey:(CDVInvokedUrlCommand*)command;

@end
