"use strict";

import { cookiesEnabled, getCookie, propertyDefaults, storageEnabled } from './misc.js';
import toolSet from '../img/toolset.png';
import unloadedPat from '../img/unloaded.png';

import launchSoundUrl from '../audio/launch.mp3';
import placeSoundUrl from '../audio/place.mp3';
import clickSoundUrl from '../audio/click.mp3';

export const soundSys = {
	launchAudio: new Audio(launchSoundUrl),
	placeAudio: new Audio(placeSoundUrl),
	clickAudio: new Audio(clickSoundUrl),
	launchLastPlayed: 0,
	placeLastPlayed: 0,
	clickLastPlayed: 0,
	launch: function () {
		if (!options.enableSounds) return;
		let currentTime = Date.now();
		// if (currentTime - this.clickLastPlayed < 0) return;

		this.launchAudio.currentTime = 0;
		this.launchAudio.play();
		this.launchLastPlayed = currentTime;
	},
	place: function () {
		if (!options.enableSounds) return;
		let currentTime = Date.now();
		// if (currentTime - this.clickLastPlayed < 0) return;

		this.placeAudio.currentTime = 0;
		this.placeAudio.play();
		this.placeLastPlayed = currentTime;
	},
	click: function () {
		if (!options.enableSounds) return;
		let currentTime = Date.now();
		// if (currentTime - this.clickLastPlayed < 0) return;

		this.clickAudio.currentTime = 0;
		this.clickAudio.play();
		this.clickLastPlayed = currentTime;
	}
};

export const elements = {
	animCanvas: null,
	chat: null,
	chatInput: null,
	chatMessages: null,
	dInfoDisplay: null,
	experimentalGridToggle: null,
	helpButton: null,
	hexToggle: null,
	keybindSelection: null,
	loadOptions: null,
	loadScr: null,
	loadUl: null,
	logo: null,
	noticeDisplay: null,
	pBucketDisplay: null,
	packages: null,
	packagesButton: null,
	palette: null,
	paletteBg: null,
	paletteColors: null,
	paletteCreate: null,
	paletteInput: null,
	paletteLoad: null,
	paletteOpts: null,
	paletteSave: null,
	pickerAnchor: null,
	playerCountDisplay: null,
	reconnectBtn: null,
	serverSelector: null,
	soundToggle: null,
	spinner: null,
	status: null,
	statusMsg: null,
	topLeftDisplays: null,
	topRightDisplays: null,
	viewport: null,
	windows: null,
	xyDisplay: null,
};

export const RANK = {
	NONE: 0,
	USER: 1,
	MODERATOR: 2,
	ADMIN: 3
};

let evtId = 0;

export const EVENTS = {
	loaded: ++evtId,
	init: ++evtId,
	tick: ++evtId,
	misc: {
		toolsRendered: ++evtId,
		toolsInitialized: ++evtId,
		logoMakeRoom: ++evtId,
		worldInitialized: ++evtId,
		windowAdded: ++evtId,
		captchaToken: ++evtId,
		loadingCaptcha: ++evtId
	},
	renderer: {
		addChunk: ++evtId,
		rmChunk: ++evtId,
		updateChunk: ++evtId
	},
	camera: {
		moved: ++evtId,
		zoom: ++evtId /* (zoom value), note that this event should not be used to SET zoom level. */
	},
	net: {
		connecting: ++evtId,
		connected: ++evtId,
		disconnected: ++evtId,
		playerCount: ++evtId,
		chat: ++evtId,
		devChat: ++evtId,
		world: {
			leave: ++evtId,
			join: ++evtId, /* (worldName string) */
			joining: ++evtId, /* (worldName string) */
			setId: ++evtId,
			playersMoved: ++evtId, /* (Object with all the updated player values) */
			playersLeft: ++evtId,
			tilesUpdated: ++evtId,
			teleported: ++evtId
		},
		chunk: {
			load: ++evtId, /* (Chunk class) */
			unload: ++evtId, /* (x, y) */
			set: ++evtId, /* (x, y, data), backwards compat */
			lock: ++evtId,
			allLoaded: ++evtId
		},
		sec: {
			rank: ++evtId
		},
		maxCount: ++evtId,
		donUntil: ++evtId
	}
};

let userOptions = {};
if (storageEnabled()) {
	try {
		userOptions = JSON.parse(localStorage.getItem('owopOptions') || '{}');
	} catch (e) {
		console.error('Error while parsing user options!', e);
	}
}

let shouldFool = false; //(d => d.getMonth() == 3 && d.getDate() == 1)(new Date());
function getDefaultWorld() {
	try {
		return shouldFool ? 'aprilfools' : ((navigator.language || navigator.languages[0] || "").startsWith("ru") ? "ru" : "main");
	} catch (e) {
		return "main";
	}
}

export const options = propertyDefaults(userOptions, {
	fallbackFps: 30, // Fps used if requestAnimationFrame is not supported
	maxChatBuffer: 256, // How many chat messages to retain in the chatbox
	tickSpeed: 30, // How many times per second to run a tick
	minGridZoom: 1, /* Minimum zoom level where the grid shows up */
	movementSpeed: 1, /* Pixels per tick */
	defaultWorld: getDefaultWorld(),
	enableSounds: true,
	enableIdView: true,
	defaultZoom: 16,
	zoomStrength: 1,
	zoomLimitMin: 1,
	zoomLimitMax: 32,
	unloadDistance: 10,
	toolSetUrl: toolSet,
	unloadedPatternUrl: unloadedPat,
	noUi: false,
	fool: shouldFool,
	backgroundUrl: null,
	/* Bug only affects Windows users with an old Intel graphics card driver */
	chunkBugWorkaround: false, // navigator.userAgent.indexOf('Windows NT') !== -1
	hexCoords: false,
	showProtectionOutlines: true,
	showPlayers: true,
	experimentalGrid: false
});

export const misc = {
	localStorage: storageEnabled() && window.localStorage,
	lastXYDisplay: [-1, -1],
	chatPostFormatRecvModifier: msg => msg,
	chatRecvModifier: msg => msg,
	chatSendModifier: msg => msg,
	exceptionTimeout: null,
	worldPasswords: {},
	tick: 0,
	urlWorldName: null,
	connecting: false,
	tickInterval: null,
	lastMessage: null,
	lastCleanup: 0,
	world: null,
	guiShown: false,
	cookiesEnabled: cookiesEnabled(),
	storageEnabled: storageEnabled(),
	showEUCookieNag: !options.noUi && cookiesEnabled() && getCookie("nagAccepted") !== "true",
	usingFirefox: navigator.userAgent.indexOf("Firefox") !== -1,
	donTimer: 0,
	keybinds: {},
	palettes: {},
	attemptedPassword: null
};

if (options.chunkBugWorkaround) {
	console.debug('Chunk bug workaround enabled!');
}