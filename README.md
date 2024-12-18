# Olcademy-Internship-Task
It is my internship assignment
This is a description of how to create the Mini Food Ordering App UI with Firebase, followed by a sample implementation in React Native.

Mini Food Ordering App Description
1. Features

Home Screen: Displays a list of food items fetched from Firebase Firestore. Each food item includes an image, description, and price.
Cart Screen: Allows users to review selected items, adjust quantities, and view the total price.
Order Summary Screen: Displays a summary of the cart items and provides a button to submit the order.
2. Firebase Integration

Firestore: Stores menu items and orders.
Menu Collection: Contains food items (image URL, description, price).
Orders Collection: Stores orders with cart details.
Real-time updates using Firestore listeners.
3. App Workflow

Fetch menu items from Firestore and display them on the Home Screen.
Allow users to select items, specify quantities, and add them to the cart.
On the Cart Screen, display all selected items and allow users to adjust quantities or remove items.
On the Order Summary Screen, show a summary and save the order in Firestore when the user confirms.
Code Implementation
Below is a simple implementation using React Native and Firebase.

Food Ordering App

Answer in chat instead
Explanation
Firebase Setup

Create a Firestore database with a menu collection containing documents with fields:
name: String (food item name)
description: String (short description)
price: Number
image: String (image URL)
Home Screen

Fetches and displays menu items in a user-friendly card layout.
Cart Screen

Allows adding and modifying items in the cart.
Displays the total price and a "Confirm Order" button to save the order in Firestore.
Navigation

Stack Navigator handles navigation between the screens.
UI Design

Clean and responsive with proper alignment, fonts, and colors.
We can now build, run, and extend this app further by integrating user authentication, order history, or payment gateways.
