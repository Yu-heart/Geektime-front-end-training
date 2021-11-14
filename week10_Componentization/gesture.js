export class Dispatcher {
  constructor(element) {
    this.element = element
  }
  dispatch(type, properties) {
    let event = new Event(type)
    for(let name in properties) {
      event[name] = properties[name]
    }
    this.element.dispatchEvent(event)
  }
}
export class Listener{
  constructor(element, recognize){
    let isListeningMouse = false
    let contexts = new Map()

    element.addEventListener("mousedown", event =>{
      let context = Object.create(null)
    
      contexts.set("mouse"+ (1 << event.button), context)
      recognize.start(event,context)
    
      let mousemove = event =>{
        let button = 1
        while(button <= event.buttons){
          if(button & event.buttons){
           
            let key;
            if(button === 2)
              key = 4
            else if( button === 4)
              key = 2
            else 
              key = button
            
            let context = contexts.get('mouse'+key)
            recognize.move(event, context)
          }
          
          button = button << 1
        }
      }
    
      let mouseup = event =>{
        let context = contexts.get('mouse' + (1 << event.button))
        recognize.end(event, context)
        contexts.delete('mouse' + (1 << event.button))
    
        if(event.buttons === 0){
          document.removeEventListener("mousemove", mousemove)
          document.removeEventListener("mouseup", mouseup)
          isListeningMouse = false
        }
        
      }
    
      if(!isListeningMouse){
        document.addEventListener("mousemove", mousemove)
        document.addEventListener("mouseup", mouseup)
    
        isListeningMouse = true
      }      
    })
        
    element.addEventListener("touchstart", event =>{
      for(let touch of event.changedTouches){
        let context = Object.create(null)
        contexts.set(touch.identifier, context)
        recognize.start(touch, context)
      }
    })
    
    element.addEventListener("touchmove", event =>{
      for(let touch of event.changedTouches){
        let context = contexts.get(touch.identifier)
        recognize.move(touch, context)
      }
    })
    
    element.addEventListener("touchend", event =>{
      for(let touch of event.changedTouches){
        let context = contexts.get(touch.identifier)
        recognize.end(touch,context)
        contexts.delete(touch.identifier)
      }
    })
    
    element.addEventListener("touchcancel", event =>{
      for(let touch of event.changedTouches){
        let context = contexts.get(touch.identifier)
        recognize.cancel(touch,context)
        contexts.delete(touch.identifier)
      }
    })
  }

}

export class Recognize{
  constructor(dispatcher){
    this.dispatcher = dispatcher
  }

  start(point, context){
    context.startX = point.clientX
    context.startY = point.clientY
    context.points = [{
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }]
  
    context.isTap = true
    context.isPan = false
    context.isPress = false

    this.dispatcher.dispatch('start',{
      startX: point.clientX,
      startY: point.clientY,
      clientX: point.clientX,
      clientY:point.clientY
    })
  
    context.handler = setTimeout(()=>{
      context.isPan = false
      context.isTap = false
      context.isPress = true
      context.handler = null
      this.dispatcher.dispatch('pressstart',{})
    }, 500)
  }
  
  move(point, context){
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY
    // 判断位移是否超过10px
    if(!context.isPan && dx ** 2 + dy ** 2 > 100) {
      if(context.isPress){
        this.dispatcher.dispatch('presscancel',{})
      }
      context.isPan = true
      context.isTap = false
      context.isPress = false
      clearTimeout(context.handler)
      /* this.dispatcher.dispatch('panstart',{
         startX: context.startX,
         startY: context.startY,
         clientX: point.clientX,
         clientY:point.clientY
      })  */
    }
    
    if(context.isPan){
      this.dispatcher.dispatch('panstart',{
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY:point.clientY
      })
    }
  
    // 筛选半秒内的点
    context.points.filter(point => Date.now() - point.t < 500)
    context.points.push({
      t: Date.now(),
      x: point.clientX,
      y: point.clientY
    }) 
  }
  end (point, context) {
     
    let d,v
    if(!context.points.length){
      v = 0
    } else{
      context.points.filter(point => Date.now() - point.t < 500)
      d = Math.sqrt((point.clientX - context.points[0].x) ** 2 
          + (point.clientY - context.points[0].y) ** 2)
      
      v = d / (Date.now() - context.points[0].t)
    }
    context.isFlick = v > 1.5 
    if(context.isFlick){
      this.dispatcher.dispatch('flick',{
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        velocity: v
      })
    }
      
    if(context.isTap){
      this.dispatcher.dispatch('tap')
    }
    if(context.isPan){
      this.dispatcher.dispatch('panend',{
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        velocity: v,
        isFlick: context.isFlick
      })
    }
    if(context.isPress){
      this.dispatcher.dispatch('pressend')
    }
    clearTimeout(context.handler)
    this.dispatcher.dispatch('end',{
      startX: context.startX,
      startY: context.startY,
      clientX: point.clientX,
      clientY: point.clientY,
      velocity: v,
      isFlick: context.isFlick
    })
  }
  
  cancel(point, context) {
    clearTimeout(context.handler)
    this.dispatcher.dispatch('cancel')
  }
}

export function enabledGesture(element){
  new Listener(element, new Recognize(new Dispatcher(element)))
}