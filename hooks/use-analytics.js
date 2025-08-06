import { useEffect } from "react";
import * as analytics from "@/lib/analytics";

export const useAnalytics = () => {
  return {
    // E-commerce tracking
    trackPurchase: analytics.trackPurchase,
    trackAddToCart: analytics.trackAddToCart,
    trackRemoveFromCart: analytics.trackRemoveFromCart,
    trackViewItem: analytics.trackViewItem,
    trackBeginCheckout: analytics.trackBeginCheckout,

    // Custom events for Premika
    trackSizeSelection: analytics.trackSizeSelection,
    trackImageClick: analytics.trackImageClick,
    trackEmailSignup: analytics.trackEmailSignup,
    trackContactForm: analytics.trackContactForm,

    // Generic event tracking
    trackEvent: analytics.event,
  };
};

// Hook for automatic product view tracking
export const useProductView = (product) => {
  const { trackViewItem } = useAnalytics();

  useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product, trackViewItem]);
};
