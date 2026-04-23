import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🙏 Bem-vindo!</Text>
        <Text style={styles.subtitle}>Igreja [Nome da Igreja]</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📅 Próximos Eventos</Text>
        <Text style={styles.cardText}>• Culto de Domingo - 19h</Text>
        <Text style={styles.cardText}>• Escola Bíblica - Quarta 20h</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📖 Versículo do Dia</Text>
        <Text style={styles.verse}>
          "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração."
        </Text>
        <Text style={styles.verseRef}>Romanos 12:12</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🕊️ Reflexão</Text>
        <Text style={styles.cardText}>
          A fé move montanhas. Confie no Senhor em todos os momentos.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
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
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  verse: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 8,
  },
  verseRef: {
    fontSize: 14,
    color: '#6366f1',
    textAlign: 'right',
  },
});