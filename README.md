LensLab Studio -- Camera Rental Management System
Learning Group: 5
Subject: Backend Development Fundamentals
Name:B.Vijay Ganesh
Regno:-252U1R5029
Team Members:-
1.G.Lohith sai-5053
2.B.Deekshith-5024
3.D.Spoorthi-5036
4.B.Akshara-5022
5.M.Dharmik Satya-5075
Project: LENS_LAB_Studio
GitHub Repository:
https://github.com/vijayganeshb21-hub/LG_5_LensLab-Studio
1. Project Overview
LensLab Studio is a backend application designed to manage
photographers, cameras, and camera rentals. The application uses
Node.js, Express.js, and an SQLite database.

It provides API endpoints for managing photographer and camera records,
handling rentals, searching cameras by kind, and retrieving rental
details with the related photographer and camera information.
2. Problem Statement
The project requires an Express server with routes for photographers,
cameras, and rentals, supported by three related SQLite tables:
photographers, cameras, and rentals.

The application supports camera CRUD operations, a JOIN endpoint that
returns rental details with photographer and camera names, input
validation for add and update operations, and camera searching through a
query parameter such as kind.

The special group challenge is to prevent duplicate camera names,
including names that differ only in capitalization. The first addition
of Camera 3 should return HTTP 201 Created. Adding camera 3 again
or renaming another camera to the same name should return HTTP
409 Conflict.
3. Features
- Photographer, camera, and rental API endpoints.
- CRUD operations for photographer and camera records.
- Rental creation and camera return functionality.
- Rental details endpoint using SQL JOIN.
- Camera search using a query parameter such as kind.
- Input validation for add and update requests.
- Case-insensitive prevention of duplicate camera names.
4. Technologies Used
- Node.js
- Express.js
- JavaScript
- SQLite and SQL
- sqlite and sqlite3 packages
- Postman
- Visual Studio Code
- Markdown
- Git and GitHub
5. Project Structure
LENS_LAB_Studio/
├── app.js
├── database.js
├── lenslab.db
├── package.json
├── package-lock.json
├── README.md
└── screenshots/
    ├── postman-collection.png
    ├── postman-folders.png
    ├── photographer-api.png
    ├── camera-api.png
    ├── camera-search.png
    ├── rental-api.png
    ├── rental-join.png
    ├── input-validation.png
    └── duplicate-camera-tests.png
The exact files in the project folder may vary depending on the final
repository contents.
6. Database Overview
The SQLite database contains three related tables:
Photographers
Stores photographer information, including the photographer ID, name,
and phone number.
Cameras
Stores camera information, including the camera ID, camera name, and
camera kind.
Rentals
Stores rental information and connects each rental to a photographer and
a camera. It includes rental and return dates and a returned-status
field.
7. API Endpoint Reference
The local base URL used for Postman testing is:
http://localhost:3000
Photographer APIs
  Method   Endpoint               Purpose
  GET      /photographers       Retrieve all photographers
GET      /photographers/:id   Retrieve a photographer by ID
POST     /photographers       Add a photographer
PUT      /photographers/:id   Update a photographer
DELETE   /photographers/:id   Delete a photographer
Camera APIs
  Method   Endpoint               Purpose
  GET      /cameras             Retrieve all cameras
GET      /cameras/:id         Retrieve a camera by ID
POST     /cameras             Add a camera
PUT      /cameras/:id         Update a camera
DELETE   /cameras/:id         Delete a camera
GET      /cameras?kind=DSLR   Search cameras by kind
Rental APIs
  Method                  Endpoint                Purpose
  GET                     /rentals              Retrieve all rentals

  GET                     /rentals/:id          Retrieve a rental by ID

  POST                    /rentals              Create a rental

  PUT                     /rentals/:id/return   Mark a rental as
returned
GET                     /rentals/details      Retrieve rental details
with photographer and
camera information
8. Special Challenge -- Duplicate Camera Names
The special challenge verifies that camera names are unique even when
capitalization differs.

  Test     Scenario                                     Expected response
  Test 1   Add Camera 3 for the first time            201 Created
Test 2   Add camera 3 as a duplicate                409 Conflict
Test 3   Update another camera to the existing name   409 Conflict

The screenshots for these tests are included in the screenshots
folder.
9. Installation and Run Instructions
Prerequisites
Install Node.js and npm.
Step 1 -- Clone the repository
git clone https://github.com/vijayganeshb21-hub/LG_5_LensLab-Studio.git
Step 2 -- Open the project directory
cd LG_5_LensLab-Studio
Step 3 -- Install dependencies
npm install
Step 4 -- Start the application
npm start
If the development script is configured, the application can also be
started with:
npm run dev
After the server starts, send requests to http://localhost:3000 using
Postman. The exact npm scripts should match the package.json in the
repository.
10. Postman Collection
The Postman collection is named LG_5_LensLab-Studio-API. It is
organized into the following six folders:
1. Photographers API
2. Cameras API
3. Camera Search API
4. Rentals API
5. Input Validation
6. Special Challenge -- Duplicate Camera Names
The collection contains requests for retrieving, creating, updating, and
deleting records, searching cameras, testing rentals, checking invalid
inputs, and verifying duplicate camera-name handling.

Import the exported Postman collection JSON file into Postman and use
http://localhost:3000 as the local API base URL.
11. My Individual Contribution -- Member 6: Postman and README
My assigned responsibility in the LensLab Studio group project was
Postman and README.
11.1 Postman Collection Creation
Created a Postman collection named LG_5_LensLab-Studio-API to organize
the API requests used for testing the LensLab Studio backend
application.
11.2 Postman Folder Organization
Organized the collection into six folders: Photographers API, Cameras
API, Camera Search API, Rentals API, Input Validation, and Special
Challenge -- Duplicate Camera Names.
11.3 Photographer and Camera API Testing
Added and tested requests for retrieving all records, retrieving a
record by ID, creating records, updating records, and deleting records
for the photographer and camera resources. Checked the returned JSON
data and HTTP status codes.
11.4 Camera Search and Rental API Testing
Tested camera filtering through a query parameter, such as
GET /cameras?kind=DSLR. Also tested rental retrieval, rental creation,
camera return, and GET /rentals/details to verify the JOIN response.
11.5 Input Validation Testing
Prepared Postman requests with missing or empty required values and
tested how the application responds to invalid input. Recorded the
response messages and status codes returned by the application.
11.6 Special Challenge Test Collection
Organized the three duplicate-name test scenarios: adding Camera 3,
attempting to add camera 3, and attempting to update another camera
with the same name. Verified the expected 201 Created and
409 Conflict responses.
11.7 README Documentation
Prepared this README file to explain the project overview, problem
statement, features, technologies, project structure, database
information, API endpoint reference, and repository details.
11.8 Installation and Run Instructions
Documented the steps for setting up the project locally, installing
dependencies, and starting the Express application.
11.9 Postman Collection Export and GitHub Documentation
Prepared the Postman collection for export as a JSON file and organized
the README and collection files for inclusion in the group's GitHub
repository.
12. Screenshots
The following screenshots are included in the screenshots/ folder.
They document the Postman collection and the API tests shown in the
submitted individual assignment.
12.1 Postman Collection
<img width="1918" height="999" alt="postman-collection" src="https://github.com/user-attachments/assets/5833f76b-9d44-45b0-8965-560687b5a83d" />


12.2 Postman Folder Organization
<img width="1918" height="1003" alt="postman-folders" src="https://github.com/user-attachments/assets/e9cc42b9-4ef3-4e8f-ae1a-0479beb18467" />


12.3 Photographer API Testing
<img width="1891" height="996" alt="photographer-api" src="https://github.com/user-attachments/assets/b590e7a8-b20d-4ca9-aa86-d19bb7736764" />

12.4 Camera API Testing

<img width="1918" height="1021" alt="camera-api" src="https://github.com/user-attachments/assets/72a4ee81-b484-462b-abab-100e29a2dd8b" />

12.5 Camera Search

<img width="1908" height="1006" alt="camera-search" src="https://github.com/user-attachments/assets/7bd09fbf-c62a-4a7b-ad44-441a9c1fd58a" />


12.6 Rental API Testing

<img width="1918" height="1015" alt="rental-api" src="https://github.com/user-attachments/assets/f492b032-bfea-463f-b036-7d47fdd2fae9" />


12.7 Rental Details JOIN Response


<img width="1918" height="1021" alt="rental-join" src="https://github.com/user-attachments/assets/2aacfb04-fc1b-4e4a-82db-62275ca44cb9" />

12.8 Input Validation

12.9 Duplicate Camera Name -- First Request

<img width="1918" height="1015" alt="duplicate-camera-201" src="https://github.com/user-attachments/assets/4c69de4d-929a-46bf-b22a-710202855125" />


12.10 Duplicate Camera Name -- Duplicate Request

<img width="1897" height="1012" alt="duplicate-camera-409" src="https://github.com/user-attachments/assets/b76a8377-1802-4af9-92e2-c1d130920fe4" />


12.11 Duplicate Camera Name -- Update Request

<img width="1918" height="1000" alt="duplicate-camera-update-409" src="https://github.com/user-attachments/assets/fc2e29d8-3990-4795-9db9-b3dd8d9678c2" />


13. GitHub Repository
LG_5_LensLab-Studio -- GitHub
Repository

The repository should include the project source files, this
README.md, the exported Postman collection JSON file, and the
screenshots folder.
14. Learning Outcomes
- Learned how to create and organize Postman collections and folders
  for API testing.
- Practised testing REST API requests using GET, POST, PUT, and DELETE
  methods.
- Understood how to inspect JSON responses and verify HTTP status
  codes.
- Learned how to test query parameters, input validation, JOIN
  responses, and duplicate-name scenarios.
- Improved technical documentation skills by preparing a README file
  for a backend project.
- Learned how to document project setup, dependencies, API endpoints,
  and execution instructions.
- Understood how Postman collection files and README documentation
  support project handover and GitHub submission.
15. Conclusion
My assigned contribution to the LensLab Studio group project was Postman
and README. I created and organized the Postman collection, arranged API
requests into folders, and tested the photographer, camera, camera
search, and rental endpoints. I also organized tests for input
validation and the duplicate camera name requirement. In addition, I
prepared the README documentation with project information, API details,
and instructions for installing and running the application. This
contribution helps the group verify the backend functionality and makes
the project easier for other users to understand, test, and run.
