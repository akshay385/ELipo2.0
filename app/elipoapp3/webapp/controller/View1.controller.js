sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("elipoapp3.controller.View1", {
            onInit: function () {
                debugger
            },
            onAfterRendering: async function () {
                debugger
                this.byId("sidnav").setExpanded(false);
                if (this.byId("invoiceCockpit").getComponentInstance())//test
                this.byId("invoiceCockpit").getComponentInstance().destroy();//test
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
            },
            onCollapseExpandPress() {
                debugger
                const oSideNavigation = this.byId("sidnav"),
                    bExpanded = oSideNavigation.getExpanded();

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
                if(match[1]=='_IDGenNavigationListItem2')
                match[1]='overviewFS'
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
        });
    });
