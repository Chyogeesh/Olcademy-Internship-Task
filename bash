### **React Native Food Ordering App with User Authentication, Order History, and Payment Gateway**

#### **Setup**
1. Ensure your Firebase project has the following:
   - Firestore database for menu items, user orders, and order history.
   - Firebase Authentication enabled for email/password login.
   - Firebase functions or a third-party payment gateway like Stripe.

2. Install required libraries:
   ```bash
   npm install react-navigation react-navigation-stack react-native-elements @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
   npm install react-native-stripe-sdk
   ```

#### **Updated App Flow**
- **Authentication**: Users can register, log in, and log out.
- **Order History**: Users can view past orders.
- **Payment Gateway**: Stripe integration for payment.
