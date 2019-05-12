import Phaser from 'phaser';

export default class IntroState extends Phaser.State {
    * gen() {

        setTimeout(() => this.next(), 3000);
        this.game.camera.flash(0x000000, 3000, true);
        yield;  
        
        this.game.displayDialogLine('Голос', 'Промайнули шкільні тижні, і сьогодні Ви склали останній іспит. Що чекає попереду?', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Хочеться досягти успіху, щоб ніколи не наздогнало почуття жалю за нездійсненним. Настав час планувати майбутнє. Настав час обрати майбутню професію.', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Здається, що всі Ваші однолітки вже встигли визначитися і залишилися лише Ви. Але професій так багато, що Ви відчуваєте себе розгубленим. Лікар? Вчитель? Космонавт? Все не те.', () => this.next());
        yield;

        this.game.displayDialogLine('Голос', 'Треба щоб і цікавою була, і сучасною, і з високою заробітною платою...', () => this.next());
        yield;

        this.game.displayDialogLine('Ви', '*Зненацька щось яскраве промайнуло перед Вашими очима. Це була підхоплена вітром листівка*', () => this.next());
        yield;

        // this.camera.scale.setTo(1, 1);
        // this.camera.x = 1128 * 5;
        // this.camera.y = 350 * 5 - 300;
        // let firstStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
        // let secondStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
        // let thirdStep = this.game.add.tween(this.camera).to({ x: 400, y: -600 }, 500);
    
        // firstStep.chain(secondStep, thirdStep);
        // this.game.add.tween(this.camera.scale).to({
        //     x: 1.2,
        //     y: 1.2,
        // }, 2000).start().onComplete.add(() => setTimeout(() => this.next(), 1000));
        // firstStep.start();
        // yield;

        this.buttonTake_on.inputEnabled = true;
        this.buttonIgnore_on.inputEnabled = true;
        this.buttonTake_on.alpha = 1;
        this.buttonIgnore_on.alpha = 1;
        this.firstTake.alpha = 1;
        this.firstIgonre.alpha = 1;
        yield;

        if (this.answer == 'No'){
            this.game.displayDialogLine('Ви', 'Ви збираєтеся пройти повз, але порив вітру кидає листівку прямо Вам в обличчя. "Напевно, це доля", - гадаєте Ви, придивляючись до тексту', () => this.next());
        }
        else {
            this.game.displayDialogLine('Ви', 'Треба подивитися', () => this.next());
        }
        yield;

        this.game.add.tween(this.booklet).to({
            alpha: 1
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                this.game.displayDialogLine('Ви', 'Комп’ютерні науки? Що ж спеціаліст з інформаційних технологій - звучить непогано. Ви уявляєте, як сидите у розкішному кріслі власного кабінету, що займає весь останній поверх хмарочосу', () => this.next());
        });
        yield;
        this.game.displayDialogLine('Ви', 'Ви робите ковток свіжозвареної бразильської кави, що залишив на Вашому столі послужливий особистий помічник, і не кваплячись, з почуттям власної гідності, декількома надрозумними командами програмуєте космічні машини', () => this.next());
        yield;
        this.game.displayDialogLine('Ви', 'О, це надзвичайно круто!  Давно забуте почуття наснаги захоплює Вас. З нетерпінням Ви шукаєте на листівці дату - вже завтра!  Треба якнайскоріше зареєструватися', () => this.next());
        yield;

        
        //регистрация

        this.game.displayDialogLine('Ви', 'Ви намагаєтесь згадати, де знаходиться університет. У центрі міста? Біля кінотеатру? Чи може Ви бачили його, коли зустрічалися із друзями в парку? Так і заблукати неважко! Але відчуття тривоги покидає Вас, щойно бачите на зворотному боці листівки карту', () => this.next());
        yield;


        this.game.add.tween(this.booklet).to({
            alpha: 0
        }, 1500, Phaser.Easing.Cubic.InOut)
            .start().onComplete.add(() => {
                this.game.add.tween(this.booklet_back).to({
                    alpha: 1
                }, 1500, Phaser.Easing.Cubic.InOut)
                    .start().onComplete.add(() => this.next());
        });
        yield;

        //карта
        this.game.setGoogleMapEnabled(true);

        this.game.displayDialogLine('Ви', 'Ви почуваєтесь значно впевненіше. Можливо наступний день стане вирішальним і надасть можливість остаточно визначитися з майбутньою професією.', () => this.next());
        yield;

        this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        this.game.setGoogleMapEnabled(false);
        yield;

        this.game.nextState();
    }

    init() {
        this._gen = this.gen();
        this.game.phone.setEnabled(false);
        this.game.phone.setTime('13:56');
        this.game.phone.setDate('02.07.18');
        this.answer = null;
    }

    preload() {
        this.load.image('bg', './assets/images/1-0 (Intro)/background.png');
        this.load.image('booklet', './assets/images/1-0 (Intro)/booklet.png');
        this.load.image('booklet_back', './assets/images/1-0 (Intro)/booklet_back.png');

        this.load.image('button_red_on', './assets/images/1-0 (Intro)/Button_Choice_On_Red.png');
        this.load.image('button_blue_on', './assets/images/1-0 (Intro)/Button_Choice_On_Blue.png');

        this.load.image('cloud1', './assets/images/1-0 (Intro)/cloud1.png');
        this.load.image('cloud2', './assets/images/1-0 (Intro)/cloud2.png');
        this.load.image('cloud3', './assets/images/1-0 (Intro)/cloud3.png');
        //this.load.image('cloud4', './assets/images/1-0 (Intro)/cloud4.png');

    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        let cloud1 = this.game.add.image(1912, -400, 'cloud2');
        this.game.add.tween(cloud1).to({ x: -900 }, 90000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);

        let cloud2 = this.game.add.image(1912, -250, 'cloud2');
        this.game.add.tween(cloud2).to({ x: -1100 }, 40000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);
        
        let cloud3 = this.game.add.image(1912, -50, 'cloud3');
        this.game.add.tween(cloud3).to({ x: -900 }, 60000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, false);


        //Формы выбора
        let buttonTake_on = this.game.add.button(this.game.world.centerX + 242, 400, 'button_blue_on', this.actionOnClick, this, 1, 0, 2);
        buttonTake_on.inputEnabled = false;
        buttonTake_on.alpha = 0;
        this.buttonTake_on = buttonTake_on;


        let buttonIgnore_on = this.game.add.button(this.game.world.centerX - 850, 400, 'button_red_on', this.actionOnClick, this, 0, 1, 0);
        buttonIgnore_on.inputEnabled = false;
        buttonIgnore_on.alpha = 0;
        this.buttonIgnore_on = buttonIgnore_on;
        
        //Текст в формах выбора
        this.firstTake = this.game.add.text(this.game.world.centerX + 442, 425, 'Схопити', {
            font: "Pangolin",
            fontSize: 60,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstTake.alpha = 0;
        console.log(this.firstTake);

        this.firstIgonre = this.game.add.text(this.game.world.centerX - 700, 425, 'Ігнорувати', {
            font: "Pangolin",
            fontSize: 60,
            fill: 'white',
            stroke: 'black',
            strokeThickness: 8,
        });
        this.firstIgonre.alpha = 0;


        let booklet = this.game.add.image(this.game.world.centerX - 520, 20, 'booklet');
        booklet.alpha = 0;
        this.booklet = booklet;

        let booklet_back = this.game.add.image(this.game.world.centerX - 520, 20, 'booklet_back');
        booklet_back.alpha = 0;
        this.booklet_back = booklet_back;

        this.stage.disableVisibilityChange = true;

        this.next();
    }

    actionOnClick(obj) {
        if (obj.key == 'button_blue_on'){
            this.answer = 'Yes';
        }
        else {
            this.answer = 'No';
        }
        this.buttonTake_on.destroy();
        this.buttonIgnore_on.destroy();
        this.firstTake.destroy();
        this.firstIgonre.destroy();
        this.next();
    }

    next() {
        this._gen.next();
    }

}
