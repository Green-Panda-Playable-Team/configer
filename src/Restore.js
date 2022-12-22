
// Restore, dat.restore

const isResource = require('./IsResource');
const isSimple = require('./IsSimple');

module.exports = function(reference, parsed)
{
	if (typeof reference != "object" || typeof parsed != "object") 
	{
		return reference;
	}

	var obj;

	for (var key in parsed) 
	{
		obj = parsed[key];

		if (reference[key] != undefined && reference[key].type) 
		{
			if (typeof obj == "object") 
			{
				if (reference[key].type == "block") 
				{
					this.restore(reference[key].config, obj);
				}
				else if (isResource(reference[key]))
				{
					u.deepMixin(reference[key], obj);
				}
				else if (isSimple(reference[key])) 
				{
					u.deepMixin(reference[key].value, obj);
				}
				else if (reference[key].type == "list" && obj instanceof Array)
				{
					reference[key].list = obj.slice(0);
				}
			}
			else 
			{
				if (isSimple(reference[key])) 
				{
					reference[key].value = obj;
				}
			}
		}
	}

	return reference;
}