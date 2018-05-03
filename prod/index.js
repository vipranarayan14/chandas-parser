import { handleOutput } from './output';
import { initEventListeners } from './event-listensers';
import { notifier } from './notifier';
import { vChandas } from 'vchandas';
import { vTranslit } from 'vtranslit';
import { vTranslitSchemeDeva } from 'vtranslit-scheme-deva';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';
import './style.css';

const input = document.querySelector('.input-text');
const output = document.querySelector('.output-container');

const outputElements = {

  chandas: output.querySelector('.chandas > p'),
  chandasType: output.querySelector('.chandas-type > p'),
  examples: output.querySelector('.examples > div'),
  ganas: output.querySelector('.ganas > p'),
  ganasCount: output.querySelector('.ganas-count > p'),
  output,
  syllablesCount: output.querySelector('.syllables-count > p'),

};

const outputDependecies = {

  notify: notifier('.alert-box'),
  vc: vChandas(),
  vtranslit: vTranslit([
    vTranslitSchemeDeva,
    vTranslitSchemeItrn
  ]),

};

initEventListeners(input, handleOutput(outputElements, outputDependecies));
