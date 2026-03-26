document.getElementById("register-form").addEventListener("submit",async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;const password = document.getElementById("password").value;

    try {
        let userResponse = await fetch("http://localhost:3000/users");
        let data = await userResponse.json();
        let existingUser = data.find(user => user.name === name);

        if(existingUser){
            alert("User Already Registered")
            return
        }

        let response = await fetch("http://localhost:3000/users",{
            method:"POST",
            headers:{
                    'Content-Type': 'application/json', 
                },
            body:JSON.stringify({name,email,password})
        });

        if(response.ok){
            window.location.href = "login.html";
            alert("User Registered Successfully")
        }else{
            alert("Registration Failed")
        }
    }catch(error){
        console.log(error);
    }
})