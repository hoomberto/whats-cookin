// user test
import { expect } from 'chai';
// import RecipeRepository from '../src/classes/RecipeRepository';
import User from '../src/classes/User';


describe('User', () => {
  let user;
   // recipeRepository

  beforeEach('Setup', () => {
      user = new User();
  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should be an instatnce of Recipe Repository', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it.skip('Should ', () => {
    expect().to.be.an.instanceof();
  });
  it.skip('Should ', () => {
    expect().to.be.an.instanceof();
  });
  it.skip('Should ', () => {
    expect().to.be.an.instanceof();
  });
});
