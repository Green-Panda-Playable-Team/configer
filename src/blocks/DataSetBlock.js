/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import Container from "./Container";
// import GeneralBlock from './GeneralBlock';
import utils from "../utils";

/**
 * @function
 * @name data_set
 * @description This complex type of option is intended for specifining of set of any input field for the user. Supports:

text

number / range

color

checkbox




If you specify min or max property, then number type will be replaced with range type.

If you specify value as "#f42344" - then this option will be built as a color field.

 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {object} value - json object format of data set, from which will be built set of fields for the user. You can specify any json object.
 * @param {number} min - minimum value that user can set for each number type.
 * @param {number} max - maximum value that user can set for each number type.
 * @param {number} step - step of increasing or decreasing number for each number type.
 * @param {number[]} snap - set of numbers to specify points to snap input cursor to these points for each range type.
 * @param {number} snap_threshold - threshold of value to snap it to set point for each range type.
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
 * TEXT_CONFIGURATION: {

   type: "data_set",

   title: "Logo text configuration",

   value: {

      number: 0, 

      string: "Hello", 

      boolean: true, 

      color: "#1abc9c"

   },

   onChange: function ( value ) {

      console.log( value )

   }

}
 */

/**
 * @function
 * @name range_set
 * @description This complex type of option is intended for specifining of set of ranges fields for the user.
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {object} value - json object format of range set, from which will be built set of ranges. You can specify any json object, builder will select only number or object types.
 * @param {number} min - minimum value that user can set for each number type.
 * @param {number} max - maximum value that user can set for each number type.
 * @param {number} step - step of increasing or decreasing number for each number type.
 * @param {number[]} snap - set of numbers to specify points to snap input cursor to these points for each range type.
 * @param {number} snap_threshold - threshold of value to snap it to set point for each range type.
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
	LOGO_POSITION: {

		type: "range_set",

		title: "Position of logo",

		value: {

			Portrait: {

				X: 150,

				Y: 100

			},

			Landscape: {

				X: 0,

				Y: 50 

			}

		},

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
export default class DataSetBlock extends Container {
	constructor(id, obj) {
		super(id, obj, false);

		super.apply();

		if (this.defaultValue === undefined)
			this.defaultValue = JSON.stringify(this.obj.value);
	}

	apply(callCallback) {
		super.apply(callCallback);

		return this.change(void 0, callCallback);
	}

	setData(value, levels) {
		levels = levels || [];

		var changed = false;

		for (var key in value) {
			if (typeof value[key] === "object") {
				levels.push(key);
				changed = changed || this.setData(value[key], levels);
				levels.pop();
			} else {
				const id = this.id + "_" + levels.join("_") + "_" + key;

				var input = this.children.find((child) => child.id === id);

				input.obj.min = this.obj.min;
				input.obj.max = this.obj.max;
				input.obj.step = this.obj.step;
				input.obj.value = value[key];

				changed = input.change(void 0, false);
			}
		}

		return changed;
	}

	reset(callCallback) {
		if (this.defaultValue !== undefined) {
			return this.change(
				JSON.parse(this.defaultValue),
				callCallback !== false
			);
		}

		return false;
	}

	buildHeader() {
		super.buildHeader();

		var button_reset = document.createElement("button");
		button_reset.classList.add("cfger-button");
		button_reset.style.marginRight = "5px";
		button_reset.title = "Reset to default";
		button_reset.innerHTML = '<i class="fas fa-undo"></i>';

		var _this = this;

		button_reset.onclick = function (e) {
			e.stopPropagation();
			_this.reset();
		};

		this.header.insertBefore(button_reset, this.expandButton);
	}

	build() {
		super.build();

		var obj = this.obj;

		this.container.style.fontFamily = "monospace";

		var types = {
			number: "number",
			boolean: "checkbox",
			string: "text",
			color: "color",
		};

		if (obj.type === "range_set") {
			obj.min = obj.min || 0;
			obj.max = obj.max || 0;
		}

		if (obj.min !== undefined && obj.max !== undefined) {
			obj.min = obj.min || 0;
			obj.max = obj.max || 0;

			types["number"] = "range";
		}

		if (typeof obj.value !== "object") {
			if (types["number"] === "range") {
				obj.value = { x: 0, y: 0 };
			} else {
				obj.value = {
					number: 0,
					string: "Hello",
					boolean: true,
					color: "#1abc9c",
				};
			}
		}

		var object_level = 0,
			object_level_key = [];

		function globalChange() {
			obj.changed = true;

			if (typeof obj.onChange === "function") {
				obj.onChange.call(obj, obj.value);
			}
		}

		function buildObject(key, value, object) {
			if (typeof value === "object") {
				var element = document.createElement("label");
				element.id =
					this.id + "_" + object_level_key.join("_") + "_" + key;
				element.style.marginLeft = object_level * 10 + "px";
				element.innerText = key + ":";
				this.container.appendChild(element);

				object_level += 1;
				object_level_key.push(key);
				for (var obj_key in value) {
					buildObject.call(this, obj_key, value[obj_key], value);
				}

				object_level -= 1;
				object_level_key.pop();
			} else {
				var blockClasss;

				var fieldType = types[typeof value];

				if (utils.color.isCSS(value)) {
					fieldType = "color";
				}

				blockClasss = Block.get(fieldType);

				var input = new blockClasss(
					this.id + "_" + object_level_key.join("_") + "_" + key,
					{
						value: value,
						type: fieldType,
						min: obj.min,
						max: obj.max,
						step: obj.step,
						title: key + ":",
						onChange: function () {
							object[key] = this.value;
							globalChange();
						},
					}
				);

				this.children.push(input);

				var inputElement = input.getHTML();
				inputElement.style.marginLeft = object_level * 10 + "px";
				inputElement.style.marginBottom = "10px";
				inputElement.style.justifyContent = "flex-start";

				this.container.appendChild(inputElement);
			}
		}

		for (var key in obj.value) {
			buildObject.call(this, key, obj.value[key], obj.value);
		}
	}

	change(value, callCallback) {
		var changed = false;

		if (value !== undefined) {
			changed = utils.merge(this.obj.value, value);

			if (changed) {
				this.setData(this.obj.value);
			}
		} else {
			changed = this.setData(this.obj.value);
		}

		if (changed && callCallback) {
			this.onChange(this.obj.value);
		}

		return changed;
	}

	static getType() {
		return ["data_set", "range_set"];
	}
}

Block.register("data_set", DataSetBlock, "value");
Block.register("range_set", DataSetBlock, "value");
