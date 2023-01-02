import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { getUser } from "../../redux/actions";

function GetUserToState(props) {
  const token = Cookies.get("access_token");

  // let [data, setData] = useState({});
  let data = {};

  // img url for avatar
  const url = "https://img.workwdn.com";

  async function getProfile() {
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
          let id = obj.result.id;
          if (obj.result.ads) {
            getAds(id);
          } else {
            // username because account has no ads
            let avatarUrl = obj.result.avatar;

            data.avatar = `${url}/${id}/400/600/jpeg/${avatarUrl}`;
            data.username = obj.result.username;
            data.id = id;
            props.props.getUser(data);

            getAds(8);

            // props.props.history.push("/dashboard");
            // redirect to dashboard

            // this is testing purpuse for no ads account
          }
        } else {
          Cookies.remove("access_token");
          props.props.history.push("/dashboard");
        }
      })
      .catch((error) => console.log("error" + error));
  }

  useEffect(() => {
    if (token !== undefined) {
      getProfile();
    } else {
      props.props.history.push("/dashboard");
    }
  }, []);

  async function getAds(id) {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(`https://api.devapp.one/ads/detail/${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let adsDetail = JSON.parse(result);
        data.ads = true;

        let Showname =
          adsDetail.result.showname !== undefined
            ? adsDetail.result.showname
            : adsDetail.result.username;

        let Country =
          adsDetail.result.get_locations !== undefined
            ? adsDetail.result.get_locations[0].location_details.code
            : "No Country";

        // checking user city
        let City =
          adsDetail.result.get_locations !== undefined
            ? adsDetail.result.get_locations[1].location_details
                .location_contents[0].name
            : "No City";
        // checking user age
        let Age = adsDetail.result.ads_meta[0]
          ? adsDetail.result.ads_meta[0].ads_options[0].title
          : "No Age";
        // checking user avatar
        let Imageurl =
          adsDetail.result.ads_photo_profile == null
            ? "placeholder"
            : `${url}/${adsDetail.result.user.id}/400/600/jpeg/${adsDetail.result.ads_photo_profile.profile_photo.file_name}`;
        // mercing all the in formation to one object
        data.country = Country;
        data.city = City;
        data.age = Age;
        data.avatar = Imageurl;
        data.username = Showname;
        props.props.getUser(data);

        props.props.history.push("/dashboard");
      })
      .catch((error) => console.log(error));
  }

  return (
   <></>
  );
}

export default GetUserToState;
