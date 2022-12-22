/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import GeneralBlock from './GeneralBlock';

export default class BannerBlock extends GeneralBlock 
{

    // constructor(parent, name, obj) 
    // {
    //     super(parent, name, obj);
    // }

    apply() 
    {
        super.apply();

        this.title.innerText = this.obj.title || this.obj.msg || "";
    }

    build() 
    {
        super.build();

        var banner = document.createElement("marquee");
            banner.id = this.id;
            banner.bgColor = "#dcdcdc";
            banner.loop = "-1";
            banner.scrollAmount = "2";
            banner.style.cssText = "width: 100%;padding: 5px;border-radius: 4px;font-family: monospace;background-color: #eeeeee;border: 1px solid #d8d8d8;";
            banner.innerText = this.obj.title || this.obj.msg || "";

        this.title = banner;
        this.html.appendChild(banner);
        
    }

    static getType() 
    {
        return 'banner';
    }
}

Block.register('banner', BannerBlock);