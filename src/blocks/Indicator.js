/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

export default class Indicator
{
    constructor(parent) 
    {
        this.parent = parent;

        var indicator = document.createElement("input");

        indicator.type = 'number';
        indicator.id = parent.id + "_indicator";
        indicator.className = "cfger-indicator";
        indicator.onchange = function() {
  
           parent.change(Number(this.value), true)
        }

        // var lastWidth = 0;
        var isIntStep = Number.isInteger(Number(parent.obj.step));

        // var lastHTMLWidth = indicator.offsetWidth;

        parent.html.appendChild(indicator);

        this.apply = function()
        {

            indicator.min = parent.obj.min
            indicator.max = parent.obj.max
            indicator.step = parent.obj.step

            // var hystWidth = indicator.offsetWidth;

            var new_val;
            if (isIntStep) 
            {
                new_val = parent.obj.value;
            }
            else 
            {
                new_val = Number(parent.obj.value);
            }

            // if (new_val.length > lastWidth) 
            // {
            //     lastWidth = (''+ new_val).length;
            //     indicator.style.minWidth = "unset";
            // }

            indicator.value = new_val;

            // if (indicator.offsetWidth > lastHTMLWidth && indicator.offsetWidth > hystWidth) 
            // {
            //     lastHTMLWidth = indicator.offsetWidth;
            //     indicator.style.minWidth = lastHTMLWidth + "px";
            // }
        }

        this.apply();
    }
}
