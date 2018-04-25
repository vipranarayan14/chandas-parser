import { handleOutput } from './output';
import { initEventListeners } from './event-listensers';
import { notifier } from './notifier';
import { vChandas } from 'vchandas';
import { vTranslit } from 'vtranslit';
import './style.css';

const input = document.querySelector('.input-text');
const output = document.querySelector('.output-container');

const ouputElements = {

  chandasOutput: output.querySelector('.chandas > p'),
  chandasTypeOutput: output.querySelector('.chandas-type > p'),
  ganasCountOutput: output.querySelector('.ganas-count > p'),
  ganasOutput: output.querySelector('.ganas > p'),
  output,
  syllablesCountOutput: output.querySelector('.syllables-count > p'),

};

const outputDependecies = {

  notify: notifier('.alert-box'),
  vc: vChandas(),
  vt: vTranslit.init('Itrn', 'Deva'),

};

initEventListeners(input, handleOutput(ouputElements, outputDependecies));
