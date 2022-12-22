/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import OptionBlock from './OptionBlock';

export default class NumberBlock extends OptionBlock 
{

    // constructor(id, obj) 
    // {
    //     super(id, obj);
    // }

    build() 
    {
        super.build();

        var input = document.createElement("input");
            input.id = this.id
            input.type = "number";
            input.className = "form-control";
            input.style.width = "150px";

        this.input = input;

        this.html.appendChild(input);

        var _this = this;

        function change() 
        {
            _this.change(Number(this.value), true);
        }

        if (this.obj.oninput) {
            input.oninput = change;
        } else {
            input.onchange = change;
        }
    }

    change(value, callCallback) 
    {
        var changed = false;

        var prevValue = this.input.value;

        var obj = this.obj;

        if (value !== undefined) 
        {
            if (!obj.oninput) 
            {
                if (typeof obj.min === 'number' && value < obj.min) 
                {
                    value = obj.min;
                } 
                else if (typeof obj.max === 'number' && value > obj.max) 
                {
                    value = obj.max;
                }
            }

            if (obj.value !== value) 
            {
                changed = true;
            }

            obj.value = value;
        }

        this.input.value = "" + obj.value;

        if (typeof obj.min === "number" && obj.min !== this.input.min)
            this.input.min = "" + obj.min;

        if (typeof obj.max === "number" && obj.max !== this.input.max)
            this.input.max = "" + obj.max;

        if (typeof obj.step === "number" && obj.step !== this.input.step)
            this.input.step = "" + obj.step;

        if (typeof obj.max === "number" && obj.max === obj.min) {
            this.input.classList.add("cfger-disabled")
        } else {
            this.input.classList.remove("cfger-disabled")
        }

        if (this.input.value !== obj.value) 
        {
            obj.value = Number(this.input.value);
        }

        if (this.defaultValue === undefined) this.defaultValue = obj.value;
        this.input.value = "" + obj.value;

        if (this.input.value !== prevValue || changed) 
        {
            changed = true;
            obj.changed = true;
            this.indicator && this.indicator.apply();
        }

        if (changed && callCallback) 
        {
            this.onChange(obj.value);
        }

        return changed;
    }

    static getType() 
    {
        return "number";
    }
}

Block.register('number', NumberBlock, 'value');