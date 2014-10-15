angular.module('ngHue').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/lightSelect.html',
    "<accordion>\n" +
    "  <accordion-group data-ng-repeat='light in lights'>\n" +
    "    <accordion-heading>{{light.name}}\n" +
    "\n" +
    "    <i class='fa fa-lightbulb-o pull-right' ng-class=\"{'light-on': light.state.on, 'light-unreachable': !light.state.reachable}\"></i>\n" +
    "  </accordion-heading>\n" +
    "    <div class=\"row\">\n" +
    "      <div class=\"col-sm-12 col-md-2 pull-right\">\n" +
    "        <div class=\"onoffswitch\" ng-click=\"toggleState($index, light)\">\n" +
    "          <input\n" +
    "            type=\"checkbox\"\n" +
    "            name=\"onoffswitch\"\n" +
    "            class=\"onoffswitch-checkbox\"\n" +
    "            ng-checked=\"light.state.on\"\n" +
    "          />\n" +
    "          <label class=\"onoffswitch-label\" for=\"myonoffswitch\">\n" +
    "            <span class=\"onoffswitch-inner\"></span>\n" +
    "            <span class=\"onoffswitch-switch\"></span>\n" +
    "          </label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-sm-12 col-md-10\">\n" +
    "        <div class=\"row\">\n" +
    "          <div class=\"col-xs-12\">\n" +
    "            <div>\n" +
    "              <label>Brightness</label>\n" +
    "              <input \n" +
    "                type=\"number\" \n" +
    "                class=\"form-control\" \n" +
    "                ng-model=\"light.state.bri\"\n" +
    "                ng-change=\"updateBrightness($index, light.state.bri)\"\n" +
    "              />\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </accordion-group>\n" +
    "</accordion>\n"
  );

}]);
