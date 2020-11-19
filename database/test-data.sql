START TRANSACTION;

USE `quiz`;


INSERT INTO `roles` (`id`, `role`) VALUES
(1, 'teacher'),
(2, 'student');



INSERT INTO `users` (`id`, `roleID`, `username`, `firstName`, `lastName`, `password`, `registerDate`, `avatar`) VALUES
(1, 1, 'pesho', 'Petyr', 'Petrov', '$2b$10$4rwzGQjZgL6qjpI88wPmL.AWID3SS05HrTSzpoStxtmyPy/6JY90.', '2020-11-04 18:53:45', '/static/media/1.db1546a0.png'),
(2, 1, 'gosho', 'Georgi', 'Georgiev', '$2b$10$T0Sa2etBy9pC4rX69Ahj6OshOzwsM5tQJ0nk3Vjq/iGinXiwkaxi6', '2020-11-04 18:50:38', '/static/media/2.b5703296.png'),
(3, 1, 'tosho', 'Todor', 'Todorov', '$2b$10$UINu0b5yEMTMkJe6SzfxuuMGaCAV6JEosFRWF52dFb3qJCSN9.N8i', '2020-11-04 18:55:38', '/static/media/3.00d92f05.png'),
(4, 1, 'kali', 'Kalina', 'Kalinova', '$2b$10$APcwnRkZHGZcklN/yvcvCuIeyIQzATgGfU3DaTjc84VRMGAp40XuS', '2020-11-16 19:29:50', '/static/media/4.cba81065.png'),
(5, 1, 'petya', 'Petya', 'Petyova', '$2b$10$ialpX.xqlJsm1jicNoayn.xl3ywNa5Rb5QJmPjbOxHbgChrRl/Wii', '2020-11-16 19:30:42', '/static/media/5.0f084a32.png'),
(6, 1, 'krasi', 'Krasimir', 'Krasimirov', '$2b$10$tp8pwec2jNiB.GXGslRCOOBFrOC1ZtW7SEp5UL5L7nIMH1jeeKLwS', '2020-11-16 19:31:09', '/static/media/6.718f2003.jpg'),
(7, 1, 'sara', 'Sara', 'Sarova', '$2b$10$zeOLI.zEFKN80U4/gbvyZ.bdlcXcYe08BrOi8OZk1PY3vS.pDTPAa', '2020-11-16 19:42:15', '/static/media/7.6d9699bc.png'),
(8, 1, 'vasko', 'Vasil', 'Vasilev', '$2b$10$YVjhE12wbTnhqdw8IA7Xs.isZgxqAHAuX3/2zhKtPdTddAIQ1snNu', '2020-11-16 19:31:31', '/static/media/8.ced28e9c.jpg'),
(9, 1, 'margi', 'Margarita', 'Margaritova', '$2b$10$K0qbtaIqclpsqWvJN5NIR.08niG0Xorub4h4pIMK6zQxagj4v7Kim', '2020-11-16 19:31:54', '/static/media/9.54a355ea.jpg'),
(10, 1, 'hrisi', 'Hristina', 'Hristinova', '$2b$10$zvrJ7znHqrRWcs.dxaPd9.6930X0Keo.o8lBsDGP796S1igtrFRwC', '2020-11-16 19:32:26', '/static/media/10.df0ce478.jpg'),
(11, 1, 'svetlyo', 'Svetoslav', 'Svetoslavov', '$2b$10$/YNPAcenu0g20OJMQUmIKOKNOmddfGsFFagn4WwSdSnDICuMU0zia', '2020-11-16 19:32:53', '/static/media/11.0c21e290.jpg'),
(12, 1, 'sasho', 'Aleksandyr', 'Aleksandrov', '$2b$10$1pmq0xXiqLtkaKkxe9pzVOg2NJqAK4UHdQVFg8MnZMlpE9duMwxIm', '2020-11-16 19:35:01', '/static/media/12.80679427.jpg'),
(13, 1, 'petko', 'Petko', 'Petkov', '$2b$10$adcgWi2aVPdHKuEtbzPJMOnK3FkgrSbYcJdZ.zHsC9ohag2ErWb0m', '2020-11-16 19:35:18', '/static/media/13.e7616939.jpg'),
(14, 1, 'ivan', 'Ivan', 'Ivanov', '$2b$10$03Zj9NGCiXAYbTjaSSCnBu9FIzL.3MGuWdOeeE3cbKvX8UnchNt2i', '2020-11-16 19:35:34', '/static/media/14.c2fcf0b6.jpg'),
(15, 1, 'sisi', 'Silviya', 'Silviova', '$2b$10$N9AIjgmwbvrryJoQvMu89OyJrNfSnB/H9escw87zYNzELJdK4M.vi', '2020-11-16 19:36:00', '/static/media/15.1393d283.jpg'),
(16, 1, 'dori', 'Dora', 'Dorova', '$2b$10$/.OVoTs2mpoSWDjWfjEp6u./qB6ZA90o2trLeZhTmfmtIEOXHb1Ta', '2020-11-16 19:36:30', '/static/media/16.73eba30e.jpg'),
(17, 1, 'vili', 'Violeta', 'Violetova', '$2b$10$IwPvyvHtw556BDkqV.fk6.FZjbMLzqVEgG0TbMT0qhKFu/f1b2CkS', '2020-11-16 19:36:52', '/static/media/17.ad93da2d.jpg'),
(18, 1, 'mark', 'Marko', 'Markov', '$2b$10$u75Hx4o0lIAkFLJzPgc1t.QvgGgVkntDZI.IyIJEcLPIFdtr8LP82', '2020-11-16 19:37:07', '/static/media/18.4c9af73f.jpg'),
(19, 1, 'tina', 'Radostina', 'Radostinova', '$2b$10$ca5bM7fPS5OF0VC.YWlfGu2.nJ8x69omBrlhQkk59bG6osfQxGJGG', '2020-11-16 19:37:57', '/static/media/19.ac0a9272.jpg'),
(20, 1, 'tedi', 'Teodora', 'Teodorova', '$2b$10$qtDFrHL/kT/Q3UYtYT/BK.MmkYu8tYsg08M26e01wXN.mO887hA4q', '2020-11-16 19:38:16', '/static/media/20.c543c8fb.png'),
(21, 2, 'ico', 'Hristo', 'Hristov', '$2b$10$YaJayUrtm1JcKax2fHByp.RpzKEybyXkUVWVZW.PXID80uGv3oaxK', '2020-11-16 19:37:22', '/static/media/1.9df5147d.png'),
(22, 2, 'sami', 'Samuil', 'Samuilov', '$2b$10$D9o0l1.qUMz38EdsERwROeYnzMP.qIwYjZm0xX/A1s0QdLF5qNHuy', '2020-11-16 19:37:37', '/static/media/2.91ff2671.png'),
(23, 2, 'kara', 'Karolina', 'Karolinova', '$2b$10$IkcA7TIy58Kyj0uyOMV66eP.HBtRY105JjPEK5U3ROfUK.Af.h5I2', '2020-11-16 19:38:36', '/static/media/3.5a22821f.png'),
(24, 2, 'dido', 'Dido', 'Didov', '$2b$10$nTgLCmH6o1T.RbBQD16ZYeoLqRWbgl4NVZTW7ZrJDbTqX1zVWTY2y', '2020-11-16 19:38:56', '/static/media/4.8feebb02.png'),
(25, 2, 'dani', 'Daniel', 'Danielov', '$2b$10$LF2ZxikPQC62LByXNg81s.YLyftyNFKwjj1AzU0YdcgroPTMOI38q', '2020-11-16 19:39:17', '/static/media/5.450c843e.png'),
(26, 2, 'fori', 'Nikifor', 'Nikiforov', '$2b$10$DOAE./JziMgvU50./90lD.mKiB.lPqVtmLZA86er/EecaOR/EgH9u', '2020-11-16 19:39:38', '/static/media/6.ac16d7d0.png'),
(27, 2, 'viki', 'Viktor', 'Viktorov', '$2b$10$QjN/JyXBQeCU9Kv0AbMbMeAMYRUACfOmMtFzQWNNoJA2upcexkgDC', '2020-11-16 19:39:53', '/static/media/7.9354a63e.png'),
(28, 2, 'reni', 'Reni', 'Renova', '$2b$10$j9nV4oB6e8C2kEuklG5OluBw08a/FcIVNjKwfGQa8zG3I04aYS5CC', '2020-11-16 19:40:10', '/static/media/8.eafdff08.png'),
(29, 2, 'andi', 'Andrei', 'Andreev', '$2b$10$WjWy/4geGPuAsMgkw0AUDuqn7j.zBwcDquLOSHsruW5BwxHFIXmLq', '2020-11-16 19:40:26', '/static/media/9.3e9903d5.png'),
(30, 2, 'kolyo', 'Nikola', 'Nikolov', '$2b$10$FZuZAuzehbr.m.R/X1cpru7EJQDbHt35rPlzacdCnXZ0utpOPt0LW', '2020-11-16 19:40:47', '/static/media/10.decf6048.png'),
(31, 2, 'bobi', 'Boryana', 'Boryanova', '$2b$10$K3FHrKHp.KbpgMJ3zeMfuuDt.MxEBMNPt2F8AuV5QXzhLLC0AvdD.', '2020-11-16 19:41:03', '/static/media/1.9df5147d.png'),
(32, 2, 'borko', 'Borislav', 'Borislavov', '$2b$10$Db2s8Nkes4LSCbh029GBg.PDDebdNst6mdk1JXB9BY90NGUiwSgdO', '2020-11-16 19:41:21', '/static/media/2.91ff2671.png'),
(33, 2, 'galya', 'Galya', 'Galova', '$2b$10$7.QGq8wcOl6fpEKsV9aZyuZjDiNkqan11tZ1QpoLybwTg6wn.b52a', '2020-11-16 19:41:43', '/static/media/3.5a22821f.png'),
(34, 2, 'roza', 'Roza', 'Rozova', '$2b$10$H4Av4eLJ8BifGI4iFRmO2OCzw1zFPuRYMi3fkS2/QeyLb1.xP1slC', '2020-11-16 19:42:00', '/static/media/4.8feebb02.png'),
(35, 2, 'sara', 'Sara', 'Sarova', '$2b$10$zeOLI.zEFKN80U4/gbvyZ.bdlcXcYe08BrOi8OZk1PY3vS.pDTPAa', '2020-11-16 19:42:15', '/static/media/5.450c843e.png'),
(36, 2, 'lili', 'Lili', 'Lilova', '$2b$10$ctZjbQM4F9kVm5AEwQG0R.QrSHAGxnf3DGo0T80PaJvtzwCOaMXjq', '2020-11-16 19:45:24', '/static/media/6.ac16d7d0.png'),
(37, 2, 'geri', 'Gergana', 'Gerganova', '$2b$10$PDSqaU6Uh37CurpeUkUjOuUOi1c/8Ln2IlfC3r58wLvULfnfvRcSW', '2020-11-16 19:45:45', '/static/media/7.9354a63e.png'),
(38, 2, 'alek', 'Alek', 'Alekov', '$2b$10$nH1xNBySW5RYT9XGjrowxeY92SAHexdax07T37M8ZiiBrmfXAtV4S', '2020-11-16 19:46:06', '/static/media/8.eafdff08.png'),
(39, 2, 'lora', 'Lora', 'Lorova', '$2b$10$j6Q0hPb2AHjrC.iesVntE.AIcHkT3V749o2Wo0QpVEaE9Xvlg5qDu', '2020-11-16 19:46:18', '/static/media/9.3e9903d5.png'),
(40, 2, 'paco', 'Plamen', 'Plamenov', '$2b$10$X/ZGu7SuP16bHAHEuUcmLOtGnI.y77nK.B9.iN7HubAQsCYSsJO2W', '2020-11-16 19:46:35', '/static/media/10.decf6048.png'),
(41, 2, 'pano', 'Panayot', 'Panayotov', '$2b$10$MztoqxOTXAxoFHKdjU7TquhHwURzAJP2PBIzh3NcH1PB1OOns0wsG', '2020-11-16 19:46:56', '/static/media/1.9df5147d.png'),
(42, 2, 'riko', 'Rikardo', 'Rikardov', '$2b$10$T5Gf2wzURvZ9JW3lrJrIgOBzl.rqYLdfyHfzpeJnQjo8b8.m8Wj9C', '2020-11-16 19:47:14', '/static/media/2.91ff2671.png'),
(43, 2, 'erik', 'Erik', 'Erikov', '$2b$10$LXdnrXfdmDx2ah.ffSyC0Oo1.fEhIGNG5HmWNWj8/SY9U4eBcjHNK', '2020-11-16 19:47:27', '/static/media/3.5a22821f.png'),
(44, 2, 'veri', 'Veronika', 'Veronova', '$2b$10$EyP174ddEW6oFYPyO07k/.0yaJfhITAQQT3sc7J.sXz6PMZOrXAnq', '2020-11-16 19:47:57', '/static/media/4.8feebb02.png'),
(45, 2, 'toni', 'Anton', 'Antonov', '$2b$10$rV3nXtFAlKcZwaImhUBPIO10HUVgcl39DqlrcVBuym4qxKOEBPjEC', '2020-11-16 19:48:14', '/static/media/5.450c843e.png'),
(46, 2, 'bogi', 'Bogdan', 'Bogdanov', '$2b$10$6tSBdVyKGF31We9B4xSWRuStqVsx0STxAhoIyrU72gAQ7sBqHEw3i', '2020-11-16 19:48:41', '/static/media/6.ac16d7d0.png'),
(47, 2, 'simo', 'Simeon', 'Simeonov', '$2b$10$7PLl6PwkKPfxzbw2AZIZFOKRhnFhj72izHcSgeyFYQFLOwSG0F9Ky', '2020-11-16 19:48:57', '/static/media/7.9354a63e.png'),
(48, 2, 'olga', 'Olga', 'Olgova', '$2b$10$TToNsRhYWFuAGfA2vMWZ8OTG4yA1R0AU45luwNWQ/SJfmJ3O/gJlS', '2020-11-16 19:49:14', '/static/media/8.eafdff08.png'),
(49, 2, 'poli', 'Polina', 'Polinova', '$2b$10$Fd/KlgmGVGxzJak1/hPQgeXfGj9XaTexvEP5iftar.GPoTGKgy.2.', '2020-11-16 19:49:28', '/static/media/9.3e9903d5.png'),
(50, 2, 'nora', 'Nora', 'Norova', '$2b$10$XDCeLimOBYWAh1d.ovwS0.yCW4I1s/wOz6G5QfFaJ3oSscKlylhMa', '2020-11-16 19:49:45', '/static/media/10.decf6048.png'),
(51, 2, 'kiro', 'Kiril', 'Kirilov', '$2b$10$XrpQiYCePkp6izEx5DOrIeimQMDrQAs2eXW39dQyzpwGVMujbP/4e', '2020-11-16 19:50:19', '/static/media/1.9df5147d.png'),
(52, 2, 'blago', 'Blagoy', 'Blagoev', '$2b$10$kGg6GAYns8ubz0vU2J.KY.5bs7qcE5SXHHhJsbidMyK4xnQZOh5R2', '2020-11-16 19:50:39', '/static/media/2.91ff2671.png'),
(53, 2, 'ceco', 'Cvetan', 'Cvetanov', '$2b$10$wYloX0uM23iZOTxr8WlC3e7oGp3GTXRSS3WjBkGDsOiMWJ1raRNmy', '2020-11-16 19:51:09', '/static/media/3.5a22821f.png'),
(54, 2, 'vlado', 'Vladimir', 'Vladimirov', '$2b$10$KVt2BgmiFOLXiSO64.aEWejJKF0IH.HxtRu6Z57q5A1h1D8MpAc/K', '2020-11-16 19:51:26', '/static/media/4.8feebb02.png'),
(55, 2, 'gabi', 'Gabriela', 'Gabrielova', '$2b$10$p7jGyNdG/jwn7pILbEUno.KEYpbmOJ5CJ6jfnw0xzsPg4Hbg3.Aeq', '2020-11-16 19:51:51', '/static/media/5.450c843e.png'),
(56, 2, 'fil', 'Filip', 'Filipov', '$2b$10$podTb9EzL.LC6.mIjKLmQ.WyB1/Phu1tSNdAwuYdYV6o82rgAVAh.', '2020-11-16 19:52:15', '/static/media/6.ac16d7d0.png'),
(57, 2, 'zdravka', 'Zdravka', 'Zdravkova', '$2b$10$0Vs7qC50A04kbXAmjrE5/eluIkrpwzuQAy.gtaCJUu29isiP1jce6', '2020-11-16 19:52:34', '/static/media/7.9354a63e.png'),
(58, 2, 'kami', 'Kameliya', 'Kameliova', '$2b$10$yPlIVE0a8xs1pcivI8WX2edkJM4p2h0ZoaQA3GMwr5KxFOvLEZ9fe', '2020-11-16 19:53:01', '/static/media/8.eafdff08.png'),
(59, 2, 'yori', 'Yordan', 'Yordanov', '$2b$10$lTSkTxyF1cLO1DLV7GwQ4.hlthLb4FxDZq5jJBxqTtkBT3nVBQfu2', '2020-11-16 19:53:28', '/static/media/9.3e9903d5.png'),
(60, 2, 'kris', 'Kristian', 'Kristianov', '$2b$10$3ytNq7dBGvWXQ3EM64J8bOaDd1mwmnIKctErbz6cSTmnrQyGM.LkC', '2020-11-16 19:53:49', '/static/media/10.decf6048.png'),
(61, 2, 'maks', 'Maksim', 'Maksimov', '$2b$10$W58v4ZXw70OTL6xqgQAgiOxVdE6.54/o/ASypjIH1iyzAlPFpJNNK', '2020-11-16 19:54:06', '/static/media/1.9df5147d.png'),
(62, 2, 'mimi', 'Mariya', 'Mariova', '$2b$10$JqXG0TOHF.nOarj2PSDAfuehir8jsNj/kF7l1uxTBwXkT3YFigDM.', '2020-11-16 19:54:30', '/static/media/2.91ff2671.png'),
(63, 2, 'teo', 'Teo', 'Teov', '$2b$10$LkNshIhGG3NHj82rMDrEV.o8JnHRtShETQfO0HnOnPvb1BFq6.Hey', '2020-11-16 19:55:17', '/static/media/3.5a22821f.png'),
(64, 2, 'rali', 'Ralica', 'Ralicova', '$2b$10$3GS6NvmT4PzNg2ZG6S50r.Edz.wLuIk5jGXVhBtt.Hhhmf4C7Liim', '2020-11-16 19:57:35', '/static/media/4.8feebb02.png'),
(65, 2, 'eli', 'Elena', 'Elenova', '$2b$10$U5w5GPnp/H30PuW9CqQynulYP5UmNmtkOqM.Db67TPXQ68KdwTLTS', '2020-11-16 19:57:56', '/static/media/5.450c843e.png'),
(66, 2, 'ina', 'Ina', 'Inova', '$2b$10$.RSuZrovlydeuiTXP.XDs.iz0bc.8MXD4zYUSa6dtKMIDa8ExbpZ6', '2020-11-16 19:58:17', '/static/media/6.ac16d7d0.png'),
(67, 2, 'eva', 'Eva', 'Evova', '$2b$10$NDFR5IEPOgUsd/.ITkPTNOMUrbuXhzaO3BeFGV7kpIAskaVhay3Ou', '2020-11-16 19:58:35', '/static/media/7.9354a63e.png'),
(68, 2, 'evi', 'Evlogi', 'Evlogiev', '$2b$10$2P6FHjCBvRbuUJTOAfre1uk/qKYrMu4BO5iKD15sJLCL2RmNEqjTO', '2020-11-16 19:58:55', '/static/media/8.eafdff08.png'),
(69, 2, 'raya', 'Raya', 'Raeva', '$2b$10$K5/9tG4H3VDffD0A8V/A9uhLlSJt00Rb3tc.S0BGG7QOj6Tdymho.', '2020-11-16 19:59:09', '/static/media/9.3e9903d5.png'),
(70, 2, 'koki', 'Kostadin', 'Kostadinov', '$2b$10$j08J7TJixGkFvSLRimVsoeitBdofJU1V3U0x3UWYySqW2pXQrh9ta', '2020-11-16 19:59:31', '/static/media/10.decf6048.png'),
(71, 2, 'ogi', 'Ognyan', 'Ognyanov', '$2b$10$73/2gu5ogPVgF.Qkt5.JlOT6DUy4uFETnGk5LEXnvCAfmlkhTkafG', '2020-11-16 19:59:54', '/static/media/1.9df5147d.png'),
(72, 2, 'pavkata', 'Pavel', 'Pavelov', '$2b$10$ik4feiT1YR5FY7nbNGAfG.kEefXvFPoaQoTpG14FWQGKV8CX8Pr.6', '2020-11-16 20:00:12', '/static/media/2.91ff2671.png'),
(73, 2, 'bojo', 'Bojidar', 'Bojidarov', '$2b$10$B/E/Q8iMZ/xPhoS1ySgZsedkrJPnCdSjx2oTWmuXy4mPeHHQBD7pm', '2020-11-16 20:00:55', '/static/media/3.5a22821f.png'),
(74, 2, 'bobo', 'Boris', 'Borisov', '$2b$10$dzAXloxdawHBSaYGFEmC5.iFt/z20.FfZ9e2klJbiKZgrmF29gyUa', '2020-11-16 20:01:42', '/static/media/4.8feebb02.png'),
(75, 2, 'yana', 'Yana', 'Yanova', '$2b$10$rhzCJjLvxDCzcoM./.9VQ.4BPLur6F8amR.XJ3doHc9HtsLID6bZi', '2020-11-16 20:02:05', '/static/media/5.450c843e.png'),
(76, 2, 'jan', 'Jan', 'Janov', '$2b$10$83/Vvg6Pq8XIZ56Y6e8d7eKTToTi/xfxOE8hblgm0uzg0VqasV5Ly', '2020-11-16 20:02:21', '/static/media/6.ac16d7d0.png'),
(77, 2, 'yoli', 'Yoana', 'Yoanova', '$2b$10$SdKR7PlJpDInF3nyO88RYO0daxJ4E/hmeEZ3bfvrkkb25G/4w7Kbi', '2020-11-16 20:02:42', '/static/media/7.9354a63e.png'),
(78, 2, 'magi', 'Magdalena', 'Magdalenova', '$2b$10$vtEQx81QnMFg/kunpVBsfuLw4cqOTAxoyjc5Wt8aW/dA3aLkt0QjO', '2020-11-16 20:02:59', '/static/media/8.eafdff08.png'),
(79, 2, 'sila', 'Silvestyr', 'Silvestyrov', '$2b$10$Dh71M3dGNulNDltcLIvQouEXop0WkWpvRbvwPGLVckRqgVhHSANou', '2020-11-16 20:03:24', '/static/media/9.3e9903d5.png'),
(80, 2, 'rado', 'Radoslav', 'Radoslavov', '$2b$10$EVAq4muT4Ppm1x0qTNJcM.4JYxdiJ7WQOKXqqX4iQV4cAQGYw.r1u', '2020-11-16 20:03:40', '/static/media/10.decf6048.png'),
(81, 2, 'radi', 'Radina', 'Radinova', '$2b$10$70t4kXLK8a7sedURoV1/beV9tlaIDaxSPnOgTIMwXQOdZlxKrn.Wm', '2020-11-16 20:03:54', '/static/media/1.9df5147d.png'),
(82, 2, 'moni', 'Simona', 'Simonova', '$2b$10$cH3i0PgQzPlh07U2OM7lbOzYMswYt0KxJXDPsvlsuYa9VsAT.qUti', '2020-11-16 20:04:26', '/static/media/2.91ff2671.png'),
(83, 2, 'rosi', 'Rosica', 'Rosicova', '$2b$10$xPjrn6Nx9Y5lB27Dw/CahOwDap4GW/KjYaN43RPNYS7a.9hTn.TYK', '2020-11-16 20:04:41', '/static/media/3.5a22821f.png'),
(84, 2, 'stef', 'Stefan', 'Stefanov', '$2b$10$T.GZtmT2L5AhQRKt4oebBehpnBh2FhI2NxAFC/0UHOzNqdJHdOSmq', '2020-11-16 20:05:12', '/static/media/4.8feebb02.png'),
(85, 2, 'stefi', 'Stefani', 'Stefanova', '$2b$10$YPZEY6Ks5663WkgylV5sgeL8YBRzfAgid6tvvcOmodvkT0HGfs6rq', '2020-11-16 20:05:32', '/static/media/5.450c843e.png'),
(86, 2, 'cveti', 'Cvetelina', 'Cvetelinova', '$2b$10$OHpOhWolSx0SZ9dS5ifWo.CkfXQxic34gTaNivE22EQdknKmN3Rvu', '2020-11-16 20:05:49', '/static/media/6.ac16d7d0.png'),
(87, 2, 'pam', 'Pamela', 'Pamelova', '$2b$10$Gd4MWyv1uFDPgsiRuggpaO1nUzgcENjxniH91j4OBx2UkdW64i0Au', '2020-11-16 20:06:44', '/static/media/7.9354a63e.png'),
(88, 2, 'asen', 'Asen', 'Asenov', '$2b$10$uLX0a4N3.qFkmzten4uqXej3bD/Hfmc/WkdSfuzopMk.uB2kzsK2S', '2020-11-16 20:07:11', '/static/media/8.eafdff08.png'),
(89, 2, 'elza', 'Eliza', 'Elizova', '$2b$10$4xLYcPSJmqYQbRRo486u3OV9yfbAUC2hApp6VsmqH3CPVHilQn4FG', '2020-11-16 20:07:42', '/static/media/9.3e9903d5.png'),
(90, 2, 'nedko', 'Nedko', 'Nedkov', '$2b$10$RR.ok3HIg1YLeHCWENZ2MuzDcY9vT0EeKnhPAUYGjK/XPy8X5IKPi', '2020-11-16 20:07:57', '/static/media/10.decf6048.png'),
(91, 2, 'sam', 'Samanta', 'Samantova', '$2b$10$nbDvddLqCMYQS38qOLzq2euHj3cTRrLgVj34clpGAJ7.hVF3A2qLi', '2020-11-16 20:08:34', '/static/media/1.9df5147d.png'),
(92, 2, 'sergo', 'Sergey', 'Sergeev', '$2b$10$5HbU7kIito4EfCmQbe.FHetvGQKYsTd04pg0n0gm1GnYrfKsmGX9m', '2020-11-16 20:08:50', '/static/media/2.91ff2671.png'),
(93, 2, 'jivko', 'Jivko', 'Jivkov', '$2b$10$YbvyEghwWUJzPlmkkXI8dOz.7nyNvoi3JLrEyQTLh.Dzsy50T485e', '2020-11-16 20:09:06', '/static/media/3.5a22821f.png'),
(94, 2, 'neli', 'Aneliya', 'Anelieva', '$2b$10$1Doqa7KeyWQnTxK0epdjheSIbUxrgN1qCEreCrWnhHK0jZ/LRUywe', '2020-11-16 20:14:03', '/static/media/4.8feebb02.png'),
(95, 2, 'meto', 'Metodi', 'Metodiev', '$2b$10$5pSiNSE0nI.72E4e3tR.qOKJkGjv2CyxR8v.pplH7.wAarh75MqLu', '2020-11-16 20:14:44', '/static/media/5.450c843e.png'),
(96, 2, 'valyo', 'Valentin', 'Valentinov', '$2b$10$8wuyfg7onjSIdHK4G5UmfOp2FX1uJmDtxlEkQjnLjJuiI7Fug4fWq', '2020-11-16 20:15:20', '/static/media/6.ac16d7d0.png'),
(97, 2, 'anji', 'Anjela', 'Anjelova', '$2b$10$4NAKU7cSOTm/PlfiNmyLy.5yvdC0xxJFLxXpBmw.dfUm9uzAQzubW', '2020-11-16 20:15:36', '/static/media/7.9354a63e.png'),
(98, 2, 'kosyo', 'Kosta', 'Kostov', '$2b$10$ddci28gvWNWpwfno4qXp.uW583do/APa6OjXNnTMgZ.pKmyq0UhZe', '2020-11-16 20:16:36', '/static/media/8.eafdff08.png'),
(99, 2, 'minko', 'Minko', 'Minkov', '$2b$10$xuUe8oBOlIxTtDE93M23L.I7YkL1mGYzxRkX/XtbeP32neagfe0f6', '2020-11-16 20:16:53', '/static/media/9.3e9903d5.png'),
(100, 2, 'nevi', 'Nevena', 'Nevenova', '$2b$10$bqiSr9/M04YyeEDOTbR4/.dqbgNjgpVCiGvocTL/i.F.UvA2D/cUi', '2020-11-16 20:17:37', '/static/media/10.decf6048.png');




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
(1, 21, 1, '2020-11-04 12:34:38', '2020-11-04 12:44:38', 4),
(2, 22, 1, '2020-11-04 12:25:33', '2020-11-04 12:45:33', 2),
(3, 22, 2, '2020-11-06 17:22:32', '2020-11-06 17:24:32', 3);


COMMIT;
