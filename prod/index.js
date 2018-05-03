import { handleOutput } from './output';
import { initEventListeners } from './event-listensers';
import { notifier } from './notifier';
import { vChandas } from 'vchandas';
import { vTranslit } from 'vtranslit';
import { vTranslitSchemeDeva } from 'vtranslit-scheme-deva';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';
import './styles/index.less';

const searchForm = document.querySelector('.vchandas-search.form');
const searchInput = searchForm.querySelector('.input.field.search');
const ignoreLastLaghuInput = searchForm.querySelector('input.field.ignore-last-laghu');

const output = document.querySelector('.vchandas-result');

const options = {

  ignoreLastLaghu: ignoreLastLaghuInput.checked

};

const elements = {

  chandasClass: output.querySelector('.result.item.chandas.class > p'),
  chandasName: output.querySelector('.result.item.chandas.name > p'),
  examples: output.querySelector('.result.container.examples > p'),
  ganas: output.querySelector('.result.container.ganas-matras-syllables'),
  ganasCount: output.querySelector('.result.item.ganas.ganas-count > p'),
  output,
  syllablesCount: output.querySelector('.result.item.ganas.syllables-count > p'),

};

const dependencies = {

  notify: notifier('.alert-box'),
  vc: vChandas(),
  vtranslit: vTranslit([
    vTranslitSchemeDeva,
    vTranslitSchemeItrn
  ]),

};

initEventListeners(searchInput, options, handleOutput(elements, dependencies));
