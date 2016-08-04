GWBW.entities_methods = {
    planet1_update: function() {
        this.x = 170 + this.game.state.getCurrentState().day;
    },
    planet2_update: function() {
        this.x = 150 + this.game.state.getCurrentState().day * 2;
    },
    campfire_update: function() {
        var game = this.game.state.getCurrentState();
        this.play("fire" + game.fireAmount);
        if (!game.fireAmount) game.campfireSnd.stop();
    },
    radio_update: function() {
        var game = this.game.state.getCurrentState();
        if (game.radioStatus >= game.radioMax)        this.play("radio3");
        if (game.radioStatus < game.radioMax)         this.play("radio2");
        if (game.radioStatus <= game.radioMax / 3)    this.play("radio1");
    },
    meat_update: function() {
        var game = this.game.state.getCurrentState();
        if (game.foodAmount > 30)    this.play("meat4");
        if (game.foodAmount <= 30)   this.play("meat3");
        if (game.foodAmount <= 16)   this.play("meat2");
        if (game.foodAmount <= 6)    this.play("meat1");
    },
    burden_init: function() {
        this.speed = 45;
        this.target = 0;
        this.isWalking = false;
        this.flip = false;
        
        this.anchor.x = 0.5;
        this.y = this.gameLink.world.height - this.height - 15;
        this.gameLink.physics.arcade.enable(this);
    },
    burden_update: function() {
        if (this.animations.currentAnim != this.animations.shoot) {
            if (this.body.velocity.x > 0 && this.x > this.target) {
                this.body.velocity.x = 0;
            }
            if (this.body.velocity.x < 0 && this.x < this.target) {
                this.body.velocity.x = 0;
            }
            if (this.x < 39) {
                this.body.velocity.x = 0;
                this.x = 39;
            }
            if (!this.body.velocity.x) {
                this.play("idle");
            }
        } else {
            this.body.velocity.x = 0;
            if (this.frame >= 9) this.play("idle");
        }
        var flipX = this.flip ? -1 : 1;
        this.scale.set(flipX, 1);

        if (this.body.velocity.x && !this.isWalking) {
            this.gameLink.stepsSnd.play();
            this.isWalking = true;
        } else if (!this.body.velocity.x) {
            this.gameLink.stepsSnd.stop();
            this.isWalking = false;
        }
    },
    burden_onclick: function() {
        this.target = this.gameLink.input.x;
        if (this.x > this.target) {
            this.body.velocity.x = -this.speed;
            this.flip = false;
        } else {
            this.body.velocity.x = this.speed;
            this.flip = true;
        }
        this.play("walk");
    },
    doctor_update: function() {
        if (this.animations.currentAnim != this.animations.die) {
            if (this.gameLink.infected[this.gameLink.DOCTOR_ID]) {
                this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] > 7)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] <= 7) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.DOCTOR_ID] <= 4) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    },
    soldier_update: function() {
        if (this.animations.currentAnim != this.animations.die) {
            if (this.gameLink.infected[this.gameLink.SOLDIER_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] > 9)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] <= 9) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.SOLDIER_ID] <= 5) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    },
    scientist_update: function() {
        if (this.animations.currentAnim != this.animations.die) {
            if (this.gameLink.infected[this.gameLink.SCIENTIST_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] > 6)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] <= 5) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.SCIENTIST_ID] <= 3) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    },
    girl_update: function() {
        if (this.animations.currentAnim != this.animations.die) {
            if (this.gameLink.infected[this.gameLink.GIRL_ID]) {
                 this.play("infected");
            } else {
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] > 5)  this.state = this.gameLink.STATE_CALM;
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] <= 5) this.state = this.gameLink.STATE_NERVOUS;
                if (this.gameLink.sanity[this.gameLink.GIRL_ID] <= 3) this.state = this.gameLink.STATE_STRESSED;
                this.play('idle' + this.state);
            }
        }
    }
};