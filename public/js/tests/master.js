'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('seat generation', function(){
  expect(4);
  $('#section').val('#genAdmission');
  $('#amount').val('30');
  $('#cost').val('50');
  $('#createButton').trigger('click');
  $('#section').val('#vip');
  $('#amount').val('15');
  $('#cost').val('110');
  $('#createButton').trigger('click');

  deepEqual($('#vip div').length, 15, 'there are 15 vip seats');
  deepEqual($('#vip').data('cost'), 110, 'vip seats are $110');
  deepEqual($('#genAdmission div').length, 30, 'there are 30 genAdmission seats');
  deepEqual($('#genAdmission').data('cost'), 50, 'genAdmission seats are $110');
});

test('reserve seats', function(){
  expect(4);
  $('#section').val('#genAdmission');
  $('#amount').val('30');
  $('#cost').val('$50');
  $('#createButton').trigger('click');
  $('#section').val('#vip');
  $('#amount').val('15');
  $('#cost').val('$110');
  $('#createButton').trigger('click');

  $('#name').val('Chyld');
  $('#vip div:nth-child(5)').trigger('dblclick');
  deepEqual($('#vip div:nth-child(5) .resName').text(), 'Chyld', 'double clicked to reserve seat for Chyld');

  $('#name').val('Bill');
  $('#genAdmission div:nth-child(5)').trigger('dblclick');

  deepEqual($('#genAdmission div:nth-child(5) .resName').text(), 'Bill', 'double clicked to reserve seat for Bill');

  $('#name').val('Andy');
  $('#vip div:nth-child(5)').trigger('dblclick');

  deepEqual($('#vip div:nth-child(5) .resName').text(), 'Chyld', 'seat remained reserved');

  $('#name').val('Fritz');
  $('#genAdmission div:nth-child(5)').trigger('dblclick');

  deepEqual($('#genAdmission div:nth-child(5) .resName').text(), 'Bill', 'seat remained reserved');
});

test('create reporting', function(){
  expect(8);
  $('#section').val('#genAdmission');
  $('#amount').val('30');
  $('#cost').val('50');
  $('#createButton').trigger('click');
  $('#section').val('#vip');
  $('#amount').val('15');
  $('#cost').val('110');
  $('#createButton').trigger('click');

  $('#name').val('Chyld');
  $('#vip div:nth-child(4)').trigger('dblclick');

  $('#name').val('Bill');
  $('#genAdmission div:nth-child(4)').trigger('dblclick');

  $('#name').val('Andy');
  $('#vip div:nth-child(6)').trigger('dblclick');

  $('#name').val('Fritz');
  $('#genAdmission div:nth-child(6)').trigger('dblclick');

  deepEqual($('#left #vipTotal').text(), '$220.00', 'total VIP cost');
  deepEqual($('#left #genAdmissionTotal').text(), '$100.00', 'total GA cost');
  deepEqual($('#left #grandTotal').text(), '$320.00', 'total VIP and GA cost');
  deepEqual($('#left #vipPeople').text(), '2', 'total VIP tickets sold');
  deepEqual($('#left #gaPeople').text(), '2', 'total GA tickets sold');
  deepEqual($('#left #totalPeople').text(), '4', 'total VIP and GA tickets sold');
  deepEqual($('#right > #vipList .peopleList div:nth-child(2)').text(), 'V6 - Andy', 'Andy is in V6');
  deepEqual($('#right > #genAdmissionList .peopleList div:nth-child(2)').text(), 'G6 - Fritz', 'Hank is in G6');
});