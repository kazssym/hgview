// service.js
// Copyright (C) 2020 Kaz Nishimura
//
// This program is free software: you can redistribute it and/or modify it
// under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
// for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Service worker script.
 */

"use strict";

const CACHE_NAME = "20201215.1";

const CACHE_CONTENTS = [
    "./",
    "resources/site.css",
    "resources/site-theme-default.css",
    "resources/decorate.js",
    "resources/app.js",
];

self.addEventListener("install", (event) => {
    let cacheFilled = caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(CACHE_CONTENTS);
        });
    event.waitUntil(cacheFilled);
});

self.addEventListener("activate", (event) => {
    let cachesCleaned = caches.keys()
        .then((keys) => {
            keys.forEach((key) => {
                if (key != CACHE_NAME) {
                    caches.delete(key);
                }
            });
        });
    event.waitUntil(cachesCleaned);
});

self.addEventListener("fetch", (event) => {
    if (event.request.method == "GET") {
        let response = caches.open(CACHE_NAME)
            .then(async (cache) => {
                let cached = await cache.match(event.request);
                if (cached != null) {
                    return cached;
                }
                return await fetch(event.request);
            });
        event.respondWith(response);
    }
});
