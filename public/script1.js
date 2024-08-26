
fetchcaller();
function fetchcaller(){
fetch('http://localhost:8080/itineraries').then(response=>response.json()).then((data)=>{
        display(data);
    }
    ).catch(err=>console.log(err));
}

   async function accept(idd){
                await fetch(`http://localhost:8080/itineraries/${idd}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        acceptedby:JSON.parse(sessionStorage.getItem('userobj')).username,
                        request:"accepted"
                    })
                })
                .then(response => response.json())
                .catch((err) => {console.log(err)});
             fetchcaller();
                alert("Item updated");
    }
    async function deny(idd){
                    await fetch(`http://localhost:8080/itineraries/${idd}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            acceptedby:JSON.parse(sessionStorage.getItem('userobj')).username,
                            request:"denied"
                        })
                    })
                    .then(response => response.json())
                    .catch((err) => {console.log(err)});
                 fetchcaller();
                    alert("Item updated");
        }
    

function display(data){
    let xp=document.getElementById('pending');
    let xy=document.getElementById('accepted');
    let xyz=document.getElementById('denied');
    let xc=0,xyc=0,xyzc=0;
    xp.innerHTML="";
   xy.innerHTML="";
   xyz.innerHTML="";
    let y
    console.log(data);
   for (let ind of data){
    console.log(ind)
    //name,description,price,category,quantity,brand,weight,color
    console.log("from display function"+""+ind.start_date+"  "+ind.end_date)
    let str=new Date(ind.start_date);
    let str2=new Date(ind.end_date);
    // console.log(str+" "+str2);
  
    let str1=`${str.getFullYear()}-${("0" + (str.getMonth() + 1)).slice(-2)}-${("0" + str.getDate()).slice(-2)}`;
        // console.log(str1);
        let st2=`${str2.getFullYear()}-${("0" + (str2.getMonth() + 1)).slice(-2)}-${("0" + str2.getDate()).slice(-2)}`;
        
      
        if(ind.request=="pending"){
            xc++;
            let res=`<div class="content">
             <p><span class="labell">Request sent BY(Email) :</span> ${ind.email}</p><br>
            <p><span class="labell">Request sent By (username):</span> ${ind.username}</p><br>
            
            
    <p class="nameofouter"><span class="labell">Title :</span> ${ind.title}</p>
    <br>
    <p class="descriptionofouter"><span class="labell">Destination :</span> ${ind.destination}</p>
            <br>
            <p class="priceofouter"><span class="labell">Start Date :</span> ${str1}</p>
            <br>
            <p class="categoryofouter"><span class="labell">End Date :</span> ${st2}</p>
            <br>                        
            <p class="quantityofouter"><span class="labell">Description :</span> ${ind.description} </p>
            <br>
            <p class="brandofouter"><span class="labell">Budget :</span> ${ind.budget} Rs</p>
            <br>
            <p class="weightofouter"><span class="labell">Traveler Name :</span> ${ind.traveler_name} </p>
            <br>
            <p class="colorofouter"><span class="labell">Traveler Contact :</span> ${ind.traveler_contact}</p>
            <br>
            <p class="colorofouter"><span class="labell">Total Cost :</span> ${ind.total_cost} Rs</p>
            
            <div class="buttons">
            <button class="upta" onclick="accept(${ind.id})" >ACCEPT</button>
            <button class="delta" onclick="deny(${ind.id})" >DENY</button>
            <br>
        </div>`
    
            if(xc==1)
            xp.innerHTML+='<h2>PENDING REQUESTS ARE:</h2>'
           xp.innerHTML+=res; 
        }
         if(ind.request=='accepted'){
            xyc++;
            let res=`<div class="content">
            <p><span class="labell">Request sent BY(Email) :</span> ${ind.email}</p><br>
            <p><span class="labell">Request sent By (username):</span> ${ind.username}</p><br>
            <p><span class="labell">Request Replied By: </span>${ind.acceptedby}</p><br>
            
    <p class="nameofouter"><span class="labell">Title :</span> ${ind.title}</p>
    <br>
    <p class="descriptionofouter"><span class="labell">Destination :</span> ${ind.destination}</p>
            <br>
            <p class="priceofouter"><span class="labell">Start Date :</span> ${str1}</p>
            <br>
            <p class="categoryofouter"><span class="labell">End Date :</span> ${st2}</p>
            <br>                        
            <p class="quantityofouter"><span class="labell">Description :</span> ${ind.description} </p>
            <br>
            <p class="brandofouter"><span class="labell">Budget :</span> ${ind.budget} Rs</p>
            <br>
            <p class="weightofouter"><span class="labell">Traveler Name :</span> ${ind.traveler_name} </p>
            <br>
            <p class="colorofouter"><span class="labell">Traveler Contact :</span> ${ind.traveler_contact}</p>
            <br>
            <p class="colorofouter"><span class="labell">Total Cost :</span> ${ind.total_cost} Rs</p>
            
          `
    
            if(xyc==1)
                xy.innerHTML+='<h2> REQUESTS ACCEPTED  ARE:</h2>'
            xy.innerHTML+=res;
        }
        else if(ind.request=='denied'){
            xyzc++;
            let res=`<div class="content">
            <p><span class="labell">Request sent BY(Email) :</span> ${ind.email}</p><br>
            <p><span class="labell">Request sent By (username):</span> ${ind.username}</p><br>
                        <p><span class="labell">Request Replied By: </span>${ind.acceptedby}</p><br>

    <p class="nameofouter"><span class="labell">Title :</span> ${ind.title}</p>
    <br>
    <p class="descriptionofouter"><span class="labell">Destination :</span> ${ind.destination}</p>
            <br>
            <p class="priceofouter"><span class="labell">Start Date :</span> ${str1}</p>
            <br>
            <p class="categoryofouter"><span class="labell">End Date :</span> ${st2}</p>
            <br>                        
            <p class="quantityofouter"><span class="labell">Description :</span> ${ind.description} </p>
            <br>
            <p class="brandofouter"><span class="labell">Budget :</span> ${ind.budget} Rs</p>
            <br>
            <p class="weightofouter"><span class="labell">Traveler Name :</span> ${ind.traveler_name} </p>
            <br>
            <p class="colorofouter"><span class="labell">Traveler Contact :</span> ${ind.traveler_contact}</p>
            <br>
            <p class="colorofouter"><span class="labell">Total Cost :</span> ${ind.total_cost} Rs</p>
          `
            if(xyzc==1)
                xyz.innerHTML+='<h2>DENIED REQUESTS ARE:</h2>'
    
        xyz.innerHTML+=res;
        }
   }
   if(xc==0){
    xp.innerHTML=`<h2 class="pending">PENDING REQUESTS  0</h2>`
   }
    if(xyc==0){
    xy.innerHTML=`<h2 class="accepted">ACCEPTED REQUESTS 0</h2>`
   }
    if(xyzc==0){
    
    xyz.innerHTML=`<h2 class="denied">DENIED REQUESTS  0</h2>`
   
   }
   
}




     