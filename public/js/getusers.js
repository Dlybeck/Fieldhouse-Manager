async function getUsers(){
    try{
        const response = await fetch('/users');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching users: ', error);
    }
}

async function gotUsers(){
    const data = await getUsers();

    const dropdown = document.getElementById('user');
    const names = [];
    const ids = [];
    for(var i = 0; i < data.length; i++){
        var flname = "";
        flname = flname + data[i].fname;
        flname = flname + " " + data[i].lname;
        names[i] = flname;
        ids[i] = data[i]._id
    }
    //console.log(names);

    var x = 0;
    names.forEach(name =>{
        const option = document.createElement('option');
        option.textContent = name;
        option.value = ids[x];
        dropdown.appendChild(option);
        x++;
    })
}

gotUsers();
