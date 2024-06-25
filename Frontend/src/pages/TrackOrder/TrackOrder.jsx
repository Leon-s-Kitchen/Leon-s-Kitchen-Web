import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Rocket from './../../assets/images/rocket.gif'

const TrackOrder = ({ user }) => {
  const [orderExists, setOrderExists] = useState(false);
  const [outOfDeliveryExists, setOutOfDeliveryExists] = useState(false);

  useEffect(() => {
    const checkOrderExists = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/order/exists/${user.name}`);
        console.log(`Accepted order API response:`, response.data); // Debug log
        setOrderExists(response.data.exists);
      } catch (error) {
        console.error('Error checking order existence', error);
      }
    };

    checkOrderExists();
  }, [user.name]);

  useEffect(() => {
    const checkOutOfDeliveryExists = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/outofdelivery/${user.name}`);
        console.log(`Out of delivery order API response:`, response.data); // Debug log
        setOutOfDeliveryExists(response.data.exists);
      } catch (error) {
        console.error('Error checking out of delivery order existence', error);
      }
    };

    checkOutOfDeliveryExists();
  }, [user.name]);

  return (
    <div>
      <NavBar/>
      <div style={{
        marginTop:"50px",
        fontSize:"50px",
        display:"flex",
        justifyContent:"center",
      }}>Track Your Order <img src={Rocket} style={{
        width:"80px"
      }}/></div>
      
      <div style={{ marginTop: "60px", marginBottom: "10px" }}>
        {orderExists ? (
          <Alert variant="filled" severity="success">Your order has been accepted!</Alert>
        ) : (
          <Alert variant="filled" severity="info">No current order found</Alert>
        )}
      </div>
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        {outOfDeliveryExists ? (
          <Alert variant="filled" severity="info">Your order is out for delivery!</Alert>
        ) : (
          <Alert variant="filled" severity="info">No order is out for delivery</Alert>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  user: session.user,
});

export default connect(mapStateToProps)(TrackOrder);
