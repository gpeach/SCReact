var React = require('react');
import { getVendor } from '../vendors';
import { Common } from '../common-code';
import { ApiMethods } from '../api-methods';
import { SymptomChecker } from '../symptom-checker';

/**
 * 
 * @class avatar - avatar component
 */
class Avatar extends React.Component {
  constructor(props) {
    super(props);

    this.maleFrontBody = {
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
        'face': {
          en: ['EYE', 'EAR', 'MOUTH', 'NOSE', 'TEETH'],
          es: ['OJO', 'OREJA', 'OIDO', 'BOCA', 'NARIZ', 'DIENTE']
        },
        'neck': '',
        'chest': '',
        'l_arm': '',
        'r_arm': '',
        'abdomen': '',
        'genitals': '',
        'legs': ''
      }
    }

    this.femaleFrontBody = {
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
        'face': {
          en: ['EYE', 'EAR', 'MOUTH', 'NOSE', 'TEETH'],
          es: ['OJO', 'OREJA', 'OÍDO', 'BOCA', 'NARIZ', 'DIENTE']
        },
        'neck': '',
        'chest': '',
        'l_arm': '',
        'r_arm': '',
        'abdomen': '',
        'genitals': '',
        'legs': ''
      }
    }

    this.maleBackBody = {
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
    }

    this.femaleBackBody = {
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
    }

    this.maleFrontHead = {
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
    }

    this.femaleFrontHead = {
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
    }

    this.maleBackHead = {
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
    }

    this.femaleBackHead = {
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
    }

    this.state = {
      //nuts and bolts
      vendor: getVendor(),
      debug: false,
      avatarObject: null,
      images: [],
      language: Common.userLanguage(),
      getMobileOperatingSystem: ApiMethods.getMobileOperatingSystem(),

      //outputs
      Symptoms: {},
      Topic: {},

      //state vars
      gender: '',
      locked_id: false,
      isZoomed: false,
      typeMale: "Male",
      typeFemale: "Female",
      bodyType: "Male",
      male_front: true,
      female_front: true,
      headMode: false,

      //dynamic css
      overlayBackgroundImage: '',
      overlayBackgroundSize: '',
      overlayBackgroundPosition: '',
      overlayDisplay: '',
      width: 0,
      height: 0,
      humanImageWidth: '',
      humanImageHeight: '',
      humanImageDisplay: '',
      hotspotsWidth: '',
      humanWrapperWidth: ''
    };

    this.hotSpotClick = this.hotSpotClick.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.hilightOn = this.hilightOn.bind(this);
    this.setCSSMap = this.setCSSMap.bind(this);
  }


  updateDimensions() {
    Common.debugMessage('updateDimensions');
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
    this.setState({
      width,
      height
    });
    if (this.state.avatarObject !== null) {
      this.setState({
        avatarObject: this.setCSSMap(this.state.avatarObject)
      });
    }
  }

  componentWillMount() {
    Common.debugMessage('componentWillMount');
    window.addEventListener("resize", this.updateDimensions);
    var query = SymptomChecker.getQueryParams(document.location.search);
    if (query.gender === 'F' || query.gender === 'f') {
      this.setState({
        avatarObject: this.setCSSMap(this.femaleFrontBody),
        bodyType: this.typeFemale
      });
    } else {
      this.setState({
        avatarObject: this.setCSSMap(this.maleFrontBody),
        bodyType: this.typeMale
      });
    }
  }

  componentDidMount() {
    Common.debugMessage('componentDidMount');
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  setCSSMap(myObject, options) {
    if (typeof options === "undefined") {
      var options = {};
    }
    var photograf = new Image();
    photograf.onload = () => {
      Common.debugMessage('photograf.width ' + photograf.width);
      Common.debugMessage('photograf.height ' + photograf.height);
      myObject.scale = photograf.width / photograf.height;
      var tmpImg = new Image();
      tmpImg.onload = () => {
        var factor = .7;
        if (options.factor) {
          var maxAvatarWidth = (this.state.width * .9) - (document.getElementByClassName("side-buttons").offsetWidth * 2);
          if (this.state.height * myObject.scale * factor > maxAvatarWidth) {
            factor = maxAvatarWidth / this.state.width;
          }
        }
        myObject.paneHeight = this.state.height * factor;
        myObject.paneWidth = this.state.height * myObject.scale * factor;
        myObject.spriteWidth = myObject.paneWidth * myObject.paneTotal;

        Common.debugMessage('factor ' + factor);
        Common.debugMessage('paneWidth ' + myObject.paneWidth);
        Common.debugMessage('paneHeight ' + myObject.paneHeight);
        Common.debugMessage('scale ' + myObject.scale);
        Common.debugMessage('spriteWidth ' + myObject.spriteWidth);

        this.setState({
          overlayBackgroundImage: "url('" + myObject.mapImage + "')",
          overlayBackgroundPosition: '0px 0px',
          overlayBackgroundSize: myObject.spriteWidth,
          overlayDisplay: 'none',
          paneWidth: myObject.paneWidth,
          paneHeight: myObject.paneHeight,
          humanImageWidth: myObject.paneWidth,
          humanImageHeight: myObject.paneHeight,
          humanImageAlt: myObject.alt,
          humanImageSrc: myObject.basePane,
          humanImageDisplay: 'block',
          hotspotsWidth: myObject.paneWidth,
          humanWrapperWidth: myObject.paneWidth
        });
      };
      tmpImg.src = myObject.basePane;
    };
    photograf.src = myObject.basePane;
    return myObject;
  }

  lock(arg) {
    this.setState({
      locked_id: arg
    });
  }

  locked() {
    if (this.state.locked_id !== '') {
      return true;
    } else {
      return false;
    }
  }

  unlock() {
    this.setState({
      locked_id: ''
    });
  }

  //turns on display of highlighted image
  hilightOn() {
    this.setState({
      overlayBackgroundImage: this.state.avatarObject.mapImage,
      overlayBackgroundPosition: -(Math.round(this.state.avatarObject.paneWidth * this.state.avatarObject.mapLegend[this.state.locked_id])) + 'px 0px',
      overlayDisplay: 'block'
    });

    setTimeout(() => {
      this.props.setAvatar(this.state.avatarObject);
      this.props.setLockedId(this.state.locked_id);
      this.props.setPage('List');
    }, 2000);
  }

  hotSpotClick(event) {
      if(this.state.locked_id == false){
      this.setState({
        locked_id: event.target.id
      }, this.hilightOn);
  }
  }

  hilightOff() {
    if (this.locked_id === false) {
      Common.debugMessage("hilightOff");
      this.setState({
        overlayBackgroundPosition: '0px 0px',
        overlayDisplay: 'none'
      });
    }
  }

  render() {
    return (
      <div id="humanwrapper" style={ { width: Math.round(this.state.humanWrapperWidth) + 'px' } } className="phone tablet">
        <div id="human" className="phone tablet" tabIndex="0">
          <img style={ { width: Math.round(this.state.humanImageWidth) + 'px', height: Math.round(this.state.humanImageHeight) + 'px', display: this.state.humanImageDisplay } } aria-live="assertive" src={ this.state.humanImageSrc } alt={ this.state.humanImageAlt } />
          <div id="overlay" style={ { backgroundPosition: this.state.overlayBackgroundPosition, backgroundSize: Math.round(this.state.overlayBackgroundSize) + 'px', backgroundImage: this.state.overlayBackgroundImage, display: this.state.overlayDisplay, width: Math.round(this.state.humanImageWidth) + 'px', height: Math.round(this.state.humanImageHeight) + 'px' } } className=""></div>
        </div>
        <div id="hotspots" style={ { width: Math.round(this.state.hotspotsWidth) + 'px' } } className="phone tablet" aria-labelledby="human">
          <div tabIndex="0" role="link" aria-label="head" className="fullbody front tinted spotlabel areaHover" id="head" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="face" className="fullbody front tinted spotlabel areaHover" id="face" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="neck" className="fullbody front tinted spotlabel areaHover" id="neck" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="chest" className="fullbody front tinted spotlabel areaHover" id="chest" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="arms" className="fullbody front tinted spotlabel areaHover" id="l_arm" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="arms" className="fullbody front tinted spotlabel areaHover" id="r_arm" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="abdomen" className="fullbody front tinted spotlabel areaHover" id="abdomen" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="genitals" className="fullbody front tinted spotlabel areaHover" id="genitals" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="legs" className="fullbody front tinted spotlabel areaHover" id="legs" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="head" className="fullbody back tinted spotlabel areaHover" id="head" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="neck" className="fullbody back tinted spotlabel areaHover" id="neck" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="back" className="fullbody back tinted spotlabel areaHover" id="back" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="arms" className="fullbody back tinted spotlabel areaHover" id="l_arm" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="arms" className="fullbody back tinted spotlabel areaHover" id="r_arm" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="genitals" className="fullbody back tinted spotlabel areaHover" id="genitals" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="legs" className="fullbody back tinted spotlabel areaHover" id="legs" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="head" className="head front tinted spotlabel areaHover" id="ff_head" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="ears" className="head front tinted spotlabel areaHover" id="ff_ears" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="eyes" className="head front tinted spotlabel areaHover" id="ff_eyes" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="nose" className="head front tinted spotlabel areaHover" id="ff_nose" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="mouth" className="head front tinted spotlabel areaHover" id="ff_mouth" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="neck" className="head front tinted spotlabel areaHover" id="ff_neck" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="head" className="head back tinted spotlabel areaHover" id="fb_head" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="ears" className="head back tinted spotlabel areaHover" id="fb_ears" onClick={ this.hotSpotClick }></div>
          <div tabIndex="0" role="link" aria-label="neck" className="head back tinted spotlabel areaHover" id="fb_neck" onClick={ this.hotSpotClick }></div>
        </div>
      </div>
    )
  }
}
;

export default Avatar;