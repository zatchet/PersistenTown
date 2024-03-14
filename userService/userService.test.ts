import UserService from './userService';
// tests the user service method
describe('UserService', () => {
  it('should get game history', async () => {
    const gameHistory = await UserService.getGameHistory('testUserId');
    expect(gameHistory).toBeDefined();
  });
});
