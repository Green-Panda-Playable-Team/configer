/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import OptionBlock from './OptionBlock';

export default class TitleBlock extends OptionBlock 
{
    // constructor(id, obj) 
    // {
    //     super(id, obj);
    // }

    build() 
    {
        super.build();

        this.html.style.marginBottom = "5px";
    }

    static getType() 
    {
        return 'title';
    }
}

Block.register("title", TitleBlock);