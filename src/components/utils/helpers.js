// Helper to create an empty day object
export function createEmptyDay(n) {
    return { dayNumber: n, title: `Day ${n}`, city: '', date: '', activities: { morning: '', afternoon: '', evening: '' }, transport: '' };
  }