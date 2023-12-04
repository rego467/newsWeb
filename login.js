const users = JSON.parse(localStorage.getItem("users")) || []

let email =document.getElementById("email")
let password = document.getElementById("password")
let eror = document.querySelector(".eror")
let login = document.querySelector(".login")
let eyes = document.querySelector(".eyes")

function buttonEyes(){
  if(password.type === "password"){
    password.type ="text"
  }else{
    password.type ="password"
  }
}

eyes.addEventListener("click", buttonEyes)

function loginSend(){
  let emailDanPassword= "email dan password salah"
  let emails = "email salah bro"
  let passwords = "password salah bro"
  let emailDanPasswordKosong = "mohon diisi email dan passwordnya."

  const cekUsers = users.some(item => item.email === email.value && item.password === password.value)
  const emailUser =  users.some(item1=> item1.email === email.value)
  const passwordUser = users.some(item2 => item2.password === password.value)

  if(email.value === "" && password.value === ""){
    return eror.textContent = emailDanPasswordKosong
  }
  if(!cekUsers){
    if(!emailUser && !passwordUser){
      eror.textContent = emailDanPassword
      email.value = ""
      password.value = ""
    }else if(!emailUser){
      eror.textContent = emails
      email.value = ""    
    }else if(!passwordUser){
      eror.textContent = passwords
      password.value = "" 
    }

    return;
    
  }

  localStorage.setItem("loginUser", JSON.stringify(email.value))
  window.location.href = "index.html"

}
login.addEventListener("click", loginSend)

function moveToRegister(){
  window.location.href ="register.html"
}