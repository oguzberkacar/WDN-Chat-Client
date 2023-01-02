var myHeaders = new Headers(); // Creating Header
myHeaders.append("Content-Type", "application/json");

// Account details from form
var raw = JSON.stringify({
  username: username,
  password: password,
  device_id: "1",
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

// Sending login reqeust with api
fetch("https://api.devapp.one/auth/login", requestOptions)
  .then((response) => response.text())
  .then((result) => {
    var obj = JSON.parse(result);
    
    let base64 = obj.base64_code;
    if (obj.status === 200 && obj.success == true) {
      

      if (obj.two_factor == 0) {
        Cookies.set("access_token", obj.access_token);
        history.push("/dashboard");
        
      } else if (obj.two_factor == 1) {
        history.push("/twofactor");
        // twofactor(base64)
        // 
      }

      // history.push("/dashboard");
    }
  })
  .catch((error) => apiError(error));