#Use an official Python runtime as a parent image

FROM python:3.8

WORKDIR /app/backend

#Install Python dependencies 
COPY requirements.txt /app/backend
RUN pip3 install --upgrade pip -r requirements.txt

COPY . /app/backend

EXPOSE 8000

CMD python3 manage.py runserver 0.0.0.0:8000