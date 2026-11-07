import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../src/firebase.config';

export type UsuarioPerfil = {
  nome?: string;
  email?: string;
  telefone?: string;
  cidade?: string;
  tipoUsuario?: string;
};

function paraTexto(valor: unknown): string | undefined {
  return typeof valor === 'string' && valor.trim() ? valor.trim() : undefined;
}

function paraUsuarioPerfil(dados: Record<string, unknown>): UsuarioPerfil {
  return {
    nome: paraTexto(dados.nome),
    email: paraTexto(dados.email),
    telefone: paraTexto(dados.telefone),
    cidade: paraTexto(dados.cidade),
    tipoUsuario: paraTexto(dados.tipoUsuario),
  };
}

function paraErro(error: unknown): Error {
  return error instanceof Error ? error : new Error('Não foi possível carregar o perfil.');
}

export function traduzirTipoUsuario(tipoUsuario?: string | null): string {
  const tipo = tipoUsuario?.trim();
  if (!tipo) return 'Membro';

  const tiposConhecidos: Record<string, string> = {
    admin: 'Administrador',
    administrador: 'Administrador',
    fiel: 'Fiel',
    colaborador: 'Colaborador',
    doador: 'Doador',
    voluntario: 'Voluntário',
    'voluntário': 'Voluntário',
  };

  return tiposConhecidos[tipo.toLocaleLowerCase('pt-BR')] ?? tipo;
}

export function usuarioEhAdmin(usuario: UsuarioPerfil | null): boolean {
  return usuario?.tipoUsuario?.trim().toLocaleLowerCase('pt-BR') === 'admin';
}

export function useUsuario(): {
  usuario: UsuarioPerfil | null;
  carregando: boolean;
  erro: Error | null;
} {
  const [usuario, setUsuario] = useState<UsuarioPerfil | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<Error | null>(null);

  useEffect(() => {
    let unsubscribePerfil: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      (user: User | null) => {
        unsubscribePerfil?.();
        unsubscribePerfil = undefined;
        setUsuario(null);
        setErro(null);

        if (!user) {
          setCarregando(false);
          return;
        }

        setCarregando(true);
        unsubscribePerfil = onSnapshot(
          doc(db, 'usuarios', user.uid),
          (snapshot) => {
            setUsuario(
              snapshot.exists()
                ? paraUsuarioPerfil(snapshot.data() as Record<string, unknown>)
                : null
            );
            setErro(null);
            setCarregando(false);
          },
          (snapshotError) => {
            console.error('Erro ao carregar perfil do usuário:', snapshotError);
            setUsuario(null);
            setErro(paraErro(snapshotError));
            setCarregando(false);
          }
        );
      },
      (authError) => {
        console.error('Erro ao observar autenticação:', authError);
        unsubscribePerfil?.();
        unsubscribePerfil = undefined;
        setUsuario(null);
        setErro(paraErro(authError));
        setCarregando(false);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribePerfil?.();
    };
  }, []);

  return { usuario, carregando, erro };
}
