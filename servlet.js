// servlet.js
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
 * Servlet-like API module.
 *
 * @module servlet.js
 */

"use strict";

/**
 * Servlet context.
 *
 * A servlet context object is a function that takes `request` and `response`
 * and may be used as a callback for the `request` event.
 *
 * @param {string} contextRoot path for the context root
 * @class
 */
function ServletContext(contextRoot)
{
    if (contextRoot == null) {
        contextRoot = "";
    }

    let that = function dispatch(request, response) {
    };
    Object.setPrototypeOf(that, Object.getPrototypeOf(this));

    that._contextRoot = contextRoot;
    return that;
}

ServletContext.prototype = function() {};
Object.defineProperties(ServletContext.prototype, {
    contextRoot: {
        get() {
            return this._contextRoot;
        }
    }
})

module.exports.ServletContext = ServletContext;

/**
 * Abstract Servlet-like base class.
 *
 * @abstract
 * @class
 */
function Servlet()
{
    let that = function service(request, response) {
        that.service(request, response);
        response.end();
    }
    Object.setPrototypeOf(that, Object.getPrototypeOf(this));
    return that;
}

Servlet.prototype = function () {};

module.exports.Servlet = Servlet;
