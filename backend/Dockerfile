# File name: Dockerfile
# Author: @YixuanSeanZhou
# Description: Fires up the backend.

# Pull official base image
FROM python:3.8.1-slim-buster

# Set work directory
WORKDIR /usr/src/app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Expose port
EXPOSE 5000

# Install dependencies
RUN apt-get update && apt-get install -y netcat
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# Copy project
COPY . /usr/src/app

# Set entry point script
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
