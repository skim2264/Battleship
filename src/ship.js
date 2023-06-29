const Ship = (length, hitAmount = 0) => {
    const getLength = () => length;
    const getHitAmount = () => hitAmount;
  
    const hit = () => {
        hitAmount ++;
    };
  
    const isSunk = () => {
        if (getHitAmount() == getLength()) return true;
        return false;
    };
  
    return {getLength, getHitAmount, hit, isSunk};
  };
  
module.exports = Ship;
  
  