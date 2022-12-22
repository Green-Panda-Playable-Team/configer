/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import OptionBlock from "./OptionBlock";
import Indicator from "./Indicator";

function snap(obj) {
	if (obj.snap && obj.snap.length > 0) {
		obj.snap_threshold = obj.snap_threshold || obj.snap_treshhold;
		obj.snap_threshold = obj.snap_threshold || 0;

		var snpValue = Number(obj.value);

		for (var s in obj.snap) {
			if (
				snpValue > obj.snap[s] - obj.snap_threshold &&
				snpValue < obj.snap[s] + obj.snap_threshold
			) {
				obj.value = obj.snap[s];
				break;
			}
		}
	}
}

/**
 * @function
 * @name range
 * @description This type of option is intended for specifying of range field for user (it is view for number type of option)
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {number} value - default value of your range option.
 * @param {number} min - minimum value that user can set.
 * @param {number} max - maximum value that user can set.
 * @param {number} step - step of increasing or decreasing number.
 * @param {number[]} snap - set of numbers to specify points to snap input cursor to these points.
 * @param {number} snap_threshold - threshold of value to snap it to set point.
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
LOGO_POSITION: {

   type: "range",

   title: "Position of logo",

   value: 34,

   min: -700,

   max: 700,

   step: 1,

   snap: [0, -100, 100],

   snap_threshold: 10,

   onChange: function ( value ) {

      console.log( value )

   }

}
 */
export default class RangeBlock extends OptionBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	build() {
		super.build();

		var obj = this.obj;

		obj.min = obj.min || 0;
		obj.max = obj.max || 0;
		obj.step = obj.step || 1;
		obj.value = obj.value || 0;

		var input = document.createElement("input");
		input.id = this.id;
		input.type = obj.type;
		input.className = "custom-range";
		input.title = "from " + obj.min + " to " + obj.max;

		input.min = obj.min;

		input.max = obj.max;

		input.step = obj.step;

		input.value = obj.value || 0;

		this.input = input;

		this.html.appendChild(input);

		var _this = this;

		function change() {
			_this.change(Number(this.value), true);
		}

		if (obj.oninput === false) {
			input.onchange = change;
		} else {
			input.oninput = change;
		}

		this.indicator = new Indicator(this);
	}

	change(value, callCallback) {
		var changed = false;

		var prevValue = this.input.value;

		var obj = this.obj;

		if (value !== undefined) {
			if (!obj.oninput) {
				if (typeof obj.min === "number" && value < obj.min) {
					value = obj.min;
				} else if (typeof obj.max === "number" && value > obj.max) {
					value = obj.max;
				}
			}

			if (obj.value !== value) {
				changed = true;
			}

			obj.value = value;

			snap(obj);
		}

		if (obj.min !== this.input.min) this.input.min = "" + obj.min;

		if (obj.max !== this.input.max) this.input.max = "" + obj.max;

		if (obj.step !== this.input.step) this.input.step = "" + obj.step;

		this.input.value = "" + obj.value;

		if (obj.max === obj.min) {
			this.input.classList.add("cfger-disabled");
		} else {
			this.input.classList.remove("cfger-disabled");
		}

		if (this.input.value !== obj.value) {
			obj.value = Number(this.input.value);
		}

		if (this.defaultValue === undefined) this.defaultValue = obj.value;
		this.input.title = "from " + obj.min + " to " + obj.max;
		this.input.value = "" + obj.value;
		this.indicator && this.indicator.apply();

		if (this.input.value !== prevValue || changed) {
			changed = true;
			obj.changed = true;
		}

		if (changed && callCallback) {
			this.onChange(obj.value);
		}

		return changed;
	}

	static getType() {
		return "range";
	}
}

Block.register("range", RangeBlock, "value");
