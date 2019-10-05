console.log('Client Side JS is Loaded');

const weatherForm = document.querySelector('form');
const addr = document.querySelector('input');
const locn = document.querySelector('#loc');
const details = document.querySelector('#details');
const website = document.querySelector('#website');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    locn.textContent = 'Loading...';
    details.textContent = '';
    website.textContent = '';
    fetch(`http://localhost:3000/weather?address=${addr.value}`).then((response)=>{
        return response.json();
    }).then((data)=>{
        if(data.error){
            locn.textContent = data.error;
        }else{
            locn.textContent = data.address;
            details.textContent = data.forecast;
            website.textContent = data.website;
        }
    }).catch((e)=>{
        locn.textContent = e;
    });
});




