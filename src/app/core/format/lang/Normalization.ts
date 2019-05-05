export class Normalization {
  // Normalization Form Canonical Decomposition
  static normalForm(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
