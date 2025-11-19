# ShoppingCart_Project
This repo consist of Shopping site project implemented using HTML, CSS, BS, JS, node and express js and Mongodb

## Dependencies

1. VS code - install vs code from https://code.visualstudio.com/download
2. node js - install node js from https://nodejs.org/en/download
3. Mongo db - install mongo db from https://www.mongodb.com/try/download/community
4. also try to install mongosh ie mongo shell
5. After install check the version ie `node -- version` in cmd/terminal this conforms you that you have installed node js
6. Then run the command `npm install` this installs all dependencies ie node module
7. Since the given project follows MVC architecture so make it into below folder structure as shown

<img width="265" height="455" alt="image" src="https://github.com/user-attachments/assets/960bd606-53ec-4446-9c52-2c37d826f767" />


## Procedure / Steps 

### Backend
1. we find the node modules are installed which can be found in node_modules
2. in models -> User.js we create a schema that stores the user details like name, password, billing amount and Schema for items such as name of the item, price of the item and quantity of the item
3. THen we go to the .env file, we create a database called shoppingdb
4. we would also use auth for validatation for password ie done by bcrypt, it mainly takes the user password, applies hashing algo and stores the hashed value of password which acts like a strong authentication.
5. Then in server.js file

<img width="516" height="415" alt="image" src="https://github.com/user-attachments/assets/5d422430-addb-48b2-bb02-ceb939d5e6b3" />

Fig 1 - after running the npm start / node server.js cmd for starting the server we observe that it is running in port 5000

http://localhost:5000/ 

   
### Frontend 
1. Create the HTML files named with login, signup, dashboard, cart, payment page as shown in git repo
2. The Login page, the JS is added such that it shows invalid username/password in red letters
3. Save those files wih .html

#### login
<img width="593" height="630" alt="image" src="https://github.com/user-attachments/assets/ae1a031f-ac50-4f36-a303-b00fcc6b24d6" />

Fig 2- login

<img width="665" height="703" alt="image" src="https://github.com/user-attachments/assets/369ac375-261d-4f9b-896f-5d08b7962479" />

Fig 3- when login fails

#### signup
<img width="591" height="671" alt="image" src="https://github.com/user-attachments/assets/c1f02c1d-3e79-45fd-9f9a-f5a0353027ef" />

Fig 4- Signup

<img width="640" height="703" alt="image" src="https://github.com/user-attachments/assets/18591476-3146-4645-8474-3889322e04ed" />

Fig 5- Username exists

<img width="554" height="714" alt="image" src="https://github.com/user-attachments/assets/f8351391-bd85-4dd1-bbc1-2dce366b69cf" />

Fig 6- Password weak

##### Dashboard

<img width="1457" height="837" alt="image" src="https://github.com/user-attachments/assets/40fbad75-2502-4d33-a5d3-ea571e9f653c" />

Fig 7 - Dashboard appears with repective user name (I used username = Arya)

<img width="1486" height="847" alt="image" src="https://github.com/user-attachments/assets/7bd48b67-44b8-4024-8bc0-9c3f54cd5bf5" />

Fig 8 - Dashboard appears with repective user name (I used username = Rohan)

#### View Cart

<img width="1349" height="709" alt="image" src="https://github.com/user-attachments/assets/9c68038d-0672-432e-b8ce-714e24a338f5" />

Fig 9 - when products are added to cart, payment button enables

<img width="1310" height="474" alt="image" src="https://github.com/user-attachments/assets/ccd0b108-167b-44bc-8f92-cfde56dfcf31" />

Fig 10 - payment button disables untill the product count >= 1

#### Payment page -- (made a dummy page)

<img width="514" height="501" alt="image" src="https://github.com/user-attachments/assets/567e2f7b-24f0-47ed-b508-e1295504bac2" />

Fig 11 - dummy payment page

### MongoDB
1. we connect with db by using mangoose.connect()
2. Then we add routes as shown in code
3. Then we run in mango Shell to view the activities of the user

<img width="852" height="774" alt="image" src="https://github.com/user-attachments/assets/172e9ffb-dc9d-4f40-9725-fbe5dbf92d27" />

Fig 12 - we observe the username is created

<img width="707" height="732" alt="image" src="https://github.com/user-attachments/assets/11dee1c7-7449-40c9-beed-fa3d6d91c068" />

Fig 13 - products are added to cart and can be viewed in DB as well, Account used Rohan.

<img width="705" height="767" alt="image" src="https://github.com/user-attachments/assets/d885f8e2-9b79-4290-8f61-905392d9cb0a" />

Fig 14 - products are added to cart and can be viewed in DB as well, Account used Arya.

hence by observing fig 13 and 14 which concludes that the database works fine for multiple accounts


## Important cmds to be run

1. `node --version` - checks the node/npm version
2. `npm install` - installs everything that are essential to run
3. `npm start` || `node server.js` - Starts the server
4. `mongosh` - open cmd > type mongosh [before that go to services > search for mongo > right click > select run. Do this if the mongodb is not running globally]
5. `show dbs` - shows the avaliable databases
6. `use <dbname>` - uses the database
7. `show collections` - displayes the collections in the database
8. `db.<collection name>.find().pretty()` - displayes the avaliable content

