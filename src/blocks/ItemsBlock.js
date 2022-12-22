/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import Container from './Container';

export default class ItemsBlock extends Container {

    constructor(id, obj) 
    {
        super(id, obj, false);

        super.apply();
    }

    apply(callCallback) 
    {
        super.apply(callCallback);

        this.children.forEach(function(child)
        {
            child.apply(callCallback);
        });
    }

    build() 
    {
        super.build();

        var options = this.obj;
        
        if (this.obj.config && this.obj.type === "block") 
        {
            options = this.obj.config || {};
        }

        for (var name in options) 
        {
            var obj = options[name];

            if (typeof obj == "object" && obj.type) 
            {
                var blockClass = Block.get(obj.type);

                var objView = new blockClass(this.id + "_" + name, obj);

                this.children.push(objView);

                this.container.appendChild(objView.getHTML());
            }
        }

        if (this.children.length === 0) 
        {
            const emptyListLabel = document.createElement("div");
            emptyListLabel.className = "cfger-empty-list-label";
            emptyListLabel.innerText = "No options here";
            this.container.appendChild(emptyListLabel);
        }
    }

    static getType() 
    {
        return 'block';
    }
}

Block.register('block', ItemsBlock);