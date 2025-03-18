import React from "react";
import Menu from "../Menu/menu";

const CustomerInfo = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <div>
         <Menu/>
         <br/><hr/>
      <h2>Customer Info</h2>
      {user ? (
        <ul>
            <li>CustomerId: {user.custId}</li>
          <li>Name: {user.custName}</li>
          <li>Username: {user.custUserName}</li>
          <li>City: {user.city}</li>
          <li>State: {user.state}</li>
          <li>Email: {user.email}</li>
          <li>Mobile No: {user.mobileNo}</li>
        </ul>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default CustomerInfo;