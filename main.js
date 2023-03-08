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

//-------Display the data from server to UI
//axios
window.addEventListener('DOMContentLoaded',()=>{
    axios.get("https://crudcrud.com/api/b946afa94cb74e5c87b5baf5d7ad470e/appointment")
    .then((response)=>{
        response.data.forEach((ele)=>{
            showNewUserOnscreen(ele);
            console.log(ele.name);
        })
    })
    .catch((err) => {
        console.log(err);
    })
})



//form submit event:
form.addEventListener('submit', addItem);




function addItem(e) {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    if (name == "" || email == "") {
        return alert("field is empty?");
    }

    liTag = itemList.querySelectorAll('li');
    console.log(liTag);

    Array.from(liTag).forEach(function (item) {
        let itemEmail = item.childNodes[2].textContent;
        if ((itemEmail.indexOf(email) != -1)) {
            item.style.display = 'none';
        }
    })

    let obj = {
        name,
        email
    };


    axios.post("https://crudcrud.com/api/b946afa94cb74e5c87b5baf5d7ad470e/appointment", obj)
        .then((responce) => {
            showNewUserOnscreen(responce.data);
            console.log(responce.data);
        })
        .catch((err) => {
            console.log(err);
        })


    // localStorage.setItem(`${obj.email}`, JSON.stringify(obj));

    // showNewUserOnscreen(obj);
    // creating of list of user.

}


//delete itam event
itemList.addEventListener('click', removeItem);

function removeItem(e) {
    // console.log(1);
    if (e.target.classList.contains('delete')) {
        // console.log(1);
        if (confirm('Are you sure?')) {
            li = e.target.parentElement;

            let key = li.childNodes[2].textContent;
            key = JSON.stringify(key);
            // console.log(key);
            localStorage.removeItem(JSON.parse(key));

            itemList.removeChild(li);
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



//edit button event
itemList.addEventListener('click', editItam);

function editItam(e) {
    console.log(1);
    li = e.target.parentElement;
    let nameVal = li.childNodes[0].textContent;
    let emailVal = li.childNodes[2].textContent;
    // console.log(nameVal);
    // console.log(emailVal);
    let name = document.getElementById('name');
    let email = document.getElementById('email');

    name.value = nameVal;
    email.value = emailVal;

}





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