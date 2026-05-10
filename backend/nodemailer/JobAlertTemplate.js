export const Job_Alert_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job Alert</title>
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
              padding: 30px 20px;
              text-align: center;
          }
          .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
          }
          .header p {
              margin: 10px 0 0 0;
              font-size: 14px;
              opacity: 0.9;
          }
          .content {
              padding: 30px;
              line-height: 1.8;
          }
          .job-badge {
              display: inline-block;
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
              margin-bottom: 20px;
          }
          .job-title {
              font-size: 24px;
              font-weight: bold;
              color: #667eea;
              margin: 15px 0;
          }
          .job-details {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #667eea;
          }
          .detail-row {
              display: flex;
              margin: 12px 0;
              align-items: flex-start;
          }
          .detail-icon {
              min-width: 30px;
              font-size: 18px;
          }
          .detail-label {
              font-weight: bold;
              min-width: 100px;
              color: #555;
          }
          .detail-value {
              color: #333;
              flex: 1;
          }
          .salary-highlight {
              background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
              color: white;
              padding: 15px 20px;
              border-radius: 8px;
              text-align: center;
              margin: 20px 0;
              font-size: 20px;
              font-weight: bold;
          }
          .description {
              background: #fff;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              border: 1px solid #e0e0e0;
              color: #555;
              line-height: 1.6;
          }
          .apply-button {
              display: block;
              width: fit-content;
              margin: 30px auto;
              padding: 15px 40px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              border-radius: 30px;
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              transition: transform 0.3s;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          }
          .apply-button:hover {
              transform: translateY(-2px);
          }
          .document-link {
              display: inline-block;
              margin: 10px 0;
              padding: 10px 20px;
              background: #e3f2fd;
              color: #1976d2;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              transition: background 0.3s;
          }
          .document-link:hover {
              background: #bbdefb;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 20px;
              text-align: center;
              color: #777;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
          .posted-by {
              background: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
              border-radius: 5px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>🚀 New Job Opportunity!</h1>
              <p>A new job matching your profile has been posted</p>
          </div>
          <div class="content">
              <span class="job-badge">🆕 Just Posted</span>
              
              <h2 class="job-title">{jobTitle}</h2>
              
              <div class="salary-highlight">
                  💰 {salary}
              </div>

              <div class="job-details">
                  <div class="detail-row">
                      <span class="detail-icon">📂</span>
                      <span class="detail-label">Category:</span>
                      <span class="detail-value">{category}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-icon">📍</span>
                      <span class="detail-label">Location:</span>
                      <span class="detail-value">{location}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-icon">🏢</span>
                      <span class="detail-label">City:</span>
                      <span class="detail-value">{city}</span>
                  </div>
                  <div class="detail-row">
                      <span class="detail-icon">📅</span>
                      <span class="detail-label">Posted On:</span>
                      <span class="detail-value">{postedDate}</span>
                  </div>
              </div>

              <div class="posted-by">
                  <p style="margin: 0;"><strong>📢 Posted By:</strong> {posterName}</p>
              </div>

              <div class="description">
                  <p style="margin: 0 0 5px 0; font-weight: bold; color: #667eea;">📋 Job Description:</p>
                  <p style="margin: 0;">{description}</p>
              </div>

              {jobDocumentSection}

              <a href="{applyLink}" class="apply-button">
                  ✨ Apply Now
              </a>

              <p style="text-align: center; color: #999; font-size: 14px; margin-top: 20px;">
                  ⚡ Don't miss this opportunity! Apply early to increase your chances.
              </p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Nexus Portal. All rights reserved.</p>
              <p>You received this email because you are registered as a student on our job portal.</p>
              <p style="margin-top: 10px;">
                  <a href="#" style="color: #667eea; text-decoration: none;">View All Jobs</a> | 
                  <a href="#" style="color: #667eea; text-decoration: none;">Manage Preferences</a>
              </p>
          </div>
      </div>
  </body>
  </html>
`;
