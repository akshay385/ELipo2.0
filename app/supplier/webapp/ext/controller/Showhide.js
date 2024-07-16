sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        show: function(oEvent) {
            // MessageToast.show("Custom handler invoked.");
            debugger
            this.showSideContent("GeneratedFacet1");
            console.log(this);
        }
    };
});
