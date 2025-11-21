// Funções para alternar entre modo de edição e visualização
const btnEditar = document.getElementById('editarBtn');
let editMode = false;

btnEditar.addEventListener('click', () => {
  editMode = !editMode;
  const campos = document.querySelectorAll('.card-dados p');

  if (editMode) {
    campos.forEach(campo => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = campo.textContent;
      campo.replaceWith(input);
    });
    btnEditar.textContent = 'Salvar';
  } else {
    const inputs = document.querySelectorAll('.card-dados input');
    inputs.forEach(input => {
      const p = document.createElement('p');
      p.textContent = input.value;
      input.replaceWith(p);
    });
    btnEditar.textContent = 'Editar';
  }
});

// Funções para os botões de editar dentro dos mini-cards
const btnEditar1 = document.getElementById('editarBtn1');
let editMode1 = false;

btnEditar1.addEventListener('click', () => {
  editMode1 = !editMode1;
  const campos = document.querySelectorAll('.coluna.mini-card p');

  if (editMode1) {
    campos.forEach(campo => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = campo.textContent;
      campo.replaceWith(input);
    });
    btnEditar1.textContent = 'Salvar';
  } else {
    const inputs = document.querySelectorAll('.coluna.mini-card input');
    inputs.forEach(input => {
      const p = document.createElement('p');
      p.textContent = input.value;
      input.replaceWith(p);
    });
    btnEditar1.textContent = 'Editar';
  }
});

// Função para o segundo botão de editar dentro dos mini-cards
const btnEditar2 = document.getElementById('editarBtn2');
let editMode2 = false;

btnEditar2.addEventListener('click', () => {
  editMode2 = !editMode2;
  const campos = document.querySelectorAll('.coluna.mini-card p');

  if (editMode2) {
    campos.forEach(campo => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = campo.textContent;
      campo.replaceWith(input);
    });
    btnEditar2.textContent = 'Salvar';
  } else {
    const inputs = document.querySelectorAll('.coluna.mini-card input');
    inputs.forEach(input => {
      const p = document.createElement('p');
      p.textContent = input.value;
      input.replaceWith(p);
    });
    btnEditar2.textContent = 'Editar';
  }
});