const usersListUrl = 'http://localhost:8080/api/admin';
const rolesListUrl = 'http://localhost:8080/api/roles';
const userActive = 'http://localhost:8080/active';
let output = '';
let roleLet;


 showUserPage()


//таблица юзеров
const usersTable = document.getElementById('users-table')
const listAllUsers = (users) => {
    users.forEach(user => {
        roleLet = '';
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
            userInfoAdmin.innerHTML = userInfoOutput
        })
}

// Edit user modal

const editingUserForm = document.getElementById('users-table');
usersTable.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.id === 'editButton') {
        fetch(`http://localhost:8080/api/users/${e.target.dataset.uid}`)
            .then(res => res.json())
            .then(data => {
                $('#idEdit').val(data.id)
                $('#firstNameEdit').val(data.firstName)
                $('#lastNameEdit').val(data.lastName)
                $('#ageEdit').val(data.age)
                $('#emailEdit').val(data.email)
                $('#passwordEdit').val('')

                // Fetch all roles from API and populate dropdown options
                fetch(rolesListUrl)
                    .then(res => res.json())
                    .then(rolesData => {
                        let options = '';
                        for (const [id, name] of Object.entries(rolesData)) {
                            const selected = data.roles.some(role => role.id === id) ? 'selected' : '';
                            options += `<option value="${id}" ${selected}>${name.name}</option>`;
                        }
                        $('#rolesEdit').html(options);
                        $('#editModal').modal()
                    })
                    .catch(err => console.error(err));
            });
    } else if (e.target.id === 'deleteButton') {
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
    }
})

// Editing user
const editModalForm = document.getElementById('editModalForm')

editModalForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const firstNameById = document.getElementById('firstNameEdit');
    const lastNameById = document.getElementById('lastNameEdit');
    const ageById = document.getElementById('ageEdit');
    const emailById = document.getElementById('emailEdit');
    const passwordById = document.getElementById('passwordEdit');
    const roleById = document.getElementById('rolesEdit');

    // create array of roles
    const roles = [];
    for (let i = 0; i < roleById.options.length; i++) {
        if (roleById.options[i].selected) {
            roles.push({
                id: roleById.options[i].value,
                name: roleById.options[i].text
            });
        }
    }

    const requestBody = {
        id: document.getElementById('idEdit').value,
        firstName: firstNameById.value,
        lastName: lastNameById.value,
        age: ageById.value,
        email: emailById.value,
        userPassword: passwordById.value,
        roles: roles
    };

    console.log('Request body:', requestBody);
    const uid = document.getElementById('idEdit').value
    fetch(`http://localhost:8080/api/users/${uid}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(res => console.log(res))
        .then(() => {
            $('#editModal').modal('hide')
            output = ''
            fetch(usersListUrl)
                .then(res => res.json())
                .then(data => listAllUsers(data))
        })

});


const deleteModalForm = document.getElementById('deleteModalForm')
deleteModalForm.addEventListener('submit', (e) => {
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



// Creating new user
const createUserUrl = 'http://localhost:8080/api/users';
const selectRoleForm = document.getElementById('roles');


// Fetch all roles from API and populate dropdown options
fetch(rolesListUrl)
    .then(res => res.json())
    .then(data => {
        let options = '';
        for (const [k, v] of Object.entries(data)) {

            options += `<option value="${k}">${v.name}</option>`;
            console.log(options)
        }
        selectRoleForm.innerHTML = options;
    })
    .catch(err => console.error(err));

const createUserForm = document.getElementById('creating-user-form');

createUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstNameById = document.getElementById('first_name');
    const lastNameById = document.getElementById('last_name');
    const ageById = document.getElementById('age');
    const emailById = document.getElementById('email');
    const passwordById = document.getElementById('password');
    const roleById = document.getElementById('roles');

    // create array of roles
    const roles = [];
    for (let i = 0; i < roleById.options.length; i++) {
        if (roleById.options[i].selected) {
            roles.push({
                id: roleById.options[i].value,
                name: roleById.options[i].text
            });
        }
        console.log(roles)
    }

    // POST user data to API
    fetch(createUserUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstNameById.value,
            lastName: lastNameById.value,
            age: ageById.value,
            email: emailById.value,
            userPassword: passwordById.value,
            roles: roles
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = []
            dataArr.push(data)
            listAllUsers(dataArr)
            createUserForm.reset()
            $('[href="#users_table"]').tab('show');
        })
        .catch(err => console.error(err));
});
