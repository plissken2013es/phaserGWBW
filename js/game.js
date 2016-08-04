GWBW.Game = function() {};
GWBW.Game.prototype = {
    init: function(wind) {
        this.wind = wind;
        this.fadeAlpha = { value: 1 };
        
        this.entities = [];
        this.buttons = {};
        
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
        
        this.numActions = 5;
        this.isOver = false;
        this.options = [];
        
        this.medicines = 1;
        this.ammo = 26;
        this.dialogues = [
            [
                'No subestimes el hambre, mantén el campamento provisto de comida \n y seremos capaces de afrontar cualquier amenaza.', 
                'Marvin es un cazador excelente, pero donde se ponga un rifle... \n En cualquier caso: adoro a este perro.', 
                'Somos demasiadas bocas. Nuestras provisiones no durarán mucho.', 
                'No pierdas de vista la munición: no sólo sirve para cazar, \n también para defendernos de las amenazas.', 
                'El perro se llama Marvin por un camarada que perdí \n en los campos de hidrofósforo, fue una batalla brutal...',
                'Sé que hay alimañas al acecho, \n somos un plato demasiado apetitoso para ellas...',
                '¿Y ahora...? Ahora vamos a esperar... \n a ver qué pasa...',
                'Entre nosotros; ese científico cabrón me da mala espina.'
            ],
            [
                'Estamos demasiado expuestos al virus Medusea aquí. Mantente alerta, \n si algunos de nosotros se paraliza, morirá en 3 días.', 
                'Creo que alguien infectado por el virus Medusea se congela \n a nivel fisiológico y no necesita comida ni atención psicológica.', 
                'Es un cigarro digital infinito: es inofensivo \n y sabe igual que los de antes.', 
                'Los cadáveres infectados por el virus Medusea son altamente \n contagiosos. Deberíamos quemarlos si llega el momento.', 
                'Espero que en caso de emergencia el perro caiga \n antes que un humano, ¿no?',
                'El tabaco me ayuda a estar entretenido y, de paso, \n me olvido del hambre.',
                'Si llega la hora de la verdad... mejor vosotros \n antes que yo.',
                'Si estoy fuera una película americana de los 90 \n yo sería el primero en morir. Soy un arquetipo.'
            ],
            [
                'Puedo trabajar en la radio, pero creo que llevará unos \n 15 días arreglarla.', 'Soldado, Doctor, Yo y Sarah: ése es el orden de las \n lecturas psicológicas de BR4ND-0N. Cuanto mayores las bajas, peor.', 
                'Sarah y yo llevamos casados 7 años, ella es genial. \n Seguro que nos ayudará a superar esto.', 
                'Si tienes que tomar una decisión difícil, llévame antes que a ella, \n por favor. BR4ND-0N puede continuar mi trabajo perfectamente.', 
                'Sé que no le caigo bien al Soldado, \n espero que no haga nada estúpido...',
                'Mis análisis indican que tenemos pocas probabilidades \n de salir todos con vida de ésta.',
                'Usted es el líder, Burden, debe decidir.',
                'En cuanto salgamos de esta roca absurda, me voy a comer \n una hamburguesa triple de buey de Kobe.'
            ],
            [
                'Confiamos en usted, Sargento. La moral es crucial en estos casos. \n Intente mantener la moral del equipo hablando con ellos.', 
                'Si alguien del grupo muere, la moral descenderá drásticamente. \n Dependiendo de quien sea, unos se verán más afectados que otros.', 
                'No dejes que muera Marvin, todos lo queremos mucho. \n Sería un duro golpe para la moral del campamento.', 
                'Donald no es muy carismático, pero tiene un gran corazón.', 
                'Este libro habla sobre un chico que liberó la antigua Tierra \n con solo un ordenador. Se titula: "La Leyenda del Keymasher".',
                'Una reunión conmigo en situaciones límite puede levantar la moral. \n Sin embargo, la sesión lleva un rato.',
                'No hay mucho más que hacer en esta roca que leer, \n ¿no cree?'
            ],
            [
                'Una hoguera que debe durar 40 días, ¿eh? \n Lo tomaré como una metáfora. No sucumbiremos.', 
                '¿Debería guardarme una bala para mí? \n Venga, no pienses en eso...', 
                'El perro parece sabroso...', 
                'El Ingeniero está muy gordo, podría convertirse en un montón \n de comida.', 
                'Las piezas de BR4ND-0N podrían usarse para recargar \n la munición láser.', 
                'Esta zona esta habitada por depredadores. \n Deberíamos ahorrar munición para repelerlos.', 
                'Si escapo de este planeta, me apuntaré a la próxima Ludum Dare.', 
                'Estoy cansado de comer carne. Unos buenos "cachelos" estarían genial.'
            ]
        ];
        this.dialoguesIndex = [0, 0, 0, 0, 0];
        this.spokenTo = [false, false, false, false, false]; // soldier - doctor - scientist - girl
        this.numSurvivors = 5;
        this.rationsNeeded = 6;
        this.infected = [false, false, false, false, false]; // soldier - doctor - scientist - girl
        this.infectionLevel = [0, 0, 0, 0, 0];
        
        this.MEMBER_WEIGHT = [17, 15, 21, 12, 0, 30, 10];
        this.MORALE_PUNCH = [
              [-100,    -1,     0,      -2],
              [-3,      -100,   -1,     -1],
              [1,       -1,     -100,   -3],
              [-2,      -1,     -3,      -100],
              [0,      0,     0,      0],       // burden
              [0,       -3,     -2,      0],
              [-3,      -2,     -1,      -1]
        ];
        this.CREW_ENTITIES = [
            "soldier",
            "doctor",
            "scientist",
            "girl",
            "burden",
            "dog",
            "robot"
        ];
        
        this.game.canvas.style.cursor = "none";
        this.game.canvas.antialias = false;
    },
    create: function() {
        // shuffle dialogues
        for (var q=0; q<4; q++) {
            this.dialogues[q] = Phaser.ArrayUtils.shuffle(this.dialogues[q]);
        }
        
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
        this.countdownTxt.z = 550;
        
        // create actions bitmapText
        this.actionsTxt = this.add.bitmapText(this.world.width - 40, this.world.height - 15, "minecraft", "Acciones: " + this.numActions, 10);
        this.actionsTxt.anchor.x = 0.5;
        this.actionsTxt.smoothed = false;
        this.actionsTxt.tint = 0xffffff;
        this.actionsTxt.align = "center";
        this.actionsTxt.z = 551;
        
        // create hover bitmapText
        this.hoverTxt = this.add.bitmapText(this.world.centerX, this.world.centerY/2, "minecraft", "", 10);
        this.hoverTxt.anchor.x = 0.5;
        this.hoverTxt.smoothed = false;
        this.hoverTxt.tint = 0xffffff;
        this.hoverTxt.align = "center";
        this.hoverTxt.z = 400;
        
        // add background
        this.add.image(0, 0, "fondo");
        
        // add music and crossfade with wind
        this.wind.fadeOut(4000);
        this.music = this.add.audio("bso", 0, true);
        this.music.onDecoded.add(this.startMusic, this);
        
        // add sound effects
        this.stepsSnd = this.add.audio("stepsSnd", 0.1, true);
        this.campfireSnd = this.add.audio("campfireSnd", 0.2, true);
        this.laserSnd = this.add.audio("laserSnd", 0.4);
        
        // add entities
        this.addEntities();
        
        // create actions
        this.createActions();
        
        // launch fadeout animation
        this.add.tween(this.fadeAlpha).to({value: 0}, 2000, Phaser.Easing.Quadratic.InOut, true)
            .onComplete.add(function() {
                this.countdownTxt.text = "";
            }, this);
    },
    update: function() {
        this.crosshair.x = Math.floor(this.input.mousePointer.x - 8);
        this.crosshair.y = Math.floor(this.input.mousePointer.y - 8);
        this.hoverTxt.x = this.crosshair.x + 8;
        this.hoverTxt.y = this.crosshair.y - 12;
        
        // update entities
        for (var q=0, l=this.entities.length; q<l; q++) {
            if (this.entities[q].custom_update) this.entities[q].custom_update();
        }
        
        // manage options displayed on screen, if they exist
        for (q=0, l=this.options.length; q<l; q++) {
            this.options[q].txt.tint = 0x00ff00;
        }
        for (q=0, l=this.options.length; q<l; q++) {
            if (!this.isOver && this.day < 40 && this.numActions > 0 && this.dialogbox.y <= -this.dialogbox.height/2 && this.options.length && this.options[q].img.overlap(this.crosshair)) {
                this.options[q].txt.tint = 0xffff00;
                if (this.options.length && this.input.mousePointer.isDown && this.optionsEntity && this.optionsEntity.tweenFinished) {
                    this.options[q].txt.action.call(this);
                }
                break;
            }
        }
        
        // destroy options, if user clicks on an empty zone of screen
        if (this.options.length && this.input.mousePointer.isDown && this.optionsEntity && this.optionsEntity.tweenFinished) {
            this.optionsEntity.destroy();
            
            var timerTmp = this.time.create(false);
            timerTmp.add(500, function() {
                this.optionsEntity = null;
            }, this);
            timerTmp.start();
        }
        // manage actions
        for (var prop in this.buttons) {
            var btn = this.buttons[prop];
            this.hoverTxt.text = "";
            if (!this.isOver && this.day < 40 && this.numActions > 0 && this.dialogbox.y <= -this.dialogbox.height/2 && !this.options.length && btn.overlap(this.crosshair)) {
                if (!this.options.length && this.input.mousePointer.isDown && !this.optionsEntity) {
                    this.optionsEntity = new GWBW.Option(this, btn);
                    this.optionsEntity.createOptionsFor(btn);
                }
                this.hoverTxt.text = btn.hoverTxt;
                break;
            }
        }
        
        // update actions text
        this.actionsTxt.text = "Acciones: " + this.numActions;
        
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
    addEntities: function() {
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
    },
    createActions: function() {
        var actionData = this.cache.getJSON("actions");
        for (var q=0; q<actionData.length; q++) {
            var action = this.formatActionObject(actionData[q]);
            this[action._name] = this.add.image(action.x, action.y);
            this[action._name].width = action.config.size.x;
            this[action._name].height = action.config.size.y;
            this[action._name].hoverTxt = action.config.hoverTxt;
            this[action._name].options = [];
            for (var j=0; j<action.config.options.length; j++) {
                this[action._name].options.push(action.config.options[j]);
            }
            if (action.infections) {
                this[action._name].infections = [];
                for (j=0; j<action.config.infections.length; j++) {
                    this[action._name].infections.push(action.config.infections[j]);
                }
            }
            this[action._name].gameLink = this.game.state.getCurrentState();
            this[action._name].z = 250 + q;
            
            this.buttons[action._name] = this[action._name];
        }
    },
    formatActionObject: function(obj) {
        var options = obj.config.options;
        for (var q=0; q<options.length; q++) {
            options[q].action = GWBW.action_methods[options[q].action].bind(this);
        }
        var infections = obj.config.infections;
        if (infections) {
            for (q=0; q<infections.length; q++) {
                infections[q].action = GWBW.action_methods[infections[q].action].bind(this, infections[q].cost);
            }
        }
        return obj;
    },
    shootCrew: function(id) {
        this.burden.play("shoot");
        this.laserSnd.play();

        var member = this[this.CREW_ENTITIES[id]];
        member.play("die");
        
        var name = this.CREW_ENTITIES[id] + "Action";
        var action = this[name];
        delete this.buttons[name];
        action.destroy();

        // gain food or bullets
        if (id == this.ROBOT_ID) {
            this.ammo += this.MEMBER_WEIGHT[id];
        } else {
            this.foodAmount += this.MEMBER_WEIGHT[id];
        }

        this.sufferMoralePunch(id);

        this.rationsNeeded --;
        this.numActions --;
        this.numSurvivors --;
    },
    sufferMoralePunch: function(id) {
        var moralePunch = this.MORALE_PUNCH[id];
        for (var q=0; q<4; q++) {
            if (moralePunch[q] == -100) {
                this.sanity[q] = -100;
            } else {
                this.sanity[q] += moralePunch[q];
            }
        }
    },
    startMusic: function() {
        this.music.play();
        this.music.fadeTo(6000, 0.25);
    },
    tweenDialog: function(pos, time, callback) {
        time = time * 1000;
        var anim = this.add.tween(this.dialogbox);
        anim.to({y: pos.y}, time, Phaser.Easing.Quadratic.Out);
        if (callback) {
            anim.onComplete.add(callback, this);
        }
        this.dialogbox.isAnimated = true;
        anim.start();
    }
};