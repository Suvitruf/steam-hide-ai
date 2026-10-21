// ==UserScript==
// @name         Steam Hide AI
// @namespace    steam-hide-ai
// @version      0.2.0
// @description  Userscript that hides games with an AI Generated Content Disclosure on the Steam store
// @downloadURL  https://raw.githubusercontent.com/Suvitruf/steam-hide-ai/master/steam-hide-ai.user.js
// @updateURL    https://raw.githubusercontent.com/Suvitruf/steam-hide-ai/master/steam-hide-ai.meta.js
// @match        https://store.steampowered.com/*
// @match        https://steam-ai-hide.apanasik.com/auth/complete*
// @connect      steam-ai-hide.apanasik.com
// @connect      raw.githubusercontent.com
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @noframes
// ==/UserScript==
