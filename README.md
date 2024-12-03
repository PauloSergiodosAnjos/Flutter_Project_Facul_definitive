# Projeto ToDoList - A3 - Anima

### Dados dos Alunos
- Davidson Piqui RA 822226778
- Eduardo Augusto Santos Pinheiro - RA 12823213606
- José Vitor Cunha Barboza - RA: 12523171336
- Lucas Lima Ribeiro - RA: 12723130989
- Manoel Vinicius Silva Souza - RA: 722315125
- Nathan Almeida Gois - RA: 722311425
- Paulo Sérgio - RA: 722310346


### Dados App
- Link Video - https://www.youtube.com/watch?v=rzzogdyb2NI&t=132s
- Link Drive - https://drive.google.com/drive/folders/1Rqrli3RqqZq8WjDAfj1bOtW96bb27e0T


### Requisitos do Aplicativo de To-Do List e Lembretes
 
### 1. Visão Geral O aplicativo de controle de tarefas e lembretes será desenvolvido utilizando
• Framework Flutter, com o objetivo de facilitar o gerenciamento de atividades diárias de
maneira eficiente e intuitiva.
### 2. Funcionalidades Principais
### 2.1. Gerenciamento de Tarefas
• Adicionar tarefas com título, descrição, data e hora de vencimento.
• Editar tarefas existentes.
• Excluir tarefas que não são mais necessárias.
• Marcar tarefas como concluídas.
• Categorizar tarefas para facilitar a organização.
### 2.2. Lembretes
• Adicionar lembretes com título, descrição, data e hora.
• Editar lembretes existentes.
• Excluir lembretes que não são mais necessários.
• Enviar notificações para lembrar os usuários sobre tarefas e lembretes.
### 2.3. Interface do Usuário
• Interface intuitiva e fácil de usar, com navegação simples.
• Suporte a temas claro e escuro.
• Função de pesquisa para localizar tarefas e lembretes por título ou descrição.
### 3. Requisitos Técnicos
### 3.1. Plataforma
• O aplicativo será desenvolvido em Flutter, garantindo compatibilidade com
Android e iOS.
### 3.2. Banco de Dados
• Uso de SQLite para armazenamento local.
• Sincronização com serviços em nuvem (opcional).
### 3.3. Notificações
• Notificações locais para lembretes e tarefas.
### 4. Requisitos de Desempenho
• Aplicativo responsivo e funcional em diferentes tamanhos de tela.
• Desempenho otimizado para garantir fluidez e eficiência.
### 5. Requisitos de Segurança
• Suporte à autenticação de usuários (login por e-mail e senha ou redes sociais).
• Armazenamento seguro e privativo dos dados dos usuários.

## Segunda Tarefa: Desenvolvimento do Aplicativo
Objetivo Agora que a prototipagem foi finalizada, chegou o momento de construir o
aplicativo Flutter que implementa os requisitos especificados.
### 1. Implementação das Funcionalidades Desenvolver as telas e funcionalidades do
aplicativo conforme os protótipos apresentados na tarefa 1:
• Tela de Login
• Tela de Registro
• Tela Principal (Lista de Tarefas)
• Tela de Adicionar/Editar Tarefa
• Tela de Configurações
### 2. Notificações e Banco de Dados
• Implementar as funcionalidades de lembrete e tarefas utilizando SQLite para o
armazenamento local.
• As notificações devem ser configuradas para lembrar o usuário das tarefas e
lembretes.
### 3. Estilo e Temas
• Garantir que o aplicativo tenha um design responsivo, oferecendo suporte para
temas claro e escuro.
Entrega da Atividade
### 1. Execução
• O trabalho pode ser realizado em grupos de até 5 alunos, todos devidamente
identificados na entrega.
### 2. Entrega
• Mesmo sendo um trabalho em grupo, a entrega deve ser individual, com cada
aluno submetendo o link do GitHub do projeto no ULife.

• O README.md do GitHub, deve conter:
o O nome dos integrantes do grupo
o Um link para a loja ou o local onde está publicada a APK
o Um vídeo demo do App

Como Configurar o Projeto Flutter na Sua Máquina

1️⃣ Pré-requisitos Certifique-se de ter os seguintes itens instalados:

Flutter SDK: flutter.dev Git: git-scm.com Editor de Código: VS Code ou Android Studio Java JDK 11+ (para Android): AdoptOpenJDK Xcode (para iOS, apenas no macOS): Instale pela App Store.

2️⃣ Instale o Flutter Baixe o Flutter SDK:

Acesse flutter.dev e baixe o SDK para o seu sistema operacional. Extraia o Flutter:

No Windows: Extraia para C:\src\flutter. No macOS/Linux: Extraia para ~/flutter. Adicione ao PATH:

Windows: Adicione C:\src\flutter\bin às Variáveis de Ambiente. macOS/Linux: Edite o arquivo ~/.bashrc ou ~/.zshrc e adicione: bash Copiar código export PATH="$PATH:$HOME/flutter/bin" Atualize o terminal: bash Copiar código source ~/.bashrc Verifique a instalação:

Execute no terminal: bash Copiar código flutter doctor Resolva quaisquer problemas indicados.

3️⃣ Clone o Projeto Clone o repositório:

bash Copiar código git clone <URL_DO_REPOSITORIO> cd <PASTA_DO_PROJETO> Instale as dependências do Flutter:

bash Copiar código flutter pub get

4️⃣ Configure o Ambiente de Execução Android Emulador Android: Abra o Android Studio > Device Manager e inicie um emulador. Dispositivo Físico: Ative a depuração USB no dispositivo e conecte-o ao computador. iOS (macOS) Simulador iOS: Inicie o simulador pelo Xcode ou com o comando: bash Copiar código open -a Simulator Dispositivo Físico: Conecte o iPhone ao computador e configure no Xcode. Verifique os dispositivos conectados: bash Copiar código flutter devices

5️⃣ Execute o Projeto Inicie o projeto:

bash Copiar código flutter run No VS Code:

Pressione F5 ou acesse Run > Start Debugging. No Android Studio:

Clique em Run > Run 'main.dart'.

6️⃣ Dicas de Desenvolvimento Hot Reload: Faça alterações e pressione r no terminal para atualizar instantaneamente. Hot Restart: Pressione R no terminal para reiniciar o estado do aplicativo. Gerencie dependências: Adicione ou atualize pacotes no arquivo pubspec.yaml. 🛠 Resolva Problemas Comuns Erro no flutter doctor: Siga as instruções exibidas no terminal para corrigir dependências ou configurações faltantes. Dispositivo não encontrado: Certifique-se de que o dispositivo está conectado e a depuração está habilitada. Com isso, o projeto estará rodando corretamente na sua máquina. 🚀


