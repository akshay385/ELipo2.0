

sap.ui.define([
    "sap/m/MessageToast"
], function (MessageToast) {
    'use strict';
    var iddd;
    var that = this;
    var extractedNumber;

    return {
        onAfterItemAdded: function (oEvent) {
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            debugger;
            var item = oEvent.getParameter("item");
            var par_id = window.location.href;
            const regex = /uuid=([a-fA-F0-9-]+)/;
            const match = par_id.match(regex);
            if (match) {
                extractedNumber = match[1];
                console.log(extractedNumber); // Output: 1
            } else {
                console.log("Number not found in URL");
            }

            var _createEntity = async function (item) {
                var data = {
                    mediaType: item.getMediaType(),
                    fileName: item.getFileName(),
                    size: item.getFileObject().size,
                    fkey: extractedNumber,
                };
                debugger
              
                var settings = {
                    url: baseUrl+`supplier(uuid=${extractedNumber},IsActiveEntity=false)/invtofil`,
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    data: JSON.stringify(data)
                };

                await new Promise((resolve, reject) => {
                    debugger
                    $.ajax(settings)
                        .done((results, textStatus, request) => {
                            debugger
                            iddd=results.id;
                            resolve(results);
                        })
                        .fail((err) => {
                            reject(err);
                        });
                });
            };

            _createEntity(item)
                .then((id) => {
                    debugger
                    var url = baseUrl+`supplierFiles(id=${iddd},IsActiveEntity=false)/content`;
                    iddd = null;
                    item.setUploadUrl(url);
                    item.setUrl(url)
                    var oUploadSet = this.byId("uploadSet");
                    oUploadSet.setHttpRequestMethod("PUT");
                    oUploadSet.uploadItem(item);
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        onUploadCompleted: function (oEvent) {
            debugger
            var oUploadSet = this.byId("uploadSet");
            oUploadSet.removeAllIncompleteItems();
            
        },
        onOpenPressed: function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            
            let fileurl = baseUrl+oEvent.oSource.mProperties.url.substring(1);
            // let fileurl = oEvent.oSource.mProperties.url;
            oEvent.oSource.mProperties.url = fileurl;
            // oEvent.oSource.setUploadUrl(fileurl)
        },
        afterItemRemoved: function (oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            const regex = /^(.*?),IsActiveEntity=/;

let match = oEvent.mParameters.item.mProperties.url.match(regex);
let urll = match[1]+",IsActiveEntity=false)";
$.ajax({ 
    url:baseUrl+urll,
    method: "DELETE"
  
})
        },
       

 

    

   

        //formatters
        formatThumbnailUrl: function (mediaType) {
            debugger
            var iconUrl;
            switch (mediaType) {
                case "image/png":
                    iconUrl = "sap-icon://card";
                    break;
                case "text/plain":
                    iconUrl = "sap-icon://document-text";
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    iconUrl = "sap-icon://excel-attachment";
                    break;
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    iconUrl = "sap-icon://doc-attachment";
                    break;
                case "application/pdf":
                    iconUrl = "sap-icon://pdf-attachment";
                    break;
                default:
                    iconUrl = "sap-icon://attachment";
            }
            return iconUrl;
        }

    };
});
