import { expect } from 'chai';
import $ from 'jquery';
import { docWrite } from '../public_html/src/goodbye';
import { bye2 } from '../public_html/src/bye2';

describe('docWrite Test', function () {
  it('should return arg val', function () {

    expect(docWrite('test')).to.equal('test');
  });
});
