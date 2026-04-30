import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CustomHeader from '../components/customHeader';

function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <View style={drawerStyles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={drawerStyles.scrollView}>
        <View style={drawerStyles.header}>
          <Image
            source={require('../../assets/images/logoApp.png')}
            style={drawerStyles.logo}
            resizeMode="contain"
          />
          
          <View style={drawerStyles.userInfo}>
            <View style={drawerStyles.userIconContainer}>
              <Ionicons name="person-circle-outline" size={50} color="#fec31d" />
            </View>
            
            <View style={drawerStyles.userTextContainer}>
              <Text style={drawerStyles.userName}>Fernanda Souza</Text>
              <Text style={drawerStyles.userEmail}>Admin</Text>
            </View>
          </View>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity 
        style={drawerStyles.logoutButton}
        onPress={() => router.replace('/')}
      >
        <Ionicons name="log-out-outline" size={24} color="#fec31d" />
        <Text style={drawerStyles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        header: () => <CustomHeader />,
        drawerStyle: {
          width: 280,
        },
        drawerActiveTintColor: '#fec31d',
        drawerInactiveTintColor: '#070404',
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -5,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Início',
          title: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="acoes"
        options={{
          drawerLabel: 'Ações',
          title: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="perfil"
        options={{
          drawerLabel: 'Meu Perfil',
          title: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="eventos"
        options={{
          drawerLabel: 'Eventos',
          title: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="doacoes"
        options={{
          drawerLabel: 'Doações',
          title: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="configuracoes"
        options={{
          drawerLabel: 'Configurações',
          title: '',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  userIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fec31d20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userTextContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  logoutText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 10,
    fontWeight: '500',
  },
});