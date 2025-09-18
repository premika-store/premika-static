import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        // Find existing item with same ID, size, and height
        const existingItemIndex = currentItems.findIndex(
          (item) =>
            item.id === data.id &&
            item.selectedSize === data.selectedSize &&
            item.selectedHeight === data.selectedHeight
        );

        if (existingItemIndex !== -1) {
          // Update quantity of existing item
          const updatedItems = [...currentItems];
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity =
            (existingItem.quantity || 1) + (data.quantity || 1);

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
          };

          set({ items: updatedItems });
          toast.success(
            `Updated quantity to ${newQuantity} for ${data.name} (Size: ${data.selectedSize}, Height: ${data.selectedHeight})`
          );
        } else {
          // Add new item with quantity
          const newItem = {
            ...data,
            quantity: data.quantity || 1,
          };
          set({ items: [...currentItems, newItem] });
          toast.success(
            `${data.name} (Size: ${data.selectedSize}, Height: ${data.selectedHeight}) added to cart`
          );
        }
      },
      removeItem: (id, selectedSize, selectedHeight) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter(
          (item) =>
            !(
              item.id === id &&
              item.selectedSize === selectedSize &&
              item.selectedHeight === selectedHeight
            )
        );
        set({ items: updatedItems });
        toast.success("Item removed from cart");
      },
      updateQuantity: (id, selectedSize, selectedHeight, newQuantity) => {
        const currentItems = get().items;
        if (newQuantity <= 0) {
          // Remove item if quantity is 0 or less
          const updatedItems = currentItems.filter(
            (item) =>
              !(
                item.id === id &&
                item.selectedSize === selectedSize &&
                item.selectedHeight === selectedHeight
              )
          );
          set({ items: updatedItems });
          toast.success("Item removed from cart");
        } else {
          // Update quantity
          const updatedItems = currentItems.map((item) =>
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedHeight === selectedHeight
              ? { ...item, quantity: newQuantity }
              : item
          );
          set({ items: updatedItems });
          toast.success(`Quantity updated to ${newQuantity}`);
        }
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("All items removed from cart");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
