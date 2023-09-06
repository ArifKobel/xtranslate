import { extractIdsFromXliff } from './file';

export const arrayToXlf = (sourceArray: string[], targetArray: string[]): string => {
  const ids = extractIdsFromXliff().map((id: string, index: number) => {
    return {
      id,
      source: sourceArray[index],
      target: targetArray[index],
    };
  });
  let translationUnits = '';
  ids.forEach((id) => {
    translationUnits += `
        <trans-unit id="${id.id}">
          <source>${id.source}</source>
          <target>${id.target}</target>
        </trans-unit>`;
  });
  const xliff = `<?xml version="1.0" encoding="UTF-8"?>
<xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">
    <file source-language="en" datatype="plaintext" original="ng2.template">
      <body>${translationUnits}
      </body>
    </file>
</xliff>`;
  return xliff;
};
