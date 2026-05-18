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

export default function AjudaScreen() {

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            
            

             <View style={styles.titleContainer}>
                            <View style={styles.titleRow}>
                                <View style={styles.titleTextContainer}>
                                    <Text style={styles.title}>Ajuda</Text>
                                </View>
                                <View style={styles.titleImageContainer}>
                                    <Image
                                        source={require('../../../assets/images/ajuda.png')}
                                        style={styles.titleImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
            
            <View style={styles.qrCodeWrapper}>
                <View style={styles.qrCodeContainer}>
                    <Image
                        source={require('../../../assets/images/qrCode.jpeg')}
                        style={styles.qrCodeImage}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.pixText}>PIX: IGREJAAMARELA@GMAIL.COM</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.boldText}>
                    Nossos <Text style={styles.yellowText}>objetivos</Text>
                </Text>
                <Text style={styles.infoText}>
                    Melhorias para a igreja!! tanto para a infraestrutura
                    da paroquia. Para a acomodação dos fieis, quanto
                    para a compra de novos equipamentos para todos
                    ministerios ultilizarem
                </Text>
            </View>

    

            <View style={styles.centralizedContainer}>
                <Text style={styles.regularText}>
                    “Cada um contribua segundo propôs no coração, não com tristeza ou por necessidade;
                     porque Deus ama a quem dá com alegria.”
                </Text>
                <Text style={styles.bibleVerse}>(2 Coríntios 9:7)</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 40,
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
     titleImage: {
        width: 50,
        height: 50,
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
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff8e7',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    centralizedContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    boldText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        
        marginBottom: 10,
    },
    yellowText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fec31d',
        textAlign: 'center',
    },
    regularText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
        lineHeight: 22,
    },
    bibleVerse: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    // QR Code estilizado como quadrado
    qrCodeWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    qrCodeContainer: {
        width: width - 80,
        height: width - 80,
        maxWidth: 280,
        maxHeight: 280,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    qrCodeImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    pixText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 16,
        textAlign: 'center',
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        overflow: 'hidden',
    },
    infoContainer: {
        paddingHorizontal: 25,
        paddingVertical: 15,
    },
    infoText: {
        fontSize: 15,
        color: '#555',
        lineHeight: 24,
        textAlign: 'justify',
        marginTop: 5,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fec31d',
        marginHorizontal: 25,
        marginVertical: 20,
        paddingVertical: 16,
        borderRadius: 30,
        gap: 10,
        shadowColor: '#fec31d',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    actionButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});