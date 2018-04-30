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

const ouputElements = {

  chandasOutput: output.querySelector('.chandas > p'),
  chandasTypeOutput: output.querySelector('.chandas-type > p'),
  examplesOutput: output.querySelector('.examples > div'),
  ganasCountOutput: output.querySelector('.ganas-count > p'),
  ganasOutput: output.querySelector('.ganas > p'),
  output,
  syllablesCountOutput: output.querySelector('.syllables-count > p'),

};

const outputDependecies = {

  notify: notifier('.alert-box'),
  vc: vChandas(),
  vtranslit: vTranslit([
    vTranslitSchemeDeva,
    vTranslitSchemeItrn
  ]),

};

initEventListeners(input, handleOutput(ouputElements, outputDependecies));
