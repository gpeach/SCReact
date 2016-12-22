import { Common } from './common-code';
import { SymptomChecker } from './symptom-checker';
import { ApiConfig } from './sc-init';

require('jquery');
//Common.debugMessage($.fn.jquery);

require('jquery-mobile');
//Common.debugMessage($.mobile.version);

//require('jquery-modal');
//Common.debugMessage($.modal);

//require('devbridge-autocomplete');
//Common.debugMessage($.Autocomplete);

//Common.debugMessage(Common.userLanguage());

//Common.debugMessage(source, environment, domain, mdlive_url, article_table[source], topic_table[source], bodyarea_table[source], bodyregion_table[source], api_key[source]);

SymptomChecker.init('nitted');

//$(document).bind("mobileinit", function() {
//        $.mobile.pushStateEnabled = false;
//      });


