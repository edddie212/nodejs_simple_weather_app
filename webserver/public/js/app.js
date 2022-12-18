
const weatherForm = document.querySelector('form');
const searchcCity = document.querySelector('#city');
const searchCountryCode = document.querySelector('#country_code');
let loadingMsg = document.querySelector('#loading_msg');
let errorMsg = document.querySelector('#error_msg');
let successMsg = document.querySelector('#success_msg');

alert(123)

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    loadingMsg.textContent = 'Loading...';
    fetch(`/weather?city=${searchcCity.value.toLowerCase()}&country=${searchCountryCode.value.trim().toLowerCase()}`).then((res)=>{
        res.json().then((data)=>{
            if(!data.error){
                loadingMsg.textContent = '';
                successMsg.textContent = `The current weather in ${data.city}, ${data.cityName}, ${data.country} is ${data.tempC} degrees\n
                with ${data.humidity}% humidity, wind speed is ${data.windSpeedKPH} KPH ${data.day != false ? 'it is day time in ' + data.city : 'it is night time in ' + data.city}.`;
                return;
            }
            loadingMsg.textContent = '';
            errorMsg.textContent = data.error;
            setTimeout(()=>{
                errorMsg.textContent = '';
            }, 3000);

        });
    });
});