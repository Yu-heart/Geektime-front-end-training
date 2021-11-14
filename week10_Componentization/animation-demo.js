import { TimeLine, Animation } from "./animation.js"
import { ease } from "./ease.js"

let tl = new TimeLine()
tl.add(new Animation(document.querySelector("#el").style, "transform", 0, 500, 2000, 0, ease, v => `translateX(${v}px)`))
tl.start()

document.querySelector("#btn-pause").addEventListener("click", ()=>tl.pause())
document.querySelector("#btn-resume").addEventListener("click", ()=>tl.resume())

// document.querySelector("#el2").style.transition = 'transform ease 2s'
document.querySelector("#el2").style.transform = "translateX(500px)"