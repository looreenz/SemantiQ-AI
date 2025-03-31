# **SemantiQ AI**

## Sistema d'Anàlisi Intel·ligent de Documents

Lorenzo Cremonese  
2º DAW  
2024/2025

1. #  **Introducció**

**SemantiQ AI** és un sistema d’anàlisi intel·ligent de documents que integra intel·ligència artificial per extreure informació i respondre preguntes basant-se en documents carregats pels usuaris. Mitjançant l’ús d’un sistema *Retrieval-Augmented Generation* (*RAG*), el projecte combina la recuperació d'informació amb la generació de text per proporcionar respostes més precises i contextualitzades. L’objectiu principal és optimitzar la consulta i gestió de documents en entorns acadèmics i empresarials, facilitant l’accés a la informació de manera automatitzada.

1. ## **Mòduls als que implica**

   Per al desenvolupament del projecte s’han aplicat coneixements de diferents mòduls del cicle formatiu **Desenvolupament d'Aplicacions Web**, cadascun amb un grau d’aplicació diferent:

1. **Llenguatge de Marques i Gestió de la Informació**:  
* Ús d'HTML per estructurar dades i millorar la interoperabilitat del sistema.  
2. **Base de Dades**:  
* Implementació de MariaDB per a l’emmagatzematge de documents, metadades i registres de consultes.  
3. **Programació**:  
* Desenvolupament del backend amb Laravel per gestionar la interacció amb la base de dades i la IA.  
4. **Desplegament d’Aplicacions Web**:  
* Posada en marxa del sistema en un VPS per garantir escalabilitat i disponibilitat.  
5. **Desenvolupament Web en Entorn Client**:  
* Creació de la interfície amb React i Bootstrap per millorar l'experiència d'usuari.  
6. **Desenvolupament Web en Entorn Servidor**:  
* Implementació de l'API REST en Laravel per gestionar les peticions del frontend.  
7. **Disseny d’Interfícies Web**:  
* Creació d'una interfície intuïtiva que facilita la consulta i interacció amb el sistema.  
8. **Empresa i Iniciativa Emprenedora**:  
   * Estudi del potencial de la solució en el mercat i possibles aplicacions en el sector empresarial.

     

     

     

     

     

2. ## **Tipus del Projecte**

   Aquest projecte té un enfocament **tècnic**, ja que proporciona una solució basada en tecnologies d’intel·ligència artificial i desenvolupament web. No es tracta d'un estudi d'una empresa ni de la seua millora, sinó d'una aplicació que ofereix una forma de gestionar i consultar informació documental de manera intel·ligent.

   La solució té aplicacions en **entorns acadèmics, empresarials i tecnològics**, ja que permet millorar la cerca i gestió de grans volums de documentació mitjançant IA.

3. ## **Descripció del projecte**

   **SemantiQ AI** és una aplicació web que permet als usuaris carregar documents en diversos formats per analitzar-los mitjançant **intel·ligència artificial**. El sistema utilitza un model *RAG* (*Retrieval-Augmented Generation*) per millorar la qualitat de les respostes generades, combinant la recuperació d'informació amb la generació de text automàtica.

   El funcionament del projecte es pot dividir en diverses fases:

1. **Pujada de documents:**  
* L’usuari carrega documents a la plataforma, que són emmagatzemats en una base de dades MariaDB.  
2. **Processament de la informació:**  
* Els documents són indexats per facilitar-ne la recuperació i consulta posterior.  
3. **Consulta per part de l’usuari:**  
* L’usuari introdueix preguntes relacionades amb el contingut dels documents carregats.  
4. **Generació de respostes mitjançant IA:**  
* El sistema *RAG* cerca informació rellevant en els documents i genera una resposta contextualitzada amb l'ajuda de **OpenAI**.  
5. **Visualització de la resposta:**  
* La resposta és retornada a l’usuari a través d’una interfície interactiva.  
  Opcionalment, el projecte pot integrar:  
1. **Un sistema d'autenticació (OAuth2)** per restringir l’accés als documents.  
2. **Generació de gràfics i estadístiques** sobre l’ús del sistema i les consultes realitzades.

   Amb aquest enfocament, **SemantiQ AI** facilita la gestió de la informació de manera més eficient i intel·ligent, millorant la productivitat en diferents àmbits.