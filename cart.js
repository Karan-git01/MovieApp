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

// Carts Container

let cartMovies = [];

const cartContainer = document.getElementById("cart-container");

async function getMoviesData() {
    try{
        const response = await fetch("http://localhost:3000/cart");
        cartMovies = await response.json();
        displayMovies(cartMovies);
    }catch(err){
        console.log(err)
    }
}

async function removeFromCart(id) {
    try {
        let response = await fetch(`http://localhost:3000/cart/${id}`,{
        method:"DELETE",
    });
    getMoviesData()
    alert("Movie Deleted from Cart")
    } catch (error) {
        console.log(error);
    }
    
}

function displayMovies(movies = cartMovies){
    if(!cartContainer){
        console.log("Cart container is missing");
        return;
    }

    if(!movies || movies.length == 0){
        cartContainer.innerHTML = `<p>No Movies Available</p>`;
        return;
    }

    cartContainer.innerHTML = "";

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
            <div class = "movie-rating">${movie.rating}</div>

            <div class = "movie-buttons">
                <button class = "nav-btn btn-cart remove-cart">Remove</button>
                <button class = "nav-btn btn-favourite">Favourite</button>
            </div>
        </div>`

        let removeBtn = card.querySelector(".remove-cart");
        removeBtn.addEventListener("click",() => {
            removeFromCart(movie.id)
        })

        cartContainer.appendChild(card)
    })
}

getMoviesData()