
// -------------------Using fetch and then----------------------
const data= fetch("https://614eabf8b4f6d30017b482bc.mockapi.io/users").then(data=>data.json());
const val= data.then(v=> console.log(v));
// -----------------------------------------------------------------

// -------------------Using async await-------------------------
const api = async function(){
const dt= await fetch("https://614eabf8b4f6d30017b482bc.mockapi.io/users");
console.log( await dt.json());
}

api();
// --------------------------------------------------------------------


// ---------------------CRUD-------------------------------------------
const getUsers = async function(){
    const dt= await fetch("https://614eabf8b4f6d30017b482bc.mockapi.io/users",{method:"GET"});//methid is optional in fetch
    const users = await dt.json();
    return users;
    }

async function displayUSers(){
    const users = await getUsers();
    const cl = document.getElementsByClassName("user-list")[0];
    users.forEach(element => {
        console.log(element.name);                
        cl.innerHTML +=`<h1> ${element.name}</h1>`;
        // const content = document.createElement('h6');
        // document.body.append(content);
        // cl.innerText = cl.innerText + element.name;
    });
    // console.log(users);
}

// displayUSers();

// ------------------------------------------------------------

// Task

async function dispUser(){
    const users = await getUsers();
    const cl = document.getElementsByClassName("boxes")[0];
    cl.innerHTML="";
    users.forEach(element => {
        console.log(element.name);                
        cl.innerHTML +=`<div class='user-container'>
        <img src=${element.avatar}> 
        <div> 
        <h2>${element.name}</h2>
        <button onclick="deleteUser(${element.id})">delete</button>       
        <div>
        <input class="update-user" type="text" placeHolder="enter name to update">
        <button onclick="edit(${element.id})">Submit</button>
        </div>               
        </div>        
        
        </div>
        `;
        // const content = document.createElement('h6');
        // document.body.append(content);
        // cl.innerText = cl.innerText + element.name;
    });
    // console.log(users);
}


dispUser();



async function deleteUser(id){    
    const dt= await fetch("https://614eabf8b4f6d30017b482bc.mockapi.io/users/" + id,{method:"delete"});    

    dispUser();
    console.log(id);
}

// POST
// provide the data in the body - stringify
// specify - data format in headers - json

async function create(){
    
    const name = document.querySelector(".add-user").value;
    const avatar = document.querySelector(".add-avatar").value;
    console.log("Adding user");
    console.log(name);
    console.log(avatar);
    const dt= await fetch("https://614eabf8b4f6d30017b482bc.mockapi.io/users/",
    {
        method:"POST",
        body:JSON.stringify({
            name:name,
            avatar:avatar
        }),
        headers:{
            "Content-Type": "application/json"
        }
    });  
    dispUser();  
}

async function edit(id){
    const updateName = document.querySelector(".update-user").value;    
    console.log("Updating user", id, updateName);        
    const dt= await fetch("https://614eabf8b4f6d30017b482bc.mockapi.io/users/"+ id,
    {
        method:"PUT",
        body:JSON.stringify({
            name:updateName
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })    
    dispUser();
}