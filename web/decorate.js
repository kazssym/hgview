// decorate.js
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

// This file is a module script and in strict mode by default.

const PURE_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/pure/2.0.3/pure-min.css";

const MATERIAL_ICONS_FONT_URL =
    "https://fonts.googleapis.com/icon?family=Material+Icons";

/**
 * Creates a link element.
 *
 * @param {*} [properties]
 */
function newLinkElement(properties)
{
    let element = document.createElement("link");
    if (properties != null) {
        Object.assign(element, properties);
    }
    return element;
}

/**
 * Add stylesheets to the document.
 *
 * @param  {*[]} stylesheets array of properties for the stylesheet links
 */
function addStylesheets(...stylesheets)
{
    let body = document.body;
    for (let i of stylesheets) {
        let properties = Object.assign({rel: "stylesheet"}, i);
        body.appendChild(newLinkElement(properties));
    }
}

function decorate()
{
    let body = document.body;

    body.classList.add("site-vbox");

    // Moving the '#main' element into a new 'div' element.
    let main = document.getElementById("main");
    if (main != null) {
        let div = document.createElement("div");
        div.id = "content-area";
        div.classList.add("site-vbox-grow")
        body.insertBefore(div, body.firstChild);
        div.appendChild(main);
    }

    addStylesheets(
        {
            href: PURE_URL,
            crossOrigin: "anonymous",
        },
        {
            href: MATERIAL_ICONS_FONT_URL,
            crossOrigin: "anonymous",
        },
        {
            href: "site.css",
        });
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", decorate);
}
else {
    decorate();
}
