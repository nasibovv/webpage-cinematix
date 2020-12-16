from flask_wtf import Form 
from wtforms import StringField, PasswordField, SubmitField, validators
from wtforms.validators import InputRequired, EqualTo, Email

class LoginForm(Form):
    email = StringField('Email', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])

class RegisterForm(Form):
    name = StringField('Name', validators=[InputRequired()])
    password = PasswordField('Password',validators=[InputRequired(), EqualTo('confPassword', message="Passwords must match")])
    confPassword = PasswordField('Repeat Password')
    email = StringField('Email', validators=[InputRequired(), Email()])   
