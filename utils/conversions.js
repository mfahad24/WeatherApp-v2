export const convertDate = (currentDate) => {
  let dateWithoutDashes = currentDate?.split("-");
  let dateInTextForm = new Date(dateWithoutDashes);
  return dateInTextForm.toString().slice(0, 10);
};

export const convertTime = (currentTime) => {
  if (currentTime.slice(0, 2) < 12) {
    if (currentTime.slice(0, 2) === "00") {
      return "12 AM";
    }
    return currentTime.slice(1, 2) + " AM";
  } else if (currentTime.slice(0, 2) >= 12) {
    if (currentTime.slice(0, 2) === "12") {
      return "12 PM";
    }
    return currentTime.slice(0, 2) - 12 + " PM";
  }
};