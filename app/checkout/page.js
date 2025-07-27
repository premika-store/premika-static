"use client";

import Image from "next/image";
import Script from "next/script";
import { useState } from "react";

export default function Home() {
  const [amount, setAmount] = useState(0);
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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian phone number format
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const validatePostalCode = (postalCode) => {
    const postalRegex = /^\d{6}$/; // Indian postal code format
    return postalRegex.test(postalCode);
  };

  const validateName = (name) => {
    return name.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(name);
  };

  const validateRequired = (value) => {
    return value && value.toString().trim().length > 0;
  };

  const validateAmount = (amount) => {
    return amount && amount > 0;
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!validateRequired(customerInfo.name)) {
      newErrors.name = "Full name is required";
    } else if (!validateName(customerInfo.name)) {
      newErrors.name =
        "Please enter a valid name (letters and spaces only, minimum 3 characters)";
    }

    // Email validation
    if (!validateRequired(customerInfo.email)) {
      newErrors.email = "Email address is required";
    } else if (!validateEmail(customerInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!validateRequired(customerInfo.phone)) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian phone number";
    }

    // Address Line 1 validation
    if (!validateRequired(customerInfo.address.line1)) {
      newErrors.addressLine1 = "Address Line 1 is required";
    } else if (customerInfo.address.line1.trim().length < 5) {
      newErrors.addressLine1 = "Address should be at least 5 characters long";
    }

    // City validation
    if (!validateRequired(customerInfo.address.city)) {
      newErrors.city = "City is required";
    } else if (!/^[a-zA-Z\s]+$/.test(customerInfo.address.city)) {
      newErrors.city = "Please enter a valid city name";
    }

    // State validation
    if (!validateRequired(customerInfo.address.state)) {
      newErrors.state = "State is required";
    } else if (!/^[a-zA-Z\s]+$/.test(customerInfo.address.state)) {
      newErrors.state = "Please enter a valid state name";
    }

    // Postal code validation
    if (!validateRequired(customerInfo.address.postal_code)) {
      newErrors.postalCode = "Postal code is required";
    } else if (!validatePostalCode(customerInfo.address.postal_code)) {
      newErrors.postalCode = "Please enter a valid 6-digit postal code";
    }

    // Amount validation
    if (!validateAmount(amount)) {
      newErrors.amount = "Please enter a valid amount greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const createOrder = async () => {
    // Validate form
    if (!validateForm()) {
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
          amount: amount * 100,
          customerInfo: customerInfo,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,
        name: "Premika Store",
        description: "Payment for your order",
        image: "/logo.png", // Add your logo here
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone,
        },
        notes: {
          address_line1: customerInfo.address.line1,
          address_line2: customerInfo.address.line2,
          city: customerInfo.address.city,
          state: customerInfo.address.state,
          postal_code: customerInfo.address.postal_code,
          country: customerInfo.address.country,
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
              }),
            });
            const data = await res.json();
            console.log(data);
            if (data.isOk) {
              // do whatever page transition you want here as payment was successful
              alert("Payment successful! Your order has been confirmed.");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
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

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Checkout
        </h2>

        {/* Customer Information Form */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-black">
            Customer Information
          </h3>

          <input
            type="text"
            placeholder="Full Name *"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={customerInfo.name}
            onChange={(e) => {
              // Only allow letters and spaces, filter out numbers and special characters
              const nameValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setCustomerInfo({ ...customerInfo, name: nameValue });
              clearError("name");
            }}
            onBlur={() => {
              if (!validateRequired(customerInfo.name)) {
                setErrors((prev) => ({
                  ...prev,
                  name: "Full name is required",
                }));
              } else if (!validateName(customerInfo.name)) {
                setErrors((prev) => ({
                  ...prev,
                  name: "Please enter a valid name (letters and spaces only, minimum 3 characters)",
                }));
              }
            }}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          <input
            type="email"
            placeholder="Email Address *"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={customerInfo.email}
            onChange={(e) => {
              setCustomerInfo({ ...customerInfo, email: e.target.value });
              clearError("email");
            }}
            onBlur={() => {
              if (!validateRequired(customerInfo.email)) {
                setErrors((prev) => ({
                  ...prev,
                  email: "Email address is required",
                }));
              } else if (!validateEmail(customerInfo.email)) {
                setErrors((prev) => ({
                  ...prev,
                  email: "Please enter a valid email address",
                }));
              }
            }}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          <input
            type="tel"
            placeholder="Phone Number * (10 digits)"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={customerInfo.phone}
            onChange={(e) => {
              const phoneValue = e.target.value.replace(/\D/g, "").slice(0, 10);
              setCustomerInfo({ ...customerInfo, phone: phoneValue });
              clearError("phone");
            }}
            onBlur={() => {
              if (!validateRequired(customerInfo.phone)) {
                setErrors((prev) => ({
                  ...prev,
                  phone: "Phone number is required",
                }));
              } else if (!validatePhone(customerInfo.phone)) {
                setErrors((prev) => ({
                  ...prev,
                  phone: "Please enter a valid 10-digit Indian phone number",
                }));
              }
            }}
            maxLength="10"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}

          <h4 className="text-md font-semibold text-black mt-4">
            Delivery Address
          </h4>

          <input
            type="text"
            placeholder="Address Line 1 *"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.addressLine1 ? "border-red-500" : "border-gray-300"
            } text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={customerInfo.address.line1}
            onChange={(e) => {
              setCustomerInfo({
                ...customerInfo,
                address: { ...customerInfo.address, line1: e.target.value },
              });
              clearError("addressLine1");
            }}
            onBlur={() => {
              if (!validateRequired(customerInfo.address.line1)) {
                setErrors((prev) => ({
                  ...prev,
                  addressLine1: "Address Line 1 is required",
                }));
              } else if (customerInfo.address.line1.trim().length < 5) {
                setErrors((prev) => ({
                  ...prev,
                  addressLine1: "Address should be at least 5 characters long",
                }));
              }
            }}
            required
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>
          )}

          <input
            type="text"
            placeholder="Address Line 2"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  errors.city ? "border-red-500" : "border-gray-300"
                } text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={customerInfo.address.city}
                onChange={(e) => {
                  const cityValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setCustomerInfo({
                    ...customerInfo,
                    address: { ...customerInfo.address, city: cityValue },
                  });
                  clearError("city");
                }}
                onBlur={() => {
                  if (!validateRequired(customerInfo.address.city)) {
                    setErrors((prev) => ({
                      ...prev,
                      city: "City is required",
                    }));
                  } else if (!/^[a-zA-Z\s]+$/.test(customerInfo.address.city)) {
                    setErrors((prev) => ({
                      ...prev,
                      city: "Please enter a valid city name",
                    }));
                  }
                }}
                required
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="State *"
                className={`w-full px-4 py-2 rounded-md border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={customerInfo.address.state}
                onChange={(e) => {
                  const stateValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  setCustomerInfo({
                    ...customerInfo,
                    address: { ...customerInfo.address, state: stateValue },
                  });
                  clearError("state");
                }}
                onBlur={() => {
                  if (!validateRequired(customerInfo.address.state)) {
                    setErrors((prev) => ({
                      ...prev,
                      state: "State is required",
                    }));
                  } else if (
                    !/^[a-zA-Z\s]+$/.test(customerInfo.address.state)
                  ) {
                    setErrors((prev) => ({
                      ...prev,
                      state: "Please enter a valid state name",
                    }));
                  }
                }}
                required
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          <input
            type="text"
            placeholder="Postal Code * (6 digits)"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.postalCode ? "border-red-500" : "border-gray-300"
            } text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
            value={customerInfo.address.postal_code}
            onChange={(e) => {
              const postalValue = e.target.value.replace(/\D/g, "").slice(0, 6);
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
              if (!validateRequired(customerInfo.address.postal_code)) {
                setErrors((prev) => ({
                  ...prev,
                  postalCode: "Postal code is required",
                }));
              } else if (
                !validatePostalCode(customerInfo.address.postal_code)
              ) {
                setErrors((prev) => ({
                  ...prev,
                  postalCode: "Please enter a valid 6-digit postal code",
                }));
              }
            }}
            maxLength="6"
            required
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <input
              type="number"
              placeholder="Enter amount *"
              min="1"
              step="0.01"
              className={`w-full px-4 py-2 rounded-md border ${
                errors.amount ? "border-red-500" : "border-gray-300"
              } text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                clearError("amount");
              }}
              onBlur={() => {
                if (!validateAmount(amount)) {
                  setErrors((prev) => ({
                    ...prev,
                    amount: "Please enter a valid amount greater than 0",
                  }));
                }
              }}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          <button
            className={`w-full ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center`}
            onClick={createOrder}
            disabled={isLoading}
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
              "Proceed to Payment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
