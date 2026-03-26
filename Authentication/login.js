document.getElementById("register-form").addEventListener("submit",async (e)=>{
   e.preventDefault() ;

   const email=document.getElementById("email").value;
   const password=document.getElementById("password").value;

   try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json(); 

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "../index.html"; 
        } else {
            alert("Invalid Email or Password");
        }
    } catch (err) {
        console.log(err);
    }
})