const mainFunctions = require('./main');

const JSDOM = require('jsdom').JSDOM;


describe('validateFormValues', () => {

  beforeEach(() => {
    let termsAndConds = document.createElement("div");
    termsAndConds.setAttribute("id", "terms-and-conditions");
  });


  it('should return false if any value is wrong', () => {
    let values = {
      nombre: {
        value:"0asdasd",
        elementHtml: document.createElement("div")
      },
      apellido:{
        value:"0asdasd",
        elementHtml: document.createElement("div")
      },
      usuario:{
        value:"0asdasd",
        elementHtml: document.createElement("div")
      },
      password:{
        value:"0asdasd",
        elementHtml: document.createElement("div")
      }
    };

    expect(mainFunctions.validateFormValues(values)).toBe(false);
  })

  it('should return true if any value is ok', () => {
    let values = {
      nombre: {
        value:"asdasd",
        elementHtml: document.createElement("div")
      },
      apellido:{
        value:"asdasd",
        elementHtml: document.createElement("div")
      },
      usuario:{
        value:"asdasd",
        elementHtml: document.createElement("div")
      },
      password:{
        value:"asdasd",
        elementHtml: document.createElement("div")
      }
    };

    expect(mainFunctions.validateFormValues(values)).toBe(true);
  })
});
