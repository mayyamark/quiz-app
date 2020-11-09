import a1 from './1.png';
import a2 from './2.png';
import a3 from './3.png';
import a4 from './4.png';
import a5 from './5.png';
import a6 from './6.png';
import a7 from './7.png';
import a8 from './8.png';
import a9 from './9.png';
import a10 from './10.png';

const studentsAvatars = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10];

const randomAvatar = studentsAvatars[Math.floor(Math.random() * studentsAvatars.length)];

export default randomAvatar;
