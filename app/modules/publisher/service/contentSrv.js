/*global angular:true*/
/*global firebase:true*/

var contentSrv = function($q, contentFact, commonImageSrv, commonUtilitiesSrv, commonUserSrv,commonImageFact) {
  var responseContentSrv = {
    loadCategories: function() {
      return $q((resolve, reject) => {
        var result = {};
        contentFact.getCategories()
          .then((categoriesData) => {
            result.categories = categoriesData;
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getContents: function(year, month) {
      var range = commonUtilitiesSrv.getRangeFromMonth(month, year);
      return $q((resolve, reject) => {
        contentFact.getContentsByMonth(range.minTime, range.maxTime)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getContentById: function(id){
      var result = {};
      return $q((resolve, reject) => {
        contentFact.getContentById(id)
        .then((content) => {
          result.content = content;
          if(content.typeTemplate==2 || content.typeTemplate==3)
            result.isThereVideo = true;
          if(content.typeTemplate==1 || content.typeTemplate==3)
            return commonImageFact.downloadImage("publisher/voz",id+".png");
          return null;
        })
        .then((url) => {
          result.image = url;
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    saveCategory: function(nameCategory) {
      const category = {
        creationDate: firebase.database.ServerValue.TIMESTAMP,
        nameCategory: nameCategory,
        state: "approved"
      };
      return $q((resolve, reject) => {
        contentFact.saveCategory(category)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    saveContent: function(typeTemplate, data, content, image) {
      if (typeTemplate == 0 || typeTemplate == 1)
        data.template = {video : ""};
      const insert = {
        body: {
          abstract: data.abstract,
          approvalDate: "Pendiente",
          creationDate: firebase.database.ServerValue.TIMESTAMP,
          idCategory: data.idCategory,
          state: 1,
          title: data.title,
          typeTemplate: typeTemplate,
          template: {
            texto: content,
            video: data.template.video
          }
        }
      };
      return $q((resolve, reject) => {
        contentFact.saveContent(insert)
          .then((key) => {
            if (typeTemplate == 1 || typeTemplate == 3) {
              commonImageSrv.saveImageBase64(key + ".png", image, "publisher/voz/");
            }
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateContent : function(content, fields){
      if(fields.approvalDate)fields.approvalDate = firebase.database.ServerValue.TIMESTAMP;
      else fields.approvalDate = "Pendiente";
      return $q((resolve, reject) => {
        contentFact.updateContent(content.$id, fields)
        .then(() => {
          if(fields.state==2)
            return responseContentSrv.publishContentMin(content);
          return responseContentSrv.deleteContentMin(content.$id);
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    updateCategoryState: function(idCategory, fields){
      return $q((resolve, reject) => {
        contentFact.updateCategory(idCategory, fields)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    deleteContentMin: function(idContent){
      return $q((resolve, reject) => {
        contentFact.deleteContentMin(idContent)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    deleteCategory: function(idCategory){
      return $q((resolve, reject) => {
        contentFact.deleteCategory(idCategory)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    publishContentMin: function(content){
      const insert = {
        id: content.$id,
        bodyMin: {
          abstract: content.abstract,
          creationDate: content.creationDate,
          idCategory: content.idCategory,
          title: content.title,
          typeTemplate: content.typeTemplate,
        }
      };
      return $q((resolve, reject) => {
        contentFact.saveContentMin(insert)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    arrayTemplates: ["templateOnlyText", "templateImageText", "templateVideoText", "templateImageVideoText"]
  };
  return responseContentSrv;
};
contentSrv.$inject = ["$q", "contentFact", "commonImageSrv", "commonUtilitiesSrv", "commonUserSrv","commonImageFact"];
angular.module("publisher").factory("contentSrv", contentSrv);