function generateRandString(radix = 36, slice = -8){
   return Math.random().toString(radix).slice(slice);
}


module.exports.generateRandString = generateRandString;