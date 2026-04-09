package io.intercom.android.sdk;

import android.app.Application;
import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.content.res.XmlResourceParser;
import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

import org.xmlpull.v1.XmlPullParser;

import io.intercom.android.sdk.api.CordovaHeaderInterceptor;

/**
 * A no-op ContentProvider that initializes Intercom early in the app lifecycle.
 *
 * ContentProviders are created during Application.onCreate(), which is guaranteed
 * to run before any Activity.attachBaseContext(). This ensures Intercom is
 * initialized before the SDK's own Activities (e.g. IntercomPostActivity) perform
 * their attachBaseContext() validation check introduced in SDK 17.x.
 *
 * Credentials are read from res/xml/config.xml — the same file Cordova writes
 * preferences to at build time.
 */
public class IntercomInitProvider extends ContentProvider {

    private static final String TAG = "Intercom-Cordova";

    @Override
    public boolean onCreate() {
        Context context = getContext();
        if (context == null) {
            Log.e(TAG, "IntercomInitProvider: context is null, cannot initialize");
            return false;
        }

        initializeIntercom(context);
        return false;
    }

    private void initializeIntercom(Context context) {
        try {
            String apiKey = null;
            String appId = null;

            int configXmlId = context.getResources().getIdentifier(
                    "config", "xml", context.getPackageName());

            if (configXmlId == 0) {
                Log.e(TAG, "IntercomInitProvider: config.xml not found in resources");
                return;
            }

            XmlResourceParser parser = context.getResources().getXml(configXmlId);
            int eventType = parser.getEventType();
            while (eventType != XmlPullParser.END_DOCUMENT) {
                if (eventType == XmlPullParser.START_TAG
                        && "preference".equals(parser.getName())) {
                    String name = parser.getAttributeValue(null, "name");
                    String value = parser.getAttributeValue(null, "value");
                    if ("intercom-android-api-key".equals(name)) {
                        apiKey = value;
                    } else if ("intercom-app-id".equals(name)) {
                        appId = value;
                    }
                }
                eventType = parser.next();
            }
            parser.close();

            if (apiKey == null || apiKey.isEmpty()
                    || appId == null || appId.isEmpty()) {
                Log.e(TAG, "IntercomInitProvider: intercom-app-id or "
                        + "intercom-android-api-key not found in config.xml");
                return;
            }

            CordovaHeaderInterceptor.setCordovaVersion(context, "16.0.0");

            Intercom.initialize((Application) context.getApplicationContext(), apiKey, appId);
            Log.d(TAG, "IntercomInitProvider: Intercom initialized successfully");

        } catch (Exception e) {
            Log.e(TAG, "IntercomInitProvider: Failed to initialize Intercom", e);
        }
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
            String[] selectionArgs, String sortOrder) {
        return null;
    }

    @Override
    public String getType(Uri uri) {
        return null;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        return null;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        return 0;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection,
            String[] selectionArgs) {
        return 0;
    }
}
