import Board from './board';
import Pug from './pug';
import Level from "./level";



export default class Game {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.dimensions = { width: canvas.width, height: canvas.height };
        this.registerEvents();
        this.restart();

    }

    restart(){
        this.running = false;
        this.score = 0;
        this.level = new Level(this.dimensions);
        this.pug = new Pug(this.dimensions);
        this.animate();
    }

    animate(){
        this.level.animate(this.ctx);
        this.pug.animate(this.ctx);

        if (this.gameOver()) {
            alert("OVER");
            this.restart();
        }

        //we see if they have scored a point by passing a pipe
        this.level.passedItem(this.pug.bounds(), () => {
            this.score += 1;
            console.log(this.score);
        });

        //and draw the score
        this.drawScore();
        
        if (this.running) {
            requestAnimationFrame(this.animate.bind(this));
        }
    }

    play(){
        this.running = true;
        this.animate();
    }


    registerEvents() {
        addEventListener('keydown', function (e) {
            if (e.keyCode === 38) {
                if (this.pug.y <= 0) return
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


    gameOver() {
        return (
            this.level.collidesWith(this.pug.bounds()) 
        );
    }

    drawScore() {
        //loc will be the location 
        const loc = { x: this.dimensions.width / 2, y: this.dimensions.height / 4 }
        this.ctx.font = "bold 50pt serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.score, loc.x, loc.y);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeText(this.score, loc.x, loc.y);
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



