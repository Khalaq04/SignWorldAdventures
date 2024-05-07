from flask import Flask, render_template, request, redirect, url_for, Response
import random
from ar import *
from database import db
from models import users
from flask_sqlalchemy import SQLAlchemy
from config import LocalDevelopmentConfig

app = None

def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(LocalDevelopmentConfig)

    db.init_app(app)
    app.app_context().push()

    return app

app = create_app()

@app.route('/', methods = ['GET', 'POST'])
def login():
    if(request.method == 'GET'):
        return render_template('login.html')

    else:
        usn = request.form["usn"]
        pwd = request.form["pwd"]
        id = users.query.filter_by(usn = usn).all()

        if(len(id)):
            if(pwd == id[0].pwd):
                return redirect(url_for('home', id=id[0].id))
            else:
                return redirect('/')
        else:
            return redirect('/register')
        
@app.route('/register', methods=['GET', 'POST'])
def register():
    if(request.method == 'GET'):
        print("get")
        return render_template('register.html')
    else:
        print("here")
        usn = request.form["usn"]
        pwd = request.form["pwd"]

        user = users(usn=usn, pwd=pwd, q1=0, q2=0, q3=0, q4=0, q5=0, q6=0, g1=0, g2=0, g3=0, unlk=1)
        db.session.add(user)
        db.session.commit()
        print("added")
        return redirect('/')
    
@app.route('/home/<int:id>', methods=['GET', 'POST'])
def home(id):
    global unlocked
    print(id)
    # unclocked = 9
    unlocked = users.query.filter_by(id=id).all()[0].unlk
    return render_template('home.html', ulk = unlocked, id=id)

@app.route('/tutorial/<num>/<int:id>', methods=['GET', 'POST'])
def tutorial(num, id):
    temp = "tutorial"+str(num)+".html"
    return render_template(temp, id=id) 

@app.route('/game/<num>')
def game(num):

    temp = "game"+str(num)+".html"

    if(int(num) == 1):
        ind = random.sample(range(1,27), 6)
        ind = list(map(str, ind))
        return render_template(temp, ind=ind)  
    else:
        return render_template(temp)
    
@app.route('/quiz/<num>/<int:id>')
def quiz(num, id):
    global quizno
    quizno = num
    temp = "quiz"+str(num)+".html"
    return render_template(temp, id=id)

@app.route('/quizres/<int:id>/<int:quizno>/<string:score>', methods = ['POST'])
def quizrez(id, quizno, score):
    
    user = users.query.filter_by(id = id).all()[0]

    print(quizno, score, id)
    unlocked = user.unlk
    
    if(quizno == 1 and float(user.q1)<float(score)):
        user.q1 = score
    elif(quizno == 2 and float(user.q2)<float(score)):
        user.q2 = score
    elif(quizno == 3 and float(user.q3)<float(score)):
        user.q3 = score
    elif(quizno == 4 and float(user.q4)<float(score)):
        user.q4 = score
    elif(quizno == 5 and float(user.q5)<float(score)):
        user.q5 = score
    elif(quizno == 6 and float(user.q6)<float(score)):
        user.q6 = score
    
    if(unlocked == quizno):
        print(unlocked)
        if((unlocked+1)%3 == 0):
            print("here")
            user.unlk = unlocked+2
            unlocked = unlocked+2
        else:
            user.unlk = unlocked+1
            unlocked = unlocked+1

    db.session.commit()
    return "updated"
    
@app.route('/video_capture')
def video_capture():
    return Response(argame(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)