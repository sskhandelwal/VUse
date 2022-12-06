# VUse

This repository contains the code for VUse, an ecommerce web application for Vanderbilt University students. VUse is based on an existing GroupMe chat, "Reuse Vandy," where students communicate about the things they're looking to buy/sell.
The existing chat has many problems: listings get lost as more chats flow in, there is no way to search for a particular listing, etc. Our plan is to address all of these shortcomings and construct a beautiful user experience simultaneously.

Here are the frameworks we plan on using:

* Python (Backend)
* Python Django (Frontend + Backend)
* React Bootstrap (Frontend)
* Material UI (Frontend Styling)
* MySQL (Database)
* S3 buckets (Photo Storage/Backend)
 
Add dependencies wherever needed through searching up errors online
1. Clone the application using git clone.
2. Open the application via any code editor.
3. In order to run the application, both the backend and frontend need to be started/ran (in that specific order).
    1. For backend, stay in the original/home directory and type ‘python .\manage.py runserver’ to run the backend
    2. For frontend, go to the frontend directory. (cd frontend)
4. Type ‘npm run build’ and wait for the frontend to be built
5. This website will be run through the port 8000: http://localhost:8000/.
