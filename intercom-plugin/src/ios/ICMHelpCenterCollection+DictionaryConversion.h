//
//  ICMHelpCenterCollection+DictionaryConversion.h
//  Sample
//
//  Created by Michael McNamara on 25/06/2021.
//  Copyright © 2021 Intercom. All rights reserved.
//

#import <Intercom/Intercom.h>

NS_ASSUME_NONNULL_BEGIN

@interface ICMHelpCenterCollection (DictionaryConversion)

- (NSMutableDictionary *)toDictionary;

@end

NS_ASSUME_NONNULL_END
