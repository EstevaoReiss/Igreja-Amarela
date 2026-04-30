// app/(drawer)/acoes.tsx
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

const { width } = Dimensions.get('window');

export default function AcoesScreen() {
  const servicos = [
    {
      id: 1,
      titulo: 'Alimentação',
      descricao: 'Lorem Ipsum is simply',
      imagem: require('../.././assets/images/alimentacao.png'),
      cor: '#f7f7fa',
    },
    {
      id: 2,
      titulo: 'Psicologo',
      descricao: 'Lorem Ipsum is simply',
      imagem: require('../.././assets/images/psicologo.png'),
      cor: '#f7f7fa',
    },
    {
      id: 3,
      titulo: 'Grupo Ajuda',
      descricao: 'Lorem Ipsum is simply',
      imagem: require('../.././assets/images/grupoAjuda.png'),
      cor: '#f7f7fa',
    },
    {
      id: 4,
      titulo: 'Midias',
      descricao: 'Lorem Ipsum is simply',
      imagem: require('../.././assets/images/midias.png'),
      cor: '#f7f7fa',
    },
   
  ];

  // Dividir os serviços em duas colunas
  const servicosCol1 = servicos.filter((_, index) => index % 2 === 0);
  const servicosCol2 = servicos.filter((_, index) => index % 2 === 1);

  return (
    <ScrollView style={styles.container}>
      {/* Título */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Projetos em <Text style={styles.titleYellow}>AÇÃO</Text>
        </Text>
     
      </View>

      {/* Serviços em Duas Colunas */}
      <View style={styles.servicosGrid}>
        <View style={styles.column}>
          {servicosCol1.map((servico) => (
            <TouchableOpacity key={servico.id} style={styles.servicoCard}>
              <View style={[styles.imageContainer, { backgroundColor: servico.cor + '20' }]}>
                <Image
                  source={servico.imagem}
                  style={styles.servicoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.servicoTitulo}>{servico.titulo}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.column}>
          {servicosCol2.map((servico) => (
            <TouchableOpacity key={servico.id} style={styles.servicoCard}>
              <View style={[styles.imageContainer, { backgroundColor: servico.cor + '20' }]}>
                <Image
                  source={servico.imagem}
                  style={styles.servicoImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.servicoTitulo}>{servico.titulo}</Text>
             
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  titleYellow: {
    color: '#fec31d',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  servicosGrid: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
  },
  column: {
    flex: 1,
    gap: 15,
  },
  servicoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
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
});