# Projeto de Aplicação de Livros

Esta é uma aplicação Angular para explorar e gerenciar livros buscados e favoritados pelo usuário. A aplicação permite buscar livros usando a API do Google Books, adicionar livros aos favoritos, editar favoritos e aplicar filtros para visualizar livros com base em tags pré-estabelecidas, que o usuário pode adicionar aos livros favoritados.

## Funcionalidades

- **Busca de Livros**: Pesquise livros por título e/ou autor usando a API do Google Books.
- **Gerenciamento de Favoritos**: Adicione, remova e edite livros na lista de favoritos (comentários e notas).
- **Gerenciamento de erros pesquisa**: Função que dá um retorno para o usuário caso o nome do livro/ou autor for inexistente.
- **Filtros**: Aplique filtros por tags para visualizar apenas os livros que correspondem aos critérios especificados.

## Tecnologias Utilizadas

- **Angular**: Framework para criar a aplicação front-end.
- **Bootstrap**: Biblioteca de CSS para design responsivo e estilização.
- **RxJS**: Biblioteca para programação reativa com Observables.
- **API do Google Books**: API para buscar informações sobre livros.

## Estrutura do Projeto

- **src/app/_models/**: Contém modelos de dados como `Book` e `FavoriteBook`.
- **src/app/_services/**: Contém serviços para buscar livros, gerenciar favoritos e controle de notificações.
- **src/app/_components/**: Contém os componentes da aplicação, como `BooksCardsComponent` e `FavoritesComponent`.
- **src/app/components/nav-bar/**: Estrutura básica da barra de navegação das páginas, contendo os botões de buscar e favoritos.
- **src/environments/**: Contém o arquivo de configuração com a URL base para acesso à API, por exemplo, `environment.development.ts`.

## Configuração do Ambiente

1. **Clone o Repositório**

    ```bash
    git clone https://github.com/Octavioleite/Coco_Bambu_Project.git
    cd Coco_Bambu_Project
    ```

2. **Instale as Dependências**

    ```bash
    npm install
    ```

3. **Configure as Variáveis de Ambiente**

    - Abra o arquivo `src/app/_services/UserService` e adicione sua chave de API do Google Books na variável const url = `${this.baseUrl}q=${query}&key=Coloque sua key aqui`;

  

4. **Inicie o Servidor de Desenvolvimento**

    ```bash
    ng serve
    ```

    Em seguida, acesse a aplicação no navegador através do [http://localhost:4200].

## Contribuição

1. **Solicitação para Implementações**

    Envie um e-mail para octavio.leite88@gmail.com pedindo autorização para participar do repositório.

2. **Após a Aprovação da Solicitação**

    - Faça o upload das suas alterações para o GitHub:

    ```bash
    git add .
    git commit -m "SEU COMENTÁRIO"
    git push origin main
    ```

3. **Ajuste o README**

    - Adicione as novas funcionalidades e faça as correções necessárias no arquivo `README.md`.

## Contato

Para mais informações, entre em contato com [octavio.leite88@gmail.com](mailto:octavio.leite88@gmail.com).

