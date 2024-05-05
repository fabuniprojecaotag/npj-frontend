import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export async function generatePdf(headers:any,data:any,pageName:any) {
    console.log(headers)
    function buildTableBody(data:any, columns:any) {
        var body = [];
    
        // Map column titles to an array of objects containing text and style
        var columnHeaders = columns.map((column:any) => ({
            text: column.title,
            style: 'header'
        }));
        body.push(columnHeaders); // Push the column headers to the body array
    
        data.forEach(function(row:any) {
            var dataRow:any = [];
    
            // Iterate over each column
            columns.forEach(function(column:any) {
                // Split column.col by dots to access nested properties
                var nestedProps = column.col.split('.');
                var value = row;
                nestedProps.forEach((prop:any) => {
                    value = value[prop];
                });
    
                if (column.format) {
                    // If a format is specified for the column, apply the formatting function
                    dataRow.push(getCurrentFormat(column.format)(value));
                } else {
                    // Otherwise, convert the cell value to a string
                    dataRow.push(value.toString());
                }
            })
    
            body.push(dataRow); // Push the row data to the body array
        });
    
        return body; // Return the generated table body
    }
    
    function table(data:any, columns:any) {
        return {
            table: {
                widths:Array(columns.length).fill('*'), 
                headerRows: 1,
                body: buildTableBody(data, columns)
            }
        };
    }
    
  
    const docDefinition:any = {
        info: {
            title: 'Relatorio '+pageName,
            author: 'GPRO',
            subject: 'Relatorio de '+pageName,
            keywords: 'relatorio,'+pageName,
          },
          pageMargins: [ 10, 20, 10, 20 ],
      content: [
        {
            table: {
                widths:["*","*","*"],
                body:[
                    [
                        {text:'Relatório de '+pageName,colSpan:3,border:[1,1,1,0],margin:[10,10,10,10],style:'header'},
                        '',
                        ''
                    ]
                ]
            }
        },
        table(data, headers),
        {
            table: {
                widths:["*","*","*"],
                body:[
                    [
                        {text:`Quantidade de registros: `+data.length,colSpan:2,border:[1,0,1,1],},
                        '',
                        {text:`Data de emissão:${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,border:[1,0,1,1],},

                    ]
                ]
            }
        },
       
      ],
      styles: {
        header: { fontSize: 14, bold: true,alignment : 'center',fillColor: '#dedede'}
      }
    };
  
    pdfMake.createPdf(docDefinition).open();
  }

  function getCurrentFormat(format:string){

    const formatList:any = {
        'formatDate':formatDate
    }

    return formatList[format] ;
  }

  function formatDate(dateString:string) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return 'Data inválida';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
