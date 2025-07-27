import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCheckout = create(
  persist(
    (set, get) => ({
      checkoutData: null,

      // Set checkout data
      setCheckoutData: (data) => set({ checkoutData: data }),

      // Get checkout data
      getCheckoutData: () => get().checkoutData,

      // Clear checkout data (after successful payment)
      clearCheckoutData: () => set({ checkoutData: null }),

      // Check if checkout data exists
      hasCheckoutData: () => !!get().checkoutData,
    }),
    {
      name: "checkout-storage", // unique name for storage
      storage: createJSONStorage(() => {
        // Use sessionStorage instead of localStorage for better security
        if (typeof window !== "undefined") {
          return sessionStorage;
        }
        return undefined;
      }),
    }
  )
);

export default useCheckout;
