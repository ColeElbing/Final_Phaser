// Our scenes
var gameScene = new Phaser.Scene("game");
var titleScene = new Phaser.Scene("title");

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

titleScene.preload = function() {
    this.load.image('sky', 'assets/sky.png');
};

titleScene.create = function() {
    var bg = this.add.sprite(0,0,'sky');
    bg.setOrigin(0,0);

    var text = this.add.text(100,100, 'Welcome To My Game!');
};

// We no longer add the scene to the config
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
};

// Our game Object
var game = new Phaser.Game(config);

// Add both scenes (it does not start them)
game.scene.add('titleScene', titleScene);
game.scene.add("game", gameScene);

// Start the title scene
game.scene.start('titleScene');