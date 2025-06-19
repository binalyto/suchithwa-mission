import frappe
from frappe import _
from frappe.utils.password import update_password
from frappe.utils import validate_email_address

@frappe.whitelist(allow_guest=True)
def custom_signup():
    data = frappe.local.form_dict
    email = data.get("email")
    full_name = data.get("full_name")
    password = data.get("password")
    redirect_to = data.get("redirect_to", "/")
    mobile = data.get("mobile")


    if not all([email, full_name, password]):
        frappe.throw(_("All fields are required"), title=_("Missing Fields"))
    
    if not mobile or not mobile.isdigit() or len(mobile) != 10:
        frappe.throw(_("Please enter a valid 10-digit mobile number"), title=_("Invalid Mobile"))

    if not frappe.utils.validate_email_address(email):
        frappe.throw(_("Please enter a valid email address"), title=_("Invalid Email"))

    if len(password) < 8:
        frappe.throw(_("Password must be at least 8 characters long"), title=_("Weak Password"))

    if frappe.db.exists("User", email):
        frappe.throw(_("This email is already registered. Please login instead."), title=_("User Exists"))

    try:
        user = frappe.get_doc({
            "doctype": "User",
            "email": email,
            "first_name": full_name,
            "mobile_no": mobile,
            "enabled": 1,
            "send_welcome_email": 0,
            "user_type": "Website User",
            "roles": [{"role": "Public"}]
        })

        user.flags.ignore_permissions = True
        user.flags.ignore_password_policy = True
        user.insert()

        frappe.utils.password.update_password(user.name, password)

        if frappe.session.user == "Guest":
            frappe.local.login_manager.login_as(email)

        return {
            "message": {
                "success": True,
                "redirect_to": redirect_to
            }
        }

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), _("Custom Signup Error"))
        frappe.throw(_("An error occurred during signup. Please try again or contact support."), title=_("Signup Error"))
