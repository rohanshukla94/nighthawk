package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/rohanshukla94/nighthawk/internal/api"
	"github.com/rohanshukla94/nighthawk/internal/auth"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	jwt := auth.NewJWT(os.Getenv("APP_JWT_SECRET"))
	r := gin.Default()
	api.RegisterRoutes(r, jwt)

	log.Printf("AMR Nighthawk (minimal) listening on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
