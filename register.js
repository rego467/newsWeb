let users = JSON.parse(localStorage.getItem("users")) || []
const numberArray = [1,2,3,4,5,6,"a","b","c","d"]
let email = document.getElementById("email")
let password = document.getElementById("password")
let h1Eror = document.querySelector(".eror")
let card = document.querySelector(".card") 

let sendRegister = document.querySelector(".register")

function randomId(params){
  let result =""

  for(let i = 0; i<params; i++){
    const mathAngka = Math.floor(Math.random() * numberArray.length)
    result += numberArray[mathAngka]
  }

  return result
}

const tes = randomId(6)

function send(){
  let errorM = []
  const findUser = users.find(users => users.email === email.value)
  if(findUser){
    errorM.push("email sudah ada, ganti dengan email lain!!!")
    h1Eror.textContent = errorM.join()
    return;
  }

  if(email.value === "" && password.value === ""){
    errorM.push("email dan password tidak boleh kosong.")
    h1Eror.textContent = errorM.join()
    return;
  }

  const register ={
    email: email.value,
    password: password.value,
    id: tes 
  }

  users.push(register)
  localStorage.setItem("users", JSON.stringify(users)) 
  window.location.href="login.html"
}

sendRegister.addEventListener("click", send)

function moveToLogin(){
  window.location.href = "login.html"
}