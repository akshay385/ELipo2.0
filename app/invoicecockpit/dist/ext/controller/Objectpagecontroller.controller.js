sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t;return e.extend("invoicecockpit.ext.controller.Objectpagecontroller",{override:{onInit:function(){debugger;var e=this.base.getExtensionAPI().getModel()},onAfterRendering:async function(){debugger},editFlow:{onBeforeDiscard:async function(e){debugger;let t=e.context.sPath;let o="postattach";let n=e.context.getModel().bindContext(`/${o}(...)`);console.log();n.setParameter("p",t);await n.execute();const i=n.getBoundContext();var a=i.getValue()}},routing:{onAfterBinding:async function(e){debugger;if(e){t=e;let o=e.oModel.getServiceUrl();let n=o+e.sPath.substring(1)+"/content";$.ajax({url:n,type:"GET",success:function(o){debugger;if(!o){let o=new sap.m.Dialog({title:"Upload Invoice Pdf.",endButton:new sap.m.Button({text:"Confirm",type:"Emphasized",press:function(n){debugger;o.getContent()[0].checkFileReadable().then(async function(n){await o.getContent()[0].upload();setTimeout(async()=>{let o="extract";let n=e.getModel().bindContext(`/${o}(...)`);console.log();const i=/uuid=([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/;let a=t.getPath().match(i);n.setParameter("p",a[1]);await n.execute();const c=n.getBoundContext();var s=c.getValue()},1e3)},function(e){debugger;MessageToast.show("The file cannot be read. It may have changed.")});o.close()}})});o.addContent(new sap.ui.unified.FileUploader({fileType:["pdf"],httpRequestMethod:sap.ui.unified.FileUploaderHttpRequestMethod.Put,sendXHR:true,useMultipart:false,uploadUrl:n}));o.open()}}})}setTimeout(()=>{if(sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::StandardAction::Cancel").getVisible()){sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::CustomSubSection::Ttachments--uploadSet").setUploadEnabled(true);sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(false)}else{sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::CustomSubSection::Ttachments--uploadSet").setUploadEnabled(false);sap.ui.getCore().byId("invoicecockpit::invoiceCockpitObjectPage--fe::FooterBar::CustomAction::sendforapproval").setVisible(true)}},700)}}}})});