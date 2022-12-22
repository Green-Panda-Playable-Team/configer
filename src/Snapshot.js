
// Snapshot, dat.snapshot

module.exports = function(config) 
{
	var ignorable_str = ["type", "title", "selectedText", "description"];
	var ignorable_num = ["selectedIndex", "preview_width", "preview_height"];
	var ignorable_bool = ["changed"];
	var ignorable_array = ["preview", "options", "labels", "selectedTexts", "selectedIndexes"];

	var type_of;

	var source_str = JSON.stringify(config, function(key, value) {
				type_of = typeof value;

				if (key === "block" && type_of === "object" && value.show && value.hide && value.apply && value.disable) 
				{
					return undefined;
				}
				if (ignorable_str.indexOf(key) > -1 && type_of === "string") 
				{
					return undefined;
				}
				else if (ignorable_bool.indexOf(key) > -1 && type_of === "boolean") 
				{
					return undefined;
				}
				else if (ignorable_num.indexOf(key) > -1 && !isNaN(Number(value))) 
				{
					return undefined;
				}
				else if (ignorable_array.indexOf(key) > -1 && Array.isArray(value)) 
				{
					return undefined;
				}
				else if (key === "list" && Array.isArray(value)) 
				{
					return JSON.stringify(value);
				}
				else if (key === "value" && type_of === "object") 
				{
					return "json:parse:::" + JSON.stringify(value);
				}
				else 
				{
					return value;
				}  
			})

	return JSON.parse(source_str, function(key, value) {
		if (key === "list" && typeof value === "string") 
		{
	    	return JSON.parse(value);
	    }
	    else if (key === "value" && typeof value === "string" && value.startsWith("json:parse:::")) 
		{
		    return JSON.parse(value.replace("json:parse:::", ""));
	    }
	    else 
	    {
		    return value;
		}
	})
}