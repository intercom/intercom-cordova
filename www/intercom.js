var intercom = {
    registerIdentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'registerIdentifiedUser', [options]);
    },

    registerUnidentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'registerUnidentifiedUser', []);
    },

    reset: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'reset', []);
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

    hideMessenger: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'hideMessenger', []);
    },

    registerForPush: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'registerForPush', []);
    }
}

module.exports = intercom;
