// ==UserScript==
// @name         BBB Volume Slider
// @website      https://github.com/PPrzemko/bbb-volumeslider
// @version      0.4
// @description  Adds a volume slider
// @author       Leon
// @match        https://*.h-da.de/html5client/join*
// @match        https://*.h-da.cloud/html5client/join*
// @updateURL    https://raw.githubusercontent.com/PPrzemko/bbb-volumeslider/main/bbb-volume-slider.user.js
// @downloadURL  https://raw.githubusercontent.com/PPrzemko/bbb-volumeslider/main/bbb-volume-slider.user.js
// @grant        none
// ==/UserScript==

async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
}

function getTopRightContainer() {
    return document.querySelector('.sc-hZyDwR.kHwYXb');
}

function remoteMedia() {
    return document.getElementById("remote-media");
}

function createVSContainer() {
    let vsc = document.createElement("div");
    vsc.id = "vs-container";
    vsc.style.verticalAlign = "middle";
    vsc.style.marginRight = "20px";

    return vsc;
}

function createVolumeSlider() {
    let vs = document.createElement("input");
    vs.style.verticalAlign = "middle";
    vs.type = "range";
    vs.min = 1;
    vs.max = 100;
    vs.value = 30;

    vs.oninput = function() {
        remoteMedia().volume = Math.pow(this.value / 100.0, 2);
    }

    return vs;
}

(async function() {
    'use strict';

    // Check if the volume already slider exists
    if (document.getElementById("vs-container") != null) return;

    // Wait until dynamic DOM content is ready
    while (getTopRightContainer() == null) {
        await sleep(500);
    }

    // Create container & slider
    let container = createVSContainer();
    let slider = createVolumeSlider();
    container.append(slider);

    // Update audio volume to default slider value
    slider.oninput();

    // Insert the volume slider into the right side of the top bar
    let targetContainer = getTopRightContainer();
    targetContainer.insertBefore(container, targetContainer.firstChild);

})();
