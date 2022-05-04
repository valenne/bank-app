
# Bank-bdc-app

## Project Description
<p>Proyect what replicate the process of the user from register to transfer $$ to a user</p>

## Prerequisites

<p>Before you begin, ensure you have met the following requirements:</p>

<ol>
  <li>You have installed the latest version of following dependency</li>
    <ul>
      <li>Express</li>
      <li>Bootstrap</li>
      <li>express-handlebars</li>
      <li>body-parser</li>
      <li>cookie-parser</li>
      <li>doteenv</li>
      <li>fs</li>
      <li>jsonwebtoken</li>
      <li>pg</li>
    </ul>
  <li>You have a <Windows/Linux/Mac> machine. State which OS is supported/which is not.</li>
</ol>

## Installing bank-bdc-app

<p>WIndows:</p>

```
git clone "https://github.com/valenne/bank-app.git" <your repository>
```
## Using bank-bdc-app

<p>To use <bank-bdc-app>, follow these steps:</p>
  
<ol>
  <li>Into the file db/script.sql you can see the code to create the db and tables for this proyect</li>
  <li>Into the file .env, you need to complete with yours credentials according to your db</li>
  <li>Into the file .env, you need to complete the line "SECRET_KEY", value used to sign the jwt</li>
  <li>Register minimun of two user</li>
  <li>The login is protected by validating some data like rut, password</li>
  <li>You can transfer $$ from user registered on database (psql)</li>
  <li>The transactions are saved on db</li>
</ol>

## Important

<p>The application is based on information from chile, the validation of the login in specific the "rut" value, is based with the following structure: </p>
<p>rut: _x.xxx.xxx-x or xx.xxx.xxx-x</p>
<p>The last digit of the value is obtainining from algoritm called "Module 11"</p>

## Contributors

* [@valenne](https://github.com/valenne) 📖

## License
<!--- If you're not sure which open license to use see https://choosealicense.com/--->

This project uses the following license: [working on that](<link>).
