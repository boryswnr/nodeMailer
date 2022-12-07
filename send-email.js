const nodemailer = require("nodemailer");

exports.handler = async (event) => {
    const data = JSON.parse(event.body);

    const transport = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        auth: {
            user: "username",
            pass: "password",
        },
    });

    const message = {
        from: `${data.name} <${data.email}>`,
        to: "yourmaildaddress@domain.com",
        subject: "New form submission from your website",
        text: data.message,
    };

    try {
        await transport.sendMail(message);
    } catch (err) {
        console.error(err);

        return {
            statusCode: 500,
            body: "Failed to send email",
        };
    }

    return {
        statusCode: 200,
        body: "Email sent sucesfully",
    };
};
