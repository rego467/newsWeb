const userLogin = localStorage.getItem("loginUser")
const PUBLIC_KEY = "91a29dee29914d48943b04b24abb73a0"

let logout = document.querySelector(".logout")
let next = document.querySelector(".next")

let prev = document.getElementById("prev")
let cardResult = document.querySelector(".card-result")

let loading = document.querySelector(".loading")
let buttonActions = document.querySelector(".button-actions")

let resultCount = document.querySelector('.result-count')
let numberPage = document.querySelector(".numberPage")
let numberOfPage = document.querySelector(".numberOfPage")

// const dummy = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTJvv_C0eeDiv043l5pWil4KsV0t_YQ1k2g&usqp=CAU"
// const dummyHeading = "lorem ipsum"
// const woiIni = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"

class Count{
  static count = 1

  static increment(){
    return this.count = this.count + 1
  }

  static decrement(){
    if(this.count === 1){
      this.count
    }else{
      this.count = this.count - 1
      console.log("woii")
    }
  }
}

class LastCount{
  static countL = 1041
  
  static increment(){
    prev.disabled = false
    this.countL = this.countL - 1
  }

  static decrement(){
    if(this.countL === 1041){
      this.countL
      prev.disabled = true      
    }else{
      this.countL = this.countL + 1
    }
  }
}

async function getApi(){
  const url =`https://api.jikan.moe/v4/top/anime?page=${Count.count}`
  try {
    const response = await fetch(url, {method: "GET"})
    const resJson =  await response.json()
    console.log(resJson.data)
    return resJson.data
  } catch (error) {
    console.log(error.message)
  }
}

async function displayArticle(){
  const getData = await getApi()
  cardResult.innerHTML= ""
  getData
    .map((item)=>{
      cardResult.innerHTML +=`
        <div class="card" data-id=${item.mal_id}>
          <img src=${item.images.jpg.image_url} alt="" loading="lazy">
          <h1 class="h1-card">${item.title}</h1>
        </div>
      `
  })

}

function shows(id){
  console.log("e", id)
}
function renderPertamaKali(){
  
  if(!userLogin){
    return window.location.href ="login.html"
  }
  
  cardResult.addEventListener("click", async function(event){
    const card = event.target.closest(".card")
    const data = await getApi()
    if(card){
      const index = card.getAttribute("data-id")
      localStorage.setItem("data", JSON.stringify(data))
      window.location.href =`detail.html?id=${index}`
    }
  })

  onload =()=>{
    loading.textContent ="loading..."
    buttonActions.classList.add("hidden")  
    setTimeout(()=>{
      displayArticle()
      numberPage.textContent = Count.count
      numberOfPage.textContent = LastCount.countL
      loading.textContent = ""
      buttonActions.classList.remove("hidden")
    },2000)
  }

}
renderPertamaKali()


function nextButton(){
  Count.increment()
  LastCount.increment()
  displayArticle()
  numberPage.textContent = Count.count
  numberOfPage.textContent = LastCount.countL
}

function prevButton(){
  LastCount.decrement()
  Count.decrement()
  displayArticle()
  numberPage.textContent = Count.count
  numberOfPage.textContent = LastCount.countL
}


function logoutButton(){
 localStorage.removeItem("loginUser")
 window.location.href ="login.html"
 return;
}

prev.addEventListener("click", prevButton)
next.addEventListener("click", nextButton)
logout.addEventListener("click",logoutButton)


// function randomData(dataAray){
//   let result = [];
//     for (let index = 0; index < dataAray.length; index++) {
//       const random = Math.floor(Math.random() * dataAray.length)
//       result.push(dataAray[random])
//     }
//   return result  
// }