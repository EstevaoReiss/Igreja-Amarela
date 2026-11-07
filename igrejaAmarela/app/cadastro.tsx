import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebase.config';

function getErrorCode(error: unknown): string | undefined {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  ) {
    return error.code;
  }
}

export default function CadastroScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async () => {
    const nomeCompleto = nome.trim();
    const emailNormalizado = email.trim();

    if (!nomeCompleto || !emailNormalizado || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não conferem.');
      return;
    }

    setCarregando(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        emailNormalizado,
        senha
      );

      await updateProfile(credential.user, { displayName: nomeCompleto });
      await setDoc(doc(db, 'usuarios', credential.user.uid), {
        nome: nomeCompleto,
        email: emailNormalizado,
        role: 'fiel',
        criadoEm: serverTimestamp(),
      });
      await sendEmailVerification(credential.user);

      router.replace('/verificar-email');
    } catch (error) {
      const errorCode = getErrorCode(error);
      let mensagem = 'Não foi possível criar a conta. Tente novamente.';

      if (errorCode === 'auth/email-already-in-use') {
        mensagem = 'Esse e-mail já está cadastrado.';
      } else if (errorCode === 'auth/invalid-email') {
        mensagem = 'E-mail inválido.';
      } else if (errorCode === 'auth/weak-password') {
        mensagem = 'Senha muito fraca. Use pelo menos 6 caracteres.';
      } else if (errorCode === 'permission-denied') {
        mensagem = 'Sem permissão para salvar os dados. Confira as regras do Firestore.';
      } else if (errorCode === 'auth/network-request-failed') {
        mensagem = 'Não foi possível conectar. Verifique sua internet e tente novamente.';
      }

      console.error('Erro no cadastro:', errorCode, error);
      Alert.alert('Erro', mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Criar conta</Text>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>🙏</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoComplete="new-password"
              returnKeyType="next"
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha((mostrar) => !mostrar)}
              style={styles.eyeIcon}
              accessibilityLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              <Ionicons
                name={mostrarSenha ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor="#999"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={handleCadastro}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, carregando && styles.disabledButton]}
            onPress={handleCadastro}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#1b1a1a" />
            ) : (
              <>
                <Text style={styles.buttonText}>Cadastrar</Text>
                <Ionicons name="arrow-forward-outline" size={20} color="#1b1a1a" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => router.replace('/')}
            disabled={carregando}
          >
            <Text style={styles.linkText}>Já tenho conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#fec31d',
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1b1a1a',
    marginBottom: 20,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: -40,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 5,
  },
  button: {
    backgroundColor: '#fec31d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10,
    gap: 10,
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
  },
  linkText: {
    color: '#999',
    fontSize: 14,
  },
});
