import fs from 'fs';
import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebardMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate) {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    }); // Vai ler uma formatação de html
    const parseTemplate = handlebars.compile(templateFile);
    return parseTemplate(variables);
  }
}
