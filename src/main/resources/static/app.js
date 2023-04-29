const usersListUrl = "http://localhost:8080/api/admin"
const allRolesUrl = '    ';

const userActive = 'http://localhost:8080/active';
let roleLet;



 showUserPage()


//таблица юзеров

let output = "";
const usersTable = document.getElementById('users-table')
const listAllUsers = (users) => {
    users.forEach(user => {
        roleLet = "";
        user.roles.forEach((role) => roleLet += role.nameToString + " ");
        output += `<tr>
                <th><p>${user.id} </p></th>
                <th><p>${user.firstName} </p></th>
                <th><p>${user.lastName} </p></th>
                <th><p>${user.age} </p></th>
                <th><p>${user.email} </p></th>
                <th><p>${roleLet}</p></th>                        
                <th>
                    <button type="button" class="btn btn-primary" data-toggle="modal"
                        data-target="#editModal" id="editButton" data-uid=${user.id}>Edit
                    </button>
                </th>
                <th>
                    <button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#deleteModal" id="deleteButton" data-uid=${user.id}>Delete
                    </button>
                </th>
        </tr>`;
    });
    usersTable.innerHTML = output;
}

//Admin panel All users
fetch(usersListUrl)
    .then(res => res.json())
    .then(data => listAllUsers(data));


// Showing user page
function showUserPage() {
    //const userInfo = document.getElementById('data')
    const userInfoAdmin = document.getElementById('user-info')
    let userInfoOutput
    fetch(userActive)
        .then(res => res.json())
        .then(data => {
            roleLet = "";
            data.roles.forEach((role) => roleLet += role.nameToString + " ");
            userInfoOutput = `
            <tr>
                <td>${data.id}</td>
                <td>${data.firstName}</td>
                <td>${data.lastName}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${roleLet}</td>
            </tr>`
            // userInfo.innerHTML = userInfoOutput
            userInfoAdmin.innerHTML = userInfoOutput
        })
}





// //DELETE
//
// const deleteModalForm = document.getElementById('deleteModalForm');
// const idDelete = document.getElementById('idDelete');
// const firstNameDelete = document.getElementById('firstNameDelete');
// const lastNameDelete = document.getElementById('lastNameDelete');
// const ageDelete = document.getElementById('ageDelete');
// const emailDelete = document.getElementById('emailDelete');
//
// async function deleteModalData(id) {
//     $('#deleteModal').modal('show');
//     const  urlForDel = 'http://localhost:8080/api/users/' + id;
//     let usersPageDel = await fetch(urlForDel);
//     if (usersPageDel.ok) {
//         await usersPageDel.json().then(user => {
//             console.log(user.firstName)
//             idDelete.value = `${user.id}`;
//             firstNameDelete.value = `${user.firstName}`;
//             lastNameDelete.value = `${user.lastName}`;
//             ageDelete.value = `${user.age}`;
//             emailDelete.value = `${user.email}`;
//         })
//     } else {
//         alert(`Error, ${usersPageDel.status}`)
//     }
// }
// async function deleteUser() {
//     let urlDel = 'http://localhost:8080/api/users/' + idDelete.value;
//     let method = {
//         method: 'DELETE',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             firstName: deleteModalForm.firstName.value,
//             lastName: deleteModalForm.lastName.value,
//             age: deleteModalForm.age.value,
//             email: deleteModalForm.email.value,
//         })
//     }
//     await fetch(urlDel,method).then(() => {
//         $('#deleteCloseBtn').click();
//         fetch(url)
//                  .then(res => res.json())
//                  .then(data => listAllUsers(data))
//     })
// }

// Edit user modal

const editingUserForm = document.getElementById('users-table');
editingUserForm.addEventListener('click', (e) => {
    e.preventDefault()
    // if (e.target.id === 'editButton') {
    //     fetch(`http://localhost:8080/api/users/${e.target.dataset.uid}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             $('#idEdit').val(data.id)
    //             $('#firstNameEdit').val(data.firstName)
    //             $('#lastNameEdit').val(data.lastName)
    //             $('#ageEdit').val(data.age)
    //             $('#emailEdit').val(data.email)
    //             $('#passwordEdit').val('')
    //
    //             // Fetch all roles from API and populate dropdown options
    //             fetch(allRolesUrl)
    //                 .then(res => res.json())
    //                 .then(rolesData => {
    //                     let options = '';
    //                     for (const [id, name] of Object.entries(rolesData)) {
    //                         const selected = data.authorities.some(role => role.id === id) ? 'selected' : '';
    //                         options += `<option value="${id}" ${selected}>${name}</option>`;
    //                     }
    //                     $('#rolesEdit').html(options);
    //                     $('#editModal').modal()
    //                 })
    //                 .catch(err => console.error(err));
    //         });
    // } else if (e.target.id === 'deleteButton') {
        fetch(`http://localhost:8080/api/users/${e.target.dataset.uid}`)
            .then(res => res.json())
            .then(data => {
                roleLet = "";
                data.roles.forEach((role) => roleLet += role.nameToString + " ");
                $('#idDelete').val(data.id)
                $('#firstNameDelete').val(data.firstName)
                $('#lastNameDelete').val(data.lastName)
                $('#ageDelete').val(data.age)
                $('#emailDelete').val(data.email)
                $('#passwordDelete').val(data.userPassword)
                $('#rolesDelete').val(roleLet)

                $('#deleteModal').modal()
            });
    // }
})

/// Editing user
// const editUserModalForm = document.getElementById('editModalForm')
//
// editUserModalForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//
//     const firstNameById = document.getElementById('firstNameEdit');
//     const lastNameById = document.getElementById('lastNameEdit');
//     const ageById = document.getElementById('ageEdit');
//     const emailById = document.getElementById('emailEdit');
//     const passwordById = document.getElementById('passwordEdit');
//     const roleById = document.getElementById('rolesEdit');
//
//     // create array of roles
//     const roles = [];
//     for (let i = 0; i < roleById.options.length; i++) {
//         if (roleById.options[i].selected) {
//             roles.push({
//                 id: roleById.options[i].value,
//                 authority: roleById.options[i].text
//             });
//         }
//     }
//
//     const requestBody = {
//         id: document.getElementById('idEdit').value,
//         firstName: firstNameById.value,
//         lastName: lastNameById.value,
//         age: ageById.value,
//         username: emailById.value,
//         password: passwordById.value,
//         authorities: roles
//     };
//
//     console.log('Request body:', requestBody);
//
//     fetch(usersUrl, {
//         method: 'PATCH',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//     })
//         .then(res => console.log(res))
//         .then(() => {
//             $('#editModal').modal('hide')
//             usersTableOutput = ''
//             fetch(usersUrl)
//                 .then(res => res.json())
//                 .then(data => listAllUsers(data))
//         })
//
// });





const deleteUserModalForm = document.getElementById('deleteModalForm')

deleteUserModalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const uid = document.getElementById('idDelete').value
    fetch(`http://localhost:8080/api/users/${uid}`, {
        method: 'DELETE'
    })
        .then(res => console.log(res))
        .then(() => {
            $('#deleteModal').modal('hide')
            output = ''
            fetch(usersListUrl)
                .then(res => res.json())
                .then(data => listAllUsers(data))
        })
})