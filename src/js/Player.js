"use strict";

import { getTime } from './misc.js';
import { colorUtils as color } from './util.js';
import { Fx, PLAYERFX } from './Fx.js';
import { tools } from './tools.js';
import { isVisible } from './canvas_renderer.js';
import { GUIWindow, windowSys } from './windowsys.js';
import { elements, misc } from './conf.js';

let plWidth = 0;

export var playerList = {};
export var playerListTable = document.createElement("table");
export var playerListWindow = new GUIWindow('Players', { closeable: true }, wdow => {
    let tableHeader = document.createElement("tr");
    tableHeader.innerHTML = "<th>Id</th><th>X</th><th>Y</th>";
    playerListTable.appendChild(tableHeader);
    wdow.container.appendChild(playerListTable);
    wdow.container.id = "player-list";
    plWidth = wdow.container.parentElement.offsetWidth;
});
playerListWindow.container.updateDisplay = function () {
    let diff = playerListWindow.container.parentElement.offsetWidth - plWidth
    if (diff !== 0) {
        playerListWindow.move(playerListWindow.x - diff, playerListWindow.y);
        plWidth = playerListWindow.container.parentElement.offsetWidth;
    }
}
function fixPlayerListPos() {
    playerListWindow.move(window.innerWidth - elements.paletteBg.getBoundingClientRect().width - playerListWindow.container.parentElement.offsetWidth - 16, elements.topRightDisplays.getBoundingClientRect().height + 16);
}
window.addEventListener("resize", fixPlayerListPos);

export function showPlayerList(bool = true) {
    if (bool) {
        windowSys.addWindow(playerListWindow);
        plWidth = playerListWindow.container.parentElement.offsetWidth;
        fixPlayerListPos();
    } else {
        windowSys.delWindow(playerListWindow);
    }
}

class Lerp {
    constructor(start, end, ms) {
        this.start = start;
        this.end = end;
        this.ms = ms;
        this.time = getTime();
    }

    get val() {
        let amt = Math.min((getTime() - this.time) / this.ms, 1);
        return (1 - amt) * this.start + amt * this.end;
    }

    set val(v) {
        this.start = this.val;
        this.end = v;
        this.time = getTime(true);
    }
}

export class Player {
    constructor(x, y, rgb, tool, id) {
        this.id = id.toString(); /* Prevents calling .toString every frame */
        this._x = new Lerp(x, x, 65);
        this._y = new Lerp(y, y, 65);

        this.tool = tools[tool] || tools['cursor'];
        this.fx = new Fx(tool ? tool.fxType : PLAYERFX.NONE, { player: this });
        this.fx.setVisible(misc.world.validMousePos(Math.floor(this.endX / 16), Math.floor(this.endY / 16)));

        this.rgb = rgb;
        this.nick = this.id;
        this.htmlRgb = color.toHTML(color.u24_888(rgb[0], rgb[1], rgb[2]));

        this.clr = color.toHTML(0
            | (((id + 75387) * 67283 + 53143) % 256) << 16
            | (((id + 9283) * 4673 + 7483) % 256) << 8
            | (id * 3000 % 256)
        );

        let playerListEntry = document.createElement("tr");
        playerListEntry.innerHTML = "<td>" + this.id + "</td><td>" + Math.floor(x / 16) + "</td><td>" + Math.floor(y / 16) + "</td>";
        playerList[this.id] = playerListEntry;
        playerListTable.appendChild(playerListEntry);
        playerListWindow.container.updateDisplay();
    }

    get tileX() {
        return Math.floor(this.x / 16);
    }

    get tileY() {
        return Math.floor(this.y / 16);
    }

    get endX() {
        return this._x.end;
    }

    get endY() {
        return this._y.end;
    }

    get x() {
        return this._x.val;
    }

    get y() {
        return this._y.val;
    }

    update(x, y, rgb, tool) {
        this._x.val = x;
        this._y.val = y;
        /* TODO: fix weird bug (caused by connecting before tools initialized?) */
        //console.log(tool)
        this.tool = tools[tool] || tools['cursor'];
        this.fx.setRenderer((this.tool || {}).fxRenderer); // temp until fix: || {}
        this.fx.setVisible(isVisible(Math.floor(this.endX / 16), Math.floor(this.endY / 16)));
        this.rgb = rgb;
        this.htmlRgb = color.toHTML(color.u24_888(rgb[0], rgb[1], rgb[2]));

        playerList[this.id].childNodes[1].innerHTML = Math.floor(x / 16);
        playerList[this.id].childNodes[2].innerHTML = Math.floor(y / 16);
        playerListWindow.container.updateDisplay();
    }

    disconnect() {
        this.fx.delete();

        playerListTable.removeChild(playerList[this.id]);
        delete playerList[this.id];
        playerListWindow.container.updateDisplay();
    }
}
