const API_KEY = "88bbfb23ab454a43bbe3322a72acdb81";

let current_location = [];

const successCallback = (position) => {
  // console.log(position);
  console.log(
    "lat:",
    position.coords.latitude,
    " long :",
    position.coords.longitude
  );

  //Location search by coordinates
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=${API_KEY}`
  )
    .then((resp) => resp.json())
    .then((result) => {
      let res = result.results[0];
      let output = "";
      // console.log(res)
      if (result) {
        output = `
                <li>Name of Time Zone: ${res.name}</li>
                <li>Lat: ${res.lat}<span class='move'>Long: ${res.lon}</span></li>
                <li>Offset STD: ${res.timezone.offset_STD}</li>
                <li>Offset STD Seconds: ${res.timezone.offset_STD_seconds}</li>
                <li>Offset DST: ${res.timezone.offset_DST}</li>
                <li>Offset DST Seconds: ${res.timezone.offset_DST_seconds}</li>
                <li>Country: ${res.country}</li>
                <li>Postcode: ${res.postcode}</li>
                <li>City:- ${res.city}</li>
        `;
        document.getElementById("current-data").innerHTML = output;
      } else {
        console.log("No location found");
      }
    });
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

// location  search

function showResult() {
  const address = document.getElementById("add").value;
  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${API_KEY}`
  )
    .then((resp) => resp.json())
    .then((geocodingResult) => {
      if (address == 0 || !geocodingResult ) {
        document.getElementById("res").innerHTML =
          '<li class="err">Please Enter Address!</li>';
      } 
      else if (geocodingResult) {
        let res = geocodingResult.features[0].properties;
        let output = "";
        output = `
                    <li>Name of Time Zone: ${res.timezone.name} </li>
                    <li>Lat: ${res.lat} <span class='move'>Long: ${res.lon}</span></li>
                    <li>Offset STD: ${res.timezone.offset_STD}</li>
                    <li>Offset STD Seconds: ${res.timezone.offset_STD_seconds}</li>
                    <li>Offset DST: ${res.timezone.offset_DST}</li>
                    <li>Offset DST Seconds: ${res.timezone.offset_DST_seconds}</li>
                    <li>Country: ${res.country}</li>
                    <li>City: ${res.city}</li>
            `;

        document.getElementById("res").innerHTML = output;
        console.log(output);
      }
    });
}
