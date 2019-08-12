export const timeFormat = secs => {
  var seconds = parseInt(secs, 10);
  var days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  var hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  var mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;
  // return `${days} ${days === 1 ? 'day,' : 'days,'}
  //         ${hrs} ${hrs === 1 ? 'hour and' : 'hours and'}
  //         ${mnts} ${mnts === 1 ? 'minute' : 'minutes'}`;
  return `${days}:${hrs}:${mnts}`;
};
