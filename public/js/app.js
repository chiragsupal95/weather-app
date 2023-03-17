console.log('javascript file loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

let messageOne = document.querySelector('#messageOne')
let messageTwo = document.querySelector('#messageTwo')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    if (location) {
        messageOne.textContent = 'Please Wait...'
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = error;
                    return console.log(error);
                }
                messageOne.textContent = data.address;
                messageTwo.textContent = data.forecast;
                console.log(data);

            })
        })
    }
    else {
        console.log('please provide a location');
    }




})