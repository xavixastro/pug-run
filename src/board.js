function Board() {

}

Board.prototype.draw = function(ctx){

    let imagen = new Image()
    imagen.src = '../src/assets/grass.jpeg'
    imagen.onload = function () {
        ctx.drawImage(imagen, 10, 10);
    };

}

export default Board