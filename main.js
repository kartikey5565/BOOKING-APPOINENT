let form = document.getElementById('my-form');
let itemList = document.getElementById('users');
let liTag;
// let newObj = {
//     name: "Zuber",
//     email: "zuberahmad8960@gmail.com"
// }
// localStorage.setItem(newObj.email, JSON.stringify(newObj));
// let localObj = Object.values(localStorage);
// for (let i = 0; i < localObj.length; i++) {
//     let li = document.createElement('li');
//     li.style.backgroundColor = '#c05e5e';
//     li.style.color = 'white';
//     let name = JSON.parse(localObj[i]).name;
//     let email = JSON.parse(localObj[i]).email;
//     console.log(email);
//     li.appendChild(document.createTextNode(name));
//     li.appendChild(document.createTextNode(" "));
//     li.appendChild(document.createTextNode(email));
//     delEdit(li);
//     itemList.appendChild(li);
// }
//-------Display the data from server to UI after each time refresh screen
//axios.get request to gitting data from crudcrud to UI.
window.addEventListener('DOMContentLoaded',()=>{
    axios.get("https://crudcrud.com/api/d2e24d1f7b694ca48c6d90b659747603/appointment")
    axios.get("https://crudcrud.com/api/fbd49c1906a5445d8dea0fba55c7e4a3/appointment")
    .then((response)=>{
        response.data.forEach((ele)=>{
            showNewUserOnscreen(ele);
@@ -74,7 +74,7 @@ function addItem(e) {
        email
    };

    axios.post("https://crudcrud.com/api/d2e24d1f7b694ca48c6d90b659747603/appointment", obj)
    axios.post("https://crudcrud.com/api/fbd49c1906a5445d8dea0fba55c7e4a3/appointment", obj)
        .then((responce) => {
            showNewUserOnscreen(responce.data);
            console.log(responce.data);
@@ -91,26 +91,33 @@ function addItem(e) {
}


// //delete itam event
// itemList.addEventListener('click', removeItem);
//delete itam event
itemList.addEventListener('click', removeItem);

// function removeItem(e) {
//     // console.log(1);
//     if (e.target.classList.contains('delete')) {
//         // console.log(1);
//         if (confirm('Are you sure?')) {
//             li = e.target.parentElement;
function removeItem(e) {
    // console.log(1);
    if (e.target.classList.contains('delete')) {
        // console.log(1);
        if (confirm('Are you sure?')) {
            li = e.target.parentElement;

//             let key = li.childNodes[2].textContent;
//             key = JSON.stringify(key);
//             // console.log(key);
//             localStorage.removeItem(JSON.parse(key));
            let key = li.childNodes[2].textContent;
            // console.log(key);

//             itemList.removeChild(li);
//         }
//     }
            itemList.removeChild(li);

// }
            axios.get("https://crudcrud.com/api/fbd49c1906a5445d8dea0fba55c7e4a3/appointment")
            .then((response)=>{
                response.data.forEach((ele)=>{
                    if(ele.email==key){
                        axios.delete('https://crudcrud.com/api/fbd49c1906a5445d8dea0fba55c7e4a3/appointment/'+`${ele._id}`)
                    }
                })
            }).catch((err)=>console.log(err));
        }
    }

}

//for display list on screen
function showNewUserOnscreen(obj) {
    let li = document.createElement('li');
    li.style.backgroundColor = '#c05e5e';
    li.style.color = 'white';
    li.appendChild(document.createTextNode(obj.name));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(obj.email));
    itemList.appendChild(li);
    //make empty name and email for new user 
    let val = document.querySelector('#name');
    let val2 = document.querySelector('#email');
    val.value = null;
    val2.value = null;
    //delete and edit button creating.
    delEdit(li);
    itemList.appendChild(li);
}
// //edit button event
// itemList.addEventListener('click', editItam);
// function editItam(e) {
//     console.log(1);
//     li = e.target.parentElement;
//     let nameVal = li.childNodes[0].textContent;
//     let emailVal = li.childNodes[2].textContent;
//     // console.log(nameVal);
//     // console.log(emailVal);
//     let name = document.getElementById('name');
//     let email = document.getElementById('email');
//     name.value = nameVal;
//     email.value = emailVal;
// }
//function for delete and edit button.
function delEdit(li) {
    let del = document.createElement('button');
    let edit = document.createElement('button');
    del.className = "btn btn-danger btn-sm float-right delete";
    edit.className = "btn btn-danger btn-sm float-right";
    del.appendChild(document.createTextNode('Delete'));
    edit.appendChild(document.createTextNode('Edit'));
    li.appendChild(del);
    li.appendChild(edit);
}