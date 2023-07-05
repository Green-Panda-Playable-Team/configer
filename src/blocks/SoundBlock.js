/**
 * @author       Peter Hutsul <peter@greenpandagames.com>
 * @copyright    2021 GREEN PANDA GAMES
 * @license      {@link https://legal.ubi.com/privacypolicy/en-INTL}
 */

import Block from "../BlockPlugin";
import FileBlock from "./FileBlock";

function getAudioTypeFromBase64(src) {
	const typeStart = src.indexOf(":");
	const typeEnd = src.indexOf(";");

	return src.slice(typeStart + 1, typeEnd);
}

export default class SoundBlock extends FileBlock {

	build() {
		super.build();

		this.input.accept = "audio/*";
		this.input.type = "file";

		const prelisten = (this.audioSource = document.createElement("audio"));

		const contorlBtn = (this.contorlBtn =
			FileBlock.createButton("cicon-play"));

		this._playing = false;

		this.audioSource.onended = () => this.stopAudio();

		contorlBtn.onclick = () => {
			if (this._playing) {
				this.stopAudio();
			} else {
				this.playAudio();
			}
		};

		this.html.appendChild(contorlBtn);
		this.html.appendChild(prelisten);

		this.srcChanged();
	}

	playAudio() {
		if (this.obj.src.length) {
			this._playing = true;

			this.audioSource.play();
			this.contorlBtn.children[0].classList = "cicon-pause";

			this.audioSource.end;
		}
	}

	stopAudio() {
		this._playing = false;

		this.audioSource.pause();
		this.audioSource.currentTime = 0;

		this.contorlBtn.children[0].classList = "cicon-play";
	}

	srcChanged(val) {
		super.srcChanged(val);

		if (this.audioSource) {
			this.stopAudio();

			this.audioSource.src = this.obj.src;
			// this.audioSource.type = getAudioTypeFromBase64(this.obj.src);
			// console.log(this.audioSource.type);
		}
	}

	static getType() {
		return "sound";
	}
}

Block.register("sound", SoundBlock, "src");
