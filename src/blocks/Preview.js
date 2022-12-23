/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

export default class Preview
{
    constructor(parent) 
    {
        this.parent = parent;

        var preview = document.createElement("div");
        preview.id = parent.id + "_preview";
		preview.style.display = "none";
		preview.className = "select-preview"
		preview.title = "Preview";

        var previewImg = document.createElement("img");
		previewImg.id = parent.id + "_preview_img";
		previewImg.alt = "Preview is not avail";

		preview.appendChild(previewImg);

		previewImg.src = "";

		this.html = preview;

		parent.html.appendChild(preview);

		if (parent.obj.preview_width) 
		{
			previewImg.style.width = parent.obj.preview_width + "px";
		}
		if (parent.obj.preview_height) 
		{
			previewImg.style.height = parent.obj.preview_height + "px";
		}


		this.apply = function() 
		{
			var previndex = parent.obj.options.indexOf(parent.obj.value)

			preview.title = parent.obj.labels[previndex] || parent.obj.value;

			if (parent.obj.preview && parent.obj.preview.length > 0 && previndex < parent.obj.preview.length) 
			{
				preview.style.display = "flex";

				if (previndex >= -1) 
				{
					previewImg.src = parent.obj.preview[previndex];
				}
				else 
				{
					previewImg.src = "";
				}
			} 
			else 
			{
				preview.style.display = "none";
			}
		}

		this.apply();
    }
}
