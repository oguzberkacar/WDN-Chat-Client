import jwtDecode from "jwt-decode";

import Cookies from "js-cookie";
import { loginUserSuccess } from "../redux/actions";

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
  const user = getLoggedInUser();
  
  if (!user) {
    return false;
  }
};

/**
 * Sets the logged in user
 */
const setLoggedInUser = (user) => {
  // localStorage.setItem('authUser', JSON.stringify(user));
  Cookies.set("access_token", user.token);
};

/**
 * Returns the logged in user
 */
 async function getLoggedInUser() {
  const token = Cookies.get("access_token");
  let user = ""
  
  if (token) {
    // Fetch user profile
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    await fetch("https://api.devapp.one/profile", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let obj = JSON.parse(result);
        if (obj.status === 200 && obj.success == true) {
          user = obj.result;
          loginUserSuccess(user);
        }
      });
  }


  // const user =  || null
  return user
}

export { isUserAuthenticated, setLoggedInUser, getLoggedInUser };
