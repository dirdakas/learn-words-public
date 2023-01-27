import { ITranslations } from './translations.model';
import { IDefinitions } from './definitions.model';

export interface IWordDetails {
  id: string;
  definitions: IDefinitions;
  translations: ITranslations;
}
