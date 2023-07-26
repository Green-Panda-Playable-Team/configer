/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

// Parse, configer.parse

import isResource from './IsResource';
import isSimple from './IsSimple';
import utils from './utils';

function _applyStringForObject(object, options) 
{
	var to_return = {};

	for (let i in object)
	{
		if (typeof object[i] === "string")
		{
			if (utils.color.isCSS(object[i])) 
			{
				if (options.convertCSSToHex) 
				{
					to_return[i] = utils.color.CSSToHex(object[i]);
				}
				else 
				{
					to_return[i] = object[i];
				}
			}
			else {
				to_return[i] = object[i].replaceAll("\\\\n", String.fromCharCode(10));
			}
		} 
		else if (typeof object[i] === "object")
		{
			if (Array.isArray(object[i])) 
			{
				to_return[i] = object[i].slice(0);
			}
			else 
			{
				to_return[i] = _applyStringForObject(object[i], options);
			}
		}
		else
		{
			to_return[i] = object[i];
		}
	}

	return to_return;
}

function parseResource(config, options) 
{
	var ret = void 0;

	if ((options.skipEmptyFiles && config.src && config.src.length > 0) || !options.skipEmptyFiles) 
	{
		if (options.imageAsValue && config.type === "image") 
		{
			ret = config.src;
		}
		else 
		{
    		ret = {
                type: config.type,
                src: config.src
            };

            if (options.includeFileName && config.name) 
            {
            	ret.name = config.name;
            }

            if (config.data) 
            {
            	ret.data = config.data;
            }
        }
	}

	return ret;
}

function parseConfig(config, options) 
{
	options = options || {};

    var ret = {};
    for (let i in config) 
    {
        if (config[i].ignore) 
        {
            continue;
        }
            
        if (isSimple(config[i].type)) 
        {
        	if (typeof config[i].value === "string") 
        	{
        		if (utils.color.isCSS(config[i].value)) 
				{
					if (options.convertCSSToHex) 
					{
						ret[i] = utils.color.CSSToHex(config[i].value);
					}
					else 
					{
						ret[i] = config[i].value;
					}
				}
				else 
				{
					ret[i] = config[i].value.replaceAll("\\\\n", String.fromCharCode(10));
				}
        	}
            else if (typeof config[i].value === "object" && !Array.isArray(config[i].value)) 
            {
            	if (Array.isArray(config[i].value)) 
            	{
            		ret[i] = config[i].value.slice(0);
            	} 
            	else 
            	{
            		ret[i] = _applyStringForObject(config[i].value, options);
            	}
            } 
            else 
            {
            	ret[i] = config[i].value;
            }
        } 
        else if (isResource(config[i].type)) 
        {
        	var parsedRes = parseResource(config[i], options);

        	if (parsedRes) 
        	{
        		ret[i] = parsedRes;
        	}
        }
        else if (config[i].type === "list") 
        {
        	ret[i] = [];

        	var list = config[i].list;
        	var template = config[i].template;

        	if (options.preserveList) 
        	{
        		ret[i] = list;
        	}
        	else if (list.length > 0) 
        	{
        		var element;

	        	for (let li = 0; li < list.length; li++) 
	        	{
	        		if (typeof list[li] === "object" && (list[li].type !== undefined || (template && template.type !== undefined))) 
	        		{
	        			var type = list[li].type || template.type;

	        			if (isSimple(type)) 
        				{
        					var elementVal;
        					if (type === "text" || type === "textarea") 
        					{
        						elementVal = list[li].value.replaceAll("\\\\n", String.fromCharCode(10));
        					}
        					else 
        					{
        						elementVal = list[li].value;
        					}

        					if (options.valuesList) 
        					{
        						element = 
        						{
        							value: elementVal
        						}
        					}
        					else 
        					{
        						element = elementVal;
        					}
        				}
        				else if (isResource(type)) 
				        {
				        	element = parseResource(list[li], options);
				        }
	        		}
	        		else 
	        		{
	        			element = list[li];
	        		}

	        		ret[i].push(element);
	        	}
	        }
        }
        else if (config[i].type === "block") 
        {
            ret[i] = parseConfig(config[i].config, options);
        }
        else if (config[i].block && config[i].block.parse) 
        {
        	var val = config[i].block.parse();

        	if (val !== undefined)
        	{
        		ret[i] = val;
        	}
        }
    }

    return ret;
}

function parse(config, options) 
{
    return parseConfig(config, options);
}

export default parse;