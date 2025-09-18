"use strict";

import { camera, renderer } from "./canvas_renderer.js"; // rendererValues, Lerp
import { RANK, EVENTS, options, soundSys, misc } from "./conf.js";
import { activeFx, WORLDFX, PLAYERFX, Fx } from "./Fx.js";
import { player } from "./local_player.js";
import { cursors } from "./tool_renderer.js";
import { OldProtocolImpl, OldProtocol, captchaState, net } from "./networking.js";
import { tools, updateToolbar, addTool, Tool, updateToolWindow, toolsWindow } from "./tools.js";
import { World } from "./World.js";
import { windowSys, GUIWindow } from "./windowsys.js";
import { getTime, cookiesEnabled, storageEnabled, absMod, mkHTML, setTooltip, waitFrames, line, loadScript, setCookie, getCookie, propertyDefaults, htmlToElement, decompress, KeyCode, KeyName } from "./misc.js";
import { eventSys, colorUtils } from "./util.js";
import { installedPackages, installPackage } from "./packagemanager.js";
import { playerList, playerListTable, playerListWindow, showPlayerList } from "./Player.js";

export const PublicAPI = {
	client: {
		elements: null,
		camera: camera,
		RANK: RANK,
		EVENTS: EVENTS,
		options: options,
		Tool: Tool,
		addTool: addTool,
		updateToolbar: updateToolbar,
		updateToolWindow: updateToolWindow,
		tools: tools,
		toolsWindow: toolsWindow,
		player: player,
		eventSys: eventSys,
		cursors: cursors,
		World: World,
		windowSys: windowSys,
		GUIWindow: GUIWindow,
		installedPackages: installedPackages,
	},
	utils: {
		getTime,
		cookiesEnabled,
		storageEnabled,
		absMod,
		mkHTML,
		setTooltip,
		waitFrames,
		line,
		loadScript,
		setCookie,
		getCookie,
		propertyDefaults,
		htmlToElement,
		decompress,
		KeyCode,
		KeyName,
		colorUtils,
		installPackage,
		showPlayerList,
		retryingConnect: null,
		playerList,
		playerListTable,
		playerListWindow
	},
	network: {
		protocol: OldProtocol,
		net: net,
		OldProtocolImpl,
		OldProtocol,
		captchaState,
	},
	canvas: {
		activeFx: activeFx,
		renderer: renderer,
		WORLDFX: WORLDFX,
		PLAYERFX: PLAYERFX,
		Fx: Fx,
	},
	packages: {},
	soundSys: soundSys,
	chat: null,
	muted: null,
	misc: misc,
	statusMsg: null,
	createContextMenu: null,
};

window.OWOP = PublicAPI;