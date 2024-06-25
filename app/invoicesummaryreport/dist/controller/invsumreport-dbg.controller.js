sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
	'sap/m/MessageToast',
    'sap/ushell/Container'
],
function (Controller,Container,exportLibrary,Spreadsheet) {
    "use strict";
    var EdmType = sap.ui.export.EdmType
    return Controller.extend("invoicesummaryreport.controller.invsumreport", {
        onInit: function () {

        },
        onAfterRendering: async function (oEvent) {
            debugger
            this.getView().byId("t1").addStyleClass("t1")
            this.getView().byId("t2").addStyleClass("t1")
            this.getView().byId("t3").addStyleClass("t1")
            this.getView().byId("t4").addStyleClass("t1")
            this.getView().byId("t5").addStyleClass("t1")
            this.getView().byId("t6").addStyleClass("t1")
            this.getView().byId("t7").addStyleClass("t1")
            this.getView().byId("t8").addStyleClass("t1")
            this.getView().byId("t9").addStyleClass("t1")
            this.getView().byId("t10").addStyleClass("t1")
            this.getView().byId("t11").addStyleClass("t1")
            this.getView().byId("t12").addStyleClass("t1")
            this.getView().byId("t13").addStyleClass("t1")
            this.getView().byId("t14").addStyleClass("t1")
            this.getView().byId("t15").addStyleClass("t1")
            this.getView().byId("t16").addStyleClass("t1")
            this.getView().byId("t17").addStyleClass("t1")
            this.getView().byId("t18").addStyleClass("t1")
        },
        butt : async function(oEvent)
        {
            debugger;
            const Navigation = await sap.ushell.Container.getServiceAsync("Navigation");
            const sHref = await Navigation.navigate({
                target:{semanticObject:"chart",action:"display"}
            });
        },

        createColumnConfig: function() {
            return  [
                {
                    label : 'Invoice No',
                    property : 'Invoice_No',
                    type : EdmType.String
                },
                {
                    label : 'Vendor Name',
                    property : 'Vendor_name',
                    type : EdmType.String
                },
                {
                    label : 'Vendor No',
                    property : 'Vendor_No',
                    type : EdmType.String
                },
                {
                    label : 'Document Type',
                    property : 'Document_Type',
                    type : EdmType.String
                },
                {
                    label : 'Overdue_Flag',
                    property : 'Overdue_Flag',
                    type : EdmType.String
                },
                {
                    label : 'Invoice Status',
                    property : 'Invoice_Status',
                    type : EdmType.String
                },
                {
                    label : 'Amount',
                    property : 'Amount',
                    type : EdmType.String
                },
                {
                    label : 'Invoice Date',
                    property : 'Invoice_Date',
                    type : EdmType.String
                },
                {
                    label : 'Due Date',
                    property : 'Due_Date',
                    type : EdmType.String
                },
                {
                    label : 'Payment Terms',
                    property : 'Payment_Terms',
                    type : EdmType.String
                },
                {
                    label : 'Days to Due',
                    property : 'Days_to_Due',
                    type : EdmType.String
                },
                {
                    label : 'Ref Po No',
                    property : 'Ref_Po_No',
                    type : EdmType.String
                },
                {
                    label : 'Comp Code',
                    property : 'Comp_Code',
                    type : EdmType.String
                },
                {
                    label : 'Ap Processor',
                    property : 'Ap_Processor',
                    type : EdmType.String
                },
                {
                    label : 'Approvers',
                    property : 'Approvers',
                    type : EdmType.String
                },
                {
                    label : 'Start Date',
                    property : 'Start_Date',
                    type : EdmType.String
                },
                {
                    label : 'End Date',
                    property : 'End_Date',
                    type : EdmType.String
                },
                {
                    label : 'Process Duration',
                    property : 'Process_Duration',
                    type : EdmType.String
                }
            ]
        },
        down : async function(oEvent)
        {
            var aCols,oTable,oBinding,oSettings,oSheet;
            debugger;
            oTable = this.byId('idProductsTable');
            oBinding = oTable.getBinding('items');
            aCols =  this.createColumnConfig();
            console.log();

            oSettings = {
                workbook: { columns: aCols },
                dataSource: oBinding
            }

            oSheet = new sap.ui.export.Spreadsheet(oSettings);
        oSheet.build()
            .then(function() {
                MessageToast.show('Spreadsheet export has finished');
            }).finally(function() {
                oSheet.destroy();
            });
        },
        search : function()
        {
            debugger
            var combo1 = this.getView().byId("combo1").getSelectedKeys();
            var combo2 = this.getView().byId("combo2").getSelectedKeys();
            var oTable = this.getView().byId("idProductsTable");
            var oBinding = oTable.getBinding("items");

            if (combo2.length > 0) {
                var busy = new sap.m.BusyDialog({ text: `Fetching Vendor name with ${combo2}`});
                     busy.open();
                var oFilter = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("Vendor_name", sap.ui.model.FilterOperator.Contains, combo2),
                    ],
                    and: false
                });
                oBinding.filter([oFilter]);
                setTimeout(function() {
                    busy.close();
                }, 1000);
            } else if (combo1.length > 0) {
                var busy1 = new sap.m.BusyDialog({ text: `Fetching Invoice No with ${combo1}`});
                busy1.open();
                var oFilter1 = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("Invoice_No", sap.ui.model.FilterOperator.Contains, combo1),

                    ],
                    and: false
                });
                oBinding.filter([oFilter1]);
                setTimeout(function() {
                    busy1.close();
                }, 1000);
            } else {
                var busy2 = new sap.m.BusyDialog({ text: "Fetching All Data" });
                busy2.open();
                oBinding.filter([]);
                setTimeout(function() {
                    busy2.close();
                }, 1000);
            }
        },

        onLogoPressed : function()
        {
            var oElement = this.getView().byId("f1");
            var isVisible = oElement.getVisible();

            // Toggle visibility
            oElement.setVisible(!isVisible);
        }
    });
});
