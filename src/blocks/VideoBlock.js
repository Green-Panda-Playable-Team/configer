/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import FileBlock from './FileBlock';

export default class VideoBlock extends FileBlock
{
    constructor(id, obj)
    {
        super(id, obj);
    }

   
    build()
    {
        this.placeholder = "Choose video";
        this.defaultFileName = "video.mp4";

        super.build();

        this.input.accept = "video/*";
        this.configureButton.style.backgroundColor = "#1da0a7";
    }

    static getType()
    {
        return 'video';
    }

}

Block.register('video', VideoBlock, 'src');