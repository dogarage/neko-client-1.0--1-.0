"use strict";

import { updateClientFx, player } from './local_player.js';
import { EVENTS as e, RANK, options, elements, misc, soundSys } from './conf.js';
import { updateBindDisplay } from './tools.js';
import { getTime, setCookie, eventOnce, initializeTooltips, KeyCode, KeyName } from './misc.js';

import { eventSys, colorUtils } from './util.js';
import { World } from './World.js';
import { camera, renderer, moveCameraBy, mouse } from './canvas_renderer.js';
import { windowSys, GUIWindow, UtilDialog } from './windowsys.js';

import { createContextMenu } from './context.js';
import { PublicAPI } from "./api.js";
import { packagesPopulator } from "./packagemanager.js";
import { HtmlSanitizer } from './htmlsanitizer.js';
import { net } from './networking.js';

let auth;
let sdk;
export { statusMsg };

export const keysDown = {};

function receiveMessage(rawText) {
	rawText = misc.chatRecvModifier(rawText);
	if (!rawText) return;

	let addContext = (el, nick, id) => {
		el.addEventListener('click', function (event) {
			createContextMenu(event.clientX, event.clientY, [
				["Mute " + nick, function () {
					PublicAPI.muted.push(id);
					receiveMessage({
						sender: 'server',
						type: 'info',
						data: {
							allowHTML: true,
							message: "<span style=\"color: #ffa71f\">Muted " + id + "</span>"
						}
					});
				}]
			]);
			event.stopPropagation();
		});
	}

	let message = document.createElement('li');

	let parsedJson = JSON.parse(rawText);
	let text = parsedJson.data.message;
	let sender = parsedJson.sender;
	let type = parsedJson.type;
	let data = parsedJson.data;
	if (!data) return;

	if (data.senderID && data.nick && misc.world.players && misc.world.players[data.senderID]) {
		misc.world.players[data.senderID].nick = data.nick;
	}

	// actions
	if (!!data.action) {
		switch (data.action) {
			case 'invalidatePassword': {
				if (!misc.storageEnabled) break;
				let passwordType = data.passwordType;
				switch (passwordType) {
					case 'adminlogin':
					case 'modlogin': {
						delete misc.localStorage[passwordType];
						misc.attemptedPassword = null;
						break;
					}
					case 'worldpass':
					default: {
						delete misc.worldPasswords[net.protocol.worldName];
						misc.attemptedPassword = null;
						break;
					}
				}
				saveWorldPasswords();
				net.protocol.ws.close();
				break;
			}
			case 'savePassword': {
				if (!misc.storageEnabled) break;
				let passwordType = data.passwordType;
				switch (passwordType) {
					case 'adminlogin':
					case 'modlogin': {
						misc.localStorage[passwordType] = misc.attemptedPassword;
						misc.attemptedPassword = null;
						break;
					}
					case 'worldpass':
					default: {
						misc.worldPasswords[net.protocol.worldName] = misc.attemptedPassword;
						misc.attemptedPassword = null;
						break;
					}
				}
				saveWorldPasswords();
				break;
			}
			case 'updateNick': {
				if (!misc.storageEnabled) break;
				if (data.nick !== undefined && data.nick !== null) misc.localStorage.nick = data.nick;
				else delete misc.localStorage.nick;
				break;
			}
		}
	}

	if (!text) return;

	let allowHTML = false;
	let adminMessage = false;
	if (sender === 'server') {
		allowHTML = data.allowHTML || false;
		if (type === 'info') message.className = 'serverInfo';
		if (type === 'error') message.className = 'serverError';
		if (type === 'raw') {
			if (data.message.startsWith('[D]')) {
				allowHTML = false;
				message.className = 'discord';
				let nick = document.createElement("span");
				nick.className = "nick";
				let nickname = data.message.split(": ")[0] + ": ";
				nick.innerText = nickname;
				message.appendChild(nick);
				text = data.message.slice(nickname.length);
			} else {
				allowHTML = true; // assume HTML is allowed
				message.className = 'serverRaw';
			}
		}
		if (type === 'whisperSent') {
			if (PublicAPI.muted.includes(data.senderID)) return;
			let nick = document.createElement("span");
			nick.className = 'whisper';
			nick.innerText = `-> You tell ${data.targetID}: `;
			addContext(nick, data.nick, data.senderID);
			message.appendChild(nick);
		}
	}
	else if (sender === 'player') {
		if (type === 'whisperReceived') {
			let nick = document.createElement("span");
			nick.className = 'whisper';
			nick.innerText = `-> ${data.senderID} tells you: `;
			message.appendChild(nick);
		}
		if (type === 'message') {
			if (PublicAPI.muted.includes(data.senderID) && data.rank < RANK.MODERATOR) return;
			if (data.rank >= RANK.ADMIN || data.allowHTML) allowHTML = true;

			if (data.rank === RANK.ADMIN) {
				message.className = 'adminMessage';
				adminMessage = true;
			} else {
				if (data.rank === RANK.MODERATOR) message.className = 'modMessage';
				else if (data.rank === RANK.USER) message.className = 'userMessage';
				else message.className = 'playerMessage';

				let nick = document.createElement("span");
				nick.className = 'nick';
				message.style.display = 'block';
				nick.innerText = `${data.nick}: `;
				message.appendChild(nick);
			}
		}
	}

	let msg = misc.lastMessage ? misc.lastMessage.text : '';
	if (msg.endsWith('\n')) msg = msg.slice(0, -1);
	{
		let lastCharacter = ".";
		let newlinePrivilage = 4;
		text = text.split("").reduce(function (a, b) {
			if (b === "\n" && newlinePrivilage === 0) return a + " ";
			if (b === "\n") newlinePrivilage--;
			if (lastCharacter === "\n" && b === "\n") return a;
			lastCharacter = b;
			return a + b;
		});
	}
	if (msg === `${data.nick}: ${text}` && misc.lastMessage && !misc.lastMessage.ignore) misc.lastMessage.incCount();
	else {
		if (adminMessage) text = `${data.nick}: ${text}`;
		let span = document.createElement("span");
		allowHTML = false;
		misc.lastMessage = {
			get text() { return `${data.nick}: ${text}`; },
			incCount: () => {
				let times = span.recvTimes || 1;
				// span.innerHTML = `${anchorme(text, {
				// 	attributes: [
				// 		{
				// 			name: "target",
				// 			value: "_blank"
				// 		}
				// 	]
				// })} [x${++times}]`;
				if (!allowHTML) span.innerText = text;
				else span.innerHTML = HtmlSanitizer.SanitizeHtml(text);;
				span.recvTimes = times;
				message.style.animation = 'none'; /* Reset fading anim */
				message.offsetHeight; /* Reflow */
				message.style.animation = null;
			},
			ignore: type === "whisperReceived"
		};
		let textByNls = text.split('\n');
		let firstNl = textByNls.shift();
		firstNl = firstNl.replace(/(?:&lt;|<)a:(.+?):([0-9]{8,32})(?:&gt;|>)/g, '<img class="emote" src="https://cdn.discordapp.com/emojis/$2.gif?v=1">'); // animated
		firstNl = firstNl.replace(/(?:&lt;|<):(.+?):([0-9]{8,32})(?:&gt;|>)/g, '<img class="emote" src="https://cdn.discordapp.com/emojis/$2.png?v=1">'); // static
		text = firstNl + '\n' + textByNls.join('\n');
		text = misc.chatPostFormatRecvModifier(text);
		// span.innerHTML = anchorme(text, {
		// 	attributes: [{
		// 		name: 'target',
		// 		value: '_blank'
		// 	}]
		// });
		span.innerHTML = HtmlSanitizer.SanitizeHtml(text);
		message.appendChild(span);
		scrollChatToBottom(() => {
			elements.chatMessages.appendChild(message);
			let children = elements.chatMessages.children;
			if (children.length > options.maxChatBuffer) children[0].remove();
		}, true);
	}
}

function scrollChatToBottom(callback, dontScrollIfNotTop = false) {
	let shouldScroll = !dontScrollIfNotTop || elements.chatMessages.scrollHeight - elements.chatMessages.scrollTop - elements.chatMessages.clientHeight <= 0.1;
	if (callback)
		callback(); // add all elements here
	if (shouldScroll)
		elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
}

function clearChat() {
	elements.chatMessages.innerHTML = "";
}

function tick() {
	let tickNum = ++misc.tick;
	let speed = Math.max(Math.min(options.movementSpeed, 64), 0);
	let offX = 0;
	let offY = 0;
	if (keysDown[38] || keysDown[87]) { // Up
		offY -= speed;
	}
	if (keysDown[37] || keysDown[65]) { // Left
		offX -= speed;
	}
	if (keysDown[40] || keysDown[83]) { // Down
		offY += speed;
	}
	if (keysDown[39] || keysDown[68]) { // Right
		offX += speed;
	}
	if (offX !== 0 || offY !== 0) {
		moveCameraBy(offX, offY);
		updateMouse({}, 'mousemove', mouse.x, mouse.y);
	}

	eventSys.emit(e.tick, tickNum);
	if (player.tool !== null && misc.world !== null) {
		player.tool.call('tick', mouse);
	}
}

function updateMouse(event, eventName, mouseX, mouseY) {
	mouse.x = mouseX;
	mouse.y = mouseY;
	let cancelled = 0;
	if (misc.world !== null) {
		mouse.validTile = misc.world.validMousePos(mouse.tileX, mouse.tileY);
		if (player.tool !== null) {
			cancelled = player.tool.call(eventName, [mouse, event]);
		}
		if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
			updateClientFx();
		}
	}
	return cancelled;
}

function openChat() {
	elements.chat.className = "active selectable";
	elements.chatMessages.className = "active";
	scrollChatToBottom();
}

function closeChat() {
	elements.chat.className = "";
	elements.chatMessages.className = "";
	elements.chatInput.blur();
	scrollChatToBottom();
}

function updateXYDisplay(x, y) {
	if (misc.lastXYDisplay[0] !== x || misc.lastXYDisplay[1] !== y) {
		misc.lastXYDisplay = [x, y];
		if (!options.hexCoords) {
			elements.xyDisplay.innerHTML = "X: " + x + ", Y: " + y;
		} else {
			let hexify = i => `${(i < 0 ? '-' : '')}0x${Math.abs(i).toString(16)}`;
			elements.xyDisplay.innerHTML = `X: ${hexify(x)}, Y: ${hexify(y)}`;
		}
		return true;
	}
	return false;
}

function updatePlayerCount() {
	let text = ' cursor' + (misc.playerCount !== 1 ? 's online' : ' online');
	let countStr = '' + misc.playerCount;
	if (misc.world && 'maxCount' in misc.world) {
		countStr += '/' + misc.world.maxCount;
	}

	let final = countStr + text;
	elements.playerCountDisplay.innerHTML = final;

	let title = 'World of Pixels';
	if (misc.world) {
		title = '(' + countStr + '/' + misc.world.name + ') ' + title;
	}

	document.title = title;
}

function logoMakeRoom(bool) {
	elements.loadUl.style.transform = bool ? "translateY(-75%) scale(0.5)" : "";
}

function dismissNotice() {
	misc.localStorage.dismissedId = elements.noticeDisplay.noticeId;
	elements.noticeDisplay.style.transform = "translateY(-100%)";
	elements.noticeDisplay.style.pointerEvents = "none";
	setTimeout(() => elements.noticeDisplay.style.display = "none", 750);
}

function showWorldUI(bool) {
	misc.guiShown = bool;
	elements.xyDisplay.style.transform = bool ? "initial" : "";
	elements.pBucketDisplay.style.transform = bool ? "initial" : "";
	elements.playerCountDisplay.style.transform = bool ? "initial" : "";
	elements.palette.style.transform = bool ? "translateY(-50%)" : "";
	elements.chat.style.transform = bool ? "initial" : "";
	elements.chatInput.disabled = !bool;
	// for(let element of elements.topLeftDisplays.children) element.style.transform = bool ? "initial" : "";
	// for(let element of elements.topRightDisplays.children) element.style.transform = bool ? "initial" : "";
	elements.chatInput.style.display = "initial";
	// elements.paletteBg.style.visibility = bool ? "" : "hidden";
	// elements.helpButton.style.visibility = bool ? "" : "hidden";
	elements.topRightDisplays.classList[bool ? 'remove' : 'add']('hideui');
	elements.topLeftDisplays.classList[bool ? 'remove' : 'add']('hideui');
	elements.helpButton.style.transform = bool ? "" : "translateY(120%) translateX(-120%)";
	elements.paletteBg.style.transform = bool ? "" : "translateX(100%)";
	elements.noticeDisplay.style.transform = bool ? 'inherit' : `translateY(-${elements.topLeftDisplays.getBoundingClientRect().height}px)`;
	elements.pBucketDisplay.innerText = `Place bucket: ${net.protocol.placeBucket.allowance.toFixed(1)} (${net.protocol.placeBucket.rate}/${net.protocol.placeBucket.time}s).`;
	// elements.paletteBg.classList[bool ? 'remove' : 'add']('hideui');
}

function showLoadScr(bool, showOptions) {
	elements.loadOptions.className = showOptions ? "framed" : "hide";
	if (!bool) {
		elements.loadScr.style.transform = "translateY(-110%)"; /* +10% for shadow */
		eventOnce(elements.loadScr, "transitionend webkitTransitionEnd oTransitionEnd msTransitionEnd",
			() => {
				if (net.isConnected()) {
					elements.loadScr.className = "hide";
				}
			});
	} else {
		elements.loadScr.className = "";
		elements.loadScr.style.transform = "";
	}
}

function statusMsg(showSpinner, message) {
	const statusShown = elements.status.isConnected;
	if (message === null) {
		elements.status.style.display = "none";
		return;
	} else {
		elements.status.style.display = "";
	}
	elements.statusMsg.innerText = message;
	elements.spinner.style.display = showSpinner ? "" : "none";
}

function inGameDisconnected() {
	showWorldUI(false);
	showLoadScr(true, true);
	statusMsg(false, "Lost connection with the server.");
	misc.world = null;
	elements.chat.style.transform = "initial";
	elements.chatInput.style.display = "";
}

export function retryingConnect(server, worldName, token) {
	if (misc.connecting && !net.isConnected()) { /* We're already connected/trying to connect */
		return;
	}
	misc.connecting = true;

	const tryConnect = (tryN) => {
		if (tryN >= (server.maxRetries || 3)) {
			let ncs = serverGetter(true);
			if (ncs != server) {
				server = ncs;
				tryN = 0;
			}
		}
		eventSys.once(e.net.connecting, () => {
			console.debug(`Trying '${server.title}'...`)
			statusMsg(true, `Connecting to '${server.title}'...`);
			showLoadScr(true, false);
		});
		net.connect(server, worldName, token);
		const disconnected = () => {
			++tryN;
			statusMsg(true, `Couldn't connect to server${tryN >= 5 ? ". Your IP may have been flagged as a proxy (or banned). Proxies are disallowed on OWOP due to bot abuse, sorry. R" : ", r"}etrying... (${tryN})`);
			setTimeout(tryConnect, Math.min(tryN * 2000, 10000), tryN);
			eventSys.removeListener(e.net.connected, connected);
		};
		const connected = () => {
			statusMsg(false, "Connected!");
			eventSys.removeListener(e.net.disconnected, disconnected);
			eventSys.once(e.net.disconnected, inGameDisconnected);
			misc.connecting = false;
		};

		eventSys.once(e.net.connected, connected);
		eventSys.once(e.net.disconnected, disconnected);
	};
	tryConnect(0);
}

function saveWorldPasswords() {
	if (misc.storageEnabled) misc.localStorage.worldPasswords = JSON.stringify(misc.worldPasswords);
}

function checkFunctionality(callback) {
	/* Multi Browser Support */
	window.requestAnimationFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (f) {
			setTimeout(f, 1000 / options.fallbackFps);
		};

	Number.isInteger = Number.isInteger || (n => Math.floor(n) === n && Math.abs(n) !== Infinity);
	Math.trunc = Math.trunc || (n => n | 0);

	callback();
}

function toggleMuteSounds() {
	options.enableSounds = !elements.soundToggle.checked;
	eventSys.emit(e.net.chat, options.enableSounds ? "Sounds enabled" : "Sounds disabled");
}

let activeKeybindListener = null;
let currentKeybindName = null;

export function getNewBind(tname, self) {
	const hc = document.getElementById('help-close');
	const kbd = document.getElementById('keybind-settings');

	const endBind = () => {
		document.removeEventListener("keydown", listener);
		hc.removeEventListener("click", endBind);
		kbd.removeEventListener('click', oncancel);
		activeKeybindListener = null;
		currentKeybindName = null;
		self.innerText = "rebind";
	}

	if (activeKeybindListener) endBind();

	currentKeybindName = tname;

	const oncancel = (e) => {
		if (e.target !== self && e.target.tagName === 'BUTTON') endBind();
	}

	const listener = (event) => {
		event.stopPropagation();
		let code = event.which || event.keyCode;

		if (code == KeyCode.ESCAPE) return endBind();

		// prevent binding to hard-coded keybinds
		if ([KeyCode.SHIFT, KeyCode.BACKTICK, KeyCode.TILDE, KeyCode.G, KeyCode.H, KeyCode.F1, KeyCode.F2, KeyCode.PLUS,
		KeyCode.NUMPAD_ADD, KeyCode.SUBTRACT, KeyCode.NUMPAD_SUBTRACT, KeyCode.EQUALS, KeyCode.UNDERSCORE].includes(code)) {
			const textElements = document.querySelectorAll('[class^="kb-"]');
			for (const el of textElements) {
				if (el.classList[0].includes(KeyName[code])) {
					el.style.color = '#f00';
					setTimeout(() => {
						el.style.transition = 'color 0.3s ease-in-out';
						el.style.color = '';
						setTimeout(() => {
							el.style.transition = '';
						}, 300);
					}, 100);
					break;
				}
			}
			return endBind();
		}
		if (code == KeyCode.DELETE) {
			delete misc.keybinds[tname];
			console.log("deleted keybind");
		} else {
			misc.keybinds[tname] = code;
			console.log(`added keybind for ${tname}: ${KeyName[code]} (${code})`);
		}
		endBind();
		updateBindDisplay();
		saveKeybinds();
	}

	activeKeybindListener = listener;
	document.addEventListener("keydown", listener);
	hc.addEventListener("click", endBind);
	kbd.addEventListener('click', oncancel);

	self.innerText = "Listening for input... Press ESC or click again to cancel.";
};

function saveKeybinds() {
	if (misc.storageEnabled) misc.localStorage.keybinds = JSON.stringify(misc.keybinds);
}

function loadDefaultBindings(name) {
	switch (name) {
		case "new":
			misc.keybinds = { //probably sane defaults
				"cursor": KeyCode.B,
				"move": KeyCode.V,
				"pipette": KeyCode.Q,
				"eraser": KeyCode.S,
				"zoom": KeyCode.A,
				"export": KeyCode.E,
				"fill": KeyCode.F,
				"line": KeyCode.W,
				"protect": KeyCode.D,
				"area protect": KeyCode.R,
				"paste": KeyCode.X,
				"copy": KeyCode.C
			};
			updateBindDisplay();
			saveKeybinds();
			break;
		case "og":
		default:
			misc.keybinds = { //probably sane defaults
				"cursor": KeyCode.O,
				"move": KeyCode.M,
				"pipette": KeyCode.P,
				"eraser": KeyCode.C,
				"zoom": KeyCode.Z,
				"export": KeyCode.E,
				"fill": KeyCode.F,
				"line": KeyCode.L,
				"protect": KeyCode.P,
				"area protect": KeyCode.A,
				"paste": KeyCode.W,
				"copy": KeyCode.Q
			};
			updateBindDisplay();
			saveKeybinds();
			break;
	}
}

function init() {
	// Some cool custom css
	console.log("%c" +
		" _ _ _         _   _    _____ ___    _____ _         _     \n" +
		"| | | |___ ___| |_| |  |     |  _|  |  _  |_|_ _ ___| |___ \n" +
		"| | | | . |  _| | . |  |  |  |  _|  |   __| |_'_| -_| |_ -|\n" +
		"|_____|___|_| |_|___|  |_____|_|    |__|  |_|_,_|___|_|___|",
		"font-size: 10px; font-weight: bold;"
	);
	console.log("%cWelcome to the developer console!", "font-size: 20px; font-weight: bold; color: #F0F;");

	let viewport = elements.viewport;
	let chatInput = elements.chatInput;
	initializeTooltips();
	if (misc.storageEnabled) {
		if (misc.localStorage.worldPasswords) {
			try {
				misc.worldPasswords = JSON.parse(misc.localStorage.worldPasswords);
			} catch (e) { }
		}
		if (misc.localStorage.keybinds) {
			try {
				misc.keybinds = JSON.parse(misc.localStorage.keybinds);
			} catch (e) { };
		} else {
			loadDefaultBindings("og"); // just to please the masses, original defaults are the default
			console.log("No keybinds found, using original defaults");
		}
		if (misc.localStorage.palettes) {
			try {
				misc.palettes = JSON.parse(misc.localStorage.palettes);
			} catch (e) { };
		}
	}
	updateBindDisplay();

	misc.lastCleanup = 0;

	viewport.oncontextmenu = () => false;

	viewport.addEventListener("mouseenter", () => {
		mouse.insideViewport = true;
		updateClientFx();
	});
	viewport.addEventListener("mouseleave", () => {
		mouse.insideViewport = false;
		updateClientFx();
	});

	let chatHistory = [];
	let historyIndex = 0;
	chatInput.addEventListener("keydown", event => {
		event.stopPropagation();
		let keyCode = event.which || event.keyCode;
		if (historyIndex === 0 || keyCode == 13 && !event.shiftKey) {
			chatHistory[0] = chatInput.value;
		}
		switch (keyCode) {
			case KeyCode.ESCAPE:
				closeChat();
				break;
			case KeyCode.ENTER:
				if (!event.shiftKey) {
					event.preventDefault();
					let text = chatInput.value;
					if (text.startsWith('/')) {
						var [commandName, ...args] = text.slice(1).trim().split(/\s+/);
						if (OWOP.chat.commandList[commandName]) OWOP.chat.commandList[commandName].callback(...args);
					}
					historyIndex = 0;
					chatHistory.unshift(text);
					if (misc.storageEnabled) {
						if (text.startsWith("/adminlogin ") || text.startsWith("/modlogin ") || text.startsWith("/pass "))
							misc.attemptedPassword = text.split(' ').slice(1).join(' ');
					}
					text = misc.chatSendModifier(text);
					net.protocol.sendMessage(text);
					chatInput.value = '';
					chatInput.style.height = "16px";
					event.stopPropagation();
				}
				break;
			case KeyCode.ARROW_UP:
				if (event.shiftKey && historyIndex < chatHistory.length - 1) {
					historyIndex++;
					chatInput.value = chatHistory[historyIndex];
					chatInput.style.height = 0;
					chatInput.style.height = Math.min(chatInput.scrollHeight - 8, 16 * 4) + "px";
				}
				break;
			case KeyCode.ARROW_DOWN:
				if (event.shiftKey && historyIndex > 0) {
					historyIndex--;
					chatInput.value = chatHistory[historyIndex];
					chatInput.style.height = 0;
					chatInput.style.height = Math.min(chatInput.scrollHeight - 8, 16 * 4) + "px";
				}
				break;
		}
	});
	chatInput.addEventListener("keyup", event => {
		event.stopPropagation();
		let keyCode = event.which || event.keyCode;
		if (keyCode == 13 && !event.shiftKey) {
			closeChat();
		}
	});
	chatInput.addEventListener("input", event => {
		chatInput.style.height = 0;
		chatInput.style.height = Math.min(chatInput.scrollHeight - 8, 16 * 4) + "px";
	});
	chatInput.addEventListener("focus", event => {
		if (!mouse.buttons) {
			openChat();
		} else {
			chatInput.blur();
		}
	});

	window.addEventListener("keydown", event => {
		let keyCode = event.which || event.keyCode;
		if (document.activeElement.tagName !== "INPUT" && misc.world !== null) {
			keysDown[keyCode] = true;
			let tool = player.tool;
			if (tool !== null && misc.world !== null && tool.isEventDefined('keydown')) {
				if (tool.call('keydown', [keysDown, event])) {
					return false;
				}
			}

			for (let tname in misc.keybinds) {
				if (misc.keybinds[tname] == event.keyCode) {
					player.tool = tname;
				}
			};

			switch (keyCode) {
				/*case KeyCode.Q:
					player.tool = "pipette";
					break;

				case KeyCode.D:
					player.tool = "cursor";
					break;

				case KeyCode.X:
				case KeyCode.SHIFT:
					player.tool = "move";
					break;

				case KeyCode.F:
					player.tool = "fill";
					break;

				case KeyCode.W:
					player.tool = "line";
					break;

				case KeyCode.E:
					player.tool = "export";
					break;

				case KeyCode.A:
					player.tool = "eraser";
					break;

				case KeyCode.ONE:
					player.tool = "paste";
					break;

				case KeyCode.TWO:
					player.tool = "copy";
					break;

				case KeyCode.THREE:
					player.tool = "protect";
					break;

				case KeyCode.R:
					player.tool = "area protect";
					break;*/

				case KeyCode.SHIFT:
					player.tool = "move";
					break; //added back here because of the weird little temp move thing

				case KeyCode.Z:
					if (!misc.world || !event.ctrlKey) break;
					misc.world.undo(event.shiftKey);
					event.preventDefault();
					break;

				case KeyCode.BACKTICK:
				case KeyCode.TILDE:
					let parseClr = clr => {
						let tmp = clr.split(',');
						let nrgb = null;
						if (tmp.length == 3) {
							nrgb = tmp;
							for (let i = 0; i < tmp.length; i++) {
								tmp[i] = +tmp[i];
								if (!(tmp[i] >= 0 && tmp[i] < 256)) {
									return null;
								}
							}
						} else if (clr[0] == '#' && clr.length == 7) {
							let colr = parseInt(clr.replace('#', '0x'));
							/* The parsed HTML color doesn't have red as the first byte, so invert it. */
							nrgb = [colr >> 16 & 0xFF, colr >> 8 & 0xFF, colr & 0xFF];
						}
						return nrgb;
					}
					let input = prompt("Custom color\nType three values separated by a comma: r,g,b\n(...or the hex string: #RRGGBB)\nYou can add multiple colors at a time separating them with a space.");
					if (!input) {
						break;
					}
					input = input.split(' ');
					for (let j = 0; j < input.length; j++) {
						let rgb = parseClr(input[j]);
						if (rgb) {
							player.selectedColor = rgb;
						}
					}

					break;

				case KeyCode.G:
					renderer.showGrid(!renderer.gridShown);
					break;

				case KeyCode.H:
					options.showProtectionOutlines = !options.showProtectionOutlines;
					renderer.render(renderer.rendertype.FX);
					break;

				/*case KeyCode.M:
					elements.soundToggle.checked = !elements.soundToggle.checked;
					toggleMuteSounds();
					break;
				*/
				case KeyCode.F1:
					showWorldUI(!misc.guiShown);
					event.preventDefault();
					break;

				case KeyCode.F2:
					options.showPlayers = !options.showPlayers;
					renderer.render(renderer.rendertype.FX);
					break;

				case KeyCode.PLUS:
				case KeyCode.NUMPAD_ADD:
					++camera.zoom;
					break;

				case KeyCode.MINUS:
				case KeyCode.NUMPAD_SUBTRACT:
					--camera.zoom;
					break;

				default:
					return true;
					break;
			}
			return false;
		}
	});
	window.addEventListener("keyup", event => {
		let keyCode = event.which || event.keyCode;
		delete keysDown[keyCode];
		if (document.activeElement.tagName !== "INPUT") {
			let tool = player.tool;
			if (tool !== null && misc.world !== null && tool.isEventDefined('keyup')) {
				if (tool.call('keyup', [keysDown, event])) {
					return false;
				}
			}
			if (keyCode == KeyCode.ENTER) {
				elements.chatInput.focus();
			} else if (keyCode == KeyCode.SHIFT) {
				player.tool = "cursor";
			}
		}
	});
	viewport.addEventListener("mousedown", event => {
		closeChat();
		mouse.lastX = mouse.x;
		mouse.lastY = mouse.y;
		mouse.x = event.pageX;
		mouse.y = event.pageY;
		mouse.mouseDownWorldX = mouse.worldX;
		mouse.mouseDownWorldY = mouse.worldY;
		if ('buttons' in event) {
			mouse.buttons = event.buttons;
		} else {
			let realBtn = event.button;
			if (realBtn === 2) {
				realBtn = 1;
			} else if (realBtn === 1) {
				realBtn = 2;
			}
			mouse.buttons |= 1 << realBtn;
		}

		let tool = player.tool;
		if (tool !== null && misc.world !== null) {
			player.tool.call('mousedown', [mouse, event]);
		}
	});

	window.addEventListener("mouseup", event => {
		/* Old versions of firefox have the buttons property as the
		 * buttons released, instead of the currently pressed buttons.
		 **/
		if ('buttons' in event && !misc.usingFirefox) {
			mouse.buttons = event.buttons;
		} else {
			let realBtn = event.button;
			if (realBtn === 2) {
				realBtn = 1;
			} else if (realBtn === 1) {
				realBtn = 2;
			}
			mouse.buttons &= ~(1 << realBtn);
		}
		let tool = player.tool;
		if (tool !== null && misc.world !== null) {
			player.tool.call('mouseup', [mouse, event]);
		}
	});

	window.addEventListener("mousemove", event => {
		let cancelledButtons = updateMouse(event, 'mousemove', event.pageX, event.pageY);
		let remainingButtons = mouse.buttons & ~cancelledButtons;
		if (remainingButtons & 0b100) { /* If middle click was not used for anything */
			moveCameraBy((mouse.mouseDownWorldX - mouse.worldX) / 16, (mouse.mouseDownWorldY - mouse.worldY) / 16);
		}
	});

	function zoom(type) {
		let lzoom = camera.zoom;
		let nzoom = camera.zoom;
		let offX = 0;
		let offY = 0;
		let w = window.innerWidth;
		let h = window.innerHeight;
		if (type === 1) {
			// Zoom in
			nzoom *= 1 + options.zoomStrength;
			offX = (mouse.x - w / 2) / nzoom;
			offY = (mouse.y - h / 2) / nzoom;
		} else if (type === -1) {
			// Zoom out
			nzoom /= 1 + options.zoomStrength;
			offX = (mouse.x - w / 2) * (3 / lzoom - 2 / nzoom);
			offY = (mouse.y - h / 2) * (3 / lzoom - 2 / nzoom);
		} else if (type === 3) {
			// Reset zoom (right + left click)
			// nzoom = OWOP.options.defaultZoom;
		}
		nzoom = Math.round(nzoom);
		camera.zoom = nzoom;
		if (camera.zoom !== lzoom) moveCameraBy(offX, offY);
	}

	var wheelEventName = ('onwheel' in document) ? 'wheel' : ('onmousewheel' in document) ? 'mousewheel' : 'DOMMouseScroll';

	viewport.addEventListener(wheelEventName, function mousewheel(event) {
		if (misc.world !== null && player.tool.events['scroll']) return player.tool.call('scroll', [mouse, event]);
		zoom(Math.sign(-event.deltaY));
	}, { passive: true });
	viewport.addEventListener(wheelEventName, function (e) {
		e.preventDefault();
		return false;
	}, { passive: false });

	// Touch support
	const touchEventNoUpdate = evtName => event => {
		let tool = player.tool;
		mouse.buttons = 0;
		if (tool !== null && misc.world !== null) {
			player.tool.call(evtName, [mouse, event]);
		}
	};
	viewport.addEventListener("touchstart", event => {
		let moved = event.changedTouches[0];
		mouse.buttons = 1;
		if (moved) {
			updateMouse(event, 'touchstart', moved.pageX, moved.pageY);
			mouse.mouseDownWorldX = mouse.worldX;
			mouse.mouseDownWorldY = mouse.worldY;
		}
	}, { passive: true });
	viewport.addEventListener("touchmove", event => {
		let moved = event.changedTouches[0];
		if (moved) {
			updateMouse(event, 'touchmove', moved.pageX, moved.pageY);
		}
	}, { passive: true });
	viewport.addEventListener("touchend", touchEventNoUpdate('touchend'), { passive: true });
	viewport.addEventListener("touchcancel", touchEventNoUpdate('touchcancel'), { passive: true });

	elements.soundToggle.addEventListener('change', toggleMuteSounds);
	options.enableSounds = !elements.soundToggle.checked;

	elements.experimentalGridToggle.addEventListener('change', function () {
		options.experimentalGrid = !!elements.experimentalGridToggle.checked;
	});

	elements.hexToggle.addEventListener('change', e => options.hexCoords = elements.hexToggle.checked);
	options.hexCoords = elements.hexToggle.checked;

	/* Calls other initialization functions */
	eventSys.emit(e.init);

	updateXYDisplay(0, 0);

	//windowSys.addWindow(new OWOPDropDown());

	// let worldName = decodeURIComponent(window.location.pathname);
	// let worldName = "";
	// if (worldName[0] === '/') {
	// 	worldName = worldName.slice(1);
	// }

	// misc.urlWorldName = worldName;
}

function connect(url, world) {
	const server = { title: 'OWOP', url: url };

	retryingConnect(server, world);

	elements.reconnectBtn.onclick = () => retryingConnect(server, world);

	misc.tickInterval = setInterval(tick, 1000 / options.tickSpeed);
}

eventSys.once(e.loaded, () => statusMsg(true, "Initializing..."));
eventSys.once(e.misc.loadingCaptcha, () => statusMsg(true, "Trying to load captcha..."));
eventSys.once(e.misc.logoMakeRoom, () => {
	statusMsg(false, null);
	logoMakeRoom();
});

function serverSelector() {
	logoMakeRoom(true);
	document.getElementById("server-selector").classList.remove("hidden");
	serverSelectorPopulator();
}

function serverSelectorPopulator() {
	var owopServersContainer = document.getElementById("ss-owop-servers");
	owopServersContainer.innerHTML = "";
	var lanServersContainer = document.getElementById("ss-lan-servers");
	lanServersContainer.innerHTML = "";
	var serverSelectorList = JSON.parse(localStorage.serverSelector);
	for (let serverName in serverSelectorList.owop) {
		var wsURL = serverSelectorList.owop[serverName];
		var serverListing = document.createElement("div");
		var nameElement = document.createElement("div");
		nameElement.innerHTML = serverName;
		var joinButton = document.createElement("button");
		joinButton.innerHTML = "Join";
		joinButton.addEventListener("click", function () {
			document.getElementById("server-selector").classList.add("hidden");
			connect(wsURL, serverName);
		});
		var deleteButton = document.createElement("button");
		deleteButton.innerHTML = "Delete";
		deleteButton.addEventListener("click", function () {
			delete serverSelectorList.owop[serverName];
			localStorage.serverSelector = JSON.stringify(serverSelectorList);
			serverSelectorPopulator();
		});
		var stylizingDiv = document.createElement("div");
		serverListing.appendChild(nameElement);
		stylizingDiv.appendChild(deleteButton);
		stylizingDiv.appendChild(joinButton);
		serverListing.appendChild(stylizingDiv);
		owopServersContainer.appendChild(serverListing);
	}
	// for (let serverName in serverSelectorList.lan) {
	// 	var wsURL = serverSelectorList.lan[serverName];
	// 	var serverName = serverName;
	// 	var serverListing = document.createElement("div");
	// }
}

eventSys.once(e.loaded, function () {
	init();
	if (misc.showEUCookieNag && false) { // because we are in a local file the cookies will never save, thus we dont need to give notice of their (not) usage.
		windowSys.addWindow(new UtilDialog('Cookie notice', `This box alerts you that we're going to use cookies! If you don't accept their usage, disable cookies and reload the page.`, false, () => {
			setCookie('nagAccepted', 'true');
			misc.showEUCookieNag = false;
			// logoMakeRoom(false);
			// connect();
			serverSelector();
		}));
	} else {
		serverSelector();
	}
});

eventSys.on(e.net.maxCount, count => {
	misc.world.maxCount = count;
	updatePlayerCount();
});

eventSys.on(e.net.playerCount, count => {
	misc.playerCount = count;
	updatePlayerCount();
});

eventSys.on(e.net.donUntil, (ts, pmult) => {
	const updTimer = () => {
		const now = Date.now();

		const secs = Math.floor(Math.max(0, ts - now) / 1000);
		const mins = Math.floor(secs / 60);
		const hours = Math.floor(mins / 60);
		let tmer = (hours > 0 ? hours + ':' : '')
			+ ((mins % 60) < 10 ? '0' : '') + (mins % 60) + ':'
			+ ((secs % 60) < 10 ? '0' : '') + (secs % 60);
		elements.dInfoDisplay.setAttribute("data-tmo", tmer);

	};

	clearInterval(misc.donTimer);
	elements.dInfoDisplay.setAttribute("data-pm", '' + pmult);
	elements.dInfoDisplay.setAttribute("data-ts", '' + ts);
	updTimer();
	if (ts > Date.now()) {
		misc.donTimer = setInterval(updTimer, 1000);
	}
});

eventSys.on(e.net.chat, receiveMessage);

eventSys.on(e.net.world.setId, id => {
	if (!misc.storageEnabled) return;

	function autoNick() {
		if (auth) net.protocol.sendMessage(`/nick ${auth.user.global_name ? auth.user.global_name : auth.user.username}`);
		else if (misc.localStorage.nick) net.protocol.sendMessage("/nick " + misc.localStorage.nick);
	}

	// Automatic login
	let desiredRank = misc.localStorage.adminlogin ? RANK.ADMIN : misc.localStorage.modlogin ? RANK.MODERATOR : net.protocol.worldName in misc.worldPasswords ? RANK.USER : RANK.NONE;
	if (desiredRank > RANK.NONE) {
		let mightBeMod = false;
		let onCorrect = function (newrank) {
			if (newrank == desiredRank || (mightBeMod && newrank == RANK.MODERATOR)) {
				eventSys.removeListener(e.net.sec.rank, onCorrect);
				autoNick();
			}
		};
		eventSys.on(e.net.sec.rank, onCorrect);
		let msg;
		if (desiredRank == RANK.ADMIN) {
			misc.attemptedPassword = misc.localStorage.adminlogin;
			msg = "/adminlogin " + misc.attemptedPassword;
		} else if (desiredRank == RANK.MODERATOR) {
			misc.attemptedPassword = misc.localStorage.modlogin;
			msg = "/modlogin " + misc.localStorage.modlogin;
		} else if (desiredRank == RANK.USER) {
			misc.attemptedPassword = misc.worldPasswords[net.protocol.worldName];
			msg = "/pass " + misc.worldPasswords[net.protocol.worldName];
			mightBeMod = true;
		}
		net.protocol.sendMessage(msg);
	} else {
		autoNick();
	}
});

eventSys.on(e.misc.windowAdded, window => {
	if (misc.world === null) {
		statusMsg(false, null);
		logoMakeRoom(true);
	}
});

eventSys.on(e.net.world.joining, name => {
	logoMakeRoom(false);
	console.log(`Joining world: ${name}`);
});

eventSys.on(e.net.world.join, world => {
	showLoadScr(false, false);
	showWorldUI(!options.noUi);
	renderer.showGrid(!options.noUi);
	soundSys.launch();
	packagesPopulator();
	misc.world = new World(world);
	eventSys.emit(e.misc.worldInitialized);
});

eventSys.on(e.camera.moved, camera => {
	let time = getTime();
	if (misc.world !== null && time - misc.lastCleanup > 1000) {
		misc.lastCleanup = time;
		renderer.unloadFarClusters();
	}
	if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
		updateClientFx();
	}
});

eventSys.on(e.camera.zoom, camera => {
	if (updateXYDisplay(mouse.tileX, mouse.tileY)) {
		updateClientFx();
	}
});

window.addEventListener("load", () => {
	elements.loadScr = document.getElementById("load-scr");
	elements.loadUl = document.getElementById("load-ul");
	elements.loadOptions = document.getElementById("load-options");
	elements.reconnectBtn = document.getElementById("reconnect-btn");
	elements.spinner = document.getElementById("spinner");
	elements.statusMsg = document.getElementById("status-msg");
	elements.status = document.getElementById("status");
	elements.logo = document.getElementById("logo");

	elements.noticeDisplay = document.getElementById("notice-display");
	elements.noticeDisplay.noticeId = elements.noticeDisplay.getAttribute("notice-id") || 1;
	if (misc.localStorage.dismissedId != elements.noticeDisplay.noticeId) elements.noticeDisplay.addEventListener("click", dismissNotice);
	else elements.noticeDisplay.style.display = "none";

	elements.xyDisplay = document.getElementById("xy-display");
	elements.pBucketDisplay = document.getElementById("pbucket-display");
	// elements.devChat = document.getElementById("dev-chat");
	elements.chat = document.getElementById("chat");
	// elements.devChatMessages = document.getElementById("dev-chat-messages");
	elements.chatMessages = document.getElementById("chat-messages");
	elements.playerCountDisplay = document.getElementById("playercount-display");
	elements.topLeftDisplays = document.getElementById("topleft-displays");
	elements.topRightDisplays = document.getElementById("topright-displays");
	elements.dInfoDisplay = document.getElementById("dinfo-display");

	elements.palette = document.getElementById("palette");
	elements.paletteColors = document.getElementById("palette-colors");
	elements.paletteCreate = document.getElementById("palette-create");

	elements.pickerAnchor = document.getElementById('picker-anchor');

	elements.paletteLoad = document.getElementById("palette-load");
	elements.paletteSave = document.getElementById("palette-save");
	elements.paletteOpts = document.getElementById("palette-opts");
	elements.paletteInput = document.getElementById("palette-input");
	elements.paletteBg = document.getElementById("palette-bg");

	elements.animCanvas = document.getElementById("animations");

	elements.viewport = document.getElementById("viewport");
	elements.windows = document.getElementById("windows");

	elements.chatInput = document.getElementById("chat-input");

	elements.keybindSelection = document.getElementById("keybinddiv");
	elements.soundToggle = document.getElementById("no-sound");
	elements.hexToggle = document.getElementById("hex-coords");
	elements.experimentalGridToggle = document.getElementById("experimental-grid");

	elements.serverSelector = document.getElementById("server-selector");

	document.getElementById("kb-og").addEventListener("click", () => loadDefaultBindings("og"));
	document.getElementById("kb-new").addEventListener("click", () => loadDefaultBindings("new"));

	elements.helpButton = document.getElementById("help-button");

	elements.helpButton.addEventListener("click", function () {
		var classname = document.getElementById("help").className;
		document.getElementById("help").className = classname === "" ? "hidden" : "";
	});

	document.getElementById("help-close").addEventListener("click", function () {
		document.getElementById("help").className = "hidden";
	});

	elements.packagesButton = document.getElementById("packages-button");
	elements.packages = document.getElementById("packages");

	elements.packagesButton.addEventListener("click", function () {
		var classname = document.getElementById("packages").className;
		document.getElementById("packages").className = classname === "" ? "hidden" : "";
	});

	document.getElementById("packages-close").addEventListener("click", function () {
		document.getElementById("packages").className = "hidden";
	});

	if (!localStorage.serverSelector) localStorage.serverSelector = JSON.stringify({ owop: {}, lan: {} });

	(function () {
		var worldNameTextInput = document.getElementById("ss-owop-input");
		var owopJoinButton = document.getElementById("ss-owop-input-join");
		owopJoinButton.addEventListener("click", function () {
			let worldName = worldNameTextInput.value;
			if (worldName[0] === '/') worldName = worldName.slice(1);
			elements.serverSelector.classList.add("hidden");
			connect(`wss://ourworldofpixels.com/?chat=v2`, worldName);
		});
		var owopAddButton = document.getElementById("ss-owop-input-add");
		owopAddButton.addEventListener("click", function () {
			var serverSelectorList = JSON.parse(localStorage.serverSelector);
			let worldName = worldNameTextInput.value;
			if (worldName[0] === '/') worldName = worldName.slice(1);
			if (worldName === "") worldName = "main";
			if (serverSelectorList.owop[worldName]) return;
			serverSelectorList.owop[worldName] = `wss://ourworldofpixels.com/?chat=v2`;
			localStorage.serverSelector = JSON.stringify(serverSelectorList);
			serverSelectorPopulator();
		});
	})();
	// {
	// 	let localHostPort = document.createElement("input");
	// 	let worldNameTextInput = document.createElement("input");
	// 	let button = document.createElement("button");

	// 	button.addEventListener("click", function () {
	// 		let worldName = worldNameTextInput.value;
	// 		if (worldName[0] === '/') {
	// 			worldName = worldName.slice(1);
	// 		}
	// 		misc.urlWorldName = worldName;
	// 		options.serverAddress[0].url = `ws://localhost:${localHostPort.value}`;
	// 		connect();
	// 		window.close();
	// 	});
	// }

	elements.paletteSave.addEventListener('click', () => {
		windowSys.addWindow(new GUIWindow('save palette', { centerOnce: true, closeable: true }, function (t) {
			var top = document.createElement('div');
			var btm = document.createElement('div');
			var label = document.createElement('text');
			var input = document.createElement('input');
			var savebtn = document.createElement('button');
			label.innerHTML = 'palette name';
			label.className = 'whitetext';
			input.type = 'text';
			savebtn.innerHTML = 'save';
			function submit() {
				if (!input.value || input.value.length < 1) return;
				if (!!misc.palettes[input.value]) {
					windowSys.addWindow(new GUIWindow('overwrite palette', { centered: true, closeable: false }, function (w) {
						var warning = document.createElement('div');
						var yes = document.createElement('button');
						var no = document.createElement('button');
						var btm = document.createElement('div');
						w.container.classList.add('whitetext');
						warning.innerText = 'This palette already exists. Overwrite?';
						yes.addEventListener('click', () => {
							misc.palettes[input.value] = player.palette.map(c => [...c]);
							savePalettes();
							w.close();
							t.close();
							const p = windowSys.getWindow('load palette');
							if (p) if (p.regen) p.regen();
						});
						no.addEventListener('click', w.close);
						yes.innerText = 'Yes';
						no.innerText = 'No';
						btm.style.display = 'flex';
						btm.style.flexDirection = 'row';
						btm.style.alignItems = 'center';
						btm.style.justifyContent = 'center';
						btm.appendChild(yes);
						btm.appendChild(no);
						w.container.appendChild(warning);
						w.container.appendChild(btm);
					}));
					return;
				}
				misc.palettes[input.value] = player.palette.map(c => [...c]);
				savePalettes();
				var w = windowSys.getWindow('load palette');
				if (w && w.regen) w.regen();
				t.close();
			}
			savebtn.addEventListener('click', submit);
			input.addEventListener('keydown', (e) => {
				e.stopPropagation();
				let code = e.which || e.keyCode;
				if (code == KeyCode.ENTER) submit();
			});
			top.appendChild(label);
			btm.appendChild(input);
			btm.appendChild(savebtn);
			t.container.appendChild(top);
			t.container.appendChild(btm);
		}));
	});

	elements.paletteLoad.addEventListener('click', function () {
		//layout: split into two rows, top larger than bottom, top half has list of palettes, 3 columns per row, bottom half is split into two rows, top row has name of palette selected, bottom has load and delete options
		var selectedPalette = null;
		windowSys.addWindow(new GUIWindow('load palette', { centerOnce: true, closeable: true }, function (t) {
			var top = document.createElement('div');
			var paletteContainer = document.createElement('div');
			var btm = document.createElement('div');
			var selectionContainer = document.createElement('div');
			var preview = document.createElement('div');
			var label = document.createElement('text');
			var btnContainer = document.createElement('div');
			var loadbtn = document.createElement('button');
			var deletebtn = document.createElement('button');
			var clearbtn = document.createElement('button');
			var resetbtn = document.createElement('button');
			var pcanvas = document.createElement('canvas');
			var ctx = pcanvas.getContext('2d');

			t.container.appendChild(top);
			t.container.appendChild(btm);
			t.container.classList.add('whitetext');
			t.container.classList.add('palette-load');
			top.appendChild(paletteContainer);
			paletteContainer.classList.add('palette-load-palette-container');
			top.classList.add('palette-load-top');
			btm.appendChild(selectionContainer);
			btm.classList.add('palette-load-bottom');
			btm.appendChild(btnContainer);
			selectionContainer.appendChild(label);
			selectionContainer.appendChild(preview);
			preview.appendChild(pcanvas);
			selectionContainer.classList.add('palette-load-selection-container');
			btnContainer.appendChild(loadbtn);
			btnContainer.appendChild(deletebtn);
			btnContainer.appendChild(clearbtn);
			btnContainer.appendChild(resetbtn);
			btnContainer.classList.add('palette-load-button-contianer');
			loadbtn.innerText = 'load';
			deletebtn.innerText = 'delete';
			clearbtn.innerText = 'clear';
			resetbtn.innerText = 'reset';

			function createRow() {
				var row = document.createElement('div');
				row.classList.add('palette-button-row');
				return row;
			}

			function genRows() {
				var measure = document.createElement('div');
				var currentRow = createRow();
				var rw = 0;
				var mw = 400;
				paletteContainer.innerHTML = '';
				paletteContainer.appendChild(currentRow);
				measure.style.visibility = 'hidden';
				measure.style.position = 'absolute';
				measure.style.left = '-999999999px';
				document.body.appendChild(measure);

				for (let paletteName of Object.keys(misc.palettes)) {
					var palette = document.createElement('button');
					var bw = palette.offsetWidth + 4;
					palette.innerText = paletteName;

					measure.appendChild(palette);
					measure.removeChild(palette);

					if (rw + bw > mw) {
						currentRow = createRow();
						paletteContainer.appendChild(currentRow);
						rw = 0;
					}

					currentRow.appendChild(palette);
					rw += bw;

					palette.addEventListener('click', function () {
						selectedPalette = paletteName;
						updateSelection();
					});
				}
				measure.remove();
				windowSys.centerWindow(t);
			}

			loadbtn.addEventListener('click', function () {
				if (!selectedPalette) return;
				player.clearPalette();
				player.palette = misc.palettes[selectedPalette];
				player.paletteIndex = 0;
				t.close();
			});

			deletebtn.addEventListener('click', function () {
				if (!selectedPalette) return;
				windowSys.addWindow(new GUIWindow('delete palette', { centered: true, closeable: false }, function (w) {
					var warning = document.createElement('div');
					var yes = document.createElement('button');
					var no = document.createElement('button');
					var btm = document.createElement('div');
					w.container.classList.add('whitetext');
					w.container.style.textAlign = 'center';
					warning.innerText = 'Are you sure?';
					yes.addEventListener('click', function () {
						delete misc.palettes[selectedPalette];
						savePalettes();
						selectedPalette = null;
						updateSelection();
						w.close();
						t.regen();
					});
					no.addEventListener('click', w.close);
					yes.innerText = 'Yes';
					no.innerText = 'No';
					btm.style.display = 'flex';
					btm.style.flexDirection = 'row';
					btm.style.alignItems = 'center';
					btm.style.justifyContent = 'center';
					btm.appendChild(yes);
					btm.appendChild(no);
					w.container.appendChild(warning);
					w.container.appendChild(btm);
				}));
			});

			clearbtn.addEventListener('click', function () {
				windowSys.addWindow(new GUIWindow('clear palette', { centered: true, closeable: false }, function (w) {
					var warning = document.createElement('div');
					var yes = document.createElement('button');
					var no = document.createElement('button');
					var btm = document.createElement('div');
					w.container.classList.add('whitetext');
					warning.innerText = 'Do you want to clear your current palette?';
					yes.addEventListener('click', function () {
						player.clearPalette();
						player.palette = [[0, 0, 0]];
						player.paletteIndex = 0;
						w.close();
					});
					no.addEventListener('click', w.close);
					yes.innerText = 'Yes';
					no.innerText = 'No';
					btm.style.display = 'flex';
					btm.style.flexDirection = 'row';
					btm.style.alignItems = 'center';
					btm.style.justifyContent = 'center';
					btm.appendChild(yes);
					btm.appendChild(no);
					w.container.appendChild(warning);
					w.container.appendChild(btm);
				}));
			});

			resetbtn.addEventListener('click', function () {
				windowSys.addWindow(new GUIWindow('reset palettes', { centered: true, closeable: false }, function (w) {
					var warning = document.createElement('div');
					var yes = document.createElement('button');
					var no = document.createElement('button');
					var btm = document.createElement('div');
					w.container.classList.add('whitetext');
					w.container.style.textAlign = 'center';
					warning.innerText = 'Are you sure you want to erase all palettes?';
					yes.addEventListener('click', function () {
						misc.palettes = {};
						savePalettes();
						selectedPalette = null;
						updateSelection();
						w.close();
						t.regen();
					});
					no.addEventListener('click', w.close);
					yes.innerText = 'Yes';
					no.innerText = 'No';
					btm.style.display = 'flex';
					btm.style.flexDirection = 'row';
					btm.style.alignItems = 'center';
					btm.style.justifyContent = 'center';
					btm.appendChild(yes);
					btm.appendChild(no);
					w.container.appendChild(warning);
					w.container.appendChild(btm);
				}));
			});

			function updateSelection() {
				if (!selectedPalette) {
					label.innerText = 'No palette selected';
					preview.style.display = 'none';
					// btnContainer.style.display = 'none';
					loadbtn.style.display = 'none';
					deletebtn.style.display = 'none';
					windowSys.centerWindow(t);
					return;
				}
				var total = misc.palettes[selectedPalette].length;
				var pxIndex = 0;
				var pyIndex = 0;
				var tilesize = 16;
				label.innerText = `Selected palette: ${selectedPalette}`;
				preview.style.display = '';
				loadbtn.style.display = '';
				deletebtn.style.display = '';
				pcanvas.width = 448;
				pcanvas.height = 224;
				while (Math.floor(pcanvas.width / tilesize) * Math.floor(pcanvas.height / tilesize) < total && tilesize > 1 && tilesize > 1) tilesize /= 2;
				// ctx.fillStyle = '#000';
				// ctx.fillRect(0, 0, pcanvas.width, pcanvas.height);
				for (let color of misc.palettes[selectedPalette]) {
					ctx.fillStyle = colorUtils.toHTML(colorUtils.u24_888(color[0], color[1], color[2]));
					ctx.fillRect(pxIndex * tilesize, pyIndex * tilesize, tilesize, tilesize);
					pxIndex++;
					if (pxIndex * tilesize >= pcanvas.width) {
						pxIndex = 0;
						pyIndex++;
					}
				}
				windowSys.centerWindow(t);
			}
			genRows();
			updateSelection();
			t.regen = genRows;
		}));
	});

	checkFunctionality(() => sdk ? initSdk() : eventSys.emit(e.loaded));

	setInterval(() => {
		let pb = net.protocol?.placeBucket;
		pb?.update();
		elements.pBucketDisplay.innerText = `Place bucket: ${pb?.allowance?.toFixed(1)} (${pb?.rate}/${pb?.time}s).`;
	}, 100);
});

// palettes: {paletteName:[[r,g,b],[r,g,b],...]} (alpha exists, but is ignored since rn everything is just fully opaque lol)

function savePalettes() {
	if (misc.storageEnabled) {
		misc.localStorage.palettes = JSON.stringify(misc.palettes);
	}
}

/* Public API definitions */
PublicAPI.client.elements = elements;
PublicAPI.client.mouse = mouse;
PublicAPI.chat = {
	send: (msg) => net.protocol && net.protocol.sendMessage(msg),
	clear: clearChat,
	receiveMessage: receiveMessage,
	local: msg => receiveMessage(JSON.stringify({
		sender: 'server',
		type: 'info',
		data: {
			allowHTML: true,
			message: misc.chatSendModifier(msg)
		}
	})),
	registerCommand: function (name, callback, desc = "", aliases = []) {
		if (OWOP.chat.commandList[name]) return console.error(`${name} already exists`);
		aliases.unshift(name);
		aliases.forEach(alias => {
			OWOP.chat.commandList[alias] = {
				'name': alias,
				'callback': callback,
				'desc': desc,
				'aliases': aliases
			};
		});
	},
	commandList: {}
};

PublicAPI.muted = [];
PublicAPI.utils.retryingConnect = retryingConnect;
PublicAPI.statusMsg = statusMsg;
PublicAPI.createContextMenu = createContextMenu;

window.addEventListener("mousemove", function (e) {
	window.clientX = e.clientX;
	window.clientY = e.clientY;
});
