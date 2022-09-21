//
//  ICMHelpCenterArticleSearchResult+DictionaryConversion.m
//  Sample
//
//  Created by Michael McNamara on 25/06/2021.
//  Copyright © 2021 Intercom. All rights reserved.
//

#import "ICMHelpCenterArticleSearchResult+DictionaryConversion.h"

@implementation ICMHelpCenterArticleSearchResult (DictionaryConversion)

- (NSDictionary *)toDictionary {
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    [dictionary setValue:self.articleId forKey:@"articleId"];
    [dictionary setValue:self.title forKey:@"title"];
    [dictionary setValue:self.summary forKey:@"summary"];
    [dictionary setValue:self.matchingSnippet forKey:@"matchingSnippet"];
    return [dictionary copy];
}

@end
