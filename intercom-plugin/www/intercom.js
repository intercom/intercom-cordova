

const Space = {
	Home: "HOME",
	HelpCenter: "HELP_CENTER",
	Messages: "MESSAGES",
    Tickets: "TICKETS"
}

var intercom = {
    
    loginUserWithUserAttributes: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'loginUserWithUserAttributes', [options]);
    },
    
    loginUnidentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'loginUnidentifiedUser', []);
    },
    
    logout: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'logout', []);
    },

    setUserHash: function(secureHash, success, error) {
        cordova.exec(success, error, 'Intercom', 'setUserHash', [secureHash]);
    },

    updateUser: function(attributes, success, error) {
        cordova.exec(success, error, 'Intercom', 'updateUser', [attributes]);
    },

    logEvent: function(eventName, metaData, success, error) {
        cordova.exec(success, error, 'Intercom', 'logEvent', [eventName, metaData]);
    },

    present: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'present', []);
    },
    
    presentSpace: function(space, success, error) {
        cordova.exec(success, error, 'Intercom', 'present', [space]);
    },

    presentContent: function(content, success, error) {
        cordova.exec(success, error, 'Intercom', 'presentContent', [content]);
    },
    

    displayMessageComposer: function(initialMessage, success, error) {
        cordova.exec(success, error, 'Intercom', 'displayMessageComposer', [initialMessage]);
    },

    

    fetchHelpCenterCollections: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'fetchHelpCenterCollections', []);
    },

    searchHelpCenter: function(searchTerm, success, error) {
        cordova.exec(success, error, 'Intercom', 'searchHelpCenter', [searchTerm]);
    },

    fetchHelpCenterCollection: function(collectionId, success, error) {
        cordova.exec(success, error, 'Intercom', 'fetchHelpCenterCollection', [collectionId]);
    },

    displayHelpCenterCollections: function(collectionIds, success, error) {
            cordova.exec(success, error, 'Intercom', 'displayHelpCenterCollections', [collectionIds]);
    },

    unreadConversationCount: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'unreadConversationCount', []);
    },

    VISIBLE : "VISIBLE",
    GONE    : "GONE",

    setLauncherVisibility: function(visibility, success, error) {
        cordova.exec(success, error, 'Intercom', 'setLauncherVisibility', [visibility]);
    },

    setInAppMessageVisibility: function(visibility, success, error) {
        cordova.exec(success, error, 'Intercom', 'setInAppMessageVisibility', [visibility]);
    },

    hideIntercom: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'hideIntercom', []);
    },

    registerForPush: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'registerForPush', []);
    },

    sendPushTokenToIntercom: function(token, success, error) {
        cordova.exec(success, error, 'Intercom', 'sendPushTokenToIntercom', [token]);
    },

    displayCarousel: function(carouselId, success, error) {
        cordova.exec(success, error, 'Intercom', 'displayCarousel', [carouselId]);
    },

    displayArticle: function(articleId, success, error) {
        cordova.exec(success, error, 'Intercom', 'displayArticle', [articleId]);
    },

    displaySurvey: function(surveyId, success, error) {
        cordova.exec(success, error, 'Intercom', 'displaySurvey', [surveyId]);
    },

    setBottomPadding: function(bottomPadding, success, error) {
        cordova.exec(success, error, 'Intercom', 'setBottomPadding', [bottomPadding]);
    },



    /**
     * @deprecated
     */
     registerIdentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'loginUserWithUserAttributes', [options]);
        console.warn('registerIdentifiedUser() is deprecated and will be removed in a future release. Please use loginUserWithUserAttributes()');
    },

    registerUnidentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'loginUnidentifiedUser', []);
        console.warn('registerUnidentifiedUser() is deprecated and will be removed in a future release. Please use loginUnidentifiedUser()');
    },

    reset: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'logout', []);
        console.warn('reset() is deprecated and will be removed in a future release. Please use logout()');
    },

    displayMessenger: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayMessenger', []);
    },

    displayHelpCenter: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayHelpCenter', []);
    },

    displayMessageComposerWithInitialMessage: function(initialMessage, success, error) {
        cordova.exec(success, error, 'Intercom', 'displayMessageComposer', [initialMessage]);
        console.warn('displayMessageComposerWithInitialMessage(initialMessage) is deprecated and will be removed in a future release. Please use displayMessageComposer(initialMessage)')
    },

    displayMessageComposer: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayMessageComposer', []);
        console.warn('displayMessageComposer() is deprecated and will be removed in a future release. Please use displayMessageComposer(initialMessage)')
    },

    getCarouselWithId: function(carouselId) {
        return IntercomContent.carouselWithCarouselId(carouselId)
    },
}

module.exports = intercom;
