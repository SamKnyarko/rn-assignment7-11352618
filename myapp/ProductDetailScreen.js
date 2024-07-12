import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${productId}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [productId]);

  const addToCart = async () => {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      const cart = cartItems ? JSON.parse(cartItems) : [];
      // Check if the item is already in the cart
      const itemExists = cart.find(item => item.id === product.id);
      if (!itemExists) {
        const updatedCart = [...cart, product];
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
        Alert.alert('Success', 'Product added to cart');
      } else {
        Alert.alert('Info', 'Product is already in the cart');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add product to cart');
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.brand}>LAMEREI</Text>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.materials}>MATERIALS</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.careContainer}>
        <View style={styles.careItem}>
          <Image source={require('./assets/Do Not Bleach.png')} style={styles.icon} />
          <Text style={styles.careInstruction}>Do not use bleach</Text>
        </View>
        <View style={styles.careItem}>
          <Image source={require('./assets/Do Not Tumble Dry.png')} style={styles.icon} />
          <Text style={styles.careInstruction}>Do not tumble dry</Text>
        </View>
        <View style={styles.careItem}>
          <Image source={require('./assets/Do Not Wash.png')} style={styles.icon} />
          <Text style={styles.careInstruction}>Dry clean with tetrachloroethylene</Text>
        </View>
        <View style={styles.careItem}>
          <Image source={require('./assets/Iron Low Temperature.png')} style={styles.icon} />
          <Text style={styles.careInstruction}>Iron at a maximum of 110°C/230°F</Text>
        </View>
      </View>
      <View style={styles.shippingContainer}>
        <Image source={require('./assets/Shipping.png')} style={styles.icon} />
        <Text style={styles.shipping}>Free Flat Rate Shipping</Text>
        <Text style={styles.shipping}>Estimated to be delivered on 09/11/2021 - 12/11/2021.</Text>
      </View>
      <Button title="Add to Cart" onPress={addToCart} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  brand: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    marginVertical: 5,
    textAlign: 'center',
  },
  materials: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
  },
  careContainer: {
    marginVertical: 10,
  },
  careItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  careInstruction: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  shippingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  shipping: {
    fontSize: 14,
    color: '#888',
    marginLeft: 8,
  },
});

export default ProductDetailScreen;
