import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../../slices/orderSlice';
import { urlFor } from '../../../client';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { PUBLISHABLE_KEY } from '../../credentials';

const API_URL = 'http://localhost:8888';
const BasketScreen = ({ navigation }) => {
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();
  const couponReduced = 10000;
  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      if (item._id in results) {
        results[item._id].push(item);
      } else {
        results[item._id] = [item];
      }
      return results;
    }, {});
    setgroupedItemsInBasket(groupedItems);
  }, [items]);
  useEffect(() => {
    initializePaymentSheet();
  }, []);
  const { initPaymentSheet, presentPaymentSheet, loading } = useStripe();
  const [ready, setReady] = useState(false);
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: basketTotal / 24000 }),
    }).catch((e) => {
      console.log('The error is ', e.message);
    });

    const { paymentIntent } = await response.json();

    return {
      paymentIntent,
    };
  };
  const initializePaymentSheet = async () => {
    const { paymentIntent } = await fetchPaymentSheetParams();
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Travel Application',
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setReady(true);
    } else {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }
  };
  async function payment() {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      navigation.navigate('PaymentSuccessScreen');
      setReady(false);
    }
  }
  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <View style={styles.basketScreenContainer}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>Basket</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <XCircleIcon color="black" size={30} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            return (
              <View
                key={key}
                className="flex-row items-center space-x-3 bg-white py-2 px-5"
                style={styles.itemRow}
              >
                <Text className="text-[#00CCBB]" style={styles.itemQuantity}>
                  {items.length} x
                </Text>
                <Image
                  source={{ uri: urlFor(items[0]?.image).url() }}
                  className="h-12 w-12 rounded-full"
                  style={styles.itemImage}
                />
                <Text className="flex-1" style={styles.itemName}>
                  {items[0]?.name}
                </Text>
                <Text className="text-gray-600" style={styles.itemPrice}>
                  {items[0]?.price} đ
                </Text>
                <TouchableOpacity>
                  <Text
                    className="text-[#00CCBB] text-xs"
                    style={styles.removeText}
                    onPress={() => dispatch(removeFromBasket({ _id: key }))}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.totalView}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Text style={{ fontSize: 17, color: '#9ca3af' }}>Subtotal</Text>
            <Text style={{ fontSize: 17, color: '#9ca3af' }}>{basketTotal} đ</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 17, color: '#9ca3af' }}>Coupon reduced</Text>
            <Text style={{ fontSize: 17, color: '#9ca3af' }}>{couponReduced} đ</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: '700' }}>Order Total</Text>
            <Text style={{ fontSize: 17, color: '#9ca3af' }}>
              {/* <CurrencyFormat value={basketTotal - couponReduced} prefix="đ" pattern="##,### !" /> */}
              {basketTotal - couponReduced > 0 ? basketTotal - couponReduced : 0} đ
            </Text>
          </View>
          <TouchableOpacity style={styles.paymentButton} onPress={payment}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>
              Process to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </StripeProvider>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  basketScreenContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: '#04555c',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    padding: 1,
    backgroundColor: '#e1e1d0',
    borderRadius: 999,
  },
  scrollView: {
    backgroundColor: 'white',
    flex: 1,
  },
  itemsList: {
    width: '100%',
  },
  itemRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D9D9D9',
  },
  itemImage: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  itemQuantity: {
    marginRight: 15,
    width: 20,
    fontWeight: '600',
    color: '#04555c',
  },
  itemName: {
    marginLeft: 15,
    flex: 1,
    fontWeight: '500',
  },
  itemPrice: {
    marginRight: 15,
    fontWeight: '600',
  },
  removeText: {
    color: '#04555c',
    fontWeight: '500',
  },
  totalView: {
    height: '30%',
    marginTop: '20%',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  paymentButton: {
    width: '100%',
    backgroundColor: '#04555c',
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
