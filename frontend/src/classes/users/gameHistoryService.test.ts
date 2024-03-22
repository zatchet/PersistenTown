import getGameHistory from './gameHistoryService';
import GameResult from './GameResult';
// tests the user service method
describe('UserService', () => {
  test('should get game history', async () => {
    const gameHistory = await getGameHistory('hjvj');
    expect(gameHistory).toBeDefined();
    expect(gameHistory).toBeDefined();
  }, 100000);
});
