export function validarTelefone(telefone: string): string | undefined {
  const numeros = telefone.replace(/\D/g, '');

  if (!numeros) {
    return 'Informe seu telefone.';
  }

  if (!/^\d{2}9\d{8}$/.test(numeros)) {
    return 'Informe um telefone com DDD e 9 dígitos após o DDD.';
  }
}

export function validarCidade(cidade: string): string | undefined {
  const cidadeNormalizada = cidade.trim();

  if (!cidadeNormalizada) {
    return 'Informe sua cidade.';
  }

  if (!/^[A-Za-zÀ-ÿ\s]+$/.test(cidadeNormalizada)) {
    return 'Use apenas letras e espaços no nome da cidade.';
  }
}
