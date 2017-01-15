var React = require('react');
        var ReactDOM = require('react-dom');
        var Radium = require('radium');
        var Color = require('color');
        import $ from 'jquery';
        import { getVendor } from './vendors';
        import { Common } from './common-code';
        import { ApiMethods } from './api-methods';
        import { SymptomChecker } from './symptom-checker';
        import { ApiConfig } from './sc-init';
        require('../scss/style.scss');
        
        
        
        var App = React.createClass({
            getInitialState: function () {
                return {
                    gender: 'Male',
                    vendor: getVendor(),
                    debug: true,
                    getMobileOperatingSystem: ApiMethods.getMobileOperatingSystem(),
                    CurrentPage: '',
                    Symptoms: {},
                    Topic: {},
                    locked_id: '',
                    images: [],
                    avatarObject: this.maleFrontBody,
                    language: Common.userLanguage(),
                    typeMale: "Male",
                    typeFemale: "Female",
                    bodyType: "Male",
                    male_front: true,
                    female_front: true,
                    headMode: false,
                    deviceType: "medium",
                    zoomOut: false
                }
            },
            setPage: function (gotoPage) {
            this.setState({
            CurrentPage: gotoPage
            });
            },
            setAvatar: function (Avatar) {
            this.setState({
            avatarObject: Avatar
            });
            },
            render : function(){
            switch (this.state.CurrentPage) {
            case 'Detail':
                    return (
<DetailPage language={this.state.language} setPage={this.setPage} />
                            )
                    break;
                    case 'Disclaimer':
                    return (
<DisclaimerPage language={this.state.language} setPage={this.setPage} />
                            )
                    break;
                    case 'List':
                    return (
<ListPage setPage={this.setPage} language={this.state.language} />
                            )
                    break;
                    default:
                    return (
<AvatarPage gender={this.state.gender} locked_id ={this.state.locked_id} language={this.state.language} setPage={this.setPage} setAvatar={this.setAvatar} />
                            )
            }
            }
        });
        
       
        
        
        var AvatarPage = React.createClass({
        render : function(){
        var CurrentPage = this.props.CurrentPage;
                return (
<div id="avatar-page">
    <TopNav setPage = {this.props.setPage} />
    <SideButtonsLeft  setAvatar={this.setAvatar} gender={this.props.gender} />
    <SideButtonsRight  setAvatar={this.setAvatar} />
    <Avatar  gender={this.props.gender} locked_id ={this.props.locked_id} />  
    <DisclaimerLink language={this.props.language} setPage={this.props.setPage} />
</div>
                        )
        }
        });
        
        
        var ListPage = React.createClass({
        render : function(){
        return (
<div>
    <TopNav setPage = {this.props.setPage} />
    <SearchBox />
    <List />
</div>
                )
        }
        });
        
        
        var DetailPage = React.createClass({
        render : function(){
        return (
<div>
    <Detail />
    <GoBack setPage = {this.props.setPage} />
    <Symptoms />
    <WhenToCall />
    <CareAtHome />                    
</div>
                )
        }
        });
        
        
        var TopNav = React.createClass({
        showBodyClick: function () {
        if (SymptomChecker.locked() === false) {
        Common.debugMessage('body click fired');
//            $(":mobile-pagecontainer").pagecontainer("change", $("#home-page"));

                //$.mobile.changePage("#home-page", {transition: 'fade'});
                SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.avatarObject);
                SymptomChecker.selectButton('.showbody');
                SymptomChecker.clearResults();
                SymptomChecker.focusIt(".showbody");
                SymptomChecker.ariaMsg("body view selected");
        }
        },
                showButtonClick: function () {
                this.props.setPage('Avatar');
                },
                showListClick: function () {
                if (SymptomChecker.locked() == false) {
                Common.debugMessage('list click fired');
//            $.mobile.changePage("#list-page", {transition: 'fade'});
                        ApiMethods.genBodyAreaList("#list-query-listing-items");
                        SymptomChecker.selectButton('.showlist');
                        SymptomChecker.focusIt("li:first-child a");
                        SymptomChecker.ariaMsg("list view selected");
                }
                },
                listButtonClick: function () {
                this.props.setPage('List');
                },
                render : function(){
                return (
<div id="avatar-page-topnav" className="button-select">
    <a href="javascript:void(0)" aria-label="Switch to the body view" aria-selected="true" tabIndex="0" className="showbody button-selected" onClick={this.showButtonClick}> Body </a>
    <a aria-label="switch to the list view" href="javascript:void(0)" aria-selected="false" className="showlist" onClick={this.listButtonClick}> List </a>      
</div>
                        )
                }
        });
        
        
        var Avatar = React.createClass({

            getInitialState: function () {
                return {
                    
                    //nuts and bolts
                    vendor: getVendor(),
                    debug: true,
                    avatarObject: this.maleFrontBody,
                    images: [],
                    language: Common.userLanguage(),         
                    deviceType: "medium",          
                    getMobileOperatingSystem: ApiMethods.getMobileOperatingSystem(),
                    width: 0,
                    height: 0,
                    
                    //outputs
                    Symptoms: {},
                    Topic: {},
                    
                    //state vars
                    gender: 'Male',
                    locked_id: '',
                    isZoomed: false,
                    typeMale: "Male",
                    typeFemale: "Female",
                    bodyType: "Male",
                    male_front: true,
                    female_front: true,
                    headMode: false
                    
                };
            },
            hydrateAvatar: function (key, value) {
                //console.log(avatarObject);
                const goo = 'gap_prop';
                
                const newAvatar = {};
                newAvatar[key] = value;
                Object.assign(newAvatar, this.state.avatarObject);
                this.setState({
                    avatarObject: newAvatar
                });
            },
            updateDimensions: function() {
                var w = window,
                d = document,
                documentElement = d.documentElement,
                body = d.getElementsByTagName('body')[0],
                width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
                height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

                this.setState({width, height});
                this.setState({avatarObject: this.setCSSMap(this.state.avatarObject)});
                //this.state.avatarObject = this.setCSSMap(this.state.avatarObject);
            },
            componentWillMount: function() {
                this.updateDimensions();
            },
            componentDidMount: function() {
                window.addEventListener("resize", this.updateDimensions);
            },
            componentWillUnmount: function() {
                window.removeEventListener("resize", this.updateDimensions);
            },
            styles: {
                humanWrapper: {
                backgroundColor: "transparent",
                    human: {
                        img: {
                        },
                        overlay: {
                            backgroundImage: "none",
                            backgroundPosition: "0px 0px",
                            display: "none",
                            backgroundSize: "cover"
                        }
                    },
                    hotspots: {
                    },
                    tinted: {
                        opacity: "0.5"
                    },
                    areaHover: {
                        backgroundColor: "red",
                        cursor: "pointer"
                    }
                }
            },
            maleFrontBody: {
            alt: 'Male Front Body',
                    basePane: '../images/male/body/male_body_new_2.png',
                    mapImage: '../images/male/body/map_male_front_gap.png',
                    paneTotal: 10,
                    gender: 'M',
                    mapLegend: {
                    'orig': 0,
                            'head': 1,
                            'face': 2,
                            'neck': 3,
                            'chest': 4,
                            'l_arm': 6,
                            'r_arm': 5,
                            'abdomen': 7,
                            'genitals': 8,
                            'legs': 9
                    },
                    ariaLabel: {
                    'orig': '',
                            'head': 'male head',
                            'face': 'male face',
                            'neck': 'male neck',
                            'chest': 'male chest',
                            'l_arm': 'male arms',
                            'r_arm': 'male arms',
                            'abdomen': 'male abdomen',
                            'genitals': 'male genitals',
                            'legs': 'male legs'
                    },
                    filter: {
                    'orig': '',
                            'head': 'BodyArea',
                            'face': 'BodyRegion',
                            'neck': 'BodyRegion',
                            'chest': 'BodyRegion',
                            'l_arm': 'BodyRegion',
                            'r_arm': 'BodyRegion',
                            'abdomen': 'BodyRegion',
                            'genitals': 'BodyArea',
                            'legs': 'BodyRegion'
                    },
                    value: {
                    'orig': '',
                            'head': 'Head or Brain',
                            'face': 'Head',
                            'neck': 'Neck',
                            'chest': 'Chest',
                            'l_arm': 'Arm',
                            'r_arm': 'Arm',
                            'abdomen': 'Abdomen',
                            'genitals': 'Genitals or Urinary',
                            'legs': 'Leg'
                    },
                    keywords: {
                    'orig': '',
                            'head': '',
                            'face': {en: ['EYE', 'EAR', 'MOUTH', 'NOSE', 'TEETH'], es: ['OJO', 'OREJA', 'OIDO', 'BOCA', 'NARIZ', 'DIENTE']},
                            'neck': '',
                            'chest': '',
                            'l_arm': '',
                            'r_arm': '',
                            'abdomen': '',
                            'genitals': '',
                            'legs': ''
                    }
            },
            femaleFrontBody: {
            alt: 'Female Front Body',
                    basePane: '../images/female/body/female_body_2.png',
                    mapImage: '../images/female/body/map_female_front_gap.png',
                    paneTotal: 10,
                    gender: 'F',
                    mapLegend: {
                    'orig': 0,
                            'face': 1,
                            'head': 2,
                            'neck': 3,
                            'chest': 4,
                            'l_arm': 5,
                            'r_arm': 6,
                            'abdomen': 7,
                            'genitals': 8,
                            'legs': 9
                    },
                    ariaLabel: {
                    'orig': '',
                            'face': 'female face',
                            'head': 'female head',
                            'neck': 'female neck',
                            'chest': 'female chest',
                            'l_arm': 'female arms',
                            'r_arm': 'female arms',
                            'abdomen': 'female abdomen',
                            'genitals': 'female genitals',
                            'legs': 'female legs'
                    },
                    filter: {
                    'orig': '',
                            'head': 'BodyArea',
                            'face': 'BodyRegion',
                            'neck': 'BodyRegion',
                            'chest': 'BodyRegion',
                            'l_arm': 'BodyRegion',
                            'r_arm': 'BodyRegion',
                            'abdomen': 'BodyRegion',
                            'genitals': 'BodyArea',
                            'legs': 'BodyRegion'
                    },
                    value: {
                    'orig': '',
                            'head': 'Head or Brain',
                            'face': 'Head',
                            'neck': 'Neck',
                            'chest': 'Chest',
                            'l_arm': 'Arm',
                            'r_arm': 'Arm',
                            'abdomen': 'Abdomen',
                            'genitals': 'Genitals or Urinary',
                            'legs': 'Leg'
                    },
                    keywords: {
                    'orig': '',
                            'head': '',
                            'face': {en: ['EYE', 'EAR', 'MOUTH', 'NOSE', 'TEETH'], es: ['OJO', 'OREJA', 'OÍDO', 'BOCA', 'NARIZ', 'DIENTE']},
                            'neck': '',
                            'chest': '',
                            'l_arm': '',
                            'r_arm': '',
                            'abdomen': '',
                            'genitals': '',
                            'legs': ''
                    }
            },
            maleBackBody: {
            alt: 'Male Back Body',
                    basePane: '../images/male/body/orig_male_back.png',
                    mapImage: '../images/male/body/map_male_back.png',
                    paneTotal: 8,
                    gender: 'M',
                    mapLegend: {
                    'orig': 0,
                            'head': 1,
                            'neck': 2,
                            'back': 3,
                            'l_arm': 4,
                            'r_arm': 5,
                            'genitals': 6,
                            'legs': 7
                    },
                    ariaLabel: {
                    'orig': '',
                            'head': 'male head',
                            'neck': 'male neck',
                            'back': 'male back',
                            'l_arm': 'male arms',
                            'r_arm': 'male arms',
                            'genitals': 'male genitals',
                            'legs': 'male legs'
                    },
                    filter: {
                    'orig': '',
                            'head': 'BodyArea',
                            'neck': 'BodyRegion',
                            'back': 'BodyRegion',
                            'l_arm': 'BodyRegion',
                            'r_arm': 'BodyRegion',
                            'genitals': 'BodyArea',
                            'legs': 'BodyRegion'
                    },
                    value: {
                    'orig': '',
                            'head': 'Head or Brain',
                            'neck': 'Neck',
                            'back': 'Back',
                            'l_arm': 'Arm',
                            'r_arm': 'Arm',
                            'genitals': 'Genitals or Urinary',
                            'legs': 'Leg'
                    },
                    keywords: {
                    'orig': '',
                            'head': '',
                            'neck': '',
                            'back': '',
                            'l_arm': '',
                            'r_arm': '',
                            'genitals': '',
                            'legs': ''
                    }
            },
            femaleBackBody: {
            alt: 'Female Back Body',
                    basePane: '../images/female/body/orig_female_back.png',
                    mapImage: '../images/female/body/map_female_back.png',
                    paneTotal: 8,
                    gender: 'F',
                    mapLegend: {
                    'orig': 0,
                            'head': 1,
                            'neck': 2,
                            'back': 3,
                            'l_arm': 4,
                            'r_arm': 5,
                            'genitals': 6,
                            'legs': 7
                    },
                    ariaLabel: {
                    'orig': '',
                            'head': 'female head',
                            'neck': 'female neck',
                            'back': 'female back',
                            'l_arm': 'female arms',
                            'r_arm': 'female arms',
                            'genitals': 'female genitals',
                            'legs': 'female legs'
                    },
                    filter: {
                    'orig': '',
                            'head': 'BodyArea',
                            'neck': 'BodyRegion',
                            'back': 'BodyRegion',
                            'l_arm': 'BodyRegion',
                            'r_arm': 'BodyRegion',
                            'genitals': 'BodyArea',
                            'legs': 'BodyRegion'
                    },
                    value: {
                    'orig': '',
                            'head': 'Head or Brain',
                            'neck': 'Neck',
                            'back': 'Back',
                            'l_arm': 'Arm',
                            'r_arm': 'Arm',
                            'genitals': 'Genitals or Urinary',
                            'legs': 'Leg'
                    },
                    keywords: {
                    'orig': '',
                            'head': '',
                            'neck': '',
                            'back': '',
                            'l_arm': '',
                            'r_arm': '',
                            'genitals': '',
                            'legs': ''
                    }
            },
            maleFrontHead: {
            alt: 'Male Front Head',
                    basePane: '../images/male/head/male_head_front.png',
                    mapImage: '../images/male/head/map_male_head_front.png',
                    paneTotal: 7,
                    gender: 'M',
                    mapLegend: {
                    'orig': 0,
                            'ff_head': 1,
                            'ff_ears': 2,
                            'ff_eyes': 3,
                            'ff_nose': 4,
                            'ff_mouth': 5,
                            'ff_neck': 6
                    },
                    ariaLabel: {
                    'orig': '',
                            'ff_head': 'male head',
                            'ff_ears': 'male ears',
                            'ff_eyes': 'male eyes',
                            'ff_nose': 'male nose',
                            'ff_mouth': 'male mouth',
                            'ff_neck': 'male neck'
                    },
                    filter: {
                    'orig': '',
                            'ff_head': 'BodyArea',
                            'ff_ears': 'BodyPart',
                            'ff_eyes': 'BodyPart',
                            'ff_nose': 'BodyPart',
                            'ff_mouth': 'BodyArea',
                            'ff_neck': 'BodyRegion'
                    },
                    value: {
                    'orig': '',
                            'ff_head': 'Head or Brain',
                            'ff_ears': 'Ears',
                            'ff_eyes': 'Eyes',
                            'ff_nose': 'Nose',
                            'ff_mouth': 'Mouth or Teeth',
                            'ff_neck': 'Neck'
                    },
                    keywords: {
                    'orig': '',
                            'ff_head': '',
                            'ff_ears': '',
                            'ff_eyes': '',
                            'ff_nose': '',
                            'ff_mouth': '',
                            'ff_neck': ''
                    }
            },
            femaleFrontHead: {
            alt: 'Female Front Head',
                    basePane: '../images/female/head/female_head_front.png',
                    mapImage: '../images/female/head/map_female_head_front.png',
                    paneTotal: 7,
                    gender: 'F',
                    mapLegend: {
                    'orig': 0,
                            'ff_head': 1,
                            'ff_ears': 2,
                            'ff_eyes': 3,
                            'ff_nose': 4,
                            'ff_mouth': 5,
                            'ff_neck': 6
                    },
                    ariaLabel: {
                    'orig': '',
                            'ff_head': 'female head',
                            'ff_ears': 'female ears',
                            'ff_eyes': 'female eyes',
                            'ff_nose': 'female nose',
                            'ff_mouth': 'female mouth',
                            'ff_neck': 'female neck'
                    },
                    filter: {
                    'orig': '',
                            'ff_head': 'BodyArea',
                            'ff_ears': 'BodyPart',
                            'ff_eyes': 'BodyPart',
                            'ff_nose': 'BodyPart',
                            'ff_mouth': 'BodyArea',
                            'ff_neck': 'BodyRegion'
                    },
                    value: {
                    'orig': '',
                            'ff_head': 'Head or Brain',
                            'ff_ears': 'Ears',
                            'ff_eyes': 'Eyes',
                            'ff_nose': 'Nose',
                            'ff_mouth': 'Mouth or Teeth',
                            'ff_neck': 'Neck'
                    },
                    keywords: {
                    'orig': '',
                            'ff_head': '',
                            'ff_ears': '',
                            'ff_eyes': '',
                            'ff_nose': '',
                            'ff_mouth': '',
                            'ff_neck': ''
                    }
            },
            maleBackHead: {
            alt: 'Male Back Head',
                    basePane: '../images/male/head/male_head_back.png',
                    mapImage: '../images/male/head/map_male_head_back.png',
                    paneTotal: 4,
                    gender: 'M',
                    mapLegend: {
                    'orig': 0,
                            'fb_head': 1,
                            'fb_ears': 2,
                            'fb_neck': 3
                    },
                    ariaLabel: {
                    'orig': '',
                            'fb_head': 'male head',
                            'fb_ears': 'male ears',
                            'fb_neck': 'male neck'
                    },
                    filter: {
                    'orig': '',
                            'fb_head': 'BodyArea',
                            'fb_ears': 'BodyPart',
                            'fb_neck': 'BodyRegion'
                    },
                    value: {
                    'orig': '',
                            'fb_head': 'Head or Brain',
                            'fb_ears': 'Ears',
                            'fb_neck': 'Neck'
                    },
                    keywords: {
                    'orig': '',
                            'fb_head': '',
                            'fb_ears': '',
                            'fb_neck': ''
                    }
            },
            femaleBackHead: {
            alt: 'Female Back Head',
                    basePane: '../images/female/head/orig_female_head_back.png',
                    mapImage: '../images/female/head/map_female_head_back.png',
                    paneTotal: 4,
                    gender: 'F',
                    mapLegend: {
                    'orig': 0,
                            'fb_head': 1,
                            'fb_ears': 2,
                            'fb_neck': 3
                    },
                    ariaLabel: {
                    'orig': '',
                            'fb_head': 'female head',
                            'fb_ears': 'female ears',
                            'fb_neck': 'female neck'
                    },
                    filter: {
                    'orig': '',
                            'fb_head': 'BodyArea',
                            'fb_ears': 'BodyPart',
                            'fb_neck': 'BodyRegion'
                    },
                    value: {
                    'orig': '',
                            'fb_head': 'Head or Brain',
                            'fb_ears': 'Ears',
                            'fb_neck': 'Neck'
                    },
                    keywords: {
                    'orig': '',
                            'fb_head': '',
                            'fb_ears': '',
                            'fb_neck': ''
                    }
            },
            selectButton: function (arg) {
            if (arg === '.showbody') {
            $(".showbody").addClass("button-selected");
                    $(".showlist").removeClass("button-selected");
            } else {
            $(".showlist").addClass("button-selected");
                    $(".showbody").removeClass("button-selected");
            }
            },
            pageshowHandler: function () {
            var query = SymptomChecker.getQueryParams(document.location.search);
                    if (query.gender === 'F' || query.gender === 'f') {
            SymptomChecker.avatarObject = SymptomChecker.femaleFrontBody;
                    SymptomChecker.bodyType = SymptomChecker.typeFemale;
            } else {
            SymptomChecker.avatarObject = SymptomChecker.maleFrontBody;
                    SymptomChecker.bodyType = SymptomChecker.typeMale;
            }
            SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.avatarObject);
            document.getElementById( 'body' ).style.display = 'block';    
            },
            preload: function (images, callback) {
            SymptomChecker.showSpinner();
                    var count = images.length;
                    if (count === 0) {
            callback();
            }
            var loaded = 0;
                    $(images).each(function () {
            $('<img>').attr('src', this).load(function () {
            loaded++;
                    if (loaded === count) {
            callback();
            }
            });
            });
                    SymptomChecker.hideSpinner();
            },   
            setCSSMap: function (myObject, options) {
                var that = this;               
            if (typeof options === "undefined") {
            var options = {};
            }
            var photograf = new Image();
                    photograf.onload = function () {
                    Common.debugMessage('photograf.width ' + photograf.width);
                    Common.debugMessage('photograf.height ' + photograf.height);
                    var avatar = document.getElementById('avatar-page');
                    avatar.style.maxHeight = photograf.height + 'px';
                    that.hydrateAvatar('scale', photograf.width / photograf.height);
                            myObject.scale = photograf.width / photograf.height;
                            var tmpImg = new Image();
                            Common.debugMessage(that.state.width);
                            Common.debugMessage(that.state.height);
                            tmpImg.onload = function () {
                            Common.debugMessage('options.factor ' + options.factor);
                            var factor = .7;
                            if (options.factor) {
                                var maxAvatarWidth = (that.state.width * .9) - (document.getElementByClassName("side-buttons").offsetWidth * 2);
                                Common.debugMessage('maxAvatarWidth ' + maxAvatarWidth);
                                if (that.state.height * myObject.scale * factor > maxAvatarWidth) {
                                    factor = maxAvatarWidth / that.state.width;
                                }
                            }
                            Common.debugMessage('factor ' + factor);
                            that.hydrateAvatar('paneHeight', that.state.height * factor);
                            myObject.paneHeight = that.state.height * factor;
                            that.hydrateAvatar('paneWidth', that.state.height * myObject.scale * factor);
                            myObject.paneWidth = that.state.height * myObject.scale * factor;
                            Common.debugMessage('paneWidth ' + myObject.paneWidth);
                            Common.debugMessage('paneHeight ' + myObject.paneHeight);
                            Common.debugMessage('scale ' + myObject.scale);
                            that.hydrateAvatar('spriteWidth', myObject.paneWidth * myObject.paneTotal);
                            //myObject.spriteWidth = myObject.paneWidth * myObject.paneTotal;
//                            $('#overlay').css("background-image", "url(" + myObject.mapImage + ")").css('background-size', myObject.spriteWidth + 'px auto').css('background-position', '0px 0px').hide();
                            
                            document.querySelector("#overlay").style.backgroundImage = 'url(' + myObject.mapImage + ')';
                            document.querySelector("#overlay").style.backgroundSize = myObject.spriteWidth + 'px auto';
                            document.querySelector("#overlay").style.backgroundPosition = '0px 0px';
                            document.querySelector("#overlay").style.display = 'none';
                            document.querySelector("#humanwrapper").style.width = myObject.paneWidth + 'px';
                            document.querySelector("#overlay").style.width = myObject.paneWidth + 'px';
                            document.querySelector("#hotspots").style.width = myObject.paneWidth + 'px';
                            document.querySelector("#human img").style.width = myObject.paneWidth + 'px';
                            document.querySelector("#human img").style.height = myObject.paneHeight + 'px';
                            document.querySelector("#human img").style.display = "block";
                    };
                            $('#human img').attr("src", myObject.basePane);
                            $('#human img').attr("alt", myObject.alt);
                            tmpImg.src = $('#human img').attr('src');
                    };
                    photograf.src = myObject.basePane;
// TODO - aria labels

//                    for (var prop in myObject.ariaLabel ) {
//                        console.log(prop);
//                        console.log(myObject.ariaLabel[prop]);
//                        console.log(this.refs);
//                        if( myObject.ariaLabel[prop] !== null && myObject.ariaLabel[prop] !== '' ){
//                            this.refs[prop].setAttribute('aria-label', myObject.ariaLabel[prop]);
//                        }                       
//                    }                 
                                 
//                    $.each(myObject.ariaLabel, function (key, value) {
//                    $('#' + key).attr('aria-label', value);
//                    });
                    return myObject;
            },

            lock: function (arg) {
                this.setState({
            locked_id: arg
            });
    },
            locked: function () {
        if (this.locked_id !== '') {
            return true;
        } else {
            return false;
        }
    },
            unlock: function () {
        this.setState({
            locked_id: ''
            });
    },
            //turns on display of highlighted image
            hilightOn: function () {
                var tempStyles = Object.assign({}, this.styles);
                
                if (this.state.locked_id !== false && this.state.locked_id !== '') {
                    Common.debugMessage("locked_id " + this.state.locked_id);
                    tempStyles.humanWrapper.human.overlay.backgroundImage = this.state.avatarObject.mapImage;
                    tempStyles.humanWrapper.human.overlay.backgroundPosition = - (this.state.avatarObject.paneWidth * this.state.avatarObject.mapLegend[this.state.locked_id]) + 'px 0px';
                    tempStyles.humanWrapper.human.overlay.display = 'block';
                    this.setState({styles: tempStyles});
                    //this.styles = tempStyles;
                    
                }
            },
            hotSpotClick: function (event) {
                Common.debugMessage("clicked " + event.target.id);
                this.setState({
            locked_id: event.target.id
            }, this.hilightOn);

                    //SymptomChecker.showSpinner();
//                    setTimeout(function () {
//                    $.when(ApiMethods.checkTopicTableAdultFiltered('#list-query-listing-items', SymptomChecker.avatarObject.gender, SymptomChecker.avatarObject.filter[SymptomChecker.locked_id], SymptomChecker.avatarObject.value[SymptomChecker.locked_id], SymptomChecker.avatarObject.keywords[SymptomChecker.locked_id][SymptomChecker.language])).then(function () {
//                    SymptomChecker.hideSpinner();
//                            //showListPage();
//    //                $.mobile.changePage("#list-page", {transition: 'fade'});
//                            SymptomChecker.selectButton('.showlist');
//                            this.unlock();
//                            this.hilightOff();
//                            SymptomChecker.focusIt("li:first-child a");
//                    });
//                    }, 2000);
            },
            hilightOff: function () {
            if (this.locked_id === false) {
            Common.debugMessage("hilightOff");
                    this.styles.humanWrapper.human.overlay.backgroundPosition = '1000px 0px';
                    this.styles.humanWrapper.human.overlay.display = 'none';
    //            $('#overlay').stop(true, true).hide().css('background-position', '1000px 0px');
            }
            },
            render : function(){
            return (
    <div id="humanwrapper" style={this.styles.humanWrapper} className="phone tablet">
    <div id="human" style={this.styles.humanWrapper.human} className="phone tablet" tabIndex="0">
    <img style={this.styles.humanWrapper.human.img} aria-live="assertive" src="../images/male/body/male_body_new_2.png" alt="Male Avatar" />
    <div id="overlay" style={this.styles.humanWrapper.human.overlay} className=""></div>
    </div>
    <div id="hotspots" className="phone tablet" aria-labelledby="human">
    <div tabIndex="0" role="link" aria-label="head" className="fullbody front tinted spotlabel areaHover" id="head" ref="head" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="face" className="fullbody front tinted spotlabel areaHover" id="face" ref="face" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="neck" className="fullbody front tinted spotlabel areaHover" id="neck" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="chest" className="fullbody front tinted spotlabel areaHover" id="chest" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="arms" className="fullbody front tinted spotlabel areaHover" id="l_arm" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="arms" className="fullbody front tinted spotlabel areaHover" id="r_arm" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="abdomen" className="fullbody front tinted spotlabel areaHover" id="abdomen" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="genitals" className="fullbody front tinted spotlabel areaHover" id="genitals" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="legs" className="fullbody front tinted spotlabel areaHover" id="legs" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="head" className="fullbody back tinted spotlabel areaHover" id="head" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="neck" className="fullbody back tinted spotlabel areaHover" id="neck" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="back" className="fullbody back tinted spotlabel areaHover" id="back" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="arms" className="fullbody back tinted spotlabel areaHover" id="l_arm" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="arms" className="fullbody back tinted spotlabel areaHover" id="r_arm" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="genitals" className="fullbody back tinted spotlabel areaHover" id="genitals" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="legs" className="fullbody back tinted spotlabel areaHover" id="legs" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="head" className="head front tinted spotlabel areaHover" id="ff_head" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="ears" className="head front tinted spotlabel areaHover" id="ff_ears" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="eyes" className="head front tinted spotlabel areaHover" id="ff_eyes" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="nose" className="head front tinted spotlabel areaHover" id="ff_nose" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="mouth" className="head front tinted spotlabel areaHover" id="ff_mouth" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="neck" className="head front tinted spotlabel areaHover" id="ff_neck" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="head" className="head back tinted spotlabel areaHover" id="fb_head" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="ears" className="head back tinted spotlabel areaHover" id="fb_ears" onClick={this.hotSpotClick}></div>
    <div tabIndex="0" role="link" aria-label="neck" className="head back tinted spotlabel areaHover" id="fb_neck" onClick={this.hotSpotClick}></div>
    </div>
    </div>
                    )
            }
        });
        var SideButtonsLeft = React.createClass({
        render : function(){
        return (
<div data-position="fixed" id="side-buttons-left" className="side-buttons">
    <div aria-pressed="false" id="male-button" tabIndex="0" className="small-button">
        <img role="button" className="sm-male" src="../images/small-male-body.png" aria-label="choose male avatar" />
        <h4 className="button-text button-text--male" aria-label="Male">Male</h4>
    </div>

    <div data-position="fixed" aria-pressed="false" id="female-button" tabIndex="0" className="small-button">
        <img role="button" className="sm-female" src="../images/small-female-body.png" aria-label="choose female avatar" />
        <h4 className="button-text button-text--female" aria-label="Female">Female</h4>
    </div>
</div>
                )
        }
        });
        var SideButtonsRight = React.createClass({
        render : function(){
        return (
<div id="side-buttons-right" className="side-buttons">
    <div aria-pressed="false" tabIndex="0" id="zoom-button" className="small-button">
        <img role="button" src="../images/icon-zoom-in.png" alt="zoom avatar in to head view or out to full body view" />
        <h4 className="button-text button-text--zoom" aria-label="Zoom">Zoom</h4>
    </div>
    <div aria-pressed="false" tabIndex="0" id="flip-button" className="small-button">
        <img role="button" src="../images/icon-flip.png" alt="Flip avatar between front and back view" />
        <h4 className="button-text button-text--flip" aria-label="Flip">Flip</h4>
    </div>
</div>
                )
        }
        });
        var Male = React.createClass({
        maleButtonClick: function () {
        Common.debugMessage('maleButtonClick called');
                Common.debugMessage(SymptomChecker.locked());
                Common.debugMessage(SymptomChecker.male_front);
                Common.debugMessage(SymptomChecker.headMode);
                if (SymptomChecker.locked() == false) {
        SymptomChecker.setBodyType(SymptomChecker.typeMale);
                if (SymptomChecker.male_front) {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontHead, {factor: true});
        } else {
        Common.debugMessage(SymptomChecker.femaleBackBody);
                SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontBody);
        }
        } else {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackHead, {factor: true});
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackBody);
        }
        }
        SymptomChecker.ariaMsg("changed to male body view");
        }
        },
                render : function(){
                return null
                }
        });
        var Female = React.createClass({
        femaleButtonClick: function () {
        if (SymptomChecker.locked() === false) {
        SymptomChecker.setBodyType(SymptomChecker.typeFemale);
                if (SymptomChecker.female_front) {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontHead, {factor: true});
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontBody);
        }
        } else {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackHead, {factor: true});
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackBody);
        }
        }
        SymptomChecker.ariaMsg("changed to female body view");
        }
        },
                render : function(){
                return null
                }
        });
        var Zoom = React.createClass({
        zoomButtonClick: function () {
        if (SymptomChecker.locked() === false) {
        $("#zoom-button img").attr("aria-pressed", "true");
                SymptomChecker.ariaMsg("changed zoom");
                var zoomButton = $('#zoom-button img');
                //Toggles the zoom image
                if (SymptomChecker.zoomOut) {
        //Zoom Icon is (+) and is False?
        zoomButton.attr('src', '../images/icon-zoom-in.png');
        } else {
        //Zoom Icon is (-) and is True?
        zoomButton.attr('src', '../images/icon-zoom-out.png');
        }

        //Zoom Back out once Zoomed In
        if (SymptomChecker.bodyType === 'Male') {
        if (SymptomChecker.male_front) {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontBody);
                $('.front.fullbody').css('display', 'block');
                $('.front.head').css('display', 'none');
                Common.debugMessage("you should be viewing the BODY FRONT MALE");
                SymptomChecker.male_front = true;
                SymptomChecker.zoomOut = true;
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontHead, {factor: true});
                $('.front.fullbody').css('display', 'none');
                $('.front.head').css('display', 'block');
                Common.debugMessage("you should be viewing the HEAD FRONT MALE");
        }
        } else {
        // Male Backside
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackBody);
                $('.back.fullbody').css('display', 'block');
                $('.back.head').css('display', 'none');
                Common.debugMessage("you should be viewing the BODY BACK MALE");
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackHead);
                $('.back.fullbody').css('display', 'none');
                $('.back.head').css('display', 'block');
                Common.debugMessage("you should be viewing the HEAD BACK MALE");
        }
        }
        SymptomChecker.headMode = !SymptomChecker.headMode;
                SymptomChecker.zoomOut = !SymptomChecker.zoomOut;
        } else {
        if (SymptomChecker.female_front) {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontBody);
                $('.front.fullbody').css('display', 'block');
                $('.front.head').css('display', 'none');
                Common.debugMessage("you should be viewing the BODY FRONT feMALE");
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontHead, {factor: true});
                console.info('female_front(main) ' + female_front);
                $('.front.fullbody').css('display', 'none');
                $('.front.head').css('display', 'block');
                Common.debugMessage("you should be viewing the HEAD FRONT feMALE");
        }
        } else {
        // Female Backside 
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackBody);
                $('.back.fullbody').css('display', 'block');
                $('.back.head').css('display', 'none');
                Common.debugMessage("you should be viewing the BODY BACK feMALE");
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackHead);
                $('.back.fullbody').css('display', 'none');
                $('.back.head').css('display', 'block');
                Common.debugMessage("you should be viewing the HEAD BACK feMALE");
        }
        }
        SymptomChecker.headMode = !SymptomChecker.headMode;
                SymptomChecker.zoomOut = !SymptomChecker.zoomOut;
        }
        }
        },
                render : function(){
                return null
                }
        });
        var Flip = React.createClass({
        flipButtonClick: function () {
        if (SymptomChecker.locked() === false) {
        SymptomChecker.ariaMsg("changed flip");
                if (SymptomChecker.bodyType === 'Male') {
        //Front Side
        if (SymptomChecker.male_front) {

        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackHead, {factor: true});
                $('.head.back').css('display', 'block');
                $('.head.front').css('display', 'none');
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleBackBody);
                $('.fullbody.back').css('display', 'block');
                $('.fullbody.front').css('display', 'none');
        }
        } else {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontHead, {factor: true});
                $('.head.back').css('display', 'none');
                $('.head.front').css('display', 'block');
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.maleFrontBody);
                $('.fullbody.front').css('display', 'block');
                $('.fullbody.back').css('display', 'none');
        }
        }
        SymptomChecker.male_front = !SymptomChecker.male_front;
                SymptomChecker.female_front = !SymptomChecker.female_front;
                //FEMALE     
        } else {
        SymptomChecker.setBodyType(SymptomChecker.typeFemale);
                if (SymptomChecker.female_front) {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackHead, {factor: true});
                $('.head.back').css('display', 'block');
                $('.head.front').css('display', 'none');
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleBackBody);
                $('.fullbody.back').css('display', 'block');
                $('.fullbody.front').css('display', 'none');
        }
        } else {
        if (SymptomChecker.headMode) {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontHead, {factor: true});
                $('.head.back').css('display', 'none');
                $('.head.front').css('display', 'block');
        } else {
        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.femaleFrontBody);
                $('.fullbody.back').css('display', 'none');
                $('.fullbody.front').css('display', 'block');
        }
        }
        SymptomChecker.male_front = !SymptomChecker.male_front;
                SymptomChecker.female_front = !SymptomChecker.female_front;
        }
        }
        },
                render : function(){
                return null
                }
        });
        var DisclaimerLink = React.createClass({
        disclaimerLinkClick: function () {
        this.props.setPage('Disclaimer');
        },
                disclaimerOpen: function () {
                Common.debugMessage('disclaimerOpen called');
                        if (SymptomChecker.locked() === false) {
                if (SymptomChecker.language === 'es') {
//                $.mobile.changePage("#disclaimer-page-es", {transition: 'fade'});
                } else {
//                $.mobile.changePage("#disclaimer-page", {transition: 'fade'});
                }
                $("#disclaimer").toggle();
                        SymptomChecker.focusIt("#disclaimer h2");
                }
                },
                render : function(){
                return (
<div id="botwrap">
    <a href="#" id="disclaimer-link" className="open-disclaimer" onClick={this.disclaimerLinkClick}>Disclaimer</a>
</div>
                        )
                }
        });
        var DisclaimerPage = React.createClass({
        closeDisclaimerLinkClick: function () {
        this.props.setPage('Avatar');
        },
                disclaimerClose: function () {
                Common.debugMessage('disclaimerClose called');
                        $("#disclaimer").toggle();
                        SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.avatarObject);
//        $.mobile.changePage("#home-page", {transition: 'fade'});
                        SymptomChecker.focusIt("#showbody");
                },
                render : function(){
                if (this.props.language == 'en') {
                return (
<div>    
    <div data-role="page" id="disclaimer-page" className="disclaimer-page">
        <div role="link" aria-label="Close disclaimer" className="close close-disclaimer" onClick={this.closeDisclaimerLinkClick}>[ X ]</div>

        <h2 tabIndex="0">DISCLAIMER</h2>

        <p>Symptom Checker is powered by MDLIVE and its use is subject to MDLIVE's terms and conditions.</p>
        <p>The information contained in these care guides is not intended nor implied to be a substitute for professional medical advice, it is provided for educational purposes only. You assume full responsibility for how you choose to use this information.</p>
        <p><strong>Always seek the advice of your physician</strong> or other qualified healthcare provider about any questions you may have regarding a medical condition. Nothing contained in these topics is intended to bused for medical diagnosis or treatment.</p>

        <ul>
            <li><strong>Not a substitute</strong> - The information in the Symptom Checker should not be used as a substitute for the care and knowledge that your physician can provide to you.</li>
            <li><strong>Supplement</strong> - The information and materials presented in the Symptom Checker are meant to supplement the information that you obtain from your physician. It is more likely that your physician is correct. He or she has the benefit
                of knowing your medical problems.</li>
            <li><strong>Limitations</strong> - You should recognize that the information and materials presented here in the Symptom Checker have the following limitations, in comparison to being examined by your own physician:</li>
            <ul>
                <li>You can have a conversation with your doctor.</li>
                <li>Your doctor can perform a physical examination and any necessary tests.</li>
                <li>You could have an underlying medical problem that requires a physician to detect.</li>
                <li>If you're taking medications, they could influence how you experience various symptoms.</li>
            </ul>
        </ul>

        <p><strong><i>If you think that you are having a medical emergency, call 911 or the number for the local emergency ambulance service NOW!</i></strong></p>
        <p><strong><i>And when in doubt, call your doctor NOW or go to the closest emergency department.</i></strong></p>
        <p><strong>By using this website</strong>, you accept the information provided herein "AS IS," Neither MDLIVE nor the providers of the information contained herein or make any express or implied warranty regarding the accuracy, content, completeness,
            reliability, or efficacy of the information contained within this website.</p>
        <p>Using this product means the user has read and accepts this disclaimer.</p>
    </div>
</div>
                        )}
                else {
                return(
<div>
    <div  id="disclaimer-page-es" className="disclaimer-page">
        <div role="link" aria-label="Cerrar exención de responsabilidades" className="close close-disclaimer" onClick={this.closeDisclaimerLinkClick}>[ X ]</div>

        <h2 tabIndex="0">RENUNCIA DE RESPONSABILIDAD</h2>

        <p>El verificador de síntomas es parte de MDLIVE y su uso está sujeto a los términos y condiciones de MDLIVE.</p>
        <p>La información incluida en estas guías de atención no pretende ser un sustituto del consejo médico profesional, y se proporciona sólo con fines educativos. Usted asume toda la responsabilidad sobre cómo utilizar esta información.</p>
        <p>Busque siempre el consejo de su médico o de otro profesional sanitario cualificado si tiene cualquier pregunta sobre una afección médica. Nada de lo contenido en estos temas se pretende que sea utilizado para el diagnóstico o el tratamiento médico.</p>

        <ul>
            <li><strong>No es un sustituto</strong> - la información del verificador de síntomas no se debe utilizar como sustituto de la atención y el conocimiento que su médico puede proporcionarle.</li>
            <li><strong>Suplemento</strong> - la información y los materiales presentados en el verificador de síntomas complementan la información que usted obtiene de su médico. Lo más probable es que su médico tenga razón. Su médico tiene la ventaja de conocer sus problemas médicos.</li>
            <li><strong>Limitaciones</strong> - usted reconoce que la información y los materiales presentados en este verificador de síntomas tienen las siguientes limitaciones respecto a una exploración que le realice su propio médico:</li>
            <ul>
                <li>Puede tener una conversación con su médico</li>
                <li>Su médico puede realizarle una exploración física y cualquier pruebas que sea necesaria.</li>
                <li>Usted podría tener a un problema médico subyacente que sólo un médico puede detectar.</li>
                <li>Si está tomando medicamentos, estos podrían influir en cómo experimenta los diferentes síntomas.</li>
            </ul>
        </ul>

        <p><strong><i>¡Si usted cree qué tiene una urgencia médica, llame al 911 o al número del servicio local de ambulancias de emergencia AHORA!</i></strong></p>
        <p><strong><i>Y, en caso de duda, llame a su médico AHORA o acuda al servicio de urgencias más cercano.</i></strong></p>
        <p><strong>Al hacer uso de este sitio web</strong>, usted acepta la información proporcionada en este documento "TAL CUAL".  Ni MDLIVE ni los proveedores de la información contenida en el mismo garantizan, de forma expresa o implícita, la exactitud, contenido, integridad, fiabilidad, o eficacia de la información contenida en este sitio web.</p>
    </div>
</div>
                        )}
                }
        });
        var SearchBox = React.createClass({
        render : function(){
        return <div>searchbox</div>
        }
        });
        var List = React.createClass({
        render : function(){
        return <div>symptom list</div>
        }
        });
        var Detail = React.createClass({
        addBottomAnchoredNav: function () {
        //Bottom Anchored Nav
        $("#detail-page").append('<div role="navigation" id="anchor-menu-sc">\
<a id="back-link" href="#"><img aria-label="go back" src="../images/detail/back.png" ></a> \
<a id="symptoms-link" href="#" class="scroll"><img aria-label="symptoms" src="../images/detail/symptoms.png" ></a> \
<a id="whentocall-link" href="#" class="scroll"><img aria-label="when to call" src="../images/detail/call.png" ></a> \
<a id="careathome-link" href="#" class="scroll"><img aria-label="care at home" src="../images/detail/care.png" ></a>\
</div>');
        },
                removeBottomAnchoredNav: function () {
                $("#anchor-menu-sc").remove();
                },
                externalLinkClick: function (e) {
                var addressValue = this.href;
                        Common.debugMessage('external clicked ' + addressValue);
                        if (/Android/i.test(navigator.userAgent)) {
                e.preventDefault();
                        Android.openBrowser(addressValue);
                }
                },
                droidClick: function () {
                Common.debugMessage('Android.startSAV()');
                        Android.startSAV();
//        $.mobile.changePage("#list-page", {transition: 'fade'});
                },
                render : function(){
                return <div>symptom details</div>
                }
        });
        var GoBack = React.createClass({
        backLinkClick: function () {
        Common.debugMessage($(this).attr('id'));
                $("#list-query-listing-details").removeClass("androidFix");
//            $.mobile.changePage("#list-page", {transition: 'fade'});
        },
                render : function(){
                return <button>Go Back</button>
                }
        });
        var Symptoms = React.createClass({
        render : function(){
        return <button>Symptoms</button>
        }
        });
        var WhenToCall = React.createClass({
        render : function(){
        return <button>When to Call</button>
        }
        });
        var CareAtHome = React.createClass({
        render : function(){
        return <button>Care at Home</button>
        }
        });
        ReactDOM.render(
<App />,
                document.getElementById('container')
                );


