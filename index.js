// index.js
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

"use strict";

let express = require("express");

const DEFAULT_PORT = 3000;

/**
 * Abstract Servlet-like class.
 *
 * @abstract
 */
function Servlet()
{
    let it = function invoke(request, response) {
        it.service(request, response);
        response.end();
    };
    Object.setPrototypeOf(it, Object.getPrototypeOf(this));
    return it;
}

/**
 * Class to send the web application manifest.
 */
class Manifest extends Servlet
{
    constructor()
    {
        super();
        this._manifest = {
            name: "HgDash",
            short_name: "HgDash",
            start_url: "index.html",
        };
        Object.seal(this);
    }

    service(request, response)
    {
        if (request.method == "GET" || request.method == "HEAD") {
            response.setHeader("Content-Type", "application/manifest+json");
            response.send(JSON.stringify(this._manifest));
        }
        else {
            response.statusCode = 405;
        }
    }
}

/**
 * Application class.
 */
class App
{
    constructor()
    {
        this._serverOptions = {
            port: DEFAULT_PORT,
        };
        this._app = null;
    }

    get port()
    {
        return this._serverOptions.port;
    }

    set port(port)
    {
        this._serverOptions.port = port;
    }

    /**
     * Runs a HTTP server.
     */
    async run()
    {
        this._app = express();
        this._app.use("", express.static(`${__dirname}/web`));
        this._app.use("/api/manifest", new Manifest());

        await new Promise(
            (_resolve, reject) => {
                this._app.listen(this._serverOptions,
                    () => {
                        console.log("port: %d", this.port);
                    })
                .on("error",
                    (e) => {
                        reject(e);
                    });
            });
    }
}
module.exports.App = App;
