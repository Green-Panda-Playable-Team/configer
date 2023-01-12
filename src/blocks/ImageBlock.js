/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import GUI from "../GUI";
import Utils from "../utils";
import FileBlock from "./FileBlock";

/**
 * @function
 * @name image
 * @description This type of option is intended for specifying of image field for the user.
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {string} src - default image, encoded into base64 code.
 * @param {boolean} removable -  set to true if you want to make the image removable, src will be set to "".
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
    LOGO: {

        type: "image",

        title: "Logo image",

        msg: "Better to use square image",

        src: "data:image/png;base64...",

        onChange: function ( src ) {

            console.log( src )

        }

    }
 */

/**
 * @function
 * @name gif_to_spritesheet
 * @description This special type of option is intended for specifying of image field for the user, where he can select gif, png or jpg image, and HTMLBuilder will return spritesheet image and data frame array.
 * @param {string} title - label that will be show next to the option
 * @param {string} description - brief description of options, that will be shown when user hover over option
 * @param {string} src - default sprite sheet image, encoded into base64 code.
 * @param {Array} data - default data frame array, for default sprite sheet image..
 * @param {boolean} removable -  set to true if you want to make the image removable, src will be set to "".
 * @param {Function} onChange - function that will be called when the user changes value of the option
 * 
 * @example 
    DUDE: {

        type: "gif_to_spritesheet",

        title: "Dude animation",

        msg: "Use gif to playing animation",

        src: "data:image/png;base64...",

        data: [{x: 0, y: 0, width: 10, height: 10},  {x: 10, y: 0, width: 10, height: 10}, ...],

        onChange: function ( src, frames ) {

            console.log( src, frames )

        }

    }
 */

export default class ImageBlock extends FileBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	buildPreview() {
		var preview_btn = FileBlock.createButton("cicon-eye");

		var popover = document.createElement("div");
		popover.classList.add("block-popover-container");

		var preview_block = document.createElement("div");
		preview_block.classList.add("file-preview-block");

		var preview_image = (this.preview_image =
			document.createElement("img"));
		preview_image.classList.add("file-preview-content");
		preview_image.src = this.originalSource.src;
		preview_block.appendChild(preview_image);

		preview_btn.onpointerover = () => {
			if (this.obj.src.length) preview_block.style.display = "block";
		};
		preview_btn.onpointerleave = () => {
			preview_block.style.display = "none";
		};

		popover.prepend(preview_block);
		this.file_block.prepend(popover, preview_btn);
	}

	buildConfig() {
		var container = document.createElement("div");

		var config_btn = (this.config_btn =
			FileBlock.createButton("cicon-cog"));
		config_btn.classList.add("file-drowdown-btn");
		container.append(config_btn);

		var popover = document.createElement("div");
		popover.classList.add("block-popover-container");

		var config_block = document.createElement("div");

		config_block.classList.add("file-config-block");

		popover.append(config_block);

		container.append(popover);

		this.gui = new GUI(this.id + "_image_config", {
			parent: config_block,
			config: {
				scale: {
					title: "Size",
					type: "range",
					min: 0.1,
					max: 1,
					value: 1,
					step: 0.02,
				},
				quality: {
					title: "Quality",
					type: "range",
					min: 2,
					max: 300,
					value: 100,
					step: 1,
				},
				type: {
					title: "Format",
					type: "select",
					lables: ["PNG", "JPEG"],
					options: ["image/png", "image/jpeg"],
					value: "PNG",
				},
			},
		});

		this.image_size = document.createElement("div");
		this.image_size.className = "image-file-size";

		var config_gui_btns = document.createElement("div");
		config_gui_btns.className = "btn-block";

		var apply_btn = document.createElement("button");
		apply_btn.className = "btn apply";
		apply_btn.innerText = "Apply";
		var reset_btn = document.createElement("button");
		reset_btn.className = "btn reset";
		reset_btn.innerText = "Reset";

		config_gui_btns.append(reset_btn, apply_btn);

		config_block.append(this.image_size, config_gui_btns);

		var backdrop = (this.backdrop = document.createElement("div"));
		backdrop.className = "block-popover-backdrop";

		var isOpen = false;

		config_btn.show = () => {
			isOpen = true;
			config_btn.classList.add("active");
			backdrop.classList.add("active");
			config_block.classList.add("active");
		};
		config_btn.hide = () => {
			isOpen = false;
			config_btn.classList.remove("active");
			backdrop.classList.remove("active");
			config_block.classList.remove("active");
		};

		config_btn.onclick = (e) => {
			e.stopPropagation();

			if (isOpen) config_btn.hide();
			else config_btn.show();
		};

		apply_btn.onclick = () => {
			config_btn.hide();

			if (this.obj.type === "gif_to_spritesheet") {
				this.onGifChanges();
			} else {
				this.onImageChanges();
			}
		};

		reset_btn.onclick = () => {
			config_btn.hide();
			this.gui.root.reset(true);

			if (this.obj.type === "gif_to_spritesheet") {
				this.onGifChanges();
			} else {
				this.onImageChanges();
			}
		};

		backdrop.onclick = () => config_btn.hide();

		return container;
	}

	build() {
		this.placeholder = "Choose image";
		this.defaultFileName = "image.png";

		const container = this.buildConfig();

		super.build();

		this.input.accept = "image/*";

		this.buildPreview();

		this.file_block.appendChild(container);
		this.file_block.appendChild(this.backdrop);
	}

	onImageChanges() {
		var config = this.gui.parse();

		Utils.image.loadImage(this.originalSource.src, (img) => {
			config["image"] = img;
			Utils.image.convert(config, (src) => {
				this.obj.src = src;

				this.preview_image.src = src;

				this.obj.changed = true;

				this.calculateSize();

				this.onChange(this.obj.src);
			});
		});
	}

	onGifChanges() {
		var config = this.gui.parse();

		Utils.image.loadImage(this.originalSource.src, (img) => {
			config["image"] = img;

			Utils.image.convert(config, (src) => {
				this.obj.src = src;
				const scale = config.scale;
				if (scale !== 1) {
					const framesToChange = JSON.parse(
						JSON.stringify(this.obj.data || [])
					);

					for (var i in framesToChange) {
						framesToChange[i].x = Math.floor(
							framesToChange[i].x * scale
						);
						framesToChange[i].y = Math.floor(
							framesToChange[i].y * scale
						);
						framesToChange[i].width = Math.floor(
							framesToChange[i].width * scale
						);
						framesToChange[i].height = Math.floor(
							framesToChange[i].height * scale
						);
					}
					this.obj.data = framesToChange;
				}

				this.preview_image.src = src;

				this.obj.changed = true;

				this.calculateSize();
				this.onChange(this.obj.src, this.obj.data || []);
			});
		});
	}

	calculateSize() {
		super.calculateSize();

		let originalImageFile =
			this.originalSource.src +
			JSON.stringify(this.originalSource.data || []);

		let currentFile = this.obj.src + JSON.stringify(this.obj.data || []);

		const originalSize = FileBlock.fileSize(originalImageFile);

		const currentSize = FileBlock.fileSize(currentFile);

		const diff = -Math.floor(
			((originalSize - currentSize) / originalSize) * 100
		);

		if (this.image_size) {
			this.image_size.innerText = `Current size is ${currentSize.toFixed(
				2
			)} KB (${diff ? (Math.sign(diff) > 0 ? "+" : "-") : ""}${Math.abs(
				diff
			)}%)`;
		}
	}

	fileChanged(file) {
		this.gui.root.reset(true);

		this.config_btn.hide();

		if (file) {
			Utils.image.loadImage(file, (img) => {
				if (Utils.image.checkIfGif(img.src)) {
					Utils.image.getGifInfo(img.src, (info_result) => {
						Utils.image.getSpritesheetFromGIF(
							img.src,
							info_result,
							(resultBase64, resultFrames) => {
								this.obj.src = resultBase64;

								for (var i in resultFrames) {
									resultFrames[i].x = Math.floor(
										resultFrames[i].x
									);
									resultFrames[i].y = Math.floor(
										resultFrames[i].y
									);
									resultFrames[i].width = Math.floor(
										resultFrames[i].width
									);
									resultFrames[i].height = Math.floor(
										resultFrames[i].height
									);
								}

								this.obj.data = resultFrames;

								this.obj.changed = true;

								this.onChange(this.obj.src, this.obj.data);

								this.srcChanged({
									src: this.obj.src,
									data: this.obj.data || [],
								});
							}
						);
					});
				} else {
					this.obj.src = img.src;

					this.obj.changed = true;

					this.onChange(this.obj.src);

					this.srcChanged({
						src: this.obj.src,
						data: this.obj.data || [],
					});
				}
			});
		}
	}

	srcChanged(obj) {
		super.srcChanged(obj);
		if (this.preview_image) {
			this.preview_image.src = this.obj.src;
		}
	}

	static getType() {
		return ["image", "gif_to_spritesheet"];
	}
}

Block.register("image", ImageBlock, "src");
Block.register("gif_to_spritesheet", ImageBlock, "src");
