const CONSTANTS = {
    ITEM_SPEED: 3,
    EDGE_BUFFER: 50,
    ITEM_SPACING: 150,
    WARM_UP_SECONDS: 1
};



export default class Level {
    constructor(dimensions) {
        this.dimensions = dimensions;

        const firstItemDistance =
            this.dimensions.width +
            (CONSTANTS.WARM_UP_SECONDS * 120 * CONSTANTS.ITEM_SPEED);

        this.items = [
            this.randomItem(firstItemDistance),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 0.5)),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 1)),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 1.5)),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 2)),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 2.5)),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 3)),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 3.5)),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 4)),
            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 4.5)),
        ];
    }

    randomItem(x) {
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER);
        const randHeight = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
        const item = {
                left: x,
                right: x + 35,
                top: randHeight - 35,
                bottom: randHeight,
                eaten: false 
        };
        return item
    }

    moveItems() {
        this.eachItem(function (item) {
            item.left -= CONSTANTS.ITEM_SPEED;
            item.right -= CONSTANTS.ITEM_SPEED;
        });

        if (this.items[0].right <= 0) {
            this.items.shift();
        }          

        if (this.items.length <= 10){
            const newX = this.dimensions.width;
            this.items.push(this.randomItem(newX));
        }

    }

    drawItems(ctx) {
        this.eachItem(function (item, idx) {

            let imagen = new Image();
            imagen.src = './src/assets/donut.png';
            ctx.drawImage(imagen, 0, 0, 512, 512, item.left, item.top, item.right-item.left, item.bottom-item.top);

            // ctx.fillStyle = "green";

            // //draw top item
            // ctx.fillRect(
            //     item.left,
            //     item.top,
            //     item.right - item.left,
            //     item.bottom - item.top
            // );

        });
    }

    eachItem(callback) {
        this.items.forEach(callback.bind(this));
    }

    animate(ctx) {
        this.drawBackground(ctx);
        this.moveItems();
        this.drawItems(ctx);
    }

    drawBackground(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    collidesWith(pug, callback) {

        const _overlap = (rect1, rect2) => {

            if (rect1.left > rect2.right || rect1.right < rect2.left) {
                return false;
            }

            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
                return false;
            }
            return true;
        };
        let collision = false;
        this.eachItem((item, idx, arr) => {
            if (
                //check if the pug is overlapping (colliding) with either item
                _overlap(item, pug) 
            ) { 
                arr.splice(idx, 1)
                callback();
                // const newX = this.dimensions.width;
                // this.items.push(this.randomItem(newX));
                // collision = true; 
            }
        });
        return collision;
    }

    eatenItem(pug, callback) {
        this.eachItem((item) => {
            if (item.right < pug.left) {
                if (!item.eaten) {
                    item.eaten = true;
                    callback();
                }
            }
        });
    }
}