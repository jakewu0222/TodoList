import { AuthorizeModule } from './authorize.module';

describe('AuthorizeModule', () => {
  let authorizeModule: AuthorizeModule;

  beforeEach(() => {
    authorizeModule = new AuthorizeModule();
  });

  it('should create an instance', () => {
    expect(authorizeModule).toBeTruthy();
  });
});
