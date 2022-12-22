/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import OptionBlock from "./OptionBlock";
/**
 * @function
 * @name text
 * @description This type of option is intended for specifying of text field for user
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {string} value - default value of your text option.
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
    LOGO_TEXT: {
        type: "text",
        title: "Logo text",
        value: "Your win!",
        onChange: function ( value ) {
            console.log( value )
        }
    }
 */
export default class BaseInputBlock extends OptionBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	build() {
		super.build();

		var _this = this;

		if (this.obj.value === undefined) this.obj.value = "";

		var input = document.createElement("input");
		input.id = this.id;
		input.type = this.obj.type;
		input.className = "form-control";

		if (this.obj.placeholder) {
			input.placeholder = this.obj.placeholder;
		}

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

	change(value, callCallback) {
		var changed = false;

		var prevValue = this.input.value;

		if (value !== undefined) {
			if (this.obj.value !== value) {
				changed = true;
			}

			this.obj.value = value;
		}

		if (this.defaultValue === undefined) this.defaultValue = this.obj.value;
		this.input.value = "" + this.obj.value;

		if (this.input.value !== prevValue || changed) {
			changed = true;
			this.obj.changed = true;

			if (this.indicator) {
				this.indicator.apply();
			}
		}

		if (changed && callCallback) {
			this.onChange(this.obj.value);
		}

		return changed;
	}

	static getType() {
		return "input";
	}
}
