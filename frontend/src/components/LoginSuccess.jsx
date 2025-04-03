import { getUser } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
