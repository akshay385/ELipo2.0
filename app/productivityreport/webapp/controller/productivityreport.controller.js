sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("productivityreport.controller.productivityreport", {
        onInit: function () {

        },
        onAfterRendering : async function(oEvent)
        {
            debugger
           
            this.getView().byId("t1").addStyleClass("t1")
            this.getView().byId("t2").addStyleClass("t1")
            this.getView().byId("idVizFrame").addStyleClass("idVizFrame")
         


        }
    });
});
