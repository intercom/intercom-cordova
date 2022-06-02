#import "IntercomBridge.h"
#import "AppDelegate+IntercomPush.h"
#import "ICMHelpCenterCollection+DictionaryConversion.h"
#import "ICMHelpCenterArticleSearchResult+DictionaryConversion.h"
#import "ICMHelpCenterCollectionContent+DictionaryConversion.h"
#import <Intercom/Intercom.h>

@interface Intercom (Cordoava)
+ (void)setCordovaVersion:(NSString *)v;
@end

@implementation IntercomBridge : CDVPlugin

- (void)pluginInitialize {
    [Intercom setCordovaVersion:@"12.4.0"];
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

    ICMUserAttributes *userAttributes = [ICMUserAttributes new];
    
    if (userId.length > 0 && userEmail.length > 0) {
        userAttributes.userId = userId;
        userAttributes.email = userEmail;
    } else if (userId.length > 0) {
        userAttributes.userId = userId;
    } else if (userEmail.length > 0) {
        userAttributes.email = userEmail;
    } else {
        NSLog(@"[Intercom-Cordova] ERROR - No user registered. You must supply an email, a userId or both");
        [self.commandDelegate sendPluginResult:[CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR]
                                    callbackId:command.callbackId];
        return;
    }
    
    [Intercom loginUserWithUserAttributes:userAttributes success:nil failure:nil];
    [self sendSuccess:command];
}

- (void)registerUnidentifiedUser:(CDVInvokedUrlCommand*)command {
    [Intercom loginUnidentifiedUserWithSuccess:nil failure:nil];
    [self sendSuccess:command];
}

- (void)logout:(CDVInvokedUrlCommand*)command {
    [Intercom logout];
    [self sendSuccess:command];
}

- (void)setUserHash:(CDVInvokedUrlCommand*)command {
    NSString *hmac = command.arguments[0];

    [Intercom setUserHash:hmac];
    [self sendSuccess:command];
}

- (void)updateUser:(CDVInvokedUrlCommand*)command {
    NSDictionary* attributesDict = command.arguments[0];
    [Intercom updateUser:[self userAttributesForDictionary:attributesDict] success:nil failure:nil];
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
    [Intercom presentMessageComposer:nil];
    [self sendSuccess:command];
}

- (void)displayMessageComposerWithInitialMessage:(CDVInvokedUrlCommand*)command {
    NSString *initialMessage = command.arguments[0];
    [Intercom presentMessageComposer:initialMessage];
    [self sendSuccess:command];
}

- (void)displayConversationsList:(CDVInvokedUrlCommand*)command {
    NSLog(@"[Intercom-Cordova] WARNING - displayConversationsList is deprecated. Please use displayMessenger instead.");
    [Intercom presentMessenger];
    [self sendSuccess:command];
}

- (void)displayHelpCenter:(CDVInvokedUrlCommand*)command {
    [Intercom presentHelpCenter];
    [self sendSuccess:command];
}

- (void)displayHelpCenterCollections:(CDVInvokedUrlCommand*)command {
    NSDictionary *args = command.arguments[0];
    NSArray* collectionIds = args[@"collectionIds"];
    [Intercom presentHelpCenterCollections:collectionIds];
    [self sendSuccess:command];
}

- (void)fetchHelpCenterCollections:(CDVInvokedUrlCommand*)command {
    [Intercom fetchHelpCenterCollectionsWithCompletion:^(NSArray<ICMHelpCenterCollection *> * _Nullable collections, NSError * _Nullable error) {
        if (error) {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsNSInteger:error.code];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } else {
            NSMutableArray *array = [[NSMutableArray alloc] init];
            for (ICMHelpCenterCollection *collection in collections) {
                [array addObject:[collection toDictionary]];
            }
            NSString *jsonString = [self stringValueForDictionaries:(NSArray *)array];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsonString];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }];
}

- (void)fetchHelpCenterCollection:(CDVInvokedUrlCommand*)command {
    NSString *collectionId = command.arguments[0];
    [Intercom fetchHelpCenterCollection:collectionId withCompletion:^(ICMHelpCenterCollectionContent * _Nullable collectionContent, NSError * _Nullable error) {
        if (error) {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsNSInteger:error.code];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } else {
            NSString *jsonString = [self stringValueForDictionary:[collectionContent toDictionary]];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsonString];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }];
}

- (void)searchHelpCenter:(CDVInvokedUrlCommand*)command {
    NSString *searchTerm = command.arguments[0];
    [Intercom searchHelpCenter:searchTerm withCompletion:^(NSArray<ICMHelpCenterArticleSearchResult *> * _Nullable articleSearchResults, NSError * _Nullable error) {
        if (error) {
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsNSInteger:error.code];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        } else {
            NSMutableArray *array = [[NSMutableArray alloc] init];
            for (ICMHelpCenterArticleSearchResult *articleSearchResult in articleSearchResults) {
                [array addObject:[articleSearchResult toDictionary]];
            }
            NSString *jsonString = [self stringValueForDictionaries:(NSArray *)array];
            CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsonString];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
    }];
}

- (void)hideIntercom:(CDVInvokedUrlCommand*)command {
    [Intercom hideIntercom];
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

- (void)sendPushTokenToIntercom:(CDVInvokedUrlCommand*)command {
  NSLog(@"[Intercom-Cordova] INFO - sendPushTokenToIntercom called");
}

- (void)displayCarousel:(CDVInvokedUrlCommand*)command {
  NSString *carouselId = command.arguments[0];
    [Intercom presentCarousel:carouselId];
    [self sendSuccess:command];
}

- (void)displayArticle:(CDVInvokedUrlCommand*)command {
  NSString *articleId = command.arguments[0];
    [Intercom presentArticle:articleId];
    [self sendSuccess:command];
}

- (void)displaySurvey:(CDVInvokedUrlCommand*)command {
  NSString *surveyId = command.arguments[0];
    [Intercom presentSurvey:surveyId];
    [self sendSuccess:command];
}

- (void)setBottomPadding:(CDVInvokedUrlCommand*)command {
    double bottomPadding = [[command.arguments objectAtIndex:0] doubleValue];
    [Intercom setBottomPadding:bottomPadding];
    [self sendSuccess:command];
}

#pragma mark - User attributes

- (ICMUserAttributes *)userAttributesForDictionary:(NSDictionary *)attributesDict {
    ICMUserAttributes *attributes = [ICMUserAttributes new];
    if ([self stringValueForKey:@"email" inDictionary:attributesDict]) {
        attributes.email = [self stringValueForKey:@"email" inDictionary:attributesDict];
    }
    if ([self stringValueForKey:@"user_id" inDictionary:attributesDict]) {
        attributes.userId = [self stringValueForKey:@"user_id" inDictionary:attributesDict];
    }
    if ([self stringValueForKey:@"name" inDictionary:attributesDict]) {
        attributes.name = [self stringValueForKey:@"name" inDictionary:attributesDict];
    }
    if ([self stringValueForKey:@"phone" inDictionary:attributesDict]) {
        attributes.phone = [self stringValueForKey:@"phone" inDictionary:attributesDict];
    }
    if ([self stringValueForKey:@"language_override" inDictionary:attributesDict]) {
        attributes.languageOverride = [self stringValueForKey:@"language_override" inDictionary:attributesDict];
    }
    if ([self dateValueForKey:@"signed_up_at" inDictionary:attributesDict]) {
        attributes.signedUpAt = [self dateValueForKey:@"signed_up_at" inDictionary:attributesDict];
    }
    if ([self stringValueForKey:@"unsubscribed_from_emails" inDictionary:attributesDict]) {
        attributes.unsubscribedFromEmails = [self stringValueForKey:@"unsubscribed_from_emails" inDictionary:attributesDict];
    }
    if (attributesDict[@"custom_attributes"]) {
        attributes.customAttributes = attributesDict[@"custom_attributes"];
    }
    if (attributesDict[@"companies"]) {
        NSMutableArray<ICMCompany *> *companies = [NSMutableArray new];
        for (NSDictionary *companyDict in attributesDict[@"companies"]) {
            [companies addObject:[self companyForDictionary:companyDict]];
        }
        attributes.companies = companies;
    }
    return attributes;
}

- (ICMCompany *)companyForDictionary:(NSDictionary *)attributesDict {
    ICMCompany *company = [ICMCompany new];
    if ([self stringValueForKey:@"company_id" inDictionary:attributesDict]) {
        company.companyId = [self stringValueForKey:@"company_id" inDictionary:attributesDict];
    }
    if ([self stringValueForKey:@"name" inDictionary:attributesDict]) {
        company.name = [self stringValueForKey:@"name" inDictionary:attributesDict];
    }
    if ([self dateValueForKey:@"created_at" inDictionary:attributesDict]) {
        company.createdAt = [self dateValueForKey:@"created_at" inDictionary:attributesDict];
    }
    if ([self numberValueForKey:@"monthly_spend" inDictionary:attributesDict]) {
        company.monthlySpend = [self numberValueForKey:@"monthly_spend" inDictionary:attributesDict];
    }
    if ([self stringValueForKey:@"plan" inDictionary:attributesDict]) {
        company.plan = [self stringValueForKey:@"plan" inDictionary:attributesDict];
    }
    if (attributesDict[@"custom_attributes"]) {
        company.customAttributes = attributesDict[@"custom_attributes"];
    }
    return company;
}

- (NSString *)stringValueForKey:(NSString *)key inDictionary:(NSDictionary *)dictionary {
    NSString *value = dictionary[key];
    if ([value isKindOfClass:[NSString class]]) {
        return value;
    }
    if ([value isKindOfClass:[NSNumber class]]) {
        return [NSString stringWithFormat:@"%@", value];
    }
    if ([value isKindOfClass:[NSNull class]]) {
        return [ICMUserAttributes nullStringAttribute];
    }
    return nil;
}

- (NSString *)stringValueForDictionaries:(NSArray *)dictionaries {
    NSError *error;
    NSString *jsonString;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dictionaries options:0 error:&error];
    if (!jsonData) {
        NSLog(@"Got an error: %@", error);
    } else {
        jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    return jsonString;
}


- (NSString *)stringValueForDictionary:(NSDictionary *)dictionary {
    NSError *error;
    NSString *jsonString;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dictionary options:0 error:&error];
    if (!jsonData) {
        NSLog(@"Got an error: %@", error);
    } else {
        jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    return jsonString;
}

- (NSNumber *)numberValueForKey:(NSString *)key inDictionary:(NSDictionary *)dictionary {
    NSNumber *value = dictionary[key];
    if ([value isKindOfClass:[NSNumber class]]) {
        return value;
    }
    if ([value isKindOfClass:[NSNull class]]) {
        return [ICMUserAttributes nullNumberAttribute];
    }
    return nil;
}

- (NSDate *)dateValueForKey:(NSString *)key inDictionary:(NSDictionary *)dictionary {
    NSNumber *value = dictionary[key];
    if ([value isKindOfClass:[NSNumber class]]) {
        return [NSDate dateWithTimeIntervalSince1970:[value doubleValue]];
    }
    if ([value isKindOfClass:[NSNull class]]) {
        return [ICMUserAttributes nullDateAttribute];
    }
    return nil;
}


#pragma mark - Private methods

- (void)sendSuccess:(CDVInvokedUrlCommand*)command {
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
