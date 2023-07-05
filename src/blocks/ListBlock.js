/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import Container from './Container';
// import OptionBlock from './OptionBlock';
// import ImageBlock from './ImageBlock';

const noop = function() {};

export default class ListBlock extends Container {


    constructor(root, id, obj) 
    {
        super(root, id, obj);

        obj.refresh = this.refresh.bind(this);
        obj.add = this.add.bind(this);
        obj.clear = this.clear.bind(this);
        obj.remove = this.remove.bind(this);
    }

    apply(callCallback) 
    {
        super.apply();

        this.refresh();

        if (callCallback) 
        {
            this.onChange(this.obj.list);
        }
    }

    build() 
    {

        var obj = this.obj;

        if (obj.header === false) 
        {
            this.buildHeader = noop;
        }

        super.build();

        obj.list = obj.list || [];

    }

    clear () 
    {
        if (this.obj.list.length > 0) 
        {
            this.obj.list = [];
            this.onChange(this.obj.list);
            this.refresh();
        }
    }

    remove (index) 
    {
        if (index >= 0 && index < this.obj.list.length) 
        {
            this.obj.list.splice(index, 1);
            this.onChange(this.obj.list);
            this.refresh();
        }
    }

    add (item) 
    {
        this.obj.list.push(item);
        this.onChange(this.obj.list);
        this.refresh();
    }

    refresh () 
    {
        this.container.innerHTML = "";
        var _this = this;

        var obj = this.obj;
        var id = this.id;

        var template = obj.template || {
            type: "data",
            value: "",
            title: "Item {N}"
        };

        var list = obj.list;

        if (list && list.length > 0) 
        {

            var itemId, option, listItem, item, type;

            for (var i = 0; i < list.length; i++) 
            {
                listItem = list[i];

                item = JSON.parse(JSON.stringify(template));

                for (var ky in template) 
                {
                    if (typeof template[ky] === "function") 
                    {
                        item[ky] = template[ky];
                    }
                }

                itemId = id + "_" + i;

                if (typeof listItem !== "object") listItem = {value: listItem};

                Object.assign(item, listItem);
                Object.assign(listItem, item);

                item = listItem;
                type = item.type;

                if (item.title) 
                {
                    item.title = item.title.replaceAll("{N}", i + 1);
                }

                var block = new (Block.get(type))(this.root, itemId, item);
                var blockHTML = block.getHTML();
                this.container.appendChild(blockHTML);

                option = blockHTML;

                if (type === "image") 
                {
                    option = blockHTML.getElementsByClassName("fileField")[0];
                }

                option.style.cssText = "margin-bottom: 5px;border: 1px solid rgb(223, 223, 223); border-radius: 11px;overflow: hidden;display: flex;";

                if (type === "number" || type === "text") 
                {
                    block.input.style.padding = "7px";
                    block.input.style.marginBottom = "0px";
                }

                if (type === "image") 
                {
                    option.style.marginBottom = "0px";
                }

                if (type === "select") 
                {
                    block.input.style.padding = "7px";
                    block.input.style.marginBottom = "0px";
                    block.input.style.height = "36px";
                }

                if (type === "button") 
                {
                    block.button.style.width = "100%";
                    block.button.style.borderRadius = "0px";
                }

                if (type === "textarea" || type === "multiselect") 
                {
                    option.style.alignItems = "inherit";
                }

                function elementClicked() 
                {
                    if (typeof _this.obj.onClick === "function") 
                    {
                        _this.obj.onClick(this.itemIndex)
                    }
                }

                if (type === "button") 
                {
                    block.obj.itemIndex = i;
                    block.obj.click = elementClicked;
                }
                if (type === "data") 
                {
                    blockHTML.itemIndex = i;
                    blockHTML.onclick = elementClicked;
                }

                if (obj.removable !== false || (item.removable === true)) 
                {
                    if (item.removable !== false) 
                    {
                        var removeBtn = document.createElement("button");
                        removeBtn.title = "Remove item";
                        removeBtn.classList.add("btn_awe");
                        removeBtn.classList.add("iconButton");
                        removeBtn.style.cssText = "background-color: rgb(228, 59, 59); min-width: 32px; border-radius: 0px;";
                        removeBtn.innerHTML = '<i class="fa fa-remove"></i>';
                        removeBtn.itemIndex = i;

                        removeBtn.onclick = function(e) 
                        {
                            e.stopPropagation();
                            obj.remove(this.itemIndex);
                        }
                
                        option.appendChild(removeBtn);
                    }
                }
            }
        }
    }

    static getType() 
    {
        return 'list';
    }
}

Block.register('list', ListBlock, 'list');