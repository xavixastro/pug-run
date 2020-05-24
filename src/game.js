import Board from './board';
import Pug from './pug';
import Level from "./level";

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


export default class Game {
    constructor(canvas, canvas2) {
        this.ctx = canvas.getContext("2d");
        this.ctx2 = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.restart();


        //scrolling background
        this.img = document.getElementById("background-img");
        this.vel = 180; //100pixels per second
        this.distance = 0;
        this.lastFrameRepaintTime = 0;
        this.calcOffset = this.calcOffset.bind(this);
        this.draw = this.draw.bind(this);
        // this.startBackground();

        //instructions
        this.img2 = document.getElementById("instructions-img");
        this.drawInstructions = this.drawInstructions.bind(this);
        this.drawInstructions();


    }

    calcOffset(time) {
        let frameGapTime = time - this.lastFrameRepaintTime;
        this.lastFrameRepaintTime = time;
        let translateX = this.vel*(frameGapTime/1000);
        return translateX;
    }

    draw(time){
        this.distance -= this.calcOffset(time);
        if (this.distance < -this.img.width) {
            this.distance = 0;
        }
        this.ctx2.clearRect(0, 0, this.ctx2.width, this.ctx2.height);
        this.ctx2.save();
        this.ctx2.translate(this.distance, 0);
        this.ctx2.drawImage(this.img, 0, 0);
        this.ctx2.drawImage(this.img, this.img.width, 0);
        

        requestAnimationFrame(this.draw);

        this.ctx2.restore();
    }

    startBackground(){
        this.lastFrameRepaintTime = window.performance.now();
        requestAnimationFrame(this.draw);
    }

    drawInstructions(){

        let ground = new Image();
        ground.src = './src/assets/ground.jpg';
        this.ctx2.drawImage(ground, 0, 0);

        let pug = new Image();
        pug.src = './src/assets/pug.png';
        this.ctx2.drawImage(pug, 100, 300);

        this.ctx.font = "bold 100pt Permanent Marker";
        this.ctx.fillStyle = "#EBC489";
        this.ctx.fillText("PUG RUN", 100, 200);
        this.ctx.strokeStyle = "#3D2F26";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText("PUG RUN", 100, 200);

        this.ctx.font = "15pt Rock Salt";
        this.ctx.fillStyle = "white";

        this.ctx.fillText("Use ⬆⬇ to move your pug", 400, 300);
        this.ctx.fillText("Eat 🍩 🍎 🦴 to gain points", 400, 350);
        this.ctx.fillText("Avoid eating 🥦 🥒", 400, 400);

        this.ctx.fillText("Press Enter to begin", 400, 500);

        requestAnimationFrame(this.drawInstructions);
    }


    restart(){
        this.running = false;
        this.score = 0;
        this.lives = 3;
        this.level = new Level(this.dimensions);
        this.pug = new Pug(this.dimensions);
        this.animate();
    }

    animate(){
        this.level.animate(this.ctx);
        this.pug.animate(this.ctx);

        this.checkCollision();


        this.drawScore();
        this.drawLives();

        if (this.lives <= 0) {
            this.drawLives();
            this.drawGameOver();
        }
        
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    play(){
        this.startBackground();
        this.running = true;
        this.animate();
    }


    registerEvents() {
        addEventListener('keydown', function (e) {
            if (e.keyCode === 38) {
                // if (this.pug.y <= 0) return
                this.pug.moveUp();
            }
            if (e.keyCode === 40) {
                if (this.pug.y >= this.dimensions.height - 30) return
                this.pug.moveDown();
            }
            if (e.keyCode === 32) {
                if (!this.running) {
                    this.play();
                }
            }

        }.bind(this))
        addEventListener('keyup', function (e) {
            if (e.keyCode === 38 || e.keyCode === 40) {
                this.pug.moveStraight();
            }
        }.bind(this))
    }


    checkCollision() {
        return (
            this.level.collidesWith(this.pug.bounds(), (eatable) => {
                if (eatable) {
                    this.likeSound = new sound("./src/assets/chew.mp3");
                    this.likeSound.play();
                    this.score += 1;
                    console.log(this.score);
                } else {
                    this.dislikeSound = new sound("./src/assets/dislike.mp3");
                    this.dislikeSound.play();
                    this.lives -= 1;
                    console.log(this.lives);
                }
            }) 
        );
    }

    drawScore() { 
        if (!this.running) return;
        const loc = { x: this.dimensions.width / 20, y: this.dimensions.height / 10 }
        this.ctx.font = "bold 50pt Permanent Marker";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.score, loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText(this.score, loc.x, loc.y);
    }

    drawLives() {
        const loc = { x: this.dimensions.width / 40, y: this.dimensions.height / 7 }
        let blackPaw = new Image();
        let redPaw = new Image();
        blackPaw.src = './src/assets/black-paw.png';
        redPaw.src = './src/assets/red-paw.png';
        let paws 
        if (this.lives === 3) {
            paws = [blackPaw, blackPaw, blackPaw]
        } else if (this.lives === 2) {
            paws = [blackPaw, blackPaw, redPaw]
        } else if (this.lives === 1) {
            paws = [blackPaw, redPaw, redPaw]
        } else if (this.lives <= 0) {
            paws = [redPaw, redPaw, redPaw]
        }

        this.ctx.drawImage(paws[0], 0, 0, 512, 512, loc.x, loc.y, 35, 35);
        this.ctx.drawImage(paws[1], 0, 0, 512, 512, loc.x + 40, loc.y, 35, 35);
        this.ctx.drawImage(paws[2], 0, 0, 512, 512, loc.x + 80, loc.y, 35, 35);
        
    }

    drawGameOver() {
        const loc = { x: this.dimensions.width / 4, y: this.dimensions.height / 3 }
        this.ctx.font = "bold 50pt Permanent Marker";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("GAME OVER", loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText("GAME OVER", loc.x, loc.y);
    }

    // draw(){
    //     this.ctx.fillStyle = "peru";
    //     this.ctx.fillRect(0, 0, 800, 800);
    //     let image = new Image();
    //     image.src = '../src/assets/pug.gif';
    //     image.onload = function () {
    //         this.ctx.drawImage(image, 10, 10);
    //     }.bind(this);
    // }
}



