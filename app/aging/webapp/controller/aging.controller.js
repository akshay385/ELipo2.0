sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("aging.controller.aging", {
            onInit: async function () {
                debugger
                var oView = this.getView();
                await $.ajax({
                    url: "/odata/v4/catalog/Aging_Overview_Comp_code", // Replace with your service URL
                    method: "GET",
                    dataType: "json",
                    success: function (response) {
                        debugger
                        var raw_data = response.value[0]

                        
                        // Unique IDs for each dimension
                        var ids = [
                            '3c33b29a-f8d1-482d-857d-9f85c0de2b35',
                            'a9d6e70f-77e9-4714-b6d5-6a98a90d0d07',
                            'f4e1ea8f-718c-4946-814b-1139fa04b005',
                            'dd7b2c06-c101-430b-891c-0909dffc5d6d'
                        ];
                        
                        // Dimensions mapping
                        var dimensions = [
                            { label: '0-30Days', poKey: 'PO_0_30_Days', npoKey: 'NPO_0_30_Days' },
                            { label: '31-60Days', poKey: 'PO_31_60_Days', npoKey: 'NPO_31_60_Days' },
                            { label: '61-90Days', poKey: 'PO_61_90_Days', npoKey: 'NPO_61_90_Days' },
                            { label: '>90Days', poKey: 'PO_GT_91_Days', npoKey: 'NPO_GT_91_Days' }
                        ];
                        
                       
                        var data = dimensions.map((dim, index) => ({
                            ID: ids[index],
                            dimension: dim.label,
                            measure: raw_data[dim.poKey],
                            measure1: raw_data[dim.npoKey],
                            none: 0
                        }));
                        
                        console.log(data);
                        
                        var oModel = new JSONModel();
                        oModel.setData(data);
        
                        
                        oView.setModel(oModel, "aging_overview");
                    }
                })

                await $.ajax({
                    url: "/odata/v4/catalog/Aging_Overview_Vendor", 
                    method: "GET",
                    dataType: "json",
                    success: function (response) {
                        debugger
                        var dataArray = response.value;

                        // Aggregate the data for each dimension
                        var aggregatedData = dataArray.reduce((acc, item) => {
                            acc.v0_30Days += item.v0_30Days;
                            acc.v31_60Days += item.v31_60Days;
                            acc.v61_90Days += item.v61_90Days;
                            acc.vGT_91Days += item.vGT_91Days;
                            return acc;
                        }, { v0_30Days: 0, v31_60Days: 0, v61_90Days: 0, vGT_91Days: 0 });
                    
                        
                        var ids = [
                            '3c33b29a-f8d1-482d-857d-9f85c0de2b35',
                            'a9d6e70f-77e9-4714-b6d5-6a98a90d0d07',
                            'f4e1ea8f-718c-4946-814b-1139fa04b005',
                            'dd7b2c06-c101-430b-891c-0909dffc5d6d'
                        ];
                    
                   
                        var transformedData = [
                            { ID: ids[0], dimension: '0-30Days', measure: aggregatedData.v0_30Days, measure1: 0, none: 0 },
                            { ID: ids[1], dimension: '31-60Days', measure: aggregatedData.v31_60Days, measure1: 0, none: 0 },
                            { ID: ids[2], dimension: '61-90Days', measure: aggregatedData.v61_90Days, measure1: 0, none: 0 },
                            { ID: ids[3], dimension: '>90Days', measure: aggregatedData.vGT_91Days, measure1: 0, none: 0 }
                        ];

                        console.log(transformedData);

                        var oModel = new JSONModel();
                        oModel.setData(transformedData);
        
                        
                        oView.setModel(oModel, "aging_overview_vendor");
                        
                    }})
            },

            onBeforeRendering: function (oEvent) {
                debugger

                var oVizFrame = this.byId("barChart");
                oVizFrame.setModel(this.getView().getModel("aging_overview"));

                var oVizFrame = this.byId("barChart1");
                oVizFrame.setModel(this.getView().getModel("aging_overview_vendor"));

            }
        });
    });
