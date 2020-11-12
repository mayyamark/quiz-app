START TRANSACTION;

USE `quiz`;


INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'teacher'),
(2, 'student');



INSERT INTO `users` (`id`, `username`, `password`, `firstName`, `lastName`, `roleID`,  `registerDate`, `avatar`) VALUES
(1, 'pesho', '$2b$10$4rwzGQjZgL6qjpI88wPmL.AWID3SS05HrTSzpoStxtmyPy/6JY90.', 'Pesho', 'Peshov', 1, '2020-11-04 18:53:45', '/static/media/5.450c843e.png'),
(2, 'gosho', '$2b$10$T0Sa2etBy9pC4rX69Ahj6OshOzwsM5tQJ0nk3Vjq/iGinXiwkaxi6', 'Gosho', 'Goshov', 2, '2020-11-04 18:50:38', '/static/media/10.decf6048.png'),
(3, 'tosho', '$2b$10$UINu0b5yEMTMkJe6SzfxuuMGaCAV6JEosFRWF52dFb3qJCSN9.N8i', 'Tosho', 'Toshov', 1, '2020-11-04 18:55:38', '/static/media/7.9354a63e.png'),
(5, 'petko', '$2b$10$v2WOb6/CB6optSYlYu3vXekC.vAOUeajHORN3mQKyYM7sEIQJRS4m', 'Petko', 'Petkov', 2, '2020-11-09 14:24:11', '/static/media/9.3e9903d5.png'),
(6, 'ani', '$2b$10$oNUgcWh3p80cdrA4axrj6.L3Gw7RbcZprzM5rGDFnEpDtyX0uALom', 'Ani', 'Anova', 2, '2020-11-09 14:29:23', '/static/media/10.decf6048.png'),
(7, 'viki', '$2b$10$XzS1qS3e2LqNSJnFF9u7VOXFa69g3RusCFXVUAfL4jEmKjLzvHmbi', 'Viki', 'Vikov', 2,'2020-11-09 14:36:31', '/static/media/7.9354a63e.png'),
(8, 'penka', '$2b$10$Z231NxfbLNkT0q6tEgwlaeRtAbyc9dVtmAXqTGK0uzisDAmzHw6L.', 'Penka', 'Penkova', 2, '2020-11-09 14:40:30', '/static/media/10.decf6048.png'),
(9, 'ivan', '$2b$10$j0g1gwwnFbfoTK/OHJHSkOirPDYjVCg9T0V.QzTMOyYCRwzH/dmWO', 'Ivan', 'Ivanov', 2, '2020-11-09 14:41:16', '/static/media/9.3e9903d5.png'),
(10, 'kiro', '$2b$10$JjL4F6c16si3HYbFYAOjWOj30wjqo1cwFnCqL1kHe4TmEgGOICspu', 'Kiril', 'Kirilov' , 2, '2020-11-09 14:45:13', '/static/media/9.3e9903d5.png'),
(11, 'asen', '$2b$10$xXYYwiB6CR17T6kPUfZaluf9BvWSqfgPjI.4Z.n1rO/nLojFWzoy6', 'Asen', 'Asenov', 2, '2020-11-09 14:48:00', '/static/media/8.eafdff08.png'),
(12, 'hristo', '$2b$10$D2Dscj8vRaJOfI.1jmbcCO9ZwXuA4/vyXDUCRZz9Ijn1OB8pIsnNa', 'Hristo', 'Hristov', 2, '2020-11-09 16:14:42', '/static/media/7.9354a63e.png'),
(13, 'mario', '$2b$10$6PGrs3vfEfd5qyENoU88WO7UiG6RJcDFBQtfPd0q/1Ffuve.f7Fka', 'Mario', 'Mariov', 2 , '2020-11-09 16:23:03', '/static/media/7.9354a63e.png');



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

