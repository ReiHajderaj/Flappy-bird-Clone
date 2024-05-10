const bird = document.querySelector('.bird')
const container = document.querySelector('.game-container')
const ground = document.querySelector('.ground')

let birdLeft = 220
let birdBottom = 100
let gravity = 2
let isGameOver = false;
let gap = Math.random() * 50 + 420


function startGame(){
    birdBottom -= gravity
    bird.style.bottom = `${birdBottom}px`
    bird.style.left = `${birdLeft}px`
}

let gameTimerId = setInterval(startGame,20)

function control(e){
    // if(e.keyCode === 32){
    //     jump()
    // }
    jump()
}

function jump(){
    if(birdBottom< 500){
        birdBottom += 60
        bird.style.bottom = `${birdBottom}px`
    }
}

document.addEventListener('keypress',control)


function generateObstical(){
    let obsticalLeft = 500;
    let randHeight = Math.random()* 60
    let obsticalBottom =randHeight;
    const obstical = document.createElement('div')
    const topObstical = document.createElement('div')
    if (!isGameOver) obstical.classList.add('obstical')
    if (!isGameOver) topObstical.classList.add('topObstical')
    container.appendChild(obstical)
    container.appendChild(topObstical)

    obstical.style.left = `${obsticalLeft}px`
    topObstical.style.left = `${obsticalLeft}px`
    obstical.style.bottom = `${obsticalBottom}px`
    topObstical.style.bottom = `${obsticalBottom + gap}px`

    

    function moveObstical(){
        obsticalLeft -= 2
        obstical.style.left = `${obsticalLeft}px`
        topObstical.style.left = `${obsticalLeft}px`

        if(obsticalLeft === -60){
            clearInterval(timerId)
            container.removeChild(obstical)
            container.removeChild(topObstical)
        }

        if(((obsticalLeft> 160) && (obsticalLeft<280)
            &&(birdLeft===220)
            &&(birdBottom < obsticalBottom +165 || birdBottom > obsticalBottom + gap - 170))
            ||(birdBottom === 0)){
            gameOver()
            clearInterval(timerId)
        }
    }

    let timerId = setInterval(moveObstical, 20)
    if(!isGameOver) setTimeout(generateObstical, 3000)
}

generateObstical()

function gameOver(){
    clearInterval(gameTimerId)
    isGameOver = true;
    document.removeEventListener('keypress', control)
}