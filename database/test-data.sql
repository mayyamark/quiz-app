START TRANSACTION;

USE `quiz`;


INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'teacher'),
(2, 'student');



INSERT INTO `users` (`id`, `username`, `password`, `firstName`, `lastName`, `roleID`,  `registerDate`, `avatar`) VALUES
(1, 'pesho', '$2b$10$4rwzGQjZgL6qjpI88wPmL.AWID3SS05HrTSzpoStxtmyPy/6JY90.', 'Pesho', 'Peshov', 1, '2020-11-04 18:53:45', NULL),
(2, 'gosho', '$2b$10$T0Sa2etBy9pC4rX69Ahj6OshOzwsM5tQJ0nk3Vjq/iGinXiwkaxi6', 'Gosho', 'Goshov', 2, '2020-11-04 18:50:38', NULL);



INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'chemistry'),
(2, 'mathematics');




INSERT INTO `quizes` (`id`, `name`, `time`, `teacherID`, `categoryID`) VALUES
(1, 'Periodic table', '60', 1, 1),
(2, 'Addition', '30', 1, 2),
(3, 'Substraction', '30', 1, 2),
(4, 'Algebra', '30', 1, 2),
(5, 'Hydrocarbons', '60', 1, 1),
(6, 'Peptides', '45', 1, 1),
(7, 'Carbohydrates', '45', 1, 1),
(8, 'Dyes', '45', 1, 1),
(9, 'Analytical chemistry', '60', 1, 1),
(10, 'Geometry', '60', 1, 2);



INSERT INTO `questions` (`id`, `quizID`, `points`, `text`) VALUES
(1, 1, 2, 'Which element has Z = 1?'),
(2, 1, 2, 'How are elements from group IA called?'),
(3, 2, 1, '1 + 1 = ?'),
(4, 2, 1, '5 + 10 = ?'),
(5, 2, 5, '75 + 13 = ?'),
(6, 2, 3, '44 + 16 = ?');



INSERT INTO `answers` (`id`, `questionID`, `text`, `isTrue`) VALUES
(1, 1, 'H', 1),
(2, 1, 'C', 0),
(3, 1, 'Na', 0),
(4, 1, 'Cl', 0),
(5, 2, 'halogens', 0),
(6, 2, 'alkali metals', 1),
(7, 2, 'hydrocarbons', 0),
(8, 2, 'lanthanides', 0),
(9, 3, '0', 0),
(10, 3, '3', 0),
(11, 3, '2', 1),
(12, 3, '5', 0),
(13, 4, '10', 0),
(14, 4, '15', 1),
(15, 4, '1', 0),
(16, 4, '100', 0),
(17, 5, '100', 0),
(18, 5, '25', 0),
(19, 5, '88', 1),
(20, 5, '18', 0),
(21, 6, '50', 0),
(22, 6, '20', 0),
(23, 6, '30', 0),
(24, 6, '60', 1);



INSERT INTO `history` (`id`, `userID`, `quizID`, `started`, `finished`, `score`) VALUES
(1, 1, 1, '2020-11-04 12:34:38', '2020-11-04 12:44:38', 4),
(2, 2, 1, '2020-11-04 12:25:33', '2020-11-04 12:45:33', 2);


COMMIT;

