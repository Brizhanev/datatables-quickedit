/*! QuickEdit for DataTables 1.0.0
 * 2018 Brizhanev Oleg
 */

/**
 * @summary     QuickEdit for DataTables
 * @description Provides quick edition of the items in a DataTable
 * @version     1.0.0
 * @file        dataTables.quickEdit.js
 * @author      Brizhanev Oleg (mr.brizhanev@yandex.ru)
 * @contact     mr.brizhanev@yandex.ru
 * @copyright   Copyright 2018 Brizhanev Oleg
 *
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net'], function ($) {
            return factory($, window, document);
        });
    }
    else if (typeof exports === 'object') {
        // CommonJS
        module.exports = function (root, $) {
            if (!root) {
                root = window;
            }

            if (!$ || !$.fn.dataTable) {
                $ = require('datatables.net')(root, $).$;
            }

            return factory($, root, root.document);
        };
    }
    else {
        // Browser
        factory(jQuery, window, document);
    }
}(function ($, window, document, undefined) {
    'use strict';

    var DataTable = $.fn.dataTable;

    DataTable.quickEdit = {};

    DataTable.quickEdit.version = '1.0.0';

    DataTable.quickEdit.init = function (dt) {

        var ctx = dt.settings()[0];
        var init = ctx.oInit.quickEdit;
        var defaults = DataTable.defaults.quickEdit;
        var opts = init === undefined ?
            defaults :
            init;

        // Set defaults
        var selector = 'td';
        var callback = function () {
        };
        var editableClass = 'quickEditable';

        ctx._quickEdit = {};

        if ($.isPlainObject(opts)) {
            if (opts.selector !== undefined) {
                selector = opts.selector;
            }
            if (opts.callback !== undefined) {
                callback = opts.callback;
            }
            if (opts.editableClass !== undefined) {
                editableClass = opts.editableClass;
            }
        }

        dt.iterator('table', function (ctx) {

            var that = this;

            ctx._quickEdit.selector = selector;
            ctx._quickEdit.callback = callback;
            ctx._quickEdit.editableClass = editableClass;

            this.on('dblclick', selector, function () {
                $(this).attr('contenteditable', 'true');
                $(this).addClass(editableClass);
                $(this).focus();
            });

            this.on('blur', selector, function () {
                endEdit(this, editableClass, callback, that);
            });

            this.on('keyup', selector, function (event) {
                if (event.which == 13) {
                    endEdit(this, editableClass, callback, that);
                }
            });

        });

    };

    function endEdit(cell, editableClass, callback, table) {

        $(cell).attr('contenteditable', 'false');
        $(cell).removeClass(editableClass);

        var tableCell = table.cell(cell);

        tableCell.data($(cell).text());

        var tableRecord = table.data()[tableCell.index().row];

        callback(tableRecord, table);

    }

    var apiRegister = DataTable.Api.register;

    apiRegister('quickEdit()', function () {
        return this.iterator('table', function (ctx) {
            DataTable.quickEdit.init(new DataTable.Api(ctx));
        });
    });

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Initialisation
     */
    $(document).on('preInit.dt.dtQuickEdit', function (e, ctx) {
        if (e.namespace !== 'dt') {
            return;
        }
        DataTable.quickEdit.init(new DataTable.Api(ctx));
    });

    return DataTable.quickEdit;

}));
