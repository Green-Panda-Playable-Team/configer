/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import OptionBlock from './OptionBlock';

export default class DataBlock extends OptionBlock 
{
    // constructor(id, obj) 
    // {
    //     super(id, obj);
    // }

    build() 
    {
        if (!this.obj.title) 
        {
            var title = "";

            if (typeof this.obj.value == "string") 
            {
                title = this.obj.value;
            }
            else 
            {
                title = JSON.stringify(this.obj.value);
            }

            if (title.length > 37) title = title.substr(0, 37) + "...";

            this.obj.title = title;
        }

        super.build();

        this.html.style.marginBottom = "5px";
        this.html.style.paddingLeft = "20px";
        this.html.style.border = "1px solid #DFDFDF";
        this.html.style.borderRadius = "11px";
    }

    static getType() 
    {
        return 'data';
    }
}

Block.register("data", DataBlock, 'value');