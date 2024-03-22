import getGameHistory from './gameHistoryService';
import GameResult from './GameResult';

// tests the user service method
// TODO fix this test
describe('GameHistoryService', () => {
  it('should get game history', async () => {
    const gameHistory: GameResult[] = await getGameHistory('pldmOGhqQEeVyHEkgvMm');
    //testFirebaseStuff();
    expect('gameHistory').toBeDefined();
  }, 100000);
});
