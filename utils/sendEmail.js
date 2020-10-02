const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (event) => {
    const msg = {
      to: email,
      from: 'contact@nmarino.dev',
      subject: 'Registration Confirmation',
      text: `You have successfully registered for ${event.formData.title}. Please call the library with any further questions. Visit event page`,
      html: `You have successfully registered for this program. Please call the library with any further questions. <a href='./events/${event.id}'>Visit event page</a>`,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body)
      }
    }   
}

export default sendEmail


