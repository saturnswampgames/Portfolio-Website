const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const mainJS = fs.readFileSync(path.join(__dirname, '..', 'main.js'), 'utf8');

describe('stickyHeader', () => {
  let window, document, navbar;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><div id="myNavbar"></div>`);
    window = dom.window;
    document = dom.window.document;
    global.window = window;
    global.document = document;
    eval(mainJS); // load functions and variables
    navbar = document.getElementById('myNavbar');
    // override offsetTop after eval because DOM can't set it directly
    navbar.offsetTop = 100;
    sticky = navbar.offsetTop;
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
  });

  test('adds sticky class when scrolled past offset', () => {
    window.pageYOffset = 150;
    stickyHeader();
    expect(navbar.classList.contains('sticky')).toBe(true);
  });

  test('removes sticky class when scrolled above offset', () => {
    window.pageYOffset = 50;
    stickyHeader();
    expect(navbar.classList.contains('sticky')).toBe(false);
  });
});
