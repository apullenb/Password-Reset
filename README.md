
### A Password Reset Service Using SendGrid API

#### How It Works:

This microservice is responsible for resetting a user's password by sending them an email containing a unique link generated with SendGrid's email API. 

When the user clicks on the link, the service verifies that the link is valid, and if so, allows the user to enter a new password. The microservice then updates the user's password using the bcrypt hashing algorithm, which is a secure way of encrypting passwords. Finally, the microservice returns a JSON Web Token (JWT) login token to the user, which can be used for subsequent authentication, and the user is automatically logged in.

Overall, this microservice provides a secure and efficient way for users to reset their passwords, while also ensuring that their personal information remains protected.

>  Must have a SendGrid account and Authorization Token from SendGrid and email templates need to be created using SendGrid Client. 
> - User clicks "Forgot Password" and enters their email.
> - User's email & SendGrid template ID is sent to Node service 
> - Node service verifies that the email is registered and looks up user ID. 
> - A token is created and used to generate a link. 
> - The token link, userID, and SendGrid Authorization Token are sent to SendGrid's email template, and an email is sent to the user.
> - The user clicks on the link in the email & the backend verifies the link is valid and has not been used.
> - The user is then able to reset their password which is sent to the Node backend and updated in the users table. 




