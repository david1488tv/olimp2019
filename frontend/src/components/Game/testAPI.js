//Используется в WaterMarket.js и Translate.js
import {smartSetHeight} from './utils';
const testAPI = {

    addNote: function() {
        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0xFFFFFF, 1);
        this.rectOne = graphics.drawRect(0, 0, 2000, 2000);
        this.rectOne.alpha = 0.5;
        graphics.endFill();

        this.notebook = this.game.add.image(300, 385, 'notebook');
        smartSetHeight(this.notebook, 700);
        return graphics;
    },

    destroyNote: function() {
        this.notebook.destroy();
        this.rectOne.destroy();
    },

    checkAnswers: function(obj) {
        if(obj.isHalf === true){
            this.grade += 50;
        }
        if(obj.isRight === true){
            this.grade += 50;
        }
        this.next();
    },

    addCheck: function(obj){
        obj.forEach(e => {
            e.inputEnabled = true;
            e.events.onInputDown.add(testAPI.checkAnswers, this);
            e.input.useHandCursor = true;
        });
    },

    addText: function(str, posX, posY, fontSize){
        let tmp = this.game.add.text(posX, posY, str, {
                font: fontSize+"px Pangolin",
        });
        return tmp;
    },

    deleteText: function(objQuestion, objAnswers){
        objQuestion.destroy();
        objAnswers.forEach(e => {
            e.destroy();
        });
    }
}

export default testAPI;