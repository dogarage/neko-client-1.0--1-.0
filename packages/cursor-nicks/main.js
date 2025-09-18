OWOP.canvas.renderer.replaceRenderPlayerId = function (ctx, fontsize, zoom, x, y, id, color, player) {
	let text;
	let nick = player.nick;
	// text = nick ? `[${id}] ${nick}` : id;
	text = nick;

	let textw = ctx.measureText(text).width + (zoom / 2);

	ctx.globalAlpha = 1;
	ctx.fillStyle = color;
	ctx.fillRect(x, y, textw, zoom);
	ctx.globalAlpha = 0.2;
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#000000";
	ctx.strokeRect(x, y, textw, zoom);
	ctx.globalAlpha = 1;
	OWOP.canvas.renderer.drawText(ctx, text, x + zoom / 4, y + fontsize + zoom / 8);
};