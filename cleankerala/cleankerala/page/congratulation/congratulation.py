import frappe
from PIL import Image, ImageDraw, ImageFont
import base64
from io import BytesIO
import requests
from urllib.parse import urljoin

@frappe.whitelist()
def generate_certificate():
    try:
        # 1. Get user details
        user = frappe.get_doc("User", frappe.session.user)

        if user.full_name and user.full_name.strip():
            display_name = user.full_name
        elif user.first_name and user.first_name.strip():
            display_name = user.first_name
            if user.last_name and user.last_name.strip():
                display_name += " " + user.last_name
        else:
            display_name = frappe.session.user.split("@")[0]

        frappe.logger().debug(f"Generating certificate for: {display_name}")

        # 2. Get certificate image
        site_url = frappe.utils.get_url()
        asset_path = "/assets/cleankerala/files/certificate.png"
        image_url = urljoin(site_url, asset_path)

        response = requests.get(image_url, stream=True)
        response.raise_for_status()

        # 3. Draw user name on certificate
        with Image.open(BytesIO(response.content)).convert("RGBA") as img:
            draw = ImageDraw.Draw(img)

            try:
                # Use DejaVuSans-Bold from system fonts
                font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
                name_font = ImageFont.truetype(font_path, 100)  # Increased font size
            except Exception as font_error:
                frappe.logger().warning(f"Font error: {font_error}. Using default font")
                name_font = ImageFont.load_default()

            img_width, img_height = img.size

            name_width = draw.textlength(display_name, font=name_font)
            name_x = (img_width - name_width) / 2
            name_y = img_height / 2  # Center vertically

            shadow_offset = 2
            text_color = (0, 0, 0)
            highlight_color = (46, 125, 50)

            draw.text((name_x + shadow_offset, name_y + shadow_offset), display_name, font=name_font, fill=text_color)
            draw.text((name_x, name_y), display_name, font=name_font, fill=highlight_color)

            buffered = BytesIO()
            img.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')

            frappe.logger().debug("Certificate generated successfully with user name only")
            return img_str

    except requests.exceptions.RequestException as e:
        frappe.logger().error(f"Failed to fetch certificate template: {str(e)}")
        frappe.throw("Could not access certificate template. Please ensure the file exists in /assets/cleankerala/files/")

    except Exception as e:
        frappe.logger().error(f"Certificate generation failed: {str(e)}")
        frappe.throw("Failed to generate certificate. Please contact support.")
