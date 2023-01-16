/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import "./blocks/DividerBlock";
import "./blocks/BannerBlock";
import "./blocks/TitleBlock";
import "./blocks/NumberBlock";
import "./blocks/SelectBlock";
import "./blocks/ColorBlock";
import "./blocks/CheckboxBlock";
import "./blocks/FileBlock";
import "./blocks/RangeBlock";
import "./blocks/ItemsBlock";
import "./blocks/ImageBlock";
import "./blocks/DataSetBlock";
import "./blocks/ListBlock";
import "./blocks/ButtonBlock";
import "./blocks/DateBlock";
import "./blocks/MultiSelectBlock";
import "./blocks/TextAreaBlock";
import "./blocks/DataBlock";
import "./blocks/RootItemsBlock";
import "./blocks/FontBlock";
import "./blocks/SoundBlock";

import BlockPlugin from "./BlockPlugin";
import Parse from "./Parse";
import Hash from "./Hash";
import GUI from "./GUI";
import Mixin from "./Mixin";
import Snapshot from "./Snapshot";

/**
 * Contains methods for working with configs and GUI class for building interfaces
 * @namespace configer
 */
var configer = {
	GUI: GUI,

	parse: Parse,

	...Mixin,

	hash: Hash,
	snapshot: Snapshot,

	getBlockInstance: function (type) {
		return BlockPlugin.get(type);
	},

	/**
	 * @function
	 * @name apply
	 * @memberof configer
	 * @description A method that config object changes to GUI element.
	 * @param {Object} element - a GUI object
	 * @param {boolean} [callCallback] - whetever to call onChange methods of config blocks.
	 */
	apply: function (element, callCallback) {
		element.block &&
			element.block.apply &&
			element.block.apply(callCallback);
	},

	plugin: BlockPlugin,
};

window.configer = configer;

export default configer;
