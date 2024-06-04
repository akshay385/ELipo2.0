sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/MessageBox","sap/ui/export/library","sap/ui/export/Spreadsheet"],function(e,t,r,a){"use strict";var o=r.EdmType;var n;return e.extend("masterelipo.controller.MasterView",{onInit:function(){},onAfterRendering:function(e){debugger;setTimeout(()=>{var e=this.byId("selectitems");if(e&&e.getItems().length>0){var t=e.getItems()[0];e.setSelectedKey(t.getKey());e.fireChange({selectedItem:t})}},300)},onPress:function(){debugger;n=this.getOwnerComponent().getManifestObject()._oBaseUri._string;if(!this.oDefaultDialog){this.oDefaultDialog=new sap.m.Dialog({title:"Upload",content:new sap.ui.unified.FileUploader({id:"uploader",fileType:["xlsx"],multiple:false,uploadUrl:"StudentsSrv/ExcelUpload/excel",sendXHR:true,useMultipart:false,placeholder:"Choose a xlsx file...",httpRequestMethod:"PUT",uploadComplete:function(e){debugger;var t=e.getParameter("status");var r=e.getSource();r.clear();var a=e.oSource.oParent;if(t>=400){var o;try{o=JSON.parse(e.getParameter("responseRaw"))}catch(t){o=e.getParameter("responseRaw")}if(o&&o.error&&o.error.message){new sap.m.MessageBox.error("Upload failed",{title:"Error"})}}else{new sap.m.MessageToast.show("File uploaded successfully");this.oParent.oParent.mAggregations.content[0].mAggregations.content[0].mBindingInfos.items.binding.refresh();a&&a.close()}}}),beginButton:new sap.m.Button({type:sap.m.ButtonType.Emphasized,text:"OK",press:function(e){debugger;var t=e.oSource.oParent.mAggregations.content[0];t.removeAllHeaderParameters();var r=new sap.ui.unified.FileUploaderParameter;r.setName("slug");r.setValue(this.byId("selectitems").mProperties.selectedKey);t.removeHeaderParameter("slug");t.addHeaderParameter(r);var a=`${n}odata/v4/catalog/ExcelUpload/excel`;t.setUploadUrl(a);t.checkFileReadable().then(async function(){var e=await t.upload();console.log()}).catch(function(e){debugger;oUploadDialog.setBusy(bBusy);setDialogBusy(false)});this.oDefaultDialog.close()}.bind(this)}),endButton:new sap.m.Button({text:"Close",press:function(){this.oDefaultDialog.close()}.bind(this)})});this.getView().addDependent(this.oDefaultDialog)}this.oDefaultDialog.open()},onSelectChange:async function(e){debugger;var r=this.byId("myTable");n=this.getOwnerComponent().getManifestObject()._oBaseUri._string;var a=e.getSource().getSelectedKey();var o=this.getView().getModel().bindContext("/getDynamicCol(...)");o.setParameter("sName",`${a}`);await o.execute();var s=o.getBoundContext().getValue().value;s=JSON.parse(s);r.destroyColumns();r.destroyItems();function l(e){var t=e.toLowerCase().replace(/\b\w/g,function(e){return e.toUpperCase()});t=t.replace(/_/g," ");return t}for(let e=0;e<s.length;e++){debugger;r.addColumn(new sap.m.Column({hAlign:"Center",header:new sap.m.Text({text:`${l(s[e])}`})}))}r.addColumn(new sap.m.Column({styleClass:"lastColumn",hAlign:"Center",header:new sap.m.Text({text:``})}));r.bindItems({path:`/${a}`,template:new sap.m.ColumnListItem({cells:[...s.map(function(e){return new sap.m.Input({value:`{${e}}`,tooltip:`{${e}}`,textAlign:"Center",editable:false}).addStyleClass("inputClass")}),new sap.m.HBox({justifyContent:"SpaceBetween",width:"100px",items:[new sap.m.Button({text:"Modify",press:function(e){debugger;let t=e.getSource().getText();let r=e.getSource().getParent().getParent().getCells();if(t=="Modify"){e.getSource().setText("Save");e.getSource().getParent().getParent().addStyleClass("selectedColumnList");for(let e=0;e<r.length-1;e++){r[e].setEditable(true)}}else if(t=="Save"){e.getSource().setText("Modify");e.getSource().getParent().getParent().removeStyleClass("selectedColumnList");for(let e=0;e<r.length-1;e++){r[e].setEditable(false)}}}}),new sap.ui.core.Icon({src:"sap-icon://delete",press:function(e){debugger;var r=e.getSource().getParent().getParent();var a=r.getBindingContext();new t.confirm("Are you sure you want to delete?",{title:"Confirmation",onClose:function(e){debugger;if(e===t.Action.OK){debugger;a.delete().then(function(){debugger;t.alert("Deleted Successfully",{icon:t.Icon.SUCCESS,title:"Success"})},function(e){debugger;t.alert("Could not delete Sales Order: "+e.message,{icon:t.Icon.ERROR,title:"Error"})})}}})}}).addStyleClass("deleteIcon")]})]})});var i=e.getSource().getModel();var g="/Default_master";i.read(g,{success:function(e){debugger;console.log(e)},error:function(e){debugger;console.error("Error reading data:",e)}})},onExcelUpload:function(e){debugger;var t=e.getParameter("files")[0];var r=this.byId("myTable");if(t){var a=new FileReader;a.onload=function(e){debugger;var t=e.target.result;var r=XLSX.read(t,{type:"array"});var a=r.SheetNames[0];var o=r.Sheets[a];var n=XLSX.utils.sheet_to_json(o);console.log(n)};debugger;a.readAsArrayBuffer(t)}},onExcelExport:function(e){debugger;var t=this.byId("myTable");var r=t.getBinding("items").getContexts();var n=t.getColumns();var s=[];var l=[];for(let e=0;e<n.length-1;e++){s.push({label:`${n[e].getHeader().getText()}`,type:o.String,property:`${n[e].getHeader().getText()}`,scale:0})}for(let e=0;e<r.length;e++){var i=0;var g={};let t=r[e].getObject();for(var u in t){g[s[i].property]=`${t[u]??""}`;i++}l.push(g)}debugger;var d={workbook:{columns:s,hierarchyLevel:"Level"},dataSource:l,fileName:`${this.byId("selectitems").getSelectedKey()}.xlsx`};var c=new a(d);c.build().finally(function(){debugger;c.destroy()})}})});
//# sourceMappingURL=MasterView.controller.js.map