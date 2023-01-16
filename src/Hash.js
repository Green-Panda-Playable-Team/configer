/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

// Hash, configer.hash

import isResource from "./IsResource";
import isSimple from "./IsSimple";
import utils from "./utils";

function parseConfigForHashString(config) {
	let ret = "";

	for (let i in config) {
		if (config[i].ignore) continue;

		if (isSimple(config[i].type)) {
			if (
				config[i].type === "data_set" ||
				config[i].type === "range_set"
			) {
				ret += JSON.stringify(config[i].value);
			} else {
				ret += config[i].value;
			}
		} else if (
			isResource(config[i].type) &&
			config[i].src &&
			config[i].src.length > 0
		) {
			ret += config[i].src.length;
		} else if (config[i].type === "block") {
			ret += parseConfigForHashString(config[i].config);
		}
	}

	return ret;
}

/**
 * @function
 * @name hash
 * @memberof configer
 * @description A method that generetes hash string from config values.
 * @param {Object} config - a config object
 * @returns {string} Hash sting
 * @example
 * 
var config = {
	name: {
		type: "text",
		title: "Your name",
		value: "Bob",
	},
	
	age: {
		type: "number",
		title: "Your age",
		value: 22,
	},

	skill: {
		type: "select",
		title: "Choose your skill",
		options: ["js", "java", "c++"],
		labels: ["Javascript", "Java", "C++"],
		value: "js",
	}
};

configer.hash(config); // "sdew0u"
 *
 */
function hash(config) {
	return utils.hash(parseConfigForHashString(config));
}

export default hash;
