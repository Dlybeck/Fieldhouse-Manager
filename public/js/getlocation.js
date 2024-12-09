async function getLocations(){
    try{
        const response = await fetch('/locations');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching locations: ', error);
    }
}

async function gotLocations(){
    const data = await getLocations();

    const dropdown = document.getElementById('location');
    const names = [];
    const ids = [];
    for(var i = 0; i < data.length; i++){
        names[i] = data[i].name;
        ids[i] = data[i]._id
    }

    var x = 0;
    names.forEach(name =>{
        const option = document.createElement('option');
        option.textContent = name;
        option.value = ids[x];
        dropdown.appendChild(option);
        x++;
    })
}

gotLocations();
