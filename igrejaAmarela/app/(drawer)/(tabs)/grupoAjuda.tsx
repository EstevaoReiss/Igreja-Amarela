import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface Grupo {
    id: number;
    titulo: string;
    descricao: string;
    cor: string;
    icone: keyof typeof Ionicons.glyphMap;
}

export default function GruposAjudaScreen() {

    const grupos: Grupo[] = [
        {
            id: 1,
            titulo: "ALCOÓLICOS ANÔNIMOS",
            descricao: "A paróquia oferece um grupo de assistência para pessoas que se encontram em situação de vício em álcool",
            cor: "#f9a825",
            icone: "medkit-outline"
        },
        {
            id: 2,
            titulo: "Apoio a familiares de dependentes",
            descricao: "A paróquia oferece um grupo de assistência para os familiares dos dependentes.",
            cor: "#f9a825",
            icone: "people-outline"
        },
        {
            id: 3,
            titulo: "Apoio a pessoas em situação de rua",
            descricao: "A paróquia oferece um grupo de assistência para as pessoas que se encontram em situação de rua.",
            cor: "#f9a825",
            icone: "home-outline"
        }
    ];

    const handleSaibaMais = (grupoId: number) => {
        console.log('Saiba mais clicado para o grupo:', grupoId);
    };

    const handleContato = () => {
        console.log('Contato clicado');
    };

    return (
        <ScrollView 
            style={styles.container} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={styles.header}>
                <View style={styles.headerOverlay}>
                    <Text style={styles.headerTitle}>Grupos de Ajuda</Text>
                    <Text style={styles.headerSubtitle}>
                        Acolhimento e suporte para todos que precisam
                    </Text>
                </View>
            </View>

            <View style={styles.gruposContainer}>
                {grupos.map((grupo) => (
                    <View key={grupo.id} style={styles.card}>
                        <View style={[styles.cardIcon, { backgroundColor: grupo.cor + '15' }]}>
                            <Ionicons name={grupo.icone} size={32} color={grupo.cor} />
                        </View>
                        
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{grupo.titulo}</Text>
                            <Text style={styles.cardDescription}>{grupo.descricao}</Text>
                            
                            <TouchableOpacity 
                                style={styles.saibaMaisButton}
                                onPress={() => handleSaibaMais(grupo.id)}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.saibaMaisText, { color: grupo.cor }]}>Saiba mais</Text>
                                <Ionicons name="arrow-forward" size={16} color={grupo.cor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.infoBox}>
                <Ionicons name="heart-circle-outline" size={48} color="#fec31d" />
                <Text style={styles.infoTitle}>Precisa de ajuda?</Text>
                <Text style={styles.infoText}>
                    Entre em contato conosco. Estamos aqui para acolher e apoiar você ou alguém que 
                    você conhece que esteja passando por momentos difíceis.
                </Text>
                <TouchableOpacity 
                    style={styles.contatoButton}
                    onPress={() => router.push('https://api.whatsapp.com/send?phone=5511934112405&text=Ola%2C+gostaria+de+falar+sobre+os+grupos+de+ajuda+com+a+Igreja%F0%9F%99%8F')}
                    activeOpacity={0.8}
                >
                    <Ionicons name="call-outline" size={20} color="#fff" />
                    <Text style={styles.contatoButtonText}>Fale Conosco</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    header: {
        height: 220,
        backgroundColor: '#fec31d',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        overflow: 'hidden',
    },
    headerOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        opacity: 0.95,
    },
    gruposContainer: {
        paddingHorizontal: 20,
        marginTop: -30,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginBottom: 20,
        padding: 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    cardIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 12,
    },
    saibaMaisButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    saibaMaisText: {
        fontSize: 14,
        fontWeight: '600',
    },
    infoBox: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 30,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 12,
        marginBottom: 8,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
    },
    contatoButton: {
        flexDirection: 'row',
        backgroundColor: '#fec31d',
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        gap: 8,
    },
    contatoButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});