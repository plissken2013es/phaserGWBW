GWBW.Game = function() {};
GWBW.Game.prototype = {
    init: function(wind) {
        this.wind = wind;
        this.fadeAlpha = { value: 1 };
        
        this.entities = [];
        
        this.SOLDIER_ID     = 0;
        this.DOCTOR_ID      = 1;
        this.SCIENTIST_ID   = 2;
        this.GIRL_ID        = 3;
        this.BURDEN_ID      = 4;
        this.DOG_ID         = 5;
        this.ROBOT_ID       = 6;
        this.STATE_CALM     = 1;
        this.STATE_NERVOUS  = 2;
        this.STATE_STRESSED = 3;
        
        this.countdown = "Faltan 40 días.";
        this.day = 0;
        this.fireAmount = 0;
        this.foodAmount = 30;
        this.radioStatus = 0;
        this.radioMax = 50;
        
        this.infected       =   [false, false, false, false];   // soldier - doctor - scientist - girl
        this.infectionLevel =   [0, 0, 0, 0];
        this.sanity         =   [14, 9, 7, 6];                  // soldier - doctor - scientist - girl
        this.sanityMax      =   [15, 10, 8, 7];
        
        this.game.canvas.style.cursor = "none";
        this.game.canvas.antialias = false;
    },
    create: function() {
        // create fade object
        this.fade = this.game.add.graphics(0, 0);
        this.fade.z = 500;
        this.fade.beginFill(0x000000, this.fadeAlpha.value);
        this.fade.drawRect(0, 0, this.world.width, this.world.height);
        this.fade.endFill();
        
        // create countdown bitmapText
        this.countdownTxt = this.add.bitmapText(this.world.centerX, this.world.centerY/2, "minecraft", this.countdown, 10);
        this.countdownTxt.anchor.x = 0.5;
        this.countdownTxt.smoothed = false;
        this.countdownTxt.tint = 0xffffff;
        this.countdownTxt.align = "center";
        this.countdownTxt.z = 501;
        
        // add background
        this.add.image(0, 0, "fondo");
        
        // add music and crossfade with wind
        this.wind.fadeOut(4000);
        this.music = this.add.audio("bso", 0, true);
        this.music.onDecoded.add(this.startMusic, this);
        
        // add sound effects
        this.stepsSnd = this.add.audio("stepsSnd", 0.1, true);
        this.campfireSnd = this.add.audio("campfireSnd", 0.2, true);
        
        // add entities
        var entities = this.cache.getJSON("entities").entities;
        for (var q=0, l=entities.length; q<l; q++) {
            var e = entities[q];
            this[e.name] = this.add.sprite(e.x, e.y, e.name);
            this[e.name].z = e.z;
            for (var j=0, k=e.anims.length; j<k; j++) {
                this[e.name].animations.add(e.anims[j].name, e.anims[j].frames, e.anims[j].rate, e.anims[j].loop);
            }
            this[e.name].play(e.start);
            this[e.name].gameLink = this.game.state.getCurrentState();
            if (e.init)     this[e.name].custom_init   = GWBW.entities_methods[e.init].bind(this[e.name]);
            if (e.update)   this[e.name].custom_update = GWBW.entities_methods[e.update].bind(this[e.name]);
            if (e.onclick)  {
                this[e.name].custom_onclick            = GWBW.entities_methods[e.onclick].bind(this[e.name]);
                this.input.onDown.add(this[e.name].custom_onclick, this[e.name]);
            }
            
            this.entities.push(this[e.name]);
            if (this[e.name].custom_init) this[e.name].custom_init();
        }
        
        // launch fadeout animation
        this.add.tween(this.fadeAlpha).to({value: 0}, 2000, Phaser.Easing.Quadratic.InOut, true)
            .onComplete.add(function() {
                this.countdownTxt.text = "";
            }.bind(this));;
    },
    update: function() {
        this.crosshair.x = Math.floor(this.input.mousePointer.x - 8);
        this.crosshair.y = Math.floor(this.input.mousePointer.y - 8);
        
        for (var q=0, l=this.entities.length; q<l; q++) {
            if (this.entities[q].custom_update) this.entities[q].custom_update();
        }
        
        this.world.sort("z", Phaser.Group.SORT_ASCENDING);
    },
    render: function() {
        if (this.fadeAlpha.value) {
            this.fade.clear();
            this.fade.beginFill(0x000000, this.fadeAlpha.value);
            this.fade.drawRect(0, 0, this.world.width, this.world.height);
            this.fade.endFill();
        }
    },
    // end of mandatory functions
    startMusic: function() {
        this.music.play();
        this.music.fadeTo(6000, 0.25);
    }
};