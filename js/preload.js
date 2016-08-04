var GWBW = {};

GWBW.Preload = function() {};
GWBW.Preload.prototype = {
    init: function() {
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.time.desiredFps = 60;
    },
    preload: function() {
        this.load.path = "media/fonts/";
        this.load.bitmapFont("fipps");
        this.load.bitmapFont("minecraft");
        
        this.load.path = "media/sounds/";
        this.load.audio("wind", ["wind1.ogg", "wind1.mp3"]);
        this.load.audio("bso", ["watching4.ogg", "watching4.mp3"]);
        
        this.load.path = "media/";
        this.load.image("splash", "splash.jpg");
        this.load.images(["fondo", "titulo"]);
    },
    create: function() {
        this.state.start("GWBW.Introduction");
    }
};