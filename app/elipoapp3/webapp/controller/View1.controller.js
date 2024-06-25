sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
var initfn;
var expandedValue;
        return Controller.extend("elipoapp3.controller.View1", {
            onInit: function () {
                debugger 
                initfn = true;
                // setTimeout(()=>{document.getElementById("header-shellArea").id="header-shell";},400);
                
                // this.loadIframeContent();
            },
            
            // loadIframeContent: function() {
            //     // Get iframe container and iframe element
            //     var oIframeContainer = this.byId("myIframe");
            //     var oIframe = oIframeContainer.getDomRef().querySelector('iframe');
    
            //     // Wait for iframe to load
            //     oIframe.onload = function() {
            //         // Get iframe document
            //         var iframeDocument = oIframe.contentDocument || oIframe.contentWindow.document;
    
            //         // Create link element for CSS
            //         var linkElement = iframeDocument.createElement("link");
            //         linkElement.rel = "stylesheet";
            //         linkElement.type = "text/css";
            //         linkElement.href = "/css/style.css"; // Replace with the path to your CSS file
    
            //         // Append the link element to the iframe's head
            //         iframeDocument.head.appendChild(linkElement);
            //     };
            // },
            onAfterRendering: async function () {
                debugger
                this.byId("sidnav").setExpanded(expandedValue);
                if(initfn){
                this.byId("sidnav").setExpanded(false);
                expandedValue = false;
                if (this.byId("invoiceCockpit").getComponentInstance())//test
                this.byId("invoiceCockpit").getComponentInstance().destroy();//test
                this.byId("iframee").setVisible(false);
                var ocustomerDetailContainer = await this.getOwnerComponent().createComponent({//test
                    usage: "overviewFS", async: true, manifest: true//test
                });//test
                
                await this.byId("invoiceCockpit").setComponent(ocustomerDetailContainer);//test


                // if( this.byId("invoiceCockpit").getComponent())
                // this.byId("invoiceCockpit").getComponentInstance().destroy();

                // var ocustomerDetailContainer = await this.getOwnerComponent().createComponent({
                //     usage: "screen1", async: true, manifest: true
                // });

                // await this.byId("invoiceCockpit").setComponent(ocustomerDetailContainer);
            }
            initfn = false;
            },
            onCollapseExpandPress() {
                debugger
                const oSideNavigation = this.byId("sidnav"),
                    bExpanded = oSideNavigation.getExpanded();
                expandedValue = !bExpanded;
                oSideNavigation.setExpanded(!bExpanded);
            },
            async onNavPress(oEvent) {
                debugger
                
                // var ocustomerDetailContainer = this.getOwnerComponent().createComponent({
                //     usage: "screen1", async: true, manifest: true
                // });
                //         this.byId("invoiceCockpit").setComponent(ocustomerDetailContainer);
                //         this._customerDetailContainer = ocustomerDetailContainer;


                debugger
                let sideKey = oEvent.oSource.getSelectedKey();
                let regex = /--([^-\s]+)$/;
                let match = sideKey.match(regex);
                let colexp = match[1];
                if(colexp != 'collapseexpand'){
                    this.byId("invoiceCockpit").setVisible(true);
                this.byId("iframee").setVisible(false);
                }
                
                
                if(colexp != 'collapseexpand'){
                if (this.byId("invoiceCockpit").getComponentInstance())
                    this.byId("invoiceCockpit").getComponentInstance().destroy();
                }
                if(match[1]=='_IDGenNavigationListItem2')
                match[1]='overviewFS'

                if(match[1]=='myinbox'){
                    setTimeout(() => {
                        if(!document.getElementById("header-shellA"))
                        document.getElementById("shell-header").id="header-shellA";
                        
                        document.getElementById("shell-header").style.display="none";
                    }, 1200);
                    
                    if (this.byId("invoiceCockpit").getComponentInstance())
                    this.byId("invoiceCockpit").getComponentInstance().destroy();
                    this.byId("invoiceCockpit").setVisible(false);
                    this.byId("iframee").setVisible(true);
                    
                }else{


                let extractedString = match ? match[1] : null;
                if(extractedString != "collapseexpand"){
                if (this.byId("invoiceCockpit").getComponentInstance())
                    this.byId("invoiceCockpit").getComponentInstance().destroy();

                var ocustomerDetailContainer = await this.getOwnerComponent().createComponent({
                    usage: extractedString, async: true, manifest: true
                });

                await this.byId("invoiceCockpit").setComponent(ocustomerDetailContainer);
            }
            }

            }
        });
    });
