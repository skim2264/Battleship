const Ship = require('../ship');


test('Retrieves proper length of ship(getLength)', () => {
    let newShip = Ship(4, 2);
    expect(newShip.getLength()).toBe(4);
});

test('Retrieves proper hit amount of ship (getHitAmount)', () => {
    let newShip = Ship(4, 2);
    expect(newShip.getHitAmount()).toBe(2);
});

test('Hit function increases hitAmount by 1 (hit)', () => {
    let newShip = Ship(4, 2);
    newShip.hit();
    expect(newShip.getHitAmount()).toBe(3);
});

test('Correctly alerts if ship has sunk (isSunk)', () => {
    let newShip = Ship(4,4);
    expect(newShip.isSunk()).toBe(true);
})

