CREATE TABLE IF NOT EXISTS `list` (
  `idlist` VARCHAR(6) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastedited` DATETIME(6) NOT NULL,
  `data` MEDIUMTEXT NULL,
  PRIMARY KEY (`idlist`))
ENGINE = InnoDB;