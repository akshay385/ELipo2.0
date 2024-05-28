sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('invoicecockpit.ext.controller.Objectpagecontroller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf invoicecockpit.ext.controller.Objectpagecontroller
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},editFlow:{
				
					onBeforeDiscard:async function (oEvent) {
						debugger
						let extractedNumber=oEvent.context.sPath
						let funcname = 'postattach';
					let oFunction =oEvent.context.getModel().bindContext(`/${funcname}(...)`);
					console.log();
					oFunction.setParameter('p',extractedNumber);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					var result = oContext.getValue();
					}
			},
			
			routing:{
				onAfterBinding:async function(mParamaters){
					debugger
					setTimeout(() => {
						if(sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::StandardAction::Cancel").getVisible()){
						sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::CustomSubSection::Ttachments--uploadSet").setUploadEnabled(true);
						sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(false);
					}else{
						sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::CustomSubSection::Ttachments--uploadSet").setUploadEnabled(false);
						sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(true);	
					}
					}, 700);
				}
			}
		}
	});
});
