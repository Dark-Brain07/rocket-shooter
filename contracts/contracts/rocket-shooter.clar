;; Rocket Shooter - Leaderboard Contract (Stacks Mainnet)
;; Stores player scores and maintains a top-10 leaderboard

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant err-score-zero (err u100))
(define-constant err-not-authorized (err u101))

;; Data Variables
(define-data-var total-players uint u0)

;; Player stats map
(define-map players principal {
    score: uint,
    total-games: uint,
    timestamp: uint
})

;; Leaderboard - 10 slots stored individually for Clarity compatibility
(define-map leaderboard uint {
    player: principal,
    score: uint,
    timestamp: uint
})

;; ── Read-Only Functions ──

(define-read-only (get-player-stats (player principal))
    (default-to { score: u0, total-games: u0, timestamp: u0 }
        (map-get? players player))
)

(define-read-only (get-player-score (player principal))
    (get score (get-player-stats player))
)

(define-read-only (get-total-players)
    (var-get total-players)
)

(define-read-only (get-leaderboard-entry (position uint))
    (default-to { player: CONTRACT-OWNER, score: u0, timestamp: u0 }
        (map-get? leaderboard position))
)

(define-read-only (get-player-position (player principal))
    (if (is-eq (get player (get-leaderboard-entry u0)) player) u1
    (if (is-eq (get player (get-leaderboard-entry u1)) player) u2
    (if (is-eq (get player (get-leaderboard-entry u2)) player) u3
    (if (is-eq (get player (get-leaderboard-entry u3)) player) u4
    (if (is-eq (get player (get-leaderboard-entry u4)) player) u5
    (if (is-eq (get player (get-leaderboard-entry u5)) player) u6
    (if (is-eq (get player (get-leaderboard-entry u6)) player) u7
    (if (is-eq (get player (get-leaderboard-entry u7)) player) u8
    (if (is-eq (get player (get-leaderboard-entry u8)) player) u9
    (if (is-eq (get player (get-leaderboard-entry u9)) player) u10
    u0))))))))))
)

;; ── Public Functions ──

;; Submit a score - updates player stats and leaderboard
(define-public (submit-score (score uint))
    (let (
        (player tx-sender)
        (existing (get-player-stats player))
        (current-high (get score existing))
        (games (get total-games existing))
        (now block-height)
    )
        ;; Score must be positive
        (asserts! (> score u0) err-score-zero)

        ;; If first game, increment total players
        (if (is-eq games u0)
            (var-set total-players (+ (var-get total-players) u1))
            true
        )

        ;; Update player stats (always record highest score)
        (map-set players player {
            score: (if (> score current-high) score current-high),
            total-games: (+ games u1),
            timestamp: now
        })

        ;; Print event
        (print { event: "score-submitted", player: player, score: score })

        ;; Update leaderboard if score qualifies
        (update-leaderboard player score now)

        (ok true)
    )
)

;; ── Private: Leaderboard Update ──

(define-private (update-leaderboard (player principal) (score uint) (ts uint))
    (let (
        (s0 (get score (get-leaderboard-entry u0)))
        (s1 (get score (get-leaderboard-entry u1)))
        (s2 (get score (get-leaderboard-entry u2)))
        (s3 (get score (get-leaderboard-entry u3)))
        (s4 (get score (get-leaderboard-entry u4)))
        (s5 (get score (get-leaderboard-entry u5)))
        (s6 (get score (get-leaderboard-entry u6)))
        (s7 (get score (get-leaderboard-entry u7)))
        (s8 (get score (get-leaderboard-entry u8)))
        (s9 (get score (get-leaderboard-entry u9)))
        (entry { player: player, score: score, timestamp: ts })
    )
        (if (> score s0) (begin (shift-down u9) (shift-down u8) (shift-down u7) (shift-down u6) (shift-down u5) (shift-down u4) (shift-down u3) (shift-down u2) (shift-down u1) (map-set leaderboard u0 entry) true)
        (if (> score s1) (begin (shift-down u9) (shift-down u8) (shift-down u7) (shift-down u6) (shift-down u5) (shift-down u4) (shift-down u3) (shift-down u2) (map-set leaderboard u1 entry) true)
        (if (> score s2) (begin (shift-down u9) (shift-down u8) (shift-down u7) (shift-down u6) (shift-down u5) (shift-down u4) (shift-down u3) (map-set leaderboard u2 entry) true)
        (if (> score s3) (begin (shift-down u9) (shift-down u8) (shift-down u7) (shift-down u6) (shift-down u5) (shift-down u4) (map-set leaderboard u3 entry) true)
        (if (> score s4) (begin (shift-down u9) (shift-down u8) (shift-down u7) (shift-down u6) (shift-down u5) (map-set leaderboard u4 entry) true)
        (if (> score s5) (begin (shift-down u9) (shift-down u8) (shift-down u7) (shift-down u6) (map-set leaderboard u5 entry) true)
        (if (> score s6) (begin (shift-down u9) (shift-down u8) (shift-down u7) (map-set leaderboard u6 entry) true)
        (if (> score s7) (begin (shift-down u9) (shift-down u8) (map-set leaderboard u7 entry) true)
        (if (> score s8) (begin (shift-down u9) (map-set leaderboard u8 entry) true)
        (if (> score s9) (begin (map-set leaderboard u9 entry) true)
        false))))))))))
    )
)

;; Shift a leaderboard entry down by one position
(define-private (shift-down (pos uint))
    (if (> pos u0)
        (map-set leaderboard pos (get-leaderboard-entry (- pos u1)))
        true
    )
)
