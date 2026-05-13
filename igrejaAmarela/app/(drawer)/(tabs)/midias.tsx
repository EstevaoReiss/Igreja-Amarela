import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function MidiaScreen() {
    const socialLinks = {
        facebook: 'https://www.facebook.com/share/1CpyJFV9WZ/?mibextid=wwXIfr',
        instagram: 'https://www.instagram.com/matriznsacarapicuiba/',
        youtube: 'https://youtube.com/@Nossasenhora_aparecida'
    };

    // Corrigido: adicionado tipo 'string' ao parâmetro url
    const openSocialMedia = (url: string) => {
        Linking.openURL(url).catch(err => console.error('Erro ao abrir link:', err));
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
                <View style={styles.titleRow}>
                    <View style={styles.titleTextContainer}>
                        <Text style={styles.title}>Mídias</Text>
                    </View>
                    <View style={styles.titleImageContainer}>
                        <Image
                            source={require('../../../assets/images/midias.png')}
                            style={styles.titleImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.centralizedContainer}>
                <Text style={styles.boldText}>
                    Nos siga <Text style={styles.yellowText}>nas redes!</Text>
                </Text>
            </View>

            <TouchableOpacity 
                style={styles.socialCard} 
                onPress={() => openSocialMedia(socialLinks.facebook)}
                activeOpacity={0.7}
            >
                <View style={styles.socialIconContainer}>
                    <Image
                        source={require('../../../assets/images/facebook.png')}
                        style={styles.socialIcon}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.socialInfo}>
                    <Text style={styles.socialName}>Facebook</Text>
                    <Text style={styles.socialUsername}>@Nossasenhora_aparecida</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.socialCard} 
                onPress={() => openSocialMedia(socialLinks.instagram)}
                activeOpacity={0.7}
            >
                <View style={styles.socialIconContainer}>
                    <Image
                        source={require('../../../assets/images/instagram.png')}
                        style={styles.socialIcon}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.socialInfo}>
                    <Text style={styles.socialName}>Instagram</Text>
                    <Text style={styles.socialUsername}>@matriznsacarapicuiba</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#ccc" />
            </TouchableOpacity>
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
    centralizedContainer: {
        alignItems: 'flex-start',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    boldText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    yellowText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fec31d',
    },
    socialCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 8,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    socialIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
    socialInfo: {
        flex: 1,
    },
    socialName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    socialUsername: {
        fontSize: 14,
        color: '#666',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fec31d',
        marginHorizontal: 20,
        marginVertical: 30,
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