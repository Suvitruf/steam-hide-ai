# Steam Hide AI

<p align="center"><img src="https://projects.cdn.aapanasik.com/steam-hide-ai/steam-no-ai.png" width="620" alt="Steam Hide AI: a userscript that hides AI-generated games on the Steam store. Full-page warning on a game page with an AI Generated Content Disclosure: why it was flagged, the developer's disclosure, and the Open anyway, Go back and Never hide this game buttons"></p>

A userscript for Tampermonkey / Violentmonkey that hides games with AI-generated content on the Steam store: games that carry Steam's official **AI Generated Content Disclosure**, and optionally games reported by the community.

**[Install the script](https://raw.githubusercontent.com/Suvitruf/steam-hide-ai/master/steam-hide-ai.user.js)** · [Русская версия](README.ru.md)

This repository is updated automatically. Report bugs and ideas in [Issues](https://github.com/Suvitruf/steam-hide-ai/issues).

## What it does

- **Hides labeled games on store listings**: search results, tag and category pages, the front page, the wishlist and other lists. The label exists only on a game's page, so the script fetches store pages in the background (a couple at a time) and caches the result for days.
- **Understands what the AI was used for.** The developer's disclosure text is classified into categories: art, text, voice, music, code, video, live generation, other. By default only games where AI was used for **art** are hidden; you can pick any set of categories or hide every labeled game. The classifier is a multilingual keyword heuristic, so the script always shows _why_ a game was hidden and lets you override it.
- **Three ways to hide**: remove the card, replace it with a small placeholder (default) or blur it with a badge. On the game page itself you get a banner with the disclosure and the reasons, or a full-page warning.
- **Manual rules**: always or never hide specific games; these win over everything else.
- **Community list** (off by default): signed-in Steam users report games whose AI use is not disclosed. The list is rebuilt hourly and you choose how many reporters it takes to hide a game (20 by default).

## How it looks

On a game page the script adds a banner with the reasons and the developer's own disclosure text:

![Banner on the game page: "This game uses AI-generated content", why it was flagged and the developer's disclosure](https://projects.cdn.aapanasik.com/steam-hide-ai/ai_used.png)

On listings a hidden game turns into a small placeholder with the reason and a _Show_ link:

![Hidden games on a store listing replaced with "Hidden: AI content" placeholders](https://projects.cdn.aapanasik.com/steam-hide-ai/ai_used_in_list.png)

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Edge, Firefox, Safari, Opera) or [Violentmonkey](https://violentmonkey.github.io/). Greasemonkey is **not** supported: it lacks the APIs the script needs for shared storage and cross-origin requests.
2. Open the [install link](https://raw.githubusercontent.com/Suvitruf/steam-hide-ai/master/steam-hide-ai.user.js) and confirm in your userscript manager.
3. Open the [Steam store](https://store.steampowered.com/). The red **No AI** icon in the store header (tooltip _AI filter_) and the _Steam Hide AI: settings_ entry in the userscript menu open the settings.

Updates are automatic: the manager polls `steam-hide-ai.meta.js` for a new version.

## Settings

| Setting                                     | Default                        | Notes                                                                                                                             |
| ------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Games with the official Steam AI disclosure | hide when AI was used for: art | Or hide all labeled games, or none.                                                                                               |
| How to hide on listings                     | small placeholder              | Remove / placeholder / blur with a badge. On the wishlist only placeholder and blur are possible.                                 |
| On the game page                            | banner                         | Banner with the disclosure text and reasons, full-page warning, or nothing.                                                       |
| Check games on listings in the background   | on, 2 parallel requests        | Turn off to stop background fetches; only games you open will be checked.                                                         |
| Hide games reported by the community        | off                            | Any kind of AI use or selected categories; the reporter threshold (default 20) applies per category when filtering by categories. |
| Always hide / never hide these app IDs      | empty                          | Manual rules, one app ID per line or comma-separated.                                                                             |
| Extra keywords                              | empty                          | Your own words per category for the classifier; a trailing `*` matches a prefix.                                                  |
| Community list URL                          | empty = this repository        | Point it at your own list if you maintain one.                                                                                    |
| Interface language                          | same as Steam                  | English or Russian.                                                                                                               |

Settings can be exported and imported as JSON; the export never contains your sign-in token.

## Community reports

Steam does not require developers to disclose AI use, and not all of them do. The community list collects reports from real Steam accounts:

1. Open a game's store page. Under the banner (or above the purchase block) there is a **Community reports** panel.
2. Click **Sign in with Steam**. Steam's standard sign-in opens in a new tab; when it finishes, the tab closes by itself and the script keeps a session token. The server learns only your SteamID64, never your password or Steam cookies.
3. Click **Report AI-generated content**, tick what the AI was used for, add an optional comment and send. You can edit or withdraw your report later. One report per game per account; 30 reports per day.

Every hour the reports are aggregated into this repository:

- [`community-list.min.json`](community-list.min.json) is what the script downloads: `{ "v": 1, "ts": <unix seconds>, "apps": { "<appId>": [<reporters>, { "art": 11, "text": 4 }] } }`.
- [`community-list.json`](community-list.json) is the full list for audit: per game the number of distinct reporters, trusted reporters, the per-category breakdown and when it was added.

A game enters the list once 5 distinct accounts reported it and leaves when fewer than 3 remain; your own threshold (20 by default) is applied on top, in the script. The list contains counts only, never who reported. The panel on the game page shows the counts from this list, so it lags the server by up to an hour.

## Privacy

- **Store pages.** To learn the label of games on listings the script fetches their store pages (English version) in the background, two at a time, and caches the result for 30 days (labeled) or 7 days (not labeled). You can turn this off in the settings.
- **Community list.** Downloaded from this repository (GitHub) at most once an hour.
- **Report server**. Nothing is sent there unless you sign in and report. Signing in uses Steam OpenID; the server stores your SteamID64, your reports (game, categories, comment) and a hashed IP address for abuse protection. Once a day the script syncs the list of your own reports. **Delete my data on the server** in the settings removes all of it.
- Published data never contains reporter identities.

## Support the project

If the script saves you time, you can support its development:

- **GitHub Sponsors**: the _Sponsor_ button at the top of this repository or [github.com/sponsors/Suvitruf](https://github.com/sponsors/Suvitruf);
- **Patreon**: [patreon.com/apanasik](https://www.patreon.com/apanasik).

## Feedback

Open an [issue](https://github.com/Suvitruf/steam-hide-ai/issues) for bugs, misclassified games (include the app ID and the disclosure text) and ideas. For bugs, attach the JSON from the _Steam Hide AI: diagnostics_ entry in the userscript menu; it contains no personal data.

## Credits and license

The script is released under the [MIT License](LICENSE). The localized titles of Steam's disclosure block (30 languages) come from [seeeeew/aiwarningforsteam](https://github.com/seeeeew/aiwarningforsteam), also MIT. The "No AI" icon is [No_AI_art.svg](https://commons.wikimedia.org/wiki/File:No_AI_art.svg) from Wikimedia Commons (public domain), recoloured for the dark header. Steam is a trademark of Valve Corporation; this project is not affiliated with Valve.
