export default {
  cnpjCpf: {
    presence: {
      allowEmpty: false,
      message: 'CNPJ ou CPF não pode estar em branco.'
    },
    length: {
      minimum: 11,
      message: 'Por favor, digite um CPF ou CNPJ válido.'
    }
  },
  producerName: {
    presence: {
      allowEmpty: false,
      message: 'Nome do produtor não pode estar em branco.'
    }
  },
  farmName: {
    presence: {
      allowEmpty: false,
      message: 'Nome da fazenda não pode estar em branco.'
    }
  },
  totalArea: {
    presence: {
      allowEmpty: false,
      message: 'Área total não pode estar em branco.'
    }
  },
  arableArea: {
    presence: {
      allowEmpty: false,
      message: 'Área agricultável não pode estar em branco.'
    }
  },
  vegetationArea: {
    presence: {
      allowEmpty: false,
      message: 'Área de vegetação não pode estar em branco.'
    }
  },
  city: {
    presence: {
      allowEmpty: false,
      message: 'Cidade não pode estar em branco.'
    }
  },
  state: {
    presence: {
      allowEmpty: false,
      message: 'Estado não pode estar em branco.'
    }
  }
}
