sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        send: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
