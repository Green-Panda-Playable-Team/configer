/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import GeneralBlock from "./GeneralBlock";

/**
 * @function
 * @name banner
 * @description This type of option is intended for specifying the banner with running text. It is a decoration type, and can be used for a more beautiful setting of options.
 * @param {string} title - message that will be shown to the user as a running text.
 * 
 * @example 
ENDCARD_2: {

   type: "banner",

   title: "Bellow, you can configure your end card as you wish."

}
 */

export default class BannerBlock extends GeneralBlock {
	// constructor(parent, name, obj)
	// {
	//     super(parent, name, obj);
	// }

	apply() {
		super.apply();

		this.title.innerText = this.obj.title || this.obj.msg || "";
	}

	build() {
		super.build();

		var banner = document.createElement("marquee");
		banner.id = this.id;
		banner.bgColor = "#dcdcdc";
		banner.loop = "-1";
		banner.scrollAmount = "2";
		banner.style.cssText =
			"width: 100%;padding: 5px;border-radius: 4px;font-family: monospace;background-color: #eeeeee;border: 1px solid #d8d8d8;";
		banner.innerText = this.obj.title || this.obj.msg || "";

		this.title = banner;
		this.html.appendChild(banner);
	}

	static getType() {
		return "banner";
	}
}

Block.register("banner", BannerBlock);
