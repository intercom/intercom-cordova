//
//  ICMHelpCenterArticle+DictionaryConversion.m
//  Sample
//
//  Created by Michael McNamara on 25/06/2021.
//  Copyright © 2021 Intercom. All rights reserved.
//

#import "ICMHelpCenterArticle+DictionaryConversion.h"

@implementation ICMHelpCenterArticle (DictionaryConversion)

- (NSDictionary *)toDictionary {
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    [dictionary setValue:self.articleId forKey:@"articleId"];
    [dictionary setValue:self.title forKey:@"title"];
    return [dictionary copy];
}

@end
