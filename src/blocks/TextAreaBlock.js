/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import OptionBlock from "./OptionBlock";
import InputBlock from "./InputBlock";

/**
 * @function
 * @name textarea
 * @description This type of option is intended for specifying of text area for user
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {string} value - default value of your textarea option
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
    LOGO_TEXT: {
        type: "textarea",
        title: "Finish text",
        value: "Here is long text...",
        onChange: function ( value ) {
            console.log( value )
        }
    }
 */
export default class TextAreaBlock extends OptionBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	build() {
		super.build();

		var _this = this;

		if (this.obj.value === undefined) this.obj.value = "";

		var input = document.createElement("textarea");
		input.id = this.id;
		input.className = "form-control form-control-sm";

		this.input = input;

		this.html.appendChild(input);

		function change() {
			_this.change(this.value, true);
		}

		if (this.obj.oninput) {
			input.oninput = change;
		} else {
			input.onchange = change;
		}
	}

	static getType() {
		return "textarea";
	}
}

TextAreaBlock.prototype.change = InputBlock.prototype.change;

Block.register("textarea", TextAreaBlock, "value");
