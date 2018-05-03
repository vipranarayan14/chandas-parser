export const getChandasDetails = allDetails => {

  const chandasDetails = allDetails.chandas;

  return (chandasDetails) ? (
    chandasDetails
  ) : ({
    examples: ['-'],
    name: 'Chandas na upalabdhaH',
    type: '-'
  });

};
