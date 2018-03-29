 

function getrandomint(min,max){
  return Math.floor(Math.random()*(max-min+1)+min)
}
//洗牌函数
export  function shuffle(arr){
  let shuffle = arr.slice()  //原本播放列表不能更改，所以要生成一个新的
  for(let i = 0; i < shuffle.length ; i++){
    let j = getrandomint(0,i)
    let t = shuffle[i]
    shuffle[i] = shuffle[j]
    shuffle[j] = t
  }
  return shuffle
}