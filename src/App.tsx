// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Rocket, Heart, Trophy, Wallet, X, Zap, Star } from 'lucide-react';
import { request } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';

// ── Stacks Mainnet Contract Config ──
const CONTRACT_ADDRESS = 'SP1YH5MXTJT86BZXMFA2T51JF0QVZ8XNYV33QH6MF';
const CONTRACT_NAME = 'rocket-shooter';
const FULL_CONTRACT = `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`;
const HIRO_API = 'https://api.hiro.so';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SIZE = 40;
const ENEMY_SIZE = 35;
const BULLET_SIZE = 8;
const BIRD_SIZE = 25;

const RocketShooter = () => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [walletAddress, setWalletAddress] = useState(null);
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const playerRef = useRef({ x: GAME_WIDTH / 2, y: GAME_HEIGHT - 80, speed: 5 });
  const enemiesRef = useRef([]);
  const bulletsRef = useRef([]);
  const enemyBulletsRef = useRef([]);
  const birdsRef = useRef([]);
  const particlesRef = useRef([]);
  const keysRef = useRef({});
  const touchRef = useRef({ active: false, x: 0, y: 0 });
  const lastShotRef = useRef(0);
  const gameTimeRef = useRef(0);
  const cloudRef = useRef([]);

  useEffect(() => {
    cloudRef.current = Array.from({ length: 5 }, () => ({
      x: Math.random() * GAME_WIDTH,
      y: Math.random() * GAME_HEIGHT * 0.4,
      speed: 0.2 + Math.random() * 0.3,
      size: 40 + Math.random() * 40
    }));
  }, []);

  // ── Drawing Functions (unchanged) ──

  const drawPlayer = (ctx) => {
    const { x, y } = playerRef.current;
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(x - 3, y - 20, 6, 8);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(x - 8, y - 12, 16, 12);
    ctx.fillStyle = '#0088ff';
    ctx.fillRect(x - 15, y, 8, 15);
    ctx.fillRect(x + 7, y, 8, 15);
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(x - 10, y + 15, 5, 8);
    ctx.fillRect(x + 5, y + 15, 5, 8);
    ctx.fillRect(x - 3, y + 15, 6, 10);
  };

  const drawEnemy = (ctx, enemy) => {
    const { x, y, type } = enemy;
    if (type === 'rocket') {
      ctx.fillStyle = '#ff3333';
      ctx.fillRect(x - 3, y + 15, 6, 8);
      ctx.fillStyle = '#666666';
      ctx.fillRect(x - 6, y + 8, 12, 10);
      ctx.fillStyle = '#ff9900';
      ctx.fillRect(x - 10, y, 6, 12);
      ctx.fillRect(x + 4, y, 6, 12);
    } else if (type === 'plane') {
      ctx.fillStyle = '#333333';
      ctx.fillRect(x - 15, y + 8, 30, 6);
      ctx.fillStyle = '#555555';
      ctx.fillRect(x - 8, y, 16, 8);
      ctx.fillStyle = '#999999';
      ctx.fillRect(x - 20, y + 10, 10, 3);
      ctx.fillRect(x + 10, y + 10, 10, 3);
    }
  };

  const drawBird = (ctx, bird) => {
    const { x, y, frame } = bird;
    const wingOffset = Math.sin(frame * 0.3) * 3;
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(x - 2, y, 4, 6);
    ctx.fillStyle = '#654321';
    ctx.fillRect(x - 1, y - 3, 2, 3);
    ctx.fillStyle = '#333333';
    ctx.fillRect(x - 8, y + 2 + wingOffset, 6, 2);
    ctx.fillRect(x + 2, y + 2 + wingOffset, 6, 2);
  };

  const drawBullet = (ctx, bullet) => {
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(bullet.x - 2, bullet.y - 4, 4, 8);
    ctx.fillStyle = '#ffaa00';
    ctx.fillRect(bullet.x - 1, bullet.y - 2, 2, 4);
  };

  const drawEnemyBullet = (ctx, bullet) => {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(bullet.x - 2, bullet.y - 4, 4, 8);
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(bullet.x - 1, bullet.y - 2, 2, 4);
  };

  const drawExplosion = (ctx, particle) => {
    ctx.fillStyle = `rgba(255, ${150 - particle.life * 5}, 0, ${particle.life / 30})`;
    ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size);
  };

  const drawBackground = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(0.5, '#3b82f6');
    gradient.addColorStop(1, '#93c5fd');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    cloudRef.current.forEach(cloud => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 0.7, cloud.y, cloud.size * 0.8, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 1.3, cloud.y, cloud.size * 0.7, 0, Math.PI * 2);
      ctx.fill();
      
      cloud.x += cloud.speed;
      if (cloud.x > GAME_WIDTH + cloud.size * 2) {
        cloud.x = -cloud.size * 2;
        cloud.y = Math.random() * GAME_HEIGHT * 0.4;
      }
    });
  };

  // ── Game Mechanics (unchanged) ──

  const spawnEnemy = () => {
    const type = Math.random() > 0.5 ? 'rocket' : 'plane';
    const speed = 1 + level * 0.3 + Math.random();
    enemiesRef.current.push({
      x: Math.random() * (GAME_WIDTH - 40) + 20,
      y: -30,
      type,
      speed,
      health: type === 'plane' ? 2 : 1,
      lastShot: 0
    });
  };

  const spawnBird = () => {
    birdsRef.current.push({
      x: Math.random() * (GAME_WIDTH - 40) + 20,
      y: -20,
      speed: 0.8 + Math.random() * 0.5,
      frame: 0
    });
  };

  const shootBullet = () => {
    const now = Date.now();
    if (now - lastShotRef.current > 200) {
      bulletsRef.current.push({
        x: playerRef.current.x,
        y: playerRef.current.y - 20,
        speed: 8
      });
      lastShotRef.current = now;
    }
  };

  const enemyShoot = (enemy) => {
    const now = Date.now();
    if (now - enemy.lastShot > 1500) {
      enemyBulletsRef.current.push({
        x: enemy.x,
        y: enemy.y + 20,
        speed: 4
      });
      enemy.lastShot = now;
    }
  };

  const createExplosion = (x, y) => {
    for (let i = 0; i < 15; i++) {
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        life: 30,
        size: 4 + Math.random() * 4
      });
    }
  };

  const checkCollision = (obj1, obj2, size1, size2) => {
    return Math.abs(obj1.x - obj2.x) < (size1 + size2) / 2 &&
           Math.abs(obj1.y - obj2.y) < (size1 + size2) / 2;
  };

  const updateGame = () => {
    const player = playerRef.current;
    
    if (keysRef.current['w'] || keysRef.current['ArrowUp']) player.y = Math.max(GAME_HEIGHT / 2, player.y - player.speed);
    if (keysRef.current['s'] || keysRef.current['ArrowDown']) player.y = Math.min(GAME_HEIGHT - 30, player.y + player.speed);
    if (keysRef.current['a'] || keysRef.current['ArrowLeft']) player.x = Math.max(20, player.x - player.speed);
    if (keysRef.current['d'] || keysRef.current['ArrowRight']) player.x = Math.min(GAME_WIDTH - 20, player.x + player.speed);
    
    if (touchRef.current.active) {
      const dx = touchRef.current.x - player.x;
      const dy = touchRef.current.y - player.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 10) {
        player.x += (dx / dist) * player.speed;
        player.y += (dy / dist) * player.speed;
        player.x = Math.max(20, Math.min(GAME_WIDTH - 20, player.x));
        player.y = Math.max(GAME_HEIGHT / 2, Math.min(GAME_HEIGHT - 30, player.y));
      }
    }
    
    shootBullet();
    
    bulletsRef.current = bulletsRef.current.filter(bullet => {
      bullet.y -= bullet.speed;
      return bullet.y > -10;
    });

    enemyBulletsRef.current = enemyBulletsRef.current.filter(bullet => {
      bullet.y += bullet.speed;
      
      if (bullet.y > GAME_HEIGHT) return false;
      
      if (checkCollision(player, bullet, PLAYER_SIZE, BULLET_SIZE)) {
        setLives(prev => prev - 1);
        createExplosion(bullet.x, bullet.y);
        return false;
      }
      
      return true;
    });
    
    enemiesRef.current = enemiesRef.current.filter(enemy => {
      enemy.y += enemy.speed;
      
      if (enemy.y > 50 && enemy.y < GAME_HEIGHT - 100) {
        enemyShoot(enemy);
      }
      
      if (enemy.y > GAME_HEIGHT) return false;
      if (checkCollision(player, enemy, PLAYER_SIZE, ENEMY_SIZE)) {
        setLives(prev => prev - 1);
        createExplosion(enemy.x, enemy.y);
        return false;
      }
      return true;
    });
    
    birdsRef.current = birdsRef.current.filter(bird => {
      bird.y += bird.speed;
      bird.frame++;
      if (bird.y > GAME_HEIGHT) return false;
      if (checkCollision(player, bird, PLAYER_SIZE, BIRD_SIZE)) {
        setScore(prev => Math.max(0, prev - 15));
        createExplosion(bird.x, bird.y);
        return false;
      }
      return true;
    });
    
    bulletsRef.current = bulletsRef.current.filter(bullet => {
      let hit = false;
      
      enemiesRef.current = enemiesRef.current.filter(enemy => {
        if (checkCollision(bullet, enemy, BULLET_SIZE, ENEMY_SIZE)) {
          enemy.health--;
          hit = true;
          if (enemy.health <= 0) {
            setScore(prev => prev + 10);
            createExplosion(enemy.x, enemy.y);
            return false;
          }
        }
        return true;
      });
      
      birdsRef.current = birdsRef.current.filter(bird => {
        if (checkCollision(bullet, bird, BULLET_SIZE, BIRD_SIZE)) {
          setScore(prev => Math.max(0, prev - 15));
          createExplosion(bird.x, bird.y);
          hit = true;
          return false;
        }
        return true;
      });
      
      return !hit;
    });
    
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life--;
      return particle.life > 0;
    });
    
    gameTimeRef.current++;
    if (gameTimeRef.current % 60 === 0) spawnEnemy();
    if (gameTimeRef.current % 180 === 0) spawnBird();
    if (gameTimeRef.current % 2100 === 0) setLevel(prev => prev + 1);
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    updateGame();
    drawBackground(ctx);
    particlesRef.current.forEach(p => drawExplosion(ctx, p));
    birdsRef.current.forEach(b => drawBird(ctx, b));
    enemiesRef.current.forEach(e => drawEnemy(ctx, e));
    enemyBulletsRef.current.forEach(b => drawEnemyBullet(ctx, b));
    bulletsRef.current.forEach(b => drawBullet(ctx, b));
    drawPlayer(ctx);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, 1000 / 60);
      return () => clearInterval(gameLoopRef.current);
    }
  }, [gameState]);

  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setGameState('gameover');
      if (score > highScore) setHighScore(score);
    }
  }, [lives]);

  useEffect(() => {
    const handleKeyDown = (e) => { keysRef.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e) => { keysRef.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleTouchStart = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = GAME_WIDTH / rect.width;
    const scaleY = GAME_HEIGHT / rect.height;
    touchRef.current = {
      active: true,
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY
    };
  };

  const handleTouchMove = (e) => {
    if (!touchRef.current.active) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = GAME_WIDTH / rect.width;
    const scaleY = GAME_HEIGHT / rect.height;
    touchRef.current.x = (e.touches[0].clientX - rect.left) * scaleX;
    touchRef.current.y = (e.touches[0].clientY - rect.top) * scaleY;
  };

  const handleTouchEnd = () => {
    touchRef.current.active = false;
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setLevel(1);
    playerRef.current = { x: GAME_WIDTH / 2, y: GAME_HEIGHT - 80, speed: 5 };
    enemiesRef.current = [];
    bulletsRef.current = [];
    enemyBulletsRef.current = [];
    birdsRef.current = [];
    particlesRef.current = [];
    gameTimeRef.current = 0;
  };

  // ── Stacks Wallet Connection ──
  const connectWallet = async () => {
    try {
      const response = await request('stx_getAddresses');
      if (response && response.addresses && response.addresses.length > 0) {
        const stxAddr = response.addresses.find(a => a.symbol === 'STX') || response.addresses[0];
        const addr = stxAddr.address;
        setWalletAddress(addr);
        setShowWalletMenu(false);
        localStorage.setItem('stx-address', addr);
        await loadPlayerData(addr);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Failed to connect Stacks wallet. Install Leather or Xverse.');
    }
  };

  // ── Load Player Data from Hiro API ──
  const loadPlayerData = async (address) => {
    try {
      const url = `${HIRO_API}/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/get-player-stats`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: address,
          arguments: [`0x0616${address}`]
        })
      });

      if (!res.ok) return;
      const data = await res.json();
      
      if (data.okay && data.result) {
        // Parse the Clarity tuple response
        // For now, use localStorage as fallback
        const stored = localStorage.getItem(`rs-highscore-${address}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          setHighScore(parsed.score || 0);
          setTotalGames(parsed.games || 0);
        }
      }
    } catch (error) {
      console.error('Failed to load player data:', error);
      // Fallback to local storage
      const stored = localStorage.getItem(`rs-highscore-${address}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHighScore(parsed.score || 0);
        setTotalGames(parsed.games || 0);
      }
    }
  };

  // ── Submit Score to Stacks Mainnet ──
  const submitScoreToBlockchain = async () => {
    if (!walletAddress) {
      alert('Connect your Stacks wallet first!');
      return;
    }
    if (score <= 0) {
      alert('Score must be greater than 0!');
      return;
    }
    try {
      setSubmitting(true);
      const response = await request('stx_callContract', {
        contract: FULL_CONTRACT,
        functionName: 'submit-score',
        functionArgs: [uintCV(score)],
        postConditionMode: 'allow',
      });

      const txId = response?.txid || response?.txId;
      if (txId) {
        // Save locally as well
        const stored = localStorage.getItem(`rs-highscore-${walletAddress}`);
        const existing = stored ? JSON.parse(stored) : { score: 0, games: 0 };
        localStorage.setItem(`rs-highscore-${walletAddress}`, JSON.stringify({
          score: Math.max(score, existing.score),
          games: existing.games + 1
        }));
        setTotalGames(prev => prev + 1);
        if (score > highScore) setHighScore(score);

        alert(`Score submitted to Stacks! 🚀\nTx: ${txId.substring(0, 12)}...`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit score: ' + (error.message || 'Unknown error'));
    } finally {
      setSubmitting(false);
    }
  };

  // Check for saved wallet on load
  useEffect(() => {
    const saved = localStorage.getItem('stx-address');
    if (saved) {
      setWalletAddress(saved);
      loadPlayerData(saved);
    }
  }, []);

  // ── UI (wallet menu updated for Stacks) ──

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white flex flex-col items-center justify-center p-4">
      {gameState === 'menu' && (
        <div className="max-w-2xl w-full space-y-6 animate-fade-in">
          <div className="text-center bg-black/40 backdrop-blur-sm p-8 rounded-2xl border-4 border-yellow-500 shadow-2xl">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center animate-bounce">
                <Rocket className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">ROCKET SHOOTER</h1>
            <p className="text-xl text-blue-300 mb-1">Defend the Skies!</p>
            <p className="text-sm text-purple-400 mb-4">Powered by Stacks Blockchain</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-900/50 p-4 rounded-xl border-2 border-blue-400">
                <Trophy className="w-6 h-6 mx-auto mb-1 text-yellow-400" />
                <p className="text-sm text-blue-300">High Score</p>
                <p className="text-2xl font-bold text-yellow-400">{highScore}</p>
              </div>
              <div className="bg-green-900/50 p-4 rounded-xl border-2 border-green-400">
                <Star className="w-6 h-6 mx-auto mb-1 text-green-400" />
                <p className="text-sm text-green-300">Games</p>
                <p className="text-3xl font-bold text-green-400">{totalGames}</p>
              </div>
            </div>
            <div className="bg-purple-900/50 p-4 rounded-xl border-2 border-purple-400 mb-6">
              <p className="text-sm text-purple-200"><strong>Controls:</strong> WASD / Arrow Keys / Touch</p>
              <p className="text-xs text-purple-300 mt-1">Destroy enemies: +10 pts | Hit bird: -15 pts | 3 Lives</p>
            </div>
            <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl border-4 border-green-300 font-bold text-2xl shadow-lg transform hover:scale-105 transition-all mb-4">
              🚀 START GAME
            </button>
            {walletAddress ? (
              <button onClick={() => { setWalletAddress(null); localStorage.removeItem('stx-address'); }} className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg border-2 border-red-400 font-bold flex items-center justify-center gap-2">
                <Wallet className="w-5 h-5" />
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-4)}
              </button>
            ) : (
              <button onClick={connectWallet} className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg border-2 border-purple-400 font-bold flex items-center justify-center gap-2">
                <Wallet className="w-5 h-5" />
                Connect Stacks Wallet
              </button>
            )}
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-black/60 p-4 rounded-xl border-2 border-blue-500">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">{score}</span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart key={i} className={`w-8 h-8 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold text-purple-400">LV {level}</span>
            </div>
          </div>
          <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="border-4 border-blue-500 rounded-xl shadow-2xl cursor-crosshair touch-none" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="max-w-md w-full space-y-4 animate-fade-in">
          <div className="bg-black/60 backdrop-blur-sm p-8 rounded-2xl border-4 border-red-500 text-center">
            <h2 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h2>
            <div className="bg-yellow-900/50 p-6 rounded-xl border-2 border-yellow-500 mb-4">
              <p className="text-yellow-300 mb-1">Final Score</p>
              <p className="text-5xl font-bold text-yellow-400">{score}</p>
            </div>
            {score > highScore && (
              <div className="bg-green-900/50 p-4 rounded-xl border-2 border-green-400 mb-4 animate-pulse">
                <p className="text-xl font-bold text-green-400">🎉 NEW HIGH SCORE! 🎉</p>
              </div>
            )}
            <div className="space-y-3">
              <button onClick={startGame} className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl border-4 border-green-300 font-bold text-xl">
                🔄 PLAY AGAIN
              </button>
              {walletAddress && (
                <button onClick={submitScoreToBlockchain} disabled={submitting} className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl border-4 border-purple-400 font-bold text-xl disabled:opacity-50">
                  {submitting ? '⏳ Submitting...' : '💾 SAVE TO STACKS'}
                </button>
              )}
              <button onClick={() => setGameState('menu')} className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg border-2 border-gray-500 font-bold">
                🏠 MAIN MENU
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RocketShooter;
