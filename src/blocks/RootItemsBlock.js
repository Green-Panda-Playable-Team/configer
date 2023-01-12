/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import ItemsBlock from "./ItemsBlock";

export default class RootItemsBlock extends ItemsBlock {
	// constructor(id, obj)
	// {
	//     super(id, obj);
	// }

	buildHeader() {}

	styleContainer() {}

	buildResetButton() {
		var btn = document.createElement("button");
		btn.classList.add("configer", "cfger-root-button", "btn", "btn-sm");
		btn.innerHTML = '<i class="fas fa-reply-all"></i>';
		btn.onclick = this.reset.bind(this);
		this.html.prepend(btn);
	}
}
