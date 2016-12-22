
import { Common } from './common-code';
import { source, environment, domain, mdlive_url, article_table, topic_table, bodyarea_table, bodyregion_table, api_key } from './api-config';
import { ApiMethods } from './api-methods';
import $ from 'jquery';

var SymptomChecker = {
    
    /** 
     * init function to start program execution
     * @param {string} arg - message to display on console
     */

    init: function (arg) {
        Common.debugMessage(SymptomChecker.vendor);
        SymptomChecker.preload(
                ['../images/male/body/male_body_new_2.png',
                    '../images/male/body/map_male_front_gap.png',
                    '../images/female/body/map_female_front_gap.png',
                    '../images/male/body/map_male_back.png',
                    '../images/female/body/map_female_back.png',
                    '../images/male/head/map_male_head_front.png',
                    '../images/female/head/map_female_head_front.png',
                    '../images/male/head/map_male_head_back.png',
                    '../images/female/head/map_female_head_back.png']
                , function () {
                    Common.debugMessage('images preloaded');
                });

  


//-------------------------------------------------
//Avatar Page Event Handlers
//-------------------------------------------------
        $('#side-buttons-left').on('click', '#male-button', SymptomChecker.maleButtonClick);
        $('#side-buttons-left').on('click', '#female-button', SymptomChecker.femaleButtonClick);
        $('#side-buttons-right').on('click', '#zoom-button', SymptomChecker.zoomButtonClick);
        $('#side-buttons-right').on('click', '#flip-button', SymptomChecker.flipButtonClick);
        $('#hotspots').on('click', '*', SymptomChecker.hotSpotClick);

//-------------------------------------------------
//Detail Page Event Handlers
//-------------------------------------------------
        $('#detail-page, #image-page').on('click', '.back-link', SymptomChecker.backLinkClick);

        $('#detail-page').on('click', 'a.external', SymptomChecker.externalLinkClick);
        $('#detail-page').on('click', 'a.droidclick', SymptomChecker.droidClick);

//-------------------------------------------------
//General Event Handlers
//-------------------------------------------------
        $(window).on('resize', function () {
            Common.debugMessage("resize event");
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.avatarObject);
        });
        $(document).on('pageshow', '#home-page', SymptomChecker.pageshowHandler);
        $(document).on('pageinit', '#list-page', SymptomChecker.pageinitHandler);
        
        // done message
        Common.debugMessage(arg);
    },
    
    setBodyType: function (gender) {
        SymptomChecker.bodyType = SymptomChecker.gender;
    },
    getQueryParams: function (qs) {
        qs = qs.split('+').join(' ');
        var params = {},
                tokens,
                re = /[?&]?([^=]+)=([^&]*)/g;
        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }
        return params;
    },
    
    pageinitHandler: function () {
        Common.debugMessage("#list-page pageinit event");
        var suggestionList = [];
        Common.debugMessage('autocomplete');
        ApiMethods.getFilteredData(topic_table[source], '')
                .then(function (autocompleteData) {
                    var items = "";
                    $.each(autocompleteData.titles, function (key, val) {
                        suggestionList.push({
                            value: val.title,
                            data: val.id
                        }); //end push
                    }); //end each
                    Common.debugMessage('autocomplete ready');
                    Common.debugMessage(suggestionList);


                    var a = $('.ar-input').autocomplete({
                        lookup: suggestionList,
                        onSelect: function (lookup) {
                            Common.debugMessage('suggestion selected');
                            //hideListPage();
//                            $.mobile.changePage("#modal-page", {transition: 'fade'});
                            $('.modal').modal();
                            if (SymptomChecker.language === 'en') {
                                $('.modal p').html("match found").focus();
                            } else if (SymptomChecker.language === 'es') {
                                $('.modal p').html("coincidencia encontrada").focus();
                            }
                            setTimeout(function () {
                                ApiMethods.checkTopicSelected(lookup.data, '#list-query-listing-items');
                                $('.ar-input').val('');
                                $.modal.close();
                                //showListPage();
                            }, 3000);
                        },
                        onSearchComplete: function (lookup, suggestions) {
                            Common.debugMessage(lookup);
                            Common.debugMessage(suggestions);
                            if (!suggestions.length) {
                                //hideListPage();
//                                $.mobile.changePage("#modal-page", {transition: 'fade'});
                                $('.modal').modal();
                                if (SymptomChecker.language === 'en') {
                                    $('.modal p').html("no match").focus();
                                } else if (SymptomChecker.language === 'es') {
                                    $('.modal p').html("no coinciden").focus();
                                }
                                setTimeout(function () {
                                    $('.ar-input').val('');
                                    $.modal.close();
//                                    $.mobile.changePage("#list-page", {transition: 'fade'});
                                }, 3000);
                            }
                            ;
                        }
                    }); //end autocomplete
                }); //end .then
    },
//-------------------------------------------------
//presentation logic
//-------------------------------------------------
    lock: function (arg) {
        SymptomChecker.locked_id = arg;
    },
    locked: function () {
        if (SymptomChecker.locked_id !== '') {
            return true;
        } else {
            return false;
        }
    },
    unlock: function () {
        SymptomChecker.locked_id = '';
    },

    clearResults: function () {
        $("#list-query-listing-details, #list-query-listing-items").empty();
    },
    ariaMsg: function (arg) {
        $('#status p').html(arg);
    },

    showSpinner: function () {
        $(".loading").css({
            "display": "block"
        });
        Common.debugMessage("showing spinner");
    },
    hideSpinner: function () {
        $(".loading").css({
            "display": "none"
        });
    },
    focusIt: function (arg) {
        setTimeout(function () {
            Common.debugMessage(arg);
            $(arg).focus();
        }, 1000);
    },

    showBody: function () {
        $("body").css("display", "inline");
    },


    
};

export { SymptomChecker };
