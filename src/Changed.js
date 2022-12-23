
const isResource = require('./IsResource');
const isSimple = require('./IsSimple');

function wasConfigChanged(config) 
{
    var changed = false;

    for (var i in config) 
    {
        if (isSimple(config[i].type) || isResource(config[i].type) || config[i].type === "list") 
        {
        	if (config[i].changed) 
        	{
        		config[i].changed = undefined;
        		changed = true;
        	}
        }  
        else if (config[i].type === "block") 
        {
        	if (wasConfigChanged(config[i].config)) 
        	{
        		changed = true;
        	}
        }
    }

    return changed;
}

module.exports = function(config) 
{
	return wasConfigChanged(config);
}