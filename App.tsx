// atividade git
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function Home() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

function MinhaColeta() {
  return (
    <View style={styles.container}>
      <Text>Minha Coleta</Text>
    </View>
  );
}

function Historico() {
  return (
    <View style={styles.container}>
      <Text>Historico</Text>
    </View>
  );
}

function Perfil() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function CustomTabButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <View style={styles.greenButton}>
        <Text style={styles.registrar}>adicionar</Text>
        <Text style={styles.registrar}>Sacola</Text>
      </View>
    </TouchableOpacity>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={({ state, descriptors, navigation }) => (
          <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              return (
                <TouchableOpacity
                  key={index}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  style={[styles.tabItem, isFocused ? styles.tabItemFocused : null]}
                >
                  <Text style={styles.tabLabel}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Coletas" component={MinhaColeta} />
        <Tab.Screen name="Historico" component={Historico} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
      <CustomTabButton />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabItemFocused: {
    borderBottomWidth: 2,
  },
  tabLabel: {
    fontSize: 16,
  },
  tabButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, // tamanho botao
    height: 100,
    borderRadius: 30,
    backgroundColor: 'green',
    bottom: 50,
    left: '50%',
    marginLeft: -50,
  },
  greenButton: {
    alignItems: 'center',
  },
  registrar: {
    color: 'white',
    fontSize: 15, // Tamanho texto botao
  },
});

export default App;
