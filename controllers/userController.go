package controllers

import (
	"kloudmon/initializers"
	"kloudmon/models"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	var body struct {
		Email    string
		Username string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "Failed to read body"})
		return
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "Failed to hash password"})
		return
	}

	user := models.User{Email: body.Email, Password: string(hash), Username: body.Username}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "Failed to create user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{})

}

func Login(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "Failed to read body"})
		return
	}

	var user models.User
	initializers.DB.First(&user, "email= ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "invalid email or password"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "invalid email or password"})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{"sub": user.ID, "exp": time.Now().Add(time.Hour * 24 * 30).Unix()})
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	println("token", tokenString)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": "failed to create token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": tokenString})
}
