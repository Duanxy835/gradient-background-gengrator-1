import { getRecommendedColorCombinations, getBestGradientColors } from './colorRecommender';

// Test hex to HSL conversion (internal function)
function testHexToHsl() {
  // This is a helper function to test the internal hexToHsl function
  // Since it's not exported, we'll test it indirectly through the public functions
  console.log('Testing hex to HSL conversion...');
  
  const testColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  testColors.forEach(color => {
    const combinations = getRecommendedColorCombinations(color);
    console.log(`Base color: ${color}`);
    console.log(`Complementary: ${combinations.complementary}`);
    console.log(`Analogous: ${combinations.analogous}`);
    console.log(`Triadic: ${combinations.triadic}`);
    console.log('---');
  });
}

// Test getRecommendedColorCombinations function
function testRecommendedColorCombinations() {
  console.log('Testing getRecommendedColorCombinations function...');
  
  const baseColor = '#5135FF';
  const combinations = getRecommendedColorCombinations(baseColor);
  
  console.log(`Base color: ${baseColor}`);
  console.log(`Complementary: ${combinations.complementary}`);
  console.log(`Analogous: ${combinations.analogous}`);
  console.log(`Triadic: ${combinations.triadic}`);
  console.log(`Split Complementary: ${combinations.splitComplementary}`);
  console.log(`Tetradic: ${combinations.tetradic}`);
  console.log(`Monochromatic: ${combinations.monochromatic}`);
  console.log('---');
}

// Test getBestGradientColors function
function testBestGradientColors() {
  console.log('Testing getBestGradientColors function...');
  
  const baseColor = '#5135FF';
  
  const twoColors = getBestGradientColors(baseColor, 2);
  console.log(`Best 2 colors: ${twoColors}`);
  
  const threeColors = getBestGradientColors(baseColor, 3);
  console.log(`Best 3 colors: ${threeColors}`);
  
  const fourColors = getBestGradientColors(baseColor, 4);
  console.log(`Best 4 colors: ${fourColors}`);
  console.log('---');
}

// Test color mode switching
function testColorModeSwitching() {
  console.log('Testing color mode switching...');
  
  // Test free mode (just verify colors array can be modified)
  let colors = ['#5135FF', '#FF5828'];
  console.log(`Free mode initial colors: ${colors}`);
  
  // Test recommended mode
  const baseColor = '#5135FF';
  const recommendedColors = getBestGradientColors(baseColor, 2);
  console.log(`Recommended mode colors: ${recommendedColors}`);
  console.log('---');
}

// Run all tests
function runAllTests() {
  console.log('=== Running Color Recommender Tests ===\n');
  
  testHexToHsl();
  testRecommendedColorCombinations();
  testBestGradientColors();
  testColorModeSwitching();
  
  console.log('=== All tests completed ===');
}

// Export test functions for use in other files
export { runAllTests, testRecommendedColorCombinations, testBestGradientColors };

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests();
}
