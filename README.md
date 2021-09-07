# Panoramic Hotel Booking App

After the contagious pandemic is over, Panoramic Hotel is now accepting booking of its only presidential suite. This Panoramic Hotel Booking App provides RESTful APIs with which the guests can book, view, or delete their hotel booking. 

## Description

This Panoramic Hotel Booking App is a headless app, which means there is no UI to interact with. The HTTP requests to the app can be made using CURL, Postman, or other similar tools. The response to the RESTful API request is provided in JSON format. The app is fundamentally built using NodeJS and ExpressJS.

## Getting Started

### Built With

* NodeJS 
* ExpressJS
* HashmapJS
* UuidJS
* MomentJS

### Dependencies

* body-parser
* cors
* http-errors
* morgan
* nodemon

### Prerequisites

The app requires NodeJS and NPM to be installed on the system where this application will run.

* Verify if NodeJS and NPM is already installed on your system by executing following commands from the terminal. If installed then it will output the version number.

  ```sh
  node --version
  ```

  ```sh
  npm --version
  ```

* Otherwise, download and install NodeJS v15.0.0 from https://nodejs.org/download/release/v15.0.0/ based on your system OS. This will also install NPM by default along with NodeJS.

### Installing

1. Clone the repo
   ```sh
   git clone https://github.com/jaspal-carleton/panoramic_hotel.git
   ```
2. Change directory to the project folder
   ```sh
   cd panoramic_hotel
   ```
3. Install NodeJS modules or packages
   ```sh
   npm install
   ```

### Executing program

1. Start the app by executing following npm command from inside the project folder
   ```sh
   npm start
   ```

## Usage

### Supported APIs

| Endpoint            | Request | API-URL                                   | Description                                        |
|---------------------|---------|-------------------------------------------|----------------------------------------------------|
| /api/v1/booking     | POST    | http://localhost:5000/api/v1/booking      | Create new booking as per HTTP POST body form data |
| /api/v1/booking/:id | GET     | http://localhost:5000/api/v1/booking/:id  | Fetch booking details using booking id             |
| /api/v1/booking/:id | DELETE  | http://localhost:5000/api/v1/booking/:id  | Delete booking using booking id                    |

## Authors

Jaspal Singh

Project Link: https://github.com/jaspal-carleton/panoramic_hotel

## License

This project is licensed under the MIT License - see the LICENSE file for details
