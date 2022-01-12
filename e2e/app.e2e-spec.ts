import { EmployeeTODOSPage } from './app.po';

describe('employee-todos App', () => {
  let page: EmployeeTODOSPage;

  beforeEach(() => {
    page = new EmployeeTODOSPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
