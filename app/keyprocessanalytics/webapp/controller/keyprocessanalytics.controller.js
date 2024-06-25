sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("keyprocessanalytics.controller.keyprocessanalytics", {
        onInit: async function () {
            debugger
            var oView = this.getView();
                await $.ajax({
                    url: "/odata/v4/catalog/progress", // Replace with your service URL
                    method: "GET",
                    dataType: "json",
                    success: function (response) {
                        debugger;
                        if (response && response.value && response.value.length > 0) {
                            var dimensionToId = {
                                "PO": "3c33b29a-f8d1-482d-857d-9f85c0de2b35",
                                "NPO": "a9d6e70f-77e9-4714-b6d5-6a98a90d0d07",
                                "None": "f4e1ea8f-718c-4946-814b-1139fa04b005"
                            };
                            var transformedData = [];
                            Object.keys(dimensionToId).forEach(function (dimensionKey) {
                                var dimensionId = dimensionToId[dimensionKey];
                                var measure = response.value[0][dimensionKey + "_Processed"] || 0;
                                var measure1 = response.value[0][dimensionKey + "_InProcess"] || 0;
                
                        
                                var transformedItem = {
                                    ID: dimensionId,
                                    dimension: dimensionKey,
                                    measure: measure,
                                    measure1: measure1
                                };
                
                               
                                transformedData.push(transformedItem);
                            });
                
                       
                            console.log("Transformed Data:", transformedData);
                
                         
                
                        } else {
                            console.error("Invalid response format or no data found.");
                           
                        }

                        var model = new JSONModel();
                        model.setData(transformedData);
                        oView.setModel(model, "key_process_bar")

                
                    }})

                    debugger
                    await $.ajax({
                        url: "/odata/v4/catalog/key_process_list", // Replace with your service URL
                        method: "GET",
                        dataType: "json",
                        success: function (response) {
                            debugger
                            if (response && response.value && response.value.length > 0) {
                                // Prepare transformed data array
                                var transformedData1 = [];
                                
                                // Track unique dimensions and generate IDs dynamically
                                var dimensionToId = {};
                                var dimensionCount = 0;
                    
                                // Iterate over each item in the response
                                response.value.forEach(function(item) {
                                    var vendorName = item.vendor_name;
                                    var totalAmount = item.total_amount || 0; // Default to 0 if total_amount is null
                    
                                    // Check if ID already exists for the vendor, otherwise generate new ID
                                    var dimensionId = dimensionToId[vendorName];
                                    if (!dimensionId) {
                                        dimensionCount++;
                                        dimensionId = `GeneratedID-${dimensionCount}`;
                                        dimensionToId[vendorName] = dimensionId;
                                    }
                    
                                    // Prepare transformed item
                                    var transformedItem = {
                                        ID: dimensionId,
                                        dimension: vendorName, // Use vendor_name as dimension
                                        measure: totalAmount
                                    };
                    
                                    // Push transformed item to the array
                               transformedData1.push(transformedItem);
                                });
                    
                                // Log or further process transformedData
                                console.log(transformedData1);
                            }
                            else {
                                console.error("No data or empty response received.");
                            }

                            var model = new JSONModel();
                        model.setData(transformedData1);
                        oView.setModel(model, "key_process_bar1")

                        var model2 = new JSONModel();
                        model2.setData(transformedData1); // Reuse transformed data
                        oView.setModel(model2, "key_process_bar2");
                        }})

                      
        },

        onAfterRendering : async function(oEvent)
        {
            debugger;
            this.getView().byId("t1").addStyleClass("t1")
            this.getView().byId("t2").addStyleClass("t1")
            this.getView().byId("t3").addStyleClass("t1")
            this.getView().byId("t4").addStyleClass("t4")
            this.getView().byId("t5").addStyleClass("t1")
            this.getView().byId("t6").addStyleClass("t1")
            this.getView().byId("barchart").addStyleClass("bar")



        }
    });
});
