
const weatherForm = document.querySelector('form');
const searchcCity = document.querySelector('#city');
const searchCountryCode = document.querySelector('#country_code');
let loadingMsg = document.querySelector('#loading_msg');
let errorMsg = document.querySelector('#error_msg');
let successMsg = document.querySelector('#success_msg');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadingMsg.textContent = 'Loading...';
    fetch(`/weather?city=${searchcCity.value.toLowerCase()}&country=${searchCountryCode.value.trim().toLowerCase()}`).then((res)=>{
        res.json().then((data)=>{
            if(!data.error){
                loadingMsg.textContent = '';
                successMsg.textContent = data;
                return console.log(data)
            }
            loadingMsg.textContent = '';
            errorMsg.textContent = data.error;
            setTimeout(()=>{
                errorMsg.textContent = '';
            }, 3000);

        });
    });
});