# JSON global para el control de cobranza 
## `aún en implementacion 2/5/2024`

## Payment-Report 90%
## Group-payment-Report 90%
{
    "transaccion":"",
    "freporte":"",
    "casegurado":"",
    "mpago":"",
    "mpagoext":"",
    "ptasamon":"",
    "cprog":"",
    "ifuente":"",
    "iestado":"",
    "cusuario":"",
    "positiveBalance": false,
    "diference": false,
    "reciboConDiferencia":{          //objet Admin
        "mdiferencia":"",
        "mdiferenciaext":"",
        "xobservacion":"",
        "casegurado":"",
        "fingreso":"",
        "iestado":"",
        "crecibo":"",
        "freporte":"",
        "idiferencia":"",
        "cmoneda":""
    },
    "balancePositivo":{          //objet Admin
        "cmoneda_dif":"",
        "msaldodif":"",
        "idiferencia":""
    },
    "recibo":[
        {
            "cnpoliza": "",
            "cnrecibo": "",
            "crecibo": "",
            "cpoliza": "",
            "fanopol": "",
            "fmespol": ""  ,
            "cramo": "",
            "cmoneda": "",
            "fdesde_pol": "",
            "fhasta_pol": "",
            "fdesde_rec": "",
            "fhasta_rec": "",
            "mprimabruta": ""  ,
            "mprimabrutaext": "",
            "cproductor": "",
            "cuotas": "",
            "asegurado": ""
        }
    ],
    "soporte":[
        {
       "npago" : "",
       "cmoneda" : "",
       "cbanco" : "",
       "cbanco_destino" : "",
       "ctipopago" : "",
       "mpago" : "",
       "mpagoext" : "",
       "mpagoigtf" : "",
       "mpagoigtfext" : "",
       "mtotal" : "",
       "mtotalext" : "",
       "ptasaref" : "",
       "xreferencia" : "",
       "ximage" : ""
        }
    ]
    
}