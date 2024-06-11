import React from "react";
import "./index.css";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./../../auth/actions/userActions";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button, Img, Input, Line, List, Text } from "components";
import { connect } from "react-redux";
import FriedRice from "./FriedRice";
import ItemsNavBar from "./ItemsNavBar";

const RestaurantDetailPageDesktopPage = ({ logoutUser, user }) => {
  const navigate = useNavigate();
  const drinksRef = useRef(null);
  const friedRiceRef = useRef(null);
  const kottuRef = useRef(null);
  const images = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg",
    "images/5.jpg",
    "images/6.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);
  const handleLogout = async () => {
    try {
      // Make a request to your backend endpoint to clear the user's cart
      const response = await fetch("http://localhost:5000/user/cart/clear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.email }),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("User logged out successfully");
      } else {
        // Handle failure, e.g., show an error message
        console.error("Failed to log out user");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("An error occurred during logout:", error);
    }
  };

  const handleButtonClick = () => {
    if (friedRiceRef.current) {
      setTimeout(() => {
        friedRiceRef.current.scrollIntoView({ behavior: "smooth" });
      }, 5000);
    }

    if (kottuRef.current) {
      setTimeout(() => {
        kottuRef.current.scrollIntoView({ behavior: "smooth" });
      }, 5000); // 500 milliseconds delay
    }

    if (drinksRef.current) {
      setTimeout(() => {
        drinksRef.current.scrollIntoView({ behavior: "smooth" });
      }, 5000); // 1000 milliseconds delay, adjust as needed
    }
  };

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
      const response = await fetch("http://localhost:5000/user/cart/add", {
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

  return (
    <>
      <div className="bg-white-A700 flex flex-col font-poppins items-center justify-start mx-auto w-full">
        <div className="flex flex-col gap-5 items-center justify-start w-full">
          <div className="md:h-[477px] h-[716px] max-w-[1534px] mx-auto md:px-5 relative w-full">
            <div className="absolute md:h-[477px] h-[697px] inset-[0] justify-center m-auto w-full">
              <div className="absolute bottom-[4%] h-[477px] inset-x-[0] mx-auto w-full">
                <div className="absolute h-[477px] inset-[0] justify-center m-auto w-full">
                  <div className="slideshow-container">
                    {images.map((image, index) => (
                      <Img
                        key={index}
                        className={`slideshow-image ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        src={image}
                        alt={`slide-${index}`}
                      />
                    ))}
                  </div>

                  <div className="absolute flex flex-col h-max inset-y-[0] items-start justify-start left-[4%] my-auto">
                    <Text
                      className="text-white-A700 text-xl"
                      size="txtPoppinsRegular20"
                    >
                      <>I&#39;m lovin&#39; it!</>
                    </Text>
                    <Text
                      className="sm:text-[40px] md:text-[46px] text-[54px] text-white-A700"
                      size="txtPoppinsSemiBold54"
                    >
                      LEON’S KITCHEN GALLE
                    </Text>
                  </div>
                  <Text
                    className="absolute bottom-[22%] left-[31%] text-lg text-white-A700"
                    size="txtPoppinsSemiBold18"
                  >
                    Delivery in 20-25 Minutes
                  </Text>
                  <Text
                    className="absolute bottom-[23%] left-[9%] text-lg text-white-A700"
                    size="txtPoppinsSemiBold18"
                  >
                    Minimum Order: Rs.1000
                  </Text>
                  <div className="absolute border border-solid border-white-A700 bottom-[19%] flex flex-col items-start justify-end left-[4%] p-3 rounded-[31px] w-[22%]">
                    <Img
                      className="h-[34px] md:h-auto md:ml-[0] ml-[21px] mt-[5px] object-cover w-[34px]"
                      src="images/img_ordercompleted.png"
                      alt="ordercompleted"
                    />
                  </div>
                  <div className="absolute border border-solid border-white-A700 bottom-[19%] flex flex-col items-start justify-end left-[26%] p-3.5 rounded-[31px] w-[23%]">
                    <Img
                      className="h-[34px] md:h-auto ml-2 md:ml-[0] object-cover w-[34px]"
                      src="images/img_motocross.png"
                      alt="motocross"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bg-orange-600 bottom-[0] flex flex-row gap-[13px] items-center justify-center left-[0] p-3.5 rounded-br-[12px] rounded-tr-[12px] w-[22%]">
                <Img
                  className="h-[29px] md:h-auto ml-[47px] object-cover w-[29px]"
                  src="images/img_clock_29x29.png"
                  alt="clock"
                />
                <Text
                  className="mr-[39px] text-lg text-white-A700"
                  size="txtPoppinsSemiBold18"
                >
                  Open until 10:00 PM
                </Text>
              </div>
             {/* End */}
              <div className="absolute flex md:flex-col flex-row font-manrope md:gap-5 inset-x-[0] items-center justify-start mx-auto top-[0] w-[98%]">
                
                <div style={{
                  marginTop:"50px"
                }}>
                <ItemsNavBar/>
                </div>
                
              </div>
              <Img
                className="h-[38px] md:h-auto md:ml-[0] ml-[750px] mt-1 object-cover w-[2%]"
                src="images/img_.png"
                alt="One"
              />
              <Text className="mb-2 ml-[700px]">Welcome, {user.name}</Text>
            </div>
          </div>
        </div>
        {/* new end */}
        <div className="flex flex-col items-center justify-start w-full">
          <div className="md:h-[546px] h-[704px] md:px-5 relative w-full">
            <div className="absolute h-[690px] inset-[0] justify-center m-auto w-full">
              <div className="flex flex-col items-center justify-start mb-[-69px] ml-[95px] w-[82%] z-[1]">
                <div className="flex flex-col md:gap-10 gap-[77px] items-center justify-start w-full">
                  <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-[93%] md:w-full">
                    <Text
                      className="md:text-3xl sm:text-[28px] text-[32px] text-black-900"
                      size="txtPoppinsBold32"
                    >
                      All Offers from Leon’s Kitchen Galle
                    </Text>
                  </div>
                  <div className="absolute bg-orange-600 h-24 inset-x-0 mx-auto top-[100px] w-full">
                    <div className="flex items-center justify-center h-full">
                      {" "}
                      {/* Center items vertically and horizontally */}
                      <div className="space-x-16 text-center">
                        <button
                          className="text-black font-bold text-lg bg-transparent px-4 py-2 rounded hover:bg-gray-300 hover:text-orange-600 focus:outline-none"
                          onClick={() => handleButtonClick(friedRiceRef)}
                        >
                          Fried Rice
                        </button>
                        <button
                          className="text-black font-bold text-lg bg-transparent px-4 py-2 rounded hover:bg-gray-300 hover:text-orange-600 focus:outline-none"
                          onClick={() => handleButtonClick(kottuRef)}
                        >
                          Kottu
                        </button>
                        <button
                          className="text-black font-bold text-lg bg-transparent px-4 py-2 rounded hover:bg-gray-300 hover:text-orange-600 focus:outline-none"
                          onClick={() => handleButtonClick(drinksRef)}
                        >
                          Cold Drinks
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:h-[546px] h-[595px] mt-auto mx-auto w-full">
              <Img
                className="absolute bottom-[0] h-[546px] inset-x-[0] mx-auto object-cover w-[90%] top-[210px]"
                src="images/img_32823722953625.png"
                alt="32823722953625"
              />
            </div>
          </div>
        </div>
        <FriedRice/>
        
        
        
        
        <div className="h-[634px] md:h-[661px] max-w-[1548px] mt-[27px] mx-auto md:px-5 relative w-full">
          <Img
            className="h-[634px] m-auto object-cover w-full"
            src="images/img_image1.png"
            alt="imageOne"
          />
          
        </div>

        <Helmet>
          <script
            src="https://static.elfsight.com/platform/platform.js"
            defer
          />
        </Helmet>
        <div
          className="elfsight-app-fd76f4b6-e0fc-4e44-98f9-82fc7d69a499"
          data-elfsight-app-lazy
          style={{ paddingTop: "30px" }} // Adjust the padding as needed
        />
      </div>
    </>
  );
};
const mapStateToProps = ({ session }) => ({
  user: session.user,
});

export default connect(mapStateToProps, { logoutUser })(
  RestaurantDetailPageDesktopPage
);
