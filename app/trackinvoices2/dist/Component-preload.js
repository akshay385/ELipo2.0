//@ui5-bundle trackinvoices2/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"trackinvoices2/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("trackinvoices2.Component",{metadata:{manifest:"json"}})});
},
	"trackinvoices2/ext/controller/Listreport1controller.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("trackinvoices2.ext.controller.Listreport1controller",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},routing:{onAfterBinding:async function(e){debugger;sap.ui.getCore().byId("trackinvoices2::trackInvoiceList--fe::table::trackInvoice::LineItem").setSortConditions({sorters:[{key:"invoiceNoN",name:"invoiceNoN",descending:true}]})}}}})});
},
	"trackinvoices2/ext/controller/Listreportcontroller.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";return e.extend("trackinvoices2.ext.controller.Listreportcontroller",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()}}})});
},
	"trackinvoices2/ext/fragment/ApprovalWF.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m"><Button core:require="{ handler: \'trackinvoices2/ext/fragment/ApprovalWF\'}" text="{status}" press="handler.onPress" type="Transparent"/></core:FragmentDefinition>',
	"trackinvoices2/ext/fragment/ApprovalWF.js":function(){sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";return{onPress:async function(e){debugger;var t=e.oSource.getModel().getServiceUrl();let a=e.getSource();if(sap.ui.getCore().byId("popover1"))sap.ui.getCore().byId("popover1").destroy();if(e.oSource.getText()=="New"||e.oSource.getText()=="Draft"){var o=new sap.m.Popover("popover1",{resizable:true,title:`${e.oSource.getText()}`,placement:"Left"});o.addContent(new sap.m.MessageStrip({type:"Warning",text:"status will be available once sent for Approval!",showIcon:true}))}else{var n=sap.ui.getCore().byId(e.oSource.oParent.sId).getCells()[0].getText();var s;var r=t+`approvalWorkFlow?$filter=(invoiceNo eq '${n}')`;await $.ajax({url:r,method:"GET",success:function(e){debugger;s=e.value}});s.sort((e,t)=>{parseFloat(e.level)-parseFloat(t.level)});var o=new sap.m.Popover("popover1",{resizable:true,title:`${e.oSource.getText()}`,placement:"Left",contentHeight:"100px",contentWidth:"500px",enableScrolling:true});o.addContent(new sap.m.Table({fixedLayout:false,showSeparators:"All"}));o.mAggregations.content[0].addColumn(new sap.m.Column({width:"70px"}).setHeader(new sap.m.Text({text:"Level"})));o.mAggregations.content[0].addColumn(new sap.m.Column({width:"120px"}).setHeader(new sap.m.Text({text:"Groups"})));o.mAggregations.content[0].addColumn(new sap.m.Column({width:"120px"}).setHeader(new sap.m.Text({text:"Members"})));o.mAggregations.content[0].addColumn(new sap.m.Column({width:"70px"}).setHeader(new sap.m.Text({text:"Status"})));o.mAggregations.content[0].addColumn(new sap.m.Column({width:"100pxpx"}).setHeader(new sap.m.Text({text:"Action By"})));s.forEach(e=>{let t=new sap.m.ColumnListItem;t.addCell(new sap.m.Text({text:`${e.level}`}));t.addCell(new sap.m.Text({text:`${e.groups}`}));t.addCell(new sap.m.Text({text:`${e.members}`}));t.addCell(new sap.m.Text({text:`${e.status}`}));t.addCell(new sap.m.Text({text:`${e.actionBy}`}));o.mAggregations.content[0].addItem(t)})}o.openBy(a)}}});
},
	"trackinvoices2/i18n/i18n.properties":'# This is the resource bundle for trackinvoices2\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Track Invoices\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n\n#XFLD,42\nflpTitle=Track Invoices\n',
	"trackinvoices2/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"trackinvoices2","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.13.4","toolsId":"0f28cc91-9891-4f69-976e-156d6e0c8919"},"dataSources":{"mainService":{"uri":"odata/v4/catalog/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"trackinvoices2-display":{"semanticObject":"trackinvoices2","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.124.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"trackinvoices2.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"trackInvoiceList","target":"trackInvoiceList"}],"targets":{"trackInvoiceList":{"type":"Component","id":"trackInvoiceList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/trackInvoice","navigation":{},"initialLoad":"Enabled","variantManagement":"None","hideFilterBar":true,"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"enableExport":true,"selectionMode":"None","type":"GridTable"},"columns":{"ApprovalWF":{"header":"Approval Status","position":{"anchor":"DataField::modifiedBy","placement":"After"},"template":"trackinvoices2.ext.fragment.ApprovalWF"}}}}}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ListReport.ListReportController":{"controllerName":"trackinvoices2.ext.controller.Listreport1controller"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"elipo3approut"}}'
}});
