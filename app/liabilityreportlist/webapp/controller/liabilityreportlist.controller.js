sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    'sap/ui/export/library',
    'sap/ui/export/Spreadsheet',
    'sap/m/MessageToast',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
],
function (Controller) {
    "use strict";
    var EdmType = sap.ui.export.EdmType;
    return Controller.extend("liabilityreportlist.controller.liabilityreportlist", {
        onInit: function () {

        },
        onAfterRendering: async function (oEvent) {
            this.getView().byId("t1").addStyleClass("t1")
            this.getView().byId("t2").addStyleClass("t1")
            this.getView().byId("t3").addStyleClass("t1")
            this.getView().byId("t4").addStyleClass("t1")
            this.getView().byId("t5").addStyleClass("t1")
            this.getView().byId("t6").addStyleClass("t1")
            this.getView().byId("t8").addStyleClass("t1")
            this.getView().byId("t9").addStyleClass("t1")
            this.getView().byId("t10").addStyleClass("t1")
            this.getView().byId("t11").addStyleClass("t1")
            this.getView().byId("t12").addStyleClass("t1")
            this.oFilterBar = this.getView().byId("f1");




        },

        createColumn: function () {
            return [
                {
                    label: 'Vendor No',
                    property: 'Vendor_no',
                    type: EdmType.String
                },
                {
                    label: 'Comp Code',
                    property: 'comp_code',
                    type: EdmType.String
                },
                {
                    label: 'Total No Of Invoice',
                    property: 'Total_no_of_invoice',
                    type: EdmType.String
                },
                {
                    label: 'Total Amount',
                    property: 'Total_Amount',
                    type: EdmType.String
                },
                {
                    label: 'Total No Of Invoice Due',
                    property: 'Total_no_of_invoice',
                    type: EdmType.String
                },
                {
                    label: 'Total Due Amount',
                    property: 'Total_Due_Amount',
                    type: EdmType.String
                },
                {
                    label: 'Total No Of Invoice OverDue',
                    property: 'Total_no_of_Invoice_OverDue',
                    type: EdmType.String
                },
                {
                    label: 'Total Overdue Amount',
                    property: 'Total_Overdue_Amount',
                    type: EdmType.String
                },
                {
                    label: 'Total_No_of_Invoice_Posted',
                    property: 'Total_No_of_Invoice_Posted',
                    type: EdmType.String
                },
                {
                    label: 'Total Amount Posted',
                    property: 'Total_amt_Posted',
                    type: EdmType.String
                }
            ]
        },

        down: async function () {
            debugger;
            var aCols, oTable, oBinding, oSettings, oSheet;
            debugger;
            oTable = this.byId('idProductsTable1');
            oBinding = oTable.getBinding('items');
            aCols = this.createColumn();

            oSettings = {
                workbook: { columns: aCols },
                dataSource: oBinding
            }

            oSheet = new sap.ui.export.Spreadsheet(oSettings);
            oSheet.build()
                .then(function () {
                    MessageToast.show('Spreadsheet export has finished');
                }).finally(function () {
                    oSheet.destroy();
                });

        },

        onselectchange: async function (oEvent) {
            debugger
            console.log();
            this.oFilterBar.fireFilterChange(oEvent);

        },

        pressbut: async function (oEvent) {
            debugger;
            var oElement = this.getView().byId("f1");
            var isVisible = oElement.getVisible();

            // Toggle visibility
            oElement.setVisible(!isVisible);

        },

        search: async function (oEvent) {

            debugger;

            var combo1 = this.getView().byId("combo1").getSelectedKeys();
            var combo2 = this.getView().byId("combo2").getSelectedKeys();
            var oTable = this.getView().byId("idProductsTable1");
            var oBinding = oTable.getBinding("items");

            if (combo2.length > 0) {
                var busy = new sap.m.BusyDialog({ text: `Fetching Vendor Name with ${combo2}` });
                     busy.open();
                var oFilter = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("vendor_name", sap.ui.model.FilterOperator.Contains, combo2),
                    ],
                    and: false
                });
                oBinding.filter([oFilter]);
                setTimeout(function() {
                    busy.close();
                }, 1000);
            } else if (combo1.length > 0) {
                var busy1 = new sap.m.BusyDialog({ text: `Fetching Vendor No with ${combo1}` });
                busy1.open();
                var oFilter1 = new sap.ui.model.Filter({
                    filters: [
                        new sap.ui.model.Filter("vendor_no", sap.ui.model.FilterOperator.Contains, combo1),

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
        }

    });
});
