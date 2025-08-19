# Deep Linking with Intercom for Cordova/PhoneGap

This guide explains how to set up deep linking in your Cordova/PhoneGap app to work with Intercom messages, push notifications, and Help Center articles.

## What is Deep Linking?

Deep linking allows users to open your app directly to a specific screen or content using a custom URL scheme (e.g., `myapp://profile/123`). With Intercom, you can embed deep links in:

- In-app messages
- Push notifications  
- Help Center articles
- Email campaigns

When users tap these links, they'll be taken directly to the relevant screen in your app instead of just opening the app's home screen.

## Prerequisites

- Cordova/PhoneGap app with Intercom plugin installed
- Basic understanding of Cordova configuration

## Step 1: Install the Custom URL Scheme Plugin

Install the Cordova Custom URL Scheme plugin to handle deep links:

```bash
cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=myapp
```

Replace `myapp` with your desired URL scheme. Choose a unique scheme name that:
- Uses only lowercase characters
- Contains no spaces or special characters (except hyphens, which become underscores on Android)
- Doesn't conflict with existing schemes (fb, twitter, etc.)

## Step 2: Configure Your App to Handle Deep Links

### JavaScript Handler

Add this function to your main JavaScript file (typically in `www/js/index.js`):

```javascript
function handleOpenURL(url) {
    console.log("Received deep link: " + url);
    
    // Wait for the app to be ready before processing the URL
    document.addEventListener('deviceready', function() {
        processDeepLink(url);
    }, false);
    
    // If deviceready already fired, process immediately
    if (window.cordova) {
        processDeepLink(url);
    }
}

function processDeepLink(url) {
    // Parse the URL to extract path and parameters
    const urlParts = url.split('://');
    if (urlParts.length < 2) return;
    
    const scheme = urlParts[0]; // e.g., "myapp"
    const pathAndQuery = urlParts[1]; // e.g., "profile/123?tab=settings"
    
    // Split path and query parameters
    const [path, query] = pathAndQuery.split('?');
    const pathSegments = path.split('/').filter(segment => segment.length > 0);
    
    // Parse query parameters
    const params = {};
    if (query) {
        query.split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
    }
    
    // Route to appropriate screen based on path
    routeToScreen(pathSegments, params);
}

function routeToScreen(pathSegments, params) {
    // Example routing logic - customize based on your app structure
    if (pathSegments.length === 0) {
        // myapp:// - go to home
        navigateToHome();
    } else if (pathSegments[0] === 'profile') {
        // myapp://profile/123
        const userId = pathSegments[1];
        navigateToProfile(userId, params);
    } else if (pathSegments[0] === 'product') {
        // myapp://product/456?color=red
        const productId = pathSegments[1];
        navigateToProduct(productId, params);
    } else if (pathSegments[0] === 'support') {
        // myapp://support - open Intercom
        intercom.present();
    }
    // Add more routing logic as needed
}

// Example navigation functions - implement based on your app framework
function navigateToHome() {
    // Navigate to home screen
    console.log("Navigating to home");
}

function navigateToProfile(userId, params) {
    // Navigate to profile screen
    console.log("Navigating to profile:", userId, params);
}

function navigateToProduct(productId, params) {
    // Navigate to product screen  
    console.log("Navigating to product:", productId, params);
}
```

## Step 3: Platform-Specific Configuration

### iOS Configuration

The plugin automatically configures iOS, but you may need to add Universal Links support for better user experience.

#### Universal Links (Recommended)

1. Add your domain to `config.xml`:

```xml
<platform name="ios">
    <preference name="IntercomUniversalLinkDomains" value="myapp.com,www.myapp.com" />
</platform>
```

2. Create an `apple-app-site-association` file on your web server at `https://myapp.com/.well-known/apple-app-site-association`:

```json
{
    "applinks": {
        "apps": [],
        "details": [
            {
                "appID": "TEAMID.com.yourcompany.yourapp",
                "paths": ["/app/*", "/product/*", "/profile/*"]
            }
        ]
    }
}
```

3. Handle Universal Links in your app:

```javascript
// Universal Links are handled the same way as custom URL schemes
// The handleOpenURL function will be called automatically
```

### Android Configuration

The plugin automatically adds the necessary intent filters to `AndroidManifest.xml`. For custom configuration, you can manually add:

```xml
<activity android:name="MainActivity" android:launchMode="singleTask">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="myapp" />
    </intent-filter>
</activity>
```

## Step 4: Using Deep Links with Intercom

### In Push Notifications

When creating push notifications in Intercom, set the URI field to your deep link:

```
myapp://product/123?source=push
```

### In In-App Messages

Add deep links to your in-app message content:

```html
<a href="myapp://support">Get Help</a>
<a href="myapp://profile/settings">Update Profile</a>
```

### In Help Center Articles

Include deep links in your Help Center articles:

```markdown
To view your order history, [click here](myapp://orders).
For account settings, [tap here](myapp://profile/settings).
```

## Step 5: Testing Deep Links

### Testing on Device

1. **iOS Simulator/Device**: Open Safari and type your deep link in the address bar:
   ```
   myapp://profile/123
   ```

2. **Android Emulator/Device**: Use ADB to test:
   ```bash
   adb shell am start -W -a android.intent.action.VIEW -d "myapp://profile/123" com.yourcompany.yourapp
   ```

3. **Create Test HTML Page**:
   ```html
   <!DOCTYPE html>
   <html>
   <body>
       <h1>Deep Link Test</h1>
       <a href="myapp://profile/123">Open Profile</a><br>
       <a href="myapp://product/456?color=red">Open Product</a><br>
       <a href="myapp://support">Open Support</a>
   </body>
   </html>
   ```

### Testing with Intercom

1. Create a test push notification with your deep link as the URI
2. Send yourself a test in-app message with deep link buttons
3. Add deep links to a test Help Center article

## Common Issues and Solutions

### handleOpenURL Not Called

**Problem**: The `handleOpenURL` function isn't being called when the app opens.

**Solutions**:
- Ensure the function is defined in the global scope
- Check that the URL scheme is correctly configured
- On iOS, verify the app isn't already running in the background

### App Opens But Doesn't Navigate

**Problem**: The app opens but doesn't navigate to the correct screen.

**Solutions**:
- Add logging to debug the URL parsing
- Ensure your routing logic handles all expected URL formats
- Check that navigation functions are properly implemented

### Android Intent Issues

**Problem**: Deep links don't work on Android.

**Solutions**:
- Verify the intent filter is correctly added to AndroidManifest.xml
- Set `android:launchMode="singleTask"` on your main activity
- Check for conflicts with other plugins

## Best Practices

1. **URL Structure**: Use a consistent, hierarchical URL structure:
   ```
   myapp://section/item/action?param=value
   ```

2. **Fallback Handling**: Always provide fallback behavior for unrecognized URLs:
   ```javascript
   function routeToScreen(pathSegments, params) {
       // ... routing logic ...
       
       // Fallback to home if no route matches
       navigateToHome();
   }
   ```

3. **Parameter Validation**: Validate and sanitize URL parameters:
   ```javascript
   function navigateToProfile(userId, params) {
       if (!userId || !userId.match(/^\d+$/)) {
           console.error("Invalid user ID");
           navigateToHome();
           return;
       }
       // ... navigation logic ...
   }
   ```

4. **Analytics**: Track deep link usage for insights:
   ```javascript
   function processDeepLink(url) {
       // Track deep link usage
       intercom.logEvent('deep_link_opened', { url: url });
       
       // ... rest of processing ...
   }
   ```

## Next Steps

- Implement deep linking in your app using this guide
- Test thoroughly on both iOS and Android devices
- Create deep links in your Intercom messages and Help Center content
- Monitor deep link usage through analytics

For more information about Intercom's deep linking capabilities, see:
- [iOS Deep Linking Documentation](https://developers.intercom.com/installing-intercom/ios/deep-linking)
- [Android Deep Linking Documentation](https://developers.intercom.com/installing-intercom/android/deep-linking)
