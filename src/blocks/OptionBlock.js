/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import GeneralBlock from './GeneralBlock';

export default class OptionBlock extends GeneralBlock 
{
    // constructor(id, obj) 
    // {
    //     super(id, obj);
    // }

    reset(callCallback) 
    {
        if (this.defaultValue !== undefined) 
        {
            return (this.change && this.change(this.defaultValue, callCallback !== false));
        }

        return false;
    }

    apply(callCallback) 
    {
        super.apply();

        if (!this.title && this.obj.title) 
        {
            var label = document.createElement("label");
            label.className = "cfger-label";
            label.htmlFor = this.id;
            label.innerHTML = this.obj.title;
            if (this.html.childElementCount > 0) 
            {
                this.html.insertBefore(label, this.html.children[0]);
            }
            else 
            {
               this.html.appendChild(label); 
            }

            this.title = label;
        }

        if (this.title) 
        {
            this.title.innerHTML = this.obj.title || "";

            if (this.obj.title.length < 30) 
            {
                this.title.style.whiteSpace = "nowrap";
                this.title.style.minWidth = "";
            }
            else 
            {
                this.title.style.whiteSpace = "";
                this.title.style.minWidth = "145px";
            }
        }

        return (this.change && this.change(void 0, callCallback));
    }

    build() 
    {
        super.build();

        this.html.classList.add("cfger-option");

        if (this.obj.title) 
        {
            var label = document.createElement("label");
            label.className = "cfger-label";
            label.htmlFor = this.id;
            label.innerHTML = this.obj.title;
            this.html.appendChild(label);

            this.title = label;
        }
        
    }
}