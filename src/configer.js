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

// const Restore = require('./Restore');
// const Mixin = require('./Mixin');
// const GetOption = require('./GetOption');
// const Hash = require('./Hash');
// const Changed = require('./Changed');
// const Description = require('./Description');
// const Snapshot = require('./Snapshot');

// function log( str )
// {
//     console.log("%c[configer] %s", "background:#CB314D;color:white", str)
// }

var configer = {
	GUI: GUI,

	parse: Parse,

	// restore: Restore,

	...Mixin,
	// mixin: Mixin.mixin,
	// deepMixin: Mixin.deepMixin,

	// getOption: GetOption,

	hash: Hash,
	snapshot: Snapshot,

	// changed: Changed,

	// description: Description,

	// snapshot: Snapshot,

	// stringify: function(config)
	// {
	// 	return JSON.stringify(Snapshot(config));
	// },

	// buildHTMLConfig: function(config, parent, title, resetButton, prefix, sharing)
	// {
	// 	log("building html...");

	// 	config = config || CUSTOM_CONFIG;

	// 	if (title === undefined)
	// 	{
	// 		title = GPP_TITLE;
	// 	}

	// 	parent = parent || "playable_view_config";

	// 	if (typeof parent == "string")
	// 	{
	// 		parent = el(parent);
	// 	}

	// 	parent.innerHTML = "";

	// 	var id = prefix || this.getConfigId(config);

	// 	var rootBlock = new RootItemsBlock(id, config);

	// 	if (sharing)
	//        {
	//        	var configPackage = new ConfigPackage(id, parent, config);
	//        }

	// 	if (title)
	// 	{
	// 		var title_element = getGlobalTitle(title, rootBlock, resetButton, parent.id == "playable_view_config");
	// 		parent.appendChild(title_element);
	// 	}

	// 	rootBlock = rootBlock;

	//        parent.appendChild(rootBlock.getHTML());

	//        if (sharing && User.level(3))
	//        {
	//        	var configSaver = new ConfigSaver(id, parent, config);
	//        }

	//        if (window.Playable)
	//        {
	//        	Playable.emit("build:" + (prefix || parent.id));
	//        }

	// },

	// getConfigId: function(config)
	// {
	// 	var id = "";
	// 	for (var key in config)
	// 	{
	// 		id += key;
	// 		id += config[key].type;
	// 		if (config[key].type == "block")
	// 		{
	// 			id += this.getConfigId(config[key].config);
	// 		}
	// 	}

	// 	return u.hex(id);
	// },

	getBlockInstance: function (type) {
		return BlockPlugin.get(type);
	},

	apply: function (element, callCallback) {
		element.block &&
			element.block.apply &&
			element.block.apply(callCallback);
	},

	plugin: BlockPlugin,
};

// function getGlobalTitle(text, rootBlock, resetButton, restart)
// {
//     var title = document.createElement("legend");
//     title.id = rootBlock.id + "_title";
//     title.innerHTML = text;
//     title.style.cssText = 'display: flex;font-size: 1.4em;background-color: rgb(223, 222, 222);border-radius: 6px;overflow: hidden;align-items: center;border-left: 10px solid rgb(202, 202, 202);padding: 3px 100px 3px 10px;position: relative;';

//     if (resetButton)
//     {
//         var button = document.createElement("button")
//         button.classList.add("btn_awe")
//         button.classList.add("iconButton")
//         button.title = "Reset all options to default"
//         button.style.cssText = 'background-color: rgb(47, 106, 195);padding: 6px 11px;position: absolute;right: 1px;'
//         button.innerHTML = '<i class="fa fa-undo" style="margin-right: 6px;"></i> Reset all'
//         button.onclick = function() {
//             u.confirm("Are you sure you want to load default configuration?", function(answer) {
//                 if (answer)
//                 {
//                     if (rootBlock)
//                     {
//                     	rootBlock.reset();

//                         if (restart)
//                         {
//                             Playable.restart();
//                         }
//                     }
//                     else
//                     {
//                         u.showHint_error("Can't find default configuration")
//                     }
//                 }
//             });
//         }

//         title.appendChild(button);
//     }

//     return title;
// }

window.configer = configer;

export default configer;
