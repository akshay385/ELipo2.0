sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        onPress:async function(oEvent) {
            debugger
            var baseUrl = oEvent.oSource.getModel().getServiceUrl();
            let oButton = oEvent.getSource();
            if(sap.ui.getCore().byId("popover1"))
            sap.ui.getCore().byId("popover1").destroy();

            if(oEvent.oSource.getText() == "New" ||oEvent.oSource.getText() == "Draft" ){
            var pop = new sap.m.Popover("popover1",{resizable:true,title:`${oEvent.oSource.getText()}`,placement:"Left"});
            
            pop.addContent(new sap.m.MessageStrip({type:"Warning",text:"status will be available once sent for Approval!",showIcon:true}));
            }else{
            var invoiceNo = sap.ui.getCore().byId(oEvent.oSource.oParent.sId).getCells()[0].getText();
            var data;
            var url = baseUrl+`approvalWorkFlow?$filter=(invoiceNo eq '${invoiceNo}')`;
           await $.ajax({url: url,method:"GET", success: function(res) {
                debugger
                data = res.value;
                
            }});
            data.sort((a,b)=>{parseFloat(a.level) - parseFloat(b.level)});
            
            var pop = new sap.m.Popover("popover1",{resizable:true,title:`${oEvent.oSource.getText()}`,placement:"Left",contentHeight:"100px",contentWidth:"500px",enableScrolling:true});
            pop.addContent(new sap.m.Table({
                fixedLayout:false,
                showSeparators:"All"
            }));
            pop.mAggregations.content[0].addColumn(new sap.m.Column({width:"70px"}).setHeader(new sap.m.Text({text:"Level"})));
            pop.mAggregations.content[0].addColumn(new sap.m.Column({width:"120px"}).setHeader(new sap.m.Text({text:"Groups"})));
            pop.mAggregations.content[0].addColumn(new sap.m.Column({width:"120px"}).setHeader(new sap.m.Text({text:"Members"})));
            pop.mAggregations.content[0].addColumn(new sap.m.Column({width:"70px"}).setHeader(new sap.m.Text({text:"Status"})));
            
            data.forEach(data => {
                let oItem = new sap.m.ColumnListItem();
                oItem.addCell(new sap.m.Text({text:`${data.level}`}));
                oItem.addCell(new sap.m.Text({text:`${data.groups}`}));
                oItem.addCell(new sap.m.Text({text:`${data.members}`}));
                oItem.addCell(new sap.m.Text({text:`${data.status}`}));
                pop.mAggregations.content[0].addItem(oItem);
            });
        }
            pop.openBy(oButton);
          
        
            
        }
    };
});
