sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("invoicecockpit.ext.controller.ListreportController",{override:{onInit:function(){debugger;var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:function(e){debugger;if(sap.ui.getCore().byId("application-elipo3-display-component---View1--sidnav"))sap.ui.getCore().byId("application-elipo3-display-component---View1--sidnav").removeStyleClass("disablenav")}}}})});