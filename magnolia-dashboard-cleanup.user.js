// ==UserScript==
// @name         Magnolia Dashboard Cleanup
// @namespace    https://www.magnoliastoragetx.com
// @version      1.0
// @description  Cleans up the Magnolia Storage dashboard — hides KPI tiles, broken cards, and clutter sections. Auto-refreshes every 5 minutes.
// @match        https://www.magnoliastoragetx.com/reports/dashboard
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    var style = document.createElement('style');
    style.textContent = '.md-tiles { display: none !important; }';
    document.head.appendChild(style);

    function applyCleanup() {
        var mdGrid = document.querySelector('.md-grid');
        if (!mdGrid) { setTimeout(applyCleanup, 500); return; }
        var children = Array.from(mdGrid.children);
        [2, 3, 4, 5, 7, 8].forEach(function(i) {
            if (children[i]) children[i].style.display = 'none';
        });
        document.querySelectorAll('.md-sum-box').forEach(function(box) {
            if (box.textContent.includes('N/A')) box.style.display = 'none';
        });
    }
    applyCleanup();

    var meta = document.createElement('meta');
    meta.httpEquiv = 'refresh';
    meta.content = '300';
    document.head.appendChild(meta);

    var indicator = document.createElement('div');
    indicator.style.cssText = 'position:fixed;bottom:10px;left:10px;background:#28a745;color:white;padding:6px 14px;border-radius:20px;font-size:13px;z-index:9999;font-family:sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.2);';
    var seconds = 300;
    setInterval(function() {
        seconds--;
        var min = Math.floor(seconds / 60);
        var sec = seconds % 60;
        indicator.innerHTML = '\u21bb Refresh in ' + min + ':' + (sec < 10 ? '0' : '') + sec;
        if (seconds <= 0) seconds = 300;
    }, 1000);
    indicator.innerHTML = '\u21bb Refresh in 5:00';
    document.body.appendChild(indicator);
})();