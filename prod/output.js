import { createTable } from './utils';
import { getChandasDetails } from './chandas-details';
import { getGanasCount } from './ganas-count';
import { makeChunks } from './utils';

const initOutput = (ouputElements, outputDependecies) => {

  const {
    chandasTypeOutput,
    chandasOutput,
    examplesOutput,
    ganasCountOutput,
    ganasOutput,
    output,
    syllablesCountOutput
  } = ouputElements;

  const { vtranslit } = outputDependecies;

  const vt = vtranslit.init('Itrn', 'Deva');

  return allDetails => {

    const ganasCount = getGanasCount(allDetails.matras.split(',')).join(',');
    const syllablesCount = allDetails.syllables.split(',').length.toString();

    const ganas = allDetails.ganas.ganas;
    const matras = allDetails.matras;
    const syllables = allDetails.syllables;

    const chandasDetails = getChandasDetails(allDetails);

    const chandasType = chandasDetails.type;
    const chandasName = chandasDetails.name;
    const chandasExamples = chandasDetails.examples;

    ganasCountOutput.innerHTML = vt(ganasCount);
    syllablesCountOutput.innerHTML = vt(syllablesCount);

    chandasTypeOutput.innerHTML = vt(chandasType);
    chandasOutput.innerHTML = vt(chandasName);

    chandasExamples.forEach(example => {

      examplesOutput.innerHTML += `<p>${vt(example)}</p>`;

    });

    ganasOutput.innerHTML = '';
    ganasOutput.appendChild(createTable(
      [
        ['names', vt(ganas).split(',')],
        ['matras', makeChunks(vt(matras).split(','), 3)],
        ['syllables', makeChunks(vt(syllables).split(','), 3)]
      ]
    ));

    output.style.display = 'block';

  };

};

export const handleOutput = (ouputElements, outputDependecies) => (value, ignoreLastLaghu = false) => {

  const { output } = ouputElements;
  const { notify, vc, vtranslit } = outputDependecies;

  const showOutput = initOutput(ouputElements, outputDependecies);

  const scheme = vtranslit.find(value);

  const newValue = (scheme === 'Deva') ? vtranslit.init(scheme, 'Itrn')(value) : value;

  const chandasDetails = vc(newValue, ignoreLastLaghu);

  if (chandasDetails.syllables.length) {

    showOutput(chandasDetails);

  } else {

    output.style.display = 'none';
    notify('Please enter proper devanagari character(s) only.');

  }

};
