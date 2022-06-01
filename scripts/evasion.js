var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var bg;
var ship;
var bullets;
var lastFired = 0;
var cursors;
var fire;

function preload(){
    this.load.image('ship1','assets/thrust_ship.png');
    this.load.image('ship2','assets/thrust_ship2.png');
    this.load.image('background','assets/space.jpg');
}

function create(){
    bg = this.add.image(400,300, 'background');
    bg.setScale(2);

    ship = this.physics.add.sprite(100, 450, 'ship1');
    ship.setScale(2);
    ship.setDrag(100);
    ship.setAngularDrag(200);
    ship.setMaxVelocity(300);
    ship.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
           
}

function update(){
       if (keyA.isDown)
    {
        ship.setAngularVelocity(-150);
    }
    else if (keyD.isDown)
    {
        ship.setAngularVelocity(150);
    }
    else
    {
        ship.setAngularVelocity(0);
    }

    if (keyW.isDown)
    {
        this.physics.velocityFromRotation(ship.rotation, 600, ship.body.acceleration);
    }

    else
    {
        ship.setAcceleration(0);
    }
}