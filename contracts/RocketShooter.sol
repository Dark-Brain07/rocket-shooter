// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title RocketShooter Leaderboard
 * @notice Gas-optimized leaderboard contract for Rocket Shooter game
 * @dev Stores only top 10 scores to minimize gas costs
 * @dev DEPLOYED AT: 0x951634B88938D2Cdd72149dB57C198Ea835AAf20
 */
contract RocketShooter {
    
    struct Player {
        address wallet;
        uint96 score;
        uint32 timestamp;
        uint32 totalGames;
    }
    
    struct LeaderboardEntry {
        address player;
        uint96 score;
        uint32 timestamp;
    }
    
    LeaderboardEntry[10] public leaderboard;
    
    mapping(address => Player) public players;
    
    uint256 public totalPlayers;
    
    event ScoreSubmitted(address indexed player, uint96 score, uint32 timestamp);
    event NewTopScore(address indexed player, uint96 score, uint8 position);
    
    function submitScore(uint96 _score) external {
        require(_score > 0, "Score must be positive");
        
        Player storage player = players[msg.sender];
        
        if (player.totalGames == 0) {
            totalPlayers++;
        }
        
        player.wallet = msg.sender;
        player.totalGames++;
        player.timestamp = uint32(block.timestamp);
        
        if (_score > player.score) {
            player.score = _score;
        }
        
        emit ScoreSubmitted(msg.sender, _score, uint32(block.timestamp));
        
        _updateLeaderboard(msg.sender, _score);
    }
    
    function _updateLeaderboard(address _player, uint96 _score) internal {
        int8 position = -1;
        
        for (uint8 i = 0; i < 10; i++) {
            if (_score > leaderboard[i].score) {
                position = int8(i);
                break;
            }
        }
        
        if (position >= 0) {
            for (uint8 i = 9; i > uint8(position); i--) {
                leaderboard[i] = leaderboard[i - 1];
            }
            
            leaderboard[uint8(position)] = LeaderboardEntry({
                player: _player,
                score: _score,
                timestamp: uint32(block.timestamp)
            });
            
            emit NewTopScore(_player, _score, uint8(position) + 1);
        }
    }
    
    function getLeaderboard() external view returns (LeaderboardEntry[10] memory) {
        return leaderboard;
    }
    
    function getPlayerStats(address _player) external view returns (
        uint96 score,
        uint32 totalGames,
        uint32 timestamp
    ) {
        Player memory player = players[_player];
        return (player.score, player.totalGames, player.timestamp);
    }
    
    function getPlayerPosition(address _player) external view returns (uint8 position) {
        for (uint8 i = 0; i < 10; i++) {
            if (leaderboard[i].player == _player) {
                return i + 1;
            }
        }
        return 0;
    }
    
    function getTopScores(uint8 _count) external view returns (
        address[] memory players_,
        uint96[] memory scores
    ) {
        require(_count <= 10, "Max 10 entries");
        
        players_ = new address[](_count);
        scores = new uint96[](_count);
        
        for (uint8 i = 0; i < _count; i++) {
            players_[i] = leaderboard[i].player;
            scores[i] = leaderboard[i].score;
        }
        
        return (players_, scores);
    }
}
