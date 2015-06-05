package io.intercom.android.sdk;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesUtil;
import com.google.android.gms.gcm.GoogleCloudMessaging;

import java.io.IOException;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.PackageInfo;

import android.annotation.SuppressLint;

import android.os.Build;
import android.os.AsyncTask;
import android.os.Handler;

import android.util.Log;


public class IntercomGCMManager {
    private static final String PROPERTY_REG_ID = "registration_id";
    private static final String PROPERTY_APP_VERSION = "app_version";

    private static long retryTime = 0;
    private static int retryCount = 0;

    private static GoogleCloudMessaging gcm;
    public static String regId;

    private static Handler gcmHandler = new Handler();

    public static void setUpPush(String senderId, Context context) {
        if (checkPlayServices(context)) {
            gcm = GoogleCloudMessaging.getInstance(context);
            regId = getRegistrationId(context);

            if (regId.isEmpty()) {
                registerInBackground(senderId, context);
            } else {
                sendRegistrationIdToBackend(regId, context);
            }
        } else {
            Log.i("GCM_ISSUE", "No valid Google Play Services APK found.");
        }
    }

    public static boolean checkPlayServices(Context context) {
        return GooglePlayServicesUtil.isGooglePlayServicesAvailable(context) == ConnectionResult.SUCCESS;
    }

    private static String getRegistrationId(Context context) {
        SharedPreferences prefs = context.getSharedPreferences("gcmDetails", Context.MODE_PRIVATE);
        String registrationId = prefs.getString(PROPERTY_REG_ID, "");
        if (registrationId.isEmpty()) {
            Log.d("GCM_ISSUE", "Registration ID not found.");
            return "";
        }
        int registeredVersion = prefs.getInt(PROPERTY_APP_VERSION, Integer.MIN_VALUE);
        int currentVersion = getAppVersion(context);
        if (registeredVersion != currentVersion) {
            Log.d("GCM_ISSUE", "App version changed.");
            return "";
        }
        return registrationId;
    }

    private static int getAppVersion(Context context) {
        try {
            PackageInfo packageInfo = context.getPackageManager()
                    .getPackageInfo(context.getPackageName(), 0);
            return packageInfo.versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            throw new RuntimeException("Could not get package name: " + e);
        }
    }

    @SuppressLint("CommitPrefEdits") private static void storeRegistrationId(Context context, String regId) {
        SharedPreferences prefs = context.getSharedPreferences("gcmDetails", Context.MODE_PRIVATE);
        int appVersion = getAppVersion(context);

        Log.i("GCM_SUCCESS", "Saving regId on app version " + appVersion);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(PROPERTY_REG_ID, regId);
        editor.putInt(PROPERTY_APP_VERSION, appVersion);
        editor.commit();
    }

    private static void registerInBackground(final String senderId, final Context context) {
        new AsyncTask<Void, Void, Void>() {
            @Override
            protected Void doInBackground(Void... params) {
                String msg = "";
                try {
                    if (gcm == null) {
                        gcm = GoogleCloudMessaging.getInstance(context);
                    }
                    regId = gcm.register(senderId);

                    sendRegistrationIdToBackend(regId, context);
                    storeRegistrationId(context, regId);

                    Log.d("GCM_SUCCESS", "Current Device's Registration ID is: " + msg);
                } catch (IOException ex) {
                    Log.d("GCM_ISSUE", "Error :" + ex.getMessage());

                    retryCount++;

                    long minBackoffSeconds = (long)Math.pow(2.0, (double)retryCount);
                    long backOffJitter = (long)(Math.random() * (minBackoffSeconds + 1));
                    retryTime = minBackoffSeconds + backOffJitter;

                    //retry the registration after delay
                    gcmHandler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            registerInBackground(senderId, context);
                        }
                    }, retryTime);
                }
                return null;
            }
        }.execute(null, null, null);
    }

    private static void sendRegistrationIdToBackend(String regId, Context context) {
        int resourceId = -1; //Don't use the app icon in lollipop as it doesn't work nicely
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.LOLLIPOP) {
            resourceId = context.getApplicationInfo().icon;
        }
        Intercom.client().setupGCM(regId, resourceId);
    }
}