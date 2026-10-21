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

(function() {
	"use strict";
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	_css(".shai-hidden{display:none!important}.shai-revealed{outline:1px dashed #ffaa3c99}.shai-stub{box-sizing:border-box;color:#8f98a0;background:#00000059;border:1px dashed #ffffff40;border-radius:3px;align-items:center;gap:8px;min-height:28px;margin:2px 0;padding:4px 10px;font-size:12px;line-height:1.3;display:flex}.shai-stub__title{color:#c6d4df;white-space:nowrap;font-weight:600}.shai-stub__reason{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;overflow:hidden}.shai-stub__show{cursor:pointer;color:#66c0f4;flex:none;text-decoration:underline}.shai-blur{position:relative}.shai-blur>:not(.shai-badge){filter:blur(8px);transition:filter .15s}.shai-blur:hover>:not(.shai-badge){filter:none}.shai-badge{z-index:50;color:#ffb14d;pointer-events:none;text-overflow:ellipsis;white-space:nowrap;background:#000c;border-radius:2px;max-width:calc(100% - 8px);padding:2px 6px;font-size:11px;line-height:1.3;position:absolute;top:4px;left:4px;overflow:hidden}.shai-blur:hover>.shai-badge{opacity:.35}.shai-checking{position:relative}.shai-checking:after{content:attr(data-shai-checking);z-index:40;color:#8f98a0;opacity:.7;pointer-events:none;font-size:10px;position:absolute;top:2px;right:4px}.shai-banner{color:#c6d4df;background:linear-gradient(90deg,#3c2300bf,#0009);border:1px solid #ffb14d;border-radius:3px;margin:0 0 12px;padding:12px 16px;font-size:13px;line-height:1.45}.shai-banner__title{color:#ffb14d;margin-bottom:4px;font-size:15px;font-weight:600}.shai-banner__text{color:#acb2b8;margin-top:6px;font-style:italic}.shai-banner__actions{gap:12px;margin-top:8px;display:flex}.shai-banner__actions a{cursor:pointer;color:#66c0f4}.shai-overlay{z-index:10000;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);background:#000000d9;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.shai-overlay__box{color:#c6d4df;background:#1b2838;border:1px solid #ffb14d;border-radius:4px;max-width:560px;margin:16px;padding:24px 28px;font-size:14px;line-height:1.5}.shai-overlay__box h2{color:#ffb14d;margin:0 0 10px;font-size:20px}.shai-overlay__actions{gap:10px;margin-top:18px;display:flex}.shai-modal-backdrop{z-index:10001;background:#000000b3;justify-content:center;align-items:flex-start;padding:40px 16px;display:flex;position:fixed;inset:0;overflow:auto}.shai-modal{color:#c6d4df;background:#1b2838;border-radius:4px;width:100%;max-width:640px;padding:20px 24px;font-size:13px;line-height:1.5;box-shadow:0 0 20px #000}.shai-modal h2{color:#fff;margin:0 0 14px;font-size:18px;font-weight:400}.shai-modal fieldset{border:1px solid #ffffff1f;border-radius:3px;margin:0 0 14px;padding:10px 12px}.shai-modal legend{color:#66c0f4;padding:0 6px}.shai-modal label{cursor:pointer;margin:3px 0;display:block}.shai-modal .shai-inline label{margin-right:12px;display:inline-block}.shai-modal textarea,.shai-modal input[type=text],.shai-modal input[type=number],.shai-modal select{box-sizing:border-box;color:#c6d4df;width:100%;font:inherit;background:#0f1a24;border:1px solid #000;border-radius:2px;margin:2px 0 6px;padding:4px 6px}.shai-modal input[type=number]{width:70px}.shai-modal textarea{resize:vertical;min-height:48px}.shai-modal__actions{flex-wrap:wrap;gap:8px;margin-top:10px;display:flex}.shai-btn{color:#fff;font:inherit;cursor:pointer;background:#3d6c8d;border:none;border-radius:2px;padding:6px 14px;display:inline-block}.shai-btn--primary{background:linear-gradient(90deg,#47bfff 5%,#1a44c2 95%)}.shai-btn--secondary{color:#c6d4df;background:#ffffff1f}.shai-modal__status{color:#8f98a0;margin-top:8px}.shai-header-btn{cursor:pointer}.shai-report{color:#c6d4df;background:#00000059;border:1px solid #ffffff26;border-radius:3px;flex-wrap:wrap;align-items:center;gap:8px 14px;margin:0 0 12px;padding:8px 14px;font-size:12px;line-height:1.4;display:flex}.shai-report__head{flex:260px}.shai-report__title{color:#66c0f4;font-weight:600}.shai-report__stats{color:#acb2b8}.shai-report__body{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.shai-report__body .shai-btn{padding:4px 10px;font-size:12px}.shai-report__mine{color:#ffb14d}.shai-report__status{color:#8f98a0;flex-basis:100%}.shai-report__status:empty{display:none}.shai-modal--report{max-width:480px}.shai-modal--report input[type=checkbox]{margin-right:4px}");
	var categories_default = {
		$comment: "Keyword stems per usage category and language. Trailing * = any letters may follow. Latin/Cyrillic keywords match at word boundaries; CJK/Thai match as substrings. Keep lower-case.",
		art: {
			"en": [
				"art",
				"arts",
				"artwork*",
				"image*",
				"picture*",
				"illustration*",
				"sprite*",
				"texture*",
				"concept art",
				"key art",
				"cover art",
				"portrait*",
				"icons",
				"icon",
				"background art",
				"background image*",
				"backgrounds",
				"graphic*",
				"capsule*",
				"thumbnail*",
				"2d",
				"3d model*",
				"3d asset*",
				"art asset*",
				"visual asset*",
				"character design*",
				"drawing*",
				"painting*",
				"logo",
				"logos",
				"banner*",
				"pixel art",
				"skybox*",
				"avatar*",
				"splash",
				"wallpaper*",
				"render*",
				"environment art",
				"tileset*",
				"tiles",
				"visuals",
				"visual art*",
				"visual effect*",
				"visual design*",
				"visual element*",
				"visual content"
			],
			"ru": [
				"арт",
				"арты",
				"артов",
				"артами",
				"изображен*",
				"иллюстрац*",
				"картин*",
				"текстур*",
				"спрайт*",
				"портрет*",
				"иконк*",
				"графи*",
				"визуал*",
				"капсул*",
				"рисун*",
				"рисов*",
				"обложк*",
				"баннер*",
				"аватар*",
				"фоны",
				"фонов",
				"фоновые изображен*",
				"задник*",
				"3d модел*",
				"3д модел*",
				"модели персонаж*",
				"дизайн персонаж*",
				"пиксель-арт",
				"пиксельн*",
				"превью",
				"логотип*"
			],
			"de": [
				"bild*",
				"grafik*",
				"illustration*",
				"textur*",
				"kunst",
				"artwork*",
				"zeichnung*",
				"porträt*",
				"hintergrundbild*",
				"sprite*",
				"3d-modell*",
				"charakterdesign*",
				"logo*",
				"banner*"
			],
			"fr": [
				"image*",
				"illustration*",
				"dessin*",
				"texture*",
				"graphisme*",
				"portrait*",
				"sprite*",
				"modèle* 3d",
				"modele* 3d",
				"arrière-plan*",
				"logo*",
				"bannière*",
				"visuel*"
			],
			"es": [
				"arte",
				"imagen",
				"imágenes",
				"imagenes",
				"ilustraci*",
				"textura*",
				"dibujo*",
				"gráfico*",
				"grafico*",
				"retrato*",
				"sprite*",
				"modelo* 3d",
				"fondo*",
				"logo*",
				"banner*",
				"visual*"
			],
			"pt": [
				"arte",
				"artes",
				"imagem",
				"imagens",
				"ilustraç*",
				"ilustrac*",
				"textura*",
				"desenho*",
				"gráfico*",
				"grafico*",
				"retrato*",
				"sprite*",
				"modelo* 3d",
				"fundo*",
				"logo*",
				"banner*",
				"visual*"
			],
			"it": [
				"immagin*",
				"illustrazion*",
				"texture*",
				"disegn*",
				"grafic*",
				"ritratt*",
				"sprite*",
				"modell* 3d",
				"sfond*",
				"logo*",
				"banner*",
				"visual*"
			],
			"pl": [
				"grafik*",
				"obraz*",
				"ilustracj*",
				"tekstur*",
				"rysun*",
				"portret*",
				"sprite*",
				"model* 3d",
				"tło",
				"tła",
				"logo*",
				"baner*"
			],
			"ja": [
				"イラスト",
				"画像",
				"アート",
				"テクスチャ",
				"背景",
				"絵",
				"立ち絵",
				"ドット絵",
				"3dモデル",
				"キャラクターデザイン",
				"ロゴ",
				"アイコン",
				"スプライト"
			],
			"zh": [
				"美术",
				"图片",
				"图像",
				"插画",
				"插图",
				"贴图",
				"立绘",
				"背景图",
				"原画",
				"3d模型",
				"角色设计",
				"图标",
				"像素",
				"封面",
				"绘画",
				"绘制"
			],
			"ko": [
				"일러스트",
				"이미지",
				"아트",
				"텍스처",
				"배경",
				"그림",
				"3d 모델",
				"캐릭터 디자인",
				"로고",
				"아이콘",
				"스프라이트"
			]
		},
		text: {
			"en": [
				"text",
				"texts",
				"dialog",
				"dialogs",
				"dialogue*",
				"story",
				"stories",
				"storyline*",
				"narrative*",
				"description*",
				"lore",
				"translation*",
				"localization*",
				"localisation*",
				"subtitle*",
				"quest text*",
				"item description*",
				"flavor text*",
				"flavour text*",
				"plot",
				"names",
				"naming",
				"copywriting",
				"proofread*",
				"grammar"
			],
			"ru": [
				"текст",
				"тексты",
				"текста",
				"тексте",
				"текстом",
				"текстами",
				"текстов*",
				"текстик*",
				"диалог*",
				"сюжет*",
				"описани*",
				"перевод*",
				"локализац*",
				"истори*",
				"нарратив*",
				"субтитр*",
				"лор",
				"лора",
				"реплик*",
				"названи*",
				"имена",
				"имён",
				"вычитк*",
				"грамматик*"
			],
			"de": [
				"text",
				"texte",
				"texten",
				"textes",
				"textinhalt*",
				"dialog*",
				"geschichte",
				"handlung",
				"beschreibung*",
				"übersetzung*",
				"uebersetzung*",
				"lokalisierung*",
				"untertitel*"
			],
			"fr": [
				"texte*",
				"dialogue*",
				"histoire",
				"scénario*",
				"scenario*",
				"description*",
				"traduction*",
				"localisation*",
				"sous-titre*"
			],
			"es": [
				"texto*",
				"diálogo*",
				"dialogo*",
				"historia",
				"guion*",
				"guión*",
				"descripci*",
				"traducci*",
				"localizaci*",
				"subtítulo*",
				"subtitulo*"
			],
			"pt": [
				"texto*",
				"diálogo*",
				"dialogo*",
				"história",
				"historia",
				"roteiro*",
				"descrição",
				"descrições",
				"tradução",
				"traduções",
				"localização",
				"legenda*"
			],
			"it": [
				"testo",
				"testi",
				"dialog*",
				"storia",
				"trama",
				"descrizion*",
				"traduzion*",
				"localizzazion*",
				"sottotitol*"
			],
			"pl": [
				"tekst",
				"teksty",
				"tekstu",
				"tekstów",
				"tekstem",
				"tekstami",
				"tekście",
				"dialog*",
				"fabuł*",
				"opis*",
				"tłumaczeni*",
				"lokalizacj*",
				"napis*"
			],
			"ja": [
				"テキスト",
				"台詞",
				"セリフ",
				"ストーリー",
				"シナリオ",
				"翻訳",
				"文章",
				"説明文",
				"ローカライズ",
				"字幕"
			],
			"zh": [
				"文本",
				"对话",
				"剧情",
				"故事",
				"翻译",
				"文字",
				"文案",
				"描述",
				"本地化",
				"字幕"
			],
			"ko": [
				"텍스트",
				"대사",
				"스토리",
				"번역",
				"설명",
				"현지화",
				"자막"
			]
		},
		voice: {
			"en": [
				"voice",
				"voices",
				"voiceover*",
				"voice-over*",
				"voice over*",
				"voice acting",
				"voice actor*",
				"voice line*",
				"speech",
				"narration",
				"narrator*",
				"tts",
				"text-to-speech",
				"text to speech",
				"dubbing",
				"spoken"
			],
			"ru": [
				"голос*",
				"озвуч*",
				"речь",
				"речи",
				"дикто*",
				"синтез речи",
				"дубляж*",
				"реплики персонажей"
			],
			"de": [
				"stimme*",
				"sprachausgabe*",
				"sprecher*",
				"vertonung*",
				"synchron*"
			],
			"fr": [
				"voix",
				"doublage*",
				"narration*",
				"synthèse vocale",
				"synthese vocale"
			],
			"es": [
				"voz",
				"voces",
				"doblaje*",
				"narraci*",
				"síntesis de voz",
				"sintesis de voz"
			],
			"pt": [
				"voz",
				"vozes",
				"dublagem",
				"narração",
				"síntese de voz"
			],
			"it": [
				"voce",
				"voci",
				"doppiaggi*",
				"narrazion*",
				"sintesi vocale"
			],
			"pl": [
				"głos*",
				"dubbing*",
				"narracj*",
				"lektor*",
				"synteza mowy"
			],
			"ja": [
				"音声",
				"ボイス",
				"声",
				"ナレーション",
				"読み上げ",
				"吹き替え"
			],
			"zh": [
				"语音",
				"配音",
				"声音",
				"旁白",
				"朗读"
			],
			"ko": [
				"음성",
				"보이스",
				"목소리",
				"나레이션",
				"더빙"
			]
		},
		music: {
			"en": [
				"music",
				"musical",
				"soundtrack*",
				"song",
				"songs",
				"sound effect*",
				"sfx",
				"audio",
				"ambient sound*",
				"ambience",
				"jingle*",
				"ost",
				"bgm",
				"melod*",
				"sound design"
			],
			"ru": [
				"музык*",
				"саундтрек*",
				"песн*",
				"звук*",
				"аудио",
				"мелоди*",
				"композици*",
				"эмбиент*"
			],
			"de": [
				"musik*",
				"soundtrack*",
				"lied*",
				"soundeffekt*",
				"geräusch*",
				"audio",
				"melodie*",
				"klang*"
			],
			"fr": [
				"musique*",
				"bande-son*",
				"bande son*",
				"sons",
				"effets sonores",
				"chanson*",
				"audio",
				"mélodie*",
				"melodie*"
			],
			"es": [
				"música",
				"musica",
				"musical*",
				"banda sonora*",
				"canci*",
				"sonido*",
				"efectos de sonido",
				"audio",
				"melod*"
			],
			"pt": [
				"música",
				"musica",
				"musical*",
				"trilha sonora*",
				"canç*",
				"som",
				"sons",
				"efeitos sonoros",
				"áudio",
				"audio",
				"melod*"
			],
			"it": [
				"music*",
				"colonna sonora*",
				"canzon*",
				"suon*",
				"effetti sonori",
				"audio",
				"melodi*"
			],
			"pl": [
				"muzy*",
				"ścieżk* dźwiękow*",
				"piosen*",
				"dźwięk*",
				"efekt* dźwiękow*",
				"audio",
				"melodi*"
			],
			"ja": [
				"音楽",
				"bgm",
				"効果音",
				"サウンド",
				"楽曲",
				"曲",
				"サウンドトラック"
			],
			"zh": [
				"音乐",
				"音效",
				"配乐",
				"歌曲",
				"音频",
				"原声"
			],
			"ko": [
				"음악",
				"사운드",
				"효과음",
				"노래",
				"오디오",
				"배경음"
			]
		},
		code: {
			"en": [
				"code",
				"coding",
				"codebase",
				"programming",
				"programmer*",
				"shader*",
				"scripting",
				"scripts",
				"source code",
				"copilot",
				"autocomplete",
				"refactor*",
				"debugging",
				"bug fix*",
				"bugfix*"
			],
			"ru": [
				"код",
				"кода",
				"коде",
				"кодом",
				"кодирован*",
				"программирован*",
				"программист*",
				"шейдер*",
				"скрипт*",
				"исходник*",
				"рефакторинг*",
				"отладк*"
			],
			"de": [
				"code",
				"programmierung*",
				"programmier*",
				"shader*",
				"skript*",
				"quellcode*"
			],
			"fr": [
				"code",
				"programmation*",
				"shader*",
				"script*"
			],
			"es": [
				"código",
				"codigo",
				"programación",
				"programacion",
				"shader*",
				"script*"
			],
			"pt": [
				"código",
				"codigo",
				"programação",
				"programacao",
				"shader*",
				"script*"
			],
			"it": [
				"codice",
				"programmazion*",
				"shader*",
				"script*"
			],
			"pl": [
				"kod",
				"kodu",
				"kodzie",
				"programowani*",
				"shader*",
				"skrypt*"
			],
			"ja": [
				"コード",
				"プログラミング",
				"プログラム",
				"シェーダー",
				"スクリプト"
			],
			"zh": [
				"代码",
				"编程",
				"程序",
				"着色器",
				"脚本"
			],
			"ko": [
				"코드",
				"프로그래밍",
				"셰이더",
				"스크립트"
			]
		},
		video: {
			"en": [
				"trailer*",
				"video",
				"videos",
				"cinematic*",
				"cutscene*",
				"cut-scene*",
				"marketing",
				"promotional",
				"promo",
				"store page",
				"screenshot*",
				"teaser*"
			],
			"ru": [
				"трейлер*",
				"видео*",
				"ролик*",
				"кат-сцен*",
				"катсцен*",
				"кинематограф*",
				"маркетинг*",
				"рекламн*",
				"страниц* магазина",
				"скриншот*",
				"тизер*",
				"промо",
				"промоматериал*",
				"промо-материал*",
				"промо-ролик*"
			],
			"de": [
				"trailer*",
				"video*",
				"zwischensequenz*",
				"marketing*",
				"werbe*",
				"shop-seite*",
				"screenshot*",
				"teaser*"
			],
			"fr": [
				"bande-annonce*",
				"bande annonce*",
				"vidéo*",
				"video*",
				"cinématique*",
				"cinematique*",
				"marketing*",
				"promotion*",
				"page du magasin",
				"capture* d'écran",
				"teaser*"
			],
			"es": [
				"tráiler*",
				"trailer*",
				"vídeo*",
				"video*",
				"cinemática*",
				"cinematica*",
				"marketing*",
				"promoci*",
				"página de la tienda",
				"captura* de pantalla",
				"teaser*"
			],
			"pt": [
				"trailer*",
				"vídeo*",
				"video*",
				"cinemática*",
				"cinematica*",
				"marketing*",
				"promoc*",
				"página da loja",
				"captura* de tela",
				"teaser*"
			],
			"it": [
				"trailer*",
				"video*",
				"filmat*",
				"cinematic*",
				"marketing*",
				"promozion*",
				"pagina del negozio",
				"screenshot*",
				"teaser*"
			],
			"pl": [
				"zwiastun*",
				"trailer*",
				"wideo*",
				"film*",
				"przerywnik*",
				"marketing*",
				"promoc*",
				"strona sklepu",
				"zrzut* ekranu",
				"teaser*"
			],
			"ja": [
				"トレーラー",
				"動画",
				"ムービー",
				"カットシーン",
				"マーケティング",
				"プロモーション",
				"ストアページ",
				"スクリーンショット"
			],
			"zh": [
				"预告片",
				"视频",
				"过场动画",
				"宣传",
				"营销",
				"商店页面",
				"截图"
			],
			"ko": [
				"트레일러",
				"비디오",
				"영상",
				"컷신",
				"마케팅",
				"홍보",
				"상점 페이지",
				"스크린샷"
			]
		},
		live: {
			"en": [
				"in real-time",
				"in real time",
				"real-time generat*",
				"realtime generat*",
				"generated in real",
				"generated during",
				"during gameplay",
				"during play",
				"at runtime",
				"live-generated",
				"live generated",
				"generated on the fly",
				"on-the-fly",
				"dynamically generat*",
				"chatbot*",
				"chat bot*",
				"llm",
				"llms",
				"language model*",
				"player input*",
				"player prompt*",
				"players can type",
				"player's input",
				"conversation* with npc*",
				"talk to npc*",
				"ai companion*"
			],
			"ru": [
				"в реальном времени",
				"во время игры",
				"во время геймплея",
				"в рантайме",
				"на лету",
				"чат-бот*",
				"чатбот*",
				"языков* модел*",
				"ввод игрока",
				"запрос* игрока",
				"разговор* с npc",
				"общение с npc",
				"ии-компаньон*"
			],
			"de": [
				"in echtzeit",
				"während des spiels",
				"zur laufzeit",
				"chatbot*",
				"sprachmodell*",
				"spielereingabe*"
			],
			"fr": [
				"en temps réel",
				"en temps reel",
				"pendant le jeu",
				"à la volée",
				"chatbot*",
				"modèle* de langage",
				"modele* de langage"
			],
			"es": [
				"en tiempo real",
				"durante el juego",
				"durante la partida",
				"chatbot*",
				"modelo* de lenguaje",
				"entrada del jugador"
			],
			"pt": [
				"em tempo real",
				"durante o jogo",
				"durante a partida",
				"chatbot*",
				"modelo* de linguagem",
				"entrada do jogador"
			],
			"it": [
				"in tempo reale",
				"durante il gioco",
				"chatbot*",
				"modell* linguistic*",
				"input del giocatore"
			],
			"pl": [
				"w czasie rzeczywistym",
				"podczas gry",
				"w trakcie gry",
				"chatbot*",
				"model* językow*",
				"na podstawie wpisów gracza"
			],
			"ja": [
				"リアルタイム",
				"ゲーム中",
				"プレイ中",
				"チャットボット",
				"言語モデル",
				"プレイヤーの入力"
			],
			"zh": [
				"实时",
				"游戏过程中",
				"游戏中生成",
				"运行时",
				"聊天机器人",
				"语言模型",
				"玩家输入"
			],
			"ko": [
				"실시간",
				"게임 중",
				"플레이 중",
				"챗봇",
				"언어 모델",
				"플레이어 입력"
			]
		}
	};
	var negations_default = {
		$comment: "Negation cues checked in a short window before/after a keyword match, inside the same clause. Latin/Cyrillic entries are matched at word boundaries; CJK entries as substrings.",
		before: [
			"no",
			"not",
			"never",
			"without",
			"none",
			"neither",
			"nor",
			"didn't",
			"did not",
			"doesn't",
			"does not",
			"don't",
			"do not",
			"wasn't",
			"was not",
			"weren't",
			"were not",
			"isn't",
			"is not",
			"aren't",
			"are not",
			"haven't",
			"have not",
			"hasn't",
			"has not",
			"won't",
			"will not",
			"free of",
			"free from",
			"instead of",
			"rather than",
			"except",
			"excluding",
			"zero",
			"не",
			"нет",
			"без",
			"никак",
			"никакой",
			"никаких",
			"ни",
			"кроме",
			"за исключением",
			"вместо",
			"kein",
			"keine",
			"keinen",
			"keiner",
			"nicht",
			"ohne",
			"niemals",
			"nie",
			"außer",
			"ausser",
			"anstatt",
			"statt",
			"pas",
			"aucun",
			"aucune",
			"sans",
			"jamais",
			"ni",
			"sauf",
			"hormis",
			"ningún",
			"ninguna",
			"ningun",
			"sin",
			"nunca",
			"jamás",
			"excepto",
			"salvo",
			"não",
			"nao",
			"nenhum",
			"nenhuma",
			"sem",
			"nunca",
			"jamais",
			"exceto",
			"non",
			"nessun",
			"nessuna",
			"senza",
			"mai",
			"tranne",
			"eccetto",
			"nie",
			"bez",
			"żaden",
			"żadna",
			"żadne",
			"nigdy",
			"oprócz",
			"z wyjątkiem",
			"ない",
			"ません",
			"なし",
			"以外",
			"除く",
			"除き",
			"没有",
			"没",
			"未",
			"无",
			"非",
			"除了",
			"除外",
			"없",
			"않",
			"아닌",
			"제외",
			"不使用",
			"不是",
			"不包含",
			"不含",
			"并未",
			"没有使用",
			"未使用",
			"没用"
		],
		after: [
			"not",
			"no",
			"never",
			"without",
			"isn't",
			"is not",
			"aren't",
			"are not",
			"wasn't",
			"was not",
			"weren't",
			"were not",
			"hasn't",
			"has not",
			"haven't",
			"have not",
			"doesn't",
			"does not",
			"don't",
			"do not",
			"didn't",
			"did not",
			"excluded",
			"are excluded",
			"is excluded",
			"untouched",
			"hand-made",
			"handmade",
			"hand-drawn",
			"handdrawn",
			"hand drawn",
			"hand-painted",
			"hand painted",
			"human-made",
			"made by human*",
			"by human*",
			"by our artist*",
			"by a human",
			"made by hand",
			"created by hand",
			"manually",
			"не",
			"нет",
			"без",
			"вручную",
			"руками",
			"нарисован* вручную",
			"нарисован* художник*",
			"художник*",
			"человек*",
			"nicht",
			"kein",
			"keine",
			"ohne",
			"von hand",
			"handgezeichnet",
			"handgemacht",
			"von menschen",
			"von künstler*",
			"pas",
			"aucun",
			"sans",
			"à la main",
			"a la main",
			"par des humains",
			"par des artistes",
			"fait main",
			"no",
			"sin",
			"a mano",
			"por humanos",
			"por artistas",
			"hecho a mano",
			"hecha a mano",
			"hechos a mano",
			"hechas a mano",
			"não",
			"nao",
			"sem",
			"à mão",
			"a mão",
			"por humanos",
			"por artistas",
			"feito à mão",
			"feita à mão",
			"non",
			"senza",
			"a mano",
			"da umani",
			"da artisti",
			"fatto a mano",
			"nie",
			"bez",
			"ręcznie",
			"przez ludzi",
			"przez artystów",
			"ない",
			"ません",
			"なし",
			"手描き",
			"手作り",
			"人間が",
			"人の手",
			"没有",
			"没",
			"未",
			"无",
			"手绘",
			"手工",
			"人工绘制",
			"人类",
			"없",
			"않",
			"수작업",
			"손으로",
			"사람이",
			"不使用",
			"不是",
			"不包含",
			"不含",
			"并未",
			"没有使用",
			"未使用",
			"没用"
		],
		clauseBreakers: [
			"but",
			"however",
			"though",
			"although",
			"while",
			"whereas",
			"except",
			"only",
			"но",
			"однако",
			"хотя",
			"зато",
			"кроме",
			"только",
			"лишь",
			"а",
			"aber",
			"jedoch",
			"obwohl",
			"sondern",
			"außer",
			"nur",
			"mais",
			"cependant",
			"sauf",
			"seulement",
			"uniquement",
			"pero",
			"sin embargo",
			"aunque",
			"excepto",
			"solo",
			"sólo",
			"únicamente",
			"mas",
			"porém",
			"porem",
			"embora",
			"exceto",
			"apenas",
			"somente",
			"ma",
			"però",
			"pero",
			"tuttavia",
			"tranne",
			"solo",
			"soltanto",
			"ale",
			"jednak",
			"chociaż",
			"oprócz",
			"tylko",
			"jedynie",
			"しかし",
			"ただし",
			"が、",
			"のみ",
			"但是",
			"但",
			"然而",
			"不过",
			"只有",
			"仅",
			"하지만",
			"그러나",
			"다만",
			"만"
		]
	};
	async function http(req) {
		if (typeof GM_xmlhttpRequest === "function") return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: req.method ?? "GET",
				url: req.url,
				headers: req.headers ?? {},
				...req.body !== void 0 ? { data: req.body } : {},
				timeout: req.timeoutMs ?? 15e3,
				onload: (r) => resolve({
					status: r.status,
					text: r.responseText,
					headers: parseHeaders(r.responseHeaders)
				}),
				onerror: () => reject(new Error(`network error: ${req.url}`)),
				ontimeout: () => reject(new Error(`timeout: ${req.url}`))
			});
		});
		const controller = new AbortController();
		const t = setTimeout(() => controller.abort(), req.timeoutMs ?? 15e3);
		try {
			const init = {
				method: req.method ?? "GET",
				headers: req.headers ?? {},
				signal: controller.signal
			};
			if (req.body !== void 0) init.body = req.body;
			const res = await fetch(req.url, init);
			const headers = {};
			res.headers.forEach((v, k) => headers[k.toLowerCase()] = v);
			return {
				status: res.status,
				text: await res.text(),
				headers
			};
		} finally {
			clearTimeout(t);
		}
	}
	function parseHeaders(raw) {
		const out = {};
		for (const line of raw.split(/\r?\n/)) {
			const i = line.indexOf(":");
			if (i > 0) out[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim();
		}
		return out;
	}
	var ApiError = class extends Error {
		status;
		code;
		constructor(status, code, message) {
			super(message);
			this.status = status;
			this.code = code;
			this.name = "ApiError";
		}
	};
	var RETRY_DELAY_MS = 1500;
	var ApiClient = class {
		opts;
		http;
		sleep;
		constructor(opts) {
			this.opts = opts;
			this.http = opts.httpImpl ?? http;
			this.sleep = opts.sleep ?? ((ms) => new Promise((r) => setTimeout(r, ms)));
		}
		baseUrl() {
			return this.opts.baseUrl().replace(/\/+$/, "");
		}
		loginUrl() {
			return `${this.baseUrl()}/auth/steam`;
		}
		submitReport(report) {
			return this.request("POST", "/api/v1/reports", {
				body: report,
				auth: true
			});
		}
		deleteReport(appId) {
			return this.request("DELETE", `/api/v1/reports/${appId}`, {
				auth: true,
				retry: true
			});
		}
		async myReports() {
			return (await this.request("GET", "/api/v1/reports/mine", {
				auth: true,
				retry: true
			})).reports;
		}
		deleteMe() {
			return this.request("DELETE", "/api/v1/me", { auth: true });
		}
		async request(method, path, { body, auth = false, retry = false } = {}) {
			const headers = { Accept: "application/json" };
			if (auth) {
				const token = this.opts.token();
				if (!token) throw new ApiError(401, "no_token", "Not signed in");
				headers.Authorization = `Bearer ${token}`;
			}
			const req = {
				method,
				url: `${this.baseUrl()}${path}`,
				headers,
				timeoutMs: 15e3
			};
			if (body !== void 0) {
				headers["Content-Type"] = "application/json";
				req.body = JSON.stringify(body);
			}
			let res;
			try {
				res = await this.http(req);
				if (res.status >= 500 && retry) {
					await this.sleep(RETRY_DELAY_MS);
					res = await this.http(req);
				}
			} catch (err) {
				if (!retry) throw new ApiError(0, "network", err.message);
				await this.sleep(RETRY_DELAY_MS);
				try {
					res = await this.http(req);
				} catch (err2) {
					throw new ApiError(0, "network", err2.message);
				}
			}
			if (res.status === 204) return void 0;
			let parsed = void 0;
			if (res.text) try {
				parsed = JSON.parse(res.text);
			} catch {
				parsed = void 0;
			}
			if (res.status >= 400) {
				const e = parsed?.error;
				if (res.status === 401 && auth) this.opts.onUnauthorized?.();
				throw new ApiError(res.status, e?.code ?? `http_${res.status}`, e?.message ?? `HTTP ${res.status}`);
			}
			return parsed;
		}
	};
	var Emitter = class {
		listeners = new Map();
		on(event, listener) {
			let set = this.listeners.get(event);
			if (!set) {
				set = new Set();
				this.listeners.set(event, set);
			}
			set.add(listener);
			return () => set?.delete(listener);
		}
		emit(event, payload) {
			const set = this.listeners.get(event);
			if (!set) return;
			for (const listener of set) listener(payload);
		}
	};
	var AUTH_KEY = "auth";
	var STEAM_ID_RE = /^7656119\d{10}$/;
	function base64UrlDecode(s) {
		const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
		const padded = b64 + "=".repeat((4 - b64.length % 4) % 4);
		const bin = atob(padded);
		let out = "";
		for (let i = 0; i < bin.length; i++) out += `%${bin.charCodeAt(i).toString(16).padStart(2, "0")}`;
		return decodeURIComponent(out);
	}
	function decodeToken(token) {
		const parts = token.split(".");
		if (parts.length !== 3 || !parts[1]) return null;
		try {
			const payload = JSON.parse(base64UrlDecode(parts[1]));
			const sub = payload.sub;
			const exp = payload.exp;
			if (typeof sub !== "string" || !STEAM_ID_RE.test(sub)) return null;
			if (typeof exp !== "number" || !Number.isFinite(exp)) return null;
			return {
				steamId: sub,
				expiresAt: exp * 1e3
			};
		} catch {
			return null;
		}
	}
	function isAuthState(v) {
		if (!v || typeof v !== "object") return false;
		const r = v;
		return typeof r.token === "string" && typeof r.steamId === "string" && typeof r.expiresAt === "number";
	}
	var AuthStore = class {
		store;
		known;
		emitter = new Emitter();
		constructor(store) {
			this.store = store;
			this.known = this.read();
			store.watch?.(AUTH_KEY, () => {
				const next = this.read();
				if (next?.token === this.known?.token) return;
				this.known = next;
				this.emitter.emit("change", next);
			});
		}
		read() {
			const raw = this.store.get(AUTH_KEY);
			return isAuthState(raw) ? raw : void 0;
		}
		get(now = Date.now()) {
			const state = this.read();
			if (!state || state.expiresAt <= now) return void 0;
			return state;
		}
		token(now = Date.now()) {
			return this.get(now)?.token;
		}
		set(token, now = Date.now()) {
			const decoded = decodeToken(token.trim());
			if (!decoded || decoded.expiresAt <= now) return null;
			const state = {
				token: token.trim(),
				...decoded
			};
			this.known = state;
			this.store.set(AUTH_KEY, state);
			this.emitter.emit("change", state);
			return state;
		}
		clear() {
			if (!this.read()) return;
			this.known = void 0;
			this.store.remove(AUTH_KEY);
			this.emitter.emit("change", void 0);
		}
		onChange(listener) {
			return this.emitter.on("change", listener);
		}
	};
	var DAY$1 = 864e5;
	var LABEL_TTL_MS = {
		labeled: 30 * DAY$1,
		clean: 7 * DAY$1,
		unknown: 1 * DAY$1
	};
	var PREFIX = "app:";
	var LabelCache = class LabelCache {
		store;
		constructor(store) {
			this.store = store;
		}
		static key(appId) {
			return `${PREFIX}${appId}`;
		}
		get(appId, now = Date.now()) {
			const raw = this.store.get(LabelCache.key(appId));
			if (!isLabelRecord(raw)) return void 0;
			if (now - raw.ts > LABEL_TTL_MS[raw.status]) return void 0;
			return raw;
		}
		set(appId, record) {
			const full = {
				v: 1,
				status: record.status,
				ts: record.ts ?? Date.now()
			};
			if (record.text !== void 0) full.text = record.text;
			this.store.set(LabelCache.key(appId), full);
			return full;
		}
		remove(appId) {
			this.store.remove(LabelCache.key(appId));
		}
		prune(now = Date.now()) {
			let removed = 0;
			for (const key of this.store.keys()) {
				if (!key.startsWith(PREFIX)) continue;
				const raw = this.store.get(key);
				if (!isLabelRecord(raw) || now - raw.ts > LABEL_TTL_MS[raw.status]) {
					this.store.remove(key);
					removed++;
				}
			}
			return removed;
		}
		clear() {
			let removed = 0;
			for (const key of this.store.keys()) if (key.startsWith(PREFIX)) {
				this.store.remove(key);
				removed++;
			}
			return removed;
		}
	};
	function isLabelRecord(value) {
		if (!value || typeof value !== "object") return false;
		const r = value;
		return r.v === 1 && (r.status === "labeled" || r.status === "clean" || r.status === "unknown") && typeof r.ts === "number";
	}
	var USAGE_CATEGORIES = [
		"art",
		"text",
		"voice",
		"music",
		"code",
		"video",
		"live",
		"other"
	];
	function isUsageCategory(value) {
		return typeof value === "string" && USAGE_CATEGORIES.includes(value);
	}
	function parseCommunityListMin(raw) {
		if (!raw || typeof raw !== "object") return null;
		const r = raw;
		if (r.v !== 1 || typeof r.ts !== "number" || !r.apps || typeof r.apps !== "object") return null;
		const apps = {};
		for (const [id, entry] of Object.entries(r.apps)) {
			if (!/^\d+$/.test(id) || !Array.isArray(entry) || entry.length !== 2) return null;
			const [n, u] = entry;
			if (typeof n !== "number" || !Number.isInteger(n) || n < 0 || !u || typeof u !== "object") return null;
			const counts = {};
			for (const [k, v] of Object.entries(u)) {
				if (!isUsageCategory(k) || typeof v !== "number" || !Number.isInteger(v) || v < 0) return null;
				counts[k] = v;
			}
			apps[id] = [n, counts];
		}
		return {
			v: 1,
			ts: r.ts,
			apps
		};
	}
	var WINDOW_BEFORE = 48;
	var WINDOW_AFTER = 48;
	var SNIPPET_RADIUS = 40;
	var CJK_RE = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Thai}]/u;
	var CLAUSE_PUNCT = /[.!?;,:\n()\[\]"«»。！？；，：、「」（）]/;
	function escapeRe(s) {
		return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	function compileKeyword(keyword) {
		const kw = normalizeText(keyword);
		const cjk = CJK_RE.test(kw);
		const parts = kw.split("*");
		const stem = kw.endsWith("*");
		const body = parts.map(escapeRe).join("\\p{L}*");
		if (cjk) return new RegExp(body, "gu");
		return new RegExp(`(?<!\\p{L})${body}${stem ? "" : "(?!\\p{L})"}`, "gu");
	}
	function normalizeText(s) {
		return s.normalize("NFKC").toLowerCase().replace(/[’`´]/g, "'").replace(/\s+/g, " ");
	}
	var Classifier = class {
		compiled = [];
		negBefore;
		negAfter;
		breakers;
		constructor(keywords, negations, custom = {}) {
			for (const category of USAGE_CATEGORIES) {
				const perLang = keywords[category] ?? {};
				for (const [lang, list] of Object.entries(perLang)) {
					if (lang.startsWith("$")) continue;
					for (const keyword of list) this.compiled.push({
						category,
						keyword,
						lang,
						re: compileKeyword(keyword)
					});
				}
				for (const keyword of custom[category] ?? []) {
					if (keyword.trim() === "") continue;
					this.compiled.push({
						category,
						keyword,
						lang: "custom",
						re: compileKeyword(keyword)
					});
				}
			}
			this.negBefore = negations.before.map(compileKeyword);
			this.negAfter = negations.after.map(compileKeyword);
			this.breakers = negations.clauseBreakers.map(compileKeyword);
		}
		classify(rawText) {
			const text = normalizeText(rawText);
			const matches = [];
			for (const k of this.compiled) {
				k.re.lastIndex = 0;
				let m;
				while ((m = k.re.exec(text)) !== null) {
					if (m[0].length === 0) {
						k.re.lastIndex++;
						continue;
					}
					const index = m.index;
					const end = index + m[0].length;
					const negated = this.isNegated(text, index, end);
					matches.push({
						category: k.category,
						keyword: k.keyword,
						lang: k.lang,
						index,
						snippet: snippet(text, index, end),
						negated
					});
				}
			}
			matches.sort((a, b) => a.index - b.index);
			const positive = new Set(matches.filter((m) => !m.negated).map((m) => m.category));
			return {
				categories: USAGE_CATEGORIES.filter((c) => positive.has(c)),
				matches
			};
		}
		isNegated(text, start, end) {
			const before = this.clauseBefore(text.slice(Math.max(0, start - WINDOW_BEFORE), start));
			if (this.negBefore.some((re) => test(re, before))) return true;
			const after = this.clauseAfter(text.slice(end, end + WINDOW_AFTER));
			return this.negAfter.some((re) => test(re, after));
		}
		clauseBefore(window) {
			let cut = -1;
			for (let i = window.length - 1; i >= 0; i--) if (CLAUSE_PUNCT.test(window[i] ?? "")) {
				cut = i + 1;
				break;
			}
			let w = cut >= 0 ? window.slice(cut) : window;
			for (const re of this.breakers) {
				const idx = lastIndex(re, w);
				if (idx >= 0) w = w.slice(idx + 1);
			}
			return w;
		}
		clauseAfter(window) {
			const m = CLAUSE_PUNCT.exec(window);
			let w = m ? window.slice(0, m.index) : window;
			for (const re of this.breakers) {
				re.lastIndex = 0;
				const b = re.exec(w);
				if (b) w = w.slice(0, b.index);
			}
			return w;
		}
	};
	function test(re, s) {
		re.lastIndex = 0;
		return re.test(s);
	}
	function lastIndex(re, s) {
		re.lastIndex = 0;
		let last = -1;
		let m;
		while ((m = re.exec(s)) !== null) {
			last = m.index + m[0].length - 1;
			if (m[0].length === 0) re.lastIndex++;
		}
		return last;
	}
	function snippet(text, start, end) {
		const from = Math.max(0, start - SNIPPET_RADIUS);
		const to = Math.min(text.length, end + SNIPPET_RADIUS);
		return (from > 0 ? "…" : "") + text.slice(from, to) + (to < text.length ? "…" : "");
	}
	var KEY = "community-list";
	var META_KEY = "community-list-meta";
	var COMMUNITY_REFRESH_MS = 36e5;
	var CommunityList = class {
		store;
		map = new Map();
		meta;
		generatedAt = 0;
		constructor(store) {
			this.store = store;
			const parsed = parseCommunityListMin(store.get(KEY));
			if (parsed) this.load(parsed);
			const meta = store.get(META_KEY);
			if (meta && typeof meta.fetchedAt === "number") this.meta = meta;
		}
		get size() {
			return this.map.size;
		}
		get(appId) {
			return this.map.get(appId);
		}
		load(list) {
			this.map = new Map();
			this.generatedAt = list.ts * 1e3;
			for (const [id, [n, u]] of Object.entries(list.apps)) this.map.set(Number.parseInt(id, 10), {
				n,
				u
			});
		}
		needsRefresh(url, now = Date.now()) {
			if (!url) return false;
			if (!this.meta || this.meta.url !== url) return true;
			return now - this.meta.fetchedAt > COMMUNITY_REFRESH_MS;
		}
		async refresh(url, force = false) {
			if (!url) return false;
			if (!force && !this.needsRefresh(url)) return false;
			try {
				const headers = {};
				if (this.meta?.etag && this.meta.url === url) headers["If-None-Match"] = this.meta.etag;
				const res = await http({
					url,
					headers,
					timeoutMs: 2e4
				});
				if (res.status === 304) {
					this.saveMeta({
						...this.meta,
						fetchedAt: Date.now()
					});
					return false;
				}
				if (res.status !== 200) return false;
				const parsed = parseCommunityListMin(JSON.parse(res.text));
				if (!parsed) return false;
				this.load(parsed);
				this.store.set(KEY, parsed);
				const meta = {
					fetchedAt: Date.now(),
					url
				};
				const etag = res.headers["etag"];
				if (etag) meta.etag = etag;
				this.saveMeta(meta);
				return true;
			} catch {
				return false;
			}
		}
		saveMeta(meta) {
			this.meta = meta;
			this.store.set(META_KEY, meta);
		}
	};
	var TITLE_SET = new Set(Object.values({
		schinese: "AI 生成内容披露",
		tchinese: "AI 生成內容聲明",
		japanese: "AI生成コンテンツの開示",
		koreana: "AI 생성 콘텐츠 사용 공개",
		thai: "การเปิดเผยข้อมูลเกี่ยวกับเนื้อหาที่สร้างด้วย AI",
		indonesian: "Pernyataan Konten Buatan AI",
		malay: "Pendedahan Kandungan Dihasilkan AI",
		bulgarian: "Оповестяване за съдържание, генерирано от ИИ",
		czech: "Informace o obsahu vytvářeném AI",
		danish: "Meddelelse om AI-genereret indhold",
		german: "Offenlegung von KI-generierten Inhalten",
		english: "AI Generated Content Disclosure",
		spanish: "Información sobre contenido generado por IA",
		latam: "Información sobre contenido generado por IA",
		greek: "Γνωστοποίηση περιεχομένου που δημιουργήθηκε από τεχνητή νοημοσύνη (AI)",
		french: "Notification de contenu généré par IA",
		italian: "Divulgazione dei contenuti generati dall'IA",
		hungarian: "Nyilatkozat MI generálta tartalomról",
		dutch: "Informatie over door AI gegenereerde inhoud",
		norwegian: "Opplysning om AI-generert innhold",
		polish: "Oświadczenie w sprawie treści generowanych przez SI",
		portuguese: "Divulgação de conteúdo gerado por IA",
		brazilian: "Divulgação de conteúdo gerado por IA",
		romanian: "Informații despre conținutul generat de IA",
		russian: "Информация об ИИ-контенте",
		finnish: "Tiedote tekoälysisällöstä",
		swedish: "Upplysning om AI-genererat innehåll",
		turkish: "Yapay Zekâ İçeriği Açıklaması",
		vietnamese: "Công bố về nội dung tạo bởi AI",
		ukrainian: "Розкриття інформації щодо вмісту, згенерованого ШІ"
	}).map(normalizeTitle));
	function normalizeTitle(s) {
		return s.replace(/\s+/g, " ").trim().toLowerCase();
	}
	function isDisclosureTitle(title) {
		return TITLE_SET.has(normalizeTitle(title));
	}
	function collapseWhitespace(s) {
		return s.replace(/\s+/g, " ").trim();
	}
	function parseDisclosureFromDocument(doc) {
		const blocks = doc.querySelectorAll("#game_area_content_descriptors");
		for (const block of blocks) {
			const h2 = block.querySelector("h2");
			if (!h2 || !isDisclosureTitle(h2.textContent ?? "")) continue;
			const italic = block.querySelector("i");
			let text;
			if (italic) text = collapseWhitespace(italic.textContent ?? "");
			else {
				const parts = [];
				let skipIntro = true;
				for (const child of block.children) {
					if (child === h2) continue;
					if (skipIntro && child.tagName === "P") {
						skipIntro = false;
						continue;
					}
					parts.push(child.textContent ?? "");
				}
				text = collapseWhitespace(parts.join(" "));
			}
			return {
				title: collapseWhitespace(h2.textContent ?? ""),
				text
			};
		}
		return null;
	}
	var BLOCK_RE = /<div[^>]*id="game_area_content_descriptors"[^>]*>([\s\S]*?)<\/div>/g;
	var H2_RE = /<h2[^>]*>([\s\S]*?)<\/h2>/;
	var ITALIC_RE = /<i[^>]*>([\s\S]*?)<\/i>/;
	function parseDisclosureFromHtml(html) {
		BLOCK_RE.lastIndex = 0;
		let m;
		while ((m = BLOCK_RE.exec(html)) !== null) {
			const inner = m[1] ?? "";
			const h2 = H2_RE.exec(inner);
			if (!h2) continue;
			const title = collapseWhitespace(decodeEntities(stripTags(h2[1] ?? "")));
			if (!isDisclosureTitle(title)) continue;
			const italic = ITALIC_RE.exec(inner);
			let body;
			if (italic) body = italic[1] ?? "";
			else body = inner.replace(H2_RE, "").replace(/<p[^>]*>[\s\S]*?<\/p>/, "");
			return {
				title,
				text: collapseWhitespace(decodeEntities(stripTags(body)))
			};
		}
		return null;
	}
	function stripTags(html) {
		return html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " ");
	}
	var NAMED_ENTITIES = {
		amp: "&",
		lt: "<",
		gt: ">",
		quot: "\"",
		apos: "'",
		nbsp: " ",
		hellip: "…",
		mdash: "—",
		ndash: "–",
		laquo: "«",
		raquo: "»"
	};
	function decodeEntities(s) {
		return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, body) => {
			if (body.startsWith("#x") || body.startsWith("#X")) {
				const code = Number.parseInt(body.slice(2), 16);
				return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
			}
			if (body.startsWith("#")) {
				const code = Number.parseInt(body.slice(1), 10);
				return Number.isFinite(code) ? String.fromCodePoint(code) : whole;
			}
			return NAMED_ENTITIES[body.toLowerCase()] ?? whole;
		});
	}
	function isAgeCheckUrl(url) {
		return /\/agecheck\//.test(url);
	}
	function looksLikeAgeGate(html) {
		return /id="agegate_box"|class="agegate_text_area"|agecheck_form/.test(html);
	}
	function appIdFromPath(pathname) {
		const m = /^\/app\/(\d+)/.exec(pathname);
		return m && m[1] ? Number.parseInt(m[1], 10) : null;
	}
	var defaultSleep = (ms) => new Promise((r) => setTimeout(r, ms));
	var RateLimitedError = class extends Error {
		status;
		constructor(status) {
			super(`rate limited (${status})`);
			this.status = status;
			this.name = "RateLimitedError";
		}
	};
	var FetchQueue = class {
		opts;
		pending = [];
		inFlight = new Map();
		active = 0;
		lastStart = 0;
		pausedUntil = 0;
		backoff;
		constructor(options = {}) {
			this.opts = {
				concurrency: options.concurrency ?? 2,
				spacingMs: options.spacingMs ?? 300,
				backoffMs: options.backoffMs ?? 3e4,
				maxBackoffMs: options.maxBackoffMs ?? 6e5,
				now: options.now ?? (() => Date.now()),
				sleep: options.sleep ?? defaultSleep
			};
			this.backoff = this.opts.backoffMs;
		}
		get size() {
			return this.pending.length + this.active;
		}
		setConcurrency(n) {
			this.opts.concurrency = Math.max(1, Math.min(4, n));
			this.pump();
		}
		enqueue(key, run, priority = 0) {
			const existing = this.inFlight.get(key);
			if (existing) {
				this.bump(key, priority);
				return existing;
			}
			const promise = new Promise((resolve, reject) => {
				this.pending.push({
					key,
					priority,
					run,
					resolve,
					reject
				});
			});
			this.inFlight.set(key, promise);
			promise.finally(() => this.inFlight.delete(key)).catch(() => void 0);
			this.pump();
			return promise;
		}
		bump(key, priority) {
			const task = this.pending.find((t) => t.key === key);
			if (task && task.priority < priority) task.priority = priority;
		}
		pumping = false;
		async pump() {
			if (this.pumping) return;
			this.pumping = true;
			try {
				while (this.pending.length > 0 && this.active < this.opts.concurrency) {
					const now = this.opts.now();
					const wait = Math.max(this.pausedUntil - now, this.lastStart + this.opts.spacingMs - now);
					if (wait > 0) await this.opts.sleep(wait);
					if (this.active >= this.opts.concurrency) break;
					this.pending.sort((a, b) => b.priority - a.priority);
					const task = this.pending.shift();
					if (!task) break;
					this.lastStart = this.opts.now();
					this.active++;
					this.execute(task);
				}
			} finally {
				this.pumping = false;
			}
		}
		async execute(task) {
			try {
				const result = await task.run();
				this.backoff = this.opts.backoffMs;
				task.resolve(result);
			} catch (err) {
				if (err instanceof RateLimitedError) {
					this.pausedUntil = this.opts.now() + this.backoff;
					this.backoff = Math.min(this.backoff * 2, this.opts.maxBackoffMs);
				}
				task.reject(err);
			} finally {
				this.active--;
				this.pump();
			}
		}
	};
	var storePageUrl = (appId) => `https://store.steampowered.com/app/${appId}/?l=english`;
	async function defaultFetchPage(appId) {
		const res = await fetch(storePageUrl(appId), {
			credentials: "same-origin",
			redirect: "follow"
		});
		return {
			status: res.status,
			url: res.url,
			text: res.status === 200 ? await res.text() : ""
		};
	}
	function labelFromPage(page) {
		if (page.status === 429 || page.status === 403) throw new RateLimitedError(page.status);
		if (page.status !== 200) return { status: "unknown" };
		if (isAgeCheckUrl(page.url) || looksLikeAgeGate(page.text)) return { status: "unknown" };
		const d = parseDisclosureFromHtml(page.text);
		return d ? {
			status: "labeled",
			text: d.text
		} : { status: "clean" };
	}
	var LabelService = class {
		opts;
		emitter = new Emitter();
		fetchPage;
		crawlEnabled;
		constructor(opts) {
			this.opts = opts;
			this.fetchPage = opts.fetchPage ?? defaultFetchPage;
			this.crawlEnabled = opts.crawlEnabled ?? (() => true);
		}
		peek(appId) {
			return this.opts.cache.get(appId);
		}
		remember(appId, record) {
			const full = this.opts.cache.set(appId, record);
			this.emitter.emit("label", {
				appId,
				record: full
			});
			return full;
		}
		async resolve(appId, priority = 0) {
			const cached = this.opts.cache.get(appId);
			if (cached && cached.status !== "unknown") return cached;
			if (!this.crawlEnabled()) return cached;
			try {
				return await this.opts.queue.enqueue(`app:${appId}`, async () => {
					const record = labelFromPage(await this.fetchPage(appId));
					return this.remember(appId, record);
				}, priority);
			} catch (err) {
				if (!(err instanceof RateLimitedError)) return this.remember(appId, { status: "unknown" });
				return;
			}
		}
		onLabel(listener) {
			return this.emitter.on("label", listener);
		}
	};
	var MY_REPORTS_KEY = "my-reports";
	var MyReports = class {
		store;
		auth;
		constructor(store, auth) {
			this.store = store;
			this.auth = auth;
		}
		load() {
			const raw = this.store.get(MY_REPORTS_KEY);
			if (!raw || raw.v !== 1 || typeof raw.steamId !== "string" || !raw.apps) return void 0;
			return {
				v: 1,
				steamId: raw.steamId,
				fetchedAt: typeof raw.fetchedAt === "number" ? raw.fetchedAt : 0,
				apps: raw.apps
			};
		}
		current() {
			const session = this.auth.get();
			if (!session) return void 0;
			const data = this.load();
			return data?.steamId === session.steamId ? data : void 0;
		}
		get(appId) {
			return this.current()?.apps[String(appId)];
		}
		needsRefresh(now = Date.now()) {
			const cur = this.current();
			return this.auth.get(now) !== void 0 && (!cur || now - cur.fetchedAt > 864e5);
		}
		set(appId, entry) {
			const session = this.auth.get();
			if (!session) return;
			const cur = this.current() ?? {
				v: 1,
				steamId: session.steamId,
				fetchedAt: 0,
				apps: {}
			};
			cur.apps[String(appId)] = entry;
			this.save(cur);
		}
		remove(appId) {
			const cur = this.current();
			if (!cur) return;
			delete cur.apps[String(appId)];
			this.save(cur);
		}
		clear() {
			this.store.remove(MY_REPORTS_KEY);
		}
		async refresh(api, force = false) {
			const session = this.auth.get();
			if (!session || !force && !this.needsRefresh()) return false;
			try {
				const reports = await api.myReports();
				const apps = {};
				for (const r of reports) apps[String(r.appId)] = {
					usages: r.usages.filter(isUsageCategory),
					updatedAt: r.updatedAt
				};
				this.save({
					v: 1,
					steamId: session.steamId,
					fetchedAt: Date.now(),
					apps
				});
				return true;
			} catch {
				return false;
			}
		}
		save(data) {
			this.store.set(MY_REPORTS_KEY, data);
		}
	};
	var SETTINGS_KEY = "settings";
	var DEFAULT_API_URL = "https://steam-ai-hide.apanasik.com";
	var DEFAULT_LIST_URL = `https://raw.githubusercontent.com/Suvitruf/steam-hide-ai/master/community-list.min.json`;
	var DEFAULT_SETTINGS = {
		v: 1,
		labelFilter: "categories",
		categories: ["art"],
		community: {
			enabled: false,
			categories: "any",
			minReporters: 20
		},
		hideStyle: "stub",
		appPage: "banner",
		crawl: {
			enabled: true,
			concurrency: 2
		},
		overrides: {
			alwaysHide: [],
			neverHide: []
		},
		customKeywords: {},
		listUrl: "",
		apiUrl: DEFAULT_API_URL,
		uiLanguage: "auto"
	};
	function uniqueInts(value) {
		if (!Array.isArray(value)) return [];
		const out = new Set();
		for (const v of value) {
			const n = typeof v === "string" ? Number.parseInt(v, 10) : v;
			if (Number.isInteger(n) && n > 0) out.add(n);
		}
		return [...out];
	}
	function categoryList(value, fallback) {
		if (!Array.isArray(value)) return fallback;
		return value.filter(isUsageCategory);
	}
	function oneOf(value, allowed, fallback) {
		return typeof value === "string" && allowed.includes(value) ? value : fallback;
	}
	function normalizeSettings(raw) {
		const r = raw && typeof raw === "object" ? raw : {};
		const community = r.community && typeof r.community === "object" ? r.community : {};
		const crawl = r.crawl && typeof r.crawl === "object" ? r.crawl : {};
		const overrides = r.overrides && typeof r.overrides === "object" ? r.overrides : {};
		const customKeywords = {};
		if (r.customKeywords && typeof r.customKeywords === "object") {
			for (const [k, v] of Object.entries(r.customKeywords)) if (isUsageCategory(k) && Array.isArray(v)) customKeywords[k] = v.filter((s) => typeof s === "string" && s.trim() !== "");
		}
		const concurrency = Number(crawl.concurrency);
		const minReporters = Number(community.minReporters);
		const apiUrl = typeof r.apiUrl === "string" ? r.apiUrl.trim().replace(/\/+$/, "") : "";
		return {
			v: 1,
			labelFilter: oneOf(r.labelFilter, [
				"off",
				"all",
				"categories"
			], DEFAULT_SETTINGS.labelFilter),
			categories: categoryList(r.categories, DEFAULT_SETTINGS.categories),
			community: {
				enabled: community.enabled === true,
				categories: Array.isArray(community.categories) ? categoryList(community.categories, []) : "any",
				minReporters: Number.isInteger(minReporters) && minReporters >= 1 && minReporters <= 1e6 ? minReporters : 20
			},
			hideStyle: oneOf(r.hideStyle, [
				"remove",
				"stub",
				"blur"
			], DEFAULT_SETTINGS.hideStyle),
			appPage: oneOf(r.appPage, [
				"banner",
				"overlay",
				"none"
			], DEFAULT_SETTINGS.appPage),
			crawl: {
				enabled: crawl.enabled !== false,
				concurrency: Number.isInteger(concurrency) && concurrency >= 1 && concurrency <= 4 ? concurrency : 2
			},
			overrides: {
				alwaysHide: uniqueInts(overrides.alwaysHide),
				neverHide: uniqueInts(overrides.neverHide)
			},
			customKeywords,
			listUrl: typeof r.listUrl === "string" && /^https?:\/\//.test(r.listUrl.trim()) ? r.listUrl.trim() : "",
			apiUrl: /^https?:\/\/[^/\s]+$/.test(apiUrl) ? apiUrl : DEFAULT_API_URL,
			uiLanguage: oneOf(r.uiLanguage, [
				"auto",
				"ru",
				"en"
			], "auto")
		};
	}
	function communityListUrl(s) {
		return s.listUrl || "https://raw.githubusercontent.com/Suvitruf/steam-hide-ai/master/community-list.min.json";
	}
	var SettingsStore = class {
		store;
		current;
		emitter = new Emitter();
		constructor(store) {
			this.store = store;
			this.current = normalizeSettings(store.get(SETTINGS_KEY));
		}
		get() {
			return this.current;
		}
		replace(next) {
			this.current = normalizeSettings(next);
			this.store.set(SETTINGS_KEY, this.current);
			this.emitter.emit("change", this.current);
			return this.current;
		}
		update(patch) {
			return this.replace({
				...this.current,
				...patch
			});
		}
		onChange(listener) {
			return this.emitter.on("change", listener);
		}
	};
	var MemoryStore = class {
		kind = "memory";
		map = new Map();
		watchers = new Map();
		get(key) {
			return this.map.get(key);
		}
		set(key, value) {
			this.map.set(key, value);
			this.notify(key);
		}
		remove(key) {
			this.map.delete(key);
			this.notify(key);
		}
		keys() {
			return [...this.map.keys()];
		}
		watch(key, listener) {
			let set = this.watchers.get(key);
			if (!set) this.watchers.set(key, set = new Set());
			set.add(listener);
		}
		notify(key) {
			for (const l of this.watchers.get(key) ?? []) l();
		}
	};
	var LocalStorageStore = class {
		prefix;
		kind = "localStorage";
		constructor(prefix = "shai:") {
			this.prefix = prefix;
		}
		get(key) {
			const raw = localStorage.getItem(this.prefix + key);
			if (raw === null) return void 0;
			try {
				return JSON.parse(raw);
			} catch {
				return;
			}
		}
		set(key, value) {
			localStorage.setItem(this.prefix + key, JSON.stringify(value));
		}
		remove(key) {
			localStorage.removeItem(this.prefix + key);
		}
		keys() {
			const out = [];
			for (let i = 0; i < localStorage.length; i++) {
				const k = localStorage.key(i);
				if (k && k.startsWith(this.prefix)) out.push(k.slice(this.prefix.length));
			}
			return out;
		}
	};
	var GMStore = class {
		kind = "gm";
		get(key) {
			return GM_getValue(key, void 0);
		}
		set(key, value) {
			GM_setValue(key, value);
		}
		remove(key) {
			GM_deleteValue(key);
		}
		keys() {
			return GM_listValues();
		}
		watch(key, listener) {
			if (typeof GM_addValueChangeListener !== "function") return;
			GM_addValueChangeListener(key, (_name, _old, _new, remote) => {
				if (remote) listener();
			});
		}
	};
	function createDefaultStore() {
		if (typeof GM_getValue === "function" && typeof GM_setValue === "function") return new GMStore();
		try {
			if (typeof localStorage !== "undefined") return new LocalStorageStore();
		} catch {}
		return new MemoryStore();
	}
	var DICTS = {
		en: {
			"menu.settings": "Steam Hide AI: settings",
			"header.button": "AI filter",
			"hidden.title": "Hidden: AI content",
			"hidden.show": "Show",
			"hidden.checking": "checking AI disclosure…",
			"reason.override": "manual rule",
			"reason.labelAll": "official AI disclosure",
			"reason.labelCategory": "AI used for: {categories}",
			"reason.community": "community: {n} reports ({categories})",
			"reason.communityAny": "community: {n} reports",
			"category.art": "art",
			"category.text": "text",
			"category.voice": "voice",
			"category.music": "music",
			"category.code": "code",
			"category.video": "video",
			"category.live": "live generation",
			"category.other": "other",
			"banner.title": "This game uses AI-generated content",
			"banner.reasons": "Why it was flagged: {reasons}",
			"banner.disclosure": "Developer's disclosure:",
			"banner.noText": "(no text provided)",
			"banner.neverHide": "Never hide this game",
			"banner.alwaysHide": "Always hide this game",
			"overlay.open": "Open anyway",
			"overlay.back": "Go back",
			"settings.title": "Steam Hide AI — settings",
			"settings.labelFilter": "Games with the official Steam AI disclosure",
			"settings.labelFilter.off": "Do not hide",
			"settings.labelFilter.all": "Hide all of them",
			"settings.labelFilter.categories": "Hide only when AI was used for:",
			"settings.community": "Hide games reported by the community",
			"settings.community.any": "any kind of AI use",
			"settings.community.categories": "only these kinds:",
			"settings.hideStyle": "How to hide on listings",
			"settings.hideStyle.remove": "Remove completely",
			"settings.hideStyle.stub": "Replace with a small placeholder (recommended)",
			"settings.hideStyle.blur": "Blur with a badge",
			"settings.appPage": "On the game page",
			"settings.appPage.banner": "Show a banner",
			"settings.appPage.overlay": "Show a full-page warning",
			"settings.appPage.none": "Do nothing",
			"settings.crawl": "Check games on listings in the background (fetches store pages, cached for days)",
			"settings.crawl.concurrency": "Parallel requests",
			"settings.overrides.alwaysHide": "Always hide these app IDs (comma or newline separated)",
			"settings.overrides.neverHide": "Never hide these app IDs",
			"settings.customKeywords": "Extra keywords (one per line, trailing * = prefix)",
			"settings.listUrl": "Community list URL (empty = from the public dist repository)",
			"settings.apiUrl": "Report API URL",
			"settings.uiLanguage": "Interface language",
			"settings.uiLanguage.auto": "Same as Steam",
			"settings.save": "Save",
			"settings.cancel": "Cancel",
			"settings.clearCache": "Clear label cache",
			"settings.clearCache.done": "Removed {n} cached labels",
			"settings.export": "Export settings",
			"settings.import": "Import settings",
			"settings.import.failed": "Import failed: not valid JSON",
			"settings.account": "Steam account",
			"settings.account.loggedIn": "Signed in as {steamId} (session valid until {until})",
			"settings.account.loggedOut": "Not signed in. Sign in with Steam to report games.",
			"settings.account.login": "Sign in with Steam",
			"settings.account.logout": "Sign out",
			"settings.account.paste": "Paste token manually",
			"settings.account.paste.prompt": "Paste the token shown on the sign-in page:",
			"settings.account.paste.invalid": "That does not look like a valid, unexpired token",
			"settings.account.paste.done": "Signed in as {steamId}",
			"settings.account.deleteData": "Delete my data on the server",
			"settings.account.deleteData.confirm": "Delete all your reports and your account on the report server? This cannot be undone.",
			"settings.account.deleteData.done": "Your data has been deleted and you are signed out.",
			"settings.account.deleteData.failed": "Could not delete: {message}",
			"settings.community.minReporters": "Hide a game once at least this many people reported it (per category when filtered):",
			"report.title": "Community reports",
			"report.stats.none": "not in the community list yet",
			"report.stats.count": "{n} people reported it ({breakdown})",
			"report.stats.listed": "Community list generated {date}; updated about hourly",
			"report.stats.countNoBreakdown": "{n} people reported it",
			"report.button": "Report AI-generated content",
			"report.login": "Sign in with Steam to report AI-generated content",
			"report.mine": "You reported: {categories}",
			"report.edit": "Edit",
			"report.withdraw": "Withdraw",
			"report.modal.title": "Report AI-generated content",
			"report.modal.categories": "What was AI used for?",
			"report.modal.comment": "Comment (optional, up to 500 characters)",
			"report.modal.official": "The page shows the official Steam AI disclosure",
			"report.modal.submit": "Send report",
			"report.modal.cancel": "Cancel",
			"report.error.noCategories": "Pick at least one category",
			"report.error.login": "Your session has expired — sign in with Steam again",
			"report.error.quota": "Daily report limit reached; try again tomorrow",
			"report.error.rateLimited": "Too many requests; wait a minute",
			"report.error.generic": "Could not send the report: {message}",
			"report.sent": "Report sent — thank you! It reaches the community list within an hour or so.",
			"report.withdrawn": "Report withdrawn",
			"auth.complete.saved.title": "Signed in",
			"auth.complete.saved": "Signed in as {steamId}. The userscript saved the token; this tab will close by itself.",
			"auth.complete.invalid": "The userscript could not read the token. Copy it and use “Paste token manually” in the script settings.",
			"menu.diagnostics": "Steam Hide AI: diagnostics",
			"diagnostics.title": "Steam Hide AI — diagnostics",
			"diagnostics.hint": "Copy this when reporting a problem. It contains no token.",
			"diagnostics.copy": "Copy",
			"auth.complete.notShared.title": "Signed in, but the token is not shared",
			"auth.complete.notShared": "The userscript could not write to the userscript manager's storage (fallback: {store}), so other tabs will not see the session. Copy the token above and use “Paste token manually” in the script settings on Steam, and report this with the diagnostics from the script menu."
		},
		ru: {
			"menu.settings": "Steam Hide AI: настройки",
			"header.button": "ИИ-фильтр",
			"hidden.title": "Скрыто: ИИ-контент",
			"hidden.show": "Показать",
			"hidden.checking": "проверка метки ИИ…",
			"reason.override": "ручное правило",
			"reason.labelAll": "официальная метка ИИ",
			"reason.labelCategory": "ИИ использован для: {categories}",
			"reason.community": "сообщество: {n} репортов ({categories})",
			"reason.communityAny": "сообщество: {n} репортов",
			"category.art": "арт",
			"category.text": "текст",
			"category.voice": "голос",
			"category.music": "музыка",
			"category.code": "код",
			"category.video": "видео",
			"category.live": "генерация в игре",
			"category.other": "другое",
			"banner.title": "В этой игре используется ИИ-контент",
			"banner.reasons": "Причина: {reasons}",
			"banner.disclosure": "Описание от разработчика:",
			"banner.noText": "(текст не указан)",
			"banner.neverHide": "Никогда не скрывать эту игру",
			"banner.alwaysHide": "Всегда скрывать эту игру",
			"overlay.open": "Открыть всё равно",
			"overlay.back": "Назад",
			"settings.title": "Steam Hide AI — настройки",
			"settings.labelFilter": "Игры с официальной меткой ИИ в Steam",
			"settings.labelFilter.off": "Не скрывать",
			"settings.labelFilter.all": "Скрывать все",
			"settings.labelFilter.categories": "Скрывать, только если ИИ использован для:",
			"settings.community": "Скрывать игры по репортам сообщества",
			"settings.community.any": "любой тип использования ИИ",
			"settings.community.categories": "только эти типы:",
			"settings.hideStyle": "Как скрывать в списках",
			"settings.hideStyle.remove": "Убирать полностью",
			"settings.hideStyle.stub": "Заменять компактной плашкой (рекомендуется)",
			"settings.hideStyle.blur": "Размывать и помечать",
			"settings.appPage": "На странице игры",
			"settings.appPage.banner": "Показывать баннер",
			"settings.appPage.overlay": "Показывать предупреждение на весь экран",
			"settings.appPage.none": "Ничего не делать",
			"settings.crawl": "Проверять игры в списках в фоне (загружает страницы магазина, кэш на несколько дней)",
			"settings.crawl.concurrency": "Параллельных запросов",
			"settings.overrides.alwaysHide": "Всегда скрывать эти app ID (через запятую или с новой строки)",
			"settings.overrides.neverHide": "Никогда не скрывать эти app ID",
			"settings.customKeywords": "Свои ключевые слова (по одному в строке, * в конце = префикс)",
			"settings.listUrl": "Адрес списка сообщества (пусто = из публичного репозитория)",
			"settings.apiUrl": "URL API репортов",
			"settings.uiLanguage": "Язык интерфейса",
			"settings.uiLanguage.auto": "Как в Steam",
			"settings.save": "Сохранить",
			"settings.cancel": "Отмена",
			"settings.clearCache": "Очистить кэш меток",
			"settings.clearCache.done": "Удалено записей: {n}",
			"settings.export": "Экспорт настроек",
			"settings.import": "Импорт настроек",
			"settings.import.failed": "Импорт не удался: это не JSON",
			"settings.account": "Аккаунт Steam",
			"settings.account.loggedIn": "Вы вошли как {steamId} (сессия до {until})",
			"settings.account.loggedOut": "Вы не вошли. Войдите через Steam, чтобы сообщать об играх.",
			"settings.account.login": "Войти через Steam",
			"settings.account.logout": "Выйти",
			"settings.account.paste": "Вставить токен вручную",
			"settings.account.paste.prompt": "Вставьте токен со страницы входа:",
			"settings.account.paste.invalid": "Это не похоже на действующий токен",
			"settings.account.paste.done": "Вы вошли как {steamId}",
			"settings.account.deleteData": "Удалить мои данные на сервере",
			"settings.account.deleteData.confirm": "Удалить все ваши репорты и аккаунт на сервере репортов? Отменить это нельзя.",
			"settings.account.deleteData.done": "Данные удалены, вы вышли из аккаунта.",
			"settings.account.deleteData.failed": "Не удалось удалить: {message}",
			"settings.community.minReporters": "Скрывать игру, когда о ней сообщили не менее стольких человек (по категории, если включён фильтр):",
			"report.title": "Репорты сообщества",
			"report.stats.none": "в списке сообщества пока нет",
			"report.stats.count": "сообщили {n} чел. ({breakdown})",
			"report.stats.listed": "Список сообщества собран {date}; обновляется примерно раз в час",
			"report.stats.countNoBreakdown": "сообщили {n} чел.",
			"report.button": "Сообщить об ИИ-контенте",
			"report.login": "Войдите через Steam, чтобы сообщить об ИИ-контенте",
			"report.mine": "Вы сообщили: {categories}",
			"report.edit": "Изменить",
			"report.withdraw": "Отозвать",
			"report.modal.title": "Сообщить об ИИ-контенте",
			"report.modal.categories": "Для чего использован ИИ?",
			"report.modal.comment": "Комментарий (необязательно, до 500 символов)",
			"report.modal.official": "На странице есть официальная метка Steam об ИИ",
			"report.modal.submit": "Отправить",
			"report.modal.cancel": "Отмена",
			"report.error.noCategories": "Выберите хотя бы одну категорию",
			"report.error.login": "Сессия истекла, войдите через Steam заново",
			"report.error.quota": "Дневной лимит репортов исчерпан, попробуйте завтра",
			"report.error.rateLimited": "Слишком много запросов, подождите минуту",
			"report.error.generic": "Не удалось отправить репорт: {message}",
			"report.sent": "Репорт отправлен, спасибо! В список сообщества он попадёт в течение часа.",
			"report.withdrawn": "Репорт отозван",
			"auth.complete.saved.title": "Вход выполнен",
			"auth.complete.saved": "Вы вошли как {steamId}. Скрипт сохранил токен, вкладка закроется сама.",
			"auth.complete.invalid": "Скрипт не смог прочитать токен. Скопируйте его и используйте «Вставить токен вручную» в настройках скрипта.",
			"menu.diagnostics": "Steam Hide AI: диагностика",
			"diagnostics.title": "Steam Hide AI — диагностика",
			"diagnostics.hint": "Скопируйте это при сообщении о проблеме. Токена здесь нет.",
			"diagnostics.copy": "Скопировать",
			"auth.complete.notShared.title": "Вход выполнен, но токен не общий",
			"auth.complete.notShared": "Скрипт не смог записать в хранилище менеджера userscript (запасной вариант: {store}), поэтому другие вкладки сессию не увидят. Скопируйте токен выше и используйте «Вставить токен вручную» в настройках скрипта на Steam, а также пришлите диагностику из меню скрипта."
		}
	};
	function detectLanguage(doc = typeof document === "undefined" ? void 0 : document) {
		return (doc?.documentElement.lang?.toLowerCase() ?? "").startsWith("ru") ? "ru" : "en";
	}
	function createTranslator(pref, doc) {
		const dict = DICTS[pref === "auto" ? detectLanguage(doc) : pref];
		return (key, vars) => {
			let s = dict[key] ?? DICTS.en[key] ?? key;
			if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
			return s;
		};
	}
	function decide(input) {
		const { appId, settings, label, classification, community } = input;
		if (settings.overrides.neverHide.includes(appId)) return {
			hide: false,
			reasons: [],
			pendingLabel: false
		};
		if (settings.overrides.alwaysHide.includes(appId)) return {
			hide: true,
			reasons: [{ kind: "override" }],
			pendingLabel: false
		};
		const reasons = [];
		let pendingLabel = false;
		if (settings.labelFilter !== "off") {
			if (!label || label.status === "unknown") pendingLabel = true;
			else if (label.status === "labeled") {
				if (settings.labelFilter === "all") reasons.push({ kind: "label-all" });
				else if (classification) {
					const hit = classification.categories.filter((c) => settings.categories.includes(c));
					if (hit.length > 0) reasons.push({
						kind: "label-category",
						categories: hit
					});
				}
			}
		}
		if (settings.community.enabled && community) {
			const { minReporters, categories: wanted } = settings.community;
			if (wanted === "any") {
				if (community.n >= minReporters) {
					const present = Object.keys(community.u).filter((c) => (community.u[c] ?? 0) > 0);
					reasons.push({
						kind: "community",
						n: community.n,
						categories: present
					});
				}
			} else {
				const hit = wanted.filter((c) => (community.u[c] ?? 0) >= minReporters);
				if (hit.length > 0) reasons.push({
					kind: "community",
					n: community.n,
					categories: hit
				});
			}
		}
		return {
			hide: reasons.length > 0,
			reasons,
			pendingLabel
		};
	}
	function h(tag, attrs = {}, children = []) {
		const el = document.createElement(tag);
		for (const [k, v] of Object.entries(attrs)) if (typeof v === "function") el.addEventListener(k.replace(/^on/, "").toLowerCase(), v);
		else if (typeof v === "boolean") {
			if (v) el.setAttribute(k, "");
		} else if (k === "class") el.className = v;
		else el.setAttribute(k, v);
		for (const c of children) {
			if (c === null || c === void 0) continue;
			el.append(typeof c === "string" ? document.createTextNode(c) : c);
		}
		return el;
	}
	function onReady(fn) {
		if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
		else fn();
	}
	function categoryNames(t, categories) {
		return categories.map((c) => t(`category.${c}`)).join(", ");
	}
	function describeReason(t, r) {
		switch (r.kind) {
			case "override": return t("reason.override");
			case "label-all": return t("reason.labelAll");
			case "label-category": return t("reason.labelCategory", { categories: categoryNames(t, r.categories) });
			case "community": return r.categories.length > 0 ? t("reason.community", {
				n: r.n,
				categories: categoryNames(t, r.categories)
			}) : t("reason.communityAny", { n: r.n });
		}
	}
	function describeReasons(t, reasons) {
		return reasons.map((r) => describeReason(t, r)).join("; ");
	}
	var BANNER_ID = "shai-banner";
	var OVERLAY_ID = "shai-overlay";
	function removeAppPageUi() {
		document.getElementById(BANNER_ID)?.remove();
		document.getElementById(OVERLAY_ID)?.remove();
	}
	function renderBanner(ctx, appId, decision, disclosure) {
		const { t } = ctx;
		document.getElementById(BANNER_ID)?.remove();
		const banner = h("div", {
			id: BANNER_ID,
			class: "shai-banner"
		}, [
			h("div", { class: "shai-banner__title" }, [t("banner.title")]),
			h("div", {}, [t("banner.reasons", { reasons: describeReasons(t, decision.reasons) })]),
			disclosure ? h("div", { class: "shai-banner__text" }, [`${t("banner.disclosure")} ${disclosure.text || t("banner.noText")}`]) : null,
			h("div", { class: "shai-banner__actions" }, [h("a", { onclick: () => toggleOverride(ctx, appId, "neverHide") }, [t("banner.neverHide")])])
		]);
		const anchor = document.querySelector("#game_area_purchase") ?? document.querySelector(".game_description_snippet") ?? document.querySelector("#game_highlights") ?? document.body;
		if (anchor === document.body) document.body.prepend(banner);
		else anchor.before(banner);
	}
	function renderOverlay(ctx, appId, decision, disclosure) {
		const { t } = ctx;
		document.getElementById(OVERLAY_ID)?.remove();
		const overlay = h("div", {
			id: OVERLAY_ID,
			class: "shai-overlay"
		}, [h("div", { class: "shai-overlay__box" }, [
			h("h2", {}, [t("banner.title")]),
			h("div", {}, [t("banner.reasons", { reasons: describeReasons(t, decision.reasons) })]),
			disclosure ? h("p", { class: "shai-banner__text" }, [`${t("banner.disclosure")} ${disclosure.text || t("banner.noText")}`]) : null,
			h("div", { class: "shai-overlay__actions" }, [
				h("button", {
					class: "shai-btn shai-btn--primary",
					onclick: () => overlay.remove()
				}, [t("overlay.open")]),
				h("button", {
					class: "shai-btn shai-btn--secondary",
					onclick: () => history.back()
				}, [t("overlay.back")]),
				h("button", {
					class: "shai-btn shai-btn--secondary",
					onclick: () => toggleOverride(ctx, appId, "neverHide")
				}, [t("banner.neverHide")])
			])
		])]);
		document.body.append(overlay);
	}
	function toggleOverride(ctx, appId, list) {
		const s = ctx.settings.get();
		const other = list === "neverHide" ? "alwaysHide" : "neverHide";
		ctx.settings.update({ overrides: {
			...s.overrides,
			[list]: [...new Set([...s.overrides[list], appId])],
			[other]: s.overrides[other].filter((id) => id !== appId)
		} });
	}
	function openLogin(ctx) {
		const url = ctx.api.loginUrl();
		if (typeof GM_openInTab === "function") GM_openInTab(url, {
			active: true,
			insert: true
		});
		else window.open(url, "_blank", "noopener");
	}
	var REPORT_PANEL_ID = "shai-report";
	var MODAL_ID$2 = "shai-report-modal";
	function statsText(ctx, entry) {
		const { t } = ctx;
		if (!entry || entry.n === 0) return t("report.stats.none");
		const breakdown = Object.keys(entry.u).filter((c) => (entry.u[c] ?? 0) > 0).sort((a, b) => (entry.u[b] ?? 0) - (entry.u[a] ?? 0)).map((c) => `${t(`category.${c}`)} ${entry.u[c]}`).join(", ");
		return breakdown ? t("report.stats.count", {
			n: entry.n,
			breakdown
		}) : t("report.stats.countNoBreakdown", { n: entry.n });
	}
	function renderReportPanel(ctx, input) {
		const { t } = ctx;
		document.getElementById(REPORT_PANEL_ID)?.remove();
		const generatedAt = ctx.community.generatedAt;
		const stats = h("span", {
			class: "shai-report__stats",
			...generatedAt ? { title: t("report.stats.listed", { date: new Date(generatedAt).toLocaleString() }) } : {}
		}, [statsText(ctx, ctx.community.get(input.appId))]);
		const body = h("div", { class: "shai-report__body" });
		const status = h("div", { class: "shai-report__status" });
		const panel = h("div", {
			id: REPORT_PANEL_ID,
			class: "shai-report"
		}, [
			h("div", { class: "shai-report__head" }, [
				h("span", { class: "shai-report__title" }, [t("report.title")]),
				" · ",
				stats
			]),
			body,
			status
		]);
		const renderBody = () => {
			body.replaceChildren();
			if (!ctx.auth.get()) {
				body.append(h("button", {
					type: "button",
					class: "shai-btn shai-btn--secondary",
					onclick: () => openLogin(ctx)
				}, [t("report.login")]));
				return;
			}
			const mine = ctx.myReports.get(input.appId);
			if (mine) body.append(h("span", { class: "shai-report__mine" }, [t("report.mine", { categories: categoryNames(t, mine.usages) })]), h("button", {
				type: "button",
				class: "shai-btn shai-btn--secondary",
				onclick: () => openModal()
			}, [t("report.edit")]), h("button", {
				type: "button",
				class: "shai-btn shai-btn--secondary",
				onclick: () => void withdraw()
			}, [t("report.withdraw")]));
			else body.append(h("button", {
				type: "button",
				class: "shai-btn shai-btn--primary",
				onclick: () => openModal()
			}, [t("report.button")]));
		};
		const openModal = () => openReportModal(ctx, input, () => {
			status.textContent = t("report.sent");
			renderBody();
		});
		const withdraw = async () => {
			status.textContent = "";
			try {
				await ctx.api.deleteReport(input.appId);
				ctx.myReports.remove(input.appId);
				status.textContent = t("report.withdrawn");
				renderBody();
			} catch (err) {
				if (err instanceof ApiError && err.status === 404) {
					ctx.myReports.remove(input.appId);
					renderBody();
				} else status.textContent = describeError(ctx, err);
			}
		};
		renderBody();
		if (ctx.myReports.needsRefresh()) ctx.myReports.refresh(ctx.api).then(renderBody);
		const banner = document.getElementById("shai-banner");
		const anchor = banner ?? document.querySelector("#game_area_purchase") ?? document.querySelector(".game_description_snippet") ?? document.querySelector("#game_highlights");
		if (banner) banner.after(panel);
		else if (anchor) anchor.before(panel);
		else document.body.prepend(panel);
		return panel;
	}
	function describeError(ctx, err) {
		const { t } = ctx;
		if (err instanceof ApiError) {
			if (err.status === 401) return t("report.error.login");
			if (err.code === "quota_exceeded") return t("report.error.quota");
			if (err.status === 429) return t("report.error.rateLimited");
			return t("report.error.generic", { message: err.message });
		}
		return t("report.error.generic", { message: err instanceof Error ? err.message : String(err) });
	}
	function openReportModal(ctx, input, onSent) {
		if (document.getElementById(MODAL_ID$2)) return;
		const { t } = ctx;
		const existing = ctx.myReports.get(input.appId);
		const preselected = new Set(existing?.usages ?? input.classification?.categories ?? []);
		const catName = (c) => t(`category.${c}`);
		const status = h("div", { class: "shai-modal__status" });
		const form = h("form", {
			class: "shai-modal shai-modal--report",
			onsubmit: (ev) => ev.preventDefault()
		});
		const comment = h("textarea", {
			name: "comment",
			maxlength: "500",
			rows: "3"
		});
		const official = h("input", {
			type: "checkbox",
			name: "official",
			...input.disclosure ? { checked: true } : {}
		});
		const submitBtn = h("button", {
			type: "button",
			class: "shai-btn shai-btn--primary"
		}, [t("report.modal.submit")]);
		form.append(h("h2", {}, [t("report.modal.title")]), h("fieldset", {}, [h("legend", {}, [t("report.modal.categories")]), h("div", { class: "shai-inline" }, USAGE_CATEGORIES.map((c) => h("label", {}, [h("input", {
			type: "checkbox",
			name: "usages",
			value: c,
			...preselected.has(c) ? { checked: true } : {}
		}), ` ${catName(c)}`])))]), h("label", {}, [t("report.modal.comment"), comment]), h("label", {}, [official, ` ${t("report.modal.official")}`]), h("div", { class: "shai-modal__actions" }, [submitBtn, h("button", {
			type: "button",
			class: "shai-btn shai-btn--secondary",
			onclick: () => close()
		}, [t("report.modal.cancel")])]), status);
		submitBtn.addEventListener("click", () => void submit());
		async function submit() {
			const usages = new FormData(form).getAll("usages").map(String).filter(isCategory);
			if (usages.length === 0) {
				status.textContent = t("report.error.noCategories");
				return;
			}
			const text = comment.value.trim();
			submitBtn.setAttribute("disabled", "");
			status.textContent = "";
			try {
				await ctx.api.submitReport({
					appId: input.appId,
					usages,
					...text ? { comment: text } : {},
					hasOfficialDisclosure: official.checked,
					clientVersion: ctx.version
				});
				ctx.myReports.set(input.appId, {
					usages,
					updatedAt: new Date().toISOString()
				});
				close();
				onSent();
			} catch (err) {
				status.textContent = describeError(ctx, err);
				submitBtn.removeAttribute("disabled");
			}
		}
		const backdrop = h("div", {
			id: MODAL_ID$2,
			class: "shai-modal-backdrop",
			onclick: (ev) => {
				if (ev.target === backdrop) close();
			}
		}, [form]);
		const onKey = (ev) => {
			if (ev.key === "Escape") close();
		};
		document.addEventListener("keydown", onKey);
		function close() {
			backdrop.remove();
			document.removeEventListener("keydown", onKey);
		}
		document.body.append(backdrop);
	}
	function isCategory(v) {
		return USAGE_CATEGORIES.includes(v);
	}
	function initAppPage(ctx, appId) {
		const disclosure = parseDisclosureFromDocument(document);
		if (disclosure) ctx.labels.remember(appId, {
			status: "labeled",
			text: disclosure.text
		});
		else ctx.labels.remember(appId, { status: "clean" });
		const render = () => {
			const settings = ctx.settings.get();
			removeAppPageUi();
			const label = ctx.labels.peek(appId);
			const classification = disclosure ? ctx.classifier().classify(disclosure.text) : void 0;
			if (settings.appPage !== "none") {
				const decision = decide({
					appId,
					settings,
					label,
					classification,
					community: ctx.community.get(appId)
				});
				if (decision.hide) {
					if (settings.appPage === "overlay") renderOverlay(ctx, appId, decision, disclosure);
					else renderBanner(ctx, appId, decision, disclosure);
				}
			}
			renderReportPanel(ctx, {
				appId,
				disclosure,
				classification
			});
		};
		render();
		ctx.settings.onChange(render);
		ctx.auth.onChange(render);
	}
	function collectDiagnostics(ctx) {
		const gm = typeof GM_info !== "undefined" ? GM_info : void 0;
		const session = ctx.auth.get();
		const rawAuth = ctx.store.get(AUTH_KEY);
		return {
			scriptVersion: ctx.version,
			manager: gm ? `${gm.scriptHandler} ${gm.version ?? ""}`.trim() : "unknown (no GM_info)",
			page: `${location.hostname}${location.pathname}`,
			store: ctx.store.kind ?? "unknown",
			gmApi: {
				GM_getValue: typeof GM_getValue,
				GM_setValue: typeof GM_setValue,
				GM_xmlhttpRequest: typeof GM_xmlhttpRequest,
				GM_openInTab: typeof GM_openInTab,
				GM_addValueChangeListener: typeof GM_addValueChangeListener
			},
			storedKeys: ctx.store.keys().sort(),
			authRecord: rawAuth ? {
				steamId: rawAuth.steamId,
				expiresAt: new Date(rawAuth.expiresAt ?? 0).toISOString()
			} : null,
			session: session ? { steamId: session.steamId } : null,
			apiUrl: ctx.settings.get().apiUrl,
			language: ctx.settings.get().uiLanguage
		};
	}
	function formatDiagnostics(ctx) {
		return JSON.stringify(collectDiagnostics(ctx), null, 2);
	}
	function initAuthCompletePage(ctx) {
		const token = new URLSearchParams(location.hash.slice(1)).get("token");
		if (!token) return;
		const session = ctx.auth.set(token);
		const readback = ctx.store.get(AUTH_KEY);
		const persisted = session !== null && readback?.token === session.token && ctx.store.kind === "gm";
		if (persisted) history.replaceState(null, "", location.pathname);
		console.info("[steam-hide-ai] auth-complete", {
			persisted,
			...collectDiagnostics(ctx)
		});
		onReady(() => {
			const title = document.getElementById("title");
			const note = document.createElement("p");
			note.id = "shai-auth-note";
			if (session && persisted) {
				ctx.myReports.refresh(ctx.api, true);
				if (title) title.textContent = ctx.t("auth.complete.saved.title");
				note.textContent = ctx.t("auth.complete.saved", { steamId: session.steamId });
				for (const id of [
					"ok",
					"manual",
					"token",
					"error"
				]) document.getElementById(id)?.classList.add("hidden");
				setTimeout(() => window.close(), 2e3);
			} else if (session) {
				if (title) title.textContent = ctx.t("auth.complete.notShared.title");
				note.textContent = ctx.t("auth.complete.notShared", { store: ctx.store.kind ?? "?" });
				const area = document.getElementById("token");
				if (area) area.value = token;
				for (const id of ["ok", "error"]) document.getElementById(id)?.classList.add("hidden");
				for (const id of ["manual", "token"]) document.getElementById(id)?.classList.remove("hidden");
			} else note.textContent = ctx.t("auth.complete.invalid");
			(title?.parentElement ?? document.body).append(note);
		});
	}
	var MARK = "data-shai-seen";
	var APP_SELECTOR = "[data-ds-appid], a[href*=\"/app/\"]";
	var HREF_APP_RE = /\/app\/(\d+)/;
	function extractAppIds(el) {
		const ds = el.getAttribute("data-ds-appid");
		const ids = new Set();
		if (ds) for (const part of ds.split(",")) {
			const n = Number.parseInt(part.trim(), 10);
			if (Number.isInteger(n) && n > 0) ids.add(n);
		}
		if (ids.size === 0 && el instanceof HTMLAnchorElement) {
			const m = HREF_APP_RE.exec(el.getAttribute("href") ?? "");
			if (m && m[1]) ids.add(Number.parseInt(m[1], 10));
		}
		return [...ids];
	}
	function findCards(root, cardSelector) {
		const selector = cardSelector ?? APP_SELECTOR;
		const out = [];
		for (const el of root.querySelectorAll(selector)) {
			if (el.hasAttribute(MARK)) continue;
			if (!cardSelector && el.parentElement?.closest(APP_SELECTOR)) continue;
			const appIds = extractAppIds(el);
			if (appIds.length === 0 && cardSelector) {
				const inner = el.querySelector(APP_SELECTOR);
				if (inner) appIds.push(...extractAppIds(inner));
			}
			if (appIds.length === 0) continue;
			el.setAttribute(MARK, "1");
			out.push({
				el,
				appIds
			});
		}
		return out;
	}
	var Scanner = class {
		opts;
		cards = new Map();
		io;
		mo = null;
		timer = null;
		constructor(opts) {
			this.opts = opts;
			this.io = typeof IntersectionObserver === "function" ? new IntersectionObserver((entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const card = this.cards.get(entry.target);
					if (!card) continue;
					this.io?.unobserve(entry.target);
					this.opts.onVisible(card);
				}
			}, { rootMargin: opts.rootMargin ?? "300px" }) : null;
		}
		start() {
			this.scan();
			if (typeof MutationObserver === "function") {
				this.mo = new MutationObserver(() => this.schedule());
				this.mo.observe(this.opts.root ?? document.body, {
					childList: true,
					subtree: true
				});
			}
		}
		stop() {
			this.mo?.disconnect();
			this.io?.disconnect();
			if (this.timer) clearTimeout(this.timer);
		}
		all() {
			return [...this.cards.values()];
		}
		scan() {
			const root = this.opts.root ?? document;
			for (const card of findCards(root, this.opts.cardSelector)) {
				this.cards.set(card.el, card);
				this.opts.onCard?.(card);
				if (this.io) this.io.observe(card.el);
				else this.opts.onVisible(card);
			}
		}
		schedule() {
			if (this.timer) return;
			this.timer = setTimeout(() => {
				this.timer = null;
				this.scan();
			}, this.opts.debounceMs ?? 50);
		}
	};
	var STUB_ATTR = "data-shai-stub";
	var REVEALED = "data-shai-revealed";
	function applyDecision(card, decision, style, t) {
		const el = card.el;
		if (el.hasAttribute(REVEALED)) return;
		clearDecision(card);
		if (!decision.hide) return;
		const reason = describeReasons(t, decision.reasons);
		el.setAttribute("data-shai-reason", reason);
		switch (style) {
			case "remove":
				el.classList.add("shai-hidden");
				return;
			case "blur":
				el.classList.add("shai-blur");
				el.append(h("div", {
					class: "shai-badge",
					title: reason
				}, [`${t("hidden.title")} · ${reason}`]));
				return;
			case "stub": {
				el.classList.add("shai-hidden");
				const stub = h("div", {
					[STUB_ATTR]: "1",
					class: "shai-stub",
					title: reason
				}, [
					h("span", { class: "shai-stub__title" }, [t("hidden.title")]),
					h("span", { class: "shai-stub__reason" }, [reason]),
					h("span", {
						class: "shai-stub__show",
						onclick: (ev) => {
							ev.preventDefault();
							ev.stopPropagation();
							reveal(card);
						}
					}, [t("hidden.show")])
				]);
				el.before(stub);
				return;
			}
		}
	}
	function clearDecision(card) {
		const el = card.el;
		el.classList.remove("shai-hidden", "shai-blur");
		el.removeAttribute("data-shai-reason");
		el.querySelectorAll(":scope > .shai-badge").forEach((b) => b.remove());
		const prev = el.previousElementSibling;
		if (prev && prev.hasAttribute(STUB_ATTR)) prev.remove();
	}
	function reveal(card) {
		clearDecision(card);
		card.el.setAttribute(REVEALED, "1");
		card.el.classList.add("shai-revealed");
	}
	function setChecking(card, on, t) {
		if (on) {
			card.el.classList.add("shai-checking");
			card.el.setAttribute("data-shai-checking", t("hidden.checking"));
		} else {
			card.el.classList.remove("shai-checking");
			card.el.removeAttribute("data-shai-checking");
		}
	}
	var LISTING_CONFIGS = [
		{
			test: /^\/search(\/|$)/,
			config: {
				cardSelector: "a.search_result_row",
				root: "#search_results"
			}
		},
		{
			test: /^\/wishlist(\/|$)/,
			config: {}
		},
		{
			test: /.*/,
			config: {}
		}
	];
	function configFor(pathname) {
		return LISTING_CONFIGS.find((c) => c.test.test(pathname))?.config ?? {};
	}
	function initListingPage(ctx, config) {
		const byAppId = new Map();
		const classifications = new Map();
		const classify = (appId, text) => {
			if (text === void 0) return void 0;
			let c = classifications.get(appId);
			if (!c) {
				c = ctx.classifier().classify(text);
				classifications.set(appId, c);
			}
			return c;
		};
		const evaluate = (card) => {
			const settings = ctx.settings.get();
			let merged = {
				hide: false,
				reasons: [],
				pendingLabel: false
			};
			for (const appId of card.appIds) {
				const label = ctx.labels.peek(appId);
				const d = decide({
					appId,
					settings,
					label,
					classification: label?.status === "labeled" ? classify(appId, label.text) : void 0,
					community: ctx.community.get(appId)
				});
				if (d.hide && !merged.hide) merged = { ...d };
				else if (d.pendingLabel) merged.pendingLabel = true;
			}
			return merged;
		};
		const apply = (card) => {
			const decision = evaluate(card);
			applyDecision(card, decision, ctx.settings.get().hideStyle, ctx.t);
			return decision;
		};
		const onVisible = (card) => {
			if (!apply(card).pendingLabel || !ctx.settings.get().crawl.enabled) return;
			setChecking(card, true, ctx.t);
			const pending = card.appIds.filter((id) => {
				const l = ctx.labels.peek(id);
				return !l || l.status === "unknown";
			}).map((id) => ctx.labels.resolve(id, 1));
			Promise.allSettled(pending).then(() => {
				setChecking(card, false, ctx.t);
				apply(card);
			});
		};
		const scanner = new Scanner({
			...config.cardSelector ? { cardSelector: config.cardSelector } : {},
			...config.root && document.querySelector(config.root) ? { root: document.querySelector(config.root) } : {},
			onCard: (card) => {
				for (const id of card.appIds) {
					let set = byAppId.get(id);
					if (!set) byAppId.set(id, set = new Set());
					set.add(card);
				}
				apply(card);
			},
			onVisible
		});
		ctx.labels.onLabel(({ appId }) => {
			for (const card of byAppId.get(appId) ?? []) apply(card);
		});
		ctx.settings.onChange(() => {
			classifications.clear();
			for (const card of scanner.all()) apply(card);
		});
		scanner.start();
		return scanner;
	}
	var MODAL_ID$1 = "shai-diagnostics";
	function openDiagnosticsModal(ctx) {
		if (document.getElementById(MODAL_ID$1)) return;
		const text = formatDiagnostics(ctx);
		const area = h("textarea", {
			readonly: true,
			rows: "18"
		}, [text]);
		const close = () => backdrop.remove();
		const backdrop = h("div", {
			id: MODAL_ID$1,
			class: "shai-modal-backdrop",
			onclick: (ev) => {
				if (ev.target === backdrop) close();
			}
		}, [h("div", { class: "shai-modal" }, [
			h("h2", {}, [ctx.t("diagnostics.title")]),
			h("p", {}, [ctx.t("diagnostics.hint")]),
			area,
			h("div", { class: "shai-modal__actions" }, [h("button", {
				type: "button",
				class: "shai-btn shai-btn--primary",
				onclick: () => {
					area.select();
					navigator.clipboard?.writeText(text);
				}
			}, [ctx.t("diagnostics.copy")]), h("button", {
				type: "button",
				class: "shai-btn shai-btn--secondary",
				onclick: close
			}, [ctx.t("settings.cancel")])])
		])]);
		document.body.append(backdrop);
		area.select();
	}
	var MODAL_ID = "shai-settings";
	function openSettingsModal(ctx) {
		if (document.getElementById(MODAL_ID)) return;
		const { t } = ctx;
		const s = ctx.settings.get();
		const form = h("form", {
			class: "shai-modal",
			onsubmit: (ev) => ev.preventDefault()
		});
		const status = h("div", { class: "shai-modal__status" });
		const radio = (name, value, checked, label) => h("label", {}, [h("input", {
			type: "radio",
			name,
			value,
			...checked ? { checked: true } : {}
		}), ` ${label}`]);
		const check = (name, value, checked, label) => h("label", {}, [h("input", {
			type: "checkbox",
			name,
			value,
			...checked ? { checked: true } : {}
		}), ` ${label}`]);
		const catName = (c) => t(`category.${c}`);
		form.append(h("h2", {}, [`${t("settings.title")} · v${ctx.version}`]), accountFieldset(ctx, status, close), h("fieldset", {}, [
			h("legend", {}, [t("settings.labelFilter")]),
			radio("labelFilter", "off", s.labelFilter === "off", t("settings.labelFilter.off")),
			radio("labelFilter", "all", s.labelFilter === "all", t("settings.labelFilter.all")),
			radio("labelFilter", "categories", s.labelFilter === "categories", t("settings.labelFilter.categories")),
			h("div", { class: "shai-inline" }, USAGE_CATEGORIES.map((c) => check("categories", c, s.categories.includes(c), catName(c))))
		]), h("fieldset", {}, [
			h("legend", {}, [t("settings.community")]),
			check("communityEnabled", "1", s.community.enabled, t("settings.community")),
			radio("communityMode", "any", s.community.categories === "any", t("settings.community.any")),
			radio("communityMode", "categories", s.community.categories !== "any", t("settings.community.categories")),
			h("div", { class: "shai-inline" }, USAGE_CATEGORIES.map((c) => check("communityCategories", c, s.community.categories !== "any" && s.community.categories.includes(c), catName(c)))),
			h("label", {}, [`${t("settings.community.minReporters")} `, h("input", {
				type: "number",
				name: "minReporters",
				min: "1",
				value: String(s.community.minReporters)
			})]),
			h("label", {}, [t("settings.listUrl"), h("input", {
				type: "text",
				name: "listUrl",
				value: s.listUrl,
				placeholder: DEFAULT_LIST_URL
			})])
		]), h("fieldset", {}, [
			h("legend", {}, [t("settings.hideStyle")]),
			radio("hideStyle", "stub", s.hideStyle === "stub", t("settings.hideStyle.stub")),
			radio("hideStyle", "remove", s.hideStyle === "remove", t("settings.hideStyle.remove")),
			radio("hideStyle", "blur", s.hideStyle === "blur", t("settings.hideStyle.blur"))
		]), h("fieldset", {}, [
			h("legend", {}, [t("settings.appPage")]),
			radio("appPage", "banner", s.appPage === "banner", t("settings.appPage.banner")),
			radio("appPage", "overlay", s.appPage === "overlay", t("settings.appPage.overlay")),
			radio("appPage", "none", s.appPage === "none", t("settings.appPage.none"))
		]), h("fieldset", {}, [
			h("legend", {}, [t("settings.crawl")]),
			check("crawlEnabled", "1", s.crawl.enabled, t("settings.crawl")),
			h("label", {}, [`${t("settings.crawl.concurrency")} `, h("input", {
				type: "number",
				name: "concurrency",
				min: "1",
				max: "4",
				value: String(s.crawl.concurrency)
			})])
		]), h("fieldset", {}, [
			h("legend", {}, ["Overrides"]),
			h("label", {}, [t("settings.overrides.alwaysHide"), h("textarea", { name: "alwaysHide" }, [s.overrides.alwaysHide.join(", ")])]),
			h("label", {}, [t("settings.overrides.neverHide"), h("textarea", { name: "neverHide" }, [s.overrides.neverHide.join(", ")])])
		]), h("fieldset", {}, [h("legend", {}, [t("settings.customKeywords")]), ...USAGE_CATEGORIES.map((c) => h("label", {}, [catName(c), h("textarea", { name: `kw_${c}` }, [(s.customKeywords[c] ?? []).join("\n")])]))]), h("fieldset", {}, [
			h("legend", {}, ["API"]),
			h("label", {}, [t("settings.apiUrl"), h("input", {
				type: "text",
				name: "apiUrl",
				value: s.apiUrl
			})]),
			h("label", {}, [t("settings.uiLanguage"), h("select", { name: "uiLanguage" }, [
				h("option", {
					value: "auto",
					...s.uiLanguage === "auto" ? { selected: true } : {}
				}, [t("settings.uiLanguage.auto")]),
				h("option", {
					value: "en",
					...s.uiLanguage === "en" ? { selected: true } : {}
				}, ["English"]),
				h("option", {
					value: "ru",
					...s.uiLanguage === "ru" ? { selected: true } : {}
				}, ["Русский"])
			])])
		]), h("div", { class: "shai-modal__actions" }, [
			h("button", {
				class: "shai-btn shai-btn--primary",
				onclick: () => {
					ctx.settings.replace(readForm(form, s));
					close();
				}
			}, [t("settings.save")]),
			h("button", {
				class: "shai-btn shai-btn--secondary",
				onclick: () => close()
			}, [t("settings.cancel")]),
			h("button", {
				class: "shai-btn shai-btn--secondary",
				onclick: () => {
					status.textContent = t("settings.clearCache.done", { n: ctx.cache.clear() });
				}
			}, [t("settings.clearCache")]),
			h("button", {
				class: "shai-btn shai-btn--secondary",
				onclick: () => exportSettings(ctx)
			}, [t("settings.export")]),
			h("button", {
				class: "shai-btn shai-btn--secondary",
				onclick: () => importSettings(ctx, status, close)
			}, [t("settings.import")])
		]), status);
		const backdrop = h("div", {
			id: MODAL_ID,
			class: "shai-modal-backdrop",
			onclick: (ev) => {
				if (ev.target === backdrop) close();
			}
		}, [form]);
		const onKey = (ev) => {
			if (ev.key === "Escape") close();
		};
		document.addEventListener("keydown", onKey);
		function close() {
			backdrop.remove();
			document.removeEventListener("keydown", onKey);
		}
		document.body.append(backdrop);
	}
	function readForm(form, prev) {
		const fd = new FormData(form);
		const list = (name) => fd.getAll(name).map(String);
		const ids = (name) => String(fd.get(name) ?? "").split(/[\s,;]+/).filter(Boolean);
		const customKeywords = {};
		for (const c of USAGE_CATEGORIES) {
			const lines = String(fd.get(`kw_${c}`) ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
			if (lines.length > 0) customKeywords[c] = lines;
		}
		return normalizeSettings({
			...prev,
			labelFilter: fd.get("labelFilter"),
			categories: list("categories"),
			community: {
				enabled: fd.get("communityEnabled") === "1",
				categories: fd.get("communityMode") === "any" ? "any" : list("communityCategories"),
				minReporters: Number(fd.get("minReporters"))
			},
			hideStyle: fd.get("hideStyle"),
			appPage: fd.get("appPage"),
			crawl: {
				enabled: fd.get("crawlEnabled") === "1",
				concurrency: Number(fd.get("concurrency"))
			},
			overrides: {
				alwaysHide: ids("alwaysHide"),
				neverHide: ids("neverHide")
			},
			customKeywords,
			listUrl: String(fd.get("listUrl") ?? "").trim(),
			apiUrl: String(fd.get("apiUrl") ?? "").trim(),
			uiLanguage: fd.get("uiLanguage")
		});
	}
	function exportSettings(ctx) {
		const blob = new Blob([JSON.stringify(ctx.settings.get(), null, 2)], { type: "application/json" });
		const a = h("a", {
			href: URL.createObjectURL(blob),
			download: "steam-hide-ai-settings.json"
		});
		a.click();
		setTimeout(() => URL.revokeObjectURL(a.href), 1e3);
	}
	function importSettings(ctx, status, close) {
		const input = h("input", {
			type: "file",
			accept: "application/json"
		});
		input.addEventListener("change", async () => {
			const file = input.files?.[0];
			if (!file) return;
			try {
				ctx.settings.replace(JSON.parse(await file.text()));
				close();
			} catch {
				status.textContent = ctx.t("settings.import.failed");
			}
		});
		input.click();
	}
	function accountFieldset(ctx, status, close) {
		const { t } = ctx;
		const session = ctx.auth.get();
		const btn = (label, onclick, primary = false) => h("button", {
			type: "button",
			class: `shai-btn ${primary ? "shai-btn--primary" : "shai-btn--secondary"}`,
			onclick
		}, [label]);
		const pasteToken = () => {
			const raw = window.prompt(t("settings.account.paste.prompt"));
			if (!raw) return;
			const state = ctx.auth.set(raw);
			status.textContent = state ? t("settings.account.paste.done", { steamId: state.steamId }) : t("settings.account.paste.invalid");
			if (state) close();
		};
		const deleteData = async () => {
			if (!window.confirm(t("settings.account.deleteData.confirm"))) return;
			try {
				await ctx.api.deleteMe();
				ctx.myReports.clear();
				ctx.auth.clear();
				status.textContent = t("settings.account.deleteData.done");
				close();
			} catch (err) {
				status.textContent = t("settings.account.deleteData.failed", { message: describeError(ctx, err) });
			}
		};
		return h("fieldset", {}, [h("legend", {}, [t("settings.account")]), session ? h("div", {}, [h("p", {}, [t("settings.account.loggedIn", {
			steamId: session.steamId,
			until: new Date(session.expiresAt).toLocaleDateString()
		})]), h("div", { class: "shai-modal__actions" }, [btn(t("settings.account.logout"), () => {
			ctx.auth.clear();
			ctx.myReports.clear();
			close();
		}), btn(t("settings.account.deleteData"), () => void deleteData())])]) : h("div", {}, [h("p", {}, [t("settings.account.loggedOut")]), h("div", { class: "shai-modal__actions" }, [btn(t("settings.account.login"), () => openLogin(ctx), true), btn(t("settings.account.paste"), pasteToken)])])]);
	}
	var VERSION = typeof GM_info !== "undefined" ? GM_info.script.version : "dev";
	var PRUNE_KEY = "lastPrune";
	var DAY = 864e5;
	function buildContext() {
		const store = createDefaultStore();
		const settings = new SettingsStore(store);
		const cache = new LabelCache(store);
		const queue = new FetchQueue({ concurrency: settings.get().crawl.concurrency });
		const labels = new LabelService({
			cache,
			queue,
			crawlEnabled: () => settings.get().crawl.enabled
		});
		const community = new CommunityList(store);
		const auth = new AuthStore(store);
		const api = new ApiClient({
			baseUrl: () => settings.get().apiUrl,
			token: () => auth.token(),
			onUnauthorized: () => auth.clear()
		});
		const myReports = new MyReports(store, auth);
		let classifier = new Classifier(categories_default, negations_default, settings.get().customKeywords);
		let lastKeywords = JSON.stringify(settings.get().customKeywords);
		settings.onChange((s) => {
			queue.setConcurrency(s.crawl.concurrency);
			const kw = JSON.stringify(s.customKeywords);
			if (kw !== lastKeywords) {
				lastKeywords = kw;
				classifier = new Classifier(categories_default, negations_default, s.customKeywords);
			}
		});
		return {
			store,
			settings,
			cache,
			queue,
			labels,
			community,
			auth,
			api,
			myReports,
			classifier: () => classifier,
			t: createTranslator(settings.get().uiLanguage),
			version: VERSION
		};
	}
	function injectHeaderButton(ctx) {
		const actions = document.querySelector("#global_actions");
		if (!actions || document.querySelector(".shai-header-btn")) return;
		actions.prepend(h("a", {
			class: "global_action_link shai-header-btn",
			onclick: () => openSettingsModal(ctx)
		}, [ctx.t("header.button")]));
	}
	function housekeeping(ctx) {
		const last = Number(ctx.store.get(PRUNE_KEY) ?? 0);
		if (Date.now() - last > DAY) {
			ctx.cache.prune();
			ctx.store.set(PRUNE_KEY, Date.now());
		}
		ctx.community.refresh(communityListUrl(ctx.settings.get()));
		ctx.myReports.refresh(ctx.api);
	}
	function hostnameOf(url) {
		try {
			return new URL(url).hostname;
		} catch {
			return "";
		}
	}
	function main() {
		const ctx = buildContext();
		if (typeof GM_registerMenuCommand === "function") GM_registerMenuCommand(ctx.t("menu.diagnostics"), () => openDiagnosticsModal(ctx));
		if (location.hostname === hostnameOf(ctx.settings.get().apiUrl)) {
			if (location.pathname === "/auth/complete") initAuthCompletePage(ctx);
			return;
		}
		if (location.hostname !== "store.steampowered.com") return;
		if (typeof GM_registerMenuCommand === "function") GM_registerMenuCommand(ctx.t("menu.settings"), () => openSettingsModal(ctx));
		const path = location.pathname;
		if (/^\/agecheck\//.test(path)) return;
		onReady(() => {
			injectHeaderButton(ctx);
			housekeeping(ctx);
			const appId = appIdFromPath(path);
			if (appId !== null) initAppPage(ctx, appId);
			else initListingPage(ctx, configFor(path));
		});
	}
	main();
})();
