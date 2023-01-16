// Mixin, dat.mixin

/**
 * @function
 * @name deepMixin
 * @memberof configer
 * @description A method that deep mixes two config objectsa.
 * @param {Object} target - a target config object
 * @param {Object} source - a source config object
 * @returns {Object} target config object deep mixed in with source.
 * @example
 * 
configer.deepMixin(config1, config2); 
 *
 */
function deepMixin(target, source) {
	if (source && typeof target === "object") {
		for (var key, keys = Object.keys(source), l = keys.length; l--; ) {
			key = keys[l];

			if (
				typeof source[key] === "object" &&
				!Array.isArray(source[key])
			) {
				if (typeof target[key] !== "object") target[key] = {};

				deepMixin(target[key], source[key]);
			} else {
				if (source.hasOwnProperty(key)) {
					if (Array.isArray(source[key])) {
						target[key] = source[key].slice(0);
					} else {
						target[key] = source[key];
					}
				}
			}
		}
	}
	return target;
}

/**
 * @function
 * @name mixin
 * @memberof configer
 * @description A method that mixes two config objectsa.
 * @param {Object} target - a target config object
 * @param {Object} source - a source config object
 * @returns {Object} target config object mixed in with source.
 * @example
 * 
configer.mixin(config1, config2); 
 *
 */
function mixin(target, source) {
	if (typeof source != "object") {
		return target;
	}

	var obj;

	for (var key in source) {
		obj = source[key];

		if (target.hasOwnProperty(key)) {
			if (typeof obj === "object") {
				for (var props in obj) {
					if (props === "config" && target[key].type === "block") {
						mixin(target[key][props], obj[props]);
					} else if (
						props === "value" &&
						(target[key].type === "data_set" ||
							target[key].type === "range_set")
					) {
						deepMixin(target[key][props], obj[props]);
					} else {
						if (typeof obj[props] === "object") {
							if (obj[props] instanceof Array) {
								target[key][props] = obj[props].slice(0);
							} else {
								deepMixin(target[key][props], obj[props]);
							}
						} else {
							target[key][props] = obj[props];
						}
					}
				}

				if (!obj["hidden"]) {
					target[key]["hidden"] = false;
				}

				if (!obj["disabled"]) {
					target[key]["disabled"] = false;
				}
			} else {
				target[key].value = obj;
			}
		} else {
			//target_config[key] = obj;
		}
	}

	return target;
}

module.exports = { mixin, deepMixin };
