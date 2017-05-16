function ChandasParser() {
  
  this.init = prepareAllChandas;
  this.getSyllables = getSyllables;
  this.getChandas = getChandas;
  this.getGanas = getGanas;
  this.getMatras = getMatras;
  this.result = () => result;
  
  let result = {};
  
  const Ganas = [
    {
      name: 'Ma',
      pattern: 'G,G,G'
    },
    {
      name: 'Na',
      pattern: 'L,L,L'
    },
    {
      name: 'Bha',
      pattern: 'G,L,L'
    },
    {
      name: 'Ya',
      pattern: 'L,G,G'
    },
    {
      name: 'Ja',
      pattern: 'L,G,L'
    },
    {
      name: 'Ra',
      pattern: 'G,L,G'
    },
    {
      name: 'Sa',
      pattern: 'L,L,G'
    },
    {
      name: 'Ta',
      pattern: 'G,G,L'
    }
  ];
  
  const syllables = {
    vowels: {
      long: {
        chars: 'आ ई ऊ ॠ ए ऐ ओ औ'.split(' '),
        marks: 'ा ी ू ॄ े ै ो ौ ं ः'.split(' ')
      },
      short: {
        chars: 'अ इ उ ऋ ऌ'.split(' '),
        marks: 'ि ु ृ ॢ'.split(' ')
      }
    },
    consonants: 'क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह ळ'.split(' '),
    virama: '्'
  };
  
  function getChandas() {
    
    const ganasArr = result.ganas.matrasGroups.join('');
    
    for (let i = 0, l = Chandas.length; i < l; i++) {
      
      if(ganasArr === (Chandas[i].matrasGroups)) {
        
        result.chandas = Chandas[i].name;
        
        break;
      } else result.chandas = 'Chandas not found.';
    }
    
    return this;
  }
  
  function getGanas(ignoreLastLaghu = false) {
  
    let o = {names: [], matrasGroups: [], syllablesGroups: []};
      
    const matras = [...result.matras];
    const syllables = [...result.syllables];
    
    if (ignoreLastLaghu) matras[matras.length - 1] = 'G';
    
    while (syllables.length) o.syllablesGroups.push((syllables.splice(0,3)).join(','));
    while (matras.length) o.matrasGroups.push((matras.splice(0,3)).join(','));
    
    for (let i = 0, l = o.matrasGroups.length; i < l; i++) {
    
      for(let j = 0, ll = Ganas.length; j < ll; j++) {
      
        if(o.matrasGroups[i] === Ganas[j].pattern) {
        
          o.names.push(Ganas[j].name);
          
          break;
        }
      }
    }
    
    result.ganas = o;
    
    return this;
  }
  
  function getMatra(chars) {

    let matra = [];
    
    const vowels = syllables.vowels,
    
          longVowels = [].concat(vowels.long.chars)
                         .concat(vowels.long.marks),
                         
          shortVowels = [].concat(vowels.short.chars)
                          .concat(vowels.short.marks)
                          .concat(syllables.consonants),
                          
          virama = syllables.virama;
                          
    for (let i = 0, l = chars.length; i < l; i++) {
       
      const c = chars[i];
      
      if (virama.indexOf(c) !== -1) { 
        
        matra.push(-1);
      } else if (longVowels.indexOf(c) !== -1) {
      
        matra.push(2);
      } else if (shortVowels.indexOf(c) !== -1) {
      
        matra.push(1);
      } else { 
      
        matra.push(0);
      }
    }
      
    return matra;
  }
  
  function getMatras(as_LG = true) {
  
    const sylArr = result.syllables;

    let w = [];
    
    for(let i = 0, l = sylArr.length; i < l; i++) {
    
      w.push(getMatra(sylArr[i]));
    }
    
    w = refineMatrasArr(w);
    
    w = (as_LG) ? makeLaghuGuru(w) : w;
    
    result.matras = w;
    
    return this;
  }
  
  function getSyllables(str) {
    
    result.syllables = splitSyllables(str);
    
    return this;
  }
  
  function makeLaghuGuru(w) {
  
    return w.map(function(x) {
    
      if(x === 1) return 'L';
      
      else if (x === 2) return 'G';
      
      else return x;
    });
  }
  
  function prepareAllChandas() {
    
    const cp = new ChandasParser();
    
    for (let i = 0, l = Chandas.length; i < l; i++) {
    
      const res = cp.getSyllables(Chandas[i].lakshana)
                    .getMatras()
                    .getGanas()
                    .result();
      
      Chandas[i].matrasGroups = res.ganas.matrasGroups.join('');
    }
    
    return this;
  }
  
  function refineMatrasArr(w) {
  
    const l = w.length;
  
    function makePrevMatraGuru(i) {
    
      const j = w[i].indexOf(-1);
    
      if (j !== -1 && j < l) w[i-1] = 2;
    }
  
    for (let i = 0; i < l; i++) {
      
      if(w[i].indexOf(2) !== -1) {
      
        makePrevMatraGuru(i);
        
        w[i] = 2;
        
      } else if (w[i].indexOf(1) !== -1) {
      
        makePrevMatraGuru(i);
        
        w[i] = 1;
        
      } else w[i] = 0;
    }
    
    return w;
  }
  
  function splitSyllables(str) {

    const letters = [].concat(syllables.vowels.long.chars)
                      .concat(syllables.vowels.short.chars)
                      .concat(syllables.consonants),
                      
          marks = [].concat(syllables.vowels.long.marks)
                    .concat(syllables.vowels.short.marks),
                    
          virama = syllables.virama;
                    
    let w = [];
    
    /* Join marks with chars */   
    for (let i = 0, l = str.length; i < l; i++) {
    
      const c = str[i];
      
      if (c === ' ') {
      
        w.push('_');      
      } else if (letters.indexOf(c) !== -1) {
      
        w.push(c);
      } else if (marks.indexOf(c) !== -1 || virama.indexOf(c) !== -1) {
      
        w.push('_');
        
        //If there are 2 vowel marks
        if (w[i-1] === '_') { w[i-2] += c; } else { w[i-1] += c; }
        
      } else {
      
        w.push('_');
      }
    }
    w = w.filter(n => n != '_');
    
    /* Combine chars with virama to form Samyukta Akshara*/
    w.forEach((d, i, w) => {
        
      if (virama.indexOf(d[d.length-1]) !== -1) {
      
        if (i === w.length - 1) {
        
          w[i] = (w[i] === 'म्') ? 'ं' : w[i];
          
          if ((i - 1) > -1) w[i-1] += w[i];
          
        } else w[i+1] = w[i] + w[i+1];
          
        w[i] = '_';
      }
    });

    w = w.filter(n => n != '_');
    
    return w;
  }
}
