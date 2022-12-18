const mobileMenuIcon = document.querySelector('#menu-icon');
const menuContent = document.querySelector('#mobile-menu-content');
const searchNav = document.querySelector('#search-bar');
const bodyTag = document.querySelector('body');
const city = document.querySelector('#city');
const country = document.querySelector('#country');

let menuState = false;

//Toggle mobile menu
mobileMenuIcon.addEventListener('click', (e)=>{
    menuState = !menuState;
    if (menuState) {
        menuContent.style.display = 'block';
        bodyTag.style.overflow = 'hidden';
    } else {
        menuContent.style.display = 'none';
        bodyTag.style.overflow = 'visible';

    }
});

//Getting search value
searchNav.addEventListener('focusout', (e)=>{

});

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

const success = (pos)=> {
    city.textContent = 'Loading....';
    const crd = pos.coords;
    fetch(`/current-weahter?lat=${crd.latitude}&lng=${crd.longitude}`).then((res)=>{
        res.json().then((data)=>{
            console.log(data)
            city.textContent = data.city;
            country.textContent = `, ${data.countryName}`;
        })
    });
}

const error = (err)=> {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);








