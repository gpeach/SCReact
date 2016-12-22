import $ from 'jquery';

export var vendor = getVendor();

export function vendorInit() {
    getVendor();
    setCSS(vendor);
    setFooter(vendor);   
    return vendor;
}
export function getVendor() {
    var vendor;
    if (document.location.href.search('vendorid=sutter') !== -1 ||
            document.location.href.search('vendorid=sutterhealth') !== -1) {
        vendor = 'sutter';
    } else if (document.location.href.search('vendorid=mdlive') !== -1) {
        vendor = 'base';
    } else if (document.location.href.search('vendorid=bcbst') !== -1) {
        vendor = 'bcbs';
    } else if (document.location.href.search('vendorid=stluke') !== -1) {
        vendor = 'stluke';
    } else {
        vendor = 'base';
    }

    return vendor;
}
;

function setCSS(vendor) {
    var vendor;
    if (vendor == 'sutter ') {
        $('head').append('<link href="../css/sutter.css" rel="stylesheet" type="text/css"/>');
    } else if (vendor == 'base') {
        $('head').append('<link href="../css/style-base.css" rel="stylesheet" type="text/css"/>');
    } else if (vendor == 'bcbs') {
        $('head').append('<link href="../css/bcbs.css" rel="stylesheet" type="text/css"/>');
    } else if (vendor == 'stluke') {
        $('head').append('<link href="../css/stluke.css" rel="stylesheet" type="text/css"/>');
    } else {
        $('head').append('<link href="../css/style-base.css" rel="stylesheet" type="text/css"/>');
    }
}
;


function setFooter(vendor) {
    if (vendor == 'bcbs') {
        $(document).ready(function () {
            $('#anchor-menu-sc button img').each(function () {
                var $img = $(this);
                var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgURL = $img.attr('src');

                $.get(imgURL, function (data) {
                    // Get the SVG tag, ignore the rest
                    var $svg = $(data).find('svg');
                    var $back = $(data).find('.back-link');
                    $back.css('pointer-events', 'none');

                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass + ' replaced-svg');
                    }

                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');

                    // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                    if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                    }

                    // Replace image with new SVG
                    $img.replaceWith($svg);
                }, 'xml');
            });
        });

        $('#anchor-menu-sc').html(
                '<div id="button-container">\
      <button id="back-link" class="back-link scroll" data-role="none">\
      <img id="back-img" class="back-link" aria-hidden="true" src="../images/back.svg">\
      <br>\
      <span id="back-span">Back</span>\
      </button>\
      <button id="symptoms-link" class="scroll" data-role="none">\
      <img id="symptoms-img" aria-hidden="true" src="../images/menu.svg">\
      <br>\
      <span id="symptoms-span">Symptoms</span>\
      </button>\
      <button id="whentocall-link" class="scroll" data-role="none">\
      <img id="whentocall-img" aria-hidden="true" src="../images/phone.svg">\
      <br>\
      <span id="whentocall-span">When to Call</span>\
      </button>\
      <button id="careathome-link" class="scroll" data-role="none">\
      <img id="careathome-img" aria-hidden="true" src="../images/house.svg">\
      <br>\
      <span id="careathome-span">Care at Home</span>\
      </button>\
      <div id="clear-float"></div>\
    </div>'
                );
    } else if (vendor == 'stluke') {
        $('#anchor-menu-sc').html('<button id="back-link" class="back-link" data-enhance="false"><img id="back-img" aria-describedby="back-link" src="../images/stluke/icons/bottom-menu/back-button.png" srcset="../images/stluke/icons/bottom-menu/back-button.png 1x, ../images/stluke/icons/bottom-menu/back-button@2x.png 2x"><br><span id="back-span" aria-describedby="back-link">Go Back</span></button>\
    <button id="symptoms-link" class="scroll"><img id="symptoms-img" aria-hidden="true" src="../images/stluke/icons/bottom-menu/symptoms-deselected.png" srcset="../images/stluke/icons/bottom-menu/symptoms-deselected.png 1x, ../images/stluke/icons/bottom-menu/symptoms-deselected@2x.png 2x"><br><span id="symptoms-span">Symptoms</span></button>\
    <button id="whentocall-link" class="scroll"><img id="whentocall-img" aria-hidden="true" src="../images/stluke/icons/bottom-menu/call-deselected.png" srcset="../images/stluke/icons/bottom-menu/call-deselected.png 1x, ../images/stluke/icons/bottom-menu/call-deselected@2x.png 2x"><br><span id="whentocall-span">When to Call</span></button>\
    <button id="careathome-link" class="scroll"><img id="careathome-img" aria-hidden="true" src="../images/stluke/icons/bottom-menu/home-deselected.png" srcset="../images/stluke/icons/bottom-menu/home-deselected.png 1x, ../images/stluke/icons/bottom-menu/home-deselected@2x.png 2x"><br><span id="careathome-span">Care at Home</span></button>');

    } else {
        $('#anchor-menu-sc').html(
                '<button id="back-link" class="back-link" data-enhance="false"><img id="back-img" aria-describedby="back-link" src="../images/back.svg" ><br><span id="back-span" aria-describedby="back-link">Go Back</span></button>\
    <button id="symptoms-link" class="scroll"><img id="symptoms-img" aria-hidden="true" src="../images/menu.svg"><br><span id="symptoms-span">Symptoms</span></button>\
    <button id="whentocall-link" class="scroll"><img id="whentocall-img" aria-hidden="true" src="../images/phone.svg" ><br><span id="whentocall-span">When to Call</span></button>\
    <button id="careathome-link" class="scroll"><img id="careathome-img" aria-hidden="true" src="../images/house.svg" ><br><span id="careathome-span">Care at Home</span></button>'
                );
    }

}
;





