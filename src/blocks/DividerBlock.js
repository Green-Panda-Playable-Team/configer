/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import GeneralBlock from "./GeneralBlock";
/**
 * @function
 * @name divider
 * @description This type of option is intended for logical separating different sets of other options.
 * @param {string} title - information message of your divider, if you don't specify this parameter, HTML Builder will build only horizontal line.
 * 
 * @example 
        ENDCARD: {
            type: "divider",
            title: "End Card options"
        }
 */
export default class DividerBlock extends GeneralBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	apply() {
		super.apply();

		if (this.title) {
			this.obj.title = this.obj.title || this.obj.msg || "";
			this.title.innerText = this.obj.title;
		}
	}

	build() {
		super.build();

		const { obj, html, id } = this;

		obj.title = obj.title || obj.msg;

		if (obj.title && obj.title.length > 0) {
			html.classList.add("cfger-divider-block");

			var label = document.createElement("label");
			label.id = id;
			label.innerText = obj.title;
			this.title = label;
			html.appendChild(label);
		} else {
			var hr = document.createElement("hr");
			hr.id = id;
			html.appendChild(hr);
		}
	}

	static getType() {
		return "divider";
	}
}

Block.register("divider", DividerBlock);
