export const getChandasDetails = allDetails => {

  const chandasDetails = allDetails.chandas;

  return (chandasDetails) ? (
    chandasDetails
  ) : ({
    examples: ['-'],
    name: 'nOpalabdhaH',
    type: '-'
  });

};

export const getCaesura = chandasDetails =>

  (chandasDetails.caesura) ? chandasDetails.caesura : '-';
