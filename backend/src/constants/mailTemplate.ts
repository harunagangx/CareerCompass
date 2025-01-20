export const VERIFY_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px 0;">
            <h1 style="font-size: 24px; color: #333; margin: 0;">Welcome to CareerCompass</h1>
        </div>
        <div style="margin: 20px 0; font-size: 16px; color: #555; line-height: 1.6;">
            <p style="margin: 10px 0;"><p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p></p>
            <div style="text-align: center; margin: 20px 0;">
                <p style="font-size: 20px; color: #333; font-weight: bold; background-color: #f0f0f0; padding: 10px; border-radius: 4px; display: inline-block;">{verificationCode}</p>
            </div>
            <p style="margin: 10px 0;">Enter this OTP on the registration page to verify your email address. Please note that this OTP is valid for the next 15 minutes.</p>
            <p style="margin: 10px 0;">If you didn't create an account with us, please ignore this email.</p>
    </div>
</body>
</html>
`;

export const APPLIED_JOB_TEMPLATE = ``;

export const APPROVED_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Application Approval</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px 0;">
            <h1 style="font-size: 24px; color: #333; margin: 0;">Congratulations!</h1>
        </div>
        <div style="margin: 20px 0; font-size: 16px; color: #555; line-height: 1.6;">
            <p style="margin: 10px 0;">Dear {CandidateName},</p>
            <p style="margin: 10px 0;">We are delighted to inform you that your application for the {JobName} position at {CompanyName} has been approved. Congratulations on this exciting achievement!</p>
            <p style="margin: 10px 0;">We were highly impressed with your skills, experience, and enthusiasm, and we believe you will make a valuable addition to our team. We are eager to have you join us and contribute to the success of [Company Name].</p>
            <p style="margin: 10px 0;">To proceed, please find attached additional details about your employment, including start dates, onboarding procedures, and other essential information. If you have any questions or require further assistance, feel free to reach out.</p>
            <p style="margin: 10px 0;">Once again, congratulations on this milestone. We look forward to welcoming you to our team!</p>
        </div>
    </div>
</body>
</html>
`;

export const REJECTED_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Application Rejection</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px 0;">
            <h1 style="font-size: 24px; color: #333; margin: 0;">Thank You for Applying</h1>
        </div>
        <div style="margin: 20px 0; font-size: 16px; color: #555; line-height: 1.6;">
            <p style="margin: 10px 0;">Dear {CandidateName},</p>
            <p style="margin: 10px 0;">Thank you for taking the time to apply for the {JobName} position at {CompanyName}. We appreciate your interest in joining our team.</p>
            <p style="margin: 10px 0;">After carefully reviewing your application, we regret to inform you that you were not selected for this position. This decision was not easy, as we received applications from many talented candidates, and the competition was high.</p>
            <p style="margin: 10px 0;">Please don't be discouraged. We encourage you to apply for future openings that match your skills and interests. We will keep your resume on file for any suitable opportunities that may arise.</p>
            <p style="margin: 10px 0;">Thank you once again for considering [Company Name] as a potential employer. We wish you all the best in your job search and future endeavors.</p>
        </div>
    </div>
</body>
</html>
`;
