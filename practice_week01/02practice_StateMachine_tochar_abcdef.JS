//使用状态机，找到字符abcdef
//找到字符a之前和找到字符a之后，在for循环里的逻辑是完全不一样的
function match(string){
        let state =start;                  //定义一个state变量表示状态机的当前状态
       for(let c of string){
             state = state(c);
             }
       return state ===end;       //判断是否找到目标字符串，只需要判断当前状态，end状态说明找到，返回true
   }

function start(c){
      if(c==="a")
            return foundA;
      else 
            return start;
 }

function end(c){            //end状态永远返回end
       return end;            //这个状态称为trap(陷阱）
 }
function foundA(c){
      if(c==="b")
             return foundB;
     else 
             return start(c);
 }

function foundB(c){
       if(c==="c")
            return foundC;
      else
           return start(c);
}

function foundC(c){
       if(c==="d")
             return foundD;
      else
            return start(c);
 }

function foundD(c){
       if(c==="e")
             return foundE;
      else
            return  start(c);
 }

function foundE(c){
       if(c==="f")
            return end;
      else 
            return start(c);
}

console.log(match("ababcdef"));

//bug   当字符串是“ababcdef"时，返回值为false ,a被吃掉了，winter老师给出的解决方案是
// return start    =>return start(c)   













