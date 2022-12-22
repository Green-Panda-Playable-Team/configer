/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import Container from "./Container";
/**
 * @function
 * @name block
 * @description This type of option is intended for specifining set of options grouped in a special block, that the user can hide / show.
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {string} value - object that contains another set of custom configer options.
 * 
 * @example 
    ENDCARD_BLOCK: {

        type: "block",

        title: "End card config",

        config: {

            LOGO_TEXT: {

                type: "text",

                title: "Logo text",

                value: "Your win!"

            },

            END_NUM: {

                type: "number",

                title: "Logo number",

                value: "Your win!",

                onChange: function() {}

            }

        }

    }
 */
export default class ItemsBlock extends Container {
	constructor(id, obj) {
		super(id, obj, false);

		super.apply();
	}

	apply(callCallback) {
		super.apply(callCallback);

		this.children.forEach(function (child) {
			child.apply(callCallback);
		});
	}

	build() {
		super.build();

		var options = this.obj;

		if (this.obj.config && this.obj.type === "block") {
			options = this.obj.config || {};
		}

		for (var name in options) {
			var obj = options[name];

			if (typeof obj == "object" && obj.type) {
				var blockClass = Block.get(obj.type);

				var objView = new blockClass(this.id + "_" + name, obj);

				this.children.push(objView);

				this.container.appendChild(objView.getHTML());
			}
		}

		if (this.children.length === 0) {
			const emptyListLabel = document.createElement("div");
			emptyListLabel.className = "cfger-empty-list-label";
			emptyListLabel.innerText = "No options here";
			this.container.appendChild(emptyListLabel);
		}
	}

	static getType() {
		return "block";
	}
}

Block.register("block", ItemsBlock);
