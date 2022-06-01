class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        this.load.image('blue_background', 'assets/blue_background.png');
    }

    create() {
        let background = this.add.sprite(0, 0, 'blue_background');
        background.setOrigin(0, 0);
    }
}

export default TitleScene;