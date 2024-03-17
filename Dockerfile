# Use the official Node.js 16 as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g nodemon

# Install dependencies inside the container
RUN npm i

# Copy the rest of your application's source code
COPY web-application/src .

# Make port 3000 available to the outside world from the container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "run", "dev"]
