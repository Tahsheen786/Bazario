import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const Checkout = () => {
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
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    console.log("Selected Payment Method:", selectedPayment);
    // Proceed with payment logic here
  };


  const [useShippingAddress, setUseShippingAddress] = useState(false);
  const location = useLocation();
  const product = location.state?.product;

  useEffect(() => {
    if (product) {
      console.log('Product at Checkout:', product);
    } else {
      console.log('No product data received.');
    }
  }, [product]);

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
    return price ? price.toFixed(2) : "0.00"; // Return "0.00" if price is undefined or null
  };
  
  return (

  <div className="min-h-screen overflow-auto">
  <div className="container" style={{ paddingTop: "280px", marginRight: "800px" }}>
    <div className="flex flex-wrap lg:flex-nowrap items-start gap-6">
      <div className="cart-total lg:w-2/3 w-full">
        <div className="billing-info-wrapper">
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
            <label className="cursor-pointer flex items-center gap-2">
              <input
                type="checkbox"
                checked={useShippingAddress}
                onChange={handleCheckboxChange}
              />
              <span>Shipping Information</span>
            </label>
          </div>

          {useShippingAddress && (
            <div className="changeme p-8">
              <h2 className="text-start text-2xl text-[#272343] font-semibold mb-6">
                Shipping Information
              </h2>
              <div className="flex flex-col sm:flex-row gap-5 items-center mb-5">
                <input
                  type="text"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  placeholder="First Name"
                  className="input-box w-full"
                />
                <input
                  type="text"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  placeholder="Last Name"
                  className="input-box w-full"
                />
              </div>
              <textarea
                name="address"
                value={shippingInfo.address}
                onChange={(e) => handleInputChange(e, "shipping")}
                placeholder="Address"
                className="input-box w-full mb-5"
              />
              <div className="flex flex-col sm:flex-row gap-5 items-center mb-5">
                <input
                  type="text"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  placeholder="Phone"
                  className="input-box w-full"
                />
                <input
                  type="text"
                  name="email"
                  value={shippingInfo.email}
                  onChange={(e) => handleInputChange(e, "shipping")}
                  placeholder="Email"
                  className="input-box w-full"
                />
              </div>
            </div>
          )}

<div className="p-8">
  <h2
    className="text-start text-2xl text-[#272343] font-semibold mb-6"
    style={{ display: "block" }}
  >
    Payment
  </h2>

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
        value="paypal"
        checked={selectedPayment === "paypal"}
        onChange={() => setSelectedPayment("paypal")}
        style={{ display: "inline-block", width: "16px", height: "16px", marginRight: "8px" }}
      />
      <span style={{ display: "inline-block" }}>PayPal</span>
    </label>
  </div>

  <button
    onClick={handlePayment}
    className="btn-primary py-3 px-8 w-full"
    style={{ display: "block" }}
  >
    Proceed to Checkout
  </button>
</div>

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
          ${product.price.toFixed(2)}
        </p>
      </div>

      <hr />
      <div className="text-right mt-4 font-semibold text-lg">
        Subtotal: ${product.price.toFixed(2)}
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
