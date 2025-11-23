# ZenFlow - Diário de Bem-Estar

## ⚠️ O Desafio

O futuro do trabalho impõe grande pressão sobre a saúde mental dos colaboradores. Empresas não conseguem monitorar o estresse e prevenir o burnout de forma eficaz e ética, pois não há um canal anônimo e seguro para os trabalhadores expressarem seu estado emocional.

## ✨ A Solução

O ZenFlow é uma plataforma que usa tecnologia para monitorar o bem-estar coletivo da organização. Fornece dados empáticos para a gestão tomar decisões baseadas em evidências, criando um ambiente de trabalho mais inclusivo e sustentável.

A solução ZenFlow está diretamente alinhada com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, especialmente:

#### 🎯 ODS 8: Trabalho Decente e Crescimento Econômico

Ao focar no bem-estar e na saúde mental, a solução contribui para a promoção de ambientes de trabalho seguros e saudáveis, garantindo um trabalho digno para todos. O monitoramento contínuo do estresse permite que as organizações identifiquem e resolvam problemas antes que impactem significativamente a qualidade de vida dos colaboradores.

#### 📚 ODS 4: Educação de Qualidade

A partir dos dados coletados, a empresa pode identificar tendências e investir em programas de capacitação e workshops focados em gestão de estresse e inteligência emocional, promovendo o aprendizado ao longo da vida. O ZenFlow fornece insights valiosos que orientam o desenvolvimento de programas educacionais personalizados.

#### ⚖️ ODS 10: Redução das Desigualdades

O anonimato garante que todos os colaboradores, independentemente do cargo ou vulnerabilidade, possam expressar suas preocupações de forma segura, criando um sistema de apoio mais inclusivo. Isso elimina barreiras hierárquicas e promove equidade no acesso a recursos de bem-estar.

## 📖 Sobre o Projeto

O ZenFlow é composto por duas aplicações complementares:

1. **API REST (gs-ZenFlow)**: Fornece endpoints RESTful para integração com outros sistemas, com documentação Swagger completa e tratamento padronizado de erros.

2. **Aplicação Web MVC (Web-gs-ZenFlow)**: Interface web amigável para gerenciamento de usuários e registros de estresse, utilizando Razor Pages e Bootstrap.

Ambas as aplicações compartilham a mesma arquitetura em camadas, banco de dados Oracle e lógica de negócio, garantindo consistência e reutilização de código.

---
## 📱 Funcionalidades

### Para Colaboradores

- **Registro Diário de Estresse**: Registre seu nível de estresse diariamente em uma escala de 1 a 5
- **Observações Opcionais**: Adicione observações sobre como foi seu dia
- **Histórico de Registros**: Visualize todos os seus registros anteriores
- **Edição e Exclusão**: Edite ou exclua registros anteriores conforme necessário
- **Dicas de Bem-Estar**: Acesse dicas práticas para melhorar seu bem-estar e reduzir o estresse

### Para Gestores

- **Painel de Estatísticas**: Visualize métricas agregadas do bem-estar da equipe
- **Média de Estresse**: Acompanhe a média de estresse da organização
- **Moda (Nível Mais Frequente)**: Identifique o nível de estresse mais comum
- **Indicador de Alto Estresse**: Monitore a porcentagem de colaboradores com níveis altos de estresse (4 ou 5)
- **Atualização em Tempo Real**: Estatísticas atualizadas automaticamente

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Tipagem estática para JavaScript
- **Expo Router** - Roteamento baseado em arquivos
- **Axios** - Cliente HTTP para requisições à API
- **React Native Safe Area Context** - Gerenciamento de áreas seguras
- **Expo Vector Icons** - Biblioteca de ícones

---

## 📦 Instalação e Configuração

### **Pré-requisitos**

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** como gerenciador de pacotes
- **Git** para clonar o repositório
- **Expo CLI** (instalado globalmente): `npm install -g expo-cli`

### **Instalação das Dependências**

1. **Clone o repositório**

```bash
git clone https://github.com/amandaagaldino/GS-ZenFlow.git
```

2. **Instale as dependências do projeto**

```bash
npm install
```

Isso instalará automaticamente todas as dependências listadas no `package.json`:

- Dependências de produção (React Native, Expo, Expo Router, etc.)
- Dependências de desenvolvimento (TypeScript, tipos do React)

3. **Inicie o servidor de desenvolvimento**

```bash
npm start
# ou
npx expo start
```

### **Executando o Projeto**

Após iniciar o servidor, você terá as seguintes opções:

- **Web**: Pressione `w` ou acesse `http://localhost:8081`
- **Android**: Pressione `a` (requer Android SDK configurado)
- **iOS**: Pressione `i` (requer macOS e Xcode)
- **Expo Go**: Escaneie o QR code com o app Expo Go no seu dispositivo móvel

---

## 📁 Estrutura do Projeto

```
GS-ZenFlow/
├── assets/              # Imagens e recursos estáticos
│   └── logozenflow.png
├── src/
│   ├── api/            # Cliente API e serviços
│   │   ├── apiClient.ts
│   │   └── registros.ts
│   ├── app/            # Telas e rotas (Expo Router)
│   │   ├── (tabs)/     # Navegação por abas
│   │   │   ├── index.tsx      # Tela principal (registro)
│   │   │   ├── historico.tsx  # Histórico de registros
│   │   │   └── dicas.tsx      # Dicas de bem-estar
│   │   ├── gestor.tsx         # Painel do gestor
│   │   ├── login.tsx          # Login de colaborador
│   │   └── manager-login.tsx  # Login de gestor
│   ├── components/     # Componentes reutilizáveis
│   │   ├── DicaCard.tsx
│   │   ├── LevelButton.tsx
│   │   ├── RegistroItem.tsx
│   │   └── StatCard.tsx
│   ├── constants/      # Constantes e temas
│   │   └── theme.ts
│   ├── types/          # Definições de tipos TypeScript
│   │   └── registro.ts
│   └── utils/          # Funções utilitárias
│       └── estresse.ts
├── app.json            # Configuração do Expo
├── package.json        # Dependências do projeto
└── tsconfig.json       # Configuração TypeScript
```

## 🔄 Operações CRUD via Axios

O projeto implementa todas as operações CRUD (Create, Read, Update, Delete) usando Axios para comunicação com a API backend.

| Operação | Método HTTP | Função | Endpoint | Uso no App |
|----------|-------------|--------|----------|------------|
| **C**reate | `POST` | `createRegistro()` | `/registros` | Tela principal (`index.tsx`) - criar novo registro |
| **R**ead | `GET` | `getRegistros()` | `/registros` | Tela de histórico - listar registros |
| **R**ead | `GET` | `getEstatisticas()` | `/registros` | Tela do gestor - buscar dados para estatísticas |
| **U**pdate | `PUT` | `updateRegistro()` | `/registros/:id` | Tela de histórico - editar nível de estresse |
| **D**elete | `DELETE` | `deleteRegistro()` | `/registros/:id` | Tela de histórico - excluir registro |

## 📱 Telas do Aplicativo

### Tela de Login
- Login para colaboradores
- Acesso ao login de gestores

### Tela Principal (Registro)
- Seleção de nível de estresse (1-5)
- Campo de observações opcional
- Botão para registrar

### Histórico
- Lista de todos os registros
- Edição de registros
- Exclusão de registros
- Pull-to-refresh

### Dicas de Bem-Estar
- 8 dicas práticas para reduzir o estresse
- Interface visual e intuitiva

### Painel do Gestor
- Estatísticas agregadas
- Métricas de bem-estar coletivo
- Atualização em tempo real

## 🔒 Segurança e Privacidade

O ZenFlow foi desenvolvido com foco em privacidade e anonimato. Os registros são armazenados de forma segura e os gestores visualizam apenas dados agregados, preservando a identidade individual dos colaboradores.


## 👥 Autores

| Nome               | RM     |
| ------------------ | ------ |
| Amanda Galdino     | 560066 |
| Bruno Cantacini    | 560242 |
| Gustavo Gonçalves | 556823 |

---

**Desenvolvido com ❤️ para melhorar o bem-estar no ambiente de trabalho**
