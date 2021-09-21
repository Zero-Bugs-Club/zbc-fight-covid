//selecting divs from our html 
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const active_element = document.querySelector(".active .value");

//variables
let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  deaths = [],
  formatedDates = [];

// defining country here
let user_country = 'India';
fetchData(user_country);

//geeting data from api
function fetchData(country) {
  user_country = country;

  (cases_list = []),
    (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/confirmed",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates.push(entry.Date);
          cases_list.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/recovered",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          recovered_list.push(entry.Cases);
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/deaths",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          deaths_list.push(entry.Cases);
        });
      });
    //uploading data in html
    updateUI();
  };

  api_fetch(country);
}

function updateUI() {
  updateStats();
}

//setting up data for html
function updateStats() {
  const total_cases = cases_list[cases_list.length - 1];
  const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

  const total_recovered = recovered_list[recovered_list.length - 1];
  const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];

  const total_deaths = deaths_list[deaths_list.length - 1];
  const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];

  const active_cases = total_cases - total_recovered - total_deaths;

  total_cases_element.innerHTML = total_cases;
  new_cases_element.innerHTML = `+${new_confirmed_cases}`;
  recovered_element.innerHTML = total_recovered;
  new_recovered_element.innerHTML = `+${new_recovered_cases}`;
  deaths_element.innerHTML = total_deaths;
  new_deaths_element.innerHTML = `+${new_deaths_cases}`;

  active_element.innerHTML = active_cases;

}

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var city;
  var state;
  var cases;
  console.log(position);
  async function getLoc() {

      const response_loc = await fetch(
          "https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=085655d25bc74637b044b8232968bd69"
      );

      const loc = await response_loc.json();
      city = loc.results[0].components.city;
      state = loc.results[0].components.state;

      // console.log(city);
      console.log(state);

      const response_data = await fetch(
          "https://api.rootnet.in/covid19-in/stats/latest"
      );
      const data = await response_data.json();
      // console.log(data);
      // DATA = JSON.stringify(data);
      // DATA = JSON.parse(DATA);
      // console.log(DATA);
      var caseConformed, casesDeath, casesDischarge;

      for(var i=0;i<36;i++){
        console.log(data.data.regional[i].loc);
        if(data.data.regional[i].loc==state){
          caseConformed = data.data.regional[i].confirmedCasesIndian;
          casesDeath = data.data.regional[i].deaths;
          casesDischarge = data.data.regional[i].totalConfirmed;
        }
      }

      var activeCases = caseConformed - casesDeath - casesDischarge;
      console.log(activeCases);
      cases = parseInt(activeCases);
      if (cases <= 2000) {
          document.getElementById("p1").innerHTML = "You Are In Safe Zone";
          document.getElementById("p1").style.backgroundColor = "#7cffcb";
          document.getElementById("p1").style.backgroundImage = "linear-gradient(315deg, #7cffcb 0%, #74f2ce 74%)";
          document.getElementById("p1").style.color = "#000";
      } else if (cases <= 6000 && cases > 2000) {
          document.getElementById("p1").innerHTML = "You Are In Slightly Affected Zone";
          document.getElementById("p1").style.backgroundColor = "#f2cf07";
          document.getElementById("p1").style.backgroundImage = "linear-gradient(315deg, #f2cf07 0%, #55d284 74%)";

      } else if (cases <= 12000 && cases > 6000) {
          document.getElementById("p1").innerHTML = "You Are In Moderately Affected Zone";
          document.getElementById("p1").style.backgroundColor = "#f9484a";
          document.getElementById("p1").style.backgroundImage = "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)";
      } else {
          document.getElementById("p1").innerHTML = "You Are In Danger Zone";
          document.getElementById("p1").style.backgroundColor = "#6b0f1a";
          document.getElementById("p1").style.backgroundImage = "linear-gradient(315deg, #6b0f1a 0%, #b91372 74%);";
      }
  }

  getLoc();
}