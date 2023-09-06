import fs from 'fs';
import { XMLParser } from 'fast-xml-parser';
const parser = new XMLParser();
const args = process.argv.slice(2);
const fileName = args[0].replaceAll('/', '').replaceAll('\\', '');
export const file = process.cwd() + '/' + fileName;
export const fileContent = fs.readFileSync(file, 'utf8');
export const jsonFileContent = parser.parse(fileContent).xliff.file.body['trans-unit'].map((unit: { source: any }) => {
  return unit.source;
});

export const extractIdsFromXliff = (): string[] => {
  const regex = /id="([^"]+)"/g;
  const ids: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(fileContent)) !== null) {
    ids.push(match[1]);
  }

  return ids;
};

export const writeFile = (content: string, language: string) => {
  const newFile = process.cwd() + '/' + `${language}.${fileName}`;

  fs.writeFile(newFile, content, function (err) {
    if (err) return console.log(err);
  });
};
