 
        const lostpassword = document.getElementById("lostpassword");
        const signup = document.getElementById("signup");
        const signin = document.getElementById("signin");
        const back = document.getElementById("back");
        const field = document.getElementById("field");
        const field1 = document.getElementById("field1");
        const title = document.getElementById("title");

        const names = document.getElementById("name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        // let namearray = ["Yash Goyal"];
        // let emailarray = ["yashgoyal2804@gmail.com"];
        // let passwordarray = ["YashGoyal@28"];
        // console.log(namearray);
        signin.onclick = function(){
            field.style.maxHeight="0";
            field1.style.maxHeight="60px";
            back.style.display="none"
            title.innerHTML="Sign In";
            signup.classList.add("disabled")
            signin.classList.remove("disabled")
            window.location.href = "index.html";
            
            
            // function checkAge(age) {
            //     return email.value == age;
            // }

            
            // console.log(emailarray.find(checkAge));
        }
        signup.onclick = function(){
            field.style.maxHeight="60px";
            field1.style.maxHeight="60px";
            title.innerHTML="Sign Up";
            back.style.display="none"
            signup.classList.remove("disabled")
            signin.classList.add("disabled")
            // namearray.push(names.value);
            // emailarray.push(email.value);
            // passwordarray.push(password.value);
            // console.log(namearray);
            sessionStorage.setItem("name",names.value);
            sessionStorage.setItem("email",email.value);
            sessionStorage.setItem("pass",password.value);
        }
        lostpassword.onclick=function(){
            field.style.maxHeight="0";
            field1.style.maxHeight="0";
            signup.style.display="none"
            signin.style.display="none"
            back.style.display="block"
            title.innerHTML="Forgot Password";
        }
        back.onclick=function(){
            field.style.maxHeight="0";
            field1.style.maxHeight="60px";
            back.style.display="none"
            title.innerHTML="Sign In";
            signup.classList.add("disabled")
            signin.classList.remove("disabled")
            signup.style.display="block"
            signin.style.display="block"
        }
    