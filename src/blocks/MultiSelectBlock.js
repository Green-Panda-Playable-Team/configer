/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import OptionBlock from './OptionBlock';
// import Preview from './Preview';

export default class MultiSelectBlock extends OptionBlock 
{
    // constructor(id, obj) 
    // {
    //     super(id, obj);
    // }

    build()
    {
        super.build();

        var obj = this.obj;

        obj.options = obj.options || ["none"]
        obj.labels = obj.labels || []
        obj.value = (typeof obj.value === "undefined" ? [obj.options[0]] : obj.value);

        var isNumbers = true;
        for (let i in obj.options) 
        {
            if (typeof obj.options[i] !== "number") 
            {
                isNumbers = false;
                break;
            }
        }

        this.isNumbers = isNumbers;

        var input = document.createElement("select");
        input.id = this.id;

        var size = this.size = Math.min(obj.size || 10, obj.options.length);

        input.setAttribute("multiple", "");
        input.setAttribute("size", size);
        input.style.height = "100%";
        input.className = "custom-select custom-select-sm";

        this.selectedTexts = obj.selectedTexts = [];
        this.selectedIndexes = obj.selectedIndexes = [];

        for (let t in obj.options) 
        {
            var value = obj.options[t];
            var text = obj.labels[t] || value;

            var option = document.createElement("option");
            option.value = value;
            option.innerText = text;

            input.appendChild(option)
        }

        this.input = input;

        this.html.appendChild(input);

        //this.preview = new Preview(this);

        var _this = this;

        function change() 
        {
            var values = [];
            var selectedOptions = this.selectedOptions;

            for (let i = 0; i < selectedOptions.length; i++) 
            {
                if (isNumbers) 
                {
                    values.push(Number(selectedOptions[i].value))
                } 
                else 
                {
                    values.push(selectedOptions[i].value)
                }
            }

            _this.change(values, true);
        }

        input.onchange = change;
    }

    applyValues() 
    {
        var options = this.input.options;

        var val;

        var wasChanged = false;

        this.selectedTexts = [];
        this.selectedIndexes = [];

        for (let i = 0; i < options.length; i++) 
        {
            if (this.isNumbers) 
            {
                val = Number(options[i].value);
            }
            else 
            {
                val = options[i].value;
            }

            if (this.obj.value.indexOf(val) > -1) 
            {
                this.selectedIndexes.push(i);
                this.selectedTexts.push(options[i].innerText);

                if (!options[i].selected) 
                {
                    options[i].selected = true;
                    wasChanged = true;
                }
            } 
            else 
            {
                if (options[i].selected) 
                {
                    options[i].selected = false;
                    wasChanged = true;
                }
            }
        }

        this.obj.selectedTexts = this.selectedTexts
        this.obj.selectedIndexes = this.selectedIndexes;

        return wasChanged;
    }

    change(value, callCallback) 
    {
        var changed = false;

        // var prevValues = this.input.selectedOptions;

        if (value !== undefined && Array.isArray(value)) 
        {
            if (this.obj.value !== value) 
            {
                changed = true;
            }

            this.obj.value = value.slice(0);
        }

        for (let i = 0; i < this.obj.value.length; i++) 
        {
            if (this.obj.options.indexOf(this.obj.value[i]) === -1) 
            {
                this.obj.value.splice(i, 1);
                i--;
            }
        }
    
        if (this.defaultValue === undefined) this.defaultValue = this.obj.value.slice(0);

        if (this.applyValues() || changed) 
        {
            changed = true;
            this.obj.changed = true;
            
            if (this.preview) 
            {
                this.preview.apply();
            }
        }

        if (changed && callCallback) 
        {
            this.onChange(this.obj.value);
        }

        return changed;
    }

    static getType() 
    {
        return 'multiselect';
    }
}

Block.register('multiselect', MultiSelectBlock, 'value');