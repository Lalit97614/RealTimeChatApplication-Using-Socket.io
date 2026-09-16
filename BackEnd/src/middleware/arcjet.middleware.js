import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
export const arecjetProtection = async (req, resp, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {

            if (decision.reason.isRateLimit()) {
                return resp.status(429).json({
                    message: "Rate limit exceeded. Please try again later"
                });
            }

            if (decision.reason.isBot()) {
                return resp.status(403).json({
                    message: "Bot access denied"
                });
            }

            return resp.status(403).json({
                message: "Access denied by security policy"
            });
        }

        next();

    } catch (error) {
        console.log("Arcjet Protection Error:", error);
        next();
    }
};