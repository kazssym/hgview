#!/bin/sh
moduledir=`dirname "$0"`
exec ${NODE:-node} "$moduledir"/server.js "$@"
