export interface IDefinition {
  explanation: string;
  example: string;
}

export interface IDefinitions {
  verb: IDefinition[];
  adverb: IDefinition[];
  adjective: IDefinition[];
  article: IDefinition[];
  noun: IDefinition[];
  pronoun: IDefinition[];
}
