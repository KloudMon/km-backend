package initializers

import "kloudmon/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}
