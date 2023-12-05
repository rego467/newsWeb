const urlParams = new URLSearchParams(window.location.search)
const getIdParam = urlParams.get("id")

const data = JSON.parse(localStorage.getItem("data"))
console.log(data, "data")

let des = document.querySelector(".des")
let hDetail = document.querySelector(".h1-detail")
let back = document.querySelector(".back")
let video = document.querySelector(".video")
back.addEventListener("click", backHome)

function backHome(){
  return window.location.href ="index.html"
}

function cekParams(){
  const cek = data.find((item)=> item.mal_id === parseInt(getIdParam))
  if(cek){
    const h1 = cek.title
    hDetail.textContent = h1
    video.src = cek.trailer.embed_url === null ? "" : cek.trailer.embed_url 
    des.textContent = cek.synopsis
  }
}

function displayDetail(){
  cekParams()
}

displayDetail()