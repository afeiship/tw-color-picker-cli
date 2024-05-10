import colors from 'tailwindcss/colors.js';

// prevent tailwindcss from removing these colors
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

export default colors;
