import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import useWebSocket from 'react-use-websocket';
import { Feather as Icon } from '@expo/vector-icons'
import { Input, Text } from 'react-native-elements'


export default function CoinDetailsScreen({symbol}) {

  const [data, setData] = useState({});

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

  return (
    <View>
      <View style={styles.linha}>
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
      </View>
    </View>
  )
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
  rotulo: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff'
  },
  conteudo: {
    fontSize: 24,
    color: '#fff'
  },
  linha: {
    flexDirection: 'row',
    width: '100%'
  },
  titulo: {
    fontSize: 30,
    color: '#fff'
  }
});