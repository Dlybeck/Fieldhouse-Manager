window.addEventListener("DOMContentLoaded", buttonListener);

 async function buttonListener(){

    let button = document.querySelector("#submit");
        button.addEventListener("click",  async (event) =>{
            event.preventDefault();
            var res = {//put login info into a json
                user: document.querySelector('#user').value,
                location: document.querySelector('#location').value,
                date: document.querySelector('#date').value,
                startTime: document.querySelector('#startTime').value,
                endTime: document.querySelector('#endTime').value
            }
            console.log(res);
            let body = JSON.stringify(res);
               let response = await fetch('/submit-reservation', {//go to server to get user info and check existence
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });
                window.location.href = "/";
        }
        )}