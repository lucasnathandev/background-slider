const body = document.body
const slides = document.querySelectorAll(".slide")
const leftBtn = document.querySelector("#left")
const rightBtn = document.querySelector("#right")

let activeSlide = 0

function setBgToBody(index) {
  body.style.backgroundImage = slides[index].style.backgroundImage
}

function setBgToSlides(imgs) {
  slides.forEach((slide, i) => {
    slide.style.backgroundImage = `url(${imgs[i]})`
  })
}

function setActiveSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active")
  })
  slides[index].classList.add("active")
}

function nextImg() {
  activeSlide >= slides.length - 1 ? (activeSlide = 0) : activeSlide++
  setActiveSlide(activeSlide)
  setBgToBody(activeSlide)
}

function prevImg() {
  activeSlide <= 0 ? (activeSlide = slides.length - 1) : activeSlide--
  setActiveSlide(activeSlide)
  setBgToBody(activeSlide)
}

async function getImages(count) {
  const data = await fetch(
    `https://api.unsplash.com/search/photos?query=nature&count=${count}&client_id=FRqKIeiMragyXqayDSOrx2_TkUkuze2HZD13ElztWu8`
  )
  return (await data.json()).results.map((img) => img.urls.full)
}

async function main() {
  const imgs = await getImages(slides.length)
  setBgToSlides(imgs)
  setBgToBody(activeSlide)
  leftBtn.addEventListener("pointerup", prevImg)
  rightBtn.addEventListener("pointerup", nextImg)
}

main()
