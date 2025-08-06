export function getGradientByTime() {
  const hour = new Date().getHours();

  if (hour >= 4 && hour < 9) {
    return ['#ffeabf', '#d1f7ff']; // Morning Rise
  } else if (hour >= 9 && hour < 17) {
    return ['#fff2b2', '#c8f2dc']; // Daylight Calm
  } else if (hour >= 17 && hour < 21) {
    return ['#ffc9c9', '#ffd1f7']; // Sunset Glow
  } else {
    return ['#1a1a2e', '#3a3a5d']; // Starlight Fade
  }
}
