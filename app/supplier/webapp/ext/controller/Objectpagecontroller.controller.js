// sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
// 	'use strict';

// 	return ControllerExtension.extend('supplier.ext.controller.Objectpagecontroller', {
// 		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
// 		override: {
// 			/**
//              * Called when a controller is instantiated and its View controls (if available) are already created.
//              * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
//              * @memberOf supplier.ext.controller.Objectpagecontroller
//              */
// 			onInit: function () {
// 				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
// 				var oModel = this.base.getExtensionAPI().getModel();
// 			},editFlow:{
				
// 				onBeforeDiscard:async function (oEvent) {
// 					debugger
// 					let extractedNumber=oEvent.context.sPath
// 					let funcname = 'postattach';
// 				let oFunction =oEvent.context.getModel().bindContext(`/${funcname}(...)`);
// 				console.log();
// 				oFunction.setParameter('p',extractedNumber);
// 				await oFunction.execute();
// 				const oContext = oFunction.getBoundContext();
// 				var result = oContext.getValue();
// 				}
// 		},
// 			routing:{
// 				onAfterBinding:async function(mParamaters){
// 					debugger
// 					setTimeout(() => {
// 						if(sap.ui.getCore().byId("supplier::supplierObjectPage--fe::FooterBar::StandardAction::Cancel").getVisible()){
// 						sap.ui.getCore().byId("supplier::supplierObjectPage--fe::CustomSubSection::Attachments--uploadSet").setUploadEnabled(true);
// 						sap.ui.getCore().byId("supplier::supplierObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(false);
// 					}else{
// 						sap.ui.getCore().byId("supplier::supplierObjectPage--fe::CustomSubSection::Attachments--uploadSet").setUploadEnabled(false);
// 						sap.ui.getCore().byId("supplier::supplierObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(true);	
// 					}
// 					}, 700);
// 				}
// 			}
// 		}
// 	});
// });
sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var oevent;
	return ControllerExtension.extend('supplier.ext.controller.Objectpagecontroller', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf supplier.ext.controller.Objectpagecontroller
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				debugger
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onAfterRendering: async function (oEvent) {
				debugger
				// var objectPage = this.getView().getContent()[0];
				// var items = oEvent.oSource.mAggregations.sections[2].mAggregations._grid;
				// var test = this.base.getView().mAggregations.content;
			},
			editFlow: {
				onAfterEdit: async function (oEvent) {
					debugger
					var upload1 = this.getView().getContent()[0].getSections()[2];
					var files1 = upload1.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems();

					for (let a = 0; a < files1.length; a++) {
						files1[a].setVisibleRemove(true);
						files1[a].setEnabledRemove(true);
						files1[a].setVisibleEdit(true);
						files1[a].setEnabledEdit(true);
					}
					upload1.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mBindingInfos.items.binding.refresh();
				},
				onAfterDiscard: async function (oEvent) {
					debugger
					var upload = this.getView().getContent()[0].getSections()[2];
					var files = upload.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems();

					for (let a = 0; a < files.length; a++) {
						files[a].setVisibleRemove(false);
						files[a].setEnabledRemove(false);
						files[a].setVisibleEdit(false);
						files[a].setEnabledEdit(false);
					}
					upload.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mBindingInfos.items.binding.refresh();
				},
				onBeforeDiscard: async function (oEvent) {
					debugger
					let extractedNumber = oEvent.context.sPath;
					let funcname = 'postattach';
					let oFunction = oEvent.context.getModel().bindContext(`/${funcname}(...)`);
					console.log();
					oFunction.setParameter('p', extractedNumber);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					var result = oContext.getValue();
				},
				onAfterSave: function (oEvent) {
					debugger
					var uploadset = this.getView().getContent()[0].getSections()[2];
					var items = uploadset.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.getItems();

					for (let i = 0; i < items.length; i++) {
						items[i].setVisibleRemove(false);
						items[i].setEnabledRemove(false);
						items[i].setVisibleEdit(false);
						items[i].setEnabledEdit(false);
					}

					uploadset.mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.mBindingInfos.items.binding.refresh();
				}
			},
			routing: {
				onAfterBinding: async function (mParamaters) {
					debugger
					if (sap.ui.getCore().byId("application-elipo3-display-component---View1--sidnav"))
						sap.ui.getCore().byId("application-elipo3-display-component---View1--sidnav").addStyleClass('disablenav');

					function parseQueryString(url) {
						var params = {};
						var queryString = url.split('#')[1] || url.split('?')[1];

						if (queryString) {
							var queryPart = queryString.split('(')[1];
							if (queryPart) {
								queryPart = queryPart.split(')')[0];
								var pairs = queryPart.split(',');
								for (var i = 0; i < pairs.length; i++) {
									var pair = pairs[i].split('=');
									var key = decodeURIComponent(pair[0].trim());
									var value = decodeURIComponent(pair[1] || '');
									params[key] = value;
								}
							}
						}
						return params;
					}

					var url = window.location.href;
					var queryParams = parseQueryString(url);

					console.log(queryParams);
					var uploadItems = sap.ui.getCore().byId("supplier::supplierObjectPage--fe::CustomSubSection::Attachments-innerGrid").mAggregations.content[0].mAggregations.content.mAggregations.items;
					
					if ('IsActiveEntity' in queryParams) {
						var isActiveEntity = queryParams['IsActiveEntity'];
						if (isActiveEntity === 'true') {
							console.log('IsActiveEntity is true');
							for (let a = 0; a < uploadItems.length; a++) {
								uploadItems[a].setVisibleRemove(false);
								uploadItems[a].setEnabledRemove(false);
								uploadItems[a].setVisibleEdit(false);
								uploadItems[a].setEnabledEdit(false);
							}
						} else if (isActiveEntity === 'false') {
							console.log('IsActiveEntity is false');
							for (let a = 0; a < uploadItems.length; a++) {
								uploadItems[a].setVisibleRemove(true);
								uploadItems[a].setEnabledRemove(true);
								uploadItems[a].setVisibleEdit(true);
								uploadItems[a].setEnabledEdit(true);
							}
						} else {
							console.log('IsActiveEntity has an unexpected value:', isActiveEntity);
						}
					} else {
						console.log('IsActiveEntity parameter is not present in the URL');
					}

					debugger
					if (mParamaters) {
						let extractedhref = mParamaters.sPath;
						const regex1 = /IsActiveEntity\s*=\s*(true|false)/;
						const match1 = extractedhref.match(regex1);
						if (match1[1] == 'true') {
							let funcnamee = 'showFooterInv';
							let oFunctionn = mParamaters.getModel().bindContext(`/${funcnamee}(...)`);


							const uuidRegex = /uuid=([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;
							let matchh = extractedhref.match(uuidRegex);
							await oFunctionn.setParameter('p', matchh[1]);
							await oFunctionn.execute();
							const oContextt = oFunctionn.getBoundContext();
							var resultt = oContextt.getValue();

							this.base.getView().getContent()[0].getFooter().setVisible(!resultt.value);
						}

					}
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

													setTimeout(async () => {
														const base64loader = "";
														let processDialog = new sap.m.BusyDialog({
															title: "Processing Invoice",
															text: "Please wait while your invoice is being processed. This may take a few moments...", customIcon: base64loader, busyIndicatorSize: "Large", customIconRotationSpeed: 0, customIconHeight: "100px", customIconWidth: "100px"
														});
														processDialog.open();//uncomment during dep
														let funcname = 'extractS';
														let oFunction = mParamaters.getModel().bindContext(`/${funcname}(...)`);
														console.log();
														const uuidRegex = /uuid=([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;
														let match = oevent.getPath().match(uuidRegex);
														oFunction.setParameter('p', match[1]);
														debugger
														await oFunction.execute();
														await mParamaters.requestRefresh();
														processDialog.close();
														debugger
														const oContext = oFunction.getBoundContext();
														var result = oContext.getValue();

													}, 1000);

												}, function (error) {
													debugger
													MessageToast.show("The file cannot be read. It may have changed.");
												})
												oDialog.close();
											}
										})
									})
									oDialog.addContent(new sap.ui.unified.FileUploader({ fileType: ['pdf'], httpRequestMethod: sap.ui.unified.FileUploaderHttpRequestMethod.Put, sendXHR: true, useMultipart: false, uploadUrl: invoicePdf }));
									oDialog.open();//uncomment for deployment
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
