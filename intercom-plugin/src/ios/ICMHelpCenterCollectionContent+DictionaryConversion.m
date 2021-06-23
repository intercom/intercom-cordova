//
//  ICMHelpCenterCollectionContent+DictionaryConversion.m
//  Sample
//
//  Created by Michael McNamara on 25/06/2021.
//  Copyright © 2021 Intercom. All rights reserved.
//

#import "ICMHelpCenterSection+DictionaryConversion.h"
#import "ICMHelpCenterArticle+DictionaryConversion.h"
#import "ICMHelpCenterCollectionContent+DictionaryConversion.h"

@implementation ICMHelpCenterCollectionContent (DictionaryConversion)

- (NSDictionary *)toDictionary {
    NSMutableDictionary *dictionary = [[NSMutableDictionary alloc] init];
    [dictionary setValue:self.collectionId forKey:@"collectionId"];
    [dictionary setValue:self.title forKey:@"title"];
    [dictionary setValue:self.summary forKey:@"summary"];

    NSMutableArray *arrayOfArticleDictionaries = [@[] mutableCopy];
    for (ICMHelpCenterArticle *article in self.articles) {
        NSDictionary *articleDictionary = [article toDictionary];
        [arrayOfArticleDictionaries addObject:articleDictionary];
    }
    [dictionary setValue:arrayOfArticleDictionaries forKey:@"articles"];

    NSMutableArray *arrayOfSectionDictionaries = [@[] mutableCopy];
    for (ICMHelpCenterSection *section in self.sections) {
        NSDictionary *sectionDictionary = [section toDictionary];
        [arrayOfSectionDictionaries addObject:sectionDictionary];
    }
    [dictionary setValue:arrayOfSectionDictionaries forKey:@"sections"];

    return [dictionary copy];
}

@end
