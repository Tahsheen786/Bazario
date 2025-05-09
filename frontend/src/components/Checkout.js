import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import io from 'socket.io-client';
import { useRef } from "react";

 // Ensure you're importing QRCodeSVG from the correct package
const socket = io('http://localhost:3002')// Replace with your server's URL

const Checkout = () => {
  const [qrDataURL, setQRDataURL] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [upiURL, setUpiURL] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [errorMessage, setErrorMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [paymentStatus, setPaymentStatus] = useState(null); // null: No payment, 'pending': QR displayed, 'success': Payment successful
useEffect(() => {
  // Listen for the 'payment-success' event from the server
  socket.on('payment-success', (data) => {
    setPaymentStatus('success');  // Update payment status to success
    console.log(data.message);  // Log the payment success message
  });

  return () => {
    socket.off('payment-success');  // Cleanup when the component unmounts
  };
}, []);

useEffect(() => {
  if (paymentStatus === 'success') {
    setShowQR(false);
    const timeoutId = setTimeout(() => {
      setShowQR(false); // Close the QR container
    }, 5000); // 5000ms = 5 seconds
  // Hide QR on success
      return () => clearTimeout(timeoutId);
  }
}, [paymentStatus]);

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [useShippingAddress, setUseShippingAddress] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes = 180 seconds
  useEffect(() => {
    if (showQR) {
      setTimer(180); // Reset timer to 3 minutes
    }
  }, [showQR]);
  

useEffect(() => {
  if (showQR) {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setShowQR(false); // auto-close the box
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }
}, [showQR]);

  
  const location = useLocation();
  const product = location.state?.product;

  const upiID = "tahsheenfatima515@okhdfcbank"; // replace with your real UPI ID
  const handlePayment = async () => {
    if (selectedPayment === "cod") {
      alert("✅ Order placed with Cash on Delivery.");
      return;
    }
    const upiID = "tahsheenfatima515@okhdfcbank";
    const payerName = "Tahsheen Fatima"; // fixed value, just like your working version
    const amount = product.price;
  
    const upiString = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(payerName)}&am=${amount}&cu=INR`;
  setUpiURL(upiString);
  setShowQR(true);

  // Set loading state to true before starting payment check
  setIsLoading(true);
  setErrorMessage("");

  try {
    // Step 1: Notify backend of QR generation time
    await fetch("http://localhost:3001/generate-qr", {
      method: "POST",
    });

    // Step 2: Start payment check
    const response = await fetch("http://localhost:3002/check-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const result = await response.json();
    setTimeout(() => {
      if (result && result.success) {
        alert("✅ Payment successful!\nReference: " + result.message);
      } else {
        alert("❌ No payment received within 3 minutes.");
      }
    }, 180000); // 3 minutes (180,000 ms)
    
  } catch (error) {
    console.error("Payment check error:", error);
    setErrorMessage("❌ Error checking for payment.");
  } finally {
    // Stop loading state after the payment check process is done
    setIsLoading(false);
  }
  };
  
  
  
  
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "billing") {
      setBillingInfo({ ...billingInfo, [name]: value });
    } else if (type === "shipping") {
      setShippingInfo({ ...shippingInfo, [name]: value });
    }
  };

  const handleCheckboxChange = () => {
    setUseShippingAddress(!useShippingAddress);
  };

  const formatPrice = (price) => {
    return price ? price.toFixed(2) : "0.00";
  };

  return (
    <div className="min-h-screen overflow-auto">
      <div className="container" style={{ paddingTop: "280px", marginRight: "800px" }}>
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-6">
          <div className="cart-total lg:w-2/3 w-full">
            {/* Billing Info */}
            <div className="p-8">
              <h2 className="text-start text-2xl text-[#272343] font-semibold mb-6">
                Billing Information
              </h2>
              <div className="flex flex-col sm:flex-row gap-5 items-center mb-5">
                <input
                  type="text"
                  name="firstName"
                  value={billingInfo.firstName}
                  onChange={(e) => handleInputChange(e, "billing")}
                  placeholder="First Name"
                  className="input-box w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  value={billingInfo.lastName}
                  onChange={(e) => handleInputChange(e, "billing")}
                  placeholder="Last Name"
                  className="input-box w-full"
                />
              </div>
              <textarea
                name="address"
                value={billingInfo.address}
                onChange={(e) => handleInputChange(e, "billing")}
                placeholder="Address"
                className="input-box w-full mb-5"
              />
              <div className="flex flex-col sm:flex-row gap-5 items-center mb-5">
                <input
                  type="text"
                  name="phone"
                  value={billingInfo.phone}
                  onChange={(e) => handleInputChange(e, "billing")}
                  placeholder="Phone"
                  className="input-box w-full"
                />
                <input
                  type="text"
                  name="email"
                  value={billingInfo.email}
                  onChange={(e) => handleInputChange(e, "billing")}
                  placeholder="Email"
                  className="input-box w-full"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-8">
              <h2 className="text-start text-2xl text-[#272343] font-semibold mb-6">Payment</h2>

  <div className="flex flex-col gap-4 mb-6" style={{ display: "flex", flexDirection: "column" }}>
    <label className="flex items-center" style={{ display: "flex", alignItems: "center" }}>
      <input
        type="radio"
        name="payment"
        value="cod"
        checked={selectedPayment === "cod"}
        onChange={() => setSelectedPayment("cod")}
        style={{ display: "inline-block", width: "16px", height: "16px", marginRight: "8px" }}
      />
      <span style={{ display: "inline-block" }}>Cash on Delivery</span>
    </label>

    <label className="flex items-center" style={{ display: "flex", alignItems: "center" }}>
  <input
    type="radio"
    name="payment"
    value="phonepe"
    checked={selectedPayment === "phonepe"}
    onChange={() => setSelectedPayment("phonepe")}
    style={{ display: "inline-block", width: "16px", height: "16px", marginRight: "8px" }}
  />
  <span>PhonePe (UPI QR)</span>
</label>

  </div>

  <button
    onClick={handlePayment}
    className="btn-primary py-3 px-8 w-full"
    style={{ display: "block" }}
  >
    Proceed to Checkout
  </button>
  {(showQR || paymentStatus === 'success') && (
  <div 
    className="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-40"
    style={{ top: 150, left: 0, right: 0, bottom: 0 }}
  >
    <div 
      className="bg-white p-8 rounded-xl shadow-lg w-96 relative text-center border border-gray-300"
      style={{ position: 'relative', zIndex: '9999' }}
    >
      {paymentStatus === 'success' ? (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-green-600">✅ Payment Successful</h2>
          <p className="mt-2 text-sm text-gray-600">🎉 Your order has been placed.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              setShowQR(false);
              setPaymentStatus(null); // Optional: Reset if needed
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">Scan to Pay</h2>
          <QRCodeSVG value={upiURL} size={200} />
          <p className="mt-2 text-sm text-gray-600">
            Expires in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
          </p>
        </>
      )}
    </div>
  </div>
)}



        </div>
      </div>

      {/* Cart Details */}
<div className="w-full lg:w-1/3 p-6 rounded bg-white !important"
style={{
  backgroundColor: '#ffff', // Replace with your custom background color
  boxShadow: '0px 0px 30px rgba(39, 35, 67, 0.12)',
}}>
  {product ? (
    <>
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center gap-3">
        {product.images?.[0]?.large ? (
            <img
              src={product.images[0].large} // Accessing large image
              alt={product.title}
              className="w-[50px] h-[50px] object-cover rounded"
            />
          ) : (
            <p className="text-gray-500">No Image Available</p> // Optional message if no image exists
          )}
          <div className="flex gap-2">
            <p className="font-display2 text-sm">{product.title}</p>
            <span className="font-display2 text-sm">x</span>
            <p className="font-display2 text-sm">1</p>
          </div>
        </div>
        <p className="text-gray-black text-base font-medium">
        ₹{product.price.toFixed(2)}
        </p>
      </div>

      <hr />
      <div className="text-right mt-4 font-semibold text-lg">
        Subtotal: ₹{product.price.toFixed(2)}
      </div>
    </>
  ) : (
    <p className="text-gray-500 text-center">No product selected.</p>
  )}
</div>

      </div>
      </div>
    </div>
);
};
export default Checkout;
