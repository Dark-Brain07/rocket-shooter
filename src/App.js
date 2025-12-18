import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Rocket, Heart, Trophy, Wallet, X, Zap, Star } from 'lucide-react';
const CONTRACT_ADDRESS = "0x951634B88938D2Cdd72149dB57C198Ea835AAf20";
const CONTRACT_ABI = [
    "function submitScore(uint96 _score) external",
    "function getPlayerStats(address _player) view returns (uint96, uint32, uint32)",
    "function getLeaderboard() view returns (tuple(address player, uint96 score, uint32 timestamp)[])"
];
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
    const [walletProvider, setWalletProvider] = useState(null);
    const [showWalletMenu, setShowWalletMenu] = useState(false);
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
        }
        else if (type === 'plane') {
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
        if (keysRef.current['w'] || keysRef.current['ArrowUp'])
            player.y = Math.max(GAME_HEIGHT / 2, player.y - player.speed);
        if (keysRef.current['s'] || keysRef.current['ArrowDown'])
            player.y = Math.min(GAME_HEIGHT - 30, player.y + player.speed);
        if (keysRef.current['a'] || keysRef.current['ArrowLeft'])
            player.x = Math.max(20, player.x - player.speed);
        if (keysRef.current['d'] || keysRef.current['ArrowRight'])
            player.x = Math.min(GAME_WIDTH - 20, player.x + player.speed);
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
            if (bullet.y > GAME_HEIGHT)
                return false;
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
            if (enemy.y > GAME_HEIGHT)
                return false;
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
            if (bird.y > GAME_HEIGHT)
                return false;
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
        if (gameTimeRef.current % 60 === 0)
            spawnEnemy();
        if (gameTimeRef.current % 180 === 0)
            spawnBird();
        if (gameTimeRef.current % 2100 === 0)
            setLevel(prev => prev + 1);
    };
    const gameLoop = () => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
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
            if (score > highScore)
                setHighScore(score);
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
        if (!touchRef.current.active)
            return;
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
    const connectWallet = async (walletType) => {
        try {
            let provider;
            if (walletType === 'metamask' && window.ethereum)
                provider = window.ethereum;
            else if (walletType === 'coinbase' && window.coinbaseWalletExtension)
                provider = window.coinbaseWalletExtension;
            else if (walletType === 'rainbow' && window.rainbow)
                provider = window.rainbow;
            else {
                alert(`${walletType} wallet not found!`);
                return;
            }
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            const chainId = await provider.request({ method: 'eth_chainId' });
            if (chainId !== '0x2105') {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x2105' }],
                }).catch(async () => {
                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                                chainId: '0x2105',
                                chainName: 'Base Mainnet',
                                rpcUrls: ['https://mainnet.base.org'],
                                nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                                blockExplorerUrls: ['https://basescan.org']
                            }]
                    });
                });
            }
            setWalletAddress(accounts[0]);
            setWalletProvider(provider);
            setShowWalletMenu(false);
            await loadPlayerData(accounts[0], provider);
        }
        catch (error) {
            console.error('Wallet error:', error);
            alert('Failed to connect wallet');
        }
    };
    const loadPlayerData = async (address, provider) => {
        try {
            const ethers = await import('ethers');
            const web3Provider = new ethers.providers.Web3Provider(provider);
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, web3Provider);
            const [score, totalGames] = await contract.getPlayerStats(address);
            setHighScore(score.toNumber());
            setTotalGames(totalGames.toNumber());
        }
        catch (error) {
            console.error('Failed to load data:', error);
        }
    };
    const submitScoreToBlockchain = async () => {
        if (!walletAddress || !walletProvider) {
            alert('Connect wallet first!');
            return;
        }
        try {
            const ethers = await import('ethers');
            const web3Provider = new ethers.providers.Web3Provider(walletProvider);
            const signer = web3Provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            const tx = await contract.submitScore(score);
            alert('Submitting score...');
            await tx.wait();
            alert('Score saved on Base blockchain! 🚀');
            await loadPlayerData(walletAddress, walletProvider);
        }
        catch (error) {
            console.error('Submit error:', error);
            alert('Failed to save score');
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white flex flex-col items-center justify-center p-4", children: [gameState === 'menu' && (_jsx("div", { className: "max-w-2xl w-full space-y-6 animate-fade-in", children: _jsxs("div", { className: "text-center bg-black/40 backdrop-blur-sm p-8 rounded-2xl border-4 border-yellow-500 shadow-2xl", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center animate-bounce", children: _jsx(Rocket, { className: "w-12 h-12 text-white" }) }) }), _jsx("h1", { className: "text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500", children: "ROCKET SHOOTER" }), _jsx("p", { className: "text-xl text-blue-300 mb-4", children: "Defend the Skies!" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6", children: [_jsxs("div", { className: "bg-blue-900/50 p-4 rounded-xl border-2 border-blue-400", children: [_jsx(Trophy, { className: "w-6 h-6 mx-auto mb-1 text-yellow-400" }), _jsx("p", { className: "text-sm text-blue-300", children: "High Score" }), _jsx("p", { className: "text-2xl font-bold text-yellow-400", children: highScore })] }), _jsxs("div", { className: "bg-green-900/50 p-4 rounded-xl border-2 border-green-400", children: [_jsx(Star, { className: "w-6 h-6 mx-auto mb-1 text-green-400" }), _jsx("p", { className: "text-sm text-green-300", children: "Games" }), _jsx("p", { className: "text-3xl font-bold text-green-400", children: totalGames })] })] }), _jsxs("div", { className: "bg-purple-900/50 p-4 rounded-xl border-2 border-purple-400 mb-6", children: [_jsxs("p", { className: "text-sm text-purple-200", children: [_jsx("strong", { children: "Controls:" }), " WASD / Arrow Keys / Touch"] }), _jsx("p", { className: "text-xs text-purple-300 mt-1", children: "Destroy enemies: +10 pts | Hit bird: -15 pts | 3 Lives" })] }), _jsx("button", { onClick: startGame, className: "w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl border-4 border-green-300 font-bold text-2xl shadow-lg transform hover:scale-105 transition-all mb-4", children: "\uD83D\uDE80 START GAME" }), walletAddress ? (_jsxs("button", { onClick: () => setWalletAddress(null), className: "w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg border-2 border-red-400 font-bold flex items-center justify-center gap-2", children: [_jsx(Wallet, { className: "w-5 h-5" }), walletAddress.slice(0, 6), "...", walletAddress.slice(-4)] })) : (_jsxs("button", { onClick: () => setShowWalletMenu(true), className: "w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg border-2 border-blue-400 font-bold flex items-center justify-center gap-2", children: [_jsx(Wallet, { className: "w-5 h-5" }), "Connect Wallet"] }))] }) })), gameState === 'playing' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center bg-black/60 p-4 rounded-xl border-2 border-blue-500", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Trophy, { className: "w-6 h-6 text-yellow-400" }), _jsx("span", { className: "text-2xl font-bold text-yellow-400", children: score })] }), _jsx("div", { className: "flex gap-2", children: Array.from({ length: 3 }).map((_, i) => (_jsx(Heart, { className: `w-8 h-8 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}` }, i))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-6 h-6 text-purple-400" }), _jsxs("span", { className: "text-xl font-bold text-purple-400", children: ["LV ", level] })] })] }), _jsx("canvas", { ref: canvasRef, width: GAME_WIDTH, height: GAME_HEIGHT, onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd, className: "border-4 border-blue-500 rounded-xl shadow-2xl cursor-crosshair touch-none", style: { maxWidth: '100%', height: 'auto' } })] })), gameState === 'gameover' && (_jsx("div", { className: "max-w-md w-full space-y-4 animate-fade-in", children: _jsxs("div", { className: "bg-black/60 backdrop-blur-sm p-8 rounded-2xl border-4 border-red-500 text-center", children: [_jsx("h2", { className: "text-4xl font-bold text-red-500 mb-4", children: "GAME OVER" }), _jsxs("div", { className: "bg-yellow-900/50 p-6 rounded-xl border-2 border-yellow-500 mb-4", children: [_jsx("p", { className: "text-yellow-300 mb-1", children: "Final Score" }), _jsx("p", { className: "text-5xl font-bold text-yellow-400", children: score })] }), score > highScore && (_jsx("div", { className: "bg-green-900/50 p-4 rounded-xl border-2 border-green-400 mb-4 animate-pulse", children: _jsx("p", { className: "text-xl font-bold text-green-400", children: "\uD83C\uDF89 NEW HIGH SCORE! \uD83C\uDF89" }) })), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { onClick: startGame, className: "w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl border-4 border-green-300 font-bold text-xl", children: "\uD83D\uDD04 PLAY AGAIN" }), walletAddress && (_jsx("button", { onClick: submitScoreToBlockchain, className: "w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl border-4 border-blue-400 font-bold text-xl", children: "\uD83D\uDCBE SAVE TO BLOCKCHAIN" })), _jsx("button", { onClick: () => setGameState('menu'), className: "w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg border-2 border-gray-500 font-bold", children: "\uD83C\uDFE0 MAIN MENU" })] })] }) })), showWalletMenu && (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl border-4 border-purple-500 max-w-md w-full", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-yellow-400", children: "Connect Wallet" }), _jsx("button", { onClick: () => setShowWalletMenu(false), children: _jsx(X, { className: "w-6 h-6 text-white hover:text-red-400" }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { onClick: () => connectWallet('metamask'), className: "w-full py-4 bg-orange-600 hover:bg-orange-700 rounded-xl border-2 border-orange-400 font-bold text-lg", children: "\uD83E\uDD8A MetaMask" }), _jsx("button", { onClick: () => connectWallet('coinbase'), className: "w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl border-2 border-blue-400 font-bold text-lg", children: "\uD83D\uDD35 Coinbase Wallet" }), _jsx("button", { onClick: () => connectWallet('rainbow'), className: "w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl border-2 border-pink-400 font-bold text-lg", children: "\uD83C\uDF08 Rainbow Wallet" })] })] }) }))] }));
};
export default RocketShooter;
