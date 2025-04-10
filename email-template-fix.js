const fs = require('fs');

// Read the file
const filePath = 'server/email-service.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Define the old HTML template
const oldHtmlTemplate = `
      <h2>Confirm Your Email Address</h2>
      <p>Hi \${name},</p>
      <p>Thank you for subscribing to my newsletter. Please confirm your email address by clicking the link below:</p>
      <p><a href="\${confirmationUrl}" style="background-color: #FF4D4D; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Confirm Email Address</a></p>
      <p>Or copy and paste this URL into your browser: \${confirmationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
      <p>Best regards,<br>Totrakool Khongsap</p>
    `;

// Define the new HTML template with better button compatibility
const newHtmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Your Email Address</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; margin-bottom: 20px;">Confirm Your Email Address</h2>
        <p>Hi \${name},</p>
        <p>Thank you for subscribing to my newsletter. Please confirm your email address by clicking the button below:</p>
        <table cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="border-radius: 5px;" bgcolor="#FF4D4D">
              <a href="\${confirmationUrl}" 
                target="_blank" 
                style="padding: 10px 20px; border: 1px solid #FF4D4D; border-radius: 5px; font-family: Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: bold; display: inline-block; background-color: #FF4D4D;">
                  Confirm Email Address
              </a>
            </td>
          </tr>
        </table>
        <p style="margin-top: 20px;">Or copy and paste this URL into your browser: <a href="\${confirmationUrl}" style="color: #0066cc;">\${confirmationUrl}</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
        <p>Best regards,<br>Totrakool Khongsap</p>
      </body>
      </html>
    `;

// Replace the HTML template in the content
const updatedContent = content.replace(oldHtmlTemplate, newHtmlTemplate);

// Write the updated content back to the file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('Email template updated successfully!');
