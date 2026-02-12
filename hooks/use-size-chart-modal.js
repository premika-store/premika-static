import { create } from "zustand";

// productType can be: "female" (default), "male", or "combo"
const useSizeChartModal = create((set) => ({
  isOpen: false,
  productType: "female", // default to female size chart
  onOpen: (type = "female") => set({ isOpen: true, productType: type }),
  onClose: () => set({ isOpen: false, productType: "female" }),
}));

export default useSizeChartModal;