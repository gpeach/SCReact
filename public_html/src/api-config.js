import {Common} from './common-code';

var source, environment, domain, mdlive_url, article_table, topic_table, bodyarea_table, bodyregion_table, api_key;

export class ApiConfig {
    constructor() {
        source = 0; //0=selfcare, 1=mdlive - which keys and table names to use
        environment = 2; //0=dev, 1=stage, 2=prod - which environment
        domain = '';
    }
   
    init() {
        domain = window.location.hostname;
        if (domain == 'symptomchecker.mdlive.com') {
            source = 1;
            environment = 2;
            Common.debugMessage('auto configured to MDLIVE Prod');
        } else if (domain == 'stage-symptomchecker.mdlive.com') {
            source = 1;
            environment = 1;
            Common.debugMessage('auto configured to MDLIVE Stage');
        } else if (domain == 'dev-symptom.mdlive.com') {
            source = 1;
            environment = 0;
            Common.debugMessage('auto configured to MDLIVE Dev');
        } else {
            source = 0;
            environment = 0;
            Common.debugMessage('auto configured to Selfcare demo key');
        }
        mdlive_url = ['https://dev-symptom.mdlive.com/symptom_checker/rest/mdlive/', 'https://stage-symptomchecker.mdlive.com/symptom_checker/rest/mdlive/', 'https://symptomchecker.mdlive.com/symptom_checker/rest/mdlive/'];
        article_table = ['topic/', 'symptom_topic/'];
        topic_table = ['topictable/adult', 'symptom_index/adult'];
        bodyarea_table = ['bodyarea', ''];
        bodyregion_table = ['bodyregion', ''];
        api_key = ['ZgPriXU+BcgsPLEu2sEfqHgr0ZORcI/IKQVJhI1MhB4R0sKzVMCUbDQ6+kCsaZhmWe9XnB+kn6FkM9IOnW+Cjw==', '1bc0eada6a850368ec4a5beb1f5ffdc2283de2c1'];
    }
}

export {source, environment, domain, mdlive_url, article_table, topic_table, bodyarea_table, bodyregion_table, api_key};