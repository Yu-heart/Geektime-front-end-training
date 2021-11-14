import {Component, STATE, ATTRIBUTE} from './framework.js'
import {enabledGesture} from './gesture.js'
import {TimeLine,Animation} from './animation.js'
import {ease} from './ease.js'

export { STATE, ATTRIBUTE } from './framework.js'

export class Carousel extends Component {
  constructor() {
    super()
  }

  render() {
    this.root = document.createElement('div')
    this.root.className = 'carousel'
    for(let record of this[ATTRIBUTE].src){
      let child = document.createElement("div")
      child.style.backgroundImage = `url(${record.img})`
      this.root.appendChild(child)
    }

   this[STATE].position = 0

    enabledGesture(this.root)
    let timeLine = new TimeLine()
    timeLine.start()

    let handler = null

    let children = this.root.children

    let t = 0;
    let ax = 0
    this.root.addEventListener("start", event => {
      timeLine.pause()
      clearInterval(handler)

      let progress = (Date.now() - t) / 500;
      ax = ease(progress) * 500 - 500
    })

    this.root.addEventListener("tap", event => {
      this.triggerEvent('click', {
        data: this[ATTRIBUTE].src[this[STATE].position],
        position: this[STATE].position
      })
    })

    this.root.addEventListener("panstart", event => {
      let x = event.clientX - event.startX - ax;

      let current = this[STATE].position - ((x- x % 500) / 500);
      for(let offset of [-1,0,1]) {
        let pos = current + offset;
        pos = (pos % children.length + children.length) % children.length;

        children[pos].style.transition = "none";
        children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
      }
    })

    this.root.addEventListener("end", event => {
      timeLine.reset();
      timeLine.start();

      let x = event.clientX - event.startX - ax;
      let current = this[STATE].position - ((x- x % 500) / 500);

      let direction = Math.round((x % 500) / 500);

      if(event.isFlick) {
        if(event.velocity < 0) {
          direction = Math.ceil((x % 500) /500);
        } else {
          direction = Math.floor((x % 500) /500);
        }
      }

      for(let offset of [-1,0,1]) {
        let pos = current + offset;
        pos = (pos % children.length + children.length) % children.length;

        children[pos].style.transition = "none";
        timeLine.add(new Animation(children[pos].style, 'transform',
          -pos * 500 + offset*500 + x%500, -pos*500 + offset * 500 +direction * 500,
          500, 0, ease, v=>`translateX(${v}px)`));
      }

      this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length;

      this.triggerEvent("change", {position: this[STATE].position});

    })


    let nextPicture = ()=> {
      let nextIndex = (this[STATE].position+1) % children.length;
      let current = children[this[STATE].position];
      let next = children[nextIndex];

      timeLine.add(new Animation(current.style, 'transform',
        -this[STATE].position * 500, -500 - this[STATE].position*500, 500, 0, ease, v=>`translateX(${v}px)`));
      timeLine.add(new Animation(next.style, 'transform',
        500 - nextIndex * 500, -nextIndex * 500 , 500, 0, ease, v=>`translateX(${v}px)`));

      this[STATE].position = nextIndex;
      this.triggerEvent("change", {position: this[STATE].position});

    }
    handler = setInterval(nextPicture, 3000);

    return this.root;
  }
}