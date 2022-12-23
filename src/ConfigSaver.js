

export default class ConfigSaver
{
    constructor(id, parent, config) 
    {
        this.id = id;
        this.parent = parent;
        this.config = config;

        parent.configSaver = this;

        this._build(parent);
    }

    export () 
    {
        var title = this.title.value || (this.id + "_" + u.timestamp());

        downloadSourceFile(ConfigManager.stringify(this.config), title + ".json")
    }

    remove() 
    {
        var title = this.title.value;

        Hosting.folder(this.id).remove(title + ".json", (e) => 
        {
            if (e) 
            {
                u.showHint_ok("Configuration was successfully removed");
                this.parent.configPackage.remove(title + ".json");
            }
            else 
            {
                u.showHint_ok("An error has occurred during removing");
            }
        });
    }

    setTitle(title) 
    {
        this.title.value = u.getTitle(title);
    }

    import () 
    {
        var input = this.importFile;
        var _this = this;

        Loader.file(input, function(content, options) 
        {
            input.type = "text";
            input.type = "file";

            if (content.indexOf("data:application/json;base64,") > -1) 
            {
                try 
                {
                    var config_source = b64DecodeUnicode(content.replace("data:application/json;base64,", ""))
                    var config = JSON.parse(config_source)

                    _this.title.value = options.title;

                    ConfigManager.mixin(_this.config, config)
                    _this.config.block.apply(true)
                } 
                catch (e) 
                {
                    u.showHint_error("This config file has invalid format.")
                }
            } else 
            {
                u.showHint_error("This config file has invalid format.")
            }
        })
    }

    share () 
    {
        var title = this.title.value;

        if (title.length > 2) 
        {
            u.popup("saving...");

            var config = ConfigManager.stringify(this.config)

            Hosting.folder(this.id).upload(title + ".json", config, (e) => 
            {
                this.parent.configPackage.add(title + ".json", config);

                u.popup("hide");

                u.showHint_ok("Configuration was saved !")
            });
        }
        else
        {
            u.showHint_error("You must specify configuration title (min length 3)")
        }
    }

    _build(parent) 
    {
        var html = this.html = document.createElement("div");
        html.classList.add('sticky-top');
        html.classList.add('config-manager-block');
        html.style.cssText = 'padding-top: 20px;bottom: 0px;display: flex;justify-content: center;align-items: center;border-top: 1px solid #c3c3c3;'


        var input = this.title = document.createElement("input");
        input.className = "form-control form-control-sm";
        input.placeholder = "Configuration title ...";

        var exp = document.createElement("button");
        exp.style.backgroundColor = "#398400";
        exp.innerHTML = '<i class="fa fa-download"></i>'
        exp.title = 'Export config'
        exp.style.marginLeft = "5px";
        exp.style.padding = "3px";
        exp.className = "btn_awe iconButton";

        exp.onclick = () => this.export();

        var impDiv = document.createElement("div");
        impDiv.style.position = "relative";
        impDiv.style.marginLeft = "5px";

        var importFile = this.importFile = document.createElement("input");
        importFile.type = "file";
        importFile.accept = ".json";
        importFile.onchange = () => this.import();
        importFile.style.cssText = 'width: 100%;height: 100%;position: absolute;opacity: 0;';

        var impButton = document.createElement("button");
        impButton.className = 'btn_awe iconButton';
        impButton.style.cssText = 'background-color: #0071fd;padding:3px;';
        impButton.title = 'Import config';
        impButton.innerHTML = '<i class="fa fa-upload"></i>';

        impDiv.appendChild(importFile);
        impDiv.appendChild(impButton);
        
        var share = document.createElement("button");
        share.style.backgroundColor = "#a71818";
        share.innerHTML = '<i class="fa fa-share-alt"></i>'
        share.title = 'Upload/update current configuration'
        share.style.marginLeft = "5px";
        share.style.padding = "3px";
        share.className = "btn_awe iconButton";

        share.onclick = () => this.share();

        var remove = document.createElement("button");
        remove.style.backgroundColor = "#e61818";
        remove.innerHTML = '<i class="fa fa-remove"></i>'
        remove.title = 'Remove configuration'
        remove.style.marginLeft = "5px";
        remove.style.padding = "3px";
        remove.style.display = User.level(4) ? "block" : "none";
        remove.className = "btn_awe iconButton";

        remove.onclick = () => this.remove();


        html.appendChild(input);
        html.appendChild(exp);
        html.appendChild(impDiv);
        html.appendChild(share);
        html.appendChild(remove);

        parent.style.paddingBottom = "0px";

        parent.appendChild(html);
    }

    getHTML() 
    {
        return this.html;
    }

}