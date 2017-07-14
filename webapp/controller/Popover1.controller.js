sap.ui.define(["sap/ui/core/mvc/Controller"], function(BaseController) {
	"use strict";

	return BaseController.extend("generated.app.controller.Popover1", {

    onInit: function() {
        this.mBindingOptions = {};
        this._oDialog = this.getView().getContent()[0];
    },
    onExit: function() {
        this._oDialog.destroy();
    },
    setRouter: function(oRouter) {
        this.oRouter = oRouter;
    },
getBindingParameters: function () {
            		return {};
		
        },
_onButtonPress1: function () {
            		
		alert("Feature not supported yet");
		
        },
_onButtonPress2: function () {
            		var oDialog = this.getView().getContent()[0];
		
		return new ES6Promise.Promise(function (fnResolve, fnReject) {
		    oDialog.attachEventOnce("afterClose", null, fnResolve);
		    oDialog.close();
		});
		
        }
    });
}, /* bExport= */true);
