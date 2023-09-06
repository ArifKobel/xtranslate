import dotenv from 'dotenv';
import cliSelect from 'cli-select';
import languages from '../languages.json';
import { ILanguage, ISelectedLanguage } from './interfaces/languaes';
import { createLoading, stopLoading } from './utils/loading';
import { translateArray } from './utils/openai';
import { jsonFileContent, writeFile } from './utils/file';
import { arrayToXlf } from './utils/arrayToXlf';
dotenv.config();

cliSelect(
  {
    values: languages.map((language: ILanguage) => language.name),
  },
  (language: any) => {
    const targetLanguage = languages[language.id];
    const id = createLoading();
    translateArray(jsonFileContent, targetLanguage.name).then((translatedArray) => {
      const xliff = arrayToXlf(jsonFileContent, translatedArray);
      writeFile(xliff, targetLanguage.value);
      stopLoading(id);
    });
  },
);
