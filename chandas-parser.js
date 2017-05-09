function ChandasParser() {
  
  this.getMatras = (str) => getMatras(splitSyllables(str));
  
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
    };
      
    return matra;
  };
  
  function getMatras(sylArr, as_LG = true) {

    let w = [];
    
    for(let i = 0, l = sylArr.length; i < l; i++) {
    
      w.push(getMatra(sylArr[i]));
    }
     
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
      
      if (w[i] === 0) {
      
        alert('Given string contains non-devanagri letter(s) like: "' + sylArr[i] + '"'
              + '\nThis may hinder parsing chandas.');
      }
    }
    
    w = w.filter(n => n != '_');
    
    w = (as_LG) ? makeLaghuGuru(w) : w;
    
    return w;
  };
  
  function makeLaghuGuru(matrasArr) {
  
      return matrasArr.map(function(x) {
      
        if(x === 1) {
        
          return 'L';
        } else if (x === 2) {
          
          return 'G';
        } else return x;
      });
  };
  
  function splitSyllables (chars) {

    const letters = [].concat(syllables.vowels.long.chars)
                      .concat(syllables.vowels.short.chars)
                      .concat(syllables.consonants),
                      
          marks = [].concat(syllables.vowels.long.marks)
                    .concat(syllables.vowels.short.marks)
                    .concat(syllables.virama);
                    
    let w = [];
                      
    for (let i=0, l = chars.length; i < l; i++) {
    
      const c = chars[i];
      
      if (c === ' ') {
      
        w.push('_');      
      } else if (letters.indexOf(c) !== -1) {
      
        w.push(c);
      } else if (marks.indexOf(c) !== -1) {
      
        w.push('_');
        
        //If there are 2 vowel marks
        (w[i-1] === '_') ? w[i-2] += c : w[i-1] += c;
        
      } else {
      
        w.push(c)
      }
    }
    
    w = w.filter(n => n != '_');
    
    return w;
  };   
}
