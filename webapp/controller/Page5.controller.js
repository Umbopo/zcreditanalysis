sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "./utilities",
    "sap/ui/core/routing/History"
    ], function(BaseController, MessageBox, Utilities, History) {
    "use strict";

    return BaseController.extend("generated.app.controller.Page5", {
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
_onButtonPress: function () {
            		
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
onInit: function () {
            		
        this.mBindingOptions = {};
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.oRouter.getTarget("Page5").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

        var oView = this.getView();
        var oModel = new sap.ui.model.json.JSONModel();
        oView.setModel(oModel, "staticDataModel");
        function dateDimensionFormatter(dimensionValue) {
            if(dimensionValue instanceof Date) {
                var oFormat = sap.ui.core.format.DateFormat.getDateInstance({style: "short"});
            	return oFormat.format(dimensionValue);
            }
            return dimensionValue;
        }
    
        var oData = [{"dim0":"India","mea0":"296"},{"dim0":"Canada","mea0":"133"},{"dim0":"USA","mea0":"489"},{"dim0":"Japan","mea0":"270"},{"dim0":"Germany","mea0":"350"}];
        oView.getModel("staticDataModel").setData({"sap_Responsive_Page_0-content-sap_m_Panel-1500017631983-content-sap_chart_ColumnChart-1500017645865":oData}, true);
        this.oBindingParameters = {"path":"/listySet","parameters":{}};
        oView.byId("sap_Responsive_Page_0-content-sap_m_Panel-1500017631983-content-sap_chart_ColumnChart-1500017645865").bindData(this.oBindingParameters);
        var aDimensions = oView.byId("sap_Responsive_Page_0-content-sap_m_Panel-1500017631983-content-sap_chart_ColumnChart-1500017645865").getDimensions();
        aDimensions.forEach(function(oDimension) {
            oDimension.setTextFormatter(dateDimensionFormatter);
        });
    
        var oData = [{"dim0":"Week 1 - 4","mea0":24800.63,"mea1":205199.37},{"dim0":"Week 5 - 8","mea0":99200.39,"mea1":138799.61},{"dim0":"Week 9 - 12","mea0":70200.54,"mea1":150799.46},{"dim0":"Week 13 - 16","mea0":158800.73,"mea1":121199.27},{"dim0":"Week 17 - 20","mea0":140000.91,"mea1":89999.09},{"dim0":"Week 21 - 24","mea0":172800.15,"mea1":77199.85},{"dim0":"Week 25 - 28","mea0":237200.74,"mea1":87799.26},{"dim0":"Week 29 - 32","mea0":243200.18,"mea1":106799.82},{"dim0":"Week 33 - 37","mea0":280800.24,"mea1":109199.76},{"dim0":"Week 38 - 42","mea0":320000.08,"mea1":129999.92},{"dim0":"Week 43 - 47","mea0":360800.09,"mea1":119199.91},{"dim0":"Week 47 - 52","mea0":403200.08,"mea1":156799.92}];
        oView.getModel("staticDataModel").setData({"sap_Responsive_Page_0-content-sap_m_Panel-1500017963248-content-sap_chart_StackedColumnChart-1500017988237":oData}, true);
        this.oBindingParameters = {"path":"/listySet","parameters":{}};
        oView.byId("sap_Responsive_Page_0-content-sap_m_Panel-1500017963248-content-sap_chart_StackedColumnChart-1500017988237").bindData(this.oBindingParameters);
        var aDimensions = oView.byId("sap_Responsive_Page_0-content-sap_m_Panel-1500017963248-content-sap_chart_StackedColumnChart-1500017988237").getDimensions();
        aDimensions.forEach(function(oDimension) {
            oDimension.setTextFormatter(dateDimensionFormatter);
        });
    


        },
onAfterRendering: function () {
            		
        var oBindingParameters;
        
        oBindingParameters = {"path":"/listySet","parameters":{}};
        this.getView().byId("sap_Responsive_Page_0-content-sap_m_Panel-1500017631983-content-sap_chart_ColumnChart-1500017645865").bindData(oBindingParameters);
        oBindingParameters = {"path":"/listySet","parameters":{}};
        this.getView().byId("sap_Responsive_Page_0-content-sap_m_Panel-1500017963248-content-sap_chart_StackedColumnChart-1500017988237").bindData(oBindingParameters);


        var oBindingData, aPropertyFilters, oBindingOptions;
        
        oBindingData = {};
        
        
        
        oBindingData.sorters = [];
        
        oBindingData.sorters.push(new sap.ui.model.Sorter("Period", false, false));
        
        oBindingOptions = this.updateBindingOptions("sap_Responsive_Page_0-content-sap_m_Panel-1500017631983-content-sap_chart_ColumnChart-1500017645865", oBindingData);
        var oBindingInfo = this.getView().byId("sap_Responsive_Page_0-content-sap_m_Panel-1500017631983-content-sap_chart_ColumnChart-1500017645865").getBindingInfo("data");
        this.getView().byId("sap_Responsive_Page_0-content-sap_m_Panel-1500017631983-content-sap_chart_ColumnChart-1500017645865").bindAggregation("data", {
            model: oBindingInfo.model,
            path: oBindingInfo.path,
            template: oBindingInfo.template,
            sorter: oBindingOptions.sorters,
            filters: oBindingOptions.filters
        }); 


        }
});
}, /* bExport= */true);
