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
import FooterComponent from "./FooterComponent";
import NavBar from "./NavBar";
import PopUpImage from "./../../assets/images/logo.png";

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
    "images/8.jpg",
    "images/9.jpg",
    "images/10.jpg",
    "images/11.jpg",
    "images/12.jpg",
    "images/13.jpg",
    "images/14.jpg",
    "images/15.jpg",
    "images/16.jpg",
    "images/17.jpg",
    "images/18.jpg",
    "images/19.jpg",
    "images/20.jpg",
    "images/21.jpg",
    "images/22.jpg",
    "images/23.jpg",
    "images/24.jpg",
    "images/25.jpg",
    "images/26.jpg",
    "images/27.jpg",
    "images/28.jpg",
    "images/29.jpg",
    "images/30.jpg",
    "images/31.jpg",
    "images/32.jpg",
    "images/33.jpg",
    "images/34.jpg",
    "images/35.jpg",
    "images/36.jpg",
    "images/37.jpg",
    "images/39.jpg",
    "images/40.jpg",
    "images/41.jpg",
    "images/42.jpg",
    "images/43.jpg",
    "images/44.jpg",
    "images/45.jpg",
    "images/46.jpg",
    "images/47.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [cartItemCount, setCartItemCount] = useState(0);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
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
        <div className="sm:h-[818px] h-[820px] md:h-[914px] max-w-[1545px] mx-auto md:px-5 relative w-full">
          <div className="absolute flex flex-col h-full inset-[0] items-center justify-center m-auto w-[99%]">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="border border-black-900_19 border-solid flex flex-col items-center justify-end p-[13px] rounded-bl-[12px] rounded-br-[12px] w-full">
                <Img
                  className="h-[58px] md:h-auto md:ml-[0]  mt-1 object-cover w-[4%] "
                  src="images/party.gif"
                  alt="One"
                />
                <Text className="mb-2">Welcome, {user.name}</Text>
              </div>
              <NavBar
                navigate={navigate}
                handleButtonClick={handleButtonClick}
                handleClosePopup={handleClosePopup}
                isPopupOpen={isPopupOpen}
                cartItemCount={cartItemCount}
                logoutUser={logoutUser}
                handleLogout={handleLogout}
                PopUpImage={PopUpImage}
              />

              <div className="font-poppins h-[610px] md:h-[651px] mt-[41px] relative w-full">
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

                <div className="absolute bg-blue_gray-100_7f bottom-[5%] flex flex-col items-center justify-end left-[3%] p-[22px] sm:px-5 rounded-[20px] w-[44%]">
                  <div className="flex flex-col gap-[7px] items-start justify-start mt-[25px]">
                    <Text
                      className="text-2xl md:text-[22px] text-black-900_01 sm:text-xl"
                      size="txtPoppinsSemiBold24"
                    >
                      Order Restaurant food and takeaway.
                    </Text>
                    <Text
                      className="leading-[66.00px] md:text-5xl text-[64px] text-black-900_01"
                      size="txtPoppinsSemiBold64"
                    >
                      <>
                        The Best of <br /> Galle
                      </>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* new end */}
        <div className="sm:mt-10">
        <Helmet>
          <script
            src="https://static.elfsight.com/platform/platform.js"
            defer
          />
        </Helmet>
        <div
          className="elfsight-app-fd76f4b6-e0fc-4e44-98f9-82fc7d69a499 "
          data-elfsight-app-lazy
          style={{ paddingTop: "30px" }} // Adjust the padding as needed
        />
        </div>
        
        <div className="flex flex-col items-center justify-start w-full sm:hidden">
          <div className="md:h-[546px] h-[704px] md:px-5 relative w-full">
            <div className="absolute h-[690px] inset-0 justify-center m-auto w-full hidden sm:block">
              <div className="flex flex-col items-center justify-start mb-[-69px] ml-[95px] w-[82%] z-[1]">
                <div className="flex flex-col md:gap-10 gap-[77px] items-center justify-start w-full">
                  <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-[93%] sm:mr-10 md:w-full">
                    <Text
                      className="md:text-3xl sm:text-[28px] text-[32px] text-black-900"
                      size="txtPoppinsBold32"
                    >
                      All Offers from Leon’s Kitchen Galle
                    </Text>
                  </div>
                  <div className="absolute bg-orange-600 h-24 inset-x-0 mx-auto top-[100px] w-full">
                    <div className="flex items-center justify-center h-full">
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
                className="absolute bottom-0 h-[546px] inset-x-0 mx-auto object-cover w-[90%] top-[210px]"
                src="images/img_32823722953625.png"
                alt="32823722953625"
              />
            </div>
          </div>
        </div>
        <div className="sm:mt-10">
        <FriedRice />
        </div>
      

        <div className="h-[634px] md:h-[661px] max-w-[1548px] mt-[27px] mx-auto md:px-5 relative w-full">
          <Img
            className="h-[634px] m-auto object-cover w-full"
            src="images/img_image1.png"
            alt="imageOne"
          />
        </div>

        
        
        
       
        
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
