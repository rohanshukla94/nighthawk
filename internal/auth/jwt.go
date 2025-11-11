package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWT struct{ secret []byte }

// TODO remove hard coded secret
func NewJWT(secret string) *JWT {
	if secret == "" {
		secret = "dev-secret"
	}
	return &JWT{secret: []byte(secret)}
}

func (j *JWT) Issue(subject string, claims map[string]any, ttl time.Duration) (string, error) {
	c := jwt.MapClaims{
		"sub": subject,
		"exp": time.Now().Add(ttl).Unix(),
	}
	for k, v := range claims {
		c[k] = v
	}
	tok := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	return tok.SignedString(j.secret)
}

func (j *JWT) Parse(token string) (jwt.MapClaims, error) {
	t, err := jwt.Parse(token, func(t *jwt.Token) (any, error) { return j.secret, nil })
	if err != nil || !t.Valid {
		return nil, errors.New("invalid token")
	}
	claims, ok := t.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("invalid claims")
	}
	return claims, nil
}
