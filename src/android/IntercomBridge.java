package io.intercom.android.sdk;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;
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

import io.intercom.android.sdk.identity.Registration;
import io.intercom.android.sdk.preview.IntercomPreviewPosition;
import io.intercom.android.sdk.api.HeaderInterceptor;

import java.util.Map;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;

public class IntercomBridge extends CordovaPlugin {

    @Override protected void pluginInitialize() {
        this.setUpIntercom();
    }

    @Override public void onStart() {
        //We also initialize intercom here just in case it has died. If Intercom is already set up, this won't do anything.
        this.setUpIntercom();

        if (Intercom.client().openGCMMessage(cordova.getActivity().getIntent().getData())) {
            cordova.getActivity().getIntent().setData(null);
        }
    }

    @Override public void onNewIntent(Intent intent) {
        cordova.getActivity().setIntent(intent);
    }

    private void setUpIntercom() {
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override public void run() {
                try {
                    Context context = IntercomBridge.this.cordova.getActivity().getApplicationContext();

                    HeaderInterceptor.setCordovaVersion(context, "1.0.8");

                    ApplicationInfo app = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
                    Bundle bundle = app.metaData;

                    String apiKey = bundle.getString("intercom_api_key");
                    String appId = bundle.getString("intercom_app_id");
                    Intercom.initialize(IntercomBridge.this.cordova.getActivity().getApplication(), apiKey, appId);
                } catch (Exception e) {
                    System.err.println("[Intercom-Cordova] ERROR: Something went wrong when initializing Intercom. Have you set your APP_ID and ANDROID_API_KEY?");
                }
            }
        });
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
        displayMessageComposer {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().displayMessageComposer();
                callbackContext.success();
            }
        },
        displayConversationsList {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().displayConversationsList();
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
        setVisibility {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String visibilityString = args.optString(0);
                int visibility = Intercom.VISIBLE;
                if ("GONE".equals(visibilityString)) {
                    visibility = Intercom.GONE;
                }
                Intercom.client().setVisibility(visibility);
                callbackContext.success();
            }
        },
        setPreviewPosition {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String previewString = args.optString(0);
                Intercom.client().setPreviewPosition(IntercomPreviewPosition.toPresentationModeEnum(previewString));
                callbackContext.success();
            }
        },
        setupGCM {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String registrationId = args.optString(0);

                int resourceId = -1; //Don't use the app icon in lollipop as it doesn't work nicely
                if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
                    resourceId = cordova.getActivity().getApplicationContext().getApplicationInfo().icon;
                }
                Intercom.client().setupGCM(registrationId, resourceId);
                callbackContext.success();
            }
        },
        openGCMMessage {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                Intercom.client().openGCMMessage(cordova.getActivity().getIntent().getData());
                callbackContext.success();
            }
        },
        registerForPush {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                String senderId = args.optString(0);
                if (senderId == null) {
                    callbackContext.error("[Intercom-Cordova] ERROR: Tried to setup GCM with no sender Id.");
                } else {
                    IntercomGCMManager.setUpPush(senderId, cordova.getActivity().getApplicationContext());
                    callbackContext.success();
                }
            }
        },
        setupAPN {
            @Override void performAction(JSONArray args, CallbackContext callbackContext, CordovaInterface cordova) {
                callbackContext.error("[Intercom-Cordova] ERROR: Tried to setup iOS push notifications on Android. Use setupGCM instead.");
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