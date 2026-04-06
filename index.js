// Navbar Responsive

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

// Login - Logout Functionality in Auth Section

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const authSection = document.getElementById("auth-section");

console.log(loggedInUser);

if(loggedInUser){
    authSection.innerHTML = `
    <span class = "user-name nav-btn"> Welcome ${loggedInUser.name}</span>
    <button class = "nav-btn btn-logout" onclick = "Logout()"> Logout </button>
    `
}

function Logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
}

// Carousal Section

const carousalImages = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLn_hLNWGL5RdeoL0ng6VxEUijSsK_Hh3QAw&s","https://lh6.googleusercontent.com/proxy/MX3D4QatCD48FMfsynnWIAs4g1JT8iTM4K-05xetNMuZ3h5JmVuiRcnRo2BN86tEPuD9KFOtAPpwsZPQKXjwG19oAwaJqxTKvzChZV_V_7ostQ","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZlfWUaYo_-GznDVJ4b6XV19EHeEzHW3XfQ&s"]

let allMovies = [];

// Movies Container

let currentSlide = 0;

const carousalContainer = document.getElementById("carousal-container");

function initCarousal(){
    carousalContainer.innerHTML = "";
    carousalImages.forEach( (imageURL,index) => {
        const slide = document.createElement("div");
        slide.className = "carousal-slide";
        if(index == 0){
            slide.classList.add("active")
        }
        
        console.log(imageURL);

        const img = document.createElement("img");
        img.className = "carousal-image";
        img.src = imageURL;
        img.alt = `${index+1}`;
        slide.appendChild(img)

        carousalContainer.appendChild(slide);
    })
}

function updateCarousal(){
    const slides = document.querySelectorAll(".carousal-slide")
    slides.forEach((slide,index) => {
        if(index === currentSlide){
            slide.classList.add("active");
        }else{
            slide.classList.remove("active");
        }
    })
}

function autoNext(){
    currentSlide = (currentSlide + 1) % carousalImages.length;
    updateCarousal()
}


function changeSlide(direction){
    currentSlide = (currentSlide + direction + carousalImages.length) % carousalImages.length
    updateCarousal()
}


const movieContainer = document.getElementById("movies-container");

async function getMoviesData() {
    try{
        const response = await fetch("http://localhost:3000/movies");
        allMovies = await response.json();
        displayMovies(allMovies);
    }catch(err){
        console.log(err)
    }
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", ()=>{
    const searchValue = searchInput.value;
    const filterValue = allMovies.filter( movie=>
        movie.title.toLowerCase().includes(searchValue.toLowerCase()));
    displayMovies(filterValue)
})

async function handleCart(movie) {
    try {
        let response = await fetch("http://localhost:3000/cart",{
        method:"POST",
        headers:{
                'Content-Type': 'application/json', 
            },
        body:JSON.stringify(movie)
    });
    alert("Movie Added to Cart")
    } catch (error) {
        console.log(error);
    }
    
}

function displayMovies(movies = allMovies){
    if(!movieContainer){
        console.log("Movies container is missing");
    }

    if(!movies || movies.length == 0){
        movieContainer.innerHTML = `<p>No Movies Available</p>`
    }
    movieContainer.innerHTML = "";
    movies.forEach( movie => {
        const card = document.createElement("div");

        card.className = "movie-card";
        card.innerHTML = `
        <div class = "movie-poster">
            <img src = ${movie.poster} class = "movie-poster-img"/>
        </div>
        
        <div class = "movie-info">
            <div class = "movie-title">${movie.title}</div>
            <div class = "movie-year">${movie.year}</div>
            <div class = "movie-genre">${movie.Category}</div>
            <div class = "movie-rating">${movie.rating}⭐</div>

            <div class = "movie-buttons">
                <button class = "nav-btn btn-cart">Cart</button>
                <button class = "nav-btn btn-favourite">Favourite</button>
            </div>
        </div>`

        let cartBtn = card.querySelector(".btn-cart");
        cartBtn.addEventListener("click",() => {
            handleCart(movie)
        })

        movieContainer.appendChild(card)
    })
}

getMoviesData()
initCarousal()
setInterval(autoNext,5000)