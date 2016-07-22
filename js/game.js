GWBW.Game = function() {};
GWBW.Game.prototype = {
    init: function(wind) {
        this.wind = wind;
        this.fadeAlpha = { value: 1 };
        
        this.entities = [];
        this.buttons = [];
        
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
                'No subestimes el hambre, mantén el campamento provisto de comida\ny seremos capaces de afrontar cualquier amenaza.', 
                'Marvin es un cazador excelente, pero donde se ponga un rifle...\nEn cualquier caso: adoro a este perro.', 
                'Somos demasiadas bocas. Nuestras provisiones no durarán mucho.', 
                'No pierdas de vista la munición: no sólo sirve para cazar,\ntambién para defendernos de las amenazas.', 
                'El perro se llama Marvin por un camarada que perdí\nen los campos de hidrofósforo, fue una batalla brutal...',
                'Sé que hay alimañas al acecho,\nsomos un plato demasiado apetitoso para ellas...',
                '¿Y ahora...? Ahora vamos a esperar...\na ver qué pasa...',
                'Entre nosotros; ese científico cabrón me da mala espina.'
            ],
            [
                'Estamos demasiado expuestos al virus Medusea aquí. Mantente alerta,\nsi algunos de nosotros se paraliza, morirá en 3 días.', 
                'Creo que alguien infectado por el virus Medusea se congela\na nivel fisiológico y no necesita comida ni atención psicológica.', 
                'Es un cigarro digital infinito: es inofensivo\ny sabe igual que los de antes.', 
                'Los cadáveres infectados por el virus Medusea son altamente\ncontagiosos. Deberíamos quemarlos si llega el momento.', 
                'Espero que en caso de emergencia el perro caiga\nantes que un humano, ¿no?',
                'El tabaco me ayuda a estar entretenido y, de paso,\nme olvido del hambre.',
                'Si llega la hora de la verdad... mejor vosotros\nantes que yo.',
                'Si estoy fuera una película americana de los 90\nyo sería el primero en morir. Soy un arquetipo.'
            ],
            [
                'Puedo trabajar en la radio, pero creo que llevará unos\n15 días arreglarla.', 'Soldado, Doctor, Yo y Sarah: ése es el orden de las\nlecturas psicológicas de BR4ND-0N. Cuanto mayores las bajas, peor.', 
                'Sarah y yo llevamos casados 7 años, ella es genial.\nSeguro que nos ayudará a superar esto.', 
                'Si tienes que tomar una decisión difícil, llévame antes que a ella,\npor favor. BR4ND-0N puede continuar mi trabajo perfectamente.', 
                'Sé que no le caigo bien al Soldado,\nespero que no haga nada estúpido...',
                'Mis análisis indican que tenemos pocas probabilidades\nde salir todos con vida de ésta.',
                'Usted es el líder, Burden, debe decidir.',
                'En cuanto salgamos de esta roca absurda, me voy a comer\nuna hamburguesa triple de buey de Kobe.'
            ],
            [
                'Confiamos en usted, Sargento. La moral es crucial en estos casos.\nIntente mantener la moral del equipo hablando con ellos.', 
                'Si alguien del grupo muere, la moral descenderá drásticamente.\nDependiendo de quien sea, unos se verán más afectados que otros.', 
                'No dejes que muera Marvin, todos lo queremos mucho.\nSería un duro golpe para la moral del campamento.', 
                'Donald no es muy carismático, pero tiene un gran corazón.', 
                'Este libro habla sobre un chico que liberó la antigua Tierra\ncon solo un ordenador. Se titula: "La Leyenda del Keymasher".',
                'Una reunión conmigo en situaciones límite puede levantar la moral.\nSin embargo, la sesión lleva un rato.',
                'No hay mucho más que hacer en esta roca que leer,\n¿no cree?'
            ],
            [
                'Una hoguera que debe durar 40 días, ¿eh?\nLo tomaré como una metáfora. No sucumbiremos.', 
                '¿Debería guardarme una bala para mí?\nVenga, no pienses en eso...', 
                'El perro parece sabroso...', 
                'El Ingeniero está muy gordo, podría convertirse en un montón\nde comida.', 
                'Las piezas de BR4ND-0N podrían usarse para recargar\nla munición láser.', 
                'Esta zona esta habitada por depredadores.\nDeberíamos ahorrar munición para repelerlos.', 
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
        
        // add entities
        this.addEntities();
        
        // create actions
        this.createActions();
        
        // launch fadeout animation
        this.add.tween(this.fadeAlpha).to({value: 0}, 2000, Phaser.Easing.Quadratic.InOut, true)
            .onComplete.add(function() {
                this.countdownTxt.text = "";
            }, this);;
    },
    update: function() {
        this.crosshair.x = Math.floor(this.input.mousePointer.x - 8);
        this.crosshair.y = Math.floor(this.input.mousePointer.y - 8);
        this.hoverTxt.x = this.crosshair.x + 8;
        this.hoverTxt.y = this.crosshair.y - 12;
        
        for (var q=0, l=this.entities.length; q<l; q++) {
            if (this.entities[q].custom_update) this.entities[q].custom_update();
        }
        
        for (q=0, l=this.buttons.length; q<l; q++) {
            this.hoverTxt.text = "";
            if (!this.isOver && this.day < 40 && this.numActions > 0 && this.dialogbox.y <= -this.dialogbox.height/2 && !this.options.length && this.buttons[q].overlap(this.crosshair)) {
                if (!this.options.length && this.input.mousePointer.isDown) this.createOptionsFor(this.buttons[q]);
                this.hoverTxt.text = this.buttons[q].hoverTxt;
                break;
            }
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
            
            this.buttons.push(this[action._name]);
        }
    },
    createOptionsFor: function(btn) {
        if (btn.infected) {
            for (var i=0; i < btn.infections.length; i++) {
                var txt = this.add.bitmapText(this.input.mousePointer.x - 20, this.input.mousePointer.y - 40 + i * 20, "minecraft", btn.infections[i].text, 10);
                txt.smoothed = false;
                txt.tint = 0x00ff00;
                txt.z = 200 + i;
                txt.action = btn.infections[i].action;
                this.options.push(txt);
            }
        } else {
            for (var i=0; i < btn.options.length; i++) {
                var txt = this.add.bitmapText(this.input.mousePointer.x - 20, this.input.mousePointer.y - 40 + i * 20, "minecraft", btn.options[i].text, 10);
                txt.smoothed = false;
                txt.tint = 0x00ff00;
                txt.z = 200 + i;
                txt.action = btn.options[i].action;
                this.options.push(txt);
            }
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
    startMusic: function() {
        this.music.play();
        this.music.fadeTo(6000, 0.25);
    }
};