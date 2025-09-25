/**
 * Filter exercises based on from, to, and limit parameters.
 */
const filterExercises = (from, to, limit, exercises) => {
  let filteredExercises = [...exercises];
  if (from) {
    const fromDate = new Date(from);
    filteredExercises = filteredExercises.filter(
      (ex) => new Date(ex.date) >= fromDate
    );
  }

  if (to) {
    const toDate = new Date(to);
    filteredExercises = filteredExercises.filter(
      (ex) => new Date(ex.date) <= toDate
    );
  }

  if (limit) {
    filteredExercises = filteredExercises.slice(0, limit);
  }

  return filteredExercises;
};

export { filterExercises };
