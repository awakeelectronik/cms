/*global angular:true*/

var categoriesCRUDController = function (commonUtilitiesSrv,contentSrv,commonModalSrv,contentFact){
    var vm = this;
    vm.publish = function(category){
        if(category.state && category.state == "approved"){
            commonModalSrv.confirmModal("Despublicar", "¿Despublicar esta categoría?","md")
            .then(() => contentSrv.updateCategoryState(category.$id,{"state":"disapproved"}))
            .then(() => {
                category.state = "disapproved";
                vm.alertCategory = {
                    type: "success",
                    message: "Categoría despublicada satisfactoriamente"
                };
            })
            .catch(() => {
                vm.alertCategory = {
                    type: "warning",
                    message: "Operación cancelada"
                };
            });  
        } else {
            commonModalSrv.confirmModal("Publicar", "¿Publicar esta categoría?","md")
            .then(() => contentSrv.updateCategoryState(category.$id,{"state":"approved"}))
            .then(() => {
                category.state = "approved";
                vm.alertCategory = {
                    type: "success",
                    message: "Categoría publicada satisfactoriamente"
                };
            })
            .catch(() => {
                vm.alertCategory = {
                    type: "warning",
                    message: "Operación cancelada"
                };
            }); 
        }
    };
    vm.findCategories = function() {
      contentSrv.loadCategories()
      .then((categoriesData) => {
          vm.categoriesData = categoriesData.categories;
      });
    };
    vm.loadCategories = function() {
        vm.findCategories();
    };
    vm.edit = function(category){
        vm.isOpenEdit = true;
        contentFact.getCategory(category.$id)
            .then((newCategory) => {
                vm.category = newCategory;
            });
    };
    vm.updateCategory = function(){
        vm.category.$save()
        .then(() => {
            vm.alertCategory = {
                type: "success",
                message: "Categoría actualizada satisfactoriamente"
            };
            vm.isOpenEdit = false;
        })
        .catch(() => {
            vm.alertCategory = {
                type: "warning",
                message: "Operación cancelada"
            };
            vm.isOpenEdit = false;
        });
    };
    vm.deleteCategory = function(category){
        contentSrv.deleteCategory(category.$id)
            .then(() => {
                vm.alertCategory = {
                    type: "success",
                    message: "Categoría eliminada satisfactoriamente"
                };
            })
            .catch(() => {
                vm.alertCategory = {
                    type: "warning",
                    message: "Operación cancelada"
                };
            });
    };
    vm.addCategory = function(){
        contentSrv.saveCategory(vm.nameCategory)
        .then(() => {
            vm.isOpen = false;
        });
    };
    vm.loadCategories();
};
categoriesCRUDController.$inject = ["commonUtilitiesSrv","contentSrv","commonModalSrv","contentFact"];
angular.module("publisher").controller("categoriesCRUDController",categoriesCRUDController);