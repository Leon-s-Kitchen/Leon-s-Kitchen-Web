import React, { useState, useEffect } from "react";
import { Text, Img } from "components";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const FriedRice = ({ handleButtonClick, handleAddToCart, notify, friedRiceRef }) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("/products"); // Replace "/api/products" with your actual backend endpoint
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <Text className="mt-[65px] sm:text-[34px] md:text-[40px] text-[44px] text-orange-400" size="txtPoppinsBold44">
        Fried Rice
      </Text>
      <div ref={friedRiceRef} className="gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-center max-w-[1528px] min-h-[auto] mt-[18px] mx-auto md:px-5 w-full">
        {offers.map((offer, index) => (
          <div key={index} className="common-pointer bg-gray-50_02 border border-black-900_19 border-solid flex flex-1 flex-col items-center justify-end p-[22px] sm:px-5 rounded-[12px] shadow-bs1 w-full hover:scale-105 focus:scale-105">
            <div className="flex sm:flex-col flex-row gap-[30px] items-center justify-between mt-0.5 w-[98%] md:w-full">
              <div className="flex flex-col items-start justify-start">
                <Text className="text-black-900 text-xl" size="txtPoppinsSemiBold20">{offer.title}</Text>
                <Text className="mt-[18px] text-black-900 text-sm" size="txtPoppinsRegular14">{offer.desc}</Text>
                <Text className="mt-[69px] text-black-900_01 text-lg" size="txtPoppinsBold18">{`Rs. ${offer.price}`}</Text>
              </div>
              <div className="h-[199px] relative w-[47%] sm:w-full">
                <Img className="h-[199px] m-auto object-cover rounded-[12px] w-full hover:scale-105 focus:scale-105" src={offer.img} alt={offer.title} />
                <div className="absolute bg-white-A700_ab bottom-[0] flex flex-col items-end justify-end p-3.5 right-[0] rounded-br-[12px] rounded-tl-[45px] w-[44%]">
                  <Img className="h-[49px] md:h-auto mt-1 object-cover w-[49px] hover:scale-105 focus:scale-105" src="images/img_plus.png" alt="plus" onClick={() => { handleAddToCart(offer.title, offer.desc, `Rs. ${offer.price}`); notify(); }} />
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriedRice;
