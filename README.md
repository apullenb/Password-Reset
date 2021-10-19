
### Example of a Password Reset Service Using SendGrid API

#### How It Works:

>  Must have a SendGrid account and Authorization Token from SendGrid and email templates need to be created using SendGrid Client. 
> - User clicks "Forgot Password" and enters their email.
> - User's email & SendGrid template ID is sent to Node service 
> - Node service verifies that the email is registered and looks up user ID. 
> - A token is created and used to generate a link. 
> - The token link, userID, and SendGrid Authorization Token are sent to SendGrid's email template, and an email is sent to the user.
> - The user clicks on the link in the email & the backend verifies the link is valid and has not been used.
> - The user is then able to reset their password which is sent to the Node backend and updated in the users table. 




