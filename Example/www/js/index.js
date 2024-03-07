/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        intercom.setLauncherVisibility('VISIBLE');
        intercom.setInAppMessageVisibility('VISIBLE');

        intercom.unreadConversationCount(function(result) {
            console.log('Unread conversations: ' + result);
        });

        document.getElementById("login-btn").addEventListener("click", function(){
            app.login();
        }, false);

        document.getElementById("logout-btn").addEventListener("click", function(){
            intercom.logout();
            var storage = window.localStorage;
            storage.removeItem("email");
            app.configureViewForLoggedOutUser();
            console.log('Logout successful');
        }, false);

      document.getElementById("open-intercom-btn").addEventListener("click", function(){
          intercom.displayMessenger();
      }, false);

      document.getElementById("open-help-center-btn").addEventListener("click", function(){
          intercom.displayHelpCenter();
      }, false);

      document.getElementById("open-help-center-filtered-btn").addEventListener("click", function(){
          // Replace this with your own collections
          var ids = ["COLLECTION_ID1", "COLLECTION_ID2"];
          intercom.displayHelpCenterCollections({collectionIds: ids});
      }, false);

      document.getElementById("help-center-data-api-fetch-btn").addEventListener("click", function(){
          var onSuccess = function(data) {
            console.log('Successfully fetched collections : ' + data);
          }
          var onError = function(code) {
            console.log('Failed to fetch collections with code :' + code);
          }
          intercom.fetchHelpCenterCollections(onSuccess, onError);
      }, false);

      document.getElementById("help-center-data-api-fetch-content-btn").addEventListener("click", function(){
          // Add your collection Id here
          var collectionId = "COLLECTION_ID"
          var onSuccess = function(data) {
            console.log('Successfully fetched collection content : ' + data);
          }
          var onError = function(code) {
            console.log('Failed to fetch collection content with code :' + code);
          }
          intercom.fetchHelpCenterCollection(collectionId, onSuccess, onError);
      }, false);

      document.getElementById("help-center-data-api-search-btn").addEventListener("click", function(){
          // Add your search term here
          var searchTerm = "SEARCH_TERM"
          var onSuccess = function(data) {
            console.log('Successfully searched help center : ' + data);
          }
          var onError = function(code) {
            console.log('Failed to search help center with code :' + code);
          }
          intercom.searchHelpCenter(searchTerm, onSuccess, onError);
      }, false);

      document.getElementById("display-carousel-btn").addEventListener("click", function(){
          intercom.displayCarousel("carousel-id");
      }, false);

      document.getElementById("display-article-btn").addEventListener("click", function(){
          intercom.displayArticle("article-id");
      }, false);

       document.getElementById("display-survey-btn").addEventListener("click", function(){
          intercom.displaySurvey("survey-id");
      }, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        var storage = window.localStorage;
        if (storage.getItem("email")) {
          app.configureViewForLoggedInUser();
        } else {
          app.configureViewForLoggedOutUser();
        }
    },

    login: function() {
        // Replace this email with your own
        var emailAddress = "sample-email@test.com";
        if (emailAddress) {
            var onSuccess = function() {
                console.log('Successfully logged in to Intercom!');
            }
            var onError = function(code) {
                console.log('Failed to login to Intercom :' + code);
            }
            intercom.loginUserWithUserAttributes({email: emailAddress}, onSuccess, onError);
            var storage = window.localStorage;
            storage.setItem("email", emailAddress);
            app.configureViewForLoggedInUser();
        }
    },

    configureViewForLoggedInUser: function() {
      document.getElementById("logout-btn").style.visibility = 'visible';
      document.getElementById("open-intercom-btn").style.visibility = 'visible';
      document.getElementById("open-help-center-btn").style.visibility = 'visible';
      document.getElementById("display-carousel-btn").style.visibility = 'visible';
      document.getElementById("display-article-btn").style.visibility = 'visible';
      document.getElementById("display-survey-btn").style.visibility = 'visible';
      document.getElementById("login-btn").style.visibility = 'hidden';
    },
  
    configureViewForLoggedOutUser: function() {
      document.getElementById("logout-btn").style.visibility = 'hidden';
      document.getElementById("open-intercom-btn").style.visibility = 'hidden';
      document.getElementById("open-help-center-btn").style.visibility = 'hidden';
      document.getElementById("display-carousel-btn").style.visibility = 'hidden';
      document.getElementById("display-article-btn").style.visibility = 'hidden';
      document.getElementById("display-survey-btn").style.visibility = 'hidden';
      document.getElementById("login-btn").style.visibility = 'visible';
    }
};

app.initialize();
