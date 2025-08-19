# Deep Linking Examples for Cordova + Intercom

This directory contains practical examples for implementing deep linking in Cordova apps with Intercom integration.

## Files Overview

### 📄 `deep-linking-example.js`
Complete JavaScript implementation showing:
- Global `handleOpenURL` function
- URL parsing and routing logic
- Integration with Intercom events and content
- Error handling and fallbacks
- Example navigation functions

### ⚙️ `config-example.xml`
Sample Cordova configuration file with:
- Intercom plugin configuration
- Custom URL scheme setup
- Platform-specific settings for iOS and Android
- Universal Links configuration
- Required permissions and preferences

### 🧪 `deep-link-test.html`
Interactive test page for validating deep links:
- Clickable links for all supported URL patterns
- Visual feedback and URL display
- Mobile-optimized interface
- Testing instructions and commands

## Quick Start

### 1. Install Required Plugins

```bash
# Install Intercom plugin
cordova plugin add cordova-plugin-intercom

# Install Custom URL Scheme plugin (replace 'myshop' with your scheme)
cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=myshop
```

### 2. Configure Your App

1. Copy the relevant sections from `config-example.xml` to your `config.xml`
2. Replace placeholder values with your actual Intercom credentials
3. Update the URL scheme to match your app

### 3. Implement Deep Link Handling

1. Copy `deep-linking-example.js` to your project
2. Include it in your main HTML file:
   ```html
   <script src="js/deep-linking-example.js"></script>
   ```
3. Customize the routing logic for your app's navigation

### 4. Test Your Implementation

1. Host `deep-link-test.html` on a web server or open it locally
2. Access it from your mobile device
3. Click the test links to verify deep linking works

## Supported URL Patterns

The example implementation supports these URL patterns:

### Basic Navigation
- `myshop://` → Home screen
- `myshop://profile` → User profile
- `myshop://orders` → Order history
- `myshop://cart` → Shopping cart

### Product Pages
- `myshop://product/123` → Product detail page
- `myshop://product/123?highlight=reviews` → Product with specific section highlighted

### Categories
- `myshop://category/electronics` → Category listing
- `myshop://category/clothing?filter=sale` → Filtered category

### Support (Intercom Integration)
- `myshop://support` → Open Intercom messenger
- `myshop://support/article/456` → Open specific help article

### Advanced Examples
- `myshop://profile?tab=settings` → Profile with specific tab
- `myshop://cart?promo=SAVE20` → Cart with promo code applied
- `myshop://orders?status=pending` → Filtered order list

## Customization Guide

### 1. Change URL Scheme

Replace `myshop` with your app's scheme in:
- Plugin installation command
- `config.xml` configuration
- JavaScript URL parsing logic
- Test HTML file

### 2. Add New Routes

To add a new deep link pattern:

1. **Update the routing function:**
   ```javascript
   function routeToScreen(parsedUrl) {
       // Add your new route
       if (path[0] === 'newroute') {
           navigateToNewScreen(path[1], params);
       }
   }
   ```

2. **Implement navigation function:**
   ```javascript
   function navigateToNewScreen(id, params) {
       console.log("Navigating to new screen:", id, params);
       // Your navigation logic here
   }
   ```

3. **Add test link to HTML:**
   ```html
   <a href="myshop://newroute/123" class="deep-link">
       New Screen
       <div class="url-display">myshop://newroute/123</div>
   </a>
   ```

### 3. Integrate with Your Navigation Framework

The examples use generic navigation functions. Replace them with your framework's methods:

#### For Ionic/Angular:
```javascript
function navigateToProduct(productId, params) {
    this.navCtrl.navigateForward(`/product/${productId}`, {
        queryParams: params
    });
}
```

#### For React Native:
```javascript
function navigateToProduct(productId, params) {
    navigation.navigate('Product', {
        productId: productId,
        ...params
    });
}
```

#### For Framework7:
```javascript
function navigateToProduct(productId, params) {
    app.views.main.router.navigate(`/product/${productId}/`, {
        props: params
    });
}
```

## Testing Commands

### iOS Simulator
```bash
xcrun simctl openurl booted "myshop://product/123"
```

### Android Emulator/Device
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myshop://product/123" com.example.myshop
```

### Browser Testing (Desktop)
Open the test HTML file and click the links. They won't open the app but will show the URL structure.

## Troubleshooting

### Deep Links Not Working

1. **Check plugin installation:**
   ```bash
   cordova plugin list | grep customurlscheme
   ```

2. **Verify URL scheme in config.xml:**
   ```xml
   <plugin name="cordova-plugin-customurlscheme">
       <variable name="URL_SCHEME" value="myshop" />
   </plugin>
   ```

3. **Ensure handleOpenURL is global:**
   ```javascript
   // Must be in global scope, not inside document.ready
   function handleOpenURL(url) {
       // Handler code
   }
   ```

### App Opens But Doesn't Navigate

1. **Add debug logging:**
   ```javascript
   function processDeepLink(url) {
       console.log("Processing deep link:", url);
       // Add more logging throughout the function
   }
   ```

2. **Check device ready state:**
   ```javascript
   function handleOpenURL(url) {
       console.log("Device ready:", !!window.cordova);
       console.log("App ready:", !!window.appReady);
   }
   ```

### Android-Specific Issues

1. **Check launch mode in AndroidManifest.xml:**
   ```xml
   <activity android:launchMode="singleTask" />
   ```

2. **Verify intent filter:**
   ```xml
   <intent-filter>
       <data android:scheme="myshop" />
       <action android:name="android.intent.action.VIEW" />
       <category android:name="android.intent.category.DEFAULT" />
       <category android:name="android.intent.category.BROWSABLE" />
   </intent-filter>
   ```

## Integration with Intercom

### Creating Deep Links in Intercom

1. **Push Notifications:** Set the URI field to your deep link
2. **In-App Messages:** Use HTML links in message content
3. **Help Center:** Add deep links to article content
4. **Email Campaigns:** Include deep links in email templates

### Tracking Deep Link Usage

The example includes Intercom event tracking:

```javascript
// Track deep link opens
intercom.logEvent('deep_link_opened', {
    url: url,
    path: parsedUrl.path,
    source: parsedUrl.params.source || 'unknown'
});

// Track specific actions
intercom.logEvent('product_viewed_via_deeplink', {
    product_id: productId,
    source: 'deep_link'
});
```

## Best Practices

1. **Always validate input:** Check URL parameters before using them
2. **Provide fallbacks:** Handle unknown URLs gracefully
3. **Track usage:** Monitor deep link performance with analytics
4. **Test thoroughly:** Verify on both iOS and Android devices
5. **Keep URLs simple:** Use clear, hierarchical URL structures
6. **Handle edge cases:** Account for app states and network conditions

## Need Help?

- Check the main [DEEP_LINKING.md](../DEEP_LINKING.md) documentation
- Review Intercom's platform-specific deep linking guides
- Test with the provided HTML test page
- Use browser developer tools to debug JavaScript issues
