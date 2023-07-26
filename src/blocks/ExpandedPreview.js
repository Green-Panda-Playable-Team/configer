export default class ExpandedPreview {
	constructor(parent) {
		this.parent = parent;

		var preview = parent.preview.html;

		this.inited = false;

		preview.onclick = () => {
			this.toogle();
		};

		var html = (this.html = document.createElement("div"));

		html.className = "block-popover-container";

		html.id = parent.id + "_expanded_preview";

		var container = (this.container = document.createElement("div"));
		container.className = "expanded-select";

		var header = document.createElement("div");
		header.className = "expanded-select-header";

		var title = document.createElement("h5");
		title.className = "expanded-select-title";
		title.innerText = parent.obj.title || "";

		var closeBtn = document.createElement("button");
		closeBtn.className = "expanded-select-close-btn";
		closeBtn.innerHTML = "<span>&times;</span>";
		closeBtn.onclick = this.hide.bind(this);

		var body = (this.body = document.createElement("div"));
		body.className = "expanded-select-body";

		header.prepend(title, closeBtn);
		container.prepend(header, body);

		var backdrop = (this.backdrop = document.createElement("div"));
		backdrop.className = "block-popover-backdrop";
		backdrop.onclick = (e) => {
			this.hide();
		};
		html.prepend(container);
		this.parent.html.prepend(backdrop);

		this._open = false;
	}

	init() {
		var _this = this;

		var parent = this.parent;

		var obj = parent.obj;

		var body = this.body;

		var previndex = obj.options.indexOf(obj.value);

		var width = parent.obj.preview_width
			? parent.obj.preview_width + "px"
			: "";
		var height = parent.obj.preview_height
			? parent.obj.preview_height + "px"
			: "";

		for (let t in obj.options) {
			var preview = document.createElement("div");
			preview.id = parent.id + "_expreview";
			preview.className = "select-preview";
			preview.title = obj.labels[t] || obj.options[t];

			var previewImg = document.createElement("img");
			previewImg.id = parent.id + "_expreview_img";
			previewImg.alt = "Preview is not avail";

			if (previndex === Number(t)) preview.classList.add("selected");

			preview.appendChild(previewImg);

			previewImg.src = obj.preview[t] || "";

			previewImg.style.width = width;

			previewImg.style.height = height;
			previewImg.style.transform = "scale(0.5)";
			preview.optionIndex = t;
			preview.optionValue = obj.options[t];

			preview.onclick = function () {
				parent.change(this.optionValue, true);
				_this.hide();
			};

			body.appendChild(preview);
		}

		parent.html.appendChild(this.html);
	}

	apply() {
		if (this.inited) {
			var previndex = this.parent.obj.options.indexOf(
				this.parent.obj.value
			);

			for (let i = 0; i < this.body.children.length; i++) {
				this.body.children[i].classList.remove("selected");
			}

			if (previndex > -1) {
				this.body.children[previndex].classList.add("selected");
			}
		}
	}

	toogle() {
		if (this._open) {
			this.hide();
		} else {
			this.show();
		}
	}

	show() {
		if (!this.inited) {
			this.inited = true;

			this.init();
		}
		this.container.classList.add("active");
		this.backdrop.classList.add("active");

		this._open = true;
	}

	hide() {
		this._open = false;
		this.container.classList.remove("active");
		this.backdrop.classList.remove("active");
	}
}
