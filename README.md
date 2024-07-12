# Open Fashion App

## Overview

Open Fashion is a React Native app designed for a smooth and intuitive shopping experience. This app displays a list of products, provides detailed information on each product, and allows users to add products to their cart. The app features a consistent header across all screens, a clean design, and persistent storage for cart items.

## Design Choices

1. **Consistency**: The header is consistent across all screens (Home, Product Detail, and Cart) to ensure a seamless navigation experience. This includes a menu button, logo, search button, and a cart button.

2. **User Experience**: The product list is displayed in a grid format with clear images, titles, and prices. Users can easily add products to their cart with a button directly on the product list and product detail pages.

3. **Data Persistence**: The cart items are stored using `AsyncStorage` to ensure that items added to the cart persist even if the app is closed and reopened.

## Implementation Details

### Components

- **Header Component**: A reusable header component that includes navigation buttons and the app logo.
- **HomeScreen**: Displays a list of products and allows users to navigate to the product details or add products to the cart.
- **ProductDetailScreen**: Shows detailed information about a selected product and includes an option to add the product to the cart.
- **CartScreen**: Displays the items in the cart and allows users to remove items from the cart.

### Data Storage

Data is stored using `AsyncStorage`, a simple, unencrypted, asynchronous, persistent, key-value storage system for React Native apps.

#### Add to Cart Function

```javascript
const addToCart = async (product) => {
  try {
    const cartItems = await AsyncStorage.getItem('cartItems');
    const cart = cartItems ? JSON.parse(cartItems) : [];
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
```

#### Remove from Cart Function

```javascript
const removeFromCart = async (productId) => {
  const updatedCart = cartItems.filter(item => item.id !== productId);
  setCartItems(updatedCart);
  await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
  Alert.alert('Success', 'Product removed from cart');
};
```

## Screenshots

To add screenshots, you can use the `react-native-screenshot` library or manually take screenshots on your device/emulator. Save these screenshots in a folder named `screenshots` at the root of your project and reference them in this section.

Example:
![1720824979725](https://github.com/user-attachments/assets/76872438-acd4-49d5-b3fb-d7cceaf68ab7)
![1720824979826](https://github.com/user-attachments/assets/1d06d7c4-2fa3-4d84-afec-5a135ff0e78a)
![1720824979750](https://github.com/user-attachments/assets/f1ebe6ea-7fc9-49d1-b654-f62098e81757)
![1720824979803](https://github.com/user-attachments/assets/883ced2e-8f57-49aa-a777-cc5dc34e6eb4)



## Getting Started

To run this project, follow these steps:

1. **Clone the repository**:

```sh
git clone https://github.com/your-repo/open-fashion-app.git
cd open-fashion-app
```

2. **Install dependencies**:

```sh
npm install
```

3. **Run the app**:

For iOS:
```sh
npx react-native run-ios
```

For Android:
```sh
npx react-native run-android
```

## Conclusion

This project demonstrates a simple yet effective implementation of a shopping app using React Native. It highlights the importance of consistency in UI design and the use of persistent data storage to enhance user experience.

---


