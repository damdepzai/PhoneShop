

export default {
    register(h) {
        const extendWith = {};

        /**
         * _.uuid
         *
         * Usage:
         *    _.uuid()
         * Produces:
         *    '9716498c-45df-47d2-8099-3f678446d776'
         *
         * Generates an RFC 4122 version 4 uuid
         * @see http://stackoverflow.com/a/8809472
         * @returns {String} the generated uuid
         */
        extendWith.uuid = function () {
            let d = h.now();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = (d + h.random(16)) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }

        /**
         * _.isUuid4
         *
         * Usage:
         *    _.isUuid4(_.uuid())
         * Produces:
         *    true|false
         *
         * Validates a version 4 uuid string
         * @param {String} uuid - the uuid under test
         * @returns {Boolean} true if the uuid under test is a valid uuid
         **/
        extendWith.isUuid4 = function (uuid) {
            const re = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            return re.test(uuid);
        }

        /**
         * _.isUuid
         *
         * Usage:
         *    _.isUuid(_.uuid())
         * Produces:
         *    true|false
         *
         * Validates any version uuid string
         * @param {String} uuid - the uuid under test
         * @returns {Boolean} true if the uuid under test is a valid uuid
         **/
        extendWith.isUuid = function (uuid) {
            const re = /^([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)$/i;
            return re.test(uuid);
        }

        return extendWith
    }
}
