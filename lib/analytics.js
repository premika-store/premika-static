// Google Analytics utilities
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

// E-commerce tracking functions
export const trackPurchase = (transactionData) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionData.orderId,
      value: transactionData.total,
      currency: "INR",
      items: transactionData.items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }
};

export const trackAddToCart = (item) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "INR",
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          category: item.category,
          quantity: item.quantity || 1,
          price: item.price,
        },
      ],
    });
  }
};

export const trackRemoveFromCart = (item) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "remove_from_cart", {
      currency: "INR",
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          category: item.category,
          quantity: item.quantity || 1,
          price: item.price,
        },
      ],
    });
  }
};

export const trackViewItem = (item) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      currency: "INR",
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          category: item.category,
          price: item.price,
        },
      ],
    });
  }
};

export const trackBeginCheckout = (items, value) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      currency: "INR",
      value: value,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity || 1,
        price: item.price,
      })),
    });
  }
};

// Custom events for Premika
export const trackSizeSelection = (productId, size) => {
  event({
    action: "select_size",
    category: "Product",
    label: `${productId}-${size}`,
  });
};

export const trackImageClick = (productId, imageIndex) => {
  event({
    action: "image_click",
    category: "Product",
    label: `${productId}-image-${imageIndex}`,
  });
};

export const trackEmailSignup = (source) => {
  event({
    action: "email_signup",
    category: "Lead",
    label: source,
  });
};

export const trackContactForm = () => {
  event({
    action: "contact_form_submit",
    category: "Lead",
    label: "contact_page",
  });
};
