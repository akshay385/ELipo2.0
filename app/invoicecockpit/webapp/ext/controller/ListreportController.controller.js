sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('invoicecockpit.ext.controller.ListreportController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf invoicecockpit.ext.controller.ListreportController
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				debugger
				var oModel = this.base.getExtensionAPI().getModel();
				
			},
			routing : {
				onAfterBinding:function (params) {
					debugger
					if(sap.ui.getCore().byId("application-elipo3-display-component---View1--sidnav"))
				sap.ui.getCore().byId("application-elipo3-display-component---View1--sidnav").removeStyleClass('disablenav')
				}
			}
		}
	});
});
