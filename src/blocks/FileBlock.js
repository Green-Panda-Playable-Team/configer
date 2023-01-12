/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import OptionBlock from "./OptionBlock";

export default class FileBlock extends OptionBlock {
	static createButton(iconClass) {
		var btn = document.createElement("div");
		btn.classList.add("file-btn");
		var icon = document.createElement("i");
		icon.className = iconClass;
		btn.appendChild(icon);
		return btn;
	}

	static fileSize(image, isFileSize) {
		var sizeInBytes = image.length;

		if (isFileSize !== false) {
			sizeInBytes = base64FileSize(image);
		}

		return sizeInBytes / 1000;
	}

	constructor(id, obj) {
		super(id, obj);

		obj.block.configure = this.configure.bind(this);
		obj.block.fileChanged = this.fileChanged.bind(this);
	}

	_buildLimits() {
		var _this = this;
		var compressIt;
		if (
			typeof this.obj.errorLimit === "number" &&
			this.obj.errorLimit > 0
		) {
			var errorLimit = document.createElement("div");
			errorLimit.classList.add("errorLimit");
			errorLimit.innerHTML =
				"File take more than " +
				this.obj.errorLimit +
				" KB, you need to ";

			compressIt = document.createElement("span");
			compressIt.innerHTML = "compress it.";
			compressIt.classList.add("compressLink");
			compressIt.onclick = function () {
				_this.configure();
			};
			errorLimit.appendChild(compressIt);

			this.html.appendChild(errorLimit);

			this.errorLimit = errorLimit;
		}

		if (
			typeof this.obj.warningLimit === "number" &&
			this.obj.warningLimit > 0
		) {
			var warningLimit = document.createElement("div");
			warningLimit.classList.add("warningLimit");
			warningLimit.innerHTML =
				"File take more than " + this.obj.warningLimit + " KB, try to ";

			compressIt = document.createElement("span");
			compressIt.innerHTML = "compress it.";
			compressIt.classList.add("compressLink");
			compressIt.onclick = function () {
				_this.configure();
			};
			warningLimit.appendChild(compressIt);

			this.html.appendChild(warningLimit);

			this.warningLimit = warningLimit;
		}
	}

	build() {
		super.build();

		this.placeholder = this.placeholder || "Choose file";
		this.defaultFileName = this.defaultFileName || "File";

		var _this = this;

		var obj = this.obj;

		this.originalSource = {
			src: obj.src,
		};

		if (obj.data) {
			this.originalSource.data = obj.data;
		}

		// this.html.style.cssText = "justify-content: flex-start;flex-wrap: wrap;position: relative;align-items: stretch;";

		if (this.title) {
			this.title.style.textAlign = "left";
		}

		var fullDiv = document.createElement("div");
		fullDiv.classList.add("fileField");

		var customFile = (this.file_block = document.createElement("div"));
		customFile.classList.add("custom-file");

		var inp_file = document.createElement("input");
		inp_file.type = "file";
		inp_file.id = this.id;
		inp_file.classList.add("form-control");
		inp_file.classList.add("file-input");

		this.input = inp_file;

		customFile.appendChild(inp_file);

		var inp_label = document.createElement("label");
		inp_label.setAttribute("for", this.id);
		inp_label.style.overflow = "hidden";
		inp_label.classList.add("form-label");
		inp_label.classList.add("file-btn");

		var label_icon = document.createElement("i");
		label_icon.classList.add("fas");
		label_icon.classList.add("cicon-upload");

		// var label_text = document.createElement('span');
		// label_text.innerText = this.placeholder;

		inp_label.appendChild(label_icon);
		// inp_label.appendChild(label_text)

		if (obj.browseLabel === false) {
			inp_label.classList.add("no-after");
		}

		// inp_label.innerHTML = obj.name || (obj.src && obj.src.length > 5 ? _this.defaultFileName : _this.placeholder);

		// inp_label.innerHTML = this.placeholder;

		customFile.appendChild(inp_label);

		// var controllDiv = document.createElement("div");
		// controllDiv.classList.add('fileControllBlock');

		// var clearButton = document.createElement("button");
		// clearButton.classList.add("btn_awe");
		// clearButton.classList.add("iconButton");
		// clearButton.title = "Remove current file";
		// clearButton.setAttribute("disabled", true);
		// clearButton.style.cssText = "background-color: #af4242; margin-right: 3px; display: none;";
		// clearButton.innerHTML = '<i class="fa fa-trash"></i>';

		// controllDiv.appendChild(clearButton);

		// this.clearButton = clearButton;

		// var configureButton = document.createElement("button");
		// configureButton.classList.add("btn_awe");
		// configureButton.classList.add("iconButton");
		// configureButton.title = "Configure this image";
		// configureButton.setAttribute("disabled", true);
		// configureButton.style.cssText = "background-color: #5a3d75;";
		// configureButton.innerHTML = '<i class="fa fa-cogs"></i>';

		// controllDiv.appendChild(configureButton);

		// this.configureButton = configureButton;

		// fullDiv.appendChild(controllDiv);

		fullDiv.appendChild(customFile);

		this.html.appendChild(fullDiv);

		this._buildLimits();

		inp_file.onchange = function () {
			if (this.files instanceof FileList) {
				if (this.files[0]) {
					// obj.name = this.nextElementSibling.innerHTML = this.files[0].name;
					obj.name = this.files[0].name;
					_this.fileChanged(this.files[0]);
				}
			}
		};

		// configureButton.onclick = function()
		// {
		//     _this.configure();
		// }

		// clearButton.onclick = function()
		// {

		//     // var changed = false;

		//     if (obj.src !== "")
		//     {
		//         // changed = true;
		//         obj.changed = true;

		//         obj.src = "";
		//         obj.name = void 0;

		//         inp_file.type = "text";
		//         inp_file.type = "file";

		//         _this.srcChanged();

		//         _this.onChange(obj.src, obj.data);
		//     }
		// }

		this.srcChanged();

		// if (obj.removable === true)
		// {
		//     clearButton.style.display = "block";
		// }
	}

	srcChanged(originalSrc) {
		this.calculateSize();

		var obj = this.obj;

		if (obj.src && obj.src.length > 5) {
			this.originalSource = originalSrc || this.originalSource;

			// this.configureButton.removeAttribute("disabled");
			// this.clearButton.removeAttribute("disabled");
			// this.input.nextElementSibling.innerHTML = obj.name || (obj.src && obj.src.length > 5 ? this.defaultFileName : this.placeholder);
		} else {
			// this.configureButton.setAttribute("disabled", true);
			// this.clearButton.setAttribute("disabled", true);
			// this.input.nextElementSibling.innerHTML = this.placeholder;
		}
	}

	updateSrc() {}

	fileChanged(file) {
		var _this = this;

		readFileToBase64(file, function (res) {
			_this.obj.src = res;

			_this.obj.changed = true;

			_this.onChange(_this.obj.src);

			_this.srcChanged(_this.obj.src);
		});
	}

	configure() {}

	change(value, callCallback) {
		var changed = false;

		if (value !== undefined) {
			if (this.obj.src !== value) {
				changed = true;
			}

			this.obj.src = value;
		}

		if (this.defaultValue === undefined) this.defaultValue = this.obj.src;

		if (this.originalSource.src !== this.obj.src || changed) {
			this.originalSource.src = this.obj.src;

			if (this.obj.data) {
				this.originalSource.data = this.obj.data;
			}

			this.obj.changed = true;

			this.srcChanged(this.originalSource);
		}

		if (changed && callCallback) {
			this.onChange(this.obj.src);
		}

		return changed;
	}

	calculateSize() {
		if (this.errorLimit) {
			this.errorLimit.style.display = "none";
		}

		if (this.warningLimit) {
			this.warningLimit.style.display = "none";
		}

		var sizeInKb = FileBlock.fileSize(
			this.obj.src || "",
			this.obj.compareToFileSize !== false
		);

		if (sizeInKb > 0) {
			if (this.errorLimit && sizeInKb > this.obj.errorLimit) {
				this.errorLimit.style.display = "block";
			} else if (this.warningLimit && sizeInKb > this.obj.warningLimit) {
				this.warningLimit.style.display = "block";
			}

			this.html.title = "File size is " + sizeInKb.toFixed(2) + " KB";
		}
	}

	static getType() {
		return "file";
	}
}

function readFileToBase64(file, cb) {
	var reader = new FileReader();
	reader.onload = function (e) {
		cb(reader.result);
	};
	reader.readAsDataURL(file);
}

function base64FileSize(src) {
	var base64Length = src.length - (src.indexOf(",") + 1);
	var padding =
		src.charAt(src.length - 2) === "="
			? 2
			: src.charAt(src.length - 1) === "="
			? 1
			: 0;
	return base64Length * 0.75 - padding;
}

Block.register("file", FileBlock, "src");
