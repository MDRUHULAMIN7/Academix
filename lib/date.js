export const formatMyDate = date => {
    let options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    return formattedDate;
  }

  export const formatDuration = (duration) => {
    if(!duration) {
      return null;
    }

    var hour = Math.floor(duration / 3600);
    var minute = Math.floor((duration % 3600) / 60);
    var second = duration % 60;

    const durationString = `${hour}:${minute}:${second}`;
  console.log(durationString);
    return durationString;
  }