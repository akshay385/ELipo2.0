sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet'
],
    function (Controller, MessageBox, exportLibrary, Spreadsheet) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        var oBaseUri
        return Controller.extend("masterelipo.controller.MasterView", {
            onInit: function () {

            },
            onAfterRendering: function (oEvent) {
                debugger;

                setTimeout(() => {
                    // Get the Select control by its ID
                    var oSelect = this.byId("selectitems");

                    // Ensure the Select control and its items are available
                    if (oSelect && oSelect.getItems().length > 0) {
                        // Get the first item
                        var oFirstItem = oSelect.getItems()[0];

                        // Set the selected key to the first item's key
                        oSelect.setSelectedKey(oFirstItem.getKey());

                        // Manually trigger the change event
                        oSelect.fireChange({
                            selectedItem: oFirstItem
                        });
                    }
                }, 300);
            },
            onPress: function () {
                debugger
                oBaseUri = this.getOwnerComponent().getManifestObject()._oBaseUri._string
                if (!this.oDefaultDialog) {
                    this.oDefaultDialog = new sap.m.Dialog({
                        title: "Upload",
                        content: new sap.ui.unified.FileUploader({
                            id: "uploader",
                            fileType: ["xlsx"],
                            multiple: false,
                            uploadUrl: "StudentsSrv/ExcelUpload/excel",
                            sendXHR: true,
                            useMultipart: false,
                            placeholder: "Choose a xlsx file...",
                            httpRequestMethod: "PUT",
                            uploadComplete: function (oEvent) {
                                debugger
                                var iStatus = oEvent.getParameter("status");
                                var oFileUploader = oEvent.getSource()


                                oFileUploader.clear();
                                // var oUploadDialog = this.byId("uploader");
                                var oUploadDialog = oEvent.oSource.oParent
                                // oUploadDialog && oUploadDialog.getBeginButton().setEnabled(false);
                                // setOkButtonEnabled(false)
                                // setDialogBusy(false)
                                // oUploadDialog.setBusy(false)


                                if (iStatus >= 400) {
                                    var oRawResponse;
                                    try {
                                        oRawResponse = JSON.parse(oEvent.getParameter("responseRaw"));
                                    } catch (e) {
                                        oRawResponse = oEvent.getParameter("responseRaw");
                                    }
                                    if (oRawResponse && oRawResponse.error && oRawResponse.error.message) {
                                        new sap.m.MessageBox.error("Upload failed", { title: "Error" });
                                        // new sap.m.MessageBox.error(oRawResponse.error.code, oRawResponse.error.target, oRawResponse && oRawResponse.error && oRawResponse.error.message);
                                    }
                                } else {
                                    new sap.m.MessageToast.show("File uploaded successfully");
                                    // oExtensionAPI.refresh()
                                    this.oParent.oParent.mAggregations.content[0].mAggregations.content[0].mBindingInfos.items.binding.refresh()
                                    // this.byId("myTable").refresh()
                                    oUploadDialog && oUploadDialog.close()
                                }

                            }
                        }),
                        beginButton: new sap.m.Button({
                            type: sap.m.ButtonType.Emphasized,
                            text: "OK",
                            press: function (oEvent) {
                                debugger

                                var oFileUploader = oEvent.oSource.oParent.mAggregations.content[0]
                                oFileUploader.removeAllHeaderParameters()
                                var headPar = new sap.ui.unified.FileUploaderParameter();
                                headPar.setName('slug');
                                headPar.setValue(this.byId("selectitems").mProperties.selectedKey);
                                oFileUploader.removeHeaderParameter('slug');

                                oFileUploader.addHeaderParameter(headPar);
                                var sUploadUri = `${oBaseUri}odata/v4/catalog/ExcelUpload/excel`;
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
                                        oUploadDialog.setBusy(bBusy)
                                        setDialogBusy(false)
                                    })



                                this.oDefaultDialog.close();
                            }.bind(this)
                        }),
                        endButton: new sap.m.Button({
                            text: "Close",
                            press: function () {
                                this.oDefaultDialog.close();
                            }.bind(this)
                        })
                    });

                    // to get access to the controller's model
                    this.getView().addDependent(this.oDefaultDialog);
                }

                this.oDefaultDialog.open();
            },
            onSelectChange: async function (oEvent) {
                debugger;
                var myTable = this.byId("myTable")
                oBaseUri = this.getOwnerComponent().getManifestObject()._oBaseUri._string
                var seriveName = oEvent.getSource().getSelectedKey();
                var oFunc = this.getView().getModel().bindContext("/getDynamicCol(...)");
                oFunc.setParameter("sName", `${seriveName}`);
                await oFunc.execute()
                var result = oFunc.getBoundContext().getValue().value;
                // var result


                // var settings = {
                //     // "url": `/odata/v4/catalog/getDynamicCol(sName='${seriveName}')`,
                //     "url": `/odata/v4/catalog/getDynamicCol(sName='${seriveName}')`,
                //     "method": "GET",
                // };

                // await $.ajax(settings).done(function (response) {
                //     console.log(response);
                //     result = response.value
                // });

                result = JSON.parse(result);



                //
                myTable.destroyColumns()
                myTable.destroyItems()

                function formatCompanyCode(company_code) {
                    // Convert the company code to title case (capitalize each word)
                    var formattedCompanyCode = company_code.toLowerCase().replace(/\b\w/g, function (c) {
                        return c.toUpperCase();
                    });

                    // Replace underscores with spaces
                    formattedCompanyCode = formattedCompanyCode.replace(/_/g, ' ');

                    return formattedCompanyCode;
                }

                for (let i = 0; i < result.length; i++) {
                    debugger
                    myTable.addColumn(new sap.m.Column({
                        hAlign: "Center",
                        header: new sap.m.Text({ text: `${formatCompanyCode(result[i])}` })
                    }));
                }
                myTable.addColumn(new sap.m.Column({
                    styleClass: "lastColumn",
                    hAlign: "Center",
                    header: new sap.m.Text({ text: `` })
                }));

                myTable.bindItems({
                    path: `/${seriveName}`,
                    template: new sap.m.ColumnListItem({
                        cells: [
                            ...result.map(function (colName) {
                                return new sap.m.Input({ value: `{${colName}}`, tooltip: `{${colName}}`, textAlign: "Center", editable: false }).addStyleClass("inputClass");
                            }),
                            new sap.m.HBox({
                                justifyContent: "SpaceBetween",
                                width: "100px",
                                items: [
                                    new sap.m.Button({
                                        text: "Modify", press: function (oEvent) {
                                            debugger
                                            let currText = oEvent.getSource().getText();
                                            let oListCells = oEvent.getSource().getParent().getParent().getCells();
                                            if (currText == 'Modify') {
                                                oEvent.getSource().setText("Save");
                                                oEvent.getSource().getParent().getParent().addStyleClass("selectedColumnList")
                                                for (let i = 0; i < oListCells.length - 1; i++) {
                                                    oListCells[i].setEditable(true)
                                                }
                                            }
                                            else if (currText == 'Save') {
                                                oEvent.getSource().setText("Modify");
                                                oEvent.getSource().getParent().getParent().removeStyleClass("selectedColumnList")
                                                for (let i = 0; i < oListCells.length - 1; i++) {
                                                    oListCells[i].setEditable(false)
                                                }
                                            }
                                        }
                                    }),
                                    new sap.ui.core.Icon({
                                        src: "sap-icon://delete", press: function (oEvent) {
                                            debugger
                                            var oSelectedItem = oEvent.getSource().getParent().getParent();
                                            var selectedContext = oSelectedItem.getBindingContext();

                                            new MessageBox.confirm("Are you sure you want to delete?", {
                                                title: "Confirmation",
                                                onClose: function (oAction) {
                                                    debugger
                                                    if (oAction === MessageBox.Action.OK) {
                                                        debugger
                                                        selectedContext.delete().then(function () {
                                                            debugger
                                                            MessageBox.alert("Deleted Successfully",
                                                                { icon: MessageBox.Icon.SUCCESS, title: "Success" });
                                                        }, function (oError) {
                                                            debugger
                                                            MessageBox.alert("Could not delete Sales Order: "
                                                                + oError.message, { icon: MessageBox.Icon.ERROR, title: "Error" });
                                                        });
                                                    }
                                                }
                                            });



                                        }
                                    }).addStyleClass("deleteIcon")
                                ]
                            })
                        ]
                    })
                });


                var oModel = oEvent.getSource().getModel();
                var sPath = "/Default_master"

                oModel.read(sPath, {
                    success: function (oData) {
                        debugger
                        // oData contains the JSON response from the OData service
                        console.log(oData); // Log the JSON response to the console
                    },
                    error: function (oError) {
                        debugger
                        // Handle any errors that occur during the read operation
                        console.error("Error reading data:", oError);
                    }
                });

            },
            onExcelUpload: function (oEvent) {
                debugger
                var file = oEvent.getParameter("files")[0];
                var oMainTable = this.byId("myTable");
                if (file) {
                    var reader = new FileReader();

                    reader.onload = function (oEvent) {
                        debugger;
                        var arrayBuffer = oEvent.target.result;

                        // Process the ArrayBuffer using the XLSX library
                        var workbook = XLSX.read(arrayBuffer, { type: 'array' });

                        // Example: Access the first worksheet
                        var firstSheetName = workbook.SheetNames[0];
                        var worksheet = workbook.Sheets[firstSheetName];

                        // Convert the worksheet to JSON
                        var excelData = XLSX.utils.sheet_to_json(worksheet);

                        // Now you can use excelData for further processing
                        console.log(excelData);

                    };

                    debugger;

                    // Read the file as an ArrayBuffer
                    reader.readAsArrayBuffer(file);

                }
            },
            onExcelExport: function (oEvent) {
                debugger
                var myTable = this.byId("myTable");
                var oRowBinding = myTable.getBinding('items').getContexts();
                var oTotalCols = myTable.getColumns(); //[0].getHeader().getText()

                //getting columns
                var aCols = [];
                var aRowData = [];
                for (let i = 0; i < oTotalCols.length - 1; i++) {
                    aCols.push({
                        label: `${oTotalCols[i].getHeader().getText()}`,
                        type: EdmType.String,
                        property: `${oTotalCols[i].getHeader().getText()}`,
                        scale: 0
                    });

                }

                for (let i = 0; i < oRowBinding.length; i++) {
                    var j = 0;
                    var tempDataObj = {};
                    let currObj = oRowBinding[i].getObject();
                    for (var key in currObj) {
                        tempDataObj[aCols[j].property] = `${currObj[key] ?? ''}`
                        j++;
                    }
                    aRowData.push(tempDataObj);
                }
                debugger

                var oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: aRowData,
                    fileName: `${this.byId("selectitems").getSelectedKey()}.xlsx`
                };

                var oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function () {
                    debugger
                    oSheet.destroy();
                });

            }
        });
    }
);