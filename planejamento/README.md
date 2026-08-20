# Planejamento

Documentação referente à Fase 1 — Planejamento do projeto.

Sistema Hotelaria

Funcionalidades do Sistema
  
- Cadastro de clientes.
- Cadastro de quartos e tipos de quartos.
- Consulta da disponibilidade dos quartos.
- Agendamento de diárias dos clientes.
- Check-in e check-out.
- Alteração e cancelamento de reservas.
- Cálculo automático do valor da hospedagem.
- Registro e processamento de pagamentos pelo sistema.
- Emissão de comprovante de pagamento.
- Controle do status dos quartos: disponível, reservado, ocupado, em manutenção.
- Consulta do histórico de reservas e pagamentos.
- Geração de relatórios de ocupação e faturamento.


Requisitos Funcionais

- RF01 – Cadastrar clientes:
  O sistema deve permitir cadastrar, consultar, alterar e excluir os dados dos clientes.
- RF02 – Cadastrar quartos:
  O sistema deve permitir cadastrar quartos, incluindo número, tipo, capacidade, valor da diária e status.
- RF03 – Consultar disponibilidade:
  O sistema deve permitir verificar quais quartos estão disponíveis para um determinado período.
- RF04 – Realizar reserva:
  O sistema deve permitir ao funcionário realizar o agendamento de diárias para um cliente, informando data de entrada, data de saída e quarto escolhido.
- RF05 – Calcular hospedagem:
  O sistema deve calcular automaticamente o valor total da hospedagem com base na quantidade de diárias e no valor do quarto.
- RF06 – Realizar pagamento:
  O sistema deve permitir registrar e processar o pagamento da hospedagem.
- RF07 – Emitir comprovante:
  O sistema deve disponibilizar um comprovante da reserva e do pagamento realizado.
- RF08 – Gerenciar reservas:
  O sistema deve permitir alterar ou cancelar reservas conforme as regras do hotel.
- RF09 – Realizar check-in e check-out:
  O sistema deve permitir registrar a entrada e a saída dos hóspedes.
- RF10 – Gerar relatórios:
  O sistema deve permitir gerar relatórios de reservas, ocupação dos quartos e pagamentos.


Requisitos Não Funcionais

- RNF 01 – Segurança:
O sistema deve proteger os dados dos clientes e permitir acesso somente a usuários autorizados.

- RNF 02 – Desempenho:
O sistema deve responder às operações realizadas pelos usuários em um tempo adequado, evitando lentidão.

- RNF 03 – Disponibilidade:
O sistema deve estar disponível para utilização durante o horário de funcionamento do hotel.

- RNF 04 – Usabilidade:
A interface deve ser simples, intuitiva e fácil de utilizar pelos funcionários.

- RNF 05 – Confiabilidade:
O sistema deve garantir que as informações de reservas e pagamentos sejam armazenadas corretamente.

- RNF 06 – Backup:
O sistema deve realizar cópias de segurança periódicas dos dados.

- RNF 07 – Privacidade:
Os dados pessoais e financeiros dos clientes devem ser tratados de forma segura e conforme a legislação aplicável.

- RNF 08 – Manutenibilidade:O sistema deve possuir uma estrutura que facilite futuras correções, atualizações e inclusão de novas funcionalidades.

Regras de negócio

RN01- Cadastro de clientes:
O cadastro do cliente deve ter o nome completo, CPF, telefone, e-mail e endereço.

RN02- Cadastro de quartos:
Somente usuários com perfil de administrador podem cadastrar, alterar ou excluir quartos.

RN03- Tipos de quarto:
Cada quarto deve estar associado a um tipo de quarto, como individual, duplo, triplo ou suíte, e possuir um valor de diária.

RN04- Status dos quartos:
Cada quarto deve possuir apenas um dos seguintes status: disponível, reservado, ocupado ou em manutenção.

RN05- Quartos em manutenção:
Quartos com status em manutenção não podem ser reservados ou utilizados para hospedagem.

RN06- Disponibilidade:
Um quarto somente será considerado disponível quando não possuir outra reserva para o período solicitado e seu status não for "em manutenção".

RN07- Reserva:
Um mesmo quarto não pode possuir duas reservas que tenham períodos de hospedagem iguais.

RN08- Dados da reserva:
Para realizar uma reserva, o cliente deve estar cadastrado e informar a data de entrada e a data de saída.

RN09- Datas da hospedagem:
A data de saída deve ser posterior à data de entrada.

RN10- Cancelamento:
O cliente poderá cancelar uma reserva gratuitamente até 24 horas antes do horário previsto para o check-in.

RN11- Check-in:
O check-in só poderá ser realizado quando haver uma reserva válida ou quando houver um quarto disponível.

RN12- Check-out:
O check-out encerra a hospedagem e altera o status do quarto para disponível, desde que o quarto não esteja reservado para outro cliente ou em manutenção.

RN13- Cálculo da hospedagem:
O valor total da hospedagem será calculado pela quantidade de diárias multiplicada pelo valor da diária do quarto.

RN14- Pagamento:
O pagamento tem que estar vinculado em uma reserva ou hospedagem existente e o status deve ser registrado no sistema.

RN15- Comprovante:
O sistema só irá emitir o comprovante de pagamento após o pagamento ser registrado com sucesso.

RN16- Histórico:
As reservas e os pagamentos que forem realizados devem ficar registrados no histórico do cliente.

RN17- Relatórios:
Os relatórios de ocupação e faturamento devem utilizar exclusivamente os dados registrados no sistema.
