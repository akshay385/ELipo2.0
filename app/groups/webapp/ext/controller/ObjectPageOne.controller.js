sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('groups.ext.controller.ObjectPageOne', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf groups.ext.controller.ObjectPageOne
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onAfterRendering:function(){
				debugger
				sap.ui.getCore().byId("groups::groupsObjectPage--fe::table::grptomem::LineItem::Members::StandardAction::Create").setIcon("sap-icon://add-employee");
				sap.ui.getCore().byId("groups::groupsObjectPage--fe::table::grptomem::LineItem::Members::StandardAction::Create").setText(" ");
				sap.ui.getCore().byId("groups::groupsObjectPage--fe::table::grptomem::LineItem::Members::StandardAction::Create").setTooltip("Add Members");
			},
			editFlow :{
				onBeforeSave: function (mParameters) {
					debugger
					// sap.ui.getCore().byId("groups::groupsObjectPage--fe::table::grptomem::LineItem::Members-innerTable").getItems()[0].getCells()[3].setEditable(true)
				},
				onAfterSave: function (mParameters) {
				debugger
				}
			}
		}
	});
});
