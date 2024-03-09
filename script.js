const input = document.getElementById("input");
const start = document.getElementById("start");
const stp = document.getElementById("stop");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const speed = 1;
const circleRadius = 20;

let xPosition = 0;
let waves = [];
let intervalId = 1;
let frame = 0;

class Wave {
    constructor(position, iteration){
        this.position = position;
        this.radius = circleRadius;
        this.iteration = iteration;
    }

    draw(){
        circle(this.position, this.radius);
    }
}

function clear(){
    ctx.clearRect(0, -200, 1000, 600);
}

function circle(position, radius){
    ctx.beginPath();
    ctx.arc(position, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

ctx.translate(0, 200);

start.addEventListener("click", () => {
    stp.style.display = "block";
    start.style.display = "none";

    const speedRelation = input.value;
    xPosition = 0;
    waves = [];
    frame = 0;
    
    setInterval(() => {
        //Move focus
        clear();
        circle(xPosition, 20);
        ctx.fill();
        
        //Create a new wave
        if(frame === 0 || waves[waves.length - 1].iteration + 10 === frame){
            waves.push(new Wave(xPosition, frame));
        }

        //Draw waves
        waves.forEach((wave) => {
            wave.draw();
            wave.radius += speed;
        })

        xPosition += speedRelation * speed;
        frame++;
    }, 30)
})

stp.addEventListener("click", () => {
    stp.style.display = "none";
    start.style.display = "block";
    clearInterval(intervalId++);
    
})


