/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import BlockPlugin from './BlockPlugin';

let _resource_types = BlockPlugin.registers.src;

export default function IsResource(obj) 
{
	if (typeof obj == "object") obj = obj.type;

	if (!obj) return false;

	return _resource_types.indexOf(obj) > -1;
}