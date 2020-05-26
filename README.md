# Pug Run

Pug Run is an interactive JavaScript and HTML5 Canvas game where you play as a pug
who tries to eat some of his favorite items (donuts, apples, bones). Make sure to 
avoid eating the items that your pug doesn't like! (onios, broccoli, lemons).
You lose if you eat 3 unwanted items.  

## Demo

You can access the live demo here: [Pug Run Live](https://xavixastro.github.io/pug-run/)

![Alt Text](https://github.com/xavixastro/pug-run/blob/master/src/assets/pug-run-capture.gif)

## Technologies Used

* JavaScript
* HTML5
* CSS3
  
## Technical implementation details and code snippets

In order to generate a random item, I implemented the following function that will 
take an X position and randomly generate a Y position based on the canvas dimensions.
By using *Math.random*, I make sure to properly generate both eatable and uneatable items.  
I assign a random image to each item depending on their eatable property, which will 
later be used by the *collidesWith* function to either add points or deduct lives.

```javascript
    randomItem(x) {
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER);
        const randHeight = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
        const eatable = Math.random() >= 0.5;
        let item;
        if (eatable) {
            item = {
                left: x,
                right: x + 35,
                top: randHeight - 35,
                bottom: randHeight,
                eatable: true,
                img: GOOD_ITEMS[Math.floor(Math.random() * GOOD_ITEMS.length)]
            };
        } else {
            item = {
                left: x,
                right: x + 35,
                top: randHeight - 35,
                bottom: randHeight,
                eatable: false,
                img: BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)]
            };
        }
        return item
    }
```

## Future features

* Support multiple characters and backgrounds. 
* Different difficulty level.







