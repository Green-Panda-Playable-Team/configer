/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import GeneralBlock from "./GeneralBlock";

/**
 * @function
 * @name button
 * @description This type of option is intended for specifying the button element. You can use this type to call specific code, test something, apply changes for a group of options, or specify some values for a group of options.
 * @param {string} title - button label will be shown inside
 * @param {string} label - same as title
 * @param {string} innerHTML - field to specify custom button content (icon for example)
 * @param {string} bootstrap - field to specify button class from bootstrap library
 * @param {Function} click - function that will be called when the user clicks on the button
 * @param {Function} onClick - the same as click
 * @param {Function} onChange - the same as click
 * 
 * @example 
 * FIREWORK_TEST: {

   type: "button",

   title: "Click to run",

   onClick: function() {

      game.runFirework();

   },

}
 */
export default class ButtonBlock extends GeneralBlock {
	// constructor(parent, name, obj)
	// {
	//     super(parent, name, obj);
	// }

	apply(callCallback) {
		super.apply();

		if (this.obj.innerHTML) {
			this.button.innerHTML = this.obj.innerHTML;
		} else {
			this.button.innerText =
				this.obj.title || this.obj.label || "Click me";
		}
	}

	build() {
		super.build();

		var obj = this.obj;

		var button = document.createElement("button");
		button.classList.add("btn");

		if (obj.bootstrap) {
			button.classList.add(obj.bootstrap);
		} else {
			button.classList.add("btn-info");
		}

		button.id = this.id;

		button.title = obj.description || "";

		if (obj.innerHTML) {
			button.innerHTML = obj.innerHTML;
		} else {
			button.innerText = obj.title || obj.label || "Push me";
		}

		button.onclick = function () {
			if (typeof obj.onChange == "function") obj.onChange.call(obj);

			if (typeof obj.onClick == "function") obj.onClick.call(obj);

			if (typeof obj.click == "function") obj.click.call(obj);
		};

		this.button = this.title = button;

		this.html.style.textAlign = "center";

		this.html.appendChild(button);
	}

	static getType() {
		return "button";
	}
}

Block.register("button", ButtonBlock, "value");
