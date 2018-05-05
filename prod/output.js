import { getCaesura, getChandasDetails } from './chandas-details';
import { getGanasCount } from './ganas-count';

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
    const caesura = getCaesura(chandasDetails);

    const ganasRow = elements.ganas.querySelector('.ganas.row-data');
    const matrasRow = elements.ganas.querySelector('.matras.row-data');
    const syllablesRow = elements.ganas.querySelector('.syllables.row-data');

    elements.ganasCount.innerHTML = vt(ganasCount);
    elements.syllablesCount.innerHTML = vt(syllablesCount);
    elements.caesura.innerHTML = vt(caesura);

    elements.chandasClass.innerHTML = vt(chandasType);
    elements.chandasName.innerHTML = vt(chandasName);

    ganasRow.innerHTML = '';
    vt(ganas).split(',').forEach(gana => {

      ganasRow.innerHTML += `<td class="ganas cell" colspan="3">${(gana) ? gana: '-'}</td>`;

    });

    matrasRow.innerHTML = '';
    vt(matras).split(',').forEach(matra => {

      matrasRow.innerHTML += `<td class="matras cell">${matra}</td>`;

    });

    syllablesRow.innerHTML = '';
    vt(syllables).split(',').forEach(syllable => {

      syllablesRow.innerHTML += `<td class="matras cell">${syllable}</td>`;

    });

    elements.examples.innerHTML = '';
    chandasExamples.forEach(example => {

      const exampleWithNewlineMarker = example.replace(/\|/, '| /');

      elements.examples.innerHTML +=
        `<p class="example">${vt(exampleWithNewlineMarker).replace(/\//, '<br>')}</p>`;

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
