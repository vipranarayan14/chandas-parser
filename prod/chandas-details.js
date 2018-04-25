export const getChandasDetails = allDetails => {

  const chandasDetails = allDetails.chandas;

  return (chandasDetails) ? (
    chandasDetails
  ) : ({ name: 'Chandas na upalabdhaH', type: '-' });

};
