sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";
    var keyid = '123e4567-e89b-12d3-a456-426614174000';
        return Controller.extend("settingui.controller.SettingView", {
            onInit: function () {
                debugger
                this.getView().bindElement(`/Setting(${keyid})`)

            },
            onBackEndSelect: function (oEvent) {
                debugger
                let selectedkey = oEvent.getSource().getSelectedKey();

                var contentVbox = this.byId("contentVbox");
                if (selectedkey != 'SAP') {

                    for (let i = 1; i <= 5; i++) {
                        contentVbox.getItems()[i].setVisible(false);
                    }
                }
                else {
                    for (let i = 1; i <= 5; i++) {
                        contentVbox.getItems()[i].setVisible(true);
                    }
                }

            },
            handleUploadComplete: function (oEvent) {
                debugger
                var sResponse = oEvent.mParameters.status;
                if (sResponse == 204) {
                    sap.m.MessageToast.show("File Uploaded")
                }    			// var sResponse = oEvent.getParameter("response"),
                // 	aRegexResult = /\d{4}/.exec(sResponse),
                // 	iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
                // 	sMessage;

                // if (sResponse) {
                // 	sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
                // 	MessageToast.show(sMessage);
                // }
                oEvent.getSource().getParent().getItems()[0].getBindingContext().refresh()
            },
            changefile: function (oEvent) {
                debugger
                var oBaseUri = this.getOwnerComponent().getManifestObject()._oBaseUri._string
                // var oFileUploader = oEvent.oSource.oParent.mAggregations.content[0]
                var oFileUploader = this.byId("fileupload1")
                oFileUploader.removeAllHeaderParameters()
                var headPar = new sap.ui.unified.FileUploaderParameter();
                headPar.setName('slug');
                headPar.setValue(oEvent.mParameters.newValue);
                // oFileUploader.removeHeaderParameter('slug');

                oFileUploader.addHeaderParameter(headPar);
                var sUploadUri = `${oBaseUri}odata/v4/catalog/Setting(id=${keyid})/content`;
                // var sUploadUri = oExtensionAPI._controller.extensionAPI._controller._oAppComponent.getManifestObject().resolveUri("./StudentsSrv/ExcelUpload/excel")
                oFileUploader.setUploadUrl(sUploadUri);
                oFileUploader
                    .checkFileReadable()
                    .then(async function () {
                        var test = await oFileUploader.upload();
                        console.log();
                    })
                    .catch(function (error) {
                        debugger

                        // showError("The file cannot be read.");
                        // oUploadDialog.setBusy(bBusy)
                        // setDialogBusy(false)
                    })
            },
            onFileSizeExceeded: function (oEvent) {
                debugger
                sap.m.MessageToast.show("File Size Exceeded")
            },
            onSelectChangeFun: function (oEvent) {
                debugger
            }
        });
    });