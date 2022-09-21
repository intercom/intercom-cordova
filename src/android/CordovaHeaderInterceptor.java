package io.intercom.android.sdk.api;

import android.content.Context;

public class CordovaHeaderInterceptor {
	public static void setCordovaVersion(Context context, String cordovaVersion) {
		HeaderInterceptor.setCordovaVersion(context, cordovaVersion);
	}
}
