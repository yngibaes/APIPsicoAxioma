USE psicoaxioma; 
CREATE TABLE `user` (
  `userID` int NOT NULL,
  `userName` varchar(64) NOT NULL,
  `userPhone` varchar(10) NOT NULL,
  `userEmail` varchar(64) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userPhoto` TEXT NOT NULL
);

CREATE TABLE `diary` (
  `diaryID` int NOT NULL,
  `diaryTitle` varchar(100) NOT NULL,
  `diaryContent` TEXT NOT NULL,
  `diaryDate` DATE NOT NULL,
  `userFK` int
);

CREATE TABLE `resultScanner` (
  `resultScannerID` int NOT NULL,
  `resultScanner` JSON NOT NULL,
  `userFK` int NOT NULL
);

CREATE TABLE `resultDiary` (
  `resultDiaryID` int NOT NULL,
  `resultDiary` JSON NOT NULL,
  `diaryFK` int NOT NULL
);

ALTER TABLE diary
ADD FOREIGN KEY (userFk) REFERENCES user(userID);
ALTER TABLE resultScanner
ADD FOREIGN KEY (userFk) REFERENCES user(userID);

ALTER TABLE resultDiary
ADD FOREIGN KEY (diaryFK) REFERENCES diary(diaryID);

INSERT INTO `user` (`userID`, `userName`, `userPhone`, `userEmail`, `userPassword`, `userPhoto`) VALUES
(1, 'Ana María Vargas Amaya', '3227572108', 'Mariasssa21@gmail.com', '123456', 'https://i.pinimg.com/736x/a0/ea/df/a0eadf3ce30832eb91bbe3a2d059cb16.jpg');