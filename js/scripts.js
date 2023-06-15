
// MEnu mobile
const menuMobile = document.querySelector(".menuMobile");
const navMenu = document.querySelector("nav .menu");
console.log(navMenu);

menuMobile.addEventListener("click", () => {
    navMenu.classList.toggle("menu-mobile_activo");
});


