    const maleFrontBody = {
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

    const femaleFrontBody = {
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

    const maleBackBody = {
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

    const femaleBackBody = {
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

    const maleFrontHead = {
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

    const femaleFrontHead = {
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

    const maleBackHead = {
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

    const femaleBackHead = {
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
    
    export {maleFrontBody, maleBackBody, femaleFrontBody, femaleBackBody, maleFrontHead, femaleFrontHead, maleBackHead, femaleBackHead}; 