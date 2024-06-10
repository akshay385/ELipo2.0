sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("keyprocessanalytics.controller.keyprocessanalytics", {
        onInit: function () {

        },

        onAfterRendering : async function(oEvent)
        {
            debugger;
            this.getView().byId("t1").addStyleClass("t1")
            this.getView().byId("t2").addStyleClass("t1")
            this.getView().byId("t3").addStyleClass("t1")
            this.getView().byId("t4").addStyleClass("t4")
            this.getView().byId("t5").addStyleClass("t1")
            this.getView().byId("t6").addStyleClass("t1")
            this.getView().byId("barchart").addStyleClass("bar")



        }
    });
});
