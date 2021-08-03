export function maskCPF(value) {
  value = value.replace(/\D/g, ''); //123456789

  value = value.replace(/^(\d{3})(\d)/g, '$1.$2');
  value = value.replace(/(\d{3})(\d{2})/g, '$1.$2');
  value = value.replace(/(\d{3})(\d)/g, '$1-$2');

  return value;
}

export function maskCNPJ(value) {
  value = value.replace(/\D/g, ''); //123456789

  value = value.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5',
  );
  // value = value.replace(/^(\d{2})(\d)/g, '$1.$2');
  return value;
}

export function maskPhone(value) {
  value = value.replace(/\D/g, ''); //123456789

  value = value.replace(/^(\d{2})(\d)/g, '($1) $2 ');
  value = value.replace(/(\d{4})(\d)/g, '$1 - $2');

  return value;
}
