import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  login,
  logout,
} from "../redux/auth/selectors";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};
