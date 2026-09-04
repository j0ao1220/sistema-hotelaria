# Casos de Uso

#UC(Use Case)
## Relação entre requisitos e casos de uso 

### RF01 - Cadastrar clientes 

  - UC01 - Cadastrar Cliente
    
      Ator: Funcionário
      
      Objetivo: Permitir o cadastro de um novo cliente no sistema.
      
      Pré-condições:
       O usuário deve estar autenticado no sistema.
      
      Fluxo Principal:
      
      1. O funcionário acessa a opção de cadastro de clientes.
      2. O sistema apresenta o formulário de cadastro.
      3. O funcionário informa o nome completo, CPF, telefone, e-mail e endereço do cliente.
      4. O sistema valida os dados informados.
      5. O sistema verifica se o CPF já está cadastrado.
      6. Não havendo cadastro com o CPF informado, o sistema registra o novo cliente.
      7. O sistema informa que o cadastro foi realizado com sucesso.
      
      Fluxos Alternativos:
      
      3a. Caso algum dado obrigatório não seja informado, o sistema solicita o preenchimento do campo.
      4a. Caso algum dado informado seja inválido, o sistema informa o erro e solicita a correção.
      5a. Caso o CPF já esteja cadastrado, o sistema informa que o cliente já possui cadastro e não realiza um novo registro.
      
      Regra de Negócio relacionada:
      
      RN01 - O cadastro deve conter nome completo, CPF, telefone, e-mail e endereço.

  - UC02 - Consultar Cliente
  - UC03 - Alterar Cliente
  - UC04 - Excluir Cliente

### RF02 - Cadastrar quartos 

  - UC05 - Cadastrar Quartos

### RF03 - Consultar disponibilidade

  - UC06 - Consultar Disponibilidade

### RF04 - Realizar reserva

  - UC07 - Realizar Reserva

### RF05 - Calcular hospedagem 

  - UC08 - Calcular Hospedagem

### RF06 - Realizar pagamento

  - UC09 - Realizar pagamento

### RF07 - Emitir comprovante 

  - UC10 - Emitir Comprovante

### RF08 - Gerenciar reservas

  - UC11 - Alterar Reserva
  - UC12 - Cancelar Reserva

### RF09 - Realizar check-in e check-out

  - UC13 - Realizar Check-in
  - UC14 - Realizar Check-out

### RF10 - Gerar relatórios 

  - UC15 - Gerar Relatórios 

  
