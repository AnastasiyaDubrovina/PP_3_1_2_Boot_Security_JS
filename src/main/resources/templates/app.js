const url = "http://localhost:8080/api/admin"
const usersTable = document.getElementById("body__list")
fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            roleLet = "";
            user.role.forEach((role) => roleLet += role.name + " || ");
            output += <tr>
                <th><p>${user.id} </p></th>
                <th><p>${user.firstName} </p></th>
                <th><p>${user.lastName} </p></th>
                <th><p>${user.age} </p></th>
                <th><p>${user.email} </p></th>
                <th><p>${roleLet.slice(0, roleLet.length - 3)}</p></th>

            </tr>;
        });
        usersTable.innerHTML = output;
    });