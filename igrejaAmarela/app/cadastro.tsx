import { useState } from 'react';
import {
  ActivityIndicator,
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
import { mascaraTelefone } from '../utils/mascaras';
import { validarCidade, validarTelefone } from '../utils/validacoes';

type TipoUsuario = 'fiel' | 'colaborador';
type CamposCadastro =
  | 'nome'
  | 'email'
  | 'telefone'
  | 'cidade'
  | 'tipoUsuario'
  | 'senha'
  | 'confirmarSenha';
type ErrosCadastro = Partial<Record<CamposCadastro, string>>;

function validarCadastro(
  nome: string,
  email: string,
  telefone: string,
  cidade: string,
  tipoUsuario: TipoUsuario | null,
  senha: string,
  confirmarSenha: string
): ErrosCadastro {
  const erros: ErrosCadastro = {};
  const nomeCompleto = nome.trim();
  const emailNormalizado = email.trim().toLowerCase();

  if (!nomeCompleto) {
    erros.nome = 'Informe seu nome.';
  } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nomeCompleto)) {
    erros.nome = 'Use apenas letras e espaços no nome.';
  }

  if (!emailNormalizado) {
    erros.email = 'Informe seu e-mail.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
    erros.email = 'Informe um e-mail válido.';
  }

  const erroTelefone = validarTelefone(telefone);
  if (erroTelefone) {
    erros.telefone = erroTelefone;
  }

  const erroCidade = validarCidade(cidade);
  if (erroCidade) {
    erros.cidade = erroCidade;
  }

  if (!tipoUsuario) {
    erros.tipoUsuario = 'Selecione Fiel ou Colaborador.';
  }

  if (!senha) {
    erros.senha = 'Informe sua senha.';
  } else if (senha.length < 6) {
    erros.senha = 'A senha deve ter pelo menos 6 caracteres.';
  }

  if (!confirmarSenha) {
    erros.confirmarSenha = 'Confirme sua senha.';
  } else if (senha !== confirmarSenha) {
    erros.confirmarSenha = 'As senhas não conferem.';
  }

  return erros;
}

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
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario | null>(null);
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<ErrosCadastro>({});
  const [erroCadastro, setErroCadastro] = useState('');

  const handleCadastro = async () => {
    const nomeCompleto = nome.trim();
    const emailNormalizado = email.trim().toLowerCase();
    const cidadeNormalizada = cidade.trim();
    const telefoneNumerico = telefone.replace(/\D/g, '');
    const errosValidacao = validarCadastro(
      nomeCompleto,
      emailNormalizado,
      telefone,
      cidadeNormalizada,
      tipoUsuario,
      senha,
      confirmarSenha
    );

    setErros(errosValidacao);
    setErroCadastro('');
    if (Object.keys(errosValidacao).length > 0 || !tipoUsuario) {
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
        telefone: telefoneNumerico,
        cidade: cidadeNormalizada,
        tipoUsuario,
        criadoEm: serverTimestamp(),
      });
      await sendEmailVerification(credential.user);

      router.replace('/(drawer)/(tabs)');
    } catch (error) {
      const errorCode = getErrorCode(error);
      if (errorCode === 'auth/email-already-in-use') {
        setErros((atuais) => ({ ...atuais, email: 'Este e-mail já está cadastrado' }));
      } else if (errorCode === 'auth/invalid-email') {
        setErros((atuais) => ({ ...atuais, email: 'E-mail inválido' }));
      } else if (errorCode === 'auth/weak-password') {
        setErros((atuais) => ({
          ...atuais,
          senha: 'A senha deve ter pelo menos 6 caracteres',
        }));
      } else if (errorCode === 'permission-denied') {
        setErroCadastro('Sem permissão para salvar os dados. Confira as regras do Firestore.');
      } else if (errorCode === 'auth/network-request-failed') {
        setErroCadastro('Não foi possível conectar. Verifique sua internet e tente novamente.');
      } else {
        setErroCadastro('Não foi possível criar a conta. Tente novamente.');
      }

      console.error('Erro no cadastro:', errorCode, error);
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
              onChangeText={(valor) => {
                setNome(valor);
                setErros((atuais) => ({ ...atuais, nome: undefined }));
                setErroCadastro('');
              }}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
            />
          </View>
          {erros.nome ? <Text style={styles.errorText}>{erros.nome}</Text> : null}

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={(valor) => {
                setEmail(valor);
                setErros((atuais) => ({ ...atuais, email: undefined }));
                setErroCadastro('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
            />
          </View>
          {erros.email ? <Text style={styles.errorText}>{erros.email}</Text> : null}

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Telefone (11) 91234-5678"
              placeholderTextColor="#999"
              value={telefone}
              onChangeText={(valor) => {
                setTelefone(mascaraTelefone(valor));
                setErros((atuais) => ({ ...atuais, telefone: undefined }));
                setErroCadastro('');
              }}
              keyboardType="phone-pad"
              autoComplete="tel"
              returnKeyType="next"
            />
          </View>
          {erros.telefone ? <Text style={styles.errorText}>{erros.telefone}</Text> : null}

          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Cidade"
              placeholderTextColor="#999"
              value={cidade}
              onChangeText={(valor) => {
                setCidade(valor);
                setErros((atuais) => ({ ...atuais, cidade: undefined }));
                setErroCadastro('');
              }}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>
          {erros.cidade ? <Text style={styles.errorText}>{erros.cidade}</Text> : null}

          <Text style={styles.selectorLabel}>Tipo de usuário</Text>
          <View style={styles.userTypeSelector}>
            {([
              ['fiel', 'Fiel'],
              ['colaborador', 'Colaborador'],
            ] as const).map(([tipo, rotulo]) => {
              const selecionado = tipoUsuario === tipo;
              return (
                <TouchableOpacity
                  key={tipo}
                  style={[styles.userTypeButton, selecionado && styles.userTypeButtonSelected]}
                  onPress={() => {
                    setTipoUsuario(tipo);
                    setErros((atuais) => ({ ...atuais, tipoUsuario: undefined }));
                    setErroCadastro('');
                  }}
                  accessibilityRole="button"
                  accessibilityState={{ selected: selecionado }}
                >
                  <Text
                    style={[
                      styles.userTypeButtonText,
                      selecionado && styles.userTypeButtonTextSelected,
                    ]}
                  >
                    {rotulo}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          {erros.tipoUsuario ? (
            <Text style={styles.errorText}>{erros.tipoUsuario}</Text>
          ) : null}

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#999"
              value={senha}
              onChangeText={(valor) => {
                setSenha(valor);
                setErros((atuais) => ({
                  ...atuais,
                  senha: undefined,
                  confirmarSenha: confirmarSenha
                    ? confirmarSenha === valor
                      ? undefined
                      : 'As senhas não conferem.'
                    : atuais.confirmarSenha,
                }));
                setErroCadastro('');
              }}
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
          {erros.senha ? <Text style={styles.errorText}>{erros.senha}</Text> : null}

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              placeholderTextColor="#999"
              value={confirmarSenha}
              onChangeText={(valor) => {
                setConfirmarSenha(valor);
                setErros((atuais) => ({ ...atuais, confirmarSenha: undefined }));
                setErroCadastro('');
              }}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={handleCadastro}
            />
          </View>
          {erros.confirmarSenha ? (
            <Text style={styles.errorText}>{erros.confirmarSenha}</Text>
          ) : null}

          {erroCadastro ? <Text style={styles.errorText}>{erroCadastro}</Text> : null}
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
            onPress={() => router.replace('/login')}
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
  selectorLabel: {
    color: '#555',
    fontSize: 14,
    marginBottom: 8,
  },
  userTypeSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  userTypeButton: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 13,
    backgroundColor: '#f8f8f8',
  },
  userTypeButtonSelected: {
    borderColor: '#fec31d',
    backgroundColor: '#fff8df',
  },
  userTypeButtonText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
  },
  userTypeButtonTextSelected: {
    color: '#1b1a1a',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
    marginTop: -10,
    marginBottom: 12,
    marginLeft: 4,
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
