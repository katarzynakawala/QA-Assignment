// Simple test data for E2E tests

export const testData = {
  // Single result scenarios for simple tests
  singleResult: {
    people: {
      query: 'Luke',
      expectedResult: 'Luke Skywalker'
    }
  },
  // returning multiple results
  partialMatching: {
    people: {
      query: 'lu',
      expectedMultiple: ['Luke Skywalker', 'Luminara Unduli'] 
    },
    planets: {
      query: 'ala', 
      expectedMultiple: ['Mon Cala', 'Malastare', 'Champala'] 
    }
  }
};
