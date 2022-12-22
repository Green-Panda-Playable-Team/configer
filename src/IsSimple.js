/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import BlockPlugin from './BlockPlugin';

let _simple_types = BlockPlugin.registers.value;

export default function IsSimple(obj) 
{
	if (typeof obj == "object") obj = obj.type;

	if (!obj) return false;

	return _simple_types.indexOf(obj) > -1;
}