/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import OptionBlock from "./OptionBlock";

/**
 * @function
 * @name title
 * @description This type of option is intended for display text title.
 * @param {string} title - tittle.
 * 
 * @example 
    ENDCARD_TITLE: {
        type: "title",
        title: "End Card options"
    }
 */
export default class TitleBlock extends OptionBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	build() {
		super.build();

		this.html.style.marginBottom = "5px";
	}

	static getType() {
		return "title";
	}
}

Block.register("title", TitleBlock);
