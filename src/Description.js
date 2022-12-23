
const isResource = require('./IsResource');
const isSimple = require('./IsSimple');

function parseConfigForTitle(reference, snapshot, titles, title) 
{
    titles = titles || [];

	title = title || "";

	snapshot = snapshot || reference;

	for (var i in reference) 
	{

		if (reference[i].ignore) 
        {
            continue;
        }

        var snapshotI = snapshot[i] || reference[i];

        var subTitle = title + (title.length > 0 ? " -> " : "") + reference[i].title;

		if (reference[i].type == "block" && reference[i].config) 
		{
			parseConfigForTitle(reference[i].config, snapshotI.config, titles, subTitle)
		}
		else 
		{
			if (reference[i].type && (isSimple(reference[i].type) || isResource(reference[i].type))) 
			{

				if (isResource(reference[i].type)) 
		        {
		        	var src = snapshotI.src || reference[i].src;

		        	if (src && src.length > 0) 
		        	{
		        		subTitle += ": " + ImageUtils.size(src, false, false) + "Kb.";
		        		titles.push(subTitle);
		        	}
		        }
		        else 
		        {
		        	var value = snapshotI.value;
		        	if (value == undefined) value = reference[i].value;

		        	if (reference[i].type == "select") 
		        	{
		        		var labels = reference[i].labels || reference[i].options;
		        		value = labels[reference[i].options.indexOf(value)] || value;
		        	}

		        	if (typeof value == "boolean") value = value ? "On" : "Off";
					subTitle += ": " + value;
					titles.push(subTitle);
		        }
			}
		}
	}

    return titles;
}

module.exports = function(config, snapshot) 
{
	return parseConfigForTitle(config, snapshot);
}