/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from '../BlockPlugin';
import VideoBlock from './VideoBlock';

export default class VideoToGifBlock extends VideoBlock
{
    constructor(id, obj)
    {
        super(id, obj);

        this.lastVideoBase = null;
        this.lastVideoOptions = null;
    }

    configure() 
    {
        var _this = this;

        _this.lastVideoOptions.reset = false;

        Video2Gif.convert(_this.lastVideoBase, _this.lastVideoOptions, 
        function(resGif) 
        {

            _this.obj.src = resGif;

            _this.obj.changed = true;

            _this.onChange(_this.obj.src);

            _this.srcChanged();

        });
    }

    fileChanged(file) 
    {
        var _this = this;

        Loader.file(file, function(res, options) {

            options.reset = true;

            options.uuid = "vid2gif" + _this.id;

            _this.lastVideoBase = res;

            _this.lastVideoOptions = options;

            Video2Gif.convert(res, options, function(resGif) 
            {

                _this.obj.src = resGif;

                _this.obj.changed = true;

                _this.onChange(_this.obj.src);

                _this.srcChanged();
            });
        });
    }

    static getType()
    {
        return 'video_to_gif';
    }
}

Block.register('video_to_gif', VideoToGifBlock, 'src');