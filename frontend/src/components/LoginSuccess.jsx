import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getUser } from "../utils/api";
import { setUser } from "../redux/slices/userSlice";

function LoginSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch authenticated user after external login (e.g. Google OAuth)
  async function getUserIfAuth() {
    try {
      const user = await getUser(); // Call backend to retrieve user info
      if (user) {
        dispatch(setUser(user)); // Save user to Redux store
        navigate("/"); // Redirect to homepage
      }
    } catch (error) {
      console.log(error); // Handle potential fetch errors
    }
  }

  // Run once on component mount
  useEffect(() => {
    getUserIfAuth();
  }, []);
}

export default LoginSuccess;
