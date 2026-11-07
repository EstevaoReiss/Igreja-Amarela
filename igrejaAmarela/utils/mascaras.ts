export function mascaraTelefone(valor: string): string {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);

  if (numeros.length <= 2) {
    return numeros.length ? `(${numeros}` : '';
  }

  const ddd = numeros.slice(0, 2);
  const numero = numeros.slice(2);
  const parteInicial = numero.slice(0, 5);
  const parteFinal = numero.slice(5, 9);

  return `(${ddd}) ${parteInicial}${parteFinal ? `-${parteFinal}` : ''}`;
}
