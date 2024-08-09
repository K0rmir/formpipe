/**
 * Middleware that delays the response by a random amount of time between minDelay and maxDelay
 */
module.exports = (req, res, next) => {
  // Generate a random delay between min and max (milliseconds)
  const minDelay = 300; // Minimum delay in milliseconds
  const maxDelay = 2000; // Maximum delay in milliseconds
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

  console.log(`Delaying response by ${delay} milliseconds`);

  setTimeout(next, delay);
};
