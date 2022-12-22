/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import GeneralBlock from './GeneralBlock';

export default class Container extends GeneralBlock 
{

    constructor(id, obj, applyImediately) 
    {
        super(id, obj, applyImediately);

        obj.block.toggle = this.toggle.bind(this);
        obj.block.expand = this.expand.bind(this);
    }

    apply(callCallback) 
    {
        super.apply(callCallback);

        if (this.obj.expanded !== undefined && this.expanded !== this.obj.expanded) 
        {
            this.expanded = this.obj.expanded;
        }

        if (this.title) 
        {
            this.title.innerText = this.obj.title || "Unknown";
        }

        this.expand(this.expanded);
    }

    reset(callCallback) 
    {
        var changed = false;

        for (var i = 0; i < this.children.length; i++) 
        {
            if (this.children[i].reset) 
            {
                changed = this.children[i].reset(callCallback) || changed;
            }
        }

        return changed;
    }

    toggle() 
    {
        this.expand(!this.expanded);
    }

    expand(is) 
    {
        if (this.expandButton) 
        {
            this.expanded = is;

            if (is) 
            {
                this.container.style.display = 'block';
                //$(this.container).show(200, "easeOutCubic")
            }
            else 
            {
                this.container.style.display = 'none';
                //$(this.container).hide(200, "easeOutCubic")
            }

            this.expandButton.children[0].className = (this.expanded ? 'fas fa-compress' : 'fas fa-arrows-alt');
        }
    }

    buildHeader() 
    {
        var header = document.createElement("div");
        header.className = "cfger-header";

        var title = document.createElement("label");
        title.style.cssText = "width: 100%;padding-left: 20px;";
        title.innerText = this.obj.title || "Unknown";
        header.appendChild(title);

        this.title = title;

        var button_show_hide = document.createElement("button");
        button_show_hide.classList.add("cfger-button");
        button_show_hide.title = "show / hide";
        button_show_hide.innerHTML = '<i class="fa fa-compress"></i>';

        header.appendChild(button_show_hide);

        this.expandButton = button_show_hide;

        var _this = this;

        header.onclick = function() 
        {
            _this.toggle();
        }

        this.header = header;

        this.html.appendChild(header);

        return header;
    }

    styleContainer() 
    {
        this.html.classList.add('cfger-container');
        this.container.style.padding = '5px';
    }

    build() 
    {
        super.build();

        this.children = [];
        
        this.buildHeader();

        var container = document.createElement("div");

        this.container = container;

        this.styleContainer();

        this.html.appendChild(container);
    }

    static getType() 
    {
        return 'container';
    }
}