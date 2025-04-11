import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/AuthContext";
import axios from 'axios';

const CurrentMembershipPage = () => {

    const { isAuthenticated, user } = useAuth()
    const [userStatusDetails, setUserStatusDetails] = useState()
    const [daysRemaining, setDaysRemaining] = useState()

  useEffect(() => {
    // /api/users/subscription/
    const userId = user.id
    const fetchUserSubscriptionDetails = async () => {
      try {
        // const response = await fetch(`https://backend-nm1z.onrender.com/users/subscription/${userId}`);
        // if (!response.ok) throw new Error("Failed to fetch membership plans");
        
        // const data = await response.json();

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(
        `https://backend-nm1z.onrender.com/users/subscription/${userId}`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      if (response.data){
        // console.log(response.data.data)
        const details = response.data.data
        const expiry = details.expiresAt

        setUserStatusDetails(expiry)
      }
        // console.log(data.data)
      } catch (err) {
        console.log(err)
      } 
      
    };
      if (userId){
        // console.log("userId: ", userId)
        fetchUserSubscriptionDetails()
      }
  }, [])

  useEffect(()=>{
    const calculateDaysRemaining= ()=>{
      const expiryDate = new Date(userStatusDetails);
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays)
    }

    if(userStatusDetails){
      calculateDaysRemaining()
    }

    // console.log(userStatusDetails);
  },[userStatusDetails])

  function formatDateToDDMMYYYY(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
  
  return (
    <div>
      <div>

      Current Plan
      </div>
      {/* <pre>{userStatusDetails.expiresAt}</pre> */}
      <div>

      Expires at: {formatDateToDDMMYYYY(userStatusDetails)}
      </div>

      <div>

      {daysRemaining} Days Remaining
      </div>
    </div>
  )
}

export default CurrentMembershipPage