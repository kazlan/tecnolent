
// Use Parse.Cloud.define to define as many cloud functions as you want.
Parse.Cloud.define("correo", function(request, response){
	var Mailgun = require('mailgun'),
      nombre = request.params.nombre,
      email = request.params.email,
      mensaje = request.params.mensaje,
      para = request.params.to;

	Mailgun.initialize('sandbox484.mailgun.org', 'key-0oc2hrqdipvvsicb1uti5jlb6mljtj48');
	Mailgun.sendEmail({
  		to: para,
  		from: email,
  		subject: "Mensaje de "+nombre+" desde la Web.",
  		text: mensaje
	},
	{
  	success: function(httpResponse) {
    	console.log(httpResponse);
    	response.success("Email sent!");
  	},
    error: function(httpResponse) {
    	console.error(httpResponse);
    	response.error("Uh oh, something went wrong");
    }
	});
});
