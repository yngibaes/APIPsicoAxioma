USE psicoaxioma; 
CREATE TABLE `user` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(64) NOT NULL,
  `userPhone` varchar(10) NOT NULL,
  `userEmail` varchar(64) NOT NULL,
  `userPhoto` TEXT NOT NULL
);

CREATE TABLE `diary` (
  `diaryID` int NOT NULL AUTO_INCREMENT,
  `diaryTitle` varchar(100) NOT NULL,
  `diaryContent` TEXT NOT NULL,
  `diaryDate` DATE NOT NULL,
  `userFK` int
);

CREATE TABLE `resultScanner` (
  `resultScannerID` int NOT NULL AUTO_INCREMENT,
  `resultScanner` JSON NOT NULL,
  `userFK` int NOT NULL
);

CREATE TABLE `resultDiary` (
  `resultDiaryID` int NOT NULL AUTO_INCREMENT,
  `resultDiary` JSON NOT NULL,
  `diaryFK` int NOT NULL
);

ALTER TABLE diary
ADD FOREIGN KEY (userFk) REFERENCES user(userID);
ALTER TABLE resultScanner
ADD FOREIGN KEY (userFk) REFERENCES user(userID);

ALTER TABLE resultDiary
ADD FOREIGN KEY (diaryFK) REFERENCES diary(diaryID);
