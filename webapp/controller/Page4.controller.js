sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "./utilities",
    "sap/ui/core/routing/History"
    ], function(BaseController, MessageBox, Utilities, History) {
    "use strict";

    return BaseController.extend("generated.app.controller.Page4", {
    handleRouteMatched: function (oEvent) {
            		
		var oParams = {}; 
		
		if (oEvent.mParameters.data.context) { 
		    this.sContext = oEvent.mParameters.data.context;
		    var oPath; 
		    if (this.sContext) { 
		        oPath = {path: "/" + this.sContext, parameters: oParams}; 
		        this.getView().bindObject(oPath);
		    } 
		}
		
		
        },
_onPageNavButtonPress: function () {
            		
		var oHistory = History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();
		var oQueryParams = this.getQueryParameters(window.location);
		
		if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
		    window.history.go(-1);
		} else {
		    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		    oRouter.navTo("default", true);
		}
        },
getQueryParameters: function (oLocation) {
            		
		var oQuery = {};
		var aParams = oLocation.search.substring(1).split("&");
		for (var i = 0; i < aParams.length; i++) {
		    var aPair = aParams[i].split("=");
		    oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
		}
		return oQuery;
		
        },
_onSearchFieldLiveChange: function (oEvent) {
            		var sControlId = "sap_Responsive_Page_0-content-sap_m_List-1499950890403";
		var oControl = this.getView().byId(sControlId);
		
		// Get the search query, regardless of the triggered event ('query' for the search event, 'newValue' for the liveChange one).
		var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue");
		var sSourceId = oEvent.getSource().getId();
		
		return new ES6Promise.Promise(function(fnResolve, fnReject) {
		    var aFinalFilters = [];
		    
		
		    var aFilters = [];
		    // 1) Search filters (with OR)
		    if (sQuery && sQuery.length > 0) {
		        
		                aFilters.push(new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sQuery));
		            
		                var iQuery = parseFloat(sQuery);
		                if (!isNaN(iQuery)) {
		                    aFilters.push(new sap.ui.model.Filter("Period", sap.ui.model.FilterOperator.EQ, sQuery));
		                }
		            
		                aFilters.push(new sap.ui.model.Filter("clrdocno", sap.ui.model.FilterOperator.Contains, sQuery));
		            
		                var iQuery = parseFloat(sQuery);
		                if (!isNaN(iQuery)) {
		                    aFilters.push(new sap.ui.model.Filter("salesA", sap.ui.model.FilterOperator.EQ, sQuery));
		                }
		            
		                var iQuery = parseFloat(sQuery);
		                if (!isNaN(iQuery)) {
		                    aFilters.push(new sap.ui.model.Filter("discountPerc", sap.ui.model.FilterOperator.EQ, sQuery));
		                }
		            
		                var iQuery = parseFloat(sQuery);
		                if (!isNaN(iQuery)) {
		                    aFilters.push(new sap.ui.model.Filter("Discount", sap.ui.model.FilterOperator.EQ, sQuery));
		                }
		            
		                var iQuery = parseFloat(sQuery);
		                if (!isNaN(iQuery)) {
		                    aFilters.push(new sap.ui.model.Filter("Payment", sap.ui.model.FilterOperator.EQ, sQuery));
		                }
		            
		                aFilters.push(new sap.ui.model.Filter("PDescryption", sap.ui.model.FilterOperator.Contains, sQuery));
		            
		                aFilters.push(new sap.ui.model.Filter("Days", sap.ui.model.FilterOperator.Contains, sQuery));
		            
		                var iQuery = parseFloat(sQuery);
		                if (!isNaN(iQuery)) {
		                    aFilters.push(new sap.ui.model.Filter("paycalcu", sap.ui.model.FilterOperator.EQ, sQuery));
		                }
		            
		    }
		
		    var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, false)] : [];
		    var oBindingOptions = this.updateBindingOptions(sControlId, {filters: aFinalFilters}, sSourceId);
		    var oBindingInfo = oControl.getBindingInfo("items");
		    oControl.bindAggregation("items", {
		        model: oBindingInfo.model,
		        path: oBindingInfo.path,
		        template: oBindingInfo.template,
		        sorter: oBindingOptions.sorters,
		        filters: oBindingOptions.filters
		    });
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
updateBindingOptions: function (sCollectionId, oBindingData, sSourceId) {
            		this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};
		
		var aSorters = oBindingData.sorters === undefined ? this.mBindingOptions[sCollectionId].sorters : oBindingData.sorters;
		var oGroupby = oBindingData.groupby === undefined ? this.mBindingOptions[sCollectionId].groupby : oBindingData.groupby;
		
		// 1) Update the filters map for the given collection and source
		this.mBindingOptions[sCollectionId].sorters = aSorters;
		this.mBindingOptions[sCollectionId].groupby = oGroupby;
		this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
		this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
		
		// 2) Reapply all the filters and sorters
		var aFilters = [];
		for (var key in this.mBindingOptions[sCollectionId].filters) {
		    aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
		}
		
		// Add the groupby first in the sorters array
		if (oGroupby) {
		    aSorters = aSorters ? [oGroupby].concat(aSorters) : [oGroupby];
		}
		
		var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
		return {filters: aFinalFilters, sorters: aSorters};
		
        },
_onObjectListItemPress: function (oEvent) {
            		
		var sPopoverName = "Popover1";
		this.mPopovers = this.mPopovers || {};
		var oPopover = this.mPopovers[sPopoverName];
		var oSource = oEvent.getSource();
		var oBindingContext = oSource.getBindingContext();
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oView;
		if (!oPopover) {
		    this.getOwnerComponent().runAsOwner(function () {
		        oView = sap.ui.xmlview({viewName: "generated.app.view." + sPopoverName});
		        this.getView().addDependent(oView);
		        oView.getController().setRouter(this.oRouter);
		        oPopover = oView.getContent()[0];
		        oPopover.setPlacement("Auto");
		        this.mPopovers[sPopoverName] = oPopover;
		    }.bind(this));
		}
		
		return new ES6Promise.Promise(function (fnResolve, fnReject) {
		    oPopover.attachEventOnce("afterOpen", null, fnResolve);
		    oPopover.openBy(oSource);
		    if (oView) {
		        oPopover.attachAfterOpen(function () {
		            oPopover.rerender();
		        });
		    } else {
		        oView = oPopover.getParent();
		    }
		    
		    var oModel = this.getView().getModel();
		    if (oModel) {
		        oView.setModel(oModel);
		    }
		    if (sPath) {
		        var oParams = oView.getController().getBindingParameters();
		        oView.bindObject({path: sPath, parameters: oParams});
		    }
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
_onButtonPress4: function (oEvent) {
            		
		var oBindingContext = oEvent.getSource().getBindingContext(); 
		
		return new ES6Promise.Promise(function(fnResolve, fnReject) {
		
		    this.doNavigate("page_2", oBindingContext, fnResolve, ""
		    );
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
doNavigate: function (sRouteName, oBindingContext, fnPromiseResolve, sViaRelation) {
            		
		var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
		var oModel = (oBindingContext) ? oBindingContext.getModel() : null;
		
		var sEntityNameSet;
		if (sPath !== null && sPath !== "") {
		    if (sPath.substring(0, 1) === "/") {
		        sPath = sPath.substring(1);
		    }
		    sEntityNameSet = sPath.split("(")[0];
		}
		var sNavigationPropertyName;
		var sMasterContext = this.sMasterContext ? this.sMasterContext : sPath;
		
		if (sEntityNameSet !== null) {
		    sNavigationPropertyName = sViaRelation || this.getOwnerComponent().getNavigationPropertyForNavigationWithContext(sEntityNameSet, sRouteName);
		}
		if (sNavigationPropertyName !== null && sNavigationPropertyName !== undefined) {
		    if (sNavigationPropertyName === "") {
		        this.oRouter.navTo(sRouteName, {
		            context: sPath,
		            masterContext: sMasterContext
		        }, false);
		    } else {
		        oModel.createBindingContext(sNavigationPropertyName, oBindingContext, null, function (bindingContext) {
		            if (bindingContext) {
		                sPath = bindingContext.getPath();
		                if (sPath.substring(0, 1) === "/") {
		                    sPath = sPath.substring(1);
		                }
		            }
		            else {
		                sPath = "undefined";
		            }
		
		            // If the navigation is a 1-n, sPath would be "undefined" as this is not supported in Build
		            if (sPath === "undefined") {
		                this.oRouter.navTo(sRouteName);
		            } else {
		                this.oRouter.navTo(sRouteName, {
		                    context: sPath,
		                    masterContext: sMasterContext
		                }, false);
		            }
		        }.bind(this));
		    }
		} else {
		    this.oRouter.navTo(sRouteName);
		}
		
		if (typeof fnPromiseResolve === "function") {
		    fnPromiseResolve();
		}
        },
_onButtonPress5: function (oEvent) {
            		
		var oBindingContext = oEvent.getSource().getBindingContext(); 
		
		return new ES6Promise.Promise(function(fnResolve, fnReject) {
		
		    this.doNavigate("Page5", oBindingContext, fnResolve, ""
		    );
		}.bind(this)).catch(function (err) { if (err !== undefined) { MessageBox.error(err.message); }});
		
        },
_onButtonPress6: function () {
            		
		var oHistory = History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();
		var oQueryParams = this.getQueryParameters(window.location);
		
		if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
		    window.history.go(-1);
		} else {
		    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		    oRouter.navTo("default", true);
		}
        },
onInit: function () {
            		
        this.mBindingOptions = {};
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.oRouter.getTarget("Page4").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));


        }
});
}, /* bExport= */true);
