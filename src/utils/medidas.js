export function IMC(peso, altura) {
  const imc = peso / (altura * altura).toFixed(0);
  return imc !== Infinity ? imc : 0.0;
}

export function statusIMC(imc) {
  if (imc < 16 && imc !== 0) {
    return 'Subpeso Severo';
  } else if (imc >= 16 && imc <= 19.9) {
    return 'Subpeso';
  } else if (imc >= 20 && imc <= 24.9) {
    return 'Normal';
  } else if (imc >= 25 && imc <= 29.9) {
    return 'Sobrepeso';
  } else if (imc >= 30 && imc <= 39.9) {
    return 'Obeso';
  } else if (imc > 40) {
    return 'Obeso Mórbido';
  } else {
    return 'Indefinido';
  }
}
