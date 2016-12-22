
import $ from 'jquery';
//require('jquery-mobile');
import { getVendor } from './vendors';
import { Common } from './common-code';
import { source, environment, domain, mdlive_url, article_table, topic_table, bodyarea_table, bodyregion_table, api_key } from './api-config';

export var ApiMethods = {
    divId: '',
    language: Common.userLanguage(),
    genBodyAreaList(destination) {
        Common.debugMessage("genbodyarealist");
//        $.mobile.changePage("#list-page", {transition: 'fade'});
        var returnData = [["Abdomen", "BodyArea", Common.UI_WORDS.abdomen[this.language]], ["Arm", "BodyRegion", Common.UI_WORDS.arm[this.language]], ["Chest", "BodyArea", Common.UI_WORDS.chest[this.language]], ["Ears", "BodyPart", Common.UI_WORDS.ears[this.language]], ["Eyes", "BodyPart", Common.UI_WORDS.eyes[this.language]], ["First Aid", "FirstAid", Common.UI_WORDS.firstAid[this.language]], ["Genitals or Urinary", "BodyArea", Common.UI_WORDS.genitalsOrUrinary[this.language]], ["Head or Brain", "BodyArea", Common.UI_WORDS.headOrBrain[this.language]], ["Leg", "BodyRegion", Common.UI_WORDS.leg[this.language]], ["Mouth or Teeth", "BodyArea", Common.UI_WORDS.mouthOrTeeth[this.language]], ["Neck or Back", "BodyArea", Common.UI_WORDS.neckOrBack[this.language]], ["Nose", "BodyPart", Common.UI_WORDS.nose[this.language]], ["Other Symptoms", "BodyRegion", Common.UI_WORDS.otherSymptoms[this.language]], ["Pregnancy", "BodyPart", Common.UI_WORDS.pregnancy[this.language]], ["Skin", "BodyRegion", Common.UI_WORDS.skin[this.language]]];
        var items = "";
        $.each(returnData, function (key, val) {
            var idKey = val[0].replace(/ /g, "_");
            items += "<li class='list-symptom-item'><a href='#' id='" + idKey + "'  class='" + val[1] + "'>" + val[2] + "</a></li>";
            $("#list-page").off('click', '.my-new-list a.' + val[1] + '#' + idKey);
            $("#list-page").on('click', '.my-new-list a.' + val[1] + '#' + idKey, function (e) {
                e.preventDefault();
                if (val[1] == 'FirstAid') {
                    ApiMethods.checkFirstAidTable('#list-query-listing-items');
                } else {
                    ApiMethods.checkTopicTableAdultFiltered('#list-query-listing-items', '*', val[1], val[0], '');
                }

            });
        });
        $('#list-query-listing-items').empty();
        $("<ul/>", {
            "class": "my-new-list",
            "group": "list",
            html: items
        }).appendTo('#list-query-listing-items');
        Common.hideSpinner();
    }, // end genBodyAreaList()

    /** checks api topic table using getData method.
     @param {string} myDestination - div id where output is delivered
     @param {string} gender - gender for symptom list, M, F, B, *
     @param {string} filter - BodyArea, BodyRegion, BodyPart
     @param {string} value - value for filter
     @param {array} keywords - pre-filtered return data must contain at least one of these
     */
    checkTopicTableAdultFiltered(myDestination, gender, filter, value, keywords) {
        Common.debugMessage("checkTopicTableAdultFiltered");
        ApiMethods.getFilteredData(topic_table[source], "?" + filter + "=" + value)
                .then(function (returnData) {
                    var items = '';
                    Common.debugMessage(returnData);

                    if (keywords !== '' && typeof keywords !== 'undefined') {
                        Common.debugMessage('keyword match');
                        returnData = ApiMethods.keywordMatch(returnData, keywords);
                    }
                    returnData = ApiMethods.genderMatch(returnData, gender);
                    items = ApiMethods.buildSymptomList(myDestination, returnData);
                    ApiMethods.clearResults();
                    ApiMethods.showSymptomList(myDestination, items);
//                    $.mobile.changePage("#list-page", {transition: 'fade'});
                    Common.focusIt($('li:first-child a'));
                })
                .catch(err => console.error(err));
    }, // end checkTopicTableAdultFiltered()

    /** checks api first aid table using getData method.
     @param {string} myDestination - div id where output is delivered
     */
    checkFirstAidTable(myDestination) {
        Common.debugMessage("checkFirstAidTable");
        ApiMethods.getFilteredData('firstaidtable')
                .then(function (returnData) {
                    var items = '';
                    Common.debugMessage(returnData);
                    items = ApiMethods.buildFirstAidList(myDestination, returnData);
                    ApiMethods.clearResults();
                    ApiMethods.showSymptomList(myDestination, items);
//                    $.mobile.changePage("#list-page", {transition: 'fade'});
                    Common.focusIt($('li:first-child a'));
                })
                .catch(err => console.error(err));
    }, // end checkFirstAidTable()

    keywordMatch(data, keywordArray) {
        var newData = {};
        newData.titles = [];
        $.each(data.titles, function (key, val) {// take each item in result list
            val.active = false;
            $.each(keywordArray, function (mykey, myword) {// take each keyword in array of keyword args
                if ($.inArray(myword, val.keywords) !== -1) {// if there is a keyword match
                    val.active = true;
                }
            });
            if (val.active !== false) {
                delete data.titles[key].active;
                newData.titles.push(data.titles[key]);
            }
        });
        return newData;
    },

    genderMatch(data, gender) {
        var newData = {};
        newData.titles = [];
        $.each(data.titles, function (key, val) {// take each item in result list
            if (val.gender === gender || val.gender === "B" || gender === "*") {//check the gender
                newData.titles.push(data.titles[key]);
            }
        });
        return newData;
    },

    autoCompleteTopicTable() {
        ApiMethods.getFilteredData(topic_table[source], '')
                .then(function (returnData) {
                    Common.debugMessage(returnData);
                    var suggestions = [];
                    var items = "";
                    $.each(returnData.titles, function (key, val) {
                        suggestions.push({
                            value: val.title,
                            data: val.id
                        }); //end push
                    }); //end each
                    Common.debugMessage(suggestions);
                });
    },
    /**
     * gets api images by id using getData method.
     * @param {string} myURL - topic article id number
     * @param {string} myDestination - div id where output is delivered
     */
    checkImageSelected(myUrl, destination) {
        Common.debugMessage('checkImageSelected');
        this.getFilteredData('image/' + myUrl)
                .then(function (returnData) {
//                    $.mobile.changePage("#image-page", {transition: 'fade'});
                    Common.debugMessage(returnData);

                    var output = "";
                    $(destination).html("");
                    Common.debugMessage(returnData.image.title);
                    output += "<h2 tabindex='0'>" + returnData.image.title + "</h2>";
                   
                    output += '<figure style="margin: 2em; text-align: center;"><img style="max-width: 80%; height: auto; border: 1px solid #333;" class="scThumb" src="http://www.selfcare.info/API/images/' + returnData.image.imageref + '" /><figcaption style="font-size: .75em;">' + returnData.image.title + '</figcaption></figure>';
                    
                    Common.debugMessage(returnData.image.text);
                    output += "<p>" + returnData.image.text + "</p>";
                    $(destination).empty();
                    $(output).appendTo(destination);
                    Common.debugMessage($(destination + " h2"));
                    Common.focusIt("h2");
                });
    }, // end checkImageSelected()

    /**
     * gets api articles by id using getData method.
     * @param {string} myURL - topic article id number
     * @param {string} myDestination - div id where output is delivered
     */
    checkTopicSelected(myUrl, destination) {
        Common.debugMessage('checkTopicSelected');
        this.getFilteredData(article_table[source] + myUrl, '')
                .then(function (returnData) {
                    //when the user chooses from LIST section
                    if (destination == '#list-query-listing-items') {
                        var finalDestination = ("#list-query-listing-details");
//                        $.mobile.changePage("#detail-page", {transition: 'fade'});
                    }
                    if (source == 0) {
                        returnData = returnData.topic;
                        Common.debugMessage(returnData);
                    }
                    var output = "";
                    $(finalDestination).html("");
                    output += "<h2 tabindex='0'>" + returnData.title + "</h2>";
                    if (getVendor() === 'stluke') {
                        output += '<div id="symptoms" class="section-header"><img aria-hidden="true" src="../images/stluke/icons/page-icons/symptoms.png" srcset="../images/stluke/icons/page-icons/symptoms.png 1x, ../images/stluke/icons/page-icons/symptoms@2x.png 2x"> Symptoms</div>';
                    } else {
                        output += '<div id="symptoms" class="section-header"><img aria-hidden="true" src="../images/' + getVendor() + '/symptoms.png"> Symptoms</div>';
                    }

                    output += "<h3>" + returnData.definition.header + "</h3>";
                    $.each(returnData.definition.detail, function (i, item) {
                        output += "<p>" + item + "</p>";
                    });
                    $.each(returnData.images, function (i, item) {
                        var replaced = item.thumbref.replace("_x124", "");
                        output += '<figure style="margin: 2em; text-align: center;"><img style="max-width: 80%; height: auto; border: 1px solid #333;" class="scThumb" src="http://www.selfcare.info/API/images/' + replaced + '" /><figcaption style="font-size: .75em;">' + item.title + '</figcaption></figure>';
                    });
                    if (getVendor() === 'stluke') {
                        output += '<div id="whentocall" class="section-header"><img aria-hidden="true" src="../images/stluke/icons/page-icons/call.png" srcset="../images/stluke/icons/page-icons/call.png 1x, ../images/stluke/icons/page-icons/call@2x.png 2x"> When to call</div>';
                    } else {
                        output += '<div id="whentocall" class="section-header"><img aria-hidden="true" src="../images/' + getVendor() + '/phone.png"> When to call</div>';
                    }

                    $.each(returnData.dispositions, function (i, item) {

                        ApiMethods.divId = item.text.replace(/\s+/g, '-').toLowerCase();
                        output += '<h3 id="' + ApiMethods.divId + '">' + item.text + '</h3>';
                        $.each(item.questions, function (i, item) {
                            output += "<p>" + item.text + "</p>";
                        });
                        if (ApiMethods.divId == 'call-911-now') {
                            if (ApiMethods.getMobileOperatingSystem() == 'iOS') {
                                output += '<center><a href="tel:911" class="sutter-only"><div id="button911">Dial 911</div></a><a href="tel:911" class="base-only"><div id="button911">Dial 911</div></a></center><br/><br/>';
                            } else {
                                output += '<center><a href="tel:911" class="sutter-only"><div id="button911">Dial 911</div></a><a href="tel:911" class="base-only"><div id="button911">Dial 911</div></a></center><br/><br/>';
                            }
                        } else if (ApiMethods.divId == 'call-doctor-now-or-go-to-er') {
                            if (ApiMethods.getMobileOperatingSystem() == 'iOS') {
                                Common.debugMessage('outputting ios deeplink text');
                                output += '<center><a href="tel:' + ApiMethods.vendorPhoneNumber(getVendor()) + '" class="base-only"><div id="callbutton">Call</div></a><a href="sutterhealth://?navTo=1" class="sutter-only"><div id="findadoctor-button-sutter" class="sutter-detail-buttons">Find a Doctor</div></a><br class="sutter-only"><a href="sutterhealth://?navTo=2" class="sutter-only"><div id="findacarecenter-button-sutter" class="sutter-detail-buttons">Find a Care Center</div></a><br class="sutter-only"><a href="sutterhealth://?navTo=3" class="sutter-only"><div id="talktoadoctor-button-sutter" class="sutter-detail-buttons">Talk to a Doctor</div></a></center><br/><br/>';
                            } else {
                                Common.debugMessage('outputting android deeplink text');
                                output += '<center><a href="tel:' + ApiMethods.vendorPhoneNumber(getVendor()) + '" class="base-only"><div id="callbutton">Call</div></a><a href="sutterhealth://org.sutterhealth.basicmobileapp?navTo=1" class="sutter-only"><div id="findadoctor-button-sutter" class="sutter-detail-buttons">Find a Doctor</div></a><br class="sutter-only"><a href="sutterhealth://org.sutterhealth.basicmobileapp?navTo=2" class="sutter-only"><div id="findacarecenter-button-sutter" class="sutter-detail-buttons">Find a Care Center</div></a><br class="sutter-only"><a href="sutterhealth://org.sutterhealth.basicmobileapp?navTo=3" class="sutter-only"><div id="talktoadoctor-button-sutter" class="sutter-detail-buttons">Talk to a Doctor</div></a></center><br/><br/>';
                            }
                        } else if (ApiMethods.divId == 'self-care-at-home' || ApiMethods.divId == 'care-at-home' || ApiMethods.divId == 'careathome') {
                            if (ApiMethods.getMobileOperatingSystem() == 'iOS') {
                                output += '<center><a href="inapp://capture" class="base-only"><div id="schedulebutton">Schedule a visit</div></a></center><br/><br/>';
                            } else {
                                output += '<center><a href="#" onclick="Android.startSAV();return false;" class="base-only droidclick"><div id="schedulebutton">Schedule a visit</div></a></center><br/><br/>';
                            }
                        }
                    });
                    if (getVendor() === 'stluke') {
                        output += '<div id="careathome" class="section-header"><img aria-hidden="true" src="../images/stluke/icons/page-icons/home.png" srcset="../images/stluke/icons/page-icons/home.png 1x, ../images/stluke/icons/page-icons/home@2x.png 2x"> Care at home</div>';
                    } else {
                        output += '<div id="careathome" class="section-header"><img aria-hidden="true" src="../images/' + getVendor() + '/home.png"> Care at home</div>';
                    }

                    output += "<h3>" + returnData.advice.title + "</h3>";
                    returnData.advice.text = returnData.advice.text.replace('<a ', '<a target="_blank" class="external" ');
                    if (ApiMethods.getMobileOperatingSystem() == 'iOS') {
                        returnData.advice.text = returnData.advice.text.replace('<a target="_blank" class="external" href="', '<a target="_blank" class="external" href="inapp://capture_');
                    }
                    output += "<p>" + returnData.advice.text + "</p>";
                    output += '<div id="background" class="section-header">Additional Information</div>';
                    output += "<p>" + returnData.background + "</p>";

                    function goToByScroll(id) {
                        var id = id.replace("-link", "");
                        var cScroll = $('#list-query-listing-details').scrollTop();
                        var cRelPos = $("#" + id).position().top;
                        Common.debugMessage(cScroll, ':', cRelPos);
                        $("#list-query-listing-details").animate({scrollTop: cScroll + cRelPos}, 500);
                    }
                    ;

                    $(function () {

                        $(".scroll").click(function (e) {
                            $(".scroll").css("background", "url(../images/" + getVendor() + "/buttongrad.png) repeat-x");
                            $("#" + $(this).attr("id")).css("background", "url(../images/" + getVendor() + "/highlightgrad.png) repeat-x");
                            $("#list-query-listing-details").addClass("androidFix");
                            // Call the scroll function
                            goToByScroll($(this).attr("id"));
                            $("#list-query-listing-details").removeClass("androidFix");
                            return false;
                        });
                    });
                    $(finalDestination).empty();
                    $(output).appendTo(finalDestination);
                    Common.debugMessage($(finalDestination + " h2"));
                    Common.focusIt("h2");
                });
    }, // end checkTopicSelected()

    buildSymptomList(destination, data) {
        var itemList = '';
        $.each(data.titles, function (key, val) { // take each item in result list
            itemList += "<li class='list-symptom-item symptom-item'><a tabindex='0' href='#' id='" + val.id + "'>" + val.title + "</a></li>";
            $("#list-page").off('click', 'a#' + val.id); // to prevent double fire.
            $("#list-page").on('click', 'a#' + val.id, function (e) {
                e.preventDefault();
                ApiMethods.checkTopicSelected(val.id, destination);
            });
        });
        return itemList;
    },
    buildFirstAidList(destination, data) {
        var itemList = '';
        $.each(data.titles, function (key, val) { // take each item in result list
            itemList += "<li class='list-symptom-item symptom-item'><a tabindex='0' href='#' id='" + val.id + "'>" + val.title + "</a></li>";
            $("#list-page").off('click', 'a#' + val.id); // to prevent double fire.
            $("#list-page").on('click', 'a#' + val.id, function (e) {
                e.preventDefault();
                ApiMethods.checkImageSelected(val.id, '#image-container');
            });
        });
        return itemList;
    },

    clearResults() {
        $("#list-query-listing-details, #list-query-listing-items").empty();
    },

    showSymptomList(destination, items) {
        $(destination).empty();
        $("<ul/>", {
            "class": "my-new-list",
            html: items
        }).appendTo(destination);
    },
    getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.getVendor() || window.opera;
        Common.debugMessage('UA: ' + userAgent);
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            Common.debugMessage('user agent detected as ios - using ios deeplinks');
            return 'iOS';
        } else if (userAgent.match(/Android/i)) {
            Common.debugMessage('user agent detected as android - using android deeplinks');
            return 'Android';
        } else {
            Common.debugMessage('user agent not ios or android - using android deeplinks by default');
            return 'Android';
        }
    },
    vendorPhoneNumber(vendor) {
        switch (vendor) {
            case 'stluke':
                return '18888520376';
            case 'base':
                return '18004006354';
            default:
                return '18004006354';
        }
    },
    setHeader(xhr) {
        xhr.setRequestHeader('Authorization', '1bc0eada6a850368ec4a5beb1f5ffdc2283de2c1');
    },
    getFilteredData(myUrl, param) {
        Common.debugMessage('getFilteredData');
        if (param === '' || typeof param === 'undefined') {
            var token = '?token=';
            param = '';
        } else {
            var token = '&token=';
        }
        var result;
        var client = "MDL";
        var format = 'json';
        var version = '1.0';

        return new Promise((resolve, reject) => {
            if (source === 0) {
                var seconds = Math.floor(Date.now() / 1000);
                var hash = CryptoJS.HmacSHA256(client + "|" + format + "/" + version + "/" + this.language + "/" + myUrl + "|" + seconds, api_key[source]).toString(CryptoJS.enc.Base64);
                var url = "https://demo.selfcare.info/Services.svc/" + format + "/" + version + "/" + this.language + "/" + myUrl + param + token + encodeURIComponent(hash) + "&key=" + client + "&timestamp=" + seconds + "&callback=?";
                Common.showSpinner();
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    success: function (returnData) {
                        resolve(returnData);
                        Common.hideSpinner();
                    },
                    error: function (returnData) {
                        reject(Error('Selfcare Error: Can\'t get symptom data'));
                        Common.hideSpinner();
                    }
                }); //end $.ajax
            } else {
                var url = mdlive_url[environment] + myUrl + param;
                $.ajax({
                    beforeSend: ApiMethods.setHeader,
                    url: url,
                    type: "GET",
                    dataType: "json",
                    success: function (returnData) {
                        resolve(returnData);
                        Common.hideSpinner();
                    },
                    error: function (returnData) {
                        reject(Error('MDLive Error: Can\'t get symptom data'));
                        Common.hideSpinner();
                    }
                }); //end $.ajax
            }//end else
            setTimeout(function () {
                reject(Error('Network timed out'));
            }, 5000);
        });//end promise
    } //end getfiltereddata
};



