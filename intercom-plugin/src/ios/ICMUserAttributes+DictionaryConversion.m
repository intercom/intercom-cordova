//
//  ICMUserAttributes+DictionaryConversion.h
//  Sample
//
//  Created by Matthew Pierce on 11/12/2024.
//  Copyright © 2024 Intercom. All rights reserved.
//

#import "ICMUserAttributes+DictionaryConversion.h"

@implementation ICMUserAttributes (DictionaryConversion)

- (NSDictionary *)toDictionary {
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    if (self.email) {
        dictionary[@"email"] = self.email;
    }
    if (self.userId) {
        dictionary[@"userId"] = self.userId;
    }
    return [dictionary copy];
}

@end