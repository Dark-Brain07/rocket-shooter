;; Rocket Shooter Game Contract
;; Records player scores on Stacks blockchain

(define-constant ADMIN tx-sender)
(define-constant ERR-ZERO-SCORE (err u100))

(define-data-var player-count uint u0)

(define-map scores principal { high-score: uint, games-played: uint, last-played: uint })

(define-read-only (get-score (who principal))
    (default-to { high-score: u0, games-played: u0, last-played: u0 } (map-get? scores who))
)

(define-read-only (get-high-score (who principal))
    (get high-score (get-score who))
)

(define-read-only (get-games-played (who principal))
    (get games-played (get-score who))
)

(define-read-only (get-player-count)
    (var-get player-count)
)

(define-public (submit-score (value uint))
    (let (
        (caller tx-sender)
        (current (get-score caller))
        (old-high (get high-score current))
        (old-games (get games-played current))
    )
        (asserts! (> value u0) ERR-ZERO-SCORE)
        (if (is-eq old-games u0)
            (var-set player-count (+ (var-get player-count) u1))
            true
        )
        (map-set scores caller {
            high-score: (if (> value old-high) value old-high),
            games-played: (+ old-games u1),
            last-played: stacks-block-height
        })
        (print { action: "score", player: caller, score: value })
        (ok true)
    )
)
