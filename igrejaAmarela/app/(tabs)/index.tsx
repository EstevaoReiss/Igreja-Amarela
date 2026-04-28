
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const servicos = [
    {
      id: 1,
      titulo: 'Alimentação',
      descricao: 'Lorem Ipsum is simply',
      imagem: require('../../assets/images/alimentacao.png'),
      cor: '#f7f7fa',
    },
    {
      id: 2,
      titulo: 'Psicologo',
      descricao: 'Lorem Ipsum is simply',
      imagem: require('../../assets/images/psicologo.png'),
      cor: '#f7f7fa',
    },
    {
      id: 3,
      titulo: 'Grupo Ajuda',
      descricao: 'Lorem Ipsum is simply',
      imagem: require('../../assets/images/grupoAjuda.png'),
      cor: '#f7f7fa',
    },
    {
      id: 4,
      titulo: 'Midias',
      descricao: 'Lorem Ipsum is simply',
      imagem: require('../../assets/images/midias.png'),
      cor: '#f7f7fa',
    },
  ];

  const banners = [
    {
      id: 1,
      imagem: require('../../assets/images/bannerCalendario.jpg'),
    },
    {
      id: 2,
      imagem: require('../../assets/images/bannerComunidade.jpg'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/images/logoApp.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#506AD4" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

   

      <View style={styles.servicosSection}>
        <Text style={styles.sectionTitle}>Projetos</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {servicos.map((servico) => (
            <TouchableOpacity key={servico.id} style={styles.servicoCard}>
              <View style={[styles.imageContainer, { backgroundColor: servico.cor + '20' }]}>
                <Image
                  source={servico.imagem}
                  style={styles.servicoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.servicoTitulo}>{servico.titulo}</Text>
              <Text style={styles.servicoDescricao}>{servico.descricao}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bannersRow}>
        {banners.map((banner) => (
          <TouchableOpacity key={banner.id} style={styles.bannerCard}>
            <Image
              source={banner.imagem}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.historiaBanner}>
        <View style={styles.historiaImageContainer}>
          <Image
            source={require('../../assets/images/igreja.png')}
            style={styles.historiaImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.historiaTextContainer}>
          <Text style={styles.historiaTitle}>Conheça A História</Text>
          <Text style={styles.historiaDesc}>
            Lorem Ipsum is simply lorem Ipsum is simply
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <View style={styles.lastCard}>
        <View style={styles.lastCardLeft}>
          <Text style={styles.lastCardLeftText}>
            Ajude Nossas 
            <Text style={styles.lastCardLeftTextYellow}> AÇÕES</Text>
          </Text>
          <Text style={styles.lastCardDesc}>
            Lorem Ipsum is simply lorem Ipsum is simply
          </Text>
        </View>
        
        <TouchableOpacity style={styles.lastCardRight}>
          <View style={styles.lastCardImageContainer}>
            <Image
              source={require('../../assets/images/suporte.png')}
              style={styles.lastCardImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.lastCardTitle}>Ajude</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 45,
    height: 45,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  historiaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',

    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historiaImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
  },
  historiaImage: {
    width: '100%',
    height: '100%',
  },
  historiaTextContainer: {
    flex: 1,
  },
  historiaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  historiaDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  // Estilos para banners lado a lado
  bannersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    gap: 15,
  },
  bannerCard: {
    flex: 1,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  servicosSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  scrollContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  servicoCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  servicoImage: {
    width: 40,
    height: 40,
  },
  servicoTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  servicoDescricao: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  verse: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 8,
    lineHeight: 24,
  },
  verseRef: {
    fontSize: 14,
    color: '#fec31d',
    textAlign: 'right',
    fontWeight: '500',
  },
  lastCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 15,
    marginVertical: 15,
 
  },
  lastCardLeft: {
    flexDirection: 'column',
    flex: 1,
  },
  lastCardLeftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastCardLeftTextYellow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fec31d',
  },
  lastCardDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  lastCardRight: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 5,
    padding: 12,
    borderRadius: 12,
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lastCardImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f7f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  lastCardImage: {
    width: 30,
    height: 30,
  },
  lastCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
});