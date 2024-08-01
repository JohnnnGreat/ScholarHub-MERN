export const notifyHtml = (resourceInfo: any) => {
  const {
    title,
    id,
    datePublished,
    subjectArea,
    coAuthors,
    description,
    resourceType,
    uploadBy,
    fileUrl,
  } = resourceInfo;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resource Notification</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #4CAF50;
                color: #ffffff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            .footer {
                background-color: #f1f1f1;
                color: #555;
                padding: 10px;
                text-align: center;
                font-size: 12px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4CAF50;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 20px;
            }
            .details {
                margin-top: 20px;
            }
            .details h2 {
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .details p {
                margin: 5px 0;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Resource Notification</h1>
            </div>
            <div class="content">
                <h1>${title}</h1>
               
                <p><strong>Published Date:</strong> ${new Date(
                  datePublished
                ).toLocaleDateString()}</p>
                <p><strong>Subject Area:</strong> ${subjectArea}</p>
                ${coAuthors ? `<p><strong>Co-Authors:</strong> ${coAuthors}</p>` : ""}
                ${description ? `<p><strong>Description:</strong> ${description}</p>` : ""}
                <p><strong>Type:</strong> ${resourceType}</p>
                <p><strong>Uploaded By:</strong> ${uploadBy}</p>
                ${
                  fileUrl
                    ? `<a href="https://scholar-six.vercel.app/resource/${id}" class="button">View Resource</a>`
                    : ""
                }

                <a href="https://scholar-six.vercel.app/resource/${id}" class="button">View Resource</a>
            </div>
            <div class="footer">
                <p>&copy; 2024 ScholarHub. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
