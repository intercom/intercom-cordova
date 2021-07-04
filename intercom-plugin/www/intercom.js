var intercom = {
    registerIdentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'registerIdentifiedUser', [options]);
    },

    registerUnidentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'registerUnidentifiedUser', []);
    },

    reset: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'logout', []);
    },

    logout: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'logout', []);
    },

    setSecureMode: function(secureHash, secureData, success, error) {
        cordova.exec(success, error, 'Intercom', 'setSecureMode', [secureHash, secureData]);
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

    displayMessenger: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayMessenger', []);
    },

    displayMessageComposer: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayMessageComposer', []);
    },

    displayMessageComposerWithInitialMessage: function(initialMessage, success, error) {
        cordova.exec(success, error, 'Intercom', 'displayMessageComposerWithInitialMessage', [initialMessage]);
    },

    displayConversationsList: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayConversationsList', []);
    },

    displayHelpCenter: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayHelpCenter', []);
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

    setBottomPadding: function(bottomPadding, success, error) {
        cordova.exec(success, error, 'Intercom', 'setBottomPadding', [bottomPadding]);
    }
}

module.exports = intercom;
