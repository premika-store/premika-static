"use client";

import Image from "next/image";
import Script from "next/script";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const cart = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "IN",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name))
      return "Name should only contain letters and spaces";
    return null;
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Phone number is required";
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    if (!phoneRegex.test(phone))
      return "Please enter a valid 10-digit mobile number starting with 6-9";
    return null;
  };

  const validateAddress = (address) => {
    if (!address.trim()) return "Address is required";
    if (address.length < 5) return "Address must be at least 5 characters";
    return null;
  };

  const validateCity = (city) => {
    if (!city.trim()) return "City is required";
    if (!/^[a-zA-Z\s]+$/.test(city))
      return "City should only contain letters and spaces";
    return null;
  };

  const validateState = (state) => {
    if (!state.trim()) return "State is required";
    if (!/^[a-zA-Z\s]+$/.test(state))
      return "State should only contain letters and spaces";
    return null;
  };

  const validatePostalCode = (postalCode) => {
    if (!postalCode.trim()) return "Postal code is required";
    const postalRegex = /^[1-9][0-9]{5}$/; // Indian postal code format
    if (!postalRegex.test(postalCode))
      return "Please enter a valid 6-digit postal code";
    return null;
  };

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.name = validateName(customerInfo.name);
    newErrors.email = validateEmail(customerInfo.email);
    newErrors.phone = validatePhone(customerInfo.phone);
    newErrors.addressLine1 = validateAddress(customerInfo.address.line1);
    newErrors.city = validateCity(customerInfo.address.city);
    newErrors.state = validateState(customerInfo.address.state);
    newErrors.postalCode = validatePostalCode(customerInfo.address.postal_code);

    // Remove null errors
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key] === null) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate total amount from cart items
  const totalAmount = cart.items.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  // Add shipping cost (you can modify this logic)
  const shippingCost = totalAmount > 500 ? 0 : 50;
  const finalAmount = totalAmount + shippingCost;

  useEffect(() => {
    // Check if cart is empty and redirect
    if (cart.items.length === 0) {
      toast.error("Your cart is empty. Please add items first.");
      router.push("/");
      return;
    }
  }, [cart.items, router]);

  const createOrder = async () => {
    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form before proceeding");
      return;
    }

    // Check if cart has items
    if (cart.items.length === 0) {
      toast.error("Your cart is empty. Please add items first.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount * 100, // Convert to paise
          customerInfo: customerInfo,
          cartItems: cart.items,
          orderSummary: {
            subtotal: totalAmount,
            shipping: shippingCost,
            total: finalAmount,
            itemCount: cart.items.length,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,
        name: "Premika Store",
        description: `Payment for ${cart.items.length} item${
          cart.items.length > 1 ? "s" : ""
        }`,
        image: "/logo.png",
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        notes: {
          // Customer information
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          address_line1: customerInfo.address.line1,
          address_line2: customerInfo.address.line2,
          city: customerInfo.address.city,
          state: customerInfo.address.state,
          postal_code: customerInfo.address.postal_code,
          country: customerInfo.address.country,

          // Order summary
          subtotal: totalAmount,
          shipping_cost: shippingCost,
          total: finalAmount,
          item_count: cart.items.length,

          // Product details (JSON string for Razorpay)
          products: JSON.stringify(
            cart.items.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity || 1,
              selectedSize: item.selectedSize,
              category: item.category,
              description: item.description,
            }))
          ),
        },
        theme: {
          color: "#3399cc",
        },

        handler: async function (response) {
          try {
            // verify payment
            const res = await fetch("/api/verifyOrder", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                customerInfo: customerInfo,
                cartItems: cart.items,
                orderSummary: {
                  subtotal: totalAmount,
                  shipping: shippingCost,
                  total: finalAmount,
                  itemCount: cart.items.length,
                },
              }),
            });
            const data = await res.json();
            console.log(data);
            if (data.isOk) {
              // Clear cart and show success
              cart.removeAll();
              toast.success(
                "Payment successful! Your order has been confirmed."
              );
              setTimeout(() => {
                router.push("/?success=true");
              }, 2000);
            } else {
              toast.error(
                "Payment verification failed. Please contact support."
              );
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
            toast("Payment cancelled by user", { icon: "⚠️" });
          },
        },
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen min-h-screen items-center justify-center p-8">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="bg-[#E0BCA2] p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
          Checkout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-secondary">
              Customer Information
            </h3>

            <input
              type="text"
              placeholder="Full Name *"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.name ? "border-foreground" : "border-[#B67B5C]"
              } text-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
              value={customerInfo.name}
              onChange={(e) => {
                // Only allow letters and spaces, filter out numbers and special characters
                const nameValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setCustomerInfo({ ...customerInfo, name: nameValue });
                clearError("name");
              }}
              onBlur={() => {
                const error = validateName(customerInfo.name);
                if (error) setErrors((prev) => ({ ...prev, name: error }));
              }}
              required
            />
            {errors.name && (
              <p className="text-foreground text-sm mt-1">{errors.name}</p>
            )}

            <input
              type="email"
              placeholder="Email Address *"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.email ? "border-foreground" : "border-[#B67B5C]"
              } text-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
              value={customerInfo.email}
              onChange={(e) => {
                setCustomerInfo({ ...customerInfo, email: e.target.value });
                clearError("email");
              }}
              onBlur={() => {
                const error = validateEmail(customerInfo.email);
                if (error) setErrors((prev) => ({ ...prev, email: error }));
              }}
              required
            />
            {errors.email && (
              <p className="text-foreground text-sm mt-1">{errors.email}</p>
            )}

            <input
              type="tel"
              placeholder="Phone Number (10 digits) *"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.phone ? "border-foreground" : "border-[#B67B5C]"
              } text-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
              value={customerInfo.phone}
              onChange={(e) => {
                // Only allow numbers and limit to 10 digits
                const phoneValue = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);
                setCustomerInfo({ ...customerInfo, phone: phoneValue });
                clearError("phone");
              }}
              onBlur={() => {
                const error = validatePhone(customerInfo.phone);
                if (error) setErrors((prev) => ({ ...prev, phone: error }));
              }}
              maxLength="10"
              required
            />
            {errors.phone && (
              <p className="text-foreground text-sm mt-1">{errors.phone}</p>
            )}

            <h4 className="text-md font-semibold text-black mt-4">
              Delivery Address
            </h4>

            <input
              type="text"
              placeholder="Address Line 1 *"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.addressLine1 ? "border-foreground" : "border-[#B67B5C]"
              } text-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
              value={customerInfo.address.line1}
              onChange={(e) => {
                setCustomerInfo({
                  ...customerInfo,
                  address: { ...customerInfo.address, line1: e.target.value },
                });
                clearError("addressLine1");
              }}
              onBlur={() => {
                const error = validateAddress(customerInfo.address.line1);
                if (error)
                  setErrors((prev) => ({ ...prev, addressLine1: error }));
              }}
              required
            />
            {errors.addressLine1 && (
              <p className="text-foreground text-sm mt-1">
                {errors.addressLine1}
              </p>
            )}

            <input
              type="text"
              placeholder="Address Line 2"
              className="w-full px-4 py-2 rounded-md border border-[#B67B5C] bg-background text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              value={customerInfo.address.line2}
              onChange={(e) =>
                setCustomerInfo({
                  ...customerInfo,
                  address: { ...customerInfo.address, line2: e.target.value },
                })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="City *"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.city ? "border-foreground" : "border-[#B67B5C]"
                  } text-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                  value={customerInfo.address.city}
                  onChange={(e) => {
                    // Only allow letters and spaces
                    const cityValue = e.target.value.replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    );
                    setCustomerInfo({
                      ...customerInfo,
                      address: { ...customerInfo.address, city: cityValue },
                    });
                    clearError("city");
                  }}
                  onBlur={() => {
                    const error = validateCity(customerInfo.address.city);
                    if (error) setErrors((prev) => ({ ...prev, city: error }));
                  }}
                  required
                />
                {errors.city && (
                  <p className="text-foreground text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="State *"
                  className={`w-full px-4 py-2 rounded-md border ${
                    errors.state ? "border-foreground" : "border-[#B67B5C]"
                  } text-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
                  value={customerInfo.address.state}
                  onChange={(e) => {
                    // Only allow letters and spaces
                    const stateValue = e.target.value.replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    );
                    setCustomerInfo({
                      ...customerInfo,
                      address: { ...customerInfo.address, state: stateValue },
                    });
                    clearError("state");
                  }}
                  onBlur={() => {
                    const error = validateState(customerInfo.address.state);
                    if (error) setErrors((prev) => ({ ...prev, state: error }));
                  }}
                  required
                />
                {errors.state && (
                  <p className="text-foreground text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <input
              type="text"
              placeholder="Postal Code (6 digits) *"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.postalCode ? "border-foreground" : "border-[#B67B5C]"
              } text-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary`}
              value={customerInfo.address.postal_code}
              onChange={(e) => {
                // Only allow numbers and limit to 6 digits
                const postalValue = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);
                setCustomerInfo({
                  ...customerInfo,
                  address: {
                    ...customerInfo.address,
                    postal_code: postalValue,
                  },
                });
                clearError("postalCode");
              }}
              onBlur={() => {
                const error = validatePostalCode(
                  customerInfo.address.postal_code
                );
                if (error)
                  setErrors((prev) => ({ ...prev, postalCode: error }));
              }}
              maxLength="6"
              required
            />
            {errors.postalCode && (
              <p className="text-foreground text-sm mt-1">
                {errors.postalCode}
              </p>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-secondary">Order Summary</h3>

            <div className="bg-gray-50 p-4 rounded-lg border border-primary">
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-secondary">{item.name}</p>
                      <p className="text-sm text-[#B67B5C]">
                        Size: {item.selectedSize} | Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      ₹{item.price * (item.quantity || 1)}
                    </p>
                  </div>
                ))}

                <hr className="my-3 border-[#E0BCA2]" />

                <div className="flex justify-between text-secondary">
                  <span>Subtotal:</span>
                  <span className="font-bold text-primary">₹{totalAmount}</span>
                </div>

                <div className="flex justify-between text-secondary">
                  <span>Shipping:</span>
                  <span className="font-bold text-primary">
                    {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
                  </span>
                </div>

                <hr className="my-3 border-[#E0BCA2]" />

                <div className="flex justify-between text-lg font-bold text-secondary">
                  <span className="font-bold text-foreground">Total:</span>
                  <span className="font-bold text-foreground">₹{finalAmount}</span>
                </div>
              </div>
            </div>

            <button
              className={`w-full ${
                isLoading ||
                Object.values(errors).some((error) => error !== null)
                  ? "bg-background text-foreground cursor-not-allowed"
                  : "bg-primary hover:bg-foreground"
              } text-background px-4 py-2 rounded-md transition-colors flex items-center justify-center`}
              onClick={createOrder}
              disabled={
                isLoading ||
                Object.values(errors).some((error) => error !== null)
              }
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Proceed to Payment - ₹${finalAmount}`
              )}
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
