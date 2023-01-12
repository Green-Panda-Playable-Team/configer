/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

// import Block from '../BlockPlugin';
// var isJQueryAvail = (typeof $ == "function")
const noop = function () {};

export default class GeneralBlock {
	constructor(id, obj, applyImediately) {
		this.id = id;
		this.obj = obj;
		this.type = obj.type || null;

		obj.block = {
			disable: this.disable.bind(this),
			show: this.show.bind(this),
			hide: this.hide.bind(this),
			apply: this.apply.bind(this),
			getHTML: this.getHTML.bind(this),
			setTitle: this.setTitle.bind(this),
			change: (this.change && this.change.bind(this)) || noop,
			reset: (this.reset && this.reset.bind(this)) || noop,
			parse: (this.parse && this.parse.bind(this)) || undefined,
		};

		this.build();

		if (applyImediately !== false) {
			this.apply(false);
		}
	}

	setTitle(title) {
		this.obj.title = title || "";

		this.apply(false);

		return this.title;
	}

	getHTML() {
		return this.html;
	}

	apply() {
		if (this.obj.hidden) {
			this.hide();
		} else {
			this.show();
		}

		this.disable(this.obj.disabled);
	}

	build() {
		var html = document.createElement("div");
		html.classList.add("cfger-block");
		html.id = this.id + "_block";

		if (this.obj.description) {
			html.title = this.obj.description;
		}

		this.html = html;
	}

	disable(is) {
		if (is) {
			this.html.classList.add("cfger-disabled");
		} else {
			this.html.classList.remove("cfger-disabled");
		}
	}

	show() {
		// if (isJQueryAvail)
		// {
		//     $(this.html).show(200, "easeOutCubic");
		// }
		// else
		// {
		this.html.style.display = "";
		// }
	}

	hide() {
		// if (isJQueryAvail)
		// {
		//     $(this.html).hide(200, "easeOutCubic");
		// }
		// else
		// {
		this.html.style.display = "none";
		// }
	}

	onChange(a1, a2, a3) {
		if (typeof this.obj.onChange === "function") {
			let temp = arguments.length;

			if (temp === 0) this.obj.onChange.call(this.obj);
			else if (temp === 1) this.obj.onChange.call(this.obj, a1);
			else if (temp === 2) this.obj.onChange.call(this.obj, a1, a2);
			else this.obj.onChange.call(this.obj, a1, a2, a3);
		}
	}

	static getType() {
		return null;
	}

	static htmlToElement(html) {
		var template = document.createElement("template");
		html = html.trim();
		template.innerHTML = html;
		return template.content.firstChild;
	}
}
