export default class Pug {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 2;
        this.y = this.dimensions.height / 1.5;
        this.vel = 0;
        this.idx = 1;
        this.up = false;
        this.down = false;
    }

    animate(ctx) {
        this.idx += 1;
        if (this.idx === 35) {this.idx = 1}
        this.drawPug(ctx);
    }

    drawPug(ctx){
        let imagen = new Image();

        //preload images
        imagen.src = './src/assets/sprite-straight.png';
        ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);

        imagen.src = './src/assets/sprite-up.png';
        ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);

        imagen.src = './src/assets/sprite-down.png';
        ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);




        if (this.up === false && this.down === false) {

            
            imagen.src = './src/assets/sprite-straight.png';

            if (this.idx <= 7) {
                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 7 && this.idx <= 14) {
                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 14 && this.idx <= 21) {
                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 21 && this.idx <= 28) {
                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 28) {
                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);
            }


        } else if (this.up === true) {

            //keep pug inbounds
            if (this.y > -25) {this.y -= 4;}

            imagen.src = './src/assets/sprite-up.png';

            if (this.idx <= 7) {
                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 7 && this.idx <= 14) {
                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 14 && this.idx <= 21) {
                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 21 && this.idx <= 28) {
                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 28) {
                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);
            }


        } else if (this.down === true) {

            //keep pug inbounds
            if (this.y < this.dimensions.height - 100) { this.y += 4}           

            imagen.src = './src/assets/sprite-down.png';

            if (this.idx <= 7) {
                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 7 && this.idx <= 14) {
                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 14 && this.idx <= 21) {
                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 21 && this.idx <= 28) {
                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);
            } else if (this.idx > 28) {
                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);
            }


        } 

    }


    moveUp(){
        this.up = true;
    }

    moveDown(){
        this.down = true;
    }

    moveStraight(){
        this.up = false;
        this.down = false;
    }


    bounds() {
        return {
            //define bounds for items collision
            left: this.x + 60,
            right: this.x + 60 + 50,
            top: this.y + 45,
            bottom: this.y + 45 + 45
        };
    }


 }
