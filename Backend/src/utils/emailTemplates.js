export const emailVerificationTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 480px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #1a202c;
        font-size: 24px;
        margin-bottom: 24px;
      }
      p {
        font-size: 16px;
        color: #4a5568;
        line-height: 1.5;
      }
      .otp-box {
        margin: 30px 0;
        padding: 20px 0;
        font-size: 32px;
        font-weight: 700;
        letter-spacing: 4px;
        color: #2c5282;
        background-color: #ebf4ff;
        border-radius: 6px;
        text-align: center;
        user-select: all;
      }
      .footer {
        font-size: 12px;
        color: #a0aec0;
        margin-top: 40px;
        text-align: center;
      }
      @media (max-width: 520px) {
        .container {
          margin: 20px;
          padding: 20px;
        }
        h1 {
          font-size: 20px;
        }
        .otp-box {
          font-size: 28px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Email Verification OTP</h1>
      <p>Dear user,</p>
      <p>Use the following One-Time Password (OTP) to verify your email address.</p>

      <div class="otp-box">${otp}</div>

      <p>This OTP will expire in <strong>10 minutes</strong>. Please do not share it with anyone.</p>

      <p>If you didn't request this, please ignore this email or contact support.</p>

      <div class="footer">
        &copy; ${(new Date()).getFullYear()} MovieAI. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
