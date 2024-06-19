import React, { useState, useEffect } from "react";
import { Text, Img } from "components";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';



const FriedRice = ({ handleButtonClick,  friedRiceRef,user }) => {
  const [offers, setOffers] = useState([]);
  const handleAddToCart = async (itemName, itemDescription, itemPrice) => {
    try {
      // Prepare the item data
      const itemData = {
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        userId: user.email,
        // Add other item details as needed
      };

      // Make a POST request to your backend endpoint
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });
    } catch (error) {
      // Handle unexpected errors
      console.error("An error occurred:", error);
    }
  };

  const notify = () => toast("Added to the cart successfully!");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/products`);
        const data = await response.json();  // Correctly parse the JSON response
        setOffers(data);  // Set the parsed data to offers state
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <Text className="mt-[65px] sm:text-[34px] md:text-[40px] text-[44px] text-orange-400" size="txtPoppinsBold44">
      Leon's Kitchen Delights
      </Text>
      <div ref={friedRiceRef} className="gap-5 grid sm:grid-cols-1 md:grid-cols-1 grid-cols-1 justify-center max-w-[1528px] min-h-[auto] mt-[18px] mx-auto md:px-5 w-full">
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <div key={index} className="common-pointer bg-gray-50_02 border border-black-900_19 border-solid flex flex-1 flex-col items-center justify-end p-[22px] sm:px-5 rounded-[12px] shadow-bs1 w-full hover:scale-105 focus:scale-105">
              <div className="flex sm:flex-col flex-row gap-[30px] items-center justify-between mt-0.5 w-[98%] md:w-full">
                <div className="flex flex-col items-start justify-start">
                  <Text className="text-black-900 text-xl" size="txtPoppinsSemiBold20">{offer.title}</Text>
                  <Text className="mt-[18px] text-black-900 text-sm" size="txtPoppinsRegular14">{offer.desc}</Text>
                  <Text className="mt-[18px] text-blue-900 text-sm" size="txtPoppinsRegular38">Regular Size</Text>
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
          ))
        ) : (
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
          <p className="text-black-900 text-xl">Loading... <CircularProgress /></p>
        </div>
          
      
        )}
      </div>
    </div>
  );
};
const mapStateToProps = ({ session }) => ({
  user: session.user,
});

export default connect(mapStateToProps)(FriedRice);