const CONSTANTS = {
    ITEM_SPEED: 2,
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
                right: x + 50,
                top: randHeight - 50,
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

        if (this.items.length !== 10){
            const newX = this.dimensions.width;
            this.items.push(this.randomItem(newX));
        }

    }

    drawItems(ctx) {
        this.eachItem(function (item) {
            ctx.fillStyle = "green";

            //draw top item
            ctx.fillRect(
                item.left,
                item.top,
                item.right - item.left,
                item.bottom - item.top
            );

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
        ctx.fillStyle = "#3D231A";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    collidesWith(pug) {
        //this function returns true if the the rectangles overlap
        const _overlap = (rect1, rect2) => {
            //check that they don't overlap in the x axis
            if (rect1.left > rect2.right || rect1.right < rect2.left) {
                return false;
            }
            //check that they don't overlap in the y axis
            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {
                return false;
            }
            return true;
        };
        let collision = false;
        this.eachItem((item) => {
            if (
                //check if the pug is overlapping (colliding) with either item
                _overlap(item, pug) 
            ) { collision = true; }
        });
        return collision;
    }

    passedItem(pug, callback) {
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