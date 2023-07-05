/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import OptionBlock from "./OptionBlock";

export default class ColorBlock extends OptionBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	buildColor() {
		var _this = this;

		if (this.obj.value === undefined) this.obj.value = "#000000";

		var input = document.createElement("input");
		input.id = this.id;
		input.type = this.obj.type;
		input.className = "form-control";
		input.value = this.obj.value;
		this.input = input;

		this.html.appendChild(input);

		function change() {
			_this.changeColor(this.value, true);
		}

		if (this.obj.oninput) {
			input.oninput = change;
		} else {
			input.onchange = change;
		}
	}

	changeColor(value, callCallback) {
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
		}

		if (changed && callCallback) {
			this.onChange(this.obj.value);
		}

		return changed;
	}

	changeColorAlpha(value, callCallback) {
		var changed = false;

		var prevValue = {
			color: this.colorInput.value,
			alpha: this.alphaInput.value,
		};

		if (value !== undefined) {
			if (this.obj.value !== value) {
				changed = true;
			}

			this.obj.value = value;
		}

		if (this.defaultValue === undefined) this.defaultValue = this.obj.value;

		this.colorInput.value = "" + this.obj.value.color;

		this.alphaInput.value = this.obj.value.alpha;

		this.colorInput.style.opacity = this.alphaInput.value;

		if (
			this.colorInput.value !== prevValue.color ||
			this.alphaInput.value !== prevValue.alpha ||
			changed
		) {
			changed = true;
			this.obj.changed = true;
		}

		if (changed && callCallback) {
			this.onChange(this.obj.value);
		}

		return changed;
	}

	buildColorAlpha() {
		if (typeof this.obj.value !== "object") {
			this.obj.value = {
				color: "#000000",
				alpha: 1,
			};
		}

		if (this.obj.color === undefined) {
			this.obj.color = "#000000";
		}
		if (this.obj.alpha === undefined) {
			this.obj.alpha = "#000000";
		}

		var container = document.createElement("div");
		container.className = "color-alpha-input-container";

		this.html.appendChild(container);

		var input_block = document.createElement("div");
		input_block.className = "color-alpha-input-color-border";

		var input = (this.colorInput = document.createElement("input"));
		input.id = this.id;
		input.type = this.obj.type;
		input.value = this.obj.value.color;
		input.className = "form-control color-alpha-input-color";
		input.style.opacity = this.obj.value.alpha;

		input_block.appendChild(input);
		container.appendChild(input_block);

		var alpha_btn = document.createElement("div");
		alpha_btn.className = "color-alpha-btn config-drowdown-btn";
		var alpha_icon = document.createElement("i");
		alpha_icon.className = "cicon-eye";
		alpha_btn.appendChild(alpha_icon);

		var container_drowdown = document.createElement("div");
		container_drowdown.append(alpha_btn);

		var popover = document.createElement("div");
		popover.classList.add("config-popover-container");

		var config_block = document.createElement("div");

		config_block.className = "config-popover-block alpha-input-block";

		var alpha_label = document.createElement("label");
		alpha_label.className = "form-label";
		alpha_label.htmlFor = this.id + "_color_alpha_input";
		alpha_label.innerText = "Color transparency";
		var alpha_input = (this.alphaInput = document.createElement("input"));
		alpha_input.value = this.obj.value.alpha;

		alpha_input.className = "custom-range";
		alpha_input.id = this.id + "_color_alpha_input";
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

		var backdrop = (this.backdrop = document.createElement("div"));
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

		var _this = this;

		function changesColor() {
			_this.changeColorAlpha(
				{ color: this.value, alpha: _this.alphaInput.value },
				true
			);
		}
		function changesAlpha() {
			_this.changeColorAlpha(
				{ color: _this.colorInput.value, alpha: this.value },
				true
			);
		}

		if (this.obj.oninput) {
			this.alphaInput.oninput = changesAlpha;
			this.colorInput.oninput = changesColor;
		} else {
			this.alphaInput.onchange = changesAlpha;
			this.colorInput.onchange = changesColor;
		}
	}

	build() {
		super.build();
		if (typeof this.obj.value === "object") {
			this.buildColorAlpha();
		} else {
			this.buildColor();
			this.input.className = "form-control form-control-sm";
			this.input.style.width = "80px";
		}

		// this.input.style.padding = "0px 2px";
	}

	static getType() {
		return "color";
	}
}

Block.register("color", ColorBlock, "value");
