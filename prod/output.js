import { createTable } from './utils';
import { getChandasDetails } from './chandas-details';
import { getGanasCount } from './ganas-count';
import { makeChunks } from './utils';

const initOutput = (elements, dependecies) => {

  const { vtranslit } = dependecies;

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

    elements.ganasCount.innerHTML = vt(ganasCount);
    elements.syllablesCount.innerHTML = vt(syllablesCount);

    elements.chandasType.innerHTML = vt(chandasType);
    elements.chandas.innerHTML = vt(chandasName);

    elements.ganas.innerHTML = '';
    elements.ganas.appendChild(createTable(
      [
        ['names', vt(ganas).split(',')],
        ['matras', makeChunks(vt(matras).split(','), 3)],
        ['syllables', makeChunks(vt(syllables).split(','), 3)]
      ]
    ));

    chandasExamples.forEach(example => {

      elements.examples.innerHTML += `<p>${vt(example)}</p>`;

    });

    elements.output.style.display = 'block';

  };

};

export const handleOutput = (elements, dependecies) =>

  (value, ignoreLastLaghu = false) => {

    const { output } = elements;
    const { notify, vc, vtranslit } = dependecies;

    const showOutput = initOutput(elements, dependecies);

    const scheme = vtranslit.find(value);

    const newValue = (scheme === 'Deva') ? (
      vtranslit.init(scheme, 'Itrn')(value)
    ) : (
      value
    );

    const chandasDetails = vc(newValue, ignoreLastLaghu);

    if (chandasDetails.syllables.length) {

      showOutput(chandasDetails);

    } else {

      output.style.display = 'none';

      notify('Please enter proper devanagari character(s) only.');

    }

  };
