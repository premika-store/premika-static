"use client";

import Image   // Load cart data using Next.js best practices
  useEffect(() => {
    const loadCheckoutData = () => {
      try {
        // First, try to get data from sessionStorage (more secure)
        if (typeof window !== 'undefined') {
          const savedCartData = sessionStorage.getItem('checkoutData');
          if (savedCartData) {
            const parsedCartData = JSON.parse(savedCartData);
            setCartData(parsedCartData);
            setAmount(parsedCartData.totalPrice);
            return;
          }
        }
        
        // If no data found, redirect back to cart
        toast.error("No items in cart. Please add items first.");
        router.push('/cart');
        
      } catch (error) {
        console.error('Error loading checkout data:', error);
        toast.error("Error loading cart data. Please try again.");
        router.push('/cart');
      }
    };

    loadCheckoutData();
  }, [router]);age";
import Script from "next/script";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Currency from "@/components/ui/currency";

export default function Home() {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [cartData, setCartData] = useState(null);
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
  const [touched, setTouched] = useState({});

  // Load cart data from localStorage on component mount
  useEffect(() => {
    const savedCartData = localStorage.getItem("checkoutData");
    if (savedCartData) {
      const parsedCartData = JSON.parse(savedCartData);
      setCartData(parsedCartData);
      setAmount(parsedCartData.totalPrice);
    } else {
      // If no cart data, redirect back to cart
      toast.error("No items in cart. Please add items first.");
      router.push("/cart");
    }
  }, [router]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    const cleanPhone = phone.replace(/\s+/g, "");
    return phoneRegex.test(cleanPhone) && /^\d+$/.test(cleanPhone);
  };

  const validateName = (name) => {
    return (
      name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name) && !/\d/.test(name)
    );
  };

  // Helper functions to filter input characters
  const handleNameInput = (value) => {
    // Remove any numbers from the input
    return value.replace(/[0-9]/g, "");
  };

  const handlePhoneInput = (value) => {
    // Remove any non-digit characters from the input
    return value.replace(/[^\d]/g, "");
  };

  const validatePostalCode = (postalCode) => {
    const postalRegex = /^[1-9][0-9]{5}$/; // Indian postal code format
    return postalRegex.test(postalCode);
  };

  const validateRequired = (value) => {
    return value && value.toString().trim().length > 0;
  };

  const validateAmount = (amount) => {
    return amount > 0;
  };

  // Field validation function
  const validateField = (fieldName, value, parentField = null) => {
    let error = "";

    if (parentField) {
      // Handle nested address fields
      switch (fieldName) {
        case "line1":
          if (!validateRequired(value)) error = "Address line 1 is required";
          else if (value.trim().length < 10)
            error = "Please enter a complete address";
          break;
        case "city":
          if (!validateRequired(value)) error = "City is required";
          else if (!/^[a-zA-Z\s]+$/.test(value))
            error = "City should contain only letters";
          break;
        case "state":
          if (!validateRequired(value)) error = "State is required";
          else if (!/^[a-zA-Z\s]+$/.test(value))
            error = "State should contain only letters";
          break;
        case "postal_code":
          if (!validateRequired(value)) error = "Postal code is required";
          else if (!validatePostalCode(value))
            error = "Please enter a valid 6-digit postal code";
          break;
      }
    } else {
      // Handle main fields
      switch (fieldName) {
        case "name":
          if (!validateRequired(value)) error = "Name is required";
          else if (!validateName(value))
            error =
              "Name should be at least 2 characters and contain only letters (no numbers)";
          break;
        case "email":
          if (!validateRequired(value)) error = "Email is required";
          else if (!validateEmail(value))
            error = "Please enter a valid email address";
          break;
        case "phone":
          if (!validateRequired(value)) error = "Phone number is required";
          else if (!validatePhone(value))
            error =
              "Please enter a valid 10-digit mobile number (numbers only)";
          break;
        case "amount":
          if (!validateAmount(value)) error = "Amount must be greater than 0";
          break;
      }
    }

    return error;
  };

  // Handle field blur for validation
  const handleFieldBlur = (fieldName, value, parentField = null) => {
    const fieldKey = parentField ? `${parentField}.${fieldName}` : fieldName;
    const error = validateField(fieldName, value, parentField);

    setTouched((prev) => ({ ...prev, [fieldKey]: true }));
    setErrors((prev) => ({ ...prev, [fieldKey]: error }));
  };

  // Handle field change with real-time validation
  const handleFieldChange = (fieldName, value, parentField = null) => {
    const fieldKey = parentField ? `${parentField}.${fieldName}` : fieldName;

    if (touched[fieldKey]) {
      const error = validateField(fieldName, value, parentField);
      setErrors((prev) => ({ ...prev, [fieldKey]: error }));
    }
  };

  // Validate all fields
  const validateAllFields = () => {
    const newErrors = {};
    const newTouched = {};

    // Validate main fields
    ["name", "email", "phone"].forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, customerInfo[field]);
      if (error) newErrors[field] = error;
    });

    // Validate address fields
    ["line1", "city", "state", "postal_code"].forEach((field) => {
      const fieldKey = `address.${field}`;
      newTouched[fieldKey] = true;
      const error = validateField(
        field,
        customerInfo.address[field],
        "address"
      );
      if (error) newErrors[fieldKey] = error;
    });

    // Check if cart data exists
    if (!cartData || !amount || amount <= 0) {
      newErrors["cart"] = "Invalid cart data. Please go back to cart.";
    }

    setTouched(newTouched);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Helper function to get input styling based on validation state
  const getInputClassName = (fieldKey, baseClassName) => {
    const hasError = errors[fieldKey];
    const isTouched = touched[fieldKey];

    if (isTouched && hasError) {
      return `${baseClassName} border-red-500 focus:border-red-500`;
    } else if (isTouched && !hasError) {
      return `${baseClassName} border-green-500 focus:border-green-500`;
    }
    return `${baseClassName} border-gray-300`;
  };

  const createOrder = async () => {
    // Validate all fields before proceeding
    if (!validateAllFields()) {
      alert("Please fix the errors in the form before proceeding");
      return;
    }

    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        body: JSON.stringify({
          amount: amount * 100,
          customerInfo: customerInfo,
          cartData: cartData, // Include cart data
        }),
      });
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
          // verify payment
          const res = await fetch("/api/verifyOrder", {
            method: "POST",
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
            alert("Payment successful");
          } else {
            alert("Payment failed");
          }
        },
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="flex w-screen min-h-screen items-center justify-center p-8">
      <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      {!cartData ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <p className="text-lg text-black">Loading checkout...</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">
            Checkout
          </h2>

          {/* Customer Information Form */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-black">
              Customer Information
            </h3>

            <div>
              <input
                type="text"
                placeholder="Full Name *"
                className={getInputClassName(
                  "name",
                  "w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                value={customerInfo.name}
                onChange={(e) => {
                  const filteredValue = handleNameInput(e.target.value);
                  setCustomerInfo({ ...customerInfo, name: filteredValue });
                  handleFieldChange("name", filteredValue);
                }}
                onBlur={(e) => handleFieldBlur("name", e.target.value)}
                required
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address *"
                className={getInputClassName(
                  "email",
                  "w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                value={customerInfo.email}
                onChange={(e) => {
                  setCustomerInfo({ ...customerInfo, email: e.target.value });
                  handleFieldChange("email", e.target.value);
                }}
                onBlur={(e) => handleFieldBlur("email", e.target.value)}
                required
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number *"
                maxLength="10"
                className={getInputClassName(
                  "phone",
                  "w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                value={customerInfo.phone}
                onChange={(e) => {
                  const filteredValue = handlePhoneInput(e.target.value);
                  setCustomerInfo({ ...customerInfo, phone: filteredValue });
                  handleFieldChange("phone", filteredValue);
                }}
                onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                required
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <h4 className="text-md font-semibold text-black mt-4">
              Delivery Address
            </h4>

            <div>
              <input
                type="text"
                placeholder="Address Line 1 *"
                className={getInputClassName(
                  "address.line1",
                  "w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                value={customerInfo.address.line1}
                onChange={(e) => {
                  setCustomerInfo({
                    ...customerInfo,
                    address: { ...customerInfo.address, line1: e.target.value },
                  });
                  handleFieldChange("line1", e.target.value, "address");
                }}
                onBlur={(e) =>
                  handleFieldBlur("line1", e.target.value, "address")
                }
                required
              />
              {touched["address.line1"] && errors["address.line1"] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["address.line1"]}
                </p>
              )}
            </div>

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
                  className={getInputClassName(
                    "address.city",
                    "px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  )}
                  value={customerInfo.address.city}
                  onChange={(e) => {
                    setCustomerInfo({
                      ...customerInfo,
                      address: {
                        ...customerInfo.address,
                        city: e.target.value,
                      },
                    });
                    handleFieldChange("city", e.target.value, "address");
                  }}
                  onBlur={(e) =>
                    handleFieldBlur("city", e.target.value, "address")
                  }
                  required
                />
                {touched["address.city"] && errors["address.city"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors["address.city"]}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="State *"
                  className={getInputClassName(
                    "address.state",
                    "px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  )}
                  value={customerInfo.address.state}
                  onChange={(e) => {
                    setCustomerInfo({
                      ...customerInfo,
                      address: {
                        ...customerInfo.address,
                        state: e.target.value,
                      },
                    });
                    handleFieldChange("state", e.target.value, "address");
                  }}
                  onBlur={(e) =>
                    handleFieldBlur("state", e.target.value, "address")
                  }
                  required
                />
                {touched["address.state"] && errors["address.state"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors["address.state"]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Postal Code *"
                className={getInputClassName(
                  "address.postal_code",
                  "w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                value={customerInfo.address.postal_code}
                onChange={(e) => {
                  setCustomerInfo({
                    ...customerInfo,
                    address: {
                      ...customerInfo.address,
                      postal_code: e.target.value,
                    },
                  });
                  handleFieldChange("postal_code", e.target.value, "address");
                }}
                onBlur={(e) =>
                  handleFieldBlur("postal_code", e.target.value, "address")
                }
                required
              />
              {touched["address.postal_code"] &&
                errors["address.postal_code"] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors["address.postal_code"]}
                  </p>
                )}
            </div>
          </div>

          {/* Order Summary Section */}
          {cartData && (
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-black">
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                {cartData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0">
                        {item.images && item.images[0] && (
                          <Image
                            src={item.images[0].url}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.color?.name} • {item.size?.name}
                        </p>
                      </div>
                    </div>
                    <Currency value={item.price} />
                  </div>
                ))}

                {/* Price Breakdown */}
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <Currency value={cartData.subtotal} />
                  </div>

                  {cartData.couponDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({cartData.appliedCoupon?.code}):</span>
                      <span>
                        -<Currency value={cartData.couponDiscount} />
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    {cartData.shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <Currency value={cartData.shippingCost} />
                    )}
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <Currency value={cartData.tax} />
                  </div>

                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <Currency value={cartData.totalPrice} />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors"
              onClick={createOrder}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
