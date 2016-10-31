# static-database-parser

Características da usabilidade do modulo:

* Receber um arquivo json de uma base convertida, feito em sistema SASS;
* Remodelar  estrutura do aquivo;
* Entregar um novo arquivo json restruturado;

Estrutura inicial
--------------------------------------------------------------------
recruitment_number |  resposta1 | resposta2 | resposta3 | resposta4
-------------------|------------|-----------|-----------|----------
        0577       |   sim      |   não     |  talvez   |  não sabe
        0578       |   não      |   talvez  |    sim    |     2
--------------------------------------------------------------------

Estrutura em Json feita pelo sistema SASS 

```
[
  { "recruitment_number":1577,
    "resposta1": "sim",
    "resposta2": "não",
    "resposta3": "talvez",
    "resposta4": "não sabe"
   },
  {
    "recruitment_number":1578,
    "resposta1": "não",
    "resposta2": "talvez",
    "resposta3": "sim",
    "resposta4": 2
   }
 ]

```
Comando Node que recebe a base sass em json e faz remodelagem em um novo arquivo json 

```node
$ node modelJson.js origin.json result.json
```
* modelJson = comando;
* origin.json = arquivo origem (base SASS);
* result.json = exemplo de saida de dado (pode-se atribuir qualquer nome).

Resultado final

```json
{
    "1577": {
        "resposta1": {
            "valor": "sim"
        },
        "resposta2": {
            "valor": "não"
        },
        "resposta3": {
            "valor": "talvez"
        },
        "resposta4": {
            "valor": "nãosabe"
        }
    },
    "1578": {
        "resposta1": {
            "valor": "não"
        },
        "resposta2": {
            "valor": "talvez"
        },
        "resposta3": {
            "valor": "sim"
        },
        "resposta4": {
            "valor": 2
        }
    }
}

```



 
 
 





