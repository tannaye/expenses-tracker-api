import Validator from "validatorjs";
import { checkExists } from "../controllers/user/authController.js";
import { checkExists as _checkExists } from "../controllers/admin/authController.js";

const { registerAsync } = Validator;

export function validator(body, rules, customMessages, callback) {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
}

export function sendError(res, err) {
    const firstError = err.errors[Object.keys(err.errors)[0]][0];
    res.status(412).send({
        code: 412,
        status: "failed",
        error: true,
        message: firstError,
    });
}

registerAsync("user_unique_param_available", async function (param, attribute, req, passes) {
    const userExists = await checkExists(param, attribute);

    if (userExists.length > 0) {
        passes(false, `${attribute} has already been taken.`); // if username is not available
    }
    passes(); // if username is available
});

//admin
registerAsync("admin_unique_param_available", async function (param, attribute, req, passes) {
    const userExists = await _checkExists(param, attribute);

    if (userExists.length > 0) {
        passes(false, `${attribute} has already been taken.`); // if username is not available
    }
    passes(); // if username is available
});
