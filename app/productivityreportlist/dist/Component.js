sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","productivityreportlist/model/models"],function(t,e,i){"use strict";return t.extend("productivityreportlist.Component",{metadata:{manifest:"json"},init:function(){t.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(i.createDeviceModel(),"device")}})});
//# sourceMappingURL=Component.js.map