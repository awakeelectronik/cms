/*global angular:true*/
/*global moment:true*/

var commonUtilitiesSrv = function() {
    var responseCommonUtilitiesSrv = {
        getDateOptions : function(){
            return {
                format: "dd/MM/yyyy",
                formatYear: "yy",
                startingDay: 1,
                language: "es",
                minDate: moment("01-01-1917", "MM-DD-YYYY"),
                maxDate: moment(),
            };
        },
        rangeYears : function(){
            return {
                minYear: 2017,
                maxYear: moment().year()
            };
        },
        getDateOptionsToFuture : function() {
            return {
                format: "dd/MM/yyyy",
                formatYear: "yy",
                startingDay: 1,
                language: "es",
                minDate: moment().valueOf(),
                maxDate: moment().add("year", 10).valueOf()
            };
        },
        getMonthsArray : function (){
            const months = [
                {CODE:"01", NAME: "Enero",NUMBER: 0, SHORTNAME:"Ene"},
                {CODE:"02", NAME: "Febrero", NUMBER: 1, SHORTNAME:"Feb"},
                {CODE:"03", NAME: "Marzo", NUMBER: 2, SHORTNAME:"Mar"},
                {CODE:"04", NAME: "Abril", NUMBER: 3, SHORTNAME:"Abr"},
                {CODE:"05", NAME: "Mayo", NUMBER: 4, SHORTNAME:"May"},
                {CODE:"06", NAME: "Junio", NUMBER: 5, SHORTNAME:"Jun"},
                {CODE:"07", NAME: "Julio", NUMBER: 6, SHORTNAME:"Jul"},
                {CODE:"08", NAME: "Agosto", NUMBER: 7, SHORTNAME:"Ago"},
                {CODE:"09", NAME: "Septiembre", NUMBER: 8, SHORTNAME:"Sep"},
                {CODE:"10", NAME: "Octubre", NUMBER: 9, SHORTNAME:"Oct"},
                {CODE:"11", NAME: "Noviembre", NUMBER: 10, SHORTNAME:"Nov"},
                {CODE:"12", NAME: "Diciembre", NUMBER: 11, SHORTNAME:"Dic"}];
            return months;
        },
        getYearsArray : function (initialDate, endData){
            const finalDate = endData || parseInt(moment().format("YYYY"), 10) + 1;
            var yearsArray = [];
            for(var iterator = initialDate; iterator <= finalDate; iterator += 1){
                yearsArray.push({
                    CODE: iterator,
                    NAME: iterator.toString(),
                });
            }
            return yearsArray;
        },
        yearNow :function (){
            return{
                CODE: moment().year(),
                NAME: moment().format("YYYY")
            };
        },
        monthNow: function (){
            var month = {
                NUMBER: moment().month(),
                CODE: moment().format("MM")
            };
            month.NAME = responseCommonUtilitiesSrv.getMonthsArray()[month.NUMBER].NAME;
            return month;
        },
        getRangeFromMonth : function(month, year){
            const timeFilter = moment(year+"-"+month+"-01").valueOf();
            var range = {
                min: moment(timeFilter).startOf("month"),
                minTime: moment(timeFilter).startOf("month").valueOf(),
                max: moment(timeFilter).endOf("month"),
                maxTime: moment(timeFilter).endOf("month").valueOf()
            };
            return range;
        },
        numberPages: function(quantityElements, pageSizeItems) {
          return Math.ceil(quantityElements / pageSizeItems);
        },
        decimalSearch: function(data) {
          if (data % 1 == 0) {
            return 1;
          }
            return 0;
          
        },
        getSaveDateFormat: function(date) {
            return Math.round(new Date(date).getTime() * 1000.0);
        },
        getValidationMin : function(message) {
          return {
            expressions : {
              minValue: (value, scope, element, attrs, param) => Number(value) >= Number(param)
            },
            messages : {
              minValue : {
                error: message,
                success: ""
              }
            }
          };
        },
        getValidationMax : function(message) {
          return {
            expressions : {
              maxValue: (value, scope, element, attrs, param) => Number(value) <= Number(param)
            },
            messages : {
              maxValue : {
                error: message,
                success: ""
              }
            }
          };
        }
    };
    return responseCommonUtilitiesSrv;
};
commonUtilitiesSrv.$inject = [];
angular.module("common").factory("commonUtilitiesSrv",commonUtilitiesSrv);