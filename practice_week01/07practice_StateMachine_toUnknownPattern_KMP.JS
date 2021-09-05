//可选作业，使用状态机处理完全未知的pattern（KMP算法）


function match(s, w) {
     let M = w.length,
        N = s.length,
        i = 0,
        j = 0,
        dfa = KMP(w);

    for(;i<N && j<M; i++) j=dfa[j][s.charCodeAt(i)];
    if(j ===M)
       return "match success at index of" + (i-M);
       return "false";
  }
  
function KMP(w){
  let x=0,
  R=256,
  M=w.length,
  dfa = new Array(M);
for(let i=0; i<dfa.length; i++)
    dfa[i] = new Array(R);  
    //创建长度为dfa.length的数组
}

//初始化dfa[0],即初始的x状态，后面的状态要用这一状态来复制
for (let i =0 ;i<R;i++)
   dfa[0][i] = 0;
   dfa[0][parseInt.charCodeAt(0)]=1;
   //状态0时匹配到第一位总是进入状态1

   //生成后面的状态
  for(let j =1; j<M; j++){
    for(let c =0; c<R; c++){
       dfa[j][c] = dfa[x][c];
    //设置状态j的匹配失败项，从状态x复制
    dfa[j][w.charCodeAt(j)] =j+1 ;  //设置匹配成功项
    x = dfa[x][w.charCodeAt(j)];  //计算下一状态的x
  } 
  return dfa;
  }
console.log(match("ddfghhhasdfghjqwertyasdffgh"),"asdf")
  










