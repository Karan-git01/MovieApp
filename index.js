const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".overlay");

function openMenu(){
    navbar.classList.add("active");
    overlay.classList.add("active");
}

function closeMenu(){
    navbar.classList.remove("active");
    overlay.classList.remove("active");
}
