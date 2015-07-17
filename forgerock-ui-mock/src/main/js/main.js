/**
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright (c) 2011-2015 ForgeRock AS. All Rights Reserved
 *
 * The contents of this file are subject to the terms
 * of the Common Development and Distribution License
 * (the License). You may not use this file except in
 * compliance with the License.
 *
 * You can obtain a copy of the License at
 * http://forgerock.org/license/CDDLv1.0.html
 * See the License for the specific language governing
 * permission and limitations under the License.
 *
 * When distributing Covered Code, include this CDDL
 * Header Notice in each file and include the License file
 * at http://forgerock.org/license/CDDLv1.0.html
 * If applicable, add the following below the CDDL Header,
 * with the fields enclosed by brackets [] replaced by
 * your own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 */

/*global require, window */

/**
 * @author yaromin
 * @author Eugenia Sergueeva
 */

require.config({
    paths: {
        // sinon only needed (or available) for Mock project
        sinon: "libs/sinon-1.12.2",
        i18next: "libs/i18next-1.7.3-min",
        i18nGrid: "libs/i18n/grid.locale-en",
        backbone: "libs/backbone-1.1.2-min",
        "backbone.paginator": "libs/backbone.paginator.min-2.0.2-min",
        "backbone-relational": "libs/backbone-relational-0.9.0-min",
        "backgrid": "libs/backgrid.min-0.3.5-min",
        "backgrid-filter": "libs/backgrid-filter.min-0.3.5-min",
        "backgrid-paginator": "libs/backgrid-paginator.min-0.3.5-min",
        underscore: "libs/lodash-2.4.1-min",
        js2form: "libs/js2form-2.0",
        form2js: "libs/form2js-2.0",
        spin: "libs/spin-2.0.1-min",
        jquery: "libs/jquery-2.1.1-min",
        xdate: "libs/xdate-0.8-min",
        doTimeout: "libs/jquery.ba-dotimeout-1.0-min",
        handlebars: "libs/handlebars-1.3.0-min",
        moment: "libs/moment-2.8.1-min",
        bootstrap: "libs/bootstrap-3.3.4-custom",
        "bootstrap-dialog": "libs/bootstrap-dialog-1.34.4-min",
        placeholder: "libs/jquery.placeholder-2.0.8",
        UserDelegate: "org/forgerock/mock/ui/user/delegates/UserDelegate",
        ThemeManager: "org/forgerock/mock/ui/common/util/ThemeManager"
    },

    shim: {
        sinon: {
            exports: "sinon"
        },
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["underscore"],
            exports: "Backbone"
        },
        "backbone.paginator": {
            deps: ["backbone"]
        },
        "backgrid": {
            deps: ["jquery", "underscore", "backbone"],
            exports: "Backgrid"
        },
        "backgrid-filter": {
            deps: ["backgrid"]
        },
        "backgrid-paginator": {
            deps: ["backgrid", "backbone.paginator"]
        },
        js2form: {
            exports: "js2form"
        },
        form2js: {
            exports: "form2js"
        },
        spin: {
            exports: "spin"
        },
        bootstrapjs: {
            deps: ["jquery"],
            exports: "bootstrapjs"
        },
        bootstrap: {
            deps: ["jquery"]
        },
        'bootstrap-dialog': {
            deps: ["jquery", "underscore","backbone", "bootstrap"]
        },
        placeholder: {
            deps: ["jquery"]
        },
        i18nGrid: {
            deps: ["jquery"]
        },
        xdate: {
            exports: "xdate"
        },
        doTimeout: {
            deps: ["jquery"],
            exports: "doTimeout"
        },
        handlebars: {
            exports: "handlebars"
        },
        i18next: {
            deps: ["jquery", "handlebars"],
            exports: "i18next"
        },
        moment: {
            exports: "moment"
        }
    }
});

/**
 * Loads all application on start, so each module will be available to
 * required synchronously
 */
require([
    // sinon only needed (or available) for Mock project
    "sinon",
    "jquery",
    "underscore",
    "backbone",
    "form2js",
    "js2form",
    "spin",
    "xdate",
    "moment",
    "doTimeout",
    "handlebars",
    "i18next",
    "placeholder",
    "org/forgerock/mock/ui/common/main/MockServer",
    "org/forgerock/commons/ui/common/main/i18nManager",
    "org/forgerock/commons/ui/common/util/Constants",
    "org/forgerock/commons/ui/common/main/EventManager",
    "org/forgerock/mock/ui/common/main/LocalStorage",
    "org/forgerock/mock/ui/common/main",
    "org/forgerock/mock/ui/user/main",
    "org/forgerock/commons/ui/user/main",
    "org/forgerock/commons/ui/common/main",
    "UserDelegate",
    "ThemeManager",
    "config/main"
], function ( sinon, $, _, Backbone, form2js, js2form, spin, xdate, moment, doTimeout, Handlebars, i18n,
              placeholder, mockServer, i18nManager, constants, eventManager, localStorage) {

    // Helpers for the code that hasn't been properly migrated to require these as explicit dependencies:
    window.$ = $;
    window._ = _;
    window.Backbone = Backbone;

    // Mock project is run without server. Framework requires cookies to be enabled in order to be able to login.
    // Default CookieHelper.cookiesEnabled() implementation will always return false as cookies cannot be set from local
    // file. Hence redefining function to return true
    require('org/forgerock/commons/ui/common/util/CookieHelper').cookiesEnabled = function () {
        return true;
    };

    // Adding stub user
    localStorage.add('mock/repo/internal/user/test', {
        _id: 'test',
        _rev: '1',
        component: 'mock/repo/internal/user',
        roles: ['ui-user'],
        uid: 'test',
        userName: 'test',
        password: 'test',
        telephoneNumber: '12345',
        givenName: 'Jack',
        sn: 'White',
        mail: 'white@test.com'
    });

    eventManager.sendEvent(constants.EVENT_DEPENDECIES_LOADED);
});
