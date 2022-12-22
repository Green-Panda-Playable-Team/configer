
import BlockPlugin from '../BlockPlugin';
import OptionBlock from './OptionBlock';

export default class DateBlock extends OptionBlock 
{

    // constructor(parent, name, obj) 
    // {
    //     super(parent, name, obj);
    // }

    build() 
    {
        super.build();

        var _this = this;

        if (this.obj.value === undefined) this.obj.value = new Date();

        var input = document.createElement("input");
            input.id = this.id;
            input.type = this.obj.type === "datetime" ? "datetime-local" : "date";
            input.className = "form-control";

        if (this.obj.placeholder) 
        {
            input.placeholder = this.obj.placeholder;
        }

        this.input = input;

        this.html.appendChild(input);

        function change() 
        {
            _this.change(this.valueAsNumber, true);
        }

        if (this.obj.oninput) 
        {
            input.oninput = change;
        } 
        else 
        {
            input.onchange = change;
        }
    }

    change(value, callCallback) 
    {
        var changed = false;

        var prevValue = this.input.valueAsNumber;

        this.obj.value = new Date(this.obj.value);

        if (value !== undefined) 
        {
            value = new Date(value);

            if (this.obj.value !== value) 
            {
                changed = true;
            }

            this.obj.value = value;
        }

        if (this.defaultValue === undefined) this.defaultValue = this.obj.value;

        this.input.valueAsNumber = this.obj.value.getTime();

        if (this.input.valueAsNumber !== prevValue || changed) 
        {
            changed = true;
            this.obj.changed = true;
        }

        if (changed && callCallback) 
        {
            this.onChange(this.obj.value);
        }

        return changed;
    }

    static getType() 
    {
        return ['date', 'date-time'];
    }
}

BlockPlugin.register('date', DateBlock, 'value');
BlockPlugin.register('datetime', DateBlock, 'value');