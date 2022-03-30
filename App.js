import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { Input, Text } from 'react-native-elements'
import { Feather as Icon } from '@expo/vector-icons'

import CoinDetailedScreen from './src/screens/CoinDetailsScreen';

export default function App() {

  const [data, setData] = useState({});
  const [text, setText] = useState('BTCUSDT');
  const [symbol, setSymbol] = useState('btcusdt');

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onMessage: () => {
      if(lastJsonMessage){
        setData(lastJsonMessage)
      }
    },
    onError: (event) => alert(event),
    shouldReconnect: () => true, // TENTA RECONECTAR
    reconnectInterval: 3000
  })

  const searchButton = <Icon.Button
    name='search'
    size={24}
    color='white'
    backgroundColor='transparent'
    onPress={e => setSymbol(text.toLocaleLowerCase())}
  />

  return (
    <View style={styles.container}>
      <Text h1 style={styles.titulo}>CryptoWatch 1.0</Text>
      <Input
        autoCapitalize='characters'
        leftIcon={<Icon name='dollar-sign' size={24} color='white' />}
        rightIcon={searchButton}
        onChangeText={setText}
      />
      <CoinDetailedScreen 
        symbol={symbol}
      />
      {/* <View style={styles.linha}>
        <Text style={styles.titulo}>{data.s}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Preço Atual:</Text>
        <Text style={styles.conteudo}>{data.c}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Variação:</Text>
        <Text style={styles.conteudo}>{data.P}%</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Volume:</Text>
        <Text style={styles.conteudo}>{data.v}</Text>
      </View> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    flex: 1,
    // marginTop: 40,
    // margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292929'
  },
  titulo: {
    color: '#fff'
  }
});
