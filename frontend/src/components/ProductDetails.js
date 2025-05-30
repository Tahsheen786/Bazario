import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const handleMinus = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // prevent going below 1
  };

  const handlePlus = () => {
    setQuantity((prev) => prev + 1);
  };
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate('/checkout', { state: { product } }); // Pass full product, not just ID
  };
  
 // Use this ref to store the thumbs swiper instance

  useEffect(() => {
    fetch(`http://localhost:3002/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const increasedPrice = product.price * 1.5;
  const discountedPrice = increasedPrice * 0.5;

  return (
    <div style={{ padding: "20px", paddingTop: "300px" }}>
    <div className="container px-3 md:px-5 xl:px-0">
      <div className="product-details-wrap pt-10">
        <div className="left-side xl:w-7/12 w-full">
          <div className="gallery-container mb-[50px]">
              {product.images?.map((img, index) => (
                  <img
                    src={img.large}
                    alt={`${product.title} - Slide ${index + 1}`}
                  />
              ))}
          </div>
        <div className="single-product-desc">
          <h2 className="text-[#272343] text-2xl font-semibold mb-3.5">
            Product Descriptions
          </h2>
          <p className="text-[#636270] text-base mb-3">
          {product.description}
          </p>
          
        </div>
      </div>
      <div className="right-side xl:px-8 px-0 xl:w-5/12 w-full">
        <h2 className="text-[#272343] pro-title font-semibold mb-3 capitalize">
          {product.title}
        </h2>
        <div className="flex items-center gap-2.5 mb-6">
          <p className="flex gap-1.5 items-center">
          <span className="text-[#272343] text-2xl">₹{discountedPrice.toFixed(2)}</span>
      <span className="text-[#272343] opacity-30 text-xl line-through">
      ₹{increasedPrice.toFixed(2)}
      </span>
    </p>
    <span className="bg-[#F5813F] px-2.5 py-1.5 rounded-[4px] text-white text-sm">
      50% Off
    </span>
        </div>
        <div className="mb-6">
          <ul className="p-0 m-0">
            <li>
            </li>
            <li>
              <p className="text-[15px] inline-flex gap-2 items-center">
                <span className="text-[#9A9CAA]">Brand:</span>
                <span className="text-[#636270] font-medium">Bazario</span>
              </p>
            </li>
            <li>
            </li>
            <li>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-2 mb-4">
  {/* Quantity Selector */}
  <div className="border inline-flex justify-around items-center py-3 px-8 border-[#D6D9DD] rounded-md">
    <span
      onClick={handleMinus}
      className="w-4 h-4 text-sm inline-flex justify-center items-center text-[#9A9CAA] pl-2 select-none cursor-pointer"
      id="minus"
    >
      -
    </span>
    <input
      type="text"
      className="text-[#272343] text-sm text-center w-8 select-none"
      value={quantity}
      readOnly
    />
    <span
      onClick={handlePlus}
      className="w-4 h-4 text-sm inline-flex justify-center items-center text-[#9A9CAA] pr-2 select-none cursor-pointer"
      id="plus"
    >
      +
    </span>
  </div>

  {/* Add to Cart & Buy Now */}
  {/* Add to Cart & Buy Now */}
{/* Add to Cart & Buy Now */}
{/* Add to Cart & Buy Now */}

<div className="flex gap-2">
  <button className="inline-flex gap-1 py-3 px-8 bg-[#029FAE] hover:bg-[#272343] transition-all duration-300 rounded-md text-base items-center justify-center w-[200px] h-[50px]">
    <span className="text-white">Add To Cart</span>
  </button>
  <button onClick={handleBuyNow}

    className="inline-flex gap-1 py-3 px-8 rounded-md text-base items-center justify-center w-[200px] h-[50px]"
    style={{ backgroundColor: 'hsl(137, 84%, 40%)' }}
  >
    <span className="text-white">Buy Now</span>
  </button>
</div>




              <button className="h-[52px] w-[52px] border border-[#D6D9DD] rounded-lg inline-flex justify-center items-center">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.87199 11.598C1.79899 8.24799 3.05199 4.419 6.56999 3.286C7.48224 2.9941 8.45106 2.92457 9.39563 3.08322C10.3402 3.24187 11.2332 3.62409 12 4.198C13.455 3.073 15.572 2.693 17.42 3.286C20.937 4.419 22.199 8.24799 21.127 11.598C19.457 16.908 12 20.998 12 20.998C12 20.998 4.59799 16.97 2.87199 11.598V11.598Z"
                    stroke="#272343"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 6.70001C16.5232 6.86903 16.9845 7.18931 17.3257 7.62039C17.6669 8.05148 17.8727 8.57403 17.917 9.12201"
                    stroke="#272343"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
        <div className="flex gap-2.5 items-center">
          <p>Share on</p>
          <ul className="m-0 p-0 flex gap-1">
            <li>
              <a
                href="#"
                className="p-[11px] inline-flex justify-center items-center text-[#636270] hover:text-[#029FAE] border hover:border-[#029FAE] border-transparent rounded-full transition-all duration-500"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_248_4233)">
                    <path
                      d="M16 8C16 3.58167 12.4183 0 8 0C3.58167 0 0 3.58167 0 8C0 11.993 2.92533 15.3027 6.75 15.9027V10.3127H4.71867V8H6.75V6.23733C6.75 4.23267 7.94433 3.125 9.77167 3.125C10.6467 3.125 11.5623 3.28133 11.5623 3.28133V5.25H10.5537C9.56 5.25 9.25 5.86667 9.25 6.5V8H11.4687L11.114 10.3127H9.25V15.9027C13.0747 15.3027 16 11.9927 16 8Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_248_4233">
                      <rect width={16} height={16} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-[11px] inline-flex justify-center items-center text-[#636270] hover:text-[#029FAE] border hover:border-[#029FAE] border-transparent rounded-full transition-all duration-500"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_248_4237)">
                    <path
                      d="M5.03333 14.5001C11.07 14.5001 14.3723 9.49807 14.3723 5.1614C14.3723 5.02073 14.369 4.87707 14.3627 4.7364C15.0052 4.27173 15.5596 3.69615 16 3.03673C15.4017 3.30273 14.7667 3.47673 14.116 3.55207C14.8008 3.1416 15.3136 2.49675 15.5593 1.73707C14.915 2.11896 14.2104 2.38837 13.4757 2.53373C12.9807 2.00751 12.3261 1.65904 11.6132 1.54222C10.9002 1.4254 10.1687 1.54673 9.53161 1.88746C8.89456 2.22818 8.38752 2.76931 8.08891 3.42715C7.79031 4.08499 7.71677 4.8229 7.87967 5.52673C6.575 5.46127 5.29865 5.12236 4.13336 4.53199C2.96806 3.94162 1.93984 3.11297 1.11533 2.09973C0.696305 2.82223 0.568091 3.67717 0.756747 4.4908C0.945403 5.30443 1.43677 6.0157 2.131 6.48007C1.60977 6.46355 1.09995 6.32324 0.643667 6.07073V6.1114C0.643231 6.86956 0.905349 7.60448 1.38547 8.19125C1.86559 8.77802 2.53409 9.18042 3.27733 9.33007C2.79463 9.46215 2.28801 9.48143 1.79667 9.3864C2.00644 10.0384 2.41454 10.6087 2.964 11.0176C3.51346 11.4265 4.17688 11.6537 4.86167 11.6674C4.18054 12.2026 3.40049 12.5981 2.56623 12.8312C1.73197 13.0644 0.859899 13.1306 0 13.0261C1.50191 13.9895 3.24899 14.5011 5.03333 14.5001Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_248_4237">
                      <rect width={16} height={16} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-[11px] inline-flex justify-center items-center text-[#636270] hover:text-[#029FAE] border hover:border-[#029FAE] border-transparent rounded-full transition-all duration-500"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.667 4.66667C10.667 4.48986 10.7372 4.32029 10.8623 4.19526C10.9873 4.07024 11.1568 4 11.3337 4C11.5105 4 11.68 4.07024 11.8051 4.19526C11.9301 4.32029 12.0003 4.48986 12.0003 4.66667C12.0003 4.84348 11.9301 5.01305 11.8051 5.13807C11.68 5.2631 11.5105 5.33333 11.3337 5.33333C11.1568 5.33333 10.9873 5.2631 10.8623 5.13807C10.7372 5.01305 10.667 4.84348 10.667 4.66667Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.00016 4.83331C7.16031 4.83331 6.35486 5.16694 5.76099 5.76081C5.16713 6.35467 4.8335 7.16013 4.8335 7.99998C4.8335 8.83983 5.16713 9.64529 5.76099 10.2392C6.35486 10.833 7.16031 11.1666 8.00016 11.1666C8.84001 11.1666 9.64547 10.833 10.2393 10.2392C10.8332 9.64529 11.1668 8.83983 11.1668 7.99998C11.1668 7.16013 10.8332 6.35467 10.2393 5.76081C9.64547 5.16694 8.84001 4.83331 8.00016 4.83331ZM5.8335 7.99998C5.8335 7.42534 6.06177 6.87424 6.4681 6.46792C6.87443 6.06159 7.42553 5.83331 8.00016 5.83331C8.5748 5.83331 9.1259 6.06159 9.53223 6.46792C9.93856 6.87424 10.1668 7.42534 10.1668 7.99998C10.1668 8.57462 9.93856 9.12572 9.53223 9.53204C9.1259 9.93837 8.5748 10.1666 8.00016 10.1666C7.42553 10.1666 6.87443 9.93837 6.4681 9.53204C6.06177 9.12572 5.8335 8.57462 5.8335 7.99998Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5055 1.88865C9.17578 1.63038 6.82462 1.63038 4.49487 1.88865C3.15353 2.03865 2.0702 3.09532 1.91287 4.44332C1.63647 6.80637 1.63647 9.19359 1.91287 11.5566C2.0702 12.9046 3.15287 13.9613 4.49487 14.1113C6.80553 14.3693 9.19487 14.3693 11.5055 14.1113C12.8469 13.9613 13.9302 12.9046 14.0875 11.5566C14.364 9.19359 14.364 6.80637 14.0875 4.44332C13.9302 3.09532 12.8475 2.03865 11.5055 1.88865ZM4.60553 2.88198C6.86174 2.6319 9.13866 2.6319 11.3949 2.88198C12.2815 2.98198 12.9915 3.68132 13.0949 4.55998C13.3622 6.84553 13.3622 9.15444 13.0949 11.44C12.9915 12.3186 12.2815 13.0186 11.3949 13.1173C9.13866 13.3674 6.86173 13.3674 4.60553 13.1173C3.71887 13.0186 3.00887 12.3186 2.90553 11.44C2.63823 9.15444 2.63823 6.84553 2.90553 4.55998C3.00887 3.68132 3.71887 2.98132 4.60553 2.88265V2.88198Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-[11px] inline-flex justify-center items-center text-[#636270] hover:text-[#029FAE] border hover:border-[#029FAE] border-transparent rounded-full transition-all duration-500"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_248_4251)">
                    <path
                      d="M8 0C3.58133 0 0 3.58133 0 8C0 11.3907 2.10933 14.2843 5.08433 15.45C5.01567 14.8157 4.95 13.8467 5.11267 13.1563C5.25933 12.5313 6.05 9.18133 6.05 9.18133C6.05 9.18133 5.80933 8.703 5.80933 7.99367C5.80933 6.88133 6.453 6.05 7.256 6.05C7.93733 6.05 8.26867 6.56267 8.26867 7.178C8.26867 7.86566 7.83133 8.89066 7.60633 9.84066C7.41867 10.6373 8.00633 11.2873 8.79067 11.2873C10.2123 11.2873 11.3063 9.78733 11.3063 7.625C11.3063 5.70933 9.93133 4.36867 7.96567 4.36867C5.69067 4.36867 4.353 6.075 4.353 7.84066C4.353 8.528 4.61867 9.26566 4.95 9.66566C5.01567 9.74366 5.025 9.81566 5.00633 9.89366C4.947 10.147 4.80967 10.6903 4.78433 10.8C4.75 10.9467 4.66867 10.978 4.51567 10.9063C3.51567 10.4407 2.89067 8.98133 2.89067 7.80633C2.89067 5.28133 4.725 2.96567 8.175 2.96567C10.95 2.96567 13.1063 4.94367 13.1063 7.58733C13.1063 10.344 11.3687 12.5623 8.95633 12.5623C8.147 12.5623 7.38433 12.1407 7.122 11.6437C7.122 11.6437 6.722 13.172 6.625 13.547C6.44367 14.2403 5.95633 15.1127 5.63133 15.6437C6.3986 15.8804 7.19706 16.0005 8 16C12.4187 16 16 12.4187 16 8C16 3.58133 12.4187 0 8 0Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_248_4251">
                      <rect width={16} height={16} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-[11px] inline-flex justify-center items-center text-[#636270] hover:text-[#029FAE] border hover:border-[#029FAE] border-transparent rounded-full transition-all duration-500"
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8407 4.79995C15.8407 4.79995 15.6843 3.69661 15.203 3.21261C14.5937 2.57495 13.9123 2.57195 13.6 2.53428C11.3627 2.37195 8.00333 2.37195 8.00333 2.37195H7.99667C7.99667 2.37195 4.63767 2.37195 2.4 2.53428C2.08733 2.57195 1.40633 2.57495 0.796667 3.21261C0.316 3.69661 0.162667 4.79995 0.162667 4.79995C0.162667 4.79995 0 6.09662 0 7.39062V8.60295C0 9.89695 0.159333 11.1936 0.159333 11.1936C0.159333 11.1936 0.315667 12.2969 0.793667 12.7813C1.403 13.4186 2.203 13.3969 2.55933 13.4656C3.84067 13.5876 8 13.6249 8 13.6249C8 13.6249 11.3623 13.6186 13.6 13.4593C13.9127 13.4219 14.5937 13.4186 15.2033 12.7813C15.6843 12.2969 15.8407 11.1936 15.8407 11.1936C15.8407 11.1936 16 9.90028 16 8.60328V7.39095C16 6.09728 15.8407 4.80028 15.8407 4.80028V4.79995ZM6.34667 10.0749V5.57828L10.6683 7.83428L6.34667 10.0749Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
};

export default ProductDetails;
