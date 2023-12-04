const userLogin = localStorage.getItem("loginUser")
const PUBLIC_KEY = "91a29dee29914d48943b04b24abb73a0"

let logout = document.querySelector(".logout")
let next = document.querySelector(".next")

let prev = document.querySelector(".prev")
let cardResult = document.querySelector(".card-result")

let loading = document.querySelector(".loading")
let buttonActions = document.querySelector(".button-actions")

let resultCount = document.querySelector('.result-count')


const dummy = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQTJvv_C0eeDiv043l5pWil4KsV0t_YQ1k2g&usqp=CAU"
const dummyHeading = "lorem ipsum"
const woiIni = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"

class Count{
  static count = 10

  static increment(){
    return this.count = this.count + 3
  }

  static decrement(){
    if(this.count === 10){
      this.count
    }else{
      this.count = this.count - 3
    }
  }
}


async function getApi(){
  const url =`https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${PUBLIC_KEY}`
  try {
    const response = await fetch(url, {method: "GET"})
    const resJson =  await response.json()
    return resJson.articles
  } catch (error) {
    console.log(error.message)
  }
}

// function randomData(dataAray){
//   let result = [];
//     for (let index = 0; index < dataAray.length; index++) {
//       const random = Math.floor(Math.random() * dataAray.length)
//       result.push(dataAray[random])
//     }
//   return result  
// }


async function displayArticle(){
  const data = await getApi()
  // // const randomNews = randomData(data.articles)
  // if (!data || !data.articles || !Array.isArray(data.articles)) {
  //   console.error("Invalid data structure received from API.");
  //   return;
  // }

  cardResult.innerHTML= ""

  data
    .slice(0, Count.count)
    .map((item)=>{
      cardResult.innerHTML +=`
      <div class="card">
        <img src=${item.urlToImage === null ? dummy : item.urlToImage} alt="">
        <h1 class="h1-card">${item.author === null ? dummyHeading : item.author }</h1>
        <p class="p-card">${item.description === "" ? woiIni : item.description}</p>
      </div>
      `
  })

}

function renderPertamaKali(){
  if(!userLogin){
    return window.location.href ="login.html"
  }

  onload =()=>{
    loading.textContent ="loading..."
    buttonActions.classList.add("hidden")  
    setTimeout(()=>{
      displayArticle()
      loading.textContent = ""
      buttonActions.classList.remove("hidden")
    },2000)
  }

}

renderPertamaKali()


function nextButton(){
  Count.increment()
  displayArticle()
}
function prevButton(){
  Count.decrement()
  displayArticle()
}


function logoutButton(){
 localStorage.removeItem("loginUser")
 window.location.href ="login.html"
 return;
}

prev.addEventListener("click", prevButton)
next.addEventListener("click", nextButton)
logout.addEventListener("click",logoutButton)
