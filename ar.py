import cv2 as cv
import numpy as np
import dlib
import random
import time

def get_apple(frame, apple, left, top):

    gray = cv.cvtColor(apple, cv.COLOR_BGR2GRAY)
    _, apple_mask = cv.threshold(gray, 25, 255, cv.THRESH_BINARY_INV)

    right = left+80
    bottom = top+80

    area = frame[top:bottom, left:right]
    show_apple = cv.bitwise_and(area, area, mask=apple_mask)

    final = cv.add(show_apple, apple)
    frame[top:bottom, left:right] = final
    return left

def show_points(frame, points):
    x1 = points.part(63).x
    y1 = points.part(63).y
    x2 = points.part(67).x
    y2 = points.part(67).y

    dist = y2 - y1

    return dist

def time_left(frame, timelimit):
    font = cv.FONT_HERSHEY_SIMPLEX
    deadline = "Time Remaining: " + str(int(timelimit-time.time()))
    cv.putText(frame, deadline, (50, 50), font, 1, (0, 0, 255), 2, cv.LINE_4)

def curr_score(frame, score):
    font = cv.FONT_HERSHEY_SIMPLEX
    deadline = "Score: " + str(int(score))
    cv.putText(frame, deadline, (50, 100), font, 1, (0, 0, 255), 2, cv.LINE_4)

def argame():
    global newapple
    newapple = True
    global points
    score = 0

    cap = cv.VideoCapture(0)

    detect = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor("./shape_predictor_68_face_landmarks.dat")

    apple = cv.imread("./apple.png")
    apple = cv.resize(apple, [80, 80])
    # iscream = cv.imread("./iscream.png")
    # iscream = cv.resize(iscream, [80, 80])
    # egg = cv.imread("./egg.png")
    # egg = cv.resize(egg, [80, 80])
    # print("choose your feast")
    # print("enter 1 for apple, 2 for ice cream, 3 for egg")
    # choice = int(input("choice -> "))
    goahead = True
    image = apple
    # if(choice == 1):
    #     image = apple
    #     goahead = True
    # elif (choice == 2):
    #     image = iscream
    #     goahead = True
    # else:
    #     image = egg
    #     goahead = True

    # print("enter time limit")
    # timechoice = int(input("-> "))
    # timelimit = time.time() + timechoice
    timelimit = time.time() + 30

    while (True and time.time()<timelimit and goahead==True):

        _, frame = cap.read()
        gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
        time_left(frame, timelimit)
        curr_score(frame, score)

        faces = detect(frame)

        if(newapple == True):
            left = random.randint(150, 300)
            top = random.randint(150, 300)
            newapple = False

        get_apple(frame, image, left, top)

        for face in faces:

            points = predictor(gray, face)

            dist = show_points(frame, points)

            x1 = points.part(49).x
            y1 = points.part(49).y

            x2 = points.part(55).x
            y2 = points.part(55).y

            if(dist > 20):
                if (left<=x1 and left+80>=x2):
                    score += 1
                    #if you want to take screenshots of players in funny poses
                    """if((score-1)%5 == 0):
                        path = '/home/bhavya/Documents/embarrasing/img'+str(int(time.time()))+'.jpg'
                        cv.imwrite(path, frame)"""
                    newapple = True
            else:
                newapple = False

        ret, buffer = cv.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        
    if cap.isOpened():
        cap.release()