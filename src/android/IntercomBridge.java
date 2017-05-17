package io.intercom.android.sdk;

import io.intercom.android.sdk.api.Api;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import android.content.Intent;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.os.Bundle;
import android.os.Build;
import android.util.Log;

import io.intercom.android.sdk.identity.Registration;
import io.intercom.android.sdk.api.CordovaHeaderInterceptor;
import io.intercom.android.sdk.api.UserUpdateRequest;

import io.intercom.android.sdk.IntercomPushManager;
import io.intercom.android.sdk.Intercom.Visibility;

import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;

public class IntercomBridge extends CordovaPlugin {

    @Override protected void pluginInitialize() {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override public void run() {
                setUpIntercom();
                try {
                    Injector.get().getApi().updateUser(new UserUpdateRequest(true, false, true));
                } catch (RuntimeException e) {
                    // Intercom is not initialised yet, do nothing
                }
            }
        });
    }

    @Override public void onStart() {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override public void run() {
                //We also initialize intercom here just in case it has died. If Intercom is already set up, this won't do anything.
                setUpIntercom();

                Intercom.client().handlePushMessage();
            }
        });
    }

    @Override public void onNewIntent(Intent intent) {
        cordova.getActivity().setIntent(intent);
    }

    private void setUpIntercom() {
        try {
            Context context = IntercomBridge.this.cordova.getActivity().getApplicationContext();

            CordovaHeaderInterceptor.setCordovaVersion(context, "3.2.2");

            switch (IntercomPushManager.getInstalledModuleType()) {
                case GCM: {
                    String senderId = IntercomBridge.this.preferences.getString("intercom-android-sender-id", null);
                    if (senderId != null) {
                        IntercomPushManager.cacheSenderId(context, senderId);
                    }
                    break;
                }
            }

            ApplicationInfo app = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
            Bundle bundle = app.metaData;

            //Get app credentials from config.xml or the app bundle if they can't be found
            String apiKey = IntercomBridge.this.preferences.getString("intercom-android-api-key", bundle.getString("intercom_api_key"));
            String appId = IntercomBridge.this.preferences.getString("intercom-app-id", bundle.getString("intercom_app_id"));

            Intercom.initialize(IntercomBridge.this.cordova.getActivity().getApplication(), apiKey, appId);
        } catch (Exception e) {
            Log.e("Intercom-Cordova", "ERROR: Something went wrong when initializing Intercom. Have you set your APP_ID and ANDROID_API_KEY?");
        }
    }

    private enum Action {
        registerIdentifiedUser {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                JSONObject options = args.optJSONObject(0);
                String email = options.optString("email");
                String userId = options.optString("userId");

                Registration registration = new Registration();
                if (email != null && email.length() > 0) {
                    registration = registration.withEmail(email);
                }
                if (userId != null && userId.length() > 0) {
                    registration = registration.withUserId(userId);
                }
                Intercom.client().registerIdentifiedUser(registration);
                callbackContext.success();
            }
        },
        registerUnidentifiedUser {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().registerUnidentifiedUser();
                callbackContext.success();
            }
        },
        reset {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().reset();
                callbackContext.success();
            }
        },
        setSecureMode {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String hmac = args.optString(0);
                String data = args.optString(1);
                Intercom.client().setSecureMode(hmac, data);
                callbackContext.success();
            }
        },
        setUserHash {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String hmac = args.optString(0);
                Intercom.client().setUserHash(hmac);
                callbackContext.success();
            }
        },
        logEvent {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String eventName = args.optString(0);
                Map<String, Object> metaData = IntercomBridge.mapFromJSON(args.optJSONObject(1));

                if (metaData == null) {
                    Intercom.client().logEvent(eventName);
                } else {
                    Intercom.client().logEvent(eventName, metaData);
                }
                callbackContext.success();
            }
        },
        unreadConversationCount {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                int count = Intercom.client().getUnreadConversationCount();
                callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, count));
            }
        },
        displayMessenger {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().displayMessenger();
                callbackContext.success();
            }
        },
        displayMessageComposer {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().displayMessageComposer();
                callbackContext.success();
            }
        },
        displayMessageComposerWithInitialMessage {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String initialMessage = args.optString(0);

                Intercom.client().displayMessageComposer(initialMessage);
                callbackContext.success();
            }
        },
        displayConversationsList {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().displayConversationsList();
                callbackContext.success();
            }
        },
        setLauncherVisibility {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String visibilityString = args.optString(0);
                Visibility visibility = Intercom.VISIBLE;
                if ("GONE".equals(visibilityString)) {
                    visibility = Intercom.GONE;
                }
                Intercom.client().setLauncherVisibility(visibility);
                callbackContext.success();
            }
        },
        setInAppMessageVisibility {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String visibilityString = args.optString(0);
                Visibility visibility = Intercom.VISIBLE;
                if ("GONE".equals(visibilityString)) {
                    visibility = Intercom.GONE;
                }
                Intercom.client().setInAppMessageVisibility(visibility);
                callbackContext.success();
            }
        },
        hideMessenger {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().hideMessenger();
                callbackContext.success();
            }
        },
        updateUser {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Map<String, Object> attributes = IntercomBridge.mapFromJSON(args.optJSONObject(0));
                Intercom.client().updateUser(attributes);
                callbackContext.success();
            }
        },
        registerForPush {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                //This doesn't need to do anything on Android
            }
        },
        unknown {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                callbackContext.error("[Intercom-Cordova] ERROR: Undefined function");
            }
        };

        abstract void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova);

        public static Action fromString(String actionAsString) {
            Action action = unknown;

            try {
                action = valueOf(actionAsString);
            } catch (NullPointerException ignored) {}
              catch (IllegalArgumentException ignored) {}

            return action;
        }
    }

    public boolean execute(String actionString, final JSONArray args, final CallbackContext callbackContext) {
        final Action action = Action.fromString(actionString);

        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override public void run() {
                action.performAction(args, callbackContext, IntercomBridge.this.cordova);
            }
        });
        return action != Action.unknown;
    }

    private static Map<String, Object> mapFromJSON(JSONObject jsonObject) {
        if (jsonObject == null) {
            return null;
        }
        Map<String, Object> map = new HashMap<String, Object>();
        Iterator<String> keysIter = jsonObject.keys();
        while (keysIter.hasNext()) {
            String key = keysIter.next();
            Object value = getObject(jsonObject.opt(key));
            if (value != null) {
                map.put(key, value);
            }
        }
        return map;
    }

    private static List<Object> listFromJSON(JSONArray jsonArray) {
        List<Object> list = new ArrayList<Object>();
        for (int i = 0, count = jsonArray.length(); i < count; i++) {
            Object value = getObject(jsonArray.opt(i));
            if (value != null) {
                list.add(value);
            }
        }
        return list;
    }

    private static Object getObject(Object value) {
        if (value instanceof JSONObject) {
            value = mapFromJSON((JSONObject) value);
        } else if (value instanceof JSONArray) {
            value = listFromJSON((JSONArray) value);
        }
        return value;
    }
}
