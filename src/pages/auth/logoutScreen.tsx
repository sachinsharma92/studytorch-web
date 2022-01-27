import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import { LOGIN_SCREEN } from "../../router/routes";
import { USER_LOGGED_OUT } from "../../constants/actions";

const LogoutScreen = () => {
  const dispatch = useDispatch();
  dispatch({
    type: USER_LOGGED_OUT,
  });


  return <Navigate to={LOGIN_SCREEN} />;
};

export default LogoutScreen;
