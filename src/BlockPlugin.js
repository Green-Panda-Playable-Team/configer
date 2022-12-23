/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import InputBlock from './blocks/InputBlock';

const SUPPORTED_TYPES_MAP = {};

var BlockPlugin = 
{
    registers: 
    {
        all: [],

        value: [],

        src: []
    },

    has: function(type) 
    {
        return SUPPORTED_TYPES_MAP[type] !== undefined;
    },

    register: function(type, blockClass, parse) 
    {
        // console.log("HTML Block registered: " + type + " (" + blockClass.name + ")");

        this.registers.all.push(type);

        if (parse === "src") 
        {
            this.registers.src.push(type);
        }
        else if (parse === "value")
        {
            this.registers.value.push(type);
        }

        if (SUPPORTED_TYPES_MAP[type] === undefined) 
        {
            SUPPORTED_TYPES_MAP[type] = blockClass;
        }
        else 
        {
            console.warn("Type: " + type + " has already been registered. Please choose another key, to register this block: " + blockClass.name);
        }
    },

    get: function(type) 
    {
        if (SUPPORTED_TYPES_MAP[type] !== undefined) 
        {
            return SUPPORTED_TYPES_MAP[type];
        }
        else 
        {
            console.warn("Can't find " + type + " type of options. Please register this type using Block.register, or use another type.\nThe InputBlock was used.");
            return InputBlock;
        }
    }
}

BlockPlugin.register('text', InputBlock, "value");

export default BlockPlugin;