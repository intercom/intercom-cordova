//
//  ICMUserAttributes+DictionaryConversion.h
//  Sample
//
//  Created by Matthew Pierce on 11/12/2024.
//  Copyright © 2024 Intercom. All rights reserved.
//

#import "Intercom/Intercom.h"

NS_ASSUME_NONNULL_BEGIN

@interface ICMUserAttributes (DictionaryConversion)

- (NSDictionary *)toDictionary;

@end

NS_ASSUME_NONNULL_END
