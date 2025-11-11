package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/rohanshukla94/nighthawk/internal/auth"
)

type deps struct {
	jwt *auth.JWT
}

func RegisterRoutes(r *gin.Engine, jwt *auth.JWT) {
	d := &deps{jwt}

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ok": true})
	})

	v1 := r.Group("/v1")
	{
		// minimal login: accepts any clientId/password for now
		v1.POST("/auth/login", d.login)
	}
}

type loginReq struct {
	ClientID string `json:"clientId"`
	Password string `json:"password"`
	//TODO OpenBalena login add
}

func (d *deps) login(c *gin.Context) {
	var body loginReq
	if err := c.BindJSON(&body); err != nil || body.ClientID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid body"})
		return
	}
	token, _ := d.jwt.Issue(body.ClientID, map[string]any{"clientId": body.ClientID}, 24*time.Hour)
	c.JSON(http.StatusOK, gin.H{"token": token})
}
