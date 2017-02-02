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

import AvatarPage from './components/AvatarPage';
import ListPage from './components/ListPage';
import DisclaimerPage from './components/DisclaimerPage';
import DetailPage from './components/DetailPage';

import { maleFrontBody, maleBackBody, femaleFrontBody, femaleBackBody, maleFrontHead, femaleFrontHead, maleBackHead, femaleBackHead } from './avatarData';
require('../scss/style.scss');

//TODO - set up json file for avatar data and import
//var avatarData = require('./avatarData.json');
//console.log(avatarData);

class App extends React.Component{
    constructor(){
        super();
        
            this.state = {
            gender: 'Male',
            vendor: getVendor(),
            debug: true,
            getMobileOperatingSystem: ApiMethods.getMobileOperatingSystem(),
            CurrentPage: '',
            Symptoms: {},
            Topic: {},
            locked_id: '',
            images: [],
            avatarObject: maleFrontBody,
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
    
    this.setPage = this.setPage.bind(this);
        this.setLockedId = this.setLockedId.bind(this);
    this.setAvatar  = this.setAvatar.bind(this);
    }

    setPage (gotoPage) {
        this.setState({
            CurrentPage: gotoPage
        });
    }
    
        setLockedId (id) {
        this.setState({
            locked_id: id
        });
    }
    
    setAvatar (Avatar) {
        this.setState({
            avatarObject: Avatar
        });
    }
    
    render () {
        switch (this.state.CurrentPage) {
            case 'Detail':
                return (
                        <DetailPage language={ this.state.language } setPage={ this.setPage } />
                        )
                break;
            case 'Disclaimer':
                return (
                        <DisclaimerPage language={ this.state.language } setPage={ this.setPage } />
                        )
                break;
            case 'List':
                return (
                        <ListPage setPage={ this.setPage } language={ this.state.language } />
                        )
                break;
            default:
                return (
                        <AvatarPage gender={ this.state.gender } setLockedId={ this.setLockedId }  language={ this.state.language } setPage={ this.setPage } setAvatar={ this.setAvatar } />
                        )
        }
    }
};

ReactDOM.render(
        <App />,
        document.getElementById('container')
        );


