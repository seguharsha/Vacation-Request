
fetchcaller();
finder();
document.getElementById('updator').style.display="none"
function finder(){
   document.getElementById('namefromjwt').innerHTML=`<h1 id="namefromjwt">WELCOME ADMIN ${JSON.parse(sessionStorage.getItem('userobj')).username}</h1>`
}

function fetchcaller(){
fetch('http://localhost:8080/getUsers').then(response=>response.json()).then((data)=>{
        display(data);
    }
    ).catch(err=>console.log(err));
}
async function setter(){
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const username = document.getElementById('username').value;
    const res=await fetch('/signup',{
        method:"POST",
        body:JSON.stringify({
            email:email,
            username:username,
            password:password,
            role:'User'
        }),
        headers:{
            'Content-Type':'application/json'
        } 
    }).then(async (response) => {
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      const data = await response.json();
      alert("signup SUCCESSFULL")
        console.log('SignUp successful:', data);
          document.getElementById('email').value=""
          document.getElementById('password').value=""
          document.getElementById('username').value=""
          fetchcaller();
        })
      .catch((error) => {
        console.error('Error:', error.message);
        alert(error.message); 
      });   
    }
    
 function display(data){
  let x=0;
  document.getElementById('outer').innerHTML=""
    console.log(data)
    data.forEach(user=>{

      if(user.role=='User'){
        x++;
        let div=document.createElement('div');
        div.className="user-profile";
        div.innerHTML=`
        <h1 style="color:black">USER PROFILE</h1>
        <p><span class="labell">USERNAME:</span> ${user.username}</p>
        <p><span class="labell">EMAIL :</span> ${user.email}</p>
        <p><span class="labell">PASSWORD :</span>${user.password}</p>
        <button onclick="update(${user.id})">UPDATE</button>
        <button onclick="deleter(${user.id})">DELETE</button>
        `;
        document.getElementById('outer').appendChild(div);
      }

      })
      document.getElementById('numberofusers').innerHTML="";
      document.getElementById('numberofusers').innerHTML+=`TOTAL NUMBER OF USERS ${x}`;
      
}


async function update(idd) {
  alert("YOU CANT UPDATE THE EMAIL");
  document.getElementById('signup').style.display = "none";
  document.getElementById('updator').style.display = "block";
  let dat = [];

  // Fetch user data
  await fetch('http://localhost:8080/getUsers')
    .then(response => response.json())
    .then(data => {
      dat = data;
    })
    .catch(err => console.log(err));

  // Populate form fields
  const user = dat.find(user => user.id == idd);
  if (user) {
    document.getElementById('email').value = user.email;
    document.getElementById('email').readOnly = true;
    document.getElementById('password').value = user.password;
    document.getElementById('username').value = user.username;
  }

  // Set event listener for the update button

  document.getElementById('updator').onclick = async () => {
    // Perform the update first
    await fetch(`http://localhost:8080/people/${idd}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: document.getElementById('password').value,
        username: document.getElementById('username').value,
        role: 'User'
      })
    })
      .then(response => response.json())
      .catch((err) => console.log(err));

    // Now call doer() after updating the user

    // Reset the form fields
    await doer();
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('username').value = "";

    // Re-fetch the user list
    fetchcaller();
    document.getElementById('signup').style.display="block"
    document.getElementById('updator').style.display="none"
    document.getElementById('email').readOnly = false;
 
  };
}
async function doer(){
  let dat = [];

  // Fetch user data
  await fetch('http://localhost:8080/itineraries')
    .then(response => response.json())
    .then(data => {
      dat = data;
    })
    .catch(err => console.log(err));
for(let i=0;i<dat.length;i++){
  if(dat[i].email===document.getElementById('email').value){
    let idd=dat[i].id;
    await fetch(`http://localhost:8080/itineraries/${idd}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: document.getElementById('username').value,
      })
    })
      .then(response => response.json())
      .catch((err) => console.log(err));
  }
}
}
async function deleter(idd){
  
  document.getElementById('signup').style.display="block"
  document.getElementById('updator').style.display="none"
  
  // Perform the update first
   await fetch(`http://localhost:8080/people/${idd}`, {
    method: "DELETE",
    })
    .then(response => response.json())
    .catch((err) => console.log(err));
fetchcaller();

}