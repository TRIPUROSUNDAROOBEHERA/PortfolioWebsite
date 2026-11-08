import os
import math
from PIL import Image, ImageDraw, ImageFont

def draw_ribbon_seal(draw, cx, cy, radius, seal_color, ribbon_color, font_seal, text="VERIFIED"):
    # Ribbons behind seal
    r_w, r_h = radius * 0.45, radius * 1.5
    # Left ribbon
    left_points = [
        (cx - r_w * 1.3, cy + radius * 0.5),
        (cx - r_w * 0.2, cy + radius * 0.5),
        (cx - r_w * 0.4, cy + radius + r_h),
        (cx - r_w * 1.1, cy + radius + r_h - 15),
        (cx - r_w * 1.8, cy + radius + r_h),
    ]
    draw.polygon(left_points, fill=ribbon_color)
    # Right ribbon
    right_points = [
        (cx + r_w * 0.2, cy + radius * 0.5),
        (cx + r_w * 1.3, cy + radius * 0.5),
        (cx + r_w * 1.8, cy + radius + r_h),
        (cx + r_w * 1.1, cy + radius + r_h - 15),
        (cx + r_w * 0.4, cy + radius + r_h),
    ]
    draw.polygon(right_points, fill=ribbon_color)

    # Serrated seal outer circle
    num_teeth = 36
    points = []
    for i in range(num_teeth):
        angle = i * (2 * math.pi / num_teeth)
        r = radius if i % 2 == 0 else radius - 7
        px = cx + r * math.cos(angle)
        py = cy + r * math.sin(angle)
        points.append((px, py))
    draw.polygon(points, fill=seal_color)

    # Inner rings
    draw.ellipse([cx - radius + 8, cy - radius + 8, cx + radius - 8, cy + radius - 8], fill=(245, 158, 11))
    draw.ellipse([cx - radius + 12, cy - radius + 12, cx + radius - 12, cy + radius - 12], fill=seal_color)
    draw.ellipse([cx - radius + 15, cy - radius + 15, cx + radius - 15, cy + radius - 15], fill=(254, 243, 199))

    # Center text
    bbox = draw.textbbox((0, 0), text, font=font_seal)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw / 2, cy - th / 2 - 2), text, fill=(120, 53, 15), font=font_seal)

def create_certificate(
    output_path,
    issuer_brand,
    header_title,
    recipient_name,
    sub_title,
    course_name,
    course_detail,
    instructor_title,
    credential_id,
    verify_url,
    accent_rgb,
    gold_rgb=(217, 119, 6),
    ribbon_rgb=(180, 83, 9),
    bg_color=(254, 253, 250),
):
    W, H = 1600, 1000
    img = Image.new('RGB', (W, H), color=bg_color)
    draw = ImageDraw.Draw(img)

    fonts_dir = r'C:\Windows\Fonts'
    font_brand = ImageFont.truetype(os.path.join(fonts_dir, 'georgiab.ttf'), 30)
    font_header = ImageFont.truetype(os.path.join(fonts_dir, 'palab.ttf'), 44)
    font_sub = ImageFont.truetype(os.path.join(fonts_dir, 'georgia.ttf'), 20)
    font_name = ImageFont.truetype(os.path.join(fonts_dir, 'palab.ttf'), 54)
    font_for = ImageFont.truetype(os.path.join(fonts_dir, 'georgia.ttf'), 22)
    font_course = ImageFont.truetype(os.path.join(fonts_dir, 'palab.ttf'), 38)
    font_detail = ImageFont.truetype(os.path.join(fonts_dir, 'georgia.ttf'), 19)
    font_sig_name = ImageFont.truetype(os.path.join(fonts_dir, 'palabi.ttf'), 28)
    font_sig_title = ImageFont.truetype(os.path.join(fonts_dir, 'calibri.ttf'), 17)
    font_footer = ImageFont.truetype(os.path.join(fonts_dir, 'calibrib.ttf'), 17)
    font_seal = ImageFont.truetype(os.path.join(fonts_dir, 'palab.ttf'), 15)

    # 1. Clean & Elegant Certificate Border (No blocky corner boxes)
    draw.rectangle([(32, 32), (W - 32, H - 32)], outline=accent_rgb, width=2)
    draw.rectangle([(38, 38), (W - 38, H - 38)], outline=gold_rgb, width=1)

    # 2. Issuer Brand Crest / Logo
    bbox = draw.textbbox((0, 0), issuer_brand, font=font_brand)
    bw = bbox[2] - bbox[0]
    draw.text(((W - bw) / 2, 85), issuer_brand, fill=accent_rgb, font=font_brand)

    # Accent decorative bar below issuer
    bar_w = 200
    draw.line([(W/2 - bar_w/2, 130), (W/2 + bar_w/2, 130)], fill=gold_rgb, width=2)
    draw.ellipse([W/2 - 4, 126, W/2 + 4, 134], fill=accent_rgb)

    # 3. Main Header Title
    bbox = draw.textbbox((0, 0), header_title, font=font_header)
    hw = bbox[2] - bbox[0]
    draw.text(((W - hw) / 2, 150), header_title, fill=accent_rgb, font=font_header)

    # 4. Presentation subtext
    bbox = draw.textbbox((0, 0), sub_title, font=font_sub)
    sw = bbox[2] - bbox[0]
    draw.text(((W - sw) / 2, 230), sub_title, fill=(100, 116, 139), font=font_sub)

    # 5. Recipient Name
    bbox = draw.textbbox((0, 0), recipient_name, font=font_name)
    nw = bbox[2] - bbox[0]
    draw.text(((W - nw) / 2, 275), recipient_name, fill=(15, 23, 42), font=font_name)

    # Elegant underline for recipient name
    name_bar_w = max(nw + 60, 480)
    draw.line([(W/2 - name_bar_w/2, 350), (W/2 + name_bar_w/2, 350)], fill=gold_rgb, width=2)
    draw.ellipse([W/2 - 5, 345, W/2 + 5, 355], fill=gold_rgb)

    # 6. Fulfillment clause
    ful_text = "for successfully completing the curriculum and demonstrating professional competency in"
    bbox = draw.textbbox((0, 0), ful_text, font=font_for)
    fw = bbox[2] - bbox[0]
    draw.text(((W - fw) / 2, 385), ful_text, fill=(71, 85, 105), font=font_for)

    # 7. Course Title (Bold Highlighted)
    bbox = draw.textbbox((0, 0), course_name, font=font_course)
    cw = bbox[2] - bbox[0]
    draw.text(((W - cw) / 2, 440), course_name, fill=accent_rgb, font=font_course)

    # 8. Detailed coursework curriculum note
    bbox = draw.textbbox((0, 0), course_detail, font=font_detail)
    dw = bbox[2] - bbox[0]
    draw.text(((W - dw) / 2, 510), course_detail, fill=(100, 116, 139), font=font_detail)

    # 9. Center Embossed Gold Seal
    draw_ribbon_seal(
        draw,
        cx=W / 2,
        cy=680,
        radius=58,
        seal_color=gold_rgb,
        ribbon_color=ribbon_rgb,
        font_seal=font_seal,
        text="VERIFIED",
    )

    # 10. Left Signature Block (Authorized Instructor)
    draw.line([(180, 760), (460, 760)], fill=(148, 163, 184), width=1)
    if "UDEMY" in issuer_brand.upper():
        sig1_text = "Maximilian S." if "React" in course_name else "Nick Walter"
    elif "COURSERA" in issuer_brand.upper():
        sig1_text = "Jose Portilla"
    else:
        sig1_text = "Quincy Larson"
    draw.text((210, 715), sig1_text, fill=(30, 41, 59), font=font_sig_name)
    draw.text((190, 770), instructor_title, fill=(71, 85, 105), font=font_sig_title)
    draw.text((190, 792), f"Authorized Signature • {issuer_brand}", fill=(148, 163, 184), font=font_sig_title)

    # 11. Right Signature Block (Academic Registrar / Director)
    draw.line([(W - 460, 760), (W - 180, 760)], fill=(148, 163, 184), width=1)
    sig2_text = "Academic Director"
    draw.text((W - 430, 715), sig2_text, fill=(30, 41, 59), font=font_sig_name)
    draw.text((W - 440, 770), "Academic Board & Certification Director", fill=(71, 85, 105), font=font_sig_title)
    draw.text((W - 440, 792), "Official Credential Verification Division", fill=(148, 163, 184), font=font_sig_title)

    # 12. Bottom Verification Bar
    draw.line([(90, 870), (W - 90, 870)], fill=(226, 232, 240), width=1)
    foot_left = f"Certificate ID: {credential_id}  •  Issue Date: 2024"
    foot_right = f"Verification: {verify_url}"
    draw.text((95, 885), foot_left, fill=(100, 116, 139), font=font_footer)
    bbox_r = draw.textbbox((0, 0), foot_right, font=font_footer)
    draw.text((W - 95 - (bbox_r[2] - bbox_r[0]), 885), foot_right, fill=(100, 116, 139), font=font_footer)

    img.save(output_path, quality=96)
    print(f"Saved: {output_path}")

if __name__ == '__main__':
    public_dir = r'd:\PortfolioWebsite\frontend\public'
    dist_dir = r'd:\PortfolioWebsite\frontend\dist'

    certs = [
        {
            'file': 'cert-react.jpg',
            'issuer': 'UDEMY ONLINE ACADEMY',
            'header': 'CERTIFICATE OF COMPLETION',
            'name': 'TRIPUROSUNDARO BEHERA',
            'sub': 'THIS IS PROUDLY PRESENTED TO',
            'course': 'React - The Complete Guide (incl Hooks, React Router, Redux)',
            'detail': 'Covering Modern React 18, Custom Hooks, Redux Toolkit, React Router v6, and Full Application Architecture.',
            'instructor': 'Lead Instructor, Academic Department',
            'id': 'UC-REACT-2024-01',
            'url': 'ude.my/UC-REACT-2024-01',
            'accent': (26, 38, 57),       # Elegant Navy Slate
            'gold': (217, 119, 6),
            'ribbon': (180, 83, 9),
        },
        {
            'file': 'cert-python.jpg',
            'issuer': 'COURSERA ACADEMIC PARTNER',
            'header': 'CERTIFICATE OF ACHIEVEMENT',
            'name': 'TRIPUROSUNDARO BEHERA',
            'sub': 'THIS IS PROUDLY PRESENTED TO',
            'course': 'Python for Data Science and Machine Learning Bootcamp',
            'detail': 'Covering Python 3, NumPy, Pandas, Matplotlib, Scikit-learn, Regression, Classification & Data Analysis.',
            'instructor': 'Jose Portilla, Head of Data Science',
            'id': 'COURSERA-PY-2024',
            'url': 'coursera.org/verify/COURSERA-PY-2024',
            'accent': (0, 68, 148),       # Coursera Royal Blue
            'gold': (217, 119, 6),
            'ribbon': (180, 83, 9),
        },
        {
            'file': 'cert-javascript.jpg',
            'issuer': 'FREECODECAMP DEVELOPER ACADEMY',
            'header': 'DEVELOPER CERTIFICATION',
            'name': 'TRIPUROSUNDARO BEHERA',
            'sub': 'THIS IS PROUDLY PRESENTED TO',
            'course': 'JavaScript Algorithms and Data Structures Certification',
            'detail': 'Representing 300 Hours of Rigorous ECMAScript 6+, Algorithmic Problem Solving, OOP, and Complex Data Structures.',
            'instructor': 'Quincy Larson, Executive Director',
            'id': 'FCC-JS-ALGO-2024',
            'url': 'freecodecamp.org/certification/fcc-js-algo-2024',
            'accent': (15, 23, 42),       # Deep Charcoal Slate
            'gold': (16, 149, 193),       # Cyan-accented gold
            'ribbon': (30, 58, 138),
        },
        {
            'file': 'cert-django.jpg',
            'issuer': 'UDEMY ONLINE ACADEMY',
            'header': 'CERTIFICATE OF COMPLETION',
            'name': 'TRIPUROSUNDARO BEHERA',
            'sub': 'THIS IS PROUDLY PRESENTED TO',
            'course': 'Django 5 & Python Full Stack Web Development',
            'detail': 'Covering Django 5 Framework, PostgreSQL Architecture, REST APIs, ORM Optimization & Secure User Auth.',
            'instructor': 'Lead Instructor, Python Web Architecture',
            'id': 'UC-DJANGO-2024-02',
            'url': 'ude.my/UC-DJANGO-2024-02',
            'accent': (19, 78, 74),       # Django Teal/Emerald
            'gold': (217, 119, 6),
            'ribbon': (180, 83, 9),
        },
    ]

    for c in certs:
        p_path = os.path.join(public_dir, c['file'])
        create_certificate(
            output_path=p_path,
            issuer_brand=c['issuer'],
            header_title=c['header'],
            recipient_name=c['name'],
            sub_title=c['sub'],
            course_name=c['course'],
            course_detail=c['detail'],
            instructor_title=c['instructor'],
            credential_id=c['id'],
            verify_url=c['url'],
            accent_rgb=c['accent'],
            gold_rgb=c['gold'],
            ribbon_rgb=c['ribbon'],
        )
        # Also copy to dist if dist exists
        if os.path.exists(dist_dir):
            d_path = os.path.join(dist_dir, c['file'])
            create_certificate(
                output_path=d_path,
                issuer_brand=c['issuer'],
                header_title=c['header'],
                recipient_name=c['name'],
                sub_title=c['sub'],
                course_name=c['course'],
                course_detail=c['detail'],
                instructor_title=c['instructor'],
                credential_id=c['id'],
                verify_url=c['url'],
                accent_rgb=c['accent'],
                gold_rgb=c['gold'],
                ribbon_rgb=c['ribbon'],
            )
