//Scenes
var gameScene = new Phaser.Scene("game");
var titleScene = new Phaser.Scene("title");

//Variables

// ----- gameScene Code -----
gameScene.init = function() {

};

gameScene.preload = function() {

};

gameScene.create = function() {

};

gameScene.update = function() {

};


gameScene.end = function() {

};

//------ titleScene Code -----
titleScene.preload = function() {
    this.load.image('sky', 'assets/sky.png');
};

titleScene.create = function() {
    this.add.image(400, 300, 'sky');
};


// ----- Stuff -----
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
};

var game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

game.scene.start('titleScene');