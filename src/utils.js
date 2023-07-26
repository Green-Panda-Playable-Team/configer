/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import ImageUtils from './Image';

function merge(original, source) 
{
    var changed = false;

    if (source) 
    {
        for (let key, keys = Object.keys(source), l = keys.length; l--;) 
        {
            key = keys[l];

            if (original.hasOwnProperty(key)) 
            {
                if (typeof source[key] === "object" && !Array.isArray(source[key])) 
                {
                    if (typeof original[key] === "object") 
                    {
                        changed = changed || merge(original[key], source[key])
                    }
                } 
                else {
                    if (Array.isArray(source[key])) 
                    {
                        if (Array.isArray(original[key])) 
                        {
                            if (original[key].length === source[key].length) 
                            {
                                for (let i = 0; i < original[key].length; i++) 
                                {
                                    if (original[key][i] !== source[key][i]) 
                                    {
                                        changed = true;
                                        break;
                                    }
                                }
                            }
                            else 
                            {
                                changed = true;
                            }
                            original[key] = source[key].slice(0);
                        }
                    }
                    else if (typeof original[key] != "object")
                    {
                        if (original[key] !== source[key]) changed = true;

                        original[key] = source[key];
                    }
                }
            }
        }
    }

    return changed;
}

const Color = {
    isCSS: function(color) 
    {
        return /^#([0-9A-F]{3}){1,2}$/i.test(color);
    },
    CSSToHex: function(color) 
    {
        return Math.floor(color.replace("#", "0x"));
    },
    hexToRGB: function(hexColor) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }
}

function decimalToHexString(number) 
{
    if (number < 0) 
    {
        number = 0xFFFFFFFF + number + 1;
    }

    return number.toString(36);
}

function hashFunction(str) 
{
    var h = 0, l = str.length, i = 0;
    if ( l > 0 )
        while (i < l)
          h = (h << 5) - h + str.charCodeAt(i++) | 0;
    // if (h < 0)
    //     h = Math.abs(Number(h + "" + "1"))
    return h;
}

const Utils = 
{
    image: ImageUtils,
    color: Color,
    merge: merge,
    hash: function(str) 
    {
        return decimalToHexString(hashFunction(str));
    }
}

export default Utils;