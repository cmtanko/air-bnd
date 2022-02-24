(function (args, $, exports) {
    args = args[0] || {};

    function FormAddController (args) {
        let self = this;
        let formSource = args.source;
        let moment = Alloy.Globals.moment;
        let nav = Alloy.Globals.Services.getService("navigation");
        let formService = Alloy.Globals.Services.getService("informformversion");

        self.init = init;
        self.cleanup = cleanup;
        self.listClick = listClick;
        self.applyFilter = applyFilter;
        self.closeWindow = closeWindow;

        const FAV_IMAGE = {
            "STARRED": "/images/starred.png",
            "UNSTARRED": "/images/unstarred.png",
        }

        function toggleFavorite (e) {
            const item = e.section.getItemAt(e.itemIndex);
            const currentImage = item && item.favIcon && item.favIcon.image || "";

            let currentFavoriteInformvVersions = new Set(Ti.App.Properties.getList("favoriteInformVersions"));

            if (currentImage === FAV_IMAGE.UNSTARRED) {
                currentFavoriteInformvVersions.add(e.itemId);
                item.favIcon.image =FAV_IMAGE.STARRED;
                
            } else {
                currentFavoriteInformvVersions.delete(e.itemId);
                item.favIcon.image = FAV_IMAGE.UNSTARRED;				
            }

            // UPDATE THE LOCAL STORAGE BASED ON NEW FAVORITE LIST
            Ti.App.Properties.setList("favoriteInformVersions", Array.from(currentFavoriteInformvVersions));
            e.section.updateItemAt(e.itemIndex, item);
        }

        function init () {
            $.tabFilter.setIndex(0);

            formService.refreshCollection();
            stopClickLoading();
        }

        function closeWindow () {
            Alloy.Globals.currentPage = formSource;
            $.formAddWindow.close();
        }

        function applyFilter (collection) {
            return collection.filter(function (item) {
                return item.get("status") === "CURRENT";
            }).map((item) => {
                const locallyStoredFavoriteInformVersions = new Set(Ti.App.Properties.getList("favoriteInformVersions")) || new Set();
                const itemIsFavorite = locallyStoredFavoriteInformVersions.has(item.get("id")) || false;
                item.set("favoriteIcon", itemIsFavorite ? FAV_IMAGE.STARRED : FAV_IMAGE.UNSTARRED);
                return item;
            });
        }

        function listClick (e) {
            const isFavoriteBtnClicked = e.bindId === "favIcon";
            if (isFavoriteBtnClicked) {
                toggleFavorite(e);
                return;
            }

            if (!OS_ANDROID) {
                closeWindow();
            }
            var timeOutTracker = setTimeout(function () {
                var id = e.itemId;
                listClickDebounce(id);
                clearTimeout(timeOutTracker);
            }, 10);
        }

        function OpenFormRecordForm (id) {
            if (formService.hasDefinition(id)) {
                createFormRecord(id);
            } else {
                formService
                    .populateFormDefinition(id)
                    .then(function (result) {
                        createFormRecord(id);
                    })
                    .catch(function (e) {
                        alert("Please connect to internet to load form");
                    });
            }
        }
        var listClickDebounce = nav.debounce(OpenFormRecordForm);

        function startClickLoading () {
            Alloy.Globals.loading.show("Loading", true);
        }

        function stopClickLoading () {
            Alloy.Globals.loading.hide();
        }

        /**
         * Create new form record and then open edit widdpw
         * @param id
         */
        function createFormRecord (id) {
            var progressWindow = Ti.UI.createWindow({
                backgroundColor: "#88000000",
                verticalAlign: "center",
                exitOnClose: false
            });

            var pb = Ti.UI.createProgressBar({
                backgroundColor: "#DDDDDD",
                width: 250,
                height: 100,
                min: 0,
                max: 10,
                value: 1,
                color: Alloy.Globals.colors.brownishGrey,
                tintColor: Alloy.Globals.colors.desaturatedOrange,
                message: "Creating record...",
                font: {fontSize: 14, fontWeight: "bold"}
            });
            

            setTimeout(() => {
                progressWindow.add(pb);
                progressWindow.open();
            }, 0);

            setTimeout(() => {
                var uuid = require("vendor/uuid").v4();
                var user = Alloy.Globals.UserSession.getUser();
                var formConfig = formService.findById(id);
    
                var isDirectedFromLinkActionPage = !!args.actionId;
                // IS REDIRECTED FROM ACTION EDIT PAGE
                if (isDirectedFromLinkActionPage) {
                    stopClickLoading();
                    var timer = setTimeout(function () {
                        closeWindow();
                        Alloy.Globals.dispatcher.trigger("app:actionInformIntegrate", {
                            hasUpdate: true,
                            actionId: args.actionId,
                            formVersionId: id,
                            formName: formConfig.get("name")
                        });
                        clearTimeout(timer);
                    }, 2000);
                    return;
                }
    
                var respondentId = getApproverIdAsNewRespondentId(formConfig);
    
                var form = {
                    uuid: uuid,
                    form_version_id: id,
                    form_name: formConfig.get("name"),
                    respondent_id: respondentId || user.id,
                    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
                    status: "NOT_STARTED",
                    last_modified_at: moment().unix().toString(),
                    modified_by: user.id,
                    attachment_count: 0
                };
                if (pb) {
                    pb.value += 2;
                }
                Alloy.Globals.Services.getService("informformrecord").create(form)
                    .then(function () {
                        if (pb) {
                            pb.value = pb.max;
                        }
                    })
                    .catch(function () {
                        Alloy.Globals.dispatcher.trigger("app:InformFormRecordUpdated", {
                            action: "add",
                            number: 1
                        });
                    }).finally(function () {
                        if (progressWindow) {
                            progressWindow.close();
                        }
                        setTimeout(function () {
                            closeWindow();
                            nav.openWindow("formedit", {
                                uuid: uuid,
                                formVersionId: id,
                                formRecordId: uuid,
                                formIndex: 0,
                                source: formSource
                            }); 
                        }, 10);
                    });
            }, 100);
        }

        /**
         * UPDATE RESPONDENT ID IF FORM CONTAINS APPROVER ELEMENT WITH APPROVER ID
         */
        function getApproverIdAsNewRespondentId (formConfig) {
            try {
                var respondentId = null;
                var formDefinition = JSON.parse(formConfig.get("definition"));
                for (var i = 0; i < formDefinition.InformQuestionVersion.length; i++) {
                    var question = formDefinition.InformQuestionVersion[i];
                    if (question.type === "APPROVAL") { // Check for only approval elements
                        var metadata = question.metadata && JSON.parse(question.metadata);
                        if (!!metadata.options.conditional) { // Only if it is parent element and not conditional
                            if (!metadata.options.conditional) {
                                if (!!metadata && !!metadata.options && !!metadata.options["approver_id"]) {
                                    respondentId = metadata.options["approver_id"];
                                    break;
                                }
                            } else {
                                // IF CONDITIONAL ELEMENT, NO NEED TO CONSIDER AS IT WOULD BE HIDDEN 
                            }
                        } else {
                            if (!!metadata && !!metadata.options && !!metadata.options["approver_id"]) {
                                respondentId = metadata.options["approver_id"];
                                break;
                            }
                        }
                    }
                }
                Alloy.Globals.LogManager.info("APPROVAL FORM ADD: getApproverIdAsNewRespondentId = " + respondentId);
                return respondentId;
            } catch (error) {
                Alloy.Globals.LogManager.error("APPROVAL ERROR: " + JSON.stringify(error));
            }

        }

        function cleanup () {
            $.destroy();
            $.off();
        }
    }

    _.extend(exports, new FormAddController(args));
})(arguments, $, exports);
