//
//  ICMHelpCenterSection+DictionaryConversion.m
//  Sample
//
//  Created by Michael McNamara on 25/06/2021.
//  Copyright © 2021 Intercom. All rights reserved.
//

#import "ICMHelpCenterSection+DictionaryConversion.h"
#import "ICMHelpCenterArticle+DictionaryConversion.h"

@implementation ICMHelpCenterSection (DictionaryConversion)

- (NSDictionary *)toDictionary {
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    [dictionary setValue:self.title forKey:@"title"];
    
    NSMutableArray *arrayOfArticleDictionaries = [@[] mutableCopy];
    for (ICMHelpCenterArticle *article in self.articles) {
        NSDictionary *articleDictionary = [article toDictionary];
        [arrayOfArticleDictionaries addObject:articleDictionary];
    }
    [dictionary setValue:arrayOfArticleDictionaries forKey:@"articles"];
    
    return [dictionary copy];
}

@end
