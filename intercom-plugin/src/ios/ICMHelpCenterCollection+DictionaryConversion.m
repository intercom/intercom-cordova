//
//  ICMHelpCenterCollection+DictionaryConversion.m
//  Sample
//
//  Created by Michael McNamara on 25/06/2021.
//  Copyright © 2021 Intercom. All rights reserved.
//

#import "ICMHelpCenterCollection+DictionaryConversion.h"

@implementation ICMHelpCenterCollection (DictionaryConversion)

- (NSDictionary *)toDictionary {
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    [dictionary setValue:self.collectionId forKey:@"collectionId"];
    [dictionary setValue:self.title forKey:@"title"];
    [dictionary setValue:self.summary forKey:@"summary"];
    return [dictionary copy];
}

@end
