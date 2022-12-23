
// GetOption, dat.getOption

function _getOption(reference, path, inkey, title) 
{
	title = title || "";

	if (reference.type == "block" && reference.config) 
	{
		title += (title.length > 0 ? " -> " : "") + reference.title
	}

	if (reference.type && (_simple_types.indexOf(reference.type) > -1 || _resource_types.indexOf(reference.type) > -1)) 
	{
		title += (title.length > 0 ? " -> " : "") + reference.title;

		return {
			id: inkey || "",
			title: title,
			obj: reference
		};
	}

	if (Array.isArray(path))
	{
		var key = path.shift();
		if (key) 
		{
			if (reference[key]) 
			{
				return this._getOption(reference[key], path, key, title);
			}
			else 
			{
				return {id: null, title: "", obj: {}};
			}
		}
		else 
		{
			return {
				id: inkey || "",
				title: title,
				obj: reference
			};
		}
	}
	else 
	{
		return {id: null, title: "", obj: {}};
	}
}

module.exports = function(reference, path) 
{
	if (typeof path == "string")
	{
		path = path.split(".");
	}

	var option = this._getOption(reference, path);

	return (option && option.obj) || {};
}