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
This code represents a React Native Food Ordering App that incorporates the following features:

Features Explained
Authentication (AuthScreen):

Login and Registration: Uses Firebase Authentication to allow users to log in or register with an email and password.
Error handling displays alerts for failed login or registration attempts.
Upon successful authentication, users are redirected to the HomeScreen.
Home Screen (HomeScreen):

Displays a list of menu items fetched from Firestore (firebaseCollectionRefs.menu).
Each item card shows an image, name, description, and price.
Users can add items to their cart, updating the cart state.
Shopping Cart (CartScreen):

Displays items added to the cart, along with their details and a total price.
Payment Integration: Uses Stripe SDK to handle payments.
Contacts a backend (YOUR_BACKEND_PAYMENT_URL) to create a payment intent.
Uses confirmPayment to handle payment client-side and verify results.
Order Saving: Upon successful payment, the order is saved in Firestore, under both:
A general orders collection.
A user-specific orderHistory collection.
Clears the cart and navigates to the OrderHistoryScreen after saving.
Order History (OrderHistoryScreen):

Fetches and displays the user's order history stored in Firestore under users/{uid}/orderHistory.
Shows details such as order date and total cost.
Navigation:

Uses React Navigation to navigate between screens: Authentication, Home, Cart, and Order History.
The flow ensures unauthenticated users cannot access the app's main functionality.
Styles:

UI components are styled using StyleSheet, ensuring a clean and consistent design.
Firebase Setup:

Firestore collections for menu, orders, and user-specific order history (users/{uid}/orderHistory).
Stripe Integration:

Integrated using the Stripe SDK for React Native.
Requires backend support to handle payment intents (YOUR_BACKEND_PAYMENT_URL).
How It Works
On Launch:
The AuthScreen appears. Users log in or register.
Home Screen:
Fetches menu items from Firestore and displays them in a list.
Cart Screen:
Displays items added to the cart.
Handles payments through Stripe and saves the order in Firestore.
Order History:
Fetches and displays previous orders for the logged-in user.
What to Customize
Replace placeholders:
YOUR_BACKEND_PAYMENT_URL: Endpoint for handling Stripe payments.
YOUR_STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key.
Adjust styling (StyleSheet) for your brand identity.
Firebase rules for enhanced security, e.g., restricting access to authenticated users.
This structure ensures a robust, scalable food-ordering app that handles core e-commerce features with user authentication and secure payment processing.







