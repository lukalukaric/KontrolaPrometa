from PIL import Image, ImageTk
import cv2
from tkinter import filedialog, Label, Button
import numpy as np
import tkinter as tk
import imutils
import pymongo
import pytesseract as tess
from datetime import datetime

import bson
import random

#ime tablice
#datum kdaj je blo posneto
#img avta
#img tablice

class Display(object):
    def __init__(self):
        self.root = tk.Tk()
        self.root.geometry("1400x1080") 
        self.button2 = tk.Button(self.root, text="Load video", width=20, command=self.show_video)
        self.button2.grid(row=0, column=0)
        self.canvas = tk.Canvas(self.root, width=800, height=600)
        self.canvas.grid(row=1, columnspan=3)

        self.canvas1 = tk.Canvas(self.root, width=800, height=600)
        self.canvas1.grid(row=1, column=3, columnspan=3)

        self.canvas2 = tk.Canvas(self.root, width=800, height=600)
        self.canvas2.grid(row=3, column=0, columnspan=3)

        self.canvas3 = tk.Canvas(self.root, width=800, height=600)
        self.canvas3.grid(row=3, column=3, columnspan=3)

        self.frames = []
        self.frames_for_canny = []
        self.frames_for_sobel = []
        self.flas = 0
        self.flas1 = 0
        self.count = 0
        self.records = 0
        self.count_video = 0
        self.vid = 0
        self.rec = 0
        self.i = 0
        self.j = 0
        self.config = "-c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 --psm 7"
        self.car = cv2.CascadeClassifier('all_cars.xml')
        self.rect = np.ones((5,13), dtype=np.uint8)
        self.smallSquare = np.ones((3,3),dtype=np.uint8)
        self.locations = [[46.55075608115016, 15.633087715374364],[46.55632373601495, 15.621752854082139],[46.562396889879494, 15.630879625512241], [46.55192027439726, 15.622709693022392],[46.55192027439726, 15.622709693022392],[46.5441753889792, 15.62881874164093]]
        self.loop = self.root.mainloop()

    def opening_morf(self, img,kernel,iter):
        new_img = cv2.erode(img, kernel, iterations=iter)
        return cv2.dilate(new_img, kernel, iterations=iter)
    
    def closing_morf(self, img,kernel,iter):
        new_img = cv2.dilate(img, kernel, iterations=iter)
        return cv2.erode(new_img, kernel, iterations=iter)

    def show_image(self):
        self.img_path = filedialog.askopenfilename()
        self.img = cv2.imread(self.img_path)
        self.img = Image.fromarray(self.resize_pic)
        self.img = ImageTk.PhotoImage(image=self.img)
        self.canvas.create_image(0 ,0, anchor=tk.NW, image=self.img)
        


    def show_video(self):
        self.btn1 = tk.Button(self.root, text="Stop", width=20, command=self.stop)
        self.btn1.grid(row=0, column=2)
        self.cap_video = cv2.VideoCapture("sevnica3.mp4")
        self.play_video()

    def play_video(self):
        self.vid = 1
        while True:
            ret, frame = self.cap_video.read()
            self.frames.append(frame)
            if ret == False:
                self.flas = 0
                self.update()
                break
            

    def update(self):
        if self.rec == 0:
            self.res = cv2.resize(self.frames[self.count_video], (800, 600))
            self.cars = self.car.detectMultiScale(self.frames[self.count_video], 1.15, 4)
            
            self.images = Image.fromarray(self.res)
            self.images = ImageTk.PhotoImage(self.images)
            self.canvas.create_image(0, 0, anchor=tk.NW, image=self.images)
            
            self.detect()
            
            self.count_video += 1
            if self.flas == 0:
                self.root.after(50, self.update) 

    def detect(self):
        for (x,y,i,j) in self.cars:
            self.plate = self.frames[self.count_video][y:y + i, x:x + j]
            if self.plate.shape[0] > 120 and self.plate.shape[1] > 120: 
                self.showImage = self.plate.copy()
                self.images1 = Image.fromarray(self.plate)
                self.images1 = ImageTk.PhotoImage(self.images1)
                self.canvas1.create_image(0, 0, anchor=tk.NW, image=self.images1)
                    
       
    def detect_plate(self):
        self.newLabel = tk.Label(self.root, text="Izberite sliko z tablico")
        self.newLabel.grid(row=2, column=0)
        self.newBtnForw = tk.Button(self.root, text="Next",width=20, command=self.forw)
        self.newBtnForw.grid(row=3, column=1)
        self.newBtnForw = tk.Button(self.root, text="Back",width=20, command=self.back)
        self.newBtnForw.grid(row=3, column=0)
        self.newBtnForw = tk.Button(self.root, text="RightOne",width=20, command=self.send_data)
        self.newBtnForw.grid(row=3, column=2)
        self.newLabel = tk.Label(self.root, text="Ce ni prikazalo tablice, lahko uporabit drugo zaznavo")
        self.newLabel.grid(row=2, column=3)
        self.newBtnForw = tk.Button(self.root, text="Other detection",width=20, command=self.sobelDetect)
        self.newBtnForw.grid(row=3, column=3)
        self.detect_plate_prep()
        self.detect_plate_canny()
        self.show_image_plate()
        

    def sobelDetect(self):
        self.newBtnForw = tk.Button(self.root, text="Next",width=20, command=self.forw1)
        self.newBtnForw.grid(row=3, column=5)
        self.newBtnForw = tk.Button(self.root, text="Back",width=20, command=self.back1)
        self.newBtnForw.grid(row=3, column=4)
        self.sobel_detect()
        self.show_image_plate1()

    def forw(self):
        self.text = ""
        self.i = self.i + 1
        self.show_image_plate()

    def back(self):
        self.text = ""
        self.i = self.i - 1
        self.show_image_plate()


    def forw1(self):
        self.text = ""
        self.j = self.j + 1
        self.show_image_plate1()

    def back1(self):
        self.text = ""
        self.j = self.j - 1
        self.show_image_plate1()

    def detect_plate_prep(self):
        self.newImage = imutils.resize(self.showImage, width=600)
        self.newImage = cv2.cvtColor(self.newImage, cv2.COLOR_BGR2GRAY)
        self.morfBlack = cv2.morphologyEx(self.newImage , cv2.MORPH_BLACKHAT, self.rect)
        self.closed = self.closing_morf(self.newImage, self.smallSquare, 1)
        
    def sobel_detect(self):
        self.detect_plate_prep()
        self.sobeledge = cv2.Sobel(self.morfBlack, ddepth=cv2.CV_32F, dx=1, dy=0, ksize=-1)
        self.sobeledge = np.absolute(self.sobeledge)
        self.mini = np.min(self.sobeledge)
        self.maxi = np.max(self.sobeledge)
        self.maxi = 255 * ((self.maxi - self.mini) / (self.maxi - self.mini))
        self.sobeledge = np.uint8(self.sobeledge)
        self.sobeledge = cv2.GaussianBlur(self.sobeledge, (5, 5), 0)
        self.sobeledge = self.closing_morf(self.sobeledge, self.rect,1)
        
        
        ret, thresh = cv2.threshold(self.sobeledge, 127, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        self.opened1 = self.opening_morf(thresh, None, 2) #tole bom pomoje pustu ja 
        self.opened1 = cv2.bitwise_and(self.opened1, thresh, mask=self.closed)

        self.opened1 = cv2.dilate(self.opened1, None, iterations=2)
        self.opened1 = cv2.erode(self.opened1, None, iterations=1)

        self.allKeys1 = cv2.findContours(self.opened1.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        self.contours1 = imutils.grab_contours(self.allKeys1)
        self.contours1 = sorted(self.contours, key=cv2.contourArea, reverse=True)[:10] # tole je koliko slik bo prikazalo oz.shranilo

        for c in self.contours1:
            (x, y, w, h) = cv2.boundingRect(c)
            licensePlate = self.newImage[y:y + h, x:x + w]
            self.frames_for_sobel.append(licensePlate)


    def show_image_plate1(self):
        self.simgs1 = Image.fromarray(self.frames_for_sobel[self.j])
        self.simgs1 = ImageTk.PhotoImage(image=self.simgs1)
        self.text = tess.image_to_string(self.frames_for_sobel[self.j], config=self.config)
        self.canvas3.create_image(0 ,0, anchor=tk.NW, image=self.simgs1)
        self.newLabel1 = tk.Label(self.root, text=self.text)
        self.newLabel1.grid(row=2, column=4)

    def show_image_plate(self):
        self.simgs = Image.fromarray(self.frames_for_canny[self.i])
        self.text = tess.image_to_string(self.frames_for_canny[self.i], config=self.config)
        self.simgs = ImageTk.PhotoImage(image=self.simgs)
        self.canvas2.create_image(0 ,0, anchor=tk.NW, image=self.simgs)
        self.newLabel1 = tk.Label(self.root, text=self.text)
        self.newLabel1.grid(row=2, column=4)

    def detect_plate_canny(self):
        self.edged = cv2.Canny(self.morfBlack, 30, 200)
        self.edged = cv2.GaussianBlur(self.edged, (5, 5), 0)
        self.edged = self.closing_morf(self.edged, self.rect,1)
        ret, thresh = cv2.threshold(self.edged, 127, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
        self.opened = self.opening_morf(thresh, None, 2)
        self.opened = cv2.bitwise_and(self.opened, self.opened, mask=self.closed)
        self.opened = cv2.dilate(self.opened, None, iterations=2)
        self.opened = cv2.erode(self.opened, None, iterations=1)
        

        self.allKeys = cv2.findContours(self.opened, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        self.contours = imutils.grab_contours(self.allKeys)
        self.contours = sorted(self.contours, key=cv2.contourArea, reverse=True)[:10] # tole je koliko slik bo prikazalo oz.shranilo

        for c in self.contours:
            (x, y, w, h) = cv2.boundingRect(c)
            licensePlate = self.newImage[y:y + h, x:x + w]
            self.frames_for_canny.append(licensePlate)

    def stop(self):
        self.btn4 = tk.Button(self.root, text="Play", width=20, command=self.play)
        self.btn4.grid(row=0, column=3)
        self.button2 = tk.Button(self.root, text="Detect plate", width=20, command=self.detect_plate)
        self.button2.grid(row=2, column=1)
        self.flas = 1
        self.flas1 = 1
        self.vid = 0
        self.btn4 = tk.Button(self.root, text="Take", width=20, command=self.take)
        self.btn4.grid(row=2, column=2)

    def take(self):
        cv2.imwrite("car.jpg", self.showImage)
    def play(self):
        self.flas = 0
        self.update()

    def get_info(self):
        now = datetime.now()
        return self.text, now, self.frames_for_canny[self.i]

    def send_data(self):
        client = pymongo.MongoClient("mongodb+srv://Ziga:123@kontrolaprometa.y3yve.mongodb.net/KontrolaPrometa?retryWrites=true&w=majority")
        database = client['KontrolaPrometa']
        collection = database['carvideo']
        text, time , img = self.get_info()
        imgBinary = bson.Binary(img)
        num = random.randrange(6)
        post = {"tablica": text, "datum": time, "image": imgBinary, "Latitude": self.locations[num][0], "Longitude": self.locations[num][1]}
        doc = collection.insert_one(post)


if __name__ == "__main__":
    display = Display()  
