function ChandasParser() {
  
  this.analyse = splitSyllables;
  this.init = prepareAllChandas;
  this.getChandas = getChandas;
  this.getGanas = getGanas;
  this.getMatras = getMatras;
  this.result = () => result;
  
  let result = {};
  
  const Ganas = [
    {
      name: "Ma",
      pattern: ['G','G','G']
    },
    {
      name: "Na",
      pattern: ['L','L','L']
    },
    {
      name: "Bha",
      pattern: ['G','L','L']
    },
    {
      name: "Ya",
      pattern: ['L','G','G']
    },
    {
      name: "Ja",
      pattern: ['L','G','L']
    },
    {
      name: "Ra",
      pattern: ['G','L','G']
    },
    {
      name: "Sa",
      pattern: ['L','L','G']
    },
    {
      name: "Ta",
      pattern: ['G','G','L']
    },
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
  
   Array.prototype.equals = function(array) {
   
    if (!array) return false;
    
    if (this.length !== array.length) return false;
    
    for (var i = 0, l = this.length; i < l; i++) {
    
      if (this[i] instanceof Array && array[i] instanceof Array) {
      
        if (!this[i].equals(array[i])) return false;
        
      } else if (this[i] !== array[i]) return false;
    }
    return true;
  }
  
  function getChandas() {
    
    const ganasArr = result.ganas.matrasGroups;
    
    for (let i = 0, l = Chandas.length; i < l; i++) {
      
      if(ganasArr.equals(Chandas[i].matrasGroups)) {
        
        result.chandas = Chandas[i].name;
        
        break;
      } else result.chandas = 'Chandas not found.';
    }
    
    return this;
  }
  
  function getGanas() {
  
    let o = {names: [], matrasGroups: []};
      
    const res = [...result.matras];
    
    while (res.length) o.matrasGroups.push(res.splice(0,3));
    
    for (let i = 0, l = o.matrasGroups.length; i < l; i++) {
    
      for(let j = 0, ll = Ganas.length; j < ll; j++) {
      
        if(o.matrasGroups[i].equals(Ganas[j].pattern)) {
        
          o.names.push(Ganas[j].name)
        }
      }
    }
    
    result.ganas = o;
    
    return this;
  }
  
  function getMatra(chars) {

    let matra;
    
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
      
        matra = -1;
      } else if (longVowels.indexOf(c) !== -1) {
      
        matra = 2;
      } else if (shortVowels.indexOf(c) !== -1) {
      
        matra = 1;
      } else { 
      
        matra = 0;
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
    
      const res = cp.analyse(Chandas[i].lakshana)
                    .getMatras()
                    .getGanas()
                    .result();
      
      Chandas[i].matrasGroups = res.ganas.matrasGroups;
    }
    
    return this;
  }
  
  function refineMatrasArr(w) {
  
    w = w.filter(n => n !== 0); //Remove NonDevChars
    
    /*
    Reverse-looping the array so that a Samyukta 
    Akshara make a previous Akshara 2 Matra.
    */
    for (let i = w.length; i-- > 0;) { 
    
      if (w[i] === -1) {
      
        if(w[i-1] === 1) {
        
          w[i-1] = 2;
        }
        
        w[i] = '_';
      }
    }
    
    w = w.filter(n => n != '_');
    
    return w;
  }
  
  function splitSyllables(str) {

    const letters = [].concat(syllables.vowels.long.chars)
                      .concat(syllables.vowels.short.chars)
                      .concat(syllables.consonants),
                      
          marks = [].concat(syllables.vowels.long.marks)
                    .concat(syllables.vowels.short.marks)
                    .concat(syllables.virama);
                    
    let w = [];
                      
    for (let i=0, l = str.length; i < l; i++) {
    
      const c = str[i];
      
      if (c === ' ') {
      
        w.push('_');      
      } else if (letters.indexOf(c) !== -1) {
      
        w.push(c);
      } else if (marks.indexOf(c) !== -1) {
      
        w.push('_');
        
        //If there are 2 vowel marks
        if (w[i-1] === '_') { w[i-2] += c; } else { w[i-1] += c; }
        
      } else {
      
        w.push(c);
      }
    }
    
    w = w.filter(n => n != '_');
    
    result.syllables = w;
    
    return this;
  }
}
