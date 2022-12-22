/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import OptionBlock from "./OptionBlock";

/**
 * @function
 * @name checkbox
 * @description This type of option is intended for specifying of checkbox field for user (specify Boolean type)
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {boolean} value - default value of your checkbox option
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
CHECK_TAPS: {

	type: "checkbox",

	title: "Check on user taps",

	value: true,

	onChange: function ( value ) {

		console.log( value )

	}

}
 */
export default class CheckboxBlock extends OptionBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	build() {
		super.build();

		var _this = this;

		var input = document.createElement("input");
		input.id = this.id;
		input.type = "checkbox";
		input.classList.add("checkbox");
		input.classList.add("optionCheckbox");

		this.input = input;

		this.html.appendChild(input);

		function change() {
			_this.change(this.checked, true);
		}

		input.onchange = change;
	}

	change(value, callCallback) {
		var changed = false;

		var prevValue = this.input.checked;

		if (value !== undefined) {
			if (this.obj.value !== value) {
				changed = true;
			}

			this.obj.value = value;
		}

		this.obj.value = this.obj.value || false;

		if (this.defaultValue === undefined) this.defaultValue = this.obj.value;
		this.input.checked = this.obj.value;

		if (this.input.checked !== prevValue || changed) {
			changed = true;
			this.obj.changed = true;
		}

		if (changed && callCallback) {
			this.onChange(this.obj.value);
		}

		return changed;
	}

	static getType() {
		return "checkbox";
	}
}

Block.register("checkbox", CheckboxBlock, "value");
