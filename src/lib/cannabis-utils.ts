/**
 * @fileoverview Utility functions for the CultivateCo Cannabis Platform.
 * This file contains helper functions for analytics, formatting, and other common operations.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================================
// TAILWIND UTILITY FUNCTIONS
// ============================================================================

/**
 * The 'cn' function combines Tailwind CSS classes intelligently
 * @param inputs - Array of class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ============================================================================
// ANALYTICS FUNCTIONS
// ============================================================================

interface CannabisAnalyticsConfig {
  googleAnalyticsId?: string;
  intercomAppId?: string;
  hotjarSiteId?: number;
  mixpanelToken?: string;
}

/**
 * Initialize cannabis analytics services
 * @param config - Analytics configuration object
 */
export const initializeCannabisAnalytics = (config: CannabisAnalyticsConfig): void => {
  if (typeof window === 'undefined') return;

  console.log('🌿 Initializing CultivateCo Analytics...');

  // Initialize Google Analytics
  if (config.googleAnalyticsId) {
    console.log('📊 Setting up Google Analytics:', config.googleAnalyticsId);
    // Google Analytics 4 initialization would go here
    (window as any).gtag?.('config', config.googleAnalyticsId);
  }

  // Initialize Intercom
  if (config.intercomAppId) {
    console.log('💬 Setting up Intercom:', config.intercomAppId);
    // Intercom initialization would go here
  }

  // Initialize Hotjar
  if (config.hotjarSiteId) {
    console.log('🔥 Setting up Hotjar:', config.hotjarSiteId);
    // Hotjar initialization would go here
  }

  // Initialize Mixpanel
  if (config.mixpanelToken) {
    console.log('📈 Setting up Mixpanel:', config.mixpanelToken);
    // Mixpanel initialization would go here
  }

  console.log('✅ Cannabis analytics initialization complete!');
};

// ============================================================================
// FORMATTING UTILITY FUNCTIONS
// ============================================================================

/**
 * Function to format a cannabis-related phone number
 * @param phone - Raw phone number string
 * @returns Formatted phone number
 */
export function formatCannabisPhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different phone number lengths
  if (cleaned.length === 10) {
    // US phone number: (XXX) XXX-XXXX
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    // US phone number with country code: +1 (XXX) XXX-XXXX
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 7) {
    // Local number: XXX-XXXX
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  }
  
  // Return original if it doesn't match expected formats
  return phone;
}

/**
 * Function to format a compliance score
 * @param score - Compliance score (0-100)
 * @returns Formatted score string with percentage
 */
export function formatComplianceScore(score: number): string {
  if (typeof score !== 'number' || isNaN(score)) return '0%';
  
  // Clamp score between 0 and 100
  const clampedScore = Math.max(0, Math.min(100, score));
  
  // Format with appropriate decimal places
  if (clampedScore === Math.floor(clampedScore)) {
    return `${clampedScore}%`;
  } else {
    return `${clampedScore.toFixed(1)}%`;
  }
}

/**
 * Function to format cannabis revenue
 * @param revenue - Revenue amount in dollars
 * @returns Formatted revenue string
 */
export function formatCannabisRevenue(revenue: number): string {
  if (typeof revenue !== 'number' || isNaN(revenue)) return '$0.00';
  
  const absRevenue = Math.abs(revenue);
  const isNegative = revenue < 0;
  
  let formatted: string;
  
  if (absRevenue >= 1_000_000_000) {
    // Billions
    formatted = `${(absRevenue / 1_000_000_000).toFixed(2)}B`;
  } else if (absRevenue >= 1_000_000) {
    // Millions
    formatted = `${(absRevenue / 1_000_000).toFixed(2)}M`;
  } else if (absRevenue >= 1_000) {
    // Thousands
    formatted = `${(absRevenue / 1_000).toFixed(2)}K`;
  } else {
    // Under 1000
    formatted = `${absRevenue.toFixed(2)}`;
  }
  
  return isNegative ? `-${formatted}` : formatted;
}

// ============================================================================
// VALIDATION UTILITY FUNCTIONS
// ============================================================================

/**
 * Function to validate a cannabis-related email address
 * @param email - Email address to validate
 * @returns Boolean indicating if email is valid
 */
export function isValidCannabisEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  // Basic email regex pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Additional cannabis industry validations
  const trimmedEmail = email.trim().toLowerCase();
  
  // Check basic format
  if (!emailPattern.test(trimmedEmail)) return false;
  
  // Check for suspicious patterns common in cannabis spam
  const suspiciousPatterns = [
    /\.tk$/,           // Suspicious TLD
    /\.ml$/,           // Suspicious TLD
    /temp.*mail/i,     // Temporary email services
    /10.*minute/i,     // Temporary email services
    /guerrilla/i,      // Guerrilla mail
    /mailinator/i      // Temporary email service
  ];
  
  const hasSuspiciousPattern = suspiciousPatterns.some(pattern => 
    pattern.test(trimmedEmail)
  );
  
  return !hasSuspiciousPattern;
}

/**
 * Function to validate a cannabis-related phone number
 * @param phone - Phone number to validate
 * @returns Boolean indicating if phone number is valid
 */
export function isValidCannabisPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Valid lengths for North American phone numbers
  const validLengths = [7, 10, 11];
  
  // Check if length is valid
  if (!validLengths.includes(cleaned.length)) return false;
  
  // If 11 digits, must start with 1 (US/Canada country code)
  if (cleaned.length === 11 && !cleaned.startsWith('1')) return false;
  
  // If 10 digits, area code can't start with 0 or 1
  if (cleaned.length === 10) {
    const areaCode = cleaned.slice(0, 3);
    if (areaCode.startsWith('0') || areaCode.startsWith('1')) return false;
  }
  
  // If 7 digits (local number), first digit can't be 0 or 1
  if (cleaned.length === 7) {
    if (cleaned.startsWith('0') || cleaned.startsWith('1')) return false;
  }
  
  return true;
}

/**
 * Function to sanitize cannabis-related user input
 * @param input - Raw user input string
 * @returns Sanitized input string
 */
export function sanitizeCannabisInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  // Trim whitespace
  let sanitized = input.trim();
  
  // Remove or replace potentially dangerous characters
  sanitized = sanitized
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script-related content
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Remove SQL injection attempts
    .replace(/['";\\]/g, '')
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove control characters except newlines and tabs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Limit length to prevent abuse
  const maxLength = 1000;
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }
  
  return sanitized;
}

/**
 * Track cannabis-related events
 * @param eventName - Name of the event to track
 * @param data - Event data object
 */
export const trackCannabisEvent = (eventName: string, data: Record<string, any> = {}): void => {
  if (typeof window === 'undefined') return;

  console.log('🔍 Tracking cannabis event:', eventName, data);
  
  // Track with Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, {
      ...data,
      cannabis_platform: 'CultivateCo',
      timestamp: new Date().toISOString()
    });
  }

  // Track with Mixpanel
  if ((window as any).mixpanel) {
    (window as any).mixpanel.track(eventName, {
      ...data,
      platform: 'CultivateCo',
      source: 'web'
    });
  }

  // Track with Intercom
  if ((window as any).Intercom) {
    (window as any).Intercom('trackEvent', eventName, data);
  }
};

/**
 * Function to track a page view for cannabis analytics
 * @param url - Page URL to track
 * @param title - Optional page title
 */
export function trackCannabisPageView(url: string, title?: string): void {
  if (typeof window === 'undefined' || !url) return;
  
  console.log('📄 Tracking cannabis page view:', url, title);
  
  const pageData = {
    page_location: url,
    page_title: title || document.title,
    cannabis_platform: 'CultivateCo',
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent,
    referrer: document.referrer || 'direct'
  };
  
  // Track with Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('config', 'GA_TRACKING_ID', {
      page_title: pageData.page_title,
      page_location: pageData.page_location,
    });
    
    (window as any).gtag('event', 'page_view', pageData);
  }
  
  // Track with Mixpanel
  if ((window as any).mixpanel) {
    (window as any).mixpanel.track('Page View', {
      url: url,
      title: pageData.page_title,
      platform: 'CultivateCo',
      source: 'web'
    });
  }
  
  // Track with Intercom
  if ((window as any).Intercom) {
    (window as any).Intercom('trackEvent', 'page_view', {
      url: url,
      title: pageData.page_title
    });
  }
  
  // Track with Hotjar (if available)
  if ((window as any).hj) {
    (window as any).hj('trigger', 'cannabis_page_view');
  }
}

// ============================================================================
// DATE FORMATTING FUNCTIONS
// ============================================================================

/**
 * Format a date for cannabis platform display
 * @param date - Date to format (Date object, string, or number)
 * @param format - Format string (default: 'MM/dd/yyyy')
 * @returns Formatted date string
 */
export const formatCannabisDate = (
  date: Date | string | number, 
  format: string = 'MM/dd/yyyy'
): string => {
  let dateObj: Date;

  // Handle different input types
  if (date instanceof Date) {
    dateObj = date;
  } else if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (typeof date === 'number') {
    dateObj = new Date(date);
  } else {
    return 'Invalid Date';
  }

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  // Format the date based on the format string
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const shortYear = String(year).slice(-2);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const shortMonthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  switch (format) {
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'MM/dd/yy':
      return `${month}/${day}/${shortYear}`;
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`;
    case 'MMM dd, yyyy':
      return `${shortMonthNames[dateObj.getMonth()]} ${day}, ${year}`;
    case 'MMMM dd, yyyy':
      return `${monthNames[dateObj.getMonth()]} ${day}, ${year}`;
    case 'dd MMM yyyy':
      return `${day} ${shortMonthNames[dateObj.getMonth()]} ${year}`;
    case 'EEEE, MMMM dd, yyyy':
      return `${dayNames[dateObj.getDay()]}, ${monthNames[dateObj.getMonth()]} ${day}, ${year}`;
    case 'EEE, MMM dd, yyyy':
      return `${shortDayNames[dateObj.getDay()]}, ${shortMonthNames[dateObj.getMonth()]} ${day}, ${year}`;
    case 'relative':
      return formatRelativeDate(dateObj);
    default:
      return `${month}/${day}/${year}`;
  }
};

/**
 * Format a date as relative time (e.g., "2 days ago", "in 3 hours")
 * @param date - Date to format
 * @returns Relative date string
 */
const formatRelativeDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffWeek = Math.round(diffDay / 7);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  if (Math.abs(diffYear) >= 1) {
    return diffYear > 0 ? `${diffYear} year${diffYear !== 1 ? 's' : ''} ago` 
                       : `in ${Math.abs(diffYear)} year${Math.abs(diffYear) !== 1 ? 's' : ''}`;
  } else if (Math.abs(diffMonth) >= 1) {
    return diffMonth > 0 ? `${diffMonth} month${diffMonth !== 1 ? 's' : ''} ago` 
                        : `in ${Math.abs(diffMonth)} month${Math.abs(diffMonth) !== 1 ? 's' : ''}`;
  } else if (Math.abs(diffWeek) >= 1) {
    return diffWeek > 0 ? `${diffWeek} week${diffWeek !== 1 ? 's' : ''} ago` 
                       : `in ${Math.abs(diffWeek)} week${Math.abs(diffWeek) !== 1 ? 's' : ''}`;
  } else if (Math.abs(diffDay) >= 1) {
    return diffDay > 0 ? `${diffDay} day${diffDay !== 1 ? 's' : ''} ago` 
                      : `in ${Math.abs(diffDay)} day${Math.abs(diffDay) !== 1 ? 's' : ''}`;
  } else if (Math.abs(diffHour) >= 1) {
    return diffHour > 0 ? `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago` 
                       : `in ${Math.abs(diffHour)} hour${Math.abs(diffHour) !== 1 ? 's' : ''}`;
  } else if (Math.abs(diffMin) >= 1) {
    return diffMin > 0 ? `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago` 
                      : `in ${Math.abs(diffMin)} minute${Math.abs(diffMin) !== 1 ? 's' : ''}`;
  } else {
    return 'just now';
  }
};

// ============================================================================
// CANNABIS BUSINESS UTILITIES
// ============================================================================

/**
 * Validate cannabis compliance data structure
 * @param data - Data to validate
 * @returns Boolean indicating if data is valid
 */
export const validateCannabisCompliance = (data: any): boolean => {
  if (!data || typeof data !== 'object') return false;
  
  // Basic validation - can be extended based on specific requirements
  const requiredFields = ['id', 'type', 'status'];
  return requiredFields.every(field => field in data);
};

/**
 * Format cannabis product names for display
 * @param productName - Raw product name
 * @returns Formatted product name
 */
export const formatCannabisProductName = (productName: string): string => {
  if (!productName || typeof productName !== 'string') return '';
  
  return productName
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Generate cannabis tracking ID with prefix
 * @param prefix - Prefix for the ID (default: 'CAN')
 * @returns Generated tracking ID
 */
export const generateCannabisTrackingId = (prefix: string = 'CAN'): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 8);
  return `${prefix}-${timestamp}-${random}`.toUpperCase();
};

/**
 * Format cannabis weight for display
 * @param weight - Weight in grams
 * @param unit - Target unit (g, oz, lb)
 * @returns Formatted weight string
 */
export const formatCannabisWeight = (weight: number, unit: 'g' | 'oz' | 'lb' = 'g'): string => {
  if (typeof weight !== 'number' || isNaN(weight) || weight < 0) {
    return '0 g';
  }

  let convertedWeight: number;
  let unitLabel: string;

  switch (unit) {
    case 'oz':
      convertedWeight = weight / 28.3495;
      unitLabel = 'oz';
      break;
    case 'lb':
      convertedWeight = weight / 453.592;
      unitLabel = 'lb';
      break;
    case 'g':
    default:
      convertedWeight = weight;
      unitLabel = 'g';
      break;
  }

  // Format to appropriate decimal places
  const formatted = convertedWeight < 1 
    ? convertedWeight.toFixed(3)
    : convertedWeight.toFixed(2);

  return `${parseFloat(formatted)} ${unitLabel}`;
};

/**
 * Calculate cannabis tax based on weight and jurisdiction
 * @param weight - Weight in grams
 * @param jurisdiction - Tax jurisdiction
 * @param productType - Type of cannabis product
 * @returns Tax amount in dollars
 */
export const calculateCannabisTax = (
  weight: number, 
  jurisdiction: string = 'CA', 
  productType: string = 'flower'
): number => {
  // This is a simplified example - real tax calculations would be much more complex
  const taxRates: Record<string, Record<string, number>> = {
    CA: {
      flower: 9.25,  // $ per ounce
      concentrate: 2.87,  // $ per gram
      edible: 0.05   // $ per mg THC
    },
    CO: {
      flower: 15.00,
      concentrate: 15.00,
      edible: 15.00
    }
  };

  const rates = taxRates[jurisdiction] || taxRates.CA;
  const rate = rates[productType] || rates.flower;

  if (productType === 'flower') {
    const ounces = weight / 28.3495;
    return ounces * rate;
  } else {
    return weight * rate;
  }
};

// ============================================================================
// EXPORT ALL FUNCTIONS
// ============================================================================

export default {
  // Tailwind utilities
  cn,
  
  // Analytics
  initializeCannabisAnalytics,
  trackCannabisEvent,
  trackCannabisPageView,
  
  // Date formatting
  formatCannabisDate,
  
  // Formatting utilities
  formatCannabisPhone,
  formatComplianceScore,
  formatCannabisRevenue,
  
  // Validation utilities
  isValidCannabisEmail,
  isValidCannabisPhone,
  sanitizeCannabisInput,
  
  // Business utilities
  validateCannabisCompliance,
  formatCannabisProductName,
  generateCannabisTrackingId,
  formatCannabisWeight,
  calculateCannabisTax
};
