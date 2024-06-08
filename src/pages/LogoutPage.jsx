import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom"; // Assuming you're using react-router for navigation

const LogoutPage = () => {
  const history = useHistory();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post("/logout");
        history.push("/login"); // Redirect to login page after logout
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    logoutUser();
  }, [history]);

  return (
    <div>Logging Out...</div>
  );
};

export default LogoutPage;
