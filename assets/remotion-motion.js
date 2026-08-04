// VendiSmart Remotion-Style Motion Engine & Telemetry Simulator
class RemotionTelemetryEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 600;
        this.height = this.canvas.height = 360;
        this.time = 0;
        this.telemetryData = {
            temp: 3.8,
            stock: 96,
            lastSale: "Cold Brew Coffee",
            signal: 99
        };
        
        window.addEventListener('resize', () => {
            if (this.canvas && this.canvas.parentElement) {
                this.width = this.canvas.width = this.canvas.parentElement.clientWidth;
            }
        });
        
        this.init();
    }

    init() {
        this.animate();
        this.startDataFeed();
    }

    startDataFeed() {
        const items = ["Cold Brew Coffee", "Kombucha Zero", "Organic Protein Bar", "Sparkling Water", "Oat Milk Latte"];
        setInterval(() => {
            this.telemetryData.temp = (3.6 + Math.random() * 0.4).toFixed(1);
            this.telemetryData.stock = Math.max(85, Math.floor(96 - Math.random() * 8));
            this.telemetryData.lastSale = items[Math.floor(Math.random() * items.length)];
        }, 3500);
    }

    drawBackground() {
        const grad = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        grad.addColorStop(0, '#001E36');
        grad.addColorStop(0.5, '#002B49');
        grad.addColorStop(1, '#001220');
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Tech grid lines
        this.ctx.strokeStyle = 'rgba(0, 163, 224, 0.08)';
        this.ctx.lineWidth = 1;
        const gridSize = 30;
        for (let x = 0; x < this.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }

    drawTelemetryWave() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#00A859';
        this.ctx.lineWidth = 3;
        this.ctx.shadowColor = '#00A859';
        this.ctx.shadowBlur = 12;

        const centerY = this.height * 0.65;
        for (let x = 0; x < this.width; x += 5) {
            const freq1 = Math.sin((x * 0.02) + (this.time * 0.05)) * 15;
            const freq2 = Math.cos((x * 0.01) - (this.time * 0.03)) * 10;
            const spike = (x > this.width * 0.4 && x < this.width * 0.6) ? Math.sin((x - this.width * 0.4) * 0.05) * -35 : 0;
            const y = centerY + freq1 + freq2 + spike;
            if (x === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
        this.ctx.restore();
    }

    drawRadarPulse() {
        const cx = this.width - 80;
        const cy = 70;
        this.ctx.save();
        
        // Expanding ring
        const radius = (this.time * 2) % 45;
        const alpha = 1 - (radius / 45);
        this.ctx.strokeStyle = `rgba(0, 168, 89, ${alpha})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        this.ctx.stroke();

        // Center dot
        this.ctx.fillStyle = '#00A859';
        this.ctx.shadowColor = '#00A859';
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        this.ctx.fill();

        // Label
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#00A3E0';
        this.ctx.font = '600 11px Inter, sans-serif';
        this.ctx.fillText('LIVE IOT FEED', cx - 80, cy + 4);
        this.ctx.restore();
    }

    drawOverlayHUD() {
        this.ctx.save();
        // Glass container card
        this.ctx.fillStyle = 'rgba(0, 43, 73, 0.75)';
        this.ctx.strokeStyle = 'rgba(0, 168, 89, 0.4)';
        this.ctx.lineWidth = 1.5;
        
        const cardX = 20;
        const cardY = 20;
        const cardW = 280;
        const cardH = 140;
        
        this.ctx.beginPath();
        this.ctx.roundRect(cardX, cardY, cardW, cardH, 12);
        this.ctx.fill();
        this.ctx.stroke();

        // HUD Text
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
        this.ctx.fillText('VendiSmart Telemetry 4.0', cardX + 16, cardY + 32);

        // Temp indicator
        this.ctx.fillStyle = '#00A3E0';
        this.ctx.font = '500 13px Inter, sans-serif';
        this.ctx.fillText(`Cooling Status:`, cardX + 16, cardY + 62);
        this.ctx.fillStyle = '#00A859';
        this.ctx.font = '700 14px Inter, sans-serif';
        this.ctx.fillText(`${this.telemetryData.temp}°C (Optimal)`, cardX + 130, cardY + 62);

        // Stock indicator
        this.ctx.fillStyle = '#00A3E0';
        this.ctx.font = '500 13px Inter, sans-serif';
        this.ctx.fillText(`Inventory Level:`, cardX + 16, cardY + 88);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '700 14px Inter, sans-serif';
        this.ctx.fillText(`${this.telemetryData.stock}% Capacity`, cardX + 130, cardY + 88);

        // Last Transaction
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.font = '500 12px Inter, sans-serif';
        this.ctx.fillText(`Recent Vending: ${this.telemetryData.lastSale}`, cardX + 16, cardY + 118);

        this.ctx.restore();
    }

    animate() {
        this.time += 1;
        this.drawBackground();
        this.drawTelemetryWave();
        this.drawRadarPulse();
        this.drawOverlayHUD();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('remotionTelemetryCanvas')) {
        new RemotionTelemetryEngine('remotionTelemetryCanvas');
    }
});
