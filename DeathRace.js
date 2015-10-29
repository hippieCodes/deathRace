(function (wisp) {
    'use strict';
    /**
     * Holds all the private methods so that they can be addressed as one and thus
     * we can have a reference of them from a property in our scratchable class.
     * @private
     */
    var privates = {
        createWhatever: function (id) {

        },

        finalizeDeathRace: function (instance) {

        },
    }
    /**
     * Constructs Scrachable Object
     * @param {!Object} settings The settings object for the module which contains necessary values for the ad to run.
     */
    var DeathRace = function (settings) {
        /**
         * Random id for the module instance, could also be an incremented id if you are less lazy
         * @type {string}
         */
        this.id = String(Math.floor(Math.random() * 1000000000)).substring(2, 11);
        /**
         * The id of the html element that should be used as a container
         * @type {string}
         */
        this.containerElementId = null;

    };

    /**
     * Public constructor
     * @param {!Object} settings The object which contains the necessary value for the ad to run.
     * @returns {Object}
     * @constructor
     */
    wisp.DeathRace = function (settings) {
        return new DeathRace(settings);
    };
    /**
     * Public method to be called to prepare the ad
     */
    Scratchable.prototype.anyPublicMethodToCall = function () {

    };

}(window.wisp = window.wisp || {}));
