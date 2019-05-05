export class BaseLang {
  static pluralize(str: string, count: number): string {
    let selection = '';
    const choices = str.substring(str.lastIndexOf('{') + 1, str.lastIndexOf('}'));
    const currentChoice = choices.split('|');
    currentChoice.forEach(choice => {
      const value = parseFloat(choice);
      selection =
        choice.indexOf('#') >= 0
          ? value === count
            ? choice.replace('(0)', count.toString()).split('#')[1]
            : selection
          : value < count
            ? choice.replace('(0)', count.toString()).split('<')[1]
            : selection;
    });
    return str.replace('{0}', count.toString()).replace(['{', choices, '}'].join(''), selection);
  }

  static interpolate(...args: any[]): string {
    let str = args[0];
    if (args && Object.keys(args).length > 0) {
      for (let i = 0; i <= args.length; i++) {
        str = str.split('{' + i + '}').join(args[i + 1]);
      }
    }
    return str;
  }
}
