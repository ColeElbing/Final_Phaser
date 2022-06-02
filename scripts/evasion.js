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

let game = new Phaser.Game(config);
let bg;
let ship;
let bullet;
let cursors;
let fire;
let stats;
let lastFired = 0;
let isDown = false;
let mouseX = 0;
let mouseY = 0;

function preload(){
    this.load.image('ship1','assets/thrust_ship.png');
    this.load.image('ship2','assets/thrust_ship2.png');
    this.load.image('background','assets/space.jpg');
    this.load.image('bullet', 'assets/bullet1.png')
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
    
    //------------------Bullet firing code------------------
    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.incX = 0;
            this.incY = 0;
            this.lifespan = 0;

            this.speed = Phaser.Math.GetSpeed(600, 1);
        },

        fire: function (x, y)
        {
            this.setActive(true);
            this.setVisible(true);

            //  Bullets fire from the middle of the screen to the given x/y
            this.setPosition(ship.x, ship.y);

            var angle = Phaser.Math.Angle.Between(x, y, ship.x, ship.y);

            this.setRotation(angle);

            this.incX = Math.cos(angle);
            this.incY = Math.sin(angle);

            this.lifespan = 1000;
        },

        update: function (time, delta)
        {
            this.lifespan -= delta;

            this.x -= this.incX * (this.speed * delta);
            this.y -= this.incY * (this.speed * delta);

            if (this.lifespan <= 0)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    bullets = this.add.group({
        classType: Bullet,
        maxSize: 50,
        runChildUpdate: true
    });


    //------------------End bullet firing code------------------


    this.input.on('pointerdown', function (pointer) {

        isDown = true;
        mouseX = pointer.x;
        mouseY = pointer.y;

    });

    this.input.on('pointermove', function (pointer) {

        mouseX = pointer.x;
        mouseY = pointer.y;

    });

    this.input.on('pointerup', function (pointer) {

        isDown = false;

    });
}

function update(time, delta){
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

    if (isDown && time > lastFired)
    {
        bullet = bullets.get();

        if (bullet)
        {
            bullet.fire(mouseX, mouseY);

            lastFired = time + 50;
        }
    }
}