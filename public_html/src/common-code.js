import $ from 'jquery';
//import { vendor } from './vendors';


export var Common = {
    Configs: {
        debug: true
    },
    UI_WORDS: {
        'disclaimer': {
            'en': 'Disclaimer',
            'es': 'Renuncia de responsabilidad'
        },
        'body': {
            'en': 'Body',
            'es': 'Cuerpo'
        },
        'list': {
            'en': 'List',
            'es': 'Lista'
        },
        'male': {
            'en': 'Male',
            'es': 'Hombre'
        },
        'female': {
            'en': 'Female',
            'es': 'Mujer'
        },
        'zoom': {
            'en': 'Zoom',
            'es': 'Zoom'
        },
        'flip': {
            'en': 'Flip',
            'es': 'Voltear'
        },
        'searchInput': {
            'en': 'search symptom',
            'es': 'buscar síntoma'
        },
        'goBack': {
            'en': 'Go Back',
            'es': 'Regresar'
        },
        'symptoms': {
            'en': 'Symptoms',
            'es': 'Síntomas'
        },
        'whenToCall': {
            'en': 'When to Call',
            'es': 'Cuando llamar'
        },
        'careAtHome': {
            'en': 'Care at Home',
            'es': 'Cuidado en el hogar'
        },
        'dial911': {
            'en': 'Dial 911',
            'es': 'Llame Al 911'
        },
        'call': {
            'en': 'Call',
            'es': 'Llame'
        },
        'findADoctor': {
            'en': 'Find a Doctor',
            'es': 'Encuentre un médico'
        },
        'findACareCenter': {
            'en': 'Find a Care Center',
            'es': 'Encuentre un centro de salud'
        },
        'talkToADoctor': {
            'en': 'Talk to a Doctor',
            'es': 'Hable con un doctor'
        },
        'scheduleAVisit': {
            'en': 'Schedule a visit',
            'es': 'Programe una visita'
        },
        'abdomen': {
            'en': 'Abdomen',
            'es': 'Vientre'
        },
        'arm': {
            'en': 'Arm',
            'es': 'Brazo'
        },
        'chest': {
            'en': 'Chest',
            'es': 'Pecho'
        },
        'ears': {
            'en': 'Ears',
            'es': 'Oidos'
        },
        'eyes': {
            'en': 'Eyes',
            'es': 'Ojos'
        },
        'firstAid': {
            'en': 'First Aid',
            'es': 'Primeros Auxilios'
        },
        'genitalsOrUrinary': {
            'en': 'Genitals or Urinary',
            'es': 'Genitales o Urinario'
        },
        'headOrBrain': {
            'en': 'Head or Brain',
            'es': 'Cabeza o Cerebro'
        },
        'head': {
            'en': 'Head',
            'es': 'Cabeza'
        },
        'leg': {
            'en': 'Leg',
            'es': 'Pierna'
        },
        'mouthOrTeeth': {
            'en': 'Mouth or Teeth',
            'es': 'Boca o Dientes'
        },
        'neckOrBack': {
            'en': 'Neck or Back',
            'es': 'Cuello o Espalda'
        },
        'neck': {
            'en': 'Neck',
            'es': 'Cuello'
        },
        'back': {
            'en': 'Back',
            'es': 'Espalda'
        },
        'nose': {
            'en': 'Nose',
            'es': 'Naríz'
        },
        'otherSymptoms': {
            'en': 'Other Symptoms',
            'es': 'Otros síntomas'
        },
        'pregnancy': {
            'en': 'Pregnancy',
            'es': 'Embarazo'
        },
        'skin': {
            'en': 'Skin',
            'es': 'Piel'
        }
    },

    userLanguage: function () {
        var locale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
        var language = locale.split('-')[0];

        if (!this.isAvailableLanguage(language)) {
            language = 'en';
        }
        return language;
    },

    isAvailableLanguage: function (language) {
        var availableLanguages = ['en', 'es'];
        return availableLanguages.indexOf(language);
    },

    initLanguage: function (language) {
        //var language = this.userLanguage();
        this.debugMessage('language: ' + language);
        this.UI.Init(language);
    },

    UI: {
        Disclaimer: function (language) {
            var disclaimerText = Common.UI_WORDS.disclaimer[language];
            $('#disclaimer-link').html(disclaimerText);
        },

        Body: function (language) {
            var bodyText = Common.UI_WORDS.body[language];
            $('.showbody').html(bodyText);
        },

        List: function (language) {
            var listText = Common.UI_WORDS.list[language];
            $('.showlist').html(listText);
        },

        SearchInput: function (language) {
            var searchInputPlaceholder = Common.UI_WORDS.searchInput[language];
            $('#search-input').attr('placeholder', searchInputPlaceholder);
        },

        Buttons: {
            Male: function (language) {
                var maleText = Common.UI_WORDS.male[language];
                $('.button-text--male').html(maleText);
                $('.button-text--male').attr('aria-label', maleText);
            },

            Female: function (language) {
                var femaleText = Common.UI_WORDS.female[language];
                $('.button-text--female').html(femaleText);
                $('.button-text--female').attr('aria-label', femaleText);
            },

            Zoom: function (language) {
                var zoomText = Common.UI_WORDS.zoom[language];
                $('.button-text--zoom').html(zoomText);
                $('.button-text--zoom').attr('aria-label', zoomText);
            },

            Flip: function (language) {
                var flipText = Common.UI_WORDS.flip[language];
                $('.button-text--flip').html(flipText);
                $('.button-text--flip').attr('aria-label', flipText);
            }
        },

        Footer: function (language) {
            var backButtonText = Common.UI_WORDS.goBack[language];
            $('#back-span').html(backButtonText);

            var symptomsButtonText = Common.UI_WORDS.symptoms[language];
            $('#symptoms-span').html(symptomsButtonText);

            var whenToCallButtonText = Common.UI_WORDS.whenToCall[language];
            $('#whentocall-span').html(whenToCallButtonText);

            var careAtHomeButtonText = Common.UI_WORDS.careAtHome[language];
            $('#careathome-span').html(careAtHomeButtonText);

            // Adjust button min-width for spanish translation
            if (language === 'es') {
                // BCBS
                if (vendor === 'bcbs') {
                    $('#anchor-menu-sc button').css('min-height', 78);
                    return;
                }

                // Base and sutter
                $('#anchor-menu-sc > button').css('min-width', 50);
            }
        },
        Init: function (language) {
            this.Disclaimer(language);
            this.Body(language);
            this.List(language);
            this.SearchInput(language);
            this.Footer(language);
            this.Buttons.Male(language);
            this.Buttons.Female(language);
            this.Buttons.Zoom(language);
            this.Buttons.Flip(language);
        }
    },
    debugMessage(message) {
        if (Common.Configs.debug === true) {
            console.info(message);
        }
    },
    hideSpinner() {
        $(".loading").css({"display": "none"});
        Common.debugMessage("hiding spinner");
    },
    showSpinner() {
        $(".loading").css({"display": "block"});
        Common.debugMessage("showing spinner");
    },
    focusIt: function(arg) {
        setTimeout(function () {
            Common.debugMessage(arg);
            $(arg).focus();
        }, 1000);
    }
};

