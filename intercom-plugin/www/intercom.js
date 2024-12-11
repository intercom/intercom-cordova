

const Space = {
  Home: "HOME",
  HelpCenter: "HELP_CENTER",
  Messages: "MESSAGES",
  Tickets: "TICKETS",
};

var intercom = {
    
    /**
     * Login a user with identifiable information.
     * Valid identifiers are `userId` and `email` which must be set in an object.
     * @param options The object that contains the user's `email` or `userId`.
     */
    loginUserWithUserAttributes: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'loginUserWithUserAttributes', [options]);
    },
    
    /**
     * Login a unidentified user.
     * This is a user that doesn't have any identifiable information such as a `userId` or `email`.
     */
    loginUnidentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'loginUnidentifiedUser', []);
    },
    
    /**
     * Log a user out of their Intercom session.
     * This will dismiss any Intercom UI and clear Intercom's local cache.
     */
    logout: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'logout', []);
    },

    /**
     * Determines if there is currently a user logged in.
     */
    isUserLoggedIn: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'isUserLoggedIn', []);
    },

    /**
     * Fetches the user attribtues of the currently logged in user.
     * 
     * @return A user registration object.
     */
    fetchLoggedInUserAttributes: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'fetchLoggedInUserAttributes', []);
    },

      /**
     * Set `hash` string if you are using Identity Verification for your Intercom workspace.
     * @note This should be called before any user login takes place.
     *
     * Identity Verification helps to make sure that conversations between you and your users are kept private, and that one
     * user can't impersonate another. If Identity Verification is enabled for your app, Intercom will sign all requests
     * going to the Intercom servers with tokens. It requires your mobile application to have its own server which authenticates the app's users,
     * and which can store a secret.
     *
     * @see More information on Identity Verification can be found {@link https://developers.intercom.com/installing-intercom/cordova-phonegap/identity-verification/ here}
     * @param secureHash A HMAC digest of the user ID or email.
     */
    setUserHash: function(secureHash, success, error) {
        cordova.exec(success, error, 'Intercom', 'setUserHash', [secureHash]);
    },

    /**
     * Update a user in Intercom with data specified in an object.
     *
     * @param attributes The object with the user data.
     */
    updateUser: function(attributes, success, error) {
        cordova.exec(success, error, 'Intercom', 'updateUser', [attributes]);
    },

    /**
     * Log an event with a given name and metaData.
     * You can log events in Intercom based on user actions in your app.
     *
     * @param eventName The name of the event.
     * @param metaData Metadata Objects support a few simple types that Intercom can present on your behalf,
     * see the @{https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Data-Events/data_event/ Intercom API docs}
     */
    logEvent: function(eventName, metaData, success, error) {
        cordova.exec(success, error, 'Intercom', 'logEvent', [eventName, metaData]);
    },

    /**
     * Present Intercom as a modal overlay in your app.
     * The `Home` space is displayed by default.
     */
    present: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'present', []);
    },
    
    /**
     * Present an Intercom `space` as a modal overlay in your app
     * @see {@link Space} for a list of valid spaces.
     *
     * @param space The Intercom space to be presented.
     */
    presentSpace: function(space, success, error) {
        cordova.exec(success, error, 'Intercom', 'presentIntercomSpace', [space]);
    },

    /**
     * Present Intercom content.
     *
     * An IntercomContent object.
     */
    presentContent: function(content, success, error) {
        cordova.exec(success, error, 'Intercom', 'presentContent', [content]);
    },
    
    /**
     * Present the message composer.
     *
     * @param initialMessage An optional message that is used to pre-populate the composer with some text.
     */
    presentMessageComposer: function(initialMessage, success, error) {
        cordova.exec(success, error, 'Intercom', 'presentMessageComposer', [initialMessage]);
    },

    /**
     * Fetch all Help Center collections.
     *
     * @return An array of HelpCenterCollection objects.
     */
    fetchHelpCenterCollections: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'fetchHelpCenterCollections', []);
    },

    /**
     * Fetch the contents of a Help Center collection.
     *
     * @param collectionId The ID of the Help Center collection.
     *
     * @return A HelpCenterCollectionContent object.
     */
    fetchHelpCenterCollection: function(collectionId, success, error) {
        cordova.exec(success, error, 'Intercom', 'fetchHelpCenterCollection', [collectionId]);
    },

    /**
     * Search the Help Center.
     *
     * @param searchTerm The search term.
     *
     * @return An array of HelpCenterArticleSearchResult objects.
     */
    searchHelpCenter: function(searchTerm, success, error) {
        cordova.exec(success, error, 'Intercom', 'searchHelpCenter', [searchTerm]);
    },

    
    /**
     * Fetch the current number of unread conversations for the logged in User.
     * @return The number of unread conversations.
     */
    unreadConversationCount: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'unreadConversationCount', []);
    },

    VISIBLE : "VISIBLE",
    GONE    : "GONE",

    /**
     * Show or hide the Intercom Launcher in your app.
     * @note The Launcher is hidden by default.
     *
     * @param visibility A boolean indicating if the Intercom Launcher should be visible.
     */
    setLauncherVisibility: function(visibility, success, error) {
        cordova.exec(success, error, 'Intercom', 'setLauncherVisibility', [visibility]);
    },

    /**
     * Show or hide the Intercom InApp Messages in your app.
     * @note All InApp Messages are visible by default.
     *
     * @param visibility A boolean indicating if the InApps should be visible.
     */
    setInAppMessageVisibility: function(visibility, success, error) {
        cordova.exec(success, error, 'Intercom', 'setInAppMessageVisibility', [visibility]);
    },

    /**
     * Hide all Intercom windows that are currently displayed.
     * This will hide the Messenger, Help Center, Articles, and in-product messages (eg. Mobile Carousels, chats, and posts).
     */
    hideIntercom: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'hideIntercom', []);
    },

    /**
     * Set a fixed bottom padding for in app messages and the Intercom Launcher.
     * @param bottomPadding The size of the bottom padding in points.
     */
    setBottomPadding: function(bottomPadding, success, error) {
        cordova.exec(success, error, 'Intercom', 'setBottomPadding', [bottomPadding]);
    },

    /**
     * Register for push notifications
     * @note This function is only available for iOS.
     */
    registerForPush: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'registerForPush', []);
    },

    /**
     * Send a device token to Intercom to enable push notifications to be sent to the User.
     * @param token The device token to send to the server.
     * 
     * @note This function is only available for Android.
     */
    sendPushTokenToIntercom: function(token, success, error) {
        cordova.exec(success, error, 'Intercom', 'sendPushTokenToIntercom', [token]);
    },
        

    /**
     * @deprecated
     */
     registerIdentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'loginUserWithUserAttributes', [options]);
        console.warn('registerIdentifiedUser() is deprecated and will be removed in a future release. Please use loginUserWithUserAttributes()');
    },

    /**
     * @deprecated
     */
    registerUnidentifiedUser: function(options, success, error) {
        cordova.exec(success, error, 'Intercom', 'loginUnidentifiedUser', []);
        console.warn('registerUnidentifiedUser() is deprecated and will be removed in a future release. Please use loginUnidentifiedUser()');
    },

    /**
     * @deprecated
     */
    reset: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'logout', []);
        console.warn('reset() is deprecated and will be removed in a future release. Please use logout()');
    },

    /**
     * @deprecated
     */
    displayMessenger: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'present', []);
        console.warn('displayMessenger() is deprecated and will be removed in a future release. Please use present()');
    },

    /**
     * @deprecated
     */
    displayHelpCenter: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'presentIntercomSpace', [Space.HelpCenter]);
        console.warn('displayHelpCenter() is deprecated and will be removed in a future release. Please use present(intercom.Space.HelpCenter)');
    },

    /**
     * @deprecated
     */
    displayMessageComposerWithInitialMessage: function(initialMessage, success, error) {
        cordova.exec(success, error, 'Intercom', 'presentMessageComposer', [initialMessage]);
        console.warn('displayMessageComposerWithInitialMessage(initialMessage) is deprecated and will be removed in a future release. Please use presentMessageComposer(initialMessage)')
    },

    /**
     * @deprecated
     */
    displayMessageComposer: function(success, error) {
        cordova.exec(success, error, 'Intercom', 'presentMessageComposer', []);
        console.warn('displayMessageComposer() is deprecated and will be removed in a future release. Please use presentMessageComposer()')
    },
    
    /**
     * @deprecated
     */
    displayHelpCenterCollections: function(collectionIds, success, error) {
        var collections = intercomContent.helpCenterCollectionsWithIds(collectionIds);
        cordova.exec(success, error, 'Intercom', 'presentContent', [collections]);
        console.warn('displayHelpCenterCollections() is deprecated and will be removed in a future release. Please use intercom.presentContent(intercomContent.helpCenterCollectionsWithIds([ids]))')
    },

    /**
     * @deprecated
     */
    displayCarousel: function(carouselId, success, error) {
        var carousel = intercomContent.carouselWithCarouselId(carouselId)
        cordova.exec(success, error, 'Intercom', 'presentContent', [carousel]);
        console.warn('displayCarousel() is deprecated and will be removed in a future release. Please use intercom.presentContent(intercomContent.carouselWithCarouselId(carouselId));');
    },

    /**
     * @deprecated
     */
    displayArticle: function(articleId, success, error) {
        var article = intercomContent.articleWithArticleId(articleId)
        cordova.exec(success, error, 'Intercom', 'presentContent', [article]);
        console.warn('displayArticle() is deprecated and will be removed in a future release. Please use intercom.presentContent(intercomContent.articleWithArticleId(articleId));');
    },

    /**
     * @deprecated
     */
    displaySurvey: function(surveyId, success, error) {
        var survey = intercomContent.surveyWithSurveyId(surveyId)
        cordova.exec(success, error, 'Intercom', 'presentContent', [survey]);
        console.warn('displaySurvey() is deprecated and will be removed in a future release. Please use intercom.presentContent(intercomContent.surveyWithSurveyId(surveyId));');
    
    },
    // Enable the Space constant to be used by `intercom.space.`
    space: Space
}

module.exports = intercom;

