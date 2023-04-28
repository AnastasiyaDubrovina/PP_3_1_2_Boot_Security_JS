
const url = "http://localhost:8080/api/admin"
const usersTable = document.getElementById("body__list")
let  output = "";
fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            output += `<tr>
                <th><p>${user.id} </p></th>
                <th><p>${user.firstname} </p></th>
                <th><p>${user.lastName} </p></th>
                <th><p>${user.age} </p></th>
                <th><p>${user.email} </p></th>
            </tr>`;
        });
        usersTable.innerHTML = output;
    });


