!function () {
    var width = 450;
    var height = 100;
    var win = new OWOP.client.GUIWindow("DayDun Radio", { closeable: true }, wdow => {
        var iframe = document.createElement("iframe");
        iframe.src = "https://daydun.com/radio/";
        iframe.width = width;
        iframe.height = height;
        iframe.frameBorder = 0;
        iframe.style.margin = "-4px";
        iframe.style.marginBottom = "-7px";
        wdow.container.appendChild(iframe);
        wdow.container.style.overflow = "visible";
    }).move(window.innerWidth - width - 108 - 14, window.innerHeight - height - 16 - 31);
    OWOP.client.windowSys.addWindow(win);
}();