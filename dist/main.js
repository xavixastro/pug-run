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

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction Board() {\n\n}\n\nBoard.prototype.draw = function(ctx){\n\n    let imagen = new Image()\n    imagen.src = '../src/assets/grass.jpeg'\n    imagen.onload = function () {\n        ctx.drawImage(imagen, 10, 10);\n    };\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _pug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pug */ \"./src/pug.js\");\n/* harmony import */ var _level__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./level */ \"./src/level.js\");\n\n\n\n\n\n\nclass Game {\n    constructor(canvas) {\n        this.ctx = canvas.getContext(\"2d\");\n        this.dimensions = { width: canvas.width, height: canvas.height };\n        this.registerEvents();\n        this.restart();\n\n    }\n\n    restart(){\n        this.running = false;\n        this.score = 0;\n        this.level = new _level__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.dimensions);\n        this.pug = new _pug__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.dimensions);\n        this.animate();\n    }\n\n    animate(){\n        this.level.animate(this.ctx);\n        this.pug.animate(this.ctx);\n\n        if (this.gameOver()) {\n            alert(\"OVER\");\n            this.restart();\n        }\n\n        //we see if they have scored a point by passing a pipe\n        this.level.passedItem(this.pug.bounds(), () => {\n            this.score += 1;\n            console.log(this.score);\n        });\n\n        //and draw the score\n        this.drawScore();\n        \n        if (this.running) {\n            requestAnimationFrame(this.animate.bind(this));\n        }\n    }\n\n    play(){\n        this.running = true;\n        this.animate();\n    }\n\n\n    registerEvents() {\n        addEventListener('keydown', function (e) {\n            if (e.keyCode === 38) {\n                if (this.pug.y <= 0) return\n                this.pug.moveUp();\n            }\n            if (e.keyCode === 40) {\n                if (this.pug.y >= this.dimensions.height - 30) return\n                this.pug.moveDown();\n            }\n            if (e.keyCode === 32) {\n                if (!this.running) {\n                    this.play();\n                }\n            }\n\n        }.bind(this))\n    }\n\n\n    gameOver() {\n        return (\n            this.level.collidesWith(this.pug.bounds()) \n        );\n    }\n\n    drawScore() {\n        //loc will be the location \n        const loc = { x: this.dimensions.width / 2, y: this.dimensions.height / 4 }\n        this.ctx.font = \"bold 50pt serif\";\n        this.ctx.fillStyle = \"white\";\n        this.ctx.fillText(this.score, loc.x, loc.y);\n        this.ctx.strokeStyle = \"black\";\n        this.ctx.lineWidth = 2;\n        this.ctx.strokeText(this.score, loc.x, loc.y);\n    }\n\n\n\n    // start(){\n    //     this.board.draw(this.ctx);\n    //     this.pug.draw(this.ctx);\n    // }\n\n    // draw(){\n    //     this.ctx.fillStyle = \"peru\";\n    //     this.ctx.fillRect(0, 0, 800, 800);\n    //     let image = new Image();\n    //     image.src = '../src/assets/pug.gif';\n    //     image.onload = function () {\n    //         this.ctx.drawImage(image, 10, 10);\n    //     }.bind(this);\n    // }\n}\n\n\n\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\nwindow.addEventListener(\"DOMContentLoaded\", () => {\n    const canvas = document.getElementById(\"game-canvas\");\n    const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](canvas);\n    // game.restart();\n    // game.draw();\n})\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/level.js":
/*!**********************!*\
  !*** ./src/level.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Level; });\nconst CONSTANTS = {\n    ITEM_SPEED: 2,\n    EDGE_BUFFER: 50,\n    ITEM_SPACING: 150,\n    WARM_UP_SECONDS: 1\n};\n\n\n\nclass Level {\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n\n        const firstItemDistance =\n            this.dimensions.width +\n            (CONSTANTS.WARM_UP_SECONDS * 120 * CONSTANTS.ITEM_SPEED);\n\n        this.items = [\n            this.randomItem(firstItemDistance),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 0.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 1)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 1.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 2)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 2.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 3)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 3.5)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 4)),\n            this.randomItem(firstItemDistance + (CONSTANTS.ITEM_SPACING * 4.5)),\n        ];\n    }\n\n    randomItem(x) {\n        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER);\n        const randHeight = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;\n        const item = {\n                left: x,\n                right: x + 50,\n                top: randHeight - 50,\n                bottom: randHeight,\n                eaten: false \n        };\n        return item\n    }\n\n    moveItems() {\n        this.eachItem(function (item) {\n            item.left -= CONSTANTS.ITEM_SPEED;\n            item.right -= CONSTANTS.ITEM_SPEED;\n        });\n\n        if (this.items[0].right <= 0) {\n            this.items.shift();\n        }          \n\n        if (this.items.length !== 10){\n            const newX = this.dimensions.width;\n            this.items.push(this.randomItem(newX));\n        }\n\n    }\n\n    drawItems(ctx) {\n        this.eachItem(function (item) {\n            ctx.fillStyle = \"green\";\n\n            //draw top item\n            ctx.fillRect(\n                item.left,\n                item.top,\n                item.right - item.left,\n                item.bottom - item.top\n            );\n\n        });\n    }\n\n    eachItem(callback) {\n        this.items.forEach(callback.bind(this));\n    }\n\n    animate(ctx) {\n        this.drawBackground(ctx);\n        this.moveItems();\n        this.drawItems(ctx);\n    }\n\n    drawBackground(ctx) {\n        ctx.fillStyle = \"peru\";\n        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);\n    }\n\n    collidesWith(pug) {\n        //this function returns true if the the rectangles overlap\n        const _overlap = (rect1, rect2) => {\n            //check that they don't overlap in the x axis\n            if (rect1.left > rect2.right || rect1.right < rect2.left) {\n                return false;\n            }\n            //check that they don't overlap in the y axis\n            if (rect1.top > rect2.bottom || rect1.bottom < rect2.top) {\n                return false;\n            }\n            return true;\n        };\n        let collision = false;\n        this.eachItem((item) => {\n            if (\n                //check if the pug is overlapping (colliding) with either item\n                _overlap(item, pug) \n            ) { collision = true; }\n        });\n        return collision;\n    }\n\n    passedItem(pug, callback) {\n        this.eachItem((item) => {\n            if (item.right < pug.left) {\n                if (!item.eaten) {\n                    item.eaten = true;\n                    callback();\n                }\n            }\n        });\n    }\n}\n\n//# sourceURL=webpack:///./src/level.js?");

/***/ }),

/***/ "./src/pug.js":
/*!********************!*\
  !*** ./src/pug.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Pug; });\nconst CONSTANTS = {\n    PUG_WIDTH: 40,\n    PUG_HEIGHT: 30\n};\n\nclass Pug {\n\n    constructor(dimensions) {\n        this.dimensions = dimensions;\n        this.x = this.dimensions.width / 2;\n        this.y = this.dimensions.height / 1.5;\n        this.vel = 0;\n\n        // this.moveUp = this.moveUp.bind(this)\n    }\n\n    animate(ctx) {\n        // this.movePug();\n        this.drawPug(ctx);\n    }\n\n    drawPug(ctx){\n        // let imagen = new Image();\n        // imagen.src = '../src/assets/pug.png';\n        // imagen.onload = function () {\n        //     ctx.drawImage(imagen, this.x, this.y);\n        // }.bind(this)\n        ctx.fillStyle = \"yellow\";\n        ctx.fillRect(this.x, this.y, 40, 30);\n    }\n\n\n    moveUp(){\n        this.y -= 12;\n    }\n\n    moveDown(){\n        this.y += 12;\n    }\n\n\n    bounds() {\n        return {\n            left: this.x,\n            right: this.x + CONSTANTS.PUG_WIDTH,\n            top: this.y,\n            bottom: this.y + CONSTANTS.PUG_HEIGHT\n        };\n    }\n\n    // outOfBounds() {\n    //     const aboveTheTop = this.y < 0;\n    //     const belowTheBottom = this.y + CONSTANTS.PUG_HEIGHT > this.dimensions.height;\n    //     return aboveTheTop || belowTheBottom;\n    // }\n\n\n\n }\n\n\n\n\n// function Pug() {\n//     this.width = 64\n//     this.height = 64\n\n// }\n\n// Pug.prototype.draw = function(ctx) {\n//     let imagen = new Image()\n//     imagen.src = '../src/assets/pug.png'\n//     imagen.onload = function () {\n//         ctx.drawImage(imagen, 0, 0);\n//     }\n// };\n\n// export default Pug;\n\n//# sourceURL=webpack:///./src/pug.js?");

/***/ })

/******/ });