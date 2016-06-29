'use strict';

angular.module('liveChart')

.service('TemperatureService', function(Restangular) {

    var getAll = function() {
        return Restangular.one('temperature').get();
    };

    return {
        getAll: getAll
    };
});
