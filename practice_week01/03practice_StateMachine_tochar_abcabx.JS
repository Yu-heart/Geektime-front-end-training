//使用状态机，处理"abcabx"

function match(string){
        let state =start;                  //定义一个state变量表示状态机的当前状态
       for(let c of string){
             state = state(c);
             }
       return state ===end;       
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
       if(c==="a")
             return foundA2;
      else
            return start(c);
 }

function foundA2(c){
       if(c==="b")
             return foundB2;
      else
            return  start(c);
 }

function foundB2(c){
       if(c==="x")
            return end;
      else 
            return foundB(c);      //如果不是x，可能是a，如果不是a,可能是c
}

console.log(match("abcabcabx"));










