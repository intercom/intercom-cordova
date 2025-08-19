/**
 * Deep Linking Example for Cordova + Intercom
 * 
 * This example shows how to implement deep linking in a Cordova app
 * that integrates with Intercom for customer support.
 * 
 * URL Scheme: myshop://
 * 
 * Supported deep links:
 * - myshop://                          -> Home screen
 * - myshop://product/123               -> Product detail page
 * - myshop://category/electronics      -> Category page
 * - myshop://profile                   -> User profile
 * - myshop://orders                    -> Order history
 * - myshop://support                   -> Open Intercom
 * - myshop://support/article/456       -> Open specific help article
 * - myshop://cart?promo=SAVE20         -> Cart with promo code applied
 */

// Global deep link handler - must be in global scope
function handleOpenURL(url) {
    console.log("Deep link received: " + url);
    
    // Store the URL for processing after app is ready
    window.pendingDeepLink = url;
    
    // If app is already ready, process immediately
    if (window.appReady) {
        processDeepLink(url);
    }
}

// App initialization
document.addEventListener('deviceready', function() {
    console.log("Device ready");
    window.appReady = true;
    
    // Initialize Intercom
    initializeIntercom();
    
    // Process any pending deep link
    if (window.pendingDeepLink) {
        processDeepLink(window.pendingDeepLink);
        window.pendingDeepLink = null;
    }
}, false);

function initializeIntercom() {
    // Login user to Intercom (example with unidentified user)
    intercom.loginUnidentifiedUser({}, 
        function() {
            console.log("Intercom login successful");
        },
        function(error) {
            console.error("Intercom login failed:", error);
        }
    );
}

function processDeepLink(url) {
    try {
        const parsedUrl = parseDeepLink(url);
        
        // Log deep link usage for analytics
        intercom.logEvent('deep_link_opened', {
            url: url,
            path: parsedUrl.path,
            source: parsedUrl.params.source || 'unknown'
        });
        
        // Route to appropriate screen
        routeToScreen(parsedUrl);
        
    } catch (error) {
        console.error("Error processing deep link:", error);
        // Fallback to home screen
        navigateToHome();
    }
}

function parseDeepLink(url) {
    // Parse URL: myshop://path/to/resource?param1=value1&param2=value2
    const urlParts = url.split('://');
    if (urlParts.length < 2) {
        throw new Error("Invalid URL format");
    }
    
    const scheme = urlParts[0]; // "myshop"
    const pathAndQuery = urlParts[1]; // "path/to/resource?param1=value1"
    
    // Split path and query
    const [fullPath, queryString] = pathAndQuery.split('?');
    const pathSegments = fullPath.split('/').filter(segment => segment.length > 0);
    
    // Parse query parameters
    const params = {};
    if (queryString) {
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        });
    }
    
    return {
        scheme: scheme,
        path: pathSegments,
        params: params,
        fullPath: fullPath
    };
}

function routeToScreen(parsedUrl) {
    const path = parsedUrl.path;
    const params = parsedUrl.params;
    
    if (path.length === 0) {
        // myshop:// -> Home
        navigateToHome();
        
    } else if (path[0] === 'product' && path[1]) {
        // myshop://product/123
        const productId = path[1];
        navigateToProduct(productId, params);
        
    } else if (path[0] === 'category' && path[1]) {
        // myshop://category/electronics
        const categoryName = path[1];
        navigateToCategory(categoryName, params);
        
    } else if (path[0] === 'profile') {
        // myshop://profile
        navigateToProfile(params);
        
    } else if (path[0] === 'orders') {
        // myshop://orders
        navigateToOrders(params);
        
    } else if (path[0] === 'cart') {
        // myshop://cart?promo=SAVE20
        navigateToCart(params);
        
    } else if (path[0] === 'support') {
        if (path[1] === 'article' && path[2]) {
            // myshop://support/article/456
            const articleId = path[2];
            openIntercomArticle(articleId);
        } else {
            // myshop://support
            openIntercomSupport();
        }
        
    } else {
        // Unknown path - fallback to home
        console.warn("Unknown deep link path:", path);
        navigateToHome();
    }
}

// Navigation functions - implement based on your app framework
function navigateToHome() {
    console.log("Navigating to home screen");
    
    // Example: If using a single-page app framework
    // window.location.hash = '#/home';
    
    // Example: If using a multi-page app
    // window.location.href = 'index.html';
    
    // Show success message
    showToast("Welcome to MyShop!");
}

function navigateToProduct(productId, params) {
    console.log("Navigating to product:", productId, params);
    
    // Validate product ID
    if (!productId.match(/^\d+$/)) {
        console.error("Invalid product ID:", productId);
        navigateToHome();
        return;
    }
    
    // Example navigation
    // window.location.hash = '#/product/' + productId;
    
    // Apply any special parameters
    if (params.highlight) {
        // Highlight specific feature
        console.log("Highlighting feature:", params.highlight);
    }
    
    showToast("Opening product " + productId);
}

function navigateToCategory(categoryName, params) {
    console.log("Navigating to category:", categoryName, params);
    
    // Sanitize category name
    const sanitizedCategory = categoryName.replace(/[^a-zA-Z0-9-_]/g, '');
    
    // Example navigation
    // window.location.hash = '#/category/' + sanitizedCategory;
    
    // Apply filters if provided
    if (params.filter) {
        console.log("Applying filter:", params.filter);
    }
    
    showToast("Opening " + categoryName + " category");
}

function navigateToProfile(params) {
    console.log("Navigating to profile", params);
    
    // Example navigation
    // window.location.hash = '#/profile';
    
    // Open specific tab if provided
    if (params.tab) {
        console.log("Opening tab:", params.tab);
        // Example: openProfileTab(params.tab);
    }
    
    showToast("Opening your profile");
}

function navigateToOrders(params) {
    console.log("Navigating to orders", params);
    
    // Example navigation
    // window.location.hash = '#/orders';
    
    // Filter by status if provided
    if (params.status) {
        console.log("Filtering by status:", params.status);
    }
    
    showToast("Opening your orders");
}

function navigateToCart(params) {
    console.log("Navigating to cart", params);
    
    // Example navigation
    // window.location.hash = '#/cart';
    
    // Apply promo code if provided
    if (params.promo) {
        console.log("Applying promo code:", params.promo);
        applyPromoCode(params.promo);
    }
    
    showToast("Opening your cart");
}

function openIntercomSupport() {
    console.log("Opening Intercom support");
    
    // Open Intercom messenger
    intercom.present();
    
    // Log support access
    intercom.logEvent('support_accessed', {
        source: 'deep_link'
    });
}

function openIntercomArticle(articleId) {
    console.log("Opening Intercom article:", articleId);
    
    // Validate article ID
    if (!articleId.match(/^\d+$/)) {
        console.error("Invalid article ID:", articleId);
        openIntercomSupport();
        return;
    }
    
    // Open specific article
    const article = intercomContent.articleWithArticleId(articleId);
    intercom.presentContent(article);
    
    // Log article access
    intercom.logEvent('help_article_opened', {
        article_id: articleId,
        source: 'deep_link'
    });
}

// Utility functions
function applyPromoCode(promoCode) {
    console.log("Applying promo code:", promoCode);
    
    // Example: Apply promo code to cart
    // CartService.applyPromoCode(promoCode);
    
    // Show confirmation
    showToast("Promo code " + promoCode + " applied!");
    
    // Track promo usage
    intercom.logEvent('promo_code_applied', {
        promo_code: promoCode,
        source: 'deep_link'
    });
}

function showToast(message) {
    // Simple toast implementation
    console.log("Toast:", message);
    
    // Example: If using a UI framework with toast support
    // UIFramework.showToast(message);
    
    // Fallback: Show alert (remove in production)
    // alert(message);
}

// Error handling for deep links
window.addEventListener('error', function(event) {
    if (event.message && event.message.includes('deep link')) {
        console.error("Deep link error:", event.error);
        
        // Log error to Intercom
        intercom.logEvent('deep_link_error', {
            error: event.message,
            url: window.pendingDeepLink || 'unknown'
        });
        
        // Fallback to home
        navigateToHome();
    }
});

// Export functions for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseDeepLink: parseDeepLink,
        routeToScreen: routeToScreen,
        processDeepLink: processDeepLink
    };
}
