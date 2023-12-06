const urlParams = new URLSearchParams(window.location.search)
const getIdParam = urlParams.get("id")

const data = JSON.parse(localStorage.getItem("data"))
console.log(data, "data")

let des = document.querySelector(".des")
let hDetail = document.querySelector(".h1-detail")
let back = document.querySelector(".back")
let video = document.getElementById("myFrame")

back.addEventListener("click", backHome)

function backHome(){
  return window.location.href ="index.html"
}

function cekParams(){
  const cek = data.find((item)=> item.mal_id === parseInt(getIdParam))
  if(cek){
    const h1 = cek.title
    const videos = cek.trailer.embed_url
    hDetail.textContent = h1
    video.src = videos
    des.textContent = cek.synopsis
  }
}

function displayDetail(){
  cekParams()
}

displayDetail()