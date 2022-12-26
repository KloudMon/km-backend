package initializers

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {

	DbHost := os.Getenv("DBHOST")
	DbUser := os.Getenv("DBUSER")
	DbPassword := os.Getenv("DBPASSWORD")
	DbPort := os.Getenv("DBPORT")
	DbName := os.Getenv("DBNAME")

	var err error

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", DbHost, DbUser, DbPassword, DbName, DbPort)
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to DB")
	}

}
