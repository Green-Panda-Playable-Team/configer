/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import OptionBlock from './OptionBlock';
import InputBlock from './InputBlock';

export default class TextAreaBlock extends OptionBlock 
{

    // constructor(id, obj) 
    // {
    //     super(id, obj);
    // }

    build() 
    {
        super.build();

        var _this = this;

        if (this.obj.value === undefined) this.obj.value = "";

        var input = document.createElement("textarea");
            input.id = this.id;
            input.className = "form-control form-control-sm";

        this.input = input;

        this.html.appendChild(input);

        function change() 
        {
            _this.change(this.value, true);
        }

        if (this.obj.oninput) {
            input.oninput = change;
        } else {
            input.onchange = change;
        }
    }

    static getType() 
    {
        return 'textarea';
    }
}

TextAreaBlock.prototype.change = InputBlock.prototype.change;

Block.register('textarea', TextAreaBlock, 'value');