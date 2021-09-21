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

function setData(DATA, updatedDate, sortVaccine){

    // document.getElementById("vaccine_info").innerHTML='<div id="vaccine_info"></div>';
    for(var i=0; i < DATA.centers.length; i++){

        var name = DATA.centers[i].name;
        var address = DATA.centers[i].address;
        var district_name = DATA.centers[i].district_name;
        var fee_type = DATA.centers[i].fee_type;
        var age = DATA.centers[i].sessions[0].min_age_limit;
        var dose_1 = DATA.centers[i].sessions[0].available_capacity_dose1;
        var dose_2 = DATA.centers[i].sessions[0].available_capacity_dose2;
        var j=0;

        console.log(sortVaccine);
        
        if(!sortVaccine){
            if(DATA.centers[i].sessions.length>=1){

                var name = DATA.centers[i].name;
                var address = DATA.centers[i].address;
                var district_name = DATA.centers[i].district_name;
                var fee_type = DATA.centers[i].fee_type;

                for (var j=0;j<DATA.centers[i].sessions.length; j++){

                    console.log(updatedDate);

                    if(DATA.centers[i].sessions[j].date==updatedDate){
                        
                    

                        var age = DATA.centers[i].sessions[j].min_age_limit;
                        var vaccine_type = DATA.centers[i].sessions[j].vaccine;
                        var dose_1 = DATA.centers[i].sessions[j].available_capacity_dose1;
                        var dose_2 = DATA.centers[i].sessions[j].available_capacity_dose2;

                        

                        if (fee_type==="Paid"){
                            
                            for(var k=0; k<DATA.centers[i].vaccine_fees.length; k++){
                                    
                                if(vaccine_type==DATA.centers[i].vaccine_fees[k].vaccine){
                                    var fee=DATA.centers[i].vaccine_fees[k].fee;
                                }
                            }

                            
                            var format = '<div class="card container"><div class="card__content"><p><div class="vaccine_name" style="color: #112a46;opacity:1;"><div>'+vaccine_type+'</div><div><span class="fee">'+fee_type+'</span></div></div><br><strong><span class="heading"><strong>'+name+'</span></strong></strong><br><br><span class="district"><strong>'+district_name+'</strong></span><br><span class="address"><em><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+address+'   <i class="fas fa-map-marker-alt"></i></a></em></span><br><br><strong><span class="age">'+age+'</span></strong><br><em>₹'+fee+'</em><br>D1 '+dose_1+'<br>D2 '+dose_2+'<br></p></div></div>'
                            document.getElementById("vaccine_info").innerHTML+= format;

                            
                        }else{

                            var format = '<div class="card container"><div class="card__content"><p><div class="vaccine_name" style="color: #112a46;opacity:1;"><div>'+vaccine_type+'</div><div><span class="fee">'+fee_type+'</span></div></div><br><strong><span class="heading"><strong>'+name+'</span></strong></strong><br><br><span class="district"><strong>'+district_name+'</strong></span><br><span class="address"><em><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+address+'   <i class="fas fa-map-marker-alt"></i></a></em></span><br><br><strong><span class="age">'+age+'</span></strong><br><em>FREE</em><br>D1 '+dose_1+'<br>D2 '+dose_2+'<br></p></div></div>'
                            document.getElementById("vaccine_info").innerHTML+= format;
                            
                        }
                        

                    }

                }
            }
        }
        else{
            if(DATA.centers[i].sessions.length>=1){
    
                var name = DATA.centers[i].name;
                var address = DATA.centers[i].address;
                var district_name = DATA.centers[i].district_name;
                var fee_type = DATA.centers[i].fee_type;
    
                for (var j=0;j<DATA.centers[i].sessions.length; j++){
    
                    console.log(updatedDate);
    
                    if(DATA.centers[i].sessions[j].date==updatedDate){
                        
                    
    
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
    
                                
                                var format = '<div class="card container"><div class="card__content"><p><div class="vaccine_name" style="color: #112a46;opacity:1;"><div>'+vaccine_type+'</div><div><span class="fee">'+fee_type+'</span></div></div><br><strong><span class="heading"><strong>'+name+'</span></strong></strong><br><br><span class="district"><strong>'+district_name+'</strong></span><br><span class="address"><em><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+address+'   <i class="fas fa-map-marker-alt"></i></a></em></span><br><br><strong><span class="age">'+age+'</span></strong><br><em>₹'+fee+'</em><br>D1 '+dose_1+'<br>D2 '+dose_2+'<br></p></div></div>'
                                document.getElementById("vaccine_info").innerHTML+= format;
    
                                
                            }else{
    
                                var format = '<div class="card container"><div class="card__content"><p><div class="vaccine_name" style="color: #112a46;opacity:1;"><div>'+vaccine_type+'</div><div><span class="fee">'+fee_type+'</span></div></div><br><strong><span class="heading"><strong>'+name+'</span></strong></strong><br><br><span class="district"><strong>'+district_name+'</strong></span><br><span class="address"><em><a href="http://maps.google.com/?q='+name+' , '+district_name+'" target="_blank">'+address+'   <i class="fas fa-map-marker-alt"></i></a></em></span><br><br><strong><span class="age">'+age+'</span></strong><br><em>FREE</em><br>D1 '+dose_1+'<br>D2 '+dose_2+'<br></p></div></div>'
                                document.getElementById("vaccine_info").innerHTML+= format;
                                
                            }
                        }
    
                    }
    
                }
            }
        }

        

            
        
    
    }
}

function callVaccineAPI(){

    
    document.getElementById("cards").innerHTML='<div id="vaccine_info"></div>';

    var pincode=document.getElementById("pincode").value;
    var date=new Date(document.getElementById("date").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    var year=date.getFullYear();
    if (day<='9' && day>'0')
    {
        day='0'+day;
    }
    if (month<='9' && month>'0')
    {
        month='0'+month;
    }
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
            setData(DATA, updatedDate);
        }
        )
    })
}

function callVaccineAPIbyDistrict(){

    document.getElementById("cards").innerHTML='<div id="vaccine_info"></div>'; 

    var districtName = document.getElementById("districtInput").value;    
    var districtCode = gettingDistrictId(districtName);
    var date=new Date(document.getElementById("date2").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    if (day<='9' && day>'0')
    {
        day='0'+day;
    }
    if (month<='9' && month>'0')
    {
        month='0'+month;
    }
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
            setData(DATA, updatedDate);
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

function showSpoutnikbyDistrict(){

    document.getElementById("cards").innerHTML='<div id="vaccine_info"></div>';


    var districtName = document.getElementById("districtInput").value;
    var districtCode = gettingDistrictId(districtName);
    var date=new Date(document.getElementById("date2").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    if (day<='9' && day>'0')
    {
        day='0'+day;
    }
    if (month<='9' && month>'0')
    {
        month='0'+month;
    }
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
            var sortVaccine = "SPUTNIK V";
            setData(DATA, updatedDate, sortVaccine);
        }
        )
    })
}

function showCovishieldbyDistrict(){

    document.getElementById("cards").innerHTML='<div id="vaccine_info"></div>';


    var districtName = document.getElementById("districtInput").value;
    var districtCode = gettingDistrictId(districtName);
    var date=new Date(document.getElementById("date2").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    if (day<='9' && day>'0')
    {
        day='0'+day;
    }
    if (month<='9' && month>'0')
    {
        month='0'+month;
    }
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
            var sortVaccine = "COVISHIELD";
            setData(DATA, updatedDate, sortVaccine);
        }
        )
    })
}

function showCovaxinbyDistrict(){

    document.getElementById("cards").innerHTML='<div id="vaccine_info"></div>';


    var districtName = document.getElementById("districtInput").value;
    var districtCode = gettingDistrictId(districtName);
    var date=new Date(document.getElementById("date2").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    if (day<='9' && day>'0')
    {
        day='0'+day;
    }
    if (month<='9' && month>'0')
    {
        month='0'+month;
    }
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
            var sortVaccine = "COVIAXIN";
            setData(DATA, updatedDate, sortVaccine);
        }
        )
    })
}

function showSpoutnik(){

    document.getElementById("cards").innerHTML='<div id="vaccine_info"></div>';

    var pincode=document.getElementById("pincode").value;
    var date=new Date(document.getElementById("date").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    var year=date.getFullYear();
    if (day<='9' && day>'0')
    {
        day='0'+day;
    }
    if (month<='9' && month>'0')
    {
        month='0'+month;
    }
    var updatedDate=day+"-"+month+"-"+year;
    
    
    fetch(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pincode+"&date="+updatedDate
    )
    .then(response => {
        response.json().then(
        data=> {
            DATA = JSON.stringify(data);
            console.log(DATA);
            DATA = JSON.parse(DATA);
            var sortVaccine = "SPUTNIK V";
            setData(DATA, updatedDate, sortVaccine);
        }
        )
    })
}

function showCovishield(){

    document.getElementById("cards").innerHTML='<div id="vaccine_info"></div>';

    var pincode=document.getElementById("pincode").value;
    var date=new Date(document.getElementById("date").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    var year=date.getFullYear();
    if (day<='9' && day>'0')
    {
        day='0'+day;
    }
    if (month<='9' && month>'0')
    {
        month='0'+month;
    }
    var updatedDate=day+"-"+month+"-"+year;
    
    
    fetch(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pincode+"&date="+updatedDate
    )
    .then(response => {
        response.json().then(
        data=> {
            DATA = JSON.stringify(data);
            console.log(DATA);
            DATA = JSON.parse(DATA);
            var sortVaccine = "COVISHIELD";
            setData(DATA, updatedDate, sortVaccine);
        }
        )
    })
}

function showCovaxin(){

    document.getElementById("cards").innerHTML='<div id="vaccine_info"></div>';

    var pincode=document.getElementById("pincode").value;
    var date=new Date(document.getElementById("date").value);
    var day=date.getDate();
    var month=date.getMonth();
    month++;
    var year=date.getFullYear();
    if (day<='9' && day>'0')
    {
        day='0'+day;
    }
    if (month<='9' && month>'0')
    {
        month='0'+month;
    }
    var updatedDate=day+"-"+month+"-"+year;
    
    
    fetch(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+pincode+"&date="+updatedDate
    )
    .then(response => {
        response.json().then(
        data=> {
            DATA = JSON.stringify(data);
            console.log(DATA);
            DATA = JSON.parse(DATA);
            var sortVaccine = "COVAXIN";
            setData(DATA, updatedDate, sortVaccine);
        }
        )
    })
}

