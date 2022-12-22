

export default class ConfigPackage 
{
    constructor(id, parent, config) 
    {
        this.id = id;
        this.parent = parent;
        this.config = config;

        this.list = [];

        this.cache = {};

        parent.configPackage = this;
        
        this._build(parent);
    }

    updateHTML() 
    {
        var html = '';

        html += '<option value="" style="color: #898989;" disabled selected>Choose configuration ...</option>'
        html += '<option value="__default__" selected>Default</option>';

        this.list.forEach(function(e) 
        {
            html += '<option value="' + e + '">' + u.getTitle(e) + '</option>';
        })

        this.select.innerHTML = html;
    }

    update() 
    {
        Hosting.folder(this.id).ls((list) => 
        {
            this.list = list;
            this.updateHTML();
        })
    }

    remove(fileName) 
    {
        var index = this.list.indexOf(fileName);

        if (index > -1) 
        {
            this.list.splice(index, 1);
            this.updateHTML();
        }
    }

    add(fileName, config) 
    {
        if (this.list.indexOf(fileName) == -1)
        {
            this.list.push(fileName);
            this.updateHTML();
        }

        this.cache[fileName] = JSON.parse(config);

        this.select.value = fileName;
    }

    apply(value) 
    {
        value = value || this.select.value;

        if (value == "__default__") 
        {
            this.config.block.reset();
            this.parent.configSaver && this.parent.configSaver.setTitle("");
        }
        else 
        {
            if (this.cache[value]) 
            {
                ConfigManager.mixin(this.config, this.cache[value]);
                this.config.block.apply(true);
                this.parent.configSaver && this.parent.configSaver.setTitle(value);
            }
            else 
            {
                Hosting.folder(this.id).download(value, (content) => 
                {
                    try 
                    {
                        var config = JSON.parse(content);
                        this.cache[value] = config;
                        ConfigManager.mixin(this.config, config);
                        this.config.block.apply(true);
                        this.parent.configSaver && this.parent.configSaver.setTitle(value);
                    }
                    catch (e) 
                    {
                        u.showHint_error("An error has occurred during loading config.")
                    }
                })
            }
            
        }
    }

    _build(parent) 
    {
        var html = this.html = document.createElement("div");
        html.classList.add('sticky-top');
        html.classList.add('config-manager-block');
        html.style.cssText = 'border-bottom: 1px solid #c3c3c3; margin-bottom: 5px;';


        var select = this.select = document.createElement("select");
        select.classList.add('custom-select');
        select.classList.add('custom-select-sm');
        select.onchange = () => this.apply();
        html.appendChild(select);

        parent.style.paddingTop = "0px";

        parent.appendChild(html);

        this.updateHTML();
        this.update();
    }

    getHTML() 
    {
        return this.html;
    }

}