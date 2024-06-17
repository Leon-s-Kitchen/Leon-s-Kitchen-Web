import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactWhatsapp from "react-whatsapp";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { BsEmojiSmile } from "react-icons/bs";
// import PopUpImage from "./../../assets/images/logo.png"
import PopUpImage from "./../assets/images/logo.png";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

const center = { lat: 6.065240291148039, lng: 80.2352684881948 };
const predefinedOrigin = { lat: 6.065240291148039, lng: 80.2352684881948 }; // Set your predefined origin address here

function Map({ user }) {
  const REACT_APP_GOOGLE_MAPS_API_KEY =
    "AIzaSyD-dc1gOI7HwWAI8-6LVeIJm2yyRBbJoVU";
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [alertInfo, setAlertInfo] = useState({
    showAlert: false,
    severity: "",
    message: "",
    title: "",
  });
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef(predefinedOrigin); // Set the initial value for originRef
  const destinationRef = useRef();
  const userEmail = user.email; // Replace with user's email
  const userName=user.name;
  const userNo=user.mobileNumber;
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [itemQuantities, setItemQuantities] = useState({});
  const [items, setItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wmessage, setWMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const handleShowPopup = () => {
    setIsPopupVisible(true);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/user/cart/${user.email}`
        );
        console.log(response); // Add this line to log the response
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    fetchCartData();
  }, [user.email]);
  const handleSendMessage = async () => {
    const destination = destinationRef.current.value;
  
    // Generate the message dynamically based on the items in the cart
    const cartItemsMessage = items
      .map((menuItem) => {
        const totalPrice =
          parseFloat(menuItem.price.replace("Rs. ", "")) *
          (parseInt(itemQuantities[menuItem._id]) || 1);
        return `${menuItem.name} - Rs. ${menuItem.price} x${
          itemQuantities[menuItem._id] || 1
        } = Rs. ${totalPrice.toFixed(2)}`;
      })
      .join("\n"); // Separate each item with a new line
  
    // Calculate total amount to pay
    const totalAmount =
      items.reduce((total, menuItem) => {
        return (
          total +
          parseFloat(menuItem.price.replace("Rs. ", "")) *
            (parseInt(itemQuantities[menuItem._id]) || 1)
        );
      }, 0) + 200; // Add delivery fee
  
    // Set the message state with the dynamically generated message
    const message = `Hello New Order!\n\nItems in the cart:\n${cartItemsMessage}\nDelivery Fee: Rs. 200\n\nTotal Amount to Pay: Rs. ${totalAmount.toFixed(
      2
    )}\nDestination: ${destination}`;
    setWMessage(message);
  
    // Prepare order details
    const orderDetails = {
      user: userEmail,
      name:userName,
      mobileNo:userNo,
      items: items.map((menuItem) => ({
        name: menuItem.name,
        price: parseFloat(menuItem.price.replace("Rs. ", "")),
        quantity: itemQuantities[menuItem._id] || 1,
      })),
      totalAmount: totalAmount.toFixed(2),
      deliveryFee: 200,
      destination,
    };
  
    // Save order to the backend
    try {
      const response = await axios.post("http://localhost:5000/user/save-order", orderDetails);
      if (response.status === 200) {
        alert("Order saved successfully!");
      } else {
        alert("Failed to save order. Please try again.");
      }
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Failed to save order. Please try again.");
    }
  };
  

  // Function to save the destination to backend
  async function saveDestination() {
    try {
      const destination = destinationRef.current.value;
      // Send a POST request to your backend endpoint /save-destination
      await axios.post("http://localhost:5000/user/save-destination", {
        email: userEmail,
        destination,
      });
      alert("Destination saved successfully!");
    } catch (error) {
      console.error("Error saving destination:", error);
      alert("Failed to save destination. Please try again later.");
    }
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: predefinedOrigin,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = predefinedOrigin; // Reset to predefined origin
    destinationRef.current.value = "";
  }

  const hideAlertAfterTimeout = () => {
    setTimeout(() => {
      setAlertInfo((prevState) => ({
        ...prevState,
        showAlert: false,
      }));
    }, 10000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          const geocoder = new window.google.maps.Geocoder();

          geocoder.geocode({ location: currentLocation }, (results, status) => {
            if (status === "OK" && results[0]) {
              const formattedAddress = results[0].formatted_address;
              destinationRef.current.value = formattedAddress;
              setAlertInfo({
                showAlert: true,
                severity: 'success',
                message: 'Please click Calculate Route to see the Distance and Duration.',
                title: 'Success'
              });
              hideAlertAfterTimeout();
            } else {
              setAlertInfo({
                showAlert: true,
                severity: 'error',
                message: `Geocoder failed due to: ${status}`,
                title: 'Error'
              });
              hideAlertAfterTimeout();
            }
          });
        },
        (error) => {
          let errorMessage = '';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'User denied the request for Geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'The request to get user location timed out.';
              break;
            case error.UNKNOWN_ERROR:
              errorMessage = 'An unknown error occurred.';
              break;
            default:
              errorMessage = 'An unknown error occurred.';
          }
          setAlertInfo({
            showAlert: true,
            severity: 'error',
            message: errorMessage,
            title: 'Error'
          });
          hideAlertAfterTimeout();
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setAlertInfo({
        showAlert: true,
        severity: 'error',
        message: 'Geolocation is not supported by this browser.',
        title: 'Error'
      });
      hideAlertAfterTimeout();
    }
  };

  return (
    <>
      {isLoaded ? (
        <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
          <div
            style={{
              position: "absolute",
              top: "30%",
              left: "20%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              width: "500px",
              marginTop: "50px",
            }}
          >
            <Autocomplete
              onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
              onPlaceChanged={() => {
                const place = destinationRef.current.getPlace();
                destinationRef.current.value = place.formatted_address;
              }}
            >
              <input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
                style={{ padding: "8px", marginBottom: "8px" }}
              />
            </Autocomplete>
            <div>
              <button
                className="bg-orange-600_cc border border-black-1900_1c border-solid flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                onClick={getCurrentLocation}
                style={{ padding: "8px", marginBottom: "8px" }}
              >
                Use Your Current Location 🚀
              </button>
              {alertInfo.showAlert && (
                <Alert
                  severity={alertInfo.severity}
                  style={{ marginBottom: "10px" }}
                >
                  <AlertTitle>{alertInfo.title}</AlertTitle>
                  {alertInfo.message}
                </Alert>
              )}
              <input
                type="text"
                ref={destinationRef}
                style={{ display: "none" }}
              />
            </div>
            <button
              className="bg-orange-600_cc border border-black-1900_1c border-solid flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
              onClick={calculateRoute}
              style={{ padding: "8px", marginBottom: "8px" }}
            >
              Calculate Route
            </button>
            <button
              className="bg-orange-600_cc border border-black-1900_1c border-solid flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
              onClick={clearRoute}
              style={{ padding: "8px", marginBottom: "8px" }}
            >
              Clear Route
            </button>

            <div>
              <span
                className="bg-orange-600_cc border border-black-1900_1c border-solid flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                style={{ padding: "8px", marginBottom: "8px", width: "200px" }}
              >
                Distance: {distance}
              </span>
              <span
                className="bg-orange-600_cc border border-black-1900_1c border-solid flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                style={{ padding: "8px", marginBottom: "8px", width: "200px" }}
              >
                Duration: {duration}
              </span>
            </div>
            <div>
              <button
                className="bg-orange-600_cc border border-black-1900_1c border-solid flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                onClick={saveDestination}
                style={{ padding: "8px", marginBottom: "8px" }}
              >
                Save Destination
              </button>
              <button
                className="bg-orange-600_cc border border-black-1900_1c border-solid flex flex-row items-center justify-between p-4 rounded-lg cursor-pointer"
                onClick={handleShowPopup}
              >
                <span className="ml-[5px] text-white-A700 text-xl ">
                  Place Order
                </span>
              </button>
              {isPopupVisible && (
                <div className="popup">
                  <div className="popup-inner">
                    <h2
                      style={{
                        fontWeight: "600",
                        textAlign: "center",
                        fontSize: "40px",
                      }}
                    >
                      Order Information
                    </h2>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      Your order is almost set! 🚀
                      
                    </p>

                    <ul
                      style={{
                        listStyleType: "disc",
                        paddingLeft: "20px",
                      }}
                    >
                      <li style={{
                        marginTop:"10px"
                      }}>
                        Please check the message details and send it through
                        WhatsApp.
                      </li>
                      <li style={{
                        marginTop:"10px"
                      }}>  
                        WhatsApp will automatically open and send the message.
                      </li>
                      <li style={{
                        marginTop:"10px"
                      }}>Please follow the steps.Thanks for choosing Leon's Kitchen ⚡</li>
                    </ul>
                    <div className="flex justify-center mt-3">
                      <ReactWhatsapp
                        number="+94 0741112634"
                        className="bg-orange-600_cc border border-black-1900_1c border-solid flex items-center justify-center p-4 rounded-lg cursor-pointer"
                        message={wmessage}
                        onClick={handleSendMessage} // Call handleSendMessage when button is clicked
                      >
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          style={{
                            fontSize: "24px", // Match the font size of the text
                            color: "black",
                            marginRight: "10px", // Optional: Add some spacing between the icon and the text
                          }}
                        />
                        <span style={{ fontSize: "24px" }}>Place Order</span>
                      </ReactWhatsapp>
                    </div>
                    <img
                      src={PopUpImage}
                      alt="Popup"
                      style={{
                        width: "180px",
                        height: "180px",
                        marginLeft: "90px",
                      }}
                    />
                    <div className="button-wrapper">
                      <button
                        onClick={handleClosePopup}
                        className="popup-inner-button"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {map && (
              <button
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(15);
                }}
              >
                Center Map
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
const mapStateToProps = ({ session }) => ({
  user: session.user,
});
export default connect(mapStateToProps)(Map);
