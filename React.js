import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider, useStripe } from 'react-native-stripe-sdk';

const Stack = createStackNavigator();

const firebaseCollectionRefs = {
  menu: firestore().collection('menu'),
  orders: firestore().collection('orders'),
  users: (uid) => firestore().collection('users').doc(uid).collection('orderHistory'),
};

// Authentication Screen
function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

// Home Screen
function HomeScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const unsubscribe = firebaseCollectionRefs.menu.onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(items);
    });
    return unsubscribe;
  }, []);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  return (
    <FlatList
      data={menuItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>${item.price}</Text>
          <Button title="Add to Cart" onPress={() => addToCart(item)} />
        </View>
      )}
    />
  );
}

// Cart Screen
function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const stripe = useStripe();

  const handlePayment = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_PAYMENT_URL', {
        method: 'POST',
        body: JSON.stringify({ amount: calculateTotal() }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { clientSecret } = await response.json();
      const result = await stripe.confirmPayment(clientSecret);

      if (result.error) {
        Alert.alert('Payment Error', result.error.message);
      } else {
        Alert.alert('Payment Successful', 'Your order has been placed.');
        saveOrder();
      }
    } catch (error) {
      Alert.alert('Payment Error', error.message);
    }
  };

  const saveOrder = async () => {
    const uid = auth().currentUser.uid;
    const order = { items: cart, total: calculateTotal(), date: new Date() };
    await firebaseCollectionRefs.orders.add(order);
    await firebaseCollectionRefs.users(uid).add(order);
    setCart([]);
    navigation.replace('OrderHistory');
  };

  const calculateTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
      <Text>Total: ${calculateTotal()}</Text>
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
}

// Order History Screen
function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const uid = auth().currentUser.uid;
    const unsubscribe = firebaseCollectionRefs.users(uid).onSnapshot(snapshot => {
      const items = snapshot.docs.map(doc => doc.data());
      setOrders(items);
    });
    return unsubscribe;
  }, []);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.date.toDateString()}</Text>
          <Text>Total: ${item.total}</Text>
        </View>
      )}
    />
  );
}

// App Navigator
export default function App() {
  return (
    <StripeProvider publishableKey="YOUR_STRIPE_PUBLISHABLE_KEY">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderBottomWidth: 1, marginVertical: 8 },
  card: { padding: 16, margin: 16, borderWidth: 1, borderRadius: 8 },
  image: { width: '100%', height: 150 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
});
