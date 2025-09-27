const playboard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highscoreElement=document.querySelector(".highscore")
let foodX ,foodY;
let snakeX=1; let snakeY=1;
let velocityX=0; let velocityY=0;
let snakeBody=[];
let gameover=false;
let setIntervalId;
let score=0;
let highscore=localStorage.getItem("highscore") || 0;
highscoreElement.innerText=`Highscore: ${highscore}`;
const controls=document.querySelectorAll(".controls i")

const changefoodposition =() =>{
    foodX=Math.floor(Math.random() * 30)+1;
    foodY=Math.floor(Math.random() * 30)+1;
}


const handleGameOver=()=>{
  clearInterval(setIntervalId);
  alert("Game over press ok to replay");
  location.reload();
}

const changedirection=(e)=>{
    if(e.key=="ArrowUp" && velocityY != 1){
        velocityX=0;
        velocityY=-1;
    }else if(e.key=="ArrowDown"&& velocityY != -1){
      velocityX=0;
      velocityY=1;
    }else if(e.key=="ArrowLeft"&& velocityX != 1){
      velocityX=-1;
      velocityY=0;
    }else if(e.key=="ArrowRight"&& velocityX != -1){
      velocityX=1;
      velocityY=0;
    }
    initGame();
}
controls.forEach(key =>{
      key.addEventListener("click",()=>changedirection({key: key.dataset.key}));
    });

const initGame=()=>{
   if (gameover) return handleGameOver();
   let htmlMarkup=`<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;

  if(snakeX === foodX && snakeY === foodY){
    changefoodposition();
    snakeBody.push([foodX,foodY]);
    score++;
    highscore=score >=highscore ? score : highscore
    localStorage.setItem("highscore",highscore);
    scoreElement.innerText=`Points: ${score}`;
    highscoreElement.innerText=`Highscore: ${highscore}`;
    
  }
 
  for (let i = snakeBody.length-1; i >0; i--) {
    snakeBody[i]=snakeBody[i-1];
  }

  snakeBody[0]=[snakeX,snakeY];
  snakeX += velocityX;
  snakeY += velocityY;

  if(snakeX<=0 || snakeX >30 || snakeY<=0 || snakeY >30){
  gameover=true;
  }

  for(let i=0; i<snakeBody.length; i++){
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    if(i!==0 && snakeBody[0][1] === snakeBody [i][1] && snakeBody [0][0] ===snakeBody[i][0]){
      gameover=true;
    }
  }
    playboard.innerHTML=htmlMarkup;
  }

changefoodposition();
setIntervalId=setInterval(initGame,125);

document.addEventListener("keydown",changedirection);