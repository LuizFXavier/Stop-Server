export function gerarID():string{
    let id = Math.floor(Math.random() * 9999);
    
    let codigo = id.toString();

    while(codigo.length < 4){
        codigo = "0" + codigo;
    }

    return codigo;
}