/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import OptionBlock from "./OptionBlock";

/**
 * @function
 * @name font
 * @description This complex type of option is intended for specifining <b>font styles</b> input field.
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {object} font - specifies list of available fonts with options and labels. 
 * @param {object} weight - specifies list of available weights with options and labels. 
 * @param {object} size - specifies <b>min, max, step</b> values for  <b>size</b> field. 
 * @param {object} strokeWidth - specifies <b>min, max, step</b> values for <b>strokeWidth</b> field. 
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
	TITLE_FONT: {

		type: "font",

		title: "Title style:",

		font: {
			options: ["Arial", "Arial Black", "Custom"]
			labels: ["Font 1", "Font 2", "Font 3"]
		},
		weight: {
			options: [400, 600, 700]
			labels: ["Normal", "Bold", "Bolder"]
		},
		size: {
			min: 1,
			max: 30,
			step: 1
		},
		strokeWidth: {
			min: 0,
			max: 5,
			step: 1
		},

		value: {
			size: 10,
			font: "Arial",
			weight: 600,
			color: {
				color: "#ff0000",
				alpha: 0.5
			},
			strokeColor: "#00ff00",
			strokeWidth: 2,
		},


		onChange: function ( value ) {

			console.log( value )

		}

	}
 */
export default class FontBlock extends OptionBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	buildColor(id, valueObj, title, onChange) {
		var row = document.createElement("div");
		row.className = "font-row";

		var label = document.createElement("div");
		label.className = "font-label";
		label.innerText = title;
		row.appendChild(label);

		var input_container = document.createElement("div");
		input_container.className =
			"color-alpha-input-container font-color-container";

		var input = document.createElement("input");
		input.type = "color";
		input.className = "form-control color-alpha-input-color";
		input.value = valueObj[id];

		input_container.appendChild(input);
		row.appendChild(input_container);
		function change() {
			onChange(input, this.value, true);
		}
		input.onchange = change;

		return row;
	}

	changeColor(input, value, callCallback) {
		var changed = false;

		var prevValue = input.value;

		if (value !== undefined) {
			if (this.value[this.key] !== value) {
				changed = true;
			}

			this.value[this.key] = value;
		}

		// if (this.defaultValue === undefined)
		// 	this.defaultValue = this.obj.value.color;
		input.value = "" + this.value[this.key];

		if (input.value !== prevValue || changed) {
			changed = true;
			this.obj.changed = true;
		}

		if (changed && callCallback) {
			this.self.onChange(this.value);
		}

		return changed;
	}

	changeColorAlpha(colorInput, alphaInput, value, callCallback) {
		var changed = false;

		var prevValue = {
			color: colorInput.value,
			alpha: alphaInput.value,
		};

		if (value !== undefined) {
			if (this.value[this.key].color !== value) {
				changed = true;
			}

			this.value[this.key].color = value;
		}

		// if (this.defaultValue === undefined)
		// 	this.defaultValue = this.obj.value.color;

		colorInput.value = "" + this.value[this.key].color.color;

		alphaInput.value = this.value[this.key].color.alpha;

		colorInput.style.opacity = alphaInput.value;

		if (
			colorInput.value !== prevValue.color ||
			alphaInput.value !== prevValue.alpha ||
			changed
		) {
			changed = true;
			this.obj.changed = true;
		}

		if (changed && callCallback) {
			this.self.onChange(this.value);
		}

		return changed;
	}

	buildColorAlpha(id, valueObj, title, onChange) {
		var row = document.createElement("div");

		row.className = "font-row";

		var label = document.createElement("div");
		label.className = "font-label";

		label.innerText = title;

		var container = document.createElement("div");
		container.className =
			"color-alpha-input-container font-color-container";

		row.append(label);

		row.append(container);

		var input_block = document.createElement("div");
		input_block.className = "color-alpha-input-color-border";

		var input = document.createElement("input");
		input.type = "color";
		input.value = valueObj[id].color;
		input.className = "form-control color-alpha-input-color";

		input_block.appendChild(input);
		container.appendChild(input_block);

		var alpha_btn = document.createElement("div");
		alpha_btn.className = "color-alpha-btn config-drowdown-btn";
		var alpha_icon = document.createElement("i");
		alpha_icon.className = "far fa-eye";
		alpha_btn.appendChild(alpha_icon);

		var container_drowdown = document.createElement("div");
		container_drowdown.append(alpha_btn);

		var popover = document.createElement("div");
		popover.classList.add("config-popover-container");

		var config_block = document.createElement("div");

		config_block.className = "config-popover-block alpha-input-block";

		var alpha_label = document.createElement("label");
		alpha_label.className = "form-label";
		alpha_label.innerText = "Color transparency";
		var alpha_input = document.createElement("input");
		alpha_input.value = valueObj[id].alpha;

		alpha_input.className = "custom-range";
		alpha_input.min = 0;
		alpha_input.max = 1;
		alpha_input.step = 0.01;
		alpha_input.type = "range";

		var alpha_input_container = document.createElement("div");

		alpha_input_container.style.display = "flex";
		alpha_input_container.style.flexDirection = "column";

		alpha_input_container.style.padding = "0 10px";
		alpha_input_container.appendChild(alpha_input);

		config_block.appendChild(alpha_label);

		config_block.appendChild(alpha_input_container);

		popover.append(config_block);

		var backdrop = document.createElement("div");
		backdrop.className = "block-popover-backdrop";

		container.appendChild(backdrop);

		var isOpen = false;

		alpha_btn.show = () => {
			isOpen = true;
			alpha_btn.classList.add("active");
			backdrop.classList.add("active");
			config_block.classList.add("active");
		};
		alpha_btn.hide = () => {
			isOpen = false;
			alpha_btn.classList.remove("active");
			backdrop.classList.remove("active");
			config_block.classList.remove("active");
		};

		backdrop.onclick = () => alpha_btn.hide();

		alpha_btn.onclick = (e) => {
			e.stopPropagation();

			if (isOpen) alpha_btn.hide();
			else alpha_btn.show();
		};

		container_drowdown.append(popover);

		container.appendChild(container_drowdown);

		function changesColor() {
			onChange(
				input,
				alpha_input,
				{ color: this.value, alpha: alpha_input.value },
				true
			);
		}
		function changesAlpha() {
			onChange(
				input,
				alpha_input,
				{ color: input.value, alpha: this.value },
				true
			);
		}

		alpha_input.onchange = changesAlpha;
		input.onchange = changesColor;

		return row;
	}

	buildRange(id, valueObj, title, rangeTitle, options, onChange) {
		var container = document.createElement("div");

		container.className = "font-row";

		var label = document.createElement("div");
		label.className = "font-label";
		label.innerText = title;

		var label_value = document.createElement("div");
		label_value.className = "font-value";
		label_value.innerText = valueObj[id];

		label_value.style.setProperty(
			"--max-value-length",
			(options.max + "").length * 10 + "px"
		);

		container.appendChild(label);
		container.appendChild(label_value);

		var size_btn = document.createElement("div");
		size_btn.title = rangeTitle;
		size_btn.className =
			"color-alpha-btn config-drowdown-btn font-range-btn";

		size_btn.appendChild(label_value);
		var icon = document.createElement("i");
		icon.className = "fas fa-sort-down font-range-icon";
		size_btn.appendChild(icon);

		var container_drowdown = document.createElement("div");
		container_drowdown.classList = "font-input";
		container_drowdown.append(size_btn);

		var popover = document.createElement("div");
		popover.classList.add("config-popover-container");

		var config_block = document.createElement("div");

		config_block.className = "config-popover-block alpha-input-block";

		var size_label = document.createElement("label");
		size_label.className = "popover-label form-label";
		size_label.htmlFor = this.id + "_font_size_input";
		size_label.innerText = rangeTitle;
		var size_input = document.createElement("input");
		size_input.value = valueObj[id];

		var sizeOptions = options;

		size_input.className = "custom-range";
		size_input.id = this.id + id + "_font_size_input";
		size_input.min = sizeOptions.min;
		size_input.max = sizeOptions.max;
		size_input.step = sizeOptions.step;
		size_input.type = "range";

		var size_input_container = document.createElement("div");
		size_input.style.setProperty(
			"--label-min",
			"'" + sizeOptions.min + "'"
		);
		size_input.style.setProperty(
			"--label-max",
			"'" + sizeOptions.max + "'"
		);

		size_input_container.style.display = "flex";
		size_input_container.style.flexDirection = "column";

		size_input_container.style.padding = "0 10px";
		size_input_container.appendChild(size_input);

		config_block.appendChild(size_label);

		config_block.appendChild(size_input_container);

		popover.append(config_block);

		var backdrop = (this.backdrop = document.createElement("div"));
		backdrop.className = "block-popover-backdrop";

		container.appendChild(backdrop);

		var isOpen = false;

		size_btn.show = () => {
			isOpen = true;
			size_btn.classList.add("active");
			backdrop.classList.add("active");
			config_block.classList.add("active");
		};
		size_btn.hide = () => {
			isOpen = false;
			size_btn.classList.remove("active");
			backdrop.classList.remove("active");
			config_block.classList.remove("active");
		};

		backdrop.onclick = () => size_btn.hide();

		size_btn.onclick = (e) => {
			e.stopPropagation();
			if (isOpen) size_btn.hide();
			else size_btn.show();
		};

		container_drowdown.append(popover);

		container.appendChild(container_drowdown);

		function change() {
			onChange(size_input, Number(this.value), true);

			label_value.innerText = this.value;
		}

		size_input.onchange = change;

		return container;
	}

	changeRange(input, value, callCallback) {
		var changed = false;

		var prevValue = input.value;

		var obj = this.options;

		if (value !== undefined) {
			if (typeof obj.min === "number" && value < obj.min) {
				value = obj.min;
			} else if (typeof obj.max === "number" && value > obj.max) {
				value = obj.max;
			}

			if (this.value[this.key] !== value) {
				changed = true;
			}

			this.value[this.key] = value;
		}

		if (obj.min !== input.min) input.min = "" + obj.min;

		if (obj.max !== input.max) input.max = "" + obj.max;

		if (obj.step !== input.step) input.step = "" + obj.step;

		input.value = "" + this.value[this.key];

		if (obj.max === obj.min) {
			input.classList.add("cfger-disabled");
		} else {
			input.classList.remove("cfger-disabled");
		}

		if (input.value !== this.value[this.key]) {
			this.value[this.key] = Number(input.value);
		}

		// if (self.defaultValue === undefined)
		// 	this.defaultValue = this.value[this.key];
		input.title = "from " + obj.min + " to " + obj.max;
		input.value = "" + this.value[this.key];

		if (value.value !== prevValue || changed) {
			changed = true;
			this.obj.changed = true;
		}

		if (changed && callCallback) {
			this.self.onChange(this.value[this.key]);
		}

		return changed;
	}

	buildSelect(id, valueObj, title, config, onChange) {
		var row = document.createElement("div");
		row.className = "font-row";

		var label = document.createElement("div");
		label.className = "font-label";
		label.innerText = title;

		row.appendChild(label);

		config.options = config.options || ["none"];
		config.labels = config.labels || [];
		valueObj[id] =
			typeof valueObj[id] === "undefined"
				? config.options[0]
				: valueObj[id];

		var isNumbers = true;
		for (var i in config.options) {
			if (typeof config.options[i] !== "number") {
				isNumbers = false;
				break;
			}
		}

		var input = document.createElement("select");
		input.value = valueObj[id];
		input.className = "form-select form-select-sm";

		for (var t in config.options) {
			var value = config.options[t];
			var text = config.labels[t] || value;

			var option = document.createElement("option");
			option.value = value;
			option.innerText = text;

			if (value === config.value) {
				option.selected = true;
				this.selectedText = config.selectedText = text;
				this.selectedIndex = config.selectedIndex = Number(t);
			}

			input.appendChild(option);
		}

		row.appendChild(input);

		// this.input = input;

		// this.html.appendChild(input);

		// this.preview = new Preview(this);

		function change() {
			var value = this.value;

			if (isNumbers) {
				value = Number(this.value);
			}

			onChange(input, value, true);
		}

		input.onchange = change;

		return row;
	}

	changeSelect(input, value, callCallback) {
		var changed = false;

		var prevValue = input.value;

		if (value !== undefined) {
			if (this.value[this.key] !== value) {
				changed = true;
			}

			this.value[this.key] = value;
		}

		var valueIndex = this.config.options.indexOf(this.value[this.key]);

		if (valueIndex === -1) {
			valueIndex = 0;
			this.value[this.key] = this.config.options[valueIndex];
		}

		this.config.selectedIndex = valueIndex;
		this.config.selectedText = input.options[valueIndex].innerText;

		input.value = "" + this.value[this.key];

		if (input.value !== prevValue || changed) {
			changed = true;
			this.obj.changed = true;
		}

		if (changed && callCallback) {
			this.self.onChange(this.value);
		}

		return changed;
	}

	build() {
		super.build();

		this.html.style.alignItems = "flex-start";
		var container = document.createElement("div");

		container.className = "custom-input-container";

		this.html.appendChild(container);

		if (
			typeof this.obj.value.font !== "undefined" &&
			typeof this.obj.font === "object"
		) {
			container.appendChild(
				this.buildSelect(
					"font",
					this.obj.value,
					"Font:",
					this.obj.font,
					this.changeSelect.bind({
						self: this,
						obj: this.obj,
						value: this.obj.value,
						config: this.obj.font,
						key: "font",
					})
				)
			);
		}

		if (typeof this.obj.value.size !== "undefined") {
			const sizeOptions = this.obj.size || {
				min: 1,
				max: 30,
				step: 1,
			};

			container.appendChild(
				this.buildRange(
					"size",
					this.obj.value,
					"Size:",
					"Font size",
					sizeOptions,
					this.changeRange.bind({
						self: this,
						obj: this.obj,
						options: sizeOptions,
						value: this.obj.value,
						key: "size",
					})
				)
			);
		}

		if (
			typeof this.obj.value.weight !== "undefined" &&
			typeof this.obj.weight === "object"
		) {
			container.appendChild(
				this.buildSelect(
					"weight",
					this.obj.value,
					"Weight:",
					this.obj.weight,
					this.changeSelect.bind({
						self: this,
						obj: this.obj,
						value: this.obj.value,
						config: this.obj.weight,
						key: "weight",
					})
				)
			);
		}

		if (typeof this.obj.value.color === "object") {
			container.appendChild(
				this.buildColorAlpha(
					"color",
					this.obj.value,
					"Color:",
					this.changeColorAlpha.bind({
						self: this,
						obj: this.obj,
						value: this.obj.value,
						key: "color",
					})
				)
			);
		} else if (typeof this.obj.value.color === "string") {
			container.appendChild(
				this.buildColor(
					"color",
					this.obj.value,
					"Color:",
					this.changeColor.bind({
						self: this,
						obj: this.obj,
						value: this.obj.value,
						key: "color",
					})
				)
			);
		}

		if (typeof this.obj.value.strokeWidth !== "undefined") {
			const strokeWidthOptions = this.obj.strokeWidth || {
				min: 0,
				max: 30,
				step: 1,
			};

			container.appendChild(
				this.buildRange(
					"strokeWidth",
					this.obj.value,
					"Stroke width:",
					"Stroke Width",
					strokeWidthOptions,
					this.changeRange.bind({
						self: this,
						obj: this.obj,
						options: strokeWidthOptions,
						value: this.obj.value,
						key: "strokeWidth",
					})
				)
			);
		}

		if (typeof this.obj.value.strokeColor !== "undefined") {
			if (typeof this.obj.value.strokeColor === "object") {
				container.appendChild(
					this.buildColorAlpha(
						"strokeColor",
						this.obj.value,
						"Stroke color:",
						this.changeColorAlpha.bind({
							self: this,
							obj: this.obj,
							value: this.obj.value,
							key: "strokeColor",
						})
					)
				);
			} else if (typeof this.obj.value.strokeColor === "string") {
				container.appendChild(
					this.buildColor(
						"strokeColor",
						this.obj.value,
						"Stroke color:",
						this.changeColor.bind({
							self: this,
							obj: this.obj,
							value: this.obj.value,
							key: "strokeColor",
						})
					)
				);
			}
		}
	}

	static getType() {
		return "font";
	}
}

Block.register("font", FontBlock, "value");
