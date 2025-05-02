import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getUser } from "../utils/api";
import { setUser } from "../redux/slices/userSlice";

function LoginSuccess() {
    const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getUserIfAuth() {
    try {
      const user = await getUser();
      if (user) {
        dispatch(setUser(user));
        navigate("/");
      }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getUserIfAuth();
  }, []);
}

export default LoginSuccess;
