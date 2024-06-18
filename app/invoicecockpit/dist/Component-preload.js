//@ui5-bundle invoicecockpit/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"invoicecockpit/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("invoicecockpit.Component",{metadata:{manifest:"json"}})});
},
	"invoicecockpit/ext/controller/Objectpagecontroller.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t;return e.extend("invoicecockpit.ext.controller.Objectpagecontroller",{override:{onInit:function(){debugger;var e=this.base.getExtensionAPI().getModel()},onAfterRendering:async function(){debugger},editFlow:{onBeforeDiscard:async function(e){debugger;let t=e.context.sPath;let o="postattach";let n=e.context.getModel().bindContext(`/${o}(...)`);console.log();n.setParameter("p",t);await n.execute();const i=n.getBoundContext();var a=i.getValue()}},routing:{onAfterBinding:async function(e){debugger;if(e){t=e;let o=e.oModel.getServiceUrl();let n=o+e.sPath.substring(1)+"/content";$.ajax({url:n,type:"GET",success:function(o){debugger;if(!o){let o=new sap.m.Dialog({title:"Upload Invoice Pdf.",endButton:new sap.m.Button({text:"Confirm",type:"Emphasized",press:function(n){debugger;o.getContent()[0].checkFileReadable().then(async function(n){await o.getContent()[0].upload();setTimeout(async()=>{let o="extract";let n=e.getModel().bindContext(`/${o}(...)`);console.log();const i=/uuid=([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;let a=t.getPath().match(i);n.setParameter("p",a[1]);await n.execute();const c=n.getBoundContext();var s=c.getValue()},1e3)},function(e){debugger;MessageToast.show("The file cannot be read. It may have changed.")});o.close()}})});o.addContent(new sap.ui.unified.FileUploader({fileType:["pdf"],httpRequestMethod:sap.ui.unified.FileUploaderHttpRequestMethod.Put,sendXHR:true,useMultipart:false,uploadUrl:n}));o.open()}}})}setTimeout(()=>{if(sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::StandardAction::Cancel").getVisible()){sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::CustomSubSection::Ttachments--uploadSet").setUploadEnabled(true);sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(false)}else{sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::CustomSubSection::Ttachments--uploadSet").setUploadEnabled(false);sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(true)}},700)}}}})});
},
	"invoicecockpit/ext/controller/SendForApproval.js":function(){sap.ui.define(["sap/m/MessageToast"],function(s){"use strict";return{send:function(e){s.show("Custom handler invoked.")}}});
},
	"invoicecockpit/ext/controller/Showhide.js":function(){sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";return{show:function(e){debugger;this.showSideContent("GeneratedFacet1");console.log(this)}}});
},
	"invoicecockpit/ext/fragment/Ttachments.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros" xmlns:upload="sap.m.upload"><upload:UploadSet\n\t\t\t\t\t\n\t\t\t\t\tid="uploadSet"\n\t\t\t\t\tcore:require="{handler:\'invoicecockpit/ext/fragment/Ttachments\'}"\n\t\t\t\t\tinstantUpload="false"\n\t\t\t\t\tuploadEnabled="false"\n\t\t\t\t\tshowIcons="true"\n\t\t\t\t\tafterItemAdded="handler.onAfterItemAdded"\n\t\t\t\t\tuploadCompleted="handler.onUploadCompleted"\n\t\t\t\t\tafterItemRemoved="handler.afterItemRemoved"\n\t\t\t\t\titems="{\n\t\t\t\t\t\t\t\tpath: \'invtofil\',\n\t\t\t\t\t\t\t\tparameters: {\n\t\t\t\t\t\t\t\t\t$orderby: \'createdAt desc\'\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttemplateShareable: false}"\n\t\t\t\t><upload:items><upload:UploadSetItem id="_IDGenUploadSetItem1"\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tfileName="{fileName}"\n\t\t\t\t\t\t\tmediaType="{mediaType}"\n\t\t\t\t\t\t\turl="{url}"\n\t\t\t\t\t\t\tthumbnailUrl="{\n\t\t\t\t\t\t\t\tpath: \'mediaType\',\n\t\t\t\t\t\t\t\tformatter: \'handler.formatThumbnailUrl\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\tenabledEdit="false"\n\t\t\t\t\t\t\topenPressed="handler.onOpenPressed"\n\t\t\t\t\t\t\tremovePressed="handler.onRemovePressed"\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t><upload:attributes><ObjectAttribute id="_IDGenObjectAttribute1"\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\ttitle="Uploaded By"\n\t\t\t\t\t\t\t\t\ttext="{createdBy}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute id="_IDGenObjectAttribute2"\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\ttitle="Uploaded on"\n\t\t\t\t\t\t\t\t\ttext="{createdAt}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute id="_IDGenObjectAttribute3"\n\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\ttitle="File Type"\n\t\t\t\t\t\t\t\t\ttext="{mediaType}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute id="_IDGenObjectAttribute4"\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\ttitle="File Size"\n\t\t\t\t\t\t\t\t\ttext="{size}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></core:FragmentDefinition>',
	"invoicecockpit/ext/fragment/Ttachments.js":function(){sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";var t;var a=this;var o;var r;return{onAfterItemAdded:function(e){var a=e.oSource.getModel().getServiceUrl();debugger;var r=e.getParameter("item");var i=window.location.href;const n=/uuid=([a-fA-F0-9-]+)/;const c=i.match(n);if(c){o=c[1];console.log(o)}else{console.log("Number not found in URL")}var s=async function(e){var r={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size,fkey:o};debugger;var i={url:a+`invoiceCockpit(uuid=${o},IsActiveEntity=false)/invtofil`,method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(r)};await new Promise((e,a)=>{debugger;$.ajax(i).done((a,o,r)=>{debugger;t=a.id;e(a)}).fail(e=>{a(e)})})};s(r).then(e=>{debugger;var o=a+`Files(id=${t},IsActiveEntity=false)/content`;t=null;r.setUploadUrl(o);r.setUrl(o);var i=this.byId("uploadSet");i.setHttpRequestMethod("PUT");i.uploadItem(r)}).catch(e=>{console.log(e)})},onOpenPressed:function(e){debugger;var t=e.oSource.getModel().getServiceUrl();let a=t+e.oSource.mProperties.url.substring(1);e.oSource.mProperties.url=a},onUploadCompleted:function(e){debugger;var t=this.byId("uploadSet");t.removeAllIncompleteItems()},afterItemRemoved:function(e){var t=e.oSource.getModel().getServiceUrl();debugger;const a=/^(.*?),IsActiveEntity=/;let o=e.mParameters.item.mProperties.url.match(a);let r=o[1]+",IsActiveEntity=false)";$.ajax({url:t+r,method:"DELETE"})},formatThumbnailUrl:function(e){debugger;var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t}}});
},
	"invoicecockpit/ext/fragment/sidePdf.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros" ><PDFViewer\n            title="Invoice"\n            isTrustedSource="true"\n            id="pdfViewer"\n            source="{content}"\n            width="122%"\n            height="400px" /></core:FragmentDefinition>',
	"invoicecockpit/i18n/i18n.properties":'# This is the resource bundle for invoicecockpit\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=Invoice Cockpit\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n\n#XFLD,45\nflpTitle=Invoice Cockpit\n',
	"invoicecockpit/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"invoicecockpit","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.13.4","toolsId":"1c3ce7d0-3aaa-4a44-a24d-0dc7b3f19a1c"},"dataSources":{"mainService":{"uri":"odata/v4/catalog/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"invoicecockpit-display":{"semanticObject":"invoicecockpit","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.124.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"invoicecockpit.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"invoiceCockpitList","target":"invoiceCockpitList"},{"pattern":"invoiceCockpit({key}):?query:","name":"invoiceCockpitObjectPage","target":"invoiceCockpitObjectPage"}],"targets":{"invoiceCockpitList":{"type":"Component","id":"invoiceCockpitList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/invoiceCockpit","variantManagement":"None","navigation":{"invoiceCockpit":{"detail":{"route":"invoiceCockpitObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"GridTable"}},"@com.sap.vocabularies.UI.v1.LineItem#tableView":{"tableSettings":{"type":"GridTable"}},"@com.sap.vocabularies.UI.v1.LineItem#tableView1":{"tableSettings":{"type":"GridTable"}},"@com.sap.vocabularies.UI.v1.LineItem#tableView2":{"tableSettings":{"type":"GridTable"}},"@com.sap.vocabularies.UI.v1.LineItem#tableView3":{"tableSettings":{"type":"GridTable"}}},"initialLoad":"Enabled","views":{"paths":[{"key":"tableView","annotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView"},{"key":"tableView1","annotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView1"},{"key":"tableView2","annotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView2"},{"key":"tableView3","annotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView3"},{"key":"tableView4","annotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView4"}],"showCounts":true},"hideFilterBar":true}}},"invoiceCockpitObjectPage":{"type":"Component","id":"invoiceCockpitObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/invoiceCockpit","controlConfiguration":{"invtoitems/@com.sap.vocabularies.UI.v1.LineItem#Items":{"tableSettings":{"type":"GridTable"}}},"content":{"footer":{"actions":{"sendforapproval":{"press":"invoicecockpit.ext.controller.SendForApproval.send","visible":true,"enabled":true,"text":"Send for Approval"}}},"body":{"sections":{"GeneratedFacet1":{"sideContent":{"template":"invoicecockpit.ext.fragment.sidePdf","title":"custPdf","type":"XMLFragment"},"type":"XMLFragment"},"Ttachments":{"template":"invoicecockpit.ext.fragment.Ttachments","position":{"placement":"After","anchor":"Items"},"title":"Attachments","type":"XMLFragment"}}},"header":{"actions":{"hideshow":{"press":"invoicecockpit.ext.controller.Showhide.show","visible":true,"enabled":true,"text":"Show / Hide","position":{"placement":"Before","anchor":"EditAction"}}}}}}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ObjectPage.ObjectPageController#invoicecockpit::invoiceCockpitObjectPage":{"controllerName":"invoicecockpit.ext.controller.Objectpagecontroller"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"elipo3approut"}}'
}});
