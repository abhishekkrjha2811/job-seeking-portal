export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 22px;
              color: #4CAF50;
              background: #e8f5e9;
              border: 1px dashed #4CAF50;
              padding: 10px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Verify Your Email</div>
          <div class="content">
              <p>Hello,</p>
              <p>Thank you for signing up! Please confirm your email address by entering the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you did not create an account, no further action is required. If you have any questions, feel free to contact our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

export const Application_Status_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Status Update</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .status-badge {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              border-radius: 25px;
              font-size: 18px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 1px;
          }
          .status-accepted {
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
          }
          .status-rejected {
              background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
              color: white;
          }
          .status-pending {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
          }
          .job-details {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #667eea;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
          .highlight {
              color: #667eea;
              font-weight: bold;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">📋 Application Status Update</div>
          <div class="content">
              <p>Hello <strong>{applicantName}</strong>,</p>
              <p>We wanted to update you on the status of your application for the position:</p>
              <div class="job-details">
                  <p style="margin: 0; font-size: 18px;"><strong>{jobTitle}</strong></p>
                  <p style="margin: 5px 0 0 0; color: #666;">{companyName}</p>
              </div>
              <p>Your application status has been updated to:</p>
              <div style="text-align: center;">
                  <span class="status-badge status-{statusClass}">{status}</span>
              </div>
              {statusMessage}
              <p>Thank you for your interest in joining our team. We appreciate the time and effort you put into your application.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Job Portal Platform. All rights reserved.</p>
              <p>This is an automated message. Please do not reply to this email.</p>
          </div>
      </div>
  </body>
  </html>
`;

export const Interview_Invitation_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Interview Invitation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .celebration {
              text-align: center;
              font-size: 40px;
              margin: 20px 0;
          }
          .interview-details {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
          }
          .detail-row {
              display: flex;
              margin: 10px 0;
              align-items: center;
          }
          .detail-label {
              font-weight: bold;
              min-width: 120px;
              font-size: 14px;
          }
          .detail-value {
              font-size: 16px;
          }
          .meeting-button {
              display: inline-block;
              padding: 15px 30px;
              margin: 20px auto;
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
              text-decoration: none;
              border-radius: 30px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: transform 0.3s;
              display: block;
              width: fit-content;
          }
          .meeting-button:hover {
              transform: scale(1.05);
          }
          .tips-box {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 5px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">🎉 Interview Invitation</div>
          <div class="content">
              <div class="celebration">🎊 Congratulations! 🎊</div>
              <p>Dear <strong>{candidateName}</strong>,</p>
              <p>We are pleased to inform you that your application for <strong>{jobTitle}</strong> has been shortlisted!</p>
              <p>We would like to invite you for an interview to discuss this opportunity further.</p>
              
              <div class="interview-details">
                  <h3 style="margin-top: 0; text-align: center;">📅 Interview Details</h3>
                  <div class="detail-row">
                      <span class="detail-label">📍 Position:</span>
                      <span class="detail-value">{jobTitle}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">🏢 Company:</span>
                      <span class="detail-value">{companyName}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">📆 Date & Time:</span>
                      <span class="detail-value">{interviewDate}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-label">⏰ Duration:</span>
                      <span class="detail-value">Approximately 30-45 minutes</span>
                  </div>
              </div>

              <div style="text-align: center;">
                  <a href="{meetingLink}" class="meeting-button">🎥 Join Interview Meeting</a>
              </div>

              <div class="tips-box">
                  <p style="margin: 0 0 10px 0;"><strong>💡 Interview Tips:</strong></p>
                  <ul style="margin: 0; padding-left: 20px;">
                      <li>Test your internet connection and camera before the interview</li>
                      <li>Join the meeting 5 minutes early</li>
                      <li>Ensure you're in a quiet, well-lit environment</li>
                      <li>Keep your resume and relevant documents handy</li>
                  </ul>
              </div>

              <p>If you need to reschedule or have any questions, please contact us at the earliest convenience.</p>
              <p>We look forward to meeting you!</p>
              <p style="margin-top: 20px;">Best regards,<br><strong>Hiring Team</strong></p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Job Portal Platform. All rights reserved.</p>
              <p>Please save this email for your reference.</p>
          </div>
      </div>
  </body>
  </html>
`;

export const Job_Posted_Confirmation_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Job Posted Successfully</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .success-icon {
              text-align: center;
              font-size: 60px;
              margin: 20px 0;
          }
          .job-summary {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
          }
          .summary-item {
              margin: 10px 0;
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .summary-item:last-child {
              border-bottom: none;
          }
          .label {
              font-weight: bold;
              opacity: 0.9;
          }
          .value {
              text-align: right;
          }
          .action-button {
              display: inline-block;
              padding: 15px 30px;
              margin: 20px auto;
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              text-decoration: none;
              border-radius: 30px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: transform 0.3s;
              display: block;
              width: fit-content;
          }
          .action-button:hover {
              transform: scale(1.05);
          }
          .info-box {
              background: #e3f2fd;
              border-left: 4px solid #2196F3;
              padding: 15px;
              margin: 20px 0;
              border-radius: 5px;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
          .stats-container {
              display: flex;
              justify-content: space-around;
              margin: 20px 0;
              text-align: center;
          }
          .stat-box {
              flex: 1;
              padding: 15px;
          }
          .stat-number {
              font-size: 32px;
              font-weight: bold;
              color: #667eea;
          }
          .stat-label {
              font-size: 14px;
              color: #666;
              margin-top: 5px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Job Posted Successfully!</div>
          <div class="content">
              <div class="success-icon"></div>
              <p>Dear <strong>{posterName}</strong>,</p>
              <p>Thank you for posting a job on our platform! Your job listing is now live and visible to candidates.</p>
              
              <div class="job-summary">
                  <h3 style="margin-top: 0; text-align: center;">Job Summary</h3>
                  <div class="summary-item">
                      <span class="label">Job Title:</span>
                      <span class="value">{jobTitle}</span>
                  </div>
                  <div class="summary-item">
                      <span class="label">Category:</span>
                      <span class="value">{category}</span>
                  </div>
                  <div class="summary-item">
                      <span class="label">Location:</span>
                      <span class="value">{location}</span>
                  </div>
                  <div class="summary-item">
                      <span class="label">Posted Date:</span>
                      <span class="value">{postedDate}</span>
                  </div>
                  <div class="summary-item">
                      <span class="label">Status:</span>
                      <span class="value">🟢 Active</span>
                  </div>
              </div>

              <div style="text-align: center;">
                  <a href="{jobViewLink}" class="action-button"> View Your Job Posting</a>
              </div>

              <div class="info-box">
                  <p style="margin: 0 0 10px 0;"><strong> What's Next?</strong></p>
                  <ul style="margin: 0; padding-left: 20px;">
                      <li>Your job is now visible to all active job seekers</li>
                      <li>You'll receive notifications when candidates apply</li>
                      <li>You can manage applications from your dashboard</li>
                      <li>Edit or close the job posting anytime from your account</li>
                  </ul>
              </div>

             

              <p>We'll keep you updated on the progress of your job posting. Good luck finding the perfect candidate!</p>
              <p style="margin-top: 20px;">Best regards,<br><strong>Job Portal Team</strong></p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Job Portal Platform. All rights reserved.</p>
              <p>Need help? Contact us at team nexus , Abhishek Kumar jha </p>
          </div>
      </div>
  </body>
  </html>
`;




export const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Community</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #007BFF;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 26px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .welcome-message {
              font-size: 18px;
              margin: 20px 0;
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color: #007BFF;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #0056b3;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Welcome to Our Community!</div>
          <div class="content">
              <p class="welcome-message">Hello {name},</p>
              <p>We’re thrilled to have you join us! Your registration was successful, and we’re committed to providing you with the best experience possible.</p>
              <p>Here’s how you can get started:</p>
              <ul>
                  <li>Explore our features and customize your experience.</li>
                  <li>Stay informed by checking out our blog for the latest updates and tips.</li>
                  <li>Reach out to our support team if you have any questions or need assistance.</li>
              </ul>
              <a href="https://fonevit-website-frontend.onrender.com/login" class="button">Get Started</a>
              <p>If you need any help, don’t hesitate to contact us. We’re here to support you every step of the way.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;