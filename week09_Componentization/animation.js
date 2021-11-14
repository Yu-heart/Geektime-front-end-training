/*
setInterval(() => {}, 16) 
let tick = () => {
    setTimeout(tick, 16)
}
let tick = () => {
    requestAnimationFrame(tick)
}*/
const TICK = Symbol("tick")
const TICK_HANDLER = Symbol("tick-handler")
const ANIMATIONS = Symbol("animations")
const START_TIME = Symbol("startTime")

const PAUSE_START = Symbol("pauseStart")
const PAUSE_TIME = Symbol("startTime")

export class TimeLine{
  constructor(){
    this.state = "Inited"
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    
  }

  start(){
    if(this.state != "Inited"){
      return
    }
    this.state = 'started'
    this.startTime = Date.now()
    this[PAUSE_TIME] = 0
    this[TICK] = () =>{
      let now = Date.now()
      
      for(let animation of this[ANIMATIONS]){
        let t
        // 判断delayTime延时
        if(this[START_TIME].get(animation) < this.startTime)
          t = now - this.startTime - this[PAUSE_TIME] - animation.delay
        else
          t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay
        if(animation.duration < t){
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }
        if(t > 0)
          animation.receive(t)
      }
      /* if(this[ANIMATIONS].size){
        requestAnimationFrame(this[TICK])
      }
       console.log('tick')*/
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }

    this[TICK]()
  }

  pause(){
    if(this.state != "started"){
      return
    }
    this.state = "paused"

    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }

  resume(){
    if(this.state != "started"){
      return
    }
    this.state = "paused"
    this[PAUSE_TIME] = Date.now() - this[PAUSE_START]
    this[TICK]()
  }

  reset(){
    this.pause()
    this.state = "Inited"
    this.startTime = Date.now()
    this[PAUSE_TIME] = 0
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this[PAUSE_START] = 0
    this[TICK_HANDLER] = null
  }

  add(animation, startTime){
    this[ANIMATIONS].add(animation)
    if(arguments.length < 2){
      startTime = Date.now()
    }
    this[START_TIME].set(animation, startTime)
  }
}

export class Animation{
  constructor(object, property, startValue, endValue, duration, delay, timingFunction, template){
    timingFunction = timingFunction || (v=>v)
    template = template || (v=>v)
    this.object = object
    this.template = template
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
  }

  receive(time){
    let range = this.endValue - this.startValue
    let progress = this.timingFunction(time / this.duration) 
    this.object[this.property] = this.template(this.startValue + range * progress)
  }
}