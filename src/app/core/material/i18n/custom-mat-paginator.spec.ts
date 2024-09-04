import { TestBed } from '@angular/core/testing';
import { CustomMatPaginatorIntl } from './custom-mat-paginator';

describe(CustomMatPaginatorIntl.name, () => {
  let paginatorIntl: CustomMatPaginatorIntl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomMatPaginatorIntl]
    });

    paginatorIntl = TestBed.inject(CustomMatPaginatorIntl);
  });

  it('should override itemsPerPageLabel', () => {
    expect(paginatorIntl.itemsPerPageLabel).toBe('Itens por página');
  });

  it('should override getRangeLabel', () => {
    // Teste para length 0
    expect(paginatorIntl.getRangeLabel(0, 10, 0)).toBe('0 de 0');

    // Teste para length > 0
    expect(paginatorIntl.getRangeLabel(0, 10, 25)).toBe('1 - 10 de 25');
    expect(paginatorIntl.getRangeLabel(1, 10, 25)).toBe('11 - 20 de 25');
    expect(paginatorIntl.getRangeLabel(2, 10, 25)).toBe('21 - 25 de 25');
  });

  it('should correctly handle when startIndex is greater than or equal to length', () => {
    // Teste para startIndex >= length
    expect(paginatorIntl.getRangeLabel(3, 10, 25)).toBe('31 - 35 de 25');
    expect(paginatorIntl.getRangeLabel(4, 10, 35)).toBe('41 - 45 de 35');
  });
});
