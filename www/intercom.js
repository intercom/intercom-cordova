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

    updateUser: function(attributes, success, error) {
        cordova.exec(success, error, 'Intercom', 'updateUser', [attributes]);
    },

    logEvent: function(eventName, metaData, success, error) {
        cordova.exec(success, error, 'Intercom', 'logEvent', [eventName, metaData]);
    },

    displayMessageComposer: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayMessageComposer', []);
    },

    displayConversationsList: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'displayConversationsList', []);
    },

    VISIBLE : "VISIBLE",
    GONE    : "GONE",

    setVisibility: function(visibility, success, error) {
        cordova.exec(success, error, 'Intercom', 'setVisibility', [visibility]);
    },

    BOTTOM_LEFT  : "BOTTOM_LEFT",
    BOTTOM_RIGHT : "BOTTOM_RIGHT",
    TOP_LEFT     : "TOP_LEFT",
    TOP_RIGHT    : "TOP_RIGHT",

    setPreviewPosition: function(previewPosition, success, error) {
        cordova.exec(success, error, 'Intercom', 'setPreviewPosition', [previewPosition]);
    },

    setPreviewPadding: function(x, y, success, error) {
        cordova.exec(success, error, 'Intercom', 'setPreviewPadding', [x, y]);
    },

    //Android only: GCM handling
    setupGCM: function(regId, success, error) {
        cordova.exec(success, error, 'Intercom', 'setupGCM', [regId]);
    },

    openGCMMessage: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'openGCMMessage', []);
    },

    //iOS only: Push notification handling
    setupAPN: function(deviceToken, success, error) {
        cordova.exec(success, error, 'Intercom', 'setupAPN', [deviceToken]);
    },

    registerForPush: function(senderId, success, error) {
        cordova.exec(success, error, 'Intercom', 'registerForPush', [senderId]);
    }
}

module.exports = intercom;
