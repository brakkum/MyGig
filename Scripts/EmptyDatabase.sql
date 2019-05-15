-- noinspection SqlDialectInspectionForFile

CREATE TABLE `Ensembles` (
    `EnsembleId` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(500) NOT NULL,
    `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `Status` int NOT NULL DEFAULT 1,
    CONSTRAINT `PK_Ensembles` PRIMARY KEY (`EnsembleId`)
) ENGINE=InnoDB;

CREATE TABLE `Users` (
    `UserId` int NOT NULL AUTO_INCREMENT,
    `FirstName` varchar(20) NOT NULL,
    `LastName` varchar(20) NOT NULL,
    `Password` longtext NOT NULL,
    `Email` varchar(50) NOT NULL,
    `PhotoUrl` longtext NULL,
    `Status` int NOT NULL DEFAULT 1,
    `JoinedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT `PK_Users` PRIMARY KEY (`UserId`)
) ENGINE=InnoDB;

CREATE TABLE `Connections` (
    `ConnectionId` int NOT NULL AUTO_INCREMENT,
    `UserIdRequester` int NOT NULL,
    `UserIdRecipient` int NOT NULL,
    `Status` int NOT NULL DEFAULT 0,
    `Timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `Text` longtext NULL,
    `ConfirmedAt` datetime NULL,
    CONSTRAINT `PK_Connections` PRIMARY KEY (`ConnectionId`),
    CONSTRAINT `FK_Connections_UserIdRecipient_Ref_Users_UserId` FOREIGN KEY (`UserIdRecipient`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE,
    CONSTRAINT `FK_Connections_UserIdRequester_Ref_Users_UserId` FOREIGN KEY (`UserIdRequester`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `EnsembleComments` (
    `EnsembleCommentId` int NOT NULL AUTO_INCREMENT,
    `Text` varchar(500) NOT NULL,
    `UserId` int NOT NULL,
    `EnsembleId` int NOT NULL,
    `Timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    CONSTRAINT `PK_EnsembleComments` PRIMARY KEY (`EnsembleCommentId`),
    CONSTRAINT `FK_EnsembleComments_EnsembleId_Ref_Ensembles_EnsembleId` FOREIGN KEY (`EnsembleId`) REFERENCES `Ensembles` (`EnsembleId`) ON DELETE CASCADE,
    CONSTRAINT `FK_EnsembleComments_UserId_Ref_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `EnsembleMembers` (
    `EnsembleMemberId` int NOT NULL AUTO_INCREMENT,
    `UserIdRequester` int NOT NULL,
    `UserIdRecipient` int NOT NULL,
    `Status` int NOT NULL DEFAULT 0,
    `Timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `Text` longtext NULL,
    `ConfirmedAt` datetime NULL,
    `EnsembleId` int NOT NULL,
    CONSTRAINT `PK_EnsembleMembers` PRIMARY KEY (`EnsembleMemberId`),
    CONSTRAINT `FK_EnsembleMembers_EnsembleId_Ref_Ensembles_EnsembleId` FOREIGN KEY (`EnsembleId`) REFERENCES `Ensembles` (`EnsembleId`) ON DELETE CASCADE,
    CONSTRAINT `FK_EnsembleMembers_UserIdRecipient_Ref_Users_UserId` FOREIGN KEY (`UserIdRecipient`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE,
    CONSTRAINT `FK_EnsembleMembers_UserIdRequester_Ref_Users_UserId` FOREIGN KEY (`UserIdRequester`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `EnsembleModerators` (
    `EnsembleModeratorId` int NOT NULL AUTO_INCREMENT,
    `UserIdRequester` int NOT NULL,
    `UserIdRecipient` int NOT NULL,
    `Status` int NOT NULL DEFAULT 0,
    `Timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `Text` longtext NULL,
    `ConfirmedAt` datetime NULL,
    `EnsembleId` int NOT NULL,
    CONSTRAINT `PK_EnsembleModerators` PRIMARY KEY (`EnsembleModeratorId`),
    CONSTRAINT `FK_EnsembleModerators_EnsembleId_Ref_Ensembles_EnsembleId` FOREIGN KEY (`EnsembleId`) REFERENCES `Ensembles` (`EnsembleId`) ON DELETE CASCADE,
    CONSTRAINT `FK_EnsembleModerators_UserIdRecipient_Ref_Users_UserId` FOREIGN KEY (`UserIdRecipient`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE,
    CONSTRAINT `FK_EnsembleModerators_UserIdRequester_Ref_Users_UserId` FOREIGN KEY (`UserIdRequester`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `Events` (
    `EventId` int NOT NULL AUTO_INCREMENT,
    `Name` varchar(50) NOT NULL,
    `DateAndTime` datetime NOT NULL,
    `Location` varchar(50) NOT NULL,
    `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `CreatedByUserId` int NOT NULL,
    CONSTRAINT `PK_Events` PRIMARY KEY (`EventId`),
    CONSTRAINT `FK_Events_CreatedByUserId_Ref_Users_UserId` FOREIGN KEY (`CreatedByUserId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `Bookings` (
    `BookingId` int NOT NULL AUTO_INCREMENT,
    `UserIdRequester` int NOT NULL,
    `UserIdRecipient` int NOT NULL,
    `Status` int NOT NULL DEFAULT 0,
    `Timestamp` datetime NOT NULL,
    `Text` longtext NULL,
    `ConfirmedAt` datetime NULL,
    `EventId` int NOT NULL,
    `EnsembleId` int NOT NULL,
    `Setlist` longtext NULL,
    CONSTRAINT `PK_Bookings` PRIMARY KEY (`BookingId`),
    CONSTRAINT `FK_Bookings_EnsembleId_Ref_Ensembles_EnsembleId` FOREIGN KEY (`EnsembleId`) REFERENCES `Ensembles` (`EnsembleId`) ON DELETE CASCADE,
    CONSTRAINT `FK_Bookings_EventId_Ref_Events_EventId` FOREIGN KEY (`EventId`) REFERENCES `Events` (`EventId`) ON DELETE CASCADE,
    CONSTRAINT `FK_Bookings_UserIdRecipient_Ref_Users_UserId` FOREIGN KEY (`UserIdRecipient`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE,
    CONSTRAINT `FK_Bookings_UserIdRequester_Ref_Users_UserId` FOREIGN KEY (`UserIdRequester`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `EventComments` (
    `EventCommentId` int NOT NULL AUTO_INCREMENT,
    `Text` varchar(500) NOT NULL,
    `Timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `UserId` int NOT NULL,
    `EventId` int NOT NULL,
    CONSTRAINT `PK_EventComments` PRIMARY KEY (`EventCommentId`),
    CONSTRAINT `FK_EventComments_EventId_Ref_Events_EventId` FOREIGN KEY (`EventId`) REFERENCES `Events` (`EventId`) ON DELETE CASCADE,
    CONSTRAINT `FK_EventComments_UserId_Ref_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `EventModerators` (
    `EventModeratorId` int NOT NULL AUTO_INCREMENT,
    `UserIdRequester` int NOT NULL,
    `UserIdRecipient` int NOT NULL,
    `Status` int NOT NULL DEFAULT 0,
    `Timestamp` datetime NOT NULL,
    `Text` longtext NULL,
    `ConfirmedAt` datetime NULL,
    `EventId` int NOT NULL,
    CONSTRAINT `PK_EventModerators` PRIMARY KEY (`EventModeratorId`),
    CONSTRAINT `FK_EventModerators_EventId_Ref_Users_UserId` FOREIGN KEY (`EventId`) REFERENCES `Events` (`EventId`) ON DELETE CASCADE,
    CONSTRAINT `FK_EventModerators_UserIdRecipient_Ref_Users_UserId` FOREIGN KEY (`UserIdRecipient`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE,
    CONSTRAINT `FK_EventModerators_UserIdRequester_Ref_Users_UserId` FOREIGN KEY (`UserIdRequester`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `Notifications` (
    `NotificationId` int NOT NULL AUTO_INCREMENT,
    `Text` longtext NOT NULL,
    `Url` longtext NOT NULL,
    `Status` int NOT NULL DEFAULT 0,
    `Timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    `UserId` int NOT NULL,
    CONSTRAINT `PK_Notifications` PRIMARY KEY (`NotificationId`),
    CONSTRAINT `FK_Notifications_UserId_Ref_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`UserId`) ON DELETE CASCADE
);

CREATE INDEX `IX_Bookings_EnsembleId` ON `Bookings` (`EnsembleId`);

CREATE INDEX `IX_Bookings_EventId` ON `Bookings` (`EventId`);

CREATE INDEX `IX_Bookings_UserIdRecipient` ON `Bookings` (`UserIdRecipient`);

CREATE INDEX `IX_Bookings_UserIdRequester` ON `Bookings` (`UserIdRequester`);

CREATE INDEX `IX_Connections_UserIdRecipient` ON `Connections` (`UserIdRecipient`);

CREATE INDEX `IX_Connections_UserIdRequester` ON `Connections` (`UserIdRequester`);

CREATE INDEX `IX_EnsembleComments_EnsembleId` ON `EnsembleComments` (`EnsembleId`);

CREATE INDEX `IX_EnsembleComments_UserId` ON `EnsembleComments` (`UserId`);

CREATE INDEX `IX_EnsembleMembers_EnsembleId` ON `EnsembleMembers` (`EnsembleId`);

CREATE INDEX `IX_EnsembleMembers_UserIdRecipient` ON `EnsembleMembers` (`UserIdRecipient`);

CREATE INDEX `IX_EnsembleMembers_UserIdRequester` ON `EnsembleMembers` (`UserIdRequester`);

CREATE INDEX `IX_EnsembleModerators_EnsembleId` ON `EnsembleModerators` (`EnsembleId`);

CREATE INDEX `IX_EnsembleModerators_UserIdRecipient` ON `EnsembleModerators` (`UserIdRecipient`);

CREATE INDEX `IX_EnsembleModerators_UserIdRequester` ON `EnsembleModerators` (`UserIdRequester`);

CREATE INDEX `IX_EventComments_EventId` ON `EventComments` (`EventId`);

CREATE INDEX `IX_EventComments_UserId` ON `EventComments` (`UserId`);

CREATE INDEX `IX_EventModerators_EventId` ON `EventModerators` (`EventId`);

CREATE INDEX `IX_EventModerators_UserIdRecipient` ON `EventModerators` (`UserIdRecipient`);

CREATE INDEX `IX_EventModerators_UserIdRequester` ON `EventModerators` (`UserIdRequester`);

CREATE INDEX `IX_Events_CreatedByUserId` ON `Events` (`CreatedByUserId`);

CREATE INDEX `IX_Notifications_UserId` ON `Notifications` (`UserId`);
