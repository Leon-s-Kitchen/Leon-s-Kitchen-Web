import React from 'react'
import Alert from '@mui/material/Alert';

const TrackOrder = () => {
  return (
    <div>
      <div>
         Track Your Order
      </div>
      <div style={{
        marginTop:"10px",marginBottom:"10px"
      }}>
      <Alert variant="filled" severity="success">Your order has been accepted!</Alert>
      </div>
      <div style={{
        marginBottom:"10px"
      }}>
      <Alert variant="filled" severity="success">Your order is out of delievery!</Alert>
      </div>
      <div style={{
        marginBottom:"10px"
      }}>
      <Alert variant="filled" severity="success">Your order marked as completed!</Alert>
      </div>
      

    </div>
  )
}

export default TrackOrder
