import BlockPlugin from "../BlockPlugin";
import OptionBlock from "./OptionBlock";

/**
 * @function
 * @name date
 * @description This type of option is intended for specifying the banner with running text. It is a decoration type, and can be used for a more beautiful setting of options.
 * @param {string} title - message that will be shown to the user as a running text.
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {string} value - default value date string of your option.
 * @param {boolean} oninput - if set to true onChange callback will be triggered oninput otherwise onchange.
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
    DATE: {

        type: "date",

        title: "Birthday:"

        value: "2022-12-10T18:20:04.138Z"
    }
 */
/**
 * @function
 * @name datetime
 * @see date
 */
export default class DateBlock extends OptionBlock {
	// constructor(parent, name, obj)
	// {
	//     super(parent, name, obj);
	// }

	build() {
		super.build();

		var _this = this;

		if (this.obj.value === undefined) this.obj.value = new Date();

		var input = document.createElement("input");
		input.id = this.id;
		input.type = this.obj.type === "datetime" ? "datetime-local" : "date";
		input.className = "form-control";

		if (this.obj.placeholder) {
			input.placeholder = this.obj.placeholder;
		}

		this.input = input;

		this.html.appendChild(input);

		function change() {
			_this.change(this.valueAsNumber, true);
		}

		if (this.obj.oninput) {
			input.oninput = change;
		} else {
			input.onchange = change;
		}
	}

	change(value, callCallback) {
		var changed = false;

		var prevValue = this.input.valueAsNumber;

		this.obj.value = new Date(this.obj.value);

		if (value !== undefined) {
			value = new Date(value);

			if (this.obj.value !== value) {
				changed = true;
			}

			this.obj.value = value;
		}

		if (this.defaultValue === undefined) this.defaultValue = this.obj.value;

		this.input.valueAsNumber = this.obj.value.getTime();

		if (this.input.valueAsNumber !== prevValue || changed) {
			changed = true;
			this.obj.changed = true;
		}

		if (changed && callCallback) {
			this.onChange(this.obj.value);
		}

		return changed;
	}

	static getType() {
		return ["date", "date-time"];
	}
}

BlockPlugin.register("date", DateBlock, "value");
BlockPlugin.register("datetime", DateBlock, "value");
