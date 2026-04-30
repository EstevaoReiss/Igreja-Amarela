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

export default function AlimentacaoScreen() {

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={styles.titleRow}>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.title}>Alimentos</Text>
                    </View>
                    <View style={styles.titleImageContainer}>
                        <Image
                            source={require('../../../assets/images/alimentacao.png')}
                            style={styles.titleImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.centralizedContainer}>
                <Text style={styles.boldText}>
                    FAÇA PARTE DESTA <Text style={styles.yellowText}>AÇÃO</Text>
                </Text>

            </View>

            <View style={styles.largeImageContainer}>
                <Image
                    source={require('../../../assets/images/alimentos.png')}
                    style={styles.largeImage}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.infoContainer}>
             
                <Text style={styles.infoText}>
                    Um Gesto Que Alimenta Esperança
                    A fome é uma realidade que afeta milhões de pessoas em todo o mundo, e pequenos gestos podem fazer uma grande diferença. A doação de alimentos é mais do que uma ação solidária; é um ato de amor e empatia capaz de transformar vidas.

                </Text>
            </View>

          
            <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Saiba Mais</Text>
                <Ionicons name="arrow-forward-outline" size={20} color="#fff" />
            </TouchableOpacity>

             <View style={styles.centralizedContainer}>
                <Text style={styles.boldText}>
                    Traga <Text style={styles.yellowText}>alimento!</Text>
                </Text>
             
                <Text style={styles.regularText}>
                    Av. Inocêncio Seráfico 600 (Centro), Carapicuíba, SP
                </Text>

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
        backgroundColor: '#fff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleTextContainer: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    titleImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    titleImage: {
        width: 50,
        height: 50,
    },
    // Texto centralizado
    centralizedContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    boldText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    yellowText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fec31d',
        textAlign: 'center',
        marginBottom: 10,
    },
    regularText: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    largeImageContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
        height: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    largeImage: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        textAlign: 'justify',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fec31d',
        marginHorizontal: 20,
        marginVertical: 20,
        paddingVertical: 16,
        borderRadius: 12,
        gap: 10,
    },
    actionButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});