
// verifica se um valor e nulo e retorna template com variacao especificada
// 1 - Nao informado
// 2 - Nao informada
// 3 - Nenhum
// 4 - Nenhuma
// 5 - N/a
export const isNull = (value:any,variantion:number=1) =>{
    
    const condition:boolean = (value === null || value === undefined || value === ''
            || value === 'undefined' || value === 'null');

    const mapVariantios:any = {1:'Não informado',2:'Não informada',3:'Nenhum',4:'Nenhuma',5:'N/A'}        

    return condition ? mapVariantios[variantion] ?? 'Não informado' : value;

}


export const formatDate = (value:string,ing:boolean=false) => {
    const date: Date = new Date(value);
    // formato ing 
    if (ing) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
      }

    // Formato para br
    const formatedDate: string = date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return formatedDate==`Invalid Date`?`Data Invalida`:formatedDate;

}
