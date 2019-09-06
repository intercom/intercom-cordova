package io.intercom.android.sdk;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import io.intercom.android.sdk.Intercom.Visibility;
import io.intercom.android.sdk.R;
import io.intercom.android.sdk.api.CordovaHeaderInterceptor;
import io.intercom.android.sdk.api.UserUpdateRequest;
import io.intercom.android.sdk.identity.Registration;
import io.intercom.android.sdk.logger.LumberMill;
import io.intercom.android.sdk.push.IntercomPushClient;
public class IntercomBridge extends CordovaPlugin {

    private static final String CUSTOM_ATTRIBUTES = "custom_attributes";

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
            Context context = cordova.getActivity().getApplicationContext();

            CordovaHeaderInterceptor.setCordovaVersion(context, "7.1.1");

            switch (IntercomPushManager.getInstalledModuleType()) {
                case FCM: {
                    String senderId = getSenderId(context);

                    if (senderId != null) {
                        LumberMill.getLogger().d("Using FCM Sender ID: " + senderId);
                        IntercomPushManager.cacheSenderId(context, senderId);
                    }
                    break;
                }
            }

            //Get app credentials from config.xml or the app bundle if they can't be found
            String apiKey = preferences.getString("intercom-android-api-key", "");
            String appId = preferences.getString("intercom-app-id", "");

            Intercom.initialize(cordova.getActivity().getApplication(), apiKey, appId);
        } catch (Exception e) {
            Log.e("Intercom-Cordova", "ERROR: Something went wrong when initializing Intercom. Have you set your APP_ID and ANDROID_API_KEY?", e);
        }
    }

    private String getSenderId(Context context) {
        String preferencesSenderId = preferences.getString("intercom-android-sender-id", "");
        String resourcesSenderId;
        try {
            // copied from `google-services.json` in our Gradle script
            resourcesSenderId = context.getResources().getString(R.string.intercom_gcm_sender_id);
        }
        catch (Exception e) {
            LumberMill.getLogger().d(e, "Failed to get sender ID from resources: ");
            resourcesSenderId = "";
        }

        if (preferencesSenderId.isEmpty()) {
            return resourcesSenderId;
        }

        // sometimes the XML parser Cordova uses formats numbers with scientific notation, giving an incorrect sender ID
        // if this is the case, fall back to the ID from the `google-services.json` file
        if (preferencesSenderId.contains(".") && !resourcesSenderId.isEmpty()) {
            return resourcesSenderId;
        }
        return preferencesSenderId;
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
        logout {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().logout();
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
                LumberMill.getLogger().w("displayConversationsList is deprecated. Please use displayMessenger instead.");
                Intercom.client().displayMessenger();
                callbackContext.success();
            }
        },
        displayHelpCenter {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().displayHelpCenter();
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
                UserAttributes.Builder builder = new UserAttributes.Builder();
                Object customAttributes = attributes.get(CUSTOM_ATTRIBUTES);
                if (customAttributes instanceof Map) {
                    //noinspection unchecked
                    builder.customAttributes.putAll((Map<? extends String, ?>) customAttributes);
                }
                attributes.remove(CUSTOM_ATTRIBUTES);
                builder.attributes.putAll(attributes);
                Intercom.client().updateUser(builder.build());
                callbackContext.success();
            }
        },
        registerForPush {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                //This doesn't need to do anything on Android
            }
        },
        sendPushTokenToIntercom {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String token = args.optString(0);
                IntercomPushClient intercomPushClient = new IntercomPushClient();
                intercomPushClient.sendTokenToIntercom(cordova.getActivity().getApplication(), token);
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
        Map<String, Object> map = new HashMap<>();
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
        List<Object> list = new ArrayList<>();
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
