export function generateBlessing(data: any) {
  const { mood, discipline, action, distraction, spiritual, business } = data;

  let score =
    discipline * 2 +
    action * 2 +
    spiritual +
    business -
    distraction +
    mood;

  let type = "peace";
  let message = "";

  if (score >= 18) {
    type = "power";
    message =
      "Tum transformation phase me ho. Aaj ke actions tumhari life ko next level le ja sakte hain.";
  } else if (score >= 14) {
    type = "growth";
    message =
      "Tumhari mehnat sahi direction me ja rahi hai. Consistency rakho, result pakka hai.";
  } else if (score >= 10) {
    type = "peace";
    message =
      "Aaj thoda balance aur clarity par focus karo. Stability growth ka base hoti hai.";
  } else {
    type = "warning";
    message =
      "Tumhari energy bikhar rahi hai. Focus wapas lao, warna delay ho sakta hai.";
  }

  return {
    score,
    type,
    message,
  };
}
