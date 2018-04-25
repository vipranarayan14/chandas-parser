export const getGanasCount = matras => {

  const ganasCount = Math.floor(matras.length / 3);
  const matrasCount = matras.length % 3;

  return [
    ganasCount,
    matrasCount
  ];

};
