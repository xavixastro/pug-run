/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _pug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pug */ \"./src/pug.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\n\nclass Game {\n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.background = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        this.registerEvents();\n        this.restart();\n\n        //instructions\n        this.drawInstructions = this.drawInstructions.bind(this);\n        this.drawInstructions();\n\n        //scrolling background\n        this.img = document.getElementById(\"background-img\");\n        this.vel = 241; //pixels per second\n        this.distance = 0;\n        this.lastFrameRepaintTime = 0;\n        this.calculateDistance = this.calculateDistance.bind(this);\n        this.drawBackground = this.drawBackground.bind(this);\n\n    }\n\n\n\n    drawInstructions(){\n\n        let ground = new Image();\n        ground.src = './src/assets/ground.jpg';\n        this.background.drawImage(ground, 0, 0);\n\n        let pug = new Image();\n        pug.src = './src/assets/pug.png';\n        this.background.drawImage(pug, 100, 300);\n\n        this.ctx.font = \"bold 100pt Permanent Marker\";\n        this.ctx.fillStyle = \"#EBC489\";\n        this.ctx.fillText(\"PUG RUN\", 100, 200);\n        this.ctx.strokeStyle = \"#3D2F26\";\n        this.ctx.lineWidth = 2;\n        this.ctx.strokeText(\"PUG RUN\", 100, 200);\n\n        let apple = new Image();\n        apple.src = './src/assets/apple.png';\n        let donut = new Image();\n        donut.src = './src/assets/donut.png';\n        let bone = new Image();\n        bone.src = './src/assets/bone.png';\n        let garlic = new Image();\n        garlic.src = './src/assets/garlic.png';\n        let broccoli = new Image();\n        broccoli.src = './src/assets/broccoli.png';\n        let lemon = new Image();\n        lemon.src = './src/assets/lemon.png';\n\n\n        this.ctx.font = \"bold 16pt Rock Salt\";\n        this.ctx.fillStyle = \"white\";\n\n        this.ctx.fillText(\"Use ⬆⬇ to move your pug\", 400, 300);\n        this.ctx.fillText(\"Eat your favorite foods\", 400, 350);\n        this.ctx.fillText (\"to make points:\", 400, 400);\n\n\n        this.ctx.drawImage(apple, 400, 425, 40, 40)\n        this.ctx.drawImage(bone, 450, 425, 40, 40)\n        this.ctx.drawImage(donut, 500, 425, 40, 40)\n\n        this.ctx.fillText(\"Avoid eating:\", 400, 500);\n        this.ctx.drawImage(garlic, 400, 525, 40, 40)\n        this.ctx.drawImage(broccoli, 450, 525, 40, 40)\n        this.ctx.drawImage(lemon, 500, 525, 40, 40)\n\n\n        this.ctx.font = \"bold 20pt Rock Salt\";\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillText(\"Press Enter to start\", 350, 700);\n\n        requestAnimationFrame(this.drawInstructions);\n    }\n\n\n    restart(){\n        this.running = false;\n        this.score = 0;\n        this.lives = 3;\n        this.level = new _level__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n        this.pug = new _pug__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.dimensions);\n        this.animate();\n    }\n\n    animate(){\n        this.level.animate(this.ctx);\n        this.pug.animate(this.ctx);\n\n        this.checkCollision();\n\n\n        this.drawScore();\n        this.drawLives();\n\n        if (this.lives <= 0) {\n            this.drawLives();\n            this.drawGameOver();\n        }\n        \n        if (this.running) {\n            requestAnimationFrame(this.animate.bind(this));\n        }\n    }\n\n    play(){\n        this.startBackground();\n        this.running = true;\n        this.animate();\n    }\n\n    stop(){\n        this.restart();\n        this.drawInstructions();\n    }\n\n\n    registerEvents() {\n        addEventListener('keydown', function (e) {\n            if (e.keyCode === 38) {\n                this.pug.moveUp();\n            }\n            if (e.keyCode === 40) {\n                this.pug.moveDown();\n            }\n            if (e.keyCode === 13) {\n                if (!this.running) {\n                    this.play();\n                }\n            }\n            if (e.keyCode === 81) {\n                this.stop();\n            }\n\n        }.bind(this))\n        addEventListener('keyup', function (e) {\n            if (e.keyCode === 38 || e.keyCode === 40) {\n                this.pug.moveStraight();\n            }\n        }.bind(this))\n    }\n\n\n    checkCollision() {\n        return (\n            this.level.collidesWith(this.pug.bounds(), (eatable) => {\n                if (eatable) {\n                    this.likeSound = new sound(\"./src/assets/chew.mp3\");\n                    this.likeSound.play();\n                    this.score += 1;\n                } else {\n                    this.dislikeSound = new sound(\"./src/assets/dislike.mp3\");\n                    this.dislikeSound.play();\n                    this.lives -= 1;\n                }\n            }) \n        );\n    }\n\n    drawScore() { \n        if (!this.running) return;\n        const loc = { x: this.dimensions.width / 20, y: this.dimensions.height / 10 }\n        this.ctx.font = \"bold 50pt Permanent Marker\";\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillText(this.score, loc.x, loc.y);\n        this.ctx.strokeStyle = \"black\";\n        this.ctx.lineWidth = 2;\n        this.ctx.strokeText(this.score, loc.x, loc.y);\n    }\n\n    drawLives() {\n        const loc = { x: this.dimensions.width / 40, y: this.dimensions.height / 7 }\n        let blackPaw = new Image();\n        let redPaw = new Image();\n        blackPaw.src = './src/assets/black-paw.png';\n        redPaw.src = './src/assets/red-paw.png';\n        let paws \n        if (this.lives === 3) {\n            paws = [blackPaw, blackPaw, blackPaw]\n        } else if (this.lives === 2) {\n            paws = [blackPaw, blackPaw, redPaw]\n        } else if (this.lives === 1) {\n            paws = [blackPaw, redPaw, redPaw]\n        } else if (this.lives <= 0) {\n            paws = [redPaw, redPaw, redPaw]\n        }\n\n        this.ctx.drawImage(paws[0], 0, 0, 512, 512, loc.x, loc.y, 35, 35);\n        this.ctx.drawImage(paws[1], 0, 0, 512, 512, loc.x + 40, loc.y, 35, 35);\n        this.ctx.drawImage(paws[2], 0, 0, 512, 512, loc.x + 80, loc.y, 35, 35);\n        \n    }\n\n    drawGameOver() {\n        const loc = { x: this.dimensions.width / 4, y: this.dimensions.height / 3 }\n        this.ctx.font = \"bold 50pt Permanent Marker\";\n        this.ctx.fillStyle = \"red\";\n        this.ctx.fillText(\"GAME OVER\", loc.x, loc.y);\n        this.ctx.strokeStyle = \"black\";\n        this.ctx.lineWidth = 2;\n        this.ctx.strokeText(\"GAME OVER\", loc.x, loc.y);\n\n        this.ctx.font = \"bold 30pt Permanent Marker\";\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillText(\"Press q to continue\", loc.x, loc.y+200);\n        this.ctx.strokeStyle = \"black\";\n        this.ctx.lineWidth = 2;\n        this.ctx.strokeText(\"Press q to continue\", loc.x, loc.y+200);\n\n\n        this.level.items = undefined;\n    }\n\n\n    //Scrolling background\n\n    calculateDistance(time) {\n        let frameGapTime = time - this.lastFrameRepaintTime;\n        this.lastFrameRepaintTime = time;\n        let translateX = this.vel * (frameGapTime / 1000);\n        return translateX;\n    }\n\n    drawBackground(time) {\n        this.distance -= this.calculateDistance(time);\n        if (this.distance < -this.img.width) {\n            this.distance = 0;\n        }\n        this.background.clearRect(0, 0, this.background.width, this.background.height);\n        this.background.save();\n        this.background.translate(this.distance, 0);\n        this.background.drawImage(this.img, 0, 0);\n        this.background.drawImage(this.img, this.img.width, 0);\n\n\n        requestAnimationFrame(this.drawBackground);\n\n        this.background.restore();\n    }\n\n    startBackground() {\n        this.lastFrameRepaintTime = window.performance.now();\n        requestAnimationFrame(this.drawBackground);\n    }\n\n\n}\n\n//Sound constructor\nfunction sound(src) {\n    this.sound = document.createElement(\"audio\");\n    this.sound.src = src;\n    this.sound.setAttribute(\"preload\", \"auto\");\n    this.sound.setAttribute(\"controls\", \"none\");\n    this.sound.style.display = \"none\";\n    document.body.appendChild(this.sound);\n    this.play = function () {\n        this.sound.play();\n    }\n    this.stop = function () {\n        this.sound.pause();\n    }\n}\n\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById(\"game-canvas\");\n    new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n})\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n    ITEM_SPEED: 4,\n    EDGE_BUFFER: 50,\n    ITEM_SPACING: 150,\n};\n\nconst GOOD_ITEMS = ['./src/assets/apple.png', './src/assets/donut.png', './src/assets/bone.png' ]\nconst BAD_ITEMS = ['./src/assets/broccoli.png', './src/assets/garlic.png', './src/assets/lemon.png']\n\n\n\nclass Level {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n\n        const firstItemDistance =\n            this.dimensions.width +\n            (120 * CONSTANTS.ITEM_SPEED);\n\n        this.items = [\n            this.randomItem(firstItemDistance),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 0.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 1)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 1.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 2)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 2.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 3)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 3.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 4)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 4.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 5.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 6)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 6.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 7)),\n        ];\n    }\n\n    randomItem(x) {\n        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER);\n        const randHeight = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;\n        const eatable = Math.random() >= 0.5;\n        let item;\n        if (eatable) {\n            item = {\n                left: x,\n                right: x + 35,\n                top: randHeight - 35,\n                bottom: randHeight,\n                eatable: true,\n                img: GOOD_ITEMS[Math.floor(Math.random() * GOOD_ITEMS.length)]\n            };\n        } else {\n            item = {\n                left: x,\n                right: x + 35,\n                top: randHeight - 35,\n                bottom: randHeight,\n                eatable: false,\n                img: BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)]\n            };\n        }\n        return item\n    }\n\n    moveItems() {\n\n        this.eachItem(function (item) {\n            item.left -= CONSTANTS.ITEM_SPEED;\n            item.right -= CONSTANTS.ITEM_SPEED;\n        });\n\n        if (this.items[0].right <= 0) {\n            this.items.shift();\n        }          \n\n        if (this.items.length < 15){\n            const newX = this.dimensions.width;\n            this.items.push(this.randomItem(newX));\n        }\n\n    }\n\n    drawItems(ctx) {\n\n        this.eachItem(function (item, idx) {\n\n            let imagen = new Image();\n            imagen.src = item.img;\n            ctx.drawImage(imagen, 0, 0, 520, 520, item.left, item.top, item.right-item.left, item.bottom-item.top);\n\n        });\n    }\n\n    eachItem(callback) {\n        if (this.items === undefined) return;\n\n        this.items.forEach(callback.bind(this));\n    }\n\n    animate(ctx) {\n        if (this.items === undefined) return;\n\n        this.moveItems();\n        this.drawItems(ctx);\n    }\n\n    drawBackground(ctx) {\n        ctx.fillStyle = \"green\";\n        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n    }\n\n    collidesWith(pug, callback) {\n\n        const _overlap = (rect1, rect2) => {\n\n            if (rect1.left > rect2.right || rect1.right < rect2.left) {\n                return false;\n            }\n\n            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {\n                return false;\n            }\n            return true;\n        };\n        let collision = false;\n        this.eachItem((item, idx, arr) => {\n            if (\n                //check if the pug is overlapping with item\n                _overlap(item, pug) \n            ) { \n                arr.splice(idx, 1)\n                // const newX = this.dimensions.width;\n                // this.items.push(this.randomItem(newX));\n                if (item.eatable) { \n                    callback(true); \n                }\n                else {\n                    callback(false);\n                }\n                // collision = true; \n            }\n        });\n        return collision; \n    }\n\n    eatenItem(pug, callback) {\n        this.eachItem((item) => {\n            if (item.right < pug.left) {\n                if (!item.eaten) {\n                    item.eaten = true;\n                    callback();\n                }\n            }\n        });\n    }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/pug.js":
/*!********************!*\
  !*** ./src/pug.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Pug; });\nclass Pug {\n\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.x = this.dimensions.width / 2;\n        this.y = this.dimensions.height / 1.5;\n        this.vel = 0;\n        this.idx = 1;\n        this.up = false;\n        this.down = false;\n    }\n\n    animate(ctx) {\n        this.idx += 1;\n        if (this.idx === 35) {this.idx = 1}\n        this.drawPug(ctx);\n    }\n\n    drawPug(ctx){\n        let imagen = new Image();\n\n        if (this.up === false && this.down === false) {\n\n            \n            imagen.src = './src/assets/sprite-straight.png';\n\n            if (this.idx <= 7) {\n                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 7 && this.idx <= 14) {\n                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 14 && this.idx <= 21) {\n                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 21 && this.idx <= 28) {\n                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 28) {\n                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);\n            }\n\n\n        } else if (this.up === true) {\n\n            //keep pug inbounds\n            if (this.y > -25) {this.y -= 4;}\n\n            imagen.src = './src/assets/sprite-up.png';\n\n            if (this.idx <= 7) {\n                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 7 && this.idx <= 14) {\n                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 14 && this.idx <= 21) {\n                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 21 && this.idx <= 28) {\n                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 28) {\n                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);\n            }\n\n\n        } else if (this.down === true) {\n\n            //keep pug inbounds\n            if (this.y < this.dimensions.height - 100) { this.y += 4}           \n\n            imagen.src = './src/assets/sprite-down.png';\n\n            if (this.idx <= 7) {\n                ctx.drawImage(imagen, 75, 55, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 7 && this.idx <= 14) {\n                ctx.drawImage(imagen, 75, 365, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 14 && this.idx <= 21) {\n                ctx.drawImage(imagen, 75, 675, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 21 && this.idx <= 28) {\n                ctx.drawImage(imagen, 75, 985, 142, 108, this.x, this.y, 142, 108);\n            } else if (this.idx > 28) {\n                ctx.drawImage(imagen, 75, 1295, 142, 108, this.x, this.y, 142, 108);\n            }\n\n\n        } \n\n    }\n\n\n    moveUp(){\n        this.up = true;\n    }\n\n    moveDown(){\n        this.down = true;\n    }\n\n    moveStraight(){\n        this.up = false;\n        this.down = false;\n    }\n\n\n    bounds() {\n        return {\n            //define bounds for items collision\n            left: this.x + 60,\n            right: this.x + 60 + 50,\n            top: this.y + 45,\n            bottom: this.y + 45 + 45\n        };\n    }\n\n\n }\n\n\n//# sourceURL=webpack:///./src/pug.js?");

/***/ })

/******/ });