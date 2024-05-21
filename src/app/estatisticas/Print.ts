import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export async function generatePdf() {
  const data = [['Name', 'Email', 'Country'],
    ['John Doe', 'johndoe@example.com', 'USA'],
    ['Jane Smith', 'janesmith@example.com', 'Canada'],
    ['Bob Johnson', 'bobjohnson@example.com', 'UK']
  ];

  const docDefinition: any = {
    info: {
      title: 'Relatorio',
      author: 'GPRO',
      subject: 'Relatorio de Atendimentos',
      keywords: 'Atendimento,relatorio',
    },
    content: [
      { text: 'User Data', style: 'header' },
      { table: { body: data } }
    ],
    styles: {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
    }
  };

  pdfMake.createPdf(docDefinition).open();
}
