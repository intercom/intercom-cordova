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

        document.getElementById("logut-btn").addEventListener("click", function(){
            intercom.reset();
            var storage = window.localStorage;
            storage.removeItem("email");
            app.configureViewForLoggedOutUser();
            console.log('Logout successful');
        }, false);

      document.getElementById("open-intercom-btn").addEventListener("click", function(){
          intercom.displayMessenger();
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
      var emailAddress = prompt("Type in an email address", "");
      if (emailAddress) {
        intercom.registerIdentifiedUser({email: emailAddress});
        var storage = window.localStorage;
        storage.setItem("email", emailAddress);
        app.configureViewForLoggedInUser();
      }
      console.log('Successfully logged in with : ' + emailAddress);
    },

    configureViewForLoggedInUser: function() {
      document.getElementById("logut-btn").style.visibility = 'visible';
      document.getElementById("open-intercom-btn").style.visibility = 'visible';
      document.getElementById("login-btn").style.visibility = 'hidden';
    },

    configureViewForLoggedOutUser: function() {
      document.getElementById("logut-btn").style.visibility = 'hidden';
      document.getElementById("open-intercom-btn").style.visibility = 'hidden';
      document.getElementById("login-btn").style.visibility = 'visible';
    }
};

app.initialize();
