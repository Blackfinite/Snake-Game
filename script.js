let inputDir={x:0,y:0}
const foodSound = new Audio("food.mp3")
const gameOversound = new Audio("gameover.mp3")
const moveSound = new Audio("move.mp3")
const musicSound = new Audio()
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13,y:15}
]
food = {x:6,y:7}
function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime - lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime = ctime;
    
    gameEngine()
    
}
function isCollide(sarr){
    //
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
        
    }
    if(snakeArr[0].x >= 18 || snakeArr[0].x <=0  || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
        return true
    }

}
function gameEngine(){
    //part 1 updating the snake array and food
    if(isCollide(snakeArr)){
        gameOversound.play()
        musicSound.pause()
        inputDir={x:0,y:0}
        alert("Game Over . Press any key to play again")
        snakeArr = [{x:13,y:15}];
        musicSound.play()
        score=0;

    }

    //is snake have eaten  the food , increament the score and regenerate the food
    
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play()
        score+=1;
        if(score > hiScoreval){
            hiScoreval = score
            localStorage.setItem("hiScore",JSON.stringify(hiScoreval))
            hiScoreBox.innerHTML ="Hi Score:"+hiScoreval;

        }
        scoreBox.innerHTML ="Score "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y +inputDir.y})
        let a = 2;
        let b = 16; 
        food = {x:Math.round(a + (b-a) * Math.random()),y:Math.round(a + (b-a) * Math.random())}
    }

    //moving the snake
    for(let i= snakeArr.length -2 ; i>=0 ;i--){
        const element = snakeArr[i]
        snakeArr[i+1] = {...snakeArr[i]}
    }

    snakeArr[0].x = snakeArr[0].x + inputDir.x
    snakeArr[0].y += inputDir.y


    //part 2 display the snake 
     
    document.getElementById("board").innerHTML=""
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x; 
        
        if(index === 0){
            snakeElement.classList.add("head")
        }else{
            snakeElement.classList.add("body")
        }
        board.appendChild(snakeElement)
    });
    //part 2 display the food 
        foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y; 
        foodElement.style.gridColumnStart = food.x; 
        foodElement.classList.add("food")
        board.appendChild(foodElement)
   
}



// main logic start here 
let hiScore = localStorage.getItem("hiScore");

if(hiScore === null){
    hiScoreval = 0;
    localStorage.setItem("hiScore",JSON.stringify(hiScoreval))
}else{
    hiScoreval = JSON.parse(hiScore)
    hiScoreBox.innerHTML ="Hi Score:"+hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    inputDir = {x:0,y:1}
    moveSound.play()
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
            
    }

})