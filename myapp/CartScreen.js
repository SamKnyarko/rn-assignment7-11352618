import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      const items = storedCartItems ? JSON.parse(storedCartItems) : [];
      setCartItems(items);
      calculateTotal(items);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(total);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Use useFocusEffect to fetch cart items when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchCartItems();
    }, [])
  );

  const removeFromCart = async (item) => {
    try {
      const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      calculateTotal(updatedCart); // Recalculate total after removing item
      Alert.alert('Success', 'Product removed from cart');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to remove product from cart');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <TouchableOpacity onPress={() => removeFromCart(item)}>
                <Text style={styles.removeButton}>Remove from Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    color: 'red',
    marginTop: 10,
  },
  totalContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
