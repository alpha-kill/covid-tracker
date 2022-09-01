
fetch("https://api.covid19api.com/summary")
.then(response => response.json())
.then(data => {
    
    var totcase=document.getElementById("totcase");
    var newcase=document.getElementById("newcase");
    var totrecovered=document.getElementById("totrecovered");
    var totdeath=document.getElementById("totdeath");
    
    totcase.innerHTML=data.Global.TotalConfirmed;
    newcase.innerHTML=data.Global.NewConfirmed;
    totrecovered.innerHTML=data.Global.TotalRecovered;
    totdeath.innerHTML=data.Global.TotalDeaths;
    
    var tval=document.getElementById("datas");
    html="";
      data.Countries.forEach(countr=>{
         html+=`<tr>
         <td >${countr.Country}</td>
         <td>${countr.TotalConfirmed}</td>
          <td>${countr.NewConfirmed}</td>
          <td>${countr.TotalRecovered}</td>
          <td>${countr.TotalDeaths}</td>
          </tr>`;
    });
    tval.innerHTML=html;
}).catch((err)=>{console.log(err)});

$(document).ready(function(){
    $("#search-input").on("click",function(){
        $("#model-box").modal("hide");
        var cntry=$("#forminput").val();
        cntry=cntry.toLowerCase();
        var cntryname=document.getElementById("cntry-name");
        var cntryflag=document.getElementById("flag");
        

        if(cntry===""){
            alert("Please Enter a Country Name.");
            return;
        }
        
        fetch("https://api.covid19api.com/summary")
       .then(response => response.json())
       .then(cdata => {  
              var f=true;
              cdata.Countries.forEach(ccountr=>{
                  str=(ccountr.Country).toLowerCase();
                if(str===cntry){
                     $("#ctotcase").html(`${ccountr.TotalConfirmed}`);   
                     $("#cnewcase").html(`${ccountr.NewConfirmed}`);   
                     $("#ctotrecovered").html(`${ccountr.TotalRecovered}`);   
                     $("#ctotdeath").html(`${ccountr.TotalDeaths}`);   
                     f=false;
                     $("#model-box").modal("show");
                }
              })
              if(f){
                  alert("Enter a Valid Country Name.");
              }
         }).catch((err)=>{console.log("error hain bhai!")});

         fetch("https://gist.githubusercontent.com/kcak11/4a2f22fb8422342b3b3daa7a1965f4e4/raw/95677f414c98b0289b75436c1e10d9c1755c62f0/countries.json")
         .then(response => response.json())
         .then(dataa=> {
               dataa.forEach(ele=>{
                   str1=(ele.name).toLowerCase();
                   if(str1===cntry){
                       cntryflag.innerHTML=`<img src="${ele.flag}" alt="${ele.isoCode}" >`;
                   }
               })
               cntryname.innerHTML=cntry.toUpperCase();
         }).catch((err)=>{alert(err)});
    
    })
})


