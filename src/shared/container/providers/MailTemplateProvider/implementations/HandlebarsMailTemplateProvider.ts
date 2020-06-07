import handlebars from 'handlebars';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template, variables}: IParseMailTemplateDTO): Promise<string> {
    const parse = handlebars.compile(template);

    return parse(variables);
  }
}

export default HandlebarsMailTemplateProvider;