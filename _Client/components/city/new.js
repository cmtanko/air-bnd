(function (module) {
    function OnsiteService () {
        let self = this;
        const libUuid = require("vendor/uuid");

        const TAP_MODE = {
            IN: 1,
            OUT: 0,
            FAILED: -1
        };

        self.isUserIn = isUserIn;
        self.tapUserIn = tapUserIn;
        self.tapUserOut = tapUserOut;
        self.registerQRScan = registerQRScan;
        self.getAccessPoint = getAccessPoint;
        self.registerAccessPoint = registerAccessPoint;

        function getNetworkController () {
            return Alloy.Globals.Services.getService("networkcontroller");
        }

        /**
         * TAP USER IN/OUT IN GIVEN AREA
         * @param {String} areaId
         * @param {String} userId
         * @returns
         */
        function registerQRScan (areaId, userId) {
            return new Promise((resolve, reject) => {
                getAccessPoint(areaId)
                    .then((res) => {
                        const accessPointId = res.id;

                        isUserIn(areaId, userId)
                            .then((isUserIn) => {
                                if (isUserIn) {
                                    tapUserOut(accessPointId, userId)
                                        .then((res) => {
                                            if (res.data.is_access_denied) {
                                                resolve({ message: res.data.access_denied_reason, mode: TAP_MODE.FAILED });
                                            }
                                            resolve({ message: "Tapped Out", mode: TAP_MODE.OUT });
                                        })
                                        .catch((err) => {
                                            reject(err);
                                        });
                                } else {
                                    tapUserIn(accessPointId, userId)
                                        .then((res) => {
                                            if (res.data.is_access_denied) {
                                                resolve({ message: res.data.access_denied_reason, mode: TAP_MODE.FAILED });
                                            }
                                            resolve({ message: "Tapped In", mode: TAP_MODE.IN });
                                        })
                                        .catch((err) => {
                                            reject(err);
                                        });
                                }
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }

        /**
         * RETURNS IF THE USER HAS ALREADY TAPPED IN OR NOT
         * @param {String} areaId
         * @param {String} userId
         * @returns
         */
        function isUserIn (areaId, userId) {
            const networkController = getNetworkController();
            Alloy.Globals.LogManager.info(`[ONSITE] Retriving tapped infor for user ${userId} in area ${areaId}`);

            return new Promise((resolve, reject) => {
                networkController
                    .fetch(`/intranet/api/v1/areas/${areaId}/userstatus`)
                    .then((result) => {
                        const { data } = result;

                        const userEventInfo = data.find((e) => e.userId === userId);

                        if (userEventInfo) {
                            Alloy.Globals.LogManager.info(`[ONSITE] User ${userId} tapped info: ${JSON.stringify(userEventInfo)}`);
                            resolve(userEventInfo.inArea);
                        } else {
                            // NO PREVIOUS EVENT LOG AVAILABLE, SAY FOR FIRST USERS
                            Alloy.Globals.LogManager.error(`[ONSITE] Unable to retrieve user ${userId} tapped information for area ${areaId}`);
                            resolve(false);
                        }
                    })
                    .catch(() => {
                        Alloy.Globals.LogManager.error(`[ONSITE] Unable to retrieve tapped information for area ${areaId}`);
                        reject(`Unable to retrieve tapped information for area ${areaId}`);
                    });
            });
        }

        /**
         * TAP USER INTO THE SITE
         * @param {String} accessPointId
         * @param {String} userId
         * @returns
         */
        function tapUserIn (accessPointId, userId) {
            const networkController = getNetworkController();
            return new Promise((resolve, reject) => {
                networkController
                    .post(
                        `/intranet/api/v1/accesspoints/${accessPointId}/enter`,
                        {
                            uuid: libUuid.v4(),
                            timestamp: Alloy.Globals.moment().format(),
                            user: userId
                        },
                        {
                            method: "POST"
                        },
                        true
                    )
                    .then((result) => {
                        Alloy.Globals.LogManager.info(`[ONSITE] Tapped user ${userId} in`);

                        resolve(result);
                    })
                    .catch(() => {
                        Alloy.Globals.LogManager.error(`[ONSITE] Unable to tap user ${userId} in`);
                        reject("Unable to tap user ${userId} in");
                    });
            });
        }

        /**
         * TAP USER OUT OF THE SITE
         * @param {String} accessPointId
         * @param {String} userId
         * @returns
         */
        function tapUserOut (accessPointId, userId) {
            const networkController = getNetworkController();

            return new Promise((resolve, reject) => {
                networkController
                    .post(
                        `/intranet/api/v1/accesspoints/${accessPointId}/exit`,
                        {
                            uuid: libUuid.v4(),
                            timestamp: Alloy.Globals.moment().format(),
                            user: userId
                        },
                        {
                            method: "POST"
                        },
                        true
                    )
                    .then((result) => {
                        Alloy.Globals.LogManager.info(`[ONSITE] Tapped user ${userId} out`);

                        resolve(result);
                    })
                    .catch(() => {
                        Alloy.Globals.LogManager.error(`[ONSITE] Unable to tap user ${userId} out`);
                        reject("Unable to tap user ${userId} out");
                    });
            });
        }

        /**
         * GET QR CODE ACCESS POINT FOR GIVEN AREAID
         * @param {String} areaId
         * @returns promise
         */
        function getAccessPoint (areaId) {
            Alloy.Globals.LogManager.info(`[ONSITE] Get Access point for area ${areaId}`);

            const networkController = getNetworkController();

            return new Promise((resolve, reject) => {
                networkController
                    .fetch(`/intranet/api/v1/areas/${areaId}`)
                    .then((result) => {
                        let accessPoints =
              (result &&
                result.data &&
                result.data.accessPoints &&
                result.data.accessPoints.data) ||
              [];
                        let qrAccessPoint = accessPoints.find((ap) => ap.name === "QR Access Point");

                        if (qrAccessPoint) {
                            Alloy.Globals.LogManager.info(`[ONSITE] Access Point = ${qrAccessPoint.id}`);
                            resolve(qrAccessPoint);
                        } else {
                            // REGISTER AN ACCESS POINT FOR THAT AREA
                            Alloy.Globals.LogManager.error(`[ONSITE] No QR Code Access Point available for area ${areaId}`);

                            registerAccessPoint(areaId)
                                .then((res) => {
                                    Alloy.Globals.LogManager.info(`[ONSITE] Access Point = ${res.data.id}`);
                                    resolve(res.data);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        }
                    })
                    .catch((error) => {
                        Alloy.Globals.LogManager.error(`[ONSITE] Unable to retrieve area ${areaId}`);

                        reject(`Unable to retrieve area ${areaId}`);
                    });
            });
        }

        /**
         * REGISTER A NEW ACCESS POINT FOR GIVEN AREA
         * @param {String} areaId
         */
        function registerAccessPoint (areaId) {
            const networkController = getNetworkController();
            Alloy.Globals.LogManager.info(`[ONSITE] Registering new access point for area ${areaId}`);

            return new Promise((resolve, reject) => {
                networkController
                    .post(
                        `/intranet/api/v1/areas/${areaId}/accesspoints`,
                        {
                            deviceId: libUuid.v4(),
                            name: "QR Access Point",
                            description: "Access Point for QR Code entry"
                        },
                        {
                            method: "POST"
                        },
                        true
                    )
                    .then((result) => {
                        Alloy.Globals.LogManager.info(`[ONSITE] New Access point registered for area ${areaId}`);
                        resolve(result);
                    })
                    .catch(() => {
                        Alloy.Globals.LogManager.error(`[ONSITE] Unable to register an access point for area ${areaId}`);

                        reject(`Unable to register an access point for area ${areaId}`);
                    });
            });
        }
    }

    module.exports = new OnsiteService();
})(module);
