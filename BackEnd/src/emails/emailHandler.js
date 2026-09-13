import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {

    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to Chattrix!",
        html: createWelcomeEmailTemplate(name, clientURL)
    });

    if (error) {
        console.log("Error sending welcome email:", error);
        return;
    }

    console.log("Welcome email sent:", data);
};