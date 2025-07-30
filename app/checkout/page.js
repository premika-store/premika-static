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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-tertiary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 lg:p-8">
        <div className="w-full max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-lg">
                <svg
                  className="w-8 h-8 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-primary">
                Checkout
              </h1>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-foreground">
                  Cart
                </span>
              </div>
              <div className="w-12 h-0.5 bg-primary"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg ring-4 ring-primary/20">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-foreground">
                  Checkout
                </span>
              </div>
              <div className="w-12 h-0.5 bg-muted"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-bold">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-muted-foreground">
                  Confirmation
                </span>
              </div>
            </div>
          </div>

          {/* Main Checkout Card */}
          <div className="bg-card/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-border p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Customer Information Form */}
              <div className="space-y-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 ">
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Customer Information
                  </h3>
                </div>

                {/* Name Input with Icon */}
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                      errors.name
                        ? "border-destructive bg-destructive/10 focus:border-destructive focus:ring-4 focus:ring-destructive/20"
                        : "border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-tertiary"
                    } text-foreground placeholder-muted-foreground focus:outline-none shadow-sm hover:shadow-md`}
                    value={customerInfo.name}
                    onChange={(e) => {
                      const nameValue = e.target.value.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      );
                      setCustomerInfo({ ...customerInfo, name: nameValue });
                      clearError("name");
                    }}
                    onBlur={() => {
                      const error = validateName(customerInfo.name);
                      if (error)
                        setErrors((prev) => ({ ...prev, name: error }));
                    }}
                    required
                  />
                  {errors.name && (
                    <div className="absolute -bottom-6 left-0 flex items-center text-destructive text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Input with Icon */}
                <div className="relative group mt-8">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                      errors.email
                        ? "border-destructive bg-destructive/10 focus:border-destructive focus:ring-4 focus:ring-destructive/20"
                        : "border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-tertiary"
                    } text-foreground placeholder-muted-foreground focus:outline-none shadow-sm hover:shadow-md`}
                    value={customerInfo.email}
                    onChange={(e) => {
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      });
                      clearError("email");
                    }}
                    onBlur={() => {
                      const error = validateEmail(customerInfo.email);
                      if (error)
                        setErrors((prev) => ({ ...prev, email: error }));
                    }}
                    required
                  />
                  {errors.email && (
                    <div className="absolute -bottom-6 left-0 flex items-center text-destructive text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Phone Input with Icon */}
                <div className="relative group mt-8">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number (10 digits) *"
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                      errors.phone
                        ? "border-destructive bg-destructive/10 focus:border-destructive focus:ring-4 focus:ring-destructive/20"
                        : "border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-tertiary"
                    } text-foreground placeholder-muted-foreground focus:outline-none shadow-sm hover:shadow-md`}
                    value={customerInfo.phone}
                    onChange={(e) => {
                      const phoneValue = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);
                      setCustomerInfo({ ...customerInfo, phone: phoneValue });
                      clearError("phone");
                    }}
                    onBlur={() => {
                      const error = validatePhone(customerInfo.phone);
                      if (error)
                        setErrors((prev) => ({ ...prev, phone: error }));
                    }}
                    maxLength="10"
                    required
                  />
                  {errors.phone && (
                    <div className="absolute -bottom-6 left-0 flex items-center text-destructive text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {errors.phone}
                    </div>
                  )}
                </div>

                {/* Address Section */}
                <div className="mt-10">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Delivery Address
                    </h4>
                  </div>

                  {/* Address Line 1 */}
                  <div className="relative group mb-6">
                    <input
                      type="text"
                      placeholder="Address Line 1 *"
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                        errors.addressLine1
                          ? "border-destructive bg-destructive/10 focus:border-destructive focus:ring-4 focus:ring-destructive/20"
                          : "border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-tertiary"
                      } text-foreground placeholder-muted-foreground focus:outline-none shadow-sm hover:shadow-md`}
                      value={customerInfo.address.line1}
                      onChange={(e) => {
                        setCustomerInfo({
                          ...customerInfo,
                          address: {
                            ...customerInfo.address,
                            line1: e.target.value,
                          },
                        });
                        clearError("addressLine1");
                      }}
                      onBlur={() => {
                        const error = validateAddress(
                          customerInfo.address.line1
                        );
                        if (error)
                          setErrors((prev) => ({
                            ...prev,
                            addressLine1: error,
                          }));
                      }}
                      required
                    />
                    {errors.addressLine1 && (
                      <div className="absolute -bottom-6 left-0 flex items-center text-destructive text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {errors.addressLine1}
                      </div>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Address Line 2 (Optional)"
                      className="w-full px-4 py-4 rounded-xl border-2 border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-tertiary text-foreground placeholder-muted-foreground focus:outline-none shadow-sm hover:shadow-md transition-all duration-300"
                      value={customerInfo.address.line2}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          address: {
                            ...customerInfo.address,
                            line2: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="City *"
                        className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                          errors.city
                            ? "border-destructive bg-destructive/10 focus:border-destructive focus:ring-4 focus:ring-destructive/20"
                            : "border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-tertiary"
                        } text-foreground placeholder-muted-foreground focus:outline-none shadow-sm hover:shadow-md`}
                        value={customerInfo.address.city}
                        onChange={(e) => {
                          const cityValue = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                          setCustomerInfo({
                            ...customerInfo,
                            address: {
                              ...customerInfo.address,
                              city: cityValue,
                            },
                          });
                          clearError("city");
                        }}
                        onBlur={() => {
                          const error = validateCity(customerInfo.address.city);
                          if (error)
                            setErrors((prev) => ({ ...prev, city: error }));
                        }}
                        required
                      />
                      {errors.city && (
                        <div className="absolute -bottom-6 left-0 flex items-center text-destructive text-sm">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {errors.city}
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        placeholder="State *"
                        className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                          errors.state
                            ? "border-destructive bg-destructive/10 focus:border-destructive focus:ring-4 focus:ring-destructive/20"
                            : "border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-tertiary"
                        } text-foreground placeholder-muted-foreground focus:outline-none shadow-sm hover:shadow-md`}
                        value={customerInfo.address.state}
                        onChange={(e) => {
                          const stateValue = e.target.value.replace(
                            /[^a-zA-Z\s]/g,
                            ""
                          );
                          setCustomerInfo({
                            ...customerInfo,
                            address: {
                              ...customerInfo.address,
                              state: stateValue,
                            },
                          });
                          clearError("state");
                        }}
                        onBlur={() => {
                          const error = validateState(
                            customerInfo.address.state
                          );
                          if (error)
                            setErrors((prev) => ({ ...prev, state: error }));
                        }}
                        required
                      />
                      {errors.state && (
                        <div className="absolute -bottom-6 left-0 flex items-center text-destructive text-sm">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {errors.state}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Postal Code */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Postal Code (6 digits) *"
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                        errors.postalCode
                          ? "border-destructive bg-destructive/10 focus:border-destructive focus:ring-4 focus:ring-destructive/20"
                          : "border-border bg-card focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-tertiary"
                      } text-foreground placeholder-muted-foreground focus:outline-none shadow-sm hover:shadow-md`}
                      value={customerInfo.address.postal_code}
                      onChange={(e) => {
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
                      <div className="absolute -bottom-6 left-0 flex items-center text-destructive text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {errors.postalCode}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 ">
                  <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Order Summary
                  </h3>
                </div>

                <div className="bg-muted p-6 rounded-2xl border border-border shadow-inner flex-1">
                  <div className="space-y-6 h-full flex flex-col">
                    <div className="flex-1">
                      {cart.items.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-border mb-4"
                        >
                          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                            <svg
                              className="w-8 h-8 text-primary"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              ></path>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-lg">
                              {item.name}
                            </h4>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="inline-flex items-center  py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                Size: {item.selectedSize}
                              </span>
                              <span className="inline-flex items-center  py-0.5 rounded-full text-xs font-medium bg-tertiary/10 text-tertiary">
                                Qty: {item.quantity || 1}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">
                              ₹{item.price * (item.quantity || 1)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ₹{item.price} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-6 mt-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span className="font-medium">Subtotal:</span>
                          <span className="text-xl font-semibold text-foreground">
                            ₹{totalAmount}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Shipping:</span>
                            {shippingCost === 0 && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                                
                              </span>
                            )}
                          </div>
                          <span className="text-xl font-semibold text-foreground">
                            {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                          </span>
                        </div>

                        {totalAmount < 500 && shippingCost > 0 && (
                          <div className="flex items-center space-x-2 text-sm text-tertiary bg-tertiary/10 p-3 rounded-lg border border-tertiary/20">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span>
                              Add ₹{500 - totalAmount} more for FREE shipping!
                            </span>
                          </div>
                        )}

                        <div className="border-t border-border pt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-foreground">
                              Total:
                            </span>
                            <span className="text-3xl font-bold text-foreground">
                              ₹{finalAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-primary/10 rounded-xl border border-foreground">
                    <svg
                      className="w-6 h-6 text-foreground mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span className="text-xs font-medium text-foreground text-center">
                      Secure Payment
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-secondary/10 rounded-xl border border-foreground">
                    <svg
                      className="w-6 h-6 text-foreground mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                    <span className="text-xs font-medium text-foreground text-center">
                      SSL Encrypted
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-tertiary/10 rounded-xl border border-foreground">
                    <svg
                      className="w-6 h-6 text-foreground mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                    <span className="text-xs font-medium text-foreground text-center">
                      Fast Delivery
                    </span>
                  </div>
                </div>

                {/* Payment Button */}
                <div className="mt-auto">
                  <button
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                      isLoading ||
                      Object.values(errors).some((error) => error !== null)
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-foreground hover:bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    } flex items-center justify-center space-x-3`}
                    onClick={createOrder}
                    disabled={
                      isLoading ||
                      Object.values(errors).some((error) => error !== null)
                    }
                  >
                    {isLoading ? (
                      <>
                        <div className="relative">
                          <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          ></path>
                        </svg>
                        <span>Proceed to Payment - ₹{finalAmount}</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          ></path>
                        </svg>
                      </>
                    )}
                  </button>                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "hsl(var(--card))",
            color: "hsl(var(--card-foreground))",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            border: "1px solid hsl(var(--border))",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "hsl(var(--primary))",
              secondary: "hsl(var(--primary-foreground))",
            },
          },
          error: {
            iconTheme: {
              primary: "hsl(var(--destructive))",
              secondary: "hsl(var(--destructive-foreground))",
            },
          },
        }}
      />
    </div>
  );
}
