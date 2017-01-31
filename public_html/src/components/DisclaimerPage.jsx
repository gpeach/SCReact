var React = require('react');

var DisclaimerPage = React.createClass({
  closeDisclaimerLinkClick: function() {
    this.props.setPage('Avatar');
  },
  disclaimerClose: function() {
    Common.debugMessage('disclaimerClose called');
    $("#disclaimer").toggle();
    SymptomChecker.avatarObject = SymptomChecker.setCSSMap(SymptomChecker.avatarObject);
    //        $.mobile.changePage("#home-page", {transition: 'fade'});
    SymptomChecker.focusIt("#showbody");
  },
  render: function() {
    if (this.props.language == 'en') {
      return (
        <div>
          <div data-role="page" id="disclaimer-page" className="disclaimer-page">
            <div role="link" aria-label="Close disclaimer" className="close close-disclaimer" onClick={ this.closeDisclaimerLinkClick }>[ X ]</div>
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
      )
    } else {
      return (
        <div>
          <div id="disclaimer-page-es" className="disclaimer-page">
            <div role="link" aria-label="Cerrar exención de responsabilidades" className="close close-disclaimer" onClick={ this.closeDisclaimerLinkClick }>[ X ]</div>
            <h2 tabIndex="0">RENUNCIA DE RESPONSABILIDAD</h2>
            <p>El verificador de síntomas es parte de MDLIVE y su uso está sujeto a los términos y condiciones de MDLIVE.</p>
            <p>La información incluida en estas guías de atención no pretende ser un sustituto del consejo médico profesional, y se proporciona sólo con fines educativos. Usted asume toda la responsabilidad sobre cómo utilizar esta información.</p>
            <p>Busque siempre el consejo de su médico o de otro profesional sanitario cualificado si tiene cualquier pregunta sobre una afección médica. Nada de lo contenido en estos temas se pretende que sea utilizado para el diagnóstico o el tratamiento médico.</p>
            <ul>
              <li><strong>No es un sustituto</strong> - la información del verificador de síntomas no se debe utilizar como sustituto de la atención y el conocimiento que su médico puede proporcionarle.</li>
              <li><strong>Suplemento</strong> - la información y los materiales presentados en el verificador de síntomas complementan la información que usted obtiene de su médico. Lo más probable es que su médico tenga razón. Su médico tiene la ventaja de conocer
                sus problemas médicos.</li>
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
            <p><strong>Al hacer uso de este sitio web</strong>, usted acepta la información proporcionada en este documento "TAL CUAL". Ni MDLIVE ni los proveedores de la información contenida en el mismo garantizan, de forma expresa o implícita, la exactitud, contenido,
              integridad, fiabilidad, o eficacia de la información contenida en este sitio web.</p>
          </div>
        </div>
      )
    }
  }
});

export default DisclaimerPage;