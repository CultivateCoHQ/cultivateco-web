/**
 * @fileoverview Utility functions for the CultivateCo Cannabis Platform.
 * This file contains helper functions for analytics, formatting, and other common operations.
 */

// ============================================================================
// ANALYTICS FUNCTIONS
// ============================================================================

interface CannabisAnalyticsConfig {
  googleAnalyticsId?: string;
  intercomAppId?: string;
  hotjarSiteId?: number;
}

/**
 * Initialize cannabis analytics services
 * @param config - Analytics configuration object
 */
export const initializeCannabisAnalytics = (config: CannabisAnalyticsConfig): void => {
  if (typeof window === 'undefined') return;

  // Initialize Google Analytics
  if (config.googleAnalyticsId) {
    console.log('Initializing Google Analytics with ID:', config.googleAnalyticsId);
    // Add your GA initialization logic here
  }

  // Initialize Intercom
  if (config.intercomAppId) {
    console.log('Initializing Intercom with App ID:', config.intercomAppId);
    // Add your Intercom initialization logic here
  }

  // Initialize Hotjar
  if (config.hotjarSiteId) {
    console.log('Initializing Hotjar with Site ID:', config.hotjarSiteId);
    // Add your Hotjar initialization logic here
  }
};

/**
 * Track cannabis-related events
 * @param eventName - Name of the event to track
 * @param data - Event data object
 */
export const trackCannabisEvent = (eventName: string, data: Record<string, any>): void => {
  if (typeof window === 'undefined') return;

  console.log('Tracking cannabis event:', eventName, data);
  
  // Track with Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, data);
  }

  // Track with other analytics services as needed
};

// ============================================================================
// DATE FORMATTING FUNCTIONS
// ============================================================================

/**
 * Format a date for cannabis platform display
 * @param date - Date to format
 * @param format - Format string (default: 'MM/dd/yyyy')
 * @returns Formatted date string
 */
export const formatCannabisDate = (date: Date | string, format: string = 'MM/dd/yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  // Simple formatting - you can enhance this with a proper date library
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();

  switch (format) {
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    case 'MMM dd, yyyy':
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[dateObj.getMonth()]} ${day}, ${year}`;
    default:
      return `${month}/${day}/${year}`;
  }
};

// ============================================================================
// ADDITIONAL UTILITY FUNCTIONS
// ============================================================================

/**
 * Validate cannabis compliance data
 * @param data - Data to validate
 * @returns Boolean indicating if data is valid
 */
export const validateCannabisCompliance = (data: any): boolean => {
  // Add your validation logic here
  return data && typeof data === 'object';
};

/**
 * Format cannabis product names
 * @param productName - Raw product name
 * @returns Formatted product name
 */
export const formatCannabisProductName = (productName: string): string => {
  if (!productName) return '';
  
  // Capitalize first letter of each word
  return productName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generate cannabis tracking ID
 * @param prefix - Prefix for the ID
 * @returns Generated tracking ID
 */
export const generateCannabisTrackingId = (prefix: string = 'CAN'): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
};
