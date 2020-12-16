from flask import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import time, math, os, random, string
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import LoginManager, login_user, logout_user, current_user, UserMixin, login_required, AnonymousUserMixin
from form import RegisterForm, LoginForm


# App configurations
app = Flask(__name__,static_folder='./static',static_url_path='/')
app.config['SECRET_KEY'] = os.urandom(16)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'Login' #?

class userInfo(UserMixin, db.Model):
    __tablename__ = 'userInfo'

    id = db.Column(db.Integer, primary_key = True)

    name = db.Column(db.String(50))
    email = db.Column(db.String(50), unique = True)
    password = db.Column(db.String(200))


    date_created = db.Column(db.DateTime(timezone=True), default=func.now())


    def __init__(self, password, name, email):
        self.password = password
        self.name = name
        self.email = email

# Functions for login process

class Anonymous(AnonymousUserMixin):
  def __init__(self):
    self.username = 'Guest'
    self.name = 'Guest'


login_manager.anonymous_user = Anonymous

@login_manager.user_loader
def load_user(user_id):
    return userInfo.query.get(user_id)


@app.route('/')   
def home():
    return render_template('index.html')

@app.route('/about')   
def about():
    return render_template('about.html')

@app.route('/contact')   
def contact():
    return render_template('contact.html')


@app.route('/login', methods = ['GET', 'POST']) #all about login
def Login():
    form = LoginForm()


    if request.method == 'POST':
        if form.validate_on_submit():
            user = userInfo.query.filter_by(email = form.email.data).first()

            if user:
                if check_password_hash(user.password, form.password.data):
                    login_user(user)

                    return redirect('/')

                flash("Invalid Credentials")


        

    return render_template('login.html', form = form)

@app.route('/register', methods = ['GET','POST'])
def register():
    form = RegisterForm()

    if form.validate_on_submit():
        hashed_password = generate_password_hash(form.password.data, method='sha256')

        name = form.name.data
        print(name)
        password = hashed_password
        email = form.email.data
        

        new_register = userInfo(name = name, password = password, email = email )

        try:
            db.session.add(new_register)
            db.session.commit()
            flash("Registration was successfull!")
        except:
            flash("Unique Credentials has already exist! Try to Log In!")

        return redirect(url_for('Login'))
  
    return render_template('register.html', form = form)



@app.route('/logout')
@login_required
def logout():
    logout_user()

    return redirect(url_for('home'))

if __name__ =='__main__':  
    app.run(debug = True)  