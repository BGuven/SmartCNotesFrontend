'use strict';

angular.module("addTemplatePlan", [
  ]).directive("addTemplatePlan", function ($rootScope) {
    return {
      restrict: "E",
      replace: true,
      templateUrl: "scripts/directives/create_template.tpl.html",
      scope: {
        plan: "@",
        text: '='
      },
      link: function (scope, element, attrs) {
        console.log(scope.plan);
        $rootScope.$on('add', function(e, val) {
          var domElement = element[0];

          if (document.selection) {
            domElement.focus();
            var sel = document.selection.createRange();
            sel.text = val;
            domElement.focus();
          } else if (domElement.selectionStart || domElement.selectionStart === 0) {
            var startPos = domElement.selectionStart;
            var endPos = domElement.selectionEnd;
            var scrollTop = domElement.scrollTop;
            domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
            domElement.focus();
            domElement.selectionStart = startPos + val.length;
            domElement.selectionEnd = startPos + val.length;
            domElement.scrollTop = scrollTop;
          } else {
            domElement.value += val;
            domElement.focus();
          }
        });
      }
    };
  });