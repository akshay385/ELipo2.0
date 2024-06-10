sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	
	var oevent;
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
				debugger
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onAfterRendering: async function () {
				debugger


			},
			editFlow: {

				onBeforeDiscard: async function (oEvent) {
					debugger
					let extractedNumber = oEvent.context.sPath
					let funcname = 'postattach';
					let oFunction = oEvent.context.getModel().bindContext(`/${funcname}(...)`);
					console.log();
					oFunction.setParameter('p', extractedNumber);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					var result = oContext.getValue();
				}
			},

			routing: {
				onAfterBinding: async function (mParamaters) {
					debugger
					
					if (mParamaters) {
						 oevent = mParamaters;
						let baseUrl = mParamaters.oModel.getServiceUrl();
						let invoicePdf = baseUrl + mParamaters.sPath.substring(1) + "/content";
						$.ajax({
							url: invoicePdf,
							type: 'GET',
							success: function (res) {
								debugger
								if (!res) {
									let oDialog = new sap.m.Dialog({
										title: "Upload Invoice Pdf.",
										endButton: new sap.m.Button({
											text: "Confirm",
											type: "Emphasized",
											press: function (oEvent) {
												debugger
												
												oDialog.getContent()[0].checkFileReadable().then(async function (oEvent) {
													await oDialog.getContent()[0].upload();
													let funcname = 'extract';
													let oFunction = mParamaters.getModel().bindContext(`/${funcname}(...)`);
													console.log();
													const uuidRegex = /uuid=([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;

let match = oevent.getPath().match(uuidRegex);
													oFunction.setParameter('p',match[1]);
													await oFunction.execute();
													const oContext = oFunction.getBoundContext();
													var result = oContext.getValue();

												}, function (error) {
													debugger
													MessageToast.show("The file cannot be read. It may have changed.");
												})
												oDialog.close();
											}
										})
									})
									oDialog.addContent(new sap.ui.unified.FileUploader({ fileType: ['pdf'], httpRequestMethod: sap.ui.unified.FileUploaderHttpRequestMethod.Put, sendXHR: true, useMultipart: false, uploadUrl: invoicePdf }));
									oDialog.open();
								}
							}


						});
					}
					setTimeout(() => {
						if (sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::StandardAction::Cancel").getVisible()) {
							sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::CustomSubSection::Ttachments--uploadSet").setUploadEnabled(true);
							sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(false);
						} else {
							sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::CustomSubSection::Ttachments--uploadSet").setUploadEnabled(false);
							sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(true);
						}
					}, 700);
				}
			}
		}
	});
});
