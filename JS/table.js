//getting users state district id
function gettingDistrictId(districtName){
    
    var districtCode;
    district_list.forEach((district)=>{
        if(district.name==districtName){
            districtCode = district.code;
        }
    })
    return districtCode;
}

function setData(DATA){


    for(var i=0; i < DATA.centers.length; i++){

        var name = DATA.centers[i].name;
        var address = DATA.centers[i].address;
        var district_name = DATA.centers[i].district_name;
        var fee_type = DATA.centers[i].fee_type;
        var age = DATA.centers[i].sessions[0].min_age_limit;
        var vaccine_type = DATA.centers[i].sessions[0].vaccine;
        var dose_1 = DATA.centers[i].sessions[0].available_capacity_dose1;
        var dose_2 = DATA.centers[i].sessions[0].available_capacity_dose2;
        var j=0;

        sortVaccine = vaccine_type;

        if(vaccine_type==sortVaccine){

            if (fee_type==="Paid"){
                        
                for(var k=0; k<DATA.centers[i].vaccine_fees.length; k++){
                        
                    if(vaccine_type==DATA.centers[i].vaccine_fees[k].vaccine){
                        var fee=DATA.centers[i].vaccine_fees[k].fee;
                    }
                }

                var format='<tr class="text-align-center tablerow"><td>'+name+'</td><td><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+address+'   <i class="fas fa-map-marker-alt"></i></a></td><td>'+district_name+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+fee+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'
                document.getElementById("vaccine_info").innerHTML+= format;

                
            }else{
                var format='<tr class="text-align-center tablerow"><td>'+name+'</td><td><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+address+'   <i class="fas fa-map-marker-alt"></i></a></td><td>'+district_name+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+fee_type+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'
                document.getElementById("vaccine_info").innerHTML+= format;

            }


            
            if(DATA.centers[i].sessions.length>1){
                for (var j=1;j<DATA.centers[i].sessions.length; j++){
                    var age = DATA.centers[i].sessions[j].min_age_limit;
                    var vaccine_type = DATA.centers[i].sessions[j].vaccine;
                    var dose_1 = DATA.centers[i].sessions[j].available_capacity_dose1;
                    var dose_2 = DATA.centers[i].sessions[j].available_capacity_dose2;

                    if(vaccine_type==sortVaccine){

                        if (fee_type==="Paid"){
                            
                            for(var k=0; k<DATA.centers[i].vaccine_fees.length; k++){
                                    
                                if(vaccine_type==DATA.centers[i].vaccine_fees[k].vaccine){
                                    var fee=DATA.centers[i].vaccine_fees[k].fee;
                                }
                            }

                            format='<tr class="text-align-center tablerow"><td>'+""+'</td><td><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+""+'</a></td><td>'+""+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+fee+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'
                            
                            document.getElementById("vaccine_info").innerHTML+= format;

                            
                        }else{
                            format='<tr class="text-align-center tablerow"><td>'+""+'</td><td><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+""+'</a></td><td>'+""+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+fee_type+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'
                                
                            document.getElementById("vaccine_info").innerHTML+= format;

                        }
                    }

                }
            }
        }
    
    }
}

function callVaccineAPI(){

    document.getElementById("vaccine_info").innerHTML= '<tr class="text-align-center"><th>Name</th><th>Address</th><th>District Name</th><th>Age</th><th>Vaccine Type</th><th>Fee</th><th>Dose 1 Slots</th><th>Dose 2 Slots</th></tr>';
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
            setData(DATA);
        }
        )
    })
}

function callVaccineAPIbyDistrict(){

    document.getElementById("vaccine_info").innerHTML= '<tr class="text-align-center"><th>Name</th><th>Address</th><th>District Name</th><th>Age</th><th>Vaccine Type</th><th>Fee</th><th>Dose 1 Slots</th><th>Dose 2 Slots</th></tr>';

    var districtName = document.getElementById("districtInput").value;    
    var districtCode = gettingDistrictId(districtName);
    var date=new Date(document.getElementById("date2").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    var year=date.getFullYear();
    var updatedDate=day+"-"+month+"-"+year;

    
    
    fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+districtCode+"&date="+updatedDate+"")
    .then(response => {
        response.json().then(
        data=> {
            console.log("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+districtCode+"&date="+updatedDate+"");
            DATA = JSON.stringify(data);
            // console.log(DATA);
            DATA = JSON.parse(DATA);
            setData(DATA);
        })
    })
}




document.getElementById("defaultOpen").click();
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  


function makeSubmenu(value) {
    if (value.length == 0) document.getElementById("districtInput").innerHTML = "<option></option>";
    else {
        var citiesOptions = "";
        for (categoryId in stateObject[value]) {
            citiesOptions += "<option>" + stateObject[value][categoryId] + "</option>";
        }
        document.getElementById("districtInput").innerHTML = citiesOptions;
    }
}

function displaySelected() {
    var country = document.getElementById("category").value;
    var city = document.getElementById("districtInput").value;
    alert(country + "\n" + city);
}

function resetSelection() {
    document.getElementById("category").selectedIndex = 0;
    document.getElementById("districtInput").selectedIndex = 0;
}

function showSpoutnik(){

    var districtName = document.getElementById("districtInput").value;
    document.getElementById("vaccine_info").innerHTML= '<tr class="text-align-center"><th>Name</th><th>Address</th><th>District Name</th><th>Age</th><th>Vaccine Type</th><th>Fee</th><th>Dose 1 Slots</th><th>Dose 2 Slots</th></tr>';
    var districtCode = gettingDistrictId(districtName);
    var date=new Date(document.getElementById("date2").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    var year=date.getFullYear();
    var updatedDate=day+"-"+month+"-"+year;
    
    
    fetch(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+districtCode+"&date="+updatedDate+""
    )
    .then(response => {
        response.json().then(
        data=> {
            console.log("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+districtCode+"&date="+updatedDate+"");
            DATA = JSON.stringify(data);
            console.log(DATA);
            DATA = JSON.parse(DATA);



            for(var i=0; i < DATA.centers.length; i++){
                var name = DATA.centers[i].name;
                var address = DATA.centers[i].address;
                var district_name = DATA.centers[i].district_name;
                var fee_type = DATA.centers[i].fee_type;
				// var format='<tr class="text-align-center"><td>'+name+'</td><td><a href="http://maps.google.com/?q='+name+'" target="_blank">'+address+'</a></td><td>'+district_name+'</td><td>'+fee_type;
                // document.getElementById("vaccine_info").innerHTML+= format;
				var j=0;
				
                var age = DATA.centers[i].sessions[0].min_age_limit;
                var vaccine_type = DATA.centers[i].sessions[0].vaccine;
                var dose_1 = DATA.centers[i].sessions[0].available_capacity_dose1;
                var dose_2 = DATA.centers[i].sessions[0].available_capacity_dose2;

                sortVaccine="SPUTNIK V";

                if(vaccine_type=="SPUTNIK V"){

                    if (fee_type==="Paid"){
                                
                        for(var k=0; k<DATA.centers[i].vaccine_fees.length; k++){
                                
                            if(vaccine_type==DATA.centers[i].vaccine_fees[k].vaccine){
                                var fee=DATA.centers[i].vaccine_fees[k].fee;
                            }
                        }
    
                        var format='<tr class="text-align-center tablerow"><td>'+name+'</td><td><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+address+'   <i class="fas fa-map-marker-alt"></i></a></td><td>'+district_name+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+fee+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'
                        document.getElementById("vaccine_info").innerHTML+= format;
    
                        
                    }else{
                        var format='<tr class="text-align-center tablerow"><td>'+name+'</td><td><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+address+'   <i class="fas fa-map-marker-alt"></i></a></td><td>'+district_name+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+fee_type+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'
                        document.getElementById("vaccine_info").innerHTML+= format;
    
                    }
    
    
                    
                    if(DATA.centers[i].sessions.length>1){
                        for (var j=1;j<DATA.centers[i].sessions.length; j++){
                            var age = DATA.centers[i].sessions[j].min_age_limit;
                            var vaccine_type = DATA.centers[i].sessions[j].vaccine;
                            var dose_1 = DATA.centers[i].sessions[j].available_capacity_dose1;
                            var dose_2 = DATA.centers[i].sessions[j].available_capacity_dose2;

                            if(vaccine_type=="SPUTNIK V"){

                                if (fee_type==="Paid"){
                                    
                                    for(var k=0; k<DATA.centers[i].vaccine_fees.length; k++){
                                            
                                        if(vaccine_type==DATA.centers[i].vaccine_fees[k].vaccine){
                                            var fee=DATA.centers[i].vaccine_fees[k].fee;
                                        }
                                    }
        
                                    format='<tr class="text-align-center tablerow"><td>'+""+'</td><td><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+""+'</a></td><td>'+""+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+fee+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'
                                    
                                    document.getElementById("vaccine_info").innerHTML+= format;
        
                                    
                                }else{
                                    format='<tr class="text-align-center tablerow"><td>'+""+'</td><td><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+""+'</a></td><td>'+""+'</td><td>'+age+'</td><td>'+vaccine_type+'</td><td>'+fee_type+'</td><td>'+dose_1+'</td><td>'+dose_2+'</td></tr>'
                                        
                                    document.getElementById("vaccine_info").innerHTML+= format;
        
                                }
                            }
    
                        }
                    }
                }
            }
        }
        )
    })
}

