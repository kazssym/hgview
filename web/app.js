// app.js
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
 * ES module for application commands.
 *
 * @module app.js
 */

// This file is a module script and shall be in strict mode by default.

/**
 * Initializes application commands.
 *
 * @param {Event} [event] an optional DOM event
 */
export function initialize(/* event */)
{
    console.debug("Commands are being initialized.");
}

navigator.serviceWorker.register("./service.js")
    .then((registration) => {
        console.debug("Registered service worker: %o", registration);
    })
    .catch((reason) => {
        console.log(reason);
    });
