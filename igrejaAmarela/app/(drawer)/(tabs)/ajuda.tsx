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
        <ScrollView style={styles.container}>
            

            <View style={styles.centralizedContainer}>
                <Text style={styles.boldText}>
                    Partilhe <Text style={styles.yellowText}>Conosco</Text>
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

                <Text style={styles.boldText}>
                    Nossos <Text style={styles.yellowText}>objetivos</Text>
                </Text>
                <Text style={styles.infoText}>
                    Melhorias para a igreja!! tanto para a infraestrutra
                    da paroquia. Para a acomodação dos fieis, quanto
                    para a compra de novos equipamentos para todos
                    ministerios ultilizarem
                </Text>
            </View>




            <View style={styles.centralizedContainer}>

                <Text style={styles.regularText}>
                    “Cada um contribua segundo propôs no coração, não com tristeza ou por necessidade;
                     porque Deus ama a quem dá com alegria.” </Text>

                <Text style={styles.regularText}>                                  (2 Coríntios 9:7)</Text>

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
        display: 'flex',

        alignItems: 'flex-start',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    boldText: {

        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
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
        marginTop:2,
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