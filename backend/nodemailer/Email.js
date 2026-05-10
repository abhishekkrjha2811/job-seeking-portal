import { transporter } from "./Email.confiq.js";
import { 
    Application_Status_Email_Template, 
    Verification_Email_Template, 
    Welcome_Email_Template,
    Interview_Invitation_Email_Template,
    Job_Posted_Confirmation_Email_Template
} from "./EmailTemplate.js";
import { Job_Alert_Email_Template } from "./JobAlertTemplate.js";

const EMAIL_FROM = process.env.EMAIL_FROM || '"Nexus Portal" <no-reply@example.com>';


export const sendVerificationEamil=async(email,verificationCode)=>{
    try {
     const response=   await transporter.sendMail({
            from: EMAIL_FROM,

            to: email, // list of receivers
            subject: "Verify your Email", // Subject line
            text: "Verify your Email", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}
export const sendWelcomeEmail=async(email,name,portalLink)=>{
    try {
     const frontendUrl = portalLink || process.env.FRONTEND_URL || "http://localhost:5173";
     const response=   await transporter.sendMail({
            from: EMAIL_FROM,

            to: email, // list of receivers
            subject: "Welcome Email", // Subject line
            text: "Welcome Email", // plain text body
            html: Welcome_Email_Template.replace("{name}",name).replace("{portalLink}",frontendUrl)
        })
        console.log('Email send Successfully',response)
    } catch (error) {
        console.log('Email error',error)
    }
}


export const ApplicationStatus = async(email, applicantName, jobTitle, companyName, status) => {
    try {
        // Determine status class and message based on status
        let statusClass = 'pending';
        let statusMessage = '';
        
        if (status.toLowerCase() === 'accepted') {
            statusClass = 'accepted';
            statusMessage = '<p style="color: #11998e; font-weight: bold;">🎉 Congratulations! Your application has been accepted. We will contact you soon with next steps.</p>';
        } else if (status.toLowerCase() === 'rejected') {
            statusClass = 'rejected';
            statusMessage = '<p>We appreciate your interest, but we have decided to move forward with other candidates. We encourage you to apply for other positions that match your skills.</p>';
        } else {
            statusMessage = '<p>Your application is currently under review. We will update you once a decision has been made.</p>';
        }

        const htmlContent = Application_Status_Email_Template
            .replace("{applicantName}", applicantName)
            .replace("{jobTitle}", jobTitle)
            .replace("{companyName}", companyName)
            .replace("{status}", status)
            .replace("{statusClass}", statusClass)
            .replace("{statusMessage}", statusMessage);

        const response = await transporter.sendMail({
            from: EMAIL_FROM,
            to: email,
            subject: `Application Status Update - ${status}`,
            text: `Your application status for ${jobTitle} has been updated to: ${status}`,
            html: htmlContent
        });
        
        console.log('Application Status Email sent Successfully', response);
    } catch (error) {
        console.log('Application Status Email error', error);
    }
}

export const sendInterviewInvitation = async(email, candidateName, jobTitle, companyName, interviewDate, meetingLink) => {
    try {
        const htmlContent = Interview_Invitation_Email_Template
            .replace("{candidateName}", candidateName)
            .replace("{jobTitle}", jobTitle)
            .replace("{companyName}", companyName)
            .replace("{interviewDate}", interviewDate)
            .replace("{meetingLink}", meetingLink)
            .replace("{meetingLink}", meetingLink); // Replace twice as it appears twice

        const response = await transporter.sendMail({
            from: EMAIL_FROM,
            to: email,
            subject: `Interview Invitation - ${jobTitle}`,
            text: `You have been invited for an interview for ${jobTitle} on ${interviewDate}`,
            html: htmlContent
        });
        
        console.log('Interview Invitation Email sent Successfully', response);
    } catch (error) {
        console.log('Interview Invitation Email error', error);
    }
}

export const sendJobPostedConfirmation = async(email, posterName, jobTitle, category, location, postedDate, jobViewLink) => {
    try {
        const htmlContent = Job_Posted_Confirmation_Email_Template
            .replace("{posterName}", posterName)
            .replace("{jobTitle}", jobTitle)
            .replace("{category}", category)
            .replace("{location}", location)
            .replace("{postedDate}", postedDate)
            .replace("{jobViewLink}", jobViewLink);

        const response = await transporter.sendMail({
            from: EMAIL_FROM,
            to: email,
            subject: `Job Posted Successfully - ${jobTitle}`,
            text: `Your job posting for ${jobTitle} is now live!`,
            html: htmlContent
        });
        
        console.log('Job Posted Confirmation Email sent Successfully', response);
    } catch (error) {
        console.log('Job Posted Confirmation Email error', error);
    }
}



export const NotifyAll = async(
    posterEmail, 
    posterName, 
    jobTitle, 
    jobDescription, 
    salary, 
    location, 
    city, 
    jobDocument, 
    category, 
    fullLocation, 
    postedDate, 
    onlyStudents
) => {
    try {
        // Extract all student emails except the job poster
        const recipientEmails = onlyStudents
            .filter(user => user.email !== posterEmail)
            .map(user => user.email)
            .join(',');

        if (!recipientEmails) {
            console.log('No recipients to notify');
            return;
        }

        // Create job document section if document exists
        let jobDocumentSection = '';
        if (jobDocument && jobDocument.url) {
            jobDocumentSection = `
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${jobDocument.url}" class="document-link" target="_blank">
                        📄 View Job Document
                    </a>
                </div>
            `;
        }

        const htmlContent = Job_Alert_Email_Template
            .replace("{jobTitle}", jobTitle)
            .replace("{salary}", salary)
            .replace("{category}", category)
            .replace("{location}", fullLocation)
            .replace("{city}", city)
            .replace("{postedDate}", postedDate)
            .replace("{posterName}", posterName)
            .replace("{description}", jobDescription.substring(0, 300) + (jobDescription.length > 300 ? '...' : ''))
            .replace("{jobDocumentSection}", jobDocumentSection)
            .replace("{applyLink}", "http://localhost:5173/jobs"); // Update with your actual frontend URL

        const response = await transporter.sendMail({
            from: EMAIL_FROM,
            bcc: recipientEmails, // Use BCC for bulk emails
            subject: `🚀 New Job Alert: ${jobTitle} | Apply Now!`,
            text: `New Job Posted: ${jobTitle} by ${posterName}. Salary: ${salary}. Location: ${fullLocation}. Apply now!`,
            html: htmlContent
        });
        
        console.log(`✅ Bulk Email sent Successfully to ${onlyStudents.length - 1} students`);
        return response;
    } catch (error) {
        console.log('Bulk Email error', error);
    }
}

