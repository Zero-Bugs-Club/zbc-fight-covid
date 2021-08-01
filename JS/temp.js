function callVaccineAPI(){
    document.getElementById("vaccine_info").innerHTML= '<tr class="text-align-center"><th>Name</th><th>Address</th><th>District Name</th><th>Fee Type</th><th>Age</th><th>Vaccine Type</th><th>Dose 1 Slots</th><th>Dose 2 Slots</th></tr>';
    var pincode=document.getElementById("pincode").value;
    var date=new Date(document.getElementById("date").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    var year=date.getFullYear();
    var updatedDate=day+"-"+month+"-"+year;


    fetch(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pincode+"&date="+updatedDate
    )

    .then(response => {
        response.json().then(
        data=> {

            DATA = JSON.stringify(data);
            // console.log(DATA);
            DATA = JSON.parse(DATA);



            for(var i=0; i < DATA.centers.length; i++){
                var name = DATA.centers[i].name;
                var address = DATA.centers[i].address;
                var district_name = DATA.centers[i].district_name;
                var fee_type = DATA.centers[i].fee_type;
                var age = DATA.centers[0].sessions[0].min_age_limit;
                var vaccine_type = DATA.centers[0].sessions[0].vaccine;
                var dose_1 = DATA.centers[0].sessions[0].available_capacity_dose1;
                var dose_2 = DATA.centers[0].sessions[0].available_capacity_dose2;


                var format='<tr class="text-align-center tablerow"><td>'+name+'</td><td>'+address+'</td><td>'+district_name+'</td><td>'+fee_type+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'

                document.getElementById("vaccine_info").innerHTML+= format;
                
            }
        }
        )
    })
}

function callVaccineAPIbyDistrict(){

    document.getElementById("vaccine_info").innerHTML= '<tr class="text-align-center"><th>Name</th><th>Address</th><th>District Name</th><th>Fee Type</th><th>Age</th><th>Vaccine Type</th><th>Dose 1 Slots</th><th>Dose 2 Slots</th></tr>';
    var pincode=document.getElementById("pincode").value;
    var date=new Date(document.getElementById("date").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    var year=date.getFullYear();
    var updatedDate=day+"-"+month+"-"+year;


    fetch(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=512&date=31-03-2021"
    )

    .then(response => {
        response.json().then(
        data=> {

            DATA = JSON.stringify(data);
            // console.log(DATA);
            DATA = JSON.parse(DATA);



            for(var i=0; i < DATA.centers.length; i++){
                var name = DATA.centers[i].name;
                var address = DATA.centers[i].address;
                var district_name = DATA.centers[i].district_name;
                var fee_type = DATA.centers[i].fee_type;
                var age = DATA.centers[0].sessions[0].min_age_limit;
                var vaccine_type = DATA.centers[0].sessions[0].vaccine;
                var dose_1 = DATA.centers[0].sessions[0].available_capacity_dose1;
                var dose_2 = DATA.centers[0].sessions[0].available_capacity_dose2;


                var format='<tr class="text-align-center tablerow"><td>'+name+'</td><td>'+address+'</td><td>'+district_name+'</td><td>'+fee_type+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'

                document.getElementById("vaccine_info").innerHTML+= format;
                
            }
        }
        )
    })
}
