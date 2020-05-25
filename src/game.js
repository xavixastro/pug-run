import Pug from './pug';
import Level from "./level";


export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.background = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.restart();

        //instructions
        this.drawInstructions = this.drawInstructions.bind(this);
        this.drawInstructions();

        //scrolling background
        this.img = document.getElementById("background-img");
        this.vel = 241; //pixels per second
        this.distance = 0;
        this.lastFrameRepaintTime = 0;
        this.calculateDistance = this.calculateDistance.bind(this);
        this.drawBackground = this.drawBackground.bind(this);

    }



    drawInstructions(){

        let ground = new Image();
        ground.src = './src/assets/ground.jpg';
        this.background.drawImage(ground, 0, 0);

        let pug = new Image();
        pug.src = './src/assets/pug.png';
        this.background.drawImage(pug, 100, 300);

        this.ctx.font = "bold 100pt Permanent Marker";
        this.ctx.fillStyle = "#EBC489";
        this.ctx.fillText("PUG RUN", 100, 200);
        this.ctx.strokeStyle = "#3D2F26";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText("PUG RUN", 100, 200);

        let apple = new Image();
        apple.src = './src/assets/apple.png';
        let donut = new Image();
        donut.src = './src/assets/donut.png';
        let bone = new Image();
        bone.src = './src/assets/bone.png';
        let garlic = new Image();
        garlic.src = './src/assets/garlic.png';
        let broccoli = new Image();
        broccoli.src = './src/assets/broccoli.png';
        let lemon = new Image();
        lemon.src = './src/assets/lemon.png';


        this.ctx.font = "bold 16pt Rock Salt";
        this.ctx.fillStyle = "white";

        this.ctx.fillText("Use ⬆⬇ to move your pug", 400, 300);
        this.ctx.fillText("Eat your favorite foods", 400, 350);
        this.ctx.fillText ("to make points:", 400, 400);


        this.ctx.drawImage(apple, 400, 425, 40, 40)
        this.ctx.drawImage(bone, 450, 425, 40, 40)
        this.ctx.drawImage(donut, 500, 425, 40, 40)

        this.ctx.fillText("Avoid eating:", 400, 500);
        this.ctx.drawImage(garlic, 400, 525, 40, 40)
        this.ctx.drawImage(broccoli, 450, 525, 40, 40)
        this.ctx.drawImage(lemon, 500, 525, 40, 40)


        this.ctx.font = "bold 20pt Rock Salt";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Press Enter to start", 350, 700);

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

    stop(){
        this.restart();
        this.drawInstructions();
    }


    registerEvents() {
        addEventListener('keydown', function (e) {
            if (e.keyCode === 38) {
                this.pug.moveUp();
            }
            if (e.keyCode === 40) {
                this.pug.moveDown();
            }
            if (e.keyCode === 13) {
                if (!this.running) {
                    this.play();
                }
            }
            if (e.keyCode === 81) {
                this.stop();
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
                } else {
                    this.dislikeSound = new sound("./src/assets/dislike.mp3");
                    this.dislikeSound.play();
                    this.lives -= 1;
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

        this.ctx.font = "bold 30pt Permanent Marker";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Press q to continue", loc.x, loc.y+200);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText("Press q to continue", loc.x, loc.y+200);


        this.level.items = undefined;
    }


    //Scrolling background

    calculateDistance(time) {
        let frameGapTime = time - this.lastFrameRepaintTime;
        this.lastFrameRepaintTime = time;
        let translateX = this.vel * (frameGapTime / 1000);
        return translateX;
    }

    drawBackground(time) {
        this.distance -= this.calculateDistance(time);
        if (this.distance < -this.img.width) {
            this.distance = 0;
        }
        this.background.clearRect(0, 0, this.background.width, this.background.height);
        this.background.save();
        this.background.translate(this.distance, 0);
        this.background.drawImage(this.img, 0, 0);
        this.background.drawImage(this.img, this.img.width, 0);


        requestAnimationFrame(this.drawBackground);

        this.background.restore();
    }

    startBackground() {
        this.lastFrameRepaintTime = window.performance.now();
        requestAnimationFrame(this.drawBackground);
    }


}

//Sound constructor
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


