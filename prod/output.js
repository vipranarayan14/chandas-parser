import { createTable } from './utils';
import { getChandasDetails } from './chandas-details';
import { getGanasCount } from './ganas-count';
import { makeChunks } from './utils';

const initOutput = (ouputElements, outputDependecies) => {

  const {
    ganasCountOutput,
    syllablesCountOutput,
    chandasTypeOutput,
    chandasOutput,
    ganasOutput,
    output
  } = ouputElements;

  const { vtranslit } = outputDependecies;

  const vt = vtranslit.init('Itrn', 'Deva');

  return allDetails => {

    const chandasDetails = getChandasDetails(allDetails);

    ganasCountOutput.innerHTML = vt(getGanasCount(allDetails.matras.split(',')).join(','));
    syllablesCountOutput.innerHTML = vt(allDetails.syllables.length.toString());

    chandasTypeOutput.innerHTML = vt(chandasDetails.type);
    chandasOutput.innerHTML = vt(chandasDetails.name);

    ganasOutput.innerHTML = '';
    ganasOutput.appendChild(createTable(
      [
        ['names', vt(allDetails.ganas.ganas).split(',')],
        ['matras', makeChunks(vt(allDetails.matras).split(','), 3)],
        ['syllables', makeChunks(vt(allDetails.syllables).split(','), 3)]
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
