import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { logoutUser } from './../../auth/actions/userActions';
import { Img } from 'components';
import './ItemsNavBar.css';
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const ItemsNavBar = ({
  handleButtonClick,
  handleClosePopup,
  isPopupOpen,
  cartItemCount,
  PopUpImage,
  user
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    
    try {
      // Make a request to your backend endpoint to clear the user's cart
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/cart/clear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.email }),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log("User's cart cleared successfully");
      } else {
        // Handle failure, e.g., show an error message
        console.error("Failed to clear user's cart");
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("An error occurred during cart clearing:", error);
    }

    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className="nav-container">
      <Img className="logo" src="images/img_32700620370740.png" alt="Logo" />
      <div className="nav-buttons-container">
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="nav-button" onClick={() => navigate('/loginorreg')}>
            Browse Menu
          </button>
          <button className="nav-button" onClick={() => navigate('/special-offers')}>
            Special Offers
          </button>
          <button className="nav-button" onClick={() => navigate('/gallery')}>
            Restaurants
          </button>
          <button className="nav-button" onClick={handleButtonClick}>
            Track Order
          </button>
          <button className="nav-button cart-button" onClick={handleButtonClick}>
            <img src="images/cart.svg" alt="Cart" className="cart-icon" />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </button>
        </div>
        {isPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-inner">
              <button
                onClick={handleClosePopup}
                className="popup-inner-close-button"
              >
                <IoMdClose className="close-icon" />
              </button>
              <h2 className="popup-title">Please SignUp or Login</h2>
              <p className="popup-text">
                Dear Customer, You need to login or signup to use this feature.
              </p>
              <img src={PopUpImage} alt="Popup" className="popup-image" />
              <div className="button-container">
                <button
                  className="signup-button"
                  onClick={() => navigate('/loginorreg')}
                >
                  Sign Up
                </button>
                <div className="or-text">or</div>
                <button
                  className="login-button"
                  onClick={() => navigate('/loginorreg')}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button className="logout-button" onClick={handleLogout}>
        <div className="logout-content">
          <img className="user-icon" src="images/img_maleuser.png" alt="User" />
          <span className="logout-text">Logout</span>
        </div>
      </button>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  user: session.user,
});

export default connect(mapStateToProps, { logoutUser })(ItemsNavBar);
