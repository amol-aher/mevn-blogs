import * as $ from 'jquery';
import PerfectScrollbar from 'perfect-scrollbar';

export default (function () {
  console.log('called')
  const scrollables = $('.scrollable');
  console.log(scrollables);
  if (scrollables.length > 0) {
    scrollables.each((index, el) => {
      new PerfectScrollbar(el);
    });
  }
}());
