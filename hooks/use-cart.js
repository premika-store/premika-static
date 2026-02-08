import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import toast from "react-hot-toast";

// Helper function to compare combo selections
const areComboSelectionsEqual = (sel1, sel2) => {
  if (!sel1 && !sel2) return true;
  if (!sel1 || !sel2) return false;
  const keys1 = Object.keys(sel1);
  const keys2 = Object.keys(sel2);
  if (keys1.length !== keys2.length) return false;
  return keys1.every(
    (key) =>
      sel2[key] &&
      sel1[key].size === sel2[key].size &&
      sel1[key].height === sel2[key].height
  );
};

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;
        // Find existing item with same ID, size, height, and combo selections
        const existingItemIndex = currentItems.findIndex((item) => {
          const sameId = item.id === data.id;
          
          // For combo products, compare combo selections
          if (data.isCombo) {
            return sameId && areComboSelectionsEqual(item.comboSelections, data.comboSelections);
          }
          
          // For regular products, compare size and height
          return (
            sameId &&
            item.selectedSize === data.selectedSize &&
            item.selectedHeight === data.selectedHeight
          );
        });

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
          
          // Format toast message based on product type
          if (data.isCombo) {
            toast.success(`Updated quantity to ${newQuantity} for ${data.name}`);
          } else {
            toast.success(
              `Updated quantity to ${newQuantity} for ${data.name} (Size: ${data.selectedSize}, Height: ${data.selectedHeight})`
            );
          }
        } else {
          // Add new item with quantity
          const newItem = {
            ...data,
            quantity: data.quantity || 1,
          };
          set({ items: [...currentItems, newItem] });
          
          // Format toast message based on product type
          if (data.isCombo) {
            toast.success(`${data.name} added to cart`);
          } else {
            toast.success(
              `${data.name} (Size: ${data.selectedSize}, Height: ${data.selectedHeight}) added to cart`
            );
          }
        }
      },
      removeItem: (id, selectedSize, selectedHeight, comboSelections) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter((item) => {
          // For combo products
          if (item.isCombo) {
            return !(item.id === id && areComboSelectionsEqual(item.comboSelections, comboSelections));
          }
          // For regular products
          return !(
            item.id === id &&
            item.selectedSize === selectedSize &&
            item.selectedHeight === selectedHeight
          );
        });
        set({ items: updatedItems });
        toast.success("Item removed from cart");
      },
      updateQuantity: (id, selectedSize, selectedHeight, newQuantity, comboSelections) => {
        const currentItems = get().items;
        if (newQuantity <= 0) {
          // Remove item if quantity is 0 or less
          const updatedItems = currentItems.filter((item) => {
            // For combo products
            if (item.isCombo) {
              return !(item.id === id && areComboSelectionsEqual(item.comboSelections, comboSelections));
            }
            // For regular products
            return !(
              item.id === id &&
              item.selectedSize === selectedSize &&
              item.selectedHeight === selectedHeight
            );
          });
          set({ items: updatedItems });
          toast.success("Item removed from cart");
        } else {
          // Update quantity
          const updatedItems = currentItems.map((item) => {
            // For combo products
            if (item.isCombo) {
              return item.id === id && areComboSelectionsEqual(item.comboSelections, comboSelections)
                ? { ...item, quantity: newQuantity }
                : item;
            }
            // For regular products
            return item.id === id &&
              item.selectedSize === selectedSize &&
              item.selectedHeight === selectedHeight
              ? { ...item, quantity: newQuantity }
              : item;
          });
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
