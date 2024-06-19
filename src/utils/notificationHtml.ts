export const notifyHtml = ({
  requesterName,
  resourceTitle,
  resourceDescription,
  resourceLink,
}: {
  requesterName: string;
  resourceTitle: string;
  resourceDescription: string;
  resourceLink: string;
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resource Request Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                margin: 40px auto;
                max-width: 600px;
            }
            .header {
                background-color: #76ABAE;
                color: #ffffff;
                padding: 10px;
                text-align: center;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            .content {
                padding: 20px;
            }
            .footer {
                background-color: #76ABAE;
                color: #ffffff;
                padding: 10px;
                text-align: center;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                font-size: 12px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #76ABAE;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Resource Request Notification</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p><strong>${requesterName}</strong> has requested access to the following resource:</p>
                <p><strong>Title:</strong> ${resourceTitle}</p>
                <p><strong>Description:</strong> ${resourceDescription}</p>
                <a href="${resourceLink}" class="button">View Resource</a>
            </div>
            <div class="footer">
                <p>&copy; 2024 ScholarHub. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// export const notifyAllRelatedresource = (resourceArr: IResource[]) => {};
