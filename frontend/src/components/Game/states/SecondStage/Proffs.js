/* globals __DEV__ */
import Phaser from 'phaser';
import {smartSetHeight} from '../utils';
import todos from '../todos/Docs';

export default class ProffsState extends Phaser.State {
    * gen() {
        this.game.displayDialogLine('П\'ятикоп', 'Доброго дня! Мене звуть П\'ятикоп Олена Євгенівна. \
Зараз я хочу познайомити Вас з викладачами нашої кафедри. Оберіть будь-кого з нашого стенду і я розповім вам \
про нього', () => this.next());
        yield;

        this.fivecopTalk.alpha = 0;
        this.fivecopQuite.alpha = 1;
        yield;
        
        /*this.game.camera.fade(0x000000, 1500, true);
        setTimeout(() => this.next(), 1500);
        yield;*/

        //this.state.start('');
    }

    init() {
        this._gen = this.gen();
        this.game.phone.clearTodos();
        this.game.phone.addTodos(todos);
    }

    preload() {
        this.load.image('bg', './assets/images/2-4 (proffs)/bg-2-4.png');

        this.load.image('photo-alyoshin', './assets/images/2-4 (proffs)/photo-alyoshin.png');
        this.load.image('photo-angel', './assets/images/2-4 (proffs)/photo-angel.png');
        this.load.image('photo-fedosochka', './assets/images/2-4 (proffs)/photo-fedosochka.png');
        this.load.image('photo-fivecop', './assets/images/2-4 (proffs)/photo-fivecop.png');
        this.load.image('photo-levitisyskaya', './assets/images/2-4 (proffs)/photo-levitisyskaya.png');
        this.load.image('photo-miron', './assets/images/2-4 (proffs)/photo-miron.png');
        this.load.image('photo-pron', './assets/images/2-4 (proffs)/photo-pron.png');

        this.load.image('fivecop-1', './assets/images/2-4 (proffs)/fivecop-1.png');
        this.load.image('fivecop-2', './assets/images/2-4 (proffs)/fivecop-2.png');
    }

    create() {
        let bg = this.game.add.image(0, 0, 'bg');
        bg.height = this.game.width * bg.height / bg.width;
        bg.width = this.game.width;

        this.fivecopQuite = this.createSprite('fivecop-2', 1550, 250, 1500, false, false);
        this.fivecopTalk = this.createSprite('fivecop-1', 1550, 250, 1500, true, false);

        let photoFivecop = this.createSprite('photo-fivecop', 220, 20, 380, true, true);
        photoFivecop.dialog = "Це я, П\'ятикоп Олена Євгенівна, доцент, кандидат технічних наук за спеціальністю «Інформаційні технології».\
        Я навчу Вас веб-программуваню, розповім про різні методи покращення вашого продукту під час його розробки.";
        let photoMiron = this.createSprite('photo-miron', 580, 20, 380, true, true);
        photoMiron.dialog = "Це Мироненко Дмитро Сергійович, доцент, кандидат технічних наук за спеціальністю \
        «Інформаційні технології». З ним Ви зможете вивчити такі важливі галузі майбутньої професії, як\
        проектування баз даних, також ви  будете створювати додатки мовою C#";
        let photoLevitskaya = this.createSprite('photo-levitisyskaya', 940, 20, 380, true, true);
        photoLevitskaya.dialog = "Це Левицька Тетяна Олександрівна, воцент, кандидат технічних наук за \
        спеціальністю «Металургія чорних і кольорових металів та спеціальних сплавів». Також вона має диплом \
        про вищу освіту за спеціальністю «Інформатика». Тетяна Олександрівна можа стати вашою другою мамою, \
        і навчить вас дуже цікавим речам, наприкад, інтелектуальному аналізу даних і комп'ютерній схемотехніці\
         та архітектурі комп'ютерів";
        let photoAlyoshin = this.createSprite('photo-alyoshin', 220, 440, 380, true, true);
        photoAlyoshin.dialog = "Це Альошин Сергій Вікторович, старший викладач, має диплом за спеціальністю \
        «Інформатика». Він розробник автоматизованої інформаційної системи перевірки і контролю знань з \
        використанням технології DataSnap. З ним ви вивчите системне програмвання і таку цікаву галузь, як\
        проектування і створювання комп\'ю терних мереж.";
        let photoPron = this.createSprite('photo-pron', 580, 440, 380, true, true);
        photoPron.dialog = "Це Проніна Ольга Ігорівна, наш асистент. З нею ви будете проводити немало часу \
        продовж практичних занять. Вона вимоглива, але добра.";
        let photoAngel = this.createSprite('photo-angel', 940, 440, 380, true, true);
        photoAngel.dialog = "Це Сукрут Анжела Геннадіївна, старший лаборант. До неї ви можете звернутись, \
        якщо хочете позайматись додатково в нашій спеціалізованій аудиторії.";
        let photoFedosova = this.createSprite('photo-fedosochka', 1250, 180, 460, true, true);
        photoFedosova.dialog = "Це завідувач кафедри, Федосова Ірина Василівна, професор, доктор педагогічних наук, \
        доцент, кандидат економічних наук за спеціальністю «Економіко-математичне моделювання». Не любить \
        запізнення, вимоглива, але вона дуже добра. До неї завжди можна звернутись по допомогу.";

        let photos = [photoAlyoshin, photoAngel, photoFedosova, photoFivecop, photoLevitskaya, photoMiron, photoPron];
        photos.forEach(e => {
            e.events.onInputDown.add(this.handleClick, this);
        });
        this.stage.disableVisibilityChange = true;
        this.next();
    }

    handleClick(obj) {
        this.game.phone.completeTodo(obj.todoId);
        this.fivecopTalk.alpha = 1;
        this.fivecopQuite.alpha = 0;
        this.game.displayDialogLine('П\'ятикоп', obj.dialog, () => this.endTalk());
    }

    endTalk(){
        this.fivecopTalk.alpha = 0;
        this.fivecopQuite.alpha = 1;
    }

    createSprite(name, posX, posY, height, flagAlpha, flagInput, todoId) {
        let tmp = this.game.add.image(posX, posY, name);
        smartSetHeight(tmp, height);
        if (flagAlpha === false) {
            tmp.alpha = 0;
        }
        else {
            tmp.alpha = 1;
        }
        if (flagInput === true) {
            tmp.inputEnabled = true;
            tmp.input.useHandCursor = true;
        }
        if (todoId) {
            tmp.todoId = todoId;
        }

        return tmp;
    }

    next() {
        this._gen.next();
    }
}