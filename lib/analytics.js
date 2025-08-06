// Google Analytics utilities - Basic tracking only
//
// TRACKING SCOPE:
// - Page views and navigation
// - Basic click events
// - User location and demographics (automatic)
// - Site interaction patterns
//
// NO E-COMMERCE OR DETAILED PRODUCT TRACKING
//
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Basic interaction tracking - no product details
export const trackButtonClick = (buttonName) => {
  event({
    action: "click",
    category: "UI",
    label: buttonName,
  });
};

export const trackPageInteraction = (interactionType) => {
  event({
    action: interactionType,
    category: "Engagement",
    label: "user_interaction",
  });
};

// Contact form submission tracking
export const trackContactForm = () => {
  event({
    action: "contact_form_submit",
    category: "Lead",
    label: "contact_page",
  });
};

// Basic navigation tracking
export const trackNavigation = (destination) => {
  event({
    action: "navigate",
    category: "Navigation",
    label: destination,
  });
};
