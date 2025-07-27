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

  const createOrder = async () => {
    // Validate customer information
    if (
      !customerInfo.name ||
      !customerInfo.email ||
      !customerInfo.phone ||
      !customerInfo.address.line1 ||
      !customerInfo.address.city ||
      !customerInfo.address.state ||
      !customerInfo.address.postal_code
    ) {
      alert("Please fill in all required customer information");
      return;
    }

    const res = await fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify({
        amount: amount * 100,
        customerInfo: customerInfo,
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
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, name: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address *"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={customerInfo.email}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, email: e.target.value })
            }
            required
          />

          <input
            type="tel"
            placeholder="Phone Number *"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={customerInfo.phone}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, phone: e.target.value })
            }
            required
          />

          <h4 className="text-md font-semibold text-black mt-4">
            Delivery Address
          </h4>

          <input
            type="text"
            placeholder="Address Line 1 *"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={customerInfo.address.line1}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                address: { ...customerInfo.address, line1: e.target.value },
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Address Line 2"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={customerInfo.address.line2}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                address: { ...customerInfo.address, line2: e.target.value },
              })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City *"
              className="px-4 py-2 rounded-md border border-gray-300 text-black"
              value={customerInfo.address.city}
              onChange={(e) =>
                setCustomerInfo({
                  ...customerInfo,
                  address: { ...customerInfo.address, city: e.target.value },
                })
              }
              required
            />

            <input
              type="text"
              placeholder="State *"
              className="px-4 py-2 rounded-md border border-gray-300 text-black"
              value={customerInfo.address.state}
              onChange={(e) =>
                setCustomerInfo({
                  ...customerInfo,
                  address: { ...customerInfo.address, state: e.target.value },
                })
              }
              required
            />
          </div>

          <input
            type="text"
            placeholder="Postal Code *"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={customerInfo.address.postal_code}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                address: {
                  ...customerInfo.address,
                  postal_code: e.target.value,
                },
              })
            }
            required
          />
        </div>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            onClick={createOrder}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
