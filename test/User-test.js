// user test
import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import User from '../src/classes/User';


describe('User', () => {
  let user, recipeRepository;

  beforeEach('Setup', () => {
      user = new User();
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instatnce of Recipe Repository', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('Should have favorite recipes', () => {
    expect(user.favoriteRecipes).to.be.an.instanceof(RecipeRepository);
  });

  it('Should have recipes to cook', () => {
    expect(user.recipesToCook).to.be.an.instanceof(RecipeRepository);
  });

  it.skip('Should ', () => {
    expect().to.be.an.instanceof();
  });
});
