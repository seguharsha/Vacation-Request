let formfinder=document.getElementById('form');
formfinder.style.display="none";
alert(`welcome USER ${JSON.parse(sessionStorage.getItem('userobj')).username}`);
fetchcaller();
function fetchcaller(){
fetch('http://localhost:8080/itineraries').then(response=>response.json()).then((data)=>{
        display(data);
    }
    ).catch(err=>console.log(err));
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
        
      
        if(ind.request=="pending"&& ind.email==JSON.parse(sessionStorage.getItem('userobj')).email){
            xc++;
            let res=`<div class="content">
            
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
            <button class="upta" onclick="update(${ind.id})" >UPDATE</button>
            <button class="delta" onclick="deletee(${ind.id})" >DELETE</button>
            <br>
        </div>`
    
            if(xc==1)
            xp.innerHTML+='<h2>PENDING REQUESTS ARE:</h2>'
           xp.innerHTML+=res; 
        }
         if(ind.request=='accepted' && ind.email==JSON.parse(sessionStorage.getItem('userobj')).email){
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
        else if(ind.request=='denied' && ind.email==JSON.parse(sessionStorage.getItem('userobj')).email){
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

async function update(idd){
    alert("Go to top of the page and update the fields and click submit to update")
    formfinder.style.display="block";
    let op={};
 await   fetch('http://localhost:8080/itineraries').then(response=>response.json()).then((data)=>{
        op=data;
    }).catch(err=>console.log(err));
    
    console.log(op);
    console.log(idd);

    for(let arr in op){
        console.log(op[arr]["id"]+"asdasas")
        if(op[arr]["id"]==idd){
            let str=new Date(op[arr]["start_date"]);
            let str2=new Date(op[arr]["end_date"]);
            let str1=`${str.getFullYear()}-${("0" + (str.getMonth() + 1)).slice(-2)}-${("0" + str.getDate()).slice(-2)}`;
            // console.log(str1);
            let st2=`${str2.getFullYear()}-${("0" + (str2.getMonth() + 1)).slice(-2)}-${("0" + str2.getDate()).slice(-2)}`;
            console.log(arr+""+idd)
            console.log(op[arr]["start_date"])
                    f=1;
                    document.getElementById('title').value=op[arr]["title"]
                    document.getElementById('destination').value=op[arr]["destination"]
                    document.getElementById('startdate').value=str1
                    document.getElementById('Enddate').value=st2
                    document.getElementById('description').value=op[arr]["description"]
                    document.getElementById('budget').value=op[arr]["budget"]
                    document.getElementById('travelername').value=op[arr]["traveler_name"]
                    document.getElementById('travelercontact').value=op[arr]["traveler_contact"]
                    document.getElementById('totalcost').value=op[arr]["total_cost"]                 
                    break;
                }
            }    
            let s = document.getElementById('submit');
           
     s.replaceWith(s.cloneNode(true));
              s = document.getElementById('submit');
        
            s.addEventListener('click', async () => {    
  
                if((document.getElementById('title').value).length===0){
                    alert("Title should not be empty")
                    return
            }
            if((document.getElementById('destination').value).length==0){
                alert("Destination should not be empty")
                return
    
        }
        if((document.getElementById('description').value).length==0){
            alert("Description should not be empty")
            return
    }
    if((document.getElementById('travelername').value).length==0){
        alert("TraverlerName should not be empty")
        return
    }
    if((document.getElementById('startdate').value)==""){
        alert("Start Date should not be empty")
        return
    }
    console.log((document.getElementById('startdate').value));
    if((document.getElementById('Enddate').value)==""){
        alert("End date should not be empty")
        return
    }
    
    let x=document.getElementById('budget').value;
    x=String(x)
    let xy=String(document.getElementById('totalcost').value);
        if(parseInt(document.getElementById('budget').value)<=0||x.length==0){
            alert("the budget should greater than 0");
            return;
        }
        if(parseInt(document.getElementById('totalcost').value)<=0||xy.length==0){
            alert("the totalcost should greater than 0");
                    return;
        }
    
        let y=document.getElementById('travelercontact').value;
        if(y.length!=10||((/[^0-9$]/).test(y))){
            alert("Contact should contain 10 digits and only contain numbers")
            return
        }
          

             else{
                await fetch(`http://localhost:8080/itineraries/${idd}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                     title:   document.getElementById('title').value,
                     destination:    document.getElementById('destination').value,
                     start_date:  document.getElementById('startdate').value,
                     end_date: document.getElementById('Enddate').value,
                     description:    document.getElementById('description').value,
                     budget:   document.getElementById('budget').value,
                     traveler_name:     document.getElementById('travelername').value,
                     traveler_contact:   document.getElementById('travelercontact').value,
                     total_cost:    document.getElementById('totalcost').value
                    })
                })
                .then(response => response.json())
            
                .catch(err => console.log(err));
        
            document.getElementById('title').value=""
        document.getElementById('destination').value=""
       document.getElementById('startdate').value=""
      document.getElementById('Enddate').value=""
         document.getElementById('description').value=""
        document.getElementById('budget').value=""
          document.getElementById('travelername').value=""
        document.getElementById('travelercontact').value=""
         document.getElementById('totalcost').value=""
                formfinder.style.display = "none";
                fetchcaller();
                alert("Item updated");
            }
            });
            
        }

function deletee(idd){
    fetch(`http://localhost:8080/itineraries/${idd}`,{method:"DELETE"}).then(response=>response.json).catch(err=>console.log(err));
        fetchcaller();
    }


     function createItem(){
        formfinder.style.display="block";
        document.getElementById('title').value=""
        document.getElementById('destination').value=""
       document.getElementById('startdate').value=""
      document.getElementById('Enddate').value=""
         document.getElementById('description').value=""
        document.getElementById('budget').value=""
          document.getElementById('travelername').value=""
        document.getElementById('travelercontact').value=""
         document.getElementById('totalcost').value=""
     
        let x=document.getElementById('submit');

        x.replaceWith(x.cloneNode(true))
        x=document.getElementById('submit');

        x.addEventListener('click',()=>{
        
            if((document.getElementById('title').value).length===0){
                alert("Title should not be empty")
                return
        }
        if((document.getElementById('destination').value).length==0){
            alert("Destination should not be empty")
            return

    }
    if((document.getElementById('description').value).length==0){
        alert("Description should not be empty")
        return
}
if((document.getElementById('travelername').value).length==0){
    alert("TraverlerName should not be empty")
    return
}
if((document.getElementById('startdate').value)==""){
    alert("Start Date should not be empty")
    return
}
console.log((document.getElementById('Enddate').value)+" "+(document.getElementById('startdate').value));
if((document.getElementById('Enddate').value)==""){
    alert("End date should not be empty")
    return
}

let x=document.getElementById('budget').value;
x=String(x)
let xy=String(document.getElementById('totalcost').value);
if(parseInt(document.getElementById('budget').value)<=0||x.length==0){
        alert("the budget should greater than 0");
        return;
    }
    if(parseInt(document.getElementById('totalcost').value)<=0||xy.length==0){
        alert("the totalcost should greater than 0");
                return;
    }
    let y=document.getElementById('travelercontact').value;
    if(y.length!=10||((/[^0-9$]/).test(y))){
        alert("Contact should contain 10 digits and only contain numbers")
        return
    }
      

let u=JSON.parse(sessionStorage.getItem('userobj')).email;
let p=JSON.parse(sessionStorage.getItem('userobj')).username;
          fetch(`http://localhost:8080/itineraries/`,{
              method:"POST",
              headers: {
                  'Content-Type': 'application/json'
               },
     body:JSON.stringify({
        email:u,
        username:p,
        acceptedby:'',
        title:   document.getElementById('title').value,
        destination:    document.getElementById('destination').value,
        start_date:  document.getElementById('startdate').value,
        end_date: document.getElementById('Enddate').value,
        description:    document.getElementById('description').value,
        budget:   document.getElementById('budget').value,
        traveler_name:     document.getElementById('travelername').value,
        traveler_contact:   document.getElementById('travelercontact').value,
        total_cost:    document.getElementById('totalcost').value,
        request:"pending"
       
   })
}).then(response=>response.json()).then().catch(err=>console.log(err));
document.getElementById('title').value=""
   document.getElementById('destination').value=""
  document.getElementById('startdate').value=""
 document.getElementById('Enddate').value=""
    document.getElementById('description').value=""
   document.getElementById('budget').value=""
     document.getElementById('travelername').value=""
   document.getElementById('travelercontact').value=""
    document.getElementById('totalcost').value=""

formfinder.style.display="none";
    fetchcaller();
    
    alert("Item created");
})
}