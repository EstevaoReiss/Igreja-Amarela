import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { reload, sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '../src/firebase.config';

type AcaoEmAndamento = 'verificar' | 'reenviar' | 'sair' | null;

export default function VerificarEmailScreen() {
  const router = useRouter();
  const [acaoEmAndamento, setAcaoEmAndamento] = useState<AcaoEmAndamento>(null);

  const handleVerificar = async () => {
    const user = auth.currentUser;
    if (!user) {
      router.replace('/');
      return;
    }

    setAcaoEmAndamento('verificar');
    try {
      await reload(user);
      if (user.emailVerified) {
        router.replace('/(drawer)/(tabs)');
      } else {
        Alert.alert(
          'Ainda não',
          'Seu e-mail ainda não foi verificado. Confira a caixa de entrada e o spam.'
        );
      }
    } catch (error) {
      console.error('Erro ao verificar e-mail:', error);
      Alert.alert('Erro', 'Não foi possível verificar o e-mail. Tente novamente.');
    } finally {
      setAcaoEmAndamento(null);
    }
  };

  const handleReenviar = async () => {
    const user = auth.currentUser;
    if (!user) {
      router.replace('/');
      return;
    }

    setAcaoEmAndamento('reenviar');
    try {
      await sendEmailVerification(user);
      Alert.alert('E-mail enviado', 'Confira sua caixa de entrada e a pasta de spam.');
    } catch (error) {
      const errorCode =
        typeof error === 'object' && error !== null && 'code' in error
          ? error.code
          : undefined;
      const mensagem =
        errorCode === 'auth/too-many-requests'
          ? 'Muitas tentativas. Tente novamente em alguns minutos.'
          : 'Não foi possível enviar o e-mail. Verifique sua conexão e tente novamente.';

      console.error('Erro ao reenviar verificação:', errorCode, error);
      Alert.alert('Erro', mensagem);
    } finally {
      setAcaoEmAndamento(null);
    }
  };

  const handleSair = async () => {
    setAcaoEmAndamento('sair');
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
      Alert.alert('Erro', 'Não foi possível sair da conta. Tente novamente.');
    } finally {
      setAcaoEmAndamento(null);
    }
  };

  const carregando = acaoEmAndamento !== null;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📧</Text>
      <Text style={styles.title}>Verifique seu e-mail</Text>
      <Text style={styles.text}>
        Enviamos um link para {auth.currentUser?.email ?? 'seu e-mail'}. Abra a mensagem, clique no
        link e volte aqui para confirmar.
      </Text>

      <TouchableOpacity
        style={[styles.button, carregando && styles.disabledButton]}
        onPress={handleVerificar}
        disabled={carregando}
      >
        {acaoEmAndamento === 'verificar' ? (
          <ActivityIndicator color="#1b1a1a" />
        ) : (
          <Text style={styles.buttonText}>Já verifiquei</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={handleReenviar}
        disabled={carregando}
      >
        {acaoEmAndamento === 'reenviar' ? (
          <ActivityIndicator color="#999" />
        ) : (
          <Text style={styles.linkText}>Reenviar e-mail</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={handleSair}
        disabled={carregando}
      >
        {acaoEmAndamento === 'sair' ? (
          <ActivityIndicator color="#999" />
        ) : (
          <Text style={styles.linkText}>Voltar ao login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 30,
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fec31d',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#1b1a1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 20,
    minHeight: 20,
  },
  linkText: {
    color: '#999',
    fontSize: 14,
  },
});
