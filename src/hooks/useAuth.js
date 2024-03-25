import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../redux/auth/operations";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn && token) {
      const interval = setInterval(() => {
        dispatch(refreshToken());
      }, 10 * 60 * 1000); // refresh every 10 minutes

      return () => clearInterval(interval);
    }
  }, [isLoggedIn, token, dispatch]);

  return {
    isLoggedIn,
    token,
  };
};
